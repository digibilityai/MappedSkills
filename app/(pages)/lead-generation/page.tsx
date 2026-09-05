import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Breadcrumb, CommercialSection, ChapterLabel, Display, Body, Note, ProofLink, Mark } from '@/components/commercial/primitives';
import { CommercialHero } from '@/components/commercial/CommercialHero';
import { ScopeList } from '@/components/commercial/ScopeList';
import { BoundaryBlock } from '@/components/commercial/BoundaryBlock';
import { QuestionList } from '@/components/commercial/QuestionList';
import { CommercialClose } from '@/components/commercial/CommercialClose';
import { ChainTerminus } from '@/components/commercial/ChainFigure';

/**
 * SESSION 28 — PHASE F — `/lead-generation`.
 *
 * ARCHETYPE 3, inheriting the commercial master with TWO STATED DEPARTURES that
 * must not be normalised away (32 §0):
 *
 *  1. MOVE 6 IS THE DIFFERENTIATOR — the published qualified-enquiry definition
 *     — and it appears BEFORE THE BOUNDARY, inverting the usual order, because
 *     on this page the definition IS the capability. The measurement content
 *     lives inside it ("checked automatically at the moment it arrives"), which
 *     is why there is no separate measurement section.
 *  2. Its F1 class is C — STATE, not B — PARTIAL.
 *
 *   confirm → bridge → problem → DEFINITION (F1 STATE) → boundary →
 *   objections → convert
 *
 * F1: C — STATE at the chain's terminus. Rendered as an enquiry becoming a
 * QUALIFIED enquiry on the same object, deliberately NOT as a standalone
 * four-box taxonomy: a classification diagram here is one step from the lead
 * grading the messaging system prohibits (22 §3, F-2).
 *
 * QUANTITY SAFETY IS THE WHOLE RISK ON THIS PAGE. There is no funnel, no count,
 * no cost per lead, no conversion rate, no volume promise, and no lead score,
 * grade or quality rating anywhere below — not in the copy, not on the figure,
 * not implied by a shape. The figure states WHEN an enquiry is checked and what
 * happens to what does not qualify; it never states how many of either there
 * are.
 *
 * TERMINOLOGY, per DEC-008: "lead" is permitted on this route in the title and
 * metadata because `lead generation agency` is the live Indian phrasing for
 * this intent. It is NOT used as MappedSkills' own outcome word in the body.
 * The outcome noun below is always *enquiry*.
 *
 * COPY: docs/09-content-pages/copy/lead-generation.md — COPY APPROVED, Gate 9,
 * DEC-014.
 *
 * WHAT THIS REPLACED: a 634-line page carrying "300%+", "₹100Cr+", a 40/20/8%
 * fabricated funnel and three invented pricing tiers. None of it migrates.
 */
export const metadata = createMetadata(
  'Lead Generation Where the Unit Is an Enquiry You Can Act On | MappedSkills',
  'Enquiries from real businesses, with a real need, worth picking up the phone about — with a published definition of what counts as one, and that definition is the number we report.',
  '/lead-generation'
);

/* Move 6 — the five conditions. Each is a CONDITION, checked automatically at
   the moment an enquiry arrives. None of them is a score, a weight or a grade,
   and the list is not ordered by importance. */
const CONDITIONS = [
  {
    lead: 'It is real.',
    body: <>It passes abuse screening rather than being a bot or a bulk submission.</>,
  },
  {
    lead: 'It is reachable.',
    body: <>There is a name, and an email address that can actually receive a reply.</>,
  },
  {
    lead: 'There is a business context.',
    body: (
      <>
        A company name, or a website, or a work email domain. Any one of the three is enough &mdash; because in
        this market a real business worth crores is frequently run from a Gmail address, and a rule that rejected
        those would be flattering our own numbers by discarding some of the businesses most worth having.
      </>
    ),
  },
  {
    lead: 'There is a stated need.',
    body: <>A message that says something, or a problem selected from the page they enquired on.</>,
  },
  {
    lead: 'It is not a duplicate.',
    body: <>Of an open enquiry from the same person.</>,
  },
];

const QUESTIONS = [
  {
    q: 'Lead gen agencies sell rubbish leads.',
    a: (
      <>
        Frequently true, and the mechanism is simple: when the contract is written on volume, volume is what
        arrives. The definition above is the alternative, and quality is reported next to volume rather than
        behind it.
      </>
    ),
  },
  {
    q: 'How many enquiries will we get?',
    a: (
      <>
        We do not know, and neither does anyone quoting you a number. What we can do is capture a starting point
        first, so that whatever happens next is measurable rather than arguable.
      </>
    ),
  },
  {
    q: 'What happens to quality as volume goes up?',
    a: (
      <>
        Usually it falls, unless the demand being added is as relevant as the demand already there. That is the
        reason the reporting separates qualified from total: if the gap widens, the acquisition work is reaching
        the wrong people and needs changing.
      </>
    ),
  },
];

