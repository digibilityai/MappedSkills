// Shared focus handler regression (DEC-113): /contact, /work, /social-media-ads (and /blog, /press for contrast) with the first-visit cookie banner visible.
// Keyboard walk, open menu, form controls, Reject and persistence after reload, and client-side navigation from an editorial page.
const { chromium } = require('../../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500';
const routes = ['/contact', '/work', '/social-media-ads', '/blog', '/press'];
const editorial = new Set(['/blog', '/press']);
const sizes = [[1440, 900], [390, 844], [360, 800]];
const spy = () => { window.__sb = []; const o = window.scrollBy.bind(window); window.scrollBy = (...a) => { window.__sb.push({ a: JSON.stringify(a[0]), y: window.scrollY }); return o(...a); }; };
const desc = () => { const e = document.activeElement; if (!e || e === document.body) return null; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { t: ((e.getAttribute('aria-label') || e.textContent || e.name || e.tagName) + '').trim().slice(0, 26), ring: (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2) || (cs.boxShadow !== 'none' && /rgb/.test(cs.boxShadow)) || (() => { const a = getComputedStyle(e, '::after'); return a.outlineStyle !== 'none' && parseFloat(a.outlineWidth) >= 2; })() || (() => { const c = e.closest('a,button,[class*=card],li'); if (!c) return false; const x = getComputedStyle(c); return x.outlineStyle !== 'none' && parseFloat(x.outlineWidth) >= 2; })(), inBanner: !!e.closest('.consent-banner'), inHeader: !!e.closest('header'), inMain: !!e.closest('main'), top: Math.round(r.top), bottom: Math.round(r.bottom), y: Math.round(scrollY) }; };
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const out = {}; const defects = [];
  for (const [w, h] of sizes) for (const r of routes) {
    const key = `${w}${r}`; const res = {};
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); await ctx.addInitScript(spy); const p = await ctx.newPage();
    await p.goto(BASE + r, { waitUntil: 'load' }); await p.waitForTimeout(2500);
    res.banner = await p.evaluate(() => !!document.querySelector('.consent-banner'));
    // A. keyboard walk with the banner up
    const walk = []; for (let i = 0; i < 40; i++) { await p.keyboard.press('Tab'); await p.waitForTimeout(220); const d = await p.evaluate(desc); if (d) walk.push(d); }
    res.walk = { stops: walk.length, noRing: walk.filter((d) => !d.ring).map((d) => d.t).slice(0, 5), behindBanner: walk.filter((d) => d.inMain && d.bottom > (h - (w < 500 ? 169 : 127))).map((d) => d.t).slice(0, 4) };
    res.scrollBy = await p.evaluate(() => window.__sb.length);
    // B. menu: phones use the menu button, desktop the Services dropdown
    await p.evaluate(() => { window.scrollTo(0, 0); window.__sb = []; }); await p.waitForTimeout(300);
    const menuBtn = w < 900 ? p.locator('.dc-menu-btn') : p.locator('.dc-svc-btn').first();
    await menuBtn.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
    const expanded = await menuBtn.getAttribute('aria-expanded'); const m = []; for (let i = 0; i < 8; i++) { await p.keyboard.press('Tab'); await p.waitForTimeout(200); const d = await p.evaluate(desc); if (d) m.push(d); }
    res.menu = { opens: expanded === 'true', stops: m.length, noRing: m.filter((d) => !d.ring).map((d) => d.t), nativeScrollInMenu: m.some((d) => d.inHeader && d.y !== 0), scrollBy: await p.evaluate(() => window.__sb.length) };
    await p.keyboard.press('Escape'); await p.waitForTimeout(300); res.menu.closesOnEscape = (await menuBtn.getAttribute('aria-expanded')) !== 'true' || (await p.evaluate(() => !document.querySelector('#dc-mnav:not([hidden])')));
    // C. form (contact)
    if (r === '/contact') {
      await p.evaluate(() => { window.scrollTo(0, 0); window.__sb = []; });
      const f = {}; await p.fill('input[name=name]', 'Test Name'); await p.focus('input[name=email]'); await p.keyboard.type('test@example.com'); await p.keyboard.press('Tab'); await p.keyboard.type('9999999999'); await p.keyboard.press('Tab'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Tab'); await p.keyboard.type('Hello'); await p.waitForTimeout(300);
      f.values = await p.evaluate(() => ({ name: document.querySelector('input[name=name]').value, email: document.querySelector('input[name=email]').value, phone: document.querySelector('input[name=phone]').value, message: document.querySelector('textarea[name=message]').value, service: document.querySelector('select[name=service]').value }));
      f.scrollBy = await p.evaluate(() => window.__sb.length); f.ring = (await p.evaluate(desc)).ring; res.form = f;
    }
    // D. Reject and persistence
    await p.evaluate(() => { window.scrollTo(0, 0); }); await p.getByRole('button', { name: /reject analytics/i }).click(); await p.waitForTimeout(500);
    res.rejectHides = await p.evaluate(() => !document.querySelector('.consent-banner')); await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(2000);
    res.persists = await p.evaluate(() => !document.querySelector('.consent-banner'));
    await ctx.close();
    // E. client-side navigation from an editorial page, banner still up: the handler must be gone on the destination
    if (!editorial.has(r)) {
      const c2 = await b.newContext({ viewport: { width: w, height: h } }); await c2.addInitScript(spy); const q = await c2.newPage();
      await q.goto(BASE + '/blog', { waitUntil: 'load' }); await q.waitForTimeout(2500);
      await q.locator(`footer a[href="${r}"]`).first().click(); await q.waitForURL('**' + r, { timeout: 20000 }); await q.waitForTimeout(1500);
      await q.evaluate(() => { window.__sb = []; window.scrollTo(0, 0); });
      for (let i = 0; i < 25; i++) { await q.keyboard.press('Tab'); await q.waitForTimeout(150); }
      res.afterClientNav = { scrollBy: await q.evaluate(() => window.__sb.length), banner: await q.evaluate(() => !!document.querySelector('.consent-banner')) };
      await c2.close();
    }
    out[key] = res;
    const bad = [];
    if (!res.banner) bad.push('banner missing');
    if (!editorial.has(r) && res.scrollBy > 0) bad.push(`scrollBy ${res.scrollBy} on a non-editorial page`);
    if (res.menu.scrollBy > 0 && !editorial.has(r)) bad.push('menu scrollBy');
    if (!res.menu.opens) bad.push('menu did not open'); if (res.menu.scrollBy > 0) bad.push('handler scrolled while in the menu');
    if (res.menu.noRing.length) bad.push('menu focus ring missing: ' + res.menu.noRing.join('|'));
    if (res.walk.noRing.length) bad.push('focus ring missing: ' + res.walk.noRing.join('|'));
    if (res.form && (res.form.values.name !== 'Test Name' || res.form.values.email !== 'test@example.com' || res.form.values.message !== 'Hello' || res.form.scrollBy > 0)) bad.push('form: ' + JSON.stringify(res.form));
    if (!res.rejectHides || !res.persists) bad.push('consent');
    if (res.afterClientNav && res.afterClientNav.scrollBy > 0) bad.push('handler still active after client navigation');
    console.log(bad.length ? 'DEFECT' : 'ok    ', w, r.padEnd(20), 'tab stops', res.walk.stops, 'scrollBy', res.scrollBy, 'menu', JSON.stringify({ o: res.menu.opens, n: res.menu.stops, sb: res.menu.scrollBy, esc: res.menu.closesOnEscape }), res.form ? 'form ok' : '', 'reject', res.rejectHides, 'persist', res.persists, res.afterClientNav ? 'afterNav sb ' + res.afterClientNav.scrollBy : '', bad.length ? JSON.stringify(bad) : '', res.walk.behindBanner.length ? 'behind-banner(existing) ' + JSON.stringify(res.walk.behindBanner) : '');
    if (bad.length) defects.push([key, bad]);
  }
  fs.writeFileSync(path.join(__dirname, '../data/focus-regression.json'), JSON.stringify({ out, defects }, null, 1));
  console.log('defects', defects.length);
  await b.close();
})();
