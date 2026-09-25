import { useCallback, useState } from 'react';
import youtubeSvg from './assets/youtube.svg';
import { YouTubeThumbnail } from './YouTubeThumbnail';

interface Props {
  /** The video id, e.g. `dQw4w9WgXcQ` */
  id: string;
  title?: string;
}

function ActualYTIframe({ id, title }: Props) {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full aspect-video"
    />
  );
}

function YTFacade({ id, title, onClick }: Props & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Play: ${title}`}
      className="relative w-full aspect-video cursor-pointer bg-black group"
    >
      <YouTubeThumbnail id={id} title={title} />
      <span className="absolute inset-0 grid place-items-center">
        <img
          src={youtubeSvg}
          alt="YouTube logo"
          width="72"
          height="48"
          className="opacity-80 group-hover:opacity-100"
        />
      </span>
    </button>
  );
}

export function YouTube({ id, title = 'YouTube video player' }: Props) {
  const [playing, setPlaying] = useState(false);

  const handleClick = useCallback(() => {
    setPlaying(true);
  }, []);

  if (playing) {
    return <ActualYTIframe id={id} title={title} />;
  }

  return <YTFacade id={id} title={title} onClick={handleClick} />;
}
