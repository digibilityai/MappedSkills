/**
 * C+ Services (/services): customer-facing copy of the owner-approved G1 design (docs/services-redesign/g1/, SV_G1_NOTES.md;
 * DEC-059). Central idea, "the route": three equal stages, Capture, Convert and Measure, named in the H1 as Get found, Get
 * enquiries and See what's working. Service scope follows docs/01-business/SERVICE_ARCHITECTURE.md: six services, with
 * measurement part of every service rather than a seventh one. Card copy is deliberately short (SV-D05); each service
 * page carries its own qualifications. The kitchen fitter in the journey is fictional and labelled as such.
 */

export type StageKey = 'cap' | 'cv' | 'ms';
export type Icon = 'search' | 'mail' | 'chart' | 'person' | 'arrow' | 'check';

export const SV = {
  crumb: 'What we do',
  kicker: 'What we do',
  h1: ['Get found.', 'Get enquiries.', 'See what’s working.'],
  lede: 'Digital marketing that works together: search, ads, your website and enquiry tracking, joined into one route.',
  primary: 'Tell us what you’re trying to fix',

  /* hero illustration: the route, drawn still */
  route: {
    label: 'The route: someone needs what you sell, they find you, they get in touch, and you see where they came from. Illustration.',
    start: 'Someone needs what you sell',
    stations: [
      { k: 'Capture', t: 'They find you', icon: 'search' as Icon },
      { k: 'Convert', t: 'They get in touch', icon: 'mail' as Icon },
      { k: 'Measure', t: 'You see where they came from', icon: 'chart' as Icon },
    ],
    tag: 'Illustration',
  },

  /* 2: where to start (problem selector and the six services) */
  pick: {
    kicker: 'Where to start',
    h: { a: 'What’s', b: 'not working?' },
    lede: 'Start with the problem. Each service below fixes one part of the route.',
    prompt: 'Pick the one that sounds most like you',
    other: 'Something else? Tell us',
    options: [
      { key: 'cap' as StageKey, t: 'Not enough people find us', icon: 'search' as Icon, out: ': four services, just below.' },
      { key: 'cv' as StageKey, t: 'People visit, but few get in touch', icon: 'mail' as Icon, out: ': two services, just below.' },
      { key: 'ms' as StageKey, t: 'We can’t tell what’s working', icon: 'chart' as Icon, out: '. It’s part of every service.' },
    ],
    startWith: 'Start with ',
    here: 'Start here',
    groups: [
      {
        key: 'cap' as StageKey,
        k: 'Capture',
        t: 'Get found',
        p: 'When not enough people find you.',
        icon: 'search' as Icon,
        cards: [
          { href: '/seo', name: 'SEO', d: 'Show up when people search for what you sell. It usually takes 12 months or more.' },
          { href: '/google-ads', name: 'Google Ads', d: 'Reach people searching on Google right now.' },
          { href: '/social-media-ads', name: 'Paid social', d: 'Social media ads, where they make sense for your business.' },
          { href: '/ai-seo', name: 'AI search', d: 'Work on how AI tools like ChatGPT find and describe your business.' },
        ],
      },
      {
        key: 'cv' as StageKey,
        k: 'Convert',
        t: 'Get enquiries',
        p: 'When people visit, but few get in touch.',
        icon: 'mail' as Icon,
        cards: [
          { href: '/conversion-optimization', name: 'Conversion optimisation', d: 'Find and fix what stops visitors getting in touch: the page, the form, the booking.' },
          { href: '/lead-generation', name: 'Lead generation', d: 'Ad campaigns that send enquiries straight to your own form, CRM or WhatsApp.' },
        ],
      },
      {
        key: 'ms' as StageKey,
        k: 'Measure',
        t: 'See what’s working',
        p: 'When you can’t tell what’s working.',
        icon: 'chart' as Icon,
        cards: [],
      },
    ],
    included: {
      t: 'Part of every service, not sold separately.',
      d: 'We track where your enquiries come from, and you get a monthly report.',
      link: { href: '/how-it-works', label: 'How we work and report' },
    },
  },

  /* 3: one enquiry, start to finish (fictional example) */
  journey: {
    kicker: 'How it fits together',
    h: { a: 'One enquiry,', b: 'start to finish.' },
    lede: 'The three parts working together, for one example business: a kitchen fitter.',
    steps: [
      { k: 'Capture · Get found', label: 'Get found', t: 'Someone searches for a kitchen fitter nearby. You show up.' },
      { k: 'Convert · Get enquiries', label: 'Get enquiries', t: 'Your page answers their questions. They send an enquiry, straight to you.' },
      { k: 'Measure · See what’s working', label: 'See what’s working', t: 'Your monthly report shows where it came from, where tracking allows.' },
    ],
    search: { q: 'kitchen fitters near me', name: 'Example Kitchens', meta: 'Fitted kitchens · Pune' },
    message: { text: 'Hi, could you quote for a kitchen in Baner?', to: 'New enquiry · to your inbox' },
    report: { h: 'Monthly report', row: ['Enquiry: kitchen in Baner', 'From Google search'], unknown: ['Some sources can’t be tracked', 'Shown as unknown'] },
    tag: 'Illustrative example',
    note: 'Not a real client. No real figures.',
  },

  /* 4: scope */
  scope: {
    h: { a: 'What we do,', b: 'and what we don’t.' },
    cols: [
      { t: 'We start with what you need', d: 'Not every service, every time. You see a plan before any work starts.' },
      { t: 'Added later, if you need it', d: 'Sending each enquiry to the right person, acknowledging it, and reminders for booked calls.' },
    ],
    notT: 'Not something we do',
    not: ['CRM setup and migration', 'Sales and revenue operations', 'Lifecycle and nurture programmes', 'Standalone website development', 'Ecommerce merchandising', 'Organic social media, brand building and PR'],
    price: { href: '/pricing', label: 'What this costs, and what moves the number' },
  },

  /* close: confirmed operating facts only (DEC-051 item 5) */
  close: {
    kicker: 'Start a conversation',
    h: { a: 'Not sure where it’s breaking?', b: 'Let’s find out.' },
    body: 'Tell us what you’re seeing. That’s enough to start.',
    nextK: 'What happens next',
    next: ['You tell us what’s going on.', 'We reply by email or WhatsApp.', 'A call, then a plan. Nothing starts until you say yes.'],
  },
};
