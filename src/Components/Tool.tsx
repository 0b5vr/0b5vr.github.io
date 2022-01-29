import { Link } from './Link';

export const Tool: React.FC<{
  imageSrc: string;
  name: string;
  url: string;
}> = ( { imageSrc, name, url } ) => (
  <Link href={ url } noColorChange>
    <li
      className="relative bg-cover group aspect-square"
      style={{
        backgroundImage: `url(${ imageSrc })`,
      }}
    >
      <div
        className="absolute grid items-end w-full h-full opacity-0 group-hover:opacity-100 bg-black/50 text-sm leading-tight"
      >
        <p
          className="opacity-0 group-hover:opacity-100 px-1"
        >{ name }</p>
      </div>
    </li>
  </Link>
);
