import type { ReactNode } from 'react';

/**
 * SESSION 28 — PHASE F — F1, "the run", in its three non-homepage classes.
 *
 * BINDING TAXONOMY — docs/16-ux/22_F1_USAGE_TAXONOMY.md §3. D (NONE) is the
 * default; a route earns a figure by argument, never for consistency, brand
 * recognition or visual rhythm. Across Phase F:
 *
 *   /services                 A — FULL, with the joins marked   → ChainFull
 *   /seo                      B — PARTIAL, discovery segment    → ChainDiscovery
 *   /conversion-optimization  B — PARTIAL, landing/enquiry      → ChainLossZones
 *   /lead-generation          C — STATE at the terminus         → ChainTerminus
 *   /ai-seo, /google-ads,
 *   /social-media-ads         D — NONE                          → nothing renders
 *
 * WHY THIS IS A PHASE-F COMPONENT AND NOT AN EXTRACTION FROM THE HOMEPAGE.
 * The homepage is a closed, validated baseline (Gate 10, Phases C–E). Lifting
 * its figure into a shared module would edit a homepage file to serve a
 * commercial route, and the one thing Phase F must not do is move the homepage.
 * The mark language, the four states, the dashed-means-unmeasured convention,
 * the boundary rule and the double line are therefore TRANSCRIBED here rather
 * than imported, and the homepage's own figure is untouched.
 *
 * QUANTITY SAFETY, on every drawing below:
 * points and joins only. No bar, no width, no fill percentage, no length that
 * encodes demand, loss, volume or a rate. A run length encodes only how far a
 * route gets. Nothing here is a funnel and NOTHING TAPERS — the distance
 * between "the run" and "a funnel" is one decision about tapering, and it is
 * not taken.
 *
 * RESPONSIVE. Two GENUINE drawings per figure, selected by width — a vertical
 * form below the boundary and a horizontal form above it — never one drawing
 * scaled. Exactly one is ever displayed; the other is `display:none`, so it
 * leaves the accessibility tree and only one accessible name is exposed. Each
 * horizontal drawing is width-capped so it cannot over-scale its own type at
 * WIDE, and each vertical drawing is width-capped for the same reason at the
 * top of its band.
 *
 * STATIC. Every figure is complete, composed and at full scale in the
 * server-rendered DOM. There is no descent, no draw and no client leaf on any
 * Phase F route, so the no-JS and reduced-motion figure is this figure exactly.
 */

const INK = 'var(--resolve-ink)';
const GAP = 'var(--resolve-gap)';
const DIM = 'var(--resolve-dim)';
const OWN = 'var(--resolve-accent-deep)';

const nodeText = { fontSize: 13, fontWeight: 600, fill: DIM } as const;
const smallText = { fontSize: 12, fontWeight: 600, fill: GAP } as const;
const bdText = { fontSize: 12, fontWeight: 700, fill: INK, letterSpacing: '0.09em' } as const;
const ownText = { fontSize: 12, fontWeight: 700, fill: OWN, letterSpacing: '0.09em' } as const;

