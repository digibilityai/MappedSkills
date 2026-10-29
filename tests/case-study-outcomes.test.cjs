// Outcome presentation (G7 visual integration): the page may re-lay-out the editor's bold-lead outcome list, and must
// fall back to ordinary rich text whenever that is not certain. Nothing is computed, verified or invented.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load, root } = require('./helpers/ts-loader.cjs');

const t = (value, bold) => ({ nodeType: 'text', value, marks: bold ? [{ type: 'bold' }] : [], data: {} });
const p = (...runs) => ({ nodeType: 'paragraph', data: {}, content: runs });
const li = (...blocks) => ({ nodeType: 'list-item', data: {}, content: blocks });
const ul = (...items) => ({ nodeType: 'unordered-list', data: {}, content: items });
const doc = (...b) => ({ nodeType: 'document', data: {}, content: b });
const item = (lead, ctx) => li(p(t(lead, true), t(ctx ? ` ${ctx}` : '')));
const split = (d) => load('lib/case-study-outcomes.ts').splitImpact(d);
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

test('a clean outcome list becomes outcomes; text before and after stays prose', () => {
  const r = split(doc(p(t('Before.')), ul(item('+12%', 'qualified enquiries, Q1 vs Q4, client CRM.'), item('Sales stopped chasing cold callers', 'documented by the team.')), p(t('After.'))));
  assert.deepStrictEqual(r.outcomes.map((o) => [o.kind, o.lead]), [['figure', '+12%'], ['statement', 'Sales stopped chasing cold callers']]);
  assert.strictEqual(r.outcomes[0].context, 'qualified enquiries, Q1 vs Q4, client CRM.');
  assert.strictEqual(r.before.content.length, 1);
  assert.strictEqual(r.after.content.length, 1);
});

test('a figure is never separated from its context: no context means no extraction', () => {
  assert.strictEqual(split(doc(ul(item('+12%', ''), item('Better handover', 'documented.')))), null);
  assert.strictEqual(split(doc(ul(item('3', '   ')))), null);
});

test('uncertain structures fall back to ordinary rich text', () => {
  const plain = li(p(t('No bold lead here.')));
  const link = li(p(t('9 weeks', true), { nodeType: 'hyperlink', data: { uri: 'https://example.com' }, content: [t('source')] }));
  const nested = li(p(t('9 weeks', true), t(' to first call.')), ul(li(p(t('detail')))));
  const many = Array.from({ length: 7 }, (_, i) => item(`Outcome ${i}`, 'documented.'));
  assert.strictEqual(split(doc(ul(plain))), null, 'item without a bold lead');
  assert.strictEqual(split(doc(ul(item('+12%', 'ctx'), plain))), null, 'one item without a bold lead');
  assert.strictEqual(split(doc(ul(link))), null, 'a link inside an item');
  assert.strictEqual(split(doc(ul(nested))), null, 'nested content');
  assert.strictEqual(split(doc(ul(...many))), null, 'more than six items');
  assert.strictEqual(split(doc(ul())), null, 'empty list');
  assert.strictEqual(split(doc(p(t('Just prose.')))), null, 'no list');
  assert.strictEqual(split(undefined), null);
});

test('a bold number is a figure only when short; a long bold sentence with a digit is a statement and never reaches a listing', () => {
  const O = load('lib/case-study-outcomes.ts');
  const r = O.splitImpact(doc(ul(item('Lead response time cut from 3 days to 2 hours', 'internal log, 2025.'), item('Calmer sales team', 'documented.'), item('4.2×', 'return on spend, Jan–Jun 2025, ad platform report.'))));
  assert.deepStrictEqual(r.outcomes.map((o) => o.kind), ['statement', 'statement', 'figure']);
  assert.deepStrictEqual(O.plainStatements(r.outcomes), ['Calmer sales team']);
});

test('the study view and the pages never call a figure verified, and never add a field or a number', () => {
  const files = ['components/case-study/CaseStudyTemplate.tsx', 'lib/case-study-outcomes.ts', 'components/b2/work-cards.ts', 'components/b2/Work.tsx', 'components/b2/WorkLibrary.tsx'];
  for (const f of files) {
    const src = read(f).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    assert.doesNotMatch(src, /verified|proven|guarantee|Measured result/i, f);
  }
  // the listing reads statements only: no figure text can reach a card or the public index
  const studies = read('components/cplus/work/studies.ts');
  assert.match(studies, /plainStatements\(split\.outcomes\)/);
  assert.doesNotMatch(read('lib/contentful/queries.ts'), /metrics|figure/i);
});

test('the new template links back to /work and on to the next study, and carries no review bar or fixture', () => {
  const tpl = read('components/case-study/CaseStudyTemplate.tsx');
  assert.match(tpl, /href="\/work"[\s\S]{0,200}Back to all case studies/);
  assert.match(tpl, /Next case study/);
  for (const f of ['components/case-study/CaseStudyTemplate.tsx', 'app/(pages)/portfolio/[slug]/page.tsx', 'app/(pages)/work/page.tsx']) {
    assert.doesNotMatch(read(f), /ConceptBar|concepts|Synthetic|fixture/i, f);
  }
  assert.ok(!fs.existsSync(path.join(root, 'app/(pages)/concepts')));
  assert.ok(!fs.existsSync(path.join(root, 'components/concepts')));
});

test('classification: only a bold lead that IS a number is a figure; signs are never trimmed; years, dates and counted words are statements', () => {
  const O = load('lib/case-study-outcomes.ts');
  const kinds = (...leads) => O.splitImpact(doc(ul(...leads.map((l) => item(l, 'context.'))))).outcomes.map((o) => o.kind);
  assert.deepStrictEqual(kinds('+12%', '-27%', '−3 pts', '4.2×', '₹1.2 cr', '38% → 61%'), Array(6).fill('figure'));
  assert.deepStrictEqual(kinds('120 to 340'), ['figure']);
  assert.deepStrictEqual(kinds('2025', 'Q3 2025', '12 weeks', 'Top 3', 'Cut CPL by 38%', '3 stages'), Array(6).fill('statement'));
  const r = O.splitImpact(doc(ul(item('-27%', 'cost per enquiry, Apr–Jun 2025 against Apr–Jun 2024.'), li(p(t('Cost per lead', true), t(' -12% against the prior quarter.'))), li(p(t('Reach', true), t(' – up in the second half.'))))));
  assert.deepStrictEqual(r.outcomes.map((o) => [o.lead, o.context]), [['-27%', 'cost per enquiry, Apr–Jun 2025 against Apr–Jun 2024.'], ['Cost per lead', '-12% against the prior quarter.'], ['Reach', 'up in the second half.']]);
  assert.deepStrictEqual(O.plainStatements(O.splitImpact(doc(ul(item('Q3 2025', 'x'), item('Calmer team', 'y')))).outcomes), ['Calmer team']);
});
