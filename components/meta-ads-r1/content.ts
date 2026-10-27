/** /social-media-ads, Meta Ads R1 review variant (owner review draft, 27 October 2026). NOT live; local preview only.
 * Grounds: DEC-078 to DEC-080 (Meta Ads page, tracking boundary, Reporting Policy A, Click-to-WhatsApp), the owner's
 * 27 October 2026 creative policy (MappedSkills writes the advertising copy and adapts creative assets; the client supplies
 * original photographs and videos; no creative-production pricing or packages), and the verified Om Sai case page.
 * No figures, ROAS, testimonials, prices, minimum budgets, timelines or guarantees. Copy rule: no dashes used as punctuation.
 */
export const META = {
  title: 'Meta Ads Management for Businesses in India | MappedSkills',
  description: 'Facebook and Instagram advertising for growing Indian businesses. MappedSkills plans, manages and improves Meta Ads around your enquiries and sales goals.',
} as const;

export const HERO = {
  eyebrow: 'Meta Ads management',
  h1: ['Turn attention on Facebook and Instagram into ', 'business opportunities.'],
  lede: 'Reach relevant people with ads that introduce your offer and encourage enquiries or purchases. We plan, manage and improve Meta Ads around your business goals.',
  cta: 'Discuss Your Meta Ads',
  secondary: 'Request a call',
  caption: 'Illustrative example with a generic business. Not every ad is noticed, and not every view becomes an enquiry.',
} as const;

/** Hero animation text (illustrative, generic business; no figures, no likes, no results). */
export const FEED_DEMO = {
  brand: 'Your Brand',
  spon: 'Sponsored',
  copy: 'Made for long rides. Pick your fit and order online.',
  site: 'yourbrand.com',
  cta: 'Shop now',
  landing: { h: 'Trail Jacket', p: 'Light, weatherproof, made for the ride.', f1: 'Name', f2: 'Phone', btn: 'Ask about this', done: 'Enquiry sent' },
  label: 'Illustrative animation: a person scrolls a Facebook or Instagram feed, notices a sponsored ad, taps it, looks at the offer and sends an enquiry.',
} as const;

export const INTENT = {
  eyebrow: 'Why Meta Ads',
  h2: ['Your next customer may not be ', 'searching for you yet.'],
  lede: 'On Facebook and Instagram, people are browsing, not looking for you. A relevant ad can introduce your offer to someone who did not know to ask.',
  rows: [
    { id: 'product', who: 'Someone discovers a product they may want', thought: 'I did not know I needed this.',
      chance: 'Show the product clearly, with one good reason to look closer.', next: 'Open the product page and buy, or send a message.' },
    { id: 'course', who: 'Someone becomes interested in a course or coaching programme', thought: 'Maybe I should learn this.',
      chance: 'Explain what they will learn and make the next step easy to take.', next: 'Book a demo or send an enquiry.' },
    { id: 'home', who: 'Someone explores a property or service and decides to enquire', thought: 'This could suit us.',
      chance: 'Present the offer clearly, so the right people want to know more.', next: 'Ask for details or request a call.' },
  ],
  note: 'Interest is not a sale. Many people will scroll past, and that is normal. The aim is to reach the right ones and give them a clear next step.',
} as const;

