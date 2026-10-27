const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const c41 = load('components/google-ads-r41/content.ts');
const c4 = load('components/google-ads-r4/content.ts');
const { GoogleAdsR41 } = load('components/google-ads-r41/GoogleAdsR41.tsx');
const html = renderToStaticMarkup(React.createElement(GoogleAdsR41));
const text = html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const src = ['content.ts', 'GoogleAdsR41.tsx', 'CampaignSelector.tsx', 'google-ads-r41.css'].map((f) => fs.readFileSync(`components/google-ads-r41/${f}`, 'utf8')).join('\n');
const plain = (x) => JSON.parse(JSON.stringify(x));

test('hero keeps the headline and uses the approved paragraph and CTAs', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(text, /Reach customers when they’re looking for what you sell\./);
  assert.equal(c41.HERO.lede, 'Reach people searching for what you sell. We manage Google Ads to help turn relevant searches into enquiries and purchases.');
  assert.match(html, /href="\/contact"[^>]*>Discuss Your Google Ads/);
  assert.match(html, /href="\/contact\?intent=call"/);
});
test('Why Google Ads keeps the three approved examples', () => {
  assert.deepEqual(plain(c41.INTENT.rows), plain(c4.INTENT.rows));
  for (const q of ['cotton sweatshirt for men', 'online coding course for beginners', '2 BHK flats near me']) assert.ok(text.includes(q), q);
});
test('selector keeps five tabs, tab semantics and the no-script fallback', () => {
  assert.equal((html.match(/role="tab"/g) || []).length, 5);
  assert.equal((html.match(/role="tabpanel"/g) || []).length, 5);
  assert.equal((html.match(/aria-selected="true"/g) || []).length, 1);
  assert.match(html, /<noscript>/);
  assert.deepEqual(plain(c41.TYPES.items), plain(c4.TYPES.items));
});
test('unchanged sections are identical to R4', () => {
  for (const k of ['MANAGE', 'JOURNEY', 'MEASURE', 'WORK', 'PROCESS', 'FAQS', 'CLOSE', 'META']) assert.deepEqual(plain(c41[k]), plain(c4[k]), k);
});
test('no dashes as punctuation in R4.1 sources', () => {
  assert.ok(!/[–—]/.test(src));
  assert.ok(!/ -- /.test(JSON.stringify(c41.HERO) + JSON.stringify(c41.INTENT) + JSON.stringify(c41.TYPES)));
});
