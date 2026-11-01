// Production-mode screenshots (isolated build; BASE=http://localhost:3511): published content only.
// Screenshots (section with neighbours) and a mobile recording of the showcase pilot. BASE defaults to http://localhost:3500
const { chromium } = require('../../../../node_modules/playwright-core'); const fs = require('fs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3500'; const shots = path.join(__dirname, '../screenshots'); const recs = path.join(__dirname, '../recordings');
const exe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const prep = async (p, url) => { await p.goto(BASE + url, { waitUntil: 'load' }); await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {}); const r = p.getByRole('button', { name: /reject analytics/i }); if (await r.count()) await r.click().catch(() => {}); const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 500) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(50); } };
(async () => {
  const b = await chromium.launch({ executablePath: exe });
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [820, 1180, 'tablet'], [390, 844, 'mobile']]) for (const [route, name] of [['/social-media-ads', 'meta'], ['/seo', 'seo']]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500 })).newPage(); await prep(p, route);
    await p.evaluate(() => { const s = document.querySelector('[data-cs]'); const r = s.getBoundingClientRect(); window.scrollTo({ top: r.top + scrollY - 40, behavior: 'instant' }); }); await p.waitForTimeout(1500);
    // full section plus its neighbours: clip from 160px above to 160px below the section
    const box = await p.evaluate(() => { const r = document.querySelector('[data-cs]').getBoundingClientRect(); return { y: r.top + scrollY, h: r.height }; });
    await p.screenshot({ path: path.join(shots, `production-${name}-${tag}-section.png`), fullPage: true, clip: { x: 0, y: Math.max(0, box.y - 220), width: w, height: box.h + 440 } });
    if (tag === 'mobile') { await p.screenshot({ path: path.join(shots, `production-${name}-${tag}-viewport.png`) }); }
    await p.close();
  }
  await b.close();
})();
