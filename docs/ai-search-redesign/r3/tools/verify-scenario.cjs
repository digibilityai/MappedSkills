// Scenario correction checks. node verify-scenario.cjs <engine> <url>
const pw = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const [engine, url] = process.argv.slice(2); const o = { engine };
const guard = setTimeout(() => { console.log('TIMEOUT', JSON.stringify(o)); process.exit(2); }, 120000);
(async () => { const b = await pw[engine].launch();
  const mk = async (opts = {}, js = true) => { const c = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: js, ...opts }); const p = await c.newPage(); await p.addInitScript(() => {}); await p.goto(url, { waitUntil: 'networkidle' }); if (js) await p.addStyleTag({ content: '[aria-labelledby="consent-banner-title"]{display:none!important}' }); return [c, p]; };
  const state = (p) => p.evaluate(() => { const r = document.querySelector('.ax-sc'); const its = [...r.querySelectorAll('[data-i]')]; const vis = (e) => { const s = getComputedStyle(e); return s.visibility !== 'hidden' && +s.opacity > 0.95; }; return { visible: its.map(vis).filter(Boolean).length, on: its.findIndex((e) => e.classList.contains('is-on')) + 1, h: Math.round(r.getBoundingClientRect().height), secH: Math.round(r.closest('section').getBoundingClientRect().height) }; });
  for (const [tag, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 375, height: 812 }]]) {
    const [c, p] = await mk({ viewport: vp }); await p.waitForTimeout(600);
    const before = await state(p); // armed, not yet scrolled to
    await p.evaluate(() => { const s = document.querySelector('.ax-sc'); window.scrollTo({ top: s.getBoundingClientRect().top + scrollY - 120, behavior: 'instant' }); });
    const t0 = Date.now(); const seen = []; let last = -1; const samples = [];
    while (Date.now() - t0 < 6000) { const s = await state(p); if (s.on !== last) { seen.push([s.on, Date.now() - t0, s.visible]); last = s.on; } samples.push([s.h, s.secH]); await p.waitForTimeout(20); }
    const gaps = seen.slice(1).map((s, i) => s[1] - seen[i][1]);
    o[tag] = { beforeEnteringView: before, firstSeenAtMs: seen[0], steps: seen.map((s) => s[0]), gapsMs: gaps, minVisibleAfterEntry: Math.min(...seen.map((s) => s[2])), heightChanged: new Set(samples.map((s) => s[0])).size > 1 || new Set(samples.map((s) => s[1])).size > 1, finalVisible: (await state(p)).visible, finalOn: last };
    await c.close(); }
  { const [c, p] = await mk({ reducedMotion: 'reduce' }); await p.evaluate(() => document.querySelector('.ax-sc').scrollIntoView()); await p.waitForTimeout(3000); o.reduced = await state(p); await c.close(); }
  { const [c, p] = await mk({}, false); o.noJs = await state(p); await c.close(); }
  { const [c, p] = await mk(); await p.evaluate(() => document.querySelector('.ax-sc').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1300); await p.locator('.ax-sc button.ax-st-n').nth(2).click(); const a = await state(p); await p.waitForTimeout(2500); o.manual = { afterClickStep3: a, after2_5s: await state(p) }; await c.close(); }
  console.log(JSON.stringify(o)); clearTimeout(guard); await b.close(); })();
