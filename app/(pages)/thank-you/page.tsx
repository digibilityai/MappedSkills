import Link from 'next/link';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import { CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  ...createMetadata(
    'Thank You - Enquiry Received | MappedSkills',
    'Thank you for reaching out. We have received your enquiry and will get back to you within 24 hours with clear next steps.',
    '/thank-you'
  ),
  robots: 'noindex, nofollow',
  canonical: 'https://mappedskills.com/thank-you',
};


// Data constants
const STEP_CARDS = [
  {
    number: '1',
    title: 'We Review Your Details',
    description: 'We\'ll go through your business information, service interest, budget range, and marketing challenge.',
  },
  {
    number: '2',
    title: 'We Identify the Right Starting Point',
    description: 'We\'ll check whether your priority should be ads, SEO, lead generation, conversion optimization, or a broader strategy.',
  },
  {
    number: '3',
    title: 'We Reach Out',
    description: 'You can expect a response within 24 hours through phone or email.',
  },
  {
    number: '4',
    title: 'We Discuss Clear Next Steps',
    description: 'If there is a fit, we\'ll suggest a practical strategy call, audit, or custom proposal.',
  },
];

const SERVICE_CARDS = [
  {
    title: 'Google Ads',
    description: 'Improve high-intent campaign performance and reduce wasted spend.',
    href: '/google-ads',
  },
  {
    title: 'Social Media Ads',
    description: 'Improve Meta Ads targeting, creative testing, retargeting, and lead quality.',
    href: '/social-media-ads',
  },
  {
    title: 'Lead Generation',
    description: 'Build a more predictable pipeline of qualified enquiries.',
    href: '/lead-generation',
  },
  {
    title: 'SEO',
    description: 'Improve organic search visibility and rank for high-intent keywords.',
    href: '/seo',
  },
  {
    title: 'Conversion Optimization',
    description: 'Turn more existing traffic into leads, customers, or booked calls.',
    href: '/conversion-optimization',
  },
];

const BLOG_ARTICLES = [
  {
    title: 'How to Calculate Google Ads ROI: A Simple Formula',
    href: '/blog/how-to-calculate-google-ads-roi',
  },
  {
    title: '5 Reasons Your Facebook Ads Are Not Working',
    href: '/blog/facebook-ads-not-working',
  },
  {
    title: 'SEO vs PPC: Which Should Your Business Choose?',
    href: '/blog/seo-vs-ppc',
  },
];

export default function ThankYouPage() {
  return (
    <>
      {/* Tracking: thank_you_page_view */}
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
                'name': 'Thank You',
                'item': 'https://mappedskills.com/thank-you'
              }
            ]
          })
        }}
      />
      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Thank You</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero / Confirmation Section */}
      <Hero
        title="Thank You. We've Received Your Enquiry."
        subheadline="Enquiry Received"
        description="Our team will review your details and get back to you within 24 hours."
        cta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Explore Services',
          href: '/services',
        }}
      >
        {/* Success confirmation visual */}
        <div className="flex items-center justify-center">
          <Card className="p-12 border-green-200 bg-green-50/50">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </Card>
        </div>
      </Hero>

      {/* 2. What Happens Next Section */}
      <Section className="bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What Happens Next?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {STEP_CARDS.map((step, idx) => (
              <Card key={idx} className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Fast-Track CTA Section */}
      <Section className="border-y border-border">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Want to Fast-Track the Discussion?
            </h2>
            <p className="text-lg text-foreground mb-8">
              You can directly book a free strategy call instead of waiting for a callback.
            </p>
            {/* Tracking: schedule_call_click */}
            <Button size="lg" asChild>
              <Link href="/schedule-call">Book Free Strategy Call</Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4 italic">
              No pushy sales call. Just a practical discussion about your current marketing and growth opportunities.
            </p>
          </div>
        </Container>
      </Section>

      {/* 4. Explore Services Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Explore What We Can Help You Improve
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {SERVICE_CARDS.map((service, idx) => (
              <Card key={idx} className="p-6 sm:p-8 flex flex-col h-full hover:shadow-lg transition-shadow group">
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">{service.description}</p>
                {/* Tracking: service_cta_click */}
                <Link href={service.href} className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover/link:gap-3 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Useful Reading Section */}
      <Section className="bg-secondary/5">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              While You Wait, Read These Practical Guides
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {BLOG_ARTICLES.map((article, idx) => (
              <Card key={idx} className="p-6 sm:p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold mb-4 text-balance">{article.title}</h3>
                {/* Tracking: related_article_click */}
                <Link href={article.href} className="inline-flex items-center gap-2 text-accent font-semibold text-sm mt-auto hover:gap-3 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Contact Reminder Section */}
      <Section className="border-y border-border">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
              Need to Reach Us Directly?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-6 sm:p-8">
                <Phone className="h-8 w-8 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Phone</p>
                {/* Tracking: phone_click */}
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:+919873232662">+91 9873232662</a>
                </Button>
              </Card>
              
              <Card className="p-6 sm:p-8">
                <Mail className="h-8 w-8 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Email</p>
                {/* Tracking: email_click */}
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:info@mappedskills.com">info@mappedskills.com</a>
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
