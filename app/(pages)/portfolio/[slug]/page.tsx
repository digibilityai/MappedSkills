import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Card } from '@/components/ui/card';
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent';
import { createMetadata } from '@/lib/metadata';
import {
  getCaseStudyDetail,
  getCaseStudyStaticParams,
} from '@/lib/contentful/case-studies';

export const revalidate = 60;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCaseStudyStaticParams();
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyDetail(slug);

  if (!caseStudy) {
    return createMetadata('Case Study Not Found', 'Case study not found', `/portfolio/${slug}`);
  }

  return createMetadata(caseStudy.metaTitle, caseStudy.metaDescription, caseStudy.href);
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyDetail(slug);

  if (!caseStudy) {
    notFound();
  }

  const metaItems = [
    caseStudy.clientName ? { label: 'Client', value: caseStudy.clientName } : null,
    caseStudy.clientDate ? { label: 'Timeline', value: caseStudy.clientDate } : null,
    caseStudy.companySize ? { label: 'Company Size', value: caseStudy.companySize } : null,
    caseStudy.targetArea ? { label: 'Target Area', value: caseStudy.targetArea } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <>
      <Section className="border-b border-border py-3 sm:py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/work" className="hover:text-foreground">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">
              {caseStudy.industry || caseStudy.title}
            </span>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border">
        <Container>
          <div className="max-w-7xl">
            {caseStudy.industry ? (
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-accent/10 rounded-full">
                  <span className="text-sm font-medium text-accent">{caseStudy.industry}</span>
                </span>
              </div>
            ) : null}

            <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight mb-4">
              {caseStudy.title}
            </h1>

            {caseStudy.highlightResult ? (
              <p className="text-xl sm:text-2xl font-bold text-accent mb-8">
                {caseStudy.highlightResult}
              </p>
            ) : null}

            {metaItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {metaItems.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="font-semibold text-sm sm:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {caseStudy.audience ? (
              <div className="rounded-lg border border-border/60 bg-secondary/20 p-4 sm:p-5 mb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Target Audience
                </p>
                <p className="text-foreground leading-relaxed">{caseStudy.audience}</p>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <CaseStudyContent
        sections={caseStudy.sections}
        conclusionJson={caseStudy.conclusionJson}
      />

      {caseStudy.review ? (
        <Section className="border-y border-border bg-secondary/5">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-8">
                What the Client Says
              </h2>
              <Card className="p-8 sm:p-10 hover:translate-y-0">
                <div className="mb-6 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-2xl">
                      ★
                    </span>
                  ))}
                </div>
                {caseStudy.review.quote ? (
                  <p className="text-lg sm:text-xl text-foreground mb-6 leading-relaxed">
                    &ldquo;{caseStudy.review.quote}&rdquo;
                  </p>
                ) : null}
                <div className="border-t border-border pt-6">
                  <p className="font-semibold text-foreground">{caseStudy.review.name}</p>
                  {caseStudy.industry ? (
                    <p className="text-sm text-muted-foreground">{caseStudy.industry}</p>
                  ) : null}
                </div>
              </Card>
            </div>
          </Container>
        </Section>
      ) : null}

      <CTASection
        title="Want Similar Results for Your Business?"
        description="Book a free strategy call and let us audit your campaigns and identify growth opportunities."
        primaryCta={{
          text: 'Schedule Free Strategy Call',
          href: '/schedule-call',
        }}
        secondaryCta={{
          text: 'Explore Other Case Studies',
          href: '/work',
        }}
      />
    </>
  );
}
