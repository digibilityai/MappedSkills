// G2 interaction, accessibility-structure, SEO and copy checks. node tools/checks.cjs <baseUrl> <outDir>
// baseUrl is a running site, e.g. http://127.0.0.1:3000 (`next start` after `npm run build`, or `next dev`). Chromium via Playwright only.
const { chromium } = require('playwright-core');
const fs = require('fs');
const [base, out] = process.argv.slice(2); const U = base + '/lead-generation';
fs.mkdirSync(out + '/storyboard', { recursive: true });
const FORBIDDEN = ['We review it', 'Someone on our team', 'Passed on', 'Kept aside', 'Confirmed and checked', 'Check each enquiry', 'operator', 'Reviewed by us', 'checked against', 'matched to', 'approve the lead', 'reject', 'No confirmation', 'no handover', 'confirm', 'verif', 'screen', 'spam', 'repeat', 'criteria', 'filter', 'we hold', 'release', 'introducing', 'standard', 'pass', 'qualified', 'Yes, that', 'we receive', 'handed to us', 'we forward', 'genuine', 'guarantee', 'review call', 'right buyers', 'right people', 'real enquiries', 'confirmed buyer', 'calling back', 'every enquiry', 'all enquiries', 'we test that enquiries reach you', 'in your own words'];
(async () => {
  const b = await chromium.launch(); const R = {};
  let ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); let p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && !/favicon/.test(m.text()) && errs.push(m.text().slice(0, 140)));
  await p.goto(U, { waitUntil: 'networkidle' });
  const killBar = () => p.evaluate(() => { document.querySelectorAll('nextjs-portal').forEach((e) => e.remove()); });
  R.journeys = [];
  for (const sel of ['.lx-hero-fig', '.lx-path', '.lx-sort', '.lx-next']) {
    await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel);
    const t = await p.evaluate((s) => new Promise((res) => { const el = document.querySelector(s); const marks = [[el.getAttribute('data-at'), 0]]; const t0 = performance.now();
      new MutationObserver(() => marks.push([el.getAttribute('data-at'), Math.round(performance.now() - t0)])).observe(el, { attributes: true, attributeFilter: ['data-at'] });
      setTimeout(() => res({ marks, cls: el.className }), 12500); }), sel);
    const steps = t.marks.filter((m, i, a) => i === 0 || m[0] !== a[i - 1][0]);
    R.journeys.push({ sel, firstStateOnLoad: t.marks[0][0], steps, gapsMs: steps.slice(1).map((m, i) => (i === 0 ? null : m[1] - steps[i][1])).slice(1), finalStep: steps[steps.length - 1][0], noLoop: steps.length === new Set(steps.map((s) => s[0])).size });
  }
  // keyboard: Tab to the first step button of the "reach" journey, Enter, then confirm it stops and stays
  await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.evaluate(() => document.querySelector('.lx-sort').scrollIntoView({ block: 'center' }));
  await p.focus('.lx-sort .lx-gate:nth-child(2) button.lx-n'); await p.keyboard.press('Enter');
  R.keyboard = await p.evaluate(() => { const s = document.querySelector('.lx-sort'); const f = document.activeElement; return { at: s.getAttribute('data-at'), all: s.classList.contains('is-all'), current: document.querySelector('.lx-sort [aria-current=step] .lx-gate-t')?.textContent, buttons: document.querySelectorAll('button.lx-n').length, labels: [...document.querySelectorAll('button.lx-n')].slice(0, 3).map((x) => x.getAttribute('aria-label')), focusStillOnButton: f.tagName === 'BUTTON', focusOutlineWidth: getComputedStyle(f).outlineWidth, liveRegions: document.querySelectorAll('main [aria-live]').length } });
  await p.waitForTimeout(2600); R.keyboard.stillAtAfter2600ms = await p.evaluate(() => document.querySelector('.lx-sort').getAttribute('data-at'));
  // Tab order: every button.lx-n reachable by Tab
  await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(1500);
  R.tabStops = await p.evaluate(async () => { const want = document.querySelectorAll('main button.lx-n').length; return want; });
  let reached = new Set(); await p.evaluate(() => window.scrollTo(0, 0)); for (let i = 0; i < 140; i++) { await p.keyboard.press('Tab'); const lab = await p.evaluate(() => document.activeElement && document.activeElement.matches('button.lx-n') ? document.activeElement.getAttribute('aria-label') + '|' + [...document.querySelectorAll('button.lx-n')].indexOf(document.activeElement) : ''); if (lab) reached.add(lab); }
  R.tabReached = reached.size;
  // hero storyboard by selection (G2 has no ?step flag)
  await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(1500); await p.evaluate(() => document.fonts.ready); await killBar();
  for (const s of [1, 2, 3]) { await p.click(`.lx-hero-fig .lx-hj-s:nth-child(${s}) button.lx-n`); await p.waitForTimeout(700); await p.locator('.lx-hero-fig').screenshot({ path: `${out}/storyboard/hero-step${s}-1440.png` }); }
  for (const s of [1, 2, 3]) { await p.click(`.lx-sort .lx-gate:nth-child(${s}) button.lx-n`); await p.waitForTimeout(700); await p.locator('.lx-sort').screenshot({ path: `${out}/storyboard/reach-step${s}-1440.png` }); }
  for (const s of [1, 4]) { await p.click(`.lx-path .lx-stop:nth-child(${s}) button.lx-n`); await p.waitForTimeout(700); await p.locator('.lx-path').screenshot({ path: `${out}/storyboard/path-step${s}-1440.png` }); }
  R.consoleErrors = errs; await ctx.close();
  // reduced motion
  ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); p = await ctx.newPage(); await p.goto(U, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  R.reducedMotion = await p.evaluate(() => [...document.querySelectorAll('[class*="lx-seq"]')].map((s) => ({ sel: s.className.split(' ').find((c) => /^lx-(hero-fig|path|sort|next)$/.test(c)), allShown: s.classList.contains('is-all'), still: s.classList.contains('is-static'), highlighted: s.querySelectorAll('.is-on').length, dim: [...s.querySelectorAll('[data-i]')].filter((e) => getComputedStyle(e).opacity < 0.9).length, buttons: s.querySelectorAll('button.lx-n').length })));
  await p.evaluate(() => document.querySelector('.lx-sort').scrollIntoView()); await p.waitForTimeout(2600);
  R.reducedMotion.push({ afterWaiting2600ms_reach_data_at: await p.evaluate(() => document.querySelector('.lx-sort').getAttribute('data-at')) });
  await ctx.close();
  // no JavaScript
  ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }); p = await ctx.newPage(); await p.goto(U, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
  R.noJs = await p.evaluate(() => ({ hiddenSteps: [...document.querySelectorAll('[data-i]')].filter((e) => getComputedStyle(e).opacity < 0.9).length, steps: document.querySelectorAll('[data-i]').length, chipVisible: getComputedStyle(document.querySelector('.lx-chip-3')).display, adVisible: getComputedStyle(document.querySelector('.lx-ad')).opacity, detailsClosed: [...document.querySelectorAll('details')].every((d) => !d.open), stepButtons: document.querySelectorAll('button.lx-n').length, numbersHiddenFromAT: [...document.querySelectorAll('span.lx-n')].every((e) => e.getAttribute('aria-hidden') === 'true') }));
  await p.screenshot({ path: `${out}/nojs-full-1440.png`, fullPage: true }); await ctx.close();
  // content, links, SEO (JS on, desktop)
  ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); p = await ctx.newPage(); await p.goto(U, { waitUntil: 'networkidle' });
  R.copy = await p.evaluate((FORBIDDEN) => { const main = document.querySelector('main'); const t = main.innerText; const lc = main.textContent.replace(/\s+/g, ' ').toLowerCase(); const hs = [...main.querySelectorAll('h1,h2,h3')];
    let skip = 0, prev = 0; hs.forEach((h) => { const l = +h.tagName[1]; if (prev && l > prev + 1) skip++; prev = l; });
    return { longOrDoubleDash: (t.match(/[—–]|--/g) || []).length, forbiddenFound: FORBIDDEN.filter((w) => lc.includes(w.toLowerCase())), h1Count: main.querySelectorAll('h1').length, skippedHeadingLevels: skip, headings: hs.map((h) => h.tagName + ' ' + h.innerText.replace(/\s+/g, ' ')), links: [...main.querySelectorAll('a')].map((a) => a.innerText.replace(/\s+/g, ' ') + ' -> ' + a.getAttribute('href')),
      sectionsWithLabel: [...main.querySelectorAll('section')].map((s) => s.getAttribute('aria-labelledby')), labelsResolve: [...main.querySelectorAll('[aria-labelledby]')].every((e) => document.getElementById(e.getAttribute('aria-labelledby'))), imgsWithoutAlt: [...main.querySelectorAll('img:not([alt])')].length, svgDecorative: [...main.querySelectorAll('svg')].every((s) => s.getAttribute('aria-hidden') === 'true' || s.getAttribute('role') === 'img') }; }, FORBIDDEN);
  R.seo = await p.evaluate(() => { const m = (s) => document.querySelector(s)?.getAttribute('content'); return { title: document.title, description: m('meta[name=description]'), canonical: document.querySelector('link[rel=canonical]')?.href, robots: m('meta[name=robots]'), ogTitle: m('meta[property="og:title"]'), ogDescription: m('meta[property="og:description"]'), ogUrl: m('meta[property="og:url"]'), twitterDescription: m('meta[name="twitter:description"]'), jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return { type: j['@type'], names: (j.itemListElement || []).map((i) => i.name + '>' + i.item) }; } catch (e) { return 'INVALID JSON'; } }) }; });
  await ctx.close();
  // link destinations resolve
  R.linkStatus = {}; const ctx2 = await b.newContext(); const hrefs = [...new Set(R.copy.links.map((l) => l.split(' -> ')[1]))];
  for (const h of hrefs) { const r = await ctx2.request.get(base + h, { maxRedirects: 3 }).catch((e) => ({ status: () => 'ERR ' + e.message })); R.linkStatus[h] = r.status(); }
  await ctx2.close(); await b.close();
  fs.writeFileSync(`${out}/checks.json`, JSON.stringify(R, null, 1)); console.log(JSON.stringify(R, null, 1));
})();
