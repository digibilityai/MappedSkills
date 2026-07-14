import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { ServiceCard } from '@/components/ServiceCard';
import { ProblemCard } from '@/components/ProblemCard';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { createMetadata } from '@/lib/metadata';
import { ArrowRight, CheckCircle, TrendingUp, AlertCircle, Award } from 'lucide-react';
import { BLOG_ARTICLES } from '@/lib/constants';

export const metadata = createMetadata(
  'Google Ads Management Agency | 300%+ ROI | MappedSkills',
  'Expert Google Ads management for e-commerce, lead generation, and B2B. Improve ROI with certified Google Ads specialists. Free audit included.',
  '/google-ads'
);

export default function GoogleAdsPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-foreground">Services</Link>
            <span>/</span>
            <span className="text-foreground">Google Ads</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="Google Ads Management That Scales Your Revenue"
        subheadline="Expert Google Ads Management"
        description="We help businesses turn Google Ads into a measurable growth channel with better campaign structure, sharper targeting, stronger tracking, and continuous optimization."
        cta={{
          text: 'Get Free Google Ads Audit',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Schedule Strategy Call',
          href: '/schedule-call',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">300%+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Average ROI</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">25+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Google Ads Clients</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">₹100Cr+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Revenue Influenced</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">9+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Years Experience</p>
          </Card>
        </div>
      </Hero>

      {/* 2. Problem Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Are Your Google Ads Spending Money Without Clear Returns?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              Most Google Ads accounts do not fail because Google Ads does not work. They fail because the campaign structure, keywords, landing pages, tracking, and optimization are weak.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Poor ROAS</h3>
              <p className="text-muted-foreground">
                You are spending consistently, but revenue or qualified leads are not increasing.
              </p>
            </Card>
            <Card className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">High CPC</h3>
              <p className="text-muted-foreground">
                You are paying too much for clicks because of weak keyword quality, poor relevance, or bad bidding.
              </p>
            </Card>
            <Card className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Low Conversion Rate</h3>
              <p className="text-muted-foreground">
                Visitors are clicking your ads but not converting because the landing page or offer is not strong enough.
              </p>
            </Card>
            <Card className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Wrong Audience or Keywords</h3>
              <p className="text-muted-foreground">
                Your ads may be reaching people who are searching, but not ready to buy or enquire.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 3. Consequence Section */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-3xl sm:text-4xl font-bold tracking-tight">
              Bad Google Ads Do More Than Waste Budget
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <AlertCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-foreground">You lose money on irrelevant clicks</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <AlertCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-foreground">Your sales team wastes time on poor leads</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <AlertCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-foreground">You make decisions from incomplete tracking</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <AlertCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-foreground">You scale campaigns that should actually be fixed</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <AlertCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-foreground">Competitors capture the same high-intent search demand</p>
                </div>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href="/schedule-call">
                Audit My Google Ads Account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 4. Our Google Ads Approach */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              How MappedSkills Builds Google Ads Campaigns That Can Actually Scale
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-6">
              <p className="mb-4 text-3xl font-bold text-accent">01</p>
              <h3 className="mb-2 font-semibold">Account Audit & Competitor Analysis</h3>
              <p className="text-sm text-muted-foreground">
                We review your current campaigns, search terms, keywords, match types, ads, landing pages, tracking, and competitor positioning.
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-4 text-3xl font-bold text-accent">02</p>
              <h3 className="mb-2 font-semibold">Strategy Design</h3>
              <p className="text-sm text-muted-foreground">
                We define the campaign structure, budget split, keyword strategy, audience segments, bidding approach, and conversion path.
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-4 text-3xl font-bold text-accent">03</p>
              <h3 className="mb-2 font-semibold">Campaign Launch</h3>
              <p className="text-sm text-muted-foreground">
                We build focused campaigns across Search, Performance Max, Remarketing, and other relevant Google Ads formats based on your goal.
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-4 text-3xl font-bold text-accent">04</p>
              <h3 className="mb-2 font-semibold">Daily Optimization & Scaling</h3>
              <p className="text-sm text-muted-foreground">
                We monitor search terms, CPC, CTR, conversion rate, cost per lead, ROAS, and lead quality to improve performance continuously.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 5. What We Manage */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Google Ads Management Services We Provide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Search Ads',
                description: 'Capture high-intent buyers actively searching for your service or product.',
              },
              {
                title: 'Performance Max Campaigns',
                description: "Use Google's full inventory with proper feed, audience, asset, and conversion strategy.",
              },
              {
                title: 'Remarketing Campaigns',
                description: 'Bring back website visitors, abandoned leads, and warm prospects with focused messaging.',
              },
              {
                title: 'Keyword Strategy',
                description: 'Build campaigns around high-intent keywords, negative keywords, match types, and search intent.',
              },
              {
                title: 'Ad Copy Testing',
                description: 'Test headlines, descriptions, offers, and CTAs to improve click quality and conversion.',
              },
              {
                title: 'Landing Page Recommendations',
                description: 'Improve the page experience so more visitors turn into enquiries, leads, or purchases.',
              },
              {
                title: 'Conversion Tracking',
                description: 'Set up and monitor important actions like form submissions, calls, purchases, and booked meetings.',
              },
              {
                title: 'Monthly Reporting',
                description: 'Get clear reporting on spend, leads, cost per lead, conversions, ROAS, and what needs to improve.',
              },
            ].map((service, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Industry Use Cases */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Google Ads Campaigns Built for Different Business Models
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Real Estate',
                description: 'Generate enquiries for residential, commercial, and redevelopment projects with location and intent-based campaigns.',
              },
              {
                title: 'E-commerce',
                description: 'Improve sales, ROAS, and product visibility through Search, Shopping, Performance Max, and remarketing.',
              },
              {
                title: 'B2B Services',
                description: 'Capture decision-makers searching for specialized services, vendors, consultants, or solution providers.',
              },
              {
                title: 'Education & Courses',
                description: 'Drive course enquiries, webinar registrations, and enrollments with high-intent keyword targeting.',
              },
            ].map((useCase, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-2 text-lg font-semibold">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Results Proof */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Google Ads Should Be Judged by Business Results
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              Real campaigns. Real data. Real growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <CaseStudyCard
              title="E-commerce Brand"
              result="₹15L to ₹45L revenue in 90 days"
              service="Google Search + Performance Max"
              beforeAfter="3x revenue growth"
            />
            <CaseStudyCard
              title="Lead Generation Business"
              result="50 to 300 leads/month"
              service="Search Ads + Landing Page Optimization"
              beforeAfter="6x lead volume"
            />
            <CaseStudyCard
              title="B2B Service Provider"
              result="2.5x ROAS in 30 days"
              service="Search Ads + Remarketing"
              beforeAfter="Improved return on ad spend"
            />
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/results">
                Read Full Case Studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 8. Why Choose MappedSkills */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Why Choose MappedSkills as Your Google Ads Management Agency?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: 'Performance-First Strategy',
                description: 'We focus on leads, revenue, ROAS, and conversion quality — not vanity metrics.',
              },
              {
                title: 'Tracking Before Scaling',
                description: 'We make sure conversions are properly tracked before increasing budgets.',
              },
              {
                title: 'Business-Language Reporting',
                description: 'You get reports that explain what is working, what is not, and what needs to change.',
              },
              {
                title: 'Campaign + Funnel Thinking',
                description: 'We do not just run ads. We improve the full path from keyword to landing page to enquiry.',
              },
            ].map((reason, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Missing CTA After Why Choose MappedSkills */}
      <Section className="bg-accent/5">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-6 text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Improve Your Google Ads Performance?
            </h2>
            <p className="mb-8 text-lg text-foreground leading-relaxed">
              Book a free Google Ads audit and we'll show you exactly where your budget is leaking and how to fix it.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link href="/schedule-call">
                Audit My Google Ads Account
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 10. Pricing */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Google Ads Management Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              Google Ads management pricing depends on your business model, ad budget, campaign complexity, and growth goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {[
              {
                name: 'Starter',
                best: 'Single-service businesses or focused lead generation',
                features: [
                  '1 primary campaign goal',
                  'Search campaign setup',
                  'Basic remarketing',
                  'Monthly reporting',
                ],
              },
              {
                name: 'Growth',
                best: 'Businesses running multiple campaigns or locations',
                features: [
                  'Search + Performance Max',
                  'Remarketing',
                  'Conversion tracking review',
                  'Weekly optimization',
                  'Monthly strategy call',
                ],
              },
              {
                name: 'Scale',
                best: 'High-budget accounts and aggressive growth campaigns',
                features: [
                  'Multi-campaign structure',
                  'Advanced audience strategy',
                  'Landing page recommendations',
                  'Custom reporting dashboard',
                  'Scaling roadmap',
                ],
              },
            ].map((plan, idx) => (
              <Card key={idx} className="p-6 sm:p-8 flex flex-col">
                <h3 className="mb-2 text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.best}</p>
                <ul className="flex-grow space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/pricing">Get Custom Quote</Link>
                </Button>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Ad spend is paid directly to Google. Management fees are separate.
          </p>
        </Container>
      </Section>

      {/* 10. FAQ */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
                Google Ads Management FAQs
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: 'How soon can we see results from Google Ads?',
                  answer: 'Early signals usually appear within the first few weeks, but stable performance depends on campaign structure, budget, competition, landing page quality, and tracking.',
                },
                {
                  question: 'Do you guarantee leads or sales?',
                  answer: 'We do not give fake guarantees. We focus on building the right structure, improving conversion tracking, reducing waste, and scaling what works.',
                },
                {
                  question: 'Do you manage existing Google Ads accounts?',
                  answer: 'Yes. We first audit the current account, identify waste, and then recommend whether to restructure, optimize, or rebuild campaigns.',
                },
                {
                  question: 'What budget do I need for Google Ads?',
                  answer: 'The right budget depends on your industry, location, CPC, and target lead volume. We recommend starting with a budget that allows enough data for optimization.',
                },
                {
                  question: 'Do you also help with landing pages?',
                  answer: 'Yes. If your landing page is weak, we give clear recommendations because ads alone cannot fix a poor conversion experience.',
                },
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-base font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* 11. Blog Preview */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Growth Insights
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Latest Google Ads & Performance Marketing Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {BLOG_ARTICLES.slice(0, 3).map((article, idx) => (
              <Card key={idx} className="p-6 sm:p-8 border border-border/50 bg-white hover:shadow-lg transition-shadow">
                <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-semibold">
                  {article.category}
                </Badge>
                <Link href={article.href}>
                  <h3 className="mb-3 text-lg font-bold text-foreground hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.readingTime}</span>
                  <span>{article.publishDate}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">
                View All Articles
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 12. Final CTA */}
      <CTASection
        title="Ready to Stop Guessing With Google Ads?"
        description="Get a free Google Ads audit and see where your budget is leaking, what needs fixing, and how your campaigns can become more profitable."
        primaryCta={{
          text: 'Get Free Google Ads Audit',
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
