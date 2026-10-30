import { contentfulGraphql, CONTENTFUL_REVALIDATE_SECONDS, getContentfulDeliveryConfig } from '@/lib/contentful/client';
import { GET_ALL_CASE_STUDIES_QUERY } from '@/lib/contentful/queries';
import { selectPublic, UNLISTED_CASE_STUDY_IDS } from '@/lib/case-study-eligibility';
import { orderStudies } from '@/lib/case-study-library';
import { isCaseStudyProofWithheld } from '@/lib/case-study-proof';
import { mapContentfulCaseStudyToCms, normalizeCaseStudySlug } from '@/lib/contentful/mappers';
import type {
  CmsCaseStudy,
  CmsCaseStudyCard,
  ContentfulCaseStudy,
} from '@/lib/contentful/types';

type CaseStudyCollectionResponse = {
  caseStudiesCollection?: {
    total?: number;
    items?: Array<ContentfulCaseStudy | null>;
  };
};

function filterNull<T>(items: Array<T | null | undefined>): T[] {
  return items.filter((item): item is T => Boolean(item));
}

/** Entries per GraphQL request. The whole set is read page by page, so more than 100 studies are never truncated. */
export const CASE_STUDY_FETCH_PAGE = 100;
/** Hard stop for the paging loop (10,000 entries), so a wrong `total` can never loop for ever. */
const MAX_FETCH_PAGES = 100;

/** Thrown when Contentful is configured but did not answer. See `fetchAllCaseStudiesRaw`. */
export class CaseStudyFetchError extends Error {}

/**
 * Every case study is fetched with the DELIVERY token only (never the Preview token), then passed through the one
 * eligibility rule in `lib/case-study-eligibility.ts`. Detail, listing, sitemap and static params all come from this
 * same filtered set, so they cannot disagree. Collisions need the whole set, so the detail page also reads the list.
 *
 * FAILURE (G7). With no Contentful configuration there is nothing to read and the result is empty, as before. With a
 * configuration, a failed or empty-data response now THROWS instead of returning no studies: an ISR regeneration that
 * throws keeps serving the last good page, so a Contentful outage no longer turns `/work` empty and the study pages
 * into 404s for a revalidate cycle; a build that cannot read Contentful fails instead of shipping an empty library.
 */
async function fetchAllCaseStudiesRaw(): Promise<CmsCaseStudy[]> {
  if (!getContentfulDeliveryConfig()) return [];
  const items: ContentfulCaseStudy[] = [];
  for (let page = 0; page < MAX_FETCH_PAGES; page += 1) {
    const data = await contentfulGraphql<CaseStudyCollectionResponse>(
      GET_ALL_CASE_STUDIES_QUERY,
      { limit: CASE_STUDY_FETCH_PAGE, skip: page * CASE_STUDY_FETCH_PAGE },
      CONTENTFUL_REVALIDATE_SECONDS,
      { deliveryOnly: true }
    );
    const collection = data?.caseStudiesCollection;
    if (!collection) throw new CaseStudyFetchError('[contentful] case studies could not be read');
    const batch = filterNull(collection.items || []);
    items.push(...batch);
    const total = typeof collection.total === 'number' ? collection.total : items.length;
    if (batch.length < CASE_STUDY_FETCH_PAGE || items.length >= total) break;
  }
  return filterNull(items.map(mapContentfulCaseStudyToCms));
}

/** The public studies in library order: listing priority first, then newest first-published (Contentful order). */
export async function fetchContentfulCaseStudies(): Promise<CmsCaseStudy[]> {
  return orderStudies(selectPublic(await fetchAllCaseStudiesRaw()), (s) => s.library.listingOrder);
}

export async function fetchContentfulCaseStudyBySlug(slug: string): Promise<CmsCaseStudy | null> {
  const route = normalizeCaseStudySlug(slug);
  const studies = await fetchContentfulCaseStudies();
  return studies.find((s) => s.slug === route) ?? null;
}

export async function fetchContentfulCaseStudySlugs(): Promise<string[]> {
  return Array.from(new Set((await fetchContentfulCaseStudies()).map((s) => s.slug)));
}

/**
 * The case studies offered for discovery: the sitemap's source. Unlisted studies (`UNLISTED_CASE_STUDY_IDS`) are left out;
 * their page stays public (HTTP 200) but is not advertised.
 */
export async function getCaseStudyListCards(): Promise<CmsCaseStudyCard[]> {
  const studies = (await fetchContentfulCaseStudies()).filter((s) => !UNLISTED_CASE_STUDY_IDS.has(s.id));
  return studies.map((study) => ({
    slug: study.slug,
    title: study.title,
    industry: study.industry,
    service: study.serviceLabel,
    /**
     * GATE R1. `highlightResult` is derived from the first "Results & Metrics"
     * entry or the first "Before & After" row, so the `/work` card would
     * otherwise republish the very figure the case-study page withholds. For a
     * listed case study the card shows no result line; nothing replaces it.
     * See `lib/case-study-proof.ts`.
     */
    result: isCaseStudyProofWithheld(study.slug) || study.layout === 'new' ? '' : study.highlightResult,
    summary: study.summary,
    href: study.href,
  }));
}

/**
 * The study after `slug` in the library's own order (the order `/work` shows), wrapping from the last back to the first.
 * Any public study can be next, legacy or new template. `null` when `slug` is the only public study.
 */
export async function getNextCaseStudy(slug: string): Promise<{ href: string; title: string; client: string } | null> {
  // unlisted studies are not offered as the next study (their own page still links on to a listed one)
  const studies = (await fetchContentfulCaseStudies()).filter((s) => s.slug === slug || !UNLISTED_CASE_STUDY_IDS.has(s.id));
  const i = studies.findIndex((s) => s.slug === slug);
  const next = i < 0 || studies.length < 2 ? null : studies[(i + 1) % studies.length];
  if (!next) return null;
  return { href: next.href, title: next.title, client: next.clientName.split(',')[0].trim() || next.title };
}

export async function getCaseStudyDetail(slug: string): Promise<CmsCaseStudy | null> {
  return fetchContentfulCaseStudyBySlug(slug);
}

export async function getCaseStudyStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await fetchContentfulCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export { CONTENTFUL_REVALIDATE_SECONDS };
