// Builds docs/editorial-redesign/PROPOSAL_WORK_R2.pdf: every mockup at full length (long ones continue on further pages), desktop 1440 px and mobile 390 px (2x).
const fs = require('node:fs'); const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../node_modules/sharp'));
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const SH = path.join(__dirname, 'shots'); const OUT = path.join(__dirname, '..', 'PROPOSAL_WORK_R2.pdf');
const ORDER = [
  ['/work R2: default (page 1)', 'work-r2-page-1'], ['/work R2: filtered, Service = SEO', 'work-r2-filtered-seo'], ['/work R2: page 2', 'work-r2-page-2'], ['/work R2: empty search', 'work-r2-empty-search'],
];
const CHUNK = 9000; // CSS px per PDF page
(async () => {
  const pages = []; let css = '';
  let pid = 0;
  const add = (w, h, inner) => { const id = 'p' + pid++; css += `@page ${id}{size:${w}px ${h}px;margin:0}`; pages.push(`<section style="page:${id};width:${w}px;height:${h}px;overflow:hidden;break-after:page;position:relative;background:#F7F3EC">${inner}</section>`); };
  // cover
  const cover = `<div style="padding:56px 72px;font-family:Manrope,system-ui,sans-serif;color:#141219"><p style="font:800 12px Manrope;letter-spacing:.12em;text-transform:uppercase;color:#A83400">Revision 2 for visual approval · /work only · 31 October 2026</p><h1 style="font:800 48px/1.05 'Bricolage Grotesque',system-ui;margin:14px 0 0">/work library: simpler, two columns</h1><p style="font-size:19px;line-height:1.5;max-width:62ch;margin-top:18px">Replaces the first /work proposal, which was rejected as cluttered. Actual content from the port-3500 pages inside the real header and footer, full length, desktop 1440 px and mobile 390 px. The other collection proposals are unchanged in this pass. Mockups only: nothing has been implemented.</p>
<h2 style="font:800 24px 'Bricolage Grotesque',system-ui;margin:30px 0 10px;border-top:3px solid #141219;padding-top:14px">What changed from the first proposal</h2><ul style="font-size:17px;line-height:1.6;max-width:72ch;padding-left:22px"><li>Two generous columns on desktop (608 px cards), one column on mobile; 12 cases per page; current order, routes, search and filter behaviour.</li><li>The card image is shown whole at its supplied 8:5 ratio, with no overlay, badge or border.</li><li>Below the image: the client name (the link), the service in orange, and one summary sentence. The industry eyebrow and the repeated "Read case study" link are gone; the industry filter stays.</li><li>One link per card: the client name, stretched over the image, with a tangerine underline on hover and a 3 px outline on keyboard focus. No second image link, so a screen reader hears one link.</li><li>Row spacing 88 px on desktop, 48 px on mobile. Borders reduced to the underlines of the three controls; no card frames, no section rules, no logo strip, no route panel, no featured block.</li><li>Introduction, Search, Service and Industry controls, and the result count sit together at the top; the first card starts about 500 px down on desktop.</li></ul>
<h2 style="font:800 24px 'Bricolage Grotesque',system-ui;margin:30px 0 10px;border-top:3px solid #141219;padding-top:14px">Decide</h2><ul style="font-size:17px;line-height:1.6;max-width:72ch;padding-left:22px"><li><b>Summary, not a figure.</b> The approved result is already printed in each card image, so the text under it is the existing approved summary (which never repeats the image's figure or headline). A second result line would repeat the image.</li><li><b>ClassPe and InsurYo show no service line</b> because organic social and organic growth work are not catalogue services (DEC-005, DEC-106). Their cards therefore have a summary but no orange service word.</li><li><b>Label mismatch kept as is:</b> cards say "Meta Ads" (the approved case copy) while the Service filter says "Social media ads" (the catalogue key). Aligning them is a separate copy decision.</li><li>One supplied card (AnybodyCanBake Meta Ads) still prints a small "illustrative" caption in its artwork; that is an asset fix, not part of this layout.</li></ul></div>`;
  add(1440, 1500, cover);
  for (const [title, name] of ORDER) for (const [tag, w, k] of [['desktop', 1440, 1], ['mobile', 390, 2]]) {
    const f = path.join(SH, `${name}-${tag}.png`); const m = await sharp(f).metadata();
    const cssH = Math.round(m.height / k); const parts = Math.ceil(cssH / CHUNK);
    for (let i = 0; i < parts; i++) {
      const top = i * CHUNK, hh = Math.min(CHUNK, cssH - top);
      const buf = await sharp(f).extract({ left: 0, top: top * k, width: m.width, height: hh * k }).jpeg({ quality: 82 }).toBuffer();
      const label = `${title} · ${tag === 'desktop' ? 'desktop 1440 px' : 'mobile 390 px'}${parts > 1 ? ` · sheet ${i + 1} of ${parts}` : ''}`;
      add(w, hh + 44, `<div style="height:44px;display:flex;align-items:center;padding:0 16px;font:800 ${w > 700 ? 15 : 12}px Manrope,system-ui;background:#141219;color:#F7F3EC;white-space:nowrap;overflow:hidden">${label}</div><img style="display:block;width:${w}px;height:${hh}px" src="data:image/jpeg;base64,${buf.toString('base64')}">`);
    }
  }
  const html = `<!doctype html><meta charset="utf-8"><style>${css} html,body{margin:0;padding:0}</style>${pages.join('')}`;
  fs.writeFileSync(path.join(__dirname, 'pdf-source.html'), html);
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'pdf-source.html'), { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true });
  await b.close();
  console.log(pages.length, 'pages', Math.round(fs.statSync(OUT).size / 1048576 * 10) / 10, 'MB');
})();
