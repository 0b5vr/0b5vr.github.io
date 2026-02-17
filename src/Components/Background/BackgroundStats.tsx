import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import { atomBackgroundFps } from './atoms/atomBackgroundFps';
import { atomBackgroundResolution } from './atoms/atomBackgroundResolution';
import { PixelLabel } from './PixelLabel';
import { useResize } from './utils/useResize';
import { useYugop } from './utils/useYugop';

function Line({ text, delay }: { text: string; delay: number }) {
  const yugopText = useYugop(text, delay);

  return <PixelLabel text={yugopText} />;
}

export function BackgroundStats() {
  const fps = useAtomValue(atomBackgroundFps);
  const resolution = useAtomValue(atomBackgroundResolution);

  const [dpr, setDpr] = useState(devicePixelRatio);
  useResize(() => {
    setDpr(devicePixelRatio);
  });
  const ratio = useMemo(() => Math.max(1.0, Math.round(dpr)) / dpr, [dpr]);

  return (
    <div
      className="fixed flex flex-col items-end"
      style={{
        bottom: `${ratio * 4}px`,
        right: `${ratio * 4}px`,
        gap: `${ratio * 2}px`,
      }}
    >
      <Line text="0b5vr.com" delay={0.7} />
      <Line text={`${fps} fps`} delay={0.5} />
      <Line text={`resolution: ${resolution}`} delay={0.3} />
    </div>
  );
}
