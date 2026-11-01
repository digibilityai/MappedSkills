// Review PDF for the R3 editorial direction: brand-alignment sheets, then desktop sheets (full-width slices) and mobile sheets (three consecutive
// 390 px screens per sheet), the contents control, and the decision register. Output: docs/editorial-redesign/PROPOSAL_EDITORIAL_R3.pdf
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../node_modules/sharp'));
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const SH = path.join(__dirname, 'shots'); const META = JSON.parse(fs.readFileSync(path.join(SH, 'meta.json'), 'utf8'));
const REF = path.join(__dirname, 'refs'); const PREV = path.join(__dirname, '../mockup/shots');
const ROOT = path.join(__dirname, '..'); const OUT = path.join(ROOT, 'PROPOSAL_EDITORIAL_R3.pdf');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const FONT = (n) => fs.readFileSync(path.join(__dirname, '../../case-showcase/mockup/fonts', n)).toString('base64');

const DECISIONS = [
  ['R3-1', 'Adopt the dark-hero editorial direction (deep-ink opening with a two-tone headline and a real visual, ink and paper bands, one burnt closing band) for /blog, /press, the press release and, for consistency, /research.', 'RECOMMENDATION', 'Replaces the rejected R2 direction. Not yet approved.'],
  ['R3-2', 'Blog: which article is the featured read. Recommended: "7 Proven Strategies of Digital Marketing for Real Estate Developers" (its own image, a priority segment in Brand DNA v3, 13 minutes). There is no "featured" flag in Contentful, so the choice would be a fixed slug now and a CMS field only if separately authorised.', 'RECOMMENDATION', 'Owner choice needed; not treated as approved.'],
  ['R3-3', 'Blog imagery: use each article\'s existing featured image whole in a 2:1 frame. Two articles have none and two share one image, so articles without an image show a typographic cover tile (topic name on ink with one orange square), which implies no event, client or result.', 'RECOMMENDATION', 'Uses existing imagery as instructed. Not yet approved.'],
  ['R3-4', 'Blog: distinct, on-brand images for the two articles that have none and the one that shares an image (and a review of the stock photography).', 'GENUINE BLOCKER', 'Needs assets from the owner. It does not block the layout, which has the cover-tile fallback, but the collection will not look finished without them.'],
  ['R3-5', 'Press: the latest announcement is the opening visual (its release graphic, date, title, summary, one button). Compact supporting records are the background documents (the research report, About MappedSkills, the boilerplate). Earlier releases would appear as compact dated records under the lead once they exist; no release is invented.', 'RECOMMENDATION', 'Not yet approved. With one release, repeating it as a list row would duplicate the lead, so it is not repeated.'],
  ['R3-6', 'Press release: strong opening (the recorded title with its key clause in orange, the release graphic, three chips for type, date and research ID), a readable 700 px body, the evidence in its own dark band, and supporting material (About the research, About MappedSkills, Media enquiries) in separate cards at the end. Anchors kept: the-release, key-findings, why-this-matters-for-businesses, a-note-from-the-founder, about-the-research, about-mappedskills, media-enquiries; pd-h-ev kept as an alias on the evidence band.', 'RECOMMENDATION', 'The pd-h-ev alias is an owner requirement and is applied. The rest is not yet approved.'],
  ['R3-7', 'Research: the same dark hero and dark evidence bands, the 120-square chart as the opening visual, all existing bar charts and the chart image kept, the findings shown once as cards with their sample and source line. Hub: every statement restored.', 'RECOMMENDATION', 'Checked against the new direction; not yet approved.'],
  ['R3-8', 'The orange emphasis in each headline is a clause of the recorded title (for example "Which is Right for Your Business?"). Title text, h1 content, metadata and structured data are unchanged.', 'RECOMMENDATION', 'A styling choice; not yet approved.'],
  ['R3-9', 'Closing band colour: the approved burnt band (#A83400) with a white headline, an ink button and a text link, not the bright tangerine band of the R2 mockups.', 'RECOMMENDATION', 'Matches every approved page; not yet approved.'],
  ['R3-10', 'New small copy: "Every guide, in one place.", "Two more guides.", "Latest announcement", "Key findings." and the numbered chapter labels.', 'RECOMMENDATION', 'New wording needs approval. No claim is made in it.'],
  ['ED-8a', 'Mobile: a collapsed "On this page" control (closed and open states shown).', 'RESOLVED', 'Owner requirement of the previous pass; carried over unchanged.'],
  ['ED-9', 'Related links by rule (release and report link each other; an article links two others by one rule plus the blog index).', 'RECOMMENDATION', 'Carried over; the mockup shows two articles chosen by list order. Not yet approved.'],
  ['ED-10', 'Blog byline "By Amit Gupta" and "Updated October 20, 2026" only (recorded on all 7); the recorded publication date is not shown.', 'RECOMMENDATION', 'Carried over. Not yet approved.'],
  ['ED-1, ED-2, ED-3, ED-8b', 'The R2 editorial grammar, press tiles to rows, blog filter rule and desktop rail and related links of the previous proposal.', 'SUPERSEDED', 'Superseded by the owner\'s rejection of that visual direction. The blog filter rule (none until more than 12 articles) is carried into R3-3 as a build rule, not a visible element.'],
  ['ED-4, ED-5, ED-6, ED-7', 'Single statement of each finding; /work R2 decisions.', 'RESOLVED', 'Unchanged: ED-4 by the owner\'s instruction, ED-5 to ED-7 by the approved /work R2 (DEC-108).'],
  ['B-1, B-2', 'Authors and update dates of the seven articles.', 'RESOLVED', 'Verified: all seven show "By Amit Gupta" and "Updated October 20, 2026".'],
  ['B-3', 'AnybodyCanBake Meta Ads card artwork prints a small "illustrative" caption.', 'GENUINE BLOCKER', 'Needs replacement artwork; affects /work only.'],
  ['B-4, B-5', '/research/industry-benchmarks route; the case-showcase component.', 'RESOLVED', 'Route kept for now; the showcase stays a separate pending task.'],
];
const css = `@font-face{font-family:'Manrope';font-weight:200 800;src:url(data:font/woff2;base64,${FONT('manrope.woff2')}) format('woff2')}@font-face{font-family:'Bricolage Grotesque';font-weight:200 800;src:url(data:font/woff2;base64,${FONT('bricolage.woff2')}) format('woff2')}*{box-sizing:border-box}html,body{margin:0}body{font-family:Manrope,system-ui,sans-serif;color:#141219}h1,h2,h3{font-family:'Bricolage Grotesque',system-ui,sans-serif;margin:0;letter-spacing:-.02em}
.band{height:44px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 18px;background:#141219;color:#F7F3EC;font:800 15px Manrope,system-ui;white-space:nowrap;overflow:hidden}.band span+span{font-weight:600;color:#cfc8d6}
.sheet{position:relative;overflow:hidden;break-after:page;background:#F7F3EC}.cont{position:absolute;right:0;bottom:0;background:#A83400;color:#fff;font:800 14px Manrope;padding:6px 14px}
.panels{display:grid;grid-template-columns:repeat(3,390px);gap:24px;justify-content:center;padding:22px 0}.pn{width:390px}.pn img{display:block;width:390px;border:1px solid #8c8678}.pn p{margin:6px 0 0;font:700 13px Manrope,system-ui;color:#5C5665}
table{border-collapse:collapse;width:100%;font-size:14.5px;line-height:1.45}th{text-align:left;font:800 12px Manrope;letter-spacing:.08em;text-transform:uppercase;color:#5C5665;border-bottom:3px solid #141219;padding:8px 10px}td{vertical-align:top;border-bottom:1px solid #D9D2C5;padding:9px 10px}td:first-child{font-weight:800;white-space:nowrap}
.tag{display:inline-block;padding:3px 9px;font:800 11.5px Manrope;letter-spacing:.06em;text-transform:uppercase;border:1.5px solid #141219}.tag.r{background:#141219;color:#fff}.tag.a{background:#FFE3D1;border-color:#A83400;color:#7a2600}.tag.b{background:#A83400;border-color:#A83400;color:#fff}.tag.s{background:#e7e0d3;color:#5C5665;border-color:#9a9486}
.cmp{display:grid;gap:18px;padding:22px 30px}.cmp .row{display:grid;gap:18px}.cmp figure{margin:0}.cmp figcaption{font:800 13px Manrope;margin-bottom:6px;color:#141219}.cmp img{display:block;width:100%;border:1px solid #8c8678}.cmp h3{font-size:20px;margin:6px 0 2px}.lbl{font:800 12px Manrope;letter-spacing:.1em;text-transform:uppercase;color:#A83400}`;
let pageCss = ''; const sheets = []; let n = 0;
const add = (w, h, inner) => { const id = 'p' + n++; pageCss += `@page ${id}{size:${w}px ${h}px;margin:0}`; sheets.push(`<section class="sheet" style="page:${id};width:${w}px;height:${h}px">${inner}</section>`); };
const jpg = async (buf, q = 84) => `data:image/jpeg;base64,${(await sharp(buf).jpeg({ quality: q }).toBuffer()).toString('base64')}`;
const crop = async (file, w, h, top = 0) => { const m = await sharp(file).metadata(); const k = m.width / w; return jpg(await sharp(file).extract({ left: 0, top: Math.round(top * k), width: m.width, height: Math.round(Math.min(h, m.height / k - top) * k) }).resize({ width: 900 }).toBuffer(), 80); };
const PAGES = [
  ['/blog: listing (featured read and collection)', 'blog-listing'], ['/blog/[article]: complete representative article', 'blog-detail'],
  ['/press: newsroom listing', 'press-listing'], ['/press/[release]: complete release template', 'press-detail'],
  ['/research: hub (aligned)', 'research-listing'], ['/research/[report]: complete report template (aligned)', 'research-detail'],
];
(async () => {
  // 1. brand alignment: principles
  add(1440, 1010, `<div style="padding:44px 60px"><p class="lbl">Revised editorial direction R3 · for approval · proposal only, nothing implemented</p><h1 style="font-size:44px;line-height:1.05;margin-top:10px">Brand alignment: what the first proposal missed</h1>
   <p style="font-size:17px;line-height:1.55;max-width:105ch;margin-top:12px">The owner rejected the R2 direction as inconsistent with the site. It reused the fonts and colours but not the way approved pages are built. Measured on /faq, /how-it-works, /about, the home page and the case-study template, and read against Brand DNA v3 (bold editorial headline, supporting line, clear call to action, grounded graphic; proof that is precise, attributed and caveated; restrained, purposeful motion).</p>
   <table style="margin-top:22px"><tr><th>Brand principle (approved pages and Brand DNA v3)</th><th>What the approved pages do</th><th>What the R2 proposal did</th><th>R3 response</th></tr>
   <tr><td>Dark-to-light narrative pacing</td><td>Every opening is a deep-ink hero (#0F0D14, 72 px above, 86 px below), then paper and ink bands alternate, ending in one burnt band.</td><td>Flat paper from header to footer; no pacing.</td><td>Dark opening, paper collection, dark evidence where there is evidence, burnt close.</td></tr>
   <tr><td>Bold editorial headline</td><td>Bricolage 800, 68.8 px / 1.04, -0.035em, white with the second clause in tangerine.</td><td>Small, pale headings; orange scattered.</td><td>Same size, tracking and two-tone rule on every opening.</td></tr>
   <tr><td>A grounded graphic with every opening</td><td>A diagram, product view or photograph beside the headline (home, services, case studies).</td><td>None; listings were text directories.</td><td>The opening visual is real content: the featured article image, the release graphic, the 120-square research chart.</td></tr>
   <tr><td>Proof is precise, attributed, caveated</td><td>A dark "reported figure" panel with an orange top rule; sample and source beside every figure.</td><td>Thin tables and light figure rows.</td><td>The same dark panels and evidence bands, each figure with its sample and source.</td></tr>
   <tr><td>Numbered chapters and a clear kicker</td><td>"01 —" labels, an 11.5 px uppercase tangerine kicker, outlined pill chips for classification.</td><td>Generic hairline headings.</td><td>Chapter labels, kickers and chips reused as built.</td></tr>
   <tr><td>One call-to-action language</td><td>Burnt pill button (#A83400), underlined text link with an arrow, one burnt closing band.</td><td>Bright tangerine band and square ink buttons.</td><td>The approved pill, link and burnt band.</td></tr>
   <tr><td>Restraint and honest imagery</td><td>Orange only for emphasis; illustrations say "Conceptual illustration. It shows no results."; no stock events or endorsements.</td><td>Restrained, but empty.</td><td>Existing assets only; no invented photography; typographic cover tiles where an image is missing.</td></tr></table></div>`);
  // 2. visual comparison
  const ref = async (f, h = 900) => crop(path.join(REF, f), 1440, h);
  add(1440, 1330, `<div class="cmp"><h1 style="font-size:32px">Side by side: approved pages, the rejected R2 proposal, and R3</h1>
    <div class="row" style="grid-template-columns:repeat(3,1fr)"><figure><figcaption>APPROVED · /faq opening</figcaption><img src="${await ref('faq.png', 760)}"></figure><figure><figcaption>APPROVED · home opening</figcaption><img src="${await ref('home.png', 760)}"></figure><figure><figcaption>APPROVED · case-study opening</figcaption><img src="${await ref('case-study.png', 760)}"></figure></div>
    <div class="row" style="grid-template-columns:repeat(2,1fr)"><figure><figcaption>REJECTED · R2 press listing</figcaption><img src="${await crop(path.join(PREV, 'press-listing-desktop.png'), 1440, 760)}"></figure><figure><figcaption>REJECTED · R2 blog listing</figcaption><img src="${await crop(path.join(PREV, 'blog-listing-desktop.png'), 1440, 760)}"></figure></div>
    <div class="row" style="grid-template-columns:repeat(2,1fr)"><figure><figcaption>R3 · press newsroom</figcaption><img src="${await crop(path.join(SH, 'press-listing-desktop.png'), 1440, 760)}"></figure><figure><figcaption>R3 · blog</figcaption><img src="${await crop(path.join(SH, 'blog-listing-desktop.png'), 1440, 760)}"></figure></div></div>`);
  // 3. reuse and feel
  add(1440, 1230, `<div style="padding:44px 60px"><p class="lbl">Reuse and difference</p><h1 style="font-size:38px;margin-top:8px">Approved components reused, and how each collection stays distinct</h1>
   <table style="margin-top:20px"><tr><th>Approved component or treatment</th><th>Where it comes from</th><th>Used for</th></tr>
   <tr><td>Deep-ink hero, two-tone headline, kicker, lede</td><td>/faq, /how-it-works, home</td><td>Every opening</td></tr>
   <tr><td>Dark "reported figure" panel with orange top rule</td><td>Case-study hero and outcomes board</td><td>Featured read, latest announcement, research headline finding, evidence bands</td></tr>
   <tr><td>Outlined pill chips; metadata table</td><td>Case-study hero</td><td>Article and release type, date, reading time</td></tr>
   <tr><td>"01 —" chapter label and two-tone section heading</td><td>Case-study sections, home</td><td>Every band</td></tr>
   <tr><td>Paper card with hairline, image first, one stretched link, tangerine underline on hover, 3 px focus outline</td><td>Home work cards, /work R2</td><td>Article cards</td></tr>
   <tr><td>Burnt pill button, underlined text link, burnt closing band</td><td>All approved pages</td><td>Actions and the close</td></tr>
   <tr><td>Numbered three-up ("01, 02, 03")</td><td>How it works</td><td>Research "what we checked"</td></tr></table>
   <table style="margin-top:26px"><tr><th>Collection</th><th>Feel</th><th>Signature (what makes it distinct)</th><th>Visual</th></tr>
   <tr><td>Blog</td><td>A reader's library: warm, practical, image-led</td><td>One featured read, then an even three-column collection with topic and reading time</td><td>Existing article images, whole, 2:1; typographic cover where none</td></tr>
   <tr><td>Press</td><td>A newsroom: credible, dated, quotable</td><td>Latest announcement first, dateline, facts and contacts in separate material</td><td>The release graphic; no photography</td></tr>
   <tr><td>Research</td><td>A lab notebook: evidence-led</td><td>Dark evidence bands, sample and source on every figure, charts retained</td><td>The 120-square chart and published bar charts</td></tr></table></div>`);
  // 4. mockups
  for (const [title, name] of PAGES) {
    const dk = await sharp(path.join(SH, `${name}-desktop.png`)).metadata(); const dn = Math.ceil(dk.height / 1750); const SLICE = Math.ceil(dk.height / dn);
    for (let i = 0; i < dn; i++) {
      const top = i * SLICE, hh = Math.min(SLICE, dk.height - top);
      const img = await jpg(await sharp(path.join(SH, `${name}-desktop.png`)).extract({ left: 0, top, width: 1440, height: hh }).toBuffer());
      add(1440, hh + 44, `<div class="band"><span>${title} · desktop 1440 px</span><span>part ${i + 1} of ${dn}</span></div><img style="display:block;width:1440px;height:${hh}px" src="${img}">${i < dn - 1 ? '<div class="cont">continues on the next sheet →</div>' : ''}`);
    }
    const mk = await sharp(path.join(SH, `${name}-mobile.png`)).metadata(); const PH = 960; const total = Math.ceil(mk.height / 2 / PH); const sn = Math.ceil(total / 3);
    for (let s = 0; s < sn; s++) {
      let panels = '';
      for (let k = 0; k < 3; k++) {
        const idx = s * 3 + k; if (idx >= total) break; const topCss = idx * PH, hCss = Math.min(PH, mk.height / 2 - topCss);
        const img = await jpg(await sharp(path.join(SH, `${name}-mobile.png`)).extract({ left: 0, top: Math.round(topCss * 2), width: mk.width, height: Math.round(hCss * 2) }).toBuffer());
        panels += `<div class="pn"><img src="${img}" style="height:${hCss}px"><p>Screen ${idx + 1} of ${total}${idx < total - 1 ? ' · continues →' : ' · end'}</p></div>`;
      }
      add(1440, 44 + 22 + PH + 22 + 30, `<div class="band"><span>${title} · mobile 390 px</span><span>sheet ${s + 1} of ${sn}</span></div><div class="panels">${panels}</div>`);
    }
  }
  const nav = async (file, top) => jpg(await sharp(path.join(SH, file)).extract({ left: 0, top: Math.max(0, Math.round((top - 120) * 2)), width: 780, height: 1900 }).toBuffer());
  const cl = await nav('research-detail-mobile.png', META['research-detail-mobile'].rail), op = await nav('research-detail-nav-open-mobile.png', META['research-detail-nav-open-mobile'].rail);
  add(1440, 44 + 22 + 950 + 22 + 90, `<div class="band"><span>Mobile contents control · "On this page" (same on article, release and report)</span><span>closed and open</span></div><div class="panels" style="grid-template-columns:repeat(2,390px)"><div class="pn"><img src="${cl}" style="height:950px"><p>Closed (default): one 52 px control, "On this page · 15 sections".</p></div><div class="pn"><img src="${op}" style="height:950px"><p>Open: the section links, 44 px targets, jumping to the existing anchors.</p></div></div>`);
  const tag = (s) => `<span class="tag ${s === 'RESOLVED' ? 'r' : s === 'GENUINE BLOCKER' ? 'b' : s === 'SUPERSEDED' ? 's' : 'a'}">${s === 'RECOMMENDATION' ? 'Recommendation, needs approval' : s === 'GENUINE BLOCKER' ? 'Genuine blocker' : s === 'SUPERSEDED' ? 'Superseded' : 'Resolved'}</span>`;
  const rows = (l) => l.map(([id, t, s, nn]) => `<tr><td>${id}</td><td>${esc(t)}</td><td>${tag(s)}</td><td>${esc(nn)}</td></tr>`).join('');
  const head = '<tr><th>ID</th><th>Decision</th><th>Status</th><th>Note</th></tr>';
  add(1440, 1500, `<div class="band"><span>Remaining decisions, with recommendations · R3</span><span>sheet 1 of 2</span></div><div style="padding:22px 40px"><table>${head}${rows(DECISIONS.slice(0, 10))}</table></div>`);
  add(1440, 1250, `<div class="band"><span>Remaining decisions, with recommendations · carried over</span><span>sheet 2 of 2</span></div><div style="padding:22px 40px"><table>${head}${rows(DECISIONS.slice(10))}</table><p style="margin-top:20px;font-size:15px;max-width:110ch">No recommendation is treated as approved. /work R2 and the case-study implementation are unchanged; the case-showcase component remains a separate pending task.</p></div>`);
  fs.writeFileSync(path.join(ROOT, 'DECISIONS_REGISTER_R3.md'), `# Open decisions: editorial direction R3 (31 October 2026)\n\n| ID | Decision | Status | Note |\n|---|---|---|---|\n${DECISIONS.map(([id, t, s, nn]) => `| ${id} | ${t} | **${s === 'RECOMMENDATION' ? 'Recommendation requiring approval' : s === 'GENUINE BLOCKER' ? 'Genuine blocker' : s === 'SUPERSEDED' ? 'Superseded' : 'Resolved'}** | ${nn} |`).join('\n')}\n`);
  fs.writeFileSync(path.join(__dirname, 'pdf-src.html'), `<!doctype html><meta charset="utf-8"><style>${css}${pageCss}</style>${sheets.join('')}`);
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'pdf-src.html'), { waitUntil: 'load' }); await p.waitForTimeout(1500); await p.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true }); await b.close(); fs.unlinkSync(path.join(__dirname, 'pdf-src.html'));
  console.log(sheets.length, 'sheets', Math.round((fs.statSync(OUT).size / 1048576) * 10) / 10, 'MB');
})();