export const FORMATS = {
  eyebrow: 'Meta ad formats',
  h2: ['Different formats for different moments. ', 'Pick what fits.'],
  lede: 'These are ways your ad can appear on Facebook and Instagram. Most businesses use one or two, not all five.',
  items: [
    { id: 'feed', name: 'Feed Ads', benefit: 'Appear among the posts people already scroll through.',
      sees: 'A photo, a short video or a link card in the main feed, with a headline, a line of text and a button.',
      useful: 'Your offer can be shown in one image or one short message, such as a product, a programme or a project.',
      action: 'Tap through to your website, or send a message.' },
    { id: 'stories', name: 'Stories Ads', benefit: 'Take up the whole screen for a moment.',
      sees: 'A full-screen, upright ad between people’s Stories, with a tap or swipe to learn more.',
      useful: 'You have upright photos or video, and a short, simple message with one clear next step.',
      action: 'Swipe or tap to open your page.' },
    { id: 'reels', name: 'Reels Ads', benefit: 'Show your offer in short, upright video.',
      sees: 'A short video that plays full screen between Reels, with text and a button below.',
      useful: 'You can supply short video that shows the product or programme in use.',
      action: 'Watch, then tap to visit your page.' },
    { id: 'carousel', name: 'Carousel Ads', benefit: 'Show several things in one ad.',
      sees: 'A row of cards people swipe through, each with its own image, headline and link.',
      useful: 'You have a range to show, or one offer that needs a few steps to explain.',
      action: 'Swipe, pick a card and tap to open it.' },
    { id: 'lead', name: 'Lead Form Ads', benefit: 'Let people ask for details without leaving the app.',
      sees: 'An ad that opens a short form inside Facebook or Instagram, with their details ready to fill in.',
      useful: 'You want enquiries, and your team can follow up promptly.',
      action: 'Fill in a short form and send an enquiry.' },
  ],
  note: 'Not every format suits every business. We recommend them after understanding your offer, and you supply the original photographs and videos.',
  alt: { label: 'If your customers are already searching, Google Ads may fit better', href: '/google-ads' },
} as const;

export const JOURNEY = {
  eyebrow: 'From scroll to enquiry',
  h2: ['How a Meta ad leads to ', 'an enquiry or a sale'],
  stages: [
    { k: 'A customer sees your ad', d: 'It appears while they browse Facebook or Instagram.', who: 'ms' },
    { k: 'They explore the offer', d: 'They read, look at the pictures and decide if it is for them.', who: 'ms' },
    { k: 'They visit a website or open a form', d: 'They land on your page, or fill in a form in the app.', who: 'you' },
    { k: 'They enquire or purchase', d: 'They get in touch, or buy. Your follow-up matters here.', who: 'you' },
    { k: 'We review and improve', d: 'We look at the results with you and refine the advertising.', who: 'ms' },
  ],
  who: { ms: 'MappedSkills manages', you: 'Your business owns' },
  closing: 'We manage the advertising. Your offer, your website or form, your follow-up and delivery stay with your business.',
} as const;

export const MANAGE = {
  eyebrow: 'What MappedSkills manages',
  h2: ['What we handle, ', 'and what you bring'],
  lede: 'Nine things, each there to make your advertising work harder.',
  items: [
    { k: 'Campaign planning', d: 'A clear plan built around the goal you want.' },
    { k: 'Audience strategy', d: 'Ads aimed at people most likely to care.' },
    { k: 'Advertising copy', d: 'Headlines and text that make the offer clear.' },
    { k: 'Adapting your images and videos', d: 'Your assets prepared to suit each format.' },
    { k: 'Campaign setup', d: 'Campaigns organised so each has a clear job.' },
    { k: 'Budget management', d: 'Spend paced and watched, not left to run.' },
    { k: 'Creative and message testing', d: 'Messages compared once enough people have seen them.' },
    { k: 'Retargeting, where appropriate', d: 'Reconnecting with people who showed interest.' },
    { k: 'Performance review and optimisation', d: 'Results reviewed with you, then refined.' },
  ],
  ours: { h: 'MappedSkills manages', d: 'Planning, audiences, advertising copy, adapting your assets, setup, budget, testing and review.' },
  yours: { h: 'You bring', d: 'Your original photographs and videos, an accurate offer, a page or form that takes enquiries, prompt follow-up and delivery.' },
  separate: 'Landing-page, website, form or tracking changes can be scoped and agreed separately, before they start.',
} as const;

export const MEASURE = {
  eyebrow: 'Measurement and improvement',
  h2: ['More views aren’t the goal. ', 'More meaningful customer actions are.'],
  outcomes: ['Qualified enquiries', 'Purchases', 'Course enrolments', 'Cost per meaningful action', 'Revenue or ROAS, where the data is reliable'],
  outcomesLabel: 'What we look at first',
  signals: { label: 'Helps us decide, not a result on its own', items: ['Reach', 'Clicks', 'Engagement'] },
  limits: {
    h: 'Tracking has limits',
    d: 'Not every action can be tracked, and not every sale can be traced to an ad. A call, a visit or a later search may close it elsewhere. Where we cannot tell, we say so.',
    promise: 'We cannot promise enquiries, purchases, sales or a return on ad spend.',
  },
  report: 'Your engagement includes a monthly performance report, and review calls as agreed in your proposal.',
} as const;

