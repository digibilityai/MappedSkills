/** /google-ads, THE RESOLVE R4 review variant (owner review draft, 27 October 2026). NOT live.
 * Refines R3 after the owner's 14-page annotated review. Unchanged from R3 and re-exported: META, FAQS, WORK (verified
 * AnyBodyCanBake wording), CLOSE. Owner decisions treated as binding (27 October 2026): all five campaign types are
 * established managed services; the client supplies YouTube video creative; performance review calls are included on a
 * standard fixed cadence (the frequency is NOT stated until confirmed); the shared header CTA stays "Discuss Your Advertising".
 * Copy rule: no dashes used as punctuation.
 */
export { META, FAQS, WORK, CLOSE } from '../google-ads-r3/content';

export const HERO = {
  eyebrow: 'Google Ads management',
  h1: ['Reach customers when they’re looking for ', 'what you sell.'],
  lede: 'When someone searches for what you sell, they already have a need. We plan and manage Google Ads so your business appears at that moment, with a clear next step waiting for them.',
  cta: 'Discuss Your Google Ads',
  secondary: 'Request a call',
  caption: 'Illustrative journey with a generic business. Not every search becomes an enquiry.',
} as const;

/** Hero animation text (illustrative, generic business; no figures). */
export const SEARCH_DEMO = {
  query: 'beginner photography course',
  site: 'Your Business',
  url: 'https://www.yourbusiness.com',
  adTitle: 'Beginner Photography Course, Learn at Your Pace',
  adDesc: 'Live classes and feedback on your own photos. Book a free demo class.',
  other: 'How to choose your first camera',
  landing: { h: 'Beginner Photography Course', p: 'Live classes with feedback on your own photos.', f1: 'Name', f2: 'Phone', btn: 'Book a free demo', done: 'Enquiry sent' },
  label: 'Illustrative animation: a person types a search, sees a sponsored result, selects it, reaches a landing page and sends an enquiry.',
} as const;

export const INTENT = {
  eyebrow: 'Why Google Ads',
  h2: ['Different searches. ', 'Different buying decisions.'],
  lede: 'Google Ads reaches people who are already looking. What they are looking for decides the ad, and what happens next.',
  rows: [
    { id: 'shopper', who: 'A shopper comparing products', query: 'cotton sweatshirt for men', chance: 'Show your products with photos, so you are in the comparison.', next: 'Open a product and buy online.' },
    { id: 'learner', who: 'A learner researching a course', query: 'online coding course for beginners', chance: 'Answer what they asked and offer a demo class or a call.', next: 'Book a demo or send an enquiry.' },
    { id: 'buyer', who: 'A buyer looking close by', query: '2 BHK flats near me', chance: 'Match the need and lead to a page that makes enquiring easy.', next: 'Call, ask a question or book a site visit.' },
  ],
  note: 'Not every search leads to an enquiry. The aim is to meet the demand that already exists, with the right message.',
} as const;

export const MANAGE = {
  eyebrow: 'What MappedSkills manages',
  h2: ['We run the advertising. ', 'You keep the business.'],
  lede: 'Five things, handled with care.',
  items: [
    { k: 'Reach relevant searches', d: 'We find the searches that matter and keep out the ones that do not.' },
    { k: 'Select suitable campaigns', d: 'We recommend the campaign types that fit your offer and goal.' },
    { k: 'Manage spend responsibly', d: 'We watch where your budget goes and adjust it with you.' },
    { k: 'Improve messaging and performance', d: 'Ads and assets are refined as we learn what people respond to.' },
    { k: 'Review meaningful results', d: 'We go through what the results mean, with you, and decide what to change.' },
  ],
  ours: { h: 'MappedSkills manages', d: 'Advertising planning, setup, budget oversight, messaging, testing and review.' },
  yours: { h: 'Your business owns', d: 'Your website, offer and pricing, how enquiries are followed up, and delivery.' },
  separate: 'Landing-page, website, form or tracking changes can be scoped and agreed separately, before they start.',
} as const;

