/**
 * C+ Conversion Optimization (/conversion-optimization): customer-facing copy of the owner-approved G1 design
 * (docs/conversion-redesign/g1/CO_G1_COPY.md) with the owner's G2 revisions (DEC-055): CO-D06 (improve, measure, review;
 * no routine A/B testing) and CO-D07 (the form headline and the takeaway). No long dashes and no double hyphens.
 */

/* The primary action label, verbatim from HOME.hero.primary (unchanged). */
export const HOME = { hero: { primary: 'Tell us what you’re trying to fix' } };

export const CO = {
  crumb: 'Conversion optimisation',
  h1: { a: 'Plenty of visitors, not enough enquiries?', b: 'We find out why.' },
  lede: 'Conversion optimisation means getting more of your visitors to contact you. We judge it by real enquiries, not a percentage on a report.',
  story: {
    label: 'What happens on many websites',
    steps: [
      { t: 'Visitors arrive', d: 'They found your website.' },
      { t: 'Something stops them', d: 'A doubt, a long form, a slow page.' },
      { t: 'They leave without enquiring', d: 'And you never find out why.' },
    ],
    caption: 'Illustration.',
  },

  fourKicker: 'Four places you can lose a customer',
  fourH: { a: 'Your website isn’t', b: 'always the problem.' },
  askK: 'What owners usually ask us',
  ask: '“Can you redesign our website?”',
  tagFix: 'A redesign can help',
  tagNot: 'Not the website',
  stations: [
    { label: '1: The visitors', t: 'The visitors', d: 'The wrong people arrive, or the right people never find you.', fix: false, icon: 'M10.5 3.5a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm5 12 5 5' },
    { label: '2: Your page', t: 'Your page', d: 'It doesn’t answer what they came to find out.', fix: true, icon: 'M5 3.5h10l4 4v13H5zM15 3.5v4h4M8.5 11h7M8.5 14.5h7M8.5 18h4' },
    { label: '3: Getting in touch', t: 'Getting in touch', d: 'The form, booking or button lets them down, on a phone for example.', fix: true, icon: 'M4 4.5h16v15H4zM7.5 9h9M7.5 12.5h9M7.5 16h5' },
    { label: '4: Your tracking', t: 'Your tracking', d: 'Nothing records what happened, so nobody notices the loss.', fix: false, icon: 'M3 12s3.5-6.5 9-6.5S21 12 21 12s-3.5 6.5-9 6.5S3 12 3 12Zm9-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM4 4l16 16' },
  ],
  verdictK: 'So, a new website?',
  start: { href: '/problems/traffic-but-no-enquiries', label: 'Not sure where you’re losing them?', note: 'Start with three free checks you can do yourself.' },

  workKicker: 'How we work',
  workH: { a: 'First we find the problem.', b: 'Then we fix that problem.' },
  steps: [
    { label: 'Step 1: Find the problem', t: 'Find the problem', d: 'We use your website like a customer, and send test enquiries to see if they arrive.' },
    { label: 'Step 2: Plan the fix', t: 'Plan the fix', d: 'We start with the biggest problem.' },
    { label: 'Step 3: Make the change', t: 'Make the change', d: 'We make the agreed changes, with your input where needed.' },
    { label: 'Step 4: Check the results', t: 'Check the results', d: 'We note where things stand first, so we can compare honestly.' },
  ],

  measKicker: 'How do we know a change worked?',
  measH: { a: 'We make improvements.', b: 'Then we measure what changes.' },
  measBody: 'We check how visitors respond after the changes and compare the results with what was happening before.',
  measSteps: [
    { label: '1: Improve', t: 'Improve', d: 'We make the agreed changes.' },
    { label: '2: Measure', t: 'Measure', d: 'We see how visitors respond.' },
    { label: '3: Review', t: 'Review', d: 'We compare it with what came before.' },
  ],
  measCaption: 'We tell you what we saw. We don’t claim more than we can prove.',
  noBench: 'We don’t quote “typical” improvements or industry averages.',
  methodLink: { href: '/how-it-works', label: 'The method, including what cannot be attributed' },

  proofKicker: 'We checked our own website first',
  proofH: { a: 'Our own enquiry form', b: 'wasn’t working.' },
  proof: [
    { label: '1: A visitor sends an enquiry', t: 'A visitor sends an enquiry.' },
    { label: '2: The website says thank you', t: 'Our website says “Thank you”.' },
    { label: '3: The inbox stays empty', t: 'Our inbox stays empty.' },
    { label: '4: Nobody noticed', t: 'Nothing was tracked, so nobody noticed.' },
  ],
  thanks: { t: 'Thank you', d: 'Your enquiry has been sent.' },
  inbox: { h: 'Our inbox', v: 'Nothing.' },
  reconstruction: 'Our recreation of the message, not a screenshot.',
  lesson: { k: 'What it taught us', a: 'A website can look fine and still lose enquiries.', b: 'That’s why one of our first checks is simple: send a test enquiry and see if it arrives.' },

  close: {
    h: 'Let’s find out where your enquiries are going.',
    body: 'Not sure your website records enquiries at all? That’s the quickest thing to check.',
    nextK: 'What happens next',
    next: [
      'You tell us what isn’t working.',
      'We reply by email or WhatsApp.',
      'We talk it through on a call.',
      'You get our findings and a proposal before any work starts.',
    ],
  },
};
