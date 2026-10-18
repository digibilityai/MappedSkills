/**
 * C+ Contact and Thank you — customer-facing copy, verbatim from the approved prototype (proto/direction-c-plus
 * 0a8b611, components/proto-cplus/content.ts: CONTACT_PLAIN, THANKS_PLAIN). SCHEDULE_PLAIN and THANKS_CALL are the
 * DEC-062 "Request a call" copy.
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

/**
 * `/schedule-call` "Request a call" (DEC-062): the owner-approved G1 copy (docs/schedule-call-redesign/g1, approved
 * 2026-10-18). There is no online scheduling system, so nothing here may imply a booked appointment. No response time,
 * call length, host, availability or price is stated. The form's own strings live in components/forms/ContactForm.tsx.
 */
export const SCHEDULE_PLAIN = {
  kicker: 'Request a call',
  h1: { a: 'Let’s talk about', b: 'your business.' },
  lede: 'Tell us what you’re working on. We’ll get in touch to find a convenient time to talk.',
  how: ['You send a short request', 'We get in touch', 'We agree a time that suits you'],
  howLabel: 'How a call request works',
  card: { title: 'Request a call', sub: 'Takes about a minute' },
  talk: {
    kicker: 'What we’ll talk about',
    h: { a: 'One conversation,', b: 'three things.' },
    steps: [
      { n: '01', t: 'Your situation', d: 'What’s working and what you’d like to improve.' },
      { n: '02', t: 'Your goals', d: 'What matters most to your business.' },
      { n: '03', t: 'The next step', d: 'Whether and how MappedSkills could help.' },
    ],
  },
  calm: {
    h: { a: 'No presentation needed.', b: 'Just a conversation.' },
    body: 'Come as you are. Rough numbers and open questions are fine.',
    back: 'Request a call',
    alt: 'Prefer to write?',
    altLink: 'Send us a message instead',
  },
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
 * `/thank-you` after a successful `/schedule-call` request (DEC-062, D3): the approved G1 success copy, without the
 * visitor's name (nothing personal is carried to this page). A request, never a booking.
 */
export const THANKS_CALL = {
  kicker: 'Request received',
  h1: 'Thanks. Your request is with us.',
  lede: 'We’ll get in touch to find a convenient time to talk. There’s nothing else you need to do.',
  rows: [
    { n: '01', t: 'Request sent', s: 'Received', state: 'done' },
    { n: '02', t: 'We get in touch', s: 'Next', state: 'next' },
    { n: '03', t: 'We agree a time', s: 'Then', state: 'later' },
  ],
  sheetTitle: 'Your call request',
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
