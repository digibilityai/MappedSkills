/**
 * DEVELOPMENT-PREVIEW ONLY. A presentation override so the founder can review a requested title before Contentful is
 * changed. It applies only when `NODE_ENV === 'development'` (the local preview server); `next build`, `next start`,
 * the tests and every deployment ignore it, so it can never reach production. It changes the text only: the slug, the
 * address, the figures and every other field still come from Contentful.
 *
 * Remove this file (and its call in `lib/contentful/mappers.ts`) once the title is updated in Contentful.
 * Om Sai: the Contentful title is "Meta ads for a Chembur housing developer"; requested 2026-10-29 (Stage 3 revision).
 */
const PREVIEW_TITLES: Record<string, string> = {
  'om-sai-developer-meta-ads': 'Meta ads for a real estate developer in Mumbai',
};

export function previewTitle(contentfulSlug: string, title: string): string {
  if (process.env.NODE_ENV !== 'development') return title;
  return PREVIEW_TITLES[contentfulSlug.trim()] ?? title;
}
