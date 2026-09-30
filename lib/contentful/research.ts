import { contentfulGraphql, CONTENTFUL_REVALIDATE_SECONDS } from '@/lib/contentful/client';
import {
  GET_ALL_RESEARCH_CATEGORIES_QUERY,
  GET_ALL_RESEARCH_REPORTS_QUERY,
  GET_FEATURED_RESEARCH_REPORTS_QUERY,
  GET_LATEST_RESEARCH_FINDINGS_QUERY,
  GET_RESEARCH_CATEGORY_BY_SLUG_QUERY,
  GET_RESEARCH_CATEGORY_SLUGS_QUERY,
  GET_RESEARCH_REPORT_BY_SLUG_QUERY,
  GET_RESEARCH_REPORT_SLUGS_QUERY,
  GET_RESEARCH_REPORTS_BY_CATEGORY_QUERY,
} from '@/lib/contentful/queries';
import {
  mapContentfulCategoryToCms,
  mapContentfulFindingToCms,
  mapContentfulReportToCard,
  mapContentfulReportToCms,
} from '@/lib/contentful/mappers';
import type {
  CmsResearchCard,
  CmsResearchCategory,
  CmsResearchFinding,
  CmsResearchReport,
  ContentfulResearchCategory,
  ContentfulResearchFinding,
  ContentfulResearchReport,
} from '@/lib/contentful/types';

type ReportCollectionResponse = {
  researchReportCollection?: {
    total?: number;
    items?: Array<ContentfulResearchReport | null>;
  };
};

type CategoryCollectionResponse = {
  researchCategoryCollection?: {
    items?: Array<ContentfulResearchCategory | null>;
  };
};

type FindingCollectionResponse = {
  researchFindingCollection?: {
    items?: Array<
      | (ContentfulResearchFinding & {
          linkedFrom?: {
            researchReportCollection?: {
              items?: Array<{ slug?: string | null; title?: string | null } | null>;
            };
          };
        })
      | null
    >;
  };
};

function filterNull<T>(items: Array<T | null | undefined>): T[] {
  return items.filter((item): item is T => Boolean(item));
}

export async function getResearchListCards(limit = 100): Promise<CmsResearchCard[]> {
  const data = await contentfulGraphql<ReportCollectionResponse>(
    GET_ALL_RESEARCH_REPORTS_QUERY,
    { limit },
    CONTENTFUL_REVALIDATE_SECONDS
  );
  return filterNull((data?.researchReportCollection?.items || []).map(mapContentfulReportToCard));
}

export async function getFeaturedResearchCards(limit = 6): Promise<CmsResearchCard[]> {
  const data = await contentfulGraphql<ReportCollectionResponse>(
    GET_FEATURED_RESEARCH_REPORTS_QUERY,
    { limit },
    CONTENTFUL_REVALIDATE_SECONDS
  );
  return filterNull((data?.researchReportCollection?.items || []).map(mapContentfulReportToCard));
}

export async function getResearchReportBySlug(slug: string): Promise<CmsResearchReport | null> {
  const data = await contentfulGraphql<ReportCollectionResponse>(
    GET_RESEARCH_REPORT_BY_SLUG_QUERY,
    { slug, limit: 1 },
    CONTENTFUL_REVALIDATE_SECONDS
  );
  const item = data?.researchReportCollection?.items?.[0];
  if (!item) return null;
  return mapContentfulReportToCms(item);
}

export async function getResearchReportsByCategory(categorySlug: string): Promise<CmsResearchCard[]> {
  const data = await contentfulGraphql<ReportCollectionResponse>(
    GET_RESEARCH_REPORTS_BY_CATEGORY_QUERY,
    { categorySlug, limit: 100 },
    CONTENTFUL_REVALIDATE_SECONDS
  );
  return filterNull((data?.researchReportCollection?.items || []).map(mapContentfulReportToCard));
}

export async function getResearchCategories(): Promise<CmsResearchCategory[]> {
  const data = await contentfulGraphql<CategoryCollectionResponse>(
    GET_ALL_RESEARCH_CATEGORIES_QUERY,
    { limit: 20 },
    CONTENTFUL_REVALIDATE_SECONDS
  );
  return filterNull((data?.researchCategoryCollection?.items || []).map(mapContentfulCategoryToCms));
}

export async function getResearchCategoryBySlug(slug: string): Promise<CmsResearchCategory | null> {
  const data = await contentfulGraphql<CategoryCollectionResponse>(
    GET_RESEARCH_CATEGORY_BY_SLUG_QUERY,
    { slug, limit: 1 },
    CONTENTFUL_REVALIDATE_SECONDS
  );
  const item = data?.researchCategoryCollection?.items?.[0];
  if (!item) return null;
  return mapContentfulCategoryToCms(item);
}

export async function getLatestResearchFindings(limit = 6): Promise<CmsResearchFinding[]> {
  const data = await contentfulGraphql<FindingCollectionResponse>(
    GET_LATEST_RESEARCH_FINDINGS_QUERY,
    { limit },
    CONTENTFUL_REVALIDATE_SECONDS
  );

  return filterNull(data?.researchFindingCollection?.items || [])
    .filter((item) =>
      Boolean(item.linkedFrom?.researchReportCollection?.items?.some((report) => report?.slug))
    )
    .map(mapContentfulFindingToCms)
    .filter((item): item is CmsResearchFinding => Boolean(item));
}

export async function getResearchStaticParams(): Promise<Array<{ slug: string }>> {
  const [reports, categories] = await Promise.all([
    contentfulGraphql<ReportCollectionResponse>(GET_RESEARCH_REPORT_SLUGS_QUERY, { limit: 100 }),
    contentfulGraphql<CategoryCollectionResponse>(GET_RESEARCH_CATEGORY_SLUGS_QUERY, { limit: 20 }),
  ]);

  const slugs = new Set<string>();
  for (const item of filterNull(reports?.researchReportCollection?.items || [])) {
    if (item.slug) slugs.add(item.slug);
  }
  for (const item of filterNull(categories?.researchCategoryCollection?.items || [])) {
    if (item.slug) slugs.add(item.slug);
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export type ResearchSlugResolution =
  | { kind: 'report'; report: CmsResearchReport }
  | { kind: 'category'; category: CmsResearchCategory; reports: CmsResearchCard[] };

export async function resolveResearchSlug(slug: string): Promise<ResearchSlugResolution | null> {
  const report = await getResearchReportBySlug(slug);
  if (report) return { kind: 'report', report };

  const category = await getResearchCategoryBySlug(slug);
  if (!category) return null;
  const reports = await getResearchReportsByCategory(slug);
  return { kind: 'category', category, reports };
}
