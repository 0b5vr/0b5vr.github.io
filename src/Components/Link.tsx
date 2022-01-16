export const Link: React.FC<{
  href: string;
}> = ( { children, href } ) => (
  <a href={ href }
    target="_blank"
    rel="noreferrer"
    className="text-sky-300"
  >
    { children }
  </a>
);
