import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import {
  getBlogDetailPost,
  getBlogStaticParams,
  getRelatedBlogCards,
} from '@/lib/contentful/posts';
import type { CmsBlogPost } from '@/lib/contentful/types';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogIntroduction } from '@/components/blog/BlogIntroduction';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RichTextContent } from '@/components/blog/RichTextContent';
import { CTABlockFromType } from '@/components/blog/CTABlock';
import { StickySidebarCTA } from '@/components/blog/StickySidebarCTA';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { RelatedServices } from '@/components/blog/RelatedServices';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { getRelatedServices } from '@/lib/blog-services';
import { FAQSection } from '@/components/blog/FAQSection';
import { SocialShare } from '@/components/blog/SocialShare';
import { BlogNewsletterForm } from '@/components/BlogNewsletterForm';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

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

  return {
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
      siteName: 'MappedSkills',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.featuredImageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    authors: [{ name: post.author.name }],
    publisher: 'MappedSkills',
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
        url: `${siteMetadata.baseUrl}${siteMetadata.logoPath}`,
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
  const authorBio =
    post.author.description ||
    `${post.author.name} contributes performance marketing insights for MappedSkills.`;

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

      <BlogHero
        title={post.title}
        category={post.category}
        author={post.author.name}
        publishedDate={post.publishedDate}
        updatedDate={post.updatedDate}
        readingTime={post.readingTime}
        heroImage={post.featuredImageUrl}
        heroImageAlt={post.featuredImageAlt}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {post.introduction && (
                <BlogIntroduction
                  hook={post.introduction.hook}
                  problem={post.introduction.problem}
                  promise={post.introduction.promise}
                />
              )}

              {!post.introduction && post.excerpt && (
                <p className="text-lg text-foreground leading-relaxed mb-12 border-b border-border pb-8">
                  {post.excerpt}
                </p>
              )}

              <div className="mb-12">
                <TableOfContents items={post.tableOfContents} />
              </div>

              <article className="prose dark:prose-invert max-w-none mb-12">
                {post.contentJson && (
                  <RichTextContent document={post.contentJson} links={post.contentLinks} />
                )}

                <CTABlockFromType ctaType={post.ctaType || 'generic'} />
              </article>

              <SocialShare title={post.title} url={canonicalUrl} />

              {relatedPosts.length > 0 && (
                <RelatedPosts
                  posts={relatedPosts.map((p) => ({
                    slug: p.slug,
                    title: p.title,
                    excerpt: p.excerpt,
                    category: p.category,
                    readingTime: p.readingTime,
                  }))}
                />
              )}

              <RelatedServices services={relatedServices} />

              {/*
                BLOG-009B (owner, 2026-09-23) — the author LinkedIn link is
                REMOVED, not repointed. `https://linkedin.com/in/amit-gupta`
                could not be verified: it serves LinkedIn's sign-up wall, and
                it is not the profile the verified MappedSkills Marketing
                company page associates with its founder. The approved fallback
                for an unverifiable destination is remove/hide.

                `linkedinUrl` is optional and `AuthorBio` already guards on it,
                so omitting the prop renders no button and leaves no empty
                framing. A different profile is NOT substituted here — that
                would be a new owner decision, not this one.
              */}
              <AuthorBio
                name={post.author.name}
                role="Performance Marketing Strategist"
                bio={authorBio}
                avatarUrl={post.author.profileUrl}
              />

              {post.faqs && post.faqs.length > 0 && <FAQSection faqs={post.faqs} />}

              <div className="border-t border-border pt-12 mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-8">Get More Growth Insights</h2>
                <BlogNewsletterForm />
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* BLOG-008 — `relatedServices[0]` is the first approved service,
                  or `undefined` when the article has none. `StickySidebarCTA`
                  guards on the prop, so the sidebar service block then renders
                  nothing and no substitute is shown. */}
              <StickySidebarCTA
                ctaHeadline="Want Us to Review This for Your Business?"
                ctaLink="/schedule-call"
                relatedService={relatedServices[0]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/*
        SESSION 33 — PHASE I. "Book a free strategy call…" and "Schedule Free
        Strategy Call" removed: "free" is blocked on the entry-offer decision.
        The primary action is now `/contact` with the approved label used by
        every commercial route's close, and booking is not offered here at all
        while it remains owner-blocked.
      */}
      <CTASection
        title="Ready to Turn This Insight Into Action?"
        description="Tell us what is actually happening — the enquiries you are getting, the ones you are not, and what you can currently see."
        primaryCta={{
          text: 'Tell us what you\u2019re trying to fix',
          href: '/contact',
        }}
        secondaryCta={{
          text: 'Explore Services',
          href: '/services',
        }}
      />
    </>
  );
}
