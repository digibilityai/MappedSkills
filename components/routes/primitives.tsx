import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import {
  ActionPair,
  Mark,
  OPENER_GRID,
  OPENER_MAIN,
  OPENER_RAIL,
  type OpenerMode,
} from '@/components/commercial/primitives';
import { cn } from '@/lib/utils';

/**
 * SESSION 29 — PHASE G — shared primitives for the remaining route archetypes.
 *
 * Phase F built the commercial/capability primitives. Phase G's routes are NOT
 * commercial/capability routes and must not be forced through that shape: a
 * problem diagnostic, a methodology page, a pricing surface, an entity page, a
 * support page, two conversion surfaces, a post-conversion page and two indexes
 * have nine different jobs. What they legitimately share is the Resolve system
 * itself — typography, the accent ramp, the four mark states, the hairline
 * rule, spatial rhythm and the CTA architecture — and that is what this file
 * carries. Everything in `components/commercial/primitives.tsx` that is a pure
 * Resolve primitive (Mark, CommercialSection, ChapterLabel, Display, Lede,
 * Body, Note, ProofLink, ActionPair) is imported and reused rather than
 * duplicated.
 *
 * Every component here is a SERVER COMPONENT. No Phase G route has a client
 * leaf, so the no-JS build and the rendered build are the same DOM.
 */

/* ------------------------------------------------------------- breadcrumb --
   A generic trail. `href: null` renders a crumb as plain text — used by
   `/problems/traffic-but-no-enquiries`, where `07_NAVIGATION_ARCHITECTURE.md`
   §6 requires "Problems" to be a label and NOT a link, because no problems hub
   exists and a link to one would advertise a family with one member.

   The visible crumb and the emitted `BreadcrumbList` are generated from THE
   SAME ARRAY, so they cannot drift. A crumb with no href emits a `ListItem`
   carrying only its name — which is what schema.org permits for a step with no
   address — rather than being silently dropped from the emitted trail. */
export type Crumb = { name: string; href: string | null };