export default function LeadGenerationPage() {
  return (
    <>
      <Breadcrumb label="Enquiry generation" path="/lead-generation" />

      {/* ---- MOVE 1 + 2 — confirm, bridge ---------------------------------- */}
      <CommercialHero
        eyebrow="Enquiry generation"
        title="Lead generation, where the unit is an enquiry you can actually act on."
        lede="This is what most businesses mean when they say they want more leads: enquiries from real businesses, with a real need, that are worth picking up the phone about."
        action="Tell us what you’re trying to fix"
      >
        <p>
          They are not something we buy in and forward to you. They come out of connected work &mdash; reaching
          the right buyers, making sure the enquiry can complete and arrive, and measuring where each one came
          from. So this page is about where your enquiries come from and which of them are worth your time,
          rather than how many we can send.
        </p>
      </CommercialHero>

      {/* ---- MOVE 3 — the buyer's actual problem --------------------------- */}
      <CommercialSection>
        <ChapterLabel>The situation this is usually bought to fix</ChapterLabel>
        <Display className="max-w-[22ch]">
          Two versions, and{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>they need different work.</span>
        </Display>
        <Body>
          <b className="font-bold">Not enough enquiries.</b> The demand exists somewhere and it is not arriving
          here.
        </Body>
        <Body>
          <b className="font-bold">Or enough enquiries and the wrong ones</b> &mdash; job applications, course
          questions, vendor pitches, students, and buyers looking for something you do not sell. That is not a
          volume problem, and adding traffic makes it worse.
        </Body>
        <Body>
          Telling those apart is the first useful thing anyone can do, and it takes measurement rather than
          opinion.
        </Body>
      </CommercialSection>

      {/* ---- MOVE 6 — THE DEFINITION. This is the page, and it comes BEFORE
             the boundary. F1 STATE sits here, at the chain's terminus. -------- */}
      <CommercialSection tone="paper">
        <ChapterLabel>What counts as a qualified enquiry here</ChapterLabel>
        <Display className="max-w-[22ch]">
          Checked automatically{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>at the moment it arrives.</span>
        </Display>
        <Body>An enquiry counts when all of the following are true.</Body>

        <ScopeList items={CONDITIONS} numbered />

        <ChainTerminus />

        {/* what the definition deliberately does not judge */}
        <div className="mt-[clamp(34px,4.2vw,64px)] grid grid-cols-1 gap-[clamp(26px,3.4vw,60px)] min-[900px]:grid-cols-2">
          <div className="border-t-2 pt-5" style={{ borderColor: 'var(--resolve-gap)' }}>
            <h3 className="m-0 flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em] text-resolve-dim">
              <Mark state="open" size={14} />
              What it deliberately does not judge
            </h3>
            <p className="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-resolve-dim">
              <b className="font-bold text-resolve-ink">Whether you should want the work.</b> Fit, value, timing
              and whether the person can decide &mdash; none of that can be established by a form, and a budget
              dropdown collects an unverified number that makes a report look precise and nothing else. That
              conversation happens with a person.
            </p>
            <p className="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-resolve-dim">
              <b className="font-bold text-resolve-ink">Whether we could tell where it came from.</b> An enquiry
              that arrives with no trail &mdash; direct, phone, a recommendation &mdash; is exactly as real as
              one that arrives on a tagged link. It counts, and we show it as unattributed rather than moving it
              out of the count to make the measurement look tidier.
            </p>
          </div>
          <div className="border-t-2 pt-5" style={{ borderColor: 'var(--resolve-gap)' }}>
            <h3 className="m-0 flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em] text-resolve-dim">
              <Mark state="open" size={14} />
              What does not count
            </h3>
            <p className="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-resolve-dim">
              Job and internship applications. Course, training and certification enquiries. Vendor and agency
              outreach, including backlink and guest-post requests. Student and academic requests. Requests for
              work we do not do.
            </p>
            <p className="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-resolve-dim">
              Those are <b className="font-bold text-resolve-ink">stored and readable &mdash; never silently
              deleted</b> &mdash; and they are reported separately, because the ratio between them and real
              enquiries is itself a signal about the traffic.
            </p>
          </div>
        </div>
      </CommercialSection>

      {/* ---- MOVE 5 — the boundary, after the definition -------------------- */}
      <CommercialSection>
        <BoundaryBlock
          label="What we will not promise"
          heading={
            <>
              We are accountable up to{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                the qualified enquiry.
              </em>
            </>
          }
          intro={
            <p className="m-0">
              What happens after &mdash; whether it is followed up, quoted well, and won &mdash; is yours.
            </p>
          }
          notPromised={[
            'a number of enquiries per month',
            'a cost per enquiry, or per lead',
            'a conversion rate',
            'a guaranteed quality standard for demand we do not control',
          ]}
        >
          <p>
            <b className="font-bold">We do not score enquiries.</b> A scoring model needs historical outcomes to
            calibrate against, and inventing weights would be precision with nothing underneath it.
          </p>
          <p>
            We do not buy, scrape or rent lists, and nothing here is outbound. This is capturing demand from
            people who are already looking. Cold outbound is a different business and not one we are in.
          </p>
        </BoundaryBlock>
        <ProofLink href="/how-it-works">The method, including what cannot be attributed</ProofLink>
      </CommercialSection>

      {/* ---- MOVE 8 — objections -------------------------------------------- */}
      <CommercialSection tone="paper">
        <ChapterLabel>The questions this page gets asked</ChapterLabel>
        <QuestionList items={QUESTIONS} />
        <Note>
          Related:{' '}
          <Link href="/problems/traffic-but-no-enquiries" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            if the traffic is arriving and the enquiries are not
          </Link>{' '}
          &middot;{' '}
          <Link href="/services" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the whole system
          </Link>{' '}
          &middot;{' '}
          <Link href="/seo" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            organic search
          </Link>{' '}
          &middot;{' '}
          <Link href="/google-ads" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            paid search
          </Link>
          .
        </Note>
      </CommercialSection>

      {/* ---- MOVE 9 — convert ----------------------------------------------- */}
      <CommercialClose
        label="Tell us what your enquiries look like now"
        heading="How many, and how many are worth quoting for."
        body={
          <>
            Roughly is fine. If you cannot separate the two today, say that &mdash; it is the most common answer
            and it is where the work usually starts.
          </>
        }
        action="Tell us what you’re trying to fix"
      />
    </>
  );
}
