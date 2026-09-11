import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode } from 'react';
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
      <Container>
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
   from its neighbour where the argument turns.

   ---------------------------------------------------------------------------
   PHASE J — STAGE 1 — J9 COMPOSITION MODES.

   THE MEASURED PROBLEM (docs/28-phase-j-visual-interaction/01_QUANTITATIVE_BASELINE.md):
   **110 of 112 commercial sections — 98.2% — began at exactly the same left
   x-coordinate**, because every route composes through this one component and
   this component had exactly one composition. The site read as a single column
   no matter how well any individual section was written.

   WHAT A MODE MAY AND MAY NOT DO. A mode changes grid, width, placement and
   white space. It NEVER changes copy, DOM order, heading level or the reading
   measure. `editorial` is the default and its output is unchanged, so every
   call site that does not opt in renders exactly what it rendered before —
   which is what keeps /contact, /thank-you, /schedule-call and 404 untouched.

   HOW A MODE IS APPLIED — one token per call site. The children are partitioned
   HERE, by component identity, into the chapter label and everything else. A
   page therefore opts in by writing `mode="split"` and nothing else: no JSX is
   restructured, no wrapper is introduced at the call site, and there is no
   fragile CSS child-position selector that a later edit could silently break.

   §9 — NO EMPTY COLUMNS, GUARANTEED STRUCTURALLY. A two-column mode needs a
   ChapterLabel to fill its rail. If a section has none, the mode DEGRADES TO
   `editorial` rather than rendering a column with nothing in it. A split with
   an empty side is not an improvement, and this component cannot produce one.

   RESPONSIVE. Every two-column mode is single-column below 1081 (WIDE). Narrow
   and medium keep today's vertical reading flow exactly, in DOM order, so the
   validated mobile composition is not disturbed to solve a desktop problem.

   THE HOMEPAGE IS STRUCTURALLY OUT OF REACH: app/page.tsx and components/homepage/*
   import neither this module nor anything in it. Verified by grep, not assumed.
   ========================================================================== */

export type SectionMode =
  /** today's single reading column — the default, and unchanged */
  | 'editorial'
  /** chapter label in a left rail, the reading in the wide column beside it */
  | 'split'
  /** the reading leads and the chapter label annotates from the right margin */
  | 'reverse'
  /** one narrow centred column — for a chapter that is a single statement */
  | 'statement'
  /** label above, content released from the reading measure — figures, systems */
  | 'wide';

function formatSectionChildren(children: ReactNode) {
  const kids = Children.toArray(children);
  const hasDisplay = kids.some(
    (k) => isValidElement(k) && k.type === Display
  );

  return kids.map((k) => {
    if (isValidElement(k) && k.type === ChapterLabel) {
      const props = k.props as { as?: string };
      if (!props.as && !hasDisplay) {
        return cloneElement(k, { as: 'h2' } as any);
      }
    }
    return k;
  });
}

