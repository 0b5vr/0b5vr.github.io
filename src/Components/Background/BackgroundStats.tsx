import { useAtomValue } from 'jotai';
import { atomBackgroundFps } from './atoms/atomBackgroundFps';
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

  return (
    <div className="fixed bottom-2 right-2 flex flex-col items-end gap-0.5">
      <Line text="haha" delay={0.7} />
      <Line text={`${fps} FPS`} delay={0.5} />
    </div>
  );
}
