import { useCallback, useEffect, useRef } from 'react';
import { useAnimationFrame } from './utils/useAnimationFrame';
import { BackgroundRenderer } from './BackgroundRenderer';
import { CDS } from '@0b5vr/experimental';
import bgOverlayPng from './assets/bg-overlay.png?url';

export function Background(): JSX.Element {
  const refRenderer = useRef<BackgroundRenderer>();

  const refCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    if (canvas == null) { return; }

    refRenderer.current = new BackgroundRenderer(canvas);

    const width = Math.floor(window.innerWidth / 4) * 2;
    const height = Math.floor(window.innerHeight / 4) * 2;
    refRenderer.current.resize(width, height);
  }, []);

  useEffect(() => {
    const onResize = (): void => {
      const width = Math.floor(window.innerWidth / 4) * 2;
      const height = Math.floor(window.innerHeight / 4) * 2;
      refRenderer.current?.resize(width, height);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const refCDSScrollPos = useRef(new CDS());

  useAnimationFrame((delta) => {
    const wheel = window.scrollY / window.innerHeight;
    refCDSScrollPos.current.factor = 50.0;
    refCDSScrollPos.current.target = wheel;
    refCDSScrollPos.current.update(delta);

    if (refRenderer.current == null) { return; }

    refRenderer.current.scrollPos = refCDSScrollPos.current.value;
    refRenderer.current.render(delta);
  }, []);

  return <>
    <canvas
      className="fixed top-0 left-0 w-full h-full"
      ref={refCanvas}
    ></canvas>
    <div
      className="fixed top-0 left-0 w-full h-full bg-repeat"
      style={{
        backgroundImage: `url(${bgOverlayPng})`
      }}
    ></div>
  </>;
}
