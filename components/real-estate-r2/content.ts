/** /who-we-help/real-estate, Real Estate R2 review variant (27 October 2026). NOT live, NOT a replacement for the production page
 * until the owner decides. Audiences: Property Developers and Channel Partners (the primary audience labels).
 * Proof: Om Sai Developer only, verified qualitative context from the live case; no figures, no testimonial, no broker evidence.
 * Creative: the client supplies original photographs and videos; MappedSkills handles ad copy and agreed adaptation. No dashes
 * used as punctuation. Registration and advertising rules are not stated as settled facts.
 */
export const META = {
  title: 'Real Estate Google & Meta Ads Agency in India | MappedSkills',
  description: 'Google Ads and Meta Ads management for property developers and Channel Partners in India, judged by how well enquiries fit, not volume alone.',
} as const;

export const HERO = {
  eyebrow: 'Who we help: property developers and Channel Partners',
  /** Live production H1, kept unchanged as the reference. */
  h1: ['More property enquiries. ', 'More of the right buyers.'],
  lede: 'Reach people looking for property through Google Ads and Meta Ads, with messaging built for property developers and Channel Partners.',
  cta: 'Discuss Property Advertising',
  secondary: { label: 'Request a call', href: '/contact?intent=call' },
  fit: ['Buyer', 'Location', 'Budget', 'Property'],
} as const;

export const AUDIENCES = {
  eyebrow: 'Two audiences',
  h2: ['A project and a portfolio ', 'need different advertising.'],
  lede: 'Developers and partners sell differently, so we plan their advertising differently.',
  items: [
    { k: 'tower', id: 'dev', tag: 'Property Developers', t: 'One project, one buyer brief',
      d: 'Advertising introduces a project, its location and its lifestyle to buyers who may fit the brief.',
      useful: 'A useful enquiry: a buyer whose budget, location and timing suit the project.' },
    { k: 'keys', id: 'broker', tag: 'Channel Partners', t: 'Many properties, many requirements',
      d: 'Advertising shows properties and your local expertise to buyers searching in your area.',
      useful: 'A useful enquiry: a buyer with a clear requirement you can match to a property.' },
  ],
} as const;

export const JOURNEYS = {
  eyebrow: 'The buyer journey',
  h2: ['From discovery ', 'to a possible visit.'],
  lede: 'An illustrative path for property developers and Channel Partners. Buyers move at their own pace, and many never reach the last step.',
  steps: [
    { t: 'Discover', d: 'A buyer sees a relevant property advertisement.' },
    { t: 'Explore', d: 'They look at the location, configuration and price.' },
    { t: 'Enquire', d: 'They ask for details or share what they need.' },
    { t: 'Connect', d: 'A conversation with your team may follow.', may: true },
    { t: 'Potential Visit', d: 'A visit to the property may be arranged.', may: true },
  ],
  label: 'From discovery to a potential visit',
} as const;

export const PLATFORMS = {
  eyebrow: 'Google and Meta',
  h2: ['Two platforms. ', 'Different buyer moments.'],
  lede: 'We recommend one or both after looking at your property, area and budget.',
  items: [
    { k: 'search', platform: 'Google Ads', t: 'When someone is searching for a home',
      d: 'Appear when people search by locality, size or budget, with messaging matched to what they typed.',
      dev: 'Property Developers: searches that name a locality or configuration.',
      broker: 'Channel Partners: searches for homes in your micro-market.', href: '/google-ads', label: 'Explore Google Ads' },
    { k: 'feed', platform: 'Meta Ads', t: 'When someone discovers a property',
      d: 'Introduce a project or listing on Facebook and Instagram, using the property and its setting to build interest.',
      dev: 'Property Developers: a launch or lifestyle introduced to relevant audiences.',
      broker: 'Channel Partners: listings and local expertise shown to nearby buyers.', href: '/social-media-ads', label: 'Explore Meta Ads' },
  ],
} as const;

