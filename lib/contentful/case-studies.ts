import { contentfulGraphql, CONTENTFUL_REVALIDATE_SECONDS } from '@/lib/contentful/client';
import { GET_ALL_CASE_STUDIES_QUERY } from '@/lib/contentful/queries';
import { selectPublic } from '@/lib/case-study-eligibility';
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

/**
 * Every case study is fetched with the DELIVERY token only (never the Preview token), then passed through the one
 * eligibility rule in `lib/case-study-eligibility.ts`. Detail, listing, sitemap and static params all come from this
 * same filtered set, so they cannot disagree. Collisions need the whole set, so the detail page also reads the list.
 */
async function fetchAllCaseStudiesRaw(limit = 100): Promise<CmsCaseStudy[]> {
  const data = await contentfulGraphql<CaseStudyCollectionResponse>(
    GET_ALL_CASE_STUDIES_QUERY,
    { limit },
    CONTENTFUL_REVALIDATE_SECONDS,
    { deliveryOnly: true }
  );

  const items = filterNull(data?.caseStudiesCollection?.items || []);
  return filterNull(items.map(mapContentfulCaseStudyToCms));
}

export async function fetchContentfulCaseStudies(limit = 100): Promise<CmsCaseStudy[]> {
  return selectPublic(await fetchAllCaseStudiesRaw(limit));
}

export async function fetchContentfulCaseStudyBySlug(slug: string): Promise<CmsCaseStudy | null> {
  const route = normalizeCaseStudySlug(slug);
  const studies = await fetchContentfulCaseStudies();
  return studies.find((s) => s.slug === route) ?? null;
}

export async function fetchContentfulCaseStudySlugs(): Promise<string[]> {
  return Array.from(new Set((await fetchContentfulCaseStudies()).map((s) => s.slug)));
}

export async function getCaseStudyListCards(): Promise<CmsCaseStudyCard[]> {
  const studies = await fetchContentfulCaseStudies();
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

export async function getCaseStudyDetail(slug: string): Promise<CmsCaseStudy | null> {
  return fetchContentfulCaseStudyBySlug(slug);
}

export async function getCaseStudyStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await fetchContentfulCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export { CONTENTFUL_REVALIDATE_SECONDS };
