// PINNED FIXTURE — verbatim copy of normalizeCaseStudySlug from lib/contentful/mappers.ts (lines 157-160) at a57fc25.
/** Strip accidental `portfolio/` prefix from CMS slugs for clean /portfolio/[slug] routes. */
export function normalizeCaseStudySlug(slug: string): string {
  return slug.replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');
}
