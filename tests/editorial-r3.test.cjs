// Guards for the editorial R3 implementation (blog, press, research): the related-article rule, the headline-emphasis helper, dynamic authors and
// dates, whole images, preserved anchors, and unchanged metadata, structured data and data fetching.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { load } = require('./helpers/ts-loader.cjs');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const head = (p) => execFileSync('git', ['show', `HEAD:${p}`], { cwd: root, encoding: 'utf8' });
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
  for (const p of ['app/(pages)/blog/page.tsx', 'app/(pages)/blog/[slug]/page.tsx', 'app/(pages)/press/[slug]/page.tsx', 'app/(pages)/research/page.tsx']) {
    assert.strictEqual(read(p), head(p), p);
  }
  /* /press: only the additive read of the latest release's recorded findings (existing getter); metadata untouched */
  const pm = (s) => s.slice(s.indexOf('export const metadata'), s.indexOf('export default'));
  assert.strictEqual(pm(read('app/(pages)/press/page.tsx')), pm(head('app/(pages)/press/page.tsx')));
  assert.match(read('app/(pages)/press/page.tsx'), /getPressReleaseBySlug\(releases\[0\]\.slug\)/);
  assert.ok(!/ContentfulGraphql|contentfulGraphql|fetch\(/.test(code(read('app/(pages)/press/page.tsx'))), 'no new query');
  const cur = read('app/(pages)/research/[slug]/page.tsx');
  const old = head('app/(pages)/research/[slug]/page.tsx');
  const meta = (s) => s.slice(s.indexOf('export async function generateMetadata'), s.indexOf('function CategoryPage'));
  assert.ok(meta(cur).length > 500);
  assert.strictEqual(meta(cur), meta(old), 'research slug metadata and report JSON-LD are untouched');
  assert.match(cur, /routeTrailJsonLd\(trail\)/, 'category breadcrumb JSON-LD kept');
});

test('data fetching and Contentful queries are unchanged except the approved additive fields', () => {
  const q = read('lib/contentful/queries.ts');
  const now = new Set(q.split('\n'));
  const removed = head('lib/contentful/queries.ts').split('\n').filter((l) => l.trim() && !now.has(l));
  assert.deepStrictEqual(removed, [], 'no existing query line was removed or altered');
  assert.ok(!/mutation|publish\(|createEntry/i.test(code(read('lib/contentful/posts.ts'))), 'read-only');
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
