// Converts the supplied PNG artwork of the eight second-batch case studies (31 October 2026) to WebP under public/images/case-studies/.
// Sources (read only, never modified): <Downloads>/<base>-card.png, <base>-feature.png (the hero), <base>-dashboard.png. The 2.6:1 hero
// derivatives are made first by make-wide-heroes.cjs. Dimensions are kept as supplied; nothing is resized or upscaled.
//   node docs/work-redesign/paid-case-batch/tools/convert-assets-batch2.cjs <Downloads dir> <wide hero dir>
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));

const BASES = ['anybodycanbake-seo', 'advit-prints-meta-ads', 'meticulous-business-plan-google-ads', 'libros-library-meta-ads', 'bakedemy-google-ads', 'bakedemy-meta-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads'];
const OUT = path.join(__dirname, '../../../../public/images/case-studies');

(async () => {
  const [dl, wideDir] = process.argv.slice(2);
  if (!dl || !wideDir) throw new Error('usage: convert-assets-batch2.cjs <Downloads dir> <wide hero dir>');
  const rows = [];
  for (const b of BASES) {
    const jobs = [
      ['card', path.join(dl, `${b}-card.png`), 82],
      ['hero', path.join(dl, `${b}-feature.png`), 84],
      ['hero-wide', path.join(wideDir, `${b}-hero-wide.png`), 84],
      ['dashboard', path.join(dl, `${b}-dashboard.png`), 90],
    ];
    for (const [kind, src, q] of jobs) {
      if (!fs.existsSync(src)) { rows.push(`${b}-${kind}: MISSING ${src}`); continue; }
      const info = await sharp(src).webp({ quality: q, effort: 6 }).toFile(path.join(OUT, `${b}-${kind}.webp`));
      const sha = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex').slice(0, 12);
      rows.push(`| \`${b}-${kind}.webp\` | \`${path.basename(src)}\` | \`${sha}\` | ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB |`);
    }
  }
  console.log(rows.join('\n'));
})();