export const DECISIONS = {
  eyebrow: 'Campaign decisions',
  h2: ['Five decisions ', 'shape every campaign.'],
  lede: 'We make them with you, then review them against the enquiries and feedback you share.',
  items: [
    { k: 'pin', t: 'Location', d: 'Where to show ads, using the targeting options each platform supports.' },
    { k: 'home', t: 'Property type', d: 'Which configurations, price bands and listings deserve attention first.' },
    { k: 'people', t: 'Buyer needs', d: 'What buyers look for, from family size to budget and timing.' },
    { k: 'text', t: 'Messaging', d: 'Ad copy that describes the property accurately and gives a clear next step.' },
    { k: 'tune', t: 'Optimisation', d: 'What to keep, change or pause as results and sales feedback arrive.' },
  ],
  who: {
    we: { t: 'We handle', d: 'Campaign setup, targeting, ad copy, agreed creative adaptation, budget oversight and review.' },
    you: { t: 'You provide', d: 'Original property photographs and videos, accurate property details and applicable registration information.' },
  },
} as const;

export const MEASURE = {
  eyebrow: 'Measurement',
  h2: ['Look beyond ', 'the lead count.'],
  lede: 'A low cost per enquiry means little if the buyer cannot afford the property or wants another area.',
  ladder: [
    { t: 'Enquiries', d: 'Who responded to the advertising?' },
    { t: 'Relevant buyers', d: 'Does the buyer fit the location, budget and property?' },
    { t: 'Visits', d: 'What followed, where you share that information?' },
  ],
  warn: { h: 'Feedback sharpens the advertising.', d: 'We use the follow-up and visit information you share to guide decisions.' },
} as const;

export const WORK = {
  eyebrow: 'Verified developer work',
  h2: ['Experience with ', 'residential developers.'],
  item: {
    tag: 'Meta Ads · Residential developer',
    name: 'Om Sai Developer',
    body: 'Meta advertising for a residential development in Chembur, Mumbai, aimed at buyers who matched a narrow brief.',
    did: ['Lifestyle-led messaging', 'Relevant buyers over broad reach'],
    note: 'Conceptual illustration, not the project',
  },
  link: { label: 'Read the case study', href: '/portfolio/om-sai-developer-meta-ads' },
  all: { label: 'Explore Our Work', href: '/work' },
} as const;

export const FAQS = [
  { question: 'Can you guarantee enquiries, visits or sales?', answer: 'No. Advertising can create interest, but results depend on the property, market, buyer fit, pricing and your follow-up. We do not guarantee enquiries, visits, bookings or sales.' },
  { question: 'Do property developers and Channel Partners use the same approach?', answer: 'No. Property developers promote a project to buyers who fit a brief. Channel Partners promote properties and local expertise to buyers with varied requirements. We plan each differently.' },
  { question: 'Should I use Google Ads or Meta Ads?', answer: 'Google Ads reaches people searching for property. Meta Ads introduces a project or listing to relevant audiences. We recommend one or both after reviewing your property, area and budget.' },
  { question: 'Can you target buyers around a specific location?', answer: 'We plan around the geographic targeting each platform supports for your ads, which can vary. Targeting does not guarantee that everyone reached lives in, or wants to buy in, that area.' },
  { question: 'Who provides photographs and videos?', answer: 'You provide original property photographs and videos. We write the advertising copy and adapt your assets as agreed in the proposal. Video production, brochures, landing pages and additional creative are scoped separately.' },
  { question: 'What property and compliance details must we provide?', answer: 'Advertising must describe the property accurately. You provide correct property details and any registration information that applies to you. Requirements can differ, so please confirm them with your own advisers.' },
  { question: 'Do you handle calls, matching, visits or negotiations?', answer: 'No. Your team handles calls, buyer qualification, property matching, visits, negotiations and transactions unless separately agreed. We manage the advertising.' },
  { question: 'How do you measure performance and is tracking included?', answer: 'We review the campaign data and the follow-up information you share, point out gaps and recommend changes. New tracking setup, repairs and CRM integration are scoped separately unless your proposal includes them.' },
  { question: 'Is ad spend part of your fee?', answer: 'No. Ad spend is paid directly to Google or Meta, and our management fee is separate. The right budget depends on your location, competition and goals.',
    link: { href: '/pricing', label: 'Understand Our Pricing Approach' } },
] as const;

export const CLOSE = {
  h: 'Tell us about your properties and the buyers you want to reach.',
  body: 'Share the location, property type, price range and how your team follows up. We will discuss where advertising could fit.',
  cta: 'Discuss Property Advertising',
} as const;
