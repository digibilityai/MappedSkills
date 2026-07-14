import Link from 'next/link';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import { AlertCircle, ArrowRight, Search } from 'lucide-react';

export const metadata: Metadata = {
  ...createMetadata(
    '404 - Page Not Found | MappedSkills',
    'The page you are looking for may have moved. Explore our services or schedule a free strategy call.',
    '/404'
  ),
  robots: 'noindex, nofollow',
  canonical: 'https://mappedskills.com/404',
};

// Data constants
const HELPFUL_LINKS = [
  { title: 'Google Ads Management', href: '/google-ads' },
  { title: 'Social Media Ads Management', href: '/social-media-ads' },
  { title: 'Lead Generation Services', href: '/lead-generation' },
  { title: 'SEO Services', href: '/seo' },
  { title: 'Conversion Optimization', href: '/conversion-optimization' },
  { title: 'Pricing', href: '/pricing' },
];

const POPULAR_PAGES = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Results', href: '/results' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Schedule Call', href: '/schedule-call' },
];

const BLOG_ARTICLES = [
  { title: 'How to Calculate Google Ads ROI', href: '/blog/how-to-calculate-google-ads-roi' },
  { title: '5 Reasons Your Facebook Ads Are Not Working', href: '/blog/facebook-ads-not-working' },
  { title: 'SEO vs PPC: Which Should Your Business Choose?', href: '/blog/seo-vs-ppc' },
];

export default function NotFound() {
  return (
    <>
      {/* Tracking: page_404_view */}
      {/* 1. Hero / Error Section */}
      <Hero
        title="Page Not Found"
        subtitle="404 Error"
        subheadline="The page you are looking for may have moved, but we can still help you find the right growth path."
        cta={{
          text: 'Explore Services',
          href: '/services',
        }}
        secondaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
      >
        {/* 404 Visual */}
        <div className="flex items-center justify-center mt-8 sm:mt-12">
          <div className="relative w-full max-w-md">
            <Card className="p-8 sm:p-12 bg-gradient-to-br from-red-50 to-white border-2 border-accent/20">
              <div className="text-center">
                <AlertCircle className="h-16 w-16 text-accent mx-auto mb-4 opacity-60" />
                <p className="text-5xl sm:text-6xl font-bold text-accent mb-2">404</p>
                <p className="text-muted-foreground text-sm">This page seems to have wandered off.</p>
              </div>
            </Card>
          </div>
        </div>
      </Hero>

      {/* 2. Helpful Links Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Looking for Something Specific?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {HELPFUL_LINKS.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group"
              >
                <Card className="p-6 h-full hover:border-accent/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {link.title}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                  {/* Tracking: service_cta_click or pricing_cta_click */}
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Popular Pages Section */}
      <Section className="bg-secondary/5">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Popular Pages
            </h2>
            <p className="text-muted-foreground">Quick links to navigate the site</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {POPULAR_PAGES.map((page, idx) => (
                <Link key={idx} href={page.href}>
                  <Button variant="outline" size="sm" className="h-10">
                    {page.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Blog Suggestion Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Want to Learn Before You Decide?
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Check out practical guides on performance marketing, ads, and growth strategies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_ARTICLES.map((article, idx) => (
              <Card key={idx} className="p-6 sm:p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
                <Search className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-lg font-bold mb-4 text-balance">{article.title}</h3>
                {/* Tracking: related_article_click */}
                <Link
                  href={article.href}
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm mt-auto hover:gap-3 transition-all"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Final CTA Section */}
      <CTASection
        title="Still Not Sure Where to Go?"
        description="Book a free strategy call and we'll help you identify what is working, what is leaking, and what should be fixed first."
        primaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Contact Us',
          href: '/contact',
        }}
      />

      {/* Tracking placeholders for GA4 events */}
      {/* 
        Tracking events on this page:
        1. page_404_view - Page loaded
        2. service_cta_click - Service link clicked (helpful links section)
        3. schedule_call_click - Schedule call CTA clicked (hero, final CTA)
        4. home_cta_click - Go home or explore navigation (popular pages)
        5. pricing_cta_click - Pricing link clicked (helpful links)
        6. related_article_click - Blog article link clicked (blog section)
        7. contact_click - Contact CTA clicked (final CTA)
      */}
    </>
  );
}
