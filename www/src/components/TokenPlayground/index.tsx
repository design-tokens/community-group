// cSpell:words figma
import { useEffect, useMemo, useState } from 'preact/hooks';
import { ZodError } from 'zod/v4';
import Nav from './components/nav.js';
import { createResolver } from './lib/create-resolver.js';
import type { Modifier, Preset, Resolver, ResolverImpl } from './lib/types.js';
import Editor, { useEditor } from './components/editor.js';
import ResolverResult from './components/resolver-result.js';
import { prettyJSON } from './lib/utils.js';
import s from './index.module.css';
import Files from './components/files.js';

function getModifiers(unparsedJson: string): (Modifier & { name: string })[] {
  return Object.entries(
    (JSON.parse(unparsedJson) as Resolver).modifiers ?? {},
  ).map(([k, v]) => ({ ...v, name: k }));
}

// lazy-loaded design systems
const DESIGN_SYSTEM = {
  'figma-sds': () => import('./lib/examples/figma-sds.js'),
  'github-primer': () => import('./lib/examples/github-primer.js'),
};

/**
 * Note: Monaco should ALWAYS be lazy-loaded in a separate chunk because
 * it’s very heavy, and shouldn’t block first paint. However, since this
 * is a playground app, and Monaco is all there is, we load it in the
 * critical bundle because a loading screen is worse.
 *
 * We do, however, load the design systems themselves all lazily, because
 * those will add up quickly as more are added.
 */
export default function TokenPlayground() {
  const [preset, setPreset] = useState<Preset>('github-primer');
  const [files, setFiles] = useState<Record<string, string>>({});
  const [modifiers, setModifiers] = useState<(Modifier & { name: string })[]>(
    [],
  );
  const [currentFile, setCurrentFile] = useState(Object.keys(files)[0]);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [defaultInput, setDefaultInput] = useState<Record<string, string>>({});
  const [input, setInput] = useState<Record<string, string>>({});
  const resolver = useMemo<ResolverImpl<Record<string, any>>>(
    () =>
      // loading hack: fall back to placeholder during initial load
      Object.keys(files).length
        ? resolverFromFiles(files)
        : {
            getSet: () => ({ sources: [] }),
            getModifier: () => ({ contexts: {} }),
            apply: () => ({}),
          },
    [files],
  );

  const sortedFilenames = useMemo(() => {
    const filenames = Object.keys(files);
    filenames.sort((a, b) => {
      if (a.endsWith('.resolver.json')) {
        return -1;
      } else if (b.endsWith('.resolver.json')) {
        return 1;
      } else {
        return a.localeCompare(b, 'en-us', { numeric: true });
      }
    });
    return filenames;
  }, [files]);

  useEffect(() => {
    const emptyFiles: Record<string, string> = {};
    setFiles(emptyFiles); // needed to refresh Monaco
    (async () => {
      if (!(preset in DESIGN_SYSTEM)) {
        throw new Error(`Unknown system ${preset}`);
      }
      // reset files
      const mod = await DESIGN_SYSTEM[preset]();
      const formatted: Record<string, string> = {};
      for (const [k, v] of Object.entries(mod.default)) {
        formatted[k] = prettyJSON(JSON.parse(v));
      }
      setFiles(formatted);
      setCurrentFile(Object.keys(formatted)[0]);

      // reset modifier values
      const nextInput: Record<string, string> = {};
      const resolverKey = resolverFilename(mod.default);
      const resolverFile = mod.default[resolverKey as keyof typeof mod.default];
      const modifiers = getModifiers(resolverFile);
      setModifiers(modifiers);
      for (const m of modifiers) {
        nextInput[m.name] = Object.keys(m.contexts)[0];
      }
      setDefaultInput(nextInput);
      setInput(nextInput);
    })();
  }, [preset]);

  // show missing resolver.json error on init
  useEffect(() => {
    const resolver = Object.keys(files).find((f) =>
      f.endsWith('.resolver.json'),
    );
    if (!resolver) {
      setErrors(
        Object.fromEntries(
          Object.keys(files).map((filename) => [
            filename,
            'Design system error: *.resolver.json not found',
          ]),
        ),
      );
    }
  }, [files, errors, preset]);

  const { loaded } = useEditor();

  if (!Object.keys(files).length) {
    return (
      <div role="status" class={s.loading}>
        Loading
      </div>
    );
  }

  return (
    <div class={s.app}>
      <div class={s.nav}>
        <Nav preset={preset} onPresetChange={setPreset} />
        <div class={s.fileList}>
          <Files
            filenames={sortedFilenames}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
          />
        </div>
      </div>
      <div class={s.editor}>
        {errors[currentFile] ? (
          <div class={s.editorError}>{errors[currentFile]}</div>
        ) : null}
        {loaded && (
          <Editor
            path={
              `${preset}/${currentFile}` // prefixing with preset prevents conflicts between files like resolver.json
            }
            defaultValue={files[currentFile]}
            onChange={(contents) => {
              try {
                setErrors((value) => ({ ...value, [currentFile]: undefined }));
                const tryResolver = resolverFromFiles({
                  ...files,
                  [currentFile]: JSON.parse(contents),
                });
                tryResolver.apply(input); // TODO: improve resolver to be able to throw errors earlier
                setFiles((value) => ({ ...value, [currentFile]: contents }));
              } catch (err) {
                console.error(err);
                const message =
                  err instanceof ZodError &&
                  Array.isArray(JSON.parse(err.message))
                    ? JSON.parse(err.message)
                        .map((e) => e.message)
                        .join('\n')
                    : String(err);
                setErrors((value) => ({ ...value, [currentFile]: message }));
              }
            }}
          />
        )}
      </div>
      <div class={s.resolverResult}>
        {loaded && resolver && (
          <ResolverResult
            resolver={resolver}
            modifiers={modifiers}
            defaultInput={defaultInput}
            input={input}
            setInput={setInput}
          />
        )}
      </div>
    </div>
  );
}

function resolverFilename(files: Record<string, string>): string {
  return (
    Object.keys(files).find((filename) => filename.endsWith('resolver.json')) ||
    'resolver.json'
  );
}

function resolverFromFiles<T extends Record<string, any>>(
  files: Record<string, string>,
): ResolverImpl<T> {
  const tokenMap: Record<string, any> = {};
  let resolver = {} as Resolver;
  for (const [k, v] of Object.entries(files)) {
    const parsed = typeof v === 'string' ? JSON.parse(v) : v;
    if (k.endsWith('resolver.json')) {
      resolver = parsed;
    } else {
      tokenMap[k] = parsed;
    }
  }
  return createResolver(tokenMap, resolver);
}
