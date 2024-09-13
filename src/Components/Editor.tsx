import 'es-module-shims';
import MonacoEditor, { useMonaco, OnMount } from '@monaco-editor/react';
import { editor, KeyCode, KeyMod } from 'monaco-editor';
import { useCallback, useEffect, useRef } from 'react';

const defaultValue = `import {
  ClockRealtime,
  Euler,
  Matrix4,
  Vector3,
} from '@0b5vr/experimental';

export default ( { divContainer } ) => {
  let unmounted = false;

  const vector = new Vector3( [ 1.0, 2.0, 3.0 ] );

  const euler = new Euler( [ Math.PI / 4.0, Math.PI / 4.0, Math.PI / 4.0 ] );
  const quat = euler.quaternion;
  const vectorModel = vector.applyQuaternion( quat );

  // update
  const clock = new ClockRealtime();
  clock.play();

  function update() {
    if ( unmounted ) { return; }

    clock.update();
    const { time } = clock;

    const matrixView = Matrix4.lookAtInverse(
      new Vector3( [ Math.cos( time ), 0.0, Math.sin( time ) ] ).scale( 5.0 ),
      Vector3.zero,
    );
    const vectorView = vectorModel.applyMatrix4( matrixView );

    divContainer.textContent = vectorView;

    requestAnimationFrame( update );
  }
  requestAnimationFrame( update );

  // uninit
  return () => {
    unmounted = true;
  }
};
`;

export const Editor: React.FC = () => {
  const refEditor = useRef<editor.IStandaloneCodeEditor>();
  const refDivContainer = useRef<HTMLDivElement>( null );
  const monaco = useMonaco();

  useEffect( () => {
    const script = document.createElement( 'script' );
    Object.assign( script, {
      type: 'importmap',
      innerHTML: `{
        "imports": {
          "@0b5vr/experimental": "https://unpkg.com/@0b5vr/experimental/dist/0b5vr-experimental.esm.min.js"
        }
      }`,
    } );

    document.body.appendChild( script );
  }, [] );

  useEffect( () => {
    if ( monaco ) {
      fetch( 'https://unpkg.com/@0b5vr/experimental/dist/0b5vr-experimental.d.ts' )
        .then( ( res ) => res.text() )
        .then( async ( typedef ) => {
          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            typedef,
            'file:///node_modules/@types/0b5vr__experimental/index.d.ts',
          );
        } );
    }
  }, [ monaco ] );

  const handleEditorMount: OnMount = useCallback( ( editor ) => {
    refEditor.current = editor;

    editor.updateOptions( {
      minimap: {
        renderCharacters: false,
      },
      fontFamily: '"JetBrains Mono", monospace',
    } );

    let lastUnmount: unknown;

    const apply = () => {
      if ( typeof lastUnmount === 'function' ) {
        lastUnmount();
      }

      const code = editor.getValue();
      const blob = new Blob( [ code ], { type: 'text/javascript' } );
      const url = URL.createObjectURL( blob );

      importShim( /* @vite-ignore */ url ).then( ( mod ) => {
        lastUnmount = ( mod as any ).default( {
          divContainer: refDivContainer.current,
        } );
        URL.revokeObjectURL( url );
      } );
    };
    apply();

    editor.addCommand( KeyMod.CtrlCmd | KeyCode.KeyS, apply );
    editor.addCommand( KeyMod.CtrlCmd | KeyCode.KeyR, apply );
  }, [ refEditor ] );

  return (
    <div className="my-2">
      <MonacoEditor
        height="320px"
        defaultLanguage="javascript"
        defaultValue={ defaultValue }
        theme="vs-dark"
        onMount={ handleEditorMount }
      />
      <div
        ref={ refDivContainer }
        className="w-full h-16 bg-gray-800 text-gray-300 px-2 py-1 whitespace-pre font-mono text-xs"
      />
    </div>
  );
};
