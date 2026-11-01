// Opens the phone header menu (and its Services and Who we help groups) on every route at each width and checks it opens, stays
// inside the viewport, lists its links with usable tap targets, and closes again. Usage:
//   node docs/work-redesign/paid-case-batch/tools/menu-check.cjs <baseUrl> <routes.txt> <width>[,<width>...]
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
      const page = await ctx.newPage();
      const rec = { route, width: w };
      try {
        await page.goto(base + route, { waitUntil: 'load', timeout: 120000 });
        await page.waitForTimeout(800);
        const rej = page.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.first().click().catch(() => {});
        const btn = page.locator('button[aria-controls="dc-mnav"]').first();
        if (!(await btn.count())) { rec.result = 'NO MENU BUTTON'; }
        else {
          await btn.click({ timeout: 4000 });
          await page.waitForTimeout(500);
          for (const g of ['dc-m-svc', 'dc-m-who']) { const gb = page.locator(`button[aria-controls="${g}"]`).first(); if (await gb.count()) await gb.click({ timeout: 3000 }).catch(() => {}); }
          await page.waitForTimeout(300);
          rec.m = await page.evaluate((vw) => {
            const nav = document.getElementById('dc-mnav'); const r = nav.getBoundingClientRect();
            const links = [...nav.querySelectorAll('a')].filter((a) => { const b = a.getBoundingClientRect(); return b.width > 0 && b.height > 0; });
            return { expanded: document.querySelector('button[aria-controls="dc-mnav"]').getAttribute('aria-expanded'), links: links.length, inside: r.left >= -1 && r.right <= vw + 1, docOverflow: document.documentElement.scrollWidth - vw, small: links.filter((a) => a.getBoundingClientRect().height < 24).length, bad: links.filter((a) => a.getBoundingClientRect().right > vw + 1).length, scrollable: nav.scrollHeight > nav.clientHeight || getComputedStyle(nav).overflowY };
          }, w);
          await btn.click({ timeout: 4000 }).catch(() => {});
          await page.waitForTimeout(300);
          rec.closed = await page.evaluate(() => document.querySelector('button[aria-controls="dc-mnav"]').getAttribute('aria-expanded') === 'false');
          rec.result = rec.m.expanded === 'true' && rec.m.links > 8 && rec.m.inside && rec.m.docOverflow <= 0 && !rec.m.bad && rec.closed ? 'PASS' : 'FAIL';
        }
      } catch (e) { rec.result = 'ERROR ' + String(e.message).slice(0, 100); }
      console.log(JSON.stringify(rec));
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
})();
