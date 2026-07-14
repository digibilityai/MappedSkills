import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { StatCard } from '@/components/StatCard';
import { TeamCard } from '@/components/TeamCard';
import { ValueCard } from '@/components/ValueCard';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createMetadata } from '@/lib/metadata';
import {
  CheckCircle,
  Target,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

export const metadata = createMetadata(
  'Performance Marketing Agency | MappedSkills | Meet Amit Gupta',
  'Performance marketing agency specializing in Google Ads, Meta Ads, lead generation, SEO, and CRO. Founded by Amit Gupta to help businesses achieve measurable growth through transparent, data-driven marketing strategies.',
  '/about'
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
      name: 'About',
      item: 'https://mappedskills.com/about',
    },
  ],
};

const OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MappedSkills',
  url: 'https://mappedskills.com',
  description: 'Performance marketing agency specializing in Google Ads, Meta Ads, lead generation, SEO, and conversion optimization.',
  foundingDate: '2017',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'contact@mappedskills.com',
  },
  founder: {
    '@type': 'Person',
    name: 'Amit Gupta',
  },
};

const FounderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amit Gupta',
  jobTitle: 'Founder & Growth Strategist',
  organization: {
    '@type': 'Organization',
    name: 'MappedSkills',
  },
  description: 'Performance marketing strategist focused on helping businesses achieve measurable growth through Google Ads, Meta Ads, SEO, lead generation, and conversion optimization.',
  expertise: ['Performance Marketing', 'Google Ads', 'Meta Ads', 'Lead Generation', 'SEO', 'Conversion Optimization', 'Marketing Strategy', 'Growth Systems'],
};

const FAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does MappedSkills specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MappedSkills specializes in performance marketing, including Google Ads, Meta Ads, lead generation, SEO, conversion optimization, tracking, and reporting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which businesses does MappedSkills work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MappedSkills works with businesses across real estate, e-commerce, education, B2B services, local services, coaches, consultants, and growth-focused companies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is MappedSkills a full-service digital marketing agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MappedSkills focuses on high-impact growth services instead of offering every possible marketing activity. The core focus is performance marketing, lead generation, SEO, and conversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is MappedSkills different from other agencies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MappedSkills focuses on measurable business outcomes, transparent reporting, lead quality, conversion tracking, and performance optimization.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who leads MappedSkills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MappedSkills is led by Amit Gupta, a performance marketing strategist focused on helping businesses grow through measurable digital marketing systems.',
      },
    },
  ],
};

// GA4 Tracking Configuration
// Event names to implement: 'schedule_call_from_about', 'results_cta_click', 'contact_founder', 'view_case_studies'

const TEAM_MEMBERS = [
  {
    name: 'Amit Gupta',
    title: 'Founder / Growth Strategist',
    specialty: 'Performance marketing, funnel strategy, growth planning',
    linkedinUrl: '#',
  },
  {
    name: 'Performance Marketing Specialist',
    title: 'Google Ads & Meta Ads Expert',
    specialty: 'Campaign setup, optimization, audience strategy, ROAS improvement',
    linkedinUrl: '#',
  },
  {
    name: 'SEO & Content Specialist',
    title: 'SEO Strategist',
    specialty: 'Keyword research, content planning, technical SEO, organic growth',
    linkedinUrl: '#',
  },
  {
    name: 'Client Success Specialist',
    title: 'Reporting & Client Coordination',
    specialty: 'Performance reporting, communication, follow-ups, campaign coordination',
    linkedinUrl: '#',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'Performance-First Positioning',
    description: 'We focus on measurable growth through Google Ads, Meta Ads, lead generation, SEO, and CRO.',
  },
  {
    title: 'Full-Funnel Thinking',
    description: 'We connect ads, landing pages, tracking, lead quality, reporting, and sales feedback.',
  },
  {
    title: 'Simple Business Reporting',
    description: 'We explain performance in plain business language so decisions become easier.',
  },
  {
    title: 'Quality Lead Focus',
    description: 'We do not celebrate cheap leads if they do not turn into real business conversations.',
  },
  {
    title: 'Data-Backed Optimization',
    description: 'Campaigns are improved through data, not guesswork or personal opinion.',
  },
];

