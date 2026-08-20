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
