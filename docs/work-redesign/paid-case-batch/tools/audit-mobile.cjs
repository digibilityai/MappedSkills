// Mobile audit of local pages at exact phone widths. For each route and width it loads the page as a touch device, waits for fonts,
// scrolls the whole page (lazy images, once-only reveals), then checks: horizontal overflow, elements that stick out of the viewport
// and are not clipped by an ancestor, clipped text, broken visible images, page errors and failed requests, the cookie banner, the
// header menu, the footer, accordions, forms, and small tap targets and overlapping text (reported as warnings to look at).
// Writes one JSON line per route and width, and a full-page JPEG into <outDir>/<width>/.
// Usage (repository root, dev server running):
//   node docs/work-redesign/paid-case-batch/tools/audit-mobile.cjs <outDir> <baseUrl> <routes.txt> <width>[,<width>...]
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));

const inPage = (vw) => {
  const vis = (el) => { const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const clippedByAncestor = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflowX)) { const r = a.getBoundingClientRect(); if (r.left >= -1 && r.right <= vw + 1) return true; }
    }
    return false;
  };
  const name = (el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''}`;
  const out = { overflowPx: document.documentElement.scrollWidth - vw, sticking: [], clippedText: [], broken: [], smallTargets: [], overlaps: [] };
  const all = [...document.body.querySelectorAll('*')].filter((e) => !['SCRIPT', 'STYLE', 'NOSCRIPT', 'PATH', 'DEFS', 'G', 'CIRCLE', 'RECT', 'LINE', 'POLYGON', 'TSPAN', 'TEXT'].includes(e.tagName.toUpperCase()) || false);
  for (const el of all) {
    if (el.closest('svg') || !vis(el) || el.matches('.skip-link')) continue;
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 1 || r.left < -1) && !clippedByAncestor(el) && getComputedStyle(el).position !== 'fixed') out.sticking.push(`${name(el)} [${Math.round(r.left)},${Math.round(r.right)}]`);
    const cs = getComputedStyle(el);
    if (['hidden', 'clip'].includes(cs.overflowX) && el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 2 && (el.textContent || '').trim() && !el.matches('.sr-only, [aria-hidden="true"], [data-hw-seq]') && !el.closest('[aria-hidden="true"]') && !(el.matches('.ct-stage-mark') || el.closest('.ct-stage-mark'))) out.clippedText.push(`${name(el)} ${el.scrollWidth}>${el.clientWidth}`);
  }
  for (const i of document.images) if (i.offsetParent !== null && getComputedStyle(i).visibility !== 'hidden' && (!i.complete || i.naturalWidth === 0)) out.broken.push(i.currentSrc || i.src);
  for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, summary')) {
    if (!vis(el) || el.closest('[aria-hidden="true"]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 24 || r.height < 24) { const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.closest('p, li, dd, figcaption'); if (!inline) out.smallTargets.push(`${name(el)} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"`); }
  }
  const texts = [...document.body.querySelectorAll('h1,h2,h3,h4,p,li,a,button,label,figcaption,dt,dd')].filter((e) => vis(e) && (e.textContent || '').trim() && !e.closest('[aria-hidden="true"], svg') && getComputedStyle(e).position !== 'fixed' && !e.closest('.ct-stage-frame'));
  const rects = texts.map((e) => [e, e.getBoundingClientRect()]);
  for (let i = 0; i < rects.length && out.overlaps.length < 8; i++) for (let j = i + 1; j < rects.length; j++) {
    const [a, ra] = rects[i], [b, rb] = rects[j];
    if (a.contains(b) || b.contains(a)) continue;
    const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left), h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
    if (w > 6 && h > 6 && w * h > 150) { out.overlaps.push(`${name(a)} / ${name(b)} ${Math.round(w)}x${Math.round(h)}`); if (out.overlaps.length >= 8) break; }
  }
  out.sticking = [...new Set(out.sticking)].slice(0, 8); out.clippedText = [...new Set(out.clippedText)].slice(0, 8); out.smallTargets = out.smallTargets.slice(0, 8);
  return out;
};

