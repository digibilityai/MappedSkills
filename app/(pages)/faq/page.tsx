import Link from 'next/link';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = createMetadata(
  'Performance Marketing FAQs | Digital Marketing Agency FAQs | MappedSkills',
  'Get answers to common questions about performance marketing, Google Ads, SEO, lead generation, pricing, timelines, guarantees, reporting, and working with MappedSkills.',
  '/faq'
);

const FAQ_ITEMS = [
  {
    question: 'How long until I see results?',
    answer: 'Timelines depend on the service, industry, budget, competition, website quality, and tracking setup. For paid ads, early performance signals can usually appear within the first few weeks. Stable optimization takes more time because campaigns need data, testing, and lead quality feedback. For SEO, meaningful ranking signals usually take 90+ days, and stronger growth often builds between 3-6 months. We do not promise overnight results. We focus on building a measurable growth system that can improve over time.',
  },
  {
    question: 'What\'s included in your service?',
    answer: 'MappedSkills focuses on performance marketing services that directly support business growth. Core services include: Google Ads management, Facebook and Instagram ads management, lead generation, SEO, conversion rate optimization, tracking and reporting, and landing page and funnel recommendations. The exact scope depends on your selected plan, business goal, and current marketing setup.',
  },
  {
    question: 'How do you charge for services?',
    answer: 'Our pricing depends on the number of channels, campaign complexity, monthly ad budget, tracking requirements, reporting needs, and growth goals. Plans usually start from ₹50K/month, excluding platform ad spend. Ad spend is paid directly to platforms like Google, Meta, or LinkedIn. Management fees cover strategy, execution, optimization, and reporting. In some cases, performance-linked pricing may be discussed if tracking and attribution are clear.',
  },
  {
    question: 'Do you guarantee results?',
    answer: 'No. We do not give fake guarantees. Performance marketing depends on many factors, including your offer, budget, competition, landing page, sales process, tracking setup, and market demand. What we do guarantee is a structured process: proper audit, clear strategy, tracking-first setup, transparent reporting, regular optimization, practical recommendations, and honest communication. We focus on reducing waste, improving performance, and scaling what works.',
  },
  {
    question: 'What platforms do you manage?',
    answer: 'MappedSkills primarily manages growth-focused platforms such as: Google Ads, Meta Ads (Facebook and Instagram), SEO and organic search, Google Analytics 4, Google Tag Manager, Google Search Console, landing page and conversion tracking tools, and reporting dashboards. Depending on the project, we may also support LinkedIn Ads, remarketing, WhatsApp lead flows, CRM handoff, and other growth tools.',
  },
  {
    question: 'Can I scale up or down anytime?',
    answer: 'Yes, the engagement can be scaled based on performance, budget, business needs, and agreed scope. Many businesses start with one focused channel, such as Google Ads or Lead Generation, and later expand into SEO, Meta Ads, CRO, or multi-channel growth. Scaling should be based on data, not excitement. We recommend increasing budget or scope only when tracking, lead quality, and conversion performance support the decision.',
  },
];

const QUICK_QUESTION_CARDS = [
  {
    title: 'Need leads quickly?',
    description: 'Start with Google Ads or Social Media Ads.',
    links: [
      { text: 'Google Ads', href: '/google-ads' },
      { text: 'Social Media Ads', href: '/social-media-ads' },
    ],
  },
  {
    title: 'Getting leads but poor quality?',
    description: 'Start with Lead Generation and qualification review.',
    links: [
      { text: 'Lead Generation', href: '/lead-generation' },
    ],
  },
  {
    title: 'Getting traffic but few enquiries?',
    description: 'Start with Conversion Optimization.',
    links: [
      { text: 'Conversion Optimization', href: '/conversion-optimization' },
    ],
  },
  {
    title: 'Want long-term organic growth?',
    description: 'Start with SEO.',
    links: [
      { text: 'SEO', href: '/seo' },
    ],
  },
];

const TRUST_PRINCIPLES = [
  {
    title: 'No Vanity Reporting',
    description: 'We focus on leads, ROAS, conversion rate, revenue impact, and qualified enquiries.',
  },
  {
    title: 'No Random Campaigns',
    description: 'Every campaign starts with business goals, funnel clarity, tracking, and strategy.',
  },
  {
    title: 'No Hidden Ad Spend',
    description: 'Platform ad spend is separate and paid directly by you.',
  },
  {
    title: 'No Overpromising',
    description: 'We explain what is possible, what is risky, and what needs to improve.',
  },
];

export default function FAQPage() {
  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://mappedskills.com'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'FAQ',
                'item': 'https://mappedskills.com/faq'
              }
            ]
          })
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">FAQ</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="Performance Marketing FAQs"
        subheadline="Frequently Asked Questions"
        description="Clear answers to common questions about working with MappedSkills, our process, pricing, timelines, platforms, reporting, and results."
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
            <p className="text-sm text-accent font-semibold mb-1">Free</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Initial Audit</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-sm text-accent font-semibold mb-1">Transparent</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Reporting</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-sm text-accent font-semibold mb-1">No Fake</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Guarantees</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-sm text-accent font-semibold mb-1">Clear</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Growth Recommendations</p>
          </Card>
        </div>
      </Hero>

      {/* 2. FAQ Intro Section */}
      <Section className="border-b border-border bg-secondary/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-3xl sm:text-4xl font-bold tracking-tight text-center">
              Before You Work With a Marketing Agency, Ask Better Questions
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-foreground text-center">
              <p>
                Choosing a performance marketing partner should not be confusing. You should know what is included, how pricing works, what results to expect, and how performance will be measured.
              </p>
              <p>
                This page answers the most common questions businesses ask before working with MappedSkills.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Main FAQ Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Common Questions About Working With MappedSkills
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* Tracking: faq_open */}
            <FAQSection items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      {/* 4. Quick Question Blocks Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Still Comparing Your Options?
            </h2>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              Find the right starting point for your marketing growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {QUICK_QUESTION_CARDS.map((card, idx) => (
              <Card key={idx} className="p-6 sm:p-8 h-full">
                <h3 className="mb-2 text-lg font-bold">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <div className="flex flex-wrap gap-2">
                  {card.links.map((link, linkIdx) => (
                    <Button
                      key={linkIdx}
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <Link href={link.href} className="inline-flex items-center gap-2">
                        {link.text}
                        {/* Tracking: service_cta_click */}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Trust Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Our Answers Are Simple Because Our Work Is Measurable
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TRUST_PRINCIPLES.map((principle, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-3 text-lg font-bold text-accent">{principle.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Final CTA Section */}
      <CTASection
        title="Still Have Questions About Your Marketing?"
        description="Book a free strategy call and get clear recommendations based on your current ads, SEO, leads, website, or conversion funnel. No fake guarantees. No pressure. Just practical clarity about your growth options."
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
