import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { StatCard } from '@/components/StatCard';
import { ServiceCard } from '@/components/ServiceCard';
import { IndustryCard } from '@/components/IndustryCard';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createMetadata } from '@/lib/metadata';
import {
  Zap,
  TrendingUp,
  Target,
  Search,
  BarChart3,
} from 'lucide-react';

export const metadata = createMetadata(
  'Performance Marketing Services | Google Ads, Meta Ads, SEO & Lead Generation | MappedSkills',
  'Performance marketing services for Google Ads management, Meta Ads campaigns, lead generation, SEO, and conversion optimization. Measurable results, transparent pricing.',
  '/services'
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
      name: 'Services',
      item: 'https://mappedskills.com/services',
    },
  ],
};

const ServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Performance Marketing Services',
  description: 'Comprehensive performance marketing services including Google Ads, Meta Ads, lead generation, SEO, and conversion optimization.',
  serviceType: 'Digital Marketing',
  provider: {
    '@type': 'Organization',
    name: 'MappedSkills',
    url: 'https://mappedskills.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'IN',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Performance Marketing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Google Ads Management',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Meta Ads Management',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Lead Generation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Conversion Optimization',
        },
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
      name: 'Which services do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MappedSkills offers Google Ads management, Meta Ads management, lead generation, SEO, and conversion optimization services.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I choose individual services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can choose individual services or combine them for a comprehensive full-funnel performance marketing approach.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you decide which services are right for my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We audit your current marketing, industry, target audience, and business goals. Then we recommend the right mix of services to achieve your objectives.',
      },
    },
    {
      '@type': 'Question',
      name: 'What results can I expect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results vary by service and business model, but typically include improved lead quality, higher ROAS, increased search visibility, and better conversion rates within 60-90 days.',
      },
    },
  ],
};

// GA4 Tracking Configuration
// Event names to implement:
// - 'service_card_click': Clicking on individual service cards
// - 'learn_more_service': "Learn More" CTA on service cards
// - 'schedule_call_from_services': Hero and final CTA
// - 'view_pricing': Pricing page link
// - 'view_case_studies': Results/case studies link
// - 'contact_sales': Contact form CTA


const SERVICES = [
  {
    title: 'Google Ads Management',
    problem: 'People are searching for your service, but competitors are capturing the demand.',
    solution: 'We build Google Ads campaigns that target high-intent keywords, improve tracking, reduce wasted spend, and focus on leads or revenue.',
    bestFor: [
      'Service businesses',
      'Real estate',
      'E-commerce',
      'B2B companies',
      'Education and courses',
    ],
    keyOutcomes: [
      'More high-intent enquiries',
      'Better cost per lead',
      'Improved ROAS',
      'Stronger search visibility',
    ],
    ctaText: 'Explore Google Ads',
    ctaHref: '/google-ads',
  },
  {
    title: 'Social Media Ads Management',
    problem: 'You are reaching people, but not enough of them are converting into leads or customers.',
    solution: 'We build Facebook and Instagram ad campaigns around audience strategy, creative testing, retargeting, funnel structure, and lead quality.',
    bestFor: [
      'Real estate',
      'E-commerce',
      'Online education',
      'Coaches and consultants',
      'Local service businesses',
    ],
    keyOutcomes: [
      'Better lead quality',
      'Stronger creative performance',
      'Retargeting growth',
      'Improved ROAS',
    ],
    ctaText: 'Explore Social Media Ads',
    ctaHref: '/social-media-ads',
  },
  {
    title: 'Lead Generation Services',
    problem: 'Your sales team needs serious prospects, not random enquiries.',
    solution: 'We build lead generation systems using ads, landing pages, forms, WhatsApp flows, qualification questions, and reporting.',
    bestFor: [
      'B2B services',
      'Real estate',
      'Professional services',
      'SaaS and tech',
      'Education businesses',
    ],
    keyOutcomes: [
      'Qualified leads',
      'Better lead tracking',
      'Lower wasted sales effort',
      'Predictable enquiry pipeline',
    ],
    ctaText: 'Explore Lead Generation',
    ctaHref: '/lead-generation',
  },
  {
    title: 'SEO Services',
    problem: 'Your business is invisible when customers search organically.',
    solution: 'We improve technical SEO, keyword strategy, content structure, local visibility, internal linking, and organic conversion paths.',
    bestFor: [
      'Service businesses',
      'B2B companies',
      'E-commerce',
      'Local businesses',
      'Education and courses',
    ],
    keyOutcomes: [
      'Better keyword rankings',
      'More organic traffic',
      'Stronger search visibility',
      'Organic lead generation',
    ],
    ctaText: 'Explore SEO',
    ctaHref: '/seo',
  },
  {
    title: 'Conversion Optimization',
    problem: 'You are getting traffic, but not enough visitors are becoming leads, customers, or booked calls.',
    solution: 'We improve landing pages, forms, CTAs, page messaging, trust signals, tracking, and funnel friction.',
    bestFor: [
      'Businesses running paid ads',
      'Websites with traffic but low enquiries',
      'E-commerce brands',
      'SaaS companies',
      'Lead generation websites',
    ],
    keyOutcomes: [
      'Higher conversion rate',
      'More leads from same traffic',
      'Lower cost per lead',
      'Better funnel performance',
    ],
    ctaText: 'Explore Conversion Optimization',
    ctaHref: '/conversion-optimization',
  },
];

