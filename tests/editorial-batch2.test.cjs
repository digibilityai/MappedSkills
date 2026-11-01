// Guards for the editorial batch of DEC-112: explicit, validated research counts; text legends (three-way for Google Analytics); report reading chapters;
// press figures from recorded findings; no blog reading-time bars; restrained motion; the scoped type floor.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
Module._extensions['.css'] = () => {};
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
const { validatedEvidence, EVIDENCE } = load('components/cplus/research/evidence.ts');
const { EvidenceField } = load('components/editorial/EvidenceField.tsx');
const { EvidenceBars } = load('components/editorial/EvidenceBars.tsx');
const { groupContents } = load('components/cplus/research-report/chapters.ts');

const GA = { id: 'ga', statistic: '42.5%', headline: 'More than 4 in 10 audited websites had no observable Google Analytics.', description: 'Among the 120 websites audited, Google Analytics was not observed on 51 (42.5%) and was observable on 67 (55.8%). Two websites were classified as Unable to Determine.', baseSample: 'n=120 Indian business websites' };
const SECTOR = { id: 's', statistic: '66.7% vs 6.7%', headline: 'Observable Meta Pixel presence varied sharply across sectors.', description: 'Meta Pixel presence by sector: Fashion 66.7%, Jewellery 60%, Technology 10%, Manufacturing 6.7%.', baseSample: 'n=30 websites per sector (Fashion, Jewellery, Technology, Manufacturing)' };

test('a chart is drawn only when headline, recorded text, sample size and percentage all agree', () => {
  assert.ok(validatedEvidence(GA, 120));
  assert.strictEqual(validatedEvidence(GA, 100), null, 'sample size differs');
  assert.strictEqual(validatedEvidence({ ...GA, statistic: '42.0%' }, 120), null, 'percentage differs');
  assert.strictEqual(validatedEvidence({ ...GA, description: GA.description.replace('51', '52') }, 120), null, 'recorded counts changed');
  assert.strictEqual(validatedEvidence({ ...GA, description: GA.description.replace('Two websites were classified as Unable to Determine.', '') }, 120), null, 'unable-to-determine statement missing');
  assert.strictEqual(validatedEvidence({ ...GA, headline: 'Another headline.' }, 120), null, 'unknown finding');
  assert.strictEqual(validatedEvidence(undefined, 120), null);
  assert.ok(validatedEvidence(SECTOR, 120));
  assert.strictEqual(validatedEvidence({ ...SECTOR, description: SECTOR.description.replace('60%', '61%') }, 120), null);
  for (const [headline, spec] of Object.entries(EVIDENCE)) if (spec.type === 'field') assert.strictEqual(spec.parts.reduce((a, p) => a + p.count, 0), spec.total, headline);
});

test('Google Analytics is drawn as three groups with a text legend: 51 not observed, 67 observed, 2 unable to determine', () => {
  const spec = validatedEvidence(GA, 120);
  assert.deepStrictEqual(spec.parts.map((p) => [p.count, p.kind]), [[51, 'marked'], [67, 'plain'], [2, 'unknown']]);
  const h = renderToStaticMarkup(React.createElement(EvidenceField, { spec, idBase: 't' }));
  assert.strictEqual((h.match(/class="ed-sq is-marked"/g) || []).length, 51);
  assert.strictEqual((h.match(/class="ed-sq is-plain"/g) || []).length, 67);
  assert.strictEqual((h.match(/class="ed-sq is-unknown"/g) || []).length, 2);
  for (const t of ['<strong>51</strong> Google Analytics not observed', '<strong>67</strong> Google Analytics observed', '<strong>2</strong> unable to determine']) assert.ok(h.includes(t), t);
  assert.ok(!/67[^<]*unable|unable[^<]*67/.test(h.replace(/\(.*?\)/g, '')), 'the 67 and the 2 are never combined under one label');
  assert.ok(h.includes('aria-labelledby="t-legend"') && h.includes('id="t-legend"'));
});

