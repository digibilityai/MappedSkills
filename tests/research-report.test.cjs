// Guards for /research/[slug] reports (owner-approved Research Report G1 R1 design, implemented in G2): metadata, JSON-LD and
// routing unchanged; no hard-coded research figure; every live anchor kept; the chart-equivalence rule (changed, missing,
// extra and swapped values or labels all fail); the "unrendered node" guard that reports dropped embedded content (OD-10).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('./helpers/ts-loader.cjs');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const page = read('app/(pages)/research/[slug]/page.tsx');
const dir = 'components/cplus/research-report/';
const body = read(dir + 'ReportBody.tsx'), rich = read(dir + 'ReportRichText.tsx'), content = read(dir + 'content.ts'), css = read(dir + 'report.css');
const R = load(dir + 'report-rules.ts');

const T = (value, marks = []) => ({ nodeType: 'text', value, marks: marks.map((type) => ({ type })), data: {} });
const P = (...c) => ({ nodeType: 'paragraph', data: {}, content: c });
const bar = (label, v) => ({ nodeType: 'list-item', data: {}, content: [P(T(label, ['bold']), T(`: ${v}%`))] });
const UL = (...items) => ({ nodeType: 'unordered-list', data: {}, content: items });
const asset = (id, alt, url = `https://x/${id}.webp`) => ({ sys: { id }, url, title: id, description: alt, contentType: 'image/webp' });
const embed = (type, id) => ({ nodeType: type, data: { target: { sys: { id } } }, content: [] });

