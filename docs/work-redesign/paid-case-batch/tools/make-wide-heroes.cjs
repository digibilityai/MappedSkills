// Builds the 2.6:1 desktop derivatives (1672 x 643) of the six supplied 16:9 hero images (1672 x 941).
//
// Why: the case-study stage is 2.6:1 on desktop (see components/case-study/case-study.css). A 16:9 original shown whole would be
// pillarboxed, and a plain crop would cut the headline or the figures. So, as for the AnybodyCanBake Google Ads derivative, the same
// text blocks and figures are moved up and scaled together, the photograph is cropped, and the lower fifth is left free for the
// outlined client name the website lays over the stage. Nothing is retyped: the supplied pixels are re-used.
//
//   1. CLEAN PLATE: the original with its text lines painted out. Inside each text rectangle, dark or strongly warm pixels are
//      text (grown by a few pixels); they are refilled from the surrounding picture by push-pull interpolation.
//   2. BASE: the plate moved right by `dx` and up by `y0` (cropped to 1672 x 643); the strip revealed on the left repeats the
//      plate's own left edge.
//   3. TEXT: each supplied text block is turned into a ratio image (original pixel / clean plate pixel, 1 where there is no text),
//      scaled by `s` and multiplied onto the base at its new position, so dark, orange and pill-coloured text keeps its colour.
//
// Usage: node docs/work-redesign/paid-case-batch/tools/make-wide-heroes.cjs <source Hero dir> <output dir> [name ...]
// The sources are never modified. Output: <name>-hero-wide.png (lossless); convert to WebP separately.
const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));

const W = 1672, H = 643, SW = 1672, SH = 941;

/** Per hero: y0/dx place the photograph; `rects` are the text lines to paint out of the plate; `blocks` are moved and scaled. */
const HEROES = {
  'anybodycanbake-meta-ads': {
    y0: 262, dx: 30,
    rects: [[70, 70, 400, 108], [70, 125, 750, 480], [70, 485, 650, 525, 90, 185], [70, 545, 390, 785]],
    blocks: [{ src: [60, 65, 700, 725], s: 0.66, at: [64, 32] }],
  },
  'ekoching-google-ads': {
    y0: 170, dx: 60,
    rects: [[70, 130, 440, 185], [70, 215, 860, 545], [70, 575, 660, 730], [345, 585, 362, 722, 'all'], [70, 845, 270, 880, 90, 185]],
    blocks: [{ src: [60, 125, 800, 610], s: 0.7, at: [64, 36] }, { src: [60, 845, 230, 40], s: 0.7, at: [64, 468] }],
  },
  'klenzmo-meta-ads': {
    y0: 200, dx: 40,
    rects: [[70, 140, 450, 190, 90, 185], [70, 212, 160, 232], [70, 250, 940, 600], [70, 625, 770, 785], [70, 845, 330, 890, 90, 185]],
    blocks: [{ src: [60, 135, 890, 650], s: 0.62, at: [64, 34] }, { src: [60, 845, 280, 45], s: 0.62, at: [64, 466] }],
  },
  'bakersville-google-ads': {
    y0: 220, dx: 40,
    rects: [[60, 135, 525, 195], [60, 240, 890, 555], [60, 600, 750, 760], [385, 595, 402, 755, 'all'], [60, 795, 335, 855, 90, 185]],
    blocks: [{ src: [55, 130, 850, 640], s: 0.66, at: [64, 34] }, { src: [55, 795, 290, 60], s: 0.66, at: [64, 462] }],
  },
  'phoenix-laundry-google-ads': {
    y0: 160, dx: 70,
    rects: [[65, 105, 610, 185], [65, 200, 790, 590], [65, 620, 750, 780], [405, 620, 422, 778, 'all'], [65, 835, 300, 875, 90, 185]],
    blocks: [{ src: [60, 100, 740, 690], s: 0.64, at: [64, 32] }, { src: [60, 835, 250, 45], s: 0.64, at: [64, 478] }],
  },
  'hutnhomes-meta-ads': {
    y0: 200, dx: 60,
    rects: [[75, 105, 485, 175, 26], [75, 215, 935, 312], [75, 318, 700, 405], [75, 412, 700, 520], [75, 545, 665, 780], [408, 548, 424, 780, 'all'], [75, 845, 310, 885, 90, 185]],
    blocks: [{ src: [55, 95, 880, 690], s: 0.62, at: [64, 32] }, { src: [55, 845, 270, 45], s: 0.62, at: [64, 466] }],
  },
  // ---- second batch (31 October 2026): eight further studies. Same method; source files are the supplied `*-feature.png` copied as `<name>-hero.png`.
  'anybodycanbake-seo': {
    y0: 140, dx: 40,
    rects: [[65, 200, 758, 508], [65, 540, 185, 552, 90], [65, 585, 600, 730, 90], [65, 735, 655, 812]],
    blocks: [{ src: [60, 198, 700, 616], s: 0.68, at: [64, 30] }],
  },
  'advit-prints-meta-ads': {
    y0: 150, dx: 0,
    rects: [[68, 140, 750, 310, 300, 70], [68, 310, 640, 510, 300, 70], [68, 548, 370, 625, 90, 70], [385, 548, 700, 625, 90, 70], [68, 625, 700, 668, 200, 90], [366, 552, 382, 668, 'all']],
    blocks: [{ src: [60, 135, 730, 540], s: 0.72, at: [64, 32] }],
  },
  'meticulous-business-plan-google-ads': {
    y0: 200, dx: 0,
    rects: [[55, 125, 700, 325, 300, 110], [55, 325, 745, 420, 300, 110], [55, 425, 815, 520, 300, 110], [48, 548, 832, 684, 90, 120], [50, 722, 830, 772, 90, 120]],
    blocks: [{ src: [45, 125, 800, 650], s: 0.66, at: [64, 30] }],
  },
  'libros-library-meta-ads': {
    y0: 120, dx: 0,
    rects: [[80, 105, 700, 450, 300, 100], [85, 480, 672, 640, 'all'], [85, 665, 672, 810, 'all']],
    blocks: [{ src: [75, 105, 610, 705], s: 0.62, at: [64, 30] }],
  },
  'bakedemy-google-ads': {
    y0: 140, dx: 0,
    rects: [[70, 170, 610, 360, 300, 100], [70, 360, 715, 500, 300, 100], [70, 525, 590, 685, 'all'], [70, 695, 590, 840, 'all']],
    blocks: [{ src: [65, 165, 665, 680], s: 0.6, at: [64, 30] }],
  },
  'bakedemy-meta-ads': {
    y0: 140, dx: 0,
    rects: [[55, 135, 560, 530, 90, 100], [55, 555, 560, 708, 'all'], [55, 718, 560, 868, 'all']],
    blocks: [{ src: [50, 130, 520, 745], s: 0.58, at: [64, 28] }],
  },
  'bblewrap-google-ads': {
    y0: 40, dx: 0,
    rects: [[68, 115, 820, 448, 90, 100], [80, 455, 935, 572, 90, 215], [600, 572, 935, 618, 90, 215]],
    blocks: [{ src: [60, 112, 880, 515], s: 0.7, at: [64, 34] }],
  },
  'talreja-talreja-google-ads': {
    y0: 150, dx: 0,
    rects: [[50, 218, 750, 570, 300, 110], [50, 592, 150, 610, 90, 0], [50, 640, 700, 725, 90, 110]],
    blocks: [{ src: [45, 215, 725, 520], s: 0.72, at: [64, 32] }],
  },
};

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

