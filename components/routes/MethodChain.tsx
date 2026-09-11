import type { ReactNode } from 'react';

/**
 * SESSION 29 — PHASE G — `/how-it-works`: F1 class A (FULL) plus F4 as a
 * class-C STATE on the same object.
 *
 * `22_F1_USAGE_TAXONOMY.md` §3 assigns `/how-it-works` **A — FULL (§3) + C —
 * STATE as F4 (§4/§5)**, and §6 binds what each must be: a STATE is "the same
 * object in a changed condition, and the reader must be able to recognise it as
 * such". `MethodChainState` therefore re-draws `MethodChain`'s geometry, node
 * order and mark language at 34% and changes exactly three things: the chain
 * recedes, the accountability boundary thickens, and the arrivals that carry no
 * usable trail become the subject. It is one object twice, not two figures.
 *
 * WHY THIS DUPLICATES RATHER THAN IMPORTS the homepage's chain. Same reason
 * Phase F gave for `ChainFigure`: the homepage is a closed, validated baseline
 * (Gate 10, `DEC-019`), and extracting its figure into a shared module would
 * mean editing a homepage file to serve a Phase G route. The mark language, the
 * dashed-means-unmeasured convention, the boundary rule and the double line are
 * TRANSCRIBED. `components/homepage/*` is untouched.
 *
 * QUANTITY SAFETY, checked on all four drawings. Points, joins, dashes and one
 * boundary rule. No bar, width, fill, area or length encodes demand, loss,
 * volume, share or a rate. Run length encodes only how far a route gets.
 * NOTHING TAPERS — the distance between "the run" and "a funnel" is one
 * decision about tapering and it is not taken. No per-stage colours: that makes
 * it a transit map, and a transit map of a marketing process is a funnel with
 * better graphics.
 *
 * F4's SPECIFIC HONESTY RULE (`19_FIGURE_PRIORITISATION.md` F4). "Illustrative
 * proportions presented as real" are the named failure. No measured proportion
 * of unattributed enquiries exists, so the state drawing shows CATEGORIES AND
 * RELATIONSHIPS AND NO QUANTITIES AT ALL — six named categories, each drawn the
 * same size, none rendered as a thin residual or an "other", and none omitted.
 * The gaps are drawn as findings, not as empty states, warnings or errors (B22).
 */

const INK = 'var(--resolve-ink)';
const GAP = 'var(--resolve-gap)';
const DIM = 'var(--resolve-dim)';
const OWN = 'var(--resolve-accent-deep)';

const nodeText = { fontSize: 12, fontWeight: 600, fill: DIM } as const;
const smallText = { fontSize: 11, fontWeight: 600, fill: GAP } as const;
const catText = { fontSize: 12, fontWeight: 600, fill: DIM } as const;
const bdText = { fontSize: 12, fontWeight: 700, fill: INK, letterSpacing: '0.08em' } as const;

/* One accessible figure, two width-native drawings, exactly one ever displayed.
   ONE media query governs both and the conditions are exact complements, so
   there is no width at which neither renders — the one-pixel hole Phase F found
   at exactly 760px cannot recur here. The hidden drawing is `display:none` and
   leaves the accessibility tree, so one accessible name is exposed, not two. */
function FigureFrame({
  vertical,
  horizontal,
  verticalMax = 360,
  horizontalMax = 900,
  caption,
}: {
  vertical: ReactNode;
  horizontal: ReactNode;
  verticalMax?: number;
  horizontalMax?: number;
  caption: ReactNode;
}) {
  return (
    <figure className="m-0 mt-[clamp(26px,3.2vw,44px)]">
      <div className="block min-[761px]:hidden" style={{ maxWidth: verticalMax }}>
        {vertical}
      </div>
      <div className="hidden min-[761px]:block" style={{ maxWidth: horizontalMax }}>
        {horizontal}
      </div>
      <figcaption className="mt-[clamp(16px,2vw,24px)] max-w-none text-[.9rem] leading-[1.55] text-resolve-dim">
        {caption}
      </figcaption>
    </figure>
  );
}

function Node({ x, y }: { x: number; y: number }) {
  return <rect x={x - 7} y={y - 7} width="14" height="14" fill={INK} />;
}

function OpenMark({ x, y }: { x: number; y: number }) {
  return (
    <rect x={x - 6.5} y={y - 6.5} width="13" height="13" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="4 4" />
  );
}

/* ==========================================================================
   A — FULL  ·  /how-it-works §3, "what we measure"
   Six points on one chain, which is what the approved copy says the section is.
   ========================================================================== */

