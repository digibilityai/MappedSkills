// Builds the readable review PDF for /press, /blog and /research (corrected proposal) and DECISIONS_REGISTER.md.
// Desktop pages are cut into full-width sheets (1440 px wide). Mobile pages are cut into consecutive 390 x 960 screens, three per sheet,
// each labelled, so no mobile page is shrunk into a narrow strip. Output: docs/editorial-redesign/PROPOSAL_MOCKUPS_R2.pdf
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../node_modules/sharp'));
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const SH = path.join(__dirname, 'shots'); const META = JSON.parse(fs.readFileSync(path.join(SH, 'meta.json'), 'utf8'));
const ROOT = path.join(__dirname, '..'); const OUT = path.join(ROOT, 'PROPOSAL_MOCKUPS_R2.pdf');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const DECISIONS = [
  ['ED-1', 'The shared editorial grammar (hero, row, meta strip, detail frame, related links) and the three deliberate differences between news, articles and research.', 'RECOMMENDATION', 'Not yet approved. The owner asked for corrections to this proposal, which is not approval of it.'],
  ['ED-2', 'Press: two text rows ("Research", "About MappedSkills") replace the "Useful for your story" tiles; the release graphic shows on the listing row.', 'RECOMMENDATION', 'Not yet approved.'],
  ['ED-3', 'Blog: no filters, topic pages or pagination until the blog has more than 12 articles and two topics with at least two articles each (the /work rule); featured images stay sharing-only. The row meta stays topic and reading time with no date (BL-D4).', 'RECOMMENDATION', 'The owner removed this explanation from the public mockups, so it now lives only in the proposal. Not yet approved.'],
  ['ED-4', 'Show each research finding once and remove redundant repeated summaries, without dropping unique information or changing findings.', 'RESOLVED', 'Owner instruction in this pass: retain the removal, keep unique information. Applied as: headline figures once with sample and source; the finding sections keep their full text and charts; nothing is reworded.'],
  ['ED-5', '/work: remove the logo strip, route panel and "start here" block; one uniform grid.', 'RESOLVED', 'Approved as /work R2 and implemented locally (DEC-108). Unchanged in this pass.'],
  ['ED-6', '/work controls: Service and Industry as selects.', 'RESOLVED', 'Approved as part of /work R2 (DEC-108).'],
  ['ED-7', '/work cards: name, service, one approved line; no eyebrow or repeated link.', 'RESOLVED', 'Approved and refined in /work R2 (lead figure or short summary; DEC-108).'],
  ['ED-8a', 'Detail pages, mobile: a collapsed "On this page" control (closed and open states shown), not an expanded contents list.', 'RESOLVED', 'Owner requirement in this pass, applied to all three templates.'],
  ['ED-8b', 'Detail pages, desktop and shared: a static (not sticky) contents rail at left, one 700 px reading column, up to three related links across collections; existing section anchors kept.', 'RECOMMENDATION', 'Not yet approved. The related links are listed in ED-9.'],
  ['ED-9', 'Related links: a press release links its research report and the newsroom; a report links its release and the newsroom; an article links two other articles chosen by one rule (same topic first, then newest) plus the blog index. No editorial "picks" are invented.', 'RECOMMENDATION', 'New in this pass. Not yet approved. The two example articles in the mockup follow the rule from the current list order.'],
  ['ED-10', 'Blog: keep showing only "By Amit Gupta" and "Updated October 20, 2026" (both recorded on all 7 articles). Do not show the recorded publication date.', 'RECOMMENDATION', 'New in this pass. All seven articles share one recorded publication date (July 16, 2026, in structured data only), which would read as a single import date. Not yet approved.'],
  ['B-1', 'Which blog articles carry an author.', 'RESOLVED', 'Verified on the live pages: all 7 show "By Amit Gupta" and carry author Amit Gupta in structured data. The research report names Amit Gupta; the press release has no byline and none is added.'],
  ['B-2', 'Whether every article has an update date.', 'RESOLVED', 'Verified: all 7 show "Updated October 20, 2026" and carry a recorded modified date; no date is changed or invented.'],
  ['B-3', 'AnybodyCanBake Meta Ads card artwork prints a small "illustrative" caption inside the image.', 'GENUINE BLOCKER', 'An asset fix that needs replacement artwork from the owner. It affects the implemented /work cards only, not these three collections.'],
  ['B-4', '/research/industry-benchmarks: category page or merged into the research hub?', 'RESOLVED', 'Owner decision in this pass: it stays its own route for now. The proposal keeps the URL and its content; it only adopts the shared row.'],
  ['B-5', 'The reusable case-showcase component and its light/dark variant.', 'RESOLVED', 'A separate pending task by owner instruction; not used or touched here.'],
];

