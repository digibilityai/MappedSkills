import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { BlogCard } from '@/components/BlogCard';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createMetadata } from '@/lib/metadata';
import { ArrowRight } from 'lucide-react';

export const metadata = createMetadata(
  'Performance Marketing Blog | Google Ads, Meta Ads, SEO & CRO Insights | MappedSkills',
  'Performance marketing blog with practical insights on Google Ads ROI, Meta Ads optimization, lead generation, SEO strategy, conversion rate optimization, and measurable growth for businesses.',
  '/blog'
);

// JSON-LD Schemas
const BreadcrumbSchema = {
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
  ],
};

const BlogCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Performance Marketing Blog',
  description: 'Performance marketing insights, strategies, and guides for Google Ads, Meta Ads, lead generation, SEO, and conversion optimization.',
  url: 'https://mappedskills.com/blog',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'BlogPosting',
        headline: 'How to Calculate Google Ads ROI: A Simple Formula',
        description: 'Understand Google Ads ROI, ROAS, cost per lead, and how to judge whether your paid campaigns are profitable.',
        url: 'https://mappedskills.com/blog/how-to-calculate-google-ads-roi',
      },
      {
        '@type': 'BlogPosting',
        headline: '5 Reasons Your Facebook Ads Are Not Working',
        description: 'Find out why your Meta campaigns may be getting clicks but not leads, sales, or serious enquiries.',
        url: 'https://mappedskills.com/blog/facebook-ads-not-working',
      },
      {
        '@type': 'BlogPosting',
        headline: 'Lead Scoring 101: How to Qualify Sales Leads',
        description: 'Learn how to separate serious prospects from random enquiries using basic lead scoring and qualification.',
        url: 'https://mappedskills.com/blog/lead-scoring-101',
      },
    ],
  },
};

const FAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What topics does this blog cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The blog covers performance marketing topics including Google Ads ROI, Meta Ads optimization, lead generation, SEO strategy, conversion optimization, and measurable growth for businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'How frequently is the blog updated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The blog is updated monthly with practical marketing insights, strategies, and breakdowns.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I subscribe to new articles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can subscribe to receive practical marketing insights on ads, SEO, leads, ROAS, and conversion growth via email.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the guides applicable to all business types?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The guides are built for business owners and marketers. Most insights apply to B2B, B2C, SaaS, e-commerce, and service businesses.',
      },
    },
  ],
};

// GA4 Tracking Configuration
// Event names to implement:
// - 'article_read': User reads a blog article (on detail page)
// - 'category_filter_click': User clicks category filter
// - 'newsletter_subscribe': User subscribes to newsletter
// - 'service_cta_from_blog': User clicks on service CTA (Google Ads, Meta Ads, etc.)
// - 'schedule_call_from_blog': User clicks schedule call CTA
// - 'explore_services': User clicks explore services CTA

const FEATURED_POST = {
  title: 'How to Calculate Google Ads ROI: A Simple Formula',
  excerpt: 'Learn how to calculate Google Ads ROI, understand ROAS, and identify whether your campaigns are actually profitable.',
  category: 'Google Ads',
  readingTime: '6 min read',
  href: '/blog/how-to-calculate-google-ads-roi',
};

