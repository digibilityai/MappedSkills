import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { breadcrumbJsonLd, breadcrumbTrail } from '@/components/commercial/primitives';
import { ScopeDisclosure } from '@/components/commercial/ScopeDisclosure';
import { dcDisplay } from '@/components/direction-c/fonts';
// Page-body components only; the chrome half is global (app/direction-c.css).
import '@/app/direction-c-pages.css';

/**
 * UI REVAMP GATE 2 — DIRECTION C (DEC-034) — shared primitives.
 *
 * The approved prototype (docs/ui-revamp/gate-1/prototypes/direction-c-resolution-approved.html)
 * expressed as reusable server components, styled by `app/direction-c.css`.
 * The three Gate 2 routes compose ONLY from this module and its siblings, so
 * Gate 4 can extend Direction C to the remaining routes by composition rather
 * than by copying page markup.
 *
 * Everything here is a Server Component except where a sibling says
 * otherwise. Copy is never written in this module: every word a reader sees
 * arrives from the route, which carries the approved copy.
 */

/* ------------------------------------------------------------------ marks --
   Five states, one meaning each, everywhere: named (ink) · owned (tangerine) ·
   anon (dim, context) · open (dashed, not measured / unattributed) · withheld
   (hatched). Always aria-hidden: every mark's meaning is also in adjacent text. */
export type MarkState = 'named' | 'owned' | 'anon' | 'open' | 'withheld';

export function Mark({ state, className }: { state?: MarkState; className?: string }) {
  return <span aria-hidden="true" className={cn('dc-mk', state, className)} />;
}

/* ------------------------------------------------------------------- page --
   The scope root for a Direction C page body. It carries the `.dc` reset
   scope and the opsz-capable display face (see ./fonts.ts). `className` is
   optional (Gate 4 B2): a page may opt into a second calibrated display
   fallback (`dc-fallback-b`, app/direction-c-pages.css); without it the
   output is unchanged. */
export function DcPage({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('dc', dcDisplay.variable, className)}>
      <FallbackPrimes />
      {children}
    </div>
  );
}

/* OBS-18 (DEC-046) — Firefox does not load a later @font-face in a family
   list while an earlier one is still loading, so while the opsz display face
   downloads it skips the calibrated `local()` fallbacks and sets the display
   roles in Arial Narrow, which re-wraps H1s at the swap. One hidden element
   per calibrated face, in flow BEFORE the page content, names that face first:
   laying it out loads the face before any display text is set. They must stay
   in flow (out-of-flow boxes are laid out after the content: verified not to
   work). Zero height, `visibility: hidden`, `aria-hidden`; the glyph comes from
   CSS generated content, so no text enters the DOM (app/direction-c.css,
   `.dc-font-prime`). No script; other engines already use these faces. */
const PRIMED_FALLBACKS = ['hero', '96', '72', '96b'] as const;

function FallbackPrimes() {
  return PRIMED_FALLBACKS.map((face) => (
    <span key={face} aria-hidden="true" className={`dc-font-prime dc-font-prime--${face}`} />
  ));
}

/* ---------------------------------------------------------------- section --
   Rhythm and surface only. `tone` alternates ground and paper where the
   argument turns; it never carries meaning. */
