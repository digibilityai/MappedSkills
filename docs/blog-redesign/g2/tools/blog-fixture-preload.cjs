// Blog G2 fixture preload (used with NODE_OPTIONS=--require on a scratch copy, never the deployed app). Wraps the repo's Gate 4 fixture resolver and replaces only the post
// operations with BLOG_FIXTURE_SET: "live7" = the 7 live listing entries (titles, excerpts, categories and order as served
// on 2026-10-20; synthetic bodies sized to the live reading times) or "edge" = edge cases. No network.
const base = require('../../../ui-revamp/gate-4/qa/cms-fixtures/fixtures.cjs');
const SET = process.env.BLOG_FIXTURE_SET || 'live7';
const doc = (words) => ({ nodeType: 'document', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: Array(words).fill('word').join(' '), marks: [], data: {} }] }] });
const mk = (i, slug, cat, min, title, excerpt, extra = {}) => ({
  sys: { id: 'blogfx-' + i, publishedAt: '2026-09-18T09:00:00.000Z', firstPublishedAt: '2026-07-16T09:00:00.000Z' },
  title, seoTitle: null, keyword: null, slug, excerpt,
  author: { name: 'FIXTURE Author', description: null, profile: null },
  category: cat ? { name: cat, slug: cat.toLowerCase().replace(/\W+/g, '-') } : null,
  featuredImage: null, content: { json: doc(Math.max(1, min * 200 - 50)), links: { entries: { block: [], inline: [], hyperlink: [] }, assets: { block: [] } } }, faqs: null, ...extra,
});
const LIVE7 = [
  ['content-marketing-services-in-pune', 'Content Marketing', 6, 'Content Marketing Services in Pune | Boost Your Business Now', 'Explore top content marketing services in Pune. Drive traffic, boost engagement, and achieve your business goals with expert strategies.'],
  ['building-an-email-list', 'Email Marketing', 3, 'Building an Email List: A Comprehensive Guide', 'Unlock the potential of email marketing! Explore proven strategies and actionable tips to grow your email list for maximum engagement.'],
  ['importance-of-content-writing', 'Brand Strategy', 5, 'The Importance of Content Writing: A Guide for Business Owners and Marketing Managers', 'Learn the importance of content writing and why it is essential for marketing success, brand growth, SEO, and lead generation.'],
  ['performance-marketing-vs-digital-marketing', 'Insights', 4, 'Performance Marketing vs. Digital Marketing: Which is Right for Your Business?', 'Performance Marketing vs. Digital Marketing, their pros and cons, and which approach is best for your business.'],
  ['7-proven-strategies-of-digital-marketing-for-real-estate-developers', 'Real Estate', 14, '7 Proven Strategies of Digital Marketing for Real Estate Developers', 'Boost sales with Digital Marketing for Real Estate Strategies—SEO to lead generation, MappedSkills gets results.'],
  ['seo-company-in-pune', 'Content Marketing', 9, 'Best SEO Company in Pune for Businesses That Want Qualified Leads, Not Just Rankings', 'Looking for an SEO company in Pune? MappedSkills helps businesses improve rankings, organic traffic, qualified leads, technical SEO, and local SEO.'],
  ['facebook-advertising-agency-pune', 'PPC', 9, 'Facebook Advertising Agency in Pune for Facebook & Instagram Ads That Drive Qualified Leads', 'Looking for a Facebook advertising agency in Pune? We help you plan, launch, and optimize FB and Insta ad campaigns for leads & sales.'],
].map((r, i) => mk(i, ...r));
const EDGE = [
  mk(0, 'fixture-very-long-title', 'Conversion Rate Optimisation and Landing Page Experiments', 25, 'FIXTURE A deliberately very long article title that keeps going to test wrapping across every breakpoint without breaking the row layout or the arrow box alignment', 'FIXTURE a long excerpt. '.repeat(14).trim()),
  mk(1, 'fixture-no-excerpt', null, 1, 'FIXTURE No excerpt, no category, one-minute read', ''),
  mk(2, 'fixture-unbroken', 'SEO', 2, 'FIXTURE Supercalifragilisticexpialidociousandevenlongerunbrokenwordtotestoverflowbehaviour', 'Short.'),
];
const POSTS = SET === 'edge' ? EDGE : LIVE7;
const realResolve = base.resolve;
base.resolve = function (op, v = {}) {
  switch (op) {
    case 'GetAllPosts': return { postCollection: { total: POSTS.length, items: POSTS.slice(0, v.limit ?? 100) } };
    case 'GetPostSlugs': return { postCollection: { items: POSTS.map((x) => ({ slug: x.slug })) } };
    case 'GetPostBySlug': return { postCollection: { items: POSTS.filter((x) => x.slug === v.slug).slice(0, 1) } };
    case 'GetRelatedPosts': return { postCollection: { items: [] } };
    default: return realResolve(op, v);
  }
};
require('../../../ui-revamp/gate-4/qa/cms-fixtures/preload.cjs');
