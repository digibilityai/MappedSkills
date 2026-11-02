// Usage: node a11y-check.mjs <baseUrl>. Real Tab presses over headless Chrome: every stop in the header, showcase and footer must show a focus ring
// and keep the DOM order; then prefers-reduced-motion: reduce on the showcase (no transition, nothing held back).
import { spawn } from 'node:child_process';
const base = process.argv[2];
const port = 9800 + Math.floor(Math.random() * 100);
const proc = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, '--no-first-run', `--user-data-dir=/private/tmp/claude-501/b1-chrome-a11y-${port}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pend = new Map();
for (let i = 0; i < 50; i++) { try { const t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const p = t.find((x) => x.type === 'page'); if (p) { ws = new WebSocket(p.webSocketDebuggerUrl); break; } } catch {} await sleep(200); }
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
const key = (type) => send('Input.dispatchKeyEvent', { type, key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
const results = {};
for (const [w, h] of [[1440, 900], [390, 844]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
  for (const path of ['/', '/google-ads', '/seo']) {
    await send('Page.navigate', { url: base + path }); await sleep(2500);
    await ev(`document.querySelectorAll('.consent-banner').forEach(e=>e.remove());document.activeElement.blur();scrollTo(0,0);0`);
    const stops = []; let guard = 0;
    for (;;) {
      await key('rawKeyDown'); await key('keyUp'); await sleep(25);
      const s = await ev(`(()=>{const e=document.activeElement;if(!e||e===document.body)return null;const c=getComputedStyle(e);const r=e.closest('.dc-hdr')?'header':e.closest('.cs')?'showcase':e.closest('.dc-ftr')?'footer':'page';const ring=(c.outlineStyle!=='none'&&parseFloat(c.outlineWidth)>0)||c.boxShadow!=='none';const b=e.getBoundingClientRect();return {r,ring,vis:b.width>0&&b.height>0,t:(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,24)}})()`);
      if (!s) break; stops.push(s); if (++guard > 200) break;
      if (s.r === 'footer' && /Analytics preferences/.test(s.t)) { /* continue to end of footer */ }
    }
    const reg = (r) => stops.filter((s) => s.r === r);
    results[`${w}${path}`] = { stops: stops.length, header: reg('header').length, showcase: reg('showcase').length, footer: reg('footer').length, noRing: stops.filter((s) => (s.r !== 'page') && !s.ring).map((s) => `${s.r}:${s.t}`), order: [...new Set(stops.map((s) => s.r))].join('>') };
  }
}
// reduced motion
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const rm = {};
for (const path of ['/google-ads', '/seo']) {
  await send('Page.navigate', { url: base + path }); await sleep(2500);
  rm[path] = await ev(`(()=>{const s=document.querySelector('section.cs');if(!s)return 'no showcase';const img=s.querySelector('.cs-img'),rule=s.querySelector('.cs-rule'),all=s.querySelector('.cs-all'),card=s.querySelector('.cs-card');const c=(e)=>getComputedStyle(e);return {motionAttr:s.dataset.csMotion||null,imgClip:c(img).clipPath,imgTransition:c(img).transitionDuration,ruleTransform:c(rule).transform,ruleTransition:c(rule).transitionDuration,allTransition:c(all).transitionDuration,cardTransition:c(card).transitionDuration}})()`);
}
console.log(JSON.stringify({ keyboard: results, reducedMotion: rm }, null, 1));
ws.close(); proc.kill();
