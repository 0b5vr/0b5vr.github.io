import { useMemo } from 'react';

// Matches the layout in App.tsx: 1 column under md, 2 columns from md
const THUMBNAIL_SIZES =
  '(min-width: 1280px) 564px, (min-width: 768px) 324px, 368px';

interface Props {
  /** The video id, e.g. `dQw4w9WgXcQ` */
  id: string;
  title?: string;
}

export function YouTubeThumbnail({ id, title }: Props) {
  const webpSrcSet = useMemo(
    () =>
      [
        `https://i.ytimg.com/vi_webp/${id}/mqdefault.webp 320w`,
        `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp 480w`,
        `https://i.ytimg.com/vi_webp/${id}/sddefault.webp 640w`,
      ].join(', '),
    [id],
  );

  const jpgSrcSet = useMemo(
    () =>
      [
        `https://i.ytimg.com/vi/${id}/mqdefault.jpg 320w`,
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg 480w`,
        `https://i.ytimg.com/vi/${id}/sddefault.jpg 640w`,
      ].join(', '),
    [id],
  );

  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} sizes={THUMBNAIL_SIZES} />
      <img
        src={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
        srcSet={jpgSrcSet}
        sizes={THUMBNAIL_SIZES}
        alt={`Thumbnail for ${title}`}
        width={480}
        height={360}
        className="w-full h-full object-cover"
      />
    </picture>
  );
}
