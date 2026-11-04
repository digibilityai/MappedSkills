/** /services R2, owner-approved design direction with four final corrections (27 October 2026).
 * Evidence notes: docs/paid-advertising-revamp/SERVICES_R1_NOTES.md. No YouTube, no other platform, no free audit,
 * no response times, no figures, no Click-to-WhatsApp (delivery unconfirmed). The work section is the shared case showcase
 * (showcase.ts, B2 DEC-120), which reads the public case-study library.
 */
export const HERO = {
  eyebrow: 'Google Ads, Meta Ads and SEO for Indian businesses',
  lede: 'We plan and manage Google Ads, Meta Ads and SEO so more of the right buyers find you, more of them make an enquiry, and you can see what worked.',
  anchor: 'See how the path works',
} as const;

/** Hero diagram (B2 R2): two customer journeys, one per core service, converge through Capture and Convert towards an enquiry;
 * Measure frames the whole path. An approach, not results: the caption says so. */
export const DIAGRAM = {
  entries: [
    { id: 'search', k: 'They search', ch: 'Google Ads', d: 'People already looking for what you sell' },
    { id: 'browse', k: 'They browse', ch: 'Meta Ads', d: 'People who were not looking yet' },
    { id: 'seo', k: 'They compare', ch: 'SEO', d: 'People researching and choosing' },
  ],
  stations: [
    { k: 'Capture', d: 'Found by the right buyers' },
    { k: 'Convert', d: 'Easy to enquire' },
  ],
  end: 'A qualified enquiry',
  measure: { k: 'Measure', d: 'Watches every step and shows what worked' },
  caption: 'How we plan the work. A diagram of the approach, not measured results.',
} as const;

export const PATH = {
  eyebrow: 'The path',
  intro: 'Traffic is not the finish line. We plan the work around the whole path, so you can see where it works and where it breaks.',
  rows: [
    { k: 'Capture', q: 'Are the right buyers finding you?',
      d: 'Google Ads reaches people searching for what you sell. Meta Ads introduces your offer to people who were not looking yet. SEO helps you appear when customers research and compare.',
      sup: { lead: 'To be found in AI answers too:', links: [{ href: '/ai-seo', label: 'AI search' }] } },
    { k: 'Convert', q: 'Is it easy and worth their while to enquire?',
      d: 'We review where people land after they click and tell you what we find, so more of the right visits become real enquiries.',
      sup: { lead: 'When the page itself needs work:', links: [{ href: '/conversion-optimization', label: 'conversion optimisation' }, { href: '/lead-generation', label: 'lead generation' }] } },
    { k: 'Measure', q: 'Can you see what worked?',
      d: 'We tell you what needs measuring and what your website currently allows. You get a monthly performance report with ongoing work.',
      sup: null },
  ],
} as const;

export const CARDS = [
  { id: 'google', name: 'Google Ads', href: '/google-ads', badge: 'They search',
    benefit: 'Be there when buyers search for what you sell.',
    manage: 'We plan and manage campaigns around the searches that matter, your budget and the enquiry or purchase you want.',
    suits: ['Online courses', 'Specialist and local services', 'Products people search for'] },
  { id: 'meta', name: 'Meta Ads', href: '/social-media-ads', badge: 'They browse',
    benefit: 'Introduce your offer to people who were not looking yet.',
    manage: 'We plan and manage who sees your ads, ad testing and budget, and review where people land after they click.',
    suits: ['Apparel and D2C brands', 'Education and coaching', 'Real estate'],
    note: 'Meta Ads means Facebook and Instagram advertising. We do not manage your posting.' },
  { id: 'seo', name: 'SEO', href: '/seo', badge: 'They compare',
    benefit: 'Be found by customers who research before they choose.',
    manage: 'We plan keywords and pages around what customers search for, fix technical issues, improve and create content, and report on enquiries every month.',
    suits: ['Businesses with a lasting offer', 'Specialist and local services', 'Sites with content to build on'],
    note: 'SEO builds over time. We do not guarantee rankings, traffic or enquiries.' },
] as const;