const FULL_TITLE = 'The six points measured on one chain, with the accountability boundary drawn';
const FULL_DESC =
  'One continuous chain with six points in order: discovery and source, landing, interaction, the enquiry, ' +
  'the qualified enquiry, and opportunity and revenue. The stretch before discovery is dashed because buyer ' +
  'demand that never reaches the business is not measured. One enquiry arrives from an open, dashed mark with ' +
  'no upstream segment: it has no usable trail and it still counts. A rule crosses the chain after the ' +
  'qualified enquiry: everything before it is what this firm is accountable for. The segment beyond the rule ' +
  'is drawn as a double line because it is the client&apos;s own data from the client&apos;s own system, and it is ' +
  'reported as theirs. No point carries a count, a size, a share or a rate.';

export function MethodChain() {
  const vertical = (
    <svg viewBox="0 0 330 660" role="img" aria-labelledby="mc-v-t mc-v-d" className="block h-auto w-full">
      <title id="mc-v-t">{FULL_TITLE}</title>
      <desc id="mc-v-d">{FULL_DESC}</desc>

      {/* demand we never see */}
      <line x1="44" y1="14" x2="44" y2="66" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="72" y="34" {...smallText}>buyer demand we cannot see</text>

      <Node x={44} y={72} />
      <text x="72" y="77" {...nodeText}>discovery and source</text>

      <path d="M44 79 V162" fill="none" stroke={INK} strokeWidth={3} />
      <Node x={44} y={168} />
      <text x="72" y="173" {...nodeText}>landing</text>

      <path d="M44 175 V258" fill="none" stroke={INK} strokeWidth={3} />
      <Node x={44} y={264} />
      <text x="72" y="269" {...nodeText}>interaction</text>

      <path d="M44 271 V354" fill="none" stroke={INK} strokeWidth={3} />
      {/* the unattached arrival: no upstream segment, and it still counts */}
      <OpenMark x={200} y={312} />
      <path d="M193 312 H60" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="214" y="309" {...smallText}>no usable trail</text>
      <text x="214" y="325" {...smallText}>&mdash; it still counts</text>

      <Node x={44} y={360} />
      <text x="72" y="365" {...nodeText}>the enquiry</text>

      <path d="M44 367 V450" fill="none" stroke={INK} strokeWidth={3} />
      <Node x={44} y={456} />
      <text x="72" y="461" {...nodeText}>the qualified enquiry</text>

      {/* the accountability boundary */}
      <line x1="8" y1="500" x2="240" y2="500" stroke={INK} strokeWidth={4} />
      <text x="8" y="522" {...bdText}>ACCOUNTABLE UP TO HERE</text>

      {/* beyond it: the client's own data, drawn as a double line */}
      <path d="M40 536 V596" fill="none" stroke={INK} strokeWidth={2} />
      <path d="M48 536 V596" fill="none" stroke={INK} strokeWidth={2} />
      <Node x={44} y={602} />
      <text x="72" y="600" {...nodeText}>opportunity and revenue</text>
      <text x="72" y="618" {...smallText}>your numbers, from your system</text>
      <text x="8" y="650" {...smallText}>nothing here is a count, a size or a rate</text>
    </svg>
  );

  const horizontal = (
    <svg viewBox="0 0 1000 300" role="img" aria-labelledby="mc-h-t mc-h-d" className="block h-auto w-full">
      <title id="mc-h-t">{FULL_TITLE}</title>
      <desc id="mc-h-d">{FULL_DESC}</desc>

      {/* demand we never see */}
      <line x1="10" y1="140" x2="60" y2="140" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="10" y="112" {...smallText}>buyer demand we cannot see</text>

      <Node x={60} y={140} />
      <path d="M60 140 H220" fill="none" stroke={INK} strokeWidth={3} />
      <Node x={220} y={140} />
      <path d="M220 140 H380" fill="none" stroke={INK} strokeWidth={3} />
      <Node x={380} y={140} />
      <path d="M380 140 H520" fill="none" stroke={INK} strokeWidth={3} />
      <Node x={520} y={140} />
      <path d="M520 140 H660" fill="none" stroke={INK} strokeWidth={3} />
      <Node x={660} y={140} />

      {/* the unattached arrival into the enquiry point */}
      <OpenMark x={520} y={56} />
      <path d="M520 63 V133" fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
      <text x="534" y="52" {...smallText}>no usable trail &mdash; it still counts</text>

      {/* the accountability boundary, drawn as an edge */}
      <line x1="760" y1="88" x2="760" y2="192" stroke={INK} strokeWidth={4} />
      <path d="M660 140 H760" fill="none" stroke={INK} strokeWidth={3} />

      {/* beyond it: the client's own data */}
      <path d="M760 136 H880" fill="none" stroke={INK} strokeWidth={2} />
      <path d="M760 144 H880" fill="none" stroke={INK} strokeWidth={2} />
      <Node x={880} y={140} />

      {/* Node names on TWO alternating baselines. Neighbouring labels are 140-160
          units apart and the longest is 21 characters (~134 units at 12px), so a
          single baseline would run them together; alternating guarantees clearance
          without shortening any label. */}
      <text x="10" y="176" {...nodeText}>discovery and source</text>
      <text x="220" y="200" {...nodeText}>landing</text>
      <text x="380" y="176" {...nodeText}>interaction</text>
      <text x="520" y="200" {...nodeText}>the enquiry</text>
      {/* END-anchored, hard against the boundary rule at x=760 rather than
          start-anchored at 640. Start-anchored it ran from 640 to ~774 and
          crossed the accountability rule — a text/line collision the
          text-versus-text collision sweep does not catch, and the one line on
          this drawing that must stay unambiguous. */}
      <text x="750" y="176" textAnchor="end" {...nodeText}>the qualified enquiry</text>
      <text x="1000" y="200" textAnchor="end" {...nodeText}>opportunity and revenue</text>
      <text x="1000" y="216" textAnchor="end" {...smallText}>your numbers, from your system</text>

      <text x="640" y="248" {...bdText}>ACCOUNTABLE UP TO HERE</text>
      <text x="10" y="248" {...smallText}>every point is reported against a starting point captured before the work begins</text>
      <text x="10" y="278" {...smallText}>no point on this drawing carries a count, a size, a share or a rate</text>
    </svg>
  );

  return (
    <FigureFrame
      vertical={vertical}
      horizontal={horizontal}
      caption={
        <>
          Six points on one chain. The dashed stretch before the first point is the honesty device used
          everywhere on this site &mdash; a dashed line means unmeasured &mdash; and the open mark arriving at
          the enquiry with no segment behind it is an enquiry with no usable trail, which still counts. The
          rule after the qualified enquiry is the accountability boundary. Past it the line doubles, because
          what follows is your own data from your own system and it is reported as yours. Nothing on the
          drawing states a quantity, because no quantity here is measured.
        </>
      }
    />
  );
}

