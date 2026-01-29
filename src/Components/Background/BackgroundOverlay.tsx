import { useState } from 'react';
import bgOverlayPng from './assets/bg-overlay.png?url';
import { useResize } from './utils/useResize';

export function BackgroundOverlay() {
  const [dpr, setDpr] = useState(devicePixelRatio);
  useResize(() => {
    setDpr(devicePixelRatio);
  });

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-repeat"
      style={{
        backgroundSize: `${2 / dpr}px`,
        backgroundImage: `url(${bgOverlayPng})`,
        imageRendering: 'pixelated',
      }}
    />
  );
}
