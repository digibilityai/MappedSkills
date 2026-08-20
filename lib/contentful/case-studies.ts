import { contentfulGraphql, CONTENTFUL_REVALIDATE_SECONDS } from '@/lib/contentful/client';
import {
  GET_ALL_CASE_STUDIES_QUERY,
  GET_CASE_STUDY_BY_SLUG_QUERY,
  GET_CASE_STUDY_SLUGS_QUERY,
} from '@/lib/contentful/queries';
import {
  caseStudySlugCandidates,
  mapContentfulCaseStudyToCms,
  normalizeCaseStudySlug,
} from '@/lib/contentful/mappers';
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

export async function fetchContentfulCaseStudies(limit = 100): Promise<CmsCaseStudy[]> {
  const data = await contentfulGraphql<CaseStudyCollectionResponse>(
    GET_ALL_CASE_STUDIES_QUERY,
    { limit },
    CONTENTFUL_REVALIDATE_SECONDS
  );

  const items = filterNull(data?.caseStudiesCollection?.items || []);
  return filterNull(items.map(mapContentfulCaseStudyToCms));
}

export async function fetchContentfulCaseStudyBySlug(slug: string): Promise<CmsCaseStudy | null> {
  const slugs = caseStudySlugCandidates(slug);
  const data = await contentfulGraphql<CaseStudyCollectionResponse>(
    GET_CASE_STUDY_BY_SLUG_QUERY,
    { slugs, limit: 1 },
    CONTENTFUL_REVALIDATE_SECONDS
  );

  const item = data?.caseStudiesCollection?.items?.[0];
  if (!item) return null;
  return mapContentfulCaseStudyToCms(item);
}

export async function fetchContentfulCaseStudySlugs(): Promise<string[]> {
  const data = await contentfulGraphql<CaseStudyCollectionResponse>(
    GET_CASE_STUDY_SLUGS_QUERY,
    { limit: 100 },
    CONTENTFUL_REVALIDATE_SECONDS
  );

  const slugs = filterNull(data?.caseStudiesCollection?.items || [])
    .map((item) => item.slug)
    .filter((s): s is string => Boolean(s))
    .map(normalizeCaseStudySlug)
    .filter(Boolean);

  return Array.from(new Set(slugs));
}

export async function getCaseStudyListCards(): Promise<CmsCaseStudyCard[]> {
  const studies = await fetchContentfulCaseStudies();
  return studies.map((study) => ({
    slug: study.slug,
    title: study.title,
    industry: study.industry,
    service: study.serviceLabel,
    result: study.highlightResult,
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