/** Push-pull fill: unknown pixels (mask = 1) take a smooth blend of the known pixels around them. RGB, interleaved. */
function pushPull(rgb, w, h, mask) {
  const levels = [];
  let cw = w, ch = h;
  let col = new Float32Array(w * h * 3), wt = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) { wt[i] = mask[i] ? 0 : 1; for (let c = 0; c < 3; c++) col[i * 3 + c] = rgb[i * 3 + c]; }
  levels.push({ col, wt, w: cw, h: ch });
  while (cw > 1 || ch > 1) {
    const nw = Math.max(1, cw >> 1), nh = Math.max(1, ch >> 1);
    const ncol = new Float32Array(nw * nh * 3), nwt = new Float32Array(nw * nh);
    for (let y = 0; y < nh; y++) for (let x = 0; x < nw; x++) {
      let sw = 0; const sc = [0, 0, 0];
      for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
        const xx = Math.min(cw - 1, x * 2 + dx), yy = Math.min(ch - 1, y * 2 + dy), k = yy * cw + xx, wv = levels[levels.length - 1].wt[k];
        const L = levels[levels.length - 1]; sw += wv; for (let c = 0; c < 3; c++) sc[c] += wv * L.col[k * 3 + c];
      }
      nwt[y * nw + x] = Math.min(1, sw / 4);
      for (let c = 0; c < 3; c++) ncol[(y * nw + x) * 3 + c] = sw > 0 ? sc[c] / sw : 0;
    }
    levels.push({ col: ncol, wt: nwt, w: nw, h: nh }); cw = nw; ch = nh;
  }
  for (let l = levels.length - 2; l >= 0; l--) {
    const L = levels[l], U = levels[l + 1];
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      const k = y * L.w + x; const wv = L.wt[k]; if (wv >= 1) continue;
      const fx = clamp((x + 0.5) / 2 - 0.5, 0, U.w - 1), fy = clamp((y + 0.5) / 2 - 0.5, 0, U.h - 1);
      const x0 = Math.floor(fx), y0 = Math.floor(fy), x1 = Math.min(U.w - 1, x0 + 1), y1 = Math.min(U.h - 1, y0 + 1), tx = fx - x0, ty = fy - y0;
      for (let c = 0; c < 3; c++) {
        const up = (U.col[(y0 * U.w + x0) * 3 + c] * (1 - tx) + U.col[(y0 * U.w + x1) * 3 + c] * tx) * (1 - ty) + (U.col[(y1 * U.w + x0) * 3 + c] * (1 - tx) + U.col[(y1 * U.w + x1) * 3 + c] * tx) * ty;
        L.col[k * 3 + c] = wv * L.col[k * 3 + c] + (1 - wv) * up;
      }
      L.wt[k] = 1;
    }
  }
  const out = Buffer.alloc(w * h * 3);
  for (let i = 0; i < w * h * 3; i++) out[i] = Math.round(clamp(levels[0].col[i], 0, 255));
  return out;
}