export const TYPES = {
  eyebrow: 'Google Ads campaign types',
  h2: ['Five ways to appear on Google. ', 'Pick what fits.'],
  lede: 'We manage all five. Most businesses need one or two, and we recommend them after understanding your offer.',
  items: [
    { id: 'search', name: 'Search', benefit: 'Show up when people search for what you offer.',
      situation: 'Your customers already search for what you sell: a course, a service, a product.',
      how: 'You choose the searches that matter. Your text ad appears with the results, and a click takes people to your page.',
      best: 'Enquiries, calls, sign-ups and purchases.' },
    { id: 'shopping', name: 'Shopping', benefit: 'Put your products in front of people who are ready to compare.',
      situation: 'You run an online store with a product catalogue, and a website that takes orders.',
      how: 'Your products appear with photo, price and store name when people search for similar items. It needs an accurate product feed.',
      best: 'Online purchases, for eligible product businesses.' },
    { id: 'pmax', name: 'Performance Max', benefit: 'Reach people across Google from one goal-based campaign.',
      situation: 'You have a clear goal, reliable tracking and good images and text to work with.',
      how: 'You set the goal. Google decides where to show your ads across Search, Shopping, Display, YouTube and more. You give up some control over placement.',
      best: 'Wider reach towards a goal such as sales or enquiries.' },
    { id: 'display', name: 'Display', benefit: 'Stay visible while people browse the web.',
      situation: 'You want to remind people who visited your site, or reach a defined audience.',
      how: 'Image ads appear on participating websites and apps. People are not searching, so it does a different job from Search.',
      best: 'Awareness, and bringing people back.' },
    { id: 'youtube', name: 'YouTube', benefit: 'Show what is hard to describe, to people already watching video.',
      situation: 'You have video that shows your product, programme or project well.',
      how: 'Your video ad plays on YouTube. You supply the video creative. We plan the campaign, audience and budget around it.',
      best: 'Awareness and consideration, and sometimes enquiries or sales.' },
  ],
  note: 'If your customers are not searching yet,',
  meta: { label: 'Meta Ads may fit better', href: '/social-media-ads' },
} as const;

export const JOURNEY = {
  eyebrow: 'From need to outcome',
  h2: ['How advertising connects ', 'to an enquiry or a sale'],
  stages: [
    { k: 'A customer need', d: 'Someone wants a product, a course or a service.', who: 'cust' },
    { k: 'Relevant Google advertising', d: 'Your ad meets that need in the right place.', who: 'ms' },
    { k: 'Your website or landing page', d: 'They look, compare and decide what to do.', who: 'you' },
    { k: 'An enquiry or a purchase', d: 'They get in touch, or buy. Your follow up matters here.', who: 'you' },
    { k: 'Measurement and improvement', d: 'We review the results and refine the advertising.', who: 'ms' },
  ],
  who: { cust: 'Your customer', ms: 'MappedSkills manages', you: 'Your business owns' },
  tools: 'The campaign types are different tools, not steps. Search and Shopping meet people who are looking. Display and YouTube reach people as they browse or watch. Performance Max works across Google.',
} as const;

export const MEASURE = {
  eyebrow: 'Measurement and improvement',
  h2: ['Judge Google Ads on ', 'what it brings your business'],
  outcomes: ['Qualified enquiries', 'Purchases', 'Course enrolments', 'Cost per meaningful action', 'Revenue or ROAS, where the data is reliable'],
  limits: {
    h: 'Tracking has limits',
    d: 'Not every sale can be traced to an ad. A call, a visit or a later search may close it elsewhere. Where we cannot tell, we say so.',
    promise: 'We cannot promise leads, purchases, sales or a return on ad spend.',
  },
  report: 'Your engagement includes a monthly performance report and performance review calls on a regular, fixed schedule.',
} as const;

export const PROCESS = {
  eyebrow: 'What happens after you contact us',
  h2: ['A clear path, ', 'with your approval first'],
  lede: 'We start by understanding your business and what you want advertising to achieve. You see our findings, a recommended plan and a proposal before any work starts. Nothing begins until you approve it.',
  steps: [
    { k: 'Understand', d: 'Your offer, your customers and what they search for.' },
    { k: 'Plan', d: 'Campaign types, budget and how success will be judged.' },
    { k: 'Launch', d: 'The agreed campaigns go live, once you have approved them.' },
    { k: 'Test', d: 'Searches, ad messages and pages are refined as we learn.' },
    { k: 'Review', d: 'We go through results with you on review calls and decide what to change next.' },
  ],
  link: { href: '/how-it-works', label: 'See How We Work' },
  cost: 'Google ad spend is paid directly to Google. Our management fee is charged separately.',
  costLink: { href: '/pricing', label: 'View Our Plans & Pricing' },
} as const;
