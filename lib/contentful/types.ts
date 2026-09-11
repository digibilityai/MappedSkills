import type { Document } from '@contentful/rich-text-types';

export type ContentfulAsset = {
  sys?: { id: string };
  url?: string | null;
  title?: string | null;
  description?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ContentfulAuthor = {
  name?: string | null;
  description?: string | null;
  profile?: ContentfulAsset | null;
};

export type ContentfulCategory = {
  name?: string | null;
  slug?: string | null;
};

export type ContentfulRichText = {
  json?: Document | null;
  links?: {
    assets?: {
      block?: ContentfulAsset[] | null;
    } | null;
  } | null;
};

export type ContentfulPost = {
  sys: {
    id: string;
    firstPublishedAt?: string | null;
    publishedAt?: string | null;
  };
  title?: string | null;
  seoTitle?: string | null;
  keyword?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  author?: ContentfulAuthor | null;
  category?: ContentfulCategory | null;
  featuredImage?: ContentfulAsset | null;
  content?: ContentfulRichText | null;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type CTAType = 'google-ads' | 'social-ads' | 'lead-gen' | 'seo' | 'cro' | 'generic';

export type CmsAuthor = {
  name: string;
  description?: string;
  profileUrl?: string;
};

export type CmsBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug?: string;
  author: CmsAuthor;
  /** Display date shown next to calendar icon */
  publishedDate: string;
  /** Display date for "Updated …" when different from published */
  updatedDate: string;
  publishedAtISO: string;
  updatedAtISO: string;
  readingTime: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  tableOfContents: TocItem[];
  contentJson: Document | null;
  contentLinks?: ContentfulRichText['links'];
  introduction?: {
    hook: string;
    problem: string;
    promise: string;
  };
  faqs?: Array<{ question: string; answer: string }>;
  ctaType?: CTAType;
  relatedPostSlugs?: string[];
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  openGraphImage: string;
  canonicalUrl: string;
};

export type CmsBlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishedDate: string;
  href: string;
  author?: string;
};

/** Raw Contentful case study entry (GraphQL) */
export type ContentfulCaseClient = {
  clientName?: string | null;
  date?: string | null;
};

export type ContentfulCaseIndustry = {
  name?: string | null;
};

export type ContentfulCaseCompanySize = {
  size?: string | null;
};

export type ContentfulCaseTargetAudience = {
  audience?: string | null;
};

export type ContentfulCaseGeographicTarget = {
  target?: string | null;
};

export type ContentfulCaseTestimonial = {
  name?: string | null;
  testimonial?: string | null;
};

export type ContentfulCaseStudy = {
  sys: {
    id: string;
    firstPublishedAt?: string | null;
    publishedAt?: string | null;
  };
  title?: string | null;
  slug?: string | null;
  clientName?: ContentfulCaseClient | null;
  industry?: ContentfulCaseIndustry | null;
  size?: ContentfulCaseCompanySize | null;
  audience?: ContentfulCaseTargetAudience | null;
  targetArea?: ContentfulCaseGeographicTarget | null;
  content?: ContentfulRichText | null;
  review?: ContentfulCaseTestimonial | null;
  conclusion?: ContentfulRichText | null;
};

export type CaseStudyHeadingCard = {
  title: string;
  body: string;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudyBeforeAfterRow = {
  metric: string;
  before: string;
  after: string;
};

export type CaseStudyParsedSections = {
  problemStatement?: Document | null;
  businessGoals?: Document | null;
  challenges?: CaseStudyHeadingCard[];
  strategyAndTactics?: Document | null;
  servicesProvided?: CaseStudyHeadingCard[];
  toolsAndTechnologies?: CaseStudyHeadingCard[];
  resultsMetrics?: CaseStudyMetric[];
  beforeAfter?: {
    headers: string[];
    rows: CaseStudyBeforeAfterRow[];
  };
  /** Any unmatched h2 sections rendered as generic rich text */
  extras?: Array<{ title: string; document: Document }>;
};

export type CmsCaseStudy = {
  id: string;
  /** URL slug without optional `portfolio/` prefix */
  slug: string;
  /** Original Contentful slug (may include `portfolio/`) */
  contentfulSlug: string;
  title: string;
  clientName: string;
  clientDate: string;
  industry: string;
  companySize: string;
  audience: string;
  targetArea: string;
  sections: CaseStudyParsedSections;
  review?: {
    name: string;
    quote: string;
  };
  conclusionJson: Document | null;
  /** Derived for listing cards */
  serviceLabel: string;
  highlightResult: string;
  summary: string;
  href: string;
  metaTitle: string;
  metaDescription: string;
};

export type CmsCaseStudyCard = {
  slug: string;
  title: string;
  industry: string;
  service: string;
  result: string;
  summary: string;
  href: string;
};
