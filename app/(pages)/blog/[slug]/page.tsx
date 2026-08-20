import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createMetadata, siteMetadata } from '@/lib/metadata';
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
    return createMetadata('Blog Post Not Found', 'The blog post you are looking for does not exist.', '/blog');
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

const SERVICE_MAP: Record<
  string,
  Array<{ title: string; description: string; link: string }>
> = {
  'Google Ads': [
    {
      title: 'Google Ads Management',
      description: 'Expert campaign setup and optimization for maximum ROI.',
      link: '/google-ads',
    },
    {
      title: 'Conversion Optimization',
      description: 'Improve landing pages and forms to convert more visitors.',
      link: '/conversion-optimization',
    },
    {
      title: 'Lead Generation',
      description: 'Generate quality leads through high-intent Google campaigns.',
      link: '/lead-generation',
    },
  ],
  'Social Media Ads': [
    {
      title: 'Social Media Ads',
      description: 'Expert Meta, LinkedIn, and TikTok campaign management.',
      link: '/social-media-ads',
    },
    {
      title: 'Lead Generation',
      description: 'Generate quality leads from social media campaigns.',
      link: '/lead-generation',
    },
    {
      title: 'Conversion Optimization',
      description: 'Improve conversion rates from paid social traffic.',
      link: '/conversion-optimization',
    },
  ],
  'Lead Generation': [
    {
      title: 'Lead Generation',
      description: 'Generate and qualify high-quality leads for your sales team.',
      link: '/lead-generation',
    },
    {
      title: 'Google Ads',
      description: 'High-intent keyword targeting for lead generation.',
      link: '/google-ads',
    },
    {
      title: 'SEO',
      description: 'Organic lead generation through search engine rankings.',
      link: '/seo',
    },
  ],
  SEO: [
    {
      title: 'SEO Services',
      description: 'Keyword strategy, technical SEO, and content optimization.',
      link: '/seo',
    },
    {
      title: 'Lead Generation',
      description: 'Convert organic traffic into qualified leads.',
      link: '/lead-generation',
    },
    {
      title: 'Conversion Optimization',
      description: 'Improve conversion rates from organic traffic.',
      link: '/conversion-optimization',
    },
  ],
  'Conversion Optimization': [
    {
      title: 'Conversion Optimization',
      description: 'Audit and improve conversion funnels for maximum revenue.',
      link: '/conversion-optimization',
    },
    {
      title: 'Google Ads',
      description: 'High-intent keyword targeting and landing page optimization.',
      link: '/google-ads',
    },
    {
      title: 'Lead Generation',
      description: 'Improve lead quality and qualification rates.',
      link: '/lead-generation',
    },
  ],
  'Marketing Strategy': [
    {
      title: 'Google Ads',
      description: 'Strategic paid search campaigns aligned with your goals.',
      link: '/google-ads',
    },
    {
      title: 'SEO',
      description: 'Long-term organic growth strategy.',
      link: '/seo',
    },
    {
      title: 'Lead Generation',
      description: 'Multi-channel lead generation strategy.',
      link: '/lead-generation',
    },
  ],
  'Local SEO': [
    {
      title: 'SEO Services',
      description: 'Local SEO, Google Business Profile optimization.',
      link: '/seo',
    },
    {
      title: 'Google Ads',
      description: 'Local service ads and location-based targeting.',
      link: '/google-ads',
    },
    {
      title: 'Lead Generation',
      description: 'Local lead generation and service area targeting.',
      link: '/lead-generation',
    },
  ],
  'Case Study Insights': [
    {
      title: 'Google Ads',
      description: 'See how we helped businesses achieve 300%+ ROI.',
      link: '/google-ads',
    },
    {
      title: 'Lead Generation',
      description: 'Discover lead generation success stories.',
      link: '/lead-generation',
    },
    {
      title: 'SEO',
      description: 'Learn from our organic growth case studies.',
      link: '/seo',
    },
  ],
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogDetailPost(slug);

  if (!post) {
    notFound();
  }

  const relatedServices = SERVICE_MAP[post.category] || SERVICE_MAP['Marketing Strategy'];
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

              <AuthorBio
                name={post.author.name}
                role="Performance Marketing Strategist"
                bio={authorBio}
                linkedinUrl="https://linkedin.com/in/amit-gupta"
                avatarUrl={post.author.profileUrl}
              />

              {post.faqs && post.faqs.length > 0 && <FAQSection faqs={post.faqs} />}

              <div className="border-t border-border pt-12 mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-8">Get More Growth Insights</h2>
                <BlogNewsletterForm />
              </div>
            </div>

            <div className="lg:col-span-1">
              <StickySidebarCTA
                ctaHeadline="Want Us to Review This for Your Business?"
                ctaLink="/schedule-call"
                relatedService={relatedServices[0]}
              />
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to Turn This Insight Into Action?"
        description="Book a free strategy call and get clear recommendations based on your current ads, SEO, leads, or conversion funnel."
        primaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Explore Services',
          href: '/services',
        }}
      />
    </>
  );
}
