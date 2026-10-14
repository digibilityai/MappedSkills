/**
 * C+ Services (/services) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus e5c1aa4, components/proto-cplus/servicesContent.ts, SV_PLAIN), with one owner-approved
 * correction: the Lead generation description (the lead verification standard is not yet operational). The
 * prototype's internal review register is not carried over.
 */

export const SV_PLAIN = {
  kicker: 'What we do',
  h1: { a: 'One outcome:', b: 'enquiries you can act on.' },
  lede: 'Getting in front of buyers who are already looking, getting the enquiry to actually complete, and seeing which part worked are three different skills.',
  side: 'Here they are connected, the joins between them are ours, and the enquiry at the end is what we answer for.',
  primary: 'Tell us what you’re trying to fix',

  /* hero illustration: a directory plate — the three parts, who works on each, measurement underneath */
  plate: {
    title: 'What we do',
    rows: [
      { k: 'Capture the demand', v: ['SEO', 'Google Ads', 'Paid social', 'AI search'] },
      { k: 'Turn it into enquiries', v: ['Conversion optimization'] },
      { k: 'Enquiries you can act on', v: ['Lead generation'] },
    ],
    base: { k: 'Measurement', v: 'Underneath all three. Not sold separately.' },
    cap: 'Illustration.',
  },

  /* 2 — the router (paper): start with the symptom */
  routeKicker: 'Where to start',
  routeH: { a: 'Start with what', b: 'is going wrong.' },
  routes: [
    {
      tag: 'Traffic',
      sym: 'Not enough of the right buyers find you.',
      job: 'Capture the demand',
      svc: [
        { href: '/seo', name: 'SEO', d: 'The primary route, and the slowest: a 12-month-plus horizon, stated before you commit.' },
        { href: '/google-ads', name: 'Google Ads', d: 'Demand that is active now. Your spend is paid directly to Google; our fee is separate.' },
        { href: '/social-media-ads', name: 'Paid social', d: 'An optional source, only where the channel fits your business.' },
        { href: '/ai-seo', name: 'AI search', d: 'Whether assistants name you when a buyer asks. Much of that depends on sources off your site. Nobody can guarantee it.' },
      ],
    },
    {
      tag: 'Conversion',
      sym: 'Visitors arrive, and too few enquire.',
      job: 'Turn it into enquiries',
      svc: [
        { href: '/conversion-optimization', name: 'Conversion optimization', d: 'The page, the form, the booking and the delivery. Diagnosed before it is optimised: in two of the four places a visit is lost, the page is not the fix.' },
      ],
    },
    {
      tag: 'Lead quality',
      sym: 'Enquiries arrive, and too few are worth acting on.',
      job: 'Enquiries you can act on',
      svc: [
        { href: '/lead-generation', name: 'Lead generation', d: 'More of the right enquiries, not just more enquiries.' },
      ],
    },
  ],
  unsure: { t: 'Not sure which?', d: 'The first conversation is about finding which part is breaking.', link: { href: '/how-it-works', label: 'How it works' } },

  /* 3 — how they work together (ink): the joins and the accountability boundary */
  joinKicker: 'How the parts work together',
  joinH: { a: 'Different skills.', b: 'The joins decide the result.' },
  joins: [['The search work', 'the page it feeds'], ['The page', 'the form'], ['The form', 'where the enquiry lands'], ['All of it', 'the measurement']],
  joinLine: 'Split across suppliers, those joins can belong to nobody.',
  measure: 'Measurement — analytics, event instrumentation, enquiry-source capture and attribution — is not sold separately. It is what makes the rest checkable.',
  scoped: 'Parts can be scoped. If you want the search work alone, we will tell you honestly whether it is likely to change the number you care about.',
  bdH: 'Our work connects traffic, conversion and lead quality—so the focus stays on enquiries worth acting on.',
  bdD: 'We do not control your price, your product, your capacity, how quickly you follow up, or whether you win the work.',
  notPromisedK: 'We do not promise',
  notPromised: ['rankings', 'positions in AI answers', 'enquiry volumes', 'revenue', 'a return on spend'],

  /* 4 — boundaries (paper): what can be added later, what we do not do */
  laterK: 'What can be added later',
  later: 'Once enquiries are arriving: routing each one to the right person, acknowledging it, and reminding both sides about a booked call. We do not implement CRMs, build lifecycle programmes or run sales operations.',
  notK: 'What we do not do',
  not: ['CRM implementation and migration', 'Revenue and sales operations', 'Lifecycle and nurture programmes', 'Standalone web development', 'Ecommerce merchandising', 'Social media management, brand building and PR'],
  notLine: 'Some of those are good work. They are not this.',
  priceLink: { href: '/pricing', label: 'What this costs, and what moves the number' },

  /* close — the live close */
  close: {
    label: 'Start with the situation, not the service',
    h: { a: 'Tell us where the enquiry path is', b: 'breaking.' },
    body: 'The enquiries you are getting, the ones you are not, and what you can currently see. That is a more useful first message than a list of services, and it is what the first conversation will be about anyway.',
  },
};
