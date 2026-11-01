// Motion filmstrips for the proposal previews (revision 2; frames taken with motion enabled). Usage: node frames.cjs
const { chromium } = require('../../node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const shot = (p, name, clip) => p.screenshot({ path: `frames/${name}.png`, clip });
  const time = async (p, ts, fn) => { let last = 0; for (const t of ts) { await p.waitForTimeout(Math.max(10, t - last)); last = t; await fn(t); } };
  let ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' }); let p = await ctx.newPage();
  await p.goto('http://localhost:3601/blog.html', { waitUntil: 'networkidle' }); await p.evaluate(() => window.pvReplay());
  await time(p, [20, 160, 300, 560], (t) => shot(p, `blog-hero-${t}`, { x: 0, y: 130, width: 1440, height: 560 }));
  await ctx.close();
  ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' }); p = await ctx.newPage();
  await p.goto('http://localhost:3601/research.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => { const s = document.getElementById('finding'); window.scrollTo(0, s.getBoundingClientRect().top + scrollY + 120); });
  await time(p, [20, 150, 300, 700], (t) => shot(p, `research-field-${t}`, { x: 0, y: 0, width: 1440, height: 900 }));
  await ctx.close();
  ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' }); p = await ctx.newPage();
  await p.goto('http://localhost:3601/research.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => { const s = [...document.querySelectorAll('section')].find((x) => x.querySelector('.bars')); window.scrollTo(0, s.getBoundingClientRect().top + scrollY + 180); });
  await time(p, [20, 160, 320, 520, 950], (t) => shot(p, `research-bars-${t}`, { x: 0, y: 0, width: 1440, height: 800 }));
  await ctx.close(); await b.close();
})();
