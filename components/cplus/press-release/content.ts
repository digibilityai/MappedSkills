/**
 * `/press/[slug]` copy: the owner-approved Press Detail G1 design (docs/press-redesign/detail-g1/). Labels and headings only.
 * No statistic, sample, source, date, name or sentence of any release is here: all of that is Contentful data rendered as
 * published, so the template carries nothing specific to any one release.
 */
export const RELEASE = {
  /* "Research" is shown only when the release has related research (structured data), never from the article's prose. */
  kicker: { research: 'MappedSkills Research', general: 'MappedSkills' },
  kickerKind: 'Press release',
  facts: { published: 'Published', related: 'Related research', author: 'Author' },
  evidence: {
    h: 'The evidence in brief',
    sample: 'Sample',
    source: 'Source',
    note: 'Each figure describes only the sample named beneath it.',
    method: 'How the research was done',
  },
  intro: 'The release',
  media: { h: 'Media assets', fallback: 'Media asset' },
  author: { h: 'Author', profile: 'About the author' },
  close: {
    kicker: 'Read next',
    primary: 'Read the complete research report',
    fallbackKicker: 'More from the newsroom',
    fallbackH: 'All MappedSkills press releases.',
    fallbackPrimary: 'See all press releases',
  },
  press: {
    h: 'Press enquiries',
    body: 'Writing about this release? Email',
    tail: 'for comment or background.',
    link: 'Contact MappedSkills',
    subject: 'Media enquiry: ',
  },
  article: 'Press release text',
} as const;
