#!/usr/bin/env node
/**
 * GATE 4 · B0 — CHECKS 6 and 7, plus axe and navigation behaviour.
 *
 * usage: node a11y.cjs --plain <url> --fixture <url> --out <findings.json> [--engine chromium|webkit|firefox] [--only ids]
 *
 * Per target:
 *   axe-core (wcag2a/aa, 21a/aa, 22aa) at 390 and 1440 · one finding per rule id
 *   keyboard traversal at 1440 and 390: Tab through the page (menus closed); every stop must be
 *     visible, scrolled into view and carry a visible indicator (outline ≥ 2px or a box-shadow ring)
 *   accessible names: visible links, buttons and form controls with an empty computed name
 *   reduced motion: no element keeps a transition/animation > 10 ms; no `.dc-pre` remains
 *   forced colours (Chromium only): the focus indicator survives on the first 12 stops
 *   mobile navigation at 390×700 and 320×568 (sticky-header condition of LIVE-1): open the menu,
 *     then the menu's Contact / Book a call links must be reachable (in the viewport, or scrollable into it);
 *     Escape closes; the menu button exposes aria-expanded
 */
const fs = require('fs');
const { args, selectTargets, baseFor, launch, context, pool, Findings } = require('./lib.cjs');

const a = args();
if (!a.out) { console.error('--out required'); process.exit(2); }
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

// WebKit follows macOS Safari: Tab skips links unless Option is held, so the walk uses Alt+Tab there.
const TAB = a.engine === 'webkit' ? 'Alt+Tab' : 'Tab';
async function tabWalk(page, max = 220) {
  const stops = [];
  await page.evaluate(() => { document.activeElement && document.activeElement.blur(); window.scrollTo(0, 0); });
  let lastKey = null, repeats = 0;
  for (let i = 0; i < max; i++) {
    await page.keyboard.press(TAB);
    const s = await page.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return null;
      const cs = getComputedStyle(e), q = e.getBoundingClientRect();
      const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2) || (cs.boxShadow && cs.boxShadow !== 'none');
      const nm = (e.getAttribute('aria-label') || e.textContent || e.getAttribute('name') || e.id || '').replace(/\s+/g, ' ').trim().slice(0, 30);
      const region = e.closest('main') ? 'main' : e.closest('footer') ? 'footer' : e.closest('header') ? 'header' : 'other';
      return { key: `${region}:${e.tagName.toLowerCase()}:${e.getAttribute('href') || ''}:${nm}`, ring, inView: q.bottom > 0 && q.top < innerHeight && q.width > 0, visible: q.width > 0 && q.height > 0 && cs.visibility !== 'hidden' };
    });
    if (!s) break;
    if (s.visible && !s.inView) {
      // The browser may still be scrolling the newly focused element into view; settle once and re-measure.
      await page.waitForTimeout(200);
      s.inView = await page.evaluate(() => { const q = document.activeElement.getBoundingClientRect(); return q.bottom > 0 && q.top < innerHeight && q.width > 0; });
    }
    if (s.key === lastKey) { if (++repeats > 2) break; } else repeats = 0;
    lastKey = s.key;
    if (stops.length && stops[0].key === s.key && i > 3) break; // wrapped
    stops.push(s);
  }
  return stops;
}

const unnamed = () => {
  // Content of a closed <details> (other than its summary) is not rendered, so it has no visible name yet.
  const vis = (e) => { const q = e.getBoundingClientRect(); const cs = getComputedStyle(e); return q.width > 0 && q.height > 0 && cs.visibility !== 'hidden' && !e.closest('[inert],[aria-hidden="true"]') && !(e.closest('details:not([open])') && !e.closest('summary')); };
  const nm = (e) => {
    if (e.getAttribute('aria-labelledby')) return e.getAttribute('aria-labelledby').split(/\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' ').trim();
    if (e.getAttribute('aria-label')) return e.getAttribute('aria-label').trim();
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.tagName)) return ((e.id && document.querySelector(`label[for="${CSS.escape(e.id)}"]`)?.textContent) || e.closest('label')?.textContent || e.getAttribute('title') || '').trim();
    return (e.innerText || [...e.querySelectorAll('img[alt],svg title')].map((x) => x.alt || x.textContent).join(' ') || e.getAttribute('title') || '').trim();
  };
  return [...document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=link]')]
    .filter(vis).filter((e) => !nm(e)).map((e) => `${e.tagName.toLowerCase()}${e.getAttribute('href') ? '[' + e.getAttribute('href') + ']' : ''}${e.getAttribute('name') ? '[name=' + e.getAttribute('name') + ']' : ''}`);
};

