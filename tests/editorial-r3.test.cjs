// Guards for the editorial R3 implementation (blog, press, research): the related-article rule, the headline-emphasis helper, dynamic authors and
// dates, whole images, preserved anchors, and unchanged metadata, structured data and data fetching.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { load } = require('./helpers/ts-loader.cjs');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const sha = (t) => crypto.createHash('sha256').update(t).digest('hex');
/* THE PRESERVATION BASELINE IS COMMITTED, NOT READ FROM GIT. The redesign must leave these things exactly as they were before it (main at 1ebf7ba, 30 Oct 2026):
   the metadata, canonicals, robots and JSON-LD of the editorial routes, and every existing Contentful query line. They are pinned here by SHA-256 (route files and
   metadata blocks) and by a committed copy of the earlier query file (tests/fixtures/baseline/), so the check means the same in any checkout, including CI's, and
   fails the moment an approved-unchanged thing changes. Approving such a change means updating the pin on purpose. */
const BASELINE = {
  unchangedRouteFiles: {
    'app/(pages)/blog/page.tsx': '033b446b4469165d18b37c2f3e8454979003f442e53f6d29f096e4f0c2be35f3',
    'app/(pages)/blog/[slug]/page.tsx': 'db34a686ad9f65f3e9636b8aa2263479fd1042a7f80ee51c0b9ee4333622bbcd',
    'app/(pages)/press/[slug]/page.tsx': '50bf22ee98ea6c7f794cda9507d68f5b7211492ec1452c3d3ffad85f474eb6c2',
    'app/(pages)/research/page.tsx': '6db062d6b3ab10ff9809f04e937ba1cbf5d4a56fc428f503a3f096d3d4622b9f',
  },
  pressMetadataBlock: '34efba5d4efc4d3c0715c82dbdc2892b9d2477fa5b5b187555144947a39a14b5',
  researchSlugMetadataBlock: 'd2c5e41f81f019106f4fc0fc9efb394b4b0b93ae0a87b5b155a645dfac78cf12',
  queriesFixture: 'tests/fixtures/baseline/contentful-queries.at-1ebf7ba.txt',
};
const pressMeta = (s) => s.slice(s.indexOf('export const metadata'), s.indexOf('export default'));
const researchMeta = (s) => s.slice(s.indexOf('export async function generateMetadata'), s.indexOf('function CategoryPage'));
/** Every non-empty line of the earlier query file that is no longer present, counting repeats (a line that occurs twice must still occur twice): an existing query line removed or altered. */
const removedQueryLines = (baselineText, currentText) => {
  const have = new Map(); for (const l of currentText.split('\n')) have.set(l, (have.get(l) ?? 0) + 1);
  return baselineText.split('\n').filter((l) => l.trim() && (have.get(l) ?? 0) > 0 ? (have.set(l, have.get(l) - 1), false) : l.trim() !== '');
};
const { selectRelated, RELATED_LIMIT } = load('lib/blog-related.ts');
const { splitAfterMarker } = load('lib/headline-emphasis.ts');

const card = (slug, over = {}) => ({ slug, title: slug, href: `/blog/${slug}`, category: 'Topic', categorySlug: 'topic', publishedAtISO: '2026-01-01T00:00:00Z', updatedAtISO: '', ...over });

test('related articles: same topic first, then newest; never the current article or a duplicate; at most two', () => {
  const cur = { slug: 'cur', categorySlug: 'seo' };
  const all = [
    card('cur', { categorySlug: 'seo' }),
    card('old-seo', { categorySlug: 'seo', publishedAtISO: '2025-01-01T00:00:00Z' }),
    card('new-ads', { categorySlug: 'ads', publishedAtISO: '2026-09-01T00:00:00Z' }),
    card('new-seo', { categorySlug: 'seo', publishedAtISO: '2026-05-01T00:00:00Z' }),
    card('new-seo', { categorySlug: 'seo', publishedAtISO: '2026-05-01T00:00:00Z' }),
    card('mid-ads', { categorySlug: 'ads', publishedAtISO: '2026-06-01T00:00:00Z' }),
  ];
  const r = selectRelated(cur, all);
  assert.strictEqual(RELATED_LIMIT, 2);
  assert.deepStrictEqual(r.map((c) => c.slug), ['new-seo', 'old-seo'], 'same topic first, newest first');
  assert.ok(!r.some((c) => c.slug === 'cur'));
  const none = selectRelated({ slug: 'cur', categorySlug: 'x' }, all);
  assert.deepStrictEqual(none.map((c) => c.slug), ['new-ads', 'mid-ads'], 'no same-topic article: newest overall');
  assert.deepStrictEqual(selectRelated(cur, [card('cur')]), [], 'nothing else to show');
  assert.strictEqual(selectRelated(cur, [card('cur'), card('a')]).length, 1);
});

