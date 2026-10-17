import type { ReactNode } from 'react';

/**
 * How It Works glyphs: the approved G1 R2 mockup's own line icons (24px grid, 2px stroke, square caps). Kept page-local so
 * the shared ../Icons set stays unchanged; it lacks several of these and draws others differently. Decorative only.
 */
const G: Record<string, ReactNode> = {
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  plan: (
    <>
      <path d="M7 4h10v3H7z" />
      <path d="M5 6h2M17 6h2v14H5V6" />
      <path d="m8.5 13 2.5 2.5 4.5-5" />
    </>
  ),
  trend: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7 15 4-4 3 3 5-6" />
    </>
  ),
  reply: (
    <>
      <path d="M3 11 21 4l-7 17-3-7z" />
      <path d="m11 14 4-4" />
    </>
  ),
  phone: <path d="M6 3h4l1.5 4.5-2.5 1.5a11 11 0 0 0 6 6l1.5-2.5L21 14v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r=".6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 2" />
    </>
  ),
  cross: <path d="m7 7 10 10M17 7 7 17" />,
  key: (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M18 12v3M15 12v2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4.5 4-6.5 8-6.5s7 2 8 6.5" />
    </>
  ),
  devices: <path d="M3 5h13v9H3zM1 17h17M18 9h5v11h-5z" />,
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6z" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.5 0l3-3a4 4 0 0 0-5.5-5.5l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.5 0l-3 3a4 4 0 0 0 5.5 5.5l1-1" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M7 20h10M5 7h14" />
      <path d="m5 7-3 6h6zM19 7l-3 6h6z" />
    </>
  ),
  loop: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v4h-4" />
    </>
  ),
};

export function Glyph({ name }: { name: string }) {
  return (
    <svg className="hx-g" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {G[name]}
    </svg>
  );
}
