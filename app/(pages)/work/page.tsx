import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata, siteMetadata } from '@/lib/metadata';
import { getCaseStudyListCards } from '@/lib/contentful/case-studies';
import { BarChart3, TrendingUp, CheckCircle, ArrowRight, Target, Zap } from 'lucide-react';

export const revalidate = 60;

export const metadata = createMetadata(
  'Performance Marketing Case Studies | Real Results from Real Clients | MappedSkills',
  'Explore real performance marketing case studies and growth results. See how MappedSkills improved leads, ROAS, revenue, and conversions for Google Ads, Meta Ads, SEO, and lead generation campaigns.',
  '/work'
);

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
      name: 'Case Studies',
      item: 'https://mappedskills.com/work',
    },
  ],
};

const OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MappedSkills',
  url: 'https://mappedskills.com',
  image: `${siteMetadata.baseUrl}${siteMetadata.logoPath}`,
  description:
    'Performance marketing services: Google Ads, Meta Ads, lead generation, SEO, and conversion optimization.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'contact@mappedskills.com',
  },
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudyListCards();
  const featured = caseStudies.slice(0, 3);
  const rest = caseStudies.slice(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(OrganizationSchema) }}
      />

      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Case Studies</span>
          </div>
        </Container>
      </Section>

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
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
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

      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Featured Growth Stories
            </h2>
          </div>
          {featured.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
                {featured.map((study) => (
                  <CaseStudyCard
                    key={study.slug}
                    title={study.title}
                    industry={study.industry}
                    service={study.service}
                    summary={study.summary}
                    href={study.href}
                    featured={true}
                  />
                ))}
              </div>
              {rest.length > 0 ? (
                <div className="text-center">
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#results-grid">
                      View All Results <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-center text-muted-foreground">
              Case studies will appear here once published in Contentful.
            </p>
          )}
        </Container>
      </Section>

      {rest.length > 0 ? (
        <Section className="border-y border-border bg-secondary/5" id="results-grid">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
                More Campaign Results
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {rest.map((study) => (
                <CaseStudyCard
                  key={study.slug}
                  title={study.title}
                  industry={study.industry}
                  service={study.service}
                  summary={study.summary}
                  href={study.href}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

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
              Every result depends on industry, budget, offer, funnel, competition, and execution
              speed. We focus on building systems that improve measurable performance, not vanity
              metrics.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What We Measure in Every Campaign
            </h2>
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

      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              We Believe Proof Should Be Specific
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              A good marketing result should not say &quot;campaign performed well.&quot; It should show what
              improved, by how much, in what time period, and what business impact it created.
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

      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What Clients Say About Working With MappedSkills
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote:
                  'MappedSkills helped us understand our campaigns in simple business terms. We could clearly see what was working and where leads were coming from.',
                author: 'Client Name',
                industry: 'Real Estate',
              },
              {
                quote:
                  'The team focused on lead quality, not just lead numbers. That made a big difference to our sales conversations.',
                author: 'Client Name',
                industry: 'Services',
              },
              {
                quote:
                  'We finally had reporting that connected marketing activity with business outcomes.',
                author: 'Client Name',
                industry: 'E-commerce',
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-8">
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-foreground leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.industry}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

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
