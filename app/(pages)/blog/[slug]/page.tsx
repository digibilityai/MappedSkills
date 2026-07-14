import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BLOG_POSTS_DATA, BlogPost } from '@/lib/blog-data';
import { createMetadata } from '@/lib/metadata';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogIntroduction } from '@/components/blog/BlogIntroduction';
import { TableOfContents } from '@/components/blog/TableOfContents';
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

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for blog posts
export function generateStaticParams() {
  return Object.keys(BLOG_POSTS_DATA).map((slug) => ({
    slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS_DATA[slug];
  
  if (!post) {
    return createMetadata('Blog Post Not Found', 'The blog post you are looking for does not exist.', '/blog');
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    canonical: post.canonicalUrl,
    alternates: {
      canonical: post.canonicalUrl,
    },
    openGraph: {
      title: post.openGraphTitle,
      description: post.openGraphDescription,
      url: post.canonicalUrl,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
      siteName: 'MappedSkills',
      images: [
        {
          url: post.openGraphImage,
          width: 1200,
          height: 630,
          alt: post.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.openGraphTitle,
      description: post.openGraphDescription,
      images: [post.openGraphImage],
    },
    authors: [{ name: post.author }],
    publisher: 'MappedSkills',
  };
}

// Article schema generator
function generateArticleSchema(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.openGraphImage,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MappedSkills',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mappedskills.com/logo.png',
      },
    },
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
  };
}

// FAQ schema generator
function generateFAQSchema(post: BlogPost) {
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

// Breadcrumb schema generator
function generateBreadcrumbSchema(post: BlogPost) {
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

// Service mapping by category
const SERVICE_MAP = {
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
  'SEO': [
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
  const post = BLOG_POSTS_DATA[slug];
  
  if (!post) {
    notFound();
  }

  const relatedServices = SERVICE_MAP[post.category as keyof typeof SERVICE_MAP] || SERVICE_MAP['Google Ads'];
  
  const relatedPosts = post.relatedPostSlugs
    .map((slug) => BLOG_POSTS_DATA[slug])
    .filter(Boolean)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      readingTime: p.readingTime,
    }));

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(post)),
        }}
      />

      {/* Blog Hero */}
      <BlogHero
        title={post.title}
        category={post.category}
        author={post.author}
        publishedDate={post.publishedDate}
        updatedDate={post.updatedDate}
        readingTime={post.readingTime}
        heroImage={post.heroImage}
        heroImageAlt={post.heroImageAlt}
      />

      {/* Main Content */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Introduction */}
              <BlogIntroduction
                hook={post.introduction.hook}
                problem={post.introduction.problem}
                promise={post.introduction.promise}
              />

              {/* Table of Contents */}
              <div className="mb-12">
                <TableOfContents items={post.tableOfContents} />
              </div>

              {/* Article Content */}
              <article className="prose dark:prose-invert max-w-none mb-12">
                <p className="text-base leading-relaxed text-foreground">
                  Article content will be rendered here from post.content.
                  This is a placeholder for your article body.
                </p>

                {/* CTA Block */}
                <CTABlockFromType ctaType={post.ctaType} />
              </article>

              {/* Social Share */}
              <SocialShare title={post.title} url={canonicalUrl} />

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} />
              )}

              {/* Related Services */}
              <RelatedServices services={relatedServices} />

              {/* Author Bio */}
              <AuthorBio
                name={post.author}
                role="Performance Marketing Strategist"
                bio="Amit Gupta is the Founder of MappedSkills Marketing. He helps businesses turn digital marketing into a measurable growth system through performance marketing, lead generation, SEO, funnel strategy, tracking, and campaign optimization."
                linkedinUrl="https://linkedin.com/in/amit-gupta"
              />

              {/* FAQ Section */}
              {post.faqs.length > 0 && (
                <FAQSection faqs={post.faqs} />
              )}

              {/* Newsletter */}
              <div className="border-t border-border pt-12 mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-8">Get More Growth Insights</h2>
                <BlogNewsletterForm />
              </div>
            </div>

            {/* Sidebar */}
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

      {/* Final CTA */}
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
