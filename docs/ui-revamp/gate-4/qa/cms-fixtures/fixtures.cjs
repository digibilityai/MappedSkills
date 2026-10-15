/**
 * GATE 4 · B0 — DETERMINISTIC CONTENTFUL FIXTURES (SYNTHETIC — NOT PRODUCTION CONTENT).
 *
 * Every entry here is invented test data, labelled "FIXTURE" in its title and
 * body, shaped exactly like the GraphQL responses the application's real
 * queries request (lib/contentful/queries.ts). It exists so the real rendering
 * path (contentfulGraphql → mappers → page → components) can be exercised
 * without credentials. It does NOT reproduce, paraphrase or approximate any
 * published MappedSkills article or case study, and no figure in it is a
 * client result.
 *
 * Sentinel strings ("FIXTURE-WITHHELD-…") let the harness prove that the
 * proof-withholding path (lib/case-study-proof.ts) keeps withheld values out of
 * the DOM and the RSC payload.
 *
 * Collections that are not fixtured (research, press) return EMPTY results, so
 * those templates render their empty/not-found states. That is labelled as
 * "not covered by fixtures" in the B0 report; it is not proof of rendering.
 */

const D = (content) => ({ nodeType: 'document', data: {}, content });
const t = (value, marks = []) => ({ nodeType: 'text', value, marks: marks.map((type) => ({ type })), data: {} });
const p = (...children) => ({ nodeType: 'paragraph', data: {}, content: children.map((c) => (typeof c === 'string' ? t(c) : c)) });
const h = (level, text) => ({ nodeType: `heading-${level}`, data: {}, content: [t(text)] });
const link = (uri, text) => ({ nodeType: 'hyperlink', data: { uri }, content: [t(text)] });
const li = (text) => ({ nodeType: 'list-item', data: {}, content: [p(text)] });
const ul = (...items) => ({ nodeType: 'unordered-list', data: {}, content: items.map(li) });
const ol = (...items) => ({ nodeType: 'ordered-list', data: {}, content: items.map(li) });
const quote = (text) => ({ nodeType: 'blockquote', data: {}, content: [p(text)] });
const hr = () => ({ nodeType: 'hr', data: {}, content: [] });
const cell = (text, header = false) => ({ nodeType: header ? 'table-header-cell' : 'table-cell', data: {}, content: [p(text)] });
const row = (cells, header = false) => ({ nodeType: 'table-row', data: {}, content: cells.map((c) => cell(c, header)) });
const table = (head, ...rows) => ({ nodeType: 'table', data: {}, content: [row(head, true), ...rows.map((r) => row(r))] });
const asset = (id) => ({ nodeType: 'embedded-asset-block', data: { target: { sys: { id, type: 'Link', linkType: 'Asset' } } }, content: [] });

const IMG = 'https://images.ctfassets.net/fixture-space/fixture-asset/fixture-image.png';
const sys = (id, first) => ({ id, firstPublishedAt: first, publishedAt: first });

const author = {
  name: 'FIXTURE Author',
  description: 'FIXTURE author description. Synthetic test data.',
  profile: { url: IMG, title: 'FIXTURE author image', description: 'FIXTURE author portrait (synthetic)' },
};
const category = { name: 'SEO', slug: 'seo' };

