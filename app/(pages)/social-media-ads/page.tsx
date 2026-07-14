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
import { ArrowRight, Target, Users, TrendingUp, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import {
  SOCIAL_MEDIA_ADS_SERVICES,
  SOCIAL_MEDIA_ADS_VERTICALS,
  SOCIAL_MEDIA_ADS_DIFFERENTIATORS,
  SOCIAL_MEDIA_ADS_FAQS,
  BLOG_ARTICLES,
  TESTIMONIALS,
} from '@/lib/constants';

export const metadata = createMetadata(
  'Facebook & Instagram Ads Management | Meta Ads Agency',
  'Expert Facebook and Instagram ads management for lead generation, e-commerce, real estate, and education. Improve ROAS with data-driven Meta ad strategy.',
  '/social-media-ads'
);

export default function SocialMediaAdsPage() {
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
            <span className="text-foreground">Social Media Ads</span>
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
                Facebook & Instagram Ads Management
              </Badge>

              {/* H1 */}
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-balance">
                Facebook & Instagram Ads Management That Converts Attention Into Customers
              </h1>

              {/* Subheading */}
              <p className="mb-8 text-lg sm:text-xl text-foreground leading-relaxed max-w-xl">
                We help businesses generate qualified leads, sales, and enquiries through Meta ad campaigns built around audience strategy, creative testing, retargeting, and conversion tracking.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                  <Link href="/schedule-call">
                    Audit Your Ad Account
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
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">4-5x</p>
                  <p className="text-sm text-muted-foreground font-medium">Average ROAS Potential</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">50+</p>
                  <p className="text-sm text-muted-foreground font-medium">Clients Served</p>
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

            {/* Right: Dashboard Visual */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-8 sm:p-12 border border-accent/10">
              <div className="space-y-4">
                <Card className="p-4 bg-white">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">Campaign Spend</p>
                  <p className="text-2xl font-bold text-foreground">₹250,000</p>
                </Card>
                <Card className="p-4 bg-white">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">Leads Generated</p>
                  <p className="text-2xl font-bold text-accent">250</p>
                </Card>
                <Card className="p-4 bg-white">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">Cost Per Lead</p>
                  <p className="text-2xl font-bold text-foreground">₹1,000</p>
                </Card>
                <Card className="p-4 bg-white">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">ROAS</p>
                  <p className="text-2xl font-bold text-accent">4.2x</p>
                </Card>
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
              The Paid Social Problem
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Are Your Facebook and Instagram Ads Getting Clicks But Not Customers?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              Most Meta ad campaigns fail because the audience, creative, offer, funnel, landing page, and tracking are not working together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: 'Low-Quality Leads',
                description: 'You get enquiries, but most of them are not serious, not qualified, or not ready to buy.',
              },
              {
                title: 'Poor Creative Performance',
                description: 'Your ads are being ignored because the messaging, hook, visual, or offer is not strong enough.',
              },
              {
                title: 'High Cost Per Lead or Purchase',
                description: 'The campaign is spending money, but the cost of acquiring a customer keeps rising.',
              },
              {
                title: 'Weak Retargeting',
                description: 'People visit your website or engage with your ads, but they are not being nurtured properly.',
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
              Weak Social Ads Can Quietly Drain Your Marketing Budget
            </h2>
            
            <div className="space-y-4 mb-8">
              {[
                'Your budget gets spent on the wrong audience',
                'Your sales team wastes time on poor-quality leads',
                'Good prospects forget your brand because retargeting is weak',
                'You keep changing creatives without understanding the real problem',
                'You scale campaigns before fixing the funnel',
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link href="/schedule-call">
                Audit My Meta Ads Account
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 4. Why Social Ads Matter Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Why Facebook and Instagram Ads Still Matter for Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-8">
            {[
              {
                title: 'Reach',
                description: 'Facebook and Instagram help your brand reach large, targeted audiences across different buyer stages.',
              },
              {
                title: 'Targeting',
                description: 'Meta ads allow interest, behavior, custom audience, lookalike, and retargeting-based campaign strategies.',
              },
              {
                title: 'Speed',
                description: 'Unlike SEO, paid social campaigns can start generating audience signals, traffic, leads, and sales quickly.',
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white text-center">
                <h3 className="mb-3 text-2xl font-bold font-heading text-accent">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="bg-accent/5 rounded-lg p-8 sm:p-12 border border-accent/10 text-center">
            <p className="text-lg text-foreground leading-relaxed">
              The platform works when the campaign is built with the right offer, creative angles, funnel, landing page, and tracking.
            </p>
          </div>
        </Container>
      </Section>

      {/* 5. Our Meta Ads Approach */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Paid Social Framework
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              How MappedSkills Builds Social Ad Campaigns That Can Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                num: '01',
                title: 'Account Analysis',
                description: 'We review your ad account, audience setup, campaign structure, creative history, pixel events, landing pages, and conversion data.',
              },
              {
                num: '02',
                title: 'Creative Strategy',
                description: 'We identify the strongest hooks, pain points, offers, formats, and angles that can make people stop, click, and convert.',
              },
              {
                num: '03',
                title: 'Campaign Build',
                description: 'We build campaigns for cold audiences, warm audiences, retargeting, lead generation, conversions, and sales depending on your business goal.',
              },
              {
                num: '04',
                title: 'Scale & Optimize',
                description: 'We monitor cost per lead, ROAS, CTR, conversion rate, creative fatigue, lead quality, and sales feedback to improve performance.',
              },
            ].map((phase, idx) => (
              <Card key={idx} className="p-6 sm:p-8 border border-border/50 bg-white">
                <p className="text-4xl font-bold font-heading text-accent mb-4">{phase.num}</p>
                <h3 className="mb-3 text-xl font-bold font-heading text-foreground">
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

      {/* 6. What We Manage */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Social Media Ads Management Services We Provide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {SOCIAL_MEDIA_ADS_SERVICES.map((service, idx) => (
              <Card key={idx} className="p-6 sm:p-8 bg-white border border-border/50 flex items-start gap-4">
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

      {/* 7. Verticals We Serve */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Social Ads Built for Different Business Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SOCIAL_MEDIA_ADS_VERTICALS.map((vertical, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white">
                <h3 className="mb-3 text-xl font-bold font-heading text-accent">
                  {vertical.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {vertical.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Results Proof */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Social Ads Should Be Measured by Business Outcomes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {[
              {
                title: 'Real Estate Campaign',
                result: 'Generated 50 qualified leads/month and 8 sales/month',
                service: 'Facebook Lead Ads + Retargeting',
                placeholder: true,
              },
              {
                title: 'E-commerce Brand',
                result: 'Reduced cost of goods sold to 25% and achieved 6x ROAS',
                service: 'Conversion Campaigns + Catalog Retargeting',
                placeholder: true,
              },
              {
                title: 'Online Education Brand',
                result: '300 course enrollments in 60 days',
                service: 'Lead Generation + WhatsApp Follow-Up',
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
              <Link href="/results">
                View Results
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 9. Why Choose MappedSkills */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Why Choose MappedSkills as Your Social Media Advertising Agency?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SOCIAL_MEDIA_ADS_DIFFERENTIATORS.map((diff, idx) => (
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

      {/* 10. Pricing */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Social Media Ads Management Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              Social media ads management pricing depends on campaign complexity, ad budget, creative requirements, number of funnels, and business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {[
              {
                name: 'Starter',
                description: 'Best for focused lead generation or single-offer campaigns.',
                features: [
                  'Meta campaign setup',
                  'Basic audience research',
                  '2-3 creative angles',
                  'Monthly reporting',
                ],
              },
              {
                name: 'Growth',
                description: 'Best for businesses running multiple campaigns or offers.',
                features: [
                  'Facebook + Instagram campaign management',
                  'Creative testing plan',
                  'Retargeting setup',
                  'Weekly optimization',
                  'Monthly strategy review',
                ],
                highlighted: true,
              },
              {
                name: 'Scale',
                description: 'Best for e-commerce, real estate, education, or aggressive lead generation campaigns.',
                features: [
                  'Full-funnel campaign structure',
                  'Advanced retargeting',
                  'Creative testing roadmap',
                  'Conversion tracking review',
                  'Scaling recommendations',
                ],
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 border ${plan.highlighted ? 'border-accent bg-white' : 'border-border/50 bg-white'}`}
              >
                <h3 className="mb-2 text-2xl font-bold font-heading text-foreground">
                  {plan.name}
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className={plan.highlighted ? 'bg-accent hover:bg-accent/90' : ''} variant={plan.highlighted ? 'default' : 'outline'} asChild className="w-full">
                  <Link href="/pricing">
                    Get Custom Quote
                  </Link>
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Ad spend is paid directly to Meta. Management fees are separate.</p>
          </div>
        </Container>
      </Section>

      {/* 11. Testimonials */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              What Clients Say About Our Social Ads Work
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 sm:p-12 border border-border/50 bg-white">
              <Badge className="mb-4 bg-foreground/10 text-muted-foreground border-0 text-xs">
                Placeholder Testimonial
              </Badge>
              <blockquote className="mb-6 text-lg text-foreground italic leading-relaxed">
                "MappedSkills helped us understand why our ads were getting leads but not real prospects. After restructuring the campaigns and improving the targeting, our lead quality improved significantly."
              </blockquote>
              <p className="font-bold font-heading text-foreground mb-1">
                Client Name
              </p>
              <p className="text-accent font-medium">
                Real Estate
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 12. FAQs */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Social Media Ads Management FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {SOCIAL_MEDIA_ADS_FAQS.map((faq, idx) => (
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

      {/* 13. Blog Preview */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Growth Insights
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Latest Social Ads & Lead Generation Insights
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

      {/* 14. Final CTA */}
      <section className="py-16 bg-gradient-to-br from-[#2C2C2C] to-[#1A2A3A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white text-balance">
              Ready to Build Social Ads That Actually Convert?
            </h2>

            <p className="mb-4 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Get a free ad account audit and discover what is working, what is wasting budget, and how your Facebook and Instagram ads can generate better leads or sales.
            </p>

            <p className="mb-10 text-sm text-gray-400">
              No random boosting. No vanity reporting. Just a practical review of your campaigns, creatives, targeting, funnel, and tracking.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8" asChild>
                <Link href="/schedule-call">
                  Audit Your Ad Account
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
