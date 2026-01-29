import { useEffect } from 'react';

export function useResize(callback: () => void): void {
  useEffect(() => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [callback]);
}
