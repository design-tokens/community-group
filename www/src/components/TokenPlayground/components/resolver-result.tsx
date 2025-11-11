import { DiffEditor } from '@monaco-editor/react';
import eq from 'fast-deep-equal';
import { type Dispatch, type StateUpdater, useMemo } from 'preact/hooks';
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
        <DiffEditor
          theme="vs-dark"
          options={{
            ...DEFAULT_MONACO_OPTIONS,
            renderGutterMenu: false,
            renderSideBySide: false,
          }}
          keepCurrentOriginalModel={false}
          original={finalTokens.original}
          modified={finalTokens.modified}
        />
      </section>
    </div>
  );
}
