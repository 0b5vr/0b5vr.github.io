import { CDS } from '@0b5vr/experimental';
import { useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';
import bgOverlayPng from './assets/bg-overlay.png?url';
import { atomBackgroundFps } from './atoms/atomBackgroundFps';
import { atomBackgroundResolution } from './atoms/atomBackgroundResolution';
import { BackgroundRenderer } from './BackgroundRenderer';
import { FpsCounter } from './FpsCounter';
import { useAnimationFrame } from './utils/useAnimationFrame';
import { BackgroundStats } from './BackgroundStats';

export function Background() {
  const refRenderer = useRef<BackgroundRenderer>(null);
  const refFpsCounter = useRef(new FpsCounter());
  const setFps = useSetAtom(atomBackgroundFps);
  const setResolution = useSetAtom(atomBackgroundResolution);

  const refCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    if (canvas == null) {
      return;
    }

    refRenderer.current = new BackgroundRenderer(canvas);
    refRenderer.current.onAfterRender = (delta) => {
      refFpsCounter.current.update(delta);
      setFps(refFpsCounter.current.fps);
    };

    const width = Math.floor(window.innerWidth / 4) * 2;
    const height = Math.floor(window.innerHeight / 4) * 2;
    refRenderer.current.resize(width, height);
    setResolution(`${width} x ${height}`);
  }, [setFps, setResolution]);

  useEffect(() => {
    const onResize = (): void => {
      const width = Math.floor(window.innerWidth / 4) * 2;
      const height = Math.floor(window.innerHeight / 4) * 2;
      refRenderer.current?.resize(width, height);
      setResolution(`${width} x ${height}`);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setResolution]);

  const refCDSScrollPos = useRef(new CDS());

  useAnimationFrame((delta) => {
    // limit delta to avoid large jumps
    delta = Math.min(delta, 0.1);

    const wheel = window.scrollY / window.innerHeight;
    refCDSScrollPos.current.factor = 50.0;
    refCDSScrollPos.current.target = wheel;
    refCDSScrollPos.current.update(delta);

    if (refRenderer.current == null) {
      return;
    }

    refRenderer.current.scrollPos = refCDSScrollPos.current.value;
    refRenderer.current.render(delta);
  }, []);

  return (
    <>
      <canvas
        className="fixed top-0 left-0 w-full h-full"
        ref={refCanvas}
      ></canvas>
      <div
        className="fixed top-0 left-0 w-full h-full bg-repeat"
        style={{
          backgroundImage: `url(${bgOverlayPng})`,
        }}
      ></div>
      <BackgroundStats />
    </>
  );
}
