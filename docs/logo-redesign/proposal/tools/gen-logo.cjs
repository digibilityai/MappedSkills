// Draft generator for the corrected "MappedSkills" logo (local proposal, not production).
// Usage: node docs/logo-redesign/proposal/tools/gen-logo.cjs <repoRoot> <outDir> [--opsz-sm=N]
//
// Inputs (all already in the repo, SIL OFL):
//   components/direction-c/fonts/BricolageGrotesque-opsz-wght-latin.woff2  (wordmark)
//   .next/static/media/4c9affa5bc8f420e.p.woff2  = Manrope latin, variable wght (tagline)
// Text is converted to outlines; the output SVGs need no fonts.
const fs = require('fs');
const path = require('path');
const [root, out, ...flags] = process.argv.slice(2);
const flag = (k, d) => { const f = flags.find((x) => x.startsWith(`--${k}=`)); return f ? +f.split('=')[1] : d; };
const fk = require(path.join(root, 'node_modules/next/dist/compiled/@next/font/dist/fontkit')).default;

// --- Variable-WOFF2 instancing -------------------------------------------------------------
// Next's bundled fontkit cannot instance a variable WOFF2 directly: getVariation() is
// broken for WOFF2, and WOFF2 glyphs never pass through gvar. So: decode the transformed
// glyf table with no variation active, then attach the processor and apply gvar deltas
// (with phantom points, for HVAR-free advance changes) in a patched _decode.
function instance(file, coords) {
  const f = fk(fs.readFileSync(path.join(root, file)));
  const metrics = { upm: f.unitsPerEm, xh: f.xHeight, cap: f.capHeight };
  Object.defineProperty(f, '_variationProcessor', { value: null, configurable: true, writable: true });
  f._transformGlyfTable();
  delete f._variationProcessor;
  f.variationCoords = coords;
  f._glyphs = {};
  const proto = Object.getPrototypeOf(f.getGlyph(1));
  if (!proto.__msPatched) {
    const orig = proto._decode;
    proto._decode = function () {
      const gl = orig.call(this);
      const vp = this._font._variationProcessor;
      if (!gl || !vp || !(gl.numberOfContours > 0)) return gl;
      const c = Object.assign({}, gl, { points: gl.points.map((p) => p.copy()) });
      const P = c.points[0].constructor;
      let xMin = Infinity, yMax = -Infinity;
      for (const q of c.points) { xMin = Math.min(xMin, q.x); yMax = Math.max(yMax, q.y); }
      const hmtx = this._font.hmtx, n = hmtx.metrics.length;
      const hm = hmtx.metrics.get(Math.min(this.id, n - 1));
      const lsb = this.id >= n && hmtx.bearings ? hmtx.bearings.get(this.id - n) : hm.bearing;
      const t = c.points.slice();
      t.push(new P(false, true, xMin - lsb, 0), new P(false, true, xMin - lsb + hm.advance, 0),
             new P(false, true, 0, yMax), new P(false, true, 0, yMax));
      vp.transformPoints(this.id, t);
      c.phantomPoints = t.slice(-4);
      return c;
    };
    proto.__msPatched = true;
  }
  f._glyphs = {};
  f.M = metrics;
  return f;
}

const BRICO = 'components/direction-c/fonts/BricolageGrotesque-opsz-wght-latin.woff2';
const MANROPE = '.next/static/media/4c9affa5bc8f420e.p.woff2';

const r2 = (s) => s.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(2).replace(/\.?0+$/, ''));

function advanceOf(g) {
  // advance after variation = distance between the two horizontal phantom points
  const d = g._decode && g._decode();
  if (d && d.phantomPoints) return d.phantomPoints[1].x - d.phantomPoints[0].x;
  return g.advanceWidth;
}
function run(font, str) {
  const glyphs = font.layout(str).glyphs;
  const lay = font.layout(str);
  return glyphs.map((g, i) => {
    const base = g.advanceWidth;
    const kern = lay.positions[i].xAdvance - base; // GPOS kerning delta from default layout
    return { g, adv: advanceOf(g) + kern };
  });
}
function setText(font, str, x, y, size, tracking = 0) {
  const s = size / font.M.upm;
  const glyphs = run(font, str);
  let pen = x, minX = Infinity, maxX = -Infinity;
  const ds = [];
  glyphs.forEach(({ g, adv }, i) => {
    const p = g.path;
    if (p.commands.length) {
      ds.push(p.scale(s, -s).translate(pen, y).toSVG());
      const b = p.bbox;
      minX = Math.min(minX, pen + b.minX * s);
      maxX = Math.max(maxX, pen + b.maxX * s);
    }
    pen += adv * s + (i < glyphs.length - 1 ? tracking : 0);
  });
  return { d: r2(ds.join('')), width: pen - x, minX, maxX };
}

// --- Geometry: measured from the production 555x144 lockup (see LOGO_LEGIBILITY_FINDINGS). ---
const BASE = 99;   // baseline
const XH = 51;     // x-height
const AX = 70.5;   // mirror axis of the M mark

