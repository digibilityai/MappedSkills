import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

/**
 * SESSION 28 — PHASE F — shared commercial primitives.
 *
 * The smallest set of Resolve primitives the seven commercial routes actually
 * share. Everything here is a SERVER COMPONENT and every Phase F route is
 * static: there is no client leaf, no observer, no start state and therefore
 * no no-JS gap to close. Motion on these routes is exactly what shared chrome
 * already provides (docs/27-production-translation/16_PHASE_F_COMMERCIAL_ROUTES.md
 * §"Motion").
 *
 * WHY THESE ROUTES DO NOT REPRODUCE THE HOMEPAGE:
 * the shared identity is carried by typography, the accent ramp, the four mark
 * states, spatial rhythm and the hairline rule — never by repeating the
 * homepage's chapter sequence (ACTIVITY → ATTENTION → FRICTION → INTERVENTION →
 * RESOLUTION → ACCOUNTABILITY → ACTION). Each route's own move order is the one
 * frozen in docs/16-ux/23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md §3, and the
 * type scale here sits one rank below the homepage's deliberately: the homepage
 * carries the site's only T1 and its only surface inversions, and a commercial
 * route that shouted as loudly would flatten that hierarchy.
 */

/* -------------------------------------------------------------------- marks --
   The four mark states, each carrying ONE meaning everywhere on the site:
   named (solid ink) · anonymous (dim) · unattributed/open (dashed) · owned
   (tangerine). Transcribed from the homepage's own usage so the two surfaces
   read as one system. Always aria-hidden — every mark's meaning is also in
   adjacent text, so nothing is carried by shape or colour alone. */
export function Mark({
  state = 'named',
  size = 13,
  className,
}: {
  state?: 'named' | 'anonymous' | 'open' | 'owned';
  size?: number;
  className?: string;
}) {
  const fill: Record<string, CSSProperties> = {
    named: { background: 'var(--resolve-ink)' },
    anonymous: { background: 'var(--resolve-dim)', opacity: 0.42 },
    open: { background: 'transparent', border: '2px dashed var(--resolve-gap)' },
    owned: { background: 'var(--resolve-accent-deep)' },
  };
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block flex-none', className)}
      style={{ width: size, height: size, ...fill[state] }}
    />
  );
}

/* ------------------------------------------------------------- breadcrumb --
   I11: present on every capability route, and the visible crumb and the emitted
   `BreadcrumbList` are generated FROM THE SAME ARRAY here, so the two cannot
   drift apart the way they did when each route hand-wrote both. `/services` is
   top level and carries no breadcrumb at all. */
export function Breadcrumb({ label, path }: { label: string; path: string }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'What we do', href: '/services' },
    { name: label, href: path },
  ];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-resolve-line bg-resolve-ground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: trail.map((crumb, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: crumb.name,
              item: `${base}${crumb.href === '/' ? '' : crumb.href}`,
            })),
          }),
        }}
      />
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        {/* Every crumb link is a real 40px-tall control. Phase B's floor is
            "0 targets under 40x40" and a 26px-tall breadcrumb link fails it;
            the separators sit between them, so no two hit areas overlap. */}
        <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 py-1 text-[.84rem] font-medium text-resolve-dim">
          {trail.map((crumb, i) => (
            <li key={crumb.href} className="m-0 flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-resolve-gap">
                  /
                </span>
              )}
              {i === trail.length - 1 ? (
                <span className="inline-flex min-h-[40px] items-center font-semibold text-resolve-ink" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center text-resolve-dim no-underline hover:underline"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}

/* ----------------------------------------------------------------- section --
   Rhythm, not decoration. `tone` never changes meaning; it separates a chapter
   from its neighbour where the argument turns. */
export function CommercialSection({
  id,
  children,
  tone = 'ground',
  rule = true,
  className,
}: {
  id?: string;
  children: ReactNode;
  tone?: 'ground' | 'paper';
  rule?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-[clamp(46px,6vw,104px)] text-resolve-ink',
        tone === 'paper' ? 'bg-resolve-paper' : 'bg-resolve-ground',
        rule && 'border-t border-resolve-line',
        className
      )}
    >
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">{children}</Container>
    </section>
  );
}

/* ------------------------------------------------------------ chapter label --
   The `.lab` treatment: a small uppercase label that IS the section's real
   heading element, so heading-only navigation delivers the argument. The large
   line beneath it is approved body copy set at scale — never promoted to a
   heading. (02_COMPONENT_MAP.md §3, "load-bearing for accessibility".) */
export function ChapterLabel({ children, as = 'h2' }: { children: ReactNode; as?: 'h2' | 'h3' }) {
  const Tag = as;
  return (
    <Tag className="m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
      {children}
    </Tag>
  );
}

/** The display line beneath a chapter label. Body copy at scale, not a heading. */
export function Display({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'mt-[18px] max-w-[24ch] font-heading text-[clamp(1.6rem,3.4vw,2.7rem)] font-extrabold leading-[1.0] tracking-[-0.035em]',
        className
      )}
    >
      {children}
    </p>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('mt-[22px] max-w-[46ch] text-[clamp(1.04rem,1.25vw,1.2rem)] leading-relaxed', className)}>
      {children}
    </p>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('mt-4 max-w-[58ch] text-[1.02rem] leading-relaxed', className)}>{children}</p>;
}

export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('mt-4 max-w-[52ch] text-[.94rem] leading-[1.55] text-resolve-dim', className)}>{children}</p>
  );
}

/* ------------------------------------------------------------- proof links --
   Underlined text — an offer, never a gate and never a third button. Given a
   44px minimum height as a control target without forcing a box around running
   text. */
export function ProofLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-5 inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.98rem] font-semibold no-underline"
      style={{ color: 'var(--resolve-accent-dark)' }}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ actions --
   The frozen CTA architecture: /contact is the primary commercial action on
   every route; booking is secondary. No third button, no sticky bar, no inline
   form. `min-height:52px` is the approved CTA size. */
export function ActionPair({
  primaryLabel,
  secondaryLabel = 'Book a call',
  tone = 'light',
}: {
  primaryLabel: string;
  secondaryLabel?: string;
  tone?: 'light' | 'dark';
}) {
  const primary: CSSProperties =
    tone === 'dark'
      ? { background: 'var(--resolve-accent)', borderColor: 'var(--resolve-accent)', color: 'var(--resolve-ink)' }
      : { background: 'var(--resolve-accent-dark)', borderColor: 'var(--resolve-accent-dark)', color: '#FFFFFF' };
  const secondary: CSSProperties =
    tone === 'dark'
      ? { borderColor: 'var(--resolve-ground)', color: 'var(--resolve-ground)' }
      : { borderColor: 'var(--resolve-ink)', color: 'var(--resolve-ink)' };

  return (
    <div className="mt-[26px] flex flex-wrap gap-3">
      <Link
        href="/contact"
        className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[520px]:basis-full"
        style={primary}
      >
        {primaryLabel}
      </Link>
      <Link
        href="/schedule-call"
        className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[520px]:basis-full"
        style={secondary}
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
