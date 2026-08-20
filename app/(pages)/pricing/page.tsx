import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { PricingCard } from '@/components/PricingCard';
import { StatCard } from '@/components/StatCard';
import { CTASection } from '@/components/CTASection';
import { FAQSection } from '@/components/FAQSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import { Check } from 'lucide-react';

export const metadata = createMetadata(
  'Performance Marketing Agency Pricing | Custom Plans for Growth | MappedSkills',
  'Performance marketing agency pricing for Google Ads, Meta Ads, lead generation, SEO, and CRO. Transparent, custom plans starting ₹50K/month. No hidden fees.',
  '/pricing'
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
      name: 'Pricing',
      item: 'https://mappedskills.com/pricing',
    },
  ],
};

const FAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is included in the pricing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing includes strategy, campaign management, optimization, reporting, and communication. Platform costs, ads spend, and freelance developers are billed separately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I scale from Starter to Growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many clients start with Starter and upgrade to Growth or Enterprise as their business scales. You can upgrade anytime.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a setup fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No setup fee. We charge only the monthly service fee. First month includes strategy audit and plan setup at no extra cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I want to add a new channel mid-month?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can upgrade your plan anytime. We prorate the cost for the remainder of the month and adjust billing accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a minimum contract length?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend a 3-month commitment to see meaningful results. However, we offer month-to-month billing for flexibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if results are not what we expected?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We meet weekly to discuss performance. If results are below target after 60 days, we adjust strategy, increase optimization, or offer to pause services penalty-free.',
      },
    },
  ],
};

// GA4 Tracking Configuration
// Event names to implement: 'pricing_cta_click', 'schedule_call_from_pricing', 'contact_click'

const PRICING_TIERS = [
  {
    name: 'STARTER',
    price: '₹50K - ₹75K/month',
    description: 'Solopreneurs, new businesses, focused service businesses, or brands starting with one primary marketing channel.',
    features: [
      '1 primary marketing channel',
      'Campaign or SEO strategy',
      'Weekly optimization',
      'Monthly performance report',
      '1 strategy call/month',
      'Basic conversion tracking review',
      'CTA and funnel recommendations',
      'Email support',
    ],
    cta: { text: 'Start With Starter', href: '/schedule-call' },
  },
  {
    name: 'GROWTH',
    price: '₹1L - ₹2L/month',
    description: 'Scaling businesses that need 2-3 marketing channels, stronger reporting, and more active optimization.',
    features: [
      '2-3 marketing channels',
      'Daily performance monitoring',
      'Weekly optimization',
      'Bi-weekly strategy calls',
      'Custom reporting dashboard',
      'Conversion tracking review',
      'Funnel and landing page recommendations',
      'Lead quality feedback review',
      'Retargeting strategy',
      'Priority support',
    ],
    cta: { text: 'Schedule Consultation', href: '/schedule-call' },
    recommended: true,
  },
  {
    name: 'ENTERPRISE',
    price: 'Custom Pricing',
    description: 'Large budgets, complex funnels, multi-location businesses, enterprise campaigns, or aggressive growth requirements.',
    features: [
      'All relevant marketing channels',
      'Dedicated performance team',
      'Real-time or frequent monitoring',
      'Weekly strategy calls',
      'Advanced reporting dashboard',
      'Custom integrations',
      'Funnel and conversion strategy',
      'Multi-location or multi-product campaigns',
      'Senior strategy involvement',
      'Scaling roadmap',
    ],
    cta: { text: 'Request Custom Quote', href: '/contact' },
  },
];

const COMPARISON_DATA = [
  { feature: 'Number of marketing channels', starter: '1', growth: '2-3', enterprise: 'All relevant' },
  { feature: 'Strategy document', starter: '✓', growth: '✓', enterprise: '✓' },
  { feature: 'Campaign setup', starter: '✓', growth: '✓', enterprise: '✓' },
  { feature: 'Weekly optimization', starter: '✓', growth: '✓', enterprise: '✓' },
  { feature: 'Daily monitoring', starter: 'Basic', growth: '✓', enterprise: 'Real-time' },
  { feature: 'Strategy calls', starter: '1/month', growth: 'Bi-weekly', enterprise: 'Weekly' },
  { feature: 'Monthly reporting', starter: 'Basic', growth: 'Custom', enterprise: 'Advanced' },
  { feature: 'Custom dashboard', starter: 'Basic', growth: '✓', enterprise: '✓' },
  { feature: 'Conversion tracking review', starter: 'Basic', growth: '✓', enterprise: 'Advanced' },
  { feature: 'Landing page recommendations', starter: 'Basic', growth: '✓', enterprise: 'Funnel-level' },
  { feature: 'Lead quality review', starter: 'Limited', growth: '✓', enterprise: '✓' },
  { feature: 'Retargeting strategy', starter: 'Basic', growth: '✓', enterprise: 'Advanced' },
  { feature: 'Dedicated account manager', starter: 'Shared', growth: '✓', enterprise: 'Team' },
  { feature: 'CRM integration support', starter: 'Optional', growth: 'Optional', enterprise: 'Custom' },
  { feature: 'Scaling roadmap', starter: 'Basic', growth: 'Monthly', enterprise: 'Advanced' },
  { feature: 'Support level', starter: 'Email', growth: 'Priority', enterprise: 'Priority' },
];

