// Guards for the /social-media-ads copy (owner-approved Paid Social refinement, 2026-10-16). Copy and structure only:
// the five responsibilities, the tracking limitation, the separate management fee, the suitability and exclusion
// commitments, the unchanged H1/metadata/CTA, and no claims the page must not make.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const plain = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
const page = read('app/(pages)/social-media-ads/page.tsx');
const source = read('components/cplus/social-media-ads/content.ts').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const literal = source.slice(source.indexOf('=', source.indexOf('SA_PLAIN')) + 1).trim().replace(/;\s*$/, '');
const SA = JSON.parse(JSON.stringify(new Function(`return (${literal});`)()), (k, v) => (typeof v === 'string' ? plain(v) : v));
const all = [];
(function walk(v) { if (typeof v === 'string') all.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); })(SA);
const text = all.join(' ');

test('H1, metadata and CTA are unchanged', () => {
  assert.equal(`${SA.h1.a} ${SA.h1.b}`, 'Paid social, judged on the enquiries it produces.');
  assert.equal(SA.primary, "Tell us what you're trying to fix");
  assert.ok(page.includes("'Paid Social, Judged on the Enquiries It Produces | MappedSkills'"));
  assert.ok(page.includes("'/social-media-ads'"));
});

test('the hero paragraph is the approved sentence pair', () => {
  assert.equal(SA.lede, "We run social media ads where they make business sense, and we'll tell you when they don't. We focus on the enquiries they generate, not just views, likes or clicks.");
});

test('five responsibilities in the approved order; the last is the landing-page review', () => {
  assert.deepEqual(SA.scope.map((s) => s.t), ['Choose who sees it', 'Set up the campaigns', 'Try different ads', 'Pace the budget', 'Check where they land']);
  assert.equal(SA.scope[2].d, 'We test messages and visuals when enough people see them to compare.');
  assert.equal(SA.scope[4].d, 'We review the page people reach after clicking and recommend improvements that could help turn visits into enquiries.');
});

test('tracking limitation and separate management fee are kept', () => {
  assert.equal(SA.scopeMeas, 'Where technically possible, we set up tracking for meaningful enquiry actions, not just clicks.');
  assert.equal(SA.billing, 'Your ad spend goes directly to the platform. Our management fee is separate.');
});

test('suitability commitments and the three exclusions are kept', () => {
  assert.equal(SA.noes.length, 3);
  assert.ok(SA.noes[0].d.includes('search ads instead'));
  assert.ok(SA.noes[2].t.includes('social media pages'));
  assert.ok(SA.close.body.includes('whether social ads are right for your business'));
});

test('the disclaimer is the approved wording', () => {
  assert.equal(SA.principle, "We won't claim one advertising channel works better than another for your business before seeing your results.");
  assert.equal(SA.principleD, 'Without that evidence, it would be a guess.');
});

test('no results, figures, guarantees or testimonials', () => {
  assert.equal(/\d+\s?%|guarantee|testimonial|ROAS|\bROI\b|results in \d/i.test(text), false);
});
