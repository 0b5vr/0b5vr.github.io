import bgOverlayPng from './assets/bg-overlay.png?url';

export function BackgroundOverlay() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-repeat"
      style={{
        backgroundSize: `${2 / devicePixelRatio}px`,
        backgroundImage: `url(${bgOverlayPng})`,
        imageRendering: 'pixelated',
      }}
    />
  );
}