export function RouteBreadcrumb({ trail }: { trail: Crumb[] }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';

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
              ...(crumb.href ? { item: `${base}${crumb.href === '/' ? '' : crumb.href}` } : {}),
            })),
          }),
        }}
      />
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        {/* 40px minimum height on every crumb: Phase B's floor is "0 targets
            under 40x40" and a 26px-tall breadcrumb link fails it. */}
        <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 py-1 text-[.84rem] font-medium text-resolve-dim">
          {trail.map((crumb, i) => (
            <li key={crumb.name} className="m-0 flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-resolve-gap">
                  /
                </span>
              )}
              {i === trail.length - 1 ? (
                <span className="inline-flex min-h-[40px] items-center font-semibold text-resolve-ink" aria-current="page">
                  {crumb.name}
                </span>
              ) : crumb.href ? (
                <Link
                  href={crumb.href}
                  className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center text-resolve-dim no-underline hover:underline"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="inline-flex min-h-[40px] items-center text-resolve-gap">{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}

/* ------------------------------------------------------------------- hero --
   The Phase G opener. It differs from `CommercialHero` in exactly one
   structural way, and the difference is load-bearing: THE ACTION IS OPTIONAL.
   `06_PROBLEM_PAGE_UX.md` §2 and §6 forbid any CTA above the fold on the
   problem page — "nothing above the fold may assume they are buying" — and
   `/thank-you` has no ask at all. A hero that always rendered a CTA pair would
   make that rule something each route had to remember; here it is structural.

   Apparatus is impossible here for the same reason as in Phase F: this
   component accepts no figure slot, so I2/B27 ("zero apparatus on the first
   screen") cannot be violated by a route author's oversight.

   `size` steps the H1 down for the two conversion surfaces and `/thank-you`,
   where mandatory stillness (M6) means the page is the surface, not a pitch. */
export function RouteHero({
  eyebrow,
  title,
  lede,
  action,
  secondaryLabel,
  size = 'full',
  mode = 'editorial',
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** omit entirely where the archetype forbids a CTA in the first screen */
  action?: string;
  secondaryLabel?: string;
  size?: 'full' | 'quiet';
  /** PHASE J STAGE 3 — composition only, never a figure slot (I2/B27) */
  mode?: OpenerMode;
  children?: ReactNode;
}) {
  /* §9 — NO EMPTY COLUMNS. `split` puts the eyebrow and the H1 in the rail and
     everything else in the reading column, so a hero with no lede, no children
     and no action would render a column with nothing in it. `RouteHero` is the
     one opener where that is possible, because `lede` and `action` are both
     optional on it. Such a hero DEGRADES TO `editorial` rather than rendering
     the empty half. `offset` and `centred` cannot hit this: the H1 is always in
     the reading column and the eyebrow is always in the rail. */
  const hasReading = Boolean(lede || children || action);
  const effective: OpenerMode = mode === 'split' && !hasReading ? 'editorial' : mode;

  return (
    <section className="bg-resolve-ground pb-[clamp(40px,5.4vw,88px)] pt-[clamp(32px,4.4vw,72px)] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <div className={OPENER_GRID[effective]}>
          <div className={OPENER_RAIL[effective]}>
            <p className="m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
              {eyebrow}
            </p>
            {effective === 'split' && (
              <h1
                className={cn(
                  'm-0 mt-[clamp(14px,1.8vw,22px)] font-heading font-extrabold leading-[1.0] tracking-[-0.038em]',
                  size === 'full'
                    ? 'max-w-[19ch] text-[clamp(2rem,3.4vw,3.1rem)]'
                    : 'max-w-[17ch] text-[clamp(1.85rem,3vw,2.6rem)]'
                )}
              >
                {title}
              </h1>
            )}
          </div>

          <div className={OPENER_MAIN[effective]}>
            {effective !== 'split' && (
              <h1
                className={cn(
                  'm-0 mt-[clamp(14px,1.8vw,22px)] font-heading font-extrabold leading-[0.99] tracking-[-0.038em]',
                  size === 'full'
                    ? 'max-w-[19ch] text-[clamp(2rem,4.6vw,3.9rem)]'
                    : 'max-w-[17ch] text-[clamp(1.85rem,3.7vw,3.1rem)]',
                  effective === 'centred' && 'min-[1081px]:mx-auto',
                  effective === 'offset' && 'min-[1081px]:mt-0'
                )}
              >
                {title}
              </h1>
            )}
            {(lede || children) && (
              <div
                className={cn(
                  'mt-[clamp(20px,2.4vw,30px)] max-w-[58ch] text-[clamp(1.04rem,1.25vw,1.2rem)] leading-relaxed text-resolve-dim [&>p+p]:mt-4',
                  effective === 'centred' && 'min-[1081px]:mx-auto',
                  effective === 'split' && 'min-[1081px]:mt-0'
                )}
              >
                {lede && <p className="m-0">{lede}</p>}
                {children}
              </div>
            )}
            {action && (
              <div className={cn(effective === 'centred' && 'min-[1081px]:[&>div]:justify-center')}>
                <ActionPair primaryLabel={action} secondaryLabel={secondaryLabel} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------- finding rows --
   Move 6 of the problem page, and the same shape wherever a set of outcomes
   must be read as PEERS.

   `06_PROBLEM_PAGE_UX.md` §5 is the binding constraint and it is a credibility
   rule, not a styling one: three of the six findings point AWAY from the firm,
   and they get "equal visual weight to the outcomes that do route to the firm.
   Not smaller, not greyer, not italic, not a footnote", "never collapsed by
   default, never behind a disclosure, never below the CTA", and never
   reordered. This component therefore has NO emphasis prop, NO collapse and NO
   ordering control: every row is rendered identically, in array order. The
   only way to weaken an away-pointing finding here is to delete it. */
export type Finding = { term: ReactNode; body: ReactNode };

export function FindingList({ items }: { items: Finding[] }) {
  return (
    <dl className="m-0 mt-[clamp(24px,3vw,40px)] border-t-2 border-resolve-ink p-0">
      {items.map((item, i) => (
        <div key={i} className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
          <dt className="m-0 max-w-[46ch] font-heading text-[clamp(1.1rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
            {item.term}
          </dt>
          <dd className="m-0 mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-resolve-dim">{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ----------------------------------------------------------- stated list --
   A short list of plain statements — "who this is not for", "what we need from
   you", "what we cannot measure". Hairline rows, no cards, no icons, no tiles
   (B14/A13). `mark` renders the open dashed mark where the list is a set of
   limits; the meaning is always also in the words, so the mark carries nothing
   alone and is hidden from assistive technology. */
export function StatedList({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn('m-0 mt-[clamp(20px,2.4vw,32px)] list-none border-t border-resolve-line p-0', className)}>
      {items.map((item, i) => (
        <li key={i} className="max-w-[64ch] border-b border-resolve-line py-[clamp(12px,1.6vw,18px)] text-[1.02rem] leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ entry rows --
   The index treatment for `/work` and `/blog`. `03_PAGE_ARCHETYPES.md` §1
   archetype 9: "hairline rows, not card grids". A row renders only for an item
   that genuinely exists — the component has no empty-slot rendering path at
   all, so it cannot produce a placeholder card, a skeleton or a "coming soon"
   entry even if a caller passed an empty array. */
export type Entry = { href: string; title: string; meta?: string; summary?: string };

/* ------------------------------------------------------- state comparison --
   PHASE J — STAGE 3 — Prototype C, translated to production.
   (docs/28-phase-j-visual-interaction/prototype/prototype-c-fit-boundary.html,
   approved at the Phase J design gate as a future primitive.)

   THE PROBLEM IT SOLVES. `/about` §5 rendered two `StatedList` blocks one after
   the other — six sentences at one left edge, visually identical, distinguished
   only by the fact that the last three begin with the word "Not". The single
   most important fact about the section — that it has two halves and a line
   between them — was carried by a word, not by the composition.

   NO NEW COPY. The two half-labels are taken VERBATIM from the section's own
   approved heading and display line ("Who we work with" / "And who we do not").
   Nothing is written for this component and nothing is deleted for it.

   SEMANTIC EQUALITY. The two halves are EQUAL WIDTH at every viewport. No area,
   width, count badge or ordering implies that one set is larger, more likely or
   more important than the other — the approved copy establishes no such thing.
   The marks are the site's existing two states: `owned` for a condition that is
   met, `open` (dashed) for one that is not, which is the same dashed-means-
   not-established convention used everywhere else on the site.

   PROOF BOUNDARY. This is a comparison of STATED FIT CRITERIA. It is not
   evidence, not a result, not a client count and not a claim about anything the
   firm has done. It cannot become one, because it renders only the two arrays
   it is given.

   STATIC. Prototype C carried one T2 — the boundary rule drawing itself in.
   **It is deliberately not implemented.** The composition already states that
   there are two halves and a limit between them, the motion budget records that
   "zero is a legitimate answer for T1 and T2", and spending the route's single
   T2 on a rule that is already visible would buy nothing. `/about` therefore
   ships with NO client component and NO JavaScript from this change. */
export function StateComparison({
  aLabel,
  aItems,
  bLabel,
  bItems,
}: {
  aLabel: string;
  aItems: ReactNode[];
  bLabel: string;
  bItems: ReactNode[];
}) {
  const half = (label: string, items: ReactNode[], met: boolean) => (
    <div
      className={cn(
        met
          ? ''
          : /* Below WIDE the two halves stack, so the limit between them has to
               become a horizontal rule — a 1px vertical hairline between
               stacked blocks says nothing. Above WIDE the shared rule element
               takes over and this border is removed. */
            'mt-[clamp(26px,3vw,38px)] border-t-2 border-resolve-ink pt-[clamp(24px,2.8vw,34px)] min-[1081px]:mt-0 min-[1081px]:border-t-0 min-[1081px]:pt-0'
      )}
    >
      <h3
        className={cn(
          'm-0 text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em]',
          met ? 'text-resolve-accent-dark' : 'text-resolve-gap'
        )}
      >
        {label}
      </h3>
      <ul className="m-0 mt-2 list-none p-0">
        {items.map((item, i) => (
          <li
            key={i}
            className={cn(
              'm-0 grid grid-cols-[15px_1fr] items-start gap-x-[14px] border-b border-resolve-line py-[clamp(14px,1.7vw,20px)] text-[clamp(1rem,1.35vw,1.1rem)] leading-[1.45] last:border-b-0',
              met ? 'text-resolve-ink' : 'text-resolve-dim'
            )}
          >
            <Mark state={met ? 'owned' : 'open'} size={15} className="mt-[4px]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="mt-[clamp(28px,3.4vw,48px)] min-[1081px]:grid min-[1081px]:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] min-[1081px]:items-start min-[1081px]:gap-x-[clamp(28px,4vw,64px)]">
      {half(aLabel, aItems, true)}
      {/* The limit. Decorative only: both halves are named by their own real
          headings, so nothing here is carried by the rule alone. */}
      <div aria-hidden="true" className="hidden min-[1081px]:block min-[1081px]:h-full min-[1081px]:w-px min-[1081px]:bg-resolve-ink" />
      {half(bLabel, bItems, false)}
    </div>
  );
}

export function EntryList({ entries }: { entries: Entry[] }) {
  if (entries.length === 0) return null;
  return (
    <ul className="m-0 mt-[clamp(24px,3vw,40px)] list-none border-t-2 border-resolve-ink p-0">
      {entries.map((entry) => (
        <li key={entry.href} className="border-b border-resolve-line">
          <Link
            href={entry.href}
            className="grid grid-cols-1 gap-x-[clamp(20px,3vw,52px)] gap-y-2 py-[clamp(16px,2vw,26px)] no-underline min-[900px]:grid-cols-[minmax(0,20ch)_1fr]"
          >
            {entry.meta && (
              <span className="text-[.82rem] font-semibold uppercase leading-[1.5] tracking-[0.14em] text-resolve-dim">
                {entry.meta}
              </span>
            )}
            <span className="block">
              <span className="block max-w-[46ch] font-heading text-[clamp(1.1rem,1.9vw,1.4rem)] font-bold leading-[1.2] tracking-[-0.03em] text-resolve-ink underline decoration-resolve-line decoration-2 underline-offset-4">
                {entry.title}
              </span>
              {entry.summary && (
                <span className="mt-2 block max-w-[58ch] text-[1.0rem] leading-relaxed text-resolve-dim">
                  {entry.summary}
                </span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
