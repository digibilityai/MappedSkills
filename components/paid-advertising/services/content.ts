/** /services R2, owner-approved design direction with four final corrections (27 October 2026).
 * Evidence notes: docs/paid-advertising-revamp/SERVICES_R1_NOTES.md. No YouTube, no other platform, no free audit,
 * no response times, no figures, no Click-to-WhatsApp (delivery unconfirmed). Case cards are the verified entries that
 * were already on this page; the shared tag-matched case-study system is a separate requirement (not built here).
 */
export const HERO = {
  eyebrow: 'Google Ads and Meta Ads for Indian businesses',
  lede: 'We plan and manage paid advertising so more of the right buyers find you, more of them make an enquiry, and you can see what worked.',
  anchor: 'See how the path works',
} as const;

/** Hero diagram: Capture, Convert, Enquiry along the path; Measure observes all of it. */
export const DIAGRAM = {
  entries: [
    { k: 'They search', d: 'People already looking for what you sell' },
    { k: 'They browse', d: 'People who were not looking yet' },
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
  intro: 'Traffic is not the finish line. We plan advertising around the whole path, so you can see where it works and where it breaks.',
  rows: [
    { k: 'Capture', q: 'Are the right buyers finding you?',
      d: 'Google Ads reaches people searching for what you sell. Meta Ads introduces your offer to people who were not looking yet.',
      sup: { lead: 'To be found beyond paid ads:', links: [{ href: '/seo', label: 'SEO' }, { href: '/ai-seo', label: 'AI search' }] } },
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
] as const;

export const ILLUSTRATION_NOTE = 'Illustration of how an ad can appear. Not a client ad.';

export const WHICH = {
  lead: 'Which one first?',
  body: 'Search suits buyers who already know what they want. Meta suits offers buyers need to discover. Not every business needs both, so we check your offer, margins, follow-up and measurement before recommending anything.',
  audiences: [
    { href: '/who-we-help/d2c', label: 'D2C and Ecommerce' },
    { href: '/who-we-help/education', label: 'Education and Training' },
    { href: '/who-we-help/real-estate', label: 'Real Estate' },
    { href: '/who-we-help/enquiry-led-businesses', label: 'Enquiry-Led Businesses' },
  ],
} as const;

/** Verified descriptions from the live case pages (26 October 2026). Service and industry are separate tags.
 * Wanderlooms has no individual page and no approved service evidence, so it carries an industry tag only and no link. */
export const WORK = [
  { id: 'anybodycanbake', name: 'AnybodyCanBake', service: 'Google Ads', industry: 'Education and training',
    line: 'AnybodyCanBake, a Pune online baking school, wanted direct course purchases from Google Ads.',
    href: '/portfolio/google-ads-for-online-courses', cta: 'Read the Google Ads case study' },
  { id: 'om-sai', name: 'Om Sai Developer', service: 'Meta Ads', industry: 'Real estate',
    line: 'A Chembur developer needed enquiries from people interested in its project.',
    href: '/portfolio/om-sai-developer-meta-ads', cta: 'Read the Meta Ads case study' },
  { id: 'wanderlooms', name: 'Wanderlooms', service: null, industry: 'Adventure apparel',
    line: 'An adventure apparel brand featured on Shark Tank India.', href: null, cta: null },
] as const;

export const TERMS = {
  included: ['Planning campaigns around your offer and customers', 'Running them and adjusting your budget as results call for it', 'Testing different ads', 'Reviewing where people land and what we find', 'A monthly performance report with ongoing work, and review calls where your proposal agrees them'],
  separate: 'Website, landing page and tracking changes. Creative beyond the agreed designs, such as reels, video and scripting. For Meta Ads, your proposal sets a defined number of static ad designs.',
  cost: { spend: 'Ad spend', spendD: 'is paid directly to the platform. Our', fee: 'management fee', feeD: 'is charged separately and shaped by the work involved. Quotes are tailored.' },
  fit: 'Advertising tends to work when you already sell or are close, can follow up enquiries promptly, know roughly what a customer is worth and can invest enough to learn what works. It may be premature if your offer is untested or you cannot follow up yet. No one can honestly guarantee results.',
  stepsLead: 'Every engagement follows the same five steps. Nothing starts until you approve it.',
  steps: ['Assess', 'Plan', 'Launch', 'Test', 'Review'],
} as const;

export const SERVICES_FAQS = [
  { question: 'Should I start with Google Ads or Meta Ads?', answer: 'It depends on how your customers buy. Google Ads suits people already searching. Meta Ads suits people discovering offers. We look at your offer, margins and follow-up before recommending either, or both.' },
  { question: 'Can you work on campaigns we already run?', answer: 'Yes. Tell us what is running now and we will discuss what to review before suggesting a plan.' },
  { question: 'Who creates the ad creative?', answer: 'For Meta, your proposal includes a defined number of static ad designs. Reels, video, scripting and anything beyond that are scoped separately. For Google Ads, managing the ads is part of our work.' },
  { question: 'How are fees handled?', answer: 'Ad spend goes directly to the platform. Our fee is separate and depends on the work involved, so every quote is tailored.' },
  { question: 'Can you guarantee sales or a return?', answer: 'No. We agree the work, measurement and responsibilities clearly. Results also depend on your offer, pricing, website, competition and follow-up.' },
] as const;

export const CLOSE = {
  h: 'Judge us on the enquiries, not the traffic.',
  body: 'Tell us about your business and what you want advertising to achieve. We will reply by email or WhatsApp to talk it through. Nothing starts until you approve it.',
} as const;
