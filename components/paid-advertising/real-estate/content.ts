/** /who-we-help/real-estate: Content and SEO R1 (owner-approved) with Visual R1 as the design concept; recorded as DEC-083.
 * Visible copy follows MappedSkills_Real_Estate_Content_SEO_R1_APPROVED.md; the FAQ answers are the seven R1 answers verbatim.
 * No lead counts, site visits, bookings, results, guarantees or pricing. No real or concept property imagery is presented as an
 * Om Sai project: illustration only. RERA, approval, possession, location and pricing specifics are NOT stated on the page.
 */
export const HERO = {
  eyebrow: 'Paid advertising for real estate developers',
  body: 'Reach prospective buyers for your residential projects through Google Ads and Meta Ads, with advertising decisions informed by buyer fit, enquiry quality and sales feedback.',
} as const;

export const AUDIENCE = {
  label: 'For real estate businesses such as',
  items: [
    { k: 'tower', t: 'Residential developers' },
    { k: 'home', t: 'Project marketers' },
    { k: 'partner', t: 'Channel partners' },
    { k: 'pin', t: 'Independent developers' },
  ],
} as const;

export const READY = {
  intro: 'Before recommending more advertising spend, we look at the factors that influence whether an enquiry can become a serious sales conversation.',
  items: [
    { k: 'pin', t: 'Location', d: 'Where is the project, and who wants to live there?' },
    { k: 'home', t: 'Inventory', d: 'Which configurations and units are available?' },
    { k: 'price', t: 'Price fit', d: 'Does the buyer’s budget match the property?' },
    { k: 'calendar', t: 'Possession', d: 'What timelines should buyers understand?' },
    { k: 'present', t: 'Presentation', d: 'Are project details, visuals and approvals accurately represented?' },
    { k: 'phone', t: 'Sales follow-up', d: 'Can your team respond and arrange site visits?' },
  ],
  closing: 'If something needs attention, we identify what to improve alongside advertising. More traffic alone cannot solve a mismatch between the project and its prospective buyers.',
} as const;

export const PLATFORMS = {
  google: { t: 'Google Ads', tag: 'Searching for homes', d: 'Reach people actively searching for homes in a particular location, configuration or price range. Best suited to capturing existing property-search intent.', href: '/google-ads', cta: 'Explore Google Ads' },
  meta: { t: 'Meta Ads', tag: 'Discovering a project', d: 'Introduce a project to relevant audiences through Facebook and Instagram, using the property and its location to build interest. Best suited to discovery and consideration.', href: '/social-media-ads', cta: 'Explore Meta Ads' },
  closing: 'We assess the project, geography, buyer profile and available budget before recommending either platform or a combination.',
} as const;

export const JOURNEY = {
  stages: [
    { k: 'Discover', d: 'A prospective buyer sees a relevant property advertisement.', side: 'ours', icon: 'discover' },
    { k: 'Explore', d: 'They assess the location, configuration, pricing and project details.', side: 'ours', icon: 'explore' },
    { k: 'Enquire', d: 'They request information or contact the sales team.', side: 'ours', icon: 'enquire' },
    { k: 'Qualify and visit', d: 'Your team checks buyer fit, answers questions and coordinates a site visit.', side: 'yours', icon: 'visit' },
    { k: 'Decide', d: 'The buyer considers the property and may proceed towards a booking.', side: 'yours', icon: 'decide' },
  ],
  ours: { t: 'MappedSkills', d: 'Advertising management' },
  yours: { t: 'Your sales team', d: 'Buyer relationship' },
  boundary: 'MappedSkills manages advertising. Your sales team manages the buyer relationship.',
  caveat: 'Not every enquiry becomes a site visit, and not every visit becomes a booking. Available sales feedback helps us understand which advertising decisions are creating useful opportunities.',
  we: { t: 'We handle', d: 'Paid campaigns, targeting, messaging, budget oversight and review of available results.' },
  you: { t: 'You handle', d: 'Buyer qualification, calls, site visits, negotiations, bookings and fulfilment.' },
  sep: { t: 'Scoped separately unless your proposal includes it', d: 'CRM integrations, landing-page development, technical tracking changes and additional creative production.' },
} as const;

