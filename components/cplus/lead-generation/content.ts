/**
 * C+ Lead generation (/lead-generation) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/leadGenContent.ts, LG_PLAIN), with owner-approved
 * corrections so the lead-verification standard reads as proposed, not as an operating service (`defH`,
 * `split.agreed.d`, `questions[0].a`, `questions[2].a`, `close.body`). The prototype's internal review registers are
 * not carried over.
 */

export const LG_PLAIN = {
  crumb: 'Enquiry generation',
  kicker: 'Enquiry generation',
  h1: { a: 'Lead generation, where the unit is', b: 'an enquiry you can actually act on.' },
  lede: 'Enquiries from real businesses, with a real need, that are worth picking up the phone about.',
  side: 'We don’t buy them in and forward them. They come from connected work: reaching the right buyers, making sure the enquiry arrives, and measuring where it came from.',
  primary: 'Tell us what you’re trying to fix',

  /* hero illustration: one campaign enquiry, read closely, with margin marks for the five steps */
  card: {
    label: 'A campaign enquiry',
    cap: 'Illustration of the proposed process. Not a real enquiry.',
    fields: [
      { f: 'Name', n: 1 },
      { f: 'Work email', n: 1 },
      { f: 'Company', n: 2 },
      { f: 'Requirement', n: 3, long: true },
      { f: 'Budget — only if relevant', n: 2, optional: true },
    ],
    stamp: 'Reviewed',
    handoff: 'Your sales team',
    notesLabel: 'Margin notes: the five steps',
    notes: [
      { n: 1, t: 'Captured and screened', d: 'a working contact; no spam or repeats' },
      { n: 2, t: 'Eligible for you', d: 'against criteria you agree' },
      { n: 3, t: 'Confirmed by the prospect', d: 'an email reply, or a WhatsApp they start' },
      { n: 4, t: 'Reviewed by us', d: 'the evidence checked — no calls' },
      { n: 5, t: 'Handed to your sales team', d: 'qualified enquiries only' },
    ],
  },

  /* 2 — the situation (ink): two versions, two different problems */
  sitKicker: 'The situation',
  sitH: { a: 'Two versions,', b: 'and they need different work.' },
  few: { k: 'Not enough enquiries', t: 'The demand exists somewhere. It is not arriving here.' },
  wrong: {
    k: 'Enough — and the wrong ones',
    t: 'That is not a volume problem. More traffic makes it worse.',
    tags: ['Job applications', 'Course questions', 'Vendor pitches', 'Students', 'Work you don’t do'],
  },
  sitCap: 'Illustration. No counts.',
  sitLine: 'Telling them apart takes measurement, not opinion.',

  /* 3 — the standard (paper): the five steps, the rule, the statuses */
  defKicker: 'What counts as a qualified enquiry',
  defH: 'The standard we are introducing: confirmed by the prospect and checked by us before it reaches your sales team.',
  defIntro: 'A verification standard we are introducing for client campaigns:',
  checks: [
    { n: 1, t: 'Captured and screened', d: 'A working contact. Spam and repeat enquiries are kept out.' },
    { n: 2, t: 'Eligible for you', d: 'Checked against criteria agreed with you for this campaign.' },
    { n: 3, t: 'Confirmed by the prospect', d: 'They confirm their requirement by email reply, or in a WhatsApp conversation they start.' },
    { n: 4, t: 'Reviewed by us', d: 'A MappedSkills operator checks the evidence. No calls.' },
    { n: 5, t: 'Handed to your sales team', d: 'Only qualified enquiries go to your sales process.' },
  ],
  rule: 'No confirmation, no qualified status.',
  statusK: 'Where each enquiry stands',
  statuses: [
    { k: 'Qualified', t: 'Eligible, confirmed and reviewed. Handed to your sales process.', on: true },
    { k: 'Pending verification', t: 'Eligible, waiting for the prospect to confirm.' },
    { k: 'Expired — unverified', t: 'Not confirmed within the window — 48 hours in the pilot. Kept separate; not sent to sales.' },
    { k: 'Unqualified', t: 'Does not meet the criteria agreed with you.' },
    { k: 'Duplicate', t: 'Repeats an enquiry already open.' },
  ],
  split: {
    agreed: { k: 'Agreed with you, per campaign', t: 'What makes an enquiry eligible depends on your business and the campaign.', d: 'Budget is one of the criteria only where it is relevant. Under the proposed standard, confirmation messages would carry your brand, and MappedSkills would manage the process.' },
    not: { k: 'Not part of it', t: 'We don’t make qualification calls.', d: 'Your sales team handles the sales conversation.' },
  },

  /* 4 — the boundary (ink) */
  bdKicker: 'What we answer for',
  bdH: { a: 'We are accountable up to', b: 'the qualified enquiry.' },
  rail: { ours: 'Ours', oursT: ['Reaching buyers', 'Eligibility and confirmation', 'Review'], mark: 'The qualified enquiry', yours: 'Yours', yoursT: ['The sales conversation', 'Quote', 'Win'] },
  bdRows: [
    { b: 'We don’t score enquiries.', t: 'A score needs past outcomes to calibrate against. Without them, the weights would be invented.' },
    { b: 'Every enquiry should be accounted for.', t: 'Even when its source is unknown.' },
  ],
  notPromisedK: 'We do not promise',
  notPromised: ['a number of enquiries per month', 'a cost per enquiry, or per lead', 'a conversion rate', 'a quality standard for demand we don’t control'],
  bdLink: { label: 'The method, including what cannot be attributed', href: '/how-it-works' },

  /* 5 — questions (paper) */
  qKicker: 'Questions',
  qH: 'What people ask us',
  questions: [
    {
      q: 'Lead gen agencies sell rubbish leads.',
      a: 'It happens, and the mechanism is simple: when the contract is written on volume, volume is what arrives. The standard we are introducing is the alternative: an enquiry confirmed by the prospect and checked against criteria agreed with you before it reaches your sales team.',
    },
    {
      q: 'How many enquiries will we get?',
      a: 'We don’t know, and neither does anyone quoting you a number. We capture a starting point first, so whatever happens next is measurable rather than arguable.',
    },
    {
      q: 'Will you call our leads to qualify them?',
      a: 'No. We don’t make qualification calls. Under the standard we are introducing, the prospect would confirm digitally, and your sales team would handle the sales conversation.',
    },
  ],
  related: {
    a: 'Related:',
    links: [
      { label: 'traffic but no enquiries', href: '/problems/traffic-but-no-enquiries' },
      { label: 'the whole system', href: '/services' },
      { label: 'organic search', href: '/seo' },
      { label: 'paid search', href: '/google-ads' },
    ],
  },

  /* close */
  close: {
    label: 'Tell us what your enquiries look like now',
    h: 'How many, and how many are worth quoting for.',
    body: 'Roughly is fine. If you can’t separate the two today, say so — that is a good place to start.',
  },
};
