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
  BarChart3,
  Award,
  Zap,
  Target,
  Search,
  Gauge,
} from 'lucide-react';
import {
  SEO_PROBLEMS,
  SEO_AUDIT_CHECKS,
  SEO_SERVICES,
  SEO_INDUSTRIES,
  SEO_TIMELINE,
  SEO_FAQS,
  SEO_PILLARS,
  SEO_PRICING_TIERS,
  BLOG_ARTICLES,
} from '@/lib/constants';

export const metadata = createMetadata(
  'SEO Services for Businesses | Organic Traffic Growth | MappedSkills',
  'SEO services focused on technical SEO, keyword strategy, content authority, and organic lead generation. Get a free SEO audit for your website.',
  '/seo'
);

export default function SEOPage() {
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
            <span className="text-foreground">SEO</span>
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
                SEO Services for Businesses
              </Badge>

              {/* H1 */}
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-balance">
                SEO Services for Businesses That Want Organic Traffic That Converts
              </h1>

              {/* Subheading */}
              <p className="mb-8 text-lg sm:text-xl text-foreground leading-relaxed max-w-xl">
                We help businesses improve search visibility, rank for high-intent keywords, fix technical SEO issues, and turn organic traffic into qualified leads.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                  <Link href="/schedule-call">
                    Get Free SEO Audit
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
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">200%+</p>
                  <p className="text-sm text-muted-foreground font-medium">Organic Traffic Growth Potential</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">30+</p>
                  <p className="text-sm text-muted-foreground font-medium">Keywords Targeted</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">90+ Days</p>
                  <p className="text-sm text-muted-foreground font-medium">to Ranking Signals</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-accent mb-1">9+</p>
                  <p className="text-sm text-muted-foreground font-medium">Years Experience</p>
                </div>
              </div>
            </div>

            {/* Right: SEO Dashboard Visual */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-8 sm:p-12 border border-accent/10">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Keyword Rankings', value: '85 keywords' },
                  { label: 'Organic Traffic', value: '+200% growth' },
                  { label: 'Search Visibility', value: '45% CTR' },
                  { label: 'Website Health Score', value: '92/100' },
                  { label: 'Organic Leads', value: '+50/month' },
                  { label: 'Top Landing Pages', value: '8 pages ranking' },
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
              The Real SEO Problem
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Most Websites Don't Have an SEO Problem. They Have a Strategy Problem.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              SEO fails when businesses chase random keywords, publish generic blogs, ignore technical issues, and never connect rankings to leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SEO_PROBLEMS.map((problem, idx) => (
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

      {/* 3. SEO Reality Check Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-3xl sm:text-4xl font-bold font-heading tracking-tight text-balance">
              SEO Is Not Magic. It Is a System.
            </h2>
            
            <div className="space-y-4 mb-8">
              {[
                'SEO takes time, usually 90+ days for early ranking signals',
                'Ranking alone is not enough—search intent matters more than keyword volume',
                'Technical SEO, content, and authority must work together',
                'Every SEO page should have a conversion goal',
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link href="/schedule-call">
                Audit My SEO Growth Potential
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 4. Our SEO Framework Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-0 text-xs font-bold uppercase tracking-wider inline-block">
              Our Organic Growth Framework
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              The MappedSkills SEO Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SEO_PILLARS.map((pillar, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white">
                <h3 className="mb-3 text-xl font-bold font-heading text-accent">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. What We Audit Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              What We Check in Your SEO Audit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SEO_AUDIT_CHECKS.map((check, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-white">
                <h3 className="mb-3 text-lg font-bold font-heading text-accent">
                  {check.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {check.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. SEO Services Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              SEO Services Built for Measurable Organic Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SEO_SERVICES.map((service, idx) => (
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

      {/* 7. Industry SEO Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              SEO Strategies for Different Business Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SEO_INDUSTRIES.map((industry, idx) => (
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

      {/* 8. SEO Timeline Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              What SEO Results Usually Look Like
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {SEO_TIMELINE.map((phase, idx) => (
              <Card key={idx} className="p-8 border border-border/50 bg-accent/5">
                <Badge className="mb-4 bg-accent text-white border-0 text-xs font-semibold">
                  {phase.period}
                </Badge>
                <h3 className="mb-3 text-lg font-bold font-heading text-foreground">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 sm:p-8 border border-border/50 text-center max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground">
              SEO timelines depend on competition, domain authority, website health, content quality, and implementation speed.
            </p>
          </div>
        </Container>
      </Section>

      {/* 9. Results Proof Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              SEO Should Be Measured by Growth, Not Guesswork
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {[
              {
                title: 'Real Estate Website',
                result: '10 to 150 keyword rankings',
                service: 'Technical SEO + Location Pages + Content Optimization',
                placeholder: true,
              },
              {
                title: 'E-commerce Brand',
                result: '5,000 to 50,000 monthly organic visitors',
                service: 'Category SEO + Product Optimization + Content Strategy',
                placeholder: true,
              },
              {
                title: 'B2B Service Business',
                result: 'Improved organic leads from high-intent service pages',
                service: 'Keyword Mapping + On-Page SEO + Blog Clusters',
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
              <Link href="/work">
                View Results
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 10. Reporting & Transparency Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              You Should Know What SEO Is Doing for Your Business
            </h2>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Organic Traffic', value: '+45%' },
                { label: 'Impressions', value: '18K' },
                { label: 'Clicks', value: '850' },
                { label: 'Keyword Rankings', value: '85' },
                { label: 'Top Landing Pages', value: '8' },
                { label: 'Form Submissions', value: '+120' },
                { label: 'Organic Leads', value: '+50' },
                { label: 'Conversion Rate', value: '6.2%' },
                { label: 'Pages Gaining Rank', value: '12' },
              ].map((metric, idx) => (
                <Card key={idx} className="p-4 sm:p-6 bg-accent/5 border border-border/50 text-center">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">{metric.label}</p>
                  <p className="text-2xl font-bold text-accent">{metric.value}</p>
                </Card>
              ))}
            </div>

            <div className="bg-accent/5 rounded-lg p-8 border border-border/50 text-center">
              <p className="text-foreground leading-relaxed">
                We do not report SEO with confusing charts. We show what improved, what dropped, what needs fixing, and which pages are generating business value.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 11. SEO Investment Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              SEO Pricing for Businesses
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground leading-relaxed">
              SEO pricing depends on website size, competition, number of target pages, technical issues, content requirements, and backlink needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {SEO_PRICING_TIERS.map((tier, idx) => (
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
            <p>SEO content creation, development work, and link-building budgets may be scoped separately depending on requirements.</p>
          </div>
        </Container>
      </Section>

      {/* 12. Testimonial Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              What Clients Say About Our SEO Work
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 sm:p-12 border border-border/50 bg-accent/5">
              <Badge className="mb-4 bg-foreground/10 text-muted-foreground border-0 text-xs">
                Placeholder Testimonial
              </Badge>
              <blockquote className="mb-6 text-lg text-foreground italic leading-relaxed">
                "MappedSkills helped us understand SEO as a growth system, not just keyword ranking. The team cleaned up our site structure and gave us a clear roadmap for organic leads."
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

      {/* 13. FAQ Section */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              SEO Services FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {SEO_FAQS.map((faq, idx) => (
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
              Growth Insights
            </Badge>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance">
              Latest SEO & Organic Growth Insights
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
              Ready to Build Organic Growth That Compounds?
            </h2>

            <p className="mb-4 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Get a free SEO audit and discover which keywords, pages, technical issues, and content gaps are blocking your organic growth.
            </p>

            <p className="mb-10 text-sm text-gray-400">
              No fake ranking promises. Just a practical review of your website, keywords, content, and technical SEO gaps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8" asChild>
                <Link href="/schedule-call">
                  Get Free SEO Audit
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
