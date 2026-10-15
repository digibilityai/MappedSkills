// Reconciles the homepage AI visibility chart's counts with the published Reckona AI totals (no framework needed).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const src = fs.readFileSync(path.join(__dirname, '../components/cplus/home/ai-visibility-data.ts'), 'utf8');
const rows = {};
for (const m of src.matchAll(/key: '(\w+)',\s*label: '[^']+',\s*notMentioned: (\d+),\s*total: (\d+)/g)) {
  rows[m[1]] = { n: Number(m[2]), t: Number(m[3]) };
}

test('filters carry the verified counts', () => {
  assert.deepStrictEqual(rows.all, { n: 141, t: 210 });
  assert.deepStrictEqual(rows.manufacturing, { n: 18, t: 25 });
  assert.deepStrictEqual(rows.realEstate, { n: 14, t: 20 });
  assert.deepStrictEqual(rows.d2c, { n: 16, t: 25 });
});

test('"Other sectors" reconciles with the published total', () => {
  const { all, manufacturing, realEstate, d2c, other } = rows;
  assert.strictEqual(other.n, all.n - manufacturing.n - realEstate.n - d2c.n);
  assert.strictEqual(other.t, all.t - manufacturing.t - realEstate.t - d2c.t);
});
