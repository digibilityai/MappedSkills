import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Breadcrumb, CommercialSection, ChapterLabel, Display, Body, Note } from '@/components/commercial/primitives';
import { CommercialHero } from '@/components/commercial/CommercialHero';
import { ScopeList } from '@/components/commercial/ScopeList';
import { BoundaryBlock } from '@/components/commercial/BoundaryBlock';
import { CommercialClose } from '@/components/commercial/CommercialClose';
import { ChainLossZones } from '@/components/commercial/ChainFigure';

/**
 * SESSION 28 — PHASE F — `/conversion-optimization`. THE DIAGNOSTIC-LED VARIANT.
 *
 * ARCHETYPE 3, diagnostic-led variant (docs/16-ux/38_WIREFRAME_VARIANT_CONVERSION_OPTIMIZATION.md).
 * Frozen sequence, and note where the figure sits — earlier than on any other
 * commercial page except `/ai-seo`'s:
 *
 *   confirm → bridge (on the loss) → ROUTES DOWN, PROMINENT →
 *   FOUR ZONES (F1 PARTIAL = F2-shallow), SECOND MOVE → work (compressed) →
 *   EXPERIMENTATION BOUNDARY → measurement → evidence → convert
 *
 * MOVE 8 IS ABSENT ON THIS PAGE. Objections are handled at sentence level
 * inside moves 3 and 5. Adding an objections section would normalise this page
 * toward the master and lose its arrangement.
 *
 * TWO BINDING CONSTRAINTS, both checked:
 *
 *  1. **"CRO" DOES NOT APPEAR IN THE BODY.** In India the acronym resolves to
 *     pharmaceutical Contract Research Organisations. It appears nowhere below
 *     — not in copy, a heading, the breadcrumb, a figure caption or a CTA. The
 *     category phrasing is confined to the metadata, which is where the
 *     residual query genuinely needs it.
 *  2. **THE SYMPTOM SENTENCE BELONGS TO THE PROBLEM PAGE, NOT HERE.** This page
 *     answers "who does this work, and how?" — it does not take "we have
 *     traffic and no enquiries and we do not know why", and it does not run the
 *     problem page's full diagnostic. Collapsing that boundary would make both
 *     pages unviable.
 *
 * F1: B — PARTIAL, the landing/enquiry segment, rendered as the shallow
 * four-zone variant. The partial run and the four-zone diagnostic are THE SAME
 * OBJECT at two depths, not two figures — a reader arriving from the problem
 * page must recognise it as the same drawing.
 *
 * BLOCKED LINK — RENDERS NOTHING. Move 7's own-diagnostic PROOF link is blocked
 * on a technical prerequisite (the own-site fixes shipping so the research
 * entry can publish). The approved copy is explicit: "Until then this section
 * stands with the finding stated and no link." The finding below therefore
 * stands, and the sentence closes up around the missing link — no placeholder,
 * no "coming soon".
 *
 * WHAT THIS REPLACED: a 651-line page carrying "150%", "98%", "3x", a 2%→5%
 * before/after comparison and three invented pricing tiers. Every one of those
 * is exactly the fabrication this page's own copy exists to argue against.
 * None of it migrates. NO conversion rate, uplift, benchmark, industry average
 * or before/after appears below.
 */
export const metadata = createMetadata(
  'Conversion Rate Optimization: Find Where Visits Are Lost | MappedSkills',
  'Conversion rate optimization services that start with diagnosis, because in at least two of the four places demand gets lost, changing the page is the wrong intervention.',
  '/conversion-optimization'
);

const WORK = [
  {
    lead: 'Diagnosis first.',
    body: (
      <>
        What the traffic actually is and what intent it arrived with. Whether the page answers that intent.
        Whether the enquiry path can physically complete &mdash; on a phone, on a slow connection, with a real
        submission that we confirm arrives. Whether anything is being recorded at all.
      </>
    ),
  },
  {
    lead: 'Then the fixes that follow from it.',
    body: (
      <>
        In the order the evidence supports. Message and offer where the page is not answering the visit. Form and
        booking friction where the path is losing people. Delivery and notification where enquiries are being
        sent and not received. Instrumentation where the loss is invisible.
      </>
    ),
  },
  {
    lead: 'Built, not just recommended.',
    body: (
      <>
        The enquiry path includes the form, the booking surface, what happens after submission, and the
        measurement. A recommendations deck that stops at the design is where most of this work fails.
      </>
    ),
  },
  {
    lead: 'Measured against a starting point captured first.',
    body: <>Without a baseline there is no before, and no honest way to describe an after.</>,
  },
];

