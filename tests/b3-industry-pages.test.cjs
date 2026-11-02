// B3 (Brand DNA 4.0): the four audience pages. FAQ link contrast, type floors, single-colour emphasis, industry work links, the D2C
// campaign-roles layout and the Enquiry-Led showcase ground. Copy, headings, links and structured data are otherwise unchanged.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
Module._extensions['.css'] = () => {};
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');

const PAGES = {
  d2c: { dir: 'd2c-r1', comp: 'D2CR1', file: 'D2CR1.tsx', css: 'd2c-r1.css', pre: 'd2c1' },
  education: { dir: 'education-r2', comp: 'EducationR2', file: 'EducationR2.tsx', css: 'education-r2.css', pre: 'edr2' },
  'real-estate': { dir: 'real-estate-r2', comp: 'RealEstateR2', file: 'RealEstateR2.tsx', css: 'real-estate-r2.css', pre: 'rer2' },
  'enquiry-led': { dir: 'enquiry-led-r11', comp: 'EnquiryLedR11', file: 'EnquiryLedR11.tsx', css: 'enquiry-led-r11.css', pre: 'e11' },
};
const render = (k, props = {}) => renderToStaticMarkup(React.createElement(load(`components/${PAGES[k].dir}/${PAGES[k].file}`)[PAGES[k].comp], props));
const remOf = (css, sel) => {
  const rule = css.match(new RegExp(`^\\${sel} \\{([^}]*)\\}`, 'm'));
  assert.ok(rule, sel);
  return Number(rule[1].match(/(?:font-size: |font: \d+ )([\d.]+)rem/)[1]);
};

test('B3-01: FAQ answer links use the dark link treatment on the dark FAQ; wording and destinations unchanged', () => {
  const want = { education: [['/pricing', 'Understand Our Pricing Approach']], 'real-estate': [['/pricing', 'Understand Our Pricing Approach']], 'enquiry-led': [['/lead-generation', 'Read about lead generation'], ['/pricing', 'Our pricing approach']] };
  for (const [k, links] of Object.entries(want)) {
    const faq = render(k).split(`id="${PAGES[k].pre}-faq-h"`)[1].split('</section>')[0];
    const found = [...faq.matchAll(/<a class="([^"]+)" href="([^"]+)">([^<]+)</g)].map((m) => [m[1], m[2], m[3]]);
    assert.deepEqual(found, links.map(([h, l]) => ['rv3-tl rv3-tl--dark', h, l]), k);
  }
  const css = read('components/resolve-home-r3/resolve-home-r3.css');
  assert.match(css, /\.rv3-tl--dark \{ color: #fff;/);
  assert.match(css, /\.rv3-dark :focus-visible, \.rv3-close :focus-visible \{ outline-color: #fff; \}/);
});

test('B3-02: the 17 labels are at least .75rem and the 7 captions at least .875rem', () => {
  const labels = { d2c: ['.d2c1-receipt-l', '.d2c1-chan', '.d2c1-plat'], education: ['.edr2-chart-l', '.edr2-tag', '.edr2-chan', '.edr2-plat', '.edr2-h-tag'], 'real-estate': ['.rer2-tag'], 'enquiry-led': ['.e11-inbox-h', '.e11-convo-h', '.e11-row-tag', '.e11-ask-l', '.e11-ex-l', '.e11-plat', '.e11-bridge-l'] };
  const captions = { d2c: ['.d2c1-ledger', '.d2c1-receipt-c', '.d2c1-role-f'], education: ['.edr2-legend', '.edr2-cap', '.edr2-role-f', '.edr2-h-sm'] };
  for (const [k, sels] of Object.entries(labels)) for (const s of sels) assert.ok(remOf(read(`components/${PAGES[k].dir}/${PAGES[k].css}`), s) >= 0.75, s);
  for (const [k, sels] of Object.entries(captions)) for (const s of sels) assert.ok(remOf(read(`components/${PAGES[k].dir}/${PAGES[k].css}`), s) >= 0.875, s);
  // `.e11-plat span` (the moment, 17th label) inherits from `.e11-plat` and sets no size of its own.
  assert.doesNotMatch(read('components/enquiry-led-r11/enquiry-led-r11.css'), /\.e11-plat span \{[^}]*font/);
});

test('B3-02: FAQ and "shape every" headings are one colour with the same words; heading levels unchanged', () => {
  for (const k of Object.keys(PAGES)) {
    const html = render(k);
    assert.match(html, new RegExp(`<h2 id="${PAGES[k].pre}-faq-h">A few questions before we talk</h2>`), k);
    assert.equal((html.match(/<h1/g) || []).length, 1, k);
  }
  assert.match(render('real-estate'), /<h2 id="rer2-dc-h">Five decisions shape every campaign\.<\/h2>/);
  assert.match(render('enquiry-led'), /<h2 id="e11-dc-h">Five choices shape every enquiry\.<\/h2>/);
  // Other section headings keep their approved emphasis.
  assert.match(render('real-estate'), /<h2 id="rer2-ms-h">Look beyond <em>the lead count\.<\/em><\/h2>/);
});

test('B3-03: "See our work" follows the showcase\'s verified View all target, falling back to /work; label unchanged', () => {
  for (const [k, filtered] of [['d2c', '/work?industry=ecommerce-retail'], ['education', '/work?industry=education']]) {
    const hero = (html) => html.split('</h1>')[1].split('</section>')[0];
    const viewAll = { href: filtered, label: 'View all', filtered: true };
    const withShowcase = hero(render(k, { showcase: { id: 'x', aliases: [], eyebrow: '', heading: ['', ''], tone: 'light', wrapClass: '', cards: [], viewAll } }));
    assert.match(withShowcase, new RegExp(`href="${filtered.replace('?', '\\?')}">See our work`), k);
    assert.match(hero(render(k)), /href="\/work">See our work/, `${k} fallback`);
  }
});

test('B3-04: D2C campaign roles keep all five cards and both lists; layout only', () => {
  const html = render('d2c');
  const hp = html.split('id="d2c1-hp-h"')[1].split('</section>')[0];
  assert.equal((hp.match(/<p class="d2c1-plat">/g) || []).length, 5);
  assert.equal((hp.match(/<p class="d2c1-role-f">/g) || []).length, 5);
  for (const t of ['Campaign setup and targeting', 'Monthly performance reporting', 'Original photographs and videos', 'Orders, delivery and customer replies', 'scoped separately']) assert.ok(text(hp).includes(t), t);
  const css = read('components/d2c-r1/d2c-r1.css');
  assert.match(css, /\.d2c1-roles li, \.d2c1-split li \{ margin: 0; \}/);
  assert.doesNotMatch(css.split('B3-04')[1], /(^|[^-])height:/, 'no fixed heights');
});

test('B3-05: Enquiry-Led showcase sits on Ground with Paper cards, scoped to the page; the shared component is unchanged', () => {
  const css = read('components/enquiry-led-r11/enquiry-led-r11.css');
  assert.match(css, /\.e11 section\.cs \{ background: var\(--c-ground\); \}/);
  assert.match(css, /\.e11 \.cs \.cs-card \{ background: var\(--c-paper\); \}/);
  assert.match(read('components/case-showcase/case-showcase.css'), /^section\.cs \{ [^}]*background: #FFFDF9;/m);
});
