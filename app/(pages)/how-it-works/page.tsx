import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Body, Note } from '@/components/commercial/primitives';
import { RouteHero, StageSystem, StatedList, FindingList } from '@/components/routes/primitives';
import { BoundaryBlock } from '@/components/commercial/BoundaryBlock';
import { CommercialClose } from '@/components/commercial/CommercialClose';
import { MethodChain, MethodChainState } from '@/components/routes/MethodChain';

/**
 * SESSION 29 — PHASE G — `/how-it-works`. ARCHETYPE 5 — methodology / proof.
 *
 * THE BLOCKED SECTION, STATED FIRST BECAUSE IT GOVERNS THE PAGE.
 *
 * §2 — "How an engagement actually runs", the real delivery stages — is
 * OWNER-BLOCKED and UNDRAWN, and `06_IMPLEMENTATION_SEQUENCE.md` Phase G names
 * this route in its scope line with the parenthetical "(§2 RENDERS NOTHING)".
 * IT RENDERS NOTHING BELOW: no heading, no container, no placeholder, no
 * silhouette, no "coming soon", no numbered outline.
 *
 * The approved copy records the reason and it is not a formality:
 * `copy/how-it-works.md` §2 carries a six-word stage outline — diagnose,
 * instrument, capture demand, convert demand, measure and report, extend — and
 * states in terms that "THAT OUTLINE IS THE ARCHITECTURE, NOT A DESCRIPTION OF
 * WHAT HAPPENS. It is not copy, and it must not be published as though it
 * were." A Step 1 / Step 2 / Step 3 built from it would be fabricated proof on
 * the one page that exists to disprove fabricated proof — the exact failure the
 * page argues against, committed by the page itself.
 *
 * §9 — "What happens when you enquire" — is blocked on the same class of owner
 * input (who owns enquiry response, the sequence, the hours) plus an EVIDENCE
 * REQUIRED item: no response-time distribution has ever been measured. IT ALSO
 * RENDERS NOTHING. Publishing an unmeasured response promise would demonstrate
 * the exact failure this business sells the fix for.
 *
 * WHAT REMAINS IS NOT A REMNANT. Sections 1, 3, 4, 5, 6, 7, 8, 10 and 11 are
 * drafted, judgeable and unblocked, and `03_PAGE_ARCHETYPES.md` §4.3 records
 * that they "carry its proof value". The page's argument — here is what is
 * measured, here is what cannot be, and here is where a person decides — stands
 * without the stages. A shorter truthful page beats a complete fictional one.
 *
 * F1: A — FULL (§3) + C — STATE as F4 (§5), on the same object
 * (`22_F1_USAGE_TAXONOMY.md` §3). This is one of only three routes on the site
 * carrying the full figure.
 *
 * MOTION: none. No sticky CTA anywhere on this page — the approved copy says so
 * explicitly, and the Resolve budget is 0 sticky site-wide in any case.
 *
 * WHAT THIS REPLACED: a 733-line page carrying "300%+", "₹100Cr+", ROAS in six
 * places, ₹50,000/₹500,000 figures and three guarantee statements. None of it
 * migrates.
 */
export const metadata = createMetadata(
  'How We Work, What We Measure, and What We Cannot Tell You | MappedSkills',
  'The published method: what is measured at each point on the chain, what cannot be attributed and why, and where a person decides rather than a process. Written to be checked.',
  '/how-it-works'
);

/* §3 — the six measured points, in the approved order, as prose beside the
   figure. The figure replaces the structure; the list carries what each point
   actually is, which the figure deliberately does not attempt to fit. */
/* PHASE J STAGE 4 — the three-stage grouping of the six points this page
   already measures. Every string below is either one of the site's three
   published stage names or one of `MethodChain`'s own point labels; the
   grouping is the one the approved /services figure already states. Nothing
   here describes what happens inside a stage — §2 remains owner-blocked. */
const STAGES = [
  { name: 'Capture', points: [<>Discovery and source</>] },
  {
    name: 'Convert',
    points: [<>Landing</>, <>Interaction</>, <>The enquiry</>],
  },
  {
    name: 'Measure',
    points: [<>The qualified enquiry</>, <>Opportunity and revenue</>],
    boundaryAfter: 0,
    beyondNote: 'Your numbers, from your system.',
  },
];

