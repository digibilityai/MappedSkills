/** /who-we-help/d2c Content R2, approved by the owner 26 October 2026 with one wording correction (the readiness intro);
 * recorded as DEC-081. Follows the Phase Two P05 order; marketplace advertising from the earlier wireframe is excluded.
 * Proof is limited to the unlinked Wanderlooms preview. The assessment questions are approach, not findings. No figures,
 * ROAS, revenue, quotations, guarantees or prices. Reporting Policy A and the tracking boundary (DEC-080) apply.
 */
export const HERO = {
  eyebrow: 'Paid advertising for D2C brands',
  h1: 'More orders are good. Profitable growth is better.',
  body: 'Getting people to your store is only part of the job. We help D2C brands use Google Ads and Meta Ads to reach relevant shoppers, while keeping customer acquisition costs and business economics in focus.',
} as const;

export const READY = {
  intro: 'Before recommending advertising, we look at what is already working in your business, what could limit results, and where your budget can make the biggest difference.',
  items: [
    { k: 'demand', t: 'Existing product demand and sales', d: 'Advertising builds on what already works. You do not need high volumes. Some sales history gives us something to build on.' },
    { k: 'margin', t: 'Product margins and affordable acquisition costs', d: 'Your margin decides what you can pay to win a customer. We talk through a sensible range with you before spend grows.' },
    { k: 'store', t: 'Store and mobile checkout quality', d: 'Most shoppers arrive on a phone. A clear product page and a simple checkout make the most of every visit.' },
    { k: 'stock', t: 'Stock and delivery readiness', d: 'Ads can lift demand quickly. Delivering on time protects your reputation and your repeat business.' },
    { k: 'trust', t: 'Trust, reviews and product presentation', d: 'New visitors look for reasons to believe you. Clear photos, honest descriptions and genuine reviews help.' },
    { k: 'returns', t: 'Returns and cash-on-delivery economics', d: 'Returns and unpaid cash-on-delivery orders change what a sale is really worth. We take them into account when judging advertising.' },
    { k: 'offer', t: 'Offer and creative quality', d: 'A clear offer and strong visuals give ads something worth stopping for.' },
  ],
  closing: 'If some of these need work, we will tell you what to improve alongside your advertising, and in what order. Improving them is often part of getting more from advertising.',
} as const;

export const ROLES = {
  google: { t: 'Google Ads', tag: 'Search intent', d: 'Reaches shoppers who are already searching for products like yours, by name or by need.', href: '/google-ads', cta: 'Explore Google Ads' },
  meta: { t: 'Meta Ads', tag: 'Social discovery', d: 'Introduces your products to people who did not know to look, and builds interest through what they see on Facebook and Instagram.', href: '/social-media-ads', cta: 'Explore Meta Ads' },
  both: 'Many D2C brands use both. We assess which should come first, and say if one is enough.',
  store: 'Your store',
  whatsapp: 'Some products sell through conversation, such as made-to-order or gift items. Meta ads can open a WhatsApp chat when that suits your customers. Your team replies, and chat automation or CRM connections are not included unless your proposal says so.',
  ctaLead: 'Not sure which route fits your products?',
} as const;

export const JOURNEY = {
  stages: [
    { k: 'Discover', d: 'Reach relevant potential shoppers.', side: 'acq' },
    { k: 'Consider', d: 'Help people understand the product and offer.', side: 'acq' },
    { k: 'Buy', d: 'Make the path to purchase clear and practical.', side: 'acq' },
    { k: 'Measure', d: 'Compare advertising costs, recorded orders and available commercial information.', side: 'eco' },
    { k: 'Improve', d: 'Use what is learned to refine advertising decisions and identify purchase-journey issues.', side: 'eco' },
  ],
  loop: 'Improving feeds back into discovering. Not every visitor buys, and no campaign is certain to be profitable. The aim is better decisions over time.',
  repeat: { t: 'Repeat purchases', d: 'Where your product and customers support it, repeat buying can lower the cost of growth over time. We keep it in view, but we do not assume it.' },
  who: {
    we: { t: 'We manage', d: 'Paid campaigns, targeting, messaging and testing, budget oversight, and reviews of available data.' },
    you: { t: 'You manage', d: 'Products, prices, stock, fulfilment, customer responses and your store.' },
    sep: { t: 'Scoped separately unless your proposal includes it', d: 'Store and checkout changes, and technical tracking implementation.' },
  },
  boundary: 'We are not an ecommerce developer, a fulfilment partner or a social media manager.',
} as const;

export const MEASURE = {
  points: [
    'Judge advertising by what it costs to win a customer against what that customer is worth to you.',
    'Return on ad spend (ROAS) is the sales a platform reports for each rupee spent. It is not profit.',
    'Platforms report what they can see. Your store shows what actually sold. We look at both.',
  ],
  data: 'We review the data available from your ad accounts and store, point out gaps and recommend improvements. You get monthly reporting with ongoing management, and review calls as agreed in your proposal. New tracking setup, repairs and integrations are scoped separately unless your proposal includes them.',
  attribution: 'Not every sale can be traced to an ad. Where we cannot tell, we say so.',
  cost: 'Ad spend is paid directly to Google or Meta. MappedSkills management fees are separate. Additional work is scoped and agreed separately. We cannot guarantee orders, profitability or return on ad spend.',
  scale: { left: 'What it costs to win a customer', right: 'What that customer is worth to you' },
} as const;

export const PROOF = {
  doc: { k: 'Documented experience', name: 'Wanderlooms', category: 'Adventure apparel', body: 'Meta advertising for an adventure apparel brand featured on Shark Tank India.' },
  approach: {
    k: 'Our approach, not proof',
    h: 'What we would examine for your D2C brand',
    qs: ['Which products are worth advertising?', 'How much can you afford to spend acquiring a customer?', 'Where do potential buyers abandon the purchase journey?', 'Do reported orders match the available store records?'],
    caption: 'These are the questions we work through during assessment and ongoing management. They describe our approach. They are not findings from Wanderlooms or any client.',
  },
} as const;

export const D2C_FAQS = [
  { question: 'Is my D2C brand ready to advertise?', answer: 'It depends on your margins, your store and whether you can handle more orders. We talk through the considerations first, and say what to improve alongside the ads.' },
  { question: 'How much should I spend, and what can I expect?', answer: 'There is no single right amount. It depends on your margins, your market and how much you need to spend to learn what works. Ad spend goes directly to the platform, and our fee is separate. We cannot guarantee orders, profitability or return on ad spend.',
    link: { href: '/pricing', label: 'Understand Our Pricing Approach' } },
  { question: 'Google Ads or Meta Ads first?', answer: 'It depends on how your customers buy. Google Ads suits shoppers already searching. Meta Ads suits discovery. We assess before recommending either, or both.' },
  { question: 'Who makes the ad creative?', answer: 'Static ad creative requirements and allowances are defined in your proposal. Video, reels and additional production are scoped separately.' },
  { question: 'Will you improve my store?', answer: 'We review the page people land on and recommend improvements. Changes to your store or website are scoped separately.' },
  { question: 'How do you measure sales?', answer: 'We review the data available, point out gaps and recommend improvements. Not every sale can be traced to an ad, and where we cannot tell, we say so.' },
  { question: 'Do you manage my social media pages or other sales channels?', answer: 'No. We manage paid Google Ads and Meta Ads that bring customers to your own website. We do not run organic posting, build stores or handle fulfilment.' },
] as const;

export const CLOSE = {
  h: 'Tell us about your products and your store.',
  body: 'Share what you sell, how it sells today and what you want advertising to achieve.',
} as const;
