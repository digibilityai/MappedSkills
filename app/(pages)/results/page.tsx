import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { BeforeAfterMetric } from '@/components/BeforeAfterMetric';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResultsFilter, ResultsGrid } from '@/components/ResultsFilter';
import { createMetadata } from '@/lib/metadata';
import { BarChart3, TrendingUp, CheckCircle, ArrowRight, Target, Zap } from 'lucide-react';
import { RESULTS_STATS, WHAT_WE_MEASURE, PROOF_PRINCIPLES } from '@/lib/constants';

export const metadata = createMetadata(
  'Performance Marketing Case Studies | Real Results from Real Clients | MappedSkills',
  'Explore real performance marketing case studies and growth results. See how MappedSkills improved leads, ROAS, revenue, and conversions for Google Ads, Meta Ads, SEO, and lead generation campaigns.',
  '/results'
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
      name: 'Results',
      item: 'https://mappedskills.com/results',
    },
  ],
};

const OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MappedSkills',
  url: 'https://mappedskills.com',
  image: 'https://mappedskills.com/logo.png',
  description: 'Performance marketing services: Google Ads, Meta Ads, lead generation, SEO, and conversion optimization.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'contact@mappedskills.com',
  },
};

// GA4 Tracking Configuration
// Event names to implement: 'case_study_view', 'schedule_call_from_results', 'contact_click'

const FEATURED_CASE_STUDIES = [
  {
    title: 'Real Estate Lead Generation Campaign',
    industry: 'Real Estate',
    service: 'Google Ads + Meta Ads',
    before: '15 qualified leads/month',
    after: '50 qualified leads/month',
    result: '3.3x increase',
    summary: 'MappedSkills helped restructure the campaign strategy, improve lead quality, and create a better follow-up funnel for serious property enquiries.',
    href: '/results/real-estate-lead-generation',
  },
  {
    title: 'E-commerce Revenue Growth Campaign',
    industry: 'E-commerce',
    service: 'Social Media Ads + SEO',
    before: '₹20L monthly revenue',
    after: '₹100L monthly revenue',
    result: '5x revenue growth',
    summary: 'MappedSkills improved paid social targeting, retargeting, product visibility, and conversion paths to help scale revenue.',
    href: '/results/ecommerce-revenue-growth',
  },
  {
    title: 'Online Education Enrollment Campaign',
    industry: 'Education',
    service: 'Google Ads + Lead Generation',
    before: '100 course enrollments',
    after: '500 course enrollments',
    result: '5x increase',
    summary: 'MappedSkills improved targeting, campaign structure, lead capture, and nurturing to increase course enrollments.',
    href: '/results/online-education-enrollments',
  },
];

const ALL_CASE_STUDIES = [
  {
    title: 'Google Ads for B2B Service Business',
    industry: 'B2B Services',
    service: 'Google Ads',
    result: '2.5x ROAS in 30 days',
    summary: 'Improved return on ad spend through targeting refinement and bid optimization.',
    href: '#',
  },
  {
    title: 'Meta Ads for Real Estate Project',
    industry: 'Real Estate',
    service: 'Social Media Ads',
    result: '50 qualified leads/month',
    summary: 'Better lead quality and improved campaign structure for property enquiries.',
    href: '#',
  },
  {
    title: 'Lead Generation for Service Provider',
    industry: 'Professional Services',
    service: 'Lead Generation',
    result: '50 appointment-ready leads/month',
    summary: 'Predictable lead pipeline through form optimization and qualification.',
    href: '#',
  },
  {
    title: 'SEO Growth for Business Website',
    industry: 'Service Business',
    service: 'SEO',
    result: '150 keyword rankings',
    summary: 'Improved search visibility through technical SEO and content optimization.',
    href: '#',
  },
  {
    title: 'CRO for Landing Page',
    industry: 'Lead Generation',
    service: 'Conversion Optimization',
    result: '2.5x form submissions',
    summary: 'More leads without more traffic through landing page optimization.',
    href: '#',
  },
  {
    title: 'Multi-Channel Campaign for Growth Brand',
    industry: 'E-commerce',
    service: 'Google Ads + Meta Ads + CRO',
    result: 'Improved revenue consistency',
    summary: 'Better campaign scalability and performance through integrated strategy.',
    href: '#',
  },
];

