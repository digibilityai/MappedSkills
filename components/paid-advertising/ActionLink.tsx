import Link from 'next/link';
import type { ReactNode } from 'react';

export function ActionLink({ href = '/contact', children = 'Discuss Your Advertising', variant = 'primary' }: {
  href?: string; children?: ReactNode; variant?: 'primary' | 'text' | 'dark';
}) {
  return <Link className={`pa-action pa-action--${variant}`} href={href}>
    {children}<span aria-hidden="true">↗</span>
  </Link>;
}
