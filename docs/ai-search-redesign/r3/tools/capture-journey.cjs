// G1 review: journey storyboard frames (?step=N), live timing check, a video of the real progression, reduced motion.
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs');
const out = process.argv[2], base = process.argv[3] || 'http://127.0.0.1:3191/index.html';
const sel = 'section[aria-labelledby="ax-h-jr"]';
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [375, 812, 'mobile']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    for (const s of ['1', '2', '3', '4', '5', 'done']) {
      await p.goto(`${base}?banner=0&step=${s}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(500);
      await (await p.$(sel)).screenshot({ path: `${out}/${tag}-step-${s}.png` });
    }
    await ctx.close();
    const rctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const rp = await rctx.newPage();
    await rp.goto(`${base}?banner=0`, { waitUntil: 'networkidle' });
    await (await rp.$(sel)).screenshot({ path: `${out}/${tag}-reduced-motion.png` });
    await rctx.close();
  }
  // live timing: scroll the journey into view and log every step change with a timestamp
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: out, size: { width: 1440, height: 900 } } });
  const p = await ctx.newPage();
  await p.goto(`${base}?banner=0`, { waitUntil: 'networkidle' });
  await p.evaluate(() => {
    window.__log = []; const t0 = performance.now();
    new MutationObserver(() => { const on = document.querySelector('.ax-st.is-on'); const all = [...document.querySelectorAll('.ax-st')];
      const k = on ? all.indexOf(on) + 1 : (document.querySelector('.ax-jr.is-complete') ? 'complete' : 'none');
      const last = window.__log[window.__log.length - 1]; if (!last || last.k !== k) window.__log.push({ k, t: Math.round(performance.now() - t0) }); })
      .observe(document.querySelector('[data-jr]'), { subtree: true, attributes: true, attributeFilter: ['class'] });
  });
  await p.evaluate(() => document.querySelector('section[aria-labelledby="ax-h-jr"]').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(12500);
  const log = await p.evaluate(() => window.__log);
  const btn = await p.evaluate(() => { const c = document.querySelector('[data-jr-ctl]'); return { text: c.innerText, label: c.getAttribute('aria-label'), hidden: c.hidden }; });
  const vid = await p.video().path();
  await ctx.close();
  fs.renameSync(vid, `${out}/journey-1440.webm`);
  const intervals = log.filter(e => typeof e.k === 'number' || e.k === 'complete').map((e, i, a) => i ? e.t - a[i - 1].t : null).slice(1);
  const res = { log, intervalsMs: intervals, buttonAtEnd: btn };
  fs.writeFileSync(`${out}/journey-timing.json`, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res));
  await b.close();
})();
