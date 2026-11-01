// Builds docs/editorial-redesign/PROPOSAL_MOCKUPS.pdf: every mockup at full length (long ones continue on further pages), desktop 1440 px and mobile 390 px (2x).
const fs = require('node:fs'); const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../node_modules/sharp'));
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const SH = path.join(__dirname, 'screenshots'); const OUT = path.join(__dirname, 'WORK_R2_LOCAL_REVIEW.pdf');
const ORDER = [['/work: page 1 (12 cases)', 'work-1-page1'], ['/work/page/2 (8 cases)', 'work-2-page2'], ['/work?service=seo', 'work-3-service-seo'], ['/work?service=google-ads&industry=education (combined)', 'work-4-combined'], ['/work?q=zzzzqq (empty search)', 'work-5-empty-search']];
const CHUNK = 9000; // CSS px per PDF page
(async () => {
  const pages = []; let css = '';
  let pid = 0;
  const add = (w, h, inner) => { const id = 'p' + pid++; css += `@page ${id}{size:${w}px ${h}px;margin:0}`; pages.push(`<section style="page:${id};width:${w}px;height:${h}px;overflow:hidden;break-after:page;position:relative;background:#F7F3EC">${inner}</section>`); };
  // cover
  const cover = `<div style="padding:56px 72px;font-family:Manrope,system-ui,sans-serif;color:#141219"><p style="font:800 12px Manrope;letter-spacing:.12em;text-transform:uppercase;color:#A83400">Local implementation for visual review · 31 October 2026</p><h1 style="font:800 48px/1.05 'Bricolage Grotesque',system-ui;margin:14px 0 0">/work R2: the built page on port 3500</h1><p style="font-size:19px;line-height:1.5;max-width:62ch;margin-top:18px">Screenshots of the implemented /work (not mockups) at 1440 px, 820 px (tablet) and 390 px (mobile, 2x); 360 px captures are in docs/work-redesign/work-r2/screenshots. Local preview switches are on, so the final-four case copy and artwork are shown. Nothing is committed or deployed.</p></div>`;
  add(1440, 560, cover);
  for (const [title, name] of ORDER) for (const [tag, w, k] of [['desktop', 1440, 1], ['tablet', 820, 1], ['mobile', 390, 2]]) {
    const f = path.join(SH, `${name}-${w}.png`); const m = await sharp(f).metadata();
    const cssH = Math.round(m.height / k); const parts = Math.ceil(cssH / CHUNK);
    for (let i = 0; i < parts; i++) {
      const top = i * CHUNK, hh = Math.min(CHUNK, cssH - top);
      const buf = await sharp(f).extract({ left: 0, top: top * k, width: m.width, height: hh * k }).jpeg({ quality: 82 }).toBuffer();
      const label = `${title} · ${w} px${parts > 1 ? ` · sheet ${i + 1} of ${parts}` : ''}`;
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
