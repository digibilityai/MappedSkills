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
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  CRO_PROBLEMS,
  CRO_PROCESS_STEPS,
  CRO_SERVICES,
  CRO_OPTIMIZATION_AREAS,
  CRO_TOOLS,
  CRO_DIFFERENTIATORS,
  CRO_PRICING_TIERS,
  CRO_FAQS,
  BLOG_ARTICLES,
} from '@/lib/constants';

export const metadata = createMetadata(
  'Conversion Rate Optimization Services | Increase Conversions | MappedSkills',
  'Conversion rate optimization (CRO) services to improve landing pages, forms, funnels, and CTAs. Turn more visitors into leads and customers. Get a free conversion audit.',
  '/conversion-optimization'
);

export default function ConversionOptimizationPage() {
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
            <span className="text-foreground">Conversion Optimization</span>
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
              <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider">
                Conversion Rate Optimization Services
              </Badge>

              {/* H1 */}
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-balance">
                Conversion Rate Optimization Services That Turn More Visitors Into Customers
              </h1>

              {/* Subheading */}
              <p className="mb-8 text-lg sm:text-xl text-foreground leading-relaxed max-w-xl">
                We help businesses improve landing pages, forms, funnels, CTAs, tracking, and user journeys so more of your existing traffic becomes leads, sales, or booked calls.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                  <Link href="/schedule-call">
                    Get Free Conversion Audit
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
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">25-150%</p>
                  <p className="text-sm text-muted-foreground font-medium">Conversion Improvement Potential</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">45%</p>
                  <p className="text-sm text-muted-foreground font-medium">Average CRO Improvement</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">30+</p>
                  <p className="text-sm text-muted-foreground font-medium">Brands Reviewed</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">9+</p>
                  <p className="text-sm text-muted-foreground font-medium">Years Performance Marketing</p>
                </div>
              </div>
            </div>

            {/* Right: Before-After Conversion Dashboard */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-8 sm:p-12 border border-accent/10">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Before Column */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Before</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Visitors', value: '10,000' },
                      { label: 'Form Submit', value: '200' },
                      { label: 'Conv. Rate', value: '2%' },
                      { label: 'Cost/Lead', value: '₹5,000' },
                      { label: 'Drop-Off', value: '98%' },
                      { label: 'CTA Clicks', value: '300' },
                    ].map((item, idx) => (
                      <Card key={idx} className="p-2 sm:p-3 bg-white border border-border/30">
                        <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                        <p className="text-sm font-bold text-foreground">{item.value}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* After Column */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent mb-4">After</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Visitors', value: '10,000', improvement: true },
                      { label: 'Form Submit', value: '350', improvement: true },
                      { label: 'Conv. Rate', value: '3.5%', improvement: true },
                      { label: 'Cost/Lead', value: '₹2,857', improvement: true },
                      { label: 'Drop-Off', value: '96.5%', improvement: false },
                      { label: 'CTA Clicks', value: '450', improvement: true },
                    ].map((item, idx) => (
                      <Card key={idx} className={`p-2 sm:p-3 bg-white border ${item.improvement ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
                        <p className={`text-xs mb-0.5 ${item.improvement ? 'text-green-700' : 'text-orange-700'}`}>{item.label}</p>
                        <div className="flex items-end gap-1">
                          <p className="text-sm font-bold text-foreground">{item.value}</p>
                          {item.improvement ? (
                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-orange-600" />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
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
              The Real Conversion Problem
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Most Businesses Don&apos;t Need More Traffic First. They Need More Conversions.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              If your ads, SEO, or social campaigns are sending people to a weak landing page, increasing traffic only increases waste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CRO_PROBLEMS.map((problem, idx) => (
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
              A Low-Converting Website Makes Every Marketing Channel More Expensive
            </h2>
            
            <div className="space-y-4 mb-8">
              {[
                'Google Ads becomes costlier',
                'Meta Ads look weaker than they actually are',
                'SEO traffic does not become leads',
                'Sales teams receive fewer enquiries',
                'Cost per lead or cost per sale keeps rising',
                'You may scale traffic when the page itself needs fixing',
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link href="/schedule-call">
                Audit My Conversion Funnel
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 4. Conversion Opportunity Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Small Conversion Improvements Can Create Big Revenue Gains
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              CRO helps you get more value from the traffic you already paid for or earned.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8 sm:p-12 border border-border/50 bg-white">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {[
                  { label: 'Current Monthly Traffic', value: '10,000', highlight: false },
                  { label: 'Current Conversion', value: '2%', highlight: false },
                  { label: 'Current Leads', value: '200', highlight: false },
                  { label: 'Improved Conversion', value: '4%', highlight: true },
                  { label: 'New Leads', value: '400', highlight: true },
                  { label: 'Result', value: 'Double', highlight: true },
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${item.highlight ? 'bg-accent/10 border border-accent/20' : 'bg-foreground/5'}`}>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">{item.label}</p>
                    <p className={`text-2xl sm:text-3xl font-bold ${item.highlight ? 'text-accent' : 'text-foreground'}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-center text-muted-foreground text-sm italic">
                Same traffic. Double the leads.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 5. CRO Process Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our CRO Framework
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              How MappedSkills Improves Conversion Rates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {CRO_PROCESS_STEPS.map((phase, idx) => (
              <Card key={idx} className="p-6 sm:p-8 border border-border/50 bg-white">
                <p className="text-4xl font-bold font-heading text-accent mb-4">{phase.step}</p>
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

      {/* 6. What We Optimize Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Conversion Rate Optimization Services We Provide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CRO_SERVICES.map((service, idx) => (
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

      {/* 7. Areas We Optimize Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Where Conversion Leaks Usually Hide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CRO_OPTIMIZATION_AREAS.map((area, idx) => (
              <Card key={idx} className="p-6 sm:p-8 border border-border/50 bg-white">
                <h3 className="mb-4 text-lg font-bold font-heading text-accent">
                  {area.title}
                </h3>
                <ul className="space-y-2">
                  {area.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Tools & Methods Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Our CRO Tools and Methods
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CRO_TOOLS.map((tool, idx) => (
              <Card key={idx} className="p-6 sm:p-8 border border-border/50 bg-accent/5">
                <h3 className="mb-3 text-lg font-bold font-heading text-accent">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Results Proof Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              CRO Should Be Measured by Conversion Lift, Not Design Opinions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {[
              {
                title: 'E-commerce Brand',
                result: '5% to 8% conversion rate',
                impact: '60% revenue increase potential from the same traffic',
                service: 'Landing Page + Checkout Optimization',
                placeholder: true,
              },
              {
                title: 'SaaS Business',
                result: '2% to 5% signup rate',
                impact: '3x more signups',
                service: 'Funnel + CTA Optimization',
                placeholder: true,
              },
              {
                title: 'Lead Generation Website',
                result: 'Improved form submissions and reduced cost per lead',
                impact: 'More leads without increasing ad spend',
                service: 'Landing Page + Form Optimization',
                placeholder: true,
              },
            ].map((proof, idx) => (
              <Card key={idx} className="p-8 bg-white border border-border/50">
                {proof.placeholder && (
                  <Badge className="mb-4 bg-foreground/10 text-muted-foreground border-0 text-xs">
                    Placeholder Case Study
                  </Badge>
                )}
                <h3 className="mb-2 text-lg font-bold font-heading text-foreground">
                  {proof.title}
                </h3>
                <p className="mb-2 text-2xl font-bold text-accent">
                  {proof.result}
                </p>
                <p className="mb-4 text-sm font-medium text-accent/80">
                  {proof.impact}
                </p>
                <p className="text-xs text-muted-foreground">
                  {proof.service}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/results">
                View Results
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 10. Why Choose MappedSkills Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Why Choose MappedSkills for Conversion Optimization?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {CRO_DIFFERENTIATORS.map((diff, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white">
                <h3 className="mb-3 text-xl font-bold font-heading text-accent">
                  {diff.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {diff.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 11. Pricing Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Conversion Optimization Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              CRO pricing depends on the number of pages, traffic volume, funnel complexity, tracking setup, testing needs, and implementation support required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {CRO_PRICING_TIERS.map((tier, idx) => (
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

          <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            <p>Development, design implementation, paid tools, and A/B testing platforms may be scoped separately based on requirements.</p>
          </div>
        </Container>
      </Section>

      {/* 12. Testimonial Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              What Clients Say About Our CRO Work
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 sm:p-12 border border-border/50 bg-accent/5">
              <Badge className="mb-4 bg-foreground/10 text-muted-foreground border-0 text-xs">
                Placeholder Testimonial
              </Badge>
              <blockquote className="mb-6 text-lg text-foreground italic leading-relaxed">
                "MappedSkills helped us understand why traffic was coming but enquiries were not. The recommendations made our landing page clearer and easier to act on."
              </blockquote>
              <p className="font-bold font-heading text-foreground mb-1">
                Client Name
              </p>
              <p className="text-accent font-medium">
                Lead Generation Business
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 13. FAQ Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Conversion Optimization FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {CRO_FAQS.map((faq, idx) => (
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

      {/* 14. Blog Preview */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Conversion Insights
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Latest CRO & Conversion Optimization Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {BLOG_ARTICLES.slice(0, 3).map((article, idx) => (
              <Card key={idx} className="p-6 sm:p-8 border border-border/50 bg-white hover:shadow-lg transition-shadow">
                <Badge className="mb-4 bg-accent/10 text-accent border-0 text-xs font-semibold">
                  {article.category}
                </Badge>
                <Link href={article.href}>
                  <h3 className="mb-3 text-lg font-bold font-heading text-foreground hover:text-accent transition-colors">
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

      {/* 15. Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C2C2C] to-[#1A2A3A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white text-balance">
              Ready to Get More Leads Without Increasing Ad Spend?
            </h2>

            <p className="mb-4 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Book a free conversion audit and discover where your landing page, form, funnel, or tracking is leaking opportunities.
            </p>

            <p className="mb-10 text-sm text-gray-400">
              No redesign for the sake of design. Just a practical review of what is stopping visitors from converting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8" asChild>
                <Link href="/schedule-call">
                  Get Free Conversion Audit
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