export const WORK = {
  eyebrow: 'Relevant client work',
  h2: ['Meta Ads work ', 'we have done'],
  items: [
    { id: 'om-sai', tag: 'Real estate', name: 'Om Sai Developer, Mumbai',
      body: 'Om Sai needed to sell 2 and 3 BHK apartments in Chembur against a specific buyer brief. We changed its Meta campaign from broad property advertising to creative and messaging built around the project’s lifestyle, to reach relevant prospective buyers.',
      link: { href: '/portfolio/om-sai-developer-meta-ads', label: 'Read the case study' } },
    { id: 'wanderlooms', tag: 'Adventure apparel', name: 'Wanderlooms',
      body: 'Meta advertising for an adventure apparel brand with a strong biking community, featured on Shark Tank India.',
      link: null },
  ],
  note: 'Every business is different, so these examples do not predict your results.',
  all: { href: '/work', label: 'See our work' },
} as const;

export const PROCESS = {
  eyebrow: 'What happens after you contact us',
  h2: ['A clear path, ', 'with your approval first'],
  lede: 'We start by understanding your business and what you want advertising to achieve. You see our findings, a recommended plan and a proposal before any work starts. Nothing begins until you approve it.',
  steps: [
    { k: 'Understand', d: 'Your offer, your customers and what you want from advertising.' },
    { k: 'Plan', d: 'Formats, audiences, budget and how success will be judged.' },
    { k: 'Launch', d: 'The agreed campaigns go live, once you have approved them.' },
    { k: 'Test', d: 'Messages, visuals and audiences are refined as we learn.' },
    { k: 'Review', d: 'We go through results with you and decide what to change next.' },
  ],
  link: { href: '/how-it-works', label: 'See How We Work' },
  cost: 'Meta ad spend is paid directly to Meta. Our management fee is charged separately.',
  costLink: { href: '/pricing', label: 'Understand Our Pricing Approach' },
} as const;

export const FAQS = [
  { question: 'Is Meta Ads suitable for my business?', answer: 'It depends on your offer, your audience and whether you can handle enquiries or orders. It often suits businesses people may want before they start searching, such as apparel and D2C brands, courses and coaching, and property. We discuss this first, and say if another approach may suit you better.' },
  { question: 'Do you manage both Facebook and Instagram Ads?', answer: 'Yes. Meta Ads can appear on both. We recommend where your ads should run based on your customers and your creative, then review what the data shows.' },
  { question: 'Do I need to provide photographs and videos?', answer: 'Yes. You supply your original photographs and videos. We write the advertising copy and adapt your images and videos to suit each format.' },
  { question: 'Can you adapt my existing creatives?', answer: 'Yes. Share what you already have. We review it, write the copy around it and adapt it to the formats that suit your goal. If something is unlikely to work well, we tell you early.' },
  { question: 'What advertising budget should I start with?', answer: 'There is no single right amount. It depends on your offer, your market and how much you need to spend to learn what works. We talk it through in your first conversation. Your ad spend is paid directly to Meta, and our management fee is charged separately.' },
  { question: 'How do you measure enquiries and sales?', answer: 'We review the campaign and enquiry data available, point out gaps and recommend improvements. Where reliable data exists, we look at meaningful actions such as enquiries and purchases, not just clicks. An enquiry we can see is not always one an ad caused, and where we cannot tell, we say so. You get a monthly performance report, and review calls as agreed in your proposal. New tracking setup and repairs are scoped separately unless your proposal includes them.' },
  { question: 'Can you take over an existing Meta Ads account?', answer: 'Yes. We review what is running, the audiences, the creatives and the page people reach before suggesting any changes.' },
] as const;

export const CLOSE = {
  h: 'Ready to bring your offer to the right people?',
  body: 'Tell us about your business and what you want your Meta Ads to achieve.',
  cta: 'Discuss Your Meta Ads',
} as const;
