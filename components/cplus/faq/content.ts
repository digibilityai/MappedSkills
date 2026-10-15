/**
 * C+ FAQ (/faq) — customer-facing copy, verbatim from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/content.ts, FAQ_PLAIN). The questions and answers are in
 * ./faqData.tsx.
 */

export const FAQ_PLAIN = {
  crumb: 'FAQ',
  h1: 'Questions we get asked, answered plainly.',
  lede: 'Including the ones with answers that lose us work.',
  side: 'An honest answer that costs an enquiry is the right answer — the alternative is finding out in month three.',
  indexLabel: 'Questions on this page',
  indexTitle: (n: number) => `All ${n} questions`,
  groupsTitle: 'Jump to a group',
  count: (n: number) => (n === 1 ? '1 question' : `${n} questions`),
  start: {
    kicker: 'How it starts',
    h: { a: 'If you get in touch,', b: 'this is what happens.' },
    first: 'We reply by email or WhatsApp.',
    steps: ['Discovery call', 'Audit', 'Findings and a recommended plan', 'Proposal', 'Your approval', 'Work begins'],
    notes: ['We handle most of the agreed work, with your input where needed.', 'Every month: a performance report and a review call.'],
    method: 'See how the work runs',
    contact: 'Tell us what you’re trying to fix',
  },
  more: {
    label: 'Something not answered here',
    statement: 'Then it is worth asking directly.',
    a: 'The answer will be the same one we would give on a call. If it is the method or the cost you are after, ',
    methodLink: 'the method is published',
    b: ' and ',
    pricingLink: 'what moves the number is set out here',
    c: '.',
  },
  close: {
    label: 'Ask the one that matters to you',
    h: 'The awkward ones get the same answer either way.',
    body: 'Tell us what is actually happening and we will tell you where we think the problem sits.',
    primary: 'Tell us what you’re trying to fix',
    secondary: 'Book a call',
  },
};
