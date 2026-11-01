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
    await p.screenshot({ path: path.join(shots, `${name}-${tag}-section.png`), fullPage: true, clip: { x: 0, y: Math.max(0, box.y - 220), width: w, height: box.h + 440 } });
    if (tag === 'mobile') { await p.screenshot({ path: path.join(shots, `${name}-${tag}-viewport.png`) }); }
    await p.close();
  }
  // recording: mobile navigation and motion
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, recordVideo: { dir: recs, size: { width: 390, height: 844 } } }); const p = await ctx.newPage();
  await p.goto(BASE + '/seo', { waitUntil: 'load' }); await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {}); const r = p.getByRole('button', { name: /reject analytics/i }); if (await r.count()) await r.click().catch(() => {});
  await p.evaluate(() => { const y = document.querySelector('[data-cs]').getBoundingClientRect().top + scrollY; window.scrollTo({ top: y - 700, behavior: 'instant' }); }); await p.waitForTimeout(800);
  await p.evaluate((n) => { const y = document.querySelector('[data-cs]').getBoundingClientRect().top + scrollY; window.scrollTo({ top: y - 60, behavior: 'smooth' }); }); await p.waitForTimeout(2200);
  await p.getByRole('button', { name: 'Next case study' }).click(); await p.waitForTimeout(1600);
  await p.getByRole('button', { name: 'Previous case study' }).click(); await p.waitForTimeout(1600);
  await p.getByRole('button', { name: 'Next case study' }).click(); await p.waitForTimeout(1200);
  await p.close(); await ctx.close();
  const ctx2 = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, recordVideo: { dir: recs, size: { width: 390, height: 844 } } }); const q = await ctx2.newPage();
  await q.goto(BASE + '/social-media-ads', { waitUntil: 'load' }); await q.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {}); const r2 = q.getByRole('button', { name: /reject analytics/i }); if (await r2.count()) await r2.click().catch(() => {});
  await q.evaluate(() => { const y = document.querySelector('[data-cs]').getBoundingClientRect().top + scrollY; window.scrollTo({ top: y - 700, behavior: 'instant' }); }); await q.waitForTimeout(800);
  await q.evaluate(() => { const y = document.querySelector('[data-cs]').getBoundingClientRect().top + scrollY; window.scrollTo({ top: y - 60, behavior: 'smooth' }); }); await q.waitForTimeout(2200);
  for (const n of ['Next case study', 'Next case study', 'Previous case study']) { await q.getByRole('button', { name: n }).click(); await q.waitForTimeout(1500); }
  await q.close(); await ctx2.close(); await b.close();
  const vids = fs.readdirSync(recs).filter((f) => f.endsWith('.webm')).map((f) => ({ f, t: fs.statSync(path.join(recs, f)).mtimeMs })).sort((a, b) => a.t - b.t);
  if (vids.length >= 2) { const [a, c] = vids.slice(-2); fs.renameSync(path.join(recs, a.f), path.join(recs, 'seo-mobile-navigation.webm')); fs.renameSync(path.join(recs, c.f), path.join(recs, 'meta-mobile-navigation.webm')); }
  console.log(fs.readdirSync(shots), fs.readdirSync(recs));
})();
