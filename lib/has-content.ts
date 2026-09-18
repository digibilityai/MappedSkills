import type { ReactNode } from 'react';

/**
 * Does this node carry anything a reader would perceive?
 *
 * WHY THIS EXISTS. `main` (`de16f5c` lineage) passed `title=""` and `lede=""`
 * to `CommercialHero` on seven commercial routes and placed a hand-written
 * `<h1>` in the children instead. The hero rendered the empty strings
 * faithfully, so production served an EMPTY `<h1>`, an empty lede `<p>` and a
 * second `<h1>` on `/services`, `/seo`, `/ai-seo`, `/google-ads`,
 * `/social-media-ads`, `/conversion-optimization` and `/lead-generation`.
 *
 * The openers now render a heading or a lede only when this returns true, so
 * an empty prop produces no element at all rather than an empty landmark.
 * `scripts/verify-build-output.cjs` separately fails the build if any
 * prerendered page does not have exactly one non-empty `<h1>`.
 */
export function hasContent(node: ReactNode): boolean {
  if (node === null || node === undefined || typeof node === 'boolean') return false;
  if (typeof node === 'string') return node.trim().length > 0;
  if (Array.isArray(node)) return node.some(hasContent);
  return true;
}
