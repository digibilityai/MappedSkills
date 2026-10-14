/**
 * C+ Google Ads (/google-ads) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/googleAdsContent.ts, GA_PLAIN), with two owner-approved
 * corrections that remove unconfirmed reporting promises (`bdBody[0]` and the "In the record" scope item). The
 * prototype's internal review register is not carried over.
 */

export const GA_PLAIN = {
  crumb: 'Paid search',
  kicker: 'Paid search',
  h1: { a: 'Google Ads, measured', b: 'on the enquiries rather than the clicks.' },
  lede: 'We run paid search: account structure, keywords, negatives, ad copy, bidding and budget. We also take responsibility for what happens after the click — the page it lands on, whether the enquiry completes, and whether you can see where it came from.',
  side: 'Paid is a way to reach demand that is active now. It is chosen because it fits your business, not because every client gets one.',
  primary: 'Tell us what you’re trying to fix',

  /* hero illustration: one click, as a receipt — the tear line is the click */
  receipt: {
    title: 'One click',
    topK: 'What the budget buys',
    topTag: 'Paid to Google',
    top: ['The search term', 'The ad', 'The click'],
    tear: 'The click',
    bottomK: 'What we also answer for',
    bottomTag: 'Our fee, separate',
    bottom: ['The page it lands on', 'Whether the enquiry completes', 'Where it came from'],
    cap: 'Illustration. No amounts.',
  },

  /* 2 — where paid search sits (ink) */
  sitKicker: 'Where paid search sits in the work',
  sitH: { a: 'One way to reach buyers.', b: 'It earns its place, or it does not.' },
  sitBody: 'What we are accountable for here is the same as everywhere else on this site: enquiries you can act on, measured.',
  ruler: {
    label: 'Where the work is measured',
    ticks: ['The account', 'After the click', 'The enquiry'],
    them: 'A supplier paid to manage spend improves the account.',
    us: 'We work to a number two steps further down the chain.',
  },
  sitLine: 'That changes what gets attention on the week the account looks healthy and the enquiries have stopped.',

  /* 3 — the boundary (paper): fee and spend; the arrangement itself is owner-blocked and renders nothing */
  bdKicker: 'Spend, fee, and what we will not promise',
  bdH: { a: 'Your advertising spend is paid directly to Google.', b: 'Our management fee is separate.' },
  bdBody: [
    'We record where things stand at the start, so we have a clear point of comparison.',
    'We do not report ROI, and we do not claim results we did not control.',
  ],
  notPromisedK: 'We do not promise',
  notPromised: ['a return on ad spend', 'a cost per enquiry', 'a cost per lead', 'a number of enquiries per month'],
  notPromisedClose: 'Those depend on your market, your price, your competitors and your own follow-up, none of which we control.',

  /* 4 — scope (ink): grouped by where each item acts; the tear line from the hero is the click */
  scopeKicker: 'What is in scope',
  scopeH: { a: 'The account,', b: 'and everything after the click.' },
  scope: [
    {
      k: 'In the account',
      items: [
        { t: 'The account.', d: 'Structure, search terms and negatives, match types, ad copy, extensions, bidding and budget pacing. Ordinary work, done properly.' },
        { t: 'Search-term review, continuously.', d: 'Reading what people actually searched before they clicked, and excluding what should never have matched. Irrelevant matches are where a budget quietly goes.' },
      ],
    },
    {
      k: 'After the click',
      items: [
        { t: 'The landing experience.', d: 'Whether the page answers the search it was bought for. A campaign pointed at a page that does not is how spend disappears without a trace.' },
        { t: 'The enquiry path.', d: 'The form, the booking, the phone route, and whether the enquiry actually arrives.' },
      ],
    },
    {
      k: 'In the record',
      items: [
        { t: 'Conversion measurement that is real.', d: 'Conversion tracking configured around meaningful enquiry actions, where technically feasible.' },
        { t: 'Focused on enquiries.', d: 'We look at enquiries, not just clicks or impressions, and use campaign-level information where the data allows it.' },
      ],
    },
  ],
  scopeTear: 'The click',

  /* 5 — measurement (paper), the limit beside the claim */
  measKicker: 'What we measure',
  measH: { a: 'The enquiry,', b: 'not the click.' },
  measBody: 'Enquiries by campaign and by search term where the data allows it, against a starting point captured before we change anything.',
  limitK: 'The limit',
  limit: 'When an enquiry’s source cannot be identified, we say so rather than claiming credit for it.',
  measLink: { href: '/how-it-works', label: 'The method, including what cannot be attributed' },
  related: {
    a: 'Related:',
    links: [
      { href: '/problems/traffic-but-no-enquiries', label: 'if the clicks arrive and the enquiries do not' },
      { href: '/services', label: 'the whole system' },
      { href: '/lead-generation', label: 'the enquiries themselves' },
    ],
  },

  /* close — the live close */
  close: {
    label: 'Tell us what the account is doing now',
    h: 'What you spend, and what you get back.',
    body: 'If you are already spending, the useful first message is what you spend, what you are getting, and whether you can currently tell which enquiries came from it. If you are not spending yet, tell us what you sell and what a single new customer is worth — that decides whether paid search makes sense at all.',
  },
};
