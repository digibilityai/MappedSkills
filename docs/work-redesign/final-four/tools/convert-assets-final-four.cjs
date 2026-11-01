// Converts the supplied PNG artwork of the final four case studies (31 October 2026) to WebP under public/images/case-studies/.
// Sources (read only, never modified): source-originals/<base>-card.png, -feature.png (the hero) and, for Ameba Software and Wanderlooms only,
// -dashboard.png. ClassPe and InsurYo dashboards are NOT published (owner correction, 31 October 2026). The 2.6:1 hero crops are made
// first by make-wide-heroes-final-four.cjs. Dimensions are kept as supplied; nothing is resized or upscaled.
//
// The Ameba Software dashboard carries a small printed caption ("Recreated agency report", bottom right). The owner's rule is no visible
// recreated-image captions, so ONLY that caption is removed, exactly as remove-dashboard-footer.cjs does for the AnybodyCanBake dashboard
// (text pixels in a small rectangle are refilled row by row from the untouched pixels on each side). The edited PNG is kept in edits/.
//   node docs/work-redesign/final-four/tools/convert-assets-final-four.cjs
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'source-originals');
const OUT = path.join(__dirname, '../../../../public/images/case-studies');
const BASES = [
  { b: 'classpe-social-media', dashboard: false },
  { b: 'insuryo-organic-growth', dashboard: false },
  { b: 'ameba-software-seo', dashboard: true, caption: [1380, 940, 1570, 982] },
  { b: 'wanderlooms-meta-ads', dashboard: true },
];

async function removeCaption(file, rect, dest) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, out = Buffer.from(data);
  const lum = (i) => 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
  const mask = new Uint8Array(W * info.height);
  for (let y = rect[1]; y < rect[3]; y++) for (let x = rect[0]; x < rect[2]; x++) if (lum((y * W + x) * 3) < 238) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) mask[(y + dy) * W + x + dx] = 1;
  for (let y = rect[1] - 4; y < rect[3] + 4; y++) for (let x = rect[0] - 4; x < rect[2] + 4; x++) {
    if (!mask[y * W + x]) continue;
    let l = x; while (mask[y * W + l]) l--; let r = x; while (mask[y * W + r]) r++;
    const t = (x - l) / (r - l);
    for (let c = 0; c < 3; c++) out[(y * W + x) * 3 + c] = Math.round(data[(y * W + l) * 3 + c] * (1 - t) + data[(y * W + r) * 3 + c] * t);
  }
  await sharp(out, { raw: { width: W, height: info.height, channels: 3 } }).png().toFile(dest);
}

(async () => {
  const wideDir = path.join(ROOT, 'wide-work/out');
  const rows = [];
  for (const { b, dashboard, caption } of BASES) {
    let dash = path.join(SRC, `${b}-dashboard.png`);
    if (dashboard && caption) { const e = path.join(ROOT, 'edits', `${b}-dashboard.edited.png`); await removeCaption(dash, caption, e); dash = e; }
    const jobs = [
      ['card', path.join(SRC, `${b}-card.png`), 82],
      ['hero', path.join(SRC, `${b}-feature.png`), 84],
      ['hero-wide', path.join(wideDir, `${b}-hero-wide.png`), 84],
      ...(dashboard ? [['dashboard', dash, 90]] : []),
    ];
    for (const [kind, src, q] of jobs) {
      const info = await sharp(src).webp({ quality: q, effort: 6 }).toFile(path.join(OUT, `${b}-${kind}.webp`));
      const sha = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex').slice(0, 12);
      rows.push(`| \`${b}-${kind}.webp\` | \`${path.relative(ROOT, src)}\` | \`${sha}\` | ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB |`);
    }
  }
  console.log(rows.join('\n'));
})();
