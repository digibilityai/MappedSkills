import type { ReactNode } from 'react';
import type { PricingIcon } from './content';

/**
 * Pricing glyphs: the approved G1 mockup's own line icons (24px grid, 2px stroke, square caps). Page-local, so the shared
 * ../Icons set stays unchanged. Decorative only: always aria-hidden.
 */
const G: Record<PricingIcon, ReactNode> = {
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
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plan: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M9 11h7M9 15h5" />
    </>
  ),
  ok: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.3 2.8 2.8L16.2 9.6" />
    </>
  ),
};

export function Glyph({ name, className = 'pr-gl' }: { name: PricingIcon; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {G[name]}
    </svg>
  );
}
