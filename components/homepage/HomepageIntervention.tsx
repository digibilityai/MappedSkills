import type { CSSProperties } from 'react';
import { Container } from '@/components/layout/Container';
import { SystemStages, type Stage } from '@/components/homepage/SystemStages';

/**
 * INTERVENTION / RESOLUTION — "how the work produces an enquiry." Session
 * 18B merged the re-read, F1 ("the run") and the capabilities chapter into
 * this one view; Phase C preserved that compression rather than re-expanding
 * it into separate DOM chapters.
 *
 * F1 is classification FULL — a bounded explanatory figure, never ambient. It
 * is complete in the DOM from first paint and no content is gated behind an
 * interaction: every stage's copy and all seven links are server-rendered.
 *
 * QUANTITY SAFETY: the chain draws points and joins only, never a length or
 * a fill percentage — a point cannot express a proportion.
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, chapter "the
 * system".
 *
 * SESSION 25B — the material Phase C correction. The approved prototype's
 * three drawings (NARROW 330x500 <=699, MEDIUM 640x458 700-1099, WIDE
 * 1000x216 >=1100) are reproduced exactly, so the whole chain is visible and
 * legible at every width and the descent reads top-to-bottom on mobile as
 * approved. Session 18C's mobile de-clutter rules (numerals hidden, legend
 * reduced to one entry below 761px) are also applied.
 *
 * SESSION 26 — PHASE D. The stage list becomes the approved tablist and the
 * chain gains the approved descent, draw and stage marks — all of which live
 * in SystemStages. This file keeps the chapter, its copy and the entire F1 DOM
 * as Server Component output; the only things added to the figure below are
 * motion hooks (`rsv-draw` / `rsv-fade` and their delays) and the `data-s`
 * stage attributes. Every element's SETTLED appearance is unchanged, which is
 * why the no-JS and reduced-motion figure is the Phase C figure exactly.
 */
const STAGES: Stage[] = [
  {
    n: '01',
    title: 'Capture',
    body: 'Reach the buyers already looking. Some demand never reaches you at all.',
    links: [
      { href: '/seo', label: 'Organic search' },
      { href: '/google-ads', label: 'Google Ads' },
      { href: '/social-media-ads', label: 'Paid social' },
      { href: '/ai-seo', label: 'AI search' },
    ],
  },
  {
    n: '02',
    title: 'Convert',
    body: 'Make the route from that first visit to a sent enquiry work.',
    links: [
      { href: '/conversion-optimization', label: 'Conversion optimisation' },
      { href: '/lead-generation', label: 'Lead generation' },
    ],
  },
  {
    n: '03',
    title: 'Measure',
    body: 'Each enquiry records where it came from. What arrives with no usable trail is marked unattributed, never assigned.',
    links: [{ href: '/how-it-works', label: 'How we measure it' }],
  },
];

