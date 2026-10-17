// G2 browser checks for /conversion-optimization. Usage: node verify.cjs <baseUrl> <outDir>
const { chromium, firefox, webkit } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs');
const base = process.argv[2], out = process.argv[3];
const SEQ = ['.co-story', '.co-route', '.co-work', '.co-meas', '.co-proof', '.co-next'];
const results = {};
const log = (k, v) => { results[k] = v; console.log(k, JSON.stringify(v)); };

async function overflow(page) {
  return page.evaluate(() => {
    const w = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('main *, body > * *').forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.width && (r.right > w + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !e.closest('[aria-hidden="true"][style*="absolute"]')) bad.push(e.className && e.className.baseVal === undefined ? e.className : e.tagName);
    });
    return { scrollW: document.documentElement.scrollWidth, clientW: w, offenders: [...new Set(bad)].slice(0, 8) };
  });
}

(async () => {
  for (const [name, bt] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
    const browser = await bt.launch();
    const widths = name === 'chromium' ? [[1440, 900], [1024, 800], [768, 900], [390, 844], [320, 700]] : [[1440, 900], [390, 844]];
    for (const [w, h] of widths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const errs = [];
      page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      page.on('pageerror', (e) => errs.push(String(e)));
      await page.goto(base + '/conversion-optimization', { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      const key = `${name}-${w}`;
      log(key + '-overflow', await overflow(page));
      log(key + '-errors', errs);
      if (name === 'chromium' && (w === 1440 || w === 390 || w === 320)) {
        // timing: for each sequence scroll into view, record time of each step change
        for (const sel of SEQ) {
          const el = await page.$(sel);
          await el.scrollIntoViewIfNeeded();
          await page.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); window.scrollBy(0, r.top - 80); }, sel);
          const t0 = Date.now();
          const seen = await page.evaluate((s) => new Promise((res) => {
            const root = document.querySelector(s), t0 = performance.now(), log = [];
            const items = [...root.querySelectorAll('[data-i]')];
            const cur = () => items.findIndex((i) => i.classList.contains('is-on'));
            let last = cur(); log.push([last, 0]);
            const iv = setInterval(() => { const c = cur(); if (c !== last) { log.push([c, Math.round(performance.now() - t0)]); last = c; } }, 20);
            setTimeout(() => { clearInterval(iv); res(log); }, 12500);
          }), sel);
          log(`${key}-timing-${sel}`, seen);
        }
      }
      await ctx.close();
    }
    await browser.close();
  }
  fs.writeFileSync(out + '/verify-results.json', JSON.stringify(results, null, 1));
})();
