#!/usr/bin/env node
// GATE 4 · B2 — route-parametric copy of gate-3-acceptance/evidence/final-run/cls-throttled-final.cjs.
// Only the route/width plan became arguments; the throttling profile, measurement and output line are unchanged.
// Profile: CDP 400 ms RTT, 50 000 B/s down/up, 4x CPU; motion allowed; consent declined; hasTouch below 800px; fresh context per run.
// usage: node cls-routes.cjs <base> <label> [runs=2] [routes=/,/services,/seo] [widths=320,...,1440]
// usage: node cls-throttled.cjs <base> <label> [runs]
const { chromium } = require('playwright-core'); // project devDependency (portability fix, 2026-10-08; previously an absolute path outside the repo; logic unchanged)
const [base, label, runs = '2', routeArg = '/,/services,/seo', widthArg = '320,360,390,430,768,1024,1440'] = process.argv.slice(2);
const PLAN = routeArg.split(',').map((r) => [r, widthArg.split(',').map(Number)]);
(async () => { const b = await chromium.launch();
  for (const [r, ws] of PLAN) for (const w of ws) { const vals = [];
    for (let i = 0; i < +runs; i++) {
      const c = await b.newContext({ viewport: { width: w, height: w < 800 ? 800 : 900 }, hasTouch: w < 800 });
      await c.addInitScript(() => { try { localStorage.setItem('ms.consent.v1', 'denied'); } catch (e) {}
        window.__cls = 0; window.__sh = []; window.__lcp = 0;
        new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; window.__sh.push(e.sources.map(s => s.node && (s.node.className && typeof s.node.className === 'string' ? s.node.nodeName + '.' + s.node.className.split(' ')[0] : s.node.nodeName)).join('+')); } }).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); });
      const p = await c.newPage(); const cdp = await c.newCDPSession(p); await cdp.send('Network.enable');
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 400, downloadThroughput: 50000, uploadThroughput: 50000 }); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await p.goto(base + r, { waitUntil: 'load', timeout: 180000 }); await p.waitForTimeout(4000);
      vals.push(await p.evaluate(() => { const f = performance.getEntriesByType('resource').filter(e => /\.woff2/.test(e.name)).map(e => [e.name.split('/').pop().slice(0, 8), Math.round(e.responseEnd), e.encodedBodySize || e.transferSize]);
        return { cls: window.__cls, src: [...new Set(window.__sh)].join(','), lcp: Math.round(window.__lcp), fonts: f }; })); await c.close(); }
    const big = vals[0].fonts.filter(f => f[2] > 60000).map(f => f[1]);
    console.log(`${label} ${r} @${w} CLS ${vals.map(v => v.cls.toFixed(3)).join(', ')} | LCP ms ${vals.map(v => v.lcp).join(', ')} | opsz face done ${big.length ? big[0] + 'ms' : 'n/a'} | fonts ${vals[0].fonts.length} | ${vals[0].src.slice(0, 90)}`); }
  await b.close(); })();
