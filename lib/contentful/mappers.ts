import { BLOCKS, type Document, type TopLevelBlock } from '@contentful/rich-text-types';
import { format, parseISO, isValid } from 'date-fns';
import type {
  CmsBlogCard,
  CmsBlogPost,
  CmsCaseStudy,
  CmsCaseStudyCard,
  ContentfulCaseStudy,
  ContentfulPost,
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
  const publishedDate = formatContentfulDate(firstPublished);
  const updatedDate = formatContentfulDate(lastPublished);
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
