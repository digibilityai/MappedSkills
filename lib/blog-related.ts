import type { CmsBlogCard } from '@/lib/contentful/types';

/** At most this many related articles are shown, plus the link to the blog index. */
export const RELATED_LIMIT = 2;

const time = (c: CmsBlogCard) => Date.parse(c.publishedAtISO || '') || 0;
const updated = (c: CmsBlogCard) => Date.parse(c.updatedAtISO || '') || 0;

/**
 * Related articles for an article (R3): articles on the same topic first, then the rest, each group newest first (recorded publication date, then
 * update date; equal dates keep the list's own order); never the current article, never a duplicate, at most `RELATED_LIMIT`.
 * Pure: it only reorders the list the blog index already reads.
 */
export function selectRelated(current: { slug: string; categorySlug?: string; category?: string }, all: readonly CmsBlogCard[], limit = RELATED_LIMIT): CmsBlogCard[] {
  const seen = new Set<string>([current.slug]);
  const pool = all.filter((c) => (seen.has(c.slug) ? false : (seen.add(c.slug), true)));
  const sameTopic = (c: CmsBlogCard) => Boolean(current.categorySlug ? c.categorySlug === current.categorySlug : current.category && c.category === current.category);
  const newest = (list: CmsBlogCard[]) =>
    list
      .map((c, i) => ({ c, i }))
      .sort((a, b) => time(b.c) - time(a.c) || updated(b.c) - updated(a.c) || a.i - b.i)
      .map(({ c }) => c);
  return [...newest(pool.filter(sameTopic)), ...newest(pool.filter((c) => !sameTopic(c)))].slice(0, Math.max(0, limit));
}