const MEASURED = [
  {
    term: <>Discovery and source</>,
    body: <>How someone first found the business, where that is knowable.</>,
  },
  { term: <>Landing</>, body: <>What they arrived on, and from what.</> },
  {
    term: <>Interaction</>,
    body: <>What they did before enquiring, at the level of pages and actions rather than surveillance.</>,
  },
  {
    term: <>The enquiry</>,
    body: <>Recorded at the moment it is made, carrying its own source, rather than reconstructed later.</>,
  },
  {
    term: <>The qualified enquiry</>,
    body: (
      <>
        Whether it is real, reachable, from a business context, with a stated need, and not a duplicate. This
        is the accountable number.
      </>
    ),
  },
  {
    term: <>Opportunity and revenue</>,
    body: (
      <>
        Only where the client supplies their own close data, reported as the client&rsquo;s numbers from the
        client&rsquo;s system.
      </>
    ),
  },
];

/* §6 — five places a person decides. Named rather than hidden behind process
   language, which is the section's whole point. */
const JUDGEMENT = [
  <>
    <strong className="font-bold text-resolve-ink">Which demand is worth capturing.</strong> Much of what looks
    like demand in this market is students, job-seekers and competitors.
  </>,
  <>
    <strong className="font-bold text-resolve-ink">Which of four failures a symptom indicates</strong>, when the
    evidence is partial.
  </>,
  <>
    <strong className="font-bold text-resolve-ink">Whether an enquiry is a real fit.</strong> The website can
    check that an enquiry is real, reachable and in context. It cannot judge what an opportunity is worth to
    you, and no form can. That is a conversation.
  </>,
  <>
    <strong className="font-bold text-resolve-ink">What a partial measurement means</strong>, and what it does
    not license us to say.
  </>,
  <>
    <strong className="font-bold text-resolve-ink">When to tell a client a channel is wrong</strong> for their
    business, including when we would be paid to run it.
  </>,
];

/* §8 — stated as a requirement rather than a request, because the work does not
   function without it. */
