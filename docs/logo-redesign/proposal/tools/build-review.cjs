// Inline every local <img src> in REVIEW.src.html into REVIEW.html, so the page opens standalone.
// Usage: node docs/logo-redesign/proposal/tools/build-review.cjs
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..');
const mime = { svg: 'image/svg+xml', webp: 'image/webp', png: 'image/png' };
const src = fs.readFileSync(path.join(dir, 'REVIEW.src.html'), 'utf8');
const out = src.replace(/src="([\w./-]+\.(svg|webp|png))"/g, (m, f, ext) =>
  `src="data:${mime[ext]};base64,${fs.readFileSync(path.join(dir, f)).toString('base64')}"`);
fs.writeFileSync(path.join(dir, 'REVIEW.html'), out);
console.log('REVIEW.html', out.length, 'bytes');