/* ==========================================================================
   C — STATE, as F4  ·  /how-it-works §5, "what cannot be attributed"
   The same object in a changed condition: the chain recedes, the boundary
   thickens, and what arrives with nothing attached becomes the subject.
   ========================================================================== */

const STATE_TITLE = 'The same chain, with the six kinds of arrival that carry no usable source';
const STATE_DESC =
  'The same six-point chain, recessive. The enquiry point stays solid and the accountability boundary is ' +
  'thickened. Six kinds of arrival reach the enquiry point carrying no usable source, each drawn as an open ' +
  'dashed mark and each named: a person who researched on a phone and enquired on a laptop; a visitor who ' +
  'declined tracking consent; a link shared in a message, which arrives with no referrer; someone recommended, ' +
  'who saw the business offline or typed the address in; a phone call or an email, which carries no first ' +
  'touch at all; and revenue where the client supplies no close data. The six are drawn identically and none ' +
  'is smaller than the others: no proportion is shown, because none is measured. All six stay inside the ' +
  'count. A measurement gap never disqualifies a legitimate enquiry.';

const CATEGORIES = [
  'researched on a phone, enquired on a laptop',
  'tracking consent declined — correctly',
  'shared in a message: no referrer at all',
  'recommended, seen offline, or typed in',
  'a phone call or an email: no first touch',
  'revenue, where no close data is supplied',
];

