/** /social-media-ads Content R2, approved by the owner 26 October 2026 with final refinements; recorded as DEC-080.
 * Click-to-WhatsApp is an available option where suitable (no performance claims). Tracking setup is separately scoped.
 * No figures, ROAS, outcomes or invented creative. Wanderlooms has no individual case page, so its card is unlinked.
 * The Om Sai wording is taken from the live case page (/portfolio/om-sai-developer-meta-ads).
 */
export const HERO = {
  eyebrow: 'Meta Ads management',
  line: 'Reach people who may need what you sell, even before they start searching.',
  body: 'We plan and manage Meta Ads to introduce your business to relevant people, build interest in your offer and encourage meaningful enquiries or purchases.',
} as const;

export const WHY = {
  body: 'People on Facebook and Instagram are not usually searching for you. They are scrolling. A good ad can introduce your offer to someone who did not know to look, and give them a reason to find out more.',
  stages: [
    { k: 'Discovery', d: 'They see your ad while browsing.' },
    { k: 'Interest', d: 'The message and image make them stop.' },
    { k: 'Consideration', d: 'They look at your offer, page and price.' },
    { k: 'Enquiry or purchase', d: 'They get in touch, message you or buy.' },
  ],
  closing: 'Attention is the starting point. What matters is whether that interest moves people closer to an enquiry or purchase.',
} as const;

export const MANAGE = {
  route: [
    { k: 'Choose who sees it', d: 'We decide which people your ads should reach.' },
    { k: 'Set up the campaigns', d: 'We organise them so each one has a clear job.' },
    { k: 'Try different ads', d: 'We test messages and visuals when enough people see them to compare.' },
    { k: 'Pace the budget', d: 'We control how quickly your money is spent.' },
    { k: 'Check where they land', d: 'We review the page people reach after clicking and recommend improvements that could help turn visits into enquiries.' },
  ],
  pathsLabel: 'Ways people can enquire',
  paths: [
    { k: 'site', t: 'Your website', d: 'People visit, look around and get in touch or buy.' },
    { k: 'form', t: 'An enquiry form', d: 'People leave their details for you to follow up.' },
    { k: 'chat', t: 'A WhatsApp conversation', d: 'Through Click-to-WhatsApp, where it suits your customers and sales process.' },
  ],
  responsibility: 'Your team needs to respond to conversations promptly. We do not reply for you, and chat automation or CRM connections are not included unless your proposal says so.',
  included: [
    'Review available campaign and enquiry data.',
    'Identify measurement gaps and recommend improvements.',
    'Review meaningful actions where reliable data is available.',
    'Monthly performance reporting.',
    'Review calls as agreed in the proposal.',
  ],
  separate: [
    'New tracking setup and repairs.',
    'Website integrations and technical tracking implementation.',
    'Website, form and landing-page changes.',
    'Video, reels and additional creative production.',
  ],
  creative: 'Static ad creative requirements and allowances are defined in your proposal. Video, reels and additional production are scoped separately.',
  honesty: 'An enquiry we can see is not always an enquiry an ad caused. Where we cannot tell, we say so.',
  ctaLead: 'Not sure how your ads should lead to enquiries?',
} as const;

export const FIT = {
  good: [
    { k: 'product', t: 'Brands whose products people can see and want, such as apparel and D2C.' },
    { k: 'learn', t: 'Education and coaching, where interest builds before someone enrols.' },
    { k: 'home', t: 'Real estate and other considered purchases, where lifestyle and trust matter.' },
  ],
  pause: ['A weak offer or unclear audience.', 'Poor presentation of the product or service.', 'No practical enquiry or purchase path.', 'Inadequate follow-up.', 'Customer acquisition economics that do not work.'],
  closing: 'If people already search for what you sell, Google Ads may reach them at that moment. Some businesses use both, and we assess that before recommending either.',
  note: 'This is paid advertising, not managing your social media pages.',
} as const;

export const STEPS = [
  { k: 'Understand', d: 'Your offer and audience.' },
  { k: 'Plan', d: 'Campaigns and creative.' },
  { k: 'Launch', d: 'Approved work only.' },
  { k: 'Test', d: 'Messages and audiences.' },
  { k: 'Review', d: 'Results with you.' },
] as const;

export const WORK = [
  { id: 'om-sai', name: 'Om Sai Developer, Mumbai', category: 'Real estate', href: '/portfolio/om-sai-developer-meta-ads', cta: 'Read the case study',
    body: 'Om Sai needed to sell 2 and 3 BHK apartments in Chembur against a specific buyer brief. We changed its Meta campaign from broad property advertising to creative and messaging built around the project’s lifestyle, to reach relevant prospective buyers.' },
  { id: 'wanderlooms', name: 'Wanderlooms', category: 'Adventure apparel', href: null, cta: null,
    body: 'Meta advertising for an adventure apparel brand featured on Shark Tank India.' },
] as const;

export const COST = {
  equation: { total: 'Your advertising investment', spend: { t: 'Meta ad spend', d: 'Paid directly to Meta.' }, fee: { t: 'MappedSkills management fee', d: 'Charged separately.' } },
  extra: { t: 'Only when needed', d: 'Video production, technical tracking implementation, website changes, landing-page changes or extra creative work are quoted separately, and only when agreed.' },
  expect: 'Results vary with your offer, creative, pricing, website and follow-up. We cannot promise a number of enquiries, sales or a cost for each. When performance disappoints, we tell you early and review what to change.',
} as const;

export const META_FAQS = [
  { question: 'Is Meta Ads right for my business?', answer: 'It depends on your offer, your audience and whether you can handle enquiries or orders. We discuss this first, and say if another approach may suit you better.' },
  { question: 'Facebook or Instagram?', answer: 'Meta ads can appear on both. We talk through where your ads should run based on your customers and your creative, and review what the data shows.' },
  { question: 'Who creates the ad creative?', answer: 'Static ad creative requirements and allowances are defined in your proposal. Video, reels and additional production are scoped separately.' },
  { question: 'Can you run Click-to-WhatsApp ads?', answer: 'Yes. We can run Meta ads that open a WhatsApp conversation when that suits your customers and sales process. Your team needs to respond to enquiries promptly. We will recommend this approach only when it fits your business.' },
  { question: 'Can you improve campaigns we already run?', answer: 'Yes. We review what is running, the audiences and the landing page before suggesting changes.' },
  { question: 'How do you measure enquiries and purchases?', answer: 'We review the campaign and enquiry data available, point out gaps and recommend improvements. Where reliable data exists, we look at meaningful actions, not just clicks. An enquiry we can see is not always one an ad caused, and where we cannot tell, we say so. New tracking setup and repairs are scoped separately unless your proposal includes them.' },
  { question: 'What budget and results should I expect?', answer: 'There is no single right amount. It depends on your offer, your market and how much you need to spend to learn what works. Your ad spend goes directly to Meta. We cannot promise enquiries, sales or a return.' },
] as const;

export const CLOSE = {
  h: 'Ready to bring your offer to the right people?',
  body: 'Tell us about your business and what you want your Meta Ads to achieve.',
} as const;
