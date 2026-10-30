import type { CSSProperties } from 'react';
import './case-art.css';

/**
 * Code-drawn CONCEPTUAL illustrations for case studies that have no approved artwork (Stage 3 revision). Each one is a
 * symbol of the kind of work (a school's oven, a climb of steps, a shield with a sprout, a cell with a network, a room),
 * drawn here from the study's verified context: its client, sector and service. They are never a dashboard, an ad, a chart,
 * a screenshot or a client asset, show no number and depict no result, and each is labelled as conceptual wherever it
 * appears. A study that is not listed here has no illustration (the page and card fall back to the text-only forms).
 *
 * Motion is CSS only and plays once when the artwork scrolls in (`.ca-host` + `data-hw-seq`, armed by HwSequence); the
 * settled drawing is the base style, so reduced motion, no script and print all show the finished picture.
 */
export type Motif = 'baking' | 'coaching' | 'insurance' | 'software' | 'home';

/** The studies that have an illustration, by their page address. */
export const MOTIF_BY_HREF: Record<string, Motif> = {
  '/portfolio/google-ads-for-online-courses': 'baking',
  '/portfolio/classpe-social-media-strategy': 'coaching',
  '/portfolio/insuryo-organic-growth': 'insurance',
  '/portfolio/seo-ameba-software': 'software',
  '/portfolio/seo-for-home-decor-brand': 'home',
};

export const motifFor = (href: string): Motif | null => MOTIF_BY_HREF[href] ?? null;

/** The note shown beside every illustration. */
export const MOTIF_NOTE = 'Conceptual illustration drawn for this page. Not client artwork, a screenshot or a result.';

const LABEL: Record<Motif, string> = {
  baking: 'Conceptual illustration: an oven with rising loaves and a winding path of lessons',
  coaching: 'Conceptual illustration: a staircase of steps with a flag at the top and conversation bubbles above it',
  insurance: 'Conceptual illustration: a shield with a young plant growing inside it and ripples spreading outward',
  software: 'Conceptual illustration: a living cell at the centre of a network of connected nodes, with code brackets',
  home: 'Conceptual illustration: a living room with a window, a pendant lamp, a sofa, framed pictures and a plant',
};

const d = (n: number) => ({ '--d': n }) as CSSProperties;

/** Dotted horizontal rows: the quiet background texture, no pattern ids needed. */
function Dots() {
  return (
    <g className="ca-dots" aria-hidden="true">
      {[70, 130, 190, 250, 310, 370, 430, 490].map((y) => (
        <path key={y} d={`M12 ${y} H1188`} />
      ))}
    </g>
  );
}

function Baking() {
  return (
    <>
      <g className="ca-p1">
        <path className="l ca-draw" pathLength={1} style={d(0)} d="M390 470 V270 C390 150 480 80 600 80 C720 80 810 150 810 270 V470" />
        <path className="f ca-rise" style={d(1)} d="M440 470 V280 C440 185 506 128 600 128 C694 128 760 185 760 280 V470 Z" />
        <circle className="a o ca-pop" style={d(2)} cx="600" cy="340" r="96" />
      </g>
      <g className="ca-p2">
        <ellipse className="a ca-pop" style={d(3)} cx="520" cy="396" rx="46" ry="28" />
        <ellipse className="a ca-pop" style={d(4)} cx="600" cy="384" rx="54" ry="38" />
        <ellipse className="a ca-pop" style={d(5)} cx="684" cy="396" rx="46" ry="28" />
        <path className="d ca-draw" pathLength={1} style={d(6)} d="M588 360 l14 22 M608 358 l14 22 M572 366 l12 18 M508 382 l10 14 M530 380 l10 14 M672 382 l10 14 M694 380 l10 14" />
        <path className="l" d="M450 430 H750" />
      </g>
      <g className="ca-p3">
        <path className="l ca-draw" pathLength={1} style={d(7)} d="M540 62 c-20 -22 20 -38 0 -62 M600 56 c-20 -22 20 -38 0 -62 M660 62 c-20 -22 20 -38 0 -62" />
      </g>
      <g className="ca-p1">
        <path className="d ca-draw dash" pathLength={1} style={d(2)} d="M130 450 C190 380 240 400 290 320 C340 240 330 200 380 170" />
        <circle className="a ca-pop" style={d(3)} cx="130" cy="450" r="11" />
        <circle className="a ca-pop" style={d(4)} cx="290" cy="320" r="11" />
        <circle className="a ca-pop" style={d(5)} cx="380" cy="170" r="11" />
        <path className="d ca-draw dash" pathLength={1} style={d(3)} d="M1070 450 C1010 380 960 400 910 320 C860 240 870 200 820 170" />
        <circle className="a ca-pop" style={d(4)} cx="1070" cy="450" r="11" />
        <circle className="a ca-pop" style={d(5)} cx="910" cy="320" r="11" />
        <circle className="a ca-pop" style={d(6)} cx="820" cy="170" r="11" />
      </g>
    </>
  );
}

