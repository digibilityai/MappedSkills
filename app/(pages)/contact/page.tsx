import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { ContactForm } from '@/components/ContactForm';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata, offices, siteMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import {
  Mail,
  MapPin,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = createMetadata(
  'Contact Performance Marketing Agency | MappedSkills',
  'Contact MappedSkills for free marketing audit and performance marketing consultation. Get expert recommendations on Google Ads, lead generation, SEO, and conversion optimization. Response within 24 hours.',
  '/contact'
);

const TRUST_CARDS = [
  {
    title: 'No Generic Advice',
    description: 'We first understand your business before recommending a channel.',
  },
  {
    title: 'No Fake Guarantees',
    description: 'We do not promise overnight leads, rankings, or revenue.',
  },
  {
    title: 'Tracking-First Thinking',
    description: 'We look at data, funnel gaps, and conversion clarity.',
  },
  {
    title: 'Business-Focused Recommendations',
    description: 'We explain what to fix first, what to avoid, and what can scale.',
  },
];

const PROCESS_STEPS = [
  {
    step: '1',
    title: 'We Review Your Details',
    description: 'We understand your business, current challenge, service interest, and marketing setup.',
  },
  {
    step: '2',
    title: 'We Identify the Right Starting Point',
    description: 'We check whether you need ads, SEO, lead generation, CRO, tracking, or a broader strategy.',
  },
  {
    step: '3',
    title: 'We Schedule a Strategy Discussion',
    description: 'If there is a fit, we discuss your goals, budget, funnel, and growth opportunities.',
  },
  {
    step: '4',
    title: 'You Get Clear Recommendations',
    description: 'You receive practical next steps — not generic marketing advice.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How soon will MappedSkills respond?',
    answer: 'We usually respond within 24 hours after reviewing your enquiry.',
  },
  {
    question: 'Is the strategy call free?',
    answer: 'Yes. The initial strategy call is free and focused on understanding your current marketing setup and recommending the right next step.',
  },
  {
    question: 'Do I need to know which service I want?',
    answer: 'No. If you are not sure, select "Not Sure Yet" and we\'ll help identify whether Google Ads, Meta Ads, SEO, lead generation, or conversion optimization is the right starting point.',
  },
  {
    question: 'Can I contact you directly by phone or email?',
    answer: `Yes. You can call our Pune office at ${offices[0].phoneDisplay}, our Mumbai office at ${offices[1].phoneDisplay}, or email ${siteMetadata.email}.`,
  },
  {
    question: 'Will I get a proposal after contacting you?',
    answer: 'If there is a clear fit, we can share a custom strategy and proposal based on your business goal, scope, budget, and current marketing setup.',
  },
];

/* 
  SEO & Tracking Notes:
  - Primary keyword: "contact performance marketing agency"
  - Secondary keywords: "free marketing audit", "contact digital marketing agency", "performance marketing consultation"
  - Schema: BreadcrumbList, ContactPage, FAQPage
  - GA4 Events:
    * contact_form_start - User begins form
    * contact_form_submit - Form submitted
    * contact_form_error - Form validation error
    * schedule_call_click - Schedule call CTA clicked
    * contact_form_scroll_click - Contact form viewed
    * phone_click - Phone number clicked
    * email_click - Email address clicked
    * service_interest_selected - Service dropdown selected
    * budget_range_selected - Budget dropdown selected
    * faq_open - FAQ accordion opened
*/

export default function ContactPage() {
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
                'name': 'Contact',
                'item': 'https://mappedskills.com/contact'
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

      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Contact</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Hero
        title="Let's Talk About Growing Your Business"
        subheadline="Contact MappedSkills"
        description="Tell us what you want to improve — leads, ROAS, SEO visibility, conversion rate, or campaign performance. We'll review your details and suggest the right next step."
        cta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Fill the Contact Form',
          href: '#contact-form',
        }}
      >
        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Free Initial Audit</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Response Within 24 Hours</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">No Pushy Sales Call</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Clear Growth Recommendations</p>
          </Card>
        </div>

        {/* Hero Visual */}
        <div className="mt-12 relative h-64 sm:h-80 rounded-lg overflow-hidden bg-secondary/5 border border-border">
          <Image
            src="/images/contact-hero.png"
            alt="Business professionals in marketing consultation meeting discussing growth strategy and performance metrics"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Hero>

      {/* 2. Main Contact Section */}
      <Section id="contact-form">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="mb-2 text-3xl sm:text-4xl font-bold tracking-tight">
                Share Your Growth Challenge
              </h2>
              <p className="mb-8 text-lg text-foreground">
                The more clearly you share your current situation, the better we can recommend the right marketing direction.
              </p>

              {/* Tracking: contact_form_start */}
              <ContactForm />
            </div>

            {/* Right Column - Contact Details */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-6 text-2xl font-bold tracking-tight">
                  Contact Details
                </h3>
              </div>

              {/* Email Card - Tracking: email_click */}
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-accent font-medium mb-2">
                      <a
                        href={`mailto:${siteMetadata.email}`}
                        className="hover:underline break-all"
                      >
                        {siteMetadata.email}
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Shared inbox for both offices · We respond within 24 hours
                    </p>
                  </div>
                </div>
              </Card>

              {offices.map((office) => (
                <Card key={office.city} className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">{office.label}</h4>
                      <address className="not-italic text-sm text-foreground mb-3 space-y-0.5">
                        {office.addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                      <p className="text-accent font-medium">
                        <a href={`tel:${office.phone}`} className="hover:underline">
                          {office.phoneDisplay}
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Hours Card */}
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Office Hours</h4>
                    <p className="text-sm text-foreground mb-2">
                      Monday to Friday<br />
                      9:00 AM - 6:00 PM IST
                    </p>
                    <p className="text-sm text-accent">Response within 24 hours</p>
                  </div>
                </div>
              </Card>

              {/* Quick CTA - Tracking: schedule_call_click */}
              <Card className="p-6 bg-accent/5 border-accent/20">
                <p className="font-semibold mb-4 text-foreground">
                  Prefer to book directly?
                </p>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/schedule-call">
                    Schedule Call
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Trust Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Why Businesses Contact MappedSkills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_CARDS.map((card, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <CheckCircle className="h-8 w-8 text-accent mb-4" />
                <h3 className="mb-2 font-semibold text-lg">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. What Happens Next Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              What Happens After You Submit?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="mb-2 font-semibold text-lg">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Alternative CTA Section */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Prefer Booking Directly?
            </h2>
            <p className="mb-8 text-lg text-foreground">
              Skip the form and book a free strategy call at a time that works for you.
            </p>
            {/* Tracking: schedule_call_click */}
            <Button size="lg" asChild>
              <Link href="/schedule-call">
                Schedule Free Strategy Call
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6. Quick FAQ Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Contact FAQs
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Tracking: faq_open tracked in FAQSection via onClick handler */}
            <FAQSection items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      {/* 7. Final CTA Section */}
      <CTASection
        title="Ready to Find Out What's Blocking Your Growth?"
        description="Share your details or book a free strategy call. We'll help you identify what is working, what is leaking, and what should be fixed first."
        primaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Explore Services',
          href: '/services',
        }}
      />
    </>
  );
}