test('the other findings use neutral wording for the remainder; nothing the record does not say', () => {
  for (const key of ['Meta Pixel was observable on just over one-third of audited websites.', 'Google Ads-related measurement was observable on fewer than 3 in 10 websites.', 'Almost all audited websites preserved the UTM parameters used during testing.']) {
    const spec = EVIDENCE[key];
    assert.strictEqual(spec.parts[1].label, 'the other websites audited', key);
    assert.ok(!/did not|not observed/.test(spec.parts[1].label));
  }
});

test('bars print every value as text beside its bar', () => {
  const h = renderToStaticMarkup(React.createElement(EvidenceBars, { spec: validatedEvidence(SECTOR, 120) }));
  for (const t of ['Fashion', '66.7%', 'Jewellery', '60%', 'Technology', '10%', 'Manufacturing', '6.7%']) assert.ok(h.includes(t), t);
  assert.ok(h.includes('aria-hidden="true"'), 'the bar track is decorative; the numbers are text');
});

test('report reading chapters group the existing headings, keep every item once and in order, and fall back to the flat list', () => {
  const T = ['Key findings', 'Executive summary', 'Why We Conducted This Research', 'Finding 1 More Than 4', 'Finding 2 Advertising', 'Finding 3 97.5%', 'Finding 4 Sector', 'Finding 5 Technology', 'What About Conversion Measurement?', 'What Does the Marketing Measurement Gap Mean?', 'What Founders and CEOs Should Ask', 'A Note From Amit Gupta', 'Methodology', 'Limitations', 'Cite this report'];
  const items = T.map((text, i) => ({ id: `i${i}`, text }));
  const g = groupContents(items);
  assert.deepStrictEqual(g.map((x) => x.label), ['Summary and why', 'Findings 1 to 3', 'Findings 4 and 5', 'Meaning', 'Method and limits']);
  assert.deepStrictEqual(g.flatMap((x) => x.items.map((i) => i.id)), items.map((i) => i.id), 'same items, same order, none lost');
  assert.deepStrictEqual(g[2].items.map((i) => i.text).slice(-1), ['What About Conversion Measurement?']);
  assert.strictEqual(groupContents([{ id: 'a', text: 'Introduction' }, { id: 'b', text: 'Background' }, { id: 'c', text: 'Results' }]), null, 'a report of another shape keeps the flat list');
  const six = groupContents([...items.slice(0, 8), { id: 'x', text: 'Finding 6 Extra' }, ...items.slice(8)]);
  assert.ok(six.some((x) => x.label === 'Findings 4 to 6'), 'labels follow the real finding numbers');
});

test('the report keeps its headings and anchors; chapters add only navigation and a plain label', () => {
  const b = read('components/cplus/research-report/ReportBody.tsx');
  const r = read('components/cplus/research-report/ReportRichText.tsx');
  assert.match(b, /groupContents\(contents\)/);
  assert.match(b, /<OnThisPage items=\{contents\} groups=\{groups\}/);
  assert.match(r, /chapterLabels\?\.\[id\] \? <p className="ed-chap">/);
  for (const id of ['executive-summary', 'findings', 'methodology', 'limitations', 'cite']) assert.ok(b.includes(`"${id}"`) || b.includes(`'${id}'`) || b.includes(`id="${id}"`), id);
});

test('press: the figures come from the latest release\'s recorded findings through the existing getter, in a light section after the dark hero', () => {
  const page = read('app/(pages)/press/page.tsx');
  assert.match(page, /splitLeadingFigures\(latest\.contentJson, latest\.contentLinks\)\.figures/);
  const body = read('components/cplus/press/PressBody.tsx');
  assert.match(body, /const tone = \(i: number\) => \(i % 2 === 0 \? 'ed-band paper' : 'ed-band'\);/);
  assert.ok(!/ed-band dark/.test(body), 'no second dark block after the hero');
  assert.match(body, /className="ed-figs"/);
  const { PressBody } = load('components/cplus/press/PressBody.tsx');
  const rel = { slug: 's', headline: 'H', excerpt: 'E', publishedDate: 'October 23, 2026', href: '/press/s', image: null };
  const figs = [{ id: 'a', statistic: '42.5%', headline: 'F one', description: 'D one', baseSample: 'n=120', sourceNote: 'Src one' }, { id: 'b', statistic: '120', headline: 'F two' }];
  const h = renderToStaticMarkup(React.createElement(PressBody, { releases: [rel], figures: figs }));
  assert.ok(h.includes('42.5%') && h.includes('Src one') && h.includes('n=120') && h.includes('Read the full release'));
  const none = renderToStaticMarkup(React.createElement(PressBody, { releases: [rel], figures: [] }));
  assert.ok(!none.includes('ed-figs'), 'no recorded findings, no figures section');
});

