import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { createMetadata } from '@/lib/metadata';
import { ArrowRight, CheckCircle, AlertCircle, BarChart3, Lock, TrendingUp } from 'lucide-react';

// Tracking Configuration for GA4
// Event names to implement:
// - 'strategy_audit_cta_click': Hero primary CTA + final CTA
// - 'results_cta_click': Hero secondary CTA
// - 'schedule_call_click': Final CTA primary
// - 'contact_click': Final CTA secondary
// Add data-tracking-event attributes to Button components for GTM integration

export const metadata = createMetadata(
  'Performance Marketing Process | Audit → Strategy → Launch → Optimize | MappedSkills',
  'Learn the MappedSkills performance marketing process: transparent audits, data-driven strategy, systematic optimization, and measurable results every month.',
  '/how-it-works'
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
      name: 'How It Works',
      item: 'https://mappedskills.com/how-it-works',
    },
  ],
};

const FAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to see results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results depend on your market, competition, and starting point. Most clients see early signals within 30 days and meaningful growth within 60-90 days. We track progress weekly so you can see improvements as they happen.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does the process cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs vary based on scope, channels, competition, and goals. We offer custom pricing after understanding your business. Most businesses start between ₹50,000 to ₹500,000 per month depending on scale and complexity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with all business types?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with B2B, B2C, SaaS, e-commerce, agencies, and service businesses. We specialize in businesses that need qualified leads, improved ROAS, or measurable growth from marketing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if campaigns are already running?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Great! We audit existing campaigns, improve targeting, messaging, landing pages, tracking, and funnel optimization. Many clients see immediate improvements by fixing what is already running.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide detailed reporting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Reporting includes campaign performance, leads, cost per lead, conversion rate, quality signals, and recommended next actions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work only on ads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We connect ads, SEO, landing pages, lead capture, tracking, reporting, and conversion optimization depending on the business goal.',
      },
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbSchema) }}
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
            <span className="text-foreground">How It Works</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="How We Deliver Measurable Marketing Results"
        subheadline="Our performance marketing process is built around clarity, tracking, optimization, and business outcomes — not guesswork."
        description=""
        cta={{
          text: 'Start Your Free Strategy Audit',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'See Our Results',
          href: '/results',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">6-Step</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Growth Process</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">300%+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Average ROI</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">50+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Clients Served</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">Monthly</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Transparent Reporting</p>
          </Card>
        </div>
      </Hero>

      {/* 2. Why Process Matters Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Marketing Fails When There Is No Clear Process
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              Most campaigns fail because businesses jump directly into execution without auditing the funnel, fixing tracking, defining goals, or understanding what success should look like.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Proper Audit</h3>
              <p className="text-muted-foreground">
                Campaigns are launched before understanding what is broken.
              </p>
            </Card>
            <Card className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Clear Strategy</h3>
              <p className="text-muted-foreground">
                Budgets, channels, audiences, and offers are selected without enough clarity.
              </p>
            </Card>
            <Card className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Reliable Tracking</h3>
              <p className="text-muted-foreground">
                Leads, calls, purchases, and booked meetings are not tracked properly.
              </p>
            </Card>
            <Card className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Optimization Rhythm</h3>
              <p className="text-muted-foreground">
                Reports are shared, but no clear action is taken to improve performance.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 3. Our 6-Step Process Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              The MappedSkills 6-Step Growth Process
            </h2>
          </div>
          <div className="space-y-8 sm:space-y-12">
            {[
              {
                step: '01',
                title: 'Discovery & Audit',
                description: 'We review your current marketing activity, website, landing pages, ad accounts, SEO performance, analytics, tracking setup, lead quality, and growth gaps.',
                what_we_analyze: [
                  'Current marketing channels',
                  'Website and landing pages',
                  'Ad account structure',
                  'SEO visibility',
                  'Tracking and analytics',
                  'Lead quality',
                  'Conversion gaps',
                ],
                deliverable: 'Full audit report + findings discussion',
              },
              {
                step: '02',
                title: 'Strategy Development',
                description: 'We create a custom growth strategy based on your business model, target audience, budget, offer, competition, and conversion goals.',
                what_we_analyze: [
                  'Target audience',
                  'Channel mix',
                  'Campaign goals',
                  'Keyword strategy',
                  'Budget allocation',
                  'Offer positioning',
                  'Conversion path',
                ],
                deliverable: 'Custom strategy document + approval before execution',
              },
              {
                step: '03',
                title: 'Campaign Setup & Launch',
                description: 'Once the strategy is approved, we build campaigns, creatives, copy, landing page recommendations, tracking events, and reporting structure.',
                what_we_analyze: [
                  'Google Ads campaigns',
                  'Meta Ads campaigns',
                  'SEO page priorities',
                  'Lead generation funnels',
                  'Conversion tracking',
                  'Reporting dashboard',
                  'CTA and form tracking',
                ],
                deliverable: 'Campaigns live with tracking and reporting in place',
              },
              {
                step: '04',
                title: 'Daily Optimization',
                description: 'We monitor campaigns and performance signals regularly so budget is not wasted and weak areas are improved quickly.',
                what_we_analyze: [
                  'Search terms',
                  'Audiences',
                  'Bids and budgets',
                  'Ad copy',
                  'Creatives',
                  'Landing pages',
                  'Lead quality',
                  'Cost per lead',
                  'Conversion rate',
                ],
                deliverable: 'Weekly optimization notes and performance improvements',
              },
              {
                step: '05',
                title: 'Scaling',
                description: 'Once a campaign, channel, keyword, or audience starts producing profitable results, we scale it carefully without breaking performance.',
                what_we_analyze: [
                  'Winning campaigns',
                  'High-quality audiences',
                  'Profitable keywords',
                  'Retargeting funnels',
                  'Best-performing offers',
                  'Strong landing pages',
                  'New locations or segments',
                ],
                deliverable: 'Monthly scaling roadmap',
              },
              {
                step: '06',
                title: 'Reporting & Strategy Calls',
                description: 'We report what happened, why it happened, what worked, what failed, and what needs to change next.',
                what_we_analyze: [
                  'Spend',
                  'Leads',
                  'Cost per lead',
                  'Lead quality',
                  'Conversion rate',
                  'ROAS',
                  'Revenue impact',
                  'Keyword rankings',
                  'Traffic sources',
                  'Next actions',
                ],
                deliverable: 'Monthly dashboard + KPI tracking + strategy call',
              },
            ].map((process, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-border last:border-b-0 last:pb-0">
                <div className="md:col-span-1">
                  <p className="text-5xl sm:text-6xl font-bold text-accent mb-4">{process.step}</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{process.title}</h3>
                </div>
                <div className="md:col-span-3">
                  <p className="text-lg text-foreground mb-6">{process.description}</p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    {process.what_we_analyze.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/50 p-4">
                    <p className="text-sm font-medium text-foreground">
                      <span className="text-accent">Deliverable:</span> {process.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Timeline Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What the First 30 Days Usually Look Like
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              {
                week: 'Week 1',
                title: 'Discovery & Audit',
                description: 'We understand your business, review current marketing assets, inspect tracking, and identify major leaks.',
              },
              {
                week: 'Week 2',
                title: 'Strategy Approval',
                description: 'We share the strategy, campaign direction, budget plan, tracking requirements, and implementation roadmap.',
              },
              {
                week: 'Week 3',
                title: 'Campaign Setup & Launch',
                description: 'We build and launch campaigns, set up tracking, test forms, and confirm reporting.',
              },
              {
                week: 'Week 4',
                title: 'First Optimization Cycle',
                description: 'We review early signals, remove waste, improve targeting, adjust messaging, and share first insights.',
              },
              {
                week: 'Week 4+',
                title: 'Ongoing Optimization',
                description: 'We continue improving campaigns based on data, lead quality, sales feedback, and business goals.',
              },
            ].map((phase, idx) => (
              <Card key={idx} className="p-6">
                <p className="text-sm font-semibold text-accent mb-2">{phase.week}</p>
                <h4 className="mb-3 font-bold text-lg">{phase.title}</h4>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. What Makes Our Process Different Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Why Our Process Works Better Than Random Marketing Activity
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: 'Tracking Before Scaling',
                description: 'We do not scale campaigns until the important actions are tracked properly.',
                icon: Lock,
              },
              {
                title: 'Strategy Before Execution',
                description: 'We do not start with ads. We start with business goals, funnel clarity, and conversion path.',
                icon: TrendingUp,
              },
              {
                title: 'Lead Quality Feedback',
                description: 'We use sales feedback to understand whether campaigns are producing real opportunities.',
                icon: BarChart3,
              },
              {
                title: 'Clear Business Reporting',
                description: 'You get simple reporting that explains what is working, what is not, and what needs to change.',
                icon: CheckCircle,
              },
            ].map((reason, idx) => {
              const IconComponent = reason.icon;
              return (
                <Card key={idx} className="p-6 sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <IconComponent className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 6. Tools We Use Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Tools We Use to Track and Improve Performance
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Google Analytics 4',
                description: 'To track traffic, conversions, user behavior, and performance by landing page.',
              },
              {
                title: 'Google Tag Manager',
                description: 'To track forms, CTA clicks, WhatsApp clicks, calls, downloads, and booked meetings.',
              },
              {
                title: 'Google Search Console',
                description: 'To track organic visibility, indexing, search queries, impressions, and click-through rates.',
              },
              {
                title: 'Ad Platform Dashboards',
                description: 'To monitor Google Ads, Meta Ads, campaign spend, cost per result, ROAS, and optimization signals.',
              },
              {
                title: 'Custom Dashboards',
                description: 'To simplify reporting and show the business metrics that matter.',
              },
              {
                title: 'Heatmaps & Session Recordings',
                description: 'To understand user behavior and identify conversion friction when needed.',
              },
            ].map((tool, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-2 font-semibold text-lg">{tool.title}</h3>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Reporting Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Our Reports Are Built for Business Decisions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              We do not send confusing reports filled with vanity metrics. We show what happened and what should happen next.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {[
              'Total spend',
              'Leads generated',
              'Cost per lead',
              'Qualified leads',
              'Conversion rate',
              'ROAS',
              'Top campaigns',
              'Underperforming campaigns',
              'Best landing pages',
              'Lead quality notes',
            ].map((metric, idx) => (
              <Card key={idx} className="p-4 text-center">
                <BarChart3 className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">{metric}</p>
              </Card>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-8">
            <h3 className="mb-4 text-xl font-bold">Every Report Answers Three Questions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold text-accent mb-2">1. What worked?</p>
                <p className="text-muted-foreground">Which campaigns, keywords, audiences, and creatives performed best and should continue or scale.</p>
              </div>
              <div>
                <p className="font-semibold text-accent mb-2">2. What did not work?</p>
                <p className="text-muted-foreground">Which channels, campaigns, or offers underperformed and should be paused or adjusted.</p>
              </div>
              <div>
                <p className="font-semibold text-accent mb-2">3. What are we changing next?</p>
                <p className="text-muted-foreground">Concrete action items for the next optimization cycle based on data and feedback.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Client Commitment Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What We Need From You to Get Better Results
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {[
              {
                title: 'Clear Business Goals',
                description: 'We need clarity on what you want — leads, sales, calls, bookings, revenue, or visibility.',
              },
              {
                title: 'Fast Feedback',
                description: 'Campaigns improve faster when you share lead quality and sales feedback quickly.',
              },
              {
                title: 'Access to Data',
                description: 'We need access to ad accounts, analytics, website, landing pages, and other relevant tools.',
              },
              {
                title: 'Offer Clarity',
                description: 'Strong marketing needs a clear offer, strong reason to enquire, and a defined target customer.',
              },
              {
                title: 'Patience for Optimization',
                description: 'Performance marketing improves with data. The first few weeks are for learning, fixing, and optimizing.',
              },
            ].map((commitment, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">{commitment.title}</h3>
                <p className="text-sm text-muted-foreground">{commitment.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. MappedSkills Commitment Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What You Can Expect From MappedSkills
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                'Transparent communication',
                'Clear strategy before execution',
                'Proper tracking setup',
                'Weekly performance review',
                'Monthly reporting',
                'Practical recommendations',
                'No fake guarantees',
                'No vanity reporting',
                'Data-backed optimization',
                'Focus on business outcomes',
              ].map((commitment, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{commitment}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 10. Example Growth Flow Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Example: How We Improve a Campaign
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                stage: 'Current Situation',
                content: 'A business spends ₹50,000/month on ads but receives poor-quality leads.',
                color: 'bg-red-50 border-red-200',
                icon: AlertCircle,
              },
              {
                stage: 'Audit Finding',
                content: 'Campaigns are broad, forms are weak, and tracking only shows total leads, not qualified leads.',
                color: 'bg-yellow-50 border-yellow-200',
                icon: AlertCircle,
              },
              {
                stage: 'Strategy',
                content: 'Improve targeting, add qualification questions, rebuild landing page CTA, and track lead source.',
                color: 'bg-blue-50 border-blue-200',
                icon: TrendingUp,
              },
              {
                stage: 'Optimization',
                content: 'Pause weak audiences, improve ad copy, add retargeting, and review lead quality weekly.',
                color: 'bg-purple-50 border-purple-200',
                icon: BarChart3,
              },
              {
                stage: 'Result Goal',
                content: 'Lower wasted spend, improve lead quality, and make campaign decisions based on business value.',
                color: 'bg-green-50 border-green-200',
                icon: CheckCircle,
              },
            ].map((example, idx) => {
              const IconComponent = example.icon;
              return (
                <Card key={idx} className={`border-2 p-6 sm:p-8 ${example.color}`}>
                  <div className="flex gap-4 items-start">
                    <IconComponent className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">{example.stage}</h4>
                      <p className="text-foreground">{example.content}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 11. FAQ Section */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
                How It Works FAQs
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: 'What happens after I book a strategy call?',
                  answer: 'We first understand your business, current marketing activity, goals, challenges, and available data. Then we recommend the next practical step.',
                },
                {
                  question: 'Do you audit existing campaigns?',
                  answer: 'Yes. We review existing ad accounts, SEO performance, tracking, landing pages, and lead quality before recommending changes.',
                },
                {
                  question: 'How soon can campaigns go live?',
                  answer: 'Timelines depend on access, strategy approval, creative readiness, landing pages, and tracking setup. The usual flow is audit, strategy, setup, launch, and then optimization.',
                },
                {
                  question: 'Will I get reports?',
                  answer: 'Yes. Reporting includes campaign performance, leads, cost per lead, conversion rate, quality signals, and recommended next actions.',
                },
                {
                  question: 'Do you work only on ads?',
                  answer: 'No. We connect ads, SEO, landing pages, lead capture, tracking, reporting, and conversion optimization depending on the business goal.',
                },
                {
                  question: 'Do you guarantee results?',
                  answer: 'We do not give fake guarantees. We follow a structured process to reduce waste, improve tracking, optimize campaigns, and scale what works.',
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

      {/* 12. Final CTA Section */}
      <CTASection
        title="Ready to See What Is Blocking Your Growth?"
        description="Book a free strategy audit and get a clear view of what is working, what is wasting money, and what needs to improve."
        primaryCta={{
          text: 'Start Your Free Strategy Audit',
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
