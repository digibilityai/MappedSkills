import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Breadcrumb, CommercialSection, ChapterLabel, Display, Body, Note } from '@/components/commercial/primitives';
import { CommercialHero } from '@/components/commercial/CommercialHero';
import { ScopeList } from '@/components/commercial/ScopeList';
import { BoundaryBlock } from '@/components/commercial/BoundaryBlock';
import { QuestionList } from '@/components/commercial/QuestionList';
import { CommercialClose } from '@/components/commercial/CommercialClose';
import { AiLayers, CrawlerTable } from '@/components/commercial/AiLayers';

/**
 * SESSION 28 — PHASE F — `/ai-seo`. A NEW ROUTE.
 *
 * SCOPE AUTHORITY FOR CREATING IT: docs/27-production-translation/
 * 06_IMPLEMENTATION_SEQUENCE.md, Phase F scope — "**new `/ai-seo`**". Gate 9
 * approved the copy in Session 11; Phase A recorded the missing route as a
 * finding rather than fixing it, and Phase B repeated the record. This is the
 * phase the approved plan places it in.
 *
 * ARCHETYPE 3, high-scepticism variant (docs/16-ux/37_WIREFRAME_VARIANT_AI_SEO.md).
 * The frozen sequence, and the one thing about this page most likely to be
 * "corrected" later by someone who has not read the ruling:
 *
 *   confirm → bridge → problem → work → EVIDENCE SECTION (F3) →
 *   STRONG BOUNDARY → measurement → OBJECTIONS SECTION → convert
 *
 * EVIDENCE COMES BEFORE THE BOUNDARY. That order is frozen by orchestrator
 * ruling A (05_COMMERCIAL_PAGE_UX.md §4.2 controls; the contradicting row in
 * 23 §3 was corrected rather than this page). The boundary is stated against a
 * reader who has ALREADY seen the four layers kept separate — that is what
 * makes it an argument instead of a caveat.
 *
 * F1: D — NONE. F3, the four layers, is this page's figure and carries full
 * weight; adding the run would be a second full-weight figure and would be
 * applying F1 for consistency, which the taxonomy prohibits. THE RUN DOES NOT
 * APPEAR ANYWHERE ON THIS PAGE.
 *
 * POSITIONING GUARDS, all checked against docs/08-messaging/AI_SEARCH_LANGUAGE.md:
 * MappedSkills is NOT positioned as a GEO, AEO or LLMO agency, and none of
 * those acronyms appears anywhere below — not in the copy, not in a heading,
 * not in the metadata. No AI visibility ranking, score, guarantee of inclusion,
 * "rank in ChatGPT" or crawler-control promise appears. No claim of any kind is
 * made about Claude or Grok beyond "not testable". The removed vendor
 * AI-referral-share statistic is NOT reintroduced, in any form.
 *
 * BLOCKED SLOT — RENDERS NOTHING. The approved copy's move 8 carries four
 * objections. The second of them rests entirely on a quotation of Google's
 * published position that copy/ai-seo.md flags `[VALIDATION REQUIRED]` and
 * states "must not be treated as publication-ready evidence until it is
 * re-verified" (Project Rule 19). It is not re-verified, so that objection
 * RENDERS NOTHING — no placeholder, no paraphrase, no "coming soon". The
 * heading below says "the questions" rather than "the four questions"
 * accordingly. Recorded in 16_PHASE_F_COMMERCIAL_ROUTES.md, not fixed here.
 */
export const metadata = createMetadata(
  'AI Search: Why Your Business Is Not in the Answer | MappedSkills',
  'AI answers are assembled largely from sources outside your website, and being readable is not the same as being chosen. We measure it per system, publish the run counts, and do not sell a score.',
  '/ai-seo'
);

const WORK = [
  {
    lead: 'Check access first, then stop treating it as the answer.',
    body: (
      <>
        Whether the retrieval crawlers can reach and read your pages. It takes an afternoon, its absence would be
        fatal, and its presence proves nothing.
      </>
    ),
  },
  {
    lead: 'Entity accuracy.',
    body: (
      <>
        Whether the basic facts about your business &mdash; name, what you do, where you are, how to reach you
        &mdash; are stated consistently on your own site, in your structured data, and everywhere else that
        describes you. Branded answers are assembled from those sources, and inconsistency is what produces two
        systems describing the same company two different ways.
      </>
    ),
  },
  {
    lead: 'Source authority, which is mostly off your site.',
    body: (
      <>
        The lists, directories, review platforms and third-party pages those answers are actually built from.
        This is the substantial part of the work and it is not publishing.
      </>
    ),
  },
  {
    lead: 'Citable pages on your own site.',
    body: <>Content that answers a question precisely enough to be quoted, with the claims sourced and dated.</>,
  },
  {
    lead: 'Measurement, per system.',
    body: (
      <>
        Repeated prompts, recorded per system, with the run counts, the date, the location, the language and
        whether the session was signed in &mdash; because all of those change the answer.
      </>
    ),
  },
];

