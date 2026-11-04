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
/* B2 (DEC-120): the work section is the shared case showcase, resolved by the route; a two-card fixture stands in for the public library */
const card = (slug, client, eyebrow) => ({ slug, href: `/portfolio/${slug}`, client, eyebrow, art: null, fig: null, summary: `${client} summary.` });
const SHOWCASE = { id: 'sx-work', aliases: ['our-work'], eyebrow: 'Our work', heading: ['The work ', 'behind the offer'], tone: 'light', wrapClass: 'pa-wrap',
  cards: [card('google-ads-for-online-courses', 'AnybodyCanBake', 'Google Ads · Education and training'), card('wanderlooms-meta-ads', 'Wanderlooms', 'Meta Ads · Apparel')],
  viewAll: { href: '/work', label: 'View all case studies' } };
const html = renderToStaticMarkup(React.createElement(PaidAdvertisingServices, { showcase: SHOWCASE }));
const ld = renderToStaticMarkup(React.createElement(ServicesJsonLd));
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const jsonLd = [...ld.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1].replace(/\\u003c/g, '<')));

test('/services has one H1 and the six approved R2 main sections in order', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const labels = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(labels, ['sx-h1', 'sx-path', 'sx-services', 'sx-which', 'sx-work', 'sx-terms', 'sx-faq', 'sx-close']);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of labels) assert.ok(ids.includes(l), l);
  assert.match(html, /href="#path"/);
  assert.match(html, /id="path"/);
});
test('hero copy and service copy follow R2; Google Ads, Meta Ads and SEO are the three core services', () => {
  assert.match(text, /Reach more of the right customers with Google Ads, Meta Ads and SEO\./);
  assert.match(text, /We plan and manage Google Ads, Meta Ads and SEO so more of the right buyers find you/);
  assert.match(text, /We plan keywords and pages around what customers search for/);
  assert.match(text, /SEO builds over time\. We do not guarantee rankings, traffic or enquiries\./);
  assert.match(text, /We plan and manage campaigns around the searches that matter, your budget and the enquiry or purchase you want\./);
  assert.match(text, /Meta Ads means Facebook and Instagram advertising\. We do not manage your posting\./);
  assert.doesNotMatch(text, /WhatsApp chat/);
  for (const h of ['/google-ads', '/social-media-ads', '/how-it-works', '/pricing', '/contact', '/work', '/seo', '/ai-seo', '/conversion-optimization', '/lead-generation', '/who-we-help/d2c', '/who-we-help/education', '/who-we-help/real-estate', '/who-we-help/enquiry-led-businesses']) assert.match(html, new RegExp('href="' + h.replace(/\//g, '\\/') + '"'), h);
});
test('hero diagram: three journeys (Google Ads, Meta Ads, SEO) converge through Capture and Convert to an enquiry; Measure frames the path; the framework rows stay Capture, Convert, Measure', () => {
  const fig = html.split('<figure')[1].split('</figure>')[0];
  const lanes = fig.split('x3-lanes')[1].split('</ol>')[0];
  assert.deepEqual([...lanes.matchAll(/<span class="x3-pill">([^<]+)<\/span><b>([^<]+)<\/b>/g)].map(m => m[1] + ' ' + m[2]), ['They search Google Ads', 'They browse Meta Ads', 'They compare SEO']);
  const spine = fig.split('x3-spine')[1].split('</ol>')[0];
  assert.deepEqual([...spine.matchAll(/<b>([^<]+)<\/b>/g)].map(m => m[1]), ['Capture', 'Convert', 'A qualified enquiry']);
  assert.doesNotMatch(spine, /Measure/);
  assert.match(fig, /class="x3-measured"[\s\S]*class="x3-measure"><b>Measure<\/b>/);
  assert.match(fig, /not measured results/, 'the diagram is labelled an approach, not results');
  assert.match(fig, /<svg class="x3-merge"[^>]*aria-hidden="true"/);
  const rows = html.split('x2-rows')[1].split('</ol>')[0];
  assert.deepEqual([...rows.matchAll(/<h3>([^<]+)<\/h3>/g)].map(m => m[1]), ['Capture', 'Convert', 'Measure']);
  const css = fs.readFileSync('components/paid-advertising/services/services.css', 'utf8');
  const motion = css.split('@media (prefers-reduced-motion: no-preference) {\n  .x3-lanes')[1];
  assert.ok(motion, 'diagram motion only without a reduced-motion preference');
  assert.doesNotMatch(css.match(/\.x3-[^{]*\{[^}]*\}/g).join(''), /infinite|alternate/, 'plays once');
});
test('supporting capabilities appear only in context, labelled Supporting', () => {
  const rows = html.split('x2-rows')[1].split('</ol>')[0];
  assert.equal((rows.match(/<b>Supporting<\/b>/g) || []).length, 2);
  assert.doesNotMatch(text, /Earlier service pages/);
});
test('ad mockups on /services are neutral illustrations shown once each, without the repeated caption (B2 R2)', () => {
  assert.equal((html.match(/pa-platform--search/g) || []).length, 1);
  assert.equal((html.match(/pa-platform--social/g) || []).length, 1);
  assert.match(html, /class="pa-platform pa-platform--search" aria-hidden="true"/);
  assert.match(html, /class="pa-platform pa-platform--social" aria-hidden="true"/);
  assert.equal((html.match(/pa-platform--organic/g) || []).length, 1, 'one illustrative organic result for SEO');
  assert.doesNotMatch(text, /Eggless Baking Courses|live guidance|free demo|Free demo|Syllabus/i);
  assert.match(text, /Your headline appears here/);
  assert.doesNotMatch(text, /Not a client ad/);
});
test('which one first: a decision section between the three core services, not every business needs all three, audiences kept', () => {
  const sec = html.split('aria-labelledby="sx-which"')[1].split('aria-labelledby="sx-work"')[0];
  assert.match(sec, /<h2 id="sx-which">Which one first\?<\/h2>/);
  const opts = sec.split('<article').slice(1);
  assert.equal(opts.length, 3);
  assert.match(opts[0], /<h3 id="sx-opt-google">Google Ads<\/h3><p class="x2-opt-role">Captures existing search demand\.<\/p>/);
  assert.match(opts[0], /href="\/google-ads"/);
  assert.match(opts[1], /<h3 id="sx-opt-meta">Meta Ads<\/h3><p class="x2-opt-role">Reaches and influences relevant audiences\.<\/p>/);
  assert.match(opts[1], /href="\/social-media-ads"/);
  assert.match(opts[2], /<h3 id="sx-opt-seo">SEO<\/h3><p class="x2-opt-role">Builds lasting visibility in search\.<\/p>/);
  assert.match(opts[2], /href="\/seo"/);
  assert.match(sec, /<b>Not every business needs all three\.<\/b> We check your offer, margins, follow-up and measurement before recommending one, two or all three\./);
  assert.deepEqual([...sec.matchAll(/href="(\/who-we-help\/[^"]+)"/g)].map(m => m[1]), ['/who-we-help/d2c', '/who-we-help/education', '/who-we-help/real-estate', '/who-we-help/enquiry-led-businesses']);
  assert.doesNotMatch(html.split('aria-labelledby="sx-services"')[1].split('aria-labelledby="sx-which"')[0], /Which one first/);
});
test('the defensive fit paragraph is removed; the five steps and the How We Work link stay', () => {
  assert.doesNotMatch(text, /Advertising tends to work when|No one can honestly guarantee/);
  assert.doesNotMatch(html, /x2-fit/);
  const steps = html.split('class="x2-steps"')[1].split('</div>')[0];
  assert.deepEqual([...steps.matchAll(/<\/span>([A-Za-z]+)<\/li>/g)].map(m => m[1]), ['Assess', 'Plan', 'Launch', 'Test', 'Review']);
  assert.match(steps, /href="\/how-it-works"/);
  assert.match(fs.readFileSync('components/paid-advertising/services/services.css', 'utf8'), /\.x2-steps li \{ margin: 0;/);
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
test('client work: the shared case showcase replaces the bespoke cards, one Google Ads and one Meta Ads case, no SEO cards (B2, DEC-120)', () => {
  const work = html.split('aria-labelledby="sx-work"')[1].split('aria-labelledby="sx-terms"')[0];
  assert.match(html, /<section class="cs cs--light cs--two" aria-labelledby="sx-work"/);
  assert.match(work, /id="our-work" class="cs-anchor"/, 'the old section id still lands here');
  assert.match(work, /<h2 id="sx-work">The work <em>behind the offer<\/em><\/h2>/);
  assert.deepEqual([...work.matchAll(/class="cs-cta" href="([^"]+)"/g)].map(m => m[1]), ['/portfolio/google-ads-for-online-courses', '/portfolio/wanderlooms-meta-ads']);
  assert.match(work, /class="cs-all" href="\/work"/);
  assert.doesNotMatch(html, /x2-case|x2-tag|x2-work/, 'bespoke cards removed');
  assert.doesNotMatch(work, /\/portfolio\/(anybodycanbake-seo|seo-ameba-software)|SEO/);
  const { SERVICES_SHOWCASE } = load('components/paid-advertising/services/showcase.ts');
  assert.deepEqual(SERVICES_SHOWCASE.preferred, ['/portfolio/google-ads-for-online-courses', '/portfolio/wanderlooms-meta-ads']);
  assert.equal(SERVICES_SHOWCASE.fillService, undefined, 'no fill: nothing else, and no SEO case, can enter');
  assert.deepEqual(SERVICES_SHOWCASE.viewAll, { label: 'View all case studies' });
  assert.equal(SERVICES_SHOWCASE.id, 'sx-work');
});
test('with no eligible case the work section is absent and the rest of the page is unchanged', () => {
  const none = renderToStaticMarkup(React.createElement(PaidAdvertisingServices, { showcase: null }));
  assert.doesNotMatch(none, /sx-work|cs-card/);
  assert.equal(none.replace(/<section class="cs[\s\S]*?<\/section>/, ''), none);
  assert.equal(html.replace(/<section class="cs [\s\S]*?(?=<section class="pa-section pa-wrap" aria-labelledby="sx-terms")/, ''), none);
});
test('SEO is the third core service card with equal weight, linked to /seo, with no SEO figures or case cards', () => {
  const core = html.split('aria-labelledby="sx-services"')[1].split('</section>')[0];
  assert.equal((core.match(/<article/g) || []).length, 3, 'Google Ads, Meta Ads and SEO are the three core service cards');
  assert.doesNotMatch(core, /x2-seo|Supporting service|SEO &amp; Organic Visibility/, 'no separate supporting-service block');
  const seo = core.split('<article').slice(1).find(a => a.includes('sx-card--seo'));
  assert.ok(seo, 'SEO card');
  assert.match(seo, /<h3>SEO<\/h3>/);
  assert.match(seo, /href="\/seo">Explore SEO/);
  assert.doesNotMatch(seo.replace(/^[^>]*>/, '').replace(/<[^>]+>/g, ' '), /\d|%/, 'no SEO metrics');
  assert.doesNotMatch(seo, /<img|portfolio/, 'no SEO case cards');
});
test('Brand DNA 4.0 emphasis: the H1 emphasises the outcome and the FAQ heading is one colour (wording unchanged)', () => {
  assert.match(html, /<h1 id="sx-h1">Reach more of <span>the right customers<\/span> with Google Ads, Meta Ads and SEO\.<\/h1>/);
  assert.match(html, /<h2 id="sx-faq">A few questions before we talk<\/h2>/);
});
test('management scope separates included work from separately scoped work and qualifies reporting and creative', () => {
  assert.match(text, /Included in management/);
  assert.match(text, /Agreed separately/);
  assert.match(text, /review calls where your proposal agrees them/);
  assert.match(text, /defined number of static ad designs/);
  assert.match(text, /Ad spend is paid directly to the platform\. Our management fee is charged separately and set by the plan you choose\. All prices exclude GST/);
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
test('structured data: breadcrumb, FAQ and three India Country services, no prices or ratings', () => {
  const types = jsonLd.map(j => j['@type']).sort();
  assert.deepEqual(types, ['BreadcrumbList', 'FAQPage', 'Service', 'Service', 'Service']);
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
  assert.equal(metadata.title, 'Google Ads, Meta Ads & SEO Services | MappedSkills');
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
