// AnybodyCanBake SEO dashboard (owner-confirmed 31 October 2026): "Earlier 90 days" and "Later 90 days" labels replaced by the periods
// May 2026 to July 2026 and August 2026 to October 2026 (the selector uses short month names to fit its box). The supplied PNG is never modified;
// the pre-edit web copy is in source-originals/dashboards/. Every figure, bar and other pixel is the supplied one. Text: Helvetica Neue at the cap
// height and colour measured from the replaced text. Usage: node edit-seo-dashboard.cjs <Downloads dir> <repo public/images/case-studies> <edits dir>
const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));
const FONT = 'Helvetica Neue';
const lum = (d, i) => 0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];
const hex = (r, g, b) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
// [region x0,y0,x1,y1 containing only the label, new text, weight]
const LABELS = [
  [[1212, 132, 1512, 172], 'May to Jul vs Aug to Oct 2026', 400],
  [[318, 456, 520, 486], 'May 2026 to July 2026', 400], [[743, 456, 945, 486], 'May 2026 to July 2026', 400], [[1168, 456, 1370, 486], 'May 2026 to July 2026', 400],
  [[318, 557, 540, 587], 'August 2026 to October 2026', 400], [[743, 557, 965, 587], 'August 2026 to October 2026', 400], [[1168, 557, 1390, 587], 'August 2026 to October 2026', 400],
  [[684, 704, 900, 738], 'May 2026 to July 2026', 500], [[1006, 704, 1240, 738], 'August 2026 to October 2026', 500],
];
(async () => {
  const [dl, pub, edits] = process.argv.slice(2);
  const { data: d, info } = await sharp(path.join(dl, 'anybodycanbake-seo-dashboard.png')).removeAlpha().raw().toBuffer({ resolveWithObject: true }); const W = info.width, H = info.height;
  const ops = [];
  for (const [[rx0, ry0, rx1, ry1], text, weight] of LABELS) {
    // ink bounds of the label (dark text on a light ground)
    let a = 1e9, b = 1e9, c = -1, e = -1; const ink = [];
    for (let y = ry0; y < ry1; y++) for (let x = rx0; x < rx1; x++) { const i = (y * W + x) * 3; if (lum(d, i) < 175) { if (x < a) a = x; if (x > c) c = x; if (y < b) b = y; if (y > e) e = y; ink.push([lum(d, i), i]); } }
    if (c < 0) { console.log('NO INK', text, rx0, ry0); continue; }
    ink.sort((p, q) => p[0] - q[0]); const top = ink.slice(0, Math.max(5, Math.floor(ink.length * 0.08)));
    const col = hex(...[0, 1, 2].map((k) => Math.round(top.reduce((s, [, i]) => s + d[i + k], 0) / top.length)));
    // cap height from the first glyph's columns
    const gx1 = a + Math.round((e - b) * 0.45); let t = 1e9, bt = -1;
    for (let y = ry0; y < ry1; y++) for (let x = a; x <= gx1; x++) if (lum(d, (y * W + x) * 3) < 175) { if (y < t) t = y; if (y > bt) bt = y; }
    const cap = bt - t + 1; const px = Math.round((cap / 0.714) * 10) / 10;
    const fi = ((ry0 + 2) * W + rx0 + 2) * 3; const fill = hex(d[fi], d[fi + 1], d[fi + 2]);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(text.length * px * 0.7) + 16}" height="${Math.ceil(px * 1.6)}"><text x="2" y="${Math.round(px * 1.15)}" font-family="${FONT}" font-size="${px}" font-weight="${weight}" fill="${col}">${text}</text></svg>`;
    ops.push({ input: { create: { width: rx1 - rx0, height: ry1 - ry0, channels: 3, background: fill } }, left: rx0, top: ry0 });
    ops.push({ input: Buffer.from(svg), left: a - 2, top: bt - Math.round(px * 1.15) + 1 });
    console.log(JSON.stringify({ text, ink: [a, b, c, e], cap, px, col, fill }));
  }
  const out = await sharp(d, { raw: { width: W, height: H, channels: 3 } }).composite(ops).png().toBuffer();
  await sharp(out).toFile(path.join(edits, 'anybodycanbake-seo-dashboard.edited.png'));
  const w = await sharp(out).webp({ quality: 90, effort: 6 }).toFile(path.join(pub, 'anybodycanbake-seo-dashboard.webp')); console.log(w.width + 'x' + w.height, Math.round(w.size / 1024) + 'KB');
})();
