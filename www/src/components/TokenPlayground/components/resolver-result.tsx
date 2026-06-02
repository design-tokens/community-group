import { editor as monacoEditor } from 'monaco-editor';
import eq from 'fast-deep-equal';
import {
  type Dispatch,
  type StateUpdater,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';
import { DEFAULT_MONACO_OPTIONS } from '../lib/monaco.js';
import type { Modifier, ResolverImpl } from '../lib/types.js';
import { diffTokens, flatten, prettyJSON } from '../lib/utils.js';
import s from './resolver-result.module.css';
import { Select } from './select.js';

export interface ResolverResultProps {
  resolver: ResolverImpl<Record<string, any>>;
  modifiers: NonNullable<(Modifier & { name: string })[]>;
  input: Record<string, string>;
  setInput: Dispatch<StateUpdater<Record<string, string>>>;
  defaultInput: Record<string, string>;
}

export default function ResolverResult({
  resolver,
  modifiers,
  input,
  defaultInput,
  setInput,
}: ResolverResultProps) {
  const [diffEditor, setDiffEditor] = useState<monacoEditor.IDiffEditor | null>(
    null,
  );
  const monacoEl = useRef(null);

  // mount: setup
  useLayoutEffect(() => {
    setDiffEditor((prev) => {
      if (prev) return prev;
      return monacoEditor.createDiffEditor(monacoEl.current!, {
        ...DEFAULT_MONACO_OPTIONS,
        originalEditable: false,
        readOnly: true,
        renderGutterMenu: false,
        renderSideBySide: false,
      });
    });
    return () => diffEditor?.dispose();
  }, [monacoEl.current]);

  // generate diff based on input, and if user has modified any code
  const finalTokens = useMemo(() => {
    if (!Object.keys(input).length) {
      return { original: '', modified: '' };
    }
    const modified = new Set<string>();
    const original = flatten(resolver.apply(defaultInput));
    const actual = resolver.apply(input);
    for (const [id, value] of Object.entries(flatten(actual))) {
      if (!eq(value, original[id])) {
        modified.add(id);
      }
    }
    return diffTokens(prettyJSON(actual), modified);
  }, [resolver, input]);

  // update diff
  useEffect(() => {
    if (!diffEditor) return;
    diffEditor.setModel({
      original: monacoEditor.createModel(finalTokens.original, 'json'),
      modified: monacoEditor.createModel(finalTokens.modified, 'json'),
    });
  }, [diffEditor, finalTokens]);

  return (
    <div class={s.container}>
      <div role="toolbar" class={s.modifiers}>
        {modifiers.map((modifier) => (
          <Select
            key={modifier.name}
            label={modifier.name}
            options={Object.keys(modifier.contexts).map((value) => ({
              label: value,
              value: value,
            }))}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                [modifier.name!]: (e.target as HTMLSelectElement).value,
              }))
            }
          />
        ))}
      </div>

      <section class={s.final}>
        <div class={s.editor} ref={monacoEl} />
      </section>
    </div>
  );
}
