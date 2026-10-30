/**
 * C+ SEO (/seo): customer-facing copy. Redesigned page (owner-approved Phase 1 proposal and editorial changes,
 * 2026-10-15; docs/seo-redesign/PHASE_1_AUDIT_AND_PROPOSAL.md). Rules this copy follows:
 *   - no ranking, traffic, enquiry, revenue or ROI promises, and no figures of any kind;
 *   - the two projects are separate, historical SEO projects delivered by MappedSkills, with no results published;
 *   - the review panel is an illustrative layout, not data.
 */

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

  /* hero illustration: the trail from a search to an enquiry */
  trailLabel: 'From a search to an enquiry',
  trail: [
    { key: 'search', name: 'A search' },
    { key: 'result', name: 'A result' },
    { key: 'page', name: 'Your page' },
    { key: 'enquiry', name: 'An enquiry', tag: 'What we judge it on' },
  ],
  trailCap: 'Illustration. It shows no results.',

  /* 2: customer questions */
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
  /* the word the hero picture uses for whoever else is shown above you */
  trailMap: { elsewhere: 'somebody else' },
  /* where on the route each break sits (the first is between a search and a result, and so on) */
  probTags: ['Between a search and a result', 'Between your page and an enquiry', 'After the enquiry'],
  probLink: { label: 'Have the traffic but not the enquiries? Start here', href: '/problems/traffic-but-no-enquiries' },

  /* 3: what the work includes */
  workKicker: 'The work',
  workH: { a: 'What our SEO work', b: 'includes.' },
  workSub: 'Scoped to what your business needs. Not every engagement includes every item.',
  groups: [
    {
      key: 'search',
      t: 'Find the right searches',
      d: 'Work out which searches are worth going after.',
      items: ['Search intent', 'Relevant opportunities', 'Competitor research'],
    },
    {
      key: 'result',
      t: 'Make your website easier to find',
      d: 'Help search engines find, understand and navigate your site.',
      items: ['Technical SEO', 'Indexing', 'Site structure', 'Internal links'],
      also: 'Also: page speed, structured data, protecting rankings during a site rebuild.',
    },
    {
      key: 'page',
      t: 'Create and improve useful pages',
      d: 'Pages that answer what searchers came to find.',
      items: ['Service pages', 'Content', 'On-page optimisation'],
    },
    {
      key: 'enquiry',
      t: 'Turn visibility into enquiries',
      d: 'Make it easier for visitors to get in touch, and see it happen.',
      items: ['Landing-page improvements', 'Conversion opportunities', 'Measurement'],
    },
  ],

  /* 4: how we work */
  howKicker: 'How we work',
  howH: { a: 'Four steps,', b: 'in this order.' },
  howLabel: 'How we work, in four steps',
  steps: [
    { k: 'Audit', d: 'Review your site, searches and how enquiries arrive.' },
    { k: 'Prioritise', d: 'Agree what to fix first in a written plan.' },
    { k: 'Improve', d: 'We make the agreed improvements.' },
    { k: 'Measure', d: 'A monthly report and review call show what changed.' },
  ],
  howLink: { label: 'See the full process', href: '/how-it-works' },

  /* 5: measurement: an illustrative layout only */
  measKicker: 'Measurement',
  measH: { a: 'What an SEO', b: 'performance review', c: 'can cover.' },
  measTag: 'Illustrative layout. No real figures.',
  tiles: [
    { key: 'vis', t: 'Relevant search visibility', d: 'Where you appear for the searches that matter.' },
    { key: 'visits', t: 'Organic website visits', d: 'How many people arrive from search.' },
    { key: 'enq', t: 'Enquiries from organic search', d: 'What those visits turned into.', lead: true },
    { key: 'next', t: 'Improvements and next priorities', d: 'What we completed and what comes next.' },
  ],
  nextRows: ['Completed', 'Next'],
  measNote: 'Some enquiries arrive with no clear source. We show those separately instead of counting them as SEO.',
  measLink: { label: 'How we track enquiries', href: '/how-it-works' },

  /* 6: commitments */
  comKicker: 'What you can expect',
  comH: { a: 'Clear work.', b: 'Visible progress.' },
  comLine: 'We identify what needs improving, act on agreed priorities and show you what changed.',
  commitments: [
    { t: 'Defined priorities', d: 'Know what we’re working on.' },
    { t: 'Clear communication', d: 'Know what’s happening and why.' },
    { t: 'Transparent reporting', d: 'See what changed.' },
    { t: 'Regular reviews', d: 'Agree what comes next.' },
  ],
  comNote: 'SEO takes consistent work. We’ll explain what needs attention first and what progress you can realistically expect.',

  /* 7: two separate historical SEO projects (no results are published; no case-study links exist) */
  projKicker: 'SEO projects',
  projH: { a: 'SEO work', b: 'we’ve delivered.' },
  projIntro: 'Two historical projects where MappedSkills delivered the SEO work.',
  projects: [
    {
      key: 'acb',
      name: 'Anybody Can Bake',
      initial: 'A',
      tag: 'Historical SEO project',
      field: 'Eggless and healthy baking education.',
      role: 'SEO delivered by MappedSkills.',
      state: 'Results not yet published.',
    },
    {
      key: 'bkd',
      name: 'Bakedemy',
      initial: 'B',
      tag: 'Historical SEO project',
      field: 'Cake decoration and cake design education.',
      role: 'SEO delivered by MappedSkills.',
      state: 'Results not yet published.',
    },
  ],

  /* 8: questions */
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
      a: 'We work on agreed priorities, report on what changed and review the next steps with you each month.',
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
      { label: 'Conversion optimization', href: '/conversion-optimization' },
      { label: 'All services', href: '/services' },
    ],
  },
};
