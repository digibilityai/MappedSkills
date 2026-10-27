const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const c = load('components/enquiry-led-r11/content.ts');
const html = renderToStaticMarkup(React.createElement(load('components/enquiry-led-r11/EnquiryLedR11.tsx').EnquiryLedR11));
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');

test('owner feedback: the removed sentence and defensive wording are gone', () => {
  const t = text(html);
  assert.doesNotMatch(t, /dots are not data|Illustration of the idea|Not every enquiry becomes a conversation or a sale/i);
  assert.doesNotMatch(t, /not client results|no case studies|case studies for this audience|not a result/i);
});
test('working hero, one H1, and the story order', () => {
  assert.equal((html.match(/<h1/g) || []).length, 1);
  assert.match(text(html), /More enquiries are good\. Better conversations are worth more\./);
  const ids = ['e11-h1', 'e11-rel-h', 'e11-who-h', 'e11-path-h', 'e11-rl-h', 'e11-dc-h', 'e11-mt-h', 'e11-faq-h', 'e11-close-h'];
  const at = ids.map((i) => html.indexOf(`id="${i}"`));
  assert.ok(at.every((n) => n > -1) && at.every((n, i) => i === 0 || n > at[i - 1]), 'sections in order');
});
test('no proof, no figures, no dashes as punctuation, no excluded claims', () => {
  const t = text(html);
  assert.doesNotMatch(t, /[–—]| -- /);
  assert.doesNotMatch(t, /\d+\s?%|₹|\bROAS\b|testimonial|trusted by|AnyBodyCanBake|Om Sai|Wanderlooms/i);
  assert.doesNotMatch(t, /we (handle|run|manage) (your )?(consultations|sales|follow-up|CRM)/i);
  assert.doesNotMatch(html, /<img|next\/image/);
});
test('the relevance view works without script: radio inputs, default view is all enquiries', () => {
  assert.match(html, /<input type="radio" id="e11-all" name="e11-view" checked=""\/>/);
  assert.match(html, /id="e11-relv"/);
  assert.equal((html.match(/<li class="e11-row( e11-row--rel)?">/g) || []).length, 8);
});
test('path: five stages in an ordered list, marks hidden from assistive technology, no caption', () => {
  assert.equal((html.match(/class="e11-stage"/g) || []).length, 5);
  assert.match(html, /<ol class="e11-stages"/);
  assert.match(html, /class="e11-dots e11-dots--1" aria-hidden="true"/);
  assert.doesNotMatch(html, /e11-cap/);
});
test('five choices pair with five ad parts; method has five steps', () => {
  assert.equal(c.DECISIONS.items.length, 5);
  assert.equal((html.match(/e11-p e11-p--/g) || []).length, 5);
  assert.equal(c.METHOD.steps.length, 5);
});
test('main descriptions stay between 15 and 25 words', () => {
  const ds = [...c.PATH.stages, ...c.ROLES.google ? [c.ROLES.google, c.ROLES.meta] : [], ...c.DECISIONS.items].map((x) => x.d);
  for (const d of ds) { const n = d.split(/\s+/).length; assert.ok(n >= 15 && n <= 25, `${n}: ${d}`); }
});
test('CTA and link destinations; /lead-generation only linked', () => {
  assert.match(html, /href="\/contact"/);
  assert.match(html, /href="\/contact\?intent=call"/);
  for (const h of ['/google-ads', '/social-media-ads', '/pricing', '/lead-generation', '/who-we-help/d2c', '/who-we-help/education', '/who-we-help/real-estate']) assert.match(html, new RegExp(`href="${h}"`));
  assert.equal(c.FAQS.length, 7);
  assert.ok(c.META.title.length <= 62 && c.META.description.length <= 160);
});
