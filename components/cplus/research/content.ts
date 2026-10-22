/**
 * `/research` copy: the owner-approved G1 design (docs/research-redesign/g1/RS_G1_NOTES.md, R1), with the owner's close.
 * Research facts are not here: statistics, headlines, descriptions, samples, sources, dates and the report all come from
 * Contentful. The only finding-specific lines are `LEAD_NOTES`: plain-English reading written for one published finding,
 * shown only beside that exact headline, and dropped (not reused) if the lead finding changes.
 */
export const RESEARCH = {
  crumb: 'Research',
  hero: {
    h1: { a: 'We look at real business websites.', b: 'Then we publish what we find.' },
    lede: 'MappedSkills Research looks at how businesses are found, measured and converted. Every report says what we checked, when, how many, and where the evidence stops.',
    latest: 'Latest report',
  },
  lead: { kicker: 'The headline finding' },
  more: { kicker: 'From the same study', h: 'What else we found.', sample: 'Sample', source: 'Source' },
  report: {
    kicker: 'The full report',
    read: 'Read the full report',
    methodology: 'Methodology',
    limitations: 'Limitations',
    facts: { published: 'Published', period: 'Research period', geography: 'Geography', sample: 'Sample size', category: 'Category', author: 'Author' },
    more: 'More research',
    areas: 'Research areas',
  },
  method: {
    kicker: 'How we work',
    h: { a: 'What we checked.', b: 'What we can’t claim.' },
    steps: [
      { t: 'What we looked at', d: 'The sample, where there is one.' },
      { t: 'When and where', d: 'The period and the geography each report covers.' },
      { t: 'Where it stops', d: 'The limits of what we saw. Findings are never restated as guarantees.' },
    ],
  },
  media: {
    h: 'For journalists',
    body: 'For media enquiries, embargoed materials, or comment, email',
    tail: 'or use the contact form.',
    subject: 'Media enquiry: MappedSkills Research',
    link: 'Media enquiry',
  },
  empty: {
    h: 'Nothing is published here yet.',
    body: 'When a research report is published, it will appear on this page.',
  },
  figure: {
    marked: (statistic: string) => `the ${statistic} in this finding`,
    rest: 'the other websites audited',
    /** Built from the drawn values only, so it cannot disagree with the figure. */
    cap: (cols: number, rest: number) =>
      `Each square is one audited website. Each row of ${cols} is one tenth of the sample. The ${rest} plain squares are every other website audited, as described in the finding.`,
  },
  close: {
    h: 'Not sure what your marketing is actually measuring?',
    body: 'We can help you understand what’s visible, what’s missing and what to look at next.',
    primary: 'Talk to MappedSkills',
    secondary: 'Request a call',
  },
} as const;

/** Reading notes and the figure's key wording for one published finding, matched on its exact Contentful headline. Words
    only: no figure is stored here. */
export const LEAD_NOTES: Record<string, { means: string; notMeans: string; marked: string }> = {
  'More than 4 in 10 audited websites had no observable Google Analytics.': {
    means: 'If your website can’t see where visitors come from, it’s hard to tell which marketing brings enquiries.',
    notMeans: 'It doesn’t mean these businesses had no measurement at all. Some may use tools that can’t be seen from outside.',
    marked: 'no observable Google Analytics',
  },
};
