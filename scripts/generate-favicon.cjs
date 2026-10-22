#!/usr/bin/env node
/**
 * Regenerates the browser-icon set in public/ from the approved vector M mark.
 *
 *   node scripts/generate-favicon.cjs [outDir]      (default: public/)
 *
 * Source of truth: the mark (path + circle, #FF5F24) inside
 * public/mappedskills-wordmark-light-bg.svg, copied verbatim (DEC-069). Nothing is
 * redrawn or resampled from a raster.
 *
 * Output
 *   icon.svg, favicon-16x16.png, favicon-32x32.png, favicon.ico (16/32/48),
 *   icon-192.png, icon-512.png, icon-1024.png   transparent
 *   apple-touch-icon.png, icon-maskable-512.png OPAQUE white on purpose: iOS fills
 *     transparency with black and Android maskable icons need a full-bleed background.
 *   site.webmanifest
 */
const fs = require('node:fs');
const path = require('node:path');
// sharp is not a direct dependency; it resolves from Next's own install. Dev-time only.
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const out = path.resolve(process.argv[2] || publicDir);
const wordmark = fs.readFileSync(path.join(publicDir, 'mappedskills-wordmark-light-bg.svg'), 'utf8');
const mark = wordmark.match(/<path fill="#FF5F24"[^>]*\/>/)[0] + '\n' + wordmark.match(/<circle[^>]*\/>/)[0];

// The mark spans x 19.2-121.8, y 14.7-113.9 (stroke included), centre (70.5, 64.3).
// A 116-unit square leaves about 0.9px of clear edge at 16px.
const VIEWBOX = '12.5 6.3 116 116';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" width="512" height="512">\n<title>MappedSkills</title>\n${mark}\n</svg>\n`;
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

async function render(size, pad = 0, background = CLEAR) {
  const inner = Math.round(size * (1 - 2 * pad));
  const mk = await sharp(Buffer.from(svg), { density: 72 * Math.max(1, (inner / 512) * 8) })
    .resize(inner, inner).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mk }]).png().toBuffer();
}

function ico(entries) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(entries.length, 4);
  let offset = 6 + 16 * entries.length;
  const dir = entries.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e[0] = size; e[1] = size;
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });
  return Buffer.concat([head, ...dir, ...entries.map((e) => e.png)]);
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const w = (name, data) => fs.writeFileSync(path.join(out, name), data);
  const small = { 16: await render(16), 32: await render(32), 48: await render(48) };
  w('icon.svg', svg);
  w('favicon-16x16.png', small[16]);
  w('favicon-32x32.png', small[32]);
  w('favicon.ico', ico([16, 32, 48].map((size) => ({ size, png: small[size] }))));
  w('icon-192.png', await render(192));
  w('icon-512.png', await render(512));
  w('icon-1024.png', await render(1024));
  w('apple-touch-icon.png', await render(180, 0.18, WHITE));
  w('icon-maskable-512.png', await render(512, 0.2, WHITE));
  w('site.webmanifest', JSON.stringify({
    name: 'MappedSkills',
    short_name: 'MappedSkills',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    theme_color: '#FF5F24',
    background_color: '#FFFFFF',
    display: 'browser',
  }, null, 2) + '\n');
  console.log(`favicon set written to ${out}`);
})();