export function HomepageIntervention() {
  return (
    <section className="border-t border-resolve-line bg-resolve-ground py-[clamp(66px,9vw,152px)] text-resolve-ink">
      <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
        <h2 className="rsv-rv m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
          How the work produces an enquiry
        </h2>
        <p className="rsv-rv mt-[18px] max-w-[20ch] font-heading text-[clamp(2rem,5vw,4.3rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          They are different skills.{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>The joins decide the result.</span>
        </p>

        <SystemStages stages={STAGES} chain={<ChainFigure />} />
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ F1 --
   The chain from demand to a recorded enquiry, in the approved prototype's
   three width-native compositions. Exactly one is ever displayed: the other
   two are `display:none`, so they are removed from the accessibility tree and
   only one accessible name is exposed.

   The `--rsv-len` / `--rsv-d` / `--rsv-dur` values and the `data-s` stage
   attributes are transcribed from the approved prototype. They are inert
   unless the chain's wrapper carries `data-rsv`, which only a hydrated
   SystemStages with motion allowed ever writes. */
const INK = 'var(--resolve-ink)';
const GAP = 'var(--resolve-gap)';
const DIM = 'var(--resolve-dim)';

const TITLE = 'The chain from demand to a recorded enquiry, and where our accountability stops';
const DESC =
  'One continuous chain with six points in order: discovery and source, landing, interaction, ' +
  'the enquiry, the qualified enquiry, and opportunity and revenue. Buyer demand before discovery ' +
  'is dashed because it is not measured. Ticks cross the chain at the joins, where the work is done. ' +
  'One enquiry arrives from an open, dashed mark with no upstream segment — it is unattributed. ' +
  'A rule crosses the chain after the qualified enquiry: everything before it is what we are ' +
  'accountable for. The segment beyond it is a double line because it is your own data, from your ' +
  'own system. Capture marks the discovery point, convert marks landing through the enquiry, and ' +
  'measure marks the qualified enquiry, the unattributed arrival and the boundary.';

const nodeText = { fontSize: 13, fontWeight: 600, fill: DIM } as const;
const bdText = {
  fontSize: 12,
  fontWeight: 700,
  fill: INK,
  letterSpacing: '0.09em',
} as const;

/** delay only — the order marks appear in. Not a duration, rate or quantity. */
const d = (ms: number): CSSProperties => ({ '--rsv-d': `${ms}ms` } as CSSProperties);
/** path length + draw duration for the one-off `stroke-dashoffset` draw */
const draw = (len: number, ms: number, dur: number): CSSProperties =>
  ({ '--rsv-len': len, '--rsv-d': `${ms}ms`, '--rsv-dur': `${dur}ms` } as CSSProperties);

function ChainFigure() {
  return (
    <div className="relative">
      {/* NARROW — the same vertical object at a constant node interval */}
      <svg
        viewBox="0 0 330 500"
        role="img"
        aria-labelledby="chain-n-t chain-n-d"
        className="block h-auto w-full overflow-visible min-[700px]:hidden"
      >
        <title id="chain-n-t">{TITLE}</title>
        <desc id="chain-n-d">{DESC}</desc>
        <line className="rsv-fade" style={d(0)} x1="46" y1="14" x2="46" y2="54" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <text className="rsv-fade" style={d(0)} x="76" y="28" {...nodeText}>demand we cannot see</text>
        <path className="rsv-draw" style={draw(326, 160, 1150)} d="M46 54 V380" fill="none" stroke={INK} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="1 2" style={d(300)} x1="36" y1="92" x2="56" y2="92" stroke={GAP} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="2" style={d(560)} x1="36" y1="168" x2="56" y2="168" stroke={GAP} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="2" style={d(820)} x1="36" y1="244" x2="56" y2="244" stroke={GAP} strokeWidth={2.5} />
        <rect className="rsv-pt rsv-fade" data-s="1" style={d(180)} x="39" y="47" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(440)} x="39" y="123" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(700)} x="39" y="199" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(960)} x="39" y="275" width="14" height="14" fill={INK} />
        <rect className="rsv-nd-open rsv-fade" data-s="3" style={d(1020)} x="4" y="306" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
        <line className="rsv-fade" style={d(1020)} x1="20" y1="310" x2="37" y2="290" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <rect className="rsv-pt rsv-fade" data-s="3" style={d(1220)} x="39" y="343" width="14" height="14" fill={INK} />
        <line className="rsv-bd rsv-draw" style={draw(320, 1400, 520)} x1="6" y1="380" x2="326" y2="380" stroke={INK} strokeWidth={2} />
        <text className="rsv-fade" style={d(1560)} x="6" y="370" {...bdText}>WE ANSWER FOR THIS MUCH</text>
        <path className="rsv-draw" style={draw(40, 1560, 420)} d="M42 380 V414" fill="none" stroke={INK} strokeWidth={1.6} />
        <path className="rsv-draw" style={draw(40, 1560, 420)} d="M50 380 V414" fill="none" stroke={INK} strokeWidth={1.6} />
        <rect className="rsv-pt rsv-fade" style={d(1860)} x="39" y="407" width="14" height="14" fill={INK} />
        <text className="rsv-fade" style={d(180)} x="76" y="60" {...nodeText}>discovery and source</text>
        <text className="rsv-fade" style={d(440)} x="76" y="136" {...nodeText}>landing</text>
        <text className="rsv-fade" style={d(700)} x="76" y="212" {...nodeText}>interaction</text>
        <text className="rsv-fade" style={d(960)} x="76" y="288" {...nodeText}>the enquiry</text>
        <text className="rsv-fade" style={d(1020)} x="76" y="310" {...nodeText}>&mdash; one with no usable trail</text>
        <text className="rsv-fade" style={d(1220)} x="76" y="356" {...nodeText}>the qualified enquiry</text>
        <text className="rsv-fade" style={d(1860)} x="76" y="420" {...nodeText}>opportunity and revenue</text>
        <text className="rsv-fade" style={d(1860)} x="76" y="442" {...nodeText}>&mdash; your numbers, from your system</text>
      </svg>

      {/* MEDIUM — a genuine vertical form, not the wide drawing shrunk */}
      <svg
        viewBox="0 0 640 458"
        role="img"
        aria-labelledby="chain-m-t chain-m-d"
        className="hidden h-auto w-full overflow-visible min-[700px]:block min-[1100px]:hidden"
      >
        <title id="chain-m-t">{TITLE}</title>
        <desc id="chain-m-d">{DESC}</desc>
        <line className="rsv-fade" style={d(0)} x1="64" y1="14" x2="64" y2="54" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <text className="rsv-fade" style={d(0)} x="98" y="28" {...nodeText}>demand we cannot see</text>
        <path className="rsv-draw" style={draw(310, 160, 1150)} d="M64 54 V360" fill="none" stroke={INK} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="1 2" style={d(300)} x1="54" y1="90" x2="74" y2="90" stroke={GAP} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="2" style={d(560)} x1="54" y1="158" x2="74" y2="158" stroke={GAP} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="2" style={d(820)} x1="54" y1="226" x2="74" y2="226" stroke={GAP} strokeWidth={2.5} />
        <rect className="rsv-pt rsv-fade" data-s="1" style={d(180)} x="57" y="47" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(440)} x="57" y="115" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(700)} x="57" y="183" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(960)} x="57" y="251" width="14" height="14" fill={INK} />
        <rect className="rsv-nd-open rsv-fade" data-s="3" style={d(1020)} x="8" y="286" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
        <line className="rsv-fade" style={d(1020)} x1="24" y1="290" x2="55" y2="266" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <rect className="rsv-pt rsv-fade" data-s="3" style={d(1220)} x="57" y="319" width="14" height="14" fill={INK} />
        <line className="rsv-bd rsv-draw" style={draw(610, 1400, 520)} x1="14" y1="360" x2="624" y2="360" stroke={INK} strokeWidth={2} />
        <text className="rsv-fade" style={d(1560)} x="624" y="350" textAnchor="end" {...bdText}>WE ANSWER FOR THIS MUCH</text>
        <path className="rsv-draw" style={draw(40, 1560, 420)} d="M60 360 V394" fill="none" stroke={INK} strokeWidth={1.6} />
        <path className="rsv-draw" style={draw(40, 1560, 420)} d="M68 360 V394" fill="none" stroke={INK} strokeWidth={1.6} />
        <rect className="rsv-pt rsv-fade" style={d(1860)} x="57" y="387" width="14" height="14" fill={INK} />
        <text className="rsv-fade" style={d(180)} x="98" y="60" {...nodeText}>discovery and source</text>
        <text className="rsv-fade" style={d(440)} x="98" y="128" {...nodeText}>landing</text>
        <text className="rsv-fade" style={d(700)} x="98" y="196" {...nodeText}>interaction</text>
        <text className="rsv-fade" style={d(960)} x="98" y="264" {...nodeText}>the enquiry</text>
        <text className="rsv-fade" style={d(1020)} x="98" y="286" {...nodeText}>&mdash; one arrived with no usable trail</text>
        <text className="rsv-fade" style={d(1220)} x="98" y="332" {...nodeText}>the qualified enquiry</text>
        <text className="rsv-fade" style={d(1860)} x="98" y="400" {...nodeText}>opportunity and revenue</text>
        <text className="rsv-fade" style={d(1860)} x="98" y="422" {...nodeText}>&mdash; your numbers, from your system</text>
      </svg>

      {/* WIDE — one continuous horizontal object */}
      <svg
        viewBox="0 0 1000 216"
        role="img"
        aria-labelledby="chain-w-t chain-w-d"
        className="hidden h-auto w-full overflow-visible min-[1100px]:block"
      >
        <title id="chain-w-t">{TITLE}</title>
        <desc id="chain-w-d">{DESC}</desc>
        <line className="rsv-fade" style={d(0)} x1="12" y1="128" x2="70" y2="128" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <text className="rsv-fade" style={d(0)} x="12" y="112" {...nodeText}>demand we cannot see</text>
        <path className="rsv-draw" style={draw(800, 160, 1150)} d="M70 128 H862" fill="none" stroke={INK} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="1 2" style={d(300)} x1="158" y1="118" x2="158" y2="138" stroke={GAP} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="2" style={d(560)} x1="334" y1="118" x2="334" y2="138" stroke={GAP} strokeWidth={2.5} />
        <line className="rsv-tick rsv-fade" data-s="2" style={d(820)} x1="510" y1="118" x2="510" y2="138" stroke={GAP} strokeWidth={2.5} />
        <rect className="rsv-pt rsv-fade" data-s="1" style={d(180)} x="63" y="121" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(440)} x="239" y="121" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(700)} x="415" y="121" width="14" height="14" fill={INK} />
        <rect className="rsv-pt rsv-fade" data-s="2" style={d(960)} x="591" y="121" width="14" height="14" fill={INK} />
        <rect className="rsv-nd-open rsv-fade" data-s="3" style={d(1020)} x="591" y="50" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
        <line className="rsv-fade" style={d(1020)} x1="598" y1="66" x2="598" y2="121" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <text className="rsv-fade" style={d(1020)} x="616" y="61" {...nodeText}>arrived with no usable trail</text>
        <rect className="rsv-pt rsv-fade" data-s="3" style={d(1220)} x="767" y="121" width="14" height="14" fill={INK} />
        <line className="rsv-bd rsv-draw" style={draw(110, 1400, 520)} x1="862" y1="72" x2="862" y2="182" stroke={INK} strokeWidth={2} />
        <text className="rsv-fade" style={d(1560)} x="862" y="58" textAnchor="middle" {...bdText}>WE ANSWER FOR THIS MUCH</text>
        <path className="rsv-draw" style={draw(90, 1560, 420)} d="M862 124 H950" fill="none" stroke={INK} strokeWidth={1.6} />
        <path className="rsv-draw" style={draw(90, 1560, 420)} d="M862 132 H950" fill="none" stroke={INK} strokeWidth={1.6} />
        <rect className="rsv-pt rsv-fade" style={d(1860)} x="943" y="121" width="14" height="14" fill={INK} />
        <text className="rsv-fade" style={d(180)} x="63" y="162" {...nodeText}>discovery</text>
        <text className="rsv-fade" style={d(180)} x="63" y="180" {...nodeText}>and source</text>
        <text className="rsv-fade" style={d(440)} x="246" y="162" textAnchor="middle" {...nodeText}>landing</text>
        <text className="rsv-fade" style={d(700)} x="422" y="162" textAnchor="middle" {...nodeText}>interaction</text>
        <text className="rsv-fade" style={d(960)} x="598" y="162" textAnchor="middle" {...nodeText}>the enquiry</text>
        <text className="rsv-fade" style={d(1220)} x="774" y="162" textAnchor="middle" {...nodeText}>the qualified</text>
        <text className="rsv-fade" style={d(1220)} x="774" y="180" textAnchor="middle" {...nodeText}>enquiry</text>
        <text className="rsv-fade" style={d(1860)} x="1000" y="162" textAnchor="end" {...nodeText}>opportunity</text>
        <text className="rsv-fade" style={d(1860)} x="1000" y="180" textAnchor="end" {...nodeText}>and revenue</text>
        <text className="rsv-fade" style={d(1860)} x="1000" y="200" textAnchor="end" {...nodeText}>&mdash; your numbers, from your system</text>
      </svg>
    </div>
  );
}