const BLOG_POSTS = [
  {
    title: 'How to Calculate Google Ads ROI: A Simple Formula',
    excerpt: 'Understand Google Ads ROI, ROAS, cost per lead, and how to judge whether your paid campaigns are profitable.',
    category: 'Google Ads',
    readingTime: '6 min read',
    href: '/blog/how-to-calculate-google-ads-roi',
  },
  {
    title: '5 Reasons Your Facebook Ads Are Not Working',
    excerpt: 'Find out why your Meta campaigns may be getting clicks but not leads, sales, or serious enquiries.',
    category: 'Social Media Ads',
    readingTime: '7 min read',
    href: '/blog/facebook-ads-not-working',
  },
  {
    title: 'Lead Scoring 101: How to Qualify Sales Leads',
    excerpt: 'Learn how to separate serious prospects from random enquiries using basic lead scoring and qualification.',
    category: 'Lead Generation',
    readingTime: '8 min read',
    href: '/blog/lead-scoring-101',
  },
  {
    title: 'SEO vs PPC: Which Should Your Business Choose?',
    excerpt: 'Understand when to invest in SEO, when to use PPC, and when both channels should work together.',
    category: 'Marketing Strategy',
    readingTime: '7 min read',
    href: '/blog/seo-vs-ppc',
  },
  {
    title: 'E-commerce Conversion Optimization: 7 Proven Tactics',
    excerpt: 'Improve product pages, checkout flow, trust signals, and landing page conversion rates for better revenue.',
    category: 'Conversion Optimization',
    readingTime: '8 min read',
    href: '/blog/ecommerce-conversion-optimization',
  },
  {
    title: 'Google Shopping Ads Strategy: Complete Setup Guide',
    excerpt: 'Learn how Google Shopping Ads and Performance Max can support e-commerce revenue growth.',
    category: 'Google Ads',
    readingTime: '9 min read',
    href: '/blog/google-shopping-ads-strategy',
  },
  {
    title: 'LinkedIn Ads for B2B Lead Generation: Best Practices',
    excerpt: 'Understand how B2B brands can use LinkedIn-style campaigns and intent-driven messaging to generate serious leads.',
    category: 'Lead Generation',
    readingTime: '8 min read',
    href: '/blog/linkedin-ads-b2b-lead-generation',
  },
  {
    title: 'Seasonal Paid Ads Strategy: Holiday Marketing Guide',
    excerpt: 'Plan seasonal campaigns with the right budget, creative, offer, retargeting, and conversion tracking.',
    category: 'Marketing Strategy',
    readingTime: '7 min read',
    href: '/blog/seasonal-paid-ads-strategy',
  },
];

const TOPIC_CLUSTERS = [
  {
    title: 'Google Ads Growth',
    description: 'Learn how to improve ROI, reduce wasted spend, structure campaigns, and track conversions.',
    link: '/blog?category=google-ads',
  },
  {
    title: 'Meta Ads & Social Campaigns',
    description: 'Explore audience targeting, creative testing, retargeting, lead generation, and ROAS improvement.',
    link: '/blog?category=social-media-ads',
  },
  {
    title: 'Lead Generation',
    description: 'Learn how to generate, qualify, score, and track better leads for your sales team.',
    link: '/blog?category=lead-generation',
  },
  {
    title: 'SEO & Organic Growth',
    description: 'Understand keyword strategy, technical SEO, content planning, local SEO, and ranking improvement.',
    link: '/blog?category=seo',
  },
  {
    title: 'Conversion Optimization',
    description: 'Improve landing pages, forms, CTAs, tracking, and user journeys to increase conversions.',
    link: '/blog?category=conversion-optimization',
  },
];

const POPULAR_GUIDES = [
  { title: 'How to Improve Google Ads ROI', href: '/blog/how-to-calculate-google-ads-roi' },
  { title: 'Why Facebook Ads Get Low-Quality Leads', href: '/blog/facebook-ads-not-working' },
  { title: 'How to Calculate Lead Cost', href: '/blog/how-to-calculate-lead-cost' },
  { title: 'What Is a Qualified Lead?', href: '/blog/what-is-a-qualified-lead' },
];

