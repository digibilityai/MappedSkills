/**
 * C+ FAQ (/faq): customer-facing copy of the owner-approved G1 design (DEC-063; docs/faq-redesign/g1/FQ_G1_NOTES.md,
 * mockup/). The questions and answers are in ./faqData.ts. Facts used, no new claims: the follow-up channels and the
 * findings/plan/proposal before work (DEC-051 item 5, DEC-060); a monthly report as standard and review calls only when
 * agreed (DEC-058 HW-D01, DEC-060, DEC-061); a call is optional and is requested, not booked (DEC-060, DEC-062).
 */

export const FAQ = {
  crumb: 'FAQ',
  kicker: 'Questions, answered plainly',
  h1: { a: 'Before we work together,', b: 'you should know.' },
  /* FQ-D5: the em dash is kept as approved. */
  lede: 'How we work, what it costs, what to expect—and what we won’t promise.',
  jump: 'Jump to',

  start: {
    kicker: 'How working together starts',
    h: { a: 'Three steps.', b: 'You decide.' },
    line: 'Nothing starts until you’ve seen the plan and approved it.',
    steps: [
      { icon: 'msg', t: 'Tell us the problem', d: 'By form, email or WhatsApp. A call is there if you’d rather talk, not required.' },
      { icon: 'look', t: 'We review the situation', d: 'We look at what’s working and what isn’t, then share our findings, a recommended plan and a proposal.' },
      { icon: 'ok', t: 'Agree on next steps', d: 'You decide. Work starts only after you approve the scope and the fee.' },
    ],
    after: {
      label: 'Once the work starts',
      report: { t: 'Monthly performance report', tag: 'Standard' },
      calls: { t: 'Review calls', tag: 'When agreed' },
      link: 'See the full process',
    },
  },

  close: {
    kicker: 'Still have a question?',
    h: { a: 'Ask us.', b: 'You’ll get a straight answer.' },
    body: 'Tell us what’s going on in your business. If we’re not the right fit, we’ll say so.',
    primary: 'Tell us about your business',
    /* FQ-D4 */
    secondary: 'Request a call',
  },
} as const;
