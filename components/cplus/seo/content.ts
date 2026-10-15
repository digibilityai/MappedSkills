/**
 * C+ SEO (/seo) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/seoContent.ts, SEO_PLAIN), with owner-approved corrections
 * that remove unconfirmed reporting promises (`meas[1]`, `report.cap`, `report.unattr.t`, `work[5].body`) and
 * unsupported frequency wording (`sitKicker`, `questions[0].a`). The prototype's internal review registers are not
 * carried over.
 */

export const SEO_PLAIN = {
  crumb: 'Search',
  kicker: 'Organic search',
  h1: { a: 'SEO that is judged on the', b: 'enquiries', c: 'it produces.' },
  lede: 'We do the organic search work: technical foundations, site structure, indexation, internal linking, and content built for the searches that actually indicate someone wants to buy.',
  side: {
    a: 'Then we keep going — through the page they land on, the enquiry they send, and the measurement that tells you it happened.',
    b: 'Search is how we reach demand that already exists. It is not the whole job.',
  },
  primary: 'Tell us what you’re trying to fix',
  secondary: 'Book a call',

  /* hero illustration: the trail from a search to an enquiry (labels: SEO_COPY_CHANGES C-01) */
  trail: [
    { key: 'search', name: 'A search', note: 'Someone looking for what you sell' },
    { key: 'result', name: 'A result', note: 'Where rankings are measured' },
    { key: 'page', name: 'Your page', note: 'Where sessions are counted' },
    { key: 'enquiry', name: 'An enquiry', note: 'The number this is judged on' },
  ],
  trailMid: { tag: 'Diagnostics', t: 'Rankings and sessions' },
  trailEnd: { tag: 'The result', t: 'The enquiry' },
  trailCap: 'Illustration.',
  trailNote: 'Rankings and sessions explain movement in the number that matters. They are not the result.',

  /* 2 — horizon and limitations (ink), before the scope */
  hzKicker: 'Before the scope',
  hzH: { a: 'How long this takes, and', b: 'what we will not promise' },
  hzStatement: { a: 'Organic search is a', b: '12-month-plus engine.' },
  hzFig: {
    label: 'Illustration: the organic search horizon, in months. Not a forecast and not a schedule.',
    axis: 'Months',
    ticks: ['0', '12', '12+'],
    repair: 'Some sites: the early months are repair work',
    plus: 'The horizon: 12 months and beyond',
  },
  rows: {
    horizon: {
      k: 'Horizon',
      t: 'That is our position and we state it before you commit, not after. Some technical problems produce visible change sooner, and some sites are far enough behind that the early months are repair work.',
    },
    urgent: { k: 'If it is urgent', t: 'If you need enquiries this quarter, paid search is the honest answer and we will say so.' },
    not: {
      k: 'Not promised',
      items: [
        'We do not promise rankings or positions.',
        'We do not promise traffic figures.',
        'We do not quote search volume, keyword difficulty or cost-per-click numbers for your market — not because they are secret, but because, as of August 2026, no keyword tool has been available in this programme to produce one we would stand behind, and inventing them is how this category loses people’s trust.',
        'We also do not sell technical fixes as a route into AI answers. Access is not enough on its own: our site was readable to the AI crawlers we checked and we still did not appear in the answers we measured. What we found is set out on the AI search page rather than sold from here.',
      ],
      tag: 'Not promised',
    },
  },
  hzLink: { label: 'Where AI search genuinely fits', href: '/ai-seo' },

  /* 3 — the situation (paper) */
  sitKicker: 'The situation this is bought to fix',
  sitH: { a: 'Being found is only useful if the visit turns into', b: 'something you can quote for.' },
  sits: [
    { tag: 'Lost at the result', t: 'Buyers are searching for what you sell and finding your competitors.' },
    { tag: 'Lost after the page', t: 'You rank for a list of terms, the sessions arrive, and the enquiries do not follow.' },
    { tag: 'Reported in the middle', t: 'An agency reported both and neither changed anything you could see in the business.' },
  ],
  sitMore: 'The second and third versions matter more than the first, because they are where search work can succeed on its own terms and still fail you.',
  sitLink: { label: 'If you have the traffic and not the enquiries, start here', href: '/problems/traffic-but-no-enquiries' },
  sitCap: 'Each line is the trail from the illustration above: a search, a result, your page, an enquiry.',

  /* 4 — month to month (ivory) */
  workKicker: 'Month to month',
  workH: 'What the work involves, month to month',
  workCols: ['Search', 'Result', 'Page', 'Enquiry'],
  workColsSr: ['the search', 'the result', 'your page', 'the enquiry'],
  workCap: 'Where each part of the work acts on the trail from a search to an enquiry.',
  work: [
    {
      lead: 'Finding the demand worth capturing.',
      body: 'Which searches indicate somebody wants what you sell, and which ones only look commercial — the ones that mostly return jobs, courses, definitions or competitors. Ranking for those produces sessions and no enquiries, and it is easy to do by accident.',
      on: [0],
    },
    {
      lead: 'Technical foundations.',
      body: 'Crawlability, indexation, canonicalisation, site structure, internal linking, page speed, structured data, and a sitemap that reflects what actually exists. Unglamorous, and the reason a lot of good content never gets read by anything.',
      on: [1, 2],
    },
    {
      lead: 'Content aimed at commercial and problem-led searches.',
      body: 'Pages that answer the question the searcher arrived with — including the ones phrased as a problem rather than as a product.',
      on: [0, 1, 2],
    },
    {
      lead: 'The landing experience and the enquiry path.',
      body: 'What happens after the click is inside the scope, not somebody else’s department.',
      on: [2, 3],
    },
    {
      lead: 'Migration and equity protection.',
      body: 'Where a site is being rebuilt or restructured, protecting existing rankings and redirect chains is part of the discipline, not an afterthought.',
      on: [1],
    },
    {
      lead: 'Measurement.',
      body: 'Set up before anything is claimed, so there is a starting point to compare against.',
      on: [0, 1, 2, 3],
    },
  ] as { lead: string; body: string; on: number[] }[],

  /* 5 — how you will know (ink) */
  measKicker: 'Measurement',
  measH: 'How you will know whether it worked',
  meas: [
    'Before the work starts, we capture a starting point: what is arriving now, from where, and what happens to it. Without that, every later number is an assertion.',
    'After that, we look at enquiries — where they came from, what they landed on, and whether the source could be identified. Rankings and sessions help explain changes in that number. They are not the result.',
  ],
  report: {
    cap: 'Illustration: what we look at. No data.',
    start: { k: 'Starting point', t: 'Captured before the work starts' },
    enq: { k: 'Enquiries', cols: ['Where they came from', 'What they landed on', 'Whether we could tell'] },
    unattr: {
      k: 'Unattributed',
      t: 'Some enquiries arrive with no usable trail. We treat those as unattributed rather than crediting them to search.',
    },
    diag: { k: 'Diagnostics', t: 'Rankings · sessions' },
  },
  /* The self-test figures (28 runs / 4 systems / 0 appearances) are NOT printed on this page (owner-approved correction):
     `AI_SEARCH_LANGUAGE.md` §7 limits /seo to a cross-link on AI search; the dataset lives on /ai-seo. */
  selfLink: { label: 'What we measured on our own site, and its limits', href: '/ai-seo' },
  measLink: { label: 'The method, including what cannot be attributed', href: '/how-it-works' },

  /* 6 — questions (paper) */
  qKicker: 'Questions',
  qH: 'The three questions we get asked here',
  questions: [
    {
      q: 'SEO agencies show us traffic and never leads.',
      a: 'It can happen, and the cause may be structural: the search work stops at the ranking and the enquiry path belongs to someone else. Ours does not stop there, and the measurement is part of the work itself: a monthly report and a review call, not a report on its own.',
    },
    {
      q: 'Can you guarantee rankings?',
      a: 'No. Nobody controls the ranking system, the competitors, or the market. A guarantee in this category is either about terms nobody searches for, or it is not a guarantee.',
    },
    {
      q: 'We tried SEO and nothing happened.',
      a: 'Then the useful first question is which of four things went wrong — the demand, the page, the enquiry path, or the measurement. They need different fixes, and more search work is the right answer to only one of them.',
    },
  ],
  qLink: { label: 'Where people may drop off, and how to check', href: '/problems/traffic-but-no-enquiries' },
  qAbove: { a: 'Above this page:', link: 'the whole system this sits inside', href: '/services' },

  /* close (tangerine) */
  close: {
    label: 'Tell us what search is currently doing for you',
    h: 'Start with what you can see today.',
    body: 'The most useful first message is what you are seeing now: what you rank for, what arrives, and what does not turn into an enquiry. If you do not know, that is itself a finding and worth saying.',
  },
};