test('metadata, JSON-LD identity and routing are unchanged', () => {
  assert.match(page, /const title = resolved\.report\.metaTitle;/);
  assert.match(page, /alternates: \{ canonical: resolved\.report\.canonicalUrl \}/);
  assert.match(page, /generateResearchReportSchema\(\{[\s\S]*identifier: report\.researchId/);
  assert.match(page, /routeTrailJsonLd\(trail\)/);
  assert.match(page, /\{ name: report\.title, href: `\/research\/\$\{report\.slug\}` \}/, 'BreadcrumbList keeps the full title');
  assert.match(page, /export const revalidate = 60;/);
  assert.match(page, /getResearchStaticParams/);
  assert.match(body, /\{head\}[\s\S]*rr-h1-sub/, 'H1 text is the title, split inside one h1');
});

test('no research figure or sentence is hard-coded', () => {
  for (const src of [code(body), code(content), code(rich)]) assert.ok(!/\d+(\.\d+)?%|\bn=\d|\b(120|51|67|MSR)\b/.test(src.replace(/0 to 100%/g, '').replace(/\d+(\.\d+)?(px|rem|em|ch|ms|vw)\b/g, '')), 'no hard-coded figure');
});

test('every live deep link is kept', () => {
  for (const id of ['executive-summary', 'methodology', 'limitations', 'cite', 'findings']) assert.ok(body.includes(`id="${id}"`), id);
  assert.match(rich, /`\$\{idPrefix\}-\$\{index\}`/);
  const ch = R.splitChapters({ content: [P(T('intro')), { nodeType: 'heading-2', content: [T('A')] }, P(T('a')), { nodeType: 'heading-2', content: [T('B')] }] });
  assert.deepStrictEqual(ch.map((c) => !!c.heading), [false, true, true], 'intro takes index 0, so the first H2 stays body-1');
});

test('bar list parse: only lists whose every item is "Label: NN.N%"', () => {
  assert.deepStrictEqual(R.parseBarList(UL(bar('A', '10'), bar('B', '20.5'))).map((i) => i.value), ['10%', '20.5%']);
  assert.strictEqual(R.parseBarList(UL(bar('A', '10'), { nodeType: 'list-item', content: [P(T('plain text'))] })), null);
});

const ITEMS = [{ label: 'Google Analytics', number: 55.8 }, { label: 'Meta Pixel', number: 35.8 }, { label: 'Google Ads-related measurement', number: 27.5 }, { label: 'Google Tag Manager', number: 23.3 }];
const ALT = 'Horizontal bar chart showing Google Analytics at 55.8%, Meta Pixel at 35.8%, Google Ads measurement at 27.5%, and Google Tag Manager at 23.3% across 120 audited websites.';
test('chart equivalence: verified pairs match; every failure case fails', () => {
  assert.ok(R.chartEquivalent(ALT, ITEMS));
  assert.ok(!R.chartEquivalent(ALT.replace('35.8%', '36%'), ITEMS), 'changed value');
  assert.ok(!R.chartEquivalent(ALT.replace('Meta Pixel', 'TikTok Pixel'), ITEMS), 'changed label');
  assert.ok(!R.chartEquivalent(ALT.replace(', and Google Tag Manager at 23.3%', ''), ITEMS), 'missing item');
  assert.ok(!R.chartEquivalent(ALT + ' Also 12%.', ITEMS), 'extra value');
  assert.ok(!R.chartEquivalent(ALT.replace('Meta Pixel at 35.8%, Google Ads measurement at 27.5%', 'Meta Pixel at 27.5%, Google Ads measurement at 35.8%'), ITEMS), 'swapped values');
  assert.ok(!R.chartEquivalent('A chart with no numbers', ITEMS), 'no values');
  assert.ok(!R.chartEquivalent(ALT, []), 'empty list');
});

test('planChapter replaces an image only when verified, in the same chapter, once', () => {
  const list = UL(bar('Google Analytics', '55.8'), bar('Meta Pixel', '35.8'), bar('Google Ads-related measurement', '27.5'), bar('Google Tag Manager', '23.3'));
  const assets = new Map([['ok', asset('ok', ALT)], ['bad', asset('bad', ALT.replace('35.8%', '36%'))], ['utm', asset('utm', 'No list for this one: 97.5%')]]);
  const plan = R.planChapter([P(T('x')), list, embed('embedded-asset-block', 'ok'), embed('embedded-asset-block', 'bad'), embed('embedded-asset-block', 'utm')], assets);
  assert.deepStrictEqual([...plan.replaced], [2], 'only the verified image is replaced');
  assert.strictEqual(plan.barCharts.get(1).sys.id, 'ok');
  const failing = R.planChapter([list, embed('embedded-asset-block', 'bad')], assets);
  assert.strictEqual(failing.replaced.size, 0, 'a changed value keeps the published image');
  assert.match(rich, /rr-barcap-k[\s\S]*assetAlt\(chart\)[\s\S]*chart\.url/, 'caption is the description, with the image link');
});

test('status table: YES / NO / UTD / N/A keep their code and their own mark', () => {
  const cell = (t) => ({ nodeType: 'table-cell', content: [P(T(t))] });
  const row = (a, b) => ({ nodeType: 'table-row', content: [cell(a), cell(b)] });
  const t = R.parseTwoColumnTable({ nodeType: 'table', content: [row('Status', 'Meaning'), row('YES', 'a'), row('NO', 'b'), row('UTD', 'c'), row('N/A', 'd')] });
  assert.deepStrictEqual(t.rows.map((r) => [r.code, r.mark]), [['YES', 'yes'], ['NO', 'no'], ['UTD', 'utd'], ['N/A', 'na']]);
  assert.match(css, /\.rr-st-no \{[^}]*dashed/);
  assert.match(css, /\.rr-st-utd \{[^}]*repeating-linear-gradient/);
});

test('emphasis rules key on structure', () => {
  assert.ok(R.wholeParagraphMark(P(T('x', ['bold'])), 'bold'));
  assert.ok(!R.wholeParagraphMark(P(T('x', ['bold']), T(' y')), 'bold'));
  assert.ok(R.wholeParagraphMark(P(T('x', ['italic'])), 'italic'));
  assert.deepStrictEqual(R.findingLabel('Finding 3: Foo bar'), { label: 'Finding 3', rest: 'Foo bar' });
  assert.strictEqual(R.findingLabel('Why We Did It'), null);
});

test('OD-10 guard: every dropped or unsupported embedded part is reported', () => {
  const links = { assets: { block: [asset('a1', 'x'), { sys: { id: 'a2' }, url: null }] }, entries: { block: [{ sys: { id: 'e1' }, __typename: 'ResearchFinding', statistic: '1%' }, { sys: { id: 'e2' }, __typename: 'Callout' }] } };
  const doc = { content: [P(T('ok')), embed('embedded-entry-block', 'e1'), embed('embedded-entry-block', 'e2'), embed('embedded-entry-block', 'missing'), embed('embedded-asset-block', 'a1'), embed('embedded-asset-block', 'a2'), P(T('t'), embed('embedded-entry-inline', 'i1')), P(embed('entry-hyperlink', 'h1')), { nodeType: 'mystery', content: [] }, P(T('m', ['strikethrough']))] };
  const out = R.findUnrendered(doc, links, 'Body');
  assert.deepStrictEqual(out.map((u) => u.kind), ['embedded entry (block)', 'embedded entry (block)', 'embedded asset (block)', 'embedded entry (inline)', 'entry-hyperlink', 'unsupported node', 'unsupported mark']);
  assert.match(out[0].detail, /Callout/); assert.match(out[1].detail, /could not be resolved/); assert.match(out[2].where, /node 6/);
  assert.deepStrictEqual(R.findUnrendered({ content: [P(T('plain')), embed('embedded-entry-block', 'e1'), embed('embedded-asset-block', 'a1')] }, links, 'Body'), []);
  assert.match(body, /findUnrendered[\s\S]*console\.warn\(/);
  assert.match(body, /data-unrendered=/);
});

test('close, media, copy and motion', () => {
  assert.match(code(body), /CONTACT_HREF[\s\S]*BOOKING_HREF[\s\S]*\/conversion-optimization/);
  assert.match(body, /Media enquiry: \$\{report\.title\}/);
  assert.ok(!/transition:[^;]*[^1]\d{3}ms|animation/.test(css.replace(/150ms/g, '')), '150 ms feedback only, no animation');
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*transition: none/);
  assert.ok(!/position: sticky/.test(css.replace(/\.rr-rail \{[^}]*\}/, '')), 'only the rail is sticky');
});