export function MethodChainState() {
  const vertical = (
    <svg viewBox="0 0 330 640" role="img" aria-labelledby="ms-v-t ms-v-d" className="block h-auto w-full">
      <title id="ms-v-t">{STATE_TITLE}</title>
      <desc id="ms-v-d">{STATE_DESC}</desc>

      {/* the chain, recessive — the same object the reader has already read */}
      <g opacity="0.34">
        <line x1="44" y1="10" x2="44" y2="40" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <Node x={44} y={46} />
        <path d="M44 53 V86" fill="none" stroke={INK} strokeWidth={3} />
        <Node x={44} y={92} />
        <path d="M44 99 V132" fill="none" stroke={INK} strokeWidth={3} />
        <Node x={44} y={138} />
        <text x="72" y="51" {...nodeText}>discovery and source</text>
        <text x="72" y="97" {...nodeText}>landing</text>
        <text x="72" y="143" {...nodeText}>interaction</text>
      </g>

      <path d="M44 145 V184" fill="none" stroke={INK} strokeWidth={3} opacity="0.34" />
      <Node x={44} y={190} />
      <text x="72" y="195" fontSize={12} fontWeight={700} fill={INK}>the enquiry</text>

      {/* the boundary, thickened */}
      <line x1="8" y1="224" x2="300" y2="224" stroke={INK} strokeWidth={5} />
      <text x="8" y="246" {...bdText}>ALL SIX STAY IN THE COUNT</text>

      {CATEGORIES.map((label, i) => {
        const y = 286 + i * 46;
        return (
          <g key={label}>
            <OpenMark x={22} y={y - 4} />
            <path d="M36 282 H36" fill="none" />
            <text x="48" y={y} {...catText}>
              {label}
            </text>
          </g>
        );
      })}

      <text x="8" y="586" {...bdText}>A GAP IS A GAP, NOT A</text>
      <text x="8" y="604" {...bdText}>DISQUALIFICATION</text>
      <text x="8" y="628" {...smallText}>no proportion is shown: none is measured</text>
    </svg>
  );

  const horizontal = (
    <svg viewBox="0 0 1000 440" role="img" aria-labelledby="ms-h-t ms-h-d" className="block h-auto w-full">
      <title id="ms-h-t">{STATE_TITLE}</title>
      <desc id="ms-h-d">{STATE_DESC}</desc>

      {/* the same chain, recessive */}
      <g opacity="0.34">
        <line x1="10" y1="70" x2="60" y2="70" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
        <Node x={60} y={70} />
        <path d="M60 70 H220" fill="none" stroke={INK} strokeWidth={3} />
        <Node x={220} y={70} />
        <path d="M220 70 H380" fill="none" stroke={INK} strokeWidth={3} />
        <Node x={380} y={70} />
        <path d="M380 70 H520" fill="none" stroke={INK} strokeWidth={3} />
        <path d="M520 70 H660" fill="none" stroke={INK} strokeWidth={3} />
        <Node x={660} y={70} />
        <path d="M660 70 H760" fill="none" stroke={INK} strokeWidth={3} />
        <path d="M760 66 H880" fill="none" stroke={INK} strokeWidth={2} />
        <path d="M760 74 H880" fill="none" stroke={INK} strokeWidth={2} />
        <Node x={880} y={70} />
        <text x="10" y="46" {...nodeText}>discovery and source</text>
        <text x="750" y="46" textAnchor="end" {...nodeText}>the qualified enquiry</text>
      </g>

      {/* the enquiry point stays solid: it is the subject of this state */}
      <Node x={520} y={70} />
      <text x="520" y="46" fontSize={12} fontWeight={700} fill={INK}>the enquiry</text>

      {/* the boundary, thickened */}
      <line x1="760" y1="26" x2="760" y2="114" stroke={INK} strokeWidth={5} />

      {/* the bracket: everything below arrives at the enquiry with nothing attached */}
      <path d="M520 78 V132" fill="none" stroke={INK} strokeWidth={2} />
      <line x1="60" y1="132" x2="980" y2="132" stroke={INK} strokeWidth={2} />

      {CATEGORIES.map((label, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 70 : 530;
        const y = 186 + row * 56;
        return (
          <g key={label}>
            <path d={`M${x - 24} 132 V${y - 20}`} fill="none" stroke={GAP} strokeWidth={2} strokeDasharray="5 5" />
            <OpenMark x={x - 24} y={y - 5} />
            <text x={x} y={y} {...catText}>
              {label}
            </text>
          </g>
        );
      })}

      <line x1="10" y1="356" x2="990" y2="356" stroke={INK} strokeWidth={2} />
      <text x="10" y="386" {...bdText}>A MEASUREMENT GAP NEVER DISQUALIFIES A LEGITIMATE ENQUIRY</text>
      <text x="10" y="410" {...smallText}>all six stay in the count, and the gap is reported as a gap</text>
      <text x="10" y="430" {...smallText}>the six are drawn identically: no proportion is shown, because none is measured</text>
    </svg>
  );

  return (
    <FigureFrame
      vertical={vertical}
      horizontal={horizontal}
      caption={
        <>
          The same chain you have just read, in a changed condition: it recedes, the accountability boundary
          thickens, and what arrives carrying nothing becomes the subject. The six categories are drawn
          identically and at the same size on purpose. A figure showing &ldquo;unattributed&rdquo; at a
          plausible-looking size would be a fabricated statistic in graphic form, and no measured proportion
          exists. None of the six is a residual, an error or an empty state &mdash; each is a finding, each is
          a real enquiry, and each stays in the count.
        </>
      }
    />
  );
}
