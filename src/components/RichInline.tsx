import { Fragment, ReactNode } from 'react';

export default function RichInline({ text, strongClassName }: { text: string; strongClassName?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    const match = part.match(/^\*\*([^*]+)\*\*$/);
    if (match) {
      nodes.push(
        <Fragment key={`s-${i}`}>
          <strong className={strongClassName}>{match[1]}</strong>
        </Fragment>
      );
    } else if (part) {
      nodes.push(<Fragment key={`t-${i}`}>{part}</Fragment>);
    }
  });
  return <>{nodes}</>;
}
