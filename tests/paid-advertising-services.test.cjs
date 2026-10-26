const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const { PaidAdvertisingServices } = load('components/paid-advertising/services/PaidAdvertisingServices.tsx');
const { ServicesJsonLd } = load('components/paid-advertising/services/ServicesJsonLd.tsx');
const { PaidAdvertisingHome } = load('components/paid-advertising/home/PaidAdvertisingHome.tsx');
const html = renderToStaticMarkup(React.createElement(PaidAdvertisingServices));
const ld = renderToStaticMarkup(React.createElement(ServicesJsonLd));
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const jsonLd = [...ld.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1].replace(/\\u003c/g, '<')));

test('/services has one H1 and the eight approved main sections in order', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const labels = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(labels, ['sx-h1', 'sx-services', 'sx-fit', 'sx-scope', 'sx-work', 'sx-process', 'sx-cost', 'sx-faq', 'sx-close']);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of labels) assert.ok(ids.includes(l), l);
  assert.match(html, /href="#services"/);
  assert.match(html, /id="services"/);
});
test('hero and service copy follow Content R2 with the owner corrections', () => {
  assert.match(text, /Reach more of the right customers with Google Ads and Meta Ads\./);
  assert.match(text, /We plan and manage campaigns around relevant searches, your advertising budget and the actions you want customers to take\./);
  assert.match(text, /Option within Meta Ads: where it suits your business, ads can start a WhatsApp chat/);
  assert.match(html, /href="\/google-ads"/);
  assert.match(html, /href="\/social-media-ads"/);
  assert.match(html, /href="\/how-it-works"/);
  assert.match(html, /href="\/pricing"/);
  assert.match(html, /href="\/contact"/);
  assert.doesNotMatch(text, /Click-to-WhatsApp (service|ads management)/);
});
test('no other platforms, free offers, response times, figures or invented proof', () => {
  assert.doesNotMatch(text, /YouTube|Amazon|Flipkart|quick[- ]commerce|LinkedIn Ads|ChatGPT|Apple/i);
  assert.doesNotMatch(text, /free (audit|review|account)|within \d+ (hours|minutes)|24 ?hours|response time/i);
  assert.doesNotMatch(text, /₹|\d+(\.\d+)?\s?(%|x|×)\b|ROAS|testimonial/i);
  assert.doesNotMatch(text, /Illustrative imagery/);
});
test('copy contains no long dashes and no double hyphens', () => {
  assert.doesNotMatch(text, /[–—]|--/);
  const src = fs.readFileSync('components/paid-advertising/services/content.ts', 'utf8').split('\n').filter(l => !/^\s*(\/\*|\*)/.test(l)).join('\n');
  assert.doesNotMatch(src, /[–—]/);
});
test('client work: three cards, verified links only, no individual Wanderlooms link', () => {
  const cards = html.split('class="sx-work"').slice(1);
  assert.equal(cards.length, 3);
  const [bake, wander, omsai] = cards;
  assert.match(bake, /AnyBodyCanBake/);
  assert.match(bake, /href="\/portfolio\/google-ads-for-online-courses"/);
  assert.match(wander, /Wanderlooms/);
  assert.match(wander, /featured on Shark Tank India\./);
  assert.doesNotMatch(wander.split('</article>')[0], /<a\b/);
  assert.match(omsai, /href="\/portfolio\/om-sai-developer-meta-ads"/);
  assert.match(html, /View All Case Studies/);
  assert.doesNotMatch(html.split('id="sx-work"')[1].split('id="sx-process"')[0], /<img/);
});
test('management scope separates included work from separately scoped work and qualifies reporting and creative', () => {
  assert.match(text, /Included in management/);
  assert.match(text, /Agreed separately/);
  assert.match(text, /review calls where agreed in your proposal/);
  assert.match(text, /defined number of static ad designs\. The number is agreed in the proposal/);
  assert.match(text, /Ad spend.*Paid directly to the platform.*Management fee.*Separately scoped work/);
});
test('FAQ: six native details that match the FAQPage markup exactly', () => {
  assert.equal((html.match(/<details>/g) || []).length, 6);
  const faq = jsonLd.find(j => j['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 6);
  for (const q of faq.mainEntity) {
    assert.ok(text.includes(q.name), q.name);
    assert.ok(text.includes(q.acceptedAnswer.text), q.name);
  }
});
test('structured data: breadcrumb, FAQ and two India Country services, no prices or ratings', () => {
  const types = jsonLd.map(j => j['@type']).sort();
  assert.deepEqual(types, ['BreadcrumbList', 'FAQPage', 'Service', 'Service']);
  for (const s of jsonLd.filter(j => j['@type'] === 'Service')) {
    assert.deepEqual(s.areaServed, { '@type': 'Country', name: 'India' });
    assert.match(s.provider['@id'], /#organization$/);
  }
  assert.doesNotMatch(ld, /"City"|"(price|priceRange|offers|aggregateRating|review)"/i);
  const crumbs = jsonLd.find(j => j['@type'] === 'BreadcrumbList').itemListElement;
  assert.deepEqual(crumbs.map(c => c.name), ['Home', 'Services']);
});
test('route keeps /services canonical with the provisional metadata', () => {
  const { metadata } = load('app/(pages)/services/page.tsx');
  assert.equal(metadata.alternates.canonical, 'https://mappedskills.com/services');
  assert.equal(metadata.title, 'Google Ads and Meta Ads Management in India | MappedSkills');
  assert.ok(metadata.description.length <= 160);
  assert.equal(metadata.openGraph.url, 'https://mappedskills.com/services');
});
test('shared ad mockups leave the homepage unchanged and the stylesheet adds no sticky or fixed elements', () => {
  const home = renderToStaticMarkup(React.createElement(PaidAdvertisingHome));
  assert.match(home, /pa-platform--search/);
  assert.match(home, /pa-platform--social/);
  const css = fs.readFileSync('components/paid-advertising/services/services.css', 'utf8');
  assert.doesNotMatch(css, /position:\s*(sticky|fixed)/);
  assert.doesNotMatch(html, /data-pending/);
});
