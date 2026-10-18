import type { ReactNode } from 'react';
import type { AboutIcon } from './content';

/**
 * About glyphs: the approved G1 mockup's own line icons (24px grid, 2px stroke, square caps). Page-local, so the shared
 * ../Icons set stays unchanged. Decorative only: always aria-hidden.
 */
const G: Record<AboutIcon, ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  ads: (
    <>
      <path d="M4 10v4h3l7 4V6L7 10z" />
      <path d="M17.5 9.5a3.5 3.5 0 0 1 0 5" />
    </>
  ),
  site: (
    <>
      <path d="M3 5h18v14H3z" />
      <path d="M3 9h18" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7 15 4-4 3 3 5-6" />
    </>
  ),
  mail: (
    <>
      <path d="M3 6h18v12H3z" />
      <path d="m3 7 9 6.5L21 7" />
    </>
  ),
  plan: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="m9 13 2 2 4-4" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </>
  ),
  report: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  talk: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1-4 3.5-6 7-6s6 2 7 6" />
    </>
  ),
};

export function Glyph({ name, className = 'ax-gl' }: { name: AboutIcon; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {G[name]}
    </svg>
  );
}