const INDUSTRIES = [
  {
    title: 'Real Estate',
    description: 'Google Ads, Meta Ads, lead generation, retargeting, and landing page optimization for qualified property enquiries.',
  },
  {
    title: 'E-commerce',
    description: 'Meta Ads, Google Ads, SEO, CRO, and retargeting for revenue growth and better ROAS.',
  },
  {
    title: 'Education & Courses',
    description: 'Lead generation, Google Ads, Meta Ads, and nurturing flows for enquiries, webinar registrations, and enrollments.',
  },
  {
    title: 'B2B Services',
    description: 'SEO, Google Ads, lead generation, and LinkedIn-style authority funnels for decision-maker visibility.',
  },
  {
    title: 'Local Businesses',
    description: 'Local SEO, Google Ads, Meta Ads, and conversion-focused landing pages for enquiries and calls.',
  },
];

const PROOF_STATS = [
  { stat: '300%+', label: 'Average ROI' },
  { stat: '₹100Cr+', label: 'Revenue Influenced' },
  { stat: '50+', label: 'Clients Served' },
  { stat: '65%+', label: 'Client Retention' },
];

const CASE_STUDIES = [
  {
    title: 'Real Estate',
    metric: '15 to 50 qualified leads/month',
  },
  {
    title: 'E-commerce',
    metric: '₹20L to ₹100L revenue growth',
  },
  {
    title: 'Online Education',
    metric: '100 to 500 course enrollments',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Which service should I start with?',
    answer: 'It depends on your current challenge. If you need leads quickly, Google Ads or Social Media Ads may be the starting point. If traffic is coming but not converting, CRO may be better. Book a free strategy call to get personalized recommendations.',
  },
  {
    question: 'Do I need all services together?',
    answer: 'No. You can start with one service. Multi-channel work becomes useful when your budget, funnel, and tracking are ready.',
  },
  {
    question: 'Do you offer regular social media posting?',
    answer: 'MappedSkills focuses primarily on performance marketing services. Content creation or social media management can be scoped separately if required.',
  },
  {
    question: 'Can you manage both Google Ads and Meta Ads?',
    answer: 'Yes. We can manage both when the business needs high-intent search demand and audience-based paid social campaigns.',
  },
  {
    question: 'Do you help with landing pages?',
    answer: 'Yes. We provide landing page and conversion recommendations because campaigns perform better when the page experience is strong.',
  },
  {
    question: 'Do you provide reporting?',
    answer: 'Yes. Reporting includes performance metrics, lead quality, conversions, cost per lead, ROAS, and recommended next actions.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ServiceSchema) }}
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
            <span className="text-foreground">Services</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="Performance Marketing Services Built for Measurable Growth"
        subheadline="Our Services"
        description="MappedSkills helps businesses generate qualified leads, improve ROAS, increase organic visibility, and convert more visitors through focused performance marketing services."
        cta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Get Free Marketing Audit',
          href: '/contact',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
          <StatCard stat="5" label="Core Growth Services" />
          <StatCard stat="300%+" label="Average ROI" />
          <StatCard stat="50+" label="Clients Served" />
          <StatCard stat="₹100Cr+" label="Revenue Influenced" />
        </div>

        <div className="mt-12 relative h-64 sm:h-80 rounded-lg overflow-hidden bg-secondary/5 border border-border">
          <Image
            src="/images/services-ecosystem.png"
            alt="Service ecosystem showing 5 core services connected to business outcomes"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Hero>

      {/* 2. Service Focus Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              We Don't Do Everything. We Focus on What Drives Growth.
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              MappedSkills focuses on 5 core performance marketing services. Each service is designed to solve a specific business growth problem — more qualified traffic, better leads, improved visibility, stronger conversions, or scalable revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {[
              { title: 'Google Ads', subtitle: 'For high-intent demand', icon: <Zap /> },
              { title: 'Social Media Ads', subtitle: 'For audience targeting and retargeting', icon: <TrendingUp /> },
              { title: 'Lead Generation', subtitle: 'For predictable enquiry pipelines', icon: <Target /> },
              { title: 'SEO', subtitle: 'For long-term organic visibility', icon: <Search /> },
              { title: 'Conversion Optimization', subtitle: 'For improving results from existing traffic', icon: <BarChart3 /> },
            ].map((service, idx) => (
              <Card key={idx} className="p-6 sm:p-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mx-auto">
                  <div className="text-accent">{service.icon}</div>
                </div>
                <h3 className="mb-2 font-semibold text-lg">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.subtitle}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Main Services Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Services
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Choose the Service That Matches Your Growth Problem
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-10">
            {SERVICES.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                problem={service.problem}
                solution={service.solution}
                bestFor={service.bestFor}
                keyOutcomes={service.keyOutcomes}
                ctaText={service.ctaText}
                ctaHref={service.ctaHref}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. How Services Work Together Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              The Full Funnel
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Performance Marketing Works Best When Services Connect
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              One service can solve one problem. But real growth happens when traffic, landing pages, tracking, reporting, and optimization work together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
            {[
              { title: 'Traffic', items: ['Google Ads', 'Social Media Ads', 'SEO'] },
              { title: 'Lead Capture', items: ['Landing Pages', 'Forms', 'WhatsApp', 'CTAs'] },
              { title: 'Conversion', items: ['CRO', 'Trust Blocks', 'Funnel Optimization'] },
              { title: 'Tracking', items: ['GA4', 'GTM', 'Conversion Events', 'Reporting'] },
              { title: 'Scaling', items: ['Optimization', 'Retargeting', 'Budget Decisions'] },
            ].map((stage, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-4 font-semibold text-accent text-lg">{stage.title}</h3>
                <ul className="space-y-2">
                  {stage.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Which Service Do You Need Section */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight text-center">
              Not Sure Where to Start?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
              {[
                { problem: 'If you need leads fast:', solution: 'Start with Google Ads or Social Media Ads.' },
                { problem: 'If your leads are poor quality:', solution: 'Start with Lead Generation and funnel qualification.' },
                { problem: 'If your website traffic is low:', solution: 'Start with SEO or paid traffic.' },
                { problem: 'If your traffic is good but enquiries are low:', solution: 'Start with Conversion Optimization.' },
              ].map((scenario, idx) => (
                <Card key={idx} className="p-6 sm:p-8">
                  <p className="mb-2 font-semibold text-foreground">{scenario.problem}</p>
                  <p className="text-muted-foreground">{scenario.solution}</p>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-secondary/5 border-accent/20 text-center mb-8">
              <p className="mb-4 text-foreground leading-relaxed">
                If you are confused about the right channel, let&apos;s have a conversation. We&apos;ll recommend the right starting point based on your business.
              </p>
              <Button size="lg" asChild>
                <Link href="/schedule-call">Help Me Choose the Right Service</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 6. Industry Use Cases Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Expertise
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Services Built for Different Business Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {INDUSTRIES.map((industry, idx) => (
              <IndustryCard
                key={idx}
                title={industry.title}
                description={industry.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Proof Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Growth Services Should Be Judged by Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {PROOF_STATS.map((stat, idx) => (
              <StatCard key={idx} stat={stat.stat} label={stat.label} />
            ))}
          </div>

          <div className="mb-8">
            <h3 className="mb-6 text-center text-2xl font-bold tracking-tight">
              Real Results From Real Clients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {CASE_STUDIES.map((study, idx) => (
                <Card key={idx} className="p-8 text-center">
                  <p className="mb-2 font-semibold text-accent">{study.title}</p>
                  <p className="text-2xl font-bold">{study.metric}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/work">View Full Case Studies</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 8. Engagement Models Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Flexible Engagements Based on Your Growth Stage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              { title: 'Starter', desc: 'Best for businesses starting with one focused channel.' },
              { title: 'Growth', desc: 'Best for businesses ready to run 2-3 channels with stronger optimization.' },
              { title: 'Enterprise', desc: 'Best for multi-channel, multi-location, or aggressive growth campaigns.' },
            ].map((model, idx) => (
              <Card key={idx} className="p-8 sm:p-10 flex flex-col text-center">
                <h3 className="mb-3 text-xl font-bold text-accent">{model.title}</h3>
                <p className="mb-6 text-muted-foreground flex-grow">{model.desc}</p>
                <Button variant="outline" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Why MappedSkills Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Why Businesses Choose MappedSkills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: 'Focused Services', desc: 'We only focus on services that directly support measurable growth.' },
              { title: 'Tracking-First Approach', desc: 'We track important actions before making scaling decisions.' },
              { title: 'Business-Language Reporting', desc: 'We explain performance in simple, useful terms.' },
              { title: 'Strategy + Execution', desc: 'We connect planning, campaigns, landing pages, tracking, and optimization.' },
            ].map((reason, idx) => (
              <Card key={idx} className="p-8">
                <h3 className="mb-3 font-semibold text-accent text-lg">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. FAQ Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Frequently Asked
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Performance Marketing Services FAQs
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <FAQSection items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      {/* 11. Final CTA Section */}
      <CTASection
        title="Need Help Choosing the Right Growth Service?"
        description="Book a free strategy call and we'll identify which service should be your first priority based on your business goal, budget, and current marketing setup."
        primaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'View Pricing',
          href: '/pricing',
        }}
      />
    </>
  );
}
