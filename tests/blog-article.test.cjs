// Guards for /blog/[slug] (owner-approved BL-D6 G1 design, implemented in G2): one heading-id rule for the contents list
// and the rendered headings (unique ids, the live slugs kept); the approved main-heading rule; metadata, canonical and
// structured data untouched; the legacy conversion blocks, newsletter, avatar and hard-coded author role gone; one close
// with the approved /blog copy and CTA pair; related services and related articles kept; no analytics in the share
// line; a stylesheet that cannot reach other pages; RichTextContent (shared with /press) untouched by this route.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

const page = read('app/(pages)/blog/[slug]/page.tsx');
const body = read('components/cplus/blog-article/ArticleBody.tsx');
const rich = read('components/cplus/blog-article/ArticleRichText.tsx');
const share = read('components/cplus/blog-article/ArticleShare.tsx');
const content = read('components/cplus/blog-article/content.ts');
const css = read('components/cplus/blog-article/article.css');
const mappers = read('lib/contentful/mappers.ts');
const blogContent = read('components/cplus/blog/content.ts');

function load(rel) {
  const out = ts.transpileModule(read(rel), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } });
  const m = { exports: {} };
  new Function('module', 'exports', 'require', out.outputText)(m, m.exports, require);
  return m.exports;
}
const H = load('lib/contentful/heading-ids.ts');

test('heading slug is the production rule, so existing #heading links keep working', () => {
  assert.equal(H.headingSlug('Why MappedSkills Is Different'), 'why-mappedskills-is-different');
  assert.equal(H.headingSlug('What is an Email List?'), 'what-is-an-email-list');
  assert.equal(H.headingSlug('Facebook Ads vs Google Ads: Which One Should You Choose?'), 'facebook-ads-vs-google-ads-which-one-should-you-choose');
  assert.equal(H.headingSlug('Month 1: Audit, Baseline, Priorities'), 'month-1-audit-baseline-priorities');
  // The same function body as the live renderer's slugify (components/blog/RichTextContent.tsx).
  const live = read('components/blog/RichTextContent.tsx');
  for (const step of [".replace(/[^a-z0-9\\s-]/g, '')", ".replace(/[\\s_-]+/g, '-')", ".replace(/^-+|-+$/g, '')"]) {
    assert.ok(live.includes(step) && read('lib/contentful/heading-ids.ts').includes(step), step);
  }
});

test('ids are unique per document and never empty', () => {
  const idFor = H.createHeadingIdAllocator();
  assert.deepEqual(['FAQs', 'Conclusion', 'FAQs', 'faqs!', '', '???', 'Conclusion'].map(idFor),
    ['faqs', 'conclusion', 'faqs-2', 'faqs-3', 'section', 'section-2', 'conclusion-2']);
  const again = H.createHeadingIdAllocator();
  assert.equal(again('FAQs'), 'faqs', 'a new document starts again');
});

test('nodeText reads marks and hyperlinks', () => {
  const node = { nodeType: 'heading-2', content: [
    { nodeType: 'text', value: 'Why ' }, { nodeType: 'hyperlink', content: [{ nodeType: 'text', value: 'SEO' }] }, { nodeType: 'text', value: ' matters' }] };
  assert.equal(H.nodeText(node), 'Why SEO matters');
  assert.equal(H.nodeText(null), '');
});

test('main headings: H2s when there are at least three, otherwise H2 + H3, never H4', () => {
  const mk = (levels) => levels.map((level, i) => ({ id: 'h' + i, text: 't' + i, level }));
  assert.deepEqual(H.mainHeadings(mk([2, 3, 2, 3, 2])).map((i) => i.level), [2, 2, 2]);
  assert.deepEqual(H.mainHeadings(mk([2, 3, 3, 3])).map((i) => i.level), [2, 3, 3, 3]);
  assert.deepEqual(H.mainHeadings(mk([2, 2, 3])).map((i) => i.level), [2, 2, 3]);
  assert.deepEqual(H.mainHeadings([]), []);
});

