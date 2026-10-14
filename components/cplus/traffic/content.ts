/**
 * C+ Traffic but no enquiries (/problems/traffic-but-no-enquiries), revision 2 — customer-facing copy, verbatim from the
 * approved prototype (proto/direction-c-plus 0a8b611, components/proto-cplus/trafficContent.ts, TB_PLAIN), with one
 * owner-approved change: check 3 reads "the problem may be who is visiting" (was "is"), so it stays a possible cause, not
 * a diagnosis. The prototype's internal review register is not carried over.
 */

export const TB_PLAIN = {
  crumb: { a: 'Problems', b: 'Traffic but no enquiries' },
  kicker: 'Traffic but no enquiries',
  h1: { a: 'People visit your website.', b: 'So why don’t they get in touch?' },
  lede: 'Visitors arrive, look around and leave. Not everyone should enquire — but if the right people aren’t, something along the way is stopping them.',

  /* hero illustration: the visitor journey, with an exit at each stage */
  journey: {
    label: 'The visitor journey',
    stages: [
      { t: 'Visit', d: 'Someone lands on your site', exit: 'Wrong visitors' },
      { t: 'Look around', d: 'They read about what you offer', exit: 'Unclear website' },
      { t: 'Get in touch', d: 'They send an enquiry or call', exit: 'Difficult enquiry' },
    ],
    end: 'An enquiry',
    cap: 'Illustration. Not every visitor should enquire. The question is where the right ones leave.',
  },

  /* 2 — three places people leave (paper) */
  whyKicker: 'Where people leave',
  whyH: { a: 'Three places', b: 'people may drop off.' },
  causes: [
    { k: 'Wrong visitors', t: 'People arrive, but they aren’t looking for what you sell.', sign: 'You might notice: enquiries about things you don’t do.', help: 'What helps: being found by the right people.', link: { href: '/seo', label: 'Being found' } },
    { k: 'Unclear website', t: 'People can’t quickly tell what you offer or what to do next.', sign: 'You might notice: people ask questions your page should already answer.', help: 'What helps: a page that answers their question.', link: { href: '/conversion-optimization', label: 'Clearer pages' } },
    { k: 'Difficult enquiry', t: 'The form is hard to use, breaks on a phone, or the message never arrives.', sign: 'You might notice: someone mentions they tried to contact you and gave up.', help: 'What helps: a simple way to get in touch that works.', link: { href: '/conversion-optimization', label: 'Easier enquiries' } },
  ],
  note: 'These are possible causes, not a diagnosis. If your website doesn’t record visits and enquiries, it’s hard to tell which one it is.',

  /* 3 — three things you can check yourself (ink) */
  checkKicker: 'Try this today',
  checkH: { a: 'Three quick checks.', b: 'No tools needed.' },
  checkIntro: 'Each takes a few minutes and can show you where to start.',
  checks: [
    { t: 'Send yourself an enquiry from your phone.', d: 'Did it arrive? Check the spam folder too. If it didn’t, start there.' },
    { t: 'Open the page most people land on.', d: 'Is it clear what you do, and what to do next? Ask someone who doesn’t know your business.' },
    { t: 'Read your last few enquiries.', d: 'Are they the kind of work you want? If most aren’t, the problem may be who is visiting.' },
  ],

  /* close — the next step */
  close: {
    label: 'Not sure where people are getting stuck?',
    h: 'We can help you find out.',
    body: 'Tell us what’s happening. We start with a call and a look at your website.',
    primary: 'Tell us what you’re trying to fix',
    secondary: 'Book a call',
  },
};
