// Compares the implemented page (step chosen by click) with the approved mockup frozen on the same step (?step=N).
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const sharp = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/sharp');
const [impl, mock] = process.argv.slice(2);
const diff = async (a, b) => { const A = await sharp(a).raw().toBuffer({ resolveWithObject: true }), B = await sharp(b).raw().toBuffer({ resolveWithObject: true }); if (A.info.height !== B.info.height || A.info.width !== B.info.width) return `size ${A.info.height} vs ${B.info.height}`; let d = 0; for (let i = 0; i < A.data.length; i += A.info.channels) if (Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]) > 24) d++; return (100 * d / (A.data.length / A.info.channels)).toFixed(3) + '%'; };
(async () => { const b = await chromium.launch(); const out = {};
  const CASES = [['journey', '.ax-jr-sec', 3], ['journey', '.ax-jr-sec', 5], ['scenario', '.ax-scn', 3], ['scenario', '.ax-scn', 4], ['reporting', '.ax-rp-sec', 3], ['reporting', '.ax-rp-sec', 2], ['industry', '.ax-ind', 4]];
  for (const [w, h] of [[1440, 900], [375, 812]]) for (const [k, sel, n] of CASES) {
    const shot = async (u, click) => { const c = await b.newContext({ viewport: { width: w, height: h } }); const p = await c.newPage(); await p.goto(u, { waitUntil: 'networkidle' }); await p.addStyleTag({ content: '[aria-labelledby="consent-banner-title"],[data-consent]{display:none!important} *{transition:none!important}' }); await p.evaluate((s) => document.querySelector(s).scrollIntoView(), sel); await p.waitForTimeout(500);
      if (click) { await p.locator(`${sel} button.ax-st-n`).nth(n - 1).click().catch(async () => { await p.locator(`${sel} .ax-chip`).first().click(); }); }
      await p.waitForTimeout(400); const f = `/tmp/r3i/sd-${k}-${n}-${w}-${click ? 'i' : 'm'}.png`; await p.locator(sel).first().screenshot({ path: f }); await c.close(); return f; };
    const a = await shot(impl, true); const m = await shot(`${mock}?banner=0&step=${n}`, false); out[`${k} step ${n} @${w}`] = await diff(a, m); }
  console.log(JSON.stringify(out, null, 1)); await b.close(); })();