test('"Two more guides" is used only when exactly two related articles are available', () => {
  const b = code(read('components/cplus/blog-article/ArticleBody.tsx'));
  assert.match(b, /const keep = related\.length === 2 \? A\.keep\.two : related\.length === 1 \? A\.keep\.one : null;/);
  const c = read('components/cplus/blog-article/content.ts');
  assert.match(c, /two: \{ a: 'Two more', b: 'guides\.' \}/);
  assert.match(c, /one: \{ a: 'One more', b: 'guide\.' \}/);
});

test('headline emphasis keeps the recorded text exactly', () => {
  for (const t of ['Plain headline', 'A: the rest of it', 'Site | Name here', 'Ends with colon:', 'The Gap: What 120 Sites Show: And More', ':leading', '  spaced:  out ']) {
    const s = splitAfterMarker(t);
    assert.strictEqual(s.before + s.emphasis, t, t);
  }
  assert.deepStrictEqual(splitAfterMarker('Plain headline'), { before: 'Plain headline', emphasis: '' });
  assert.strictEqual(splitAfterMarker('A: the rest').emphasis, 'the rest');
});

test('authors and dates are read from the article; nothing is hardcoded', () => {
  const b = code(read('components/cplus/blog-article/ArticleBody.tsx'));
  assert.match(b, /post\.author\.name/);
  assert.match(b, /post\.publishedDate|post\.updatedDate/);
  assert.ok(!/\b(20\d\d)\b/.test(b), 'no year literal');
  assert.ok(!/October|November|September|January/.test(b), 'no month literal');
  const r = code(read('components/cplus/press-release/PressReleaseBody.tsx'));
  assert.match(r, /release\.publishedDate/);
  assert.ok(!/\b20\d\d\b/.test(r));
});

test('release anchors: the pd-h-ev alias is kept at the merged evidence section', () => {
  const r = read('components/cplus/press-release/PressReleaseBody.tsx');
  assert.match(r, /aria-labelledby=\{mid \?\? 'pd-h-ev'\}/);
  assert.match(r, /id: merged \? headingIdOf\(merged\)! : 'pd-h-ev'/);
  assert.match(r, /id="pd-h-ev"|'pd-h-ev'/);
});

test('report anchors are all still present', () => {
  const b = read('components/cplus/research-report/ReportBody.tsx');
  for (const id of ['findings', 'executive-summary', 'methodology', 'limitations', 'cite', 'rr-h-sum', 'rr-h-method', 'rr-h-limits', 'rr-h-cite']) assert.ok(b.includes(`"${id}"`) || b.includes(`'${id}'`) || b.includes(`id="${id}"`), id);
});

