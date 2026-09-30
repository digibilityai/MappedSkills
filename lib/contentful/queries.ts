export const POST_CARD_FRAGMENT = `
  sys {
    id
    firstPublishedAt
    publishedAt
  }
  title
  seoTitle
  keyword
  slug
  excerpt
  author {
    name
    description
    profile {
      url
      title
      description
    }
  }
  category {
    name
    slug
  }
  featuredImage {
    url
    title
    description
    width
    height
  }
  content {
    json
  }
`;

export const POST_DETAIL_FRAGMENT = `
  ${POST_CARD_FRAGMENT}
  content {
    json
    links {
      assets {
        block {
          sys { id }
          url
          title
          description
          width
          height
        }
      }
    }
  }
`;

export const GET_ALL_POSTS_QUERY = `
  query GetAllPosts($limit: Int = 100) {
    postCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      total
      items {
        ${POST_CARD_FRAGMENT}
      }
    }
  }
`;

export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: String!, $limit: Int = 1) {
    postCollection(where: { slug: $slug }, limit: $limit) {
      items {
        ${POST_DETAIL_FRAGMENT}
      }
    }
  }
`;

export const GET_RELATED_POSTS_QUERY = `
  query GetRelatedPosts($categorySlug: String, $excludeSlug: String!, $limit: Int = 3) {
    postCollection(
      where: { slug_not: $excludeSlug, category: { slug: $categorySlug } }
      limit: $limit
      order: sys_firstPublishedAt_DESC
    ) {
      items {
        ${POST_CARD_FRAGMENT}
      }
    }
  }
`;

export const GET_POST_SLUGS_QUERY = `
  query GetPostSlugs($limit: Int = 100) {
    postCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      items {
        slug
      }
    }
  }
`;

export const CASE_STUDY_CARD_FRAGMENT = `
  sys {
    id
    firstPublishedAt
    publishedAt
  }
  title
  slug
  clientName {
    clientName
    date
  }
  industry {
    name
  }
  size {
    size
  }
  audience {
    audience
  }
  targetArea {
    target
  }
  review {
    name
    testimonial
  }
  content {
    json
  }
  conclusion {
    json
  }
`;

export const CASE_STUDY_DETAIL_FRAGMENT = `
  ${CASE_STUDY_CARD_FRAGMENT}
`;

export const GET_ALL_CASE_STUDIES_QUERY = `
  query GetAllCaseStudies($limit: Int = 100) {
    caseStudiesCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      total
      items {
        ${CASE_STUDY_CARD_FRAGMENT}
      }
    }
  }
`;

export const GET_CASE_STUDY_BY_SLUG_QUERY = `
  query GetCaseStudyBySlug($slugs: [String!]!, $limit: Int = 1) {
    caseStudiesCollection(where: { slug_in: $slugs }, limit: $limit) {
      items {
        ${CASE_STUDY_DETAIL_FRAGMENT}
      }
    }
  }
`;

export const GET_CASE_STUDY_SLUGS_QUERY = `
  query GetCaseStudySlugs($limit: Int = 100) {
    caseStudiesCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      items {
        slug
      }
    }
  }
`;

export const ASSET_FIELDS = `
  sys { id }
  url
  title
  description
  width
  height
  contentType
  fileName
`;

export const AUTHOR_FIELDS = `
  name
  description
  profile {
    ${ASSET_FIELDS}
  }
`;

export const RESEARCH_CATEGORY_FIELDS = `
  sys { id }
  researchCategoryName
  slug
  description
  seoTitle
  metaDescription
  featuredImage {
    ${ASSET_FIELDS}
  }
`;

export const RESEARCH_FINDING_FIELDS = `
  sys { id }
  internalName
  statistic
  findingHeadline
  description
  explanation {
    json
  }
  chartImage {
    ${ASSET_FIELDS}
  }
  chartAltText
  baseSample
  sourceNote
`;

export const RESEARCH_REPORT_CARD_FRAGMENT = `
  sys {
    id
    firstPublishedAt
    publishedAt
  }
  title
  researchId
  seoTitle
  metaDescription
  slug
  excerpt
  featured
  researchPeriod
  geography
  sampleSize
  researchCategory {
    researchCategoryName
    slug
  }
  author {
    ${AUTHOR_FIELDS}
  }
  featuredImage {
    ${ASSET_FIELDS}
  }
`;

export const RICH_TEXT_WITH_LINKS = `
  json
  links {
    assets {
      block {
        ${ASSET_FIELDS}
      }
    }
    entries {
      block {
        __typename
        ... on ResearchFinding {
          ${RESEARCH_FINDING_FIELDS}
        }
      }
    }
  }
`;

export const GET_ALL_RESEARCH_REPORTS_QUERY = `
  query GetAllResearchReports($limit: Int = 100) {
    researchReportCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      total
      items {
        ${RESEARCH_REPORT_CARD_FRAGMENT}
      }
    }
  }
