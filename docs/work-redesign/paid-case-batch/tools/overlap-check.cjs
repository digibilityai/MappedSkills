// Second pass for the "overlapping text" warning of audit-mobile.cjs, with the false positives removed: text inside a closed
// <details>, inside the cookie banner, inside a hidden panel, or animating in (opacity near zero) is ignored. Reports pairs of
// visible, non-nested text elements whose boxes overlap by more than 6 px each way. Usage:
//   node docs/work-redesign/paid-case-batch/tools/overlap-check.cjs <baseUrl> <routes.txt> <width>[,<width>...]
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
(async () => {
  const [base, routesFile, widths] = process.argv.slice(2);
  const routes = fs.readFileSync(routesFile, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const w of widths.split(',').map(Number)) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true });
    for (const route of routes) {
      const p = await ctx.newPage();
      try {
        await p.goto(base + route, { waitUntil: 'load', timeout: 120000 });
        const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.first().click().catch(() => {});
        const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 400) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(70); }
        await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500);
        const res = await p.evaluate(() => {
          const vis = (e) => { const c = getComputedStyle(e); if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.05) return false; const r = e.getBoundingClientRect(); if (r.height <= 0 || r.width <= 0) return false; for (let a = e.parentElement; a; a = a.parentElement) { if (a.matches('details:not([open])') && !e.closest('summary')) return false; if (a.hidden || +getComputedStyle(a).opacity < 0.05 || getComputedStyle(a).visibility === 'hidden') return false; } return true; };
          const t = [...document.body.querySelectorAll('h1,h2,h3,h4,p,li,a,button,label,figcaption,dt,dd')].filter((e) => e.textContent.trim() && !e.closest('[aria-hidden="true"],svg,.ct-stage-frame,.consent-banner') && getComputedStyle(e).position !== 'fixed' && vis(e));
          const out = [];
          for (let i = 0; i < t.length && out.length < 6; i++) for (let j = i + 1; j < t.length; j++) {
            const a = t[i], b = t[j]; if (a.contains(b) || b.contains(a)) continue;
            const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
            const ww = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left), hh = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
            if (ww > 6 && hh > 6 && ww * hh > 150) { out.push(`${a.tagName}:"${a.textContent.trim().slice(0, 28)}" / ${b.tagName}:"${b.textContent.trim().slice(0, 28)}" ${Math.round(ww)}x${Math.round(hh)} at y${Math.round(ra.top + scrollY)}`); if (out.length >= 6) break; }
          }
          return out;
        });
        console.log(JSON.stringify({ route, width: w, overlaps: res }));
      } catch (e) { console.log(JSON.stringify({ route, width: w, error: String(e.message).slice(0, 100) })); }
      await p.close();
    }
    await ctx.close();
  }
  await browser.close();
})();
