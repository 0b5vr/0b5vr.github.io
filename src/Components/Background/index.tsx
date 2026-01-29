import { CDS } from '@0b5vr/experimental';
import { useSetAtom } from 'jotai';
import { useCallback, useRef } from 'react';
import { atomBackgroundFps } from './atoms/atomBackgroundFps';
import { atomBackgroundResolution } from './atoms/atomBackgroundResolution';
import { BackgroundOverlay } from './BackgroundOverlay';
import { BackgroundRenderer } from './BackgroundRenderer';
import { BackgroundStats } from './BackgroundStats';
import { FpsCounter } from './FpsCounter';
import { useAnimationFrame } from './utils/useAnimationFrame';
import { useResize } from './utils/useResize';

export function Background() {
  const refRenderer = useRef<BackgroundRenderer>(null);
  const refFpsCounter = useRef(new FpsCounter());
  const setFpsText = useSetAtom(atomBackgroundFps);
  const setResolutionText = useSetAtom(atomBackgroundResolution);

  const setSize = useCallback(() => {
    const width = Math.floor((innerWidth * devicePixelRatio) / 4) * 2;
    const height = Math.floor((innerHeight * devicePixelRatio) / 4) * 2;
    refRenderer.current?.resize(width, height);
    setResolutionText(`${width} x ${height}`);
  }, [setResolutionText]);

  const refCanvas = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas == null) {
        return;
      }

      refRenderer.current = new BackgroundRenderer(canvas);
      refRenderer.current.onAfterRender = (delta) => {
        refFpsCounter.current.update(delta);
        setFpsText(refFpsCounter.current.fps);
      };

      setSize();
    },
    [setFpsText, setSize],
  );

  useResize(setSize);

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
      <BackgroundOverlay />
      <BackgroundStats />
    </>
  );
}
