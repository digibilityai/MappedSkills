/**
 * C+ Services (/services) — customer-facing copy. Originally from the approved prototype
 * (proto/direction-c-plus e5c1aa4, components/proto-cplus/servicesContent.ts, SV_PLAIN); revised in the owner-approved
 * customer-focused copy pass (2026-10-15). Service scope follows docs/01-business/SERVICE_ARCHITECTURE.md: organic
 * social media management is not a service; paid social is an optional acquisition channel. The prototype's internal
 * review register is not carried over.
 */

export const SV_PLAIN = {
  kicker: 'What we do',
  h1: { a: 'Digital marketing', b: 'that works together.' },
  lede: 'From reaching potential customers to improving your website and measuring enquiries, we help you connect the parts of your marketing that matter.',
  primary: 'Tell us what you’re trying to fix',

  /* hero illustration: the three stages, each in plain language */
  plate: {
    title: 'Three stages, one approach',
    rows: [
      { k: 'Capture', d: 'Reach people who may be interested in your business.', v: ['SEO', 'Google Ads', 'Paid social', 'AI search'] },
      { k: 'Convert', d: 'Make it easier for visitors to contact you.', v: ['Conversion optimization', 'Lead generation'] },
      { k: 'Measure', d: 'Understand what’s working and where improvements are needed. Not sold separately.', v: ['Analytics', 'Enquiry sources'] },
    ],
    cap: 'Illustration.',
  },

  /* 2 — start with what is going wrong (paper) */
  routeKicker: 'Where to start',
  routeH: { a: 'Start with what', b: 'is going wrong.' },
  routes: [
    {
      tag: 'Reach',
      sym: 'Not enough of the right people find you.',
      job: 'Capture',
      svc: [
        { href: '/seo', name: 'SEO', d: 'The main long-term route. It usually takes 12 months or more, and we say so before you commit.' },
        { href: '/google-ads', name: 'Google Ads', d: 'Reaches people searching right now. Your ad spend is paid directly to Google; our fee is separate.' },
        { href: '/social-media-ads', name: 'Paid social', d: 'An optional source, used only where the channel suits your business.' },
        { href: '/ai-seo', name: 'AI search', d: 'Whether AI assistants mention you when a buyer asks. Much of this depends on sources outside your website, and nobody can guarantee it.' },
      ],
    },
    {
      tag: 'Enquiries',
      sym: 'Advertising brings traffic, but too few enquiries.',
      job: 'Convert',
      svc: [
        { href: '/conversion-optimization', name: 'Conversion optimization', d: 'We look at the page, the form, the booking and how enquiries reach you, and fix what is actually losing visitors.' },
        { href: '/lead-generation', name: 'Lead generation', d: 'More of the right enquiries, not just more enquiries.' },
      ],
    },
    {
      tag: 'Tracking',
      sym: 'Enquiries arrive, but where they come from is unclear.',
      job: 'Measure',
      svc: [
        { href: '/how-it-works', name: 'How we track enquiries', d: 'Analytics and enquiry-source tracking are part of the work, not a separate service.' },
      ],
    },
    {
      tag: 'Overview',
      sym: 'Your marketing runs in separate pieces, with no clear view of how it performs.',
      job: 'Connect',
      svc: [],
      note: 'The next section explains how the pieces fit together.',
    },
  ],
  unsure: { t: 'Not sure which?', d: 'The first conversation is about finding which part needs attention.', link: { href: '/how-it-works', label: 'How it works' } },

  /* 3 — how they work together (ink) */
  joinKicker: 'How the parts work together',
  joinH: { a: 'Better results start when', b: 'your marketing works together.' },
  joins: [['Advertising and search', 'your website'], ['Your website', 'the enquiry form'], ['The enquiry form', 'where enquiries arrive'], ['All of it', 'measurement']],
  joinLine: 'Handled separately, the gaps between these can go unnoticed.',
  measure: 'Measurement (analytics, tracking and enquiry-source records) is part of the work, not a separate service. It is how you can check what is working.',
  scoped: 'You can start with one part. If you want search work alone, we will tell you honestly whether it is likely to make a difference, because fixing one part while another is broken often changes little.',

  /* 3b — what we commit to (ink): managed / measured / influenced by external factors */
  bdH: 'What we commit to, and what depends on other factors',
  bdGroups: [
    { k: 'What we manage', d: 'Your search and advertising work, the pages and forms that turn visits into enquiries, and the tracking that connects them.' },
    { k: 'What we measure and improve', d: 'Where enquiries come from, where visitors drop away, and how this changes over time. We report it honestly, including what we cannot trace.' },
    { k: 'What depends on other factors', d: 'We track these and report on them, but do not promise them. They also depend on your price, product, capacity, how quickly you follow up, and whether you win the work.', list: ['Rankings', 'Positions in AI answers', 'Enquiry volumes', 'Revenue', 'Return on ad spend'] },
  ],

  /* 4 — boundaries (paper): what can be added later, what is outside our service */
  laterK: 'Starting out, and adding later',
  laterStart: { k: 'At the start', d: 'We scope the work to what your business needs, drawn from the three stages above. Not every service is part of every engagement.' },
  laterAdd: { k: 'Added later, if needed', d: 'Once enquiries are arriving: routing each one to the right person, acknowledging it, and reminding both sides about a booked call.' },
  notK: 'Outside what we do',
  not: ['CRM setup and migration', 'Sales and revenue operations', 'Lifecycle and nurture programmes', 'Standalone website development', 'Ecommerce merchandising', 'Organic social media management, brand building and PR'],
  notLine: 'Some of this is good work. We keep our focus narrow so we do our own work well.',
  priceLink: { href: '/pricing', label: 'What this costs, and what moves the number' },

  /* close — the live close */
  close: {
    label: 'Start a conversation',
    h: { a: 'Not sure what’s holding your marketing back?', b: 'Let’s find out.' },
    body: 'Tell us what you’re seeing and what you can currently measure. That is enough to start working out where to look first.',
  },
};
