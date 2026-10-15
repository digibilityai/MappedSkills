#!/usr/bin/env node
/**
 * GATE 4 · B1 — navigation behaviour on every target (Direction C chrome).
 *
 * usage: node nav-checks.cjs --plain <url> --fixture <url> --out <file.json> [--engine chromium|webkit|firefox] [--only ids]
 *
 * Desktop 1440×900:
 *   D1 header is in normal flow (not sticky/fixed) and does not overlap <main>
 *   D2 primary links present with production destinations; no role=menu / menuitem
 *   D3 Services disclosure: opens on click, panel links are the 6 capability routes, /how-it-works and /services, Escape closes and
 *      returns focus to the control, closed panel is inert
 *   D4 aria-current="page" only on links whose href is the current path; Services control marked only on service routes
 * Mobile 390×700 (and 320×568 for M2):
 *   M1 menu button collapsed → expanded on click; Escape closes and returns focus to the button
 *   M2 the menu's first two links are Contact Us → /contact and Book a call → /schedule-call, inside the viewport
 *   M3 Tab from the open menu button lands on the menu's Contact Us
 *   M4 the last menu link can be scrolled into view; page scroll position (taken once the button is in view) is
 *      unchanged after open + close
 *      (records whether the page scroll is locked while open; Direction C does not lock — the menu is in flow)
 *   M5 with consent UNDECIDED (banner showing), the menu's Contact Us / Book a call are not covered by the banner
 * Per page:
 *   A1 every in-page `#id` link in <main> (up to 8) moves its target into view, below the header
 *   E1 no console errors, page errors or React hydration warnings across all of the above
 */
const fs = require('fs');
const { args, selectTargets, baseFor, launch, context, watchErrors, pool, Findings } = require('./lib.cjs');

const a = args();
if (!a.out) { console.error('--out required'); process.exit(2); }
const KEY = a.engine === 'webkit' ? 'Alt+Tab' : 'Tab';
// Approved panel (components/direction-c/nav.ts, DEC-036): 6 capability routes, Measurement → /how-it-works, All services → /services.
const SERVICES = ['/ai-seo', '/conversion-optimization', '/google-ads', '/how-it-works', '/lead-generation', '/seo', '/services', '/social-media-ads'];
const PRIMARY = ['/about', '/blog', '/how-it-works', '/pricing', '/work'];
const SERVICE_ROUTES = new Set(['/services', '/seo', '/google-ads', '/social-media-ads', '/ai-seo', '/conversion-optimization', '/lead-generation']);