/** Verified against https://mappedskills.com/portfolio/om-sai-developer-meta-ads: the developer is Om Sai Developer (the R1 draft writes
 * "Om Sai Developers"), the project is in Chembur, Mumbai. */
export const PROOF = {
  name: 'Om Sai Developer',
  tags: ['Meta Ads', 'Residential real estate'],
  body: 'MappedSkills has worked on Meta advertising for a residential development in Chembur, Mumbai.',
  ctaCase: 'Read the case study',
  ctaWork: 'Explore Our Work',
  qs: { k: 'Our approach, not Om Sai findings', h: 'Questions we would ask about your project', items: ['Which buyer segments fit available inventory?', 'What locations and budgets matter most?', 'Which enquiries progress to sales conversations?', 'What can site-visit feedback tell us about advertising?'] },
} as const;

export const MEASURE = {
  levels: [
    { t: 'Enquiries', d: 'Who responded to the advertising?' },
    { t: 'Relevant buyers', d: 'Who appears to match the project?' },
    { t: 'Site visits', d: 'Who progressed to an actual visit?' },
  ],
  lede: 'A low cost per enquiry means little if the buyers cannot afford the property, want another location or are not ready to consider a visit.',
  venn: { a: 'Enquiries', mid: 'Relevant buyers', b: 'Site visits', bnote: 'who progressed' },
  checks: [
    { t: 'Review available advertising data and sales feedback', sep: false },
    { t: 'Identify measurement gaps and recommend improvements', sep: false },
    { t: 'Monthly reporting, with review calls as agreed in the proposal', sep: false },
    { t: 'New tracking setup, repairs and CRM integrations (separately scoped unless included)', sep: true },
  ],
  cost: 'Ad spend is paid directly to Google or Meta. MappedSkills management fees are separate. We do not guarantee enquiries, site visits, bookings or sales.',
} as const;

export const RE_FAQS = [
  { question: 'Can you guarantee property enquiries or bookings?', answer: 'No. Advertising can generate interest, but enquiry volume, site visits and bookings depend on the project, market, buyer fit, sales process and other factors.' },
  { question: 'Should a developer use Google Ads or Meta Ads?', answer: 'Google Ads can reach people actively searching for property. Meta Ads can introduce a project to relevant audiences. We assess the project, geography and budget before recommending a platform.' },
  { question: 'Can you target buyers around a specific location?', answer: 'We can plan campaigns around supported geographic targeting options. Targeting does not guarantee that every person reached lives in, or intends to buy in, that location.' },
  { question: 'How do you improve enquiry relevance?', answer: 'We review available targeting, messaging, project details and sales feedback. These can help refine campaigns, but no campaign can guarantee that every enquiry is a suitable buyer.' },
  { question: 'Do you manage calls, site visits and property sales?', answer: 'No. Your sales team handles calls, qualification, site visits, negotiations and bookings unless separately agreed.' },
  { question: 'Do you create property videos, brochures or landing pages?', answer: 'Static ad creative allowances are defined in the proposal. Video production, brochures, landing-page development and additional creative work are separately scoped unless included.' },
  { question: 'How much should we spend on property advertising?', answer: 'It depends on location, competition, inventory, project economics and campaign objectives. Platform ad spend is paid directly to Google or Meta, while management fees are separate. No specific outcome is guaranteed.',
    link: { href: '/pricing', label: 'Understand Our Pricing Approach' } },
] as const;

export const CLOSE = {
  h: 'Tell us about your project and the buyers you want to reach.',
  body: 'Share the location, property type, price range, available inventory and sales goals. We’ll discuss where paid advertising could fit.',
} as const;
