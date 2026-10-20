/**
 * C+ Pricing (/pricing): customer-facing copy of the owner-approved G1 R0 design (docs/pricing-redesign/g1/:
 * PR_G1_NOTES.md, mockup/). Owner requirement (2026-10-18): fully customised pricing, so no packages, starting prices,
 * ranges, currency or time promises appear anywhere. Facts used: the owner brief and the eight statements confirmed in
 * PR_G1_NOTES.md §4 (scope-based fee; monthly performance report with ongoing marketing work, review calls where agreed;
 * ad spend paid directly to the platform, fee charged separately; nothing starts until the client approves).
 */

export type PricingIcon = 'search' | 'mail' | 'chart' | 'check' | 'plan' | 'ok';

export const PR = {
  crumb: 'Pricing',
  kicker: 'Pricing · Every quote is tailored',
  h1: { a: 'The right work.', b: 'A price that makes sense.' },
  lede: 'Every business needs something different. We look at what you need, recommend the right scope and explain the cost before work begins.',
  primary: 'Discuss your requirements',

  tag: {
    label: 'Illustration: your price is set by what you need, what needs fixing and how much work is involved, and you know it before work begins.',
    k: 'Your price',
    v: { a: 'Built around', b: 'your business' },
    lines: ['What you need', 'What needs fixing', 'How much work is involved'],
    foot: 'Explained before work begins',
    cap: 'Illustration. There’s no price list: every quote is worked out for your business.',
  },

  aff: {
    kicker: 'What affects your price?',
    h: { a: 'Three things', b: 'shape the quote.' },
    line: 'The more there is to do, the more the work costs. These are the three things we look at.',
    need: { t: 'What you need', p: 'One service or several working together.', scale: ['One service', 'Several, together'] },
    fix: {
      t: 'What needs fixing',
      p: 'Your website, tracking and existing setup.',
      rows: [
        { t: 'Website', ok: true },
        { t: 'Tracking', ok: false },
        { t: 'Existing setup', ok: false },
      ],
      okLabel: 'Works',
      fixLabel: 'Needs fixing',
      scale: ['Little to fix', 'A lot to fix'],
    },
    load: {
      t: 'How much work is involved',
      p: 'Content, competition and ongoing management.',
      rows: [
        { t: 'Content', v: 2 },
        { t: 'Competition', v: 4 },
        { t: 'Ongoing management', v: 3 },
      ],
      scale: ['Lighter', 'Heavier'],
    },
    cap: 'Illustrations only. Your situation will be different.',
  },

  cov: {
    kicker: 'What your fee covers',
    h: { a: 'One plan, with', b: 'only what you need.' },
    line: 'Your fee covers the work we recommend, planned so each part supports the next.',
    chain: [
      { t: 'Get found', p: 'More of the right people find your business.', tag: 'If you need it', icon: 'search', std: false },
      { t: 'Get enquiries', p: 'More of those visitors get in touch.', tag: 'If you need it', icon: 'mail', std: false },
      { t: 'See what’s working', p: 'A monthly performance report on the work.', tag: 'With ongoing marketing work', icon: 'chart', std: true },
    ] as { t: string; p: string; tag: string; icon: PricingIcon; std: boolean }[],
    prop: { t: 'Your proposal sets out', items: ['The services we recommend', 'The scope', 'The deliverables', 'How we report'], fee: 'Our fees' },
    spend: {
      label: 'What you pay separately',
      a: { k: 'Ad spend', p: 'If we run ads for you, the ad budget is paid directly to the platform.' },
      b: { k: 'Our fee', p: 'Charged separately, as set out in your proposal.' },
    },
    cap: 'Review calls are included where agreed in your proposal. No one can honestly guarantee rankings, enquiries or revenue, so we don’t.',
  },

  how: {
    kicker: 'How you get a quote',
    h: { a: 'Three steps,', b: 'and you decide.' },
    steps: [
      { n: '01', t: 'Tell us what you need', p: 'Share your business, goals and challenges.' },
      { n: '02', t: 'Get a clear proposal', p: 'We recommend the scope and explain the cost.' },
      { n: '03', t: 'You decide', p: 'Nothing starts until you approve it.' },
    ],
  },

  close: {
    kicker: 'Get a proposal',
    h: { a: 'Know what you’re', b: 'paying for.' },
    lede: 'Before we begin, you’ll know what we’re recommending, why it matters, what it costs and how we’ll report on the work.',
    primary: 'Get a proposal',
  },
};
