/**
 * C+ SEO (/seo): customer-facing copy. Seven-scene narrative redesign (owner-approved proposal, U1 to U3, 2026-10-31;
 * docs/seo-redesign/narrative-r1/SEO_NARRATIVE_AUDIT_AND_PROPOSAL.md). Rules this copy follows:
 *   - no ranking, traffic, enquiry, revenue or ROI promises;
 *   - the AnybodyCanBake figures are the owner-approved SEO case figures only (never the Google Ads case), always with their
 *     period and measurement caveat, and are shown only while that case study is published (see ./proof.ts);
 *   - Ameba Software shows only the owner-supplied final figures of 31 October 2026 (organic clicks, tracked organic enquiries, two
 *     three-month periods, with the comparison caveat); no ranking, impression, quote or rating, and no calendar dates are added.
 */

import { SEO_AUDIT_CREDIT_CONDITION, SEO_AUDIT_CREDIT_TERM } from '@/components/seo-packages/data';

export const SEO_PLAIN = {
  crumb: 'Search',
  kicker: 'Organic search',
  h1: { a: 'SEO that is judged on the', b: 'enquiries', c: 'it produces.' },
  lede: [
    'We help your business show up for the searches that matter and improve the pages people land on.',
    'Then we measure whether organic search is producing genuine enquiries.',
  ],
  primary: 'Tell us what you’re trying to fix',
  secondary: 'Book a call',

  /* hero illustration: the trail from a search to an enquiry (the route graphic appears only in the hero) */
  trailLabel: 'From a search to an enquiry',
  trail: [
    { key: 'search', name: 'A search' },
    { key: 'result', name: 'A result' },
    { key: 'page', name: 'Your page' },
    { key: 'enquiry', name: 'An enquiry', tag: 'What we judge it on' },
  ],
  trailCap: 'The route from a search to an enquiry.',
  trailMap: { elsewhere: 'somebody else' },

  /* 1: clicks are not customers (the three approved questions) */
  probKicker: 'Sound familiar?',
  probH: { a: 'Where SEO', b: 'usually goes wrong.' },
  problems: [
    {
      q: 'Your competitors appear in Google. Why don’t you?',
      a: 'Buyers may be finding others first. We look at which searches matter and what is holding your pages back.',
    },
    {
      q: 'Your website gets visitors. Why aren’t they contacting you?',
      a: 'Visits only help if the page gives people a reason and a way to get in touch. We look at what happens after the click.',
    },
    {
      q: 'Your SEO reports look positive. What has actually improved?',
      a: 'Rankings and visits are not the same as enquiries. We focus on what changed for the business.',
    },
  ],
  probTags: ['Between a search and a result', 'Between your page and an enquiry', 'After the enquiry'],
  probLink: { label: 'Have the traffic but not the enquiries? Start here', href: '/problems/traffic-but-no-enquiries' },

  /* 2: what we work on, led by search intent */
  workKicker: 'The work',
  workH: { a: 'Match each search to', b: 'a page that answers it.' },
  workIntent: 'Different searches come from different needs: learning, comparing, choosing. Commercial searches, where a customer is close to choosing, matter most.',
  workSub: 'Each plan sets how much of this we do every month. See the packages below.',
  workLink: { label: 'See SEO packages and pricing', href: '#packages' },
  work: [
    {
      k: 'Keyword research and page mapping',
      d: 'We find the searches your customers use when they are learning, comparing and choosing, then map each one to the page that should answer it.',
    },
    {
      k: 'Technical SEO',
      d: 'We fix what stops search engines finding and understanding your pages: indexing, site structure, internal links and page speed.',
      also: 'Also: structured data. Major website rebuilds and migrations are separately scoped and quoted; routine technical SEO does not include managing a migration.',
    },
    {
      k: 'Content and on-page optimisation',
      d: 'We improve existing pages and create new content that answers customer questions and makes the next step clear.',
    },
    {
      k: 'Selective authority building',
      d: 'We research relevant sites and make personalised outreach. We do not buy links.',
    },
    {
      k: 'Reporting and measurement',
      d: 'A monthly report shows what changed and what we are doing next, with enquiries tracked in GA4 and Search Console where accessible.',
    },
] as { k: string; d: string; also?: string }[],

  /* 3: one composed proof section */
  proofKicker: 'SEO case studies',
  proofH: { a: 'Here is what changed,', b: 'and how we measured it.' },
  /* used when the AnybodyCanBake case is not published */
  proofHAlt: { a: 'SEO work', b: 'we’ve delivered.' },
  acb: {
    name: 'AnybodyCanBake',
    meta: 'Pune · Education and training · SEO',
    lead: { big: '46.15%', rest: 'more tracked organic course enquiries' },
    enquiries: { from: '91', to: '133', label: 'Tracked organic course enquiries' },
    period: 'May to July 2026 versus August to October 2026',
    support: [
      { label: 'Organic clicks', from: '16,400', to: '20,580', pct: '+25.49%' },
      { label: 'Nonbrand organic clicks', from: '15,348', to: '20,039', pct: '+30.56%' },
    ],
    body: 'A baking website can attract recipe readers without making its courses easy to find. We separated recipe searches from course searches, made the content easier to navigate and measured beyond traffic.',
    read: 'Enquiries grew faster than clicks. That is the result for one business, not a promise for yours.',
    caveat:
      'This is a comparison of two periods, not proof that the work alone caused the change. The figures were supplied by MappedSkills and have not been independently checked against Search Console or analytics exports.',
    link: { label: 'Read the AnybodyCanBake SEO case study', href: '/portfolio/anybodycanbake-seo' },
  },
  ameba: {
    name: 'Ameba Software',
    meta: 'Chandigarh · B2B software · SEO',
    problem:
      'A B2B software company that needed to be found when buyers searched for solutions. Limited content, weak page targeting and technical issues held back its organic demand.',
    did: 'We targeted commercial search intent, improved priority service pages, strengthened the technical foundations and planned content around buyer questions.',
    /* the owner-supplied final figures (31 October 2026); no calendar dates were supplied for the two three-month periods */
    limit:
      'Organic clicks rose from 7,300 to 12,800 (+75.34%) and tracked organic enquiries from 34 to 53 (+55.88%), comparing two three-month periods. This is a comparison, not proof that the work alone caused the change.',
    link: { label: 'Read the Ameba Software case study', href: '/portfolio/seo-ameba-software' },
  },

  /* Ameba Software as it stands until its Contentful entry carries the final copy: no figure, the proof restriction kept. Used unless
     NEXT_PUBLIC_CASE_FINAL_FOUR=1 (see lib/case-study-final-four.ts, finalFourReleased). THE RELEASE deletes this block and the switch. */
  amebaHeld: {
    name: 'Ameba Software',
    meta: 'Chandigarh · B2B software · SEO',
    problem:
      'A B2B software company that wasn’t being found in search for the solutions it sells. Its pages loaded slowly, its meta tags were unoptimised and it had little content to be found for.',
    did: 'We fixed the technical foundations, targeted key pages at high-intent software searches, planned an ongoing content programme and earned links from technology sites.',
    limit:
      'We do not publish traffic, ranking or enquiry figures for this engagement, because we have not been able to verify them against Ameba Software’s own records.',
    link: { label: 'Read the Ameba Software case study', href: '/portfolio/seo-ameba-software' },
  },

  /* 4: how it runs */
  howKicker: 'How it runs',
  howH: { a: 'Four steps,', b: 'in this order.' },
  howLabel: 'How we work, in four steps',
  steps: [
    { k: 'Audit', d: 'Review your site, searches and how enquiries arrive.' },
    { k: 'Prioritise', d: 'Agree what to fix first in a written plan.' },
    { k: 'Improve', d: 'We make the agreed improvements.' },
    { k: 'Measure', d: 'A monthly report and review call show what changed.' },
  ],
  howLine: 'SEO takes consistent work. We’ll explain what needs attention first and what progress you can realistically expect.',
  howNote: 'Some enquiries arrive with no clear source. We show those separately instead of counting them as SEO.',
  howLink: { label: 'See the full process', href: '/how-it-works' },

  /* 5: packages and pricing (data: components/seo-packages/data.ts) */
  pkgKicker: 'SEO packages',
  pkgH: { a: 'Clear monthly packages,', b: 'with allowances you can see.' },
  pkgIntro: 'Choose the package that fits the size of your site and the market you compete in. Every package is a defined monthly scope, reported on each month.',
  pkgCompareLabel: 'Full comparison of monthly deliverables',
  pkgDefHeading: 'What the allowances mean',
  pkgTermsHeading: 'Terms',
  pkgExtraHeading: 'Separate scope and quotation',
  auditKicker: 'Not ready for a retainer?',
  auditLead: 'Start with a standalone audit. It gives you a prioritised 90-day roadmap you can use with us or on your own.',
  pkgCta: 'Discuss an SEO package',

  /* 6: questions */
  qKicker: 'Questions',
  qH: { a: 'Common', b: 'questions.' },
  questions: [
    {
      q: 'How long does SEO take?',
      a: 'It depends on your website, competition and what needs improving. We’ll explain the priorities and realistic timelines before you start.',
    },
    {
      q: 'Can you guarantee first-page rankings?',
      a: 'No one can guarantee Google rankings. We commit to agreed improvements, clear reporting and regular reviews.',
    },
    {
      q: 'What does monthly SEO work include?',
      a: 'Each package sets monthly allowances for keywords, page optimisation, new content, technical fixes and outreach, plus monthly reporting. The full list is in the packages above.',
      link: { label: 'See the package comparison', href: '#packages' },
    },
    {
      q: 'Is there a minimum commitment?',
      a: 'SEO retainers have a minimum engagement of six months, because search work takes time to show in your data.',
    },
    {
      q: 'Do your prices include GST?',
      a: 'No. All SEO prices exclude GST.',
    },
    {
      q: 'What happens to the audit fee if I continue with you?',
      a: `The SEO Audit & Roadmap fee is ${SEO_AUDIT_CREDIT_TERM}. ${SEO_AUDIT_CREDIT_CONDITION}`,
    },
    {
      q: 'Do the packages include a website redesign, migration or paid ads?',
      a: 'No. Website redesign, migrations, additional websites, international SEO, large ecommerce catalogues and paid advertising management need a separate scope and quotation.',
    },
    {
      q: 'How do SEO and Google Ads work together?',
      a: 'Google Ads can generate visibility quickly. SEO builds visibility over time. Many businesses benefit from both.',
      link: { label: 'Google Ads', href: '/google-ads' },
    },
  ] as { q: string; a: string; link?: { label: string; href: string } }[],

  /* close (tangerine) */
  close: {
    label: 'Start a conversation',
    h: 'Let’s look at what search is doing for you today.',
    body: 'Tell us what you’re seeing now, and we’ll tell you where to look first.',
  },
  related: {
    label: 'Related',
    links: [
      { label: 'Google Ads', href: '/google-ads' },
      { label: 'AI search', href: '/ai-seo' },
      { label: 'All services', href: '/services' },
    ],
  },
};