/** wrapper: one accessible figure, two width-native drawings, one ever shown */
function Figure({
  vertical,
  horizontal,
  boundary = 761,
  verticalMax = 360,
  horizontalMax = 780,
  caption,
}: {
  vertical: ReactNode;
  horizontal: ReactNode;
  boundary?: 761 | 1100;
  verticalMax?: number;
  horizontalMax?: number;
  caption: ReactNode;
}) {
  /* ONE media query governs BOTH drawings, and the two conditions are exact
     complements: the vertical form is the DEFAULT and is hidden only at the
     width the horizontal form takes over. There is therefore no width at which
     neither renders.

     The earlier version paired `max-[760px]:block hidden` with
     `hidden min-[761px]:block`, which looks complementary and is not: at a
     viewport measuring exactly 760 CSS px, MEASURED, both queries failed and
     `/seo` rendered NO FIGURE AT ALL. A one-pixel gap between two independent
     queries is invisible in the source and only shows up when the boundary
     itself is tested. This is also the pattern the homepage's own figure uses. */
  const hideAbove = boundary === 761 ? 'block min-[761px]:hidden' : 'block min-[1100px]:hidden';
  const showAbove = boundary === 761 ? 'hidden min-[761px]:block' : 'hidden min-[1100px]:block';
  return (
    <figure className="m-0 mt-[clamp(26px,3.2vw,44px)]">
      <div className={hideAbove} style={{ maxWidth: verticalMax }}>
        {vertical}
      </div>
      <div className={showAbove} style={{ maxWidth: horizontalMax }}>
        {horizontal}
      </div>
      <figcaption className="mt-[clamp(16px,2vw,24px)] max-w-[64ch] text-[.9rem] leading-[1.55] text-resolve-dim">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ==========================================================================
   A — FULL, WITH THE JOINS MARKED  ·  /services
   The joins ARE the page's argument: a drawing of three tidy stages with no
   seams would state the opposite of the page (22 §3, 42 margin notes). The
   four seams below are exactly the four the approved copy names — between the
   search work and the page it feeds, between the page and the form, between
   the form and where the enquiry lands, and between all of that and the
   measurement.
   ========================================================================== */

const FULL_TITLE =
  'The chain from buyer demand to a recorded qualified enquiry, with the four joins between its parts marked';
const FULL_DESC =
  'One continuous chain with five points in order: discovery and source, landing, interaction, the enquiry, ' +
  'and the qualified enquiry. Buyer demand before discovery is dashed because it is not measured. Four joins ' +
  'are marked in tangerine and numbered 01 to 04: between the search work and the page it feeds, between the ' +
  'page and the form, between the form and where the enquiry lands, and between all of that and the ' +
  'measurement. Capture covers the discovery point; convert covers landing through the enquiry; measure covers ' +
  'the qualified enquiry and the boundary. One enquiry arrives from an open, dashed mark with no upstream ' +
  'segment: it is unattributed and it still counts. A rule crosses the chain after the qualified enquiry — ' +
  'everything before it is what we are accountable for. The segment beyond it is a double line because it is ' +
  'your own data, from your own system.';

/** a marked join: the seam itself, in the owned colour, with its number.
    The number sits BELOW the chain: above it, at the midpoints between nodes,
    it collided with the "buyer demand we cannot see" label — MEASURED at 1425,
    12x9 units. Below the chain the join midpoints fall in the gaps between the
    node labels, which are anchored on the nodes themselves. */
function JoinH({ x, n }: { x: number; n: string }) {
  return (
    <>
      <line x1={x} y1={112} x2={x} y2={148} stroke={OWN} strokeWidth={3} />
      <text x={x} y={164} textAnchor="middle" fontSize={11} fontWeight={700} fill={OWN}>
        {n}
      </text>
    </>
  );
}

function JoinV({ y, n }: { y: number; n: string }) {
  return (
    <>
      <line x1={30} y1={y} x2={66} y2={y} stroke={OWN} strokeWidth={3} />
      <text x={22} y={y + 4} textAnchor="end" fontSize={11} fontWeight={700} fill={OWN}>
        {n}
      </text>
    </>
  );
}

export function ChainFull() {
  const vertical = (
    <svg viewBox="0 0 330 636" role="img" aria-labelledby="f-full-v-t f-full-v-d" className="block h-auto w-full">
      <title id="f-full-v-t">{FULL_TITLE}</title>
      <desc id="f-full-v-d">{FULL_DESC}</desc>

      {/* unmeasured buyer demand */}
      <line x1="48" y1="14" x2="48" y2="54" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="78" y="28" {...nodeText}>buyer demand we cannot see</text>

      {/* the chain */}
      <path d="M48 54 V500" fill="none" stroke={INK} strokeWidth={2.5} />

      {/* the four joins */}
      <JoinV y={98} n="01" />
      <JoinV y={186} n="02" />
      <JoinV y={274} n="03" />
      <JoinV y={362} n="04" />

      {/* the points */}
      <rect x="41" y="47" width="14" height="14" fill={INK} />
      <text x="78" y="60" {...nodeText}>discovery and source</text>
      <rect x="41" y="135" width="14" height="14" fill={INK} />
      <text x="78" y="148" {...nodeText}>landing</text>
      <rect x="41" y="223" width="14" height="14" fill={INK} />
      <text x="78" y="236" {...nodeText}>interaction</text>
      <rect x="41" y="311" width="14" height="14" fill={INK} />
      <text x="78" y="324" {...nodeText}>the enquiry</text>

      {/* the unattributed arrival — no upstream segment, and it still counts */}
      <rect x="6" y="392" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
      <line x1="22" y1="396" x2="39" y2="378" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="78" y="396" {...smallText}>&mdash; one arrived with no usable trail</text>

      <rect x="41" y="435" width="14" height="14" fill={INK} />
      <text x="78" y="448" {...nodeText}>the qualified enquiry</text>

      {/* the accountability boundary */}
      <line x1="6" y1="500" x2="324" y2="500" stroke={INK} strokeWidth={2} />
      <text x="6" y="490" {...bdText}>WE ANSWER FOR THIS MUCH</text>

      {/* your own data, beyond the boundary */}
      <path d="M44 500 V536" fill="none" stroke={INK} strokeWidth={1.6} />
      <path d="M52 500 V536" fill="none" stroke={INK} strokeWidth={1.6} />
      <rect x="41" y="529" width="14" height="14" fill={INK} />
      <text x="78" y="542" {...nodeText}>opportunity and revenue</text>
      <text x="78" y="562" {...smallText}>&mdash; your numbers, from your system</text>

      {/* the three parts, named against the segments they cover */}
      <text x="6" y="600" {...ownText}>01–04 THE JOINS ARE OURS</text>
      <text x="6" y="622" {...smallText}>capture · convert · measure, as one path</text>
    </svg>
  );

  const horizontal = (
    <svg viewBox="0 0 1000 268" role="img" aria-labelledby="f-full-h-t f-full-h-d" className="block h-auto w-full">
      <title id="f-full-h-t">{FULL_TITLE}</title>
      <desc id="f-full-h-d">{FULL_DESC}</desc>

      <line x1="12" y1="130" x2="70" y2="130" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="12" y="114" {...smallText}>buyer demand we cannot see</text>

      <path d="M70 130 H862" fill="none" stroke={INK} strokeWidth={2.5} />

      <JoinH x={158} n="01" />
      <JoinH x={334} n="02" />
      <JoinH x={510} n="03" />
      <JoinH x={686} n="04" />

      <rect x="63" y="123" width="14" height="14" fill={INK} />
      <rect x="239" y="123" width="14" height="14" fill={INK} />
      <rect x="415" y="123" width="14" height="14" fill={INK} />
      <rect x="591" y="123" width="14" height="14" fill={INK} />
      <rect x="767" y="123" width="14" height="14" fill={INK} />

      {/* the unattributed arrival — set on two lines, and raised, so it clears
          the boundary label (MEASURED collision at 1425: 88x14 units) */}
      <rect x="591" y="26" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
      <line x1="598" y1="42" x2="598" y2="123" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="616" y="32" {...smallText}>arrived with no usable trail</text>
      <text x="616" y="48" {...smallText}>&mdash; it still counts</text>

      <text x="63" y="186" {...nodeText}>discovery</text>
      <text x="63" y="204" {...nodeText}>and source</text>
      <text x="246" y="186" textAnchor="middle" {...nodeText}>landing</text>
      <text x="422" y="186" textAnchor="middle" {...nodeText}>interaction</text>
      <text x="598" y="186" textAnchor="middle" {...nodeText}>the enquiry</text>
      <text x="774" y="186" textAnchor="middle" {...nodeText}>the qualified</text>
      <text x="774" y="204" textAnchor="middle" {...nodeText}>enquiry</text>

      {/* the accountability boundary */}
      <line x1="862" y1="88" x2="862" y2="170" stroke={INK} strokeWidth={2} />
      <text x="862" y="78" textAnchor="middle" {...bdText}>WE ANSWER FOR THIS MUCH</text>
      <path d="M862 126 H950" fill="none" stroke={INK} strokeWidth={1.6} />
      <path d="M862 134 H950" fill="none" stroke={INK} strokeWidth={1.6} />
      <rect x="943" y="123" width="14" height="14" fill={INK} />
      <text x="1000" y="186" textAnchor="end" {...nodeText}>opportunity and revenue</text>
      <text x="1000" y="222" textAnchor="end" {...smallText}>&mdash; your numbers, from your system</text>

      <text x="12" y="256" {...ownText}>01–04 THE JOINS ARE OURS</text>
    </svg>
  );

  return (
    <Figure
      boundary={1100}
      verticalMax={400}
      horizontalMax={1000}
      vertical={vertical}
      horizontal={horizontal}
      caption={
        <>
          The four numbered seams are the joins the copy above names, in order: search work to the page it feeds,
          page to form, form to wherever the enquiry lands, and all of that to the measurement. Points and joins
          only &mdash; nothing on this drawing is a length, a proportion or a quantity, and there is no taper.
        </>
      }
    />
  );
}

/* ==========================================================================
   B — PARTIAL: the discovery segment  ·  /seo
   One named segment at full legibility with the remainder recessive — not the
   whole figure shrunk (22 §2, §6). The rest of the chain is not this page's
   subject, and the view must not read as a fully-measured chain.
   ========================================================================== */

const DISC_TITLE = 'The discovery segment of the chain, at full legibility, with the rest of the chain recessive';
const DISC_DESC =
  'The chain from buyer demand to a recorded qualified enquiry, with only its first segment drawn at full ' +
  'weight: unmeasured buyer demand, dashed, arriving at discovery and source, and the join from there into the ' +
  'page it feeds. Everything after that join — landing, interaction, the enquiry and the qualified enquiry — is ' +
  'drawn recessive, because it is not this page’s subject and is covered elsewhere on the site. The ' +
  'discovery segment is where organic search does its work; the enquiry at the far end is still what the work ' +
  'is judged on.';

export function ChainDiscovery() {
  const vertical = (
    <svg viewBox="0 0 300 400" role="img" aria-labelledby="f-disc-v-t f-disc-v-d" className="block h-auto w-full">
      <title id="f-disc-v-t">{DISC_TITLE}</title>
      <desc id="f-disc-v-d">{DISC_DESC}</desc>

      <line x1="44" y1="12" x2="44" y2="52" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="72" y="26" {...smallText}>buyer demand we cannot see</text>

      {/* the emphasised segment */}
      <path d="M44 52 V160" fill="none" stroke={INK} strokeWidth={3} />
      <rect x="37" y="45" width="14" height="14" fill={INK} />
      <text x="72" y="58" {...nodeText}>discovery and source</text>
      <line x1="28" y1="120" x2="60" y2="120" stroke={OWN} strokeWidth={3} />
      <text x="72" y="124" fontSize={12} fontWeight={700} fill={OWN}>the join into the page</text>

      {/* the segment bracket */}
      <path d="M14 52 H6 V160 H14" fill="none" stroke={INK} strokeWidth={1.6} />
      <text x="6" y="42" {...bdText}>THIS PAGE</text>

      {/* recessive remainder */}
      <path d="M44 160 V344" fill="none" stroke={GAP} strokeWidth={1.5} />
      <rect x="39" y="196" width="10" height="10" fill={GAP} />
      <rect x="39" y="246" width="10" height="10" fill={GAP} />
      <rect x="39" y="296" width="10" height="10" fill={GAP} />
      <text x="72" y="205" {...smallText}>landing</text>
      <text x="72" y="255" {...smallText}>interaction</text>
      <text x="72" y="305" {...smallText}>the enquiry</text>
      <rect x="37" y="337" width="14" height="14" fill={INK} />
      <text x="72" y="350" {...nodeText}>the qualified enquiry</text>
      <text x="72" y="370" {...smallText}>&mdash; still the number this is judged on</text>
    </svg>
  );

  const horizontal = (
    <svg viewBox="0 0 620 200" role="img" aria-labelledby="f-disc-h-t f-disc-h-d" className="block h-auto w-full">
      <title id="f-disc-h-t">{DISC_TITLE}</title>
      <desc id="f-disc-h-d">{DISC_DESC}</desc>

      <line x1="10" y1="104" x2="58" y2="104" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="10" y="88" {...smallText}>buyer demand we cannot see</text>

      <path d="M58 104 H212" fill="none" stroke={INK} strokeWidth={3} />
      <rect x="51" y="97" width="14" height="14" fill={INK} />
      <text x="58" y="156" {...nodeText}>discovery and source</text>

      {/* the join label sits BELOW the chain: above it, it collided with the
          "buyer demand we cannot see" label — MEASURED at 1425, 44x8 units */}
      <line x1="150" y1="88" x2="150" y2="120" stroke={OWN} strokeWidth={3} />
      <text x="150" y="132" textAnchor="middle" fontSize={12} fontWeight={700} fill={OWN}>the join</text>

      <path d="M58 60 V52 H212 V60" fill="none" stroke={INK} strokeWidth={1.6} />
      <text x="58" y="42" {...bdText}>THIS PAGE</text>

      <path d="M212 104 H560" fill="none" stroke={GAP} strokeWidth={1.5} />
      <rect x="265" y="99" width="10" height="10" fill={GAP} />
      <rect x="360" y="99" width="10" height="10" fill={GAP} />
      <rect x="455" y="99" width="10" height="10" fill={GAP} />
      <text x="270" y="156" textAnchor="middle" {...smallText}>landing</text>
      <text x="365" y="156" textAnchor="middle" {...smallText}>interaction</text>
      <text x="460" y="156" textAnchor="middle" {...smallText}>the enquiry</text>
      <rect x="553" y="97" width="14" height="14" fill={INK} />
      <text x="620" y="156" textAnchor="end" {...nodeText}>the qualified enquiry</text>
      <text x="620" y="186" textAnchor="end" {...smallText}>&mdash; still the number this is judged on</text>
    </svg>
  );

  return (
    <Figure
      vertical={vertical}
      horizontal={horizontal}
      caption={
        <>
          Only the discovery segment is this page&rsquo;s subject, so only it is drawn at full weight. The
          recessive stretch is the rest of the chain, covered on the other pages &mdash; it is deliberately not
          drawn as a measured, finished path. No length here represents traffic, demand or a rate.
        </>
      }
    />
  );
}

/* ==========================================================================
   B — PARTIAL: the landing/enquiry segment, as the four loss zones
   /conversion-optimization
   The partial run and the shallow four-zone diagnostic are THE SAME OBJECT at
   two depths (22 §3, 38 margin notes) — this is the shallow one. It must be
   recognisable as the same object by a reader arriving from the problem page,
   and it must not run that page's full diagnostic.
   ========================================================================== */

const ZONE_TITLE = 'The four places demand is lost, marked on the landing-to-enquiry segment of the chain';
const ZONE_DESC =
  'The segment of the chain between arrival and a recorded enquiry, with four zones marked by open dashed ' +
  'marks: the demand itself, before anything lands; the page it lands on; the path from the page to a sent ' +
  'enquiry; and the measurement, drawn as a dashed stretch because a loss there is invisible rather than ' +
  'visible. Each zone is named and numbered. No zone carries a size, a share or a rate — the drawing states ' +
  'where loss can occur, never how much occurs.';

export function ChainLossZones() {
  const vertical = (
    <svg viewBox="0 0 330 430" role="img" aria-labelledby="f-zone-v-t f-zone-v-d" className="block h-auto w-full">
      <title id="f-zone-v-t">{ZONE_TITLE}</title>
      <desc id="f-zone-v-d">{ZONE_DESC}</desc>

      {/* 01 — the demand, upstream and unmeasured */}
      <line x1="44" y1="14" x2="44" y2="62" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <rect x="22" y="24" width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
      <text x="72" y="26" fontSize={12} fontWeight={700} fill={OWN}>01 the demand</text>
      <text x="72" y="44" {...smallText}>it was never the right visit</text>

      <rect x="37" y="55" width="14" height="14" fill={INK} />
      <text x="72" y="68" {...nodeText}>landing</text>

      {/* 02 — the page */}
      <path d="M44 69 V160" fill="none" stroke={INK} strokeWidth={3} />
      <rect x="22" y="106" width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
      <text x="72" y="112" fontSize={12} fontWeight={700} fill={OWN}>02 the page</text>
      <text x="72" y="130" {...smallText}>it did not answer the visit</text>

      <rect x="37" y="153" width="14" height="14" fill={INK} />
      <text x="72" y="166" {...nodeText}>interaction</text>

      {/* 03 — the path */}
      <path d="M44 167 V258" fill="none" stroke={INK} strokeWidth={3} />
      <rect x="22" y="204" width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
      <text x="72" y="210" fontSize={12} fontWeight={700} fill={OWN}>03 the path</text>
      <text x="72" y="228" {...smallText}>it could not complete, or never arrived</text>

      <rect x="37" y="251" width="14" height="14" fill={INK} />
      <text x="72" y="264" {...nodeText}>the enquiry</text>

      {/* 04 — the measurement, drawn unmeasured */}
      <path d="M44 265 V356" fill="none" stroke={GAP} strokeWidth={2.5} strokeDasharray="6 6" />
      <rect x="22" y="302" width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
      <text x="72" y="308" fontSize={12} fontWeight={700} fill={OWN}>04 the measurement</text>
      <text x="72" y="326" {...smallText}>nothing recorded it, so the loss is invisible</text>

      <rect x="37" y="349" width="14" height="14" fill={INK} />
      <text x="72" y="362" {...nodeText}>a recorded enquiry</text>
      <text x="6" y="400" {...bdText}>TWO OF THE FOUR ARE NOT THE PAGE</text>
      <text x="6" y="420" {...smallText}>and one of them cannot be seen at all</text>
    </svg>
  );

  const horizontal = (
    <svg viewBox="0 0 620 250" role="img" aria-labelledby="f-zone-h-t f-zone-h-d" className="block h-auto w-full">
      <title id="f-zone-h-t">{ZONE_TITLE}</title>
      <desc id="f-zone-h-d">{ZONE_DESC}</desc>

      <line x1="10" y1="120" x2="66" y2="120" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <rect x="24" y="90" width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />

      <rect x="59" y="113" width="14" height="14" fill={INK} />
      <path d="M66 120 H222" fill="none" stroke={INK} strokeWidth={3} />
      <rect x="137" y="90" width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />

      <rect x="215" y="113" width="14" height="14" fill={INK} />
      <path d="M222 120 H378" fill="none" stroke={INK} strokeWidth={3} />
      <rect x="293" y="90" width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />

      <rect x="371" y="113" width="14" height="14" fill={INK} />
      <path d="M378 120 H534" fill="none" stroke={GAP} strokeWidth={2.5} strokeDasharray="6 6" />
      <rect x="449" y="90" width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />

      <rect x="527" y="113" width="14" height="14" fill={INK} />

      {/* point names, under the chain */}
      <text x="66" y="152" {...nodeText}>landing</text>
      <text x="222" y="152" textAnchor="middle" {...nodeText}>interaction</text>
      <text x="378" y="152" textAnchor="middle" {...nodeText}>the enquiry</text>
      <text x="620" y="152" textAnchor="end" {...nodeText}>a recorded enquiry</text>

      {/* Zone names and their explanations, both START-anchored from the zone's
          own x. Centre-anchoring them collided the first two explanations —
          MEASURED at 1425, 25x16 units. Start-anchored, each label runs into the
          empty span to its right and the four sit clear of one another. */}
      <text x="10" y="78" fontSize={12} fontWeight={700} fill={OWN}>01 the demand</text>
      <text x="143" y="78" fontSize={12} fontWeight={700} fill={OWN}>02 the page</text>
      <text x="299" y="78" fontSize={12} fontWeight={700} fill={OWN}>03 the path</text>
      <text x="455" y="78" fontSize={12} fontWeight={700} fill={OWN}>04 the measurement</text>

      <text x="10" y="56" {...smallText}>never the right visit</text>
      <text x="143" y="56" {...smallText}>did not answer it</text>
      <text x="299" y="56" {...smallText}>could not complete</text>
      <text x="455" y="56" {...smallText}>nothing recorded it</text>

      <text x="10" y="200" {...bdText}>TWO OF THE FOUR ARE NOT THE PAGE</text>
      <text x="10" y="222" {...smallText}>and one of them cannot be seen at all</text>
    </svg>
  );

  return (
    <Figure
      vertical={vertical}
      horizontal={horizontal}
      caption={
        <>
          The same object the problem page draws, at a shallower depth. The dashed stretch at zone 04 is the
          honesty device used everywhere on this site: a dashed line means unmeasured, so a loss there leaves no
          trace to find. No zone carries a size, a share or a rate.
        </>
      }
    />
  );
}

/* ==========================================================================
   C — STATE at the chain's terminus  ·  /lead-generation
   The same conceptual object in a changed condition: an enquiry becoming a
   QUALIFIED enquiry. Rendered as a state rather than a standalone taxonomy,
   because a four-box classification diagram is one step from the lead grading
   the messaging system prohibits (22 §3, F-2).
   ========================================================================== */

const TERM_TITLE = 'The end of the chain, showing an enquiry becoming a qualified enquiry';
const TERM_DESC =
  'The terminus of the chain. Everything upstream is recessive. An enquiry arrives as a solid point. One ' +
  'enquiry arrives from an open, dashed mark with no upstream segment — it has no usable trail, and it still ' +
  'counts. A rule crosses the chain at the point the five conditions are checked, at the moment the enquiry ' +
  'arrives. Past the rule the chain continues to the qualified enquiry, and a second branch leaves it for what ' +
  'is recorded and reported separately rather than deleted. Beyond the qualified enquiry the line doubles, ' +
  'because what follows is your own data from your own system. No count, rate or proportion appears anywhere ' +
  'on the drawing.';

export function ChainTerminus() {
  const vertical = (
    <svg viewBox="0 0 330 420" role="img" aria-labelledby="f-term-v-t f-term-v-d" className="block h-auto w-full">
      <title id="f-term-v-t">{TERM_TITLE}</title>
      <desc id="f-term-v-d">{TERM_DESC}</desc>

      <path d="M96 12 V64" fill="none" stroke={GAP} strokeWidth={1.5} />
      <text x="124" y="30" {...smallText}>everything upstream</text>

      <path d="M96 64 V150" fill="none" stroke={INK} strokeWidth={3} />
      <rect x="89" y="57" width="14" height="14" fill={INK} />
      <text x="124" y="70" {...nodeText}>the enquiry</text>

      {/* the unattributed arrival */}
      <rect x="20" y="96" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
      <line x1="36" y1="103" x2="88" y2="103" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="20" y="88" {...smallText}>no usable trail &mdash; it still counts</text>

      {/* the state change */}
      <line x1="14" y1="150" x2="286" y2="150" stroke={INK} strokeWidth={2} />
      <text x="14" y="142" {...bdText}>CHECKED WHEN IT ARRIVES</text>

      {/* qualified */}
      <path d="M96 150 V240" fill="none" stroke={OWN} strokeWidth={3} />
      <rect x="89" y="233" width="14" height="14" fill={OWN} />
      <text x="124" y="246" fontSize={13} fontWeight={700} fill={OWN}>the qualified enquiry</text>

      {/* recorded, reported separately */}
      <path d="M96 176 H210 V240" fill="none" stroke={GAP} strokeWidth={1.5} strokeDasharray="4 4" />
      <rect x="204" y="246" width="12" height="12" fill={GAP} />
      <text x="124" y="286" {...smallText}>the rest is stored and reported</text>
      <text x="124" y="304" {...smallText}>separately &mdash; never deleted</text>

      {/* your own data */}
      <path d="M92 240 V332" fill="none" stroke={INK} strokeWidth={1.6} />
      <path d="M100 240 V332" fill="none" stroke={INK} strokeWidth={1.6} />
      <rect x="89" y="325" width="14" height="14" fill={INK} />
      <text x="124" y="338" {...nodeText}>opportunity and revenue</text>
      <text x="124" y="356" {...smallText}>&mdash; your numbers, from your system</text>

      <text x="14" y="396" {...bdText}>WE ANSWER UP TO THE RULE</text>
      <text x="14" y="414" {...smallText}>no count and no rate appears on this drawing</text>
    </svg>
  );

  const horizontal = (
    <svg viewBox="0 0 620 250" role="img" aria-labelledby="f-term-h-t f-term-h-d" className="block h-auto w-full">
      <title id="f-term-h-t">{TERM_TITLE}</title>
      <desc id="f-term-h-d">{TERM_DESC}</desc>

      <path d="M10 130 H72" fill="none" stroke={GAP} strokeWidth={1.5} />
      <text x="10" y="114" {...smallText}>everything upstream</text>

      <path d="M72 130 H236" fill="none" stroke={INK} strokeWidth={3} />
      <rect x="65" y="123" width="14" height="14" fill={INK} />
      <text x="72" y="168" {...nodeText}>the enquiry</text>

      {/* The unattributed arrival, moved left and set on two lines so it clears
          both the rule and the rule's label — MEASURED collision at 1425:
          156x3 units against "CHECKED WHEN IT ARRIVES". */}
      <rect x="72" y="72" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
      <line x1="79" y1="88" x2="79" y2="123" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="98" y="78" {...smallText}>no usable trail</text>
      <text x="98" y="94" {...smallText}>&mdash; it still counts</text>

      {/* the state change */}
      <line x1="236" y1="48" x2="236" y2="200" stroke={INK} strokeWidth={2} />
      <text x="236" y="38" textAnchor="middle" {...bdText}>CHECKED WHEN IT ARRIVES</text>

      <path d="M236 130 H400" fill="none" stroke={OWN} strokeWidth={3} />
      <rect x="393" y="123" width="14" height="14" fill={OWN} />
      <text x="400" y="168" textAnchor="middle" fontSize={13} fontWeight={700} fill={OWN}>the qualified enquiry</text>

      <path d="M236 130 V186 H400" fill="none" stroke={GAP} strokeWidth={1.5} strokeDasharray="4 4" />
      <rect x="394" y="180" width="12" height="12" fill={GAP} />
      {/* two lines: as one line this ran past the viewBox and was clipped */}
      <text x="418" y="190" {...smallText}>stored and reported</text>
      <text x="418" y="206" {...smallText}>separately &mdash; never deleted</text>

      <path d="M400 126 H520" fill="none" stroke={INK} strokeWidth={1.6} />
      <path d="M400 134 H520" fill="none" stroke={INK} strokeWidth={1.6} />
      <rect x="513" y="123" width="14" height="14" fill={INK} />
      <text x="620" y="150" textAnchor="end" {...nodeText}>opportunity and revenue</text>
      {/* dropped clear of the branch label below the chain — MEASURED collision
          at 1425: 195x12 units */}
      <text x="620" y="236" textAnchor="end" {...smallText}>&mdash; your numbers, from your system</text>

      <text x="10" y="236" {...bdText}>WE ANSWER UP TO THE RULE</text>
    </svg>
  );

  return (
    <Figure
      vertical={vertical}
      horizontal={horizontal}
      caption={
        <>
          One object in a changed condition, not a classification of enquiries into grades. The rule is the
          moment the five conditions below are checked. Nothing on this drawing is a count, a rate or a
          proportion, and nothing on it scores an enquiry.
        </>
      }
    />
  );
}