test('metadata, canonicals, robots and JSON-LD sources are unchanged in the route files', () => {
  for (const [p, want] of Object.entries(BASELINE.unchangedRouteFiles)) assert.strictEqual(sha(read(p)), want, `${p}: an approved-unchanged route file changed`);
  /* /press: only the additive read of the latest release's recorded findings (existing getter); metadata untouched */
  assert.strictEqual(sha(pressMeta(read('app/(pages)/press/page.tsx'))), BASELINE.pressMetadataBlock, '/press metadata block changed');
  assert.match(read('app/(pages)/press/page.tsx'), /getPressReleaseBySlug\(releases\[0\]\.slug\)/);
  assert.ok(!/ContentfulGraphql|contentfulGraphql|fetch\(/.test(code(read('app/(pages)/press/page.tsx'))), 'no new query');
  const cur = read('app/(pages)/research/[slug]/page.tsx');
  assert.ok(researchMeta(cur).length > 500);
  assert.strictEqual(sha(researchMeta(cur)), BASELINE.researchSlugMetadataBlock, 'research slug metadata and report JSON-LD are untouched');
  assert.match(cur, /routeTrailJsonLd\(trail\)/, 'category breadcrumb JSON-LD kept');
});

test('data fetching and Contentful queries are unchanged except the approved additive fields', () => {
  const base = read(BASELINE.queriesFixture);
  assert.ok(base.split('\n').length > 400, 'the committed baseline is the whole earlier query file');
  assert.deepStrictEqual(removedQueryLines(base, read('lib/contentful/queries.ts')), [], 'no existing query line was removed or altered');
  assert.ok(!/mutation|publish\(|createEntry/i.test(code(read('lib/contentful/posts.ts'))), 'read-only');
});

test('the preservation checks fail on an unintended change (each guard is proven, not assumed)', () => {
  const route = read('app/(pages)/blog/page.tsx');
  assert.notStrictEqual(sha(route.replace(/createMetadata\(\s*(['"`])/, '$&X')), BASELINE.unchangedRouteFiles['app/(pages)/blog/page.tsx'], 'a changed title in an unchanged route file is caught');
  assert.notStrictEqual(sha(route + '\n'), BASELINE.unchangedRouteFiles['app/(pages)/blog/page.tsx'], 'even a whitespace-only edit is caught');
  const press = read('app/(pages)/press/page.tsx');
  assert.notStrictEqual(sha(pressMeta(press.replace("'Press | MappedSkills'", "'Press | Changed'"))), BASELINE.pressMetadataBlock, 'an edit inside the press metadata block is caught');
  assert.strictEqual(sha(pressMeta(press.replace('export default', 'export default // redesigned body'))), BASELINE.pressMetadataBlock, 'a change AFTER the metadata block (the redesigned body) is allowed');
  const rs = read('app/(pages)/research/[slug]/page.tsx');
  assert.notStrictEqual(sha(researchMeta(rs.replace('generateMetadata', 'generateMetadata /* x */ '))), BASELINE.researchSlugMetadataBlock, 'an edit to the research slug metadata block is caught');
  const base = read(BASELINE.queriesFixture); const q = read('lib/contentful/queries.ts');
  const lines = q.split('\n'); const i = lines.findIndex((l) => /postCollection/.test(l));
  assert.ok(i > 0); assert.deepStrictEqual(removedQueryLines(base, [...lines.slice(0, i), ...lines.slice(i + 1)].join('\n')).length > 0, true, 'a deleted query line is caught');
  assert.deepStrictEqual(removedQueryLines(base, q.replace(/order: sys_firstPublishedAt_DESC/, 'order: sys_firstPublishedAt_ASC')).length > 0, true, 'an altered query line is caught');
  assert.deepStrictEqual(removedQueryLines(base, q + '\n  extraField'), [], 'an ADDED line (an approved additive field) is allowed');
});

test('images are shown whole and nothing is stretched', () => {
  const css = read('components/editorial/editorial.css');
  assert.ok(!/object-fit: cover/.test(css), 'no cropping');
  assert.match(css, /\.ed-stage img \{[^}]*height: auto/);
  assert.match(css, /\.pd-fig img|\.ed-shot img[^{]*\{[^}]*height: auto/);
});

test('production preview guards stay intact', () => {
  const g = read('lib/case-study-local-preview.ts');
  assert.ok(g.includes('NODE_ENV') || g.includes('production'), 'the preview switch still checks the environment');
});

test('the review material has no internal notes in the page copy', () => {
  for (const p of ['components/cplus/blog/content.ts', 'components/cplus/press/content.ts', 'components/cplus/research/content.ts', 'components/cplus/blog-article/content.ts']) {
    assert.ok(!/\b(TODO|FIXME|owner approved|R3|DEC-\d+)\b/.test(code(read(p))), p);
  }
});
