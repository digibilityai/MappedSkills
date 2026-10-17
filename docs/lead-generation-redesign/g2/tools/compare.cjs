// G1 vs G2 visual comparison. node compare.cjs [screenshotsDir]   (default ./screenshots; needs <dir>/g1 and <dir>/g2 from shot.cjs, plus storyboard/ from storyboard.cjs and initial.cjs; writes <dir>/compare)
// For every capture present in both screenshots/g1 and screenshots/g2: pixel difference (any channel differing by more than 8/255) and,
// where the pair differs, a side-by-side image (G1 left, G2 right, difference in the middle, red = different).
const { chromium } = require('playwright-core');
const fs = require('fs');
const D = process.argv[2] || 'screenshots';
fs.mkdirSync(`${D}/compare`, { recursive: true });
const sb = fs.existsSync(`${D}/g1/storyboard`) ? fs.readdirSync(`${D}/g1/storyboard`).filter((f) => f.endsWith('.png') && fs.existsSync(`${D}/g2/storyboard/${f}`)).map((f) => 'storyboard/' + f) : [];
const files = sb.concat(fs.readdirSync(`${D}/g1`).filter((f) => f.endsWith('.png') && fs.existsSync(`${D}/g2/${f}`) && (!/^full-/.test(f) || /^full-(1440|390)\.png$/.test(f)))).sort();
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const rows = [];
  for (const f of files) {
    const a = fs.readFileSync(`${D}/g1/${f}`).toString('base64'), c = fs.readFileSync(`${D}/g2/${f}`).toString('base64');
    const r = await p.evaluate(async ([a, c]) => {
      const load = (s) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = 'data:image/png;base64,' + s; });
      const [A, C] = [await load(a), await load(c)]; const w = Math.max(A.width, C.width), h = Math.max(A.height, C.height);
      const cv = (i) => { const k = document.createElement('canvas'); k.width = w; k.height = h; const x = k.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(i, 0, 0); return x.getImageData(0, 0, w, h); };
      const [da, dc] = [cv(A), cv(C)]; let n = 0; const out = document.createElement('canvas'); out.width = w; out.height = h; const ox = out.getContext('2d'); const od = ox.createImageData(w, h);
      for (let i = 0; i < da.data.length; i += 4) { const d = Math.max(Math.abs(da.data[i] - dc.data[i]), Math.abs(da.data[i + 1] - dc.data[i + 1]), Math.abs(da.data[i + 2] - dc.data[i + 2])); const bad = d > 8; if (bad) n++; od.data[i] = bad ? 255 : 235; od.data[i + 1] = bad ? 0 : 235; od.data[i + 2] = bad ? 0 : 235; od.data[i + 3] = 255; }
      ox.putImageData(od, 0, 0);
      let sbs = null; if (n > 0 && w * h < 6e6) { const s = document.createElement('canvas'); s.width = w * 3 + 40; s.height = h; const sx = s.getContext('2d'); sx.fillStyle = '#888'; sx.fillRect(0, 0, s.width, s.height); sx.drawImage(A, 0, 0); sx.drawImage(out, w + 20, 0); sx.drawImage(C, 2 * w + 40, 0); sbs = s.toDataURL('image/png').split(',')[1]; }
      return { w, h, sizeG1: [A.width, A.height], sizeG2: [C.width, C.height], diffPx: n, pct: +(100 * n / (w * h)).toFixed(3), sbs };
    }, [a, c]);
    if (r.sbs) fs.writeFileSync(`${D}/compare/${f.replace('.png', '').replace('/', '-')}-g1-diff-g2.png`, Buffer.from(r.sbs, 'base64')); delete r.sbs;
    rows.push({ file: f, ...r }); console.log(f.padEnd(30), r.sizeG1.join('x') === r.sizeG2.join('x') ? 'same size' : `SIZE ${r.sizeG1} vs ${r.sizeG2}`, r.pct + '%');
  }
  fs.writeFileSync(`${D}/compare/summary.json`, JSON.stringify(rows, null, 1)); await b.close();
})();
