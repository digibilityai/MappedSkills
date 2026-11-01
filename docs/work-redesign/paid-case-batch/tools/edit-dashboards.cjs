// Corrects four supplied dashboards (owner-approved corrections, 31 October 2026). The supplied PNGs in ~/Downloads are NEVER modified; the
// pre-edit web copies are kept in source-originals/dashboards/. Only the named UI text is replaced; every other pixel is the supplied one.
//   advit-prints-meta-ads, meticulous-business-plan-google-ads, bblewrap-google-ads, talreja-talreja-google-ads:
//       date selector "Date range not supplied" -> the period in the final DOCX (month names written in full, as on the Bakedemy and Libros dashboards)
//   talreja-talreja-google-ads:
//       tile "Lifetime Value" -> "Average first contracted fee revenue per engagement" (two lines; the figure is untouched)
//       currency selector "INR" -> "INR equivalent" (the box is widened to the right, the chevron kept)
// Text is set in Helvetica Neue at the cap height measured from the replaced text, in the colour measured from it.
// Usage: node edit-dashboards.cjs <Downloads dir> <repo public/images/case-studies> <edits dir>
const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));
const FONT = 'Helvetica Neue';
const J = [
  { base: 'advit-prints-meta-ads', box: [1278, 84, 1558, 139], text: 'February 2024 to August 2024' },
  { base: 'meticulous-business-plan-google-ads', box: [1221, 65, 1562, 123], text: 'April 2026 to September 2026' },
  { base: 'bblewrap-google-ads', box: [1206, 47, 1557, 106], text: 'September 2024 to March 2025' },
  { base: 'talreja-talreja-google-ads', box: [1202, 50, 1555, 104], text: 'March 2022 to September 2022', extra: true },
];
const lum = (d, i) => 0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];
const hex = (r, g, b) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

function inkBounds(d, W, x0, y0, x1, y1, thr = 170) {
  let a = 1e9, b = 1e9, c = -1, e = -1; const dark = [];
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const i = (y * W + x) * 3; const l = lum(d, i); if (l < thr) { if (x < a) a = x; if (x > c) c = x; if (y < b) b = y; if (y > e) e = y; dark.push([l, i]); } }
  dark.sort((p, q) => p[0] - q[0]); const top = dark.slice(0, Math.max(5, Math.floor(dark.length * 0.08)));
  const col = [0, 1, 2].map((k) => Math.round(top.reduce((s, [, i]) => s + d[i + k], 0) / top.length));
  return { x0: a, y0: b, x1: c, y1: e, color: hex(...col) };
}
const capHeight = (d, W, x0, y0, x1, y1, thr = 170) => { // vertical extent of the first glyph (its columns only)
  const ib = inkBounds(d, W, x0, y0, x1, y1, thr); const gx1 = ib.x0 + Math.round((ib.y1 - ib.y0) * 0.55); let t = 1e9, b = -1;
  for (let y = y0; y < y1; y++) for (let x = ib.x0; x <= gx1; x++) { if (lum(d, (y * W + x) * 3) < thr) { if (y < t) t = y; if (y > b) b = y; } }
  return { top: t, bottom: b, cap: b - t + 1, ...ib };
};
async function textPng(text, px, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(text.length * px * 0.72) + 20}" height="${Math.ceil(px * 1.6)}"><text x="2" y="${Math.round(px * 1.15)}" font-family="${FONT}" font-size="${px}" fill="${color}">${text.replace(/&/g, '&amp;')}</text></svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer(); const { data, info } = await sharp(buf).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  let w = 0; for (let x = 0; x < info.width; x++) for (let y = 0; y < info.height; y++) if (data[(y * info.width + x) * 4 + 3] > 20 && x > w) w = x; // right-most ink
  return { buf, w: w + 1, h: info.height, base: Math.round(px * 1.15) };
}
const box = (x0, y0, x1, y1, fill, stroke, r) => `<svg xmlns="http://www.w3.org/2000/svg" width="${x1 - x0 + 4}" height="${y1 - y0 + 4}"><rect x="1.5" y="1.5" width="${x1 - x0 + 1}" height="${y1 - y0 + 1}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/></svg>`;

