import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export function Paragraph({ children }: Props) {
  return <p className="my-2">{children}</p>;
}
