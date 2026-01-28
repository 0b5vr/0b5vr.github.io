import type { ReactNode } from 'react';

export const Link = ({
  children,
  href,
  noColorChange,
}: {
  href: string;
  noColorChange?: boolean;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`${noColorChange ? '' : 'text-sky-300'}`}
  >
    {children}
  </a>
);
