/**
 * `/work` copy: the owner-approved G1 R3 design (docs/work-redesign/g1-r3/WORK_G1_R3_NOTES.md), with the close body
 * and CTA labels from the G2 brief. Case-study facts are not here: they come from Contentful (see `studies.ts`).
 */
export const WORK = {
  crumb: 'Case studies',
  hero: {
    h1: { a: 'Real work.', b: 'Judge it for yourself.' },
    lede: 'Explore the challenges businesses brought to us, what we changed, and how we approached the work.',
  },
  /** The orientation line under the hero, shown only when the published studies actually state figures or outcomes. */
  key: {
    figures: 'Figures are shown with their metric, period and source, as our team recorded them.',
    outcomes: 'Documented outcomes are shown with their evidence basis.',
  },
  labels: {
    featured: 'Featured case study',
    challenge: 'The challenge',
    outcome: 'Outcome',
    changed: 'What we changed',
    outcomes: 'What changed',
    figures: 'Reported figures',
    documented: 'Documented outcomes',
    read: 'Read the case study',
  },
  /** G7 library controls. Labels only; the studies, counts and options come from Contentful. */
  library: {
    controls: 'Find a case study',
    search: 'Search case studies',
    searchHint: 'Search by client, industry or problem',
    industry: 'Industry',
    anyIndustry: 'All industries',
    service: 'Service',
    anyService: 'All services',
    more: 'More case studies',
    status: 'Matching case studies',
    clear: 'Clear filters',
    showAll: 'Show all case studies',
    noMatch: 'No case studies match your search.',
    noMatchHint: 'Try fewer words, or clear the filters to see every case study.',
    none: 'No case studies are published at the moment.',
    loading: 'Loading case studies…',
    failed: 'Search is unavailable right now. Every case study is still listed on the numbered pages below.',
    pages: 'Case study pages',
    prev: 'Previous',
    next: 'Next',
  },
  note: {
    body: 'We share what we did and what we can substantiate. Where results aren’t independently verified, we don’t present them as proven outcomes.',
  },
  /** THE RESOLVE Stage 3 (proposal for founder review): chapter labels, the hero route and the evidence rules. */
  resolve: {
    route: {
      k: 'Every case study follows the same route',
      steps: [
        { b: 'The challenge', t: 'What the business brought to us' },
        { b: 'What we did', t: 'The decisions and the work' },
        { b: 'What changed', t: 'Only what we can substantiate' },
      ],
      cap: 'How each case study is organised. It shows no results.',
    },
    featured: { ch: 'Start here', a: 'One story,', b: 'told end to end.' },
    library: { ch: 'The library', a: 'Every case study,', b: 'in one place.' },
    evidence: { ch: 'Our evidence rule', a: 'Good work', b: 'deserves honest evidence.' },
    rules: {
      figures: 'Figures keep their context',
      outcomes: 'Outcomes show their basis',
      art: 'Artwork is labelled',
      artBody: 'Where a case study uses conceptual artwork, the card says so beneath the image.',
    },
    count: (n: number) => `${n} published case ${n === 1 ? 'study' : 'studies'}`,
  },
  close: {
    kicker: 'Have a problem like these?',
    h: 'Tell us what you’re trying to fix.',
    body: 'Tell us what you’re working towards. We’ll help you figure out where to start.',
    primary: 'Contact us',
    secondary: 'Request a call',
  },
} as const;

/** The featured study (R2-D2: the only named B2B client, with the richest published detail). If it is not
    published, the first study in Contentful order is featured instead. */
export const FEATURED_SLUG = 'seo-ameba-software';
