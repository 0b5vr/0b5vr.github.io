interface Props {
  url: string;
}

export function YouTube({ url }: Props): JSX.Element {
  return (
    <iframe
      src={url}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full aspect-video"
    />
  );
};