function Coaching() {
  const steps = [0, 1, 2, 3, 4];
  return (
    <>
      <g className="ca-p1">
        {steps.map((i) => (
          <rect key={i} className={i % 2 ? 'f ca-rise' : 'a ca-rise'} style={d(i)} x={360 + i * 92} y={470 - (60 + i * 52)} width="84" height={60 + i * 52} rx="4" />
        ))}
        <path className="l ca-draw" pathLength={1} style={d(5)} d="M402 410 L494 358 L586 306 L678 254 L770 202" />
      </g>
      <g className="ca-p2">
        <path className="l ca-draw" pathLength={1} style={d(6)} d="M770 202 V138 M770 138 L824 158 L770 178" />
        <rect className="f ca-rise" style={d(5)} x="330" y="96" width="132" height="70" rx="16" />
        <path className="f ca-rise" style={d(5)} d="M362 166 L346 196 L394 166 Z" />
        <circle className="o ca-pop" style={d(7)} cx="368" cy="131" r="6" /><circle className="o ca-pop" style={d(8)} cx="396" cy="131" r="6" /><circle className="o ca-pop" style={d(9)} cx="424" cy="131" r="6" />
        <rect className="a ca-rise" style={d(7)} x="520" y="58" width="150" height="76" rx="18" />
        <path className="a ca-rise" style={d(7)} d="M628 134 L650 170 L600 134 Z" />
        <path className="d ca-draw" pathLength={1} style={d(9)} d="M548 86 H642 M548 106 H612" />
        <rect className="f ca-rise" style={d(9)} x="850" y="170" width="116" height="64" rx="16" />
        <path className="f ca-rise" style={d(9)} d="M930 234 L950 262 L906 234 Z" />
      </g>
      <g className="ca-p3">
        <circle className="a ca-pop" style={d(3)} cx="230" cy="380" r="9" /><circle className="a ca-pop" style={d(4)} cx="190" cy="330" r="5" /><circle className="a ca-pop" style={d(5)} cx="1030" cy="330" r="7" />
      </g>
    </>
  );
}

function Insurance() {
  return (
    <>
      <g className="ca-p3">
        {[250, 330, 410].map((r, i) => (
          <circle key={r} className="d ca-draw dash" pathLength={1} style={d(i)} cx="600" cy="270" r={r} />
        ))}
      </g>
      <g className="ca-p1">
        <path className="f ca-rise" style={d(1)} d="M600 70 L762 128 V262 C762 352 692 420 600 464 C508 420 438 352 438 262 V128 Z" />
        <path className="l ca-draw" pathLength={1} style={d(2)} d="M600 70 L762 128 V262 C762 352 692 420 600 464 C508 420 438 352 438 262 V128 Z" />
      </g>
      <g className="ca-p2">
        <path className="l ca-draw" pathLength={1} style={d(4)} d="M600 410 V272" />
        <path className="a ca-pop leaf" style={d(5)} d="M600 308 C556 308 526 276 526 236 C572 236 600 268 600 308 Z" />
        <path className="a ca-pop leaf r" style={d(6)} d="M600 274 C644 274 674 242 674 202 C628 202 600 234 600 274 Z" />
        <circle className="o ca-pop" style={d(7)} cx="600" cy="196" r="9" />
      </g>
      <g className="ca-p3">
        <circle className="a ca-pop" style={d(6)} cx="330" cy="400" r="7" /><circle className="a ca-pop" style={d(7)} cx="290" cy="330" r="5" /><circle className="a ca-pop" style={d(8)} cx="900" cy="150" r="7" /><circle className="a ca-pop" style={d(9)} cx="940" cy="230" r="5" />
      </g>
    </>
  );
}