const POST_FULL = {
  sys: sys('fixture-post-1', '2026-01-15T09:00:00.000Z'),
  title: 'FIXTURE — Article exercising every rich-text node',
  seoTitle: 'FIXTURE — Article SEO title',
  keyword: 'fixture keyword',
  slug: 'fixture-article-full-structure',
  excerpt: 'FIXTURE excerpt. Synthetic test article used by the Gate 4 B0 regression harness.',
  author,
  category,
  featuredImage: { url: IMG, title: 'FIXTURE featured image', description: 'FIXTURE featured image alt text', width: 1600, height: 900 },
  content: {
    json: D([
      p('FIXTURE introduction paragraph with ', t('bold', ['bold']), ', ', t('italic', ['italic']), ' and ', t('code', ['code']), ' marks.'),
      h(2, 'FIXTURE section one'),
      p('Internal link: ', link('/seo', 'FIXTURE internal link'), '. External link: ', link('https://example.com/fixture', 'FIXTURE external link'), '.'),
      h(3, 'FIXTURE subsection'),
      ul('FIXTURE bullet one', 'FIXTURE bullet two'),
      ol('FIXTURE step one', 'FIXTURE step two'),
      quote('FIXTURE quotation text.'),
      hr(),
      table(['FIXTURE column A', 'FIXTURE column B'], ['FIXTURE a1', 'FIXTURE b1'], ['FIXTURE a2', 'FIXTURE b2']),
      asset('fixture-asset-1'),
      h(2, 'FIXTURE section two'),
      p('FIXTURE closing paragraph.'),
    ]),
    links: {
      assets: {
        block: [{ sys: { id: 'fixture-asset-1' }, url: IMG, title: 'FIXTURE embedded image', description: 'FIXTURE embedded image alt text', width: 1200, height: 675 }],
      },
    },
  },
};

const POST_MINIMAL = {
  sys: sys('fixture-post-2', '2026-01-10T09:00:00.000Z'),
  title: 'FIXTURE — Minimal article (fallback paths)',
  seoTitle: null,
  keyword: null,
  slug: 'fixture-article-minimal',
  excerpt: 'FIXTURE minimal excerpt.',
  author: null,
  category,
  featuredImage: null,
  content: { json: D([p('FIXTURE single paragraph.')]), links: { assets: { block: [] } } },
};

const caseContent = (tag) =>
  D([
    h(2, 'Problem statement'),
    p(`FIXTURE problem statement (${tag}).`),
    h(2, 'Business goals'),
    p(`FIXTURE business goals (${tag}).`),
    h(2, 'Challenges'),
    h(4, 'FIXTURE challenge title'),
    p(`FIXTURE challenge body (${tag}).`),
    h(2, 'Strategy and tactics'),
    p(`FIXTURE strategy paragraph (${tag}).`),
    h(2, 'Services provided'),
    h(4, 'FIXTURE service title'),
    p(`FIXTURE service body (${tag}).`),
    h(2, 'Tools and technologies'),
    h(4, 'FIXTURE tool title'),
    p(`FIXTURE tool body (${tag}).`),
    h(2, 'Results and metrics'),
    table(['Metric', 'Value'], [`FIXTURE metric label (${tag})`, `${tag === 'withheld' ? 'FIXTURE-WITHHELD-METRIC-77' : 'FIXTURE-OPEN-METRIC-41'}`]),
    h(3, 'Before and after'),
    table(['Metric', 'Before', 'After'], [`FIXTURE row (${tag})`, `${tag === 'withheld' ? 'FIXTURE-WITHHELD-BEFORE-10' : 'FIXTURE-OPEN-BEFORE-10'}`, `${tag === 'withheld' ? 'FIXTURE-WITHHELD-AFTER-20' : 'FIXTURE-OPEN-AFTER-20'}`]),
  ]);

const CASE_OPEN = {
  sys: sys('fixture-case-1', '2026-02-01T09:00:00.000Z'),
  title: 'FIXTURE — Case study, proof not withheld',
  slug: 'fixture-case-study-open',
  clientName: { clientName: 'FIXTURE Client A', date: '2026' },
  industry: { name: 'FIXTURE industry' },
  size: { size: 'FIXTURE size' },
  audience: { audience: 'FIXTURE audience' },
  targetArea: { target: 'FIXTURE target area' },
  review: { name: 'FIXTURE Reviewer A', testimonial: 'FIXTURE-OPEN-TESTIMONIAL text.' },
  content: { json: caseContent('open') },
  conclusion: { json: D([p('FIXTURE conclusion (open).')]) },
};

