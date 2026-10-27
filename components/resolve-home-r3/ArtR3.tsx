/** THE RESOLVE R3 illustrations: the explanatory graphics (hero demand-to-action story, buyer-journey scenes, process flow
 * icons). Conceptual and unquantified: no metrics, no dashboards. Decorative (aria-hidden); the HTML text carries the meaning. */

function rnd(n: number) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

const COLS = 12, ROWS = 9;
/* Controlled variation, not random flashing: fixed tiers chosen once. */
const ATTENTION = new Set([14, 15, 26, 27, 28, 38, 39, 40, 41, 50, 51, 52, 62, 63, 64, 75, 76, 40 - 20, 33, 45]);
const INTERACT = [27, 28, 39, 40, 41, 51, 52, 63];
const OUTCOME = new Set([40, 52]); /* one toward an enquiry, one toward a purchase */

/** Hero: many potential buyers, relevant attention, an ad interaction, then an enquiry or a purchase. Plays once (CSS), settles. */
export function HeroFlow() {
  const dots = Array.from({ length: COLS * ROWS }, (_, i) => {
    const c = i % COLS, r = Math.floor(i / COLS);
    return { i, x: 18 + c * 24 + (rnd(i) - .5) * 8, y: 20 + r * 34 + (rnd(i + 99) - .5) * 9 };
  });
  const byI = new Map(dots.map((d) => [d.i, d]));
  const AD = { x: 352, y: 128, w: 92, h: 104 };
  return <svg className="rv3-flow" viewBox="0 0 600 340" aria-hidden="true" focusable="false">
    {dots.map((d) => {
      const attn = ATTENTION.has(d.i), act = INTERACT.includes(d.i), out = OUTCOME.has(d.i);
      return <circle key={d.i} className={`f-d${attn ? ' f-attn' : ''}${act ? ' f-act' : ''}${out ? ' f-out' : ''}`} cx={d.x} cy={d.y} r={out ? 5.6 : 3.8}
        style={{ '--k': d.i % 11, '--a': (d.i * 7) % 9 } as React.CSSProperties} />;
    })}
    {INTERACT.map((i, n) => { const d = byI.get(i)!; return <path key={i} className="f-link" style={{ '--n': n } as React.CSSProperties} d={`M${d.x} ${d.y} C ${d.x + 40} ${d.y}, ${AD.x - 40} ${AD.y + AD.h / 2}, ${AD.x} ${AD.y + AD.h / 2}`} />; })}
    <g className="f-ad">
      <rect className="f-ad-card" x={AD.x} y={AD.y} width={AD.w} height={AD.h} rx="10" />
      <rect className="f-ad-pill" x={AD.x + 10} y={AD.y + 10} width="34" height="10" rx="5" />
      <rect className="f-ad-img" x={AD.x + 10} y={AD.y + 28} width={AD.w - 20} height="36" rx="4" />
      <rect className="f-ad-line" x={AD.x + 10} y={AD.y + 72} width="60" height="6" rx="3" />
      <rect className="f-ad-cta" x={AD.x + 10} y={AD.y + 84} width="40" height="12" rx="6" />
    </g>
    <path className="f-link f-link--out" d={`M${AD.x + AD.w} ${AD.y + 34} C 480 ${AD.y + 10}, 490 80, 520 70`} />
    <path className="f-link f-link--out" d={`M${AD.x + AD.w} ${AD.y + 70} C 480 ${AD.y + 96}, 490 250, 520 262`} />
    <g className="f-icon f-icon--enq" transform="translate(500 34)">
      <path className="f-bub" d="M0 8a8 8 0 0 1 8-8h60a8 8 0 0 1 8 8v40a8 8 0 0 1-8 8H26l-14 14V56H8a8 8 0 0 1-8-8z" />
      <path className="f-ln" d="M14 18h40M14 30h26" /><circle className="f-tick-bg" cx="60" cy="42" r="8" /><path className="f-tick" d="m56 42 3 3 6-6.5" />
    </g>
    <g className="f-icon f-icon--buy" transform="translate(502 232)">
      <path className="f-bag" d="M8 22h52l-4 40a6 6 0 0 1-6 5H18a6 6 0 0 1-6-5z" /><path className="f-bag-h" d="M20 22v-4a14 14 0 0 1 28 0v4" />
      <circle className="f-tick-bg" cx="34" cy="46" r="8" /><path className="f-tick" d="m30 46 3 3 6-6.5" />
    </g>
  </svg>;
}

