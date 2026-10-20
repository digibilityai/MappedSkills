/**
 * C+ blog article template (`/blog/[slug]`): template copy of the owner-approved BL-D6 G1 design
 * (docs/blog-redesign/bl-d6/g1/BL_D6_G1_NOTES.md; G2 authorised 2026-10-20). Article wording — titles, excerpts,
 * categories, body, author names and dates — comes from Contentful unchanged.
 *
 * The close is the approved `/blog` close (DEC-066 BL-D5), as the owner directed for G2: same heading, body and CTA
 * pair ("Tell us about your business" → /contact, "Request a call" → /schedule-call). No new claims, no "book", no
 * duration, no "free".
 */
export const ARTICLE = {
  crumb: { home: 'Home', blog: 'Blog' },
  by: 'By',
  updated: 'Updated',
  published: 'Published',
  contents: 'In this article',
  sections: (n: number) => `${n} ${n === 1 ? 'section' : 'sections'}`,
  related: 'Related service',
  share: 'Share this article',
  copy: 'Copy link',
  copied: 'Link copied',
  newTab: ' (opens in a new tab)',
  more: 'More on this topic',
  read: 'Read',

  close: {
    h: 'Reading about a problem you have?',
    body: 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.',
    primary: 'Tell us about your business',
    secondary: 'Request a call',
  },
} as const;
