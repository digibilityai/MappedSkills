/**
 * C+ Home (/) — customer-facing copy from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/content.ts, HOME), with owner-approved corrections: the
 * Measure summary qualifies attribution (`stages[2].summary`), the Convert links restore the homepage's link to
 * /problems/traffic-but-no-enquiries, and `accountable.pricing` restores its link to /pricing (the previous homepage's
 * wording). The hero panel heading is corrected in ./HomeFigures.tsx. The prototype's
 * internal review registers are not carried over.
 */

export const HOME = {
  hero: {
    h1a: 'Judge us on the',
    h1named: 'enquiries',
    h1b: ', not the',
    h1traffic: 'traffic',
    lede: 'There is buyer demand for what you sell, and some of it never reaches you.',
    ledeTail: 'We work on the whole route to an enquiry.',
    primary: 'Tell us what you’re trying to fix',
    secondary: 'Book a call',
    method: 'See the method, including what we can’t attribute',
  },
  // the three symptoms (approved, verbatim) and the turn
  symptoms: [
    { lead: 'They are searching, and', clause: 'finding somebody else.', stage: 'Capture' },
    { lead: 'The visits arrive and', clause: 'the enquiries do not.', stage: 'Convert' },
    { lead: 'Enquiries arrive, and', clause: 'nobody can say which came from where.', stage: 'Measure' },
  ],
  symptomsTurn: { a: 'That reads like three problems.', b: 'It behaves like one.' },
  symptomsNote: 'With no measurement in place, all three failures look identical from the outside.',
  // Capture / Convert / Measure — bodies approved; the one-word summaries are PROPOSED
  stages: [
    {
      key: 'capture',
      title: 'Capture',
      summary: 'Be found by buyers already looking.', // PROPOSED
      body: 'Reach the buyers already looking. Some demand never reaches you at all.',
      links: [
        { href: '/seo', label: 'Organic search' },
        { href: '/google-ads', label: 'Google Ads' },
        { href: '/social-media-ads', label: 'Paid social' },
        { href: '/ai-seo', label: 'AI search' },
      ],
    },
    {
      key: 'convert',
      title: 'Convert',
      summary: 'Turn the visit into a sent enquiry.', // PROPOSED
      body: 'Make the route from that first visit to a sent enquiry work.',
      links: [
        { href: '/conversion-optimization', label: 'Conversion optimisation' },
        { href: '/lead-generation', label: 'Lead generation' },
        { href: '/problems/traffic-but-no-enquiries', label: 'Traffic but no enquiries' },
      ],
    },
    {
      key: 'measure',
      title: 'Measure',
      summary: 'See where enquiries came from, where the information is available.', // PROPOSED
      body: 'Each enquiry records where it came from. What arrives with no usable trail is marked unattributed, never assigned.',
      links: [{ href: '/how-it-works', label: 'How we measure it' }],
    },
  ],
  joins: {
    a: 'Your marketing works better when',
    b: 'everything works together.',
    body: 'Running ads is only one part of generating enquiries. Your website needs to convince visitors to contact you, your forms need to work, and your business needs to know which marketing activities generate enquiries. We help connect these steps so you can identify what’s working and what needs improvement.',
  },
  accountable: {
    kicker: 'What we are responsible for, and where that stops',
    h: 'We improve what can be',
    named: 'measured and controlled.',
    body: 'We manage and optimise the marketing activities that help your business attract potential customers. From campaign performance to website conversions and enquiry tracking, we focus on improving what can be measured and controlled.',
    bodyLimits: 'Results also depend on factors such as market demand, competition, budgets, pricing and how quickly your business responds to enquiries.',
    pricing: 'What this costs, and what moves the number',
  },
  notPromised: ['rankings', 'a position in AI answers', 'a number of enquiries', 'revenue', 'a return on spend'],
  notPromisedClose: 'None of that is ours to control.',
  proof: {
    label: 'What you can check before you commit',
    cases: 'Real businesses. Real marketing challenges.',
    casesBody: 'Explore how we’ve worked with businesses to identify marketing challenges and improve how their campaigns are measured.',
    casesLink: 'See our work',
    claimA: 'Is your business visible when',
    claimNamed: 'customers ask AI for recommendations?',
    claimBody: 'We study how businesses appear in AI-generated recommendations, identify visibility gaps and help businesses improve the information that search engines and AI platforms can discover and understand.',
    ownTest: 'We also ran the test on ourselves, and we publish what we found.',
    researchLink: 'See how we measured this',
    method: 'We asked four AI assistants for agencies like us, 28 times, on one day, from Pune, in English, signed out.',
    limitation:
      '28 runs on one day, one location, signed out. Counts, not rates. No confidence interval is claimed and none is available. Two systems could not be tested at all.',
    runs: 28,
    systems: 4,
    named: 0,
    directories: 15, // published on /how-it-works: "directory sources appeared in 15 of them"
  },
  fit: {
    works:
      'A customer takes time to decide, one good enquiry is worth real money, and you are willing to let us measure the path properly.',
    worksTail: 'That last one is not negotiable.',
    poor: 'Demand has to be created from nothing, what you sell is bought on impulse or price alone, or you need the outcome guaranteed.',
  },
  close: {
    h: 'Two ways to start.',
    body: 'Write to us, or book a time to talk. Both reach the same place, and neither is a form for a salesperson to chase.',
  },
};
