/**
 * C+ About (/about) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/content.ts, ABOUT_PLAIN), with owner-approved corrections
 * that qualify attribution (`why.skills[2].d`, `hold.ours.d`). The prototype's internal review registers are not
 * carried over.
 */

export const ABOUT_PLAIN = {
  crumb: 'About',
  h1: { a: 'Everyone has a report.', b: 'Who owns the enquiry?' },
  lede: 'Search, ads and websites each come with their own report. We answer for what usually sits outside all of them: the qualified enquiry — a real enquiry you can follow up.',
  slips: [
    { who: 'Search report', what: 'Rankings up', state: 'ok' },
    { who: 'Ads report', what: 'Clicks up', state: 'ok' },
    { who: 'Website handover', what: 'Site delivered', state: 'ok' },
    { who: 'Enquiries', what: 'Not in any report', state: 'gap' },
  ],
  slipsCaption: 'Illustration of a common arrangement — not a description of any particular supplier.',

  why: {
    kicker: 'Why we work this way',
    h: { a: 'The enquiry sits at the end of', b: 'everybody else’s report.' },
    body: [
      'A search supplier reports rankings. An ads supplier reports clicks. A web developer reports a finished site. Each of those can be accurate and useful — and still not tell you whether more of the right people got in touch.',
      'The enquiry comes at the end of all of them. Where the work is split between suppliers, it can easily become nobody’s job.',
    ],
    belief: 'That is the belief the firm is built on: the enquiry is what matters, and someone has to answer for the whole route to it — not one part of it.',
    skillsLead: 'So the work covers three skills, as one route:',
    skills: [
      { t: 'Capture', d: 'Be found by buyers already looking.' },
      { t: 'Convert', d: 'Turn the visit into a sent enquiry.' },
      { t: 'Measure', d: 'See where enquiries came from, where the information is available.' },
    ],
  },

  hold: {
    kicker: 'What we take responsibility for',
    h: { a: 'Accountable up to', b: 'the qualified enquiry.' },
    define: 'A qualified enquiry is a real enquiry you can follow up: a real person, reachable, from a business, with a stated need.',
    ours: { t: 'Ours', d: 'Everything up to that point — being found, the visit, the route to getting in touch, and recording where each enquiry came from, where the information is available.' },
    line: 'The line',
    yours: { t: 'Yours', d: 'What happens next — replying, quoting, selling and the revenue, in your own system. Where you share your sales figures, we report them as your numbers.' },
    notH: 'What we do not promise',
    not: ['Rankings', 'A position in AI answers', 'A number of enquiries', 'Revenue', 'A return on spend'],
    notBody: 'We publish what cannot be measured rather than presenting a measurement as more complete than it is. We publish the limits because the alternative is asking you to take the numbers on trust.',
  },

  fig: {
    kicker: 'An illustration',
    h: 'Whose report is the enquiry in?',
    intro: 'The same route to a sale, shown two ways. This is a common arrangement, not a description of every supplier.',
    toB: 'Show who answers for the enquiry',
    toA: 'Show it split across suppliers',
    stateOf: (n: number) => `View ${n} of 2`,
    stages: ['Search', 'Ads', 'Website', 'Form', 'Enquiry', 'Revenue'],
    stagesB: ['Search', 'Ads', 'Website', 'Form', 'Qualified enquiry', 'Revenue'],
    a: {
      t: 'Split across suppliers',
      sum: 'Three suppliers each report on their own part. The enquiry is in nobody’s report. Revenue is yours.',
      brackets: [
        { from: 0, to: 0, kind: 'sup', who: 'Search supplier', rep: 'Reports: rankings up' },
        { from: 1, to: 1, kind: 'sup', who: 'Ads supplier', rep: 'Reports: clicks up' },
        { from: 2, to: 3, kind: 'sup', who: 'Web developer', rep: 'Reports: site delivered' },
        { from: 4, to: 4, kind: 'gap', who: 'No one', rep: 'Not in any report' },
        { from: 5, to: 5, kind: 'yours', who: 'You', rep: 'Your sales and revenue' },
      ],
    },
    b: {
      t: 'One line to the enquiry',
      sum: 'We answer for the whole route, from search to the qualified enquiry. Revenue stays yours.',
      brackets: [
        { from: 0, to: 4, kind: 'ours', who: 'MappedSkills — one line', rep: 'Answers for the qualified enquiry, measured against a starting point' },
        { from: 5, to: 5, kind: 'yours', who: 'You', rep: 'Your sales and revenue, in your own system' },
      ],
    },
    routeLabel: 'The route to a sale',
    whoLabel: 'Who answers for each part',
    covers: 'covers',
    caption: 'Illustration. Not a claim about any particular supplier arrangement.',
  },

  how: {
    kicker: 'How we work',
    h: { a: 'Look first.', b: 'Then do the agreed work.' },
    steps: ['Discovery call', 'Audit', 'Findings and a recommended plan', 'Proposal', 'Your approval', 'Work begins'],
    work: 'We handle most of the agreed work, with your input where needed.',
    monthly: 'Every month: a performance report and a review call.',
    link: 'See how the work runs',
  },

  check: {
    kicker: 'What you can check',
    h: { a: 'Two things you can check,', b: 'and one of them does not flatter us.' },
    method: { t: 'The method, published', d: 'Including what cannot be measured — stated as part of the method, not as a footnote.', link: 'Read the method' },
    self: {
      t: 'A measurement of ourselves',
      fig: '0',
      of: 'of 28',
      figLabel: 'AI-assistant runs that named this business',
      d: 'We asked four AI assistants for agencies like this one, 28 times, on one day, in English, signed out. This business was named in none of them. Directory and listing sources appeared in 15 of those 28 runs. Two further systems returned no testable result at all, so we make no claim about either.',
      limits: 'One round, on one day, in one language, from one location. It is a count, not a rate, and one measurement is not a trend. It says nothing about results for clients.',
    },
  },

  fit: {
    kicker: 'Who this is for',
    h: { a: 'Who this is for,', b: 'and who it isn’t.' },
    forH: 'A good fit',
    for: [
      'Businesses where a customer takes time to decide and one good enquiry is worth real money.',
      'Businesses where demand already exists or can reasonably be reached.',
      'Businesses where measurement access is not a problem.',
    ],
    notH: 'Not a good fit',
    not: [
      'Not businesses that need demand created from nothing.',
      'Not impulse or price-only purchases.',
      'Not anyone who needs the outcome guaranteed.',
    ],
  },

  close: {
    label: 'If that is the kind of supplier you want',
    h: 'Tell us what is actually happening.',
    body: 'The most useful first message is what you are getting, what you are not, and what you can currently see.',
    primary: 'Tell us what you’re trying to fix',
    secondary: 'Book a call',
  },
};
