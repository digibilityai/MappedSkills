import { BLOCKS, type Document, type TopLevelBlock } from '@contentful/rich-text-types';
import { format, parseISO, isValid } from 'date-fns';
import type {
  CmsBlogCard,
  CmsBlogPost,
  CmsCaseStudy,
  CmsCaseStudyCard,
  CmsFileAsset,
  CmsPressCard,
  CmsPressRelease,
  CmsResearchCard,
  CmsResearchCategory,
  CmsResearchFinding,
  CmsResearchReport,
  ContentfulAsset,
  ContentfulCaseStudy,
  ContentfulEmbeddedEntry,
  ContentfulPost,
  ContentfulPressRelease,
  ContentfulResearchCategory,
  ContentfulResearchFinding,
  ContentfulResearchReport,
  CTAType,
  TocItem,
} from '@/lib/contentful/types';
import {
  excerptFromDocument,
  firstHighlightFromSections,
  parseCaseStudyContent,
  serviceLabelFromSections,
} from '@/lib/contentful/case-study-sections';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';

export function formatContentfulDate(iso?: string | null): string {
  if (!iso) return '';
  const date = parseISO(iso);
  if (!isValid(date)) return '';
  return format(date, 'MMMM d, yyyy');
}

function collectText(node: { content?: Array<{ nodeType?: string; value?: string; content?: unknown[] }> } | null | undefined): string {
  if (!node?.content) return '';
  return node.content
    .map((child) => {
      if (child.nodeType === 'text') return child.value || '';
      return collectText(child as typeof node);
    })
    .join('');
}

export function extractTocFromDocument(document?: Document | null): TocItem[] {
  if (!document?.content) return [];

  const items: TocItem[] = [];
  let index = 0;

  for (const block of document.content as TopLevelBlock[]) {
    if (block.nodeType === BLOCKS.HEADING_2 || block.nodeType === BLOCKS.HEADING_3) {
      const text = collectText(block).trim();
      if (!text) continue;
      items.push({
        id: `section-${index}`,
        text,
        level: block.nodeType === BLOCKS.HEADING_2 ? 2 : 3,
      });
      index += 1;
    }
  }

  return items;
}

