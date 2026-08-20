import Link from 'next/link';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
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
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Users,
  Zap,
  Target,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';
import {
  LEAD_GEN_SERVICES,
  LEAD_GEN_INDUSTRIES,
  LEAD_GEN_FAQS,
  LEAD_GEN_ATTRIBUTES,
  LEAD_GEN_TRUST_CARDS,
  LEAD_GEN_PRICING_TIERS,
  BLOG_ARTICLES,
} from '@/lib/constants';

export const metadata = createMetadata(
  'B2B Lead Generation Services | Qualified Leads | MappedSkills',
  'B2B lead generation services with proven qualified lead capture. Google Ads, landing pages, WhatsApp flows, and lead qualification. Transparent pricing and reporting.',
  '/lead-generation'
);

export default function LeadGenerationPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-foreground">Services</Link>
            <span>/</span>
            <span className="text-foreground">Lead Generation</span>
          </div>
        </Container>
      </Section>

      {/* 1. Hero Section */}
      <Section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy and CTAs */}
            <div>
              {/* Eyebrow */}
              <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider h-auto max-w-full whitespace-normal break-words text-left leading-snug">
                B2B Lead Generation Services
              </Badge>

              {/* H1 */}
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-balance">
                B2B Lead Generation Services That Deliver Qualified Leads
              </h1>

              {/* Subheading */}
              <p className="mb-8 text-lg sm:text-xl text-foreground leading-relaxed max-w-xl">
                We help businesses build a predictable lead pipeline using paid ads, landing pages, lead forms, WhatsApp flows, qualification systems, and transparent reporting.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                  <Link href="/schedule-call">
                    Get Free Lead Audit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/schedule-call">
                    Schedule Strategy Call
                  </Link>
                </Button>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">50-300</p>
                  <p className="text-sm text-muted-foreground font-medium">Qualified Leads/Month Potential</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">300%+</p>
                  <p className="text-sm text-muted-foreground font-medium">Average ROI</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">₹100Cr+</p>
                  <p className="text-sm text-muted-foreground font-medium">Revenue Influenced</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">9+</p>
                  <p className="text-sm text-muted-foreground font-medium">Years Experience</p>
                </div>
              </div>
            </div>

            {/* Right: Lead Pipeline Visual */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-8 sm:p-12 border border-accent/10">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Traffic Sources', value: 'Google, Meta, Display' },
                  { label: 'Landing Page / Form', value: 'Conversion Optimized' },
                  { label: 'Lead Capture', value: '+250 leads/month' },
                  { label: 'Lead Qualification', value: 'Intent & Fit Based' },
                  { label: 'WhatsApp / CRM', value: 'Auto Follow-Up' },
                  { label: 'Sales-Ready Lead', value: '+50 qualified/month' },
                  { label: 'Reporting', value: 'Weekly Dashboard' },
                ].map((item, idx) => (
                  <Card key={idx} className="p-3 sm:p-4 bg-white">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">{item.label}</p>
                    <p className="text-sm sm:text-base font-semibold text-foreground">{item.value}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Problem Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              The Real Lead Problem
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Getting Leads Is Easy. Getting Qualified Leads Is the Real Challenge.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              Most businesses do not struggle because nobody enquires. They struggle because too many leads are cold, irrelevant, unresponsive, or not ready to buy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: 'Too Many Poor-Quality Leads',
                description: 'Your team spends time calling people who are not serious, not relevant, or not ready.',
              },
              {
                title: 'No Clear Ideal Customer Profile',
                description: 'Campaigns run without defining who should become a lead and who should be filtered out.',
              },
              {
                title: 'Weak Lead Capture System',
                description: 'Forms, landing pages, WhatsApp flows, and CTAs do not collect enough useful information.',
              },
              {
                title: 'No Lead Quality Tracking',
                description: 'You know how many leads came in, but not which campaign produced real sales opportunities.',
              },
            ].map((problem, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white">
                <AlertCircle className="h-8 w-8 text-accent mb-4" />
                <h3 className="mb-3 text-xl font-bold font-heading text-foreground">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Consequence Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-3xl sm:text-4xl font-bold font-heading tracking-tight text-balance">
              Bad Leads Cost More Than Ad Spend
            </h2>
            
            <div className="space-y-4 mb-8">
              {[
                'Sales teams waste time on weak enquiries',
                'Follow-up becomes random and inconsistent',
                'Campaigns are judged only by cost per lead',
                'Good prospects slip through because nurturing is weak',
                'Business owners lose trust in digital marketing',
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link href="/schedule-call">
                Audit My Lead Generation Funnel
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 4. Lead Generation Model Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Our Lead Generation Model Is Built Around Quality, Not Just Quantity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                title: 'Multi-Channel Demand Generation',
                description: 'We use the right mix of Google Ads, Meta Ads, SEO, landing pages, and retargeting based on your business model.',
              },
              {
                title: 'Lead Qualification System',
                description: 'We filter leads using questions, budget indicators, location, service need, intent level, and sales readiness.',
              },
              {
                title: 'Lead Delivery & Tracking',
                description: 'Leads can be delivered through CRM, Google Sheets, email, WhatsApp, or manual reporting depending on your current setup.',
              },
            ].map((model, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white text-center">
                <h3 className="mb-3 text-xl font-bold font-heading text-accent">
                  {model.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {model.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Our Process Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Lead Pipeline Framework
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              How MappedSkills Builds a Predictable Lead Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                num: '01',
                title: 'Define Your Ideal Customer',
                description: 'We identify your target customer, buying triggers, budget range, location, problem, urgency, and decision-making stage.',
              },
              {
                num: '02',
                title: 'Set Up Capture & Qualification',
                description: 'We create or improve landing pages, lead forms, WhatsApp flows, chatbot journeys, and qualification questions.',
              },
              {
                num: '03',
                title: 'Drive Targeted Traffic',
                description: 'We use paid search, paid social, retargeting, organic content, and high-intent campaigns to attract relevant prospects.',
              },
              {
                num: '04',
                title: 'Deliver, Track & Improve',
                description: 'We track lead source, lead cost, quality, follow-up status, conversion rate, and sales feedback to improve the funnel.',
              },
            ].map((phase, idx) => (
              <Card key={idx} className="p-6 sm:p-8 border border-border/50 bg-white">
                <p className="text-4xl font-bold font-heading text-accent mb-4">{phase.num}</p>
                <h3 className="mb-3 text-lg font-bold font-heading text-foreground">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. What We Manage Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Lead Generation Services We Provide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {LEAD_GEN_SERVICES.map((service, idx) => (
              <Card key={idx} className="p-6 sm:p-8 bg-accent/5 border border-border/50 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold font-heading mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Lead Attributes Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              What Information Can Be Captured With Each Lead?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              The exact fields depend on the offer, platform, form type, and user experience. We balance lead quality with conversion rate.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {LEAD_GEN_ATTRIBUTES.map((attr, idx) => (
                <Card key={idx} className="p-4 sm:p-6 bg-white border border-border/50 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium text-foreground">{attr}</span>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Industry Use Cases Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Lead Generation Campaigns Built for Different Industries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {LEAD_GEN_INDUSTRIES.map((industry, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white">
                <h3 className="mb-3 text-xl font-bold font-heading text-accent">
                  {industry.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Lead Quality Trust Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              How We Improve Lead Quality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {LEAD_GEN_TRUST_CARDS.map((card, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white">
                <h3 className="mb-3 text-xl font-bold font-heading text-accent">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. Pricing Models Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Lead Generation Pricing Models
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              Lead generation pricing depends on industry, lead quality expectations, monthly volume, targeting complexity, and follow-up process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {LEAD_GEN_PRICING_TIERS.map((tier, idx) => (
              <Card
                key={idx}
                className={`p-8 border ${tier.highlighted ? 'border-accent bg-white' : 'border-border/50 bg-white'}`}
              >
                <h3 className="mb-2 text-2xl font-bold font-heading text-foreground">
                  {tier.name}
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" variant={tier.highlighted ? 'default' : 'outline'} className={tier.highlighted ? 'bg-accent hover:bg-accent/90 w-full' : 'w-full'} asChild>
                  <Link href="/pricing">
                    Get Custom Quote
                  </Link>
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Ad spend is separate and paid directly to the platform unless agreed otherwise.</p>
          </div>
        </Container>
      </Section>

      {/* 11. Reporting Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              You Should Know Which Leads Are Actually Worth Paying For
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Leads', value: '250' },
                { label: 'Qualified Leads', value: '50' },
                { label: 'Cost Per Lead', value: '₹1,000' },
                { label: 'Cost Per Qualified', value: '₹5,000' },
                { label: 'Lead-to-Call', value: '40%' },
                { label: 'Lead-to-Sale', value: '20%' },
                { label: 'Best Campaign', value: 'Google Ads' },
                { label: 'Conversion Rate', value: '8%' },
              ].map((metric, idx) => (
                <Card key={idx} className="p-4 sm:p-6 bg-white border border-border/50 text-center">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">{metric.label}</p>
                  <p className="text-2xl font-bold text-accent">{metric.value}</p>
                </Card>
              ))}
            </div>

            <div className="bg-white rounded-lg p-8 border border-border/50 text-center">
              <p className="text-foreground leading-relaxed">
                We do not stop at reporting lead volume. We help you understand lead quality, follow-up performance, and conversion bottlenecks.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 12. Results Proof Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Lead Generation Should Be Measured by Sales-Ready Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {[
              {
                title: 'Real Estate Campaign',
                result: '200 qualified leads/month',
                service: 'Meta Ads + Google Ads + WhatsApp Follow-Up',
                placeholder: true,
              },
              {
                title: 'Service Provider Campaign',
                result: '50 appointment-ready leads/month',
                service: 'Landing Page + Lead Forms + Qualification',
                placeholder: true,
              },
              {
                title: 'Education Campaign',
                result: '500 course enquiries/month',
                service: 'Lead Generation + Nurturing Flow',
                placeholder: true,
              },
            ].map((proof, idx) => (
              <Card key={idx} className="p-8 bg-accent/5 border border-border/50">
                {proof.placeholder && (
                  <Badge className="mb-4 bg-foreground/10 text-muted-foreground border-0 text-xs">
                    Placeholder Case Study
                  </Badge>
                )}
                <h3 className="mb-2 text-lg font-bold font-heading text-foreground">
                  {proof.title}
                </h3>
                <p className="mb-4 text-2xl font-bold text-accent">
                  {proof.result}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {proof.service}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/work">
                View Results
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 13. Testimonial Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              What Clients Say About Our Lead Generation Work
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 sm:p-12 border border-border/50 bg-white">
              <Badge className="mb-4 bg-foreground/10 text-muted-foreground border-0 text-xs">
                Placeholder Testimonial
              </Badge>
              <blockquote className="mb-6 text-lg text-foreground italic leading-relaxed">
                "MappedSkills helped us move from random enquiries to a more structured lead pipeline. We could finally see which campaigns were producing serious prospects."
              </blockquote>
              <p className="font-bold font-heading text-foreground mb-1">
                Client Name
              </p>
              <p className="text-accent font-medium">
                Service Business
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 14. FAQ Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Lead Generation FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {LEAD_GEN_FAQS.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="border-b border-border/30">
                  <AccordionTrigger className="py-4 hover:no-underline hover:text-accent">
                    <span className="text-left font-bold font-heading text-foreground">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* 15. Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C2C2C] to-[#1A2A3A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white text-balance">
              Ready to Build a Lead Pipeline Your Sales Team Can Trust?
            </h2>

            <p className="mb-4 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Book a free lead audit and discover where your current funnel is leaking, why lead quality is poor, and how to generate better prospects.
            </p>

            <p className="mb-10 text-sm text-gray-400">
              No bulk lead promises. Just a practical review of your targeting, forms, follow-up, and lead quality gaps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8" asChild>
                <Link href="/schedule-call">
                  Get Free Lead Audit
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