const QUESTIONS = [
  {
    q: 'Everyone sells this now — what makes you different?',
    a: (
      <>
        In the same 28 unbranded runs, two agencies in this city that sell exactly that did not appear either.
        That is one signed-out sample on one day and not a verdict on them, but it does suggest that selling the
        terminology is not the same as having the mechanism. What we offer instead is the diagnosis &mdash;
        absent from the answers, because those answers are built from sources you are not on &mdash; and the work
        that follows from it.
      </>
    ),
  },
  {
    q: 'Ahrefs and Semrush give me a checker for free.',
    a: (
      <>
        True, and they are good tools. They report the absence accurately. What they do not do is tell you which
        sources the answer was built from, or do the off-site work that changes it. That difference is where the
        work is &mdash; and it is worth being clear that the reporting part is available to you for nothing.
      </>
    ),
  },
  {
    q: 'Can you get us into ChatGPT?',
    a: (
      <>
        No, and anyone who says otherwise is selling you a guarantee they cannot honour. What we can do is fix
        the entity information, work on the sources those answers are assembled from, measure whether anything
        changes, and tell you honestly when it has not.
      </>
    ),
  },
];

export default function AiSeoPage() {
  return (
    <>
      <Breadcrumb label="AI search" path="/ai-seo" />

      {/* ---- MOVE 1 + 2 — confirm, bridge ---------------------------------- */}
      <CommercialHero
        eyebrow="AI search"
        title="AI search: why your business is not in the answer, and what actually moves it."
        lede="Yes, we work on whether a business shows up when someone asks an AI assistant for a supplier like you. It is a real question with a mostly unglamorous answer: those answers are assembled largely from sources that sit outside your website, and being readable by the systems is not the same as being chosen by them."
        action="Tell us what you’re trying to fix"
      >
        <p>We measure it per system, we publish the run counts, and we do not sell a score.</p>
      </CommercialHero>

      {/* ---- MOVE 3 — the buyer's problem, and the misinformation named ---- */}
      <CommercialSection mode="split">
        <ChapterLabel>The situation this is usually bought to fix</ChapterLabel>
        <Body className="mt-[18px]">
          Someone typed the company name into ChatGPT and found nothing useful. Or asked it to recommend a
          supplier of what you sell and got a list you were not on. Or a free tool reported that you are absent
          from AI answers, without saying why or what to do about it.
        </Body>
        <Body>
          That is a reasonable thing to be concerned about, and it is worth sizing before spending anything on
          it. Discovery through AI assistants is real and it is growing. It is also, on everything we have seen,
          still much smaller than ordinary search.
        </Body>
        <div className="mt-[clamp(20px,2.4vw,32px)] border-l-4 pl-[clamp(18px,2.2vw,30px)]" style={{ borderColor: 'var(--resolve-gap)' }}>
          <p className="m-0 max-w-[58ch] text-[1.02rem] leading-relaxed">
            <b className="font-bold">We will not put a share figure on it.</b> The published numbers come from
            vendor panels nobody outside those vendors can audit, and a number we cannot stand behind is worse
            than no number at all. If your enquiries have to improve this quarter, this is not the work that does
            it.
          </p>
        </div>
      </CommercialSection>

      {/* ---- MOVE 4 — what the work involves, at full weight --------------- */}
      <CommercialSection tone="paper" mode="wide">
        <ChapterLabel>What the work involves</ChapterLabel>
        <ScopeList items={WORK} />
        <CrawlerTable />
      </CommercialSection>

      {/* ---- MOVE 7 — EVIDENCE, AS A NAMED SECTION, BEFORE THE BOUNDARY ----
             Ruling A: 05 §4.2 controls this order. The figure is early because
             the ARGUMENT needs it; the credibility effect is a by-product. */}
      <CommercialSection mode="wide">
        <ChapterLabel>We measured ourselves first, and published the result</ChapterLabel>
        <Display className="max-w-[18ch]">
          Across 28 unbranded runs,{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>we appeared zero times.</span>
        </Display>
        <Body>
          On four systems, on one day, from Pune, in English, signed out. In 8 branded runs &mdash; where the
          systems were given our name &mdash; 7 described us substantially accurately.
        </Body>
        <Body>
          Directory and listing sources appeared in 15 of those 28 unbranded runs. In one of them, ChatGPT stated
          in plain text that it had chosen the brands it named by reading two directories. We are listed on
          neither.
        </Body>
        <Body>
          Our own site is fully readable by the retrieval crawlers, our <code>robots.txt</code> blocks none of
          them, and the result was still zero.{' '}
          <b className="font-bold">
            Access is necessary and it is not sufficient &mdash; including for us, which is the part of this most
            often sold the other way round.
          </b>
        </Body>

        <AiLayers />

        {/*
          SESSION 33 — PHASE I. A `ProofLink` to `/research/ai-visibility-baseline`
          was here. THAT ROUTE HAS NEVER EXISTED — verified by crawling the built
          site, where it returned 404 — and `PAGE_COPY_INDEX.md` records both
          research entries as NOT DRAFTED. `/how-it-works` already reached the
          same conclusion in its own words: "link to both /research entries;
          neither route exists, so no link".

          THE MEASUREMENT ABOVE IS UNCHANGED, and it stands on its own: the run
          count, the date, the location, the signed-out condition and the
          explicit absence of a confidence interval are all stated inline. What
          is removed is a promise of a document that does not exist, not a claim.

          OWNER ACTION: when the research page is written and published, restore
          this link and the two on the homepage together.
        */}
      </CommercialSection>

      {/* ---- MOVE 5 — the boundary, at full strength, AFTER the evidence --- */}
      <CommercialSection tone="paper">
        <BoundaryBlock
          label="What we will not tell you about AI search"
          heading={
            <>
              There is no AI visibility score here, and{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                there will not be one.
              </em>
            </>
          }
          intro={
            <p className="m-0">
              We measured the same prompts repeatedly across systems: membership was often stable inside one
              system, and the order changed in every repeated prompt. A single blended number across systems
              destroys the only stable signal there is, and it would be precision we did not earn.
            </p>
          }
          notPromised={[
            'appearance in any system',
            'a mention, a citation or a recommendation',
            'a position — there is no ranking to be had',
            'an improvement, a decline or a percentage change',
          ]}
          closing="Nobody can promise those, and the mechanism is largely outside anyone’s site."
        >
          <p>
            There is no &ldquo;rank in ChatGPT&rdquo;. There is no ranking to be had.
          </p>
          <p>
            We have one measurement round, on one day. One measurement is not a trend, so we will not describe an
            improvement, a decline or a percentage change.
          </p>
          <p>
            Two of the systems we wanted to test &mdash; Claude and Grok &mdash;{' '}
            <b className="font-bold">could not be tested at all.</b> We hold no baseline for either, so we make
            no claim about either.
          </p>
        </BoundaryBlock>
      </CommercialSection>

      {/* ---- MOVE 6 — measurement, with its limits adjacent and open ------- */}
      <CommercialSection mode="split">
        <ChapterLabel>What we measure, and what we report</ChapterLabel>
        <Body className="mt-[18px]">
          A set of prompts a real buyer would use, run repeatedly, per system, on a stated date, from a stated
          location, in a stated language, signed out unless there is a reason not to be. We record whether you
          appeared, in what form, and which sources the answer was built from.
        </Body>
        <Body>
          You get frequency across runs, per system, never blended &mdash; and the sources, which are usually the
          actionable part.
        </Body>
        <div className="mt-[clamp(20px,2.4vw,32px)] border-l-4 pl-[clamp(18px,2.2vw,30px)]" style={{ borderColor: 'var(--resolve-gap)' }}>
          <p className="m-0 max-w-[58ch] text-[1.02rem] leading-relaxed">
            What we cannot give you is <b className="font-bold">a position, a score, or a comparison across
            systems that means anything.</b>
          </p>
          <Note className="mt-3">
            One round, one day, one location, English, signed out. Two of the systems named above were not
            testable at all, and they are reported as untested rather than characterised.
          </Note>
        </div>
      </CommercialSection>

      {/* ---- MOVE 8 — objections, as a named section ------------------------
             One of the approved objections renders nothing — see the file
             header. Nothing stands in its place. */}
      <CommercialSection tone="paper" mode="reverse">
        <ChapterLabel>The questions we get asked here</ChapterLabel>
        <QuestionList items={QUESTIONS} />
        <p className="mt-6 text-[.94rem] text-resolve-dim">
          Across from this page:{' '}
          <Link href="/seo" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the organic search work
          </Link>
          . Above it:{' '}
          <Link href="/services" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the whole system
          </Link>
          .
        </p>
      </CommercialSection>

      {/* ---- MOVE 2 restated, and MOVE 9 — convert ------------------------- */}
      <CommercialClose
        label="Where this sits in the rest of the work"
        heading="One discovery surface, and today a small one."
        body={
          <>
            It sits inside the same outcome as everything else we do: enquiries you can act on, measured. If a
            business is not being found in ordinary search either, this is not where we would start, and we will
            say so.
          </>
        }
        action="Tell us what you’re trying to fix"
      />
    </>
  );
}