const CLIENT_PROVIDES = [
  <>
    <strong className="font-bold text-resolve-ink">Access.</strong> Analytics, search console, ad accounts, the
    site itself, and the systems where enquiries land.
  </>,
  <>
    <strong className="font-bold text-resolve-ink">Decisions, at a reasonable pace.</strong> Work that waits
    three weeks for an approval loses more than it looks like it does.
  </>,
  <>
    <strong className="font-bold text-resolve-ink">Product knowledge.</strong> What you sell, who buys it, what
    they ask before they buy, and what a good customer looks like. Nobody outside your business has that.
  </>,
  <>
    <strong className="font-bold text-resolve-ink">Capacity to follow up.</strong> An enquiry that is not
    answered is not a result, and it is the one part of the chain we do not control.
  </>,
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Top-level route: no breadcrumb (P12 applies to capability routes). */}
      <RouteHero
        eyebrow="The published method"
        title={<>How we work, what we measure, and what we cannot tell you.</>}
        lede={
          <>
            This page exists to be checked. It sets out how the work is done, what is measured at each point,
            what a measurement can and cannot support, and where the judgement calls are.
          </>
        } mode="offset">
        <p>
          The section on what cannot be attributed is not a disclaimer at the bottom &mdash; it is a third of
          the reason this page is here.
        </p>
      </RouteHero>

      {/* ------------------------------------------------------------- §1 */}
      <CommercialSection tone="paper" mode="split">
        <ChapterLabel>Why these disciplines are one chain</ChapterLabel>
        <Display>Two observations sit underneath everything below.</Display>
        <Body>
          The first: when a business is absent from AI answers, the reason is usually that those answers are
          assembled from directories, listings and third-party pages the business is not on. We measured that
          on ourselves &mdash; across 28 unbranded runs on four systems in one day, we appeared zero times,
          while directory sources appeared in 15 of them. The fix is mostly not on the website.
        </Body>
        <Body>
          The second: traffic that does not become enquiries is one of four failures &mdash; the demand, the
          page, the enquiry path, or the measurement &mdash; and the same symptom appears in all four.
          Measurement is what tells you which one you have.
        </Body>
        <Body>
          Both point the same way. The work at the top of the chain and the work at the bottom of it are
          connected, and the joins between them are where a result quietly disappears. That is an argument for
          the joins belonging to somebody.
        </Body>
        <Note>
          It is not an argument that every engagement contains all of them. What a given piece of work covers
          is decided per client.
        </Note>
      </CommercialSection>

      {/*
        §2 — THE STAGES — OWNER-BLOCKED, AND IT RENDERS NOTHING.

        There is deliberately no element here. Not an empty section, not a
        heading with nothing under it, not a bordered container, not a
        placeholder, not "coming soon", and not the six-word stage outline from
        the brief, which the approved copy states is architecture and must not
        be published as though it were a description of what happens.

        Supplying the owner input later is a CONTENT change at this position,
        not a redesign (26_OWNER_BLOCKED_STRUCTURE_RULE.md §5) — §1 above and §3
        below already read as consecutive chapters, and there is no gap, marker
        or seam where this section would sit.
      */}

      {/* ------------------------------------------------------------- §3 */}
      <CommercialSection mode="wide">
        <ChapterLabel>What we measure</ChapterLabel>
        <Display>Six points on one chain.</Display>

        {/* PHASE J STAGE 4. The same six points, grouped under the three stages
            the site already publishes, so the shape of the method is readable
            before the detailed chain is read. Static, no JavaScript, and the
            three stages are drawn at equal width because the number of measured
            points in a stage is not a quantity of anything. */}
        <StageSystem
          stages={STAGES}
          caption={
            <>
              The same six points, grouped.{' '}
              <b className="font-bold text-resolve-ink">
                No stage is drawn larger than another, and nothing here is a count, a duration or a rate.
              </b>
            </>
          }
        />

        <MethodChain />

        <FindingList items={MEASURED} />

        <Note>
          Every one of those is reported against a starting point captured before the work begins. Where no
          starting point was captured, there is no before, and we say so rather than manufacturing one.
        </Note>
      </CommercialSection>

      {/* ------------------------------------------------------------- §4 */}
      <CommercialSection tone="paper">
        <BoundaryBlock
          label="What we do not measure, and cannot"
          heading={<>Six things this method does not produce.</>}
          notPromised={[
            'revenue we do not control',
            'a rank in any AI system',
            'anything about systems we cannot test',
            'significance below a real traffic threshold',
            'a source for an enquiry that carries none',
            'a before-and-after with no baseline behind it',
          ]}
        >
          <p>
            <strong className="font-bold text-resolve-ink">Revenue we do not control.</strong> We do not set the
            price, build the product, staff the sales team, follow up the enquiry or close the deal. Revenue is
            reported from client data; it is never promised.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">A rank in any AI system.</strong> There is no such
            number. Order changed in every repeated prompt we measured, so a position would be a reading of
            noise.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">Anything about systems we cannot test.</strong>{' '}
            Claude and Grok returned no testable result in our measurement. We hold no baseline for either and
            make no claim about either.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">
              Statistical significance below a real traffic threshold.
            </strong>{' '}
            Below it, the work is research, diagnosis and design, and we describe it that way rather than
            calling an observation a test.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">Enquiries with no usable acquisition context.</strong>{' '}
            Direct entry, missing referrer, consent declined, and manually received enquiries &mdash; a phone
            call or an email &mdash; carry no first-touch attribution at all.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">
              A before-and-after where no baseline was captured first.
            </strong>{' '}
            This applies to our own site as much as to a client&rsquo;s.
          </p>
        </BoundaryBlock>
      </CommercialSection>

      {/* ------------------------------------------------------------- §5
          The highest-value section on the site, and the one Session 11 judged
          "most improved by being visual". */}
      <CommercialSection mode="split">
        <ChapterLabel>What we cannot tell you about where an enquiry came from</ChapterLabel>
        <Display>Attribution is useful, incomplete, and unevenly incomplete.</Display>
        <Body>
          Attribution means connecting an enquiry back to how the person first found the business and what they
          were looking at when they enquired.
        </Body>

        <MethodChainState />

        <div className="mt-[clamp(26px,3.2vw,44px)] max-w-[62ch] text-[1.02rem] leading-relaxed [&>p+p]:mt-4">
          <p className="m-0">
            A person who researches on their phone and enquires from a laptop appears as two different people.
            We cannot join them.
          </p>
          <p>
            A visitor who declines tracking consent is not tracked. That is correct, and it means their enquiry
            arrives with no source.
          </p>
          <p>
            A link shared in WhatsApp, an email or a private message arrives with no referrer and is recorded
            as direct. In this market that is a large category, not an edge case.
          </p>
          <p>
            Someone who was recommended by a customer, saw the business somewhere offline, or simply typed the
            domain in, arrives with nothing to attribute.
          </p>
          <p>
            Phone calls and emails carry no first-touch attribution at all. They are entered by a person, with
            the source recorded as unknown, and they are never quietly assigned to a channel.
          </p>
          <p>
            Revenue attribution depends entirely on data the client supplies from their own system. Where it is
            not supplied, that part of the chain is empty and shown as empty.
          </p>
        </div>

        <p
          className="mt-[clamp(28px,3.4vw,48px)] max-w-[58ch] border-l-4 pl-[clamp(18px,2.2vw,30px)] text-[clamp(1.1rem,1.8vw,1.42rem)] font-semibold leading-[1.35]"
          style={{ borderColor: 'var(--resolve-accent-deep)' }}
        >
          A measurement gap never disqualifies a legitimate enquiry. Whether an enquiry counts and whether we
          can tell where it came from are two separate questions. An enquiry we could not trace is still a real
          enquiry, it stays in the count, and the gap is reported as a gap &mdash; because moving it out would
          make the measurement look tidier and the business smaller.
        </p>
      </CommercialSection>

      {/* ------------------------------------------------------------- §6 */}
      <CommercialSection tone="paper" mode="reverse">
        <ChapterLabel>Where a person decides, not a process</ChapterLabel>
        <Display>Five places, named rather than hidden behind process language.</Display>
        <StatedList items={JUDGEMENT} />
      </CommercialSection>

      {/* ------------------------------------------------------------- §7 */}
      <CommercialSection mode="split">
        <ChapterLabel>Where the other capabilities sit in this</ChapterLabel>
        <Display>Three subordinate roles, stated at their real size.</Display>
        <div className="mt-[clamp(20px,2.4vw,32px)] max-w-[62ch] text-[1.02rem] leading-relaxed [&>p+p]:mt-4">
          <p className="m-0">
            <strong className="font-bold text-resolve-ink">Paid media</strong> is a demand source chosen on
            merit for a particular business, on the same measurement layer as everything else. It is not part
            of every engagement and it is not a positioning claim.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">AI search</strong> occupies five subordinate roles: a
            delivery capability, part of the method, a diagnostic that explains absence, a reason to publish
            properly, and &mdash; because we measured ourselves and published the result &mdash; a piece of
            evidence. It is a supporting capability and not what the firm is.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">Automation, after the enquiry exists</strong>, is
            limited to routing it to the right person, acknowledging it, and reminders around a booked call. It
            gets this sentence and no more, because that is genuinely all of it. We do not implement CRMs,
            build lifecycle programmes or run sales operations.
          </p>
        </div>
      </CommercialSection>

      {/* ------------------------------------------------------------- §8 */}
      <CommercialSection tone="paper" mode="reverse">
        <ChapterLabel>What we need from you</ChapterLabel>
        <Display>Four requirements, not four requests.</Display>
        <Body>The work does not function without them, which is why they are stated this way.</Body>
        <StatedList items={CLIENT_PROVIDES} />
      </CommercialSection>

      {/*
        §9 — WHAT HAPPENS WHEN YOU ENQUIRE — OWNER-BLOCKED AND EVIDENCE-BLOCKED,
        AND IT RENDERS NOTHING.

        Two separate blockers sit on this section: who owns enquiry response and
        what the sequence actually is (owner input), and a measured response-time
        distribution (evidence, which has never been produced). Nothing is
        written here, and in particular no response time appears anywhere on this
        page — not in hours, not in days, not as "shortly" or "as quickly as we
        can". The same input blocks /contact §2 and /thank-you §2, and all three
        render nothing so that when it arrives all three can say the same thing.
      */}

      {/* ------------------------------------------------------------ §10 */}
      <CommercialSection mode="split">
        <ChapterLabel>What we do not know</ChapterLabel>
        <Display>Visible, rather than a footnote.</Display>
        <div className="mt-[clamp(20px,2.4vw,32px)] max-w-[62ch] text-[1.02rem] leading-relaxed [&>p+p]:mt-4">
          <p className="m-0">
            <strong className="font-bold text-resolve-ink">Absolute search volume is unknown to us.</strong> No
            keyword tool has been available in this programme, so we quote no volume, no difficulty and no
            cost-per-click figure anywhere on this site. Where a figure would normally go, we write unknown.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">We have no analytics baseline of our own yet.</strong>{' '}
            Which means we cannot show you a before-and-after of our own site, and we do not.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">Organic search is a 12-month-plus horizon.</strong>{' '}
            That is our position from three independent lines of evidence. It is a horizon, not a schedule.
          </p>
          <p>
            <strong className="font-bold text-resolve-ink">Our AI measurement is one round.</strong> One day,
            one location, English, signed out, four systems, two others untestable. One measurement is not a
            trend, and we will not describe a change until there is a second.
          </p>
        </div>
      </CommercialSection>

      {/* ------------------------------------------------------------ §11
          PRIMARY at the end only. The approved secondary here is a RESEARCH
          link to both /research entries; neither route exists, so no link
          renders rather than a link to a 404. Recorded as a Phase G deferral. */}
      <CommercialClose
        label="If you want this run on your business"
        heading={<>The method is the same whether or not you hire us.</>}
        body={
          <>
            It is written so you can check it. If you want it applied to your situation, either route reaches
            the same place.
          </>
        }
        action="Tell us what you're trying to fix" mode="centred" />
    </>
  );
}
