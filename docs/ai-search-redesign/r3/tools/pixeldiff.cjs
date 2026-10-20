// Pixel comparison of implemented vs approved-mockup section screenshots. node pixeldiff.cjs <dir>
const sharp = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/sharp');
const dir = process.argv[2];
(async () => { const res = {};
  for (const tag of ['1440', '375']) for (const n of ['industry', 'scenario', 'journey', 'reporting', 'record', 'full']) {
    const a = await sharp(`${dir}/impl-${n}-${tag}.png`).raw().toBuffer({ resolveWithObject: true }); const b = await sharp(`${dir}/mock-${n}-${tag}.png`).raw().toBuffer({ resolveWithObject: true });
    if (a.info.width !== b.info.width || a.info.height !== b.info.height) { res[`${n}-${tag}`] = `size differs ${a.info.height} vs ${b.info.height}`; continue; }
    let d = 0; const ch = a.info.channels; for (let i = 0; i < a.data.length; i += ch) if (Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]) > 24) d++;
    res[`${n}-${tag}`] = `${(100 * d / (a.data.length / ch)).toFixed(3)}% pixels differ`; }
  console.log(JSON.stringify(res, null, 1)); })();
