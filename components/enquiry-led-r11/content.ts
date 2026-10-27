/** /who-we-help/enquiry-led-businesses, R1.1 storytelling and motion refinement (27 October 2026). NOT live, no production route.
 * Audience defined by buying behaviour (owner decision). No audience-specific proof exists, so there is no case section and no
 * claim of industry expertise; examples are non-exhaustive. Google Ads and Meta Ads only. Reporting Policy A, tracking boundary
 * (DEC-080), Click-to-WhatsApp (DEC-080). No figures, guarantees, long dashes or double dashes, and no claim that MappedSkills
 * handles consultations, sales follow-up or CRM. Illustrative labels are generic and carry no counts or ratios.
 */
export const META = {
  title: 'Google & Meta Ads for Enquiry-Led Businesses | MappedSkills',
  description: 'Google Ads and Meta Ads for businesses where customers enquire before they buy. Reach relevant people and judge advertising by conversations, not form fills.',
} as const;

export const HERO = {
  eyebrow: 'Who we help: enquiry-led businesses',
  h1: ['More enquiries are good. ', 'Better conversations are worth more.'],
  lede: 'Google Ads and Meta Ads help relevant people discover your business and take a sensible next step, so your team spends time on conversations worth having.',
  cta: 'Discuss Your Advertising',
  secondary: { label: 'Request a call', href: '/contact?intent=call' },
  alt: 'An inbox of enquiries. Most are browsing, a price check or not a fit. One is from someone who needs what you offer, and that one turns into a conversation.',
  inbox: 'Inbox',
  rows: [
    { t: 'Just browsing', on: false },
    { t: 'Price check only', on: false },
    { t: 'Asking about something you do not do', on: false },
    { t: 'Looking for a job, not a service', on: false },
    { t: 'Needs what you offer and wants to talk', on: true },
  ],
  convo: 'A conversation starts',
} as const;

export const RELEVANCE = {
  eyebrow: 'Why relevance matters',
  h2: ['Not every enquiry ', 'is worth the same.'],
  lede: 'Same inbox, two views. Switch to see what your team would rather spend its time on.',
  legend: 'Show',
  views: { all: 'All enquiries', rel: 'Relevant to you' },
  rows: [
    { t: 'Wants a quote for exactly what you offer', rel: true },
    { t: 'Asking about something you do not do', rel: false },
    { t: 'Just comparing prices', rel: false },
    { t: 'Needs your service this month', rel: true },
    { t: 'Looking for a job, not a service', rel: false },
    { t: 'Wants to talk through their requirements', rel: true },
    { t: 'Outside the area you serve', rel: false },
    { t: 'Browsing, no plan yet', rel: false },
  ],
  tag: 'Relevant',
  sum: { all: 'Your team reads, sorts and replies to every one.', rel: 'Your team starts with people likely to need you.' },
  line: 'Advertising can help the right people ask, and clear messaging helps the others decide early.',
} as const;

export const WHO = {
  eyebrow: 'Recognise your business',
  h2: ['Your customers ', 'ask before they buy.'],
  lede: 'If you hear things like these first, this page is for you.',
  asks: [
    { l: 'Request information', q: 'Can you send me more details?' },
    { l: 'Discuss requirements', q: 'This is what I need. Can you help?' },
    { l: 'Arrange a consultation', q: 'Could we talk this week?' },
    { l: 'Ask for a quote', q: 'What would this cost for my situation?' },
  ],
  examples: { lead: 'You might run', items: ['A consultancy', 'A specialist service', 'Made-to-order work', 'An appointment-based service'] },
  elsewhere: [
    { lead: 'Selling products online?', label: 'See D2C brands', href: '/who-we-help/d2c' },
    { lead: 'Teaching or training?', label: 'See education', href: '/who-we-help/education' },
    { lead: 'Developing property?', label: 'See real estate', href: '/who-we-help/real-estate' },
  ],
} as const;

export const PATH = {
  eyebrow: 'The buyer journey',
  h2: ['How a stranger ', 'becomes a conversation.'],
  lede: 'Fewer people move forward at every step. Advertising helps the right ones find you.',
  stages: [
    { k: 'need', t: 'Has a need or question', d: 'Someone needs something or wants to understand their options. They may not know your business exists yet.', on: 15 },
    { k: 'compare', t: 'Looks around and compares', d: 'They search, scroll and read about providers. Advertising can put you in front of them while they decide.', on: 10 },
    { k: 'fit', t: 'Sees a possible fit', d: 'Clear messaging helps them judge whether you suit their situation. Some decide you do not, which saves time on both sides.', on: 6 },
    { k: 'ask', t: 'Chooses to enquire', d: 'A few ask a question, request information or share what they need, using the route you offer.', on: 3 },
    { k: 'talk', t: 'A conversation may follow', d: 'Your team replies and talks through what they need. That conversation, and what comes of it, is yours.', on: 1 },
  ],
} as const;

