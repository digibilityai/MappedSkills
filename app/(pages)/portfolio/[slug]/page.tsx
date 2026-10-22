import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Card } from '@/components/ui/card';
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent';
import { CaseStudyTemplate } from '@/components/case-study/CaseStudyTemplate';
import { CplusPage } from '@/components/cplus/CplusPage';
import { createMetadata } from '@/lib/metadata';
import { isCaseStudyProofWithheld } from '@/lib/case-study-proof';
import { getCaseStudyService } from '@/lib/case-study-services';
import { SERVICES } from '@/lib/services';
import {
  getCaseStudyDetail,
  getCaseStudyStaticParams,
  getNextCaseStudy,
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
    /**
     * SEO-006 (owner decision, 2026-09-20; extended to both dynamic route
     * families 2026-09-21). This branch is a GENUINE NOT-FOUND: the route
     * calls `notFound()` immediately below, so the response is HTTP 404 and
     * the visitor sees the recovery page.
     *
     * It previously returned `createMetadata(...)`, and `createMetadata` sets
     * `index: true` for every caller — so a 404 under `/portfolio/*` published
     * `index, follow` together with a canonical pointing at the missing URL,
     * inviting indexation of a page that does not exist. Both are wrong here,
     * so this branch no longer goes through `createMetadata`: it returns
     * `noindex` and asserts NO canonical.
     *
     * This decides nothing about the removal status of any particular URL —
     * that stays `URL TREATMENT — DECIDE DURING IMPLEMENTATION`. Published
     * case studies are untouched and remain indexable.
     */
    return {
      title: 'Case Study Not Found',
      description: 'Case study not found',
      robots: 'noindex, nofollow',
    };
  }

  return createMetadata(caseStudy.metaTitle, caseStudy.metaDescription, caseStudy.href);
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyDetail(slug);

  if (!caseStudy) {
    notFound();
  }

  /**
   * GATE R1 — proof withholding for the three permissioned case studies whose
   * published proof does not meet `DEC-012`. See `lib/case-study-proof.ts`.
   * Any case study not on that list renders exactly as before.
   */
  const proofWithheld = isCaseStudyProofWithheld(caseStudy.slug);

  /**
   * WORK-027 — the one approved related service for this study, or `null`.
   * Independent of `proofWithheld` above: this is a service relationship, not
   * evidence, so it neither depends on nor can reintroduce withheld proof.
   */
  const isNewLayout = caseStudy.layout === 'new' && Boolean(caseStudy.newLayout);
  const relatedService =
    isNewLayout && caseStudy.library.serviceKey ? SERVICES[caseStudy.library.serviceKey] : getCaseStudyService(caseStudy.slug);

  /**
   * Testimonial. The legacy template keeps its existing rule (a linked review, unless withheld). The new template is
   * stricter: the editor must tick `showTestimonial`, the linked review must carry a quote, and the study must not be
   * on the withholding list. A missing or empty review simply renders nothing. Stars are legacy-only (WORK-026).
   */
  const showTestimonial = isNewLayout
    ? Boolean(caseStudy.newLayout?.showTestimonial && caseStudy.review?.quote && !proofWithheld)
    : Boolean(caseStudy.review && !proofWithheld);

  /**
   * The new template (G7 design) is a complete page of its own: hero, the three sections, navigation back to `/work` and
   * on to the next study, and the close. The legacy template below is unchanged.
   */
  if (isNewLayout && caseStudy.newLayout) {
    return (
      <CplusPage>
        <CaseStudyTemplate
          study={caseStudy}
          content={caseStudy.newLayout}
          service={relatedService ? { title: relatedService.title, link: relatedService.link } : null}
          showTestimonial={showTestimonial}
          next={await getNextCaseStudy(caseStudy.slug)}
        />
      </CplusPage>
    );
  }

  /** Context row (legacy template, unchanged). */
  const metaItems = [
    caseStudy.clientName ? { label: 'Client', value: caseStudy.clientName } : null,
    caseStudy.clientDate ? { label: 'Timeline', value: caseStudy.clientDate } : null,
    caseStudy.companySize ? { label: 'Company Size', value: caseStudy.companySize } : null,
    caseStudy.targetArea ? { label: 'Target Area', value: caseStudy.targetArea } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;
  const audience = caseStudy.audience;

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

            {/* The headline figure is DERIVED from the first "Results &
                Metrics" entry or the first "Before & After" row, so it carries
                the same unevidenced numbers and is withheld with them. */}
            {caseStudy.highlightResult && !proofWithheld ? (
              <p className="text-xl sm:text-2xl font-bold text-accent mb-8">
                {caseStudy.highlightResult}
              </p>
            ) : null}

            {/* Context: the short facts in a row, Target Audience as a full-width row of the same grid. */}
            {metaItems.length > 0 || audience ? (
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 border-t border-border pt-6">
                {metaItems.map((item) => (
                  <div key={item.label} className="min-w-0">
                    <dt className="text-xs text-muted-foreground mb-1">{item.label}</dt>
                    <dd className="m-0 font-semibold text-sm sm:text-base break-words">{item.value}</dd>
                  </div>
                ))}
                {audience ? (
                  <div className="col-span-2 md:col-span-4 min-w-0">
                    <dt className="text-xs text-muted-foreground mb-1">Target Audience</dt>
                    <dd className="m-0 max-w-3xl text-sm sm:text-base text-foreground leading-relaxed break-words">
                      {audience}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>
        </Container>
      </Section>

      <CaseStudyContent
        sections={caseStudy.sections}
        conclusionJson={caseStudy.conclusionJson}
        withholdProof={proofWithheld}
      />

      {/*
        WORK-027 (owner, 2026-09-19) — ONE contextual related-service link,
        from the three-entry approved list in `lib/case-study-services.ts`.
        Same tab (WORK-005), because it is an internal route.

        This is a link, not proof: it states the service the engagement was,
        and renders no figure, result or claim about the outcome. It is
        therefore independent of the GATE R1 withholding above — a study whose
        proof is withheld still has an approved service relationship.

        A case study with no approved service renders nothing here; no filler
        service is substituted.
      */}
      {relatedService ? (
        <Section>
          <Container>
            <div className="max-w-7xl">
              <p className="text-base text-muted-foreground">
                This case study is part of our{' '}
                <Link
                  href={relatedService.link}
                  className="text-accent font-semibold underline decoration-2 underline-offset-4 hover:no-underline"
                >
                  {relatedService.title}
                </Link>{' '}
                work.
              </p>
            </div>
          </Container>
        </Section>
      ) : null}

      {/*
        WORK-013 / WORK-018 / WORK-022 and WORK-026. The testimonial block is
        withheld entirely for the three case studies above: client-level
        publication permission is not permission to publish a named
        individual's verbatim quote, and no written approval is evidenced.
        Nothing is left behind — no quote, no attribution and no empty
        testimonial framing.

        WORK-026 also applies to the stars below, which were rendered from
        `[...Array(5)]` whenever a review existed: there is no rating field, no
        rating source and no Review schema, so five stars asserted a rating
        nobody gave. They stay only for a case study that is NOT withholding
        proof, and they must not be reinstated for a withheld one without an
        attributable rating source.
      */}
      {showTestimonial ? (
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
                {caseStudy.review?.quote ? (
                  <p className="text-lg sm:text-xl text-foreground mb-6 leading-relaxed">
                    &ldquo;{caseStudy.review.quote}&rdquo;
                  </p>
                ) : null}
                <div className="border-t border-border pt-6">
                  <p className="font-semibold text-foreground">{caseStudy.review?.name}</p>
                  {caseStudy.industry ? (
                    <p className="text-sm text-muted-foreground">{caseStudy.industry}</p>
                  ) : null}
                </div>
              </Card>
            </div>
          </Container>
        </Section>
      ) : null}

      {/*
        SESSION 33 — PHASE I. Three blocked claims removed from one block:
        "Want Similar Results for Your Business?" implies published results this
        firm does not have; "Book a free strategy call" and "Schedule Free
        Strategy Call" offer a free entry offer that has not been approved; and
        "let us audit your campaigns" promises an undefined deliverable.
        "Explore Other Case Studies" is also wrong — `/work` states in its own
        first line that there are none.
      */}
      <CTASection
        title="Tell us what you are trying to fix."
        description="The enquiries you are getting, the ones you are not, and what you can currently see."
        primaryCta={{
          text: 'Tell us what you\u2019re trying to fix',
          href: '/contact',
        }}
        secondaryCta={{
          text: 'What we can and cannot show you',
          href: '/work',
        }}
      />
    </>
  );
}
