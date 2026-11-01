// Builds docs/editorial-redesign/REVIEW.html: current vs proposed, desktop and mobile, with the real header and footer. Images are embedded.
const fs = require('node:fs'); const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../node_modules/sharp'));
const R = path.join(__dirname, '..');
const enc = async (f, w, maxH) => { const m = await sharp(f).metadata(); const buf = await sharp(f).extract({ left: 0, top: 0, width: m.width, height: Math.min(m.height, maxH) }).resize({ width: w }).webp({ quality: 72 }).toBuffer(); return `data:image/webp;base64,${buf.toString('base64')}`; };
const SETS = [
  ['Press', 'The newsroom. For journalists and anyone checking a claim: find the latest release, quote it, contact us.', [['Listing', 'press', 'press-listing'], ['Representative release', 'press-detail', 'press-detail']]],
  ['Blog', 'Articles. For owners deciding what to do next: choose a topic, read plainly, take one next step.', [['Listing', 'blog', 'blog-listing'], ['Representative article', 'blog-detail', 'blog-detail']]],
  ['Research', 'Evidence. For readers verifying a claim: the finding, the method, the limits, how to cite.', [['Listing', 'research', 'research-listing'], ['Representative report', 'research-detail', 'research-detail']]],
  ['Work (case-study library)', 'The full library: find the right case by service, industry or a word, then read it.', [['Page 1', 'work-p1', 'work-page-1'], ['Filtered: Service = SEO', 'work-filtered', 'work-filtered-seo'], ['Page 2', 'work-p2', 'work-page-2'], ['Empty search', 'work-empty', 'work-empty-search']]],
];
(async () => {
  let body = '';
  for (const [name, purpose, items] of SETS) {
    body += `<section><h2>${name}</h2><p class="pu">${purpose}</p>`;
    for (const [label, cur, mock] of items) {
      const cd = await enc(path.join(R, 'audit/current', `${cur}-1440.png`), 560, 2600), cm = await enc(path.join(R, 'audit/current', `${cur}-390.png`), 200, 2600);
      const pd = await enc(path.join(__dirname, 'shots', `${mock}-desktop.png`), 760, 3400), pm = await enc(path.join(__dirname, 'shots', `${mock}-mobile.png`), 260, 3400);
      body += `<h3>${label}</h3><div class="g"><figure><figcaption>Today, 1440 px</figcaption><img src="${cd}" alt=""></figure><figure class="p"><figcaption>Proposed, 1440 px</figcaption><img src="${pd}" alt=""></figure><figure><figcaption>Today, 390 px</figcaption><img src="${cm}" alt=""></figure><figure class="p"><figcaption>Proposed, 390 px</figcaption><img src="${pm}" alt=""></figure></div>`;
    }
    body += '</section>';
  }
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Editorial and Work Proposal</title><style>
:root{--g:#F7F3EC;--ink:#141219;--t:#D94400;--dim:#5C5665}@media(prefers-color-scheme:dark){:root{--g:#141219;--ink:#F7F3EC;--dim:#b9b2a5}}
body{margin:0;background:var(--g);color:var(--ink);font:16px/1.5 system-ui,sans-serif}main{max-width:1500px;margin:auto;padding:24px 16px 64px}h1{font-size:1.8rem;margin:0 0 6px}h2{font-size:1.5rem;margin:48px 0 4px;border-top:3px solid var(--ink);padding-top:14px}h3{margin:28px 0 8px}.pu{color:var(--dim);margin:0 0 6px}.lead{color:var(--dim);max-width:70ch}
.g{display:grid;grid-template-columns:560fr 760fr 200fr 260fr;gap:14px;align-items:start;overflow-x:auto}figure{margin:0;min-width:0}figcaption{font-size:.8125rem;font-weight:700;margin-bottom:6px;color:var(--dim)}figure.p figcaption{color:var(--t)}img{width:100%;height:auto;display:block;border:1px solid #8883}figure.p img{border:2px solid var(--t)}
@media(max-width:900px){.g{grid-template-columns:1fr 1fr}}</style></head><body><main><h1>Press, Blog, Research and Work: proposal mockups</h1><p class="lead">Actual content from the port-3500 pages, shown inside the real header and footer. Left of each pair: today. Orange outline: proposed. Long pages are cropped to their first screens; the files in docs/editorial-redesign/mockup/shots are full length. Proposal only: no application code has changed.</p>${body}</main></body></html>`;
  fs.writeFileSync(path.join(R, 'REVIEW.html'), html);
  console.log(Math.round(html.length / 1024) + ' KB');
})();