export const ROLES = {
  eyebrow: 'Google Ads and Meta Ads',
  h2: ['Two moments. ', 'One customer.'],
  lede: 'The same person can discover you on Meta and look for you on Google. We recommend where to start.',
  google: { platform: 'Google Ads', moment: 'Searching for a solution', t: 'They already know what they need', d: 'Your ad can appear as they search, when they are comparing providers and ready to ask.', fit: 'Customers search for your service or the problem it solves.' },
  meta: { platform: 'Meta Ads', moment: 'Browsing Facebook or Instagram', t: 'They have not started looking yet', d: 'A relevant offer can introduce your business and invite them to enquire or message you.', fit: 'Your service is considered, visual or needs explaining.' },
  fitLabel: 'Fits when',
  bridge: { lead: 'How the two can work together', steps: ['Meta introduces you', 'They search for you on Google', 'They enquire'] },
  note: 'Click-to-WhatsApp is available on Meta where it suits your customers.',
  links: { google: { label: 'Explore Google Ads', href: '/google-ads' }, meta: { label: 'Explore Meta Ads', href: '/social-media-ads' } },
} as const;

export const DECISIONS = {
  eyebrow: 'Campaign decisions',
  h2: ['Five choices ', 'shape every enquiry.'],
  lede: 'Each choice builds on the one before. Together they make the ad, and the enquiry that follows.',
  items: [
    { k: 'aud', t: 'Audience', q: 'Who should see it?', d: 'The people and situations that suit your business, and the ones that are better left out.' },
    { k: 'offer', t: 'Offer', q: 'What are you offering?', d: 'A clear service or consultation that makes sense to someone who has never heard of you.' },
    { k: 'loc', t: 'Location', q: 'Where do you work?', d: 'The areas you serve, so people outside them are less likely to enquire and waste your time.' },
    { k: 'msg', t: 'Message', q: 'Why should they care?', d: 'Plain words about what you do and who it is for, so the right people recognise themselves.' },
    { k: 'next', t: 'Next step', q: 'How do they ask?', d: 'A form, a call or a WhatsApp message, matched to your customers, with your team ready to reply.' },
  ],
  ad: { aud: 'Your customers', loc: 'Where you work', cta: 'Ask a question' },
} as const;

export const METHOD = {
  eyebrow: 'How we work',
  h2: ['Each round teaches ', 'the next one.'],
  lede: 'We learn from the campaign data we can see and the enquiry feedback you share, then decide what to change.',
  steps: [
    { t: 'Understand', d: 'Your offer, customers and how they usually enquire.' },
    { t: 'Plan', d: 'The platforms, audiences, messages and budget.' },
    { t: 'Test', d: 'Messaging and targeting, to see what people respond to.' },
    { t: 'Review', d: 'The results we can see, and what you tell us.' },
    { t: 'Improve', d: 'What to change, keep or stop in the next round.' },
  ],
  loop: 'What we learn shapes the next plan.',
  learn: {
    h: 'What each round draws on',
    sources: [
      { t: 'Campaign data we can see', d: 'How people respond to messages, audiences and platforms.' },
      { t: 'Enquiry feedback you share', d: 'Which enquiries were relevant, and which moved forward.' },
    ],
    result: { t: 'Clearer next decisions', d: 'Where to adjust, where to hold steady and what to test next.' },
    note: 'The more you share, the more we can learn.',
  },
} as const;

export const FAQS = [
  { question: 'How would you approach our business?', answer: 'We start with how your customers buy: what they ask, who they speak to and what a good enquiry looks like. Then we plan, test and review the advertising with you.' },
  { question: 'Do you speak to or qualify our enquiries?', answer: 'No. Enquiries go to your team, who hold the conversation, the quote and the sale. We manage the advertising and review the information you share with us.' },
  { question: 'Can you guarantee enquiries, quality or sales?', answer: 'No. Results also depend on your offer, pricing, website, competition and how quickly you reply. We agree the work and how progress is judged, and promise no set numbers.' },
  { question: 'Where do enquiries go, and what about tracking?', answer: 'To your own form, phone or WhatsApp, depending on your setup. We review available data and recommend improvements. New tracking, form or CRM work is scoped separately unless your proposal includes it.' },
  { question: 'Can people message us on WhatsApp from an ad?', answer: 'Yes, Click-to-WhatsApp ads on Meta can suit businesses where your team can reply quickly. Your team handles the chat. Chat automation and CRM integration are not included unless your proposal says so.' },
  { question: 'Is this the same as your lead generation service?', answer: 'No. This page is about the businesses we help: those whose customers enquire before buying. Our lead generation page explains how enquiries reach your own form, CRM or WhatsApp.', link: { label: 'Read about lead generation', href: '/lead-generation' } },
  { question: 'What do reports and costs look like?', answer: 'You receive a monthly performance report with ongoing management, and review calls as agreed in your proposal. Ad spend is paid directly to Google or Meta. Our fee is separate.', link: { label: 'Our pricing approach', href: '/pricing' } },
] as const;

export const CLOSE = {
  h: 'Let’s work out what a good enquiry looks like for you.',
  body: 'Tell us what you offer and how customers usually ask. We will tell you honestly whether Google Ads and Meta Ads suit you.',
  cta: 'Discuss Your Advertising',
} as const;