const PERFORMANCE_BONUSES = [
  {
    title: 'ROAS-Based Bonus',
    description: 'For e-commerce or sales campaigns where revenue can be clearly tracked.',
  },
  {
    title: 'Qualified Lead Bonus',
    description: 'For lead generation campaigns where qualified lead criteria are clearly defined.',
  },
  {
    title: 'Revenue Growth Bonus',
    description: 'For businesses where marketing contribution to sales can be measured reliably.',
  },
];

const EXCLUSIONS = [
  {
    title: 'Ad Spend',
    description: 'You pay Google, Meta, LinkedIn, or other platforms directly. Ad spend is not included in the management fee.',
  },
  {
    title: 'Content Creation',
    description: 'Static creatives, reels, videos, shoots, advanced copywriting, and content production may be scoped separately.',
  },
  {
    title: 'Design & Development',
    description: 'Landing page design, website changes, development work, and technical implementation may be billed separately if required.',
  },
  {
    title: 'Paid Tools',
    description: 'Tools such as heatmaps, CRM, email automation, call tracking, or analytics tools may require separate subscriptions.',
  },
  {
    title: 'CRM or Automation Setup',
    description: 'Advanced CRM setup, WhatsApp automation, chatbot flows, or custom integrations may be scoped separately.',
  },
];

const SERVICE_FACTORS = [
  {
    title: 'Google Ads Management',
    factors: [
      'Number of campaigns',
      'Monthly ad spend',
      'Search, PMax, shopping, or remarketing complexity',
      'Landing page requirements',
      'Conversion tracking setup',
    ],
  },
  {
    title: 'Social Media Ads Management',
    factors: [
      'Number of campaigns',
      'Creative testing volume',
      'Funnel complexity',
      'Retargeting structure',
      'Lead or sales objective',
    ],
  },
  {
    title: 'Lead Generation',
    factors: [
      'Lead qualification depth',
      'Industry competition',
      'Monthly lead volume',
      'Follow-up system',
      'CRM or WhatsApp integration',
    ],
  },
  {
    title: 'SEO',
    factors: [
      'Website size',
      'Technical issues',
      'Number of target pages',
      'Content requirements',
      'Location or backlink needs',
    ],
  },
  {
    title: 'Conversion Optimization',
    factors: [
      'Number of pages',
      'Traffic volume',
      'Funnel complexity',
      'Tracking setup',
      'Testing requirements',
    ],
  },
];

const TRUST_PRINCIPLES = [
  {
    title: 'No Hidden Platform Fees',
    description: 'Platform ad spend is separate and paid directly by you.',
  },
  {
    title: 'Clear Scope Before Start',
    description: 'You know what is included before the engagement begins.',
  },
  {
    title: 'No Vanity Reporting',
    description: 'Reports focus on leads, cost, conversion, ROAS, and business outcomes.',
  },
  {
    title: 'Flexible Growth',
    description: 'You can start small and scale when the numbers support it.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Can I scale up or down later?',
    answer: 'Yes. You can start with one channel and scale to a larger plan as your campaigns, budget, and growth needs increase.',
  },
  {
    question: 'Is ad spend included in your pricing?',
    answer: 'No. Ad spend is paid directly to platforms like Google, Meta, or LinkedIn. Our fee covers strategy, management, optimization, and reporting.',
  },
  {
    question: 'Do you offer month-to-month contracts?',
    answer: 'Engagement terms depend on the service and scope. Some services can work month-to-month, while SEO and long-term growth plans usually need more time to show meaningful results.',
  },
  {
    question: 'What is the minimum budget required?',
    answer: 'For serious performance marketing work, we recommend starting with a management fee of at least ₹50K/month, excluding ad spend.',
  },
  {
    question: 'Do you charge setup fees?',
    answer: 'Setup fees depend on the complexity of the account, tracking, landing pages, and campaign structure. This can be discussed during the strategy call.',
  },
  {
    question: 'Can pricing be customized?',
    answer: 'Yes. Pricing can be customized based on your goals, channels, current setup, and required support.',
  },
  {
    question: 'What if I am not happy with the results?',
    answer: 'We work with transparent reporting, clear communication, and regular optimization. If something is not working, we identify the reason and recommend the next action instead of hiding behind reports.',
  },
  {
    question: 'Do you offer performance-based pricing?',
    answer: 'In selected cases, yes. Performance-based pricing is possible when tracking, attribution, lead quality, and sales data are clear.',
  },
];

