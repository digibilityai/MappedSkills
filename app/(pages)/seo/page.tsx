import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Breadcrumb, CommercialSection, ChapterLabel, Display, Body, Note, ProofLink } from '@/components/commercial/primitives';
import { CommercialHero } from '@/components/commercial/CommercialHero';
import { ScopeList } from '@/components/commercial/ScopeList';
import { BoundaryBlock } from '@/components/commercial/BoundaryBlock';
import { QuestionList } from '@/components/commercial/QuestionList';
import { CommercialClose } from '@/components/commercial/CommercialClose';
import { ChainDiscovery } from '@/components/commercial/ChainFigure';

/**
 * SESSION 28 — PHASE F — `/seo`.
 *
 * ARCHETYPE 3 — commercial / capability. This route IS the standard commercial
 * master (docs/16-ux/32_WIREFRAME_MASTER_COMMERCIAL.md, W2), and its frozen
 * sequence is:
 *
 *   confirm → bridge → problem → work → HORIZON BOUNDARY → measurement
 *   (F1 PARTIAL + limits + compressed evidence) → objections → convert
 *
 * THE SECOND MOVE THAT MAKES IT NOT A CLONE: the horizon. No other route on
 * this site leads with time, and the 12-month-plus statement sits ABOVE THE
 * MIDPOINT at full strength, stated as a horizon and never as a schedule — no
 * month is promised anywhere below.
 *
 * COPY: docs/09-content-pages/copy/seo.md — COPY APPROVED, Gate 9, DEC-014.
 *
 * F1: B — PARTIAL, discovery segment. Not the full figure shrunk; the rest of
 * the chain is recessive because it is not this page's subject.
 *
 * EVIDENCE IS COMPRESSED, NOT OMITTED (W2 §2, the scepticism driver): the
 * own-site measurement sits beside the claim it supports rather than being
 * promoted to a named section — that promotion is what `/ai-seo` does, for a
 * different reason.
 *
 * WHAT THIS REPLACED: a 612-line page carrying a "200%" traffic claim, a "45%"
 * figure and three invented pricing tiers. None of it is supported and none of
 * it migrates. NO SEARCH VOLUME, KEYWORD DIFFICULTY OR CPC FIGURE APPEARS
 * BELOW — the copy explains, in the boundary, exactly why.
 */
export const metadata = createMetadata(
  'SEO Judged on the Enquiries It Produces | B2B & Enterprise SEO | MappedSkills',
  'Technical foundations, structure and content aimed at searches that indicate someone wants to buy — then the page they land on, the enquiry they send, and the measurement that proves it happened.',
  '/seo'
);

const WORK = [
  {
    lead: 'Finding the demand worth capturing.',
    body: (
      <>
        Which searches indicate somebody wants what you sell, and which ones only look commercial &mdash; the
        ones that mostly return jobs, courses, definitions or competitors. Ranking for those produces sessions
        and no enquiries, and it is easy to do by accident.
      </>
    ),
  },
  {
    lead: 'Technical foundations.',
    body: (
      <>
        Crawlability, indexation, canonicalisation, site structure, internal linking, page speed, structured
        data, and a sitemap that reflects what actually exists. Unglamorous, and the reason a lot of good
        content never gets read by anything.
      </>
    ),
  },
  {
    lead: 'Content aimed at commercial and problem-led searches.',
    body: (
      <>
        Pages that answer the question the searcher arrived with &mdash; including the ones phrased as a problem
        rather than as a product.
      </>
    ),
  },
  {
    lead: 'The landing experience and the enquiry path.',
    body: <>What happens after the click is inside the scope, not somebody else&rsquo;s department.</>,
  },
  {
    lead: 'Migration and equity protection.',
    body: (
      <>
        Where a site is being rebuilt or restructured, protecting existing rankings and redirect chains is part
        of the discipline, not an afterthought.
      </>
    ),
  },
  {
    lead: 'Measurement.',
    body: <>Instrumented before anything is claimed, so the reporting has a starting point to be measured against.</>,
  },
];

const QUESTIONS = [
  {
    q: 'SEO agencies show us traffic and never leads.',
    a: (
      <>
        Often true, and it is usually structural: the search work stops at the ranking and the enquiry path
        belongs to someone else. Ours does not stop there, and the measurement is part of the work itself, not a
        monthly PDF.
      </>
    ),
  },
  {
    q: 'Can you guarantee rankings?',
    a: (
      <>
        No. Nobody controls the ranking system, the competitors, or the market. A guarantee in this category is
        either about terms nobody searches for, or it is not a guarantee.
      </>
    ),
  },
  {
    q: 'We tried SEO and nothing happened.',
    a: (
      <>
        Then the useful first question is which of four things went wrong &mdash; the demand, the page, the
        enquiry path, or the measurement. They need different fixes, and more search work is the right answer to
        only one of them.
      </>
    ),
  },
];

