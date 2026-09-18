import type { ReactNode } from 'react';

export const SmallAside = ({ children }: { children: ReactNode }) => (
  <aside className="text-xs text-gray-300">{children}</aside>
);