export default function ConversionOptimizationPage() {
  return (
    <>
      <Breadcrumb label="The enquiry path" path="/conversion-optimization" />

      {/* ---- MOVE 1 — the opener, ON THE LOSS, not on the discipline ------- */}
      <CommercialHero
        eyebrow="The enquiry path"
        title="Turning visits into enquiries — after finding out where they are actually being lost."
        lede="Yes, this is the work you came looking for: finding why visits are not becoming enquiries, and fixing it. The reason the page starts with diagnosis rather than a list of tactics is that in at least two of the four places demand gets lost, changing the page is the wrong intervention — and doing it anyway is how a quarter gets spent with nothing to show."
        action="Tell us what you’re trying to fix"
      >
        <p>
          It is not a separate service here. It is the second half of one outcome, and the number we answer for
          is enquiries you can act on, not a conversion rate.
        </p>
      </CommercialHero>

      {/* ---- MOVE 2 — ROUTES DOWN, PROMINENTLY -----------------------------
             The honest destination for most of this page's traffic, and it is
             given genuine prominence rather than demoted to a footnote. */}
      <CommercialSection>
        <ChapterLabel>What this work is usually brought in to do</ChapterLabel>
        <Body className="mt-[18px]">
          A site receives visits and produces few enquiries, and somebody has been asked to improve the
          conversion rate. The brief is usually already a solution: redesign the page, shorten the form, move the
          button.
        </Body>
        <Body>
          Sometimes that is right.{' '}
          <b className="font-bold">Often the loss is somewhere else entirely, and the page was never the
          problem.</b>
        </Body>
        <Link
          href="/problems/traffic-but-no-enquiries"
          className="mt-[clamp(22px,2.8vw,36px)] grid grid-cols-1 items-baseline gap-x-6 gap-y-2 border-y-2 border-resolve-ink py-[clamp(18px,2.4vw,30px)] text-resolve-ink no-underline min-[900px]:grid-cols-[minmax(0,32ch)_1fr]"
        >
          <span className="font-heading text-[clamp(1.2rem,2.4vw,1.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            Working out which of the four it is
            <span aria-hidden="true" style={{ color: 'var(--resolve-accent-dark)' }}>
              {' '}
              &rarr;
            </span>
          </span>
          <span className="max-w-[52ch] text-[1rem] leading-relaxed text-resolve-dim">
            If you do not yet know where the loss is, that page is the honest place to start, and it costs
            nothing.
          </span>
        </Link>
      </CommercialSection>

      {/* ---- MOVE 3 — THE FIGURE, AS THE SECOND MOVE ------------------------ */}
      <CommercialSection tone="paper">
        <ChapterLabel>The four places demand gets lost</ChapterLabel>
        <Display className="max-w-[24ch]">
          Two of the four are{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>not the page.</span>
        </Display>
        <ChainLossZones />
      </CommercialSection>

      {/* ---- MOVE 4 — the work, compressed --------------------------------- */}
      <CommercialSection>
        <ChapterLabel>What the work involves</ChapterLabel>
        <ScopeList items={WORK} />
      </CommercialSection>

      {/* ---- MOVE 5 — the boundary: EXPERIMENTATION VALIDITY --------------- */}
      <CommercialSection tone="paper">
        <BoundaryBlock
          label="What we can test, and what we cannot"
          heading={
            <>
              Below a real threshold, a test{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                cannot reach significance.
              </em>
            </>
          }
          intro={
            <p className="m-0">
              Statistically valid A/B testing needs a volume of traffic and conversions most businesses in this
              market do not have. Running a test anyway produces a decision dressed as evidence.
            </p>
          }
        >
          <p>
            So there are two different activities and we name them differently.{' '}
            <b className="font-bold">Below the threshold:</b> research, diagnosis, a change, and an observation
            afterwards &mdash; described exactly that way, with no uplift figure attached.{' '}
            <b className="font-bold">Above the threshold:</b> a real test, with the significance reported.
          </p>
          <p>
            We do not publish conversion benchmarks, industry averages or typical uplifts. None exists in our
            evidence base and inventing one would be the same failure this page exists to correct.
          </p>
          <p>
            We also have no before-and-after of our own to show you. We have no analytics history yet, which
            means we cannot present a pre/post comparison &mdash; and saying so is more useful to you than a
            chart nobody can audit.
          </p>
        </BoundaryBlock>
      </CommercialSection>

      {/* ---- MOVE 7 — evidence, beside the claim it supports ----------------
             The own-diagnostic link is blocked on a technical prerequisite and
             renders nothing. The finding stands without it. */}
      <CommercialSection>
        <ChapterLabel>We ran this on ourselves first</ChapterLabel>
        <Display className="max-w-[24ch]">
          Our own contact form transmitted nothing, while{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>showing visitors a success message.</span>
        </Display>
        <Body>
          We ran this diagnostic on our own site before offering it to anyone. Every enquiry that form received
          was lost, and no analytics existed to make that visible.
        </Body>
        <Body>
          It is the reason the order of work on this page starts where it does. Nothing about that failure would
          have been found by looking at the design, the copy or the traffic &mdash; and no amount of page
          improvement would have fixed it.
        </Body>
        <Note>
          Related:{' '}
          <Link href="/services" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the whole system this sits inside
          </Link>{' '}
          &middot;{' '}
          <Link href="/how-it-works" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the method, including what cannot be attributed
          </Link>
          .
        </Note>
      </CommercialSection>

      {/* ---- MOVE 9 — convert ----------------------------------------------- */}
      <CommercialClose
        label="Start with what you can currently see"
        heading="What arrives, what converts, what you can measure."
        body={
          <>
            If the honest answer is that you are not sure anything is being recorded, that is the most common
            starting point and the fastest thing to establish.
          </>
        }
        action="Tell us what you’re trying to fix"
      />
    </>
  );
}
