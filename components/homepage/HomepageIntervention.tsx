import { Container } from '@/components/layout/Container';

/**
 * INTERVENTION / RESOLUTION — "how the work produces an enquiry." Session
 * 18B merged the re-read, F1 ("the run") and the capabilities chapter into
 * this one view; Phase C preserves that compression rather than re-expanding
 * it into separate DOM chapters, per the instruction not to restore removed
 * copy.
 *
 * F1 is rendered complete and static from first paint (no descent scale-in,
 * no stroke-dashoffset draw) — classification FULL, a bounded explanatory
 * figure, never ambient. All three stages are shown open simultaneously
 * (this is the prototype's own no-JS / reduced-motion composed state), so
 * the tab interaction and auto-advance sequencing — both Phase D motion —
 * are not implemented and no content is gated behind an interaction.
 *
 * QUANTITY SAFETY: the chain draws points and joins only, never a length or
 * a fill percentage — a point cannot express a proportion.
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, chapter "the
 * system".
 *
 * SESSION 25B — the material Phase C correction. Phase C shipped ONE
 * WIDE-proportioned drawing at every width inside a horizontal-scroll
 * wrapper. Rendered, that clipped 37% of the figure at 360/390/430 — the
 * accountability boundary, the qualified enquiry and opportunity/revenue were
 * all off-screen behind a scrollbar, and the labels rendered at roughly 7px.
 * The approved prototype's three drawings (NARROW 330x500 <=699, MEDIUM
 * 640x458 700-1099, WIDE 1000x216 >=1100) are now reproduced exactly, so the
 * whole chain is visible and legible at every width and the descent reads
 * top-to-bottom on mobile as approved. Session 18C's mobile de-clutter rules
 * (numerals hidden, legend reduced to one entry below 761px) are also
 * restored.
 */
