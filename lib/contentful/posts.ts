import { contentfulGraphql, CONTENTFUL_REVALIDATE_SECONDS } from '@/lib/contentful/client';
import {
  GET_ALL_POSTS_QUERY,
  GET_POST_BY_SLUG_QUERY,
  GET_POST_SLUGS_QUERY,
  GET_RELATED_POSTS_QUERY,
} from '@/lib/contentful/queries';
import {
  mapContentfulPostToCard,
  mapContentfulPostToCms,
} from '@/lib/contentful/mappers';
import type { CmsBlogCard, CmsBlogPost, ContentfulPost } from '@/lib/contentful/types';

type PostCollectionResponse = {
  postCollection?: {
    total?: number;
    items?: Array<ContentfulPost | null>;
  };
};

function filterNull<T>(items: Array<T | null | undefined>): T[] {
  return items.filter((item): item is T => Boolean(item));
}

export async function fetchContentfulPosts(limit = 100): Promise<CmsBlogPost[]> {
  const data = await contentfulGraphql<PostCollectionResponse>(
    GET_ALL_POSTS_QUERY,
    { limit },
    CONTENTFUL_REVALIDATE_SECONDS
  );

  const items = filterNull(data?.postCollection?.items || []);
  return filterNull(items.map(mapContentfulPostToCms));
}

export async function fetchContentfulPostBySlug(slug: string): Promise<CmsBlogPost | null> {
  const data = await contentfulGraphql<PostCollectionResponse>(
    GET_POST_BY_SLUG_QUERY,
    { slug, limit: 1 },
    CONTENTFUL_REVALIDATE_SECONDS
  );

  const item = data?.postCollection?.items?.[0];
  if (!item) return null;
  return mapContentfulPostToCms(item);
}

export async function fetchContentfulPostSlugs(): Promise<string[]> {
  const data = await contentfulGraphql<PostCollectionResponse>(
    GET_POST_SLUGS_QUERY,
    { limit: 100 },
    CONTENTFUL_REVALIDATE_SECONDS
  );

  return filterNull(data?.postCollection?.items || [])
    .map((item) => item.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export async function fetchContentfulRelatedPosts(
  categorySlug: string | undefined,
  excludeSlug: string,
  limit = 3
): Promise<CmsBlogCard[]> {
  if (!categorySlug) {
    const posts = await fetchContentfulPosts(limit + 1);
    return posts
      .filter((post) => post.slug !== excludeSlug)
      .slice(0, limit)
      .map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        readingTime: post.readingTime,
        publishedDate: post.publishedDate,
        href: `/blog/${post.slug}`,
        author: post.author.name,
      }));
  }

  const data = await contentfulGraphql<PostCollectionResponse>(
    GET_RELATED_POSTS_QUERY,
    { categorySlug, excludeSlug, limit },
    CONTENTFUL_REVALIDATE_SECONDS
  );

  const items = filterNull(data?.postCollection?.items || []);
  return filterNull(items.map(mapContentfulPostToCard));
}

/** List posts from Contentful only. */
export async function getBlogListPosts(): Promise<CmsBlogCard[]> {
  const contentfulPosts = await fetchContentfulPosts();
  return contentfulPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readingTime: post.readingTime,
    publishedDate: post.publishedDate,
    href: `/blog/${post.slug}`,
    author: post.author.name,
  }));
}

/** Detail post from Contentful only. */
export async function getBlogDetailPost(slug: string): Promise<CmsBlogPost | null> {
  return fetchContentfulPostBySlug(slug);
}

export async function getBlogStaticParams(): Promise<Array<{ slug: string }>> {
  const contentfulSlugs = await fetchContentfulPostSlugs();
  return contentfulSlugs.map((slug) => ({ slug }));
}

export async function getRelatedBlogCards(post: CmsBlogPost): Promise<CmsBlogCard[]> {
  return fetchContentfulRelatedPosts(post.categorySlug, post.slug, 3);
}

export { CONTENTFUL_REVALIDATE_SECONDS };
