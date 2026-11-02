// Usage: node capture.mjs <baseUrl> <outDir>
// Drives headless Chrome over CDP: for each page and width, saves the header, the case showcase and the footer as JPEGs.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
const [base, out] = process.argv.slice(2);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + Math.floor(Math.random() * 500);
mkdirSync(out, { recursive: true });
const proc = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--no-first-run', '--hide-scrollbars', `--user-data-dir=/private/tmp/claude-501/b1-chrome-${port}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
for (let i = 0; i < 50; i++) { try { const t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const pg = t.find((x) => x.type === 'page'); if (pg) { ws = new WebSocket(pg.webSocketDebuggerUrl); break; } } catch {} await sleep(200); }
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;
const pages = { home: '/', 'google-ads': '/google-ads', 'social-media-ads': '/social-media-ads', services: '/services', work: '/work', d2c: '/who-we-help/d2c', seo: '/seo' };
const widths = [[1440, 900], [390, 844], [360, 800]];
const shot = async (name, sel, vh) => {
  const r = await ev(`(async()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;e.scrollIntoView({block:'start'});await new Promise(r=>setTimeout(r,700));const b=e.getBoundingClientRect();return {x:b.left+scrollX,y:b.top+scrollY,w:b.width,h:b.height}})()`);
  if (!r || r.h < 4) return false;
  const h = Math.min(r.h, 3200);
  const d = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70, captureBeyondViewport: true, clip: { x: 0, y: r.y, width: r.w + r.x, height: h, scale: 1 } });
  writeFileSync(`${out}/${name}.jpg`, Buffer.from(d.result.data, 'base64'));
  return true;
};
for (const [w, h] of widths) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
  for (const [key, path] of Object.entries(pages)) {
    await send('Page.navigate', { url: base + path });
    await sleep(2500);
    await ev(`document.querySelectorAll('.consent-banner').forEach(e=>e.remove());0`);
    await ev(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}scrollTo(0,0);0})()`);
    await sleep(500);
    const base_ = `${w}-${key}`;
    await shot(`${base_}-header`, '.dc-hdr');
    await shot(`${base_}-showcase`, 'section.cs');
    await shot(`${base_}-footer`, 'footer.dc-ftr');
  }
}
ws.close(); proc.kill();