const STAGES = [
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
        <h2 className="m-0 block text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim">
          How the work produces an enquiry
        </h2>
        <p className="mt-[18px] max-w-[20ch] font-heading text-[clamp(2rem,5vw,4.3rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          They are different skills.{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>The joins decide the result.</span>
        </p>

        <div className="mt-[clamp(26px,3vw,46px)] grid grid-cols-1 items-start gap-[clamp(26px,3.4vw,52px)]">
          <ol className="max-w-[52ch] list-none border-t-2 border-resolve-ink p-0">
            {STAGES.map((s, i) => (
              <li key={s.n} className="border-b border-resolve-line py-[clamp(14px,1.8vw,20px)]">
                <div className="grid grid-cols-[20px_1fr] items-baseline gap-4 max-[761px]:grid-cols-1 max-[761px]:gap-0">
                  <span
                    aria-hidden="true"
                    className="text-[.82rem] font-bold tracking-[0.18em] max-[761px]:hidden"
                    style={{ color: 'var(--resolve-accent-dark)' }}
                  >
                    {s.n}
                  </span>
                  <h3
                    className={`font-heading text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-resolve-ink ${
                      i === 0 ? 'max-[761px]:text-[1.5rem]' : 'max-[761px]:text-[1.15rem]'
                    }`}
                  >
                    {s.title}
                  </h3>
                </div>
                <p className="ml-9 mt-1 max-w-[40ch] text-base leading-[1.45] text-resolve-dim max-[761px]:ml-0">
                  {s.body}
                </p>
                <div className="ml-9 mt-3 flex flex-wrap gap-x-2.5 gap-y-2 max-[761px]:ml-0 max-[761px]:mt-2 max-[761px]:gap-x-5 max-[761px]:gap-y-0">
                  {s.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="inline-flex min-h-[40px] items-center rounded-full border-[1.5px] border-resolve-line px-[15px] text-[.88rem] font-semibold text-resolve-ink no-underline hover:border-resolve-ink max-[761px]:rounded-none max-[761px]:border-0 max-[761px]:border-b-2 max-[761px]:px-0 max-[761px]:py-2.5"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div>
            <ChainFigure />
            <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-[clamp(16px,2.2vw,30px)] gap-y-2 p-0 text-[.84rem] font-medium leading-[1.4] text-resolve-dim">
              {/* Session 18C: below 761px the figure's own labels already name
                  both honest states, so only the mark they do NOT name keeps a
                  legend entry. */}
              <li className="flex items-center gap-[9px] max-[761px]:hidden">
                <span
                  aria-hidden="true"
                  className="h-[13px] w-[13px] flex-none border-2"
                  style={{ background: 'var(--resolve-ink)', borderColor: 'var(--resolve-ink)' }}
                />
                a point on the chain
              </li>
              <li className="flex items-center gap-[9px] max-[761px]:hidden">
                <span
                  aria-hidden="true"
                  className="h-[13px] w-[13px] flex-none"
                  style={{ background: 'transparent', border: '2px dashed var(--resolve-gap)' }}
                />
                arrived with no usable trail
              </li>
              <li className="flex items-center gap-[9px]" style={{ color: 'var(--resolve-accent-dark)' }}>
                <b>|</b> a join, where the work is done
              </li>
            </ul>
            <p className="mt-4 max-w-none text-[.82rem] font-medium leading-[1.5] text-resolve-dim">
              Structure only. <b className="font-bold text-resolve-ink">No quantity, proportion, rate or duration is
              drawn</b>, and the spacing between points carries no meaning.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ F1 --
   The chain from demand to a recorded enquiry, drawn complete and static, in
   the approved prototype's three width-native compositions. Exactly one is
   ever displayed: the other two are `display:none`, so they are removed from
   the accessibility tree and only one accessible name is exposed.

   The static state carries the prototype's own `data-stage="1"` reading —
   the discovery point and the first join are the subject — which is the one
   tangerine accent inside the figure. */
const INK = 'var(--resolve-ink)';
const GAP = 'var(--resolve-gap)';
const DIM = 'var(--resolve-dim)';
const ON = 'var(--resolve-accent-deep)';

const TITLE = 'The chain from demand to a recorded enquiry, and where our accountability stops';
const DESC =
  'One continuous chain with six points in order: discovery and source, landing, interaction, ' +
  'the enquiry, the qualified enquiry, and opportunity and revenue. Buyer demand before discovery ' +
  'is dashed because it is not measured. Ticks cross the chain at the joins, where the work is done. ' +
  'One enquiry arrives from an open, dashed mark with no upstream segment — it is unattributed. ' +
  'A rule crosses the chain after the qualified enquiry: everything before it is what we are ' +
  'accountable for. The segment beyond it is a double line because it is your own data, from your ' +
  'own system.';

const nodeText = { fontSize: 13, fontWeight: 600, fill: DIM } as const;
const bdText = {
  fontSize: 12,
  fontWeight: 700,
  fill: INK,
  letterSpacing: '0.09em',
} as const;

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
        <line x1="46" y1="14" x2="46" y2="54" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <text x="76" y="28" {...nodeText}>demand we cannot see</text>
        <path d="M46 54 V380" fill="none" stroke={INK} strokeWidth={2.5} />
        <line x1="36" y1="92" x2="56" y2="92" stroke={ON} strokeWidth={2.5} />
        <line x1="36" y1="168" x2="56" y2="168" stroke={GAP} strokeWidth={2.5} />
        <line x1="36" y1="244" x2="56" y2="244" stroke={GAP} strokeWidth={2.5} />
        <rect x="39" y="47" width="14" height="14" fill={ON} />
        <rect x="39" y="123" width="14" height="14" fill={INK} />
        <rect x="39" y="199" width="14" height="14" fill={INK} />
        <rect x="39" y="275" width="14" height="14" fill={INK} />
        <rect x="4" y="306" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
        <line x1="20" y1="310" x2="37" y2="290" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <rect x="39" y="343" width="14" height="14" fill={INK} />
        <line x1="6" y1="380" x2="326" y2="380" stroke={INK} strokeWidth={2} />
        <text x="6" y="370" {...bdText}>WE ANSWER FOR THIS MUCH</text>
        <path d="M42 380 V414" fill="none" stroke={INK} strokeWidth={1.6} />
        <path d="M50 380 V414" fill="none" stroke={INK} strokeWidth={1.6} />
        <rect x="39" y="407" width="14" height="14" fill={INK} />
        <text x="76" y="60" {...nodeText}>discovery and source</text>
        <text x="76" y="136" {...nodeText}>landing</text>
        <text x="76" y="212" {...nodeText}>interaction</text>
        <text x="76" y="288" {...nodeText}>the enquiry</text>
        <text x="76" y="310" {...nodeText}>&mdash; one with no usable trail</text>
        <text x="76" y="356" {...nodeText}>the qualified enquiry</text>
        <text x="76" y="420" {...nodeText}>opportunity and revenue</text>
        <text x="76" y="442" {...nodeText}>&mdash; your numbers, from your system</text>
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
        <line x1="64" y1="14" x2="64" y2="54" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <text x="98" y="28" {...nodeText}>demand we cannot see</text>
        <path d="M64 54 V360" fill="none" stroke={INK} strokeWidth={2.5} />
        <line x1="54" y1="90" x2="74" y2="90" stroke={ON} strokeWidth={2.5} />
        <line x1="54" y1="158" x2="74" y2="158" stroke={GAP} strokeWidth={2.5} />
        <line x1="54" y1="226" x2="74" y2="226" stroke={GAP} strokeWidth={2.5} />
        <rect x="57" y="47" width="14" height="14" fill={ON} />
        <rect x="57" y="115" width="14" height="14" fill={INK} />
        <rect x="57" y="183" width="14" height="14" fill={INK} />
        <rect x="57" y="251" width="14" height="14" fill={INK} />
        <rect x="8" y="286" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
        <line x1="24" y1="290" x2="55" y2="266" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <rect x="57" y="319" width="14" height="14" fill={INK} />
        <line x1="14" y1="360" x2="624" y2="360" stroke={INK} strokeWidth={2} />
        <text x="624" y="350" textAnchor="end" {...bdText}>WE ANSWER FOR THIS MUCH</text>
        <path d="M60 360 V394" fill="none" stroke={INK} strokeWidth={1.6} />
        <path d="M68 360 V394" fill="none" stroke={INK} strokeWidth={1.6} />
        <rect x="57" y="387" width="14" height="14" fill={INK} />
        <text x="98" y="60" {...nodeText}>discovery and source</text>
        <text x="98" y="128" {...nodeText}>landing</text>
        <text x="98" y="196" {...nodeText}>interaction</text>
        <text x="98" y="264" {...nodeText}>the enquiry</text>
        <text x="98" y="286" {...nodeText}>&mdash; one arrived with no usable trail</text>
        <text x="98" y="332" {...nodeText}>the qualified enquiry</text>
        <text x="98" y="400" {...nodeText}>opportunity and revenue</text>
        <text x="98" y="422" {...nodeText}>&mdash; your numbers, from your system</text>
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
        <line x1="12" y1="128" x2="70" y2="128" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <text x="12" y="112" {...nodeText}>demand we cannot see</text>
        <path d="M70 128 H862" fill="none" stroke={INK} strokeWidth={2.5} />
        <line x1="158" y1="118" x2="158" y2="138" stroke={ON} strokeWidth={2.5} />
        <line x1="334" y1="118" x2="334" y2="138" stroke={GAP} strokeWidth={2.5} />
        <line x1="510" y1="118" x2="510" y2="138" stroke={GAP} strokeWidth={2.5} />
        <rect x="63" y="121" width="14" height="14" fill={ON} />
        <rect x="239" y="121" width="14" height="14" fill={INK} />
        <rect x="415" y="121" width="14" height="14" fill={INK} />
        <rect x="591" y="121" width="14" height="14" fill={INK} />
        <rect x="591" y="50" width="14" height="14" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
        <line x1="598" y1="66" x2="598" y2="121" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <text x="616" y="61" {...nodeText}>arrived with no usable trail</text>
        <rect x="767" y="121" width="14" height="14" fill={INK} />
        <line x1="862" y1="72" x2="862" y2="182" stroke={INK} strokeWidth={2} />
        <text x="862" y="58" textAnchor="middle" {...bdText}>WE ANSWER FOR THIS MUCH</text>
        <path d="M862 124 H950" fill="none" stroke={INK} strokeWidth={1.6} />
        <path d="M862 132 H950" fill="none" stroke={INK} strokeWidth={1.6} />
        <rect x="943" y="121" width="14" height="14" fill={INK} />
        <text x="63" y="162" {...nodeText}>discovery</text>
        <text x="63" y="180" {...nodeText}>and source</text>
        <text x="246" y="162" textAnchor="middle" {...nodeText}>landing</text>
        <text x="422" y="162" textAnchor="middle" {...nodeText}>interaction</text>
        <text x="598" y="162" textAnchor="middle" {...nodeText}>the enquiry</text>
        <text x="774" y="162" textAnchor="middle" {...nodeText}>the qualified</text>
        <text x="774" y="180" textAnchor="middle" {...nodeText}>enquiry</text>
        <text x="1000" y="162" textAnchor="end" {...nodeText}>opportunity</text>
        <text x="1000" y="180" textAnchor="end" {...nodeText}>and revenue</text>
        <text x="1000" y="200" textAnchor="end" {...nodeText}>&mdash; your numbers, from your system</text>
      </svg>
    </div>
  );
}
