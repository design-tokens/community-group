import type * as monaco from 'monaco-editor';

export const DEFAULT_MONACO_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions =
  {
    detectIndentation: true,
    fontFamily: 'Fragment Mono',
    fontSize: 11,
    formatOnType: true,
    minimap: { enabled: false },
    automaticLayout: true,
    tabSize: 2,
    trimAutoWhitespace: true,
  };
