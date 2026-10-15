import type { ReactNode } from 'react';

/**
 * SESSION 29 — PHASE G — F2, the four causes, AT FULL DEPTH.
 *
 * `/problems/traffic-but-no-enquiries` Move 2. This is the page's core value,
 * and `19_FIGURE_PRIORITISATION.md` F2 states why prose cannot carry it: the
 * approved copy itself says "prose forces the reader to hold four branches in
 * their head".
 *
 * SAME OBJECT, DEEPER. `22_F1_USAGE_TAXONOMY.md` §3 classifies this route
 * D — NONE for F1 because F2 is its own object; and `06_PROBLEM_PAGE_UX.md` §8
 * requires that the four-zone figure be "visibly the same object at two
 * depths" as the one on `/conversion-optimization`. The chain geometry, the
 * mark language, the numbering and the dashed measurement stretch below are
 * therefore transcribed from `components/commercial/ChainFigure.tsx`
 * `ChainLossZones`. What full depth ADDS, and the shallow version does not
 * carry, is exactly two things: each zone's distinct fix, and measurement
 * marked as the one to check first WITH ITS REASON VISIBLE.
 *
 * STATIC AND UNGATED (`06_PROBLEM_PAGE_UX.md` §4.1, H5). Followable
 * top-to-bottom with no interaction, no branching control, no recorded state,
 * no score. Interaction here would make the page's core value depend on
 * JavaScript and would make the structure harder to print, screenshot and
 * quote — on the page whose citability is its ranking argument.
 *
 * WHAT WOULD MAKE IT MISLEADING, and is therefore absent (`19` F2):
 *  - implying the four are mutually exclusive — a business can have more than
 *    one, and the caption says so;
 *  - implying frequency — no data exists on how common each cause is, so no
 *    ordering, size, weight or emphasis reads as "most likely". Zone 04 is
 *    marked FIRST TO CHECK, which is an ordering of the reader's procedure and
 *    is stated with its reason, not a claim about likelihood;
 *  - producing a diagnosis rather than a direction;
 *  - gating it.
 *
 * QUANTITY SAFETY: points, joins and dashes only. No bar, width, fill or
 * length encodes demand, loss, volume or a rate. Nothing tapers.
 */

const INK = 'var(--resolve-ink)';
const GAP = 'var(--resolve-gap)';
const DIM = 'var(--resolve-dim)';

/* GATE 4 · A1 (KD-09 / KD-10) — as in `components/commercial/ChainFigure.tsx`.
   `GAP` stays on every line, dash and mark (non-text, ≥ 3:1). TEXT in the
   not-measured register takes the system's text-grade token `--dc-gap-text`
   (4.90:1), and the zone titles — the only owned-colour element here, and
   text — take the small-text accent `--resolve-accent-dark` (6.02:1; the
   display accent `--resolve-accent-deep` measured 4.33:1).
   SIZE is font-size × drawing scale. The vertical drawing (330 units) is shown
   in a 288px column at a 320px viewport, the horizontal one (760 units) in a
   700px column at 761px, so both are set at 14 units (≥ 12.2px and ≥ 12.9px
   there). In the vertical drawing every line is short enough to hold the WCAG
   1.4.12 text-spacing overrides inside the drawing (KD-05): about 25
   characters from x=72, 32 from the left edge. Longer strings break at a word
   boundary — the words are unchanged. */
const GAP_TEXT = 'var(--dc-gap-text)';
const OWN_TEXT = 'var(--resolve-accent-dark)';

const nodeText = { fontSize: 15, fontWeight: 600, fill: DIM } as const;
const zoneText = { fontSize: 14, fontWeight: 700, fill: OWN_TEXT } as const;
const smallText = { fontSize: 14, fontWeight: 600, fill: GAP_TEXT } as const;
const fixText = { fontSize: 14, fontWeight: 600, fill: DIM } as const;
const bdText = { fontSize: 14, fontWeight: 700, fill: INK, letterSpacing: '0.08em' } as const;
const nodeTextH = { fontSize: 14, fontWeight: 600, fill: DIM } as const;

const TITLE = 'The four causes of traffic that does not become enquiries, each with its own fix';
const DESC =
  'One route from a visit to a recorded enquiry, with four numbered places it can fail. One, the demand: the ' +
  'visit was never the right visit, and the fix is what the business is found for rather than the page. Two, ' +
  'the page: it did not answer the visit, and the fix is the message, the offer, the evidence and the obvious ' +
  'objections. Three, the path: the enquiry could not complete or never arrived, and the fix is the form, the ' +
  'inbox and the booking link. Four, the measurement: nothing recorded it, drawn as a dashed stretch because a ' +
  'loss there leaves no trace, and it is marked as the one to check first because without it you cannot tell ' +
  'which of the other three you have. The four are not alternatives; a business can have more than one. ' +
  'Nothing in the drawing carries a size, a share, a rate or a likelihood.';

/** the open dashed mark: a place where something can be lost. One meaning
    everywhere on this site, and never the only carrier — every zone states its
    own failure in words beside it. */