export function CommercialSection({
  id,
  children,
  tone = 'ground',
  rule = true,
  mode = 'editorial',
  className,
}: {
  id?: string;
  children: ReactNode;
  tone?: 'ground' | 'paper';
  rule?: boolean;
  mode?: SectionMode;
  className?: string;
}) {
  const shell = cn(
    'py-[var(--resolve-section-md)] text-resolve-ink',
    tone === 'paper' ? 'bg-resolve-paper' : 'bg-resolve-ground',
    rule && 'border-t border-resolve-line',
    className
  );

  /* Partition by component identity. `k.type === ChapterLabel` is a reference
     comparison against the very function exported below, so it cannot match a
     look-alike and cannot drift when a class name changes. A label nested
     inside a wrapper element is not a direct child and is correctly NOT
     matched — the section then degrades to `editorial`, which is safe. */
  const formattedKids = formatSectionChildren(children);
  const railKids = formattedKids.filter((k) => isValidElement(k) && k.type === ChapterLabel);
  const mainKids = formattedKids.filter((k) => !(isValidElement(k) && k.type === ChapterLabel));

  const twoColumn = mode === 'split' || mode === 'reverse';
  const effective: SectionMode = twoColumn && railKids.length === 0 ? 'editorial' : mode;

  if (effective === 'editorial') {
    return (
      <section id={id} className={shell}>
        <Container>{formattedKids}</Container>
      </section>
    );
  }

  if (effective === 'statement') {
    /* A centred reading column. The measure is NOT widened — the column is
       moved, not stretched — so line length stays inside the validated range. */
    return (
      <section id={id} className={shell}>
        <Container>
          <div className="mx-auto max-w-[68ch] min-[1081px]:text-center [&_p]:mx-auto">{formattedKids}</div>
        </Container>
      </section>
    );
  }

  if (effective === 'wide') {
    /* The label keeps the reading measure; the content below it is released
       from it, so a figure or a system can use the full 1400 without the
       running text ever being set at a width nobody can read. */
    return (
      <section id={id} className={shell}>
        <Container>
          {railKids}
          {/* The wrapper supplies the gap after the label, so the first child's
              own top margin is zeroed — otherwise Display's `mt-[18px]` and this
              margin both apply and the chapter opens with a double gap. */}
          <div className="mt-[clamp(20px,2.4vw,34px)] [&>*:first-child]:mt-0">{mainKids}</div>
        </Container>
      </section>
    );
  }

  /* split / reverse. DOM ORDER IS ALWAYS LABEL-FIRST in both, so the heading
     precedes the content it heads for a screen reader and for a reader with no
     CSS. `reverse` moves the label to the right rail by explicit grid column
     placement rather than by reordering the markup. */
  const grid =
    effective === 'split'
      ? 'min-[1081px]:grid-cols-[var(--resolve-rail)_minmax(0,1fr)]'
      : 'min-[1081px]:grid-cols-[minmax(0,1fr)_var(--resolve-rail)]';

  return (
    <section id={id} className={shell}>
      <Container>
        <div className={cn('min-[1081px]:grid min-[1081px]:gap-x-[var(--resolve-rail-gap)]', grid)}>
          <div
            className={cn(
              'min-[1081px]:row-start-1',
              effective === 'split' ? 'min-[1081px]:col-start-1' : 'min-[1081px]:col-start-2'
            )}
          >
            {railKids}
          </div>
          <div
            className={cn(
              'min-[1081px]:row-start-1',
              effective === 'split' ? 'min-[1081px]:col-start-2' : 'min-[1081px]:col-start-1',
              /* The reading column's own wrapper carries the gap after the
                 label in the stacked layout; at WIDE the two columns are
                 aligned at the top and need none. The first child's own top
                 margin is zeroed at EVERY width — applying the reset only at
                 WIDE left the stacked layout with Display's `mt-[18px]` on top
                 of this wrapper's margin, i.e. a double gap on mobile. */
              'max-[1080px]:mt-[18px] [&>*:first-child]:mt-0'
            )}
          >
            {mainKids}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------- opener compositions --
   PHASE J — STAGE 3. Shared composition classes for the two hero components
   (`CommercialHero` and `routes/primitives.RouteHero`) and for
   `CommercialClose`. They live here so the two openers cannot drift apart, and
   so there is exactly one place where the WIDE breakpoint for an opener is
   written down.

   ---------------------------------------------------------------------------
   WHY THESE MODES CARRY NO FIGURE, NO PREVIEW AND NO LATERAL SUPPORT.

   **I2 / B27 — zero apparatus above the fold — is binding and has no width
   exception** (`docs/16-ux/05_COMMERCIAL_PAGE_UX.md` I2, `03_PAGE_TYPE_ARCHITECTURE.md`
   §"First screen", `32_WIREFRAME_MASTER_COMMERCIAL.md`). No figure, no proof
   module, no evidence badge, no metric and no system preview may render in a
   commercial first screen. Both hero components were deliberately built with
   **no figure slot at all** so a route author could not violate that by
   oversight, and Stage 3 does not add one.

   These modes are therefore **pure typographic composition**: they move the
   eyebrow, the H1, the lede and the action pair relative to one another. They
   add nothing to the page and remove nothing from it.

   §9 — NO EMPTY COLUMNS. Every two-column opener mode puts real content in both
   columns by construction: `split` pairs (eyebrow + H1) against (lede +
   action), and `offset` pairs the eyebrow rail against (H1 + lede + action).
   Neither can render a column with nothing in it, because every hero has an
   eyebrow and an H1 and every commercial hero has a lede.

   RESPONSIVE. Every mode is a single column below 1081px, in DOM order. Narrow
   and medium therefore render exactly what they rendered before Stage 3.
   ========================================================================== */

export type OpenerMode = 'editorial' | 'split' | 'offset' | 'centred';

/** The grid that a two-column opener mode applies at WIDE. */
export const OPENER_GRID: Record<OpenerMode, string> = {
  editorial: '',
  split: 'min-[1081px]:grid min-[1081px]:grid-cols-[var(--resolve-rail)_minmax(0,1fr)] min-[1081px]:gap-x-[var(--resolve-rail-gap)] min-[1081px]:items-start',
  offset: 'min-[1081px]:grid min-[1081px]:grid-cols-[var(--resolve-rail)_minmax(0,1fr)] min-[1081px]:gap-x-[var(--resolve-rail-gap)] min-[1081px]:items-start',
  centred: '',
};

/** Applied to the block that holds everything after the rail. */
export const OPENER_MAIN: Record<OpenerMode, string> = {
  editorial: '',
  split: 'min-[1081px]:col-start-2 min-[1081px]:row-start-1',
  offset: 'min-[1081px]:col-start-2 min-[1081px]:row-start-1',
  centred: '',
};

/** Applied to the rail block (the eyebrow, and in `split` the H1 as well). */
export const OPENER_RAIL: Record<OpenerMode, string> = {
  editorial: '',
  split: 'min-[1081px]:col-start-1 min-[1081px]:row-start-1',
  offset: 'min-[1081px]:col-start-1 min-[1081px]:row-start-1',
  centred: '',
};

/* ------------------------------------------------------------ chapter label --
   The `.lab` treatment: a small uppercase label that IS the section's real
   heading element, so heading-only navigation delivers the argument. The large
   line beneath it is approved body copy set at scale — never promoted to a
   heading. (02_COMPONENT_MAP.md §3, "load-bearing for accessibility".) */
export function ChapterLabel({ children, as = 'p' }: { children: ReactNode; as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div' }) {
  const Tag = as;
  return (
    <Tag className="m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
      {children}
    </Tag>
  );
}

/** The display line beneath a chapter label. Main section heading. */
export function Display({ children, className, as = 'h2' }: { children: ReactNode; className?: string; as?: 'h1' | 'h2' | 'h3' | 'h4' }) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        'mt-[18px] max-w-[24ch] font-heading text-[clamp(1.6rem,3.4vw,2.7rem)] font-extrabold leading-[1.0] tracking-[-0.035em]',
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('mt-[22px] max-w-none text-[clamp(1.06rem,1.35vw,1.28rem)] leading-relaxed', className)}>
      {children}
    </p>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('mt-4 max-w-[58ch] text-[1.02rem] leading-relaxed', className)}>{children}</p>;
}

export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('mt-4 text-[.94rem] leading-[1.55] text-resolve-dim', className)}>{children}</p>
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