(async () => {
  const browser = await launch(a.engine);
  const F = new Findings({ tool: 'gate-4/qa/a11y.cjs', engine: a.engine, plain: a.plain, fixture: a.fixture, at: new Date().toISOString() });
  const targets = selectTargets(a);
  const summary = {};
  await pool(targets, 4, async (t) => {
    const url = baseFor(a, t) + t.url;
    const sum = (summary[t.id] = {});
    for (const w of [390, 1440]) {
      const ctx = await context(browser, { width: w, engine: a.engine, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      // axe
      await page.addScriptTag({ content: AXE });
      const v = await page.evaluate(async () => {
        const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }, resultTypes: ['violations'] });
        return r.violations.map((x) => ({ id: x.id, impact: x.impact, n: x.nodes.length, sample: x.nodes.slice(0, 3).map((n) => n.target.join(' ')) }));
      });
      sum[`axe${w}`] = v.map((x) => `${x.id}×${x.n}`);
      for (const x of v) F.add('axe', t.id, w, x.id, `${x.id} [${x.impact}] ×${x.n}: ${x.sample.join(' | ')}`);
      if (!v.length) F.pass();
      // names
      const un = await page.evaluate(unnamed);
      for (const u of [...new Set(un)]) F.add('accessible-name', t.id, w, u, `no accessible name: ${u}`);
      if (!un.length) F.pass();
      // reduced motion (context already emulates reduce)
      const rm = await page.evaluate(() => {
        const long = [...document.querySelectorAll('body *')].filter((e) => {
          const cs = getComputedStyle(e);
          const dur = (s) => Math.max(0, ...s.split(',').map((x) => parseFloat(x) * (x.trim().endsWith('ms') ? 1 : 1000)));
          return (dur(cs.transitionDuration) > 10 && cs.transitionProperty !== 'none') || (cs.animationName !== 'none' && dur(cs.animationDuration) > 10);
        });
        return { long: long.length, sample: long.slice(0, 3).map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(/\s+/)[0]}`), pre: document.querySelectorAll('.dc-pre').length };
      });
      sum[`rm${w}`] = rm.long;
      if (rm.long) F.add('reduced-motion', t.id, w, 'transitions', `${rm.long} elements keep a transition/animation >10ms under reduced motion (e.g. ${rm.sample.join(', ')})`); else F.pass();
      if (rm.pre) F.add('reduced-motion', t.id, w, 'dc-pre', `${rm.pre} .dc-pre elements under reduced motion`); else F.pass();
      // keyboard
      const stops = await tabWalk(page);
      sum[`tab${w}`] = stops.length;
      const noRing = stops.filter((s) => s.visible && !s.ring), off = stops.filter((s) => s.visible && !s.inView), hidden = stops.filter((s) => !s.visible);
      for (const s of noRing) F.add('focus-visible', t.id, w, s.key, `focus stop without a ≥2px outline or ring: ${s.key}`);
      // Chromium: a fingerprinted finding. WebKit/Firefox builds scroll focus into view with
      // run-to-run timing variance (B0 observed the flagged element change between identical runs),
      // so there it is an advisory note and never a regression signal.
      for (const s of off) {
        if (a.engine === 'chromium') F.add('focus-in-view', t.id, w, s.key, `focused element not scrolled into view: ${s.key}`);
        else (F.meta.notes ||= []).push(`focus-in-view (advisory, ${a.engine}) ${t.id}@${w}: ${s.key}`);
      }
      for (const s of hidden) F.add('focus-hidden', t.id, w, s.key, `focus lands on an invisible element: ${s.key}`);
      if (!noRing.length && !hidden.length && (a.engine !== 'chromium' || !off.length)) F.pass();
      if (!stops.length) F.add('keyboard', t.id, w, 'no-stops', 'Tab reached no element');
      await ctx.close();
      // forced colours (Chromium emulation only)
      if (a.engine === 'chromium') {
        const fc = await context(browser, { width: w, engine: a.engine, reducedMotion: 'reduce', forcedColors: 'active' });
        const fp = await fc.newPage();
        await fp.goto(url, { waitUntil: 'networkidle' });
        const fstops = (await tabWalk(fp, 12)).filter((s) => s.visible && !s.ring);
        for (const s of fstops) F.add('forced-colours-focus', t.id, w, s.key, `focus indicator lost in forced colours: ${s.key}`);
        if (!fstops.length) F.pass();
        await fc.close();
      }
    }
    // mobile navigation (sticky-header condition)
    for (const [w, h] of [[390, 700], [320, 568]]) {
      const ctx = await context(browser, { width: w, height: h, engine: a.engine, reducedMotion: 'reduce', hasTouch: true });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      const btn = page.locator('header button[aria-expanded][aria-controls]').filter({ visible: true }).last();
      // Wait (bounded) for the button before declaring it absent: B1 observed one transient Firefox miss on a
      // streamed not-found page when counting immediately after networkidle. An absent button still fails after 3 s.
      try { await btn.waitFor({ state: 'visible', timeout: 3000 }); } catch (e) { /* reported below */ }
      if (!(await btn.count())) { F.add('menu', t.id, w, 'no-menu-button', 'no visible menu button with aria-expanded/aria-controls'); await ctx.close(); continue; }
      await btn.click(); await page.waitForTimeout(120);
      const r = await page.evaluate(() => {
        const btn = [...document.querySelectorAll('header button[aria-expanded][aria-controls]')].find((b) => b.getBoundingClientRect().width > 0 && b.getAttribute('aria-expanded') === 'true');
        if (!btn) return { open: false };
        const menu = document.getElementById(btn.getAttribute('aria-controls'));
        const res = {};
        for (const href of ['/contact', '/schedule-call']) {
          const el = [...(menu || document).querySelectorAll(`a[href="${href}"]`)].find((x) => x.getBoundingClientRect().width > 0);
          if (!el) { res[href] = 'absent'; continue; }
          el.scrollIntoView({ block: 'center' });
          const q = el.getBoundingClientRect();
          const cx = q.left + q.width / 2, cy = q.top + q.height / 2;
          const inVp = q.top >= 0 && q.bottom <= innerHeight;
          const hit = inVp ? document.elementFromPoint(cx, cy) : null;
          res[href] = inVp && hit && (hit === el || el.contains(hit)) ? 'reachable' : `unreachable(top=${Math.round(q.top)},vh=${innerHeight})`;
        }
        return { open: true, res };
      });
      if (!r.open) F.add('menu', t.id, w, 'does-not-open', 'menu button did not set aria-expanded=true');
      else for (const [href, s] of Object.entries(r.res)) {
        if (s === 'reachable') F.pass(); else F.add('menu-cta', t.id, `${w}x${h}`, href, `menu ${href} link ${s}`);
      }
      await page.keyboard.press('Escape'); await page.waitForTimeout(80);
      const closed = await page.evaluate(() => ![...document.querySelectorAll('header button[aria-expanded="true"][aria-controls]')].some((b) => b.getBoundingClientRect().width > 0));
      if (!closed) F.add('menu', t.id, `${w}x${h}`, 'escape', 'Escape does not close the menu'); else F.pass();
      await ctx.close();
    }
    process.stderr.write(`· ${t.id}\n`);
  });
  await browser.close();
  F.meta.summary = summary;
  F.write(a.out);
  const by = F.items.reduce((m, f) => ((m[f.check] = (m[f.check] || 0) + 1), m), {});
  console.log(`a11y [${a.engine}]: ${targets.length} targets · ${F.passes} checks clean · ${F.items.length} findings ${JSON.stringify(by)}`);
})().catch((e) => { console.error(e); process.exit(1); });
