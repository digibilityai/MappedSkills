/**
 * C+ Blog (/blog): customer-facing copy of the owner-approved G1 design (docs/blog-redesign/g1/BL_G1_NOTES.md, mockup/;
 * BL-D2 hero, BL-D5 close, owner 2026-10-20). No new claims: the close reuses the approved /faq line "If we're not the
 * right fit, we'll say so." and its CTA pair (FQ-D4). Article titles, categories, excerpts and reading times come from
 * Contentful unchanged.
 */

export const BLOG = {
  crumb: 'Blog',
  kicker: 'Blog',
  h1: { a: 'Marketing guides,', b: 'written plainly.' },
  /* BL-D2: the em dash (spaced) is kept as approved. */
  lede: 'Practical reads on search, ads, content and turning website visits into enquiries — for business owners deciding what to do next.',
  /* The live empty-state wording, kept (G1 `?empty=1`). */
  empty: 'Nothing is published here yet.',
  count: (n: number) => `${n} ${n === 1 ? 'guide' : 'guides'}`,
  read: 'Read',

  close: {
    h: 'Reading about a problem you have?',
    body: 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.',
    primary: 'Tell us about your business',
    secondary: 'Request a call',
  },
} as const;
