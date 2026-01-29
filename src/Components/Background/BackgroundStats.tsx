import { useAtomValue } from 'jotai';
import { atomBackgroundFps } from './atoms/atomBackgroundFps';
import { atomBackgroundResolution } from './atoms/atomBackgroundResolution';
import { PixelLabel } from './PixelLabel';
import { useYugop } from './utils/useYugop';

function Line({ text, delay }: { text: string, delay: number }) {
  const yugopText = useYugop(text, delay);

  return (
    <PixelLabel text={yugopText} />
  );
}

export function BackgroundStats() {
  const fps = useAtomValue(atomBackgroundFps);
  const resolution = useAtomValue(atomBackgroundResolution);

  return (
    <div
      className="fixed flex flex-col items-end"
      style={{
        bottom: `${4 / devicePixelRatio}px`,
        right: `${4 / devicePixelRatio}px`,
        gap: `${2 / devicePixelRatio}px`
      }}
    >
      <Line text="0b5vr.com" delay={0.7} />
      <Line text={`${fps} fps`} delay={0.5} />
      <Line text={`resolution: ${resolution}`} delay={0.3} />
    </div>
  );
}