const FONT = (n) => fs.readFileSync(path.join(__dirname, '../../case-showcase/mockup/fonts', n)).toString('base64');
const css = `@font-face{font-family:'Manrope';font-weight:200 800;src:url(data:font/woff2;base64,${FONT('manrope.woff2')}) format('woff2')}@font-face{font-family:'Bricolage Grotesque';font-weight:200 800;src:url(data:font/woff2;base64,${FONT('bricolage.woff2')}) format('woff2')}*{box-sizing:border-box}html,body{margin:0}body{font-family:Manrope,system-ui,sans-serif;color:#141219}h1,h2,h3{font-family:'Bricolage Grotesque',system-ui,sans-serif;margin:0;letter-spacing:-.02em}
.band{height:44px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 18px;background:#141219;color:#F7F3EC;font:800 15px Manrope,system-ui;white-space:nowrap;overflow:hidden}.band span+span{font-weight:600;color:#cfc8d6}
.sheet{position:relative;overflow:hidden;break-after:page;background:#F7F3EC}.cont{position:absolute;right:0;bottom:0;background:#FF5B04;color:#141219;font:800 14px Manrope;padding:6px 14px}
.panels{display:grid;grid-template-columns:repeat(3,390px);gap:24px;justify-content:center;padding:22px 0}.pn{width:390px}.pn img{display:block;width:390px;border:1px solid #8c8678}.pn p{margin:6px 0 0;font:700 13px Manrope;color:#5C5665}
table{border-collapse:collapse;width:100%;font-size:14.5px;line-height:1.45}th{text-align:left;font:800 12px Manrope;letter-spacing:.08em;text-transform:uppercase;color:#5C5665;border-bottom:3px solid #141219;padding:8px 10px}td{vertical-align:top;border-bottom:1px solid #D9D2C5;padding:9px 10px}td:first-child{font-weight:800;white-space:nowrap}
.tag{display:inline-block;padding:3px 9px;font:800 11.5px Manrope;letter-spacing:.06em;text-transform:uppercase;border:1.5px solid #141219}.tag.r{background:#141219;color:#fff}.tag.a{background:#FFE3D1;border-color:#A83400;color:#7a2600}.tag.b{background:#A83400;border-color:#A83400;color:#fff}`;
let pageCss = ''; const sheets = []; let n = 0;
const add = (w, h, inner) => { const id = 'p' + n++; pageCss += `@page ${id}{size:${w}px ${h}px;margin:0}`; sheets.push(`<section class="sheet" style="page:${id};width:${w}px;height:${h}px">${inner}</section>`); };
const jpg = async (buf) => `data:image/jpeg;base64,${(await sharp(buf).jpeg({ quality: 84 }).toBuffer()).toString('base64')}`;

