// Builds docs/editorial-redesign/PROPOSAL_MOCKUPS.pdf: every mockup at full length (long ones continue on further pages), desktop 1440 px and mobile 390 px (2x).
const fs = require('node:fs'); const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../node_modules/sharp'));
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const SH = path.join(__dirname, 'shots'); const OUT = path.join(__dirname, '..', 'PROPOSAL_MOCKUPS.pdf');
const ORDER = [
  ['/work: default (page 1)', 'work-page-1'], ['/work: filtered, Service = SEO', 'work-filtered-seo'], ['/work: page 2', 'work-page-2'], ['/work: empty search', 'work-empty-search'],
  ['/press: listing', 'press-listing'], ['/blog: listing', 'blog-listing'], ['/research: listing', 'research-listing'],
  ['/press/[release]: complete detail page', 'press-detail'], ['/blog/[article]: complete detail page', 'blog-detail'], ['/research/[report]: complete detail page', 'research-detail'],
];
const CHUNK = 9000; // CSS px per PDF page
(async () => {
  const pages = []; let css = '';
  let pid = 0;
  const add = (w, h, inner) => { const id = 'p' + pid++; css += `@page ${id}{size:${w}px ${h}px;margin:0}`; pages.push(`<section style="page:${id};width:${w}px;height:${h}px;overflow:hidden;break-after:page;position:relative;background:#F7F3EC">${inner}</section>`); };
  // cover
  const cover = `<div style="padding:56px 72px;font-family:Manrope,system-ui,sans-serif;color:#141219"><p style="font:800 12px Manrope;letter-spacing:.12em;text-transform:uppercase;color:#A83400">Proposal for visual approval · 31 October 2026</p><h1 style="font:800 52px/1.05 'Bricolage Grotesque',system-ui;margin:14px 0 0">/work, /press, /blog and /research: redesign mockups</h1><p style="font-size:19px;line-height:1.5;max-width:60ch;margin-top:18px">Actual content from the port-3500 pages, laid out in the proposed shared editorial system and shown inside the real site header and footer. Every page below is full length at 1440 px (desktop) and 390 px (mobile). Long pages continue on the next sheet. Mockups only: no application code, content, URL or metadata has been changed.</p>
  <h2 style="font:800 24px 'Bricolage Grotesque',system-ui;margin:34px 0 10px;border-top:3px solid #141219;padding-top:14px">Contents</h2><ol style="font-size:17px;line-height:1.9;columns:2;padding-left:22px;max-width:900px">${ORDER.map(([t]) => `<li>${t}: desktop and mobile</li>`).join('')}</ol>
  <h2 style="font:800 24px 'Bricolage Grotesque',system-ui;margin:34px 0 10px;border-top:3px solid #141219;padding-top:14px">What stays exactly as it is</h2><ul style="font-size:17px;line-height:1.6;max-width:70ch;padding-left:22px"><li>Every URL: /work, /work/page/[n], /work/index.json, /press, /press/[slug], /blog, /blog/[slug], /research, /research/[slug], /research/industry-benchmarks.</li><li>Titles, descriptions, canonicals, robots, Open Graph and structured data (Organization, NewsArticle, Article, Report, BreadcrumbList) and indexing rules.</li><li>Every article, release and report paragraph, publication and update date, and byline (none is added or invented). All 20 listed case studies, their order, approved figures, classifications, search behaviour and filter URLs (?service=, ?industry=, q, p). Home Decor stays unlisted.</li></ul>
  <h2 style="font:800 24px 'Bricolage Grotesque',system-ui;margin:34px 0 10px;border-top:3px solid #141219;padding-top:14px">What the mockups are, and are not</h2><ul style="font-size:17px;line-height:1.6;max-width:70ch;padding-left:22px"><li>Static HTML injected into the live pages; not built components. The tangerine bar charts, headline chart and release graphic are the pages' own data and images.</li><li>The research-report layout shows each finding once (an index, then its own section) and keeps every real paragraph, chart, list and heading, so it is only modestly shorter than today's page (15,229 px against 17,611 px at 1440). Reading time comes from the report's length, not from repetition alone.</li><li>Decisions ED-1 to ED-8 and blockers B-1 to B-5 are in EDITORIAL_AND_WORK_PROPOSAL.md.</li></ul></div>`;
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
