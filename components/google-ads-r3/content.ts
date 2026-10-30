/** /google-ads, THE RESOLVE R3 review variant (owner review draft, 27 October 2026). NOT live.
 * Source of the five campaign types: OWNER REQUIREMENT in the task brief of 27 October 2026 (all five are established managed
 * services). This supersedes the earlier "YouTube is adjacent" wording in the Strategic Thesis v2 and the DEC-053 rule of
 * "no campaign-type claims" for this page only, and awaits recording in DECISION_LOG.md after approval.
 * Commercial boundaries kept from DEC-053 and DEC-079: fee and ad spend are separate, landing-page, website, form and
 * tracking work is scoped separately, no guarantee of any number, no price, no timeline.
 * Case wording is taken from the live case study (verified 27 October 2026): no result is claimed there, so none is here.
 * Copy rule: no dashes used as punctuation.
 */
export const META = {
  title: 'Google Ads Management for Indian Businesses | MappedSkills',
  description:
    'Google Ads management for Indian businesses: Search, Shopping, Performance Max, Display and YouTube, planned around your offer and reviewed on real outcomes.',
} as const;

export const HERO = {
  eyebrow: 'Google Ads management',
  h1: ['Reach customers when they’re looking for ', 'what you sell.'],
  lede: 'When someone searches for a product, a course or a service, they already have a need. We plan and manage Google Ads so your business appears at that moment, with a clear next step waiting for them.',
  support: 'For product and D2C brands, education and coaching businesses, and enquiry-led businesses such as real estate.',
  cta: 'Discuss Your Google Ads',
  secondary: 'Request a call',
  note: 'Illustrative example with a generic business. Not a client campaign.',
} as const;

export const SITUATIONS = {
  eyebrow: 'Where Google Ads makes sense',
  h2: ['Three businesses, ', 'three ways to use it'],
  items: [
    {
      id: 'd2c', img: '/images/google-ads-r3/d2c-apparel.webp', pos: '40% 55%',
      alt: 'Conceptual product-commerce scene: folded t-shirts and sweatshirts in sage, blue and navy, a jacket on a rail, a cap and sunglasses on stone display plinths in warm light',
      title: 'Product-based and D2C businesses',
      body: 'Someone searches for a waterproof jacket or a cotton kurta set. Google Ads can put your products in front of them while they are comparing and ready to buy.',
      fits: 'Often Search, Shopping and Performance Max', href: '/who-we-help/d2c', link: 'How we help D2C brands',
    },
    {
      id: 'education', img: '/images/google-ads-r3/coaching-learning.webp', pos: '50% 62%',
      alt: 'Conceptual illustration of coaches and learners at work across business, career, health, fitness and skills coaching, with a learner at a laptop in the centre',
      title: 'Education, training and coaching',
      body: 'People look for courses, coaching and training they can join. Ads can appear when they search, and lead to a demo class, a counselling call or an enrolment.',
      fits: 'Often Search, with Display and YouTube for reach', href: '/who-we-help/education', link: 'How we help education brands',
    },
    {
      id: 'enquiry', img: '/images/google-ads-r3/tile-property.webp', pos: '50% 40%',
      alt: 'Residential towers above tree-lined streets',
      title: 'Enquiry-led businesses, including real estate',
      body: 'Buyers and clients research before they call. Ads can bring them to a page where they ask a question, request a consultation or book a site visit.',
      fits: 'Often Search, with Display and YouTube to stay visible', href: '/who-we-help/real-estate', link: 'How we help real estate developers',
    },
  ],
  note: 'Most businesses need only one or two campaign types. We recommend what fits your offer, not the full list.',
} as const;

export const MANAGE = {
  eyebrow: 'What MappedSkills manages',
  h2: ['We run the advertising. ', 'You keep the business.'],
  lede: 'Good Google Ads work is a series of small, careful decisions. These are the ones we take on.',
  items: [
    { k: 'Understand the searches', d: 'We work out what your customers look for, and which searches are not worth paying for.' },
    { k: 'Choose the campaign types', d: 'We recommend the types that suit your offer and goal, and leave out the ones that do not.' },
    { k: 'Structure and launch', d: 'Campaigns are organised around your products or services, and go live once you approve them.' },
    { k: 'Manage budget and search quality', d: 'We watch where the spend goes and exclude searches that do not fit.' },
    { k: 'Improve the message and assets', d: 'Ad text, images and, where relevant, video are refined as we learn what people respond to.' },
    { k: 'Review and adjust', d: 'We go through the results with you and change the campaigns accordingly.' },
  ],
  split: {
    ours: { h: 'MappedSkills manages', d: 'The advertising: planning, setup, budget oversight, ad messaging, testing and review.' },
    yours: { h: 'Your business owns', d: 'Your website and landing pages, your offer and pricing, how quickly enquiries are answered, and delivery.' },
    separate: 'Landing-page, website, form or tracking changes can be scoped and agreed separately, before they start.',
  },
} as const;