export default function BlogPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BlogCollectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Blog</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="Performance Marketing Insights for Smarter Growth"
        subheadline="Practical guides, strategies, and breakdowns to help businesses improve ads, SEO, lead generation, ROAS, and conversion rates."
        cta={{ text: 'Get Free Marketing Audit', href: '/schedule-call' }}
        secondaryCta={{ text: 'Explore Blog Topics', href: '#topics' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">High-Intent Growth Guides</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Google Ads, Meta Ads, SEO & CRO</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Built for Business Owners</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Updated Monthly</p>
          </Card>
        </div>

        <div className="mt-12 relative h-64 sm:h-80 rounded-lg overflow-hidden bg-secondary/5 border border-border">
          <Image
            src="/images/blog-dashboard.png"
            alt="Blog content dashboard showing categories, keywords, and growth insights"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Hero>

      {/* 2. Featured Article Section */}
      <Section className="border-b border-border bg-secondary/5">
        <Container>
          <div className="mb-8">
            <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Featured Guide
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Latest Growth Insights</h2>
          </div>
          <BlogCard
            title={FEATURED_POST.title}
            excerpt={FEATURED_POST.excerpt}
            category={FEATURED_POST.category}
            readingTime={FEATURED_POST.readingTime}
            href={FEATURED_POST.href}
            featured={true}
          />
        </Container>
      </Section>

      {/* 3. Category Filter Section */}
      <Section className="border-b border-border">
        <Container>
          <div className="mb-6">
            <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Filter by Topic
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Browse by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', 'Google Ads', 'Social Media Ads', 'Lead Generation', 'SEO', 'Conversion Optimization', 'Marketing Strategy', 'Local SEO', 'Case Study Insights'].map((cat) => (
              <Button key={cat} variant="outline" size="sm" asChild>
                <Link href={`/blog?category=${cat.toLowerCase()}`}>{cat}</Link>
              </Button>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Blog Grid Section */}
      <Section>
        <Container>
          <div className="mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              All Articles
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Latest Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {BLOG_POSTS.map((post) => (
              <BlogCard
                key={post.href}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                readingTime={post.readingTime}
                href={post.href}
              />
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" disabled>
              Load More Articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-xs text-muted-foreground mt-3">Pagination coming soon</p>
          </div>
        </Container>
      </Section>

      {/* 5. Topic Cluster Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Browse Topics
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Explore by Growth Topic</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {TOPIC_CLUSTERS.map((cluster, idx) => (
              <Link key={idx} href={cluster.link}>
                <Card className="p-6 sm:p-8 flex flex-col hover:shadow-lg transition-shadow h-full">
                  <h3 className="mb-3 font-semibold text-accent text-lg">{cluster.title}</h3>
                  <p className="mb-6 text-muted-foreground text-sm flex-grow leading-relaxed">{cluster.description}</p>
                  <div className="inline-flex items-center gap-2 text-accent font-medium text-sm w-fit">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Newsletter Section */}
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Stay Updated
            </Badge>
            <h2 className="mb-2 text-2xl sm:text-3xl font-bold">Want Practical Growth Insights in Your Inbox?</h2>
            <p className="mb-6 text-muted-foreground">Get simple, useful marketing tips on ads, SEO, leads, ROAS, and conversion growth.</p>
            <form className="flex flex-col sm:flex-row gap-3 mb-4">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-md border border-border bg-background" />
              <Button type="submit">Subscribe for Insights</Button>
            </form>
            <p className="text-xs text-muted-foreground">No spam. Only practical marketing insights. Or <Link href="/schedule-call" className="text-accent hover:underline">prefer a direct audit?</Link></p>
          </div>
        </Container>
      </Section>

      {/* 7. Popular Guides Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Most Popular
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Top Marketing Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {POPULAR_GUIDES.map((guide, idx) => (
              <Link key={idx} href={guide.href}>
                <Card className="p-6 sm:p-8 hover:shadow-lg transition-shadow h-full flex items-center justify-between">
                  <h3 className="font-semibold">{guide.title}</h3>
                  <ArrowRight className="h-5 w-5 text-accent flex-shrink-0 ml-4" />
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Service CTA Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Need Help?
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Need Help Applying These Ideas?</h2>
            <p className="text-lg text-foreground max-w-2xl mx-auto">Reading is useful. But if your campaigns are leaking budget, leads, or conversions, you may need a proper audit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {[
              { title: 'Google Ads Audit', href: '/google-ads' },
              { title: 'Social Ads Audit', href: '/social-media-ads' },
              { title: 'Lead Generation Audit', href: '/lead-generation' },
              { title: 'SEO Audit', href: '/seo' },
              { title: 'Conversion Audit', href: '/conversion-optimization' },
            ].map((service, idx) => (
              <Card key={idx} className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <h3 className="mb-4 font-semibold text-accent">{service.title}</h3>
                <Button variant="outline" size="sm" asChild>
                  <Link href={service.href}>Learn More</Link>
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Final CTA Section */}
      <CTASection
        title="Ready to Turn Marketing Insights Into Measurable Growth?"
        description="Book a free strategy call and get clear recommendations based on your current marketing setup."
        primaryCta={{ text: 'Schedule Free Strategy Call', href: '/schedule-call' }}
        secondaryCta={{ text: 'Explore Services', href: '/services' }}
      />
    </>
  );
}