(async () => {
  const [outDir, base, routesFile, widths] = process.argv.slice(2);
  const routes = fs.readFileSync(routesFile, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const w of widths.split(',').map(Number)) {
    fs.mkdirSync(path.join(outDir, String(w)), { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    for (const route of routes) {
      const page = await ctx.newPage();
      const errors = [], failed = [];
      page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 120)));
      page.on('console', (m) => { if (m.type() === 'error' && !/favicon|Failed to load resource.*(40[34])/.test(m.text())) errors.push(m.text().slice(0, 120)); });
      page.on('requestfailed', (r) => { if (!/_rsc|analytics|gtm|googletagmanager/.test(r.url())) failed.push(r.url().replace(base, '')); });
      const rec = { route, width: w };
      try {
        await Promise.race([(async () => {
        const resp = await page.goto(base + route, { waitUntil: 'load', timeout: 60000 });
        rec.status = resp.status(); rec.final = page.url().replace(base, '');
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(1200);
        // cookie banner (before dismissal): visible, inside the viewport, buttons usable
        rec.banner = await page.evaluate((vw) => { const b = [...document.querySelectorAll('*')].find((e) => /Analytics cookies/.test(e.textContent || '') && e.children.length < 8 && getComputedStyle(e).position === 'fixed') || document.querySelector('[role="dialog"], [aria-label*="cookie" i]'); if (!b) return null; const r = b.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), height: Math.round(r.height), inView: r.left >= -1 && r.right <= vw + 1 }; }, w);
        const reject = page.getByRole('button', { name: /reject analytics/i });
        if (await reject.count()) { await reject.first().click({ timeout: 3000 }).catch(() => {}); await page.waitForTimeout(400); }
        const h = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < h; y += 400) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(90); }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(1500);
        await page.waitForFunction(() => [...document.images].filter((i) => i.offsetParent !== null).every((i) => i.complete), null, { timeout: 20000 }).catch(() => {});
        Object.assign(rec, await page.evaluate(inPage, w));
        // header menu (phone): open, check, close
        const menuBtn = page.locator('button[aria-controls="mobile-menu"]').first();
        if (await menuBtn.count()) {
          await menuBtn.click({ timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(500);
          rec.menu = await page.evaluate((vw) => { const m = document.getElementById('mobile-menu'); const links = m ? [...m.querySelectorAll('a')].filter((x) => x.getBoundingClientRect().width > 0) : []; const r = m ? m.getBoundingClientRect() : null; return { opened: Boolean(m && r.height > 0), visibleLinks: links.length, right: r ? Math.round(r.right) : null, overflow: document.documentElement.scrollWidth - vw, tooSmall: links.filter((x) => x.getBoundingClientRect().height < 24).length }; }, w);
          await menuBtn.click({ timeout: 3000 }).catch(() => {});
        } else rec.menu = null;
        // accordions: first closed <details> opens
        rec.details = await page.evaluate(async () => { const d = [...document.querySelectorAll('details')].find((x) => !x.open); if (!d) return null; d.querySelector('summary')?.click(); await new Promise((r) => setTimeout(r, 200)); const ok = d.open; return { total: document.querySelectorAll('details').length, opens: ok }; });
        // forms: every visible control fits and has a readable size
        rec.forms = await page.evaluate((vw) => { const f = [...document.querySelectorAll('form')]; if (!f.length) return null; const c = [...document.querySelectorAll('form input:not([type=hidden]), form select, form textarea')].filter((e) => e.getBoundingClientRect().width > 0); return { forms: f.length, controls: c.length, outside: c.filter((e) => e.getBoundingClientRect().right > vw + 1).length, smallFont: c.filter((e) => parseFloat(getComputedStyle(e).fontSize) < 16).length }; }, w);
        rec.footer = await page.evaluate((vw) => { const f = document.querySelector('footer'); if (!f) return null; const r = f.getBoundingClientRect(); return { right: Math.round(r.right), links: f.querySelectorAll('a').length }; }, w);
        const shot = path.join(outDir, String(w), (route.replace(/^\//, '').replace(/[/?=&]/g, '_') || 'home') + '.jpg');
        const png = await page.screenshot({ fullPage: true, type: 'png' });
        await sharp(png).jpeg({ quality: 55 }).toFile(shot).catch(async () => { fs.writeFileSync(shot.replace('.jpg', '.png'), png); });
        rec.shot = path.relative(outDir, shot);
        rec.h1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim().slice(0, 70) ?? null);
        })(), new Promise((_, rej) => setTimeout(() => rej(new Error('route exceeded 150 s')), 150000))]);
      } catch (e) { rec.error = String(e.message).slice(0, 160); }
      rec.errors = [...new Set(errors)].slice(0, 5); rec.failed = [...new Set(failed)].slice(0, 5);
      fs.appendFileSync(path.join(outDir, 'audit.jsonl'), JSON.stringify(rec) + '\n');
      console.log(route, w, rec.status ?? rec.error);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
})();
