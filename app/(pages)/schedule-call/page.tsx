import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import {
  CheckCircle,
  X,
  Clock,
  TrendingUp,
  Eye,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = createMetadata(
  'Schedule Marketing Consultation | Free Strategy Call | MappedSkills',
  'Book your free 20-minute performance marketing consultation call. Get custom recommendations for Google Ads, SEO, leads, ROAS, and conversions. No pushy sales pitch. Response within 24 hours.',
  '/schedule-call'
);

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mappedskills';

const DISCUSSION_TOPICS = [
  {
    title: 'Your Current Marketing Setup',
    description: 'We\'ll understand your current ads, SEO, website, lead generation, reporting, and conversion flow.',
  },
  {
    title: 'Your Growth Goal',
    description: 'We\'ll clarify whether you need more qualified leads, better ROAS, SEO visibility, lower cost per lead, or better conversions.',
  },
  {
    title: 'Your Biggest Marketing Leak',
    description: 'We\'ll identify whether the main issue is traffic, targeting, landing page, tracking, lead quality, or follow-up.',
  },
  {
    title: 'The Right Starting Point',
    description: 'We\'ll recommend whether you should begin with Google Ads, Meta Ads, SEO, Lead Generation, CRO, or a combined approach.',
  },
  {
    title: 'Practical Next Steps',
    description: 'You\'ll leave with clear recommendations on what should be fixed, avoided, or scaled.',
  },
];

const OUTCOMES = [
  {
    title: 'Clear Growth Diagnosis',
    description: 'Understand what may be blocking your marketing performance.',
  },
  {
    title: 'Channel Recommendation',
    description: 'Know which service should be your first priority.',
  },
  {
    title: 'Tracking Clarity',
    description: 'Understand which metrics and events should be tracked properly.',
  },
  {
    title: 'Budget Direction',
    description: 'Get a practical view of what kind of investment may be required.',
  },
  {
    title: 'Next-Step Roadmap',
    description: 'Know whether you need an audit, proposal, campaign rebuild, SEO plan, or CRO review.',
  },
];

const FOR_THIS_CALL = [
  'You are spending on ads but not seeing clear returns',
  'You are getting leads but quality is poor',
  'Your website traffic is not converting',
  'You want to improve Google Ads or Meta Ads performance',
  'You want SEO but do not know where to start',
  'You need more qualified enquiries',
  'You want transparent marketing reporting',
  'You are ready to invest seriously in growth',
];

const NOT_FOR_THIS_CALL = [
  'You are looking for guaranteed leads overnight',
  'You want the cheapest marketing vendor',
  'You are not ready to track performance properly',
  'You do not want to share campaign or business context',
  'You want random activity without strategy',
  'You expect results without budget, patience, or implementation',
];

const PREPARE_FOR_CALL = [
  'Website Link - So we can understand your current digital presence.',
  'Current Marketing Channels - Google Ads, Meta Ads, SEO, WhatsApp, referrals, or any other active channel.',
  'Current Monthly Budget - Approximate monthly marketing or ad spend.',
  'Main Growth Challenge - What you want to improve first — leads, sales, SEO, ROAS, conversion, or reporting.',
  'Any Reports or Screenshots - Optional, but useful if you want a sharper discussion.',
];

const TRUST_POINTS = [
  {
    title: 'No Pushy Sales Pitch',
    description: 'The call is focused on clarity, not pressure.',
  },
  {
    title: 'Business-First Thinking',
    description: 'We talk about leads, revenue, ROAS, conversion, and growth — not jargon.',
  },
  {
    title: 'Practical Recommendations',
    description: 'You get realistic next steps based on your current situation.',
  },
  {
    title: 'Clear Fit Check',
    description: 'If MappedSkills is not the right fit, we\'ll say it honestly.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Is the strategy call free?',
    answer: 'Yes. The initial 20-minute strategy consultation is free.',
  },
  {
    question: 'How long is the consultation?',
    answer: 'The call is planned for 20 minutes. If deeper analysis is required, we can suggest the next step separately.',
  },
  {
    question: 'Is this a sales call?',
    answer: 'No. The call is meant to understand your business, identify growth leaks, and suggest practical next steps. If there is a fit, we can discuss working together.',
  },
  {
    question: 'Do you offer remote meetings?',
    answer: 'Yes. Calls can be done online, so businesses from Pune, Mumbai, or anywhere in India can book a consultation.',
  },
  {
    question: 'What will I get after the call?',
    answer: 'You will get clarity on what may be blocking your growth and what should be fixed, improved, or scaled next.',
  },
  {
    question: 'Can I book if I am not sure which service I need?',
    answer: 'Yes. That is exactly what the call is for. We\'ll help you understand whether Google Ads, Meta Ads, SEO, lead generation, or CRO is the right starting point.',
  },
];

export default function ScheduleCallPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
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
                'name': 'Schedule Call',
                'item': 'https://mappedskills.com/schedule-call'
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': FAQ_ITEMS.map(item => ({
              '@type': 'Question',
              'name': item.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer
              }
            }))
          })
        }}
      />

      {/* Tracking Notes:
        * schedule_call_click - Primary CTA button clicks
        * calendly_view - Calendly section is visible/loaded
        * calendly_click - User interacts with Calendly embed
        * calendly_booking_started - Calendly form initiated
        * calendly_booking_completed - Booking confirmed (if supported)
        * contact_click - Contact page links clicked
        * phone_click - Phone number clicked
        * email_click - Email address clicked
        * faq_open - FAQ accordion items opened
      */}
      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Schedule Call</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="Book Your Free Strategy Consultation"
        subheadline="Free Marketing Consultation"
        description="Get a practical review of your current marketing setup and clear recommendations on what is working, what is leaking, and what should be fixed first."
        cta={{
          text: 'Book My Free Call',
          href: '#booking-section',
        }}
        secondaryCta={{
          text: 'Contact Us Instead',
          href: '/contact',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-1">20</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Minute Strategy Call</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Free Initial Review</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">No Pushy Sales Pitch</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Clear Growth Recommendations</p>
          </Card>
        </div>

        <div className="mt-12 relative h-64 sm:h-80 rounded-lg overflow-hidden bg-secondary/5 border border-border">
          <Image
            src="/images/schedule-call-hero.png"
            alt="Business professional booking a strategy consultation call to discuss marketing optimization and growth"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Hero>

      {/* 2. Calendly Booking Section */}
      <Section id="booking-section" className="bg-secondary/5 border-y border-border">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Choose a Time That Works for You
            </h2>
            <p className="text-lg text-foreground">
              Pick a convenient time for a short strategy discussion. We'll use the call to understand your business and recommend the right next step.
            </p>
          </div>

          {/* Tracking: calendly_view, calendly_click */}
          <CalendlyEmbed url={CALENDLY_URL} />

          <p className="text-center mt-8 text-sm text-muted-foreground">
            You will receive an automatic confirmation email after booking.
          </p>
        </Container>
      </Section>

      {/* 3. What We'll Discuss Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What We'll Discuss on the Call
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DISCUSSION_TOPICS.map((topic, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <Eye className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-lg">{topic.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{topic.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. What You'll Get Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What You'll Get From This Strategy Call
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {OUTCOMES.map((outcome, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <Zap className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-lg">{outcome.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{outcome.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Who This Call Is For Section */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-3xl sm:text-4xl font-bold tracking-tight">
              This Call Is Best For You If…
            </h2>

            <ul className="space-y-4 mb-12">
              {FOR_THIS_CALL.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/5">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <Button size="lg" asChild>
                <a href="#booking-section">Book Your Free Call</a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Who This Call Is Not For Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-3xl sm:text-4xl font-bold tracking-tight">
              This Call May Not Be Right If…
            </h2>

            <ul className="space-y-4 mb-12">
              {NOT_FOR_THIS_CALL.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 rounded-lg hover:bg-background/50">
                  <X className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground text-center">
              We appreciate transparency. If any of the above describes your situation, we want to be upfront about it.
            </p>
          </div>
        </Container>
      </Section>

      {/* 7. Before the Call Section */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-3xl sm:text-4xl font-bold tracking-tight">
              Before the Call, Keep These Ready
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {PREPARE_FOR_CALL.map((item, idx) => {
                const [title, ...descParts] = item.split(' - ');
                const description = descParts.join(' - ');
                return (
                  <Card key={idx} className="p-6 flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">{title}</p>
                      {description && <p className="text-sm text-muted-foreground">{description}</p>}
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-6 sm:p-8">
              <p className="text-foreground">
                <span className="font-semibold">No formal presentation needed.</span> A simple understanding of your current situation is enough. Come as you are.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Trust Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Why Businesses Book This Call
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_POINTS.map((point, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <TrendingUp className="h-8 w-8 text-accent mb-4" />
                <h3 className="mb-2 font-semibold text-lg">{point.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Testimonial / Proof Section */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight text-center">
              What Clients Value About MappedSkills
            </h2>

            <Card className="p-8 sm:p-12 text-center border-accent/20 bg-secondary/5">
              <p className="text-lg sm:text-xl text-foreground italic mb-6 leading-relaxed">
                "MappedSkills explained our marketing problem in simple business terms and helped us understand what needed to be fixed first."
              </p>
              <p className="font-semibold mb-1">Client Name</p>
              <p className="text-sm text-muted-foreground">Service Business</p>
              <p className="text-xs text-muted-foreground mt-4">[Placeholder testimonial — replace with verified client feedback]</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 10. Quick FAQ Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Strategy Call FAQs
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Tracking: faq_open */}
            <FAQSection items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      {/* 11. Alternative Contact Section */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Prefer to Contact Us Directly?
            </h2>
            <p className="mb-8 text-lg text-foreground">
              You can also reach us by phone or email.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Card className="p-6 flex flex-col items-center">
                <p className="text-muted-foreground mb-2">Phone</p>
                {/* Tracking: phone_click */}
                <Button variant="outline" asChild>
                  <a href="tel:+919873232662">+91 9873232662</a>
                </Button>
              </Card>
              <Card className="p-6 flex flex-col items-center">
                <p className="text-muted-foreground mb-2">Email</p>
                {/* Tracking: email_click */}
                <Button variant="outline" asChild>
                  <a href="mailto:info@mappedskills.com">info@mappedskills.com</a>
                </Button>
              </Card>
            </div>

            <p className="text-muted-foreground mb-4">Or visit our contact page:</p>
            {/* Tracking: contact_click */}
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Go to Contact Page</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 12. Final CTA Section */}
      <CTASection
        title="Ready to Get Clear About Your Marketing?"
        description="Book your free strategy consultation and find out what is working, what is leaking, and what should be fixed first."
        primaryCta={{
          text: 'Book My Free Strategy Call',
          href: '#booking-section',
        }}
        secondaryCta={{
          text: 'Contact Us',
          href: '/contact',
        }}
      />
    </>
  );
}
