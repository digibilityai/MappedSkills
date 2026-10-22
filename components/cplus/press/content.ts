/**
 * `/press` copy: the owner-approved G1 design (docs/press-redesign/g1/PR_G1_PROPOSAL.md). Press releases themselves are
 * Contentful data, rendered as published. Nothing here is an announcement, quote, coverage or downloadable asset.
 */
export const PRESS = {
  crumb: 'Press',
  hero: {
    h1: { a: 'News from MappedSkills,', b: 'on the record.' },
    lede: 'Our press releases and announcements, newest first. Writing a story? Email us for comment or background.',
    contact: 'Media contact',
    reach: 'How to reach us',
  },
  news: {
    kicker: 'Press releases',
    h: 'Latest news.',
    empty: {
      h: 'No press releases yet.',
      body: 'When we publish one, it will appear here with its date, newest first.',
      until: 'Until then, our published work is our research.',
      link: 'See MappedSkills Research',
    },
  },
  background: {
    kicker: 'Background',
    h: { a: 'Useful for', b: 'your story.' },
    tiles: [
      {
        label: 'Original research',
        title: 'MappedSkills Research',
        body: 'What we checked, how many, when, and where the evidence stops.',
        cta: 'See the research →',
        href: '/research',
      },
      {
        label: 'The company',
        title: 'About MappedSkills',
        body: 'What we do, how we work and what we promise our clients.',
        cta: 'About us →',
        href: '/about',
      },
    ],
  },
  media: {
    id: 'pr-media',
    h: 'Working on a story? Talk to us.',
    body: 'Email us for comment or background. Tell us your publication and your deadline.',
    primary: 'Email a media enquiry',
    secondary: 'Use the contact form',
    /** Unchanged from the existing page. */
    subject: 'Media enquiry: MappedSkills',
  },
} as const;
