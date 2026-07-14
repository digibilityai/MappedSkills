import Link from 'next/link';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import { CheckCircle, ArrowRight } from 'lucide-react';

// Case study data - in production, this would come from a CMS or database
const CASE_STUDIES: Record<string, any> = {
  'real-estate-lead-generation': {
    title: 'Real Estate Lead Generation Campaign',
    industry: 'Real Estate',
    services: ['Google Ads', 'Meta Ads', 'Lead Generation', 'Landing Page Optimization'],
    location: 'Pune, Mumbai',
    duration: '6 months',
    logo: 'RE Logo',
    challenge: 'A real estate developer was struggling with lead volume and quality. They were receiving enquiries but many were not serious buyers. Ad spend was increasing but qualified leads were not.',
    problemPoints: [
      'Too many random enquiries, not enough serious property buyers',
      'No clear qualification process for leads',
      'Poor landing page messaging for different property types',
      'Limited tracking of lead source and quality',
      'High cost per enquiry with low conversion to site visits',
    ],
    strategyPoints: [
      'Restructured Google Ads campaigns by property type and buyer intent',
      'Created separate landing pages for each project with clear CTAs',
      'Built a WhatsApp lead flow for quick follow-up',
      'Implemented lead qualification questions to filter serious buyers',
      'Set up proper tracking for lead source and follow-up status',
      'Optimized targeting to specific locations and buyer demographics',
      'Created retargeting campaigns for property brochure viewers',
    ],
    beforeMetric: '15 qualified leads/month',
    afterMetric: '50 qualified leads/month',
    improvement: '3.3x increase in qualified leads',
    timeline: '6 months',
    impactPoints: [
      'Lead volume increased 3.3x while maintaining quality',
      'Cost per qualified lead decreased by 40%',
      'Site visit conversion improved from 20% to 45%',
      'Sales team received pre-qualified leads ready for follow-up',
    ],
    learnings: [
      'Lead qualification at the form level is crucial for real estate',
      'Separate landing pages by project significantly improve conversion',
      'WhatsApp follow-up reduces lead response time from 2 days to 2 hours',
      'Retargeting engaged audiences produces 3x better ROAS',
      'Tracking lead source helps identify which campaigns produce sales-ready prospects',
    ],
    testimonial: {
      quote: 'MappedSkills completely changed how we think about lead generation. We went from chasing quantity to focusing on quality. The WhatsApp integration helped our sales team follow up instantly.',
      author: 'Rahul Sharma',
      company: 'Premium Real Estate Dev',
      industry: 'Real Estate',
    },
  },
  'ecommerce-revenue-growth': {
    title: 'E-commerce Revenue Growth Campaign',
    industry: 'E-commerce',
    services: ['Social Media Ads', 'SEO', 'Conversion Optimization', 'Retargeting'],
    location: 'Pan-India',
    duration: '8 months',
    logo: 'EC Logo',
    challenge: 'An e-commerce brand was struggling with scaling revenue. They had decent traffic but poor conversion rates and no consistent retargeting strategy. Revenue was flat despite increasing ad spend.',
    problemPoints: [
      'High bounce rate on product pages',
      'Low average order value',
      'No product recommendation strategy',
      'Poor retargeting to cart abandoners',
      'Weak organic visibility for key products',
    ],
    strategyPoints: [
      'Optimized product pages for conversion with better descriptions and images',
      'Implemented personalized product recommendations',
      'Built segmented retargeting campaigns for abandoned carts',
      'Improved Meta Ads targeting by product category and customer segment',
      'Optimized SEO for high-intent product keywords',
      'Created bundle offers to increase AOV',
      'Added social proof and reviews to product pages',
    ],
    beforeMetric: '₹20L monthly revenue',
    afterMetric: '₹100L monthly revenue',
    improvement: '5x revenue growth',
    timeline: '8 months',
    impactPoints: [
      'Monthly revenue grew from ₹20L to ₹100L',
      'Conversion rate improved from 1.5% to 4.2%',
      'AOV increased by 65% through product bundles',
      'Organic revenue now accounts for 35% of total sales',
    ],
    learnings: [
      'Retargeting cart abandoners has the highest ROAS (8-12x)',
      'SEO traffic is slower but has higher customer lifetime value',
      'Product page optimization is as important as traffic volume',
      'Segmented retargeting by customer behavior outperforms broad campaigns',
      'Social proof significantly reduces purchase hesitation',
    ],
    testimonial: {
      quote: 'The growth was incredible. We went from wondering if our products were scalable to consistently hitting 5-digit daily revenue. MappedSkills showed us that our problem was not traffic, it was conversion.',
      author: 'Priya Gupta',
      company: 'Fashion E-commerce Brand',
      industry: 'E-commerce',
    },
  },
  'online-education-enrollments': {
    title: 'Online Education Enrollment Campaign',
    industry: 'Education',
    services: ['Google Ads', 'Lead Generation', 'Email Marketing', 'Landing Page Design'],
    location: 'Pan-India',
    duration: '5 months',
    logo: 'ED Logo',
    challenge: 'An online education platform was receiving course enquiries but struggling to convert them to paid enrollments. Most leads were not serious and dropped off without completing payment.',
    problemPoints: [
      'High drop-off between enquiry and enrollment',
      'No nurturing sequence for warm leads',
      'Generic landing page for all course types',
      'Poor targeting to serious students vs casual browsers',
      'No follow-up automation after form submission',
    ],
    strategyPoints: [
      'Created dedicated landing pages for each course type',
      'Implemented a lead scoring system to identify serious students',
      'Built automated email nurturing sequences with course demos',
      'Optimized Google Ads targeting for intent keywords like "learn Python" vs generic "courses"',
      'Added social proof with student testimonials and success stories',
      'Implemented WhatsApp follow-up for warm leads',
      'Created early-bird discount offers for quick conversions',
    ],
    beforeMetric: '100 course enrollments',
    afterMetric: '500 course enrollments',
    improvement: '5x increase in enrollments',
    timeline: '5 months',
    impactPoints: [
      'Course enrollments increased 5x within 5 months',
      'Lead-to-enrollment conversion improved from 8% to 22%',
      'Cost per enrollment decreased by 35%',
      'Student quality improved significantly with better targeting',
    ],
    learnings: [
      'Specific landing pages by course type increase conversions by 3-4x',
      'Lead scoring helps identify which leads to prioritize for follow-up',
      'Email nurturing is crucial for education - 40% of conversions happen after first email',
      'Student testimonials and success metrics drive credibility and conversions',
      'WhatsApp follow-up reduces enrollment drop-off significantly',
    ],
    testimonial: {
      quote: 'We were getting leads but could not convert them. MappedSkills helped us build a proper enrollment funnel that actually works. The combination of targeting, landing pages, and follow-up turned our inquiry volume into real revenue.',
      author: 'Amit Patel',
      company: 'Online Tech Academy',
      industry: 'Education',
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];
  if (!caseStudy) {
    return createMetadata('Case Study Not Found', 'Case study not found', `/results/${slug}`);
  }
  return createMetadata(
    `${caseStudy.title} | Case Study | MappedSkills`,
    `${caseStudy.title} - ${caseStudy.improvement} in ${caseStudy.duration}`,
    `/results/${slug}`
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) {
    return (
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
            <p className="text-muted-foreground mb-8">The case study you are looking for does not exist.</p>
            <Button asChild>
              <Link href="/results">Back to Results</Link>
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/results" className="hover:text-foreground">Results</Link>
            <span>/</span>
            <span className="text-foreground">{caseStudy.industry}</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section className="border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-accent/10 rounded-full">
                <span className="text-sm font-medium text-accent">{caseStudy.industry}</span>
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{caseStudy.title}</h1>
            <p className="text-2xl font-bold text-accent mb-8">{caseStudy.improvement}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="font-semibold">{caseStudy.duration}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Location</p>
                <p className="font-semibold">{caseStudy.location}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Services</p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.services.map((service: string) => (
                    <span key={service} className="inline-block px-2 py-1 bg-secondary/50 rounded text-sm font-medium">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 2: The Challenge */}
      <Section className="bg-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
            <p className="text-lg text-foreground mb-6">{caseStudy.challenge}</p>
            <div>
              <p className="font-semibold mb-4">Key Problems</p>
              <ul className="space-y-3">
                {caseStudy.problemPoints.map((point: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 3: Our Strategy */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Strategy</h2>
            <div className="space-y-4">
              {caseStudy.strategyPoints.map((point: string, idx: number) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 4: The Results */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">The Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">Before</p>
                <p className="text-2xl font-bold">{caseStudy.beforeMetric}</p>
              </Card>
              <Card className="p-8 text-center flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-accent" />
              </Card>
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">After</p>
                <p className="text-2xl font-bold text-accent">{caseStudy.afterMetric}</p>
              </Card>
            </div>
            <Card className="p-8 mb-8">
              <p className="text-xl font-bold text-center text-accent mb-6">{caseStudy.improvement}</p>
              <p className="text-center text-foreground">Timeline: {caseStudy.timeline}</p>
            </Card>
            <div>
              <p className="font-semibold mb-4">Business Impact</p>
              <ul className="space-y-3">
                {caseStudy.impactPoints.map((point: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold flex-shrink-0">✓</span>
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 5: Key Learnings */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Key Learnings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.learnings.map((learning: string, idx: number) => (
                <Card key={idx} className="p-6">
                  <p className="text-sm text-accent font-semibold mb-2">Learning {idx + 1}</p>
                  <p className="text-foreground">{learning}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 6: Client Testimonial */}
      <Section className="border-y border-border bg-secondary/5">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">What the Client Says</h2>
            <Card className="p-10">
              <div className="mb-6 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent text-2xl">★</span>
                ))}
              </div>
              <p className="text-xl text-foreground mb-6 leading-relaxed">"{caseStudy.testimonial.quote}"</p>
              <div className="border-t border-border pt-6">
                <p className="font-semibold text-foreground">{caseStudy.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{caseStudy.testimonial.company}</p>
                <p className="text-xs text-muted-foreground">{caseStudy.testimonial.industry}</p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Section 7: CTA */}
      <CTASection
        title="Want Similar Results for Your Business?"
        description="Book a free strategy call and let us audit your campaigns and identify growth opportunities."
        primaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Explore Other Results',
          href: '/results',
        }}
      />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}