function Stage({ children }: { children: React.ReactNode }) {
  return <svg className="rv3-stage-art" viewBox="0 0 160 112" aria-hidden="true" focusable="false">{children}</svg>;
}
/** The five buyer-journey scenes (composition unchanged from R1, which the owner approved). */
export function JourneyArt({ n }: { n: 1 | 2 | 3 | 4 | 5 }) {
  return <Stage>
    {n === 1 && <>
      <rect className="a-p" x="10" y="14" width="140" height="84" rx="9" />
      <rect className="a-p" x="22" y="26" width="116" height="20" rx="10" /><circle className="a-l" cx="36" cy="36" r="5" /><path className="a-l" d="m40 40 4 4" /><rect className="a-s" x="50" y="33" width="52" height="6" rx="3" />
      <rect className="a-s" x="22" y="58" width="80" height="5" rx="2.5" /><rect className="a-s" x="22" y="68" width="100" height="4" rx="2" /><rect className="a-s" x="22" y="78" width="70" height="4" rx="2" />
    </>}
    {n === 2 && <>
      <rect className="a-p" x="28" y="8" width="104" height="96" rx="10" />
      <rect className="a-pill" x="38" y="18" width="42" height="12" rx="6" /><rect className="a-s" x="38" y="38" width="84" height="30" rx="4" />
      <rect className="a-ink" x="38" y="76" width="64" height="6" rx="3" /><rect className="a-acc" x="38" y="88" width="40" height="9" rx="4.5" />
    </>}
    {n === 3 && <>
      <rect className="a-p" x="10" y="8" width="140" height="96" rx="8" /><path className="a-l" d="M10 26h140" />
      <rect className="a-ink" x="22" y="38" width="56" height="7" rx="3.5" /><rect className="a-s" x="22" y="50" width="50" height="4" rx="2" /><rect className="a-s" x="92" y="36" width="46" height="30" rx="4" />
      <circle className="a-l" cx="28" cy="74" r="5" /><rect className="a-s" x="40" y="72" width="44" height="4" rx="2" /><circle className="a-l" cx="28" cy="88" r="5" /><rect className="a-s" x="40" y="86" width="36" height="4" rx="2" />
    </>}
    {n === 4 && <>
      <path className="a-bub" d="M20 20h120a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8H62l-22 18V80H20a8 8 0 0 1-8-8V28a8 8 0 0 1 8-8z" />
      <rect className="a-s" x="30" y="34" width="70" height="5" rx="2.5" /><rect className="a-s" x="30" y="46" width="50" height="5" rx="2.5" />
      <circle className="a-acc" cx="122" cy="62" r="10" /><path className="a-tick" d="m116.5 62 4 4 7.5-8" />
    </>}
    {n === 5 && <>
      <circle className="a-l a-f" cx="24" cy="56" r="8" /><circle className="a-l a-f" cx="64" cy="34" r="8" /><circle className="a-l a-f" cx="100" cy="64" r="8" /><circle className="a-acc" cx="138" cy="40" r="9" />
      <path className="a-l" d="M32 53 56 38M72 38l20 20M108 60l22-16" /><path className="a-gap" d="M64 80v14M100 80v14" /><path className="a-gap" d="M20 100h120" />
    </>}
  </Stage>;
}

/** Five linked stages for the responsibility flow: small, meaningful glyphs. */
export function FlowGlyph({ n }: { n: 1 | 2 | 3 | 4 | 5 }) {
  return <svg className="rv3-glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    {n === 1 && <><circle className="g-l" cx="19" cy="19" r="9" /><path className="g-l" d="m26 26 10 10" /><circle className="g-acc" cx="19" cy="19" r="3" /></>}
    {n === 2 && <><rect className="g-l" x="9" y="8" width="30" height="32" rx="4" /><rect className="g-s" x="14" y="14" width="20" height="10" rx="2" /><rect className="g-acc" x="14" y="30" width="14" height="5" rx="2.5" /></>}
    {n === 3 && <><rect className="g-l" x="6" y="9" width="36" height="30" rx="4" /><path className="g-l" d="M6 17h36" /><rect className="g-s" x="12" y="23" width="14" height="10" rx="2" /><path className="g-l" d="M31 25h6M31 31h6" /></>}
    {n === 4 && <><path className="g-l" d="M8 10h32a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H21l-8 7v-7H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z" /><circle className="g-acc" cx="34" cy="21" r="5" /></>}
    {n === 5 && <><circle className="g-l" cx="9" cy="32" r="4" /><circle className="g-l" cx="22" cy="18" r="4" /><circle className="g-l" cx="35" cy="28" r="4" /><path className="g-l" d="m12 29 7-8M25 20l7 5" /><path className="g-gap" d="M6 42h36" /></>}
  </svg>;
}