function crop(rgb, w, x, y, cw, ch) {
  const out = Buffer.alloc(cw * ch * 3);
  for (let j = 0; j < ch; j++) rgb.copy(out, j * cw * 3, ((y + j) * w + x) * 3, ((y + j) * w + x + cw) * 3);
  return out;
}

/** Text pixels in a rectangle: dark, or strongly warm (orange text, orange and peach pills; the 5th value is the red-minus-blue
 *  threshold, the 6th the luminance limit for thin grey text), or every pixel for a thin divider rule ('all'). Grown by 5px so anti-aliased edges go too. */
function textMask(orig, rects) {
  const mask = new Uint8Array(SW * SH);
  for (const [x, y, x2, y2, opt = 90, lumMax = 120] of rects) {
    for (let j = y; j < y2; j++) for (let i = x; i < x2; i++) {
      const o = (j * SW + i) * 3, r = orig[o], g = orig[o + 1], b = orig[o + 2];
      if (opt === 'all' || 0.3 * r + 0.59 * g + 0.11 * b < lumMax || r - b > opt) mask[j * SW + i] = 1;
    }
  }
  const grown = new Uint8Array(SW * SH), G = 5;
  for (let j = 0; j < SH; j++) for (let i = 0; i < SW; i++) if (mask[j * SW + i])
    for (let dj = -G; dj <= G; dj++) for (let di = -G; di <= G; di++) { const jj = j + dj, ii = i + di; if (jj >= 0 && jj < SH && ii >= 0 && ii < SW) grown[jj * SW + ii] = 1; }
  return grown;
}

async function build(name, srcDir, outDir) {
  const cfg = HEROES[name];
  const { data: orig } = await sharp(path.join(srcDir, `${name}-hero.png`)).removeAlpha().raw().toBuffer({ resolveWithObject: true });

  // 1. clean plate
  const mask = textMask(orig, cfg.rects);
  const plate = pushPull(orig, SW, SH, mask);
  // soften the refilled pixels so the repair leaves no texture of its own
  const blurred = await sharp(plate, { raw: { width: SW, height: SH, channels: 3 } }).blur(4).raw().toBuffer();
  for (let i = 0; i < SW * SH; i++) if (mask[i]) for (let c = 0; c < 3; c++) plate[i * 3 + c] = blurred[i * 3 + c];

  // 2. base: plate moved right by dx and up by y0; the strip revealed on the left repeats the plate's left edge
  const base = Buffer.alloc(W * H * 3);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const sy = clamp(y + cfg.y0, 0, SH - 1), sx = x - cfg.dx < 0 ? 4 : clamp(x - cfg.dx, 0, SW - 1);
    for (let c = 0; c < 3; c++) base[(y * W + x) * 3 + c] = plate[(sy * SW + sx) * 3 + c];
  }

  // 3. text blocks: ratio image (original / plate), scaled, multiplied onto the base
  const out = Buffer.from(base);
  for (const bl of cfg.blocks) {
    const [bx, by, bw, bh] = bl.src;
    const ratio = Buffer.alloc(bw * bh * 3);
    for (let j = 0; j < bh; j++) for (let i = 0; i < bw; i++) for (let c = 0; c < 3; c++) {
      const k = ((by + j) * SW + bx + i) * 3 + c;
      ratio[(j * bw + i) * 3 + c] = mask[(by + j) * SW + bx + i] ? Math.round(255 * Math.min(1, orig[k] / Math.max(plate[k], 1))) : 255;
    }
    const sw = Math.round(bw * bl.s), sh = Math.round(bh * bl.s);
    const scaled = await sharp(ratio, { raw: { width: bw, height: bh, channels: 3 } }).resize(sw, sh, { kernel: 'lanczos3' }).raw().toBuffer();
    for (let j = 0; j < sh; j++) for (let i = 0; i < sw; i++) {
      const X = bl.at[0] + i, Y = bl.at[1] + j; if (X < 0 || X >= W || Y < 0 || Y >= H) continue;
      for (let c = 0; c < 3; c++) { const o = (Y * W + X) * 3 + c; out[o] = Math.round(out[o] * (scaled[(j * sw + i) * 3 + c] / 255)); }
    }
  }
  const file = path.join(outDir, `${name}-hero-wide.png`);
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toFile(file);
  return file;
}

(async () => {
  const [srcDir, outDir, ...names] = process.argv.slice(2);
  if (!srcDir || !outDir) throw new Error('usage: make-wide-heroes.cjs <Hero dir> <out dir> [name ...]');
  for (const n of names.length ? names : Object.keys(HEROES)) console.log(await build(n, srcDir, outDir));
})();