test('blog: ordinary reading-time labels, no reading-time bars, featured article plus one collection of the rest', () => {
  const b = read('components/cplus/blog/BlogBody.tsx');
  const css = read('components/editorial/editorial.css');
  assert.ok(!/ruler|reading-bar|readbar/i.test(b + css));
  assert.match(b, /min read|readingTime/);
  assert.match(b, /const rest = posts\.filter\(\(p\) => p !== featured\);/);
  assert.ok(!/-webkit-line-clamp/.test(css), 'excerpts are shown in full');
});

test('motion: staged opening and image reveal are CSS gated on px-js and no-preference; script only releases charts once', () => {
  const css = read('components/editorial/editorial.css');
  const m = css.slice(css.indexOf('@keyframes edRise'), css.indexOf('/* evidence charts'));
  assert.match(m, /@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*\.px-js \.ed-hero h1 \{ animation: edRise/);
  assert.ok(!/animation:[^;]*infinite/.test(css), 'nothing loops');
  assert.ok(!/position:\s*(sticky|fixed)/.test(css), 'nothing sticky');
  const js = code(read('components/editorial/EdMotion.tsx'));
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /typeof IntersectionObserver !== 'function'/);
  assert.match(js, /getBoundingClientRect\(\)\.top > window\.innerHeight \* 0\.92/, 'only charts that start below the fold are held');
  assert.match(js, /io\.unobserve\(e\.target\)/, 'once');
  assert.ok(!/setInterval|requestAnimationFrame\(\s*function\s+\w+/.test(js) && !/count/i.test(js), 'no count-up loop');
  assert.match(css, /clip-path: inset\(0 0 0 0\)/, 'the image reveal ends fully uncovered (never cropped)');
});

test('type floor on the editorial pages: labels at least 12px, notes at least 14px', () => {
  const css = read('components/editorial/editorial.css');
  const sizes = [...css.matchAll(/font(?:-size)?:\s*(?:\d+\s+)?(\.?\d*\.?\d+)rem/g)].map((m) => Number(m[1]));
  assert.ok(sizes.length > 20 && Math.min(...sizes) >= 0.75, String(Math.min(...sizes)));
  assert.ok(!/\.8125rem|\.78rem|\.72rem|\.6875rem/.test(css), 'no 13px, 12.5px or 11px sizes');
  assert.ok(!/\.8125rem/.test(read('components/cplus/press-release/release.css').split('\n').filter((l) => /pd-ev-m/.test(l)).join('')));
});

/* ---- DEC-113: final editorial corrections ---- */
const { ArticleRichText } = load('components/cplus/blog-article/ArticleRichText.tsx');
const T = (value) => ({ nodeType: 'text', value, marks: [], data: {} });
const H = (n, v) => ({ nodeType: `heading-${n}`, data: {}, content: [T(v)] });
const doc = (...content) => ({ nodeType: 'document', data: {}, content });
const art = (d) => renderToStaticMarkup(React.createElement(ArticleRichText, { document: d, links: { assets: { block: [] }, entries: { block: [] } } }));

test('an h4 straight after an h2 renders as an h3 with the same look, the same text and no id; other headings are unchanged', () => {
  const h = art(doc(H(2, 'How It Works'), H(4, '01. Goal Setting'), H(4, '02. Choose Platforms'), H(3, 'A Sub Topic'), H(4, 'Deep Point'), H(2, 'Conclusion'), H(4, 'After Conclusion')));
  assert.ok(h.includes('<h2 id="how-it-works">How It Works</h2>'));
  assert.ok(h.includes('<h3 class="ba-h4">01. Goal Setting</h3>') && h.includes('<h3 class="ba-h4">02. Choose Platforms</h3>'), 'siblings under the h2 are promoted together');
  assert.ok(h.includes('<h3 id="a-sub-topic">A Sub Topic</h3>') && h.includes('<h4>Deep Point</h4>'), 'an h4 under a real h3 stays an h4');
  assert.ok(h.includes('<h3 class="ba-h4">After Conclusion</h3>'), 'the rule restarts after the next h2');
  assert.deepStrictEqual([...h.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]), ['how-it-works', 'a-sub-topic', 'conclusion'], 'ids and their order are untouched');
  const plain = art(doc(H(2, 'One'), H(3, 'Two'), H(4, 'Three')));
  assert.ok(plain.includes('<h4>Three</h4>') && !plain.includes('ba-h4'), 'a well-ordered article renders exactly as recorded');
  assert.match(read('components/cplus/blog-article/article.css'), /\.ba-prose h3\.ba-h4/);
});

