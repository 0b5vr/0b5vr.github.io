export const Link: React.FC<{
  href: string;
  noColorChange?: boolean;
}> = ({ children, href, noColorChange }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`${noColorChange ? '' : 'text-sky-300'}`}
  >
    {children}
  </a>
);
