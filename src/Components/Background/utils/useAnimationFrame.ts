import { DependencyList, useEffect, useRef } from 'react';

export function useAnimationFrame(
  callback: ( delta: number ) => void,
  deps: DependencyList
): void {
  const refPrev = useRef<number>( Date.now() );

  useEffect( () => {
    let halt = false;
    const update = (): void => {
      if ( halt ) { return; }

      const now = Date.now();
      callback( 0.001 * ( now - refPrev.current ) );
      refPrev.current = now;

      requestAnimationFrame( update );
    };
    update();

    return () => {
      halt = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ callback, ...deps ] );
}