(async () => {
  const [dl, pub, edits] = process.argv.slice(2);
  for (const j of J) {
    const src = path.join(dl, `${j.base}-dashboard.png`);
    const { data: d0, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true }); const W = info.width, H = info.height; const d = Buffer.from(d0);
    let img = sharp(d, { raw: { width: W, height: H, channels: 3 } });
    const ops = [];
    const sel = async (bx, newText, extendRight = 0) => {
      const [x0, y0, x1, y1] = bx; const chevL = x1 - 52;
      const cap = capHeight(d, W, x0 + 12, y0 + 6, chevL, y1 - 6);
      const fill = hex(d[((y0 + 8) * W + x0 + 12) * 3], d[((y0 + 8) * W + x0 + 12) * 3 + 1], d[((y0 + 8) * W + x0 + 12) * 3 + 2]);
      // border colour: darkest pixel on the top edge
      let bl = 999, bc = '#d0d5dd'; for (let x = x0 + 30; x < x1 - 30; x += 3) for (let y = y0 - 1; y <= y0 + 2; y++) { const i = (y * W + x) * 3; if (lum(d, i) < bl) { bl = lum(d, i); bc = hex(d[i], d[i + 1], d[i + 2]); } }
      const px = Math.round((cap.cap / 0.714) * 10) / 10; const t = await textPng(newText, px, cap.color);
      const need = t.w + (cap.x0 - x0) + 56; const have = x1 - x0; const grow = Math.max(0, need - have);
      const nx0 = extendRight ? x0 : x0 - grow, nx1 = extendRight ? x1 + extendRight : x1;
      const bgc = hex(d[((y0 - 6) * W + x0 - 8) * 3], d[((y0 - 6) * W + x0 - 8) * 3 + 1], d[((y0 - 6) * W + x0 - 8) * 3 + 2]);
      const chev = await sharp(d, { raw: { width: W, height: H, channels: 3 } }).extract({ left: x1 - 40, top: y0 + 10, width: 30, height: y1 - y0 - 20 }).png().toBuffer();
      // redraw the box (new width) on the page ground, keep the original chevron, then the new text on the measured baseline
      const nb = { left: nx0 - 3, top: y0 - 3, width: nx1 - nx0 + 8, height: y1 - y0 + 8 };
      ops.push({ input: { create: { width: nb.width, height: nb.height, channels: 3, background: bgc } }, left: nb.left, top: nb.top });
      ops.push({ input: Buffer.from(box(nx0, y0, nx1, y1, fill, bc, 10)), left: nx0 - 2 + 0, top: y0 - 2 });
      ops.push({ input: chev, left: nx1 - 40, top: y0 + 10 });
      ops.push({ input: t.buf, left: cap.x0 - 2 - (extendRight ? 0 : grow), top: cap.bottom - t.base + 1 });
      return { px, grow, cap: cap.cap, color: cap.color, fill, border: bc, newBox: [nx0, y0, nx1, y1] };
    };
    const log = { base: j.base, date: await sel(j.box, j.text) };
    if (j.extra) {
      log.inr = await sel([798, 169, 945, 223], 'INR equivalent', 80);
      // tile: label "Lifetime Value" -> two lines, figure untouched
      const T = [1160, 446, 1555, 617]; const lab = capHeight(d, W, T[0] + 20, T[1] + 14, T[2] - 20, T[1] + 60);
      const px = Math.round((lab.cap / 0.714) * 0.9 * 10) / 10; const l1 = await textPng('Average first contracted fee', px, lab.color); const l2 = await textPng('revenue per engagement', px, lab.color);
      const fill = hex(d[((T[1] + 10) * W + T[0] + 12) * 3], d[((T[1] + 10) * W + T[0] + 12) * 3 + 1], d[((T[1] + 10) * W + T[0] + 12) * 3 + 2]);
      ops.push({ input: { create: { width: T[2] - T[0] - 40, height: lab.y1 - lab.y0 + 12, channels: 3, background: fill } }, left: lab.x0 - 4, top: lab.y0 - 6 });
      const gap = Math.round(px * 1.28); const b1 = lab.bottom - gap + Math.round(px * 0.25), b2 = b1 + gap;
      ops.push({ input: l1.buf, left: lab.x0 - 2, top: b1 - l1.base + 1 }); ops.push({ input: l2.buf, left: lab.x0 - 2, top: b2 - l2.base + 1 });
      log.tile = { px, label: lab, b1, b2, fill };
    }
    const out = await img.composite(ops).png().toBuffer();
    await sharp(out).toFile(path.join(edits, `${j.base}-dashboard.edited.png`));
    const w = await sharp(out).webp({ quality: 90, effort: 6 }).toFile(path.join(pub, `${j.base}-dashboard.webp`));
    console.log(JSON.stringify({ ...log, out: `${w.width}x${w.height} ${Math.round(w.size / 1024)}KB` }));
  }
})();
