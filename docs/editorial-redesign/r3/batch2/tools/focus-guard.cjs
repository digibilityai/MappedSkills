// Banner focus guard on /contact and /social-media-ads (DEC-114), with /blog and /press (existing protection) and /work (control, not mounted).
// Banner visible. Usage: BASE=http://localhost:3500 node focus-guard.cjs
const { chromium } = require('../../../../../node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500';
const routes = process.env.ROUTES ? process.env.ROUTES.split(',') : ['/contact', '/social-media-ads', '/blog', '/press', '/work'];
// Routes that mount the keyboard banner-focus guard (DEC-114). Other routes are checked for the same real outcome (no control left behind the banner) without expecting the listener.
const guarded = new Set(['/contact', '/social-media-ads', '/blog', '/press']);
const sizes = [[1440, 900], [390, 844], [360, 800]];
const spy = () => {
  window.__sb = []; const o = window.scrollBy.bind(window); window.scrollBy = (...a) => { window.__sb.push(1); return o(...a); };
  window.__fi = 0; const add = document.addEventListener.bind(document); const rem = document.removeEventListener.bind(document);
  document.addEventListener = (t, ...r) => { if (t === 'focusin') window.__fi++; return add(t, ...r); }; document.removeEventListener = (t, ...r) => { if (t === 'focusin') window.__fi--; return rem(t, ...r); };
};
const settle = async (p) => { let last = -1, same = 0; for (let i = 0; i < 30 && same < 3; i++) { const y = await p.evaluate(() => Math.round(scrollY)); same = y === last ? same + 1 : 0; last = y; await p.waitForTimeout(50); } };
const state = () => { const e = document.activeElement; if (!e || e === document.body || /^NEXTJS/i.test(e.tagName)) return null; const bn = document.querySelector('.consent-banner'); const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); const a = getComputedStyle(e, '::after'); return { t: ((e.getAttribute('aria-label') || e.textContent || e.name || e.tagName) + '').trim().slice(0, 28), tag: e.tagName.toLowerCase(), name: e.name || '', inBanner: !!e.closest('.consent-banner'), inHeader: !!e.closest('header'), top: Math.round(r.top), bottom: Math.round(r.bottom), bn: bn ? Math.round(bn.getBoundingClientRect().top) : null, y: Math.round(scrollY), ring: (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2) || (a.outlineStyle !== 'none' && parseFloat(a.outlineWidth) >= 2) || (cs.boxShadow !== 'none' && /rgb/.test(cs.boxShadow)) }; };
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const out = {}; const defects = []; const base = {};
  for (const [w, h] of sizes) for (const r of routes) {
    const key = `${w}${r}`; const res = {}; const bad = []; const phone = w < 500;
    if (base[w] === undefined) { const c0 = await b.newContext({ viewport: { width: w, height: h } }); await c0.addInitScript(spy); const p0 = await c0.newPage(); await p0.goto(BASE + '/work', { waitUntil: 'load' }); await p0.waitForTimeout(2500); base[w] = await p0.evaluate(() => window.__fi); await c0.close(); }
    const mk = async () => { const c = await b.newContext({ viewport: { width: w, height: h }, hasTouch: phone, isMobile: false }); await c.addInitScript(spy); const p = await c.newPage(); const errs = []; p.on('console', (m) => ['error', 'warning'].includes(m.type()) && !/preloaded using link preload|Failed to load resource/.test(m.text()) && errs.push(m.text().slice(0, 100))); p.on('pageerror', (e) => errs.push(String(e).slice(0, 100))); p.on('response', (rs) => { if (rs.status() >= 400) errs.push(rs.status() + ' ' + rs.url().slice(-70)); }); p.__errs = errs; return [c, p]; };
    let [ctx, p] = await mk();
    await p.goto(BASE + r, { waitUntil: 'load' }); await p.waitForTimeout(2800);
    res.listeners = await p.evaluate(() => window.__fi);   // net focusin listeners on this page (1 when guarded, 0 when not)
    // A. whole-page keyboard walk: every stop outside the header and banner must end clear of the banner
    const stops = []; for (let i = 0; i < 90; i++) { await p.keyboard.press('Tab'); await settle(p); const s = await p.evaluate(state); if (!s) continue; if (s.inBanner && stops.length) { /* wrapped back to the banner */ } stops.push(s); }
    const main = stops.filter((s) => !s.inBanner && !s.inHeader);
    res.stops = main.length;
    /* behind the banner = it could have been cleared (it fits above the banner) yet its bottom is still under it; a control taller than the space above the banner keeps its top in view and is reported separately */
    res.obscured = main.filter((s) => s.bn != null && s.bottom > s.bn && s.bottom - s.top <= s.bn - 40).map((s) => `${s.t}@${s.bottom}>${s.bn}`);
    res.tallerThanSpace = main.filter((s) => s.bn != null && s.bottom > s.bn && s.bottom - s.top > s.bn - 40).map((s) => `${s.t} (${s.bottom - s.top}px, top ${s.top})`);
    res.noRing = main.filter((s) => !s.ring).map((s) => s.t);
    res.scrollBy = await p.evaluate(() => window.__sb.length);
    // C. a control that is already fully visible (well above the banner) gets no corrective scroll: step to it by keyboard from the control after it
    const av = []; 
    for (const pick of ['first', 'middle', 'last']) {
      const ok = await p.evaluate((pick) => {
        const q = [...document.querySelectorAll('main a[href], main button, main input:not([type=hidden]):not([type=radio]), main select, main textarea, main summary')].filter((e) => e.offsetParent && !e.closest('header') && e.getBoundingClientRect().height > 8 && getComputedStyle(e).visibility !== 'hidden');
        if (q.length < 3) return false; const k = pick === 'first' ? 0 : pick === 'last' ? q.length - 2 : Math.floor(q.length / 2); const target = q[k], next = q[k + 1];
        const bn = document.querySelector('.consent-banner').getBoundingClientRect().top; const r = target.getBoundingClientRect(); window.scrollTo({ top: Math.max(0, scrollY + r.top - Math.max(80, (bn - r.height) / 2)), behavior: 'instant' }); window.__target = k; window.__q = q; next.focus({ preventScroll: true }); return true; }, pick);
      if (!ok) continue; await settle(p);
      await p.evaluate(() => { window.__sb = []; window.__y = scrollY; }); await p.keyboard.press('Shift+Tab'); await settle(p);
      av.push(await p.evaluate((pick) => { const e = document.activeElement; const r = e.getBoundingClientRect(); const bn = document.querySelector('.consent-banner').getBoundingClientRect().top; return { pick, label: e.textContent.trim().slice(0, 24), visibleBefore: window.__q[window.__target] === e && r.bottom + 6 <= bn && r.top >= 0, scrollBy: window.__sb.length, yMoved: Math.abs(scrollY - window.__y) > 1, dy: Math.round(scrollY - window.__y), top: Math.round(r.top), bottom: Math.round(r.bottom), bn: Math.round(bn), docEnd: Math.round(document.documentElement.scrollHeight - scrollY - innerHeight) }; }, pick));
    }
    res.alreadyVisible = { detail: av, cases: av.length, onTarget: av.filter((x) => x.visibleBefore).length, scrollBy: av.reduce((a, x) => a + x.scrollBy, 0), yMoved: av.some((x) => x.visibleBefore && x.yMoved) };
    // D. mouse and touch: a control straddling the banner edge, pressed on its visible part, must not trigger the guard
    await p.evaluate(() => { window.scrollTo(0, 0); window.__sb = []; });
    const target = await p.evaluate(() => { const bn = document.querySelector('.consent-banner').getBoundingClientRect().top; const c = [...document.querySelectorAll('main input:not([type=hidden]):not([type=radio]), main textarea, main select, main summary, main button')].filter((e) => e.offsetParent && !e.closest('header')); const e = c.find((x) => x.getBoundingClientRect().height > 28); if (!e) return null; e.scrollIntoView({ block: 'start' }); const r0 = e.getBoundingClientRect(); window.scrollBy(0, 0); const want = bn - r0.top - 14; /* put its top 14px above the banner edge */ window.scrollTo({ top: scrollY - want, behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: Math.round(r.left + Math.min(40, r.width / 2)), y: Math.round(r.top + 6), tag: e.tagName.toLowerCase(), top: Math.round(r.top), bn: Math.round(bn), bottom: Math.round(r.bottom) }; });
    if (target && target.bottom > target.bn) {
      await p.evaluate(() => { window.__sb = []; }); const y0 = await p.evaluate(() => scrollY);
      if (phone) await p.touchscreen.tap(target.x, target.y); else await p.mouse.click(target.x, target.y);
      await p.waitForTimeout(400); res.pointer = { tag: target.tag, scrollBy: await p.evaluate(() => window.__sb.length), yMoved: (await p.evaluate(() => scrollY)) !== y0 };
      await p.evaluate(() => { document.activeElement && document.activeElement.blur(); });
    } else res.pointer = { skipped: 'no control straddled the banner edge' };
    // E. menu
    await p.evaluate(() => { window.scrollTo(0, 0); window.__sb = []; }); await p.waitForTimeout(300);
    const menuBtn = w < 900 ? p.locator('.dc-menu-btn') : p.locator('.dc-svc-btn').first();
    await menuBtn.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(500); const opened = (await menuBtn.getAttribute('aria-expanded')) === 'true';
    const ms = []; for (let i = 0; i < 8; i++) { await p.keyboard.press('Tab'); await p.waitForTimeout(160); const s = await p.evaluate(state); if (s) ms.push(s); }
    await p.keyboard.press('Escape'); await p.waitForTimeout(350);
    res.menu = { opens: opened, stops: ms.length, noRing: ms.filter((s) => !s.ring).map((s) => s.t), scrollBy: await p.evaluate(() => window.__sb.length), escapeCloses: (await menuBtn.getAttribute('aria-expanded')) !== 'true' };
    // F. contact form (typing, select, textarea, submit focus, invalid submit by keyboard)
    if (r === '/contact') {
      await p.evaluate(() => { window.scrollTo(0, 0); window.__sb = []; });
      await p.fill('input[name=name]', 'Test Name'); await p.focus('input[name=email]'); await p.keyboard.type('test@example.com'); await p.keyboard.press('Tab'); await p.keyboard.type('9999999999'); await p.keyboard.press('Tab'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Tab'); await p.keyboard.type('Hello'); await p.waitForTimeout(300);
      const values = await p.evaluate(() => ({ name: document.querySelector('input[name=name]').value, email: document.querySelector('input[name=email]').value, phone: document.querySelector('input[name=phone]').value, message: document.querySelector('textarea[name=message]').value }));
      res.form = { values, ok: values.name === 'Test Name' && values.email === 'test@example.com' && values.phone === '9999999999' && values.message === 'Hello' };
      // email field specifically, by keyboard from a position that puts it under the banner
      await p.evaluate(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }); await p.evaluate(() => document.querySelector('input[name=name]').focus({ preventScroll: true })); await p.evaluate(() => { window.__kd = 1; });
      await p.evaluate(() => { const e = document.querySelector('input[name=email]'); const bn = document.querySelector('.consent-banner').getBoundingClientRect().top; const r = e.getBoundingClientRect(); window.scrollTo({ top: scrollY + r.top - (bn - r.height / 2), behavior: 'instant' }); });
      await settle(p); await p.keyboard.press('Tab'); await settle(p); const em = await p.evaluate(state); res.emailByKeyboard = { focused: em && em.name, clear: em && em.bn != null ? em.bottom <= em.bn : null, bottom: em && em.bottom, bn: em && em.bn };
      if (!(res.emailByKeyboard.focused === 'email' && res.emailByKeyboard.clear)) bad.push('email not clear of banner by keyboard ' + JSON.stringify(res.emailByKeyboard));
      // both closing CTAs
      const ctas = await p.evaluate(() => [...document.querySelectorAll('main a[href], main button')].filter((e) => e.offsetParent && /request a call|tell us|send|talk|book|discuss/i.test(e.textContent)).slice(-4).map((e) => e.textContent.trim().slice(0, 30)));
      res.closingCtas = ctas;
    }
    // G. Reject and persistence
    await p.evaluate(() => { window.scrollTo(0, 0); }); await p.getByRole('button', { name: /reject analytics/i }).click(); await p.waitForTimeout(500);
    res.rejectHides = await p.evaluate(() => !document.querySelector('.consent-banner')); await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(2200); res.persists = await p.evaluate(() => !document.querySelector('.consent-banner'));
    res.errors = p.__errs.slice(0, 3);
    await ctx.close();
    // H. client-side navigation: listeners stay at exactly one on guarded pages and drop to zero elsewhere
    [ctx, p] = await mk();
    const hops = [['/blog', r], [r, '/work'], ['/work', r]]; res.nav = [];
    await p.goto(BASE + '/blog', { waitUntil: 'load' }); await p.waitForTimeout(2200);
    for (const [from, to] of [['/blog', r], [r, '/work']]) {
      try { await p.locator(`footer a[href="${to}"]`).first().click(); await p.waitForURL('**' + to, { timeout: 20000 }); await p.waitForTimeout(1500); res.nav.push({ to, listeners: await p.evaluate(() => window.__fi) }); } catch (e) { res.nav.push({ to, error: String(e).slice(0, 60) }); }
    }
    res.navErrors = p.__errs.slice(0, 3); await ctx.close();
    // verdict
    const expectListeners = base[w] + (guarded.has(r) ? 1 : 0);
    if (res.listeners !== expectListeners) bad.push(`listeners ${res.listeners} (expected ${expectListeners})`);
    if (res.obscured.length) bad.push('obscured: ' + res.obscured.slice(0, 3).join('; '));
    if (res.noRing.length) bad.push('no ring: ' + res.noRing.slice(0, 3).join('|'));
    if (res.alreadyVisible.scrollBy > 0) bad.push('guard scrolled for an already-visible control ' + JSON.stringify(res.alreadyVisible.detail.filter((x) => x.scrollBy)));
    if (res.alreadyVisible.onTarget < 1) bad.push('already-visible test did not land on a visible target');
    if (res.pointer && res.pointer.scrollBy > 0) bad.push('pointer triggered the guard');
    if (!res.menu.opens || !res.menu.escapeCloses || res.menu.scrollBy > 0 || res.menu.noRing.length) bad.push('menu ' + JSON.stringify(res.menu));
    if (res.form && !res.form.ok) bad.push('form values'); if (!res.rejectHides || !res.persists) bad.push('consent');
    if (res.errors.length || res.navErrors.length) bad.push('console ' + JSON.stringify([...res.errors, ...res.navErrors]));
    for (const n of res.nav) { const want = base[w] + (guarded.has(n.to) ? 1 : 0); if (n.error || n.listeners !== want) bad.push('nav ' + JSON.stringify(n)); }
    out[key] = res; if (bad.length) defects.push([key, bad]);
    console.log(bad.length ? 'DEFECT' : 'ok    ', w, r.padEnd(18), 'listeners', res.listeners + '/' + (base[w] + (guarded.has(r) ? 1 : 0)), 'stops', res.stops, 'obscured', res.obscured.length, 'tall', res.tallerThanSpace.length, 'scrollBy', res.scrollBy, 'visible', res.alreadyVisible.onTarget + '/' + res.alreadyVisible.cases + ' sb' + res.alreadyVisible.scrollBy, 'pointer', JSON.stringify(res.pointer).slice(0, 70), 'menu', res.menu.opens, res.menu.escapeCloses, res.form ? ('form ' + res.form.ok + ' email ' + res.emailByKeyboard.clear) : '', 'rej', res.rejectHides, res.persists, 'nav', JSON.stringify(res.nav.map((n) => n.listeners)), bad.length ? JSON.stringify(bad) : '');
  }
  fs.writeFileSync(path.join(__dirname, '../data/focus-guard.json'), JSON.stringify({ out, defects }, null, 1));
  console.log('defects', defects.length); await b.close();
})();