/** "Which one first?" (B2 R2): its own decision section. The wording is the page's approved positioning (the former paragraph and
 * the first FAQ answer): search suits buyers who already know what they want, Meta suits offers buyers need to discover, and not
 * every business needs both. */
export const WHICH = {
  eyebrow: 'Choosing where to start',
  h: 'Which one first?',
  lead: 'It depends on how your customers buy and how soon you need results.',
  options: [
    { id: 'google', cue: 'They search', when: 'Your buyers already know what they want', name: 'Google Ads', role: 'Captures existing search demand.',
      d: 'Your ads appear when people search for what you sell.', href: '/google-ads', cta: 'Explore Google Ads' },
    { id: 'meta', cue: 'They browse', when: 'Your buyers need to discover your offer', name: 'Meta Ads', role: 'Reaches and influences relevant audiences.',
      d: 'Your offer is introduced on Facebook and Instagram to people who were not looking yet.', href: '/social-media-ads', cta: 'Explore Meta Ads' },
    { id: 'seo', cue: 'They compare', when: 'Your buyers research before they choose', name: 'SEO', role: 'Builds lasting visibility in search.',
      d: 'Your pages appear when people search, compare and look for answers, without paying for each click.', href: '/seo', cta: 'Explore SEO' },
  ],
  both: { k: 'Not every business needs all three.', d: 'We check your offer, margins, follow-up and measurement before recommending one, two or all three.' },
  audLabel: 'By business type',
  audiences: [
    { href: '/who-we-help/d2c', label: 'D2C and Ecommerce' },
    { href: '/who-we-help/education', label: 'Education and Training' },
    { href: '/who-we-help/real-estate', label: 'Real Estate' },
    { href: '/who-we-help/enquiry-led-businesses', label: 'Enquiry-Led Businesses' },
  ],
} as const;

export const TERMS = {
  included: ['Planning campaigns around your offer and customers', 'Running them and adjusting your budget as results call for it', 'Testing different ads', 'Reviewing where people land and what we find', 'For SEO: keyword research, page and content work, technical fixes and outreach within your package', 'A monthly performance report with ongoing work, and review calls where your proposal agrees them'],
  separate: 'Website redesign, landing page and tracking changes. Creative beyond the agreed designs, such as reels, video and scripting. For Meta Ads, your proposal sets a defined number of static ad designs.',
  cost: { spend: 'Ad spend', spendD: 'is paid directly to the platform. Our', fee: 'management fee', feeD: 'is charged separately and set by the plan you choose. All prices exclude GST.' },
  stepsLead: 'Every engagement follows the same five steps. Nothing starts until you approve it.',
  steps: ['Assess', 'Plan', 'Launch', 'Test', 'Review'],
} as const;

export const SERVICES_FAQS = [
  { question: 'Should I start with Google Ads, Meta Ads or SEO?', answer: 'It depends on how your customers buy and how soon you need results. Google Ads suits people already searching. Meta Ads suits people discovering offers. SEO builds lasting visibility for people who research before they choose. We look at your offer, margins and follow-up before recommending one, two or all three.' },
  { question: 'How long does SEO take, and is there a minimum term?', answer: 'SEO takes consistent work and we cannot promise a timeline or a ranking. SEO retainers have a minimum engagement of six months.' },
  { question: 'Can you work on campaigns we already run?', answer: 'Yes. Tell us what is running now and we will discuss what to review before suggesting a plan.' },
  { question: 'Who creates the ad creative?', answer: 'For Meta, your proposal includes a defined number of static ad designs. Reels, video, scripting and anything beyond that are scoped separately. For Google Ads, managing the ads is part of our work.' },
  { question: 'How are fees handled?', answer: 'Ad spend goes directly to the platform. Our fee is separate and set by the plan you choose, with prices excluding GST. Anything beyond a plan is quoted first.' },
  { question: 'Can you guarantee sales or a return?', answer: 'No. We agree the work, measurement and responsibilities clearly. Results also depend on your offer, pricing, website, competition and follow-up.' },
] as const;

export const CLOSE = {
  h: 'Judge us on the enquiries, not the traffic.',
  body: 'Tell us about your business and what you want your marketing to achieve. We will reply by email or WhatsApp to talk it through. Nothing starts until you approve it.',
} as const;
