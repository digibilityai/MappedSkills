const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const { PaidAdvertisingD2C } = load('components/paid-advertising/d2c/PaidAdvertisingD2C.tsx');
const { D2CJsonLd } = load('components/paid-advertising/d2c/D2CJsonLd.tsx');
const { PaidAdvertisingHome } = load('components/paid-advertising/home/PaidAdvertisingHome.tsx');
const { PaidAdvertisingServices } = load('components/paid-advertising/services/PaidAdvertisingServices.tsx');
const html = renderToStaticMarkup(React.createElement(PaidAdvertisingD2C));
const ld = renderToStaticMarkup(React.createElement(D2CJsonLd));
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const parse = (s) => [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1].replace(/\\u003c/g, '<')));

test('one H1 and the seven approved sections in order', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const labels = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(labels, ['dx-h1', 'dx-ready', 'dx-roles', 'dx-journey', 'dx-measure', 'dx-proof', 'dx-faq', 'dx-close']);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of labels) assert.ok(ids.includes(l), l);
});
test('approved hero and CTAs', () => {
  assert.match(text, /More orders are good\. Profitable growth is better\./);
  assert.match(text, /Getting people to your store is only part of the job\. We help D2C brands use Google Ads and Meta Ads to reach relevant shoppers, while keeping customer acquisition costs and business economics in focus\./);
  assert.match(html, /href="\/contact">Discuss D2C Advertising/);
  assert.match(html, /href="\/contact\?intent=call">Request a call/);
});
test('readiness: corrected intro, seven considerations, constructive closing, no harsh wording', () => {
  assert.match(text, /Before you spend more on ads, make sure your business is ready\./);
  assert.match(text, /Before recommending advertising, we look at what is already working in your business, what could limit results, and where your budget can make the biggest difference\./);
  assert.equal((html.split('class="dx-ready"')[1].split('</ul>')[0].match(/<h3>/g) || []).length, 7);
  for (const t of ['Existing product demand and sales', 'Product margins and affordable acquisition costs', 'Store and mobile checkout quality', 'Stock and delivery readiness', 'Trust, reviews and product presentation', 'Returns and cash-on-delivery economics', 'Offer and creative quality']) assert.match(text, new RegExp(t));
  assert.match(text, /You do not need high volumes\./);
  assert.match(text, /Improving them is often part of getting more from advertising\./);
  assert.doesNotMatch(text, /fix them first|will not start advertising|pass|fail|not ready/i);
});
test('roles: Google and Meta routes to one store, Click-to-WhatsApp with the responsibility boundary', () => {
  assert.match(html, /href="\/google-ads">Explore Google Ads/);
  assert.match(html, /href="\/social-media-ads">Explore Meta Ads/);
  assert.match(text, /Many D2C brands use both\. We assess which should come first, and say if one is enough\./);
  assert.match(text, /Click-to-WhatsApp\. Some products sell through conversation/);
  assert.match(text, /Your team replies, and chat automation or CRM connections are not included unless your proposal says so\./);
});
test('journey: five stages, improvement loop, repeat purchases separate and not guaranteed, responsibilities', () => {
  const stages = [...html.matchAll(/class="dx-node"[^>]*>\d<\/span><h3>([^<]+)<\/h3>/g)].map(m => m[1]);
  assert.deepEqual(stages, ['Discover', 'Consider', 'Buy', 'Measure', 'Improve']);
  assert.match(text, /From product discovery to sustainable growth/);
  assert.match(text, /Improving feeds back into discovering\. Not every visitor buys, and no campaign is certain to be profitable\./);
  assert.match(text, /Repeat purchases\. Where your product and customers support it/);
  assert.doesNotMatch(text, /Buy again/);
  for (const t of ['We manage', 'You manage', 'Scoped separately unless your proposal includes it']) assert.match(text, new RegExp(t));
  assert.match(text, /We are not an ecommerce developer, a fulfilment partner or a social media manager\./);
});
test('measurement: ROAS is not profit, Reporting Policy A, tracking boundary, pricing link, no guarantees', () => {
  assert.match(text, /Return on ad spend \(ROAS\) is the sales a platform reports for each rupee spent\. It is not profit\./);
  assert.match(text, /monthly reporting with ongoing management, and review calls as agreed in your proposal\./);
  assert.match(text, /New tracking setup, repairs and integrations are scoped separately unless your proposal includes them\./);
  assert.match(text, /Not every sale can be traced to an ad\. Where we cannot tell, we say so\./);
  assert.match(text, /Ad spend is paid directly to Google or Meta\. MappedSkills management fees are separate\. Additional work is scoped and agreed separately\. We cannot guarantee orders, profitability or return on ad spend\./);
  assert.ok((html.match(/href="\/pricing"/g) || []).length >= 2);
  assert.doesNotMatch(text, /where technically possible, we set up tracking/i);
});
test('proof: Wanderlooms unlinked, four assessment questions labelled as approach, no results', () => {
  const doc = html.split('class="dx-doc"')[1].split('</article>')[0];
  assert.match(doc, /Wanderlooms/);
  assert.match(doc, /Meta advertising for an adventure apparel brand featured on Shark Tank India\./);
  assert.doesNotMatch(doc, /<a\b/);
  const ap = html.split('class="dx-approach"')[1].split('</div>')[0];
  assert.equal((ap.match(/<li>/g) || []).length, 4);
  assert.match(ap, /They are not findings from Wanderlooms or any client\./);
  assert.match(html, /href="\/work">View All Case Studies/);
  assert.doesNotMatch(html.split('aria-labelledby="dx-proof"')[1].split('</section>')[0], /<img/);
});
test('no unsupported claims, other platforms, dashes or figures', () => {
  assert.doesNotMatch(text, /YouTube|Amazon|Flipkart|LinkedIn Ads|ChatGPT|TikTok|Apple/i);
  assert.doesNotMatch(text, /₹|\d+(\.\d+)?\s?(%|x|×)\b|testimonial|Google Partner|certified/i);
  assert.doesNotMatch(text, /free (audit|review|account|consultation)|within \d+ (hours|minutes)/i);
  assert.doesNotMatch(text, /[–—]|--/);
  const src = fs.readFileSync('components/paid-advertising/d2c/content.ts', 'utf8').split('\n').filter(l => !/^\s*(\/\*|\*)/.test(l)).join('\n');
  assert.doesNotMatch(src, /[–—]/);
});
test('seven native FAQs matching FAQPage; the budget FAQ links to pricing', () => {
  assert.equal((html.match(/<details>/g) || []).length, 7);
  const nodes = parse(ld);
  assert.deepEqual(nodes.map(n => n['@type']).sort(), ['BreadcrumbList', 'FAQPage']);
  const faq = nodes.find(n => n['@type'] === 'FAQPage');
  for (const q of faq.mainEntity) { assert.ok(text.includes(q.name)); assert.ok(text.includes(q.acceptedAnswer.text)); }
  assert.match(html, /How much should I spend, and what can I expect\?[\s\S]*?href="\/pricing">Understand Our Pricing Approach/);
  assert.deepEqual(nodes.find(n => n['@type'] === 'BreadcrumbList').itemListElement.map(c => c.name), ['Home', 'D2C brands']);
  assert.doesNotMatch(ld, /"Service"|"(price|offers|aggregateRating|review)"/i);
  assert.match(text, /Tell us about your products and your store\./);
});
test('route: new, self-canonical, approved metadata', () => {
  const { metadata } = load('app/(pages)/who-we-help/d2c/page.tsx');
  assert.equal(metadata.title, 'Paid Advertising for D2C Brands in India | MappedSkills');
  assert.equal(metadata.description, 'Google Ads and Meta Ads management for D2C brands in India, with customer acquisition costs and business economics in focus. Discuss your advertising.');
  assert.equal(metadata.alternates.canonical, 'https://mappedskills.com/who-we-help/d2c');
});
test('approved inbound links: homepage D2C card and one /services link; sitemap and analytics mapping; header and footer untouched', () => {
  const home = renderToStaticMarkup(React.createElement(PaidAdvertisingHome));
  const d2cCard = home.split('id="d2c"')[1].split('</article>')[0];
  assert.match(d2cCard, /<h3><a class="pa-card-link" href="\/who-we-help\/d2c">D2C brands<\/a><\/h3>/);
  assert.match(d2cCard, /Bring your products to relevant customers/);
  assert.equal((home.match(/href="\/who-we-help\/d2c"/g) || []).length, 1);
  const services = renderToStaticMarkup(React.createElement(PaidAdvertisingServices));
  assert.equal((services.match(/href="\/who-we-help\/d2c"/g) || []).length, 1);
  assert.match(fs.readFileSync('app/sitemap.ts', 'utf8'), /'\/who-we-help\/d2c'/);
  assert.equal(load('lib/analytics.ts').pageTypeOf('/who-we-help/d2c'), 'commercial');
  const nav = fs.readFileSync('components/direction-c/nav.ts', 'utf8');
  assert.match(nav, /href: '\/#who-we-help', label: 'Who We Help'/);
  assert.doesNotMatch(nav, /who-we-help\/d2c/);
  assert.doesNotMatch(fs.readFileSync('app/sitemap.ts', 'utf8'), /'\/(portfolio\/)?google-ads-for-ecommerce'|'\/d2c'|'\/ecommerce-marketing'/);
});
test('stylesheet: no sticky or fixed elements, reduced-motion override, nothing hidden without script', () => {
  const css = fs.readFileSync('components/paid-advertising/d2c/d2c.css', 'utf8');
  assert.doesNotMatch(css, /position:\s*(sticky|fixed)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(html, /data-pending/);
});
