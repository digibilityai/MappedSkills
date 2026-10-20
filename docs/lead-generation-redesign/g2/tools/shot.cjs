// G2 captures. Run from the repository root: node docs/lead-generation-redesign/g2/tools/shot.cjs <url> <outDir>
// Requires playwright-core (a repository devDependency) and a Chromium that it can launch (npx playwright-core install chromium).
// Both the approved G1 mockup (serve docs/lead-generation-redesign/g1 with any static server and pass its /mockup/index.html?banner=0
// URL) and the G2 page (http://<host>:<port>/lead-generation from `next start` or `next dev`) are captured the same way: reduced motion emulated (every journey complete and still),
// fonts ready, at 1440x900, 1366x768, 1280x720, 1024x768 (tablet landscape), 768x1024 (tablet portrait), 390x844 and 320x640.
const { chromium } = require('playwright-core');
const fs = require('fs');
const [url, out] = process.argv.slice(2);
const names = ['1-hero', '2-problem', '3-what-we-do', '4-reach', '5-our-part', '6-questions', '7-close'];
fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch(); const res = {};
  for (const [w, h] of [[1440, 900], [1366, 768], [1280, 720], [1024, 768], [768, 1024], [390, 844], [320, 640]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && !/favicon/.test(m.text()) && errs.push(m.text()));
    await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
    // Remove what is not part of the page: the fixed analytics-consent bar and the Next.js dev badge (dev server only).
    await p.evaluate(() => { document.querySelectorAll('nextjs-portal').forEach((e) => e.remove()); document.querySelectorAll('body *').forEach((e) => { if (getComputedStyle(e).position === 'fixed' && /Analytics cookies/.test(e.textContent || '') && !e.querySelector('main')) e.remove(); }); });
    await p.screenshot({ path: `${out}/fold-${w}x${h}.png` });
    res[`${w}x${h}`] = await p.evaluate(() => { const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top + scrollY), bottom: Math.round(b.bottom + scrollY), h: Math.round(b.height) }; };
      const hero = r('main section'); const cta = r('main section .dc-actions');
      return { vh: innerHeight, hero, heroFits: hero.bottom <= innerHeight, ctaFits: cta.bottom <= innerHeight, overflowX: document.documentElement.scrollWidth > innerWidth, sw: document.documentElement.scrollWidth, pageH: document.documentElement.scrollHeight,
        secs: [...document.querySelectorAll('main section')].map((s) => [s.getAttribute('aria-labelledby'), Math.round(s.getBoundingClientRect().height)]), words: document.querySelector('main').innerText.split(/\s+/).filter(Boolean).length }; });
    res[`${w}x${h}`].errors = errs;
    if ([1440, 1024, 768, 390, 320].includes(w)) {
      await p.screenshot({ path: `${out}/full-${w}.png`, fullPage: true });
      const secs = await p.$$('main section');
      for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: `${out}/${w}-${names[i]}.png` });
    }
    await ctx.close();
  }
  fs.writeFileSync(`${out}/metrics.json`, JSON.stringify(res, null, 1));
  for (const k in res) { const x = res[k]; console.log(k, 'hero', x.hero.bottom, 'fits', x.heroFits, 'cta', x.ctaFits, 'ovx', x.overflowX, 'words', x.words, 'errs', x.errors.length, JSON.stringify(x.secs.map((s) => s[1]))); }
  await b.close();
})();