(async () => {
  const browser = await launch(a.engine);
  const F = new Findings({ tool: 'gate-4/qa/nav-checks.cjs', engine: a.engine, plain: a.plain, fixture: a.fixture, at: new Date().toISOString() });
  const targets = selectTargets(a);
  const ok = (cond, check, t, w, key, detail) => (cond ? F.pass() : F.add(check, t.id, w, key, detail));
  await pool(targets, 4, async (t) => {
    const url = baseFor(a, t) + t.url;
    const errs = [];
    const track = (p) => { const e = watchErrors(p, { expectDocumentStatus: t.status }); p.on('console', (m) => { if (/hydrat/i.test(m.text())) errs.push('hydration: ' + m.text().slice(0, 160)); }); return e; };
    // ---------------- desktop
    {
      const ctx = await context(browser, { width: 1440, engine: a.engine, reducedMotion: 'reduce' });
      const p = await ctx.newPage(); const e = track(p);
      await p.goto(url, { waitUntil: 'networkidle' });
      const d = await p.evaluate(({ SERVICE_ROUTES_ARR }) => {
        const hdr = [...document.querySelectorAll('header')].find((h) => !h.closest('main'));
        const main = document.querySelector('main');
        const pos = getComputedStyle(hdr).position;
        const overlap = hdr.getBoundingClientRect().bottom > main.getBoundingClientRect().top + 0.5;
        const primary = [...hdr.querySelectorAll('.dc-nav > a')].map((x) => x.getAttribute('href'));
        const roleMenu = !!document.querySelector('[role=menu],[role=menuitem]');
        const current = [...hdr.querySelectorAll('[aria-current="page"]')].map((x) => x.getAttribute('href'));
        const svcCurrent = hdr.querySelector('.dc-svc-link')?.getAttribute('aria-current') === 'page' || hdr.querySelector('.dc-nav > button')?.hasAttribute('data-current');
        return { pos, overlap, primary, roleMenu, current, path: location.pathname, svcCurrent, isSvc: SERVICE_ROUTES_ARR.includes(location.pathname) };
      }, { SERVICE_ROUTES_ARR: [...SERVICE_ROUTES] });
      ok(!['sticky', 'fixed'].includes(d.pos) && !d.overlap, 'D1', t, 1440, 'flow', `header position ${d.pos}; overlaps main: ${d.overlap}`);
      ok(PRIMARY.every((h) => d.primary.includes(h)) && !d.roleMenu, 'D2', t, 1440, 'primary', `primary links ${d.primary.join(' ')}; role=menu present: ${d.roleMenu}`);
      ok(d.current.every((h) => h === d.path), 'D4', t, 1440, 'aria-current', `aria-current on ${d.current.join(' ') || 'none'} at ${d.path}`);
      // Services disclosure
      const btn = p.locator('header .dc-nav > button[aria-expanded]');
      const inertBefore = await p.evaluate(() => [...document.querySelectorAll('#dc-svc-panel a')].every((x) => x.closest('[inert]')));
      await btn.click(); await p.waitForTimeout(150);
      const s = await p.evaluate(() => ({ exp: document.querySelector('header .dc-nav > button').getAttribute('aria-expanded'), links: [...new Set([...document.querySelectorAll('#dc-svc-panel a')].map((x) => x.getAttribute('href')))].sort(), inert: !!document.querySelector('#dc-svc-panel[inert]') }));
      await p.keyboard.press('Escape'); await p.waitForTimeout(150);
      const after = await p.evaluate(() => ({ exp: document.querySelector('header .dc-nav > button').getAttribute('aria-expanded'), focus: document.activeElement === document.querySelector('header .dc-nav > button') }));
      ok(inertBefore && s.exp === 'true' && !s.inert && JSON.stringify(s.links) === JSON.stringify(SERVICES) && after.exp === 'false' && after.focus, 'D3', t, 1440, 'services', `closed-inert ${inertBefore}; open ${s.exp}; panel ${s.links.join(' ')}; Escape → expanded ${after.exp}, focus returned ${after.focus}`);
      // in-page anchors
      const anchors = await p.evaluate(() => [...document.querySelectorAll('main a[href^="#"]')].map((x) => x.getAttribute('href')).filter((h) => h.length > 1 && document.getElementById(decodeURIComponent(h.slice(1)))).slice(0, 8));
      for (const h of anchors) {
        await p.evaluate(() => scrollTo(0, 0));
        await p.locator(`main a[href="${h}"]`).first().click(); await p.waitForTimeout(250);
        const r = await p.evaluate((id) => { const el = document.getElementById(decodeURIComponent(id)); const q = el.getBoundingClientRect(); const hb = [...document.querySelectorAll('header')].find((x) => !x.closest('main')).getBoundingClientRect().bottom; return { top: Math.round(q.top), vis: q.top >= -1 && q.top < innerHeight, underHeader: q.top < hb - 1 && q.bottom > 0 }; }, h.slice(1));
        ok(r.vis && !r.underHeader, 'A1', t, 1440, h, `anchor ${h}: target top ${r.top}, in view ${r.vis}, under header ${r.underHeader}`);
      }
      errs.push(...e);
      await ctx.close();
    }
    // ---------------- mobile
    for (const [w, h] of [[390, 700], [320, 568]]) {
      const ctx = await context(browser, { width: w, height: h, engine: a.engine, reducedMotion: 'reduce', hasTouch: true });
      const p = await ctx.newPage(); const e = track(p);
      await p.goto(url, { waitUntil: 'networkidle' });
      // Start part-way down a page, then bring the (non-sticky) menu button into view as a person must, and measure
      // scroll restoration from THAT position: the jump to reach the button is not the menu's doing.
      await p.evaluate(() => scrollTo(0, 40)); await p.waitForTimeout(50);
      const btn = p.locator('header .dc-menu-btn');
      try { await btn.waitFor({ state: 'visible', timeout: 3000 }); } catch (err) { /* reported */ }
      await btn.scrollIntoViewIfNeeded(); await p.waitForTimeout(50);
      const y0 = await p.evaluate(() => scrollY);
      const exp0 = await btn.getAttribute('aria-expanded');
      await btn.click(); await p.waitForTimeout(150);
      const m = await p.evaluate(() => {
        const menu = document.getElementById(document.querySelector('header .dc-menu-btn').getAttribute('aria-controls'));
        const links = [...menu.querySelectorAll('a')];
        const firstTwo = links.slice(0, 2).map((x) => { const q = x.getBoundingClientRect(); return { href: x.getAttribute('href'), text: x.textContent.trim(), inView: q.top >= 0 && q.bottom <= innerHeight }; });
        return { exp: document.querySelector('header .dc-menu-btn').getAttribute('aria-expanded'), firstTwo, lock: getComputedStyle(document.body).overflow === 'hidden' || getComputedStyle(document.documentElement).overflow === 'hidden' };
      });
      // M2 is scrolled-to-top independent: CTAs must be reachable without scrolling the whole page
      if (w === 390) {
        await p.keyboard.press(KEY);
        const tabTo = await p.evaluate(() => document.activeElement.getAttribute('href'));
        ok(tabTo === '/contact', 'M3', t, w, 'tab-into-menu', `Tab from the open menu button reached ${tabTo}`);
      }
      // close first (scroll restoration is measured on a plain open + close), then reopen for M4
      await p.keyboard.press('Escape'); await p.waitForTimeout(150);
      const closed = await p.evaluate(() => ({ exp: document.querySelector('header .dc-menu-btn').getAttribute('aria-expanded'), focus: document.activeElement === document.querySelector('header .dc-menu-btn'), y: scrollY }));
      await p.locator('header .dc-menu-btn').click(); await p.waitForTimeout(150);
      const last = await p.evaluate(() => { const menu = document.getElementById(document.querySelector('header .dc-menu-btn').getAttribute('aria-controls')); const x = [...menu.querySelectorAll('a')].pop(); x.scrollIntoView({ block: 'nearest' }); const q = x.getBoundingClientRect(); return q.top >= -0.5 && q.bottom <= innerHeight + 0.5; });
      ok(exp0 === 'false' && m.exp === 'true' && closed.exp === 'false' && closed.focus, 'M1', t, `${w}x${h}`, 'open-close', `expanded ${exp0}→${m.exp}→${closed.exp}; focus returned ${closed.focus}`);
      ok(m.firstTwo[0]?.href === '/contact' && m.firstTwo[1]?.href === '/schedule-call', 'M2', t, `${w}x${h}`, 'cta-first', `menu starts with ${m.firstTwo.map((x) => x.href).join(', ')}`);
      ok(last, 'M4', t, `${w}x${h}`, 'last-reachable', 'last menu link can be scrolled into view');
      ok(closed.y === y0 && !m.lock, 'M4', t, `${w}x${h}`, 'scroll-restored', `scrollY ${y0} before open, ${closed.y} after Escape; page scroll locked while open: ${m.lock}`);
      F.meta.scroll = F.meta.scroll || {};
      F.meta.scroll[`${t.id}@${w}`] = { before: y0, afterClose: closed.y, lockedWhileOpen: m.lock };
      errs.push(...e);
      await ctx.close();
    }
    // ---------------- consent banner + menu (undecided)
    for (const [w, h] of [[390, 700], [320, 568]]) {
      const ctx = await context(browser, { width: w, height: h, engine: a.engine, reducedMotion: 'reduce', hasTouch: true, consent: null });
      const p = await ctx.newPage(); const e = track(p);
      await p.goto(url, { waitUntil: 'networkidle' });
      const banner = await p.evaluate(() => !!document.querySelector('[aria-labelledby="consent-banner-title"]'));
      await p.locator('header .dc-menu-btn').click(); await p.waitForTimeout(150);
      const cov = await p.evaluate(() => {
        const menu = document.getElementById(document.querySelector('header .dc-menu-btn').getAttribute('aria-controls'));
        return [...menu.querySelectorAll('a')].slice(0, 2).map((x) => { x.scrollIntoView({ block: 'nearest' }); const q = x.getBoundingClientRect(); const hit = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2); return { href: x.getAttribute('href'), clear: !!hit && (hit === x || x.contains(hit)) }; });
      });
      ok(banner && cov.every((c) => c.clear), 'M5', t, `${w}x${h}`, 'banner-and-menu', `banner shown ${banner}; ${cov.map((c) => `${c.href} ${c.clear ? 'clear' : 'COVERED'}`).join(', ')}`);
      errs.push(...e);
      await ctx.close();
    }
    for (const err of [...new Set(errs)]) F.add('E1', t.id, null, err.slice(0, 80), err);
    if (!errs.length) F.pass();
    process.stderr.write(`· ${t.id}\n`);
  });
  await browser.close();
  F.write(a.out);
  const by = F.items.reduce((m, f) => ((m[f.check] = (m[f.check] || 0) + 1), m), {});
  const sc = Object.values(F.meta.scroll || {});
  console.log(`nav [${a.engine}]: ${targets.length} targets · ${F.passes} checks pass · ${F.items.length} findings ${JSON.stringify(by)} · scroll restored ${sc.filter((s) => s.before === s.afterClose).length}/${sc.length} · scroll locked while open ${sc.filter((s) => s.lockedWhileOpen).length}/${sc.length}`);
})().catch((e) => { console.error(e); process.exit(1); });
