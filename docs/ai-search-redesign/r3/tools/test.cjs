// Behaviour checks for the R3 prototype. node test.cjs <baseUrl>
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const base = process.argv[2]; const out = {};
(async () => {
  const b = await chromium.launch();
  const mk = async (opts = {}, js = true) => { const c = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: js, ...opts }); return [c, await c.newPage()]; };
  const active = (p, sel) => p.evaluate((s) => { const r = document.querySelector(s); const on = r.querySelector('.is-on'); return on ? [...r.querySelectorAll('[data-i]')].indexOf(on) + 1 : 0; }, sel);
  // 1. timing on scroll into view, journey + reporting + scenario + industry
  for (const [name, sel] of [['journey', '.ax-jr'], ['reporting', '.ax-rp'], ['scenario', '.ax-sc'], ['industry', '.ax-ind-seq']]) {
    const [c, p] = await mk(); await p.goto(base + '?banner=0'); await p.waitForTimeout(300);
    await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel);
    const t0 = Date.now(); const seen = []; let last = 0;
    while (Date.now() - t0 < 12000) { const a = await active(p, sel); if (a !== last) { seen.push([a, Date.now() - t0]); last = a; } await p.waitForTimeout(50); }
    const hasCtl = await p.evaluate(() => !!document.querySelector('.ax-jr-ctl') || [...document.querySelectorAll('button')].some((x) => /^(pause|play|replay)$/i.test(x.textContent.trim())));
    out[name] = { steps: seen, finalActive: last, playedOnce: seen.length, noToolbarButtons: !hasCtl };
    await c.close();
  }
  // 2. manual selection stops autoplay; keyboard
  { const [c, p] = await mk(); await p.goto(base + '?banner=0'); await p.evaluate(() => document.querySelector('.ax-jr').scrollIntoView({ block: 'center' })); await p.waitForTimeout(600);
    await p.locator('.ax-jr button.ax-st-n').nth(3).click(); const a1 = await active(p, '.ax-jr'); await p.waitForTimeout(4500); const a2 = await active(p, '.ax-jr');
    const btns = await p.locator('.ax-jr button.ax-st-n').count();
    await p.locator('.ax-jr button.ax-st-n').nth(0).focus(); await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.keyboard.press('Enter');
    const a3 = await active(p, '.ax-jr'); const focusOutline = await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle + ' ' + getComputedStyle(document.activeElement).outlineWidth);
    const label = await p.evaluate(() => document.activeElement.getAttribute('aria-label'));
    out.manual = { buttons: btns, clickedStep4Active: a1, after4_5s: a2, keyboardTabTabEnterActive: a3, focusOutline, label }; await c.close(); }
  // 3. interrupt mid-run
  { const [c, p] = await mk(); await p.goto(base + '?banner=0'); await p.evaluate(() => document.querySelector('.ax-jr').scrollIntoView({ block: 'center' })); await p.waitForTimeout(3300);
    const before = await active(p, '.ax-jr'); await p.locator('.ax-jr button.ax-st-n').nth(1).click(); await p.waitForTimeout(3000); out.interrupt = { activeWhenClicked: before, afterClickStep2: await active(p, '.ax-jr') }; await c.close(); }
  // 4. industry chips
  { const [c, p] = await mk(); await p.goto(base + '?banner=0'); await p.evaluate(() => document.querySelector('.ax-ind-seq').scrollIntoView({ block: 'center' })); await p.waitForTimeout(700);
    await p.locator('.ax-chip', { hasText: 'Real estate' }).click(); await p.waitForTimeout(2500);
    out.chips = await p.evaluate(() => ({ pressed: [...document.querySelectorAll('.ax-chip')].filter((x) => x.getAttribute('aria-pressed') === 'true').map((x) => x.textContent), visiblePanels: [...document.querySelectorAll('[data-panel]')].filter((x) => !x.hidden).length, q: document.querySelector('[data-panel]:not([hidden]) .ax-bt-q').textContent, hiddenBeats: document.querySelectorAll('[data-panel]:not([hidden]) .ax-bt:not(.is-seen)').length })); await c.close(); }
  // 5. reduced motion
  { const [c, p] = await mk({ reducedMotion: 'reduce' }); await p.goto(base + '?banner=0'); await p.evaluate(() => document.querySelector('.ax-jr').scrollIntoView({ block: 'center' })); await p.waitForTimeout(3000);
    out.reduced = { journeyActive: await active(p, '.ax-jr'), industryHiddenBeats: await p.evaluate(() => document.querySelectorAll('.ax-bt').length - [...document.querySelectorAll('.ax-bt')].filter((x) => getComputedStyle(x).visibility === 'visible' && getComputedStyle(x).opacity === '1').length) };
    await p.locator('.ax-jr button.ax-st-n').nth(2).click(); out.reduced.afterManualStep3 = await active(p, '.ax-jr'); await c.close(); }
  // 6. no JavaScript
  { const [c, p] = await mk({}, false); await p.goto(base + '?banner=0');
    out.noJs = await p.evaluate(() => { const vis = (e) => { const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.opacity !== '0' && s.display !== 'none'; }; const all = [...document.querySelectorAll('[data-i]')]; return { items: all.length, visible: all.filter(vis).length, panelsVisible: [...document.querySelectorAll('[data-panel]')].filter((x) => !x.hidden).length, chipsHidden: document.querySelector('[data-chips]').hidden }; }); await c.close(); }
  // 7. overflow, long dashes, copy check
  for (const [w, h] of [[1440, 780], [1280, 720], [375, 812]]) { const [c, p] = await mk({ viewport: { width: w, height: h } }); await p.goto(base + '?banner=0&motion=reduce'); await p.waitForTimeout(400);
    out['layout' + w] = await p.evaluate(() => ({ overflowX: document.documentElement.scrollWidth > innerWidth, height: document.documentElement.scrollHeight, longDash: /[–—]|--/.test(document.querySelector('main').innerText) })); await c.close(); }
  console.log(JSON.stringify(out, null, 1)); await b.close();
})();