const INDUSTRIES = [
  {
    title: 'Real Estate',
    description: 'Lead generation, project enquiries, location-based targeting, and retargeting.',
  },
  {
    title: 'E-commerce',
    description: 'Revenue growth, ROAS improvement, product visibility, and conversion campaigns.',
  },
  {
    title: 'Education & Courses',
    description: 'Course enquiries, admissions, webinar registrations, and enrollment campaigns.',
  },
  {
    title: 'B2B Services',
    description: 'Qualified leads, appointment setting, vendor searches, and decision-maker campaigns.',
  },
  {
    title: 'Local & Professional Services',
    description: 'Service enquiries, call generation, local SEO, and high-intent campaigns.',
  },
];

const CREDENTIALS = [
  {
    title: 'Google Ads Expertise',
    description: 'Campaign planning, search ads, Performance Max, remarketing, conversion tracking, and optimization.',
  },
  {
    title: 'Meta Ads Expertise',
    description: 'Facebook and Instagram campaign strategy, audience testing, creative testing, retargeting, and lead generation.',
  },
  {
    title: 'Analytics & Tracking',
    description: 'GA4, GTM, conversion events, form tracking, click tracking, and reporting dashboards.',
  },
  {
    title: 'SEO & Growth Systems',
    description: 'Keyword strategy, on-page SEO, content planning, local SEO, technical SEO, and ranking improvement.',
  },
];

const APPROACH_STEPS = [
  {
    step: '1',
    title: 'Understand the Business',
    description: 'We understand your offer, audience, sales process, current marketing, and growth challenge.',
  },
  {
    step: '2',
    title: 'Find the Leaks',
    description: 'We audit campaigns, landing pages, tracking, SEO, lead quality, and conversion gaps.',
  },
  {
    step: '3',
    title: 'Build the Growth Plan',
    description: 'We create a focused strategy across ads, SEO, lead generation, CRO, and reporting.',
  },
  {
    step: '4',
    title: 'Execute, Track, Optimize',
    description: 'We launch, measure, improve, and scale based on actual performance and business feedback.',
  },
];

const CULTURE_VALUES = [
  {
    title: 'Clear Communication',
    description: 'No confusing marketing jargon.',
  },
  {
    title: 'Business-First Thinking',
    description: 'Every recommendation must connect to a business goal.',
  },
  {
    title: 'Ownership',
    description: 'We care about what happens after the lead is generated.',
  },
  {
    title: 'Continuous Improvement',
    description: 'Every campaign should become smarter over time.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What does MappedSkills specialize in?',
    answer: 'MappedSkills specializes in performance marketing, including Google Ads, Meta Ads, lead generation, SEO, conversion optimization, tracking, and reporting.',
  },
  {
    question: 'Which businesses does MappedSkills work with?',
    answer: 'MappedSkills works with businesses across real estate, e-commerce, education, B2B services, local services, coaches, consultants, and growth-focused companies.',
  },
  {
    question: 'Is MappedSkills a full-service digital marketing agency?',
    answer: 'MappedSkills focuses on high-impact growth services instead of offering every possible marketing activity. The core focus is performance marketing, lead generation, SEO, and conversion.',
  },
  {
    question: 'How is MappedSkills different from other agencies?',
    answer: 'MappedSkills focuses on measurable business outcomes, transparent reporting, lead quality, conversion tracking, and performance optimization.',
  },
  {
    question: 'Who leads MappedSkills?',
    answer: 'MappedSkills is led by Amit Gupta, a performance marketing strategist focused on helping businesses grow through measurable digital marketing systems.',
  },
];

