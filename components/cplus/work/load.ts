import { facets } from '@/lib/case-study-library';
import { fetchContentfulCaseStudies } from '@/lib/contentful/case-studies';
import { FEATURED_SLUG } from './content';
import { libraryPage, libraryStudies } from './studies';

/** The whole public library in its one order, and the filter options. Shared by `/work`, its pages and its index. */
export async function loadLibrary() {
  const all = libraryStudies(await fetchContentfulCaseStudies(), FEATURED_SLUG);
  return { all, facets: facets(all) };
}

/** Everything `WorkBody` needs for one page, or `null` when the page does not exist. */
export async function loadLibraryPage(page: number) {
  const { all, facets: f } = await loadLibrary();
  const p = libraryPage(all, page);
  if (page < 1 || page > p.pages) return null;
  const evidence = { figures: all.some((s) => s.figures > 0), outcomes: all.some((s) => s.outcomes.length > 0) };
  return { items: p.items, page, pages: p.pages, total: p.total, facets: f, evidence };
}