export default function SEOPage() {
  return (
    <>
      <Breadcrumb label="Search" path="/seo" />

      {/* ---- MOVE 1 + 2 — confirm the capability, bridge to the outcome ---- */}
      <CommercialHero
        eyebrow="Organic search"
        title="SEO that is judged on the enquiries it produces."
        lede="We do the organic search work: technical foundations, site structure, indexation, internal linking, and content built for the searches that actually indicate someone wants to buy."
        action="Tell us what you’re trying to fix"
      >
        <p>
          Then we keep going &mdash; through the page they land on, the enquiry they send, and the measurement
          that tells you it happened. Search is how we reach demand that already exists. It is not the whole job.
        </p>
      </CommercialHero>

      {/* ---- MOVE 3 — the buyer's actual problem --------------------------- */}
      <CommercialSection mode="split">
        <ChapterLabel>The situation this is usually bought to fix</ChapterLabel>
        <Display className="max-w-[22ch]">
          Being found is only useful if the visit turns into{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>something you can quote for.</span>
        </Display>
        <Body>
          Buyers are searching for what you sell and finding your competitors. Or you rank for a list of terms,
          the sessions arrive, and the enquiries do not follow. Or an agency reported both and neither changed
          anything you could see in the business.
        </Body>
        <Body>
          The second and third versions matter more than the first, because they are where most search budgets
          are actually lost.
        </Body>
        <ProofLink href="/problems/traffic-but-no-enquiries">
          If you have the traffic and not the enquiries, start here
        </ProofLink>
      </CommercialSection>

      {/* ---- MOVE 4 — what the work involves ------------------------------- */}
      <CommercialSection tone="paper" mode="wide">
        <ChapterLabel>What the work involves, month to month</ChapterLabel>
        <ScopeList items={WORK} />
      </CommercialSection>

      {/* ---- MOVE 5 — the boundary, above the midpoint: THE HORIZON -------- */}
      <CommercialSection>
        <BoundaryBlock
          label="How long this takes, and what we will not promise"
          heading={
            <>
              Organic search is a{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                12-month-plus engine.
              </em>
            </>
          }
          intro={
            <p className="m-0">
              That is our position and we state it before you commit, not after. Some technical problems produce
              visible change sooner, and some sites are far enough behind that the first six months are repair
              work. <b className="font-bold">If you need enquiries this quarter, paid search is the honest
              answer and we will say so.</b>
            </p>
          }
        >
          <p>
            We do not promise rankings or positions. We do not promise traffic figures. We do not quote search
            volume, keyword difficulty or cost-per-click numbers for your market &mdash; not because they are
            secret, but because no tool in this programme has ever produced one we would stand behind, and
            inventing them is how this category loses people&rsquo;s trust.
          </p>
          <p>
            We also do not sell technical fixes as a route into AI answers. Access matters and it is not
            sufficient &mdash; we measured that on our own site, and what we found is set out on the AI search
            page rather than sold from here.
          </p>
        </BoundaryBlock>
        <ProofLink href="/ai-seo">Where AI search genuinely fits</ProofLink>
      </CommercialSection>

      {/* ---- MOVE 6 — measurement, with F1 PARTIAL, limits adjacent and open,
             and MOVE 7's evidence compressed beside the claim it supports ---- */}
      <CommercialSection tone="paper" mode="wide">
        <ChapterLabel>How you will know whether it worked</ChapterLabel>
        <Body className="mt-[18px]">
          Before the work starts, we capture a starting point: what is arriving now, from where, and what happens
          to it. Without that, every later number is an assertion.
        </Body>
        <Body>
          After that, the report is enquiries &mdash; broken down by where they came from, what they landed on,
          and whether we could tell. Rankings and sessions appear as diagnostics, because they explain movement in
          the number that matters. They are not the result.
        </Body>

        <ChainDiscovery />

        {/* the measurement limit, ADJACENT and ALWAYS OPEN — I5 forbids making
            this collapsible at any width, and it is never a disclaimer below
            the CTA. */}
        <div className="mt-[clamp(24px,3vw,40px)] border-l-4 pl-[clamp(18px,2.2vw,30px)]" style={{ borderColor: 'var(--resolve-gap)' }}>
          <p className="m-0 max-w-[58ch] text-[1.02rem] leading-relaxed">
            Some enquiries arrive with no usable trail, and those are shown as{' '}
            <b className="font-bold">unattributed</b> rather than assigned to search to make the report look
            better.
          </p>
          {/* MOVE 7 — evidence, compressed into the claim rather than promoted
              to a named section (W2 §2, the scepticism driver). */}
          <Note className="mt-3">
            The measurement is not a claim we ask you to take on trust: we ran it on our own site first. Across
            28 unbranded runs on four AI systems, on one day, from Pune, in English, signed out, we appeared zero
            times &mdash; and our own pages were fully readable throughout. Counts, not rates; one day, not a
            trend.
          </Note>
        </div>
        <ProofLink href="/how-it-works">The method, including what cannot be attributed</ProofLink>
      </CommercialSection>

      {/* ---- MOVE 8 — objections, a compact section ------------------------ */}
      <CommercialSection mode="reverse">
        <ChapterLabel>The three questions we get asked here</ChapterLabel>
        <QuestionList items={QUESTIONS} />
        <ProofLink href="/problems/traffic-but-no-enquiries">Which of the four it is, and how to check</ProofLink>
        <p className="mt-6 text-[.94rem] text-resolve-dim">
          Above this page:{' '}
          <Link href="/services" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the whole system this sits inside
          </Link>
          .
        </p>
      </CommercialSection>

      {/* ---- MOVE 9 — convert --------------------------------------------- */}
      <CommercialClose
        label="Tell us what search is currently doing for you"
        heading="Start with what you can see today."
        body={
          <>
            The most useful first message is what you are seeing now: what you rank for, what arrives, and what
            does not turn into an enquiry. If you do not know, that is itself a finding and worth saying.
          </>
        }
        action="Tell us what you’re trying to fix"
      />
    </>
  );
}
