interface Props {
  children?: React.ReactNode;
}

export function Paragraph( { children }: Props ): JSX.Element {
  return <p className="my-2">{ children }</p>;
}
