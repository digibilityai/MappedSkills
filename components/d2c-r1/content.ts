/** /who-we-help/d2c, D2C & Ecommerce R1 review variant (27 October 2026). NOT live, NOT a replacement for the approved
 * Content R2 (DEC-081) until the owner decides. Copy follows the 27 October brief. No figures, ROAS, revenue, prices,
 * minimum budgets or guarantees. Marketplace advertising is not offered. Creative policy: MappedSkills handles advertising
 * copy and creative adaptation, the client provides original photographs and videos. No dashes used as punctuation.
 */
export const META = {
  title: 'Google Ads and Meta Ads for D2C and Ecommerce Brands | MappedSkills',
  description: 'Google Ads and Meta Ads management for D2C and ecommerce brands in India, judged by purchases and customer acquisition cost, not clicks alone.',
} as const;

export const HERO = {
  eyebrow: 'Who we help: D2C and ecommerce',
  h1: ['More orders matter. ', 'So does what they cost.'],
  lede: 'We manage Google Ads and Meta Ads that reach relevant shoppers, and judge them by purchases, what each customer costs to win and what your business can afford.',
  cta: 'Discuss Your Advertising',
  secondary: { label: 'See our work', href: '/work' },
  caption: 'Illustrative journey with a generic store. Not every shopper buys.',
  steps: ['Finds a product', 'Visits the store', 'Considers buying'],
  ledger: { won: 'What the order brings in', cost: 'What it cost to win' },
} as const;

export const CHALLENGE = {
  eyebrow: 'The business challenge',
  h2: ['Sales can grow while ', 'profitability gets squeezed.'],
  lede: 'An order is only worth what is left after everything it takes to win, make and deliver it. Advertising is one of those costs.',
  receipt: {
    label: 'One order, illustrated',
    rows: [
      { k: 'margin', t: 'Product margin', d: 'Sets how much room there is to pay for a customer.', w: 100 },
      { k: 'discount', t: 'Discounts', d: 'Help win the order and shrink what it leaves.', w: 18 },
      { k: 'ship', t: 'Shipping', d: 'Free delivery is still a cost someone pays.', w: 14 },
      { k: 'returns', t: 'Returns', d: 'A returned order can cancel the sale.', w: 20 },
      { k: 'ads', t: 'Customer acquisition cost', d: 'What you spend on advertising to win one customer.', w: 24 },
    ],
    left: 'What is left',
    caption: 'Not to scale and not real figures. Every business is different.',
  },
  boundary: 'You decide prices, stock and fulfilment. We use what you share to keep advertising decisions realistic.',
} as const;

export const SHOPPERS = {
  eyebrow: 'How D2C customers buy',
  h2: ['Different shoppers. ', 'Different buying decisions.'],
  lede: 'Each route to a purchase costs something different to win, so it helps to see how people actually buy. The routes overlap, and none is certain.',
  paths: [
    { id: 'meta', channel: 'Meta', t: 'Discovers it while scrolling', steps: ['Sees an ad on Facebook or Instagram', 'Gets curious about the product', 'May visit the store, or keep scrolling'] },
    { id: 'google', channel: 'Google', t: 'Searches for it', steps: ['Searches for a product or a need', 'Sees a matching ad or product listing', 'Visits the store to look closer'] },
    { id: 'compare', channel: 'Often both', t: 'Compares before buying', steps: ['Looks at several options', 'Comes back later, perhaps from another route', 'Buys, or chooses somewhere else'] },
  ],
  note: 'Not every ad leads to a purchase. The aim is to be useful at the moments that matter for your product.',
} as const;

export const HELP = {
  eyebrow: 'How MappedSkills helps',
  h2: ['Advertising that follows ', 'how your products sell.'],
  lede: 'Each route needs a different kind of ad, so we recommend the mix after understanding your products. Most brands start with one or two.',
  roles: [
    { k: 'search', platform: 'Google', t: 'Search Ads', d: 'Appear when shoppers search for a product by name or need.', fit: 'People already look for what you sell.' },
    { k: 'shopping', platform: 'Google', t: 'Shopping Ads', d: 'Show products with photo, price and store name.', fit: 'You run an online store and keep an accurate product feed.' },
    { k: 'pmax', platform: 'Google', t: 'Performance Max', d: 'One goal-based campaign where Google chooses where ads appear.', fit: 'Tracking is reliable and you have good images and text. You give up some control over placement.' },
    { k: 'discover', platform: 'Meta', t: 'Discovery campaigns', d: 'Introduce products to people who were not searching yet.', fit: 'Your product catches interest in a feed.' },
    { k: 'retarget', platform: 'Meta and Google', t: 'Purchase and retargeting', d: 'Bring back people who showed interest, where audience size and tracking allow.', fit: 'Enough visitors and reliable purchase data.' },
  ],
  also: 'Google Display and YouTube are also available within Google Ads when they suit your goal.',
  links: { google: { label: 'Explore Google Ads', href: '/google-ads' }, meta: { label: 'Explore Meta Ads', href: '/social-media-ads' } },
  split: {
    we: { h: 'We manage', items: ['Campaign setup and targeting', 'Advertising copy', 'Adapting your creative to each format', 'Budget oversight and testing', 'Monthly performance reporting'] },
    you: { h: 'You provide and manage', items: ['Original photographs and videos', 'Products, prices and stock', 'Your store and checkout', 'Orders, delivery and customer replies'] },
    sep: 'Store or checkout changes, and technical tracking setup, are scoped separately unless your proposal includes them.',
  },
} as const;

