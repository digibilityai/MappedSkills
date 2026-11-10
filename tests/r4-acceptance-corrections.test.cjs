// Guards for the R4 acceptance corrections (DEC-125): 30-day SEO audit credit from one source, mobile header stability
// (F-03), case-study link underline (F-04), keyboard-reachable scroll regions (F-05) and the /services Measure label (F-06).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

test('SEO audit credit: 30 days, one source, used by /seo and /pricing', () => {
  const { load } = require('./helpers/ts-loader.cjs');
  const data = load('components/seo-packages/data.ts');
  assert.strictEqual(data.SEO_AUDIT_CREDIT_DAYS, 30);
  assert.match(data.SEO_AUDIT.credit, /within 30 days of audit completion\. The credit is applied once and is not refundable in cash\.$/);
  const pricing = load('components/pricing-r2/content.ts').PRICING_R2;
  const faq = JSON.stringify(pricing);
  assert.match(faq, /within 30 days of audit completion\./);
  const seo = read('components/cplus/seo/content.ts');
  assert.ok(seo.includes('${SEO_AUDIT_CREDIT_TERM}'), '/seo FAQ uses the shared credit term');
  const pricingSrc = read('components/pricing-r2/content.ts');
  assert.ok(pricingSrc.includes('${SEO_AUDIT_CREDIT_TERM}'), '/pricing FAQ uses the shared credit term');
});

test('no application source still states a 90-day audit credit', () => {
  let hits = '';
  try {
    hits = execFileSync('git', ['grep', '-nE', 'within 90 days|90 days of audit', '--', 'app', 'components', 'lib'], { cwd: root, encoding: 'utf8' }).trim();
  } catch (e) {
    if (e.status !== 1) throw e; // git grep exits 1 when nothing matches
  }
  assert.strictEqual(hits, '');
});

test('approved prices are unchanged', () => {
  const { load } = require('./helpers/ts-loader.cjs');
  const data = load('components/seo-packages/data.ts');
  assert.deepStrictEqual(data.SEO_PLANS.map((p) => p.fee), ['₹19,999', '₹34,999', '₹59,999']);
  assert.strictEqual(data.SEO_AUDIT.fee, '₹14,999');
  const ledger = load('components/pricing-r2/content.ts').PRICING_R2.hero.ledger.map((r) => [r.k, r.v]);
  assert.deepStrictEqual(ledger, [
    ['Google Ads', '₹14,999'], ['Meta Ads', '₹14,999'], ['Google Ads + Meta Ads', '₹26,999'],
    ['SEO Foundation', '₹19,999'], ['SEO Growth', '₹34,999'], ['SEO Scale', '₹59,999'],
  ]);
});

test('F-03: the open mobile menu bar keeps its full width', () => {
  assert.match(read('app/direction-c.css'), /\.dc-hdr\.dc-menu-open \.dc-bar \{ flex: none; width: 100%; \}/);
});

test('F-04 and F-05: legacy case-study links underlined; scroll regions focusable and named', () => {
  const src = read('components/case-study/CaseStudyContent.tsx');
  assert.match(src, /className="text-accent underline underline-offset-4/);
  const regions = src.match(/overflow-x-auto[^>]*?role="region"\s+aria-label="[^"]+"\s+tabIndex=\{0\}/g) || [];
  assert.strictEqual(regions.length, 2);
});

test('F-06: /services Measure label uses the small-text accent step', () => {
  assert.match(read('components/paid-advertising/services/services.css'), /\.x3-measure b \{ color: var\(--resolve-accent-dark\);/);
});
