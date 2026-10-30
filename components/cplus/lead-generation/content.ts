/**
 * C+ Lead generation (/lead-generation): customer-facing copy of the owner-approved G1 design (DEC-057;
 * docs/lead-generation-redesign/g1, LG_G1_CONFIRMATION_04.md). Operating model (OWNER REQUIREMENT): MappedSkills
 * manages advertising campaigns; enquiries go directly to the client's own form, CRM or WhatsApp, depending on their
 * setup; MappedSkills does not manually review, approve or release individual client enquiries. Delivery testing is
 * conditional. Clients receive a monthly campaign performance report. No guarantee of lead quality, conversion,
 * integration success or specific reporting metrics. No long or double dashes.
 */

export const LG = {
  crumb: 'Enquiry generation',
  kicker: 'Enquiry generation',
  h1: { a: 'Lead generation, where the unit is', b: 'an enquiry you can actually act on.' },
  lede: 'Enquiries from potential customers, sent straight to your team. We don’t buy in lists of names and forward them.',

  /* 1: hero illustration (a fictional example, never a real enquiry) and its three-step journey */
  hero: {
    cap: 'Illustration of how an enquiry reaches your team. Not a real enquiry.',
    label: 'Example enquiry',
    chips: ['Ad seen', 'Enquiry sent', 'Received'],
    ad: { k: 'Your ad', t: 'Office fit-outs, quoted' },
    fields: [
      { f: 'Name', v: 'Meera S.' },
      { f: 'Business', v: 'Interiors studio' },
      { f: 'Needs', v: 'A quote for an office fit-out' },
      { f: 'Contact', v: 'Work email and WhatsApp' },
    ],
    q: 'Are they the right ones?',
    hand: 'Your sales team',
    listLabel: 'How an enquiry reaches your team',
    steps: [
      { t: 'Someone sees your ad', label: 'Someone sees your ad' },
      { t: 'They send an enquiry', label: 'They send an enquiry' },
      { t: 'Your team receives it', label: 'Your team receives it' },
    ],
  },

  /* 2: the problem (ink) */
  probKicker: 'The problem',
  probH: { a: 'Too few enquiries,', b: 'or too many of the wrong ones?' },
  few: { k: 'Too few', inbox: 'Your inbox', one: 'One enquiry', t: 'It’s quiet', d: 'The people who need you aren’t finding you, or aren’t getting in touch.' },
  wrong: {
    k: 'The wrong ones',
    tagsLabel: 'What arrives instead',
    tags: ['Job applications', 'Students', 'Sales pitches', 'Work you don’t do', 'Course questions'],
    t: 'It’s busy, but not with buyers',
    d: 'More of the same only means more sorting.',
  },
  probLine: { a: 'Each needs a different fix.', b: 'We find out which one you have first.' },

  /* 3: what we do (paper): one path, four stops */
  doKicker: 'What we do',
  doH: { a: 'We don’t sell you a list.', b: 'We bring potential customers to you.' },
  doLabel: 'The path from potential customer to enquiry',
  doCap: 'Illustration. The work depends on what we find.',
  stops: [
    { t: 'Reach the people you want', d: 'On search, ads and social media.' },
    { t: 'Make it easy to enquire', d: 'Into your own form, CRM or WhatsApp.' },
    { t: 'Check delivery', d: 'Where the setup allows, we test that enquiries reach the right destination.' },
    { t: 'See where it came from', d: 'Where we can tell, which work brought it in.' },
  ],

  /* the two operating statements kept from the merged "how an enquiry reaches you" section (DEC-095) */
  facts: [
    { b: 'You tell us who you want to reach.', t: 'We build campaigns around them.' },
    { b: 'We don’t call your enquiries to qualify them.', t: 'Your team has the sales conversation.' },
  ],

  /* 5: what we answer for (ink) */
  bdKicker: 'What we answer for',
  bdH: { a: 'We manage the campaigns.', b: 'Your team handles the enquiries.' },
  relay: {
    ours: 'Our part',
    oursT: ['Run the campaigns', 'Bring people to you'],
    mark: 'An enquiry, sent to your team',
    yours: 'Your part',
    yoursT: ['The conversation', 'The quote', 'The sale'],
  },
  notPromisedK: 'We won’t promise',
  notPromised: ['A set number of enquiries', 'A fixed cost per lead', 'How many become sales'],
  notPromisedWhy: 'These depend on your market and your sales team too.',
  get: {
    k: 'What you do get',
    t: 'You receive a monthly report on campaign performance.',
    start: 'We capture a starting point first, so whatever happens next is measurable rather than arguable.',
  },
  bdLink: { label: 'See how we work', href: '/how-it-works' },

  /* 6: questions (paper) */
  qKicker: 'Questions',
  qH: 'What people ask us',
  questions: [
    {
      q: 'Lead gen agencies sell rubbish leads.',
      a: 'It happens, and the mechanism is simple: when the contract is written on volume, volume is what arrives. Our alternative is to reach the people you want and make it easy to enquire, so enquiries go straight to your team.',
    },
    {
      q: 'How many enquiries will we get?',
      a: 'We don’t know, and neither does anyone quoting you a number. We capture a starting point first, so whatever happens next is measurable rather than arguable.',
    },
    {
      q: 'Will you call our leads to qualify them?',
      a: 'No. We don’t make qualification calls. Enquiries go straight to your team, and your sales team handles the sales conversation.',
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

  /* 7: close (tangerine). "What happens next" uses only the confirmed DEC-051 item 5 facts (no time, price or guarantee). */
  close: {
    kicker: 'Tell us where you are now',
    h: { a: 'How many enquiries do you get?', b: 'How many are any good?' },
    body: 'A rough idea is fine. Not sure? That’s a good place to start.',
    primary: 'Tell us what you’re trying to fix',
    nextK: 'What happens next',
    next: [
      { t: 'You tell us what’s happening', label: 'You tell us' },
      { t: 'We reply by email or WhatsApp', label: 'We reply' },
      { t: 'A discovery call', label: 'A discovery call' },
      { t: 'We send our findings, a plan and a proposal', label: 'Findings and a plan' },
      { t: 'Work starts once you approve', label: 'Work starts' },
    ],
  },
};
