// Pointer versus keyboard modality on the guarded routes: a control that straddles the banner edge is focused after a pointer press (the guard must not scroll)
// and after a Tab key (the guard must clear it). Banner visible. Usage: BASE=... node focus-modality.cjs
const { chromium } = require('../../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500';
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const out = {}; let bad = 0;
  for (const [w, h] of [[1440, 900], [390, 844], [360, 800]]) for (const r of ['/contact', '/social-media-ads', '/blog', '/press']) {
    const c = await b.newContext({ viewport: { width: w, height: h } }); await c.addInitScript(() => { window.__sb = 0; const o = window.scrollBy.bind(window); window.scrollBy = (...a) => { window.__sb++; return o(...a); }; });
    const p = await c.newPage(); await p.goto(BASE + r, { waitUntil: 'load' }); await p.waitForTimeout(2800);
    const settle = async () => { let l = -1, s = 0; for (let i = 0; i < 30 && s < 3; i++) { const y = await p.evaluate(() => Math.round(scrollY)); s = y === l ? s + 1 : 0; l = y; await p.waitForTimeout(50); } };
    const res = {};
    for (const mode of ['pointer', 'touch', 'keyboard']) {
      const r0 = await p.evaluate(() => { const q = [...document.querySelectorAll('main a[href], main button, main input:not([type=hidden]):not([type=radio]), main select, main textarea, main summary')].filter((e) => e.offsetParent && !e.closest('header') && e.getBoundingClientRect().height > 20 && e.getBoundingClientRect().height < 200); const e = q[Math.min(q.length - 1, 6)]; const bn = document.querySelector('.consent-banner').getBoundingClientRect().top; const rr = e.getBoundingClientRect(); window.scrollTo({ top: scrollY + rr.top - (bn - rr.height / 2), behavior: 'instant' }); document.activeElement && document.activeElement.blur(); window.__t = e; window.__sb = 0; const x = e.getBoundingClientRect(); return { straddles: x.bottom > bn && x.top < bn, top: Math.round(x.top), bottom: Math.round(x.bottom), bn: Math.round(bn) }; });
      await settle(); const y0 = await p.evaluate(() => scrollY);
      await p.evaluate((mode) => { const ev = mode === 'keyboard' ? new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }) : new PointerEvent('pointerdown', { bubbles: true, pointerType: mode === 'touch' ? 'touch' : 'mouse' }); document.dispatchEvent(ev); if (mode === 'touch') document.dispatchEvent(new Event('touchstart', { bubbles: true })); window.__t.focus({ preventScroll: true }); }, mode);
      await settle(); const after = await p.evaluate(() => { const e = window.__t; const bn = document.querySelector('.consent-banner').getBoundingClientRect().top; return { scrollBy: window.__sb, bottom: Math.round(e.getBoundingClientRect().bottom), bn: Math.round(bn), visible: e.matches(':focus-visible') }; });
      res[mode] = { ...r0, ...after, moved: Math.abs((await p.evaluate(() => scrollY)) - y0) > 1 };
    }
    const okPtr = res.pointer.scrollBy === 0 && !res.pointer.moved && res.touch.scrollBy === 0 && !res.touch.moved;
    const okKb = res.keyboard.straddles ? res.keyboard.scrollBy === 1 && res.keyboard.bottom + 6 <= res.keyboard.bn : true;
    out[`${w}${r}`] = { res, okPtr, okKb }; if (!okPtr || !okKb || !res.keyboard.straddles) bad++;
    console.log(okPtr && okKb ? 'ok   ' : 'CHECK', w, r.padEnd(18), 'straddling', res.keyboard.straddles, '| pointer sb', res.pointer.scrollBy, 'moved', res.pointer.moved, '| touch sb', res.touch.scrollBy, 'moved', res.touch.moved, '| keyboard sb', res.keyboard.scrollBy, 'bottom', res.keyboard.bottom, 'banner', res.keyboard.bn);
    await c.close();
  }
  fs.writeFileSync(path.join(__dirname, '../data/focus-modality.json'), JSON.stringify(out, null, 1)); console.log('checks needing attention', bad); await b.close();
})();
