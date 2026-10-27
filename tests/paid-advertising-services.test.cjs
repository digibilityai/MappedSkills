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

test('/services has one H1 and the six approved R2 main sections in order', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const labels = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(labels, ['sx-h1', 'sx-path', 'sx-services', 'sx-work', 'sx-terms', 'sx-faq', 'sx-close']);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of labels) assert.ok(ids.includes(l), l);
  assert.match(html, /href="#path"/);
  assert.match(html, /id="path"/);
});
test('hero copy and service copy follow R2; Google Ads and Meta Ads stay the two core services', () => {
  assert.match(text, /Reach more of the right customers with Google Ads and Meta Ads\./);
  assert.match(text, /We plan and manage paid advertising so more of the right buyers find you/);
  assert.match(text, /We plan and manage campaigns around the searches that matter, your budget and the enquiry or purchase you want\./);
  assert.match(text, /Meta Ads means Facebook and Instagram advertising\. We do not manage your posting\./);
  assert.doesNotMatch(text, /WhatsApp chat/);
  for (const h of ['/google-ads', '/social-media-ads', '/how-it-works', '/pricing', '/contact', '/work', '/seo', '/ai-seo', '/conversion-optimization', '/lead-generation', '/who-we-help/d2c', '/who-we-help/education', '/who-we-help/real-estate', '/who-we-help/enquiry-led-businesses']) assert.match(html, new RegExp('href="' + h.replace(/\//g, '\\/') + '"'), h);
});
test('hero diagram: Capture, Convert and the enquiry on the path, Measure observing it; the framework rows stay Capture, Convert, Measure', () => {
  const fig = html.split('<figure')[1].split('</figure>')[0];
  const stations = fig.split('x2-stations')[1].split('</ol>')[0];
  assert.deepEqual([...stations.matchAll(/<b>([^<]+)<\/b>/g)].map(m => m[1]), ['Capture', 'Convert', 'A qualified enquiry']);
  assert.doesNotMatch(stations, /Measure/);
  assert.match(fig, /x2-measure"><b>Measure<\/b>/);
  assert.match(fig, /not measured results/);
  const rows = html.split('x2-rows')[1].split('</ol>')[0];
  assert.deepEqual([...rows.matchAll(/<h3>([^<]+)<\/h3>/g)].map(m => m[1]), ['Capture', 'Convert', 'Measure']);
});
test('supporting capabilities appear only in context, labelled Supporting', () => {
  const rows = html.split('x2-rows')[1].split('</ol>')[0];
  assert.equal((rows.match(/<b>Supporting<\/b>/g) || []).length, 2);
  assert.doesNotMatch(text, /Earlier service pages/);
});
test('ad mockups on /services are neutral illustrations, labelled as not client ads, and appear once each', () => {
  assert.equal((html.match(/pa-platform--search/g) || []).length, 1);
  assert.equal((html.match(/pa-platform--social/g) || []).length, 1);
  assert.doesNotMatch(text, /Eggless Baking Courses|live guidance|free demo|Free demo|Syllabus/i);
  assert.match(text, /Your headline appears here/);
  assert.equal((text.match(/Illustration of how an ad can appear\. Not a client ad\./g) || []).length, 2);
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
test('client work: separate service and industry tags, verified links only, Wanderlooms unlinked with no service tag', () => {
  const work = html.split('id="sx-work"')[1].split('id="sx-terms"')[0];
  const cards = work.split('<article').slice(1);
  assert.equal(cards.length, 3);
  const [bake, omsai, wander] = cards;
  assert.match(bake, /AnyBodyCanBake/);
  assert.match(bake, /x2-tag--svc[^>]*><span class="v">Service <\/span>Google Ads/);
  assert.match(bake, /x2-tag--ind[^>]*><span class="v">Industry <\/span>Education and training/);
  assert.match(bake, /href="\/portfolio\/google-ads-for-online-courses"/);
  assert.match(omsai, /Service <\/span>Meta Ads/);
  assert.match(omsai, /href="\/portfolio\/om-sai-developer-meta-ads"/);
  assert.match(wander, /Wanderlooms/);
  assert.match(wander, /featured on Shark Tank India\./);
  assert.doesNotMatch(wander, /x2-tag--svc|Meta/);
  assert.doesNotMatch(wander.split('</article>')[0], /<a\b/);
  assert.match(html, /href="\/work"[^>]*>View All Case Studies/);
  assert.doesNotMatch(work, /<img/);
});
test('management scope separates included work from separately scoped work and qualifies reporting and creative', () => {
  assert.match(text, /Included in management/);
  assert.match(text, /Agreed separately/);
  assert.match(text, /review calls where your proposal agrees them/);
  assert.match(text, /defined number of static ad designs/);
  assert.match(text, /Ad spend is paid directly to the platform\. Our management fee is charged separately/);
});
test('FAQ: five native details that match the FAQPage markup exactly', () => {
  assert.equal((html.match(/<details>/g) || []).length, 5);
  const faq = jsonLd.find(j => j['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 5);
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