export const TYPES = {
  eyebrow: 'Google Ads campaign types',
  h2: ['Five ways to appear on Google, ', 'each with its own job'],
  lede: 'We manage all five. Your goal decides which ones are worth running.',
  items: [
    {
      id: 'search', name: 'Search', where: 'Google search results',
      what: 'Text ads that appear above or below results when someone searches for something you offer.',
      when: 'People already search for what you sell: a course, a service, a product.',
      outcome: 'Enquiries, calls, course sign-ups and purchases.',
      eg: 'A baking school appears when someone searches for an online baking course.',
    },
    {
      id: 'shopping', name: 'Shopping', where: 'Google results and the Shopping tab',
      what: 'Product listings with a photo, price and store name, shown when people search for products.',
      when: 'You sell products online and can supply an accurate product feed.',
      outcome: 'Online purchases.',
      eg: 'A sweatshirt shows with its photo and price next to similar listings.',
    },
    {
      id: 'pmax', name: 'Performance Max', where: 'Search, Shopping, Display, YouTube and more, from one campaign',
      what: 'One campaign that uses Google’s automation to place your ads across its channels, from the images, text and video you provide.',
      when: 'You have a clear goal, reliable conversion tracking and good creative. You give up some control over where ads appear.',
      outcome: 'Purchases or enquiries across many Google surfaces.',
      eg: 'A product brand reaches buyers on search, YouTube and across websites in one campaign.',
    },
    {
      id: 'display', name: 'Display', where: 'Websites and apps in the Google Display Network',
      what: 'Image and text ads shown as people browse sites and apps.',
      when: 'You want to bring back people who visited your site, or reach a defined audience. People are not searching, so it does a different job from Search.',
      outcome: 'Awareness and returning visitors.',
      eg: 'Someone who looked at a course page sees a reminder on a news site later.',
    },
    {
      id: 'youtube', name: 'YouTube', where: 'Before, during and next to videos on YouTube',
      what: 'Video ads shown to people watching YouTube.',
      when: 'Your offer is easier to show than to describe, and you have video, or we agree how it will be made. Viewers were not looking for you, so intent is lower than search.',
      outcome: 'Awareness and consideration, and sometimes enquiries or sales.',
      eg: 'A real estate developer shows a walkthrough of a new project.',
    },
  ],
  compare: {
    caption: 'Campaign types at a glance',
    head: ['Type', 'Reaches people who', 'Usually best for'],
    rows: [
      ['Search', 'are searching for what you offer', 'Demand that already exists'],
      ['Shopping', 'are comparing products to buy', 'Online product sales'],
      ['Performance Max', 'fit your goal, found by Google’s automation', 'Scaling a clear, well-tracked goal'],
      ['Display', 'are browsing sites and apps', 'Reminders and awareness'],
      ['YouTube', 'are watching video', 'Showing what is hard to describe'],
    ],
  },
  note: 'Not sure which fit? We say so if one campaign type is enough, or if another channel may suit you better.',
  meta: { lead: 'If your customers are not searching yet,', label: 'Meta Ads may fit better', href: '/social-media-ads' },
} as const;

export const MEASURE = {
  eyebrow: 'Measurement and improvement',
  h2: ['Judge Google Ads on ', 'what it brings the business'],
  lede: 'Clicks and impressions are only signs of activity. What matters is what happened next.',
  outcomes: [
    { k: 'Enquiry-led businesses', d: 'Qualified enquiries, calls and site visits booked, and what each enquiry cost.' },
    { k: 'Education and coaching', d: 'Demo bookings and course enrolments, and the cost of each.' },
    { k: 'Product businesses', d: 'Purchases and cost per purchase. Revenue and ROAS where the data is reliable.' },
  ],
  path: [
    { k: 'Ad', d: 'Seen or clicked', seen: true },
    { k: 'Website', d: 'Visit and action', seen: true },
    { k: 'Enquiry or order', d: 'Recorded where tracking is in place', seen: true },
    { k: 'Decision and sale', d: 'Often outside Google, and may not be traceable', seen: false },
  ],
  limits: {
    h: 'What we tell you plainly',
    items: [
      'Not every sale can be traced back to an ad. A phone call, a visit or a later search may close the sale elsewhere.',
      'Revenue and ROAS are reported only where tracking is reliable. Where it is not, we say so.',
      'The quality of enquiries also depends on your offer, pricing, website and how fast you reply.',
      'We cannot promise leads, purchases, sales or a return on ad spend.',
    ],
  },
  report: 'Your proposal sets out how we report: a monthly performance report with ongoing management, and review calls as agreed.',
} as const;

