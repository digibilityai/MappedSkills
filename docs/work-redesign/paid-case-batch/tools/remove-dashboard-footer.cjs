// Removes ONLY the footer sentence ("Recreated agency dashboard using reported campaign totals. Revenue return is not profit.") from the
// AnybodyCanBake Google Ads dashboard image (owner instruction, 30 October 2026). The rest of the artwork is byte-for-byte the decoded
// source. Text pixels inside the footer rectangle (anything darker than the paper) are grown by 3 px and refilled row by row from the
// nearest untouched pixels on each side, which suits the flat, lightly graded background. The original is kept in source-originals/.
// Usage: node remove-dashboard-footer.cjs <original.webp> <output.webp>
const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));
const RECT = [285, 934, 1015, 978]; // x0, y0, x1, y1 (the sentence spans about x 290 to 1000, y 942 to 968)
(async () => {
  const [src, dest] = process.argv.slice(2);
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, out = Buffer.from(data);
  const lum = (i) => 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
  const mask = new Uint8Array(W * info.height);
  for (let y = RECT[1]; y < RECT[3]; y++) for (let x = RECT[0]; x < RECT[2]; x++) if (lum((y * W + x) * 3) < 232) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) mask[(y + dy) * W + x + dx] = 1;
  for (let y = RECT[1] - 4; y < RECT[3] + 4; y++) {
    for (let x = RECT[0] - 4; x < RECT[2] + 4; x++) {
      if (!mask[y * W + x]) continue;
      let l = x; while (mask[y * W + l]) l--; let r = x; while (mask[y * W + r]) r++;
      const t = (x - l) / (r - l);
      for (let c = 0; c < 3; c++) out[(y * W + x) * 3 + c] = Math.round(data[(y * W + l) * 3 + c] * (1 - t) + data[(y * W + r) * 3 + c] * t);
    }
  }
  await sharp(out, { raw: { width: W, height: info.height, channels: 3 } }).webp({ quality: 90, effort: 6 }).toFile(dest);
  console.log('wrote', dest);
})();