export const READY = {
  eyebrow: 'Readiness',
  h2: ['Before you spend more, ', 'check what is ready.'],
  lede: 'These shape how well advertising can work. This is a conversation, not a formal audit, and it does not predict results.',
  items: [
    { t: 'A product customers want', d: 'Advertising helps people find a product. It cannot create the wish for one.' },
    { t: 'Reliable inventory and availability', d: 'Ads can lift demand quickly. Stock that runs out wastes the spend.' },
    { t: 'Clear pricing and margins', d: 'Your margin decides what you can afford to pay for a customer.' },
    { t: 'Useful product pages', d: 'Shoppers decide on the page they land on. Clear photos and details help.' },
    { t: 'A workable checkout', d: 'Most shoppers use a phone. A simple checkout keeps more of them.' },
    { t: 'Purchase tracking and sales data', d: 'Without purchase data, advertising decisions rest on guesses.' },
  ],
  closing: 'If some of these need work, we will say so, and in what order to fix them.',
  cta: { lead: 'Not sure what is ready? Tell us about your store.', label: 'Discuss Your Advertising' },
} as const;

export const MEASURE = {
  eyebrow: 'Measurement',
  h2: ['A purchase tells you ', 'more than a click.'],
  lede: 'Clicks show interest. Orders show whether interest became business. We look at the second.',
  compare: {
    platform: { h: 'What the platform reports', d: 'Purchases the ad account can see and connect to an ad.' },
    store: { h: 'What your store shows', d: 'Orders that actually happened, including ones with no visible ad.' },
    note: 'The two rarely match exactly. We look at both and explain the gap.',
  },
  ladder: [
    { t: 'Orders and purchases', d: 'The starting point.' },
    { t: 'Advertising spend', d: 'What went into the platforms.' },
    { t: 'Customer acquisition cost', d: 'Spend divided by customers won.' },
    { t: 'Revenue attributed to advertising', d: 'Where the data is available.' },
    { t: 'ROAS', d: 'Platform sales for each rupee spent. Useful, with limits.' },
    { t: 'Contribution economics', d: 'When you share reliable cost and margin data.' },
  ],
  warn: { h: 'ROAS is not profit.', d: 'A good ROAS can still lose money once margins, discounts, shipping and returns are counted.' },
  attribution: 'Not every sale can be traced to an ad. Where we cannot tell, we say so.',
  report: 'You receive a monthly performance report with ongoing management, and review calls as agreed in your proposal. New tracking setup, repairs and integrations are scoped separately unless your proposal includes them.',
} as const;

export const WORK = {
  eyebrow: 'Relevant client work',
  h2: ['An example from ', 'D2C advertising.'],
  item: {
    tag: 'Adventure apparel',
    name: 'Wanderlooms',
    body: 'Meta advertising for an adventure apparel brand.',
    fact: 'Featured on Shark Tank India',
    img: { src: '/images/resolve-r3/wanderlooms-work.webp', alt: 'Conceptual artwork of two riders in adventure touring gear looking over a mountain valley at sunset beside an adventure motorcycle', note: 'Conceptual artwork. Not an actual campaign creative.' },
    logo: { src: '/images/resolve-r3/wanderlooms-logo.png', alt: 'Wanderlooms', w: 500, h: 149 },
  },
  note: 'This example shows our approach, not a guaranteed result.',
  all: { href: '/work', label: 'See our work' },
} as const;

export const FAQS = [
  { question: 'Is Google Ads or Meta Ads better for my store?', answer: 'It depends on how your customers find products like yours. Google Ads suits people already searching. Meta Ads suits discovery. We look at your products first, then recommend one, or both.' },
  { question: 'Can advertising work for a new D2C brand?', answer: 'It can, though a new brand has less sales history to learn from, so we set expectations carefully. We cannot guarantee orders, profitability or return on ad spend.' },
  { question: 'What should I have ready before running ads?', answer: 'A product people want, stock you can deliver, clear pricing and margins, useful product pages, a workable checkout and a way to record purchases. If something is missing, we say what to fix first.' },
  { question: 'How do you evaluate purchase performance?', answer: 'We compare orders, advertising spend and customer acquisition cost, and check what the platform reports against what your store records. ROAS is one measure with limits, and it is not profit.' },
  { question: 'Do you create product photographs and videos?', answer: 'No. You provide your original photographs and videos. We write the advertising copy and adapt your creative to suit each format.' },
  { question: 'Do you manage Amazon or Flipkart advertising?', answer: 'Not at present. We manage Google Ads and Meta Ads that bring shoppers to your own store. Marketplace advertising is not part of what we offer today, and we will not promise it before it is.' },
  { question: 'What happens if campaigns bring traffic but few purchases?', answer: 'We look at where shoppers drop away: the ad, the product page, the price, the checkout or the tracking. We adjust targeting, messages and budget, and tell you what in the store may need attention. We cannot guarantee orders.' },
] as const;

export const CLOSE = {
  h: 'Tell us about your products and your store.',
  body: 'Share what you sell, how it sells today and what you want advertising to achieve.',
  cta: 'Discuss Your Advertising',
} as const;
