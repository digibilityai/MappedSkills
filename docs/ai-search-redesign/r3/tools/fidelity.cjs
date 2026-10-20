// Captures the implemented page and the approved mockup section by section for visual comparison. node fidelity.cjs <pageUrl> <mockUrl> <outDir>
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const [page, mock, out] = process.argv.slice(2);
const SEC = [['industry', '.ax-ind'], ['scenario', '.ax-scn'], ['journey', '.ax-jr-sec'], ['reporting', '.ax-rp-sec'], ['record', '.ax-evi']];
(async () => { const b = await chromium.launch();
  for (const [tag, w, h] of [['1440', 1440, 900], ['375', 375, 812]]) for (const [k, u] of [['impl', page], ['mock', mock + '?banner=0&motion=reduce']]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); const p = await c.newPage(); await p.goto(u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    await p.addStyleTag({ content: '[aria-labelledby="consent-banner-title"]{display:none!important}' }); await p.waitForTimeout(700);
    for (const [n, sel] of SEC) await p.locator(sel).first().screenshot({ path: `${out}/${k}-${n}-${tag}.png` });
    await p.screenshot({ path: `${out}/${k}-full-${tag}.png`, fullPage: true });
    console.log(k, tag, await p.evaluate(() => document.documentElement.scrollHeight)); await c.close(); }
  await b.close(); })();
