import type { ReactNode } from 'react';

export function SectionHeading({ id, eyebrow, children }: { id: string; eyebrow: string; children: ReactNode }) {
  return <header className="pa-section-heading"><p className="pa-eyebrow">{eyebrow}</p><h2 id={id}>{children}</h2></header>;
}
