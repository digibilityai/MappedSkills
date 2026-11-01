// Web copies of the three client logos supplied 31 October 2026 (approved by the owner for these cases). Sources are never modified. Same recipe as the register's
// other copies (lib/clients.ts): empty margin cropped, longest side capped at 800 px, lossless WebP, colours and proportions untouched.
//  - mbp (Meticulous Business Plan): white ground removed (flood fill from the border only, so enclosed whites such as the (R) stay), like the existing transparent copy.
//  - talreja-talreja: same white-ground removal; the white strokes inside the dark roundel are enclosed and stay.
//  - bblewrap: supplied white on black; the black ground is the logo's own, so it is kept (as for EKoching and Hut N Homes), only the empty margin is cropped.
// Usage: node prepare-logos.cjs <mbp.png> <talreja.jpg> <bblewrap.jpg> <outDir>
const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));
async function keyWhite(file, pad) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info; const min = (i) => Math.min(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);
  const bg = new Uint8Array(W * H), stack = [];
  const push = (x, y) => { const i = y * W + x; if (!bg[i] && min(i) >= 242) { bg[i] = 1; stack.push(i); } };
  for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); } for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
  while (stack.length) { const i = stack.pop(), x = i % W, y = (i / W) | 0; if (x > 0) push(x - 1, y); if (x < W - 1) push(x + 1, y); if (y > 0) push(x, y - 1); if (y < H - 1) push(x, y + 1); }
  const rgba = Buffer.alloc(W * H * 4); let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; let a = 255;
    if (bg[i]) a = 0; else {
      // soft edge: a pixel touching the removed ground fades by how close to white it is
      let near = false; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H && bg[yy * W + xx]) near = true; }
      if (near) a = Math.round(255 * Math.min(1, (255 - min(i)) / 90));
    }
    rgba[i * 4] = data[i * 3]; rgba[i * 4 + 1] = data[i * 3 + 1]; rgba[i * 4 + 2] = data[i * 3 + 2]; rgba[i * 4 + 3] = a;
    if (a > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
  return sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 });
}
(async () => {
  const [mbp, tal, bble, out] = process.argv.slice(2);
  const save = async (img, name) => { const r = await img.resize({ width: 800, withoutEnlargement: true }).webp({ lossless: true, effort: 6 }).toFile(path.join(out, name)); console.log(name, r.width, r.height, Math.round(r.size / 1024) + 'KB'); };
  await save(await keyWhite(mbp, 4), 'mbp.webp');
  await save(await keyWhite(tal, 4), 'talreja-talreja.webp');
  // bblewrap: crop the black margin around the mark with an even border of the logo's own ground
  await save(sharp(bble).extract({ left: 470, top: 380, width: 1060, height: 290 }), 'bblewrap.webp');
})();