/* Uses a slug that lib/case-study-proof.ts withholds, with the `portfolio/`
   prefix some CMS entries carry, so the harness can prove (a) slug
   normalisation and (b) that withheld values never render. Title and body are
   synthetic and labelled; nothing here is the real entry's content. */
const CASE_WITHHELD = {
  sys: sys('fixture-case-2', '2026-01-20T09:00:00.000Z'),
  title: 'FIXTURE — Case study on a proof-withheld slug (synthetic)',
  slug: 'portfolio/google-ads-for-online-courses',
  clientName: { clientName: 'FIXTURE Client B', date: '2026' },
  industry: { name: 'FIXTURE industry' },
  size: { size: 'FIXTURE size' },
  audience: { audience: 'FIXTURE audience' },
  targetArea: { target: 'FIXTURE target area' },
  review: { name: 'FIXTURE-WITHHELD-REVIEWER', testimonial: 'FIXTURE-WITHHELD-TESTIMONIAL text.' },
  content: { json: caseContent('withheld') },
  conclusion: { json: D([p('FIXTURE conclusion (withheld).')]) },
};

const POSTS = [POST_FULL, POST_MINIMAL];
const CASES = [CASE_OPEN, CASE_WITHHELD];

const norm = (s) => s.replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');

/** Resolve one GraphQL request (by operation name) to a fixture `data` payload. */
function resolve(operation, variables = {}) {
  const v = variables;
  switch (operation) {
    case 'GetAllPosts':
      return { postCollection: { total: POSTS.length, items: POSTS.slice(0, v.limit ?? 100) } };
    case 'GetPostSlugs':
      return { postCollection: { items: POSTS.map((x) => ({ slug: x.slug })) } };
    case 'GetPostBySlug':
      return { postCollection: { items: POSTS.filter((x) => x.slug === v.slug).slice(0, 1) } };
    case 'GetRelatedPosts':
      return { postCollection: { items: POSTS.filter((x) => x.slug !== v.excludeSlug && x.category?.slug === v.categorySlug).slice(0, v.limit ?? 3) } };
    case 'GetAllCaseStudies':
      return { caseStudiesCollection: { total: CASES.length, items: CASES } };
    case 'GetCaseStudySlugs':
      return { caseStudiesCollection: { items: CASES.map((x) => ({ slug: x.slug })) } };
    case 'GetCaseStudyBySlug': {
      const wanted = new Set((v.slugs || []).map(norm));
      return { caseStudiesCollection: { items: CASES.filter((x) => wanted.has(norm(x.slug))).slice(0, 1) } };
    }
    default: {
      // Research, press and anything else: an empty collection of the right name.
      const m = /^Get\w*?(ResearchReport|ResearchCategor|ResearchFinding|PressRelease)/.exec(operation);
      const name = m
        ? { ResearchReport: 'researchReportCollection', ResearchCategor: 'researchCategoryCollection', ResearchFinding: 'researchFindingCollection', PressRelease: 'pressReleaseCollection' }[m[1]]
        : null;
      return name ? { [name]: { total: 0, items: [] } } : {};
    }
  }
}

module.exports = {
  resolve,
  FIXTURE_ROUTES: {
    blogFull: '/blog/fixture-article-full-structure',
    blogMinimal: '/blog/fixture-article-minimal',
    caseOpen: '/portfolio/fixture-case-study-open',
    caseWithheld: '/portfolio/google-ads-for-online-courses',
  },
  WITHHELD_SENTINELS: ['FIXTURE-WITHHELD-METRIC-77', 'FIXTURE-WITHHELD-BEFORE-10', 'FIXTURE-WITHHELD-AFTER-20', 'FIXTURE-WITHHELD-TESTIMONIAL', 'FIXTURE-WITHHELD-REVIEWER'],
  OPEN_SENTINELS: ['FIXTURE-OPEN-METRIC-41', 'FIXTURE-OPEN-TESTIMONIAL'],
  IMAGE_URL: IMG,
};
