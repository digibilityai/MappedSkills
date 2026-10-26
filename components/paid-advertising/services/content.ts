/** /services Content R2, approved by the owner with the five corrections of 26 October 2026.
 * Evidence notes live in docs/paid-advertising-revamp/SERVICES_R1_NOTES.md. No YouTube, no other platform, no free audit,
 * no response times, no figures. Click-to-WhatsApp is an option within Meta Ads, not a service.
 */
export const HERO = {
  eyebrow: 'Google Ads and Meta Ads for Indian businesses',
  h1: 'Reach more of the right customers with Google Ads and Meta Ads.',
  lede: 'Some customers search for what they need. Others discover businesses while browsing. We help you reach both, with advertising planned around how people find, consider and buy from your business.',
  anchor: 'Explore Our Services',
} as const;

export const CARDS = [
  { id: 'google', name: 'Google Ads', href: '/google-ads', badge: 'They search',
    benefit: 'Reach people at the moment they search for what you sell.',
    suits: ['Online courses', 'Specialist and local services', 'Products people search for'],
    manage: 'We plan and manage campaigns around relevant searches, your advertising budget and the actions you want customers to take.' },
  { id: 'meta', name: 'Meta Ads', href: '/social-media-ads', badge: 'They discover',
    benefit: 'Introduce your offer to people who did not know to look for it.',
    suits: ['Apparel and D2C brands', 'Education and coaching', 'Real estate'],
    manage: 'We plan and manage who sees your ads, how campaigns are organised, ad testing, budget pacing and a review of where people land after clicking.',
    whatsapp: 'Option within Meta Ads: where it suits your business, ads can start a WhatsApp chat as well as sending people to your website or an enquiry form.',
    note: 'Meta Ads means advertising on Facebook and Instagram. We do not manage your posting.' },
] as const;

export const FIT = {
  rows: [
    { k: 'search', who: 'Customers already searching', then: 'Google Ads' },
    { k: 'browse', who: 'Customers discovering offers', then: 'Meta Ads' },
    { k: 'both', who: 'Both behaviours', then: 'We assess a coordinated approach' },
  ],
  caveat: 'Not every business needs both. Advertising works best when these are in place. We check them before recommending anything.',
  checks: ['A clear offer', 'Margins that support paying to win customers', 'Prompt follow-up of enquiries', 'A way to see what happens next'],
} as const;

export const SCOPE = {
  included: ['Planning campaigns around your offer and customers', 'Running them and adjusting your budget as performance calls for it', 'Testing different ads', 'Setting up tracking for meaningful enquiry actions, where technically possible', 'Reviewing where people land and telling you what we find', 'A monthly performance report with ongoing work, and review calls where agreed in your proposal'],
  separate: ['Website, landing-page and tracking changes', 'Creative beyond the agreed designs, such as reels, video and scripting'],
  separateNote: 'For Meta Ads, your proposal sets a defined number of static ad designs. The number is agreed in the proposal.',
} as const;

/** Verified descriptions from the live case pages and /work index (26 October 2026). Wanderlooms has no individual page. */
export const WORK = [
  { id: 'anybodycanbake', name: 'AnyBodyCanBake', channel: 'Google Ads', sector: 'Online baking courses',
    line: 'Google Ads for a Pune online baking school, aimed at more students for its eggless and healthy baking courses.',
    href: '/portfolio/google-ads-for-online-courses', cta: 'Read the Google Ads case study' },
  { id: 'wanderlooms', name: 'Wanderlooms', channel: 'Meta Ads', sector: 'Adventure apparel',
    line: 'Meta advertising for an adventure apparel brand featured on Shark Tank India.', href: null, cta: null },
  { id: 'om-sai', name: 'Om Sai Developer', channel: 'Meta Ads', sector: 'Real estate, Mumbai',
    line: 'Meta ads for a Mumbai real estate developer, focused on enquiries from people interested in the project.',
    href: '/portfolio/om-sai-developer-meta-ads', cta: 'Read the Meta Ads case study' },
] as const;

export const PROCESS = {
  steps: ['Assess', 'Plan', 'Launch', 'Test', 'Review'],
  copy: 'Every engagement follows the same five steps, so you always know what is happening and what comes next. Nothing starts until you approve it.',
} as const;

export const COST = {
  items: [
    { t: 'Ad spend', d: 'Paid directly to the platform.' },
    { t: 'Management fee', d: 'Charged separately, and shaped by the work involved.' },
    { t: 'Separately scoped work', d: 'Website or tracking changes, and creative beyond the agreed designs.' },
  ],
  ready: ['You already sell, or are close', 'You can follow up enquiries promptly', 'You know roughly what a customer is worth', 'You can invest enough to learn what works'],
  premature: ['Your offer is untested', 'You cannot follow up enquiries yet', 'You need guaranteed results, which no one can honestly promise'],
} as const;

export const SERVICES_FAQS = [
  { question: 'Should I start with Google Ads or Meta Ads?', answer: 'It depends on how your customers buy. Google Ads suits people already searching. Meta Ads suits people discovering offers. We look at your offer, margins and follow-up before recommending either, or both.' },
  { question: 'Can you work on campaigns we already run?', answer: 'Yes. Tell us what is running now and we will discuss what to review before suggesting a plan.' },
  { question: 'Can you run Click-to-WhatsApp ads?', answer: 'Where WhatsApp suits how your customers prefer to ask, Meta ads can start a chat. Your team needs to reply promptly. We will discuss whether it fits.' },
  { question: 'Who creates the ad creative?', answer: 'For Meta, your proposal includes a defined number of static ad designs. Reels, video, scripting and anything beyond that are scoped separately. For Google Ads, managing the ads is part of our work.' },
  { question: 'How are fees handled?', answer: 'Ad spend goes directly to the platform. Our fee is separate and depends on the work involved, so every quote is tailored.' },
  { question: 'Can you guarantee sales or a return?', answer: 'No. We agree the work, measurement and responsibilities clearly. Results also depend on your offer, pricing, website, competition and follow-up.' },
] as const;

export const CLOSE = {
  h: 'Tell us about your business and what you want advertising to achieve.',
  body: 'Share what you sell, who buys it and where you want to grow. We will reply by email or WhatsApp to talk it through. Nothing starts until you approve it.',
} as const;