export default function ResultsPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(OrganizationSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Results</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="Real Results From Real Performance Marketing Campaigns"
        subheadline="Explore how MappedSkills helps businesses improve leads, revenue, ROAS, traffic, and conversions through Google Ads, Meta Ads, SEO, lead generation, and CRO."
        description=""
        cta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Contact Us',
          href: '/contact',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">50+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Clients Served</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">₹100Cr+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Revenue Influenced</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">300%+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Average ROI</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">65%+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Client Retention</p>
          </Card>
        </div>
      </Hero>

      {/* 2. Filter Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-8">
            <h2 className="mb-6 text-xl sm:text-2xl font-bold">Explore Results by Service or Industry</h2>
            <ResultsFilter />
          </div>
        </Container>
      </Section>

      {/* 3. Featured Results Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">Featured Growth Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {FEATURED_CASE_STUDIES.map((study) => (
              <CaseStudyCard
                key={study.title}
                title={study.title}
                industry={study.industry}
                service={study.service}
                result={study.result}
                beforeAfter={`${study.before} → ${study.after}`}
                summary={study.summary}
                href={study.href}
                featured={true}
              />
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="#results-grid">
                View All Results <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 4. Results Grid Section */}
      <Section className="border-y border-border bg-secondary/5" id="results-grid">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">More Campaign Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ALL_CASE_STUDIES.map((study) => (
              <CaseStudyCard
                key={study.title}
                title={study.title}
                industry={study.industry}
                service={study.service}
                result={study.result}
                summary={study.summary}
                href={study.href}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Summary Statistics Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Performance Marketing Measured by Business Outcomes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <Card className="p-8 text-center">
              <p className="text-4xl font-bold text-accent mb-2">50+</p>
              <p className="text-muted-foreground font-medium">Clients Served</p>
            </Card>
            <Card className="p-8 text-center">
              <p className="text-4xl font-bold text-accent mb-2">₹100Cr+</p>
              <p className="text-muted-foreground font-medium">Revenue Influenced</p>
            </Card>
            <Card className="p-8 text-center">
              <p className="text-4xl font-bold text-accent mb-2">300%+</p>
              <p className="text-muted-foreground font-medium">Average ROI</p>
            </Card>
            <Card className="p-8 text-center">
              <p className="text-4xl font-bold text-accent mb-2">65%+</p>
              <p className="text-muted-foreground font-medium">Client Retention</p>
            </Card>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-6 sm:p-8">
            <p className="text-center text-foreground">
              Every result depends on industry, budget, offer, funnel, competition, and execution speed. We focus on building systems that improve measurable performance, not vanity metrics.
            </p>
          </div>
        </Container>
      </Section>

      {/* 6. What We Measure Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">What We Measure in Every Campaign</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Lead Volume',
                description: 'How many enquiries or leads were generated.',
                icon: TrendingUp,
              },
              {
                title: 'Lead Quality',
                description: 'How many leads were relevant, serious, and sales-worthy.',
                icon: Target,
              },
              {
                title: 'Cost Per Lead',
                description: 'How much each lead cost and whether the cost was sustainable.',
                icon: BarChart3,
              },
              {
                title: 'Conversion Rate',
                description: 'How many visitors, clicks, or leads turned into the desired action.',
                icon: CheckCircle,
              },
              {
                title: 'ROAS / Revenue Impact',
                description: 'How much revenue or return was influenced by the campaign.',
                icon: Zap,
              },
              {
                title: 'Next Action',
                description: 'What should be optimized, scaled, paused, or tested next.',
                icon: ArrowRight,
              },
            ].map((metric, idx) => {
              const IconComponent = metric.icon;
              return (
                <Card key={idx} className="p-6 sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <IconComponent className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">{metric.title}</h3>
                  <p className="text-muted-foreground text-sm">{metric.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 7. Proof Philosophy Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">We Believe Proof Should Be Specific</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              A good marketing result should not say "campaign performed well." It should show what improved, by how much, in what time period, and what business impact it created.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                principle: 'Before → After',
                description: 'Show the starting point and improvement clearly.',
              },
              {
                principle: 'Service Context',
                description: 'Explain which channel or strategy created the result.',
              },
              {
                principle: 'Business Impact',
                description: 'Connect metrics to leads, sales, revenue, or pipeline.',
              },
              {
                principle: 'Next Step',
                description: 'Show how the result can be optimized or scaled further.',
              },
            ].map((principle, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-2 text-lg font-bold text-accent">{principle.principle}</h3>
                <p className="text-muted-foreground text-sm">{principle.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Testimonials Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">What Clients Say About Working With MappedSkills</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote: 'MappedSkills helped us understand our campaigns in simple business terms. We could clearly see what was working and where leads were coming from.',
                author: 'Client Name',
                industry: 'Real Estate',
              },
              {
                quote: 'The team focused on lead quality, not just lead numbers. That made a big difference to our sales conversations.',
                author: 'Client Name',
                industry: 'Services',
              },
              {
                quote: 'We finally had reporting that connected marketing activity with business outcomes.',
                author: 'Client Name',
                industry: 'E-commerce',
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-8">
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                <p className="mb-6 text-foreground leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.industry}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. CTA Section */}
      <CTASection
        title="Ready to Create Your Own Growth Story?"
        description="Book a free strategy call and discover what is blocking your leads, revenue, ROAS, or conversion growth."
        primaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Contact Us',
          href: '/contact',
        }}
      />
    </>
  );
}
