/**
 * SEO packages: the single source for `/seo` and `/pricing` (Batch 1, approved commercial terms).
 * All prices exclude GST. No guarantee of backlinks, rankings, traffic, enquiries or revenue is made anywhere.
 */

export const SEO_GST_NOTE = 'All prices exclude GST.';

export const SEO_PLANS = [
  { id: 'foundation', name: 'SEO Foundation', fee: '₹19,999', per: 'a month', fit: 'For a business with a focused offer and a small set of core pages.' },
  { id: 'growth', name: 'SEO Growth', fee: '₹34,999', per: 'a month', fit: 'For a business with several services or locations that needs steady content and page work.', featured: true },
  { id: 'scale', name: 'SEO Scale', fee: '₹59,999', per: 'a month', fit: 'For a larger site or a competitive market that needs more pages worked on every month.' },
] as const;

export const SEO_AUDIT = {
  name: 'SEO Audit & Roadmap',
  fee: '₹14,999',
  per: 'one time',
  includes: [
    'Technical SEO assessment',
    'Review of up to 15 priority pages',
    'Research of up to 30 relevant search terms',
    'Analysis of two organic-search competitors',
    'Content gaps and backlink opportunity assessment',
    'GA4 and Search Console configuration review, where accessible',
    'Prioritised 90-day action roadmap',
    'One findings walkthrough',
  ],
  excludes: 'Audit implementation is not included.',
  credit: 'The audit fee is fully credited against your first SEO retainer invoice when you sign within 90 days of audit completion. The credit is applied once and is not refundable in cash.',
} as const;

/** Rows of the package comparison. Order: Foundation, Growth, Scale. */
export const SEO_COMPARE: { k: string; v: [string, string, string] }[] = [
  { k: 'Monthly fee (excluding GST)', v: ['₹19,999', '₹34,999', '₹59,999'] },
  { k: 'Active target keywords', v: ['Up to 15', 'Up to 30', 'Up to 60'] },
  { k: 'Initial page mapping', v: ['Up to 10 pages', 'Up to 25 pages', 'Up to 50 pages'] },
  { k: 'Competitors analysed', v: ['2', '3', '5'] },
  { k: 'Existing pages optimised each month', v: ['Up to 2', 'Up to 4', 'Up to 8'] },
  { k: 'New content pieces each month', v: ['1', '2', '4'] },
  { k: 'Eligible technical issues resolved each month', v: ['Up to 3', 'Up to 6', 'Up to 12'] },
  { k: 'Outreach prospects researched each month', v: ['5', '10', '20'] },
  { k: 'Personalised outreach attempts each month', v: ['3', '8', '15'] },
  { k: 'Backlink profile review', v: ['Quarterly', 'Monthly', 'Monthly'] },
  { k: 'Google Business Profile', v: ['1 location', '1 location', 'Up to 2 locations'] },
  { k: 'Performance reporting', v: ['Monthly', 'Monthly', 'Monthly'] },
  { k: 'Strategy review', v: ['Quarterly', 'Monthly', 'Monthly'] },
];

/** The four headline allowances shown on each plan card. */
export const SEO_CARD_KEYS = ['Active target keywords', 'Existing pages optimised each month', 'New content pieces each month', 'Strategy review'] as const;

export const SEO_DEFINITIONS = [
  'There are no technical-hour limits. A technical fix is a distinct, relevant issue that is implemented and verified.',
  'An outreach attempt is a personalised first contact, not a repeated follow-up.',
  'Unused monthly allowances do not automatically carry forward.',
  'Content formats and complexity are agreed in the monthly plan.',
];

export const SEO_TERMS = [
  'SEO retainers have a minimum engagement of six months.',
  'We do not guarantee backlinks, rankings, traffic, enquiries or revenue.',
  'We do not buy links or use purchased-link schemes.',
  'All additional work needs your approval before it starts.',
];

export const SEO_EXTRA_SCOPE = [
  'Major website development or redesign',
  'Website migrations',
  'Additional websites and complex subdomains',
  'Multilingual or international SEO expansion',
  'Extensive ecommerce catalogue optimisation',
  'Third-party publication and software costs',
  'Content or page work beyond package allowances',
  'Paid advertising management',
];
export const SEO_EXTRA_NOTE = 'These need a separate scope and quotation where applicable.';