/** Verified against https://mappedskills.com/portfolio/google-ads-for-online-courses on 27 October 2026. */
export const WORK = {
  eyebrow: 'Relevant work',
  h2: ['Google Ads for ', 'an online baking school'],
  name: 'AnybodyCanBake',
  tags: ['Google Ads', 'Online baking courses', 'Pune'],
  challenge: 'AnybodyCanBake is a Pune online baking school that teaches eggless and healthy baking. It needed more students, on a small budget, in a crowded online education market.',
  approach: [
    { k: 'Keyword research', d: 'The searches people use when looking for online baking courses.' },
    { k: 'Ad copy and creative', d: 'Written around what the audience cared about and the problems they wanted to solve.' },
    { k: 'Audience targeting', d: 'By demographics, interests and online behaviour.' },
    { k: 'Ongoing optimisation', d: 'Campaign performance reviewed regularly and adjusted.' },
  ],
  delivered: ['Ads matched to course searches', 'Targeting focused on the right learners', 'Campaigns that were managed, not just launched'],
  honest: 'The case study reports whole-period totals for the engagement, not a before-and-after comparison.',
  link: { href: '/portfolio/google-ads-for-online-courses', label: 'Read the case study' },
  all: { href: '/work', label: 'View All Case Studies' },
} as const;

export const PROCESS = {
  eyebrow: 'How we work together',
  h2: ['A clear path, ', 'with your approval first'],
  lede: 'You see our findings, a recommended plan and a proposal before any work starts. Nothing begins until you approve it.',
  steps: [
    { k: 'Understand', d: 'Your offer, your customers and what they search for.' },
    { k: 'Plan', d: 'Campaign types, budget and how success will be judged.' },
    { k: 'Launch', d: 'The agreed campaigns go live, once you have approved them.' },
    { k: 'Test', d: 'Searches, ad messages and pages are refined as we learn.' },
    { k: 'Review', d: 'We go through results with you and decide what to change next.' },
  ],
  link: { href: '/how-it-works', label: 'See How We Work' },
  cost: 'Google ad spend is paid directly to Google. Our management fee is charged separately.',
  costLink: { href: '/pricing', label: 'Understand Our Pricing Approach' },
} as const;

export const FAQS = [
  { question: 'Which Google Ads campaigns suit my business?', answer: 'It depends on what you sell and how customers find it. Search suits people already looking for you. Shopping suits online product sales. Performance Max, Display and YouTube each add reach, and each needs more from your tracking or creative. Most businesses start with one or two, and we recommend them after understanding your offer.' },
  { question: 'What advertising budget do I need?', answer: 'There is no single right amount. It depends on what a customer is worth, how competitive your searches are, and how much you need to spend to learn what works. Ad spend goes directly to Google, and we discuss it with you before you commit.' },
  { question: 'How soon can I expect results?', answer: 'It depends on your offer, competition and website, and campaigns need some time to learn. We cannot promise a timeline or a number of enquiries or sales. We agree when and how to review results at the start, and tell you early if something needs to change.' },
  { question: 'Do you manage both ads and landing pages?', answer: 'We manage the ads. We review your landing page and recommend improvements. Creating or changing pages and fixing forms is scoped and agreed separately, before it starts.' },
  { question: 'How do you measure enquiries and sales?', answer: 'Where tracking is in place, Google Ads can record actions such as a form being sent or a purchase. Not every enquiry or sale can be traced to an ad, and where we cannot tell, we say so. We report revenue or ROAS only where the data is reliable.' },
  { question: 'Can you take over an existing Google Ads account?', answer: 'Yes. We review what is running, the searches and the landing page before suggesting changes, and record your starting performance where it is available.' },
] as const;

export const CLOSE = {
  h: 'Tell us what you want Google Ads to achieve.',
  body: 'Share your business, what you sell and your goal. We will use that to begin the conversation.',
  cta: 'Discuss Your Google Ads',
} as const;
