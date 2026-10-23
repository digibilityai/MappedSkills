// Guards for /press/[slug] (owner-approved Press Detail G1 design, THE EVIDENCE EDITORIAL, implemented in G2): metadata, JSON-LD and
// routing unchanged; the delivery-only data path untouched; no release-specific figure or sentence hard-coded; the evidence strip reads
// structured findings only (0 to 4, never prose, nothing invented); every presentation rule matches its shape AND rejects near-misses,
// and the page renders without the parts a release lacks.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
Module._extensions['.css'] = () => {};
/* next/font only works inside the Next compiler; the render tests need the page components, not the font files. */
const realLoad = Module._load;
Module._load = function (request, ...rest) {
  if (request === 'next/font/local' || request === 'next/font/google') return () => ({ className: '', variable: '', style: {} });
  return realLoad.call(this, request, ...rest);
};
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const page = read('app/(pages)/press/[slug]/page.tsx');
const dir = 'components/cplus/press-release/';
const body = read(dir + 'PressReleaseBody.tsx'), rich = read(dir + 'ReleaseRichText.tsx'), content = read(dir + 'content.ts'), css = read(dir + 'release.css'), rulesSrc = read(dir + 'release-rules.ts');
const X = load(dir + 'release-rules.ts');
const { PressReleaseBody } = load(dir + 'PressReleaseBody.tsx');

const T = (value, marks = []) => ({ nodeType: 'text', value, marks: marks.map((type) => ({ type })), data: {} });
const P = (...c) => ({ nodeType: 'paragraph', data: {}, content: c.map((x) => (typeof x === 'string' ? T(x) : x)) });
const H2 = (v) => ({ nodeType: 'heading-2', data: {}, content: [T(v)] });
const A = (uri, v) => ({ nodeType: 'hyperlink', data: { uri }, content: [T(v)] });
const LI = (...c) => ({ nodeType: 'list-item', data: {}, content: c });
const UL = (...items) => ({ nodeType: 'unordered-list', data: {}, content: items });
const embed = (id) => ({ nodeType: 'embedded-entry-block', data: { target: { sys: { id } } }, content: [] });
const finding = (id, over = {}) => ({ __typename: 'ResearchFinding', sys: { id }, statistic: `S${id}`, findingHeadline: `Headline ${id}`, description: `Desc ${id}`, baseSample: `Sample ${id}`, sourceNote: `Source ${id}`, ...over });
const docOf = (content, finds = []) => ({ document: { nodeType: 'document', data: {}, content }, links: { assets: { block: [] }, entries: { block: finds } } });

/* ------------------------------------------------------------ source guards -- */