export function Section({
  id,
  labelledBy,
  tone = 'ground',
  rule = true,
  tight = false,
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: 'ground' | 'paper';
  rule?: boolean;
  tight?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('dc-sec', tight && 'tight', tone === 'paper' ? 'dc-paper' : 'dc-ground', rule && 'dc-rule-top', className)}
    >
      <div className="dc-wrap">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------- type roles --
   The chapter label IS the section's heading element (h2 by default), so
   heading navigation delivers the argument; the statement beneath it is body
   copy at scale and is never promoted to a heading. */
export function Label({
  as: Tag = 'h2',
  id,
  className,
  children,
}: {
  as?: 'h2' | 'h3' | 'p';
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={cn('dc-label', className)}>
      {children}
    </Tag>
  );
}

export function Statement({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('dc-statement', className)}>{children}</p>;
}

export function Lede({ ink = false, className, children }: { ink?: boolean; className?: string; children: ReactNode }) {
  return <p className={cn('dc-lede', ink && 'ink', className)}>{children}</p>;
}

export function Body({ dim = false, className, children }: { dim?: boolean; className?: string; children: ReactNode }) {
  return <p className={cn('dc-body', dim && 'dim', className)}>{children}</p>;
}

export function Note({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('dc-note', className)}>{children}</p>;
}

/** Tertiary link — an offer, never a gate and never a third button. */
export function TLink({ href, dim = false, className, children }: { href: string; dim?: boolean; className?: string; children: ReactNode }) {
  return (
    <Link href={href} className={cn('dc-tlink', dim && 'dim', className)}>
      {children}
      <span className="dc-arr" aria-hidden="true">
        &rarr;
      </span>
    </Link>
  );
}

/** A link inside running text. */
export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="dc-inline-link">
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- actions --
   The frozen CTA architecture, unchanged: /contact is the primary commercial
   action, booking is secondary, no third button, no sticky bar. The mark
   inside each control resolves on hover/focus (Direction C L1). */
export const CONTACT_HREF = '/contact';
export const BOOKING_HREF = '/schedule-call';

export function ActionPair({
  primaryLabel,
  secondaryLabel = 'Book a call',
  className,
}: {
  primaryLabel: string;
  secondaryLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn('dc-actions', className)}>
      <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
        <Mark />
        {primaryLabel}
      </Link>
      <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
        <Mark />
        {secondaryLabel}
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------- breadcrumb --
   Same trail and the same `BreadcrumbList` as the commercial Breadcrumb — the
   structured data is generated by the shared function, so it cannot drift. */
/* `trail` (Gate 4 B4, first consumer /problems/traffic-but-no-enquiries): a
   pre-built trail whose `BreadcrumbList` the CALLER builds with its own trail
   function (`routeTrailJsonLd` in components/routes/primitives.tsx), so the two
   trail builders are not merged and the structured data is the legacy route's,
   byte for byte. A step with `href: null` is a label, not a link. Without
   `trail` the output is unchanged. */
export type CrumbStep = { name: string; href: string | null };

export function Crumb(props: { label: string; path: string } | { trail: CrumbStep[]; jsonLd: string }) {
  const trail: CrumbStep[] = 'trail' in props ? props.trail : breadcrumbTrail(props.label, props.path);
  const jsonLd = 'trail' in props ? props.jsonLd : breadcrumbJsonLd(breadcrumbTrail(props.label, props.path));
  return (
    <nav aria-label="Breadcrumb" className="dc-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ol className="dc-crumb">
        {trail.map((crumb, i) => (
          <li key={crumb.href ?? crumb.name}>
            {i > 0 && (
              <span aria-hidden="true" className="dc-sep">
                /
              </span>
            )}
            {i === trail.length - 1 ? (
              <span aria-current="page">{crumb.name}</span>
            ) : crumb.href ? (
              <Link href={crumb.href}>{crumb.name}</Link>
            ) : (
              <span className="dc-crumb-txt">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------- service opener --
   The "split" opener composition: eyebrow + H1 + first lede in the statement
   column, the second lede in the stands-on column, the action pair beneath.
   No figure slot — I2/B27 (no apparatus above the fold) is binding.
   Gate 4 B4: `side` and `action` are optional (the problem page forbids a CTA
   in its first screen; /pricing has one lede) and `secondaryLabel` passes the
   route's approved booking label through. Each omitted slot renders nothing;
   with all three given as before, the output is unchanged. */
export function ServiceOpener({
  eyebrow,
  title,
  lede,
  side,
  action,
  secondaryLabel,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  side?: ReactNode;
  action?: string;
  secondaryLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="dc-wrap dc-sec tight dc-svc-hero">
      <div className="dc-g12">
        <div className="dc-c-main dc-stack-md">
          <p className="dc-label">{eyebrow}</p>
          <h1 className="dc-display">{title}</h1>
          <Lede ink>{lede}</Lede>
        </div>
        {side && (
          <div className="dc-c-side dc-side">
            <Lede>{side}</Lede>
          </div>
        )}
        {action && <ActionPair primaryLabel={action} secondaryLabel={secondaryLabel} className="dc-svc-actions" />}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ plate --
   Proof as an object: paper, a 3.47:1 boundary, rows of Evidence · Method ·
   Outcome · Limitation. The limitation row sits on ground and is never
   collapsed. Only evidence becomes a plate. */
export function Plate({ label, head, className, children }: { label: string; head?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <article className={cn('dc-plate', className)} aria-label={label}>
      {head && <div className="dc-plate-head">{head}</div>}
      <dl>{children}</dl>
    </article>
  );
}

export function PlateRow({ term, limit = false, children }: { term: string; limit?: boolean; children: ReactNode }) {
  return (
    <div className={cn(limit && 'dc-limit-row')}>
      <dt className={cn(limit && 'limit')}>{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

/* ----------------------------------------------------------- not promised --
   The accountability boundary's left half: what is not ours to promise,
   each line carrying the open (dashed) mark and struck through.
   Gate 4 B4 (/pricing "who this is not for"): accepts any stated list —
   `label` is optional and items may be sentences (`prose` sets them as
   running text, each in its own box beside the mark). With a label and string
   items, as before, the output is unchanged. */
export function NotPromised({
  label,
  items,
  closing,
  prose = false,
}: {
  label?: string;
  items: ReactNode[];
  closing?: ReactNode;
  prose?: boolean;
}) {
  return (
    <div className={cn('dc-notp', prose && 'dc-notp-prose')}>
      {label && <p className="dc-label">{label}</p>}
      <ul>
        {items.map((item, i) => (
          <li key={typeof item === 'string' ? item : i}>
            <Mark state="open" />
            {prose ? <span>{item}</span> : item}
          </li>
        ))}
      </ul>
      {closing && <p className="dc-closing">{closing}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------- fit --
   Where the work fits and where it does not. Owned mark and a solid rule
   against the open mark and a dashed rule. */
export function Fit({
  works,
  poor,
  worksLabel = 'This works where',
  poorLabel = 'It is a poor fit where',
}: {
  works: ReactNode;
  poor: ReactNode;
  worksLabel?: string;
  poorLabel?: string;
}) {
  return (
    <div className="dc-g12 dc-fit dc-gap-top-sm">
      <div className="dc-c-half-l">
        <h3>
          <Mark state="owned" />
          {worksLabel}
        </h3>
        <p>{works}</p>
      </div>
      <div className="dc-c-half-r poor">
        <h3>
          <Mark state="open" />
          {poorLabel}
        </h3>
        <p>{poor}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- scope rows --
   A list of what the work involves. Below four items the rows are static;
   at four or more they keep the production disclosure behaviour
   (ScopeDisclosure: server-rendered all-open, collapsed to one only once
   script runs, so no-JS readers and crawlers receive every item). */
export type ScopeItem = { lead: string; body: ReactNode };

/* `numbered` (Gate 4 B3, first consumer /lead-generation): the production
   ScopeList ordinal — order only, never a quantity, rank or score. It is a
   separate flex item before the lead, as in production, so the text and its
   reading order are unchanged. Without it the output is unchanged. */
function ScopeLead({ lead, n }: { lead: string; n?: number }) {
  if (n === undefined) return <>{lead}</>;
  return (
    <>
      <i className="dc-ord">{String(n).padStart(2, '0')}</i>
      <span>{lead}</span>
    </>
  );
}

export function ScopeRows({ items, numbered = false, className }: { items: ScopeItem[]; numbered?: boolean; className?: string }) {
  const list = cn('dc-scope', numbered && 'dc-numbered', className);
  if (items.length < 4) {
    return (
      <ul className={list}>
        {items.map((item, i) => (
          <li key={item.lead}>
            <div className="dc-row">
              <p className="dc-lead">
                <ScopeLead lead={item.lead} n={numbered ? i + 1 : undefined} />
              </p>
              <p className="dc-desc">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ScopeDisclosure>
      <ul className={list}>
        {items.map((item, i) => (
          <li key={item.lead}>
            <details open data-scope-item>
              <summary>
                <span className="dc-lead">
                  <ScopeLead lead={item.lead} n={numbered ? i + 1 : undefined} />
                </span>
                <span className="dc-plus" aria-hidden="true" />
              </summary>
              <p className="dc-desc">{item.body}</p>
            </details>
          </li>
        ))}
      </ul>
    </ScopeDisclosure>
  );
}

/* ----------------------------------------------------------------- figure --
   Gate 4 B3 (first consumer /ai-seo). The frame for an explanatory object
   that is built from HTML (a table, a pair of lists): its visible caption as
   a label, the object, and the notes that travel with it. Captions and notes
   are the route's copy, passed through. The inherited SVG chain figures carry
   their own <figure> and caption and are NOT wrapped in this (no nested
   figures): they sit in a plain `.dc-figure` block, as on /seo. */
export function Figure({ caption, className, children }: { caption: ReactNode; className?: string; children: ReactNode }) {
  return (
    <figure className={cn('dc-fig', className)}>
      <figcaption className="dc-label">{caption}</figcaption>
      {children}
    </figure>
  );
}

/* -------------------------------------------------------------- data table --
   Gate 4 B3 (first consumer /ai-seo; /pricing in B4). Rules only: no zebra,
   no cards. Real table semantics — <caption>, column headers with
   scope="col", the first cell of each row a row header with scope="row".
   Below 600px the rows stack; the explicit table roles keep the header
   association once the boxes are no longer table boxes, and each cell shows
   its column name from `data-label` as generated content with empty
   alternative text, so it is not announced twice. */
export type DataRow = { head: ReactNode; cells: ReactNode[] };

export function DataTable({
  caption,
  captionHidden = false,
  columns,
  rows,
  className,
}: {
  caption: ReactNode;
  captionHidden?: boolean;
  columns: string[];
  rows: DataRow[];
  className?: string;
}) {
  return (
    <table className={cn('dc-table', className)} role="table">
      <caption className={cn(captionHidden && 'sr-only')}>{caption}</caption>
      <thead role="rowgroup">
        <tr role="row">
          {columns.map((c) => (
            <th key={c} scope="col" role="columnheader">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map((row, r) => (
          <tr key={r} role="row">
            <th scope="row" role="rowheader">
              {row.head}
            </th>
            {row.cells.map((cell, c) => (
              <td key={c} role="cell" data-label={columns[c + 1]}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* --------------------------------------------------------------- sequence --
   Gate 4 B4 (first consumer /problems `CheckSequence`). Ordered steps on a
   spine: a real <ol>, each step a heading, what to do, and (optionally) the
   observable outcome, permanently open beside its label. The visible ordinal
   is aria-hidden and a visually hidden "<stepLabel> n" carries it, as in
   production, so the number is announced once. Order only — never a rank,
   score or weight. No action slot: a step sequence is an instrument, not a
   sales device, so a CTA cannot be placed inside one. Static: no state, no
   disclosure, no client code. */
export type SequenceStep = { title: string; body: ReactNode; outcome?: ReactNode };

export function Sequence({
  steps,
  stepLabel,
  outcomeLabel,
  className,
}: {
  steps: SequenceStep[];
  stepLabel: string;
  outcomeLabel?: string;
  className?: string;
}) {
  return (
    <ol className={cn('dc-seq', className)}>
      {steps.map((step, i) => (
        <li key={step.title}>
          <p className="dc-seq-n">
            <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="sr-only">
              {stepLabel} {i + 1}
            </span>
          </p>
          <div className="dc-seq-b">
            <h3 className="dc-seq-h">{step.title}</h3>
            <div className="dc-seq-body">{step.body}</div>
            {step.outcome && (
              <div className="dc-seq-out">
                {outcomeLabel && <span className="dc-seq-ol">{outcomeLabel}</span>}
                <p>{step.outcome}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ----------------------------------------------------------- finding rows --
   Gate 4 B4 (first consumer /problems; later /how-it-works, /research). A set
   of outcomes read as PEERS: every row is rendered identically, in array
   order — no emphasis, collapse or ordering control (the production
   `FindingList` rule: the only way to weaken a finding is to delete it). */
export type FindingItem = { term: ReactNode; body: ReactNode };

export function FindingRows({ items, className }: { items: FindingItem[]; className?: string }) {
  return (
    <dl className={cn('dc-findings', className)}>
      {items.map((item, i) => (
        <div key={i}>
          <dt>{item.term}</dt>
          <dd>{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------- questions -- */
export type QuestionItem = { q: string; a: ReactNode };

export function QuestionRows({ items }: { items: QuestionItem[] }) {
  return (
    <dl className="dc-qa">
      {items.map((item) => (
        <div key={item.q}>
          <dt>&ldquo;{item.q}&rdquo;</dt>
          <dd>{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ close --
   The one full-bleed tangerine region, ink on tangerine. The arrival marks
   land once (T3) — four solid and one open, because an enquiry with no usable
   trail still counts. Delays are order only. */
export function Close({
  id,
  label,
  heading,
  headingAs = 'p',
  headingId,
  body,
  note,
  action,
  long = false,
}: {
  id?: string;
  label?: string;
  heading: ReactNode;
  headingAs?: 'h2' | 'p';
  headingId?: string;
  body: ReactNode;
  note?: ReactNode;
  action: string;
  long?: boolean;
}) {
  const H = headingAs;
  return (
    <section id={id} className="dc-close dc-on-tang" aria-labelledby={headingId} data-dc-motion="">
      <div className="dc-wrap">
        <div className="dc-arrive" aria-hidden="true">
          <span className="dc-mk" />
          <span className="dc-mk" />
          <span className="dc-mk" />
          <span className="dc-mk open" />
          <span className="dc-mk" />
        </div>
        {label && <Label className="dc-close-label">{label}</Label>}
        <H id={headingId} className={cn('dc-statement', long && 'long', label && 'dc-close-h')}>
          {heading}
        </H>
        <p className="dc-close-body">{body}</p>
        <ActionPair primaryLabel={action} />
        {note && <p className="dc-close-note">{note}</p>}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- stages --
   Gate 4 B5 (first consumer /how-it-works; production `StageSystem`). The
   Capture → Convert → Measure grouping of the six measured points, in the
   `Figure` presentation (`dc-fig`). Same semantics and DOM order as
   production: a <figure>, an <ol> of stages each named by an h3, the stage's
   points as a list, the accountability rule where it falls, and the caption
   LAST. Equal columns at every width from 900px (a stage holding three points
   is not drawn larger than one holding one), no number, no motion, no script.
   Every word arrives from the route. */
export type StageItem = { name: string; points: ReactNode[]; boundaryAfter?: number; beyondNote?: string };

export function Stages({
  stages,
  boundaryLabel,
  caption,
  className,
}: {
  stages: StageItem[];
  boundaryLabel: string;
  caption: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn('dc-fig dc-stages', className)}>
      <ol>
        {stages.map((stage) => (
          <li key={stage.name}>
            <h3>
              <Mark state="named" />
              {stage.name}
            </h3>
            <ul>
              {stage.points.map((point, i) => (
                <li key={i}>
                  <p>{point}</p>
                  {stage.boundaryAfter === i && <p className="dc-acct">{boundaryLabel}</p>}
                </li>
              ))}
            </ul>
            {stage.beyondNote && <p className="dc-beyond">{stage.beyondNote}</p>}
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- compare --
   Gate 4 B5 (first consumer /about; production `StateComparison`). Two stated
   sets of fit criteria, side by side from 900px and stacked below, EQUAL WIDTH:
   nothing implies one set is larger or likelier. Each half is a group named by
   its own h3. The marks are the site's existing two (owned: met; open, dashed:
   not met) and are aria-hidden — the words carry the meaning. The first half
   takes the solid rule and the second the dashed one, as `Fit` does. Static. */
export function Compare({
  id,
  aLabel,
  aItems,
  bLabel,
  bItems,
}: {
  id: string;
  aLabel: string;
  aItems: ReactNode[];
  bLabel: string;
  bItems: ReactNode[];
}) {
  const half = (key: 'a' | 'b', label: string, items: ReactNode[]) => (
    <div className={key === 'a' ? 'dc-c-half-l' : 'dc-c-half-r poor'} role="group" aria-labelledby={`${id}-${key}`}>
      <h3 id={`${id}-${key}`}>{label}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <Mark state={key === 'a' ? 'owned' : 'open'} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="dc-g12 dc-compare">
      {half('a', aLabel, aItems)}
      {half('b', bLabel, bItems)}
    </div>
  );
}

/* -------------------------------------------------------- disclosure group --
   Gate 4 B5 (first consumer /faq). One discrete question per row, as a native
   <details>: it opens with no JavaScript, the <summary> is the control and
   its text is the accessible name, and the open state is exposed natively
   (the plus is aria-hidden). COLLAPSED ON LOAD, from the server, exactly as
   production — the one page type where that is permitted
   (`03_PAGE_TYPE_ARCHITECTURE.md` §14); never for limits, method or
   attribution. Every row is identical: no row is demoted, reordered or
   opened differently. Every answer is in the server HTML. */
export type DisclosureItem = { q: string; a: ReactNode };

export function DisclosureGroup({ items, className }: { items: DisclosureItem[]; className?: string }) {
  return (
    <ul className={cn('dc-disc', className)}>
      {items.map((item) => (
        <li key={item.q}>
          <details>
            <summary>
              <span className="dc-disc-q">{item.q}</span>
              <span className="dc-plus" aria-hidden="true" />
            </summary>
            <div className="dc-disc-a">{item.a}</div>
          </details>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ stated rows --
   Gate 4 B5 (/how-it-works; production `StatedList`). A short list of plain
   statements on hairline rows — "where a person decides", "what we need from
   you". No mark: these are neither limits nor proof, so none of the five mark
   meanings applies. A leading <strong> in an item is set in ink. */
export function StatedRows({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn('dc-stated', className)}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