export default function PricingPage() {
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
            <span className="text-foreground">Pricing</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="Simple, Transparent Pricing Built for Results"
        subtitle="Performance Marketing Agency Pricing"
        description="Choose a performance marketing plan based on your growth stage, marketing complexity, and business goals. No hidden fees. Clear scope. Measurable outcomes."
        cta={{
          text: 'Get Custom Pricing Quote',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Schedule Strategy Call',
          href: '/schedule-call',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">₹50K</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Starting From</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">300%+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Average ROI</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">₹100Cr+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Revenue Influenced</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">50+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Clients Served</p>
          </Card>
        </div>
      </Hero>

      {/* 2. Pricing Philosophy Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              We Price for Outcomes, Not Activity
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground mb-12">
              MappedSkills pricing is designed around performance marketing execution, strategic thinking, optimization, and reporting. You are not paying for random tasks. You are investing in a system that connects campaigns, landing pages, tracking, reporting, and business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Transparent Scope',
                description: 'You know what is included, what is optional, and what is billed separately.',
              },
              {
                title: 'Performance Thinking',
                description: 'We focus on leads, ROAS, revenue, conversion rate, and business impact.',
              },
              {
                title: 'Flexible Scaling',
                description: 'Start with one channel and expand as performance, budget, and goals grow.',
              },
              {
                title: 'Clear Reporting',
                description: 'Every month, you see what worked, what failed, and what needs to change.',
              },
            ].map((principle, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-2 text-lg font-bold text-accent">{principle.title}</h3>
                <p className="text-muted-foreground text-sm">{principle.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Pricing Tier Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Choose the Right Plan for Your Growth Stage
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-6">
            {PRICING_TIERS.map((tier) => (
              <PricingCard
                key={tier.name}
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                cta={tier.cta}
                recommended={tier.recommended}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Plan Comparison Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Compare What&apos;s Included
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Starter</th>
                  <th className="text-center py-3 px-4 font-semibold text-accent">Growth</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/5">
                    <td className="py-3 px-4 text-foreground font-medium">{row.feature}</td>
                    <td className="text-center py-3 px-4 text-muted-foreground">{row.starter}</td>
                    <td className="text-center py-3 px-4 text-muted-foreground bg-accent/5">{row.growth}</td>
                    <td className="text-center py-3 px-4 text-muted-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 5. Performance Bonus Model Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Optional Performance Bonus Model
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              For businesses with clear revenue tracking, lead quality feedback, and measurable sales attribution, MappedSkills can discuss a performance-linked bonus model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {PERFORMANCE_BONUSES.map((bonus, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-3 text-lg font-bold text-accent">{bonus.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{bonus.description}</p>
              </Card>
            ))}
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-6 sm:p-8 text-center mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Performance bonus models are optional and depend on tracking accuracy, business model, sales cycle, and attribution clarity.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/schedule-call">Discuss Performance-Based Pricing</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6. What's Not Included Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What&apos;s Not Included in Our Management Fees
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              We believe pricing should be clear from the beginning. Our management fee covers strategy, execution, optimization, reporting, and growth planning. Some costs are billed separately or paid directly by you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {EXCLUSIONS.map((exclusion, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-2 text-lg font-bold">{exclusion.title}</h3>
                <p className="text-muted-foreground text-sm">{exclusion.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Service-Specific Pricing Guidance Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What Affects Your Pricing?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {SERVICE_FACTORS.map((service, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-4 font-bold text-foreground">{service.title}</h3>
                <ul className="space-y-2">
                  {service.factors.map((factor, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Which Plan Is Right for You Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Which Plan Should You Choose?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Choose Starter if:',
                points: [
                  'You want to focus on one main channel',
                  'You are testing performance marketing seriously',
                  'You need better campaign structure and reporting',
                  'Your monthly budget is limited but consistent',
                ],
              },
              {
                title: 'Choose Growth if:',
                points: [
                  'You want multi-channel growth',
                  'You already have leads or sales coming in',
                  'You need better optimization and scaling',
                  'You want stronger reporting and strategy support',
                ],
              },
              {
                title: 'Choose Enterprise if:',
                points: [
                  'You have large budgets',
                  'You operate across multiple locations, products, or funnels',
                  'You need senior strategic involvement',
                  'You want custom dashboards, integrations, and deeper support',
                ],
              },
            ].map((section, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-4 font-bold text-lg text-accent">{section.title}</h3>
                <ul className="space-y-3">
                  {section.points.map((point, pidx) => (
                    <li key={pidx} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Pricing Trust Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Why Transparent Pricing Matters
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground">
              Many agencies hide pricing because they want to qualify prospects manually or adjust pricing based on perception. We believe serious businesses deserve clarity. Pricing may still vary based on scope, but the starting point should be visible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_PRINCIPLES.map((principle, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <h3 className="mb-2 text-lg font-bold text-accent">{principle.title}</h3>
                <p className="text-muted-foreground text-sm">{principle.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. FAQ Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Pricing FAQs
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <FAQSection items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      {/* 11. Final CTA Section */}
      <CTASection
        title="Want a Pricing Plan Built Around Your Growth Goals?"
        description="Book a strategy call and we'll recommend the right plan based on your business model, current marketing setup, budget, and growth target. No hidden fees. Clear scope. Results-focused."
        primaryCta={{
          text: 'Get Custom Pricing Quote',
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
