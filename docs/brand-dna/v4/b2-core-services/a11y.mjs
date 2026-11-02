// Usage: node a11y.mjs <baseUrl>. Real Tab presses on the four B2 pages at 1440 and 390: every stop must show a focus ring and be on screen.
// Then: the Services panel by keyboard (ArrowDown) reaches "Also: SEO"; and under prefers-reduced-motion nothing is left pending or moving.
import { open, sleep } from './cdp.mjs';
const [base] = process.argv.slice(2);
const key = async (b, k, code, vk) => { await b.send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk }); await b.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk }); await sleep(40); };
// After each Tab: the focused element shows a ring and, brought into view, is the topmost element at its own centre (nothing covers it).
const probe = `(async()=>{const a=document.activeElement;if(!a||a===document.body)return null;a.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
 await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const s=getComputedStyle(a);const r=a.getBoundingClientRect();
 const ring=(s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>0)||(s.boxShadow&&s.boxShadow!=='none');
 const top=document.elementFromPoint(Math.min(Math.max(r.left+r.width/2,1),innerWidth-1),Math.min(Math.max(r.top+r.height/2,1),innerHeight-1));
 const vis=r.width>0&&r.height>0&&!!top&&(a===top||a.contains(top)||top.contains(a));
 return {t:(a.textContent||a.getAttribute('aria-label')||'').trim().slice(0,30),ring,vis,in:a.closest('.dc-hdr')?'hdr':a.closest('footer')?'ftr':'main'}})()`;
const b = await open();
let fail = 0;
for (const [w, h] of [[1440, 900], [390, 844]]) {
  await b.size(w, h);
  for (const p of ['/services', '/google-ads', '/social-media-ads', '/pricing']) {
    await b.send('Page.navigate', { url: base + p }); await sleep(2200);
    await b.ev(`document.querySelectorAll('[aria-labelledby="consent-banner-title"]').forEach(e=>e.remove());0`);
    const bad = []; let n = 0;
    for (let i = 0; i < 160; i++) { await key(b, 'Tab', 'Tab', 9); const r = await b.ev(probe); if (!r) break; n++; if (!r.ring || !r.vis) bad.push(r); }
    fail += bad.length;
    console.log(`${p} @${w}: ${n} stops, ${bad.length} without ring or off screen${bad.length ? ' ' + JSON.stringify(bad.slice(0, 4)) : ''}`);
  }
}
await b.size(1440, 900);
await b.send('Page.navigate', { url: base + '/services' }); await sleep(2000);
await b.ev(`document.querySelector('.dc-nav-svc .dc-svc-btn').focus();0`);
await key(b, 'ArrowDown', 'ArrowDown', 40);
const seq = [];
for (let i = 0; i < 5; i++) { seq.push(await b.ev(`document.activeElement.textContent.trim().replace(/\\s+/g,' ').slice(0,28)`)); await key(b, 'ArrowDown', 'ArrowDown', 40); }
console.log('Services panel by keyboard:', seq.join(' | '));
await key(b, 'Escape', 'Escape', 27);
console.log('Escape returns focus to:', await b.ev(`document.activeElement.className`), 'panel open:', await b.ev(`document.querySelector('#dc-svc-panel').dataset.open`));
b.close();
const rm = await open({ reducedMotion: true });
await rm.size(390, 844);
for (const p of ['/services', '/google-ads', '/social-media-ads', '/pricing']) {
  await rm.send('Page.navigate', { url: base + p }); await sleep(2200);
  const r = await rm.ev(`(()=>{const pend=document.querySelectorAll('[data-pending]').length;let anim=0;document.getAnimations().forEach(a=>{if(a.playState==='running')anim++});
    const hidden=[...document.querySelectorAll('main *')].filter(e=>{const s=getComputedStyle(e);return parseFloat(s.opacity)===0&&e.textContent.trim()&&!e.closest('[aria-hidden="true"],[hidden],[inert],[role="tabpanel"][data-active="false"]')}).map(e=>e.className).slice(0,4);return {pend,anim,hidden}})()`);
  console.log(`reduced motion ${p}: pending=${r.pend} running animations=${r.anim} invisible text blocks=${r.hidden.length} ${r.hidden.join(',')}`);
}
rm.close();
console.log(fail ? `FAIL ${fail}` : 'PASS keyboard');