function Software() {
  const nodes: Array<[number, number]> = [[250, 120], [210, 330], [940, 130], [980, 340], [600, 36]];
  return (
    <>
      <g className="ca-p3">
        <circle className="d ca-draw dash" pathLength={1} style={d(0)} cx="600" cy="262" r="238" />
        {nodes.map(([x, y], i) => (
          <path key={i} className="d ca-draw" pathLength={1} style={d(i + 1)} d={`M600 262 L${x} ${y}`} />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} className="a ca-pop" style={d(i + 3)} cx={x} cy={y} r="13" />
        ))}
      </g>
      <g className="ca-p1">
        <path className="f ca-rise" style={d(2)} d="M600 120 C690 100 790 150 800 240 C812 330 740 410 640 400 C560 392 540 440 470 410 C390 376 400 290 420 240 C440 180 520 138 600 120 Z" />
        <path className="l ca-draw" pathLength={1} style={d(3)} d="M600 120 C690 100 790 150 800 240 C812 330 740 410 640 400 C560 392 540 440 470 410 C390 376 400 290 420 240 C440 180 520 138 600 120 Z" />
        <circle className="a ca-pop" style={d(5)} cx="612" cy="256" r="50" />
        <circle className="o ca-pop" style={d(6)} cx="612" cy="256" r="20" />
        <circle className="d ca-pop" style={d(6)} cx="500" cy="200" r="14" /><circle className="d ca-pop" style={d(7)} cx="720" cy="340" r="18" /><circle className="d ca-pop" style={d(8)} cx="480" cy="340" r="10" />
      </g>
      <g className="ca-p2">
        <path className="l ca-draw" pathLength={1} style={d(8)} d="M330 470 l-26 -24 l26 -24 M410 422 l26 24 l-26 24 M386 414 l-40 64" />
      </g>
    </>
  );
}

function Home() {
  return (
    <>
      <g className="ca-p3">
        <rect className="f ca-rise" style={d(0)} x="320" y="104" width="176" height="210" rx="4" />
        <path className="l ca-draw" pathLength={1} style={d(1)} d="M320 104 H496 V314 H320 Z M408 104 V314 M320 209 H496" />
        <path className="a o ca-rise" style={d(2)} d="M352 150 L398 150 L352 270 Z" />
      </g>
      <g className="ca-p2">
        <path className="l ca-draw" pathLength={1} style={d(2)} d="M640 0 V132" />
        <path className="a ca-pop" style={d(3)} d="M594 170 C594 140 686 140 686 170 Z" />
        <path className="a o ca-rise" style={d(4)} d="M600 176 L550 320 H730 L680 176 Z" />
        <rect className="f ca-rise" style={d(4)} x="740" y="130" width="96" height="128" rx="3" />
        <path className="l ca-draw" pathLength={1} style={d(5)} d="M740 130 H836 V258 H740 Z" />
        <circle className="a ca-pop" style={d(6)} cx="788" cy="178" r="20" /><path className="d ca-draw" pathLength={1} style={d(7)} d="M758 230 H818" />
        <rect className="f ca-rise" style={d(5)} x="858" y="186" width="64" height="84" rx="3" />
        <path className="l ca-draw" pathLength={1} style={d(6)} d="M858 186 H922 V270 H858 Z" />
      </g>
      <g className="ca-p1">
        <ellipse className="f ca-rise" style={d(5)} cx="600" cy="460" rx="300" ry="22" />
        <rect className="a ca-rise" style={d(3)} x="430" y="336" width="320" height="88" rx="26" />
        <rect className="f ca-rise" style={d(4)} x="452" y="300" width="276" height="66" rx="22" />
        <path className="l ca-draw" pathLength={1} style={d(6)} d="M452 438 V456 M728 438 V456" />
        <path className="f ca-pop" style={d(6)} d="M836 400 H884 L876 454 H844 Z" />
        <path className="a ca-pop leaf" style={d(7)} d="M860 400 C830 380 826 350 840 330 C862 346 866 376 860 400 Z" />
        <path className="a ca-pop leaf r" style={d(8)} d="M860 400 C890 384 900 352 888 330 C866 344 858 372 860 400 Z" />
        <path className="a ca-pop leaf" style={d(9)} d="M860 400 C868 372 862 340 866 314 C880 340 878 372 860 400 Z" />
      </g>
    </>
  );
}

const BODY: Record<Motif, () => React.JSX.Element> = { baking: Baking, coaching: Coaching, insurance: Insurance, software: Software, home: Home };

/** The illustration. It fills its box (`slice`): everything that matters sits in the middle 700 units. */
export function CaseArt({ motif }: { motif: Motif }) {
  const Body = BODY[motif];
  return (
    <svg className={`ca m-${motif}`} viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label={LABEL[motif]}>
      <rect className="ca-bg" width="1200" height="520" />
      <Dots />
      <Body />
    </svg>
  );
}
