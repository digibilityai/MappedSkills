const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};
const { PaidAdvertisingEducation } = load('components/paid-advertising/education/PaidAdvertisingEducation.tsx');
const { EducationJsonLd } = load('components/paid-advertising/education/EducationJsonLd.tsx');
const { PaidAdvertisingHome } = load('components/paid-advertising/home/PaidAdvertisingHome.tsx');
const { PaidAdvertisingServices } = load('components/paid-advertising/services/PaidAdvertisingServices.tsx');
const html = renderToStaticMarkup(React.createElement(PaidAdvertisingEducation));
const ld = renderToStaticMarkup(React.createElement(EducationJsonLd));
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const parse = (s) => [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1].replace(/\\u003c/g, '<')));

test('one H1 in ink and tangerine, and the page sections in order', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<h1 id="ed-h1">More of the <span>right students\.<\/span><\/h1>/);
  const labels = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(labels, ['ed-h1', 'ed-value', 'ed-ready', 'ed-platforms', 'ed-journey', 'ed-proof', 'ed-measure', 'ed-faq', 'ed-close']);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of labels) assert.ok(ids.includes(l), l);
});
test('real heading hierarchy: sub-headings are h3 elements, not styled paragraphs', () => {
  assert.ok((html.match(/<h2\b/g) || []).length >= 8);
  assert.doesNotMatch(html, /<h4|<h5|<h6/);
  assert.match(html, /<h3>Google Ads<\/h3>/);
  assert.match(html, /<h3>Discover<\/h3>/);
});
test('hero copy and CTAs', () => {
  assert.match(text, /Paid advertising for education businesses/);
  assert.match(text, /Google Ads and Meta Ads to help education businesses reach prospective students and generate relevant enquiries\./);
  assert.match(html, /href="\/contact">Discuss Education Advertising/);
  assert.match(html, /href="\/contact\?intent=call">Request a Call/);
});
test('audience strip makes no unsupported "trusted by" claim', () => {
  assert.doesNotMatch(text, /trusted by|our clients|loved by|used by/i);
  for (const a of ['Course providers', 'Coaching institutes', 'Training centres', 'Specialist programmes']) assert.match(text, new RegExp(a));
});
test('readiness: six R1 factors and the R1 closing', () => {
  const sec = html.split('class="ed-ready"')[1].split('</ul>')[0];
  assert.equal((sec.match(/<h3>/g) || []).length, 6);
  assert.match(text, /If something needs improvement, we will tell you what to address alongside advertising, and why it matters\./);
});
test('platforms: distinct panels and links', () => {
  assert.match(html, /href="\/google-ads">Explore Google Ads/);
  assert.match(html, /href="\/social-media-ads">Explore Meta Ads/);
  assert.match(text, /Not every education business needs both platforms\./);
});
test('journey: five stages and the MappedSkills versus client handoff', () => {
  const stages = [...html.matchAll(/<h3>(Discover|Consider|Enquire|Counsel|Enrol)<\/h3>/g)].map(m => m[1]);
  assert.deepEqual(stages, ['Discover', 'Consider', 'Enquire', 'Counsel', 'Enrol']);
  assert.match(html, /ed-stage ed-stage--ours[\s\S]*ed-stage ed-stage--yours/);
  assert.match(text, /MappedSkills Advertising management Your education business Counselling and admissions/);
  assert.match(text, /An enquiry is not an enrolment\./);
  assert.match(text, /We handle Paid campaign planning and management/);
  assert.match(text, /You handle Course details, fees, admissions policies, counselling, enquiry follow-up, admission decisions and fulfilment\./);
  assert.match(text, /Landing-page development, CRM implementation, technical tracking changes and additional creative production\./);
});
test('proof: AnyBodyCanBake only, linked to the verified case, no outcomes', () => {
  const sec = html.split('aria-labelledby="ed-proof"')[1].split('</section>')[0];
  assert.match(sec, /AnyBodyCanBake/);
  assert.doesNotMatch(text, /AnybodyCanBake/);
  assert.match(sec, /href="\/portfolio\/google-ads-for-online-courses"/);
  assert.match(sec, /do not claim them here/);
  assert.doesNotMatch(sec, /<img|testimonial|\u201c/);
  assert.match(sec, /Our approach, not client findings/);
  assert.doesNotMatch(text, /Real education businesses/);
});
test('measurement: visual relationship, Reporting Policy A, tracking boundary, pricing link, no guarantees', () => {
  for (const t of ['Campaign performance', 'Relevant enquiries', 'Enrolment outcomes']) assert.match(text, new RegExp(t));
  assert.match(text, /Monthly reporting with ongoing management/);
  assert.match(text, /Review calls as agreed in your proposal/);
  assert.match(text, /New tracking setup, repairs and integrations \(separately scoped unless included\)/);
  assert.match(text, /No advertising campaign can guarantee enquiries, admissions or a particular return\./);
  assert.match(html, /href="\/pricing">Understand Our Pricing Approach/);
});
test('no unsupported claims, other platforms, figures, dashes or fabricated proof', () => {
  assert.doesNotMatch(text, /guaranteed admissions|improved enrolment|\bCPL\b|\bCPA\b|ROAS|revenue|testimonial/i);
  assert.doesNotMatch(text, /₹|\d+(\.\d+)?\s?(%|x|×)\b|Google Partner|certified/i);
  assert.doesNotMatch(text, /YouTube|Amazon|Flipkart|LinkedIn Ads|TikTok|Apple/i);
  assert.doesNotMatch(text, /free (audit|review|account|consultation)|within \d+ (hours|minutes)/i);
  assert.doesNotMatch(html, /<img\b/);
  assert.doesNotMatch(text, /[–—]|--/);
  const src = fs.readFileSync('components/paid-advertising/education/content.ts', 'utf8').split('\n').filter(l => !/^\s*(\/\*|\*)/.test(l)).join('\n');
  assert.doesNotMatch(src, /[–—]/);
});
test('seven R1 FAQs verbatim, native, matching FAQPage', () => {
  assert.equal((html.match(/<details>/g) || []).length, 7);
  const faq = parse(ld).find(j => j['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 7);
  for (const q of faq.mainEntity) { assert.ok(text.includes(q.name)); assert.ok(text.includes(q.acceptedAnswer.text)); }
  const r1 = fs.existsSync(process.env.HOME + '/Downloads/MappedSkills_Education_Content_R1.md') ? fs.readFileSync(process.env.HOME + '/Downloads/MappedSkills_Education_Content_R1.md', 'utf8') : null;
  if (r1) for (const q of faq.mainEntity) assert.ok(r1.replace(/[’‘]/g, "'").includes(q.name.replace(/[’‘]/g, "'")), q.name);
  assert.match(text, /Tell us about your courses and enrolment goals\./);
});
test('structured data: BreadcrumbList and FAQPage only', () => {
  const nodes = parse(ld);
  assert.deepEqual(nodes.map(n => n['@type']).sort(), ['BreadcrumbList', 'FAQPage']);
  assert.deepEqual(nodes.find(n => n['@type'] === 'BreadcrumbList').itemListElement.map(c => c.name), ['Home', 'Education businesses']);
  assert.doesNotMatch(ld, /"Service"|"(price|offers|aggregateRating|review)"/i);
});
test('route: new, self-canonical, proposed metadata', () => {
  const { metadata } = load('app/(pages)/who-we-help/education/page.tsx');
  assert.equal(metadata.title, 'Google Ads & Meta Ads for Education Businesses in India | MappedSkills');
  assert.equal(metadata.description, 'Google Ads and Meta Ads management for online courses, coaching and training businesses in India. Focus on relevant enquiries and enrolment outcomes.');
  assert.equal(metadata.alternates.canonical, 'https://mappedskills.com/who-we-help/education');
});
test('inbound links, sitemap and analytics; header and footer untouched; no redirects', () => {
  const home = renderToStaticMarkup(React.createElement(PaidAdvertisingHome));
  const card = home.split('id="education"')[1].split('</article>')[0];
  assert.match(card, /<h3><a class="pa-card-link" href="\/who-we-help\/education">Education, training and coaches<\/a><\/h3>/);
  assert.equal((home.match(/href="\/who-we-help\/education"/g) || []).length, 1);
  const services = renderToStaticMarkup(React.createElement(PaidAdvertisingServices));
  assert.equal((services.match(/href="\/who-we-help\/education"/g) || []).length, 1);
  assert.match(fs.readFileSync('app/sitemap.ts', 'utf8'), /'\/who-we-help\/education'/);
  assert.equal(load('lib/analytics.ts').pageTypeOf('/who-we-help/education'), 'commercial');
  const nav = fs.readFileSync('components/direction-c/nav.ts', 'utf8');
  assert.match(nav, /href: '\/#who-we-help', label: 'Who We Help'/);
  assert.doesNotMatch(nav, /who-we-help\/education/);
  assert.doesNotMatch(fs.readFileSync('next.config.mjs', 'utf8'), /who-we-help|\/education/);
});
test('stylesheet: no sticky or fixed elements, reduced-motion override, nothing hidden without script', () => {
  const css = fs.readFileSync('components/paid-advertising/education/education.css', 'utf8');
  assert.doesNotMatch(css, /position:\s*(sticky|fixed)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(html, /data-pending/);
});
