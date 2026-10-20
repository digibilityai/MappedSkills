/**
 * Contact and Thank you — customer-facing copy. THANKS_PLAIN is verbatim from the approved C+ prototype
 * (proto/direction-c-plus 0a8b611, THANKS_PLAIN); THANKS_CALL is the DEC-062 "Request a call" copy; CONTACT is the
 * C1 consolidated page (DEC-071), which replaced the separate C+ Contact (CONTACT_PLAIN) and DEC-062 Schedule
 * (SCHEDULE_PLAIN) pages.
 * Not carried over: the prototype labels and notes ("sends nothing", "simulated"), the demo controls, and the form's
 * own strings, which stay in components/forms/ContactForm.tsx (they are word-for-word the same).
 */

/**
 * C1 (DEC-071) — the consolidated `/contact` page: one form, two intentions ("Send an enquiry", "Request a call").
 * The hero heading, the "What we'll talk about" steps and the closing line are the owner-approved DEC-062 copy; the
 * lede is the C1 brief's suggested copy. Nothing here may imply that a call is booked: it is a request, and MappedSkills
 * gets in touch to arrange a time. No response time, call length, host, availability or price is stated. The form's
 * own strings live in components/forms/ContactForm.tsx.
 */
export const CONTACT = {
  kicker: 'Contact',
  h1: { a: 'Let’s talk about', b: 'your business.' },
  lede: 'Tell us what you’re looking for. We’ll get back to you to discuss the next steps.',
  how: ['Send an enquiry or request a call', 'We get back to you', 'We agree the next step together'],
  howLabel: 'How getting in touch works',
  card: { title: 'Get in touch', sub: 'Takes about a minute' },
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
    call: 'Request a call',
    alt: 'Prefer to write?',
    altLink: 'Send an enquiry',
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
  sheetTitle: 'Working sheet · your business',
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
