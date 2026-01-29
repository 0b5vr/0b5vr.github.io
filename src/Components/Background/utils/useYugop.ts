import { getYugopText, linearstep } from '@0b5vr/experimental';
import { useEffect, useState } from 'react';

export function useYugop(text: string, delay: number): string {
  const [timestampBegin] = useState(() => performance.now() + delay * 1000);
  const [yugopText, setYugopText] = useState('');

  useEffect(() => {
    let id: number;

    const update = (time: number) => {
      const phase = linearstep(0, 500, time - timestampBegin);
      if (phase === 1.0) {
        setYugopText(text);
        return;
      }

      if (phase === 0.0) {
        setYugopText('');
      } else {
        setYugopText(getYugopText(text, phase));
      }

      id = requestAnimationFrame(update);
    };

    id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [text, timestampBegin]);

  return yugopText;
}
