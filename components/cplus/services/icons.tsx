import type { ReactNode } from 'react';
import type { Icon } from './content';

/**
 * Services glyphs: the approved G1 mockup's own line icons (24px grid, 2px stroke, square caps). Page-local, so the shared
 * ../Icons set stays unchanged. Decorative only: always aria-hidden.
 */
const G: Record<Icon, ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  mail: (
    <>
      <path d="M3 6h18v12H3z" />
      <path d="m3 7 9 6.5L21 7" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7 15 4-4 3 3 5-6" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1-4 3.5-6 7-6s6 2 7 6" />
    </>
  ),
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

export function Glyph({ name, className = 'sx-gl' }: { name: Icon; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {G[name]}
    </svg>
  );
}