`;

export const GET_FEATURED_RESEARCH_REPORTS_QUERY = `
  query GetFeaturedResearchReports($limit: Int = 6) {
    researchReportCollection(where: { featured: true }, limit: $limit, order: sys_firstPublishedAt_DESC) {
      items {
        ${RESEARCH_REPORT_CARD_FRAGMENT}
      }
    }
  }
`;

export const GET_RESEARCH_REPORT_BY_SLUG_QUERY = `
  query GetResearchReportBySlug($slug: String!, $limit: Int = 1) {
    researchReportCollection(where: { slug: $slug }, limit: $limit) {
      items {
        ${RESEARCH_REPORT_CARD_FRAGMENT}
        executiveSummary { ${RICH_TEXT_WITH_LINKS} }
        content { ${RICH_TEXT_WITH_LINKS} }
        methodology { ${RICH_TEXT_WITH_LINKS} }
        limitations { ${RICH_TEXT_WITH_LINKS} }
        keyFindingsCollection(limit: 20) {
          items {
            ${RESEARCH_FINDING_FIELDS}
          }
        }
        reportPdf { ${ASSET_FIELDS} }
        dataFile { ${ASSET_FIELDS} }
        mediaAssetsCollection(limit: 20) {
          items { ${ASSET_FIELDS} }
        }
        relatedResearchCollection(limit: 6) {
          items {
            title
            slug
            excerpt
            researchCategory {
              researchCategoryName
              slug
            }
            sys { firstPublishedAt }
          }
        }
      }
    }
  }
`;

export const GET_RESEARCH_REPORT_SLUGS_QUERY = `
  query GetResearchReportSlugs($limit: Int = 100) {
    researchReportCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      items { slug }
    }
  }
`;

export const GET_RESEARCH_REPORTS_BY_CATEGORY_QUERY = `
  query GetResearchReportsByCategory($categorySlug: String!, $limit: Int = 100) {
    researchReportCollection(
      where: { researchCategory: { slug: $categorySlug } }
      limit: $limit
      order: sys_firstPublishedAt_DESC
    ) {
      items {
        ${RESEARCH_REPORT_CARD_FRAGMENT}
      }
    }
  }
`;

export const GET_ALL_RESEARCH_CATEGORIES_QUERY = `
  query GetAllResearchCategories($limit: Int = 20) {
    researchCategoryCollection(limit: $limit, order: researchCategoryName_ASC) {
      items {
        ${RESEARCH_CATEGORY_FIELDS}
      }
    }
  }
`;

export const GET_RESEARCH_CATEGORY_BY_SLUG_QUERY = `
  query GetResearchCategoryBySlug($slug: String!, $limit: Int = 1) {
    researchCategoryCollection(where: { slug: $slug }, limit: $limit) {
      items {
        ${RESEARCH_CATEGORY_FIELDS}
      }
    }
  }
`;

export const GET_RESEARCH_CATEGORY_SLUGS_QUERY = `
  query GetResearchCategorySlugs($limit: Int = 20) {
    researchCategoryCollection(limit: $limit) {
      items { slug }
    }
  }
`;

export const GET_LATEST_RESEARCH_FINDINGS_QUERY = `
  query GetLatestResearchFindings($limit: Int = 8) {
    researchFindingCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      items {
        ${RESEARCH_FINDING_FIELDS}
        linkedFrom {
          researchReportCollection(limit: 1) {
            items { slug title }
          }
        }
      }
    }
  }
`;

export const PRESS_RELEASE_CARD_FRAGMENT = `
  sys {
    id
    firstPublishedAt
    publishedAt
  }
  headline
  seoTitle
  metaDescription
  slug
  excerpt
  featuredImage {
    ${ASSET_FIELDS}
  }
  author {
    ${AUTHOR_FIELDS}
  }
  relatedResearch {
    title
    slug
    excerpt
  }
`;

export const GET_ALL_PRESS_RELEASES_QUERY = `
  query GetAllPressReleases($limit: Int = 100) {
    pressReleaseCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      items {
        ${PRESS_RELEASE_CARD_FRAGMENT}
      }
    }
  }
`;

export const GET_PRESS_RELEASE_BY_SLUG_QUERY = `
  query GetPressReleaseBySlug($slug: String!, $limit: Int = 1) {
    pressReleaseCollection(where: { slug: $slug }, limit: $limit) {
      items {
        ${PRESS_RELEASE_CARD_FRAGMENT}
        content { ${RICH_TEXT_WITH_LINKS} }
        mediaAssetsCollection(limit: 20) {
          items { ${ASSET_FIELDS} }
        }
      }
    }
  }
`;

export const GET_PRESS_RELEASE_SLUGS_QUERY = `
  query GetPressReleaseSlugs($limit: Int = 100) {
    pressReleaseCollection(limit: $limit, order: sys_firstPublishedAt_DESC) {
      items { slug }
    }
  }
`;
