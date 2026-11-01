// Rollout screenshots (DEC-116): section with neighbouring sections, desktop/tablet/mobile; PREFIX=local|production (BASE selects the server), plus one mobile recording locally.
const { chromium } = require('../../../../node_modules/playwright-core'); const path = require('path'); const fs = require('fs');
const BASE = process.env.BASE || 'http://localhost:3500'; const PREFIX = process.env.PREFIX || 'local'; const out = path.join(__dirname, '../rollout/screenshots'); const rec = path.join(__dirname, '../rollout/recordings');
const pages = [['/google-ads', 'google-ads'], ['/who-we-help/d2c', 'd2c'], ['/who-we-help/education', 'education'], ['/who-we-help/real-estate', 'real-estate'], ['/who-we-help/enquiry-led-businesses', 'enquiry-led']];
const exe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const open = async (ctx, url) => { const p = await ctx.newPage(); await p.goto(BASE + url, { waitUntil: 'load' }); await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {}); const r = p.getByRole('button', { name: /reject analytics/i }); if (await r.count()) await r.click().catch(() => {}); const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 500) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(40); } return p; };
(async () => {
  const b = await chromium.launch({ executablePath: exe });
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [820, 1180, 'tablet'], [390, 844, 'mobile']]) for (const [route, name] of pages) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500 }); const p = await open(ctx, route);
    const has = await p.evaluate(() => !!document.querySelector('[data-cs]') || !!document.querySelector('#client-work'));
    if (!has) { await ctx.close(); continue; }
    await p.evaluate(() => { const s = document.querySelector('[data-cs]') || document.querySelector('#client-work'); const r = s.getBoundingClientRect(); window.scrollTo({ top: r.top + scrollY - 40, behavior: 'instant' }); }); await p.waitForTimeout(1500);
    const box = await p.evaluate(() => { const r = (document.querySelector('[data-cs]') || document.querySelector('#client-work')).getBoundingClientRect(); return { y: r.top + scrollY, h: r.height }; });
    await p.screenshot({ path: path.join(out, `${PREFIX}-${name}-${tag}.png`), fullPage: true, clip: { x: 0, y: Math.max(0, box.y - 220), width: w, height: box.h + 440 } });
    await ctx.close();
  }
  if (PREFIX === 'local') for (const [route, name] of [['/who-we-help/education', 'education'], ['/google-ads', 'google-ads']]) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, recordVideo: { dir: rec, size: { width: 390, height: 844 } } }); const p = await ctx.newPage();
    await p.goto(BASE + route, { waitUntil: 'load' }); await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {}); const r = p.getByRole('button', { name: /reject analytics/i }); if (await r.count()) await r.click().catch(() => {});
    await p.evaluate(() => { const y = document.querySelector('[data-cs]').getBoundingClientRect().top + scrollY; scrollTo({ top: y - 700, behavior: 'instant' }); }); await p.waitForTimeout(800);
    await p.evaluate(() => { const y = document.querySelector('[data-cs]').getBoundingClientRect().top + scrollY; scrollTo({ top: y - 60, behavior: 'smooth' }); }); await p.waitForTimeout(2200);
    for (const n of ['Next case study', 'Next case study', 'Previous case study']) { await p.getByRole('button', { name: n }).click(); await p.waitForTimeout(1500); }
    const v = p.video(); await p.close(); await ctx.close(); fs.renameSync(await v.path(), path.join(rec, `${name}-mobile-navigation.webm`));
  }
  await b.close(); console.log(fs.readdirSync(out).filter((f) => f.startsWith(PREFIX)));
})();
