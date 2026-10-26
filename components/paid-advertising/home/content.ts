/** Phase 3 copy and homepage direction approved by Amit, 26 October 2026.
 * Existing URLs remain until the migration batch. Image provenance: docs/paid-advertising-revamp/ASSET_NOTES.md.
 */
export type TileId = 'apparel' | 'baking' | 'property';
export const TILES: Record<TileId, { src: string; alt: string }> = {
  apparel: { src: '/images/paid-advertising/tile-apparel.webp', alt: 'Folded apparel on a shop table' },
  baking: { src: '/images/paid-advertising/tile-baking.webp', alt: 'A cake being finished on a stand' },
  property: { src: '/images/paid-advertising/tile-property.webp', alt: 'Residential towers above tree-lined streets' },
};
export const AUDIENCES = [
  { id: 'd2c', title: 'D2C brands', image: 'apparel', href: '/who-we-help/d2c', body: 'Bring your products to relevant customers and assess advertising alongside purchases, cost per purchase and your store’s ability to convert.' },
  { id: 'education', title: 'Education, training and coaches', image: 'baking', href: '/who-we-help/education', body: 'Reach people considering your programme. Build a journey that fits how they enrol, through direct purchases or enquiries followed by a conversation.' },
  { id: 'enquiry-led', title: 'Real estate developers', image: 'property', href: '/who-we-help/real-estate', body: 'Put your projects in front of prospective buyers and give them a clear next step towards an enquiry or site visit.' },
] as const;
export const SERVICES = [
  { name: 'Google Ads', href: '/google-ads', type: 'search', body: 'Reach people searching for the products, services or solutions you offer. We plan campaigns around relevant demand, your offer and the action you want customers to take.' },
  { name: 'Meta Ads', href: '/social-media-ads', type: 'social', body: 'Introduce your offer through Facebook and Instagram advertising. We develop campaign tests around your audience, message, creative and purchase or enquiry journey.' },
] as const;
export const WORK = [
  { id: 'wanderlooms', eyebrow: 'Meta Ads · Adventure apparel', title: 'Wanderlooms', body: 'Meta advertising for an adventure apparel brand featured on Shark Tank India.',
    // No individual Wanderlooms case-study route exists yet; /work is a temporary, honestly labelled destination.
    href: '/work', cta: 'Explore Our Work' },
  { id: 'om-sai', eyebrow: 'Meta Ads · Real estate', title: 'Om Sai Developer, Mumbai', body: 'Meta advertising for a residential real estate developer in Mumbai.',
    href: '/portfolio/om-sai-developer-meta-ads', cta: 'Read the Meta Ads Case Study' },
] as const;
export const STEPS = [
  { title: 'Assess', body: 'Understand your offer, current advertising and conversion journey.' },
  { title: 'Plan', body: 'Agree the campaign approach, responsibilities, fees and measures of progress.' },
  { title: 'Launch', body: 'Prepare the agreed campaigns, assets and measurement requirements.' },
  { title: 'Test', body: 'Review performance and use what we learn to guide changes.' },
  { title: 'Review', body: 'Discuss what the advertising is contributing and what needs attention next.' },
] as const;
export const FAQS = [
  { question: 'Do you work with businesses that have never advertised?', answer: 'Yes. We begin with a suitability discussion about your offer, readiness and what advertising would need to achieve.' },
  { question: 'Can you review campaigns we already run?', answer: 'Yes. We offer a free advertising account review before preparing a proposal.' },
  { question: 'Do we need both Google Ads and Meta Ads?', answer: 'We assess that before recommending the scope. Your buying journey, resources and commercial goals guide the choice.' },
  { question: 'Can you guarantee sales or a particular return?', answer: 'No. We agree the work, measurement and responsibilities clearly. Results also depend on your offer, pricing, website, competition and follow-up.' },
] as const;
