import 'es-module-shims';
import MonacoEditor, { type OnMount, useMonaco } from '@monaco-editor/react';
import { type editor, KeyCode, KeyMod } from 'monaco-editor';
import { useCallback, useEffect, useRef } from 'react';
import defaultValue from './editorDefaultCode.js?raw';

export const Editor: React.FC = () => {
  const refEditor = useRef<editor.IStandaloneCodeEditor>();
  const refDivContainer = useRef<HTMLDivElement>(null);
  const monaco = useMonaco();

  useEffect(() => {
    const script = document.createElement('script');
    Object.assign(script, {
      type: 'importmap',
      innerHTML: `{
        "imports": {
          "@0b5vr/experimental": "https://cdn.jsdelivr.net/npm/@0b5vr/experimental/+esm"
        }
      }`,
    });

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (monaco) {
      fetch(
        'https://cdn.jsdelivr.net/npm/@0b5vr/experimental/dist/0b5vr-experimental.d.ts',
      )
        .then((res) => res.text())
        .then(async (typedef) => {
          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            typedef,
            'file:///node_modules/@types/0b5vr__experimental/index.d.ts',
          );
        });
    }
  }, [monaco]);

  const handleEditorMount: OnMount = useCallback(async (editor) => {
    refEditor.current = editor;

    editor.updateOptions({
      minimap: {
        renderCharacters: false,
      },
    });

    let lastUnmount: unknown;

    const apply = async () => {
      if (typeof lastUnmount === 'function') {
        lastUnmount();
      }

      const code = editor.getValue();
      const blob = new Blob([code], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);

      const mod = await importShim(/* @vite-ignore */ url);
      URL.revokeObjectURL(url);

      if (typeof mod.default !== 'function') {
        console.error('Module does not export a default function.');
      } else {
        lastUnmount = mod.default({
          divContainer: refDivContainer.current,
        });
      }
    };
    apply();

    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, apply);
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyR, apply);
  }, []);

  return (
    <div className="my-2">
      <MonacoEditor
        height="320px"
        defaultLanguage="javascript"
        defaultValue={defaultValue}
        theme="vs-dark"
        onMount={handleEditorMount}
      />
      <div
        ref={refDivContainer}
        className="w-full h-16 bg-gray-800 text-gray-300 px-2 py-1 whitespace-pre font-mono text-xs"
      />
    </div>
  );
};