test('metadata, JSON-LD identity, revalidation and static params are unchanged', () => {
  assert.match(page, /const title = release\.metaTitle;/);
  assert.match(page, /const description = release\.metaDescription;/);
  assert.match(page, /alternates: \{ canonical: release\.canonicalUrl \}/);
  assert.match(page, /type: 'article',\n\s*publishedTime: release\.publishedAtISO \|\| undefined,\n\s*modifiedTime: release\.updatedAtISO \|\| undefined,/);
  assert.match(page, /generateNewsArticleSchema\(\{\n\s*headline: release\.headline,\n\s*description: release\.metaDescription \|\| release\.excerpt,\n\s*url: release\.canonicalUrl,\n\s*image: release\.featuredImage\?\.url,\n\s*datePublished: release\.publishedAtISO \|\| undefined,\n\s*dateModified: release\.updatedAtISO \|\| undefined,\n\s*authorName: release\.author\?\.name,/);
  assert.match(page, /routeTrailJsonLd\(\[/);
  assert.match(page, /\{ name: release\.headline, href: `\/press\/\$\{release\.slug\}` \}/, 'BreadcrumbList keeps the full headline');
  assert.match(page, /export const revalidate = 60;/);
  assert.match(page, /getPressStaticParams/);
});

test('data comes only from the delivery-only getters; nothing new is queried, written or mapped', () => {
  assert.ok(page.includes("getPressReleaseBySlug } from '@/lib/contentful/press'") || page.includes('getPressReleaseBySlug'));
  for (const src of [code(body), code(rich), code(rulesSrc)]) assert.ok(!/graphql|contentfulGraphql|fetch\(/.test(src), 'no data access in components');
  assert.match(read('lib/contentful/press.ts'), /const DELIVERY_ONLY = \{ deliveryOnly: true \} as const;/);
});

test('nothing release-specific is hard-coded in the template', () => {
  const strip = (s) => s.replace(/\d+(\.\d+)?(px|rem|em|ch|ms|vw|%)\b/g, '');
  for (const src of [code(body), code(content), code(rich), code(rulesSrc)]) {
    assert.ok(!/\b(42\.5|97\.5|120|51|67|MSR|Amit|Gupta|Google Analytics|Marketing Measurement)\b/.test(strip(src)), 'no figure, name or title from any release');
  }
  assert.ok(!/dangerouslySetInnerHTML/.test(code(body) + code(rich)), 'no raw HTML from CMS text');
});

test('the strip never reads prose: figures come from embedded entries only', () => {
  assert.match(rulesSrc, /embedded-entry-block/);
  assert.ok(!/\.match\(|\.exec\(/.test(rulesSrc.split('/* ----------------------------------------------------------- text shapes -- */')[0].replace(/\/\*[\s\S]*?\*\//g, '')), 'the figure code has no text matching');
});

test('scoped CSS: pd- only, 150 ms feedback, reduced motion, no sticky, no script, no new tokens', () => {
  const sel = css.replace(/\/\*[\s\S]*?\*\//g, '').split('}').map((r) => r.split('{')[0].trim()).filter((s) => s && !s.startsWith('@') && !/^(from|to|\d+%)/.test(s));
  for (const s of sel) for (const one of s.split(',')) assert.ok(/(^|[\s>+~])[.#]?pd-|^\.pd-|^#pd-/.test(one.trim()) || /^\s*\.pd-/.test(one), `scoped: ${one.trim()}`);
  assert.ok(!/position:\s*sticky|position:\s*fixed/.test(css), 'no sticky or fixed');
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.ok((css.match(/\b\d+ms\b/g) || []).every((m) => m === '150ms'), 'only 150 ms transitions');
  assert.ok(!/<script|use client/.test(body + rich), 'no client code');
  assert.ok(!/#[0-9a-fA-F]{3,6}\b/.test(css.replace(/#fff\b/gi, '').replace(/var\([^)]*#[0-9A-Fa-f]{6}[^)]*\)/g, '')), 'colours come from tokens (white chart frame aside)');
});

test('breadcrumb keeps the full headline in the DOM; the hero H1 is the headline unchanged', () => {
  assert.match(body, /aria-current="page" className="pd-crumb-cur">\{release\.headline\}/);
  assert.match(body, /<h1 id="pd-h1" className=\{release\.headline\.length > LONG_HEADLINE \? 'b-h1 pd-h1 pd-h1-long' : 'b-h1 pd-h1'\}>/);
  assert.match(body, /\{headline\.before\}\s*<span className="b-named">\{headline\.emphasis\}<\/span>\s*\{headline\.after\}[\s\S]*release\.headline\s*\)\}\s*<\/h1>/, 'the h1 is the headline in up to three exact slices');
});

/* ------------------------------------------------------------- strip rules -- */

test('0 to 4 findings: the strip takes consecutive leading complete findings, at most four', () => {
  const finds = [1, 2, 3, 4, 5].map((n) => finding(String(n)));
  const base = [H2('x'), P('PUNE, INDIA — body')];
  for (const n of [0, 1, 2, 3, 4]) {
    const d = docOf([...finds.slice(0, n).map((f) => embed(f.sys.id)), ...base], finds);
    const r = X.splitLeadingFigures(d.document, d.links);
    assert.strictEqual(r.figures.length, n, `${n} findings`);
    assert.strictEqual(r.rest.length, base.length, 'the body is untouched');
  }
  const five = docOf([...finds.map((f) => embed(f.sys.id)), ...base], finds);
  const r5 = X.splitLeadingFigures(five.document, five.links);
  assert.strictEqual(r5.figures.length, 4, 'capped at four');
  assert.strictEqual(r5.rest[0].nodeType, 'embedded-entry-block', 'the fifth stays in the body');
});

test('figure fields are verbatim and trimmed; nothing is invented', () => {
  const f = finding('a', { statistic: ' 42.5% ', description: null, baseSample: '  ', sourceNote: undefined });
  const d = docOf([embed('a'), P('x')], [f]);
  const [fig] = X.splitLeadingFigures(d.document, d.links).figures;
  assert.deepStrictEqual({ ...fig }, { id: 'a', statistic: '42.5%', headline: 'Headline a', description: undefined, baseSample: undefined, sourceNote: undefined });
});

test('incomplete, unresolved and non-finding entries are never drawn as figures', () => {
  const noStat = finding('n', { statistic: '' }), noHead = finding('h', { findingHeadline: ' ' }), other = { __typename: 'Other', sys: { id: 'o' } };
  for (const bad of [noStat, noHead, other]) {
    const d = docOf([embed(bad.sys.id), P('x')], [bad]);
    const r = X.splitLeadingFigures(d.document, d.links);
    assert.strictEqual(r.figures.length, 0);
    assert.strictEqual(r.rest.length, 2, 'the entry stays in the body');
  }
  const unresolved = docOf([embed('missing'), P('x')], []);
  assert.strictEqual(X.splitLeadingFigures(unresolved.document, unresolved.links).figures.length, 0);
  const mixed = docOf([embed('1'), embed('n'), embed('3'), P('x')], [finding('1'), noStat, finding('3')]);
  const m = X.splitLeadingFigures(mixed.document, mixed.links);
  assert.strictEqual(m.figures.length, 1, 'extraction stops at the first incomplete finding');
  assert.strictEqual(m.rest.length, 3);
});

test('a number in prose is never turned into a figure; a finding after the body starts is not hoisted', () => {
  const prose = docOf([P('42.5% of 120 websites showed no observable analytics.'), embed('1')], [finding('1')]);
  assert.strictEqual(X.splitLeadingFigures(prose.document, prose.links).figures.length, 0);
  assert.strictEqual(X.splitLeadingFigures(null, undefined).figures.length, 0);
  const gaps = docOf([P(''), embed('1'), P(' '), embed('2'), P('x')], [finding('1'), finding('2')]);
  assert.strictEqual(X.splitLeadingFigures(gaps.document, gaps.links).figures.length, 2, 'blank paragraphs between embeds are ignored');
});

/* --------------------------------------------------------- shape rules -- */

test('dateline: an upper-case place line then a dash; near-misses are plain paragraphs', () => {
  assert.deepStrictEqual({ ...X.parseDateline(P('PUNE, INDIA — MappedSkills has published.')) }, { dateline: 'PUNE, INDIA —', rest: 'MappedSkills has published.' });
  assert.ok(X.parseDateline(P('NEW DELHI – A study found.')));
  for (const no of ['Pune, India — mixed case', 'Note — something', 'A study — of things', 'PUNE INDIA without a dash', 'THIS IS A FAR TOO LONG UPPER CASE OPENING LINE FOR A DATELINE — x'])
    assert.strictEqual(X.parseDateline(P(no)), null, no);
  assert.strictEqual(X.parseDateline(P('PUNE, INDIA — ', A('https://x', 'linked'))), null, 'a paragraph with a link is left alone');
});

test('ledger: every item "Label: text"; a plain list, a single item, a long label or a link stays a list', () => {
  const li = (t) => LI(P(t));
  assert.deepStrictEqual(X.parseLabelLedger(UL(li('Google Analytics: Observable on 55.8%.'), li('Meta Pixel: Observable on 35.8%.'))).map((r) => r.term), ['Google Analytics', 'Meta Pixel']);
  assert.strictEqual(X.parseLabelLedger(UL(li('A plain bullet.'), li('Another plain bullet.'))), null);
  assert.strictEqual(X.parseLabelLedger(UL(li('Only: one item'))), null);
  assert.strictEqual(X.parseLabelLedger(UL(li('One: a'), li('Two items but the second is plain'))), null, 'all items must match');
  assert.strictEqual(X.parseLabelLedger(UL(li('This label is much too long to be a label at all: x'), li('B: y'))), null);
  assert.strictEqual(X.parseLabelLedger(UL(LI(P('Label: see ', A('https://x', 'link'))), li('B: y'))), null, 'a link keeps the list as it is');
  assert.strictEqual(X.parseLabelLedger({ nodeType: 'ordered-list', content: [li('A: b'), li('C: d')] }), null);
});

test('quotation chapter: exactly a quoted paragraph and a dash attribution; the words are kept', () => {
  const q = 'Businesses often focus on traffic. But can we measure what happens after the click?';
  const r = X.parseQuoteChapter([P(`“${q}”`), P('— Jane Doe, Founder, Acme Ltd')]);
  assert.deepStrictEqual({ ...r }, { quote: q, name: 'Jane Doe', role: 'Founder, Acme Ltd' });
  assert.deepStrictEqual({ ...X.parseQuoteChapter([P(`"${q}"`), P('– Jane Doe')]) }, { quote: q, name: 'Jane Doe', role: undefined });
  assert.strictEqual(X.parseQuoteChapter([P(`“${q}”`)]), null, 'no attribution');
  assert.strictEqual(X.parseQuoteChapter([P(`“${q}”`), P('Jane Doe')]), null, 'attribution without a dash');
  assert.strictEqual(X.parseQuoteChapter([P(q), P('— Jane Doe')]), null, 'not quoted');
  assert.strictEqual(X.parseQuoteChapter([P(`“${q}”`), P('— Jane Doe'), P('And one more paragraph.')]), null, 'extra content');
  assert.strictEqual(X.parseQuoteChapter([P('“Hi”'), P('— Jane')]), null, 'too short to be a pull quotation');
});

test('chapter kinds: the first method run is the band; boilerplate is back matter; anything else is plain', () => {
  const ch = (h, nodes = [P('text here that is long enough')]) => ({ heading: h ? H2(h) : null, nodes });
  const kinds = (list) => X.classifyChapters(list).map((c) => c.kind);
  assert.deepStrictEqual(kinds([ch(null), ch('Key findings'), ch('About the research'), ch('About MappedSkills'), ch('Media enquiries')]), ['main', 'main', 'method', 'back', 'back']);
  assert.deepStrictEqual(kinds([ch('Methodology'), ch('Limitations'), ch('Why it matters'), ch('Limitations again')]), ['method', 'method', 'main', 'main'], 'a later method heading is not a second band');
  assert.deepStrictEqual(kinds([ch('Research notes'), ch('The research agenda'), ch('Contact lenses')]), ['main', 'main', 'main'], 'near-miss headings stay plain');
  const quote = ch('A note from the founder', [P('“A long enough quotation to count as one.”'), P('— Jane Doe, Founder')]);
  assert.deepStrictEqual(kinds([quote, ch('A note from the team')]), ['quote', 'main']);
});

test('read-next pair, colophon lines and the limits paragraph', () => {
  assert.ok(X.isReadNextPair(P('Read the full research report:'), P(A('https://x', 'Title'))));
  assert.ok(!X.isReadNextPair(P('Read the full research report'), P(A('https://x', 'Title'))), 'needs the colon');
  assert.ok(!X.isReadNextPair(P('Read it:'), P('Plain text, no link')));
  assert.ok(!X.isReadNextPair(P('Read it:'), P('Text and ', A('https://x', 'link'))), 'link-only paragraph required');
  const ids = [P('Research ID: MSR-001'), P('Original report published: October 5, 2026')];
  assert.strictEqual(X.colophonRun(ids, 0), 2);
  assert.strictEqual(X.colophonRun([P('Website: https://mappedskills.com')], 0), 1, 'a single line is a colophon only when its value is a link or address');
  assert.strictEqual(X.colophonRun([P('Note: remember this.')], 0), 0);
  assert.strictEqual(X.colophonRun([P('A normal sentence, with no label.')], 0), 0);
  assert.strictEqual(X.colophonRun([P('Email: ', A('mailto:a@b.co', 'a@b.co')), P('Location: Pune, India')], 0), 2);
  const stripped = X.withoutLabel(P('Email: ', A('mailto:a@b.co', 'a@b.co')));
  assert.strictEqual(stripped.content[0].value, '');
  const nodes = [P('One paragraph here.'), P('Two paragraph here.'), P('Three paragraph here.'), P('Four paragraph — the limits.'), P('Read it:'), P(A('https://x', 'T')), ...ids];
  assert.strictEqual(X.limitIndex(nodes), 3, 'the last prose paragraph before the read-next block');
  assert.strictEqual(X.limitIndex(nodes.slice(2)), -1, 'fewer than three prose paragraphs: nothing emphasised');
});

/* ----------------------------------------------------------------- render -- */

const release = (over = {}) => ({
  slug: 's', headline: 'A Headline', excerpt: 'An excerpt.', publishedDate: 'October 22, 2026', publishedAtISO: '2026-10-22T19:37:08.809Z', updatedAtISO: '2026-10-22T19:37:08.809Z',
  featuredImage: { url: 'https://images.ctfassets.net/x/y/z.webp', title: 't', description: 'Alt text', isImage: true, width: 1719, height: 915 },
  contentJson: null, contentLinks: undefined, relatedResearch: { slug: 'r', title: 'Related Report Title', excerpt: 'Related excerpt.', publishedDate: '', href: '/research/r' },
  author: undefined, mediaAssets: [], metaTitle: 'T', metaDescription: 'D', canonicalUrl: 'https://mappedskills.com/press/s', ...over,
});
const html = (over) => renderToStaticMarkup(React.createElement(PressReleaseBody, { release: release(over) }));
const count = (h, re) => (h.match(re) || []).length;

test('render: 0, 1, 2, 3 and 4 findings draw that many strip cells, and 0 draws no strip', () => {
  const finds = [1, 2, 3, 4].map((n) => finding(String(n)));
  for (const n of [0, 1, 2, 3, 4]) {
    const d = docOf([...finds.slice(0, n).map((f) => embed(f.sys.id)), H2('Heading'), P('Body text here.')], finds);
    const h = html({ contentJson: d.document, contentLinks: d.links });
    assert.strictEqual(count(h, /class="pd-ev-i/g), n, `${n} cells`);
    assert.strictEqual(h.includes('id="pd-h-ev"'), n > 0, 'the strip heading exists only with figures');
    if (n) assert.ok(h.includes(`data-n="${n}"`));
    assert.ok(h.includes('Body text here.'), 'the body is still there');
    assert.strictEqual(count(h, /<h1/g), 1);
  }
});

test('render: strip cells show the structured fields verbatim, the sample note only when every figure names its sample', () => {
  const a = finding('1'), b = finding('2', { baseSample: undefined });
  let d = docOf([embed('1'), embed('2'), P('x')], [a, b]);
  let h = html({ contentJson: d.document, contentLinks: d.links });
  for (const t of ['S1', 'Headline 1', 'Desc 1', 'Sample 1', 'Source 1', 'S2', 'Headline 2']) assert.ok(h.includes(t), t);
  assert.ok(!h.includes('describes only the sample'), 'no claim about samples when one is missing');
  assert.ok(h.includes('/research/r#methodology'), 'method link points at the related report');
  d = docOf([embed('1'), P('x')], [a]);
  h = html({ contentJson: d.document, contentLinks: d.links });
  assert.ok(h.includes('describes only the sample'));
  h = html({ contentJson: d.document, contentLinks: d.links, relatedResearch: undefined });
  assert.ok(h.includes('describes only the sample') && !h.includes('#methodology'));
});

test('render: a general announcement (no image, no related research, no findings) falls back cleanly', () => {
  const d = docOf([P('PUNE, INDIA — News.'), H2('What changed'), P('Detail.')]);
  const h = html({ contentJson: d.document, contentLinks: d.links, featuredImage: undefined, relatedResearch: undefined, author: { name: 'A Writer', description: 'Editor' }, mediaAssets: [{ url: 'https://x/f.zip', title: 'Pack', description: 'A file', isImage: false }] });
  assert.ok(!h.includes('<img'), 'no image');
  assert.ok(h.includes('pd-hero-g pd-hero-g-solo') && h.includes('pd-facts'), 'facts take the image column');
  assert.ok(!h.includes('Related research') && !h.includes('pd-ev'), 'no related row, no strip');
  assert.ok(h.includes('See all press releases') && h.includes('href="/press"'), 'closing falls back to the newsroom');
  assert.ok(h.includes('A Writer') && h.includes('Pack') && h.includes('pd-dateline'));
  assert.ok(h.includes('Press enquiries') && h.includes('mailto:'), 'the media action is always present');
  assert.ok(h.includes('subject=Media%20enquiry%3A%20A%20Headline'));
});

test('render: no body, no findings: the page still has a hero and a close', () => {
  const h = html({ contentJson: null, featuredImage: undefined, relatedResearch: undefined, excerpt: '' });
  assert.ok(h.includes('<h1') && h.includes('pd-close') && !h.includes('pd-art'));
  assert.ok(!h.includes('b-lede'));
});

test('render: a long headline stays in one h1 and one breadcrumb item; the featured image keeps size and alt', () => {
  const long = 'Long '.repeat(40).trim();
  const h = html({ headline: long });
  assert.strictEqual(count(h, new RegExp(`${long}`, 'g')), 2, 'h1 and breadcrumb');
  assert.ok(h.includes('width="1719"') && h.includes('height="915"') && h.includes('alt="Alt text"') && h.includes('fetchPriority="high"'));
});

test('render: quotation, method band, ledger and read-next appear only when their shapes are present', () => {
  const li = (t) => LI(P(t));
  const doc = [
    P('PUNE, INDIA — opening paragraph.'), H2('Key findings'), UL(li('One: first.'), li('Two: second.')),
    H2('A note from the founder'), P('“A quotation that is long enough to count as one.”'), P('— Jane Doe, Founder, Acme'),
    H2('About the research'), P('Para one is here.'), P('Para two is here.'), P('Para three is here.'), P('Para four is the limit.'), P('Read the full report:'), P(A('https://x/r', 'The Report')), P('Research ID: R-1'), P('Date: today'),
    H2('About MappedSkills'), P('Boilerplate.'),
  ];
  const d = docOf(doc);
  const h = html({ contentJson: d.document, contentLinks: d.links });
  for (const c of ['pd-ledger', 'pd-quote', 'pd-q-b', 'pd-method', 'pd-limit', 'pd-next-l', 'pd-colophon', 'pd-prose pd-prose-s']) assert.ok(h.includes(c), c);
  assert.ok(h.includes('<blockquote class="pd-q-b"><p>A quotation that is long enough to count as one.</p>'));
  const plain = docOf([P('Opening.'), H2('Key findings'), UL(li('A plain bullet.'), li('Another.')), H2('Why it matters'), P('Text.')]);
  const hp = html({ contentJson: plain.document, contentLinks: plain.links });
  for (const c of ['pd-ledger', 'pd-quote', 'pd-method', 'pd-limit', 'pd-colophon', 'pd-dateline']) assert.ok(!hp.includes(c), `${c} must not appear`);
  assert.ok(hp.includes('<ul><li><p>A plain bullet.</p></li>') || hp.includes('A plain bullet.'));
});

test('render: heading order is one h1 then h2 (no skipped level); embedded images and tables keep working', () => {
  const doc = [P('x'), H2('One'), { nodeType: 'heading-3', data: {}, content: [T('Sub')] }, P('y')];
  const d = docOf(doc);
  const h = html({ contentJson: d.document, contentLinks: d.links });
  assert.strictEqual(count(h, /<h1/g), 1);
  assert.ok(h.indexOf('<h1') < h.indexOf('<h2') && h.indexOf('<h2') < h.indexOf('<h3'));
});

test('render: a chapter heading is one h2 (never a heading nested in a heading); an unplaced finding shows without a heading element', () => {
  const noStat = finding('n', { statistic: '' });
  const d = docOf([embed('n'), P('Body.'), H2('First chapter'), P('More.')], [noStat]);
  const h = html({ contentJson: d.document, contentLinks: d.links });
  assert.ok(!/<h2[^>]*>\s*<h[1-6]/.test(h), 'no nested heading');
  assert.strictEqual(count(h, /<h2/g), 3, 'chapter, closing and press enquiries');
  assert.ok(h.includes('Headline n') && h.includes('pd-embed') && !h.includes('<h3'), 'the finding is shown as plain lines');
});

/* ------------------------------------------------- G2 review refinements -- */

test('kicker: "MappedSkills Research" only with related research (structured data), "MappedSkills" otherwise', () => {
  const kicker = (h) => (/<p class="pd-kicker">[\s\S]*?<\/p>/.exec(h) || [''])[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const withResearch = html({});
  const without = html({ relatedResearch: undefined });
  assert.strictEqual(kicker(withResearch), 'MappedSkills Research · Press release');
  assert.strictEqual(kicker(without), 'MappedSkills · Press release');
  /* the prose never decides it: research-sounding body text with no related research stays general */
  const d = docOf([P('MappedSkills Research has published a study of 120 websites.')]);
  assert.strictEqual(kicker(html({ relatedResearch: undefined, contentJson: d.document, contentLinks: d.links })), 'MappedSkills · Press release');
  /* and a general-sounding release that does have related research keeps the research identifier */
  assert.strictEqual(kicker(html({ headline: 'A company update', contentJson: docOf([P('Hello.')]).document })), 'MappedSkills Research · Press release');
  assert.match(code(body), /related \? R\.kicker\.research : R\.kicker\.general/);
});

test('no featured image: the hero closes up (solo modifier); with an image it is the unchanged research hero', () => {
  assert.ok(html({ featuredImage: undefined }).includes('class="b-hero pd-hero pd-hero-solo"'));
  const withImage = html({});
  assert.ok(withImage.includes('class="b-hero pd-hero"') && !withImage.includes('pd-hero-solo'));
  assert.match(css, /\.px-h \.pd-hero\.pd-hero-solo \{ padding-block-end: clamp\(20px, 2\.5vw, 36px\); \}/);
  assert.match(css, /\.pd-hero-solo \+ \.pd-read/);
});

test('long headline: one step smaller and wider only above the threshold; the published MSR-001-length headline is untouched', () => {
  const { LONG_HEADLINE } = load(dir + 'PressReleaseBody.tsx');
  const msr = 'MappedSkills Research Finds No Observable Google Analytics on 42.5% of 120 Indian Business Websites Audited';
  assert.ok(msr.length < LONG_HEADLINE, `the published headline (${msr.length}) stays at the standard size`);
  assert.ok(!html({ headline: msr }).includes('pd-h1-long'));
  const long = 'A very long headline '.repeat(10).trim();
  assert.ok(long.length > LONG_HEADLINE && html({ headline: long }).includes('class="b-h1 pd-h1 pd-h1-long"'));
  assert.ok(html({ headline: long }).includes(`>${long}</h1>`), 'the h1 text is never truncated');
  assert.match(css, /\.pd-h1\.pd-h1-long \{ font-size: clamp\(1\.5rem,/, 'never below 24px');
});

test('mobile strip: text sizes stay at or above 15px; nothing hidden; short figures sit beside their headline, wide ones stay stacked', () => {
  const m = css.slice(css.indexOf('narrow screens: a short figure'));
  assert.ok(!/display:\s*none|overflow-x:\s*(auto|scroll)|max-height|line-clamp|text-overflow|<details/.test(m), 'nothing hidden, clipped or scrollable');
  assert.ok(!/\.pd-ev-d \{[^}]*font-size/.test(m), 'the description keeps its 15px size');
  assert.match(m, /\.pd-ev-i \.pd-stat-wide \{ grid-column: 1 \/ -1; \}/);
  const finds = [finding('1', { statistic: '42.5%' }), finding('2', { statistic: '66.7% vs 6.7%' }), finding('3', { statistic: '120' })];
  const d = docOf(finds.map((f) => embed(f.sys.id)).concat([P('x')]), finds);
  const h = html({ contentJson: d.document, contentLinks: d.links });
  assert.strictEqual(count(h, /class="pd-stat pd-stat-wide"|class="pd-stat pd-stat-pair pd-stat-wide"/g), 1, 'only the pair is wide');
  assert.ok(h.includes('class="pd-stat">42.5%</p>') && h.includes('class="pd-stat">120</p>'));
});

/* ------------------------------------------- pre-commit corrections F1-F4 -- */

const H3 = (v) => ({ nodeType: 'heading-3', data: {}, content: [T(v)] });
/* the body's own heading ids; the page's fixed section ids (pd-h-ev, pd-h-close, pd-h-press ...) are not part of the body */
const idsOf = (h) => [...h.matchAll(/<h[23] id="([^"]*)"/g)].map((m) => m[1]).filter((id) => !/^pd-h-/.test(id));
const quoteChapter = (heading) => [H2(heading), P('“A quotation that is long enough to count as one.”'), P('— Jane Doe, Founder')];
const kinds = (nodes) => X.classifyChapters(X.chaptersOf(nodes)).map((c) => c.kind);

test('F1: the published MSR-001 heading anchors are preserved (the live page carries exactly these ids)', () => {
  const live = [['Key findings', 'key-findings'], ['Why this matters for businesses', 'why-this-matters-for-businesses'], ['A note from the founder', 'a-note-from-the-founder'], ['About the research', 'about-the-research'], ['About MappedSkills', 'about-mappedskills'], ['Media enquiries', 'media-enquiries']];
  const nodes = [P('PUNE, INDIA — opening paragraph.')];
  for (const [h] of live) {
    if (h === 'A note from the founder') nodes.push(...quoteChapter(h));
    else nodes.push(H2(h), P('Paragraph one here.'), P('Paragraph two here.'), P('Paragraph three here.'));
  }
  const d = docOf(nodes);
  const h = html({ contentJson: d.document, contentLinks: d.links });
  assert.deepStrictEqual(idsOf(h), live.map(([, id]) => id), 'same ids, same order as production');
  for (const [text, id] of live) assert.ok(new RegExp(`<h2 id="${id}"[^>]*>${text}</h2>`).test(h), `${id} labels "${text}" unchanged`);
  for (const id of live.map(([, i]) => i)) assert.ok(h.includes(`aria-labelledby="${id}"`), `section ${id} is labelled by its heading`);
  assert.ok(!h.includes('pd-ch-'), 'the temporary pd-ch-N ids are gone');
});

test('F1: ids follow the production slug rule, byte for byte', () => {
  const { headingSlug } = load('lib/contentful/heading-ids.ts');
  for (const t of ['Why this matters for businesses', "Q&A: what's next?", '  Spaced   out  ', 'Under_score-and-dash', 'Ünïcode café']) {
    const d = docOf([H2(t), P('x')]);
    assert.strictEqual(idsOf(html({ contentJson: d.document, contentLinks: d.links }))[0], headingSlug(t) || 'section', t);
  }
  assert.strictEqual(headingSlug('Key findings'), 'key-findings');
});

test('F1: repeated and empty headings get unique ids; H3 ids share the sequence in document order; every id on the page is unique', () => {
  const d = docOf([P('Intro.'), H3('Intro sub'), H2('Notes'), P('a'), H3('Detail'), H2('Notes'), P('b'), H3('Detail'), H3('Notes'), H2(' '), P('c'), H2('Notes'), P('d')]);
  const h = html({ contentJson: d.document, contentLinks: d.links });
  assert.deepStrictEqual(idsOf(h), ['intro-sub', 'notes', 'detail', 'notes-2', 'detail-2', 'notes-3', 'section', 'notes-4']);
  const all = [...h.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  assert.strictEqual(new Set(all).size, all.length, 'no duplicate id anywhere on the page');
  assert.strictEqual(X.assignHeadingIds(X.chaptersOf(d.document.content)).size, 8);
});

test('F1: H3 keeps its text and order after its H2; heading text is never modified', () => {
  const d = docOf([P('Intro.'), H2('First heading'), H3('A sub heading'), P('Text.')]);
  const h = html({ contentJson: d.document, contentLinks: d.links });
  assert.ok(h.includes('<h2 id="first-heading"') && h.includes('<h3 id="a-sub-heading">A sub heading</h3>'));
  assert.ok(h.indexOf('<h1') < h.indexOf('<h2 id="first-heading"') && h.indexOf('<h2 id="first-heading"') < h.indexOf('<h3 id="a-sub-heading"'));
  assert.ok(h.includes('>First heading</h2>'));
});

test('F2: the same finding embedded more than once draws each reference with unique keys and unchanged figures', () => {
  const f = finding('dup');
  const d = docOf([embed('dup'), embed('dup'), embed('dup'), P('Body.')], [f]);
  const errors = [];
  const realError = console.error;
  console.error = (...a) => errors.push(a.join(' '));
  let h;
  try { h = html({ contentJson: d.document, contentLinks: d.links }); } finally { console.error = realError; }
  assert.strictEqual(count(h, /class="pd-ev-i/g), 3, 'one cell per reference');
  assert.strictEqual(count(h, /Headline dup/g), 3);
  assert.ok(errors.every((e) => !/same key|unique "key"/i.test(e)), `no duplicate-key warning: ${errors.join(' | ').slice(0, 120)}`);
  assert.match(code(body), /key=\{`\$\{f\.id\}-\$\{i\}`\}/, 'the key carries the position');
});

test('F3: only real method headings match; unrelated words that merely start the same way do not', () => {
  for (const yes of ['About the research', 'about the study', 'About the methodology', 'Methodology', 'Method', 'Methods and limitations', 'Limitations', 'Limitation of this study', 'Research methods', 'How we did it', 'How the study was done', ' Methodology '])
    assert.ok(X.isMethodHeading(yes), `matches: ${yes}`);
  for (const no of ['Methodist church history', 'About the researchers', 'Methodical thinking', 'Limited partnership', 'Research notes', 'The research agenda', 'Methodologist profile', 'How well we did'])
    assert.ok(!X.isMethodHeading(no), `does not match: ${no}`);
  assert.deepStrictEqual(kinds([H2('Methodist church history'), P('text here that is long enough')]), ['main']);
  assert.deepStrictEqual(kinds([H2('About the researchers'), P('text here that is long enough')]), ['main']);
});

test('F4: consecutive method chapters share one section; a quotation ends it and a later method heading starts a separate one', () => {
  const m = (h) => [H2(h), P('Method paragraph text that is long enough.')];
  const run = (nodes) => X.classifyChapters(X.chaptersOf(nodes)).map((c) => `${c.kind}${c.run ? c.run : ''}`);
  assert.deepStrictEqual(run([...m('About the research'), ...m('Limitations')]), ['method1', 'method1'], 'normal consecutive method chapters: one run');
  assert.deepStrictEqual(run([...m('About the research'), ...quoteChapter('A note')]), ['method1', 'quote'], 'method then quotation');
  assert.deepStrictEqual(run([...m('About the research'), ...quoteChapter('A note'), ...m('Limitations')]), ['method1', 'quote', 'method2'], 'method, quotation, method: separate runs');
  assert.deepStrictEqual(run([...m('About the research'), ...m('Methodology'), ...quoteChapter('A note'), ...m('Limitations'), ...m('Methods')]), ['method1', 'method1', 'quote', 'method2', 'method2']);
  assert.deepStrictEqual(run([...m('About the research'), H2('Why it matters'), P('Plain text that is long enough.'), ...m('Limitations')]), ['method1', 'main', 'main'], 'the OD-3 fallback after an ordinary chapter is unchanged');
});

test('F4: rendering follows the runs: one band for consecutive method chapters, two bands when a quotation separates them', () => {
  const m = (h) => [H2(h), P('Method paragraph text that is long enough.')];
  const one = docOf([P('Intro.'), ...m('About the research'), ...m('Limitations')]);
  const h1 = html({ contentJson: one.document, contentLinks: one.links });
  assert.strictEqual(count(h1, /class="pd-method"/g), 1);
  assert.strictEqual(count(h1, /pd-row pd-sec/g), 2, 'two sections inside the one band');
  const two = docOf([P('Intro.'), ...m('About the research'), ...quoteChapter('A note from the founder'), ...m('Limitations')]);
  const h2 = html({ contentJson: two.document, contentLinks: two.links });
  assert.strictEqual(count(h2, /class="pd-method"/g), 2, 'two separate bands');
  assert.ok(h2.indexOf('class="pd-method"') < h2.indexOf('class="pd-quote"') && h2.indexOf('class="pd-quote"') < h2.lastIndexOf('class="pd-method"'), 'band, quotation, band in document order');
  assert.deepStrictEqual(idsOf(h2), ['about-the-research', 'a-note-from-the-founder', 'limitations']);
});

/* ---------------------------------------------------- two-colour H1 -- */

const REPORT_TITLE = 'The Marketing Measurement Gap: What 120 Indian Business Websites Reveal About Analytics and Advertising Measurement';
const MSR_H = 'MappedSkills Research Finds No Observable Google Analytics on 42.5% of 120 Indian Business Websites Audited';
const RELATED = { slug: 'r', title: REPORT_TITLE, excerpt: '', publishedDate: '', href: '/research/r' };
const textOf = (h) => h.replace(/<[^>]+>/g, '');
const h1Of = (h) => (/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(h) || [])[1] || '';
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('H1 emphasis: the phrase the headline shares with its related report title; MSR-001 emphasises "120 Indian Business Websites"', () => {
  const r = X.splitHeadlineEmphasis(MSR_H, REPORT_TITLE);
  assert.deepStrictEqual({ ...r }, { before: 'MappedSkills Research Finds No Observable Google Analytics on 42.5% of ', emphasis: '120 Indian Business Websites', after: ' Audited' });
  assert.strictEqual(r.before + r.emphasis + r.after, MSR_H, 'the three slices are the headline, character for character');
});

test('H1 emphasis never guesses: no related title, no shared run, a short run, a stop-word run, the first word, or most of the headline all mean no emphasis', () => {
  assert.strictEqual(X.splitHeadlineEmphasis(MSR_H, undefined), null);
  assert.strictEqual(X.splitHeadlineEmphasis(MSR_H, ''), null);
  assert.strictEqual(X.splitHeadlineEmphasis('A company announces a new office in Pune today', REPORT_TITLE), null, 'nothing shared');
  assert.strictEqual(X.splitHeadlineEmphasis('Study of Indian Business shows growth in many areas', 'Indian Business Report'), null, 'two shared words are not enough');
  assert.strictEqual(X.splitHeadlineEmphasis('Notes on the state of the art today', 'What of the state of the matter'), null, 'stop-words plus one real word do not qualify');
  assert.strictEqual(X.splitHeadlineEmphasis('Indian Business Websites Audited by MappedSkills today', 'Indian Business Websites Reveal Gaps'), null, 'the first word is never emphasised');
  assert.strictEqual(X.splitHeadlineEmphasis('New Indian Business Websites', 'Indian Business Websites'), null, 'more than 70% of the headline');
});

test('H1 emphasis: longest run wins, ties go to the earlier one, case and punctuation are ignored, slices stay exact', () => {
  const r = X.splitHeadlineEmphasis('Report: indian BUSINESS websites, audited; mapped measurement gap closes', 'The Indian Business Websites Study and the Mapped Measurement Gap Review');
  assert.strictEqual(r.emphasis, 'indian BUSINESS websites', 'trailing comma stays outside, case kept as written');
  assert.ok(r.after.startsWith(', audited'));
  const tie = X.splitHeadlineEmphasis('Alpha study of Marketing Measurement Gap and Indian Business Sites', 'Indian Business Sites and Marketing Measurement Gap');
  assert.strictEqual(tie.emphasis, 'Marketing Measurement Gap', 'equal length: the earlier run in the headline');
  for (const [h, t] of [[MSR_H, REPORT_TITLE], ['Report: indian BUSINESS websites, audited; x y z', 'indian business websites study'], ['Intro 42.5% of Indian Business Websites (n=120) found', 'Indian Business Websites: a study']]) {
    const s = X.splitHeadlineEmphasis(h, t);
    if (s) assert.strictEqual(s.before + s.emphasis + s.after, h);
  }
});

test('H1 render: one h1, two colours, the exact Contentful text, no duplicated headline text', () => {
  const h = html({ headline: MSR_H, relatedResearch: RELATED });
  const inner = h1Of(h);
  assert.strictEqual(count(h, /<h1/g), 1);
  assert.strictEqual(count(inner, /class="b-named"/g), 1);
  assert.ok(inner.includes('<span class="b-named">120 Indian Business Websites</span>'));
  assert.strictEqual(textOf(inner), MSR_H, 'the h1 text is the headline exactly');
  assert.strictEqual(count(textOf(h), new RegExp(esc(MSR_H), 'g')), 2, 'the headline text occurs only in the h1 and the breadcrumb');
  assert.ok(h.includes('aria-labelledby="pd-h1"'));
});

test('H1 render: without related research, or without a shared phrase, the headline stays one colour', () => {
  const none = h1Of(html({ headline: MSR_H, relatedResearch: undefined }));
  assert.ok(!none.includes('b-named') && textOf(none) === MSR_H);
  const noShare = h1Of(html({ headline: 'A company announces a new office in Pune today' }));
  assert.ok(!noShare.includes('b-named'));
});

test('H1 emphasis: nothing release-specific is hard-coded; SEO title, metadata and structured data are untouched', () => {
  assert.ok(!/120 Indian|Business Websites|Marketing Measurement/.test(code(rulesSrc) + code(body)));
  assert.match(page, /generateNewsArticleSchema\(\{\n\s*headline: release\.headline,/, 'structured data still takes the plain headline');
  assert.match(page, /const title = release\.metaTitle;/);
  assert.ok(!/splitHeadlineEmphasis|b-named/.test(page), 'the page file is untouched by the emphasis');
});

test('H1 emphasis: it uses the shared C+ .b-named colour (no new colour rule); a long headline keeps its size modifier', () => {
  assert.ok(!/b-named/.test(css), 'release.css adds no .b-named rule; the shared .px-b .b-named (tangerine display) applies');
  const long = `Long headline words Indian Business Websites ${'x '.repeat(70)}`.trim();
  const h = html({ headline: long, relatedResearch: RELATED });
  assert.ok(h.includes('pd-h1-long') && h1Of(h).includes('b-named'));
});