const PAGES = [
  ['/press: listing', 'press-listing'], ['/press/[release]: complete release template', 'press-detail'],
  ['/blog: listing', 'blog-listing'], ['/blog/[article]: complete representative article', 'blog-detail'],
  ['/research: listing', 'research-listing'], ['/research/[report]: complete report template', 'research-detail'],
];
(async () => {
  // ---- cover
  add(1440, 960, `<div style="padding:52px 72px"><p style="font:800 12px Manrope;letter-spacing:.12em;text-transform:uppercase;color:#A83400">Corrected proposal for review · 31 October 2026 · proposal only, nothing implemented</p>
    <h1 style="font-size:48px;line-height:1.05;margin-top:12px">/press, /blog and /research: corrected mockups</h1>
    <p style="font-size:18px;line-height:1.5;max-width:70ch;margin-top:14px">Listing and complete detail templates for each collection at desktop (1440 px) and mobile (390 px), with actual content from the port-3500 pages inside the real header and footer. /work is unchanged (implemented as R2). Preserved: every URL, title, description, canonical, robots rule, structured data, recorded date, byline, chart and substantive paragraph.</p>
    <h2 style="font-size:24px;margin:28px 0 8px;border-top:3px solid #141219;padding-top:12px">What was corrected</h2>
    <ol style="font-size:16.5px;line-height:1.55;max-width:112ch;padding-left:22px;margin:0">
      <li><b>Internal notes removed</b> from the mockups ("Order as published by the CMS", when filters or pagination appear, "listed in date order", and similar). They remain in the proposal document only.</li>
      <li><b>Mobile contents</b>: the long expanded list is now one collapsed "On this page" control on all three detail templates, shown closed and open; desktop keeps a static contents rail; every section anchor of the live pages is kept.</li>
      <li><b>Research labels</b>: "The full report", "Methodology" and "Limitations" were plain-text section labels above headings that already say the same thing, so they are removed; the report's jump links (Key findings, Methodology, Limitations, Cite) now point at the real sections.</li>
      <li><b>Readable sheets</b>: desktop pages are full-width sheets; each mobile page is cut into consecutive 390 px screens, three per sheet, labelled "part n of m".</li>
      <li><b>Content preserved</b>: the research hub's "What this means for you" and "What it doesn't mean" statements, the headline paragraph, and every per-finding sample and source line are restored; the blog byline carries no title the live page does not show.</li>
      <li><b>Decisions</b>: ED-1 to ED-10 and B-1 to B-5 are listed on the last two sheets and marked resolved, recommendation requiring approval, or genuine blocker.</li></ol>
    <h2 style="font-size:24px;margin:26px 0 8px;border-top:3px solid #141219;padding-top:12px">How to read this PDF</h2>
    <p style="font-size:16.5px;line-height:1.55;max-width:100ch">Desktop: each sheet is one full-width slice; its band names the page and the part, and an orange tab says "continues". Mobile: each sheet shows three consecutive phone screens left to right, then continues on the next sheet. A closed-and-open comparison of the mobile contents control follows the research mobile sheets.</p></div>`);

  for (const [title, name] of PAGES) {
    // desktop
    const dk = await sharp(path.join(SH, `${name}-desktop.png`)).metadata(); const dn = Math.ceil(dk.height / 1750); const SLICE = Math.ceil(dk.height / dn);
    for (let i = 0; i < dn; i++) {
      const top = i * SLICE, hh = Math.min(SLICE, dk.height - top);
      const img = await jpg(await sharp(path.join(SH, `${name}-desktop.png`)).extract({ left: 0, top, width: 1440, height: hh }).toBuffer());
      add(1440, hh + 44, `<div class="band"><span>${title} · desktop 1440 px</span><span>part ${i + 1} of ${dn}</span></div><img style="display:block;width:1440px;height:${hh}px" src="${img}">${i < dn - 1 ? '<div class="cont">continues on the next sheet →</div>' : ''}`);
    }
    // mobile: three 390 x 960 screens per sheet
    const mk = await sharp(path.join(SH, `${name}-mobile.png`)).metadata(); const PH = 960; const total = Math.ceil(mk.height / 2 / PH); const sheetsN = Math.ceil(total / 3);
    for (let s = 0; s < sheetsN; s++) {
      let panels = '';
      for (let k = 0; k < 3; k++) {
        const idx = s * 3 + k; if (idx >= total) break;
        const topCss = idx * PH, hCss = Math.min(PH, mk.height / 2 - topCss);
        const img = await jpg(await sharp(path.join(SH, `${name}-mobile.png`)).extract({ left: 0, top: Math.round(topCss * 2), width: mk.width, height: Math.round(hCss * 2) }).toBuffer());
        panels += `<div class="pn"><img src="${img}" style="height:${hCss}px"><p>Screen ${idx + 1} of ${total}${idx < total - 1 ? ' · continues →' : ' · end'}</p></div>`;
      }
      add(1440, 44 + 22 + PH + 22 + 30, `<div class="band"><span>${title} · mobile 390 px</span><span>sheet ${s + 1} of ${sheetsN}</span></div><div class="panels">${panels}</div>`);
    }
  }
  // mobile contents control: closed and open
  const crop = async (file, top) => jpg(await sharp(path.join(SH, file)).extract({ left: 0, top: Math.max(0, Math.round((top - 120) * 2)), width: 780, height: 1900 }).toBuffer());
  const cl = await crop('research-detail-mobile.png', META['research-detail-mobile'].rail), op = await crop('research-detail-nav-open-mobile.png', META['research-detail-nav-open-mobile'].rail);
  add(1440, 44 + 22 + 950 + 22 + 90, `<div class="band"><span>Mobile contents control · "On this page" (research report; same control on press and blog)</span><span>closed and open</span></div><div class="panels" style="grid-template-columns:repeat(2,390px)"><div class="pn"><img src="${cl}" style="height:950px"><p>Closed (default): one 52 px control, "On this page · 15 sections", + at the right. Native details element: keyboard (Enter or Space), no script needed.</p></div><div class="pn"><img src="${op}" style="height:950px"><p>Open: the section links, each a 44 px target; links jump to the existing section anchors. − at the right.</p></div></div>`);
  // decisions
  const tag = (s) => `<span class="tag ${s === 'RESOLVED' ? 'r' : s === 'GENUINE BLOCKER' ? 'b' : 'a'}">${s === 'RECOMMENDATION' ? 'Recommendation, needs approval' : s === 'GENUINE BLOCKER' ? 'Genuine blocker' : 'Resolved'}</span>`;
  const rows = (list) => list.map(([id, t, s, n]) => `<tr><td>${id}</td><td>${esc(t)}</td><td>${tag(s)}</td><td>${esc(n)}</td></tr>`).join('');
  const head = '<tr><th>ID</th><th>Decision</th><th>Status</th><th>Reconciliation with the owner’s decisions</th></tr>';
  add(1440, 1250, `<div class="band"><span>Decisions and blockers · ED-1 to ED-10</span><span>sheet 1 of 2</span></div><div style="padding:22px 40px"><table>${head}${rows(DECISIONS.filter((d) => d[0].startsWith('ED')))}</table></div>`);
  add(1440, 900, `<div class="band"><span>Decisions and blockers · B-1 to B-5</span><span>sheet 2 of 2</span></div><div style="padding:22px 40px"><table>${head}${rows(DECISIONS.filter((d) => d[0].startsWith('B')))}</table><p style="margin-top:22px;font-size:15px;max-width:110ch">No recommendation here is treated as approved. The only genuine blocker, B-3, does not block these three collections.</p></div>`);

  fs.writeFileSync(path.join(ROOT, 'DECISIONS_REGISTER.md'), `# Open decisions and blockers: /press, /blog, /research (31 October 2026)\n\n| ID | Decision | Status | Reconciliation with the owner's decisions |\n|---|---|---|---|\n${DECISIONS.map(([id, t, s, n]) => `| ${id} | ${t} | **${s === 'RECOMMENDATION' ? 'Recommendation requiring approval' : s === 'GENUINE BLOCKER' ? 'Genuine blocker' : 'Resolved'}** | ${n} |`).join('\n')}\n`);
  const html = `<!doctype html><meta charset="utf-8"><style>${css}${pageCss}</style>${sheets.join('')}`;
  fs.writeFileSync(path.join(__dirname, 'pdf-src.html'), html);
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const p = await b.newPage(); await p.goto('file://' + path.join(__dirname, 'pdf-src.html'), { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true }); await b.close(); fs.unlinkSync(path.join(__dirname, 'pdf-src.html'));
  console.log(sheets.length, 'sheets', Math.round((fs.statSync(OUT).size / 1048576) * 10) / 10, 'MB');
})();
