// Builds the 2.6:1 desktop derivatives (1672 x 643) of the four supplied 16:9 heroes (31 October 2026) as PLAIN CROPS.
//
// Why: the case-study stage is 2.6:1 on desktop (components/case-study/case-study.css). Unlike the earlier batches, these four headlines are
// short enough that one vertical window of the supplied picture keeps the whole headline above the lower fifth, which the website leaves
// free for the outlined client name. So no pixel is repainted, moved or scaled: the derivative is the supplied file cut to a 1672 x 643
// window starting `top` pixels down. Narrow screens show the supplied hero whole and the sharing image is the supplied hero.
//
// Usage: node docs/work-redesign/final-four/tools/make-wide-heroes-final-four.cjs <dir with <name>-hero.png> <out dir>
// Output: <name>-hero-wide.png (lossless); converted to WebP by convert-assets-final-four.cjs. Sources are never modified.
const path = require('node:path');
const sharp = require(path.join(__dirname, '../../../../node_modules/sharp'));

const W = 1672, H = 643;
// top = first source row of the window. The headline occupies the rows listed and must end above row top + 514 (80% of 643).
const WINDOWS = {
  'wanderlooms-meta-ads': { top: 150 }, // headline rows 265-530
  'ameba-software-seo': { top: 90 }, // headline rows 270-600
  'insuryo-organic-growth': { top: 70 }, // headline rows 155-490
  'classpe-social-media': { top: 95 }, // headline rows 205-605
};

(async () => {
  const [srcDir, outDir] = process.argv.slice(2);
  if (!srcDir || !outDir) throw new Error('usage: make-wide-heroes-final-four.cjs <hero dir> <out dir>');
  for (const [name, { top }] of Object.entries(WINDOWS)) {
    const file = path.join(outDir, `${name}-hero-wide.png`);
    const meta = await sharp(path.join(srcDir, `${name}-hero.png`)).metadata();
    if (meta.width !== W || top + H > meta.height) throw new Error(`${name}: unexpected source ${meta.width}x${meta.height}`);
    await sharp(path.join(srcDir, `${name}-hero.png`)).extract({ left: 0, top, width: W, height: H }).png().toFile(file);
    console.log(file);
  }
})();
