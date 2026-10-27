const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const c = load('components/real-estate-r2/content.ts');
const html = renderToStaticMarkup(React.createElement(load('components/real-estate-r2/RealEstateR2.tsx').RealEstateR2));
const text = html.replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const src = ['content.ts', 'RealEstateR2.tsx', 'real-estate-r2.css'].map((f) => fs.readFileSync(`components/real-estate-r2/${f}`, 'utf8')).join('\n');

test('live H1 kept; primary audience labels; one unified journey', () => {
  assert.equal(c.HERO.h1.join(''), 'More property enquiries. More of the right buyers.');
  assert.equal(c.HERO.eyebrow, 'Who we help: property developers and Channel Partners');
  assert.match(text, /Property Developers/); assert.match(text, /Channel Partners/);
  assert.ok(!/agents? and brokers|brokers?\b|agents?\b/i.test(text), 'no agents or brokers in audience-facing copy');
  assert.deepEqual(c.JOURNEYS.steps.map((s) => s.t), ['Discover', 'Explore', 'Enquire', 'Connect', 'Potential Visit']);
  assert.ok(c.JOURNEYS.steps[3].may && c.JOURNEYS.steps[4].may && !c.JOURNEYS.steps[2].may);
  assert.equal((html.match(/rer2-jny/g) || []).length, 1); assert.ok(!/rer2-lane/.test(html));
  assert.equal((html.match(/<ol aria-label="From discovery to a potential visit"/g) || []).length, 1);
});
test('owner-removed sentences are gone everywhere on the page', () => {
  for (const g of ['Illustrative scene with a generic property', 'A good fit is the aim, not a promise', 'Developers and brokers sell differently', 'Channel partners promoting a developer', 'sit between the two', 'MappedSkills manages the advertising. Your sales team', 'MappedSkills manages the advertising. You handle', 'We do not see what we are not given', 'We show no broker campaign'])
    assert.ok(!text.includes(g) && !src.includes(g), g);
  assert.match(text, /Developers and partners sell differently, so we plan their advertising differently\./);
});
test('no figures, testimonial, broker evidence or reserved case link', () => {
  assert.ok(!/₹|\d+(\.\d+)?\s?%|2,786|testimonial|google-ppc-for-real-estate/i.test(text.replace(/Conceptual illustration/g, '')));
  assert.ok(!/href="[^"]*google-ppc/.test(html));
  assert.match(html, /href="\/portfolio\/om-sai-developer-meta-ads"/);
  assert.ok(!/broker campaign/i.test(text.replace(/Conceptual illustration/g, '')));
  assert.ok(!/Scoped separately/.test(text));
});
test('creative and compliance boundaries are stated; no settled RERA or Meta Housing claims', () => {
  assert.match(text, /You provide original property photographs and videos|original property photographs and videos/);
  assert.match(text, /Video production, brochures, landing pages and additional creative are scoped separately/);
  assert.equal((html.match(/rer2-w rer2-w--/g) || []).length, 2);
  assert.ok(!/RERA|Housing special|special ad categor/i.test(text));
  assert.match(text, /confirm them with your own advisers/);
  assert.ok(!/we (will )?(handle|manage|run) (calls|site visits|negotiations|sales)/i.test(text));
});
test('no dashes as punctuation', () => { assert.ok(!/[–—]/.test(src)); assert.ok(!/ - /.test(text)); });
test('FAQ list has nine questions, each answered', () => {
  assert.equal((html.match(/<details/g) || []).length, 9);
  for (const f of c.FAQS) assert.ok(f.answer.length > 40);
});
test('animation is once-only and reduced-motion safe', () => {
  const css = fs.readFileSync('components/real-estate-r2/real-estate-r2.css', 'utf8');
  assert.ok(!/infinite/.test(css)); assert.match(css, /prefers-reduced-motion: reduce/);
});
