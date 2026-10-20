import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveOgImageUrl, siteMetadata } from '@/lib/metadata';
import {
  getBlogDetailPost,
  getBlogStaticParams,
  getRelatedBlogCards,
} from '@/lib/contentful/posts';
import type { CmsBlogPost } from '@/lib/contentful/types';
import { getRelatedServices } from '@/lib/blog-services';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ArticleBody } from '@/components/cplus/blog-article/ArticleBody';

// Must be a literal — Next.js cannot follow imported identifiers for route segment config
export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getBlogStaticParams();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogDetailPost(slug);

  if (!post) {
    /**
     * SEO-006 EXTENSION (owner decision, 2026-09-21): the same defect the
     * portfolio route had. This branch is a GENUINE NOT-FOUND — `notFound()`
     * is called below and the response is HTTP 404 — but it returned
     * `createMetadata(...)`, which sets `index: true` for every caller, so the
     * 404 published `index, follow` with a canonical pointing at `/blog`.
     *
     * A genuine not-found response must not invite indexing merely because it
     * passed through a dynamic route's metadata branch. Published posts are
     * untouched and remain indexable.
     */
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
      robots: 'noindex, nofollow',
    };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const ogImage = post.openGraphImage || post.featuredImageUrl;
  const resolvedOgImage = resolveOgImageUrl(ogImage);

  return {
    metadataBase: new URL(siteMetadata.baseUrl),
    title,
    description,
    keywords: post.focusKeyword ? [post.focusKeyword] : undefined,
    alternates: {
      canonical: post.canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: post.canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAtISO,
      modifiedTime: post.updatedAtISO,
      siteName: siteMetadata.siteName,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt || title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedOgImage],
    },
    authors: [{ name: post.author.name }],
    publisher: siteMetadata.siteName,
  };
}

function generateArticleSchema(post: CmsBlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    ...(post.focusKeyword ? { keywords: post.focusKeyword } : {}),
    image: post.openGraphImage || post.featuredImageUrl || undefined,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MappedSkills',
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.baseUrl}${siteMetadata.schemaLogoPath}`,
      },
    },
    datePublished: post.publishedAtISO,
    dateModified: post.updatedAtISO,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

function generateFAQSchema(post: CmsBlogPost) {
  if (!post.faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function generateBreadcrumbSchema(post: CmsBlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mappedskills.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://mappedskills.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: post.canonicalUrl,
      },
    ],
  };
}

/*
 * BLOG-007 / BLOG-008 (owner-approved mapping, §15.2; implemented under GATE
 * R2). The category-keyed `SERVICE_MAP` and its blanket
 * `|| SERVICE_MAP['Marketing Strategy']` fallback were removed from here. No
 * Contentful category ever matched a key, so every article rendered the same
 * three cards and the same sidebar service regardless of subject.
 *
 * The approved per-slug selection now lives in `lib/blog-services.ts`, which
 * returns an empty selection for an article with no approved services. The
 * block and the sidebar service then render nothing, and nothing is
 * substituted.
 */

/*
 * BL-D6 G2 (owner-approved G1 design, docs/blog-redesign/bl-d6/g1/; G2 authorised 2026-10-20). The page body is the C+
 * article template (`components/cplus/blog-article/ArticleBody.tsx`): one reading column, a working contents list, the
 * approved related-service and related-article navigation, and ONE closing section with the approved `/blog` close.
 * Removed: the TOC card, in-body CTA card, sticky sidebar CTA, card grid, author card with the cartoon avatar and the
 * hard-coded role/bio, the dead newsletter block and the final CTA band. UNCHANGED: `generateStaticParams`,
 * `generateMetadata`, the Article / BreadcrumbList / FAQPage JSON-LD above, `revalidate`, the 404 branch, the
 * per-slug related services (BLOG-007/008) and the same-category related articles. Contentful wording is not changed.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogDetailPost(slug);

  if (!post) {
    notFound();
  }

  // BLOG-007/008 — keyed on the article slug, not the Contentful category.
  const relatedServices = getRelatedServices(post.slug);
  const relatedPosts = await getRelatedBlogCards(post);
  const faqSchema = generateFAQSchema(post);
  const canonicalUrl = post.canonicalUrl;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(post, canonicalUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(post)),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <CplusPage>
        <ArticleBody post={post} services={relatedServices} related={relatedPosts} />
      </CplusPage>
    </>
  );
}
