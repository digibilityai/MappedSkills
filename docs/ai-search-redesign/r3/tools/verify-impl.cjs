// Verification of the implemented /ai-seo page in one engine. node verify-impl.cjs <engine> <url> <outJson>
const pw = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const axeSrc = require('fs').readFileSync('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/axe-core/axe.min.js', 'utf8');
const [engine, url, outFile] = process.argv.slice(2); const out = { engine };
const SEQ = { journey: '.ax-jr', reporting: '.ax-rp', scenario: '.ax-sc', industry: '.ax-ind-seq' };
(async () => {
  const b = await pw[engine].launch();
  const ctx = async (o = {}, js = true) => { const c = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: js, ...o }); const p = await c.newPage(); p._errs = []; p.on('console', (m) => { if (m.type() === 'error') p._errs.push(m.text()); }); p.on('pageerror', (e) => p._errs.push(String(e))); return [c, p]; };
  const active = (p, s) => p.evaluate((sel) => { const r = document.querySelector(sel); const on = r.querySelector('.is-on'); return on ? [...r.querySelectorAll('[data-i]')].filter((x) => x.offsetParent !== null || true).indexOf(on) % (r.querySelectorAll('[data-i]').length) + 1 : 0; }, s);
  const hide = async (p) => p.addStyleTag({ content: '[aria-labelledby="consent-banner-title"]{display:none!important}' });
  // 1. timing
  out.timing = {};
  for (const [name, sel] of Object.entries(SEQ)) {
    const [c, p] = await ctx(); await p.goto(url, { waitUntil: 'networkidle' }); await hide(p); await p.waitForTimeout(300);
    await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel);
    const t0 = Date.now(); const seen = []; let last = 0;
    while (Date.now() - t0 < 11000) { const a = await active(p, sel); if (a !== last) { seen.push([a, Date.now() - t0]); last = a; } await p.waitForTimeout(25); }
    const gaps = seen.slice(1).map((s, i) => s[1] - seen[i][1]);
    out.timing[name] = { steps: seen.map((s) => s[0]), gapsMs: gaps, meanGapMs: gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : null, finalActive: last, buttonsPauseOrReplay: await p.evaluate(() => [...document.querySelectorAll('button')].filter((x) => /^(pause|play|replay)$/i.test(x.textContent.trim())).length), errs: p._errs.length };
    await c.close();
  }
  // 2. manual selection, keyboard, focus, interruption
  { const [c, p] = await ctx(); await p.goto(url, { waitUntil: 'networkidle' }); await hide(p); await p.evaluate(() => document.querySelector('.ax-jr').scrollIntoView({ block: 'center' })); await p.waitForTimeout(2400);
    const mid = await active(p, '.ax-jr'); await p.locator('.ax-jr button.ax-st-n').nth(3).click(); const a1 = await active(p, '.ax-jr'); await p.waitForTimeout(4000); const a2 = await active(p, '.ax-jr');
    // keyboard: focus step 1 button, Tab twice, Enter
    await p.locator('.ax-jr button.ax-st-n').first().focus(); await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.keyboard.press('Enter');
    const a3 = await active(p, '.ax-jr'); const fo = await p.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return { name: e.getAttribute('aria-label'), outline: s.outlineStyle + ' ' + s.outlineWidth }; });
    await p.locator('.ax-jr button.ax-st-n').nth(1).focus(); await p.keyboard.press('Space'); const aSpace = await active(p, '.ax-jr'); await p.locator('.ax-jr button.ax-st-n').nth(4).focus(); await p.keyboard.press('Enter'); const aEnter = await active(p, '.ax-jr');
    const live = await p.evaluate(() => document.querySelectorAll('main [aria-live], main [role=status], main [role=alert]').length);
    // focus must not be moved by autoplay: focus another element, scroll to reporting, wait, check focus unchanged
    await p.locator('.ax-crawl summary').focus(); await p.evaluate(() => document.querySelector('.ax-rp').scrollIntoView({ block: 'center' })); await p.waitForTimeout(5000); const stillFocused = await p.evaluate(() => document.activeElement && document.activeElement.tagName + '.' + document.activeElement.className.slice(0, 20));
    out.manual = { activeDuringRun: mid, clickedStep4: a1, after4s: a2, keyboardTabTabEnter: a3, focusThenSpaceStep2: aSpace, focusThenEnterStep5: aEnter, focus: fo, liveRegions: live, focusAfterAutoplay: stillFocused }; await c.close(); }
  { const [c, p] = await ctx(); await p.goto(url, { waitUntil: 'networkidle' }); await p.addStyleTag({ content: '[aria-labelledby="consent-banner-title"]{display:none!important}' }); await p.evaluate(() => document.querySelector('.ax-ind-seq').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1200);
    await p.locator('.ax-chip', { hasText: 'Real estate' }).click(); await p.waitForTimeout(2200);
    out.chips = await p.evaluate(() => ({ pressed: [...document.querySelectorAll('.ax-chip[aria-pressed=true]')].map((x) => x.textContent), visiblePanels: [...document.querySelectorAll('.ax-ind-p')].filter((x) => !x.hidden).length, q: document.querySelector('.ax-ind-p:not([hidden]) .ax-bt-q').textContent, hiddenBeats: [...document.querySelectorAll('.ax-ind-p:not([hidden]) .ax-bt')].filter((x) => getComputedStyle(x).visibility === 'hidden').length })); await c.close(); }
  // 3. reduced motion; 4. no JavaScript
  { const [c, p] = await ctx({ reducedMotion: 'reduce' }); await p.goto(url, { waitUntil: 'networkidle' }); await hide(p); await p.evaluate(() => document.querySelector('.ax-jr').scrollIntoView({ block: 'center' })); await p.waitForTimeout(3500);
    out.reduced = { journeyActive: await active(p, '.ax-jr'), hiddenItems: await p.evaluate(() => [...document.querySelectorAll('[data-i]')].filter((x) => getComputedStyle(x).visibility === 'hidden' || getComputedStyle(x).opacity === '0').length) };
    await p.locator('.ax-jr button.ax-st-n').nth(2).click(); out.reduced.afterSelectStep3 = await active(p, '.ax-jr'); await c.close(); }
  { const [c, p] = await ctx({}, false); await p.goto(url); out.noJs = await p.evaluate(() => { const vis = (e) => { const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.opacity !== '0' && s.display !== 'none'; }; const all = [...document.querySelectorAll('[data-i]')]; return { items: all.length, visible: all.filter(vis).length, panels: [...document.querySelectorAll('.ax-ind-p')].filter((x) => !x.hidden).length, chips: document.querySelectorAll('.ax-chip').length, stepButtons: document.querySelectorAll('button.ax-st-n').length, h1: document.querySelectorAll('h1').length, recordRows: document.querySelectorAll('.ax-rec-tb tbody tr').length }; }); await c.close(); }
  // 5. layouts: overflow, clipping, console
  out.layouts = {};
  for (const [w, h] of [[1440, 780], [1280, 720], [900, 800], [375, 812], [320, 640]]) { const [c, p] = await ctx({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
    out.layouts[`${w}x${h}`] = await p.evaluate(() => { const vw = innerWidth; const bad = [...document.querySelectorAll('main *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > vw + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !e.closest('.sr-only,.px-sr'); }).slice(0, 5).map((e) => e.className.toString().slice(0, 40)); const hero = document.querySelector('.b-hero'); const cta = hero.querySelector('.dc-btn-primary'); const cb = document.querySelector('[aria-labelledby="consent-banner-title"]'); return { overflowX: document.documentElement.scrollWidth > vw, offenders: bad, height: document.documentElement.scrollHeight, heroCtaBottom: Math.round(cta.getBoundingClientRect().bottom), consentTop: cb ? Math.round(cb.getBoundingClientRect().top) : null }; });
    out.layouts[`${w}x${h}`].consoleErrors = p._errs.length; await c.close(); }
  // 6. consent banner and CTA interaction
  { const [c, p] = await ctx({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' }); await p.goto(url, { waitUntil: 'networkidle' });
    const r = []; for (const sel of ['.ax-hero .dc-btn-primary', '.ax-sc-act .dc-btn-primary', '.b-close .dc-btn-primary']) { await p.locator(sel).first().scrollIntoViewIfNeeded(); await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(200); r.push(await p.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); const top = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return { sel: s, href: e.getAttribute('href'), reachable: e === top || e.contains(top) }; }, sel)); }
    out.cta = r; await c.close(); }
  // 7. axe (a11y), default state, with and without closed disclosures
  { const [c, p] = await ctx({ reducedMotion: 'reduce' }); await p.goto(url, { waitUntil: 'networkidle' }); await p.addScriptTag({ content: axeSrc }); await p.locator('.ax-ind-seq').scrollIntoViewIfNeeded();
    out.axe = await p.evaluate(async () => { const r = await axe.run(document.querySelector('main'), { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }); return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, first: v.nodes[0].target.join(' ').slice(0, 80) })); });
    out.links = await p.evaluate(() => [...document.querySelectorAll('main a[href]')].map((a) => a.getAttribute('href')).filter((h, i, a) => a.indexOf(h) === i)); await c.close(); }
  require('fs').writeFileSync(outFile, JSON.stringify(out, null, 1)); console.log(engine, 'done'); await b.close();
})().catch((e) => { console.error(engine, 'FAILED', e); process.exit(1); });