export function estimateReadingTime(document?: Document | null, fallbackText = ''): string {
  const text = document ? collectText(document) : fallbackText;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function mapCategoryToCtaType(categoryName?: string | null): CTAType {
  const value = (categoryName || '').toLowerCase();
  if (value.includes('google')) return 'google-ads';
  if (value.includes('social') || value.includes('meta') || value.includes('facebook') || value.includes('linkedin')) {
    return 'social-ads';
  }
  if (value.includes('lead')) return 'lead-gen';
  if (value.includes('seo')) return 'seo';
  if (value.includes('conversion') || value.includes('cro')) return 'cro';
  return 'generic';
}

export function mapContentfulPostToCms(post: ContentfulPost): CmsBlogPost | null {
  if (!post.slug || !post.title) return null;

  const firstPublished = post.sys.firstPublishedAt || post.sys.publishedAt || '';
  const lastPublished = post.sys.publishedAt || post.sys.firstPublishedAt || '';
  const publishedDate = formatContentfulDate(firstPublished) || 'Draft';
  const updatedDate = formatContentfulDate(lastPublished) || 'Draft';
  const contentJson = post.content?.json ?? null;
  const tableOfContents = extractTocFromDocument(contentJson);
  const featuredImageUrl = post.featuredImage?.url || '';
  const featuredImageAlt =
    post.featuredImage?.description ||
    post.featuredImage?.title ||
    post.title;

  const excerpt = post.excerpt?.trim() || '';
  const authorName = post.author?.name?.trim() || 'MappedSkills';

  return {
    slug: post.slug,
    title: post.title,
    excerpt,
    category: post.category?.name?.trim() || 'Marketing Strategy',
    categorySlug: post.category?.slug || undefined,
    author: {
      name: authorName,
      description: post.author?.description || undefined,
      profileUrl: post.author?.profile?.url || undefined,
    },
    publishedDate,
    updatedDate,
    publishedAtISO: firstPublished,
    updatedAtISO: lastPublished,
    readingTime: estimateReadingTime(contentJson, excerpt),
    featuredImageUrl,
    featuredImageAlt,
    tableOfContents,
    contentJson,
    contentLinks: post.content?.links,
    ctaType: mapCategoryToCtaType(post.category?.name),
    metaTitle: post.seoTitle?.trim() || post.title,
    metaDescription: excerpt,
    focusKeyword: post.keyword?.trim() || '',
    openGraphImage: featuredImageUrl,
    canonicalUrl: `${SITE_URL}/blog/${post.slug}`,
  };
}

export function mapContentfulPostToCard(post: ContentfulPost): CmsBlogCard | null {
  const mapped = mapContentfulPostToCms(post);
  if (!mapped) return null;

  return {
    slug: mapped.slug,
    title: mapped.title,
    excerpt: mapped.excerpt,
    category: mapped.category,
    readingTime: mapped.readingTime,
    publishedDate: mapped.publishedDate,
    href: `/blog/${mapped.slug}`,
    author: mapped.author.name,
  };
}

/** Strip accidental `portfolio/` prefix from CMS slugs for clean /portfolio/[slug] routes. */
export function normalizeCaseStudySlug(slug: string): string {
  return slug.replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');
}

export function caseStudySlugCandidates(routeSlug: string): string[] {
  const normalized = normalizeCaseStudySlug(routeSlug);
  const candidates = [normalized, `portfolio/${normalized}`];
  return Array.from(new Set(candidates));
}

export function mapContentfulCaseStudyToCms(entry: ContentfulCaseStudy): CmsCaseStudy | null {
  if (!entry.slug || !entry.title) return null;

  const contentfulSlug = entry.slug.trim();
  const slug = normalizeCaseStudySlug(contentfulSlug);
  if (!slug) return null;

  const sections = parseCaseStudyContent(entry.content?.json ?? null);
  const industry = entry.industry?.name?.trim() || '';
  const summary =
    excerptFromDocument(sections.problemStatement) ||
    excerptFromDocument(sections.businessGoals) ||
    entry.audience?.audience?.trim() ||
    '';

  const highlightResult = firstHighlightFromSections(sections);
  const serviceLabel = serviceLabelFromSections(sections);
  const reviewName = entry.review?.name?.trim() || '';
  const reviewQuote = entry.review?.testimonial?.trim() || '';

  return {
    id: entry.sys.id,
    slug,
    contentfulSlug,
    title: entry.title.trim(),
    clientName: entry.clientName?.clientName?.trim() || '',
    clientDate: entry.clientName?.date?.trim() || '',
    industry,
    companySize: entry.size?.size?.trim() || '',
    audience: entry.audience?.audience?.trim() || '',
    targetArea: entry.targetArea?.target?.trim() || '',
    sections,
    review:
      reviewName || reviewQuote
        ? { name: reviewName || 'Client', quote: reviewQuote }
        : undefined,
    conclusionJson: entry.conclusion?.json ?? null,
    serviceLabel,
    highlightResult,
    summary,
    href: `/portfolio/${slug}`,
    metaTitle: `${entry.title.trim()} | Case Study | MappedSkills`,
    metaDescription:
      summary ||
      highlightResult ||
      `Case study: ${entry.title.trim()}${industry ? ` — ${industry}` : ''}`,
  };
}

export function mapContentfulCaseStudyToCard(entry: ContentfulCaseStudy): CmsCaseStudyCard | null {
  const mapped = mapContentfulCaseStudyToCms(entry);
  if (!mapped) return null;

  return {
    slug: mapped.slug,
    title: mapped.title,
    industry: mapped.industry,
    service: mapped.serviceLabel,
    result: mapped.highlightResult,
    summary: mapped.summary,
    href: mapped.href,
  };
}

function isImageAsset(asset: Pick<ContentfulAsset, 'url' | 'contentType'>): boolean {
  if (asset.contentType?.startsWith('image/')) return true;
  const url = asset.url || '';
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(url);
}

export function mapContentfulAssetToFile(asset?: ContentfulAsset | null): CmsFileAsset | undefined {
  if (!asset?.url) return undefined;
  return {
    url: asset.url,
    title: asset.title?.trim() || asset.fileName?.trim() || 'Download',
    description: asset.description?.trim() || undefined,
    fileName: asset.fileName || undefined,
    contentType: asset.contentType || undefined,
    isImage: isImageAsset(asset),
    width: asset.width || undefined,
    height: asset.height || undefined,
  };
}

export function isDocumentPopulated(document?: Document | null): boolean {
  if (!document) return false;
  return collectText(document).trim().length > 0;
}

export function mapContentfulFindingToCms(
  finding?: ContentfulResearchFinding | ContentfulEmbeddedEntry | null
): CmsResearchFinding | null {
  if (!finding) return null;
  const headline =
    finding.findingHeadline?.trim() ||
    finding.internalName?.trim() ||
    finding.statistic?.trim() ||
    '';
  if (!headline) return null;

  const chart = mapContentfulAssetToFile(finding.chartImage);
  if (chart && finding.chartAltText?.trim()) {
    chart.description = finding.chartAltText.trim();
  }

  return {
    id: finding.sys?.id || headline,
    statistic: finding.statistic?.trim() || undefined,
    headline,
    description: finding.description?.trim() || undefined,
    explanationJson: finding.explanation?.json ?? null,
    explanationLinks: finding.explanation?.links,
    chart,
    baseSample: finding.baseSample?.trim() || undefined,
    sourceNote: finding.sourceNote?.trim() || undefined,
  };
}

export function mapContentfulCategoryToCms(
  category?: ContentfulResearchCategory | null
): CmsResearchCategory | null {
  if (!category) return null;
  const name = category.researchCategoryName?.trim();
  const slug = category.slug?.trim();
  if (!name || !slug) return null;

  const description = category.description?.trim() || undefined;
  return {
    name,
    slug,
    description,
    seoTitle: category.seoTitle?.trim() || `${name} | MappedSkills Research`,
    metaDescription: category.metaDescription?.trim() || description || `${name} research from MappedSkills.`,
    featuredImage: mapContentfulAssetToFile(category.featuredImage),
    href: `/research/${slug}`,
    canonicalUrl: `${SITE_URL}/research/${slug}`,
  };
}

export function mapContentfulReportToCard(
  report?: ContentfulResearchReport | { title?: string | null; slug?: string | null; excerpt?: string | null; researchCategory?: ContentfulResearchCategory | null; sys?: { firstPublishedAt?: string | null } } | null
): CmsResearchCard | null {
  if (!report) return null;
  const slug = report.slug?.trim();
  const title = report.title?.trim();
  if (!slug || !title) return null;

  const firstPublished = 'sys' in report ? report.sys?.firstPublishedAt || '' : '';

  return {
    slug,
    title,
    excerpt: report.excerpt?.trim() || '',
    categoryName: report.researchCategory?.researchCategoryName?.trim() || undefined,
    categorySlug: report.researchCategory?.slug?.trim() || undefined,
    publishedDate: formatContentfulDate(firstPublished) || 'Draft',
    href: `/research/${slug}`,
    featured: 'featured' in report ? Boolean((report as ContentfulResearchReport).featured) : undefined,
  };
}

function buildResearchCitation(input: {
  authorName: string;
  title: string;
  year?: string;
  url: string;
}): string {
  const yearPart = input.year ? ` (${input.year})` : '';
  return `${input.authorName}${yearPart}. ${input.title}. MappedSkills Research. ${input.url}`;
}

export function mapContentfulReportToCms(report: ContentfulResearchReport): CmsResearchReport | null {
  if (!report.slug || !report.title) return null;

  const firstPublished = report.sys.firstPublishedAt || report.sys.publishedAt || '';
  const lastPublished = report.sys.publishedAt || report.sys.firstPublishedAt || '';
  const authorName = report.author?.name?.trim() || 'MappedSkills';
  const canonicalUrl = `${SITE_URL}/research/${report.slug}`;
  const year = firstPublished ? String(new Date(firstPublished).getUTCFullYear()) : undefined;
  const excerpt = report.excerpt?.trim() || '';
  const metaDescription = report.metaDescription?.trim() || excerpt;

  const keyFindings = (report.keyFindingsCollection?.items || [])
    .map(mapContentfulFindingToCms)
    .filter((item): item is CmsResearchFinding => Boolean(item));

  const relatedResearch = (report.relatedResearchCollection?.items || [])
    .map(mapContentfulReportToCard)
    .filter((item): item is CmsResearchCard => Boolean(item));

  const mediaAssets = (report.mediaAssetsCollection?.items || [])
    .map(mapContentfulAssetToFile)
    .filter((item): item is CmsFileAsset => Boolean(item));

  return {
    slug: report.slug,
    title: report.title,
    researchId: report.researchId?.trim() || undefined,
    excerpt,
    categoryName: report.researchCategory?.researchCategoryName?.trim() || undefined,
    categorySlug: report.researchCategory?.slug?.trim() || undefined,
    author: {
      name: authorName,
      description: report.author?.description || undefined,
      profileUrl: report.author?.profile?.url || undefined,
    },
    publishedDate: formatContentfulDate(firstPublished) || 'Draft',
    publishedAtISO: firstPublished,
    updatedAtISO: lastPublished,
    researchPeriod: report.researchPeriod?.trim() || undefined,
    geography: report.geography?.trim() || undefined,
    sampleSize: typeof report.sampleSize === 'number' ? report.sampleSize : undefined,
    featuredImage: mapContentfulAssetToFile(report.featuredImage),
    executiveSummaryJson: report.executiveSummary?.json ?? null,
    executiveSummaryLinks: report.executiveSummary?.links,
    keyFindings,
    contentJson: report.content?.json ?? null,
    contentLinks: report.content?.links,
    methodologyJson: report.methodology?.json ?? null,
    methodologyLinks: report.methodology?.links,
    limitationsJson: report.limitations?.json ?? null,
    limitationsLinks: report.limitations?.links,
    reportPdf: mapContentfulAssetToFile(report.reportPdf),
    dataFile: mapContentfulAssetToFile(report.dataFile),
    mediaAssets,
    relatedResearch,
    featured: Boolean(report.featured),
    metaTitle: report.seoTitle?.trim() || report.title,
    metaDescription,
    canonicalUrl,
    citation: buildResearchCitation({
      authorName,
      title: report.title,
      year,
      url: canonicalUrl,
    }),
  };
}

export function mapContentfulPressToCard(entry: ContentfulPressRelease): CmsPressCard | null {
  const slug = entry.slug?.trim();
  const headline = entry.headline?.trim();
  if (!slug || !headline) return null;
  const firstPublished = entry.sys.firstPublishedAt || entry.sys.publishedAt || '';
  return {
    slug,
    headline,
    excerpt: entry.excerpt?.trim() || '',
    publishedDate: formatContentfulDate(firstPublished) || 'Draft',
    href: `/press/${slug}`,
  };
}

export function mapContentfulPressToCms(entry: ContentfulPressRelease): CmsPressRelease | null {
  if (!entry.slug || !entry.headline) return null;
  const firstPublished = entry.sys.firstPublishedAt || entry.sys.publishedAt || '';
  const lastPublished = entry.sys.publishedAt || entry.sys.firstPublishedAt || '';
  const excerpt = entry.excerpt?.trim() || '';
  const related = entry.relatedResearch?.slug && entry.relatedResearch.title
    ? {
        slug: entry.relatedResearch.slug,
        title: entry.relatedResearch.title,
        excerpt: entry.relatedResearch.excerpt?.trim() || '',
        publishedDate: '',
        href: `/research/${entry.relatedResearch.slug}`,
      }
    : undefined;

  const mediaAssets = (entry.mediaAssetsCollection?.items || [])
    .map(mapContentfulAssetToFile)
    .filter((item): item is CmsFileAsset => Boolean(item));

  const authorName = entry.author?.name?.trim();

  return {
    slug: entry.slug,
    headline: entry.headline,
    excerpt,
    publishedDate: formatContentfulDate(firstPublished) || 'Draft',
    publishedAtISO: firstPublished,
    updatedAtISO: lastPublished,
    featuredImage: mapContentfulAssetToFile(entry.featuredImage),
    contentJson: entry.content?.json ?? null,
    contentLinks: entry.content?.links,
    relatedResearch: related,
    author: authorName
      ? {
          name: authorName,
          description: entry.author?.description || undefined,
          profileUrl: entry.author?.profile?.url || undefined,
        }
      : undefined,
    mediaAssets,
    metaTitle: entry.seoTitle?.trim() || entry.headline,
    metaDescription: entry.metaDescription?.trim() || excerpt,
    canonicalUrl: `${SITE_URL}/press/${entry.slug}`,
  };
}
