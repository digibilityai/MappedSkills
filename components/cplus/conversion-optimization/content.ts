/**
 * C+ Conversion Optimization (/conversion-optimization) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/content.ts, SERVICE_PLAIN, and the one HOME label it uses), with
 * one owner-approved correction to unsupported frequency wording (`close.body`). The prototype's internal review
 * registers are not carried over.
 */

/* The only HOME field the page uses (the primary action label), verbatim from HOME.hero.primary. */
export const HOME = { hero: { primary: 'Tell us what you’re trying to fix' } };

export const SERVICE_PLAIN = {
  crumb: 'Conversion optimisation',
  h1: { a: 'Plenty of visitors, not enough enquiries?', b: 'We find out why.' },
  lede: 'Conversion optimisation means getting more of the people who visit your website to contact you. We judge the work by real enquiries you can follow up, not by a percentage on a report.',
  artCaption: '1 the wrong visitors · 2 the page doesn’t help · 3 getting in touch fails · 4 nothing is recorded.',
  artNote: 'Four places you can lose a potential customer. Illustration.',
  briefKicker: 'What business owners usually ask us to do',
  brief: ['Redesign the website.', 'Shorten the form.', 'Move the button.'],
  briefTurn: 'Sometimes that helps. But often customers are being lost somewhere else, and changing the website won’t fix it.',
  lossesKicker: 'Four places you can lose a customer',
  lossesH: { a: 'Your website isn’t', b: 'always the problem.' },
  toggle: 'Show what a website redesign can fix',
  losses: [
    { n: '01', name: 'The visitors', what: 'The wrong people arrive, or the right people never find you.', page: false, hidden: false, icon: 'search' },
    { n: '02', name: 'Your page', what: 'It doesn’t answer what they came to find out.', page: true, hidden: false, icon: 'page' },
    { n: '03', name: 'Getting in touch', what: 'The form, booking or button doesn’t work for them — on a phone, for example.', page: true, hidden: false, icon: 'form' },
    { n: '04', name: 'Your tracking', what: 'Nothing records what happened, so nobody notices the loss.', page: false, hidden: true, icon: 'eyeoff' },
  ],
  tagFix: 'a redesign can help',
  tagNot: 'not the website',
  lossesNote: 'The last one is the hardest: if nothing records what happens, a lost enquiry leaves no trace.',
  start: { href: '/problems/traffic-but-no-enquiries', label: 'Not sure where you’re losing them?', note: 'Start with three free checks you can do yourself.' },
  workKicker: 'How we work',
  workH: { a: 'First we find the problem.', b: 'Then we fix that problem.' },
  steps: [
    { tab: 'Find the problem', t: 'Find the problem', d: 'We look at who is visiting and what they wanted, and whether your page answers that. We send real test enquiries — on a phone and on a slow connection — and confirm they arrive. And we check whether anything is being recorded at all.', icon: 'search' },
    { tab: 'Plan the fix', t: 'Plan the fix', d: 'We fix the biggest problem first. That might be what your page says, a form that is too hard to fill in, enquiries that are sent but never reach you, or missing tracking.', icon: 'wrench' },
    { tab: 'Make the change', t: 'Make the change', d: 'We make the changes ourselves: the form, the booking page, what happens after someone gets in touch, and the tracking. You don’t just get a list of recommendations.', icon: 'build' },
    { tab: 'Check the results', t: 'Check the results', d: 'Before we change anything, we record how things are today. Without that starting point, nobody can honestly say whether things got better.', icon: 'chart' },
  ],
  testKicker: 'How do we know a change worked?',
  testH: { a: 'With only a few enquiries,', b: 'luck can look like improvement.' },
  testBody: 'If you get a handful of enquiries a month, a good or bad week can happen by chance. Proving a change worked needs enough visits and enquiries — how many depends on your business and on the change. A business with only a few enquiries a month may not have enough yet.',
  below: { k: 'Not enough yet', t: 'We find the problem, make the change and watch what happens. We tell you what we saw — but we don’t claim an improvement we can’t prove.' },
  above: { k: 'Enough to test', t: 'We can compare two versions properly and tell you how confident we are in the result.' },
  line: 'enough to judge — different for every business',
  noBench: 'We don’t quote “typical” improvements or industry averages. We don’t have reliable figures, so we won’t invent them.',
  /* correction (OD-03/CP7 follow-up): restores the live page's link to the method (live `/conversion-optimization` "Related:") */
  methodLink: { href: '/how-it-works', label: 'The method, including what cannot be attributed' },
  proofKicker: 'We checked our own website first',
  proofH: { a: 'Our own contact form was losing every enquiry —', b: 'while telling visitors it had worked.' },
  saw: 'What visitors saw',
  arrived: 'What we received',
  arrivedValue: 'Nothing',
  reconstruction: 'Our recreation of the message — not a screenshot.',
  proofBody: 'Every enquiry sent through it was lost, and we had no tracking to notice. You couldn’t have spotted it by looking at the design, the wording or the visitor numbers.',
  close: {
    h: 'Let’s find out where your enquiries are going.',
    body: 'If you’re not sure your website records enquiries at all, that’s a good place to start — and the quickest thing to check.',
  },
};