test('research heading: "What we found across <recorded sample size> websites." with no number typed in the copy', () => {
  const { RESEARCH } = load('components/cplus/research/content.ts');
  assert.deepStrictEqual(RESEARCH.lead.h(120), { a: 'What we found', b: 'across 120 websites.' });
  assert.strictEqual(`${RESEARCH.lead.h(120).a} ${RESEARCH.lead.h(120).b}`, 'What we found across 120 websites.');
  assert.deepStrictEqual(RESEARCH.lead.h(undefined), { a: 'What we found', b: '' }, 'no recorded sample size, no number');
  assert.ok(!/\b120\b/.test(code(read('components/cplus/research/content.ts')).replace(/"What we found across 120 websites\."/, '')), 'the count is never typed into the copy');
  assert.ok(!/One sample\.|One clear result/.test(read('components/cplus/research/content.ts')));
  assert.match(read('components/cplus/research/ResearchBody.tsx'), /S\.lead\.h\(report\?\.sampleSize\)/);
});

test('the shared banner focus guard: keyboard-only, one listener for the document, removed on unmount, mounted on the editorial pages, /contact and /social-media-ads', () => {
  const js = code(read('components/editorial/BannerFocus.tsx'));
  assert.match(js, /if \(!keyboard \|\| !el \|\| !banner \|\| banner\.contains\(el\) \|\| el\.closest\('header'\) \|\| !el\.matches\(':focus-visible'\)\) return;/);
  assert.match(js, /if \(r\.bottom \+ RING <= top\) return;/, 'a control that is already visible causes no scroll');
  assert.match(js, /Math\.min\(r\.bottom \+ RING - top \+ AIR, r\.top - AIR\)/, 'least scroll that clears the banner, never past the control\'s own top');
  assert.match(js, /behavior: 'instant'/);
  for (const ev of ['pointerdown', 'mousedown', 'touchstart']) assert.ok(js.includes(`addEventListener('${ev}', onPointer, true)`) && js.includes(`removeEventListener('${ev}', onPointer, true)`), ev);
  assert.match(js, /if \(mounts\+\+ === 0\)/);
  assert.match(js, /if \(--mounts === 0\)/);
  assert.match(js, /removeEventListener\('focusin', onFocus\)/);
  assert.match(code(read('components/editorial/EdMotion.tsx')), /return <BannerFocus \/>;/);
  assert.ok(!/addEventListener\('focusin'/.test(code(read('components/editorial/EdMotion.tsx'))), 'one implementation only');
  assert.match(read('app/(pages)/contact/page.tsx'), /return <BannerFocus \/>;/);
  assert.match(read('app/(pages)/social-media-ads/page.tsx'), /<BannerFocus \/>/);
  assert.ok(!/BannerFocus|EdMotion/.test(read('app/(pages)/work/page.tsx')), '/work is not part of this change');
});
