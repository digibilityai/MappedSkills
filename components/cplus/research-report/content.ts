/**
 * `/research/[slug]` report copy: the owner-approved Research Report G1 R1 design (docs/research-redesign/report-g1/,
 * RR_G1_PROPOSAL.md). Research facts are not here: every statistic, sample, source, date, caveat and sentence of the
 * report is Contentful data rendered as published. These are labels and headings only (proposal §4).
 */
export const REPORT = {
  kickerPrefix: 'Research report',
  facts: { author: 'Author', published: 'Published', period: 'Research period', geography: 'Geography', sample: 'Sample size', id: 'Research ID' },
  jump: { label: 'Jump to', findings: 'Key findings', methodology: 'Methodology', limitations: 'Limitations', cite: 'Cite this report' },
  findings: { kicker: 'Key findings', h: 'What the research found.', sample: 'Sample', source: 'Source' },
  rail: 'On this page',
  summary: { kicker: 'The full report', h: 'Executive summary', rail: 'Executive summary', article: 'The full report' },
  chart: { published: 'Published chart', open: 'Open the chart image' },
  note: 'Note',
  bars: 'Bar scale: 0 to 100%',
  method: { kicker: 'Methodology', h: 'How the audit was done.' },
  limits: { kicker: 'Limitations', h: { a: 'What this study', b: 'can’t tell you.' } },
  cite: { kicker: 'Cite this report', h: 'How to reference this report.', canonical: 'Canonical URL:', author: 'Author', copyCitation: 'Copy citation', copyLink: 'Copy link', citationCopied: 'Citation copied', linkCopied: 'Link copied' },
  downloads: { kicker: 'Downloads', h: 'Files published with this report.' },
  related: { kicker: 'Related research' },
  media: {
    h: 'For journalists',
    body: 'For media enquiries, embargoed materials, or comment, email',
    tail: 'or use the contact form.',
    link: 'Media enquiry',
  },
  close: {
    h: 'Not sure what your marketing is actually measuring?',
    body: 'We can help you understand what’s visible, what’s missing and what to look at next.',
    primary: 'Talk to MappedSkills',
    secondary: 'Request a call',
    tertiary: 'How conversion work starts',
  },
} as const;
