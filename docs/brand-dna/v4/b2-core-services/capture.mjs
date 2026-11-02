// Usage: node capture.mjs <baseUrl> <outDir> [widths=1440,390] [pages=all, comma list of keys; "nav" for the navigation]. Saves the B2 sections and the navigation as JPEGs named <width>-<page>-<part>.jpg.
import { mkdirSync, writeFileSync } from 'node:fs';
import { open, sleep } from './cdp.mjs';
const [base, out, ws = '1440,390', only = ''] = process.argv.slice(2);
const want = (k) => !only || only.split(',').includes(k);
mkdirSync(out, { recursive: true });
const L = (id) => `section[aria-labelledby="${id}"]`;
const PAGES = {
  services: ['/services', { hero: L('sx-h1'), core: '#services', which: L('sx-which'), work: L('sx-work'), terms: L('sx-terms'), steps: '.x2-steps', faq: L('sx-faq') }],
  'google-ads': ['/google-ads', { intent: L('ga41-intent-h'), types: L('ga41-types-h'), journey: L('ga41-jny-h'), price: L('ga41-price-h'), faq: L('ga41-faq-h') }],
  'social-media-ads': ['/social-media-ads', { journey: L('mr1-jny-h'), measure: L('mr1-mea-h'), price: L('mr22-price-h'), faq: L('mr1-faq-h') }],
  pricing: ['/pricing', { hero: L('prr-h1'), plans: L('prr-h-plans'), included: L('prr-h-included'), split: L('prr-h-split'), faq: L('prr-h-faq') }],
};
const b = await open();
const shot = async (name, sel) => {
  const r = await b.ev(`(async()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;e.scrollIntoView({block:'start'});await new Promise(r=>setTimeout(r,500));const x=e.getBoundingClientRect();return {y:x.top+scrollY,h:x.height}})()`);
  if (!r || r.h < 4) return console.log('missing', name, sel);
  const w = await b.ev('innerWidth');
  const d = await b.send('Page.captureScreenshot', { format: 'jpeg', quality: 68, captureBeyondViewport: true, clip: { x: 0, y: r.y, width: w, height: Math.min(r.h, 3600), scale: 1 } });
  writeFileSync(`${out}/${name}.jpg`, Buffer.from(d.result.data, 'base64'));
};
for (const w of ws.split(',').map(Number)) {
  await b.size(w, w > 700 ? 900 : 844);
  for (const [key, [path, parts]] of Object.entries(PAGES)) {
    if (!want(key)) continue;
    await b.go(base + path);
    for (const [part, sel] of Object.entries(parts)) await shot(`${w}-${key}-${part}`, sel);
  }
  if (!want('nav')) continue;
  // navigation on /seo, which must now mark Services current
  await b.go(base + '/seo');
  await b.ev('scrollTo(0,0)');
  if (w > 1023) {
    await b.ev(`document.querySelector('.dc-nav-svc .dc-svc-btn').click();0`); await sleep(500);
    const r = await b.ev(`(()=>{const p=document.querySelector('#dc-svc-panel').getBoundingClientRect();return {h:p.bottom+16}})()`);
    const d = await b.send('Page.captureScreenshot', { format: 'jpeg', quality: 75, clip: { x: 0, y: 0, width: w, height: r.h, scale: 1 } });
    writeFileSync(`${out}/${w}-nav-services-panel.jpg`, Buffer.from(d.result.data, 'base64'));
    await b.ev(`document.querySelector('.dc-nav-svc .dc-svc-btn').click();0`);
  } else {
    await b.ev(`document.querySelector('.dc-menu-btn').click();0`); await sleep(300);
    await b.ev(`document.querySelector('.dc-m-svc-btn').click();0`); await sleep(400);
    await shot(`${w}-nav-mobile-menu`, '.dc-hdr');
  }
  await shot(`${w}-nav-footer`, 'footer.dc-ftr');
}
b.close();