export default function AboutPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FounderSchema) }}
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
            <span className="text-foreground">About</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="We Build Profitable Marketing Systems"
        subheadline="MappedSkills"
        description="MappedSkills helps businesses turn digital marketing into a measurable growth engine through performance marketing, lead generation, SEO, conversion optimization, and transparent reporting."
        cta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'See Our Results',
          href: '/results',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <StatCard stat="2017" label="Founded" />
          <StatCard stat="50+" label="Clients Served" />
          <StatCard stat="₹100Cr+" label="Revenue Influenced" />
          <StatCard stat="300%+" label="Average ROI" />
        </div>
      </Hero>

      {/* 2. Founding Story Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-3xl sm:text-4xl font-bold tracking-tight">
              Why MappedSkills Was Created
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-foreground">
              <p>
                MappedSkills was created because too many businesses were spending money on digital marketing without understanding what was actually working.
              </p>
              <p>
                We saw businesses getting reports full of clicks, impressions, and reach — but very little clarity on leads, sales, revenue, ROAS, or business impact.
              </p>
              <p className="font-semibold text-foreground">
                So we built MappedSkills around one simple belief:
              </p>
              <p className="text-xl font-bold text-accent">
                Marketing should be measurable, explainable, and connected to business growth.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                'No random campaigns',
                'No vanity reporting',
                'No unclear strategy',
                'No "one-size-fits-all" marketing',
                'Only focused execution, tracking, optimization, and business outcomes',
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. What We Believe Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Philosophy
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Our Belief: Marketing Must Be Accountable
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <ValueCard
              icon={<BarChart3 />}
              title="Results Over Vanity Metrics"
              description="Reach, clicks, and impressions matter only when they help generate leads, sales, or business growth."
            />
            <ValueCard
              icon={<Target />}
              title="Strategy Before Execution"
              description="We do not start with ads. We start with business goals, funnel clarity, audience understanding, and tracking."
            />
            <ValueCard
              icon={<CheckCircle />}
              title="Transparency Builds Trust"
              description="Clients should know what is working, what is not working, and what needs to change next."
            />
            <ValueCard
              icon={<TrendingUp />}
              title="Optimization Is Not Optional"
              description="Performance marketing improves through data, testing, feedback, and consistent refinement."
            />
          </div>
        </Container>
      </Section>

      {/* 4. Our Values Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              The Values That Guide Our Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-8 md:col-span-1">
              <h3 className="mb-3 text-2xl font-bold text-accent">Transparency</h3>
              <p className="text-muted-foreground leading-relaxed">
                We show every important number clearly — spend, leads, cost per lead, conversion rate, lead quality, ROAS, and next actions.
              </p>
            </Card>
            <Card className="p-8 md:col-span-1">
              <h3 className="mb-3 text-2xl font-bold text-accent">Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                We focus on business outcomes, not activity. The goal is to improve growth, not just keep campaigns running.
              </p>
            </Card>
            <Card className="p-8 md:col-span-1">
              <h3 className="mb-3 text-2xl font-bold text-accent">Partnership</h3>
              <p className="text-muted-foreground leading-relaxed">
                We work like a growth partner, not a vendor. Your goals, feedback, sales process, and business reality shape the strategy.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 5. What Makes MappedSkills Different Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Differentiators
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What Makes MappedSkills Different From Generic Agencies?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {DIFFERENTIATORS.map((item, idx) => (
              <ValueCard key={idx} title={item.title} description={item.description} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Founder Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full bg-accent/10 rounded-lg aspect-square flex items-center justify-center text-accent/60 text-sm font-medium">
                Founder Photo
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-3xl sm:text-4xl font-bold tracking-tight">
                Meet the Founder
              </h2>
              <p className="mb-2 text-lg font-semibold text-accent">Amit Gupta</p>
              <p className="mb-6 text-muted-foreground">Founder, MappedSkills Marketing</p>

              <div className="space-y-4 mb-8 text-foreground">
                <p>
                  Amit Gupta helps businesses turn digital marketing into a measurable growth engine. With years of experience in performance marketing, funnel strategy, tracking, paid ads, SEO, and lead generation, he works with businesses that want clarity, accountability, and growth from their marketing efforts.
                </p>
                <p>
                  His approach is simple:
                </p>
                <p className="font-semibold pl-4 border-l-2 border-accent">
                  Understand the business first. Build the strategy second. Execute with tracking. Optimize based on numbers.
                </p>
              </div>

              <div className="mb-8 space-y-2">
                <h4 className="font-semibold text-foreground">Amit&apos;s Highlights:</h4>
                <ul className="space-y-2">
                  {[
                    'Performance marketing strategist',
                    'Digital growth mentor',
                    'Paid ads and funnel strategy experience',
                    'Works with businesses across real estate, e-commerce, education, services, and B2B',
                    'Focused on measurable ROI and transparent reporting',
                  ].map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button size="lg" variant="outline" asChild>
                <Link href="/results">Know More About Our Work</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Team Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              The Team Behind the Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamCard
                key={idx}
                name={member.name}
                title={member.title}
                specialty={member.specialty}
                linkedinUrl={member.linkedinUrl}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Credentials Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Expertise
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Built on Strategy, Tools, and Transparent Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {CREDENTIALS.map((cred, idx) => (
              <ValueCard key={idx} title={cred.title} description={cred.description} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Add certification badges, partner badges, and tool logos here once available.
            </p>
          </div>
        </Container>
      </Section>

      {/* 9. Industries We Understand Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Experience
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Industries We Commonly Work With
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {INDUSTRIES.map((industry, idx) => (
              <ValueCard key={idx} title={industry.title} description={industry.description} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. Our Approach Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Process
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              How We Work With Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {APPROACH_STEPS.map((step, idx) => (
              <Card key={idx} className="p-6 sm:p-8 flex flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 11. Proof Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Results
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Proof Matters More Than Promises
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <Card className="p-6 sm:p-8 text-center">
              <h3 className="mb-2 text-3xl font-bold text-accent">50+</h3>
              <p className="font-semibold mb-2">Clients Served</p>
              <p className="text-sm text-muted-foreground">Experience across different industries, budgets, and growth challenges.</p>
            </Card>
            <Card className="p-6 sm:p-8 text-center">
              <h3 className="mb-2 text-3xl font-bold text-accent">₹100Cr+</h3>
              <p className="font-semibold mb-2">Revenue Influenced</p>
              <p className="text-sm text-muted-foreground">Performance campaigns connected to measurable business growth.</p>
            </Card>
            <Card className="p-6 sm:p-8 text-center">
              <h3 className="mb-2 text-3xl font-bold text-accent">300%+</h3>
              <p className="font-semibold mb-2">Average ROI</p>
              <p className="text-sm text-muted-foreground">Marketing decisions focused on return, not just campaign activity.</p>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/results">View Case Studies</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 12. Culture Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
                Our Culture
              </Badge>
              <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
                How We Think
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                We are practical, data-driven, and direct. We do not hide behind jargon. We believe clients deserve clarity, not confusion. If something is not working, we say it. If something needs fixing, we recommend it. If something is working, we help scale it responsibly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {CULTURE_VALUES.map((value, idx) => (
                <Card key={idx} className="p-6 sm:p-8">
                  <h3 className="mb-2 font-semibold text-accent">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 13. FAQ Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Frequently Asked
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              About MappedSkills FAQs
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <FAQSection items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      {/* 14. Final CTA Section */}
      <CTASection
        title="Want a Marketing Partner Who Talks Business, Not Just Metrics?"
        description="Book a free strategy call and let's identify what is working, what is leaking, and where your marketing can grow."
        primaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'See Our Results',
          href: '/results',
        }}
      />
    </>
  );
}
