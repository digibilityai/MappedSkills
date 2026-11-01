// Converts the supplied PNG artwork of the six paid-advertising case studies to WebP under public/images/case-studies/.
// Sources are read only and never modified. Dimensions are kept as supplied (nothing is resized or upscaled); the 2.6:1 desktop
// hero derivatives are made first by make-wide-heroes.cjs. Run from the repository root:
//   node docs/work-redesign/paid-case-batch/tools/convert-assets.cjs <Downloads dir> <wide hero dir>
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));

const BASES = ['anybodycanbake-meta-ads', 'ekoching-google-ads', 'klenzmo-meta-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'hutnhomes-meta-ads'];
// Dashboards supplied under a different file name (second delivery, 30 October 2026, evening). All others: <base>-dashboard.png.
const DASHBOARD_SOURCE = { 'ekoching-google-ads': 'ekoching dashboard.png', 'phoenix-laundry-google-ads': 'Phoenix Laundry client reporting dashboard.png' };
const OUT = path.join(__dirname, '../../../../public/images/case-studies');

(async () => {
  const [dl, wideDir] = process.argv.slice(2);
  if (!dl || !wideDir) throw new Error('usage: convert-assets.cjs <Downloads dir> <wide hero dir>');
  fs.mkdirSync(OUT, { recursive: true });
  const rows = [];
  for (const b of BASES) {
    const jobs = [
      ['card', path.join(dl, 'Cards', `${b}-card.png`), 82],
      ['hero', path.join(dl, 'Hero', `${b}-hero.png`), 84],
      ['hero-wide', path.join(wideDir, `${b}-hero-wide.png`), 84],
      ['dashboard', path.join(dl, DASHBOARD_SOURCE[b] ?? `${b}-dashboard.png`), 90],
    ];
    for (const [kind, src, q] of jobs) {
      if (!fs.existsSync(src)) { rows.push(`${b}-${kind}: MISSING ${src}`); continue; }
      const dest = path.join(OUT, `${b}-${kind}.webp`);
      const info = await sharp(src).webp({ quality: q, effort: 6 }).toFile(dest);
      const sha = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex').slice(0, 12);
      rows.push(`${b}-${kind}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB source ${path.basename(src)} sha256:${sha}`);
    }
  }
  console.log(rows.join('\n'));
})();
