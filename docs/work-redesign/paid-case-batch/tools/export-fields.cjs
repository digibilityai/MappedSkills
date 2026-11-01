// Writes the Contentful field values of the six case studies (from lib/case-study-local-batch.ts) as JSON for the later, separately
// authorised, owner-run Contentful work. Nothing is sent anywhere. Run from the repository root:
//   node docs/work-redesign/paid-case-batch/tools/export-fields.cjs
process.env.NODE_ENV = 'development';
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('../../../../tests/helpers/ts-loader.cjs');
const B = load('lib/case-study-local-batch.ts');
const out = B.batchPreviewEntries().map((e) => {
  const { sys, ...fields } = e;
  return { slug: e.slug, localPreviewId: sys.id, fields };
});
const dest = path.join(__dirname, '..', 'case-fields.json');
fs.writeFileSync(dest, JSON.stringify(out, null, 2) + '\n');
console.log(`wrote ${out.length} entries to ${dest}`);