// M mark: two folded panels with a house-shaped cut-out and a pin dot.
// Each panel is a polygon plus a same-colour round-joined stroke, which gives the soft corners.
const inset = 2.2;
const leftPanel = [[19.2, 13], [70.4, 43.6], [48.4, 56.2], [48.4, 115.6], [19.2, 98.2]];
const mirror = (pts) => pts.map(([x, y]) => [2 * AX - x, y]).reverse();
const poly = (pts) => 'M' + pts.map((p) => p.map((v) => +v.toFixed(2)).join(' ')).join('L') + 'Z';
const norm = ([x, y]) => { const l = Math.hypot(x, y); return [x / l, y / l]; };
function shrink(pts) {
  const n = pts.length;
  return pts.map((c, i) => {
    const p = pts[(i - 1 + n) % n], q = pts[(i + 1) % n];
    const e1 = norm([c[0] - p[0], c[1] - p[1]]), e2 = norm([q[0] - c[0], q[1] - c[1]]);
    const n1 = [-e1[1], e1[0]], n2 = [-e2[1], e2[0]];
    const bis = norm([n1[0] + n2[0], n1[1] + n2[1]]);
    const cos = bis[0] * n1[0] + bis[1] * n1[1];
    return [c[0] + (bis[0] * inset) / cos, c[1] + (bis[1] * inset) / cos];
  });
}
const markD = poly(shrink(leftPanel)) + poly(shrink(mirror(leftPanel)));
const dot = { cx: AX, cy: 68.6, r: 11.8 };

function build({ opsz }) {
  const brico = instance(BRICO, [opsz, 800]);
  const size = XH / (brico.M.xh / brico.M.upm);
  const X0 = 130;
  const apped = setText(brico, 'apped', X0, BASE, size);
  const skills = setText(brico, 'Skills', X0 + apped.width, BASE, size);
  return { brico, size, apped, skills, inkL: apped.minX, inkR: skills.maxX };
}

// Large (lockup / >= 44px): opsz 96. Small (header/footer wordmark): opsz from flag.
const L = build({ opsz: 96 });
const SM_OPSZ = flag('opsz-sm', 96);
const S = SM_OPSZ === 96 ? L : build({ opsz: SM_OPSZ });

// Tagline: Manrope Bold caps, tracked to span the wordmark ink exactly (as the original does).
const manrope = instance(MANROPE, [flag('tag-wght', 700)]);
const TAG = 'TURN DEMAND INTO OPPORTUNITY';
const tagCap = flag('tag-cap', 12);
const tagSize = tagCap / (manrope.M.cap / manrope.M.upm);
const tagBase = 140;
const natural = setText(manrope, TAG, 0, 0, tagSize);
const naturalInk = natural.maxX - natural.minX;
const tracking = (L.inkR - L.inkL - naturalInk) / (TAG.length - 1);
const tag = setText(manrope, TAG, L.inkL - natural.minX, tagBase, tagSize, tracking);

const C = {
  light: { mark: '#FF5F24', ink: '#232323', accent: '#FD5C03', tag: '#232323' },
  dark: { mark: '#FF5F24', ink: '#FAFAFA', accent: '#FD5C03', tag: '#FAFAFA' },
};
const PAD = 12;

function svg({ variant, kind }) {
  const c = C[variant];
  const T = kind === 'lockup' ? L : S;
  const W = Math.ceil(T.inkR + (kind === 'lockup' ? PAD : 4));
  // Lockup keeps the original 144-unit height; the wordmark crops to the mark (y 12–116) plus 4 units.
  // wordmark: 4 units of clear space each side of the ink (mark ink starts at x≈19)
  const vb = kind === 'lockup' ? `0 0 ${W} 144` : `15 8 ${W - 15} 112`;
  const title = kind === 'lockup' ? 'MappedSkills — Turn demand into opportunity' : 'MappedSkills';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-labelledby="t">
<title id="t">${title}</title>
<path fill="${c.mark}" stroke="${c.mark}" stroke-width="${inset * 2}" stroke-linejoin="round" d="${markD}"/>
<circle cx="${dot.cx}" cy="${dot.cy}" r="${dot.r}" fill="${c.mark}"/>
<path fill="${c.ink}" d="${T.apped.d}"/>
<path fill="${c.accent}" d="${T.skills.d}"/>${kind === 'lockup' ? `\n<path fill="${c.tag}" d="${tag.d}"/>` : ''}
</svg>
`;
}

fs.mkdirSync(out, { recursive: true });
const sizes = {};
for (const variant of ['light', 'dark']) {
  for (const kind of ['lockup', 'wordmark']) {
    const file = path.join(out, `mappedskills-${kind}-${variant}-bg.svg`);
    const body = svg({ variant, kind });
    fs.writeFileSync(file, body);
    sizes[path.basename(file)] = body.length;
  }
}
console.log(JSON.stringify({
  opszSmall: SM_OPSZ,
  lockupViewBox: `0 0 ${Math.ceil(L.inkR + PAD)} 144`,
  wordmarkAspect: +((Math.ceil(S.inkR + 4) - 15) / 112).toFixed(4),
  tagTrackingEm: +(tracking / tagSize).toFixed(3),
  bytes: sizes,
}));