test('contents list and rendered headings share the allocator, in the same order', () => {
  const m = code(mappers);
  assert.ok(!/section-\$\{index\}/.test(m), 'the old section-N ids are gone');
  assert.match(m, /const idFor = createHeadingIdAllocator\(\);/);
  assert.match(m, /const id = idFor\(raw\);\s*const text = raw\.trim\(\);\s*if \(!text\) continue;/, 'allocate before skipping an empty heading');
  const r = code(rich);
  assert.match(r, /const idFor = createHeadingIdAllocator\(\);/);
  assert.match(r, /\[BLOCKS\.HEADING_2\]: \(node, children\) => <h2 id=\{idFor\(nodeText\(node\)\)\}>/);
  assert.match(r, /\[BLOCKS\.HEADING_3\]: \(node, children\) => <h3 id=\{idFor\(nodeText\(node\)\)\}>/);
  assert.equal((r.match(/idFor\(/g) || []).length, 2, 'only H2 and H3 take ids');
  assert.match(code(body), /href=\{`#\$\{item\.id\}`\}/);
  assert.match(code(body), /const contents = mainHeadings\(post\.tableOfContents\);/);
});

test('metadata, canonical, structured data, revalidation and the 404 branch are unchanged', () => {
  for (const s of [
    'export const revalidate = 60;', 'export async function generateStaticParams()', 'return getBlogStaticParams();',
    "robots: 'noindex, nofollow'", 'const title = post.metaTitle || post.title;', 'const description = post.metaDescription || post.excerpt;',
    'canonical: post.canonicalUrl', "type: 'article'", 'publishedTime: post.publishedAtISO', 'modifiedTime: post.updatedAtISO',
    "card: 'summary_large_image'", "'@type': 'Article'", "'@type': 'FAQPage'", "'@type': 'BreadcrumbList'",
    'generateArticleSchema(post, canonicalUrl)', 'generateBreadcrumbSchema(post)', 'notFound();',
    'const relatedServices = getRelatedServices(post.slug);', 'const relatedPosts = await getRelatedBlogCards(post);',
  ]) assert.ok(page.includes(s), s);
  assert.match(page, /<ArticleBody post=\{post\} services=\{relatedServices\} related=\{relatedPosts\} \/>/);
});

test('legacy conversion blocks, newsletter, avatar and the hard-coded author role are gone', () => {
  const p = code(page) + code(body);
  for (const gone of ['BlogHero', 'TableOfContents', 'RichTextContent', 'CTABlock', 'StickySidebarCTA', 'RelatedServices', 'RelatedPosts',
    'AuthorBio', 'BlogNewsletterForm', 'CTASection', 'SocialShare', 'BlogIntroduction', 'Performance Marketing Strategist',
    'performance marketing insights', 'dicebear', 'Growth Insights', 'mailing list']) assert.ok(!new RegExp('\\b' + gone + '\\b').test(p), gone);
  assert.ok(!/\bbook\b/i.test(code(content) + code(body)), 'no "book" label in the template');
  for (const bad of [/Discovery/i, /\bfree\b/i, /guarantee/i, /\d+\s?%/, /\d+ minutes/i]) assert.ok(!bad.test(code(content)), String(bad));
  assert.match(code(body), /\{A\.by\} <strong>\{post\.author\.name\}<\/strong>/, 'byline is the Contentful author name');
  assert.ok(!/profileUrl|<img/.test(code(body)), 'no author image');
});

test('one close: the approved /blog copy and CTA pair', () => {
  for (const s of ["h: 'Reading about a problem you have?'", "body: 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.'",
    "primary: 'Tell us about your business'", "secondary: 'Request a call'"]) {
    assert.ok(content.includes(s), s);
    assert.ok(blogContent.includes(s), 'same as /blog: ' + s);
  }
  assert.equal((code(body).match(/<ActionPair /g) || []).length, 1);
  assert.match(body, /<ActionPair primaryLabel=\{c\.primary\} secondaryLabel=\{c\.secondary\} \/>/);
  assert.ok(!/href="\/(contact|schedule-call)"/.test(code(body)), 'no other contact or booking link in the template');
});

test('related services and related articles are kept', () => {
  const b = code(body);
  assert.match(b, /\{services\.length > 0 && \(/);
  assert.match(b, /services\.map\(\(s\) =>/);
  assert.match(b, /href=\{s\.link\}/);
  assert.match(b, /\{related\.length > 0 && \(/);
  assert.match(b, /related\.map\(\(r\) =>/);
  assert.ok(read('lib/blog-services.ts').includes("'seo-company-in-pune': ['/seo']"), 'approved per-slug map unchanged');
});

test('contents: rail at wide, closed native disclosure below, both only with two or more items', () => {
  const b = code(body);
  assert.match(b, /const hasContents = contents\.length >= 2;/);
  assert.match(b, /<nav className="ba-rail" aria-labelledby="ba-toc-l">/);
  assert.match(b, /<details className="ba-tocm">/);
  assert.ok(!/<details[^>]* open/.test(b), 'mobile panel starts closed');
  assert.match(css, /@media \(min-width: 1081px\) \{\s*\.ba-rail \{ display: block; position: sticky; top: 24px;/);
  assert.match(css, /@media \(min-width: 1081px\) \{ \.ba-tocm \{ display: none; \} \}/);
});

test('share line keeps the destinations and sends no analytics', () => {
  for (const s of ['linkedin.com/sharing/share-offsite/?url=', 'facebook.com/sharer/sharer.php?u=', 'twitter.com/intent/tweet?text=', '- MappedSkills Marketing'])
    assert.ok(share.includes(s), s);
  assert.ok(!/gtag|dataLayer|track\(|analytics/i.test(code(share)), 'no analytics');
  assert.match(share, /target="_blank" rel="noopener noreferrer"/);
});

test('150 ms feedback, tangerine focus, reduced motion and forced colours', () => {
  const durations = [...css.matchAll(/(\d+)ms/g)].map((m) => Number(m[1]));
  assert.ok(durations.length >= 8 && durations.every((d) => d === 150), String(durations));
  assert.match(css, /outline: 3px solid var\(--dc-tang\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\) \{ html:has\(\.ba-body\) \{ scroll-behavior: smooth; \} \}/);
  assert.match(css, /@media \(forced-colors: active\)/);
});

test('every stylesheet rule is scoped to a ba- class', () => {
  const bare = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let depth = 0;
  for (const ch of bare) { if (ch === '{') depth++; if (ch === '}') depth--; assert.ok(depth >= 0, 'unbalanced }'); }
  assert.equal(depth, 0, 'balanced braces');
  assert.ok(!/\}\s*[^{}@/\s][^{}]*;\s*\}/.test(bare), 'no orphan declarations outside a rule');
  const rules = bare.match(/[^{}]+\{/g) || [];
  assert.ok(rules.length > 40);
  for (const r of rules) {
    const sel = r.slice(0, -1).trim();
    if (sel.startsWith('@')) continue;
    for (const part of sel.split(',')) assert.match(part, /\.ba-/, part.trim());
  }
});

test('RichTextContent is not used by the article route and keeps its classes', () => {
  /* /press/[slug] used to import it too; Press Detail G2 moved that page to its own renderer, and this file stays untouched. */
  const live = read('components/blog/RichTextContent.tsx');
  assert.match(live, /className="scroll-mt-28 text-2xl sm:text-3xl font-bold font-heading tracking-tight mt-10 mb-4"/);
  assert.ok(!/className=/.test(code(rich).replace(/className="ba-(prose|table)"/g, '')), 'article renderer adds no utility classes');
});
