/**
 * C+ Contact, Schedule a call and Thank you — customer-facing copy, verbatim from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/content.ts: CONTACT_PLAIN, SCHEDULE_PLAIN, THANKS_PLAIN).
 * Not carried over: the prototype labels and notes ("sends nothing", "simulated"), the demo controls, and the form's
 * own strings, which stay in components/forms/ContactForm.tsx (they are word-for-word the same).
 */

export const CONTACT_PLAIN = {
  kicker: 'Contact',
  h1: 'Tell us what you’re trying to fix.',
  lede: 'Send us a message about your business. We’ll get back to you by email or WhatsApp.',
  talk: 'Rather talk? Book a call',
  sheetTitle: 'Working sheet · your business',
  rowLabel: 'What you want',
  next: {
    kicker: 'What happens next',
    h: { a: 'Three steps,', b: 'in this order.' },
    steps: [
      { n: '01', t: 'You send this', d: 'Your message becomes the first row of the working sheet.' },
      { n: '02', t: 'We reply by email or WhatsApp', d: 'Using the details you give us above.' },
      { n: '03', t: 'Discovery call', d: 'A conversation about your business. The agreed work starts only after the audit, the proposal and your approval.' },
    ],
    here: 'You are here',
    link: 'See how the work runs',
  },
  talkSec: {
    kicker: 'If you would rather talk',
    h: 'Booking a call reaches the same place.',
    body: 'Book the discovery call directly, without writing first.',
    button: 'Book a call',
  },
};

export const SCHEDULE_PLAIN = {
  kicker: 'Schedule a call',
  h1: 'Book a time to talk.',
  lede: 'A conversation about what is actually happening — what you are getting, what you are not, and what would have to be true for that to change.',
  book: 'Open the booking page',
  bookNote: 'Times are shown on the booking page itself, so it is the only place that can tell you what is actually open.',
  rows: [
    { n: '01', t: 'Your message', s: 'Skipped when you book', state: 'skip' },
    { n: '02', t: 'Our reply by email or WhatsApp', s: 'Skipped when you book', state: 'skip' },
    { n: '03', t: 'Discovery call', s: 'Book it here', state: 'active' },
  ],
  sheetCaption: 'Booking goes straight to the discovery call.',
  covers: {
    kicker: 'What the call covers',
    items: [
      'What you sell, and what one customer is worth.',
      'What is happening now with enquiries.',
      'What you can currently measure.',
      'Where, on the evidence available in a conversation, the loss is most likely to be.',
    ],
  },
  bring: {
    kicker: 'What to have to hand',
    h: 'Rough numbers are enough.',
    items: [
      'How many enquiries you get in a typical month, roughly.',
      'Roughly how many of those are worth quoting for.',
      'Whether you can see where any of them came from.',
    ],
  },
  write: { kicker: 'Or write instead', h: 'The form reaches the same place.', link: 'Tell us what you’re trying to fix' },
};

export const THANKS_PLAIN = {
  kicker: 'Received',
  h1: 'Your enquiry has arrived.',
  lede: 'We have it. Nothing else is needed from you.',
  rows: [
    { n: '01', t: 'Your message', s: 'Received', state: 'done' },
    { n: '02', t: 'We reply by email or WhatsApp', s: 'Next', state: 'next' },
    { n: '03', t: 'Discovery call', s: 'If it helps', state: 'later' },
  ],
  sheetCaption: 'Your working sheet has its first row.',
  wait: {
    kicker: 'While you wait',
    h: 'One thing worth reading.',
    body: 'How the work runs, from the first conversation to the monthly review.',
    link: 'How it works',
  },
};

/**
 * `/thank-you` without a fresh confirmation marker (direct visit, reload, bookmark, expired or unavailable storage):
 * claims nothing about an enquiry (owner-approved copy, 2026-10-14). See `lib/enquiry-confirmation.ts`.
 */
export const THANKS_NEUTRAL = {
  h1: 'Sending an enquiry?',
  lede: 'This page displays a confirmation after an enquiry has been submitted successfully. If you haven’t sent one yet, you can get started below.',
  link: 'Tell us what you’re trying to fix',
};