function Gap({ x, y }: { x: number; y: number }) {
  return <rect x={x} y={y} width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />;
}

export function CauseZones() {
  /* -------------------------------------------------- NARROW: vertical form
     A GENUINE vertical composition, not the horizontal drawing scaled down
     (`06_PROBLEM_PAGE_UX.md` §7: "never a scaled-down horizontal branching
     graph", "never horizontal page scroll"). Every label present in the
     horizontal form is present here. Text runs from x=72 with 258 units of
     width; at 14 units each line holds the 1.4.12 spacing overrides (A1). */
  const vertical = (
    <svg viewBox="0 0 330 846" role="img" aria-labelledby="f2-v-t f2-v-d" className="block h-auto w-full">
      <title id="f2-v-t">{TITLE}</title>
      <desc id="f2-v-d">{DESC}</desc>

      {/* 01 — the demand, upstream and unmeasured */}
      <line x1="44" y1="14" x2="44" y2="92" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <Gap x={22} y={22} />
      <text x="72" y="32" {...zoneText}>01 the demand</text>
      <text x="72" y="52" {...smallText}>it was never the right visit</text>
      <text x="72" y="72" {...fixText}>fix &mdash; what you are found for</text>

      <rect x="37" y="92" width="14" height="14" fill={INK} />
      <text x="72" y="105" {...nodeText}>landing</text>

      {/* 02 — the page */}
      <path d="M44 106 V234" fill="none" stroke={INK} strokeWidth={3} />
      <Gap x={22} y={130} />
      <text x="72" y="140" {...zoneText}>02 the page</text>
      <text x="72" y="160" {...smallText}>it did not answer the visit</text>
      <text x="72" y="180" {...fixText}>fix &mdash; message, offer,</text>
      <text x="72" y="200" {...fixText}>evidence</text>

      <rect x="37" y="220" width="14" height="14" fill={INK} />
      <text x="72" y="233" {...nodeText}>interaction</text>

      {/* 03 — the path */}
      <path d="M44 234 V381" fill="none" stroke={INK} strokeWidth={3} />
      <Gap x={22} y={258} />
      <text x="72" y="268" {...zoneText}>03 the path</text>
      <text x="72" y="288" {...smallText}>it could not complete,</text>
      <text x="72" y="308" {...smallText}>or never arrived</text>
      <text x="72" y="328" {...fixText}>fix &mdash; the form, the inbox,</text>
      <text x="72" y="348" {...fixText}>the link</text>

      <rect x="37" y="367" width="14" height="14" fill={INK} />
      <text x="72" y="380" {...nodeText}>the enquiry</text>

      {/* 04 — the measurement, drawn unmeasured, marked FIRST TO CHECK */}
      <path d="M44 381 V496" fill="none" stroke={GAP} strokeWidth={2.5} strokeDasharray="6 6" />
      <Gap x={22} y={405} />
      <text x="72" y="415" {...zoneText}>04 the measurement</text>
      <text x="72" y="435" {...smallText}>nothing recorded it,</text>
      <text x="72" y="455" {...smallText}>so the loss is invisible</text>
      <text x="72" y="475" {...fixText}>fix &mdash; this one first</text>

      <rect x="37" y="496" width="14" height="14" fill={INK} />
      <text x="72" y="509" {...nodeText}>a recorded enquiry</text>

      {/* the ordering rule, with its reason visible. This is a rule about the
          reader's PROCEDURE, and it is the one ordering the figure states. */}
      <line x1="6" y1="542" x2="324" y2="542" stroke={INK} strokeWidth={2} />
      <text x="6" y="570" {...bdText}>START AT 04</text>
      <text x="6" y="594" {...smallText}>without the measurement</text>
      <text x="6" y="614" {...smallText}>you cannot tell which of</text>
      <text x="6" y="634" {...smallText}>the other three you have</text>

      <text x="6" y="678" {...bdText}>TWO OF THE FOUR ARE NOT</text>
      <text x="6" y="698" {...bdText}>THE PAGE</text>
      <text x="6" y="722" {...smallText}>and they are not alternatives</text>
      <text x="6" y="742" {...smallText}>&mdash; more than one can be true</text>
      <text x="6" y="762" {...smallText}>at the same time</text>
      <text x="6" y="794" {...smallText}>nothing here shows how</text>
      <text x="6" y="814" {...smallText}>common any of them is:</text>
      <text x="6" y="834" {...smallText}>that is not measured</text>
    </svg>
  );

  /* -------------------------------------------------- WIDE: horizontal form
     Four columns 185 units wide, every label START-anchored from its own
     column x. Phase F found six overlapping label pairs from centre-anchoring
     exactly this arrangement; start-anchoring each column into the empty span
     to its right is the fix that held. Longest column string is 23 characters
     at 14 units, which measures under 185 units (A1 probe: no clipping or
     overlap at 761–1440). */
  const horizontal = (
    <svg viewBox="0 0 760 400" role="img" aria-labelledby="f2-h-t f2-h-d" className="block h-auto w-full">
      <title id="f2-h-t">{TITLE}</title>
      <desc id="f2-h-d">{DESC}</desc>

      {/* the route itself */}
      <line x1="10" y1="150" x2="80" y2="150" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <Gap x={38} y={120} />

      <rect x="73" y="143" width="14" height="14" fill={INK} />
      <path d="M80 150 H265" fill="none" stroke={INK} strokeWidth={3} />
      <Gap x={223} y={120} />

      <rect x="258" y="143" width="14" height="14" fill={INK} />
      <path d="M265 150 H450" fill="none" stroke={INK} strokeWidth={3} />
      <Gap x={408} y={120} />

      <rect x="443" y="143" width="14" height="14" fill={INK} />
      <path d="M450 150 H635" fill="none" stroke={GAP} strokeWidth={2.5} strokeDasharray="6 6" />
      <Gap x={593} y={120} />

      <rect x="628" y="143" width="14" height="14" fill={INK} />

      {/* the points, under the route */}
      <text x="80" y="180" {...nodeTextH}>landing</text>
      <text x="265" y="180" {...nodeTextH}>interaction</text>
      <text x="450" y="180" {...nodeTextH}>the enquiry</text>
      <text x="760" y="180" textAnchor="end" {...nodeTextH}>a recorded enquiry</text>

      {/* the four zones, above the route */}
      <text x="10" y="40" {...zoneText}>01 the demand</text>
      <text x="195" y="40" {...zoneText}>02 the page</text>
      <text x="380" y="40" {...zoneText}>03 the path</text>
      <text x="565" y="40" {...zoneText}>04 the measurement</text>

      <text x="10" y="62" {...smallText}>never the right visit</text>
      <text x="195" y="62" {...smallText}>did not answer it</text>
      <text x="380" y="62" {...smallText}>could not complete</text>
      <text x="565" y="62" {...smallText}>nothing recorded it</text>

      {/* each zone's distinct fix — the depth the shallow version does not carry */}
      <text x="10" y="82" {...fixText}>fix &mdash; what you are</text>
      <text x="10" y="102" {...fixText}>found for</text>
      <text x="195" y="82" {...fixText}>fix &mdash; message, offer,</text>
      <text x="195" y="102" {...fixText}>evidence, objections</text>
      <text x="380" y="82" {...fixText}>fix &mdash; the form, the</text>
      <text x="380" y="102" {...fixText}>inbox, the booking link</text>
      <text x="565" y="82" {...fixText}>fix &mdash; this one first,</text>
      <text x="565" y="102" {...fixText}>before the other three</text>

      {/* the ordering rule, stated with its reason */}
      <line x1="10" y1="230" x2="750" y2="230" stroke={INK} strokeWidth={2} />
      <text x="10" y="256" {...bdText}>START AT 04</text>
      <text x="10" y="278" {...smallText}>without the measurement you cannot tell which of the other three you have</text>

      <text x="10" y="322" {...bdText}>TWO OF THE FOUR ARE NOT THE PAGE</text>
      <text x="10" y="344" {...smallText}>and they are not alternatives &mdash; more than one can be true at the same time</text>
      <text x="10" y="372" {...smallText}>nothing on this drawing shows how common any of them is: that is not measured</text>
    </svg>
  );

  return (
    <FigureFrame
      vertical={vertical}
      horizontal={horizontal}
      caption={
        <>
          The same object <span className="whitespace-nowrap">/conversion-optimization</span>{' '}draws at a
          shallower depth, with each cause&rsquo;s own fix added and the measurement marked as the one to check
          first. The four are not alternatives &mdash; a business can have more than one at once &mdash; and the
          drawing shows no size, share, rate or likelihood for any of them, because none of that is measured.
          The dashed stretch is the honesty device used everywhere on this site: a dashed line means unmeasured,
          so a loss there leaves nothing behind to find.
        </>
      }
    />
  );
}

/* One accessible figure, two width-native drawings, exactly one ever displayed.
   ONE media query governs both, and the two conditions are exact complements —
   the vertical form is the default and is hidden only at the width the
   horizontal form takes over. Phase F's `max-[760px]` / `min-[761px]` pairing
   left a one-pixel hole at exactly 760px where NEITHER rendered; this is the
   pattern that fixed it, and it is the homepage's own pattern. The hidden
   drawing is `display:none`, so it leaves the accessibility tree and one
   accessible name is exposed rather than two. */
function FigureFrame({
  vertical,
  horizontal,
  caption,
}: {
  vertical: ReactNode;
  horizontal: ReactNode;
  caption: ReactNode;
}) {
  return (
    <figure className="m-0 mt-[clamp(26px,3.2vw,44px)]">
      <div className="block min-[761px]:hidden" style={{ maxWidth: 360 }}>
        {vertical}
      </div>
      <div className="hidden min-[761px]:block" style={{ maxWidth: 900 }}>
        {horizontal}
      </div>
      <figcaption className="mt-[clamp(16px,2vw,24px)] max-w-[64ch] text-[.9rem] leading-[1.55] text-resolve-dim">
        {caption}
      </figcaption>
    </figure>
  );
}
