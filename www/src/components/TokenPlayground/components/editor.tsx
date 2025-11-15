import {
  type EditorProps,
  loader,
  Editor as MonacoEditor,
} from '@monaco-editor/react';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { DEFAULT_MONACO_OPTIONS } from '../lib/monaco';

globalThis.MonacoEnvironment = {
  getWorker(_, label) {
    switch (label) {
      case 'json': {
        return new jsonWorker();
      }
      default: {
        return new editorWorker();
      }
    }
  },
};

/** Hook that loads Monaco and reports on status */
export function useEditor() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // import monaco only after page load
    (async () => {
      const monaco = await import('monaco-editor');
      loader.config({ monaco });
      loader.init();
      setLoaded(true);
    })();
  }, []);
  return useMemo(() => ({ loaded }), [loaded]);
}

export default function Editor({ options, ...props }: EditorProps) {
  return (
    <MonacoEditor
      theme="vs-dark"
      defaultLanguage="json"
      {...props}
      options={{
        ...DEFAULT_MONACO_OPTIONS,
        ...options,
      }}
    />
  );
}
