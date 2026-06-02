import { editor as monacoEditor } from 'monaco-editor';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { DEFAULT_MONACO_OPTIONS } from '../lib/monaco';
import s from './editor.module.css';

self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker();
    }

    // To add other langs, see:
    // https://github.com/microsoft/monaco-editor/blob/main/samples/browser-esm-vite-react/src/userWorker.ts

    return new editorWorker();
  },
};

export interface EditorProps {
  path: string;
  options?: monacoEditor.IStandaloneEditorConstructionOptions;
  defaultValue?: string;
  onChange?: (
    changes: monacoEditor.IModelContentChangedEvent,
    contents: string,
  ) => void;
}

export default function Editor({
  defaultValue,
  onChange,
  options,
}: EditorProps) {
  const [editor, setEditor] =
    useState<monacoEditor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  // mount: setup
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  useLayoutEffect(() => {
    setEditor((prev) => {
      if (prev) return prev;
      const editor = monacoEditor.create(monacoEl.current!, {
        ...DEFAULT_MONACO_OPTIONS,
        ...options,
        model: monacoEditor.createModel(defaultValue || '', 'json'),
      });
      editor.getModel()?.onDidChangeContent((changes) => {
        onChangeRef.current?.(changes, editor.getModel()?.getValue() || '');
      });
      return editor;
    });
    return () => editor?.dispose();
  }, []);

  // listen for defaultValue changes
  useEffect(() => {
    if (!defaultValue || !editor) return;

    editor.setModel(monacoEditor.createModel(defaultValue, 'json'));
    editor.getModel()?.onDidChangeContent((changes) => {
      onChangeRef.current?.(changes, editor.getModel()?.getValue() || '');
    });
  }, [editor, defaultValue]);

  return <div class={s.editor} ref={monacoEl} />;
}
