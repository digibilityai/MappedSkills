import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Body, Note, ProofLink, ActionPair } from '@/components/commercial/primitives';
import { RouteBreadcrumb, RouteHero, FindingList } from '@/components/routes/primitives';
import { CauseZones } from '@/components/routes/CauseZones';
import { CheckSequence } from '@/components/routes/CheckSequence';

/**
 * SESSION 29 — PHASE G — `/problems/traffic-but-no-enquiries`. NEW ROUTE.
 *
 * ARCHETYPE 4 — problem diagnostic. Its own structure, shared with nothing:
 *
 *   hero (NO CTA) → 1 what this looks like → 2 it is one of four things (F2) →
 *   5 five checks you can run today (F6) → 6 what each finding means →
 *   7 what we found on ourselves → 8 commercial transition, LAST
 *
 * The move numbering is the approved copy's own. `06_PROBLEM_PAGE_UX.md` §3
 * records that moves 3 and 4 are present in content, folded into copy moves 2
 * and 1, and that no session has authority to renumber approved copy. The
 * page therefore carries six moves numbered 1, 2, 5, 6, 7, 8 and nothing is
 * missing.
 *
 * THE FROZEN BEHAVIOUR, and how each is guaranteed structurally rather than by
 * intention:
 *  - STATIC — this file and both figure components are Server Components. There
 *    is no `use client` anywhere in the route's tree, so there is no state to
 *    hydrate and the no-JS DOM is this DOM.
 *  - UNGATED — no email wall, no sign-up, no download, no tool, no account.
 *  - SCORELESS — no percentage, no grade, no health rating, no "X out of 10",
 *    no traffic-light treatment, no benchmark, no generated recommendation.
 *  - NO SAVED STATE — nothing is recorded, stored or transmitted. H5 ruled the
 *    recording affordance out for launch and `CheckSequence` has no state prop
 *    to pass one through.
 *
 * F1 CLASS: D — NONE (`22_F1_USAGE_TAXONOMY.md` §3). F2 and F6 are this page's
 * own objects and the run is not the reader's question here. There is no run on
 * this page.
 *
 * NO CTA ABOVE THE FOLD, and none inside the checks (`06` §2, §6). `RouteHero`
 * is called without an `action`, and `CheckSequence` accepts no action slot —
 * both constraints are structural rather than remembered.
 *
 * THE DELETION TEST (`06` §10.2): remove Move 8 entirely and the page is still
 * worth publishing. That is the test this page has to pass, and it is why the
 * five checks and the six findings carry the page's weight rather than the
 * commercial transition.
 *
 * TWO BLOCKED ITEMS. NEITHER IS FILLED — see §"Blocked" below.
 */
export const metadata = createMetadata(
  'Traffic But No Enquiries: How to Tell Which of Four Things Is Happening | MappedSkills',
  'Your website gets traffic and no enquiries. It is one of four different failures — the demand, the page, the enquiry path, or the measurement — and they need different fixes. Five checks you can run yourself today, with no sign-up and no tool.',
  '/problems/traffic-but-no-enquiries'
);

/* Move 5. Every check is completable in minutes with tools the reader already
   has, and every one ends in something they can observe. No tool is required,
   no sign-up, no download, no email (`06` §10.4, the instrument test). */
const CHECKS = [
  {
    title: 'Is anything being recorded at all?',
    body: (
      <>
        <p className="m-0">
          Open your analytics. If there is none, stop here: that is your first finding, and it is the most
          common one. If there is, look for whether an enquiry produces a recorded event, and whether that
          event carries where the visitor came from.
        </p>
      </>
    ),
    outcome: (
      <>You can either see enquiries in the data, or you have just established that you cannot.</>
    ),
  },
  {
    title: 'Submit a real enquiry and confirm it arrives.',
    body: (
      <>
        <p className="m-0">
          Fill in your own form, from a phone, on mobile data rather than office wifi. Use a real address you
          control. Then check the inbox it was supposed to reach. Check the spam folder. Check whether anyone
          is monitoring that address at all.
        </p>
        <p>Do the same with your booking link: open it in a private window and try to book a slot.</p>
      </>
    ),
    outcome: (
      <>
        The message is in the inbox, or it is not.{' '}
        <strong className="font-bold text-resolve-ink">A success screen is not proof of delivery.</strong> A
        form can display &ldquo;thank you&rdquo; and transmit nothing &mdash; ours did.
      </>
    ),
  },
  {
    title: 'What is the traffic actually made of?',
    body: (
      <p className="m-0">
        In your analytics, look at the top landing pages and, where you have it, the searches that produced
        them. Ask of the top ten: would a person searching that be able to buy from you?
      </p>
    ),
    outcome: (
      <>
        A rough split between commercial visits and everything else. If most of the volume is informational,
        career-related or from countries you do not serve, you have a demand problem, and the site is not at
        fault.
      </>
    ),
  },
  {
    title: 'Does the landing page answer the visit it received?',
    body: (
      <p className="m-0">
        Take the page that receives the most traffic. Read the first screen as though you had arrived from the
        search that sends it. Can you tell within a few seconds that this business does that specific thing,
        and what to do next?
      </p>
    ),
    outcome: (
      <>
        Yes or no, per page. Do it for the top three, not for the homepage &mdash; the homepage is rarely where
        the loss is.
      </>
    ),
  },
  {
    title: 'Are the enquiries you do get the right ones?',
    body: (
      <p className="m-0">
        Take the last twenty, if you have twenty. Sort them into: worth quoting &middot; real but not a fit
        &middot; not a business enquiry at all.
      </p>
    ),
    outcome: (
      <>
        A ratio. If most of them are real but wrong-fit, you have a demand problem wearing a quality costume,
        and more traffic will make it worse.
      </>
    ),
  },
];

/* Move 6. THE ORDER IS THE COPY'S AND IS NOT REORDERED, and every row renders
   identically — `FindingList` has no emphasis, collapse or ordering control.
   Three of these six point AWAY from this firm: "the traffic is the wrong
   traffic" says conversion work will not help, "the checks disagree" says no
   honest diagnosis is available, and the last one tells the reader to fix it
   themselves and not pay an agency. `06` §5 calls these "the page's
   credibility, and the first thing a conversion-minded revision would weaken".
   There is no CTA beneath the self-fix row: placing an ask directly under "you
   do not need an agency for this" is confirmshaming by adjacency. */
const FINDINGS = [
  {
    term: <>If nothing is being recorded</>,
    body: (
      <>
        Fix that before anything else, and before believing any change is an improvement. Analytics, a recorded
        conversion at the moment the enquiry is made, and the source captured with it. Until then every
        decision is a guess, including ours.
      </>
    ),
  },
  {
    term: <>If enquiries are not arriving</>,
    body: (
      <>
        This is the highest-value finding on the page and the fastest to fix. It is also the one that makes the
        previous months&rsquo; marketing spend look like a failure when it was not. Fix the delivery, then look
        at the numbers again before changing anything else.
      </>
    ),
  },
  {
    term: <>If the traffic is the wrong traffic</>,
    body: (
      <>
        Conversion work will not help you, and anyone who sells it to you at this point is selling the wrong
        thing. The work is in what you are being found for, which is an acquisition problem.{' '}
        <Link
          href="/seo"
          className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
        >
          What being found for the right searches involves
        </Link>
        .
      </>
    ),
  },
  {
    term: <>If the page does not answer the visit</>,
    body: (
      <>
        This is the one case where page-level conversion work is the right intervention. Message, offer,
        evidence and the obvious objections, in that order. Design comes last and matters least.{' '}
        <Link
          href="/conversion-optimization"
          className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
        >
          How that work runs
        </Link>
        .
      </>
    ),
  },
  {
    term: <>If the enquiries are real but wrong-fit</>,
    body: (
      <>
        The problem is upstream of the website. It is usually what you are ranking or bidding for, or how the
        offer is described, rather than the form.
      </>
    ),
  },
  {
    term: <>If the checks disagree, or there is too little to go on</>,
    body: (
      <>
        That is a legitimate outcome and worth saying plainly. With a handful of visits a month, or a handful
        of enquiries a year, no honest diagnosis is available yet: the numbers are too small to tell a real
        pattern from noise, and anyone confidently diagnosing your business from them is guessing. The useful
        move is to get the measurement working and let a few months accumulate before deciding anything.
      </>
    ),
  },
  {
    term: <>And two of these you should probably just fix yourself</>,
    body: (
      <>
        If check 1 found no analytics, or check 2 found the form is not delivering, those are specific, bounded
        jobs &mdash; whoever built or maintains your site can do them, usually in a day. You do not need an
        agency for that, and you should not pay one for it.
      </>
    ),
  },
];

export default function TrafficButNoEnquiriesPage() {
  return (
    <>
      {/* "Problems" is a LABEL, not a link. `07_NAVIGATION_ARCHITECTURE.md` §6:
          no problems hub exists, and a menu advertising a family with one
          member is worse than no menu. The route is also deliberately absent
          from the primary navigation for the same reason. */}
      <RouteBreadcrumb
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Problems', href: null },
          { name: 'Traffic but no enquiries', href: '/problems/traffic-but-no-enquiries' },
        ]}
      />

      {/* NO CTA, NO APPARATUS, NO PROOF ON THE FIRST SCREEN. The reader is
          problem-aware and has not decided to buy anything. */}
      <RouteHero
        eyebrow="A problem, not a service"
        title={<>Traffic but no enquiries: how to tell which of four things is happening.</>}
        lede={
          <>
            Visits arrive and enquiries do not. Before changing anything, it is worth knowing which of four
            different failures you have &mdash; because they need different fixes, and three of the four are
            not solved by redesigning the page.
          </>
        }
      >
        <p>
          This page has the checks in it. You can run all of them yourself, today, without talking to anyone.
        </p>
      </RouteHero>

      {/* ---------------------------------------------------------- move 1 */}
      <CommercialSection tone="paper" mode="split">
        <ChapterLabel>What this looks like</ChapterLabel>
        <Display>Five ways the same problem shows up.</Display>
        <Body>
          Sessions are up and enquiries are flat. Or enquiries stopped after a site change and nobody is sure
          whether the two are connected. Or they only ever come from one channel. Or they arrive and none of
          them are worth quoting for. Or nobody is certain whether an enquiry has arrived at all.
        </Body>
        <Body>All of those produce the same feeling, and they do not have the same cause.</Body>
      </CommercialSection>

      {/* ---------------------------------------------------------- move 2
          The page's distinctive move, and the one place a figure genuinely
          replaces the prose rather than illustrating it. */}
      <CommercialSection mode="wide">
        <ChapterLabel>It is one of four things, and they are not interchangeable</ChapterLabel>
        <Display>The usual response is to change the website.</Display>
        <Body>
          Sometimes that is correct. Frequently it is the equivalent of repainting a shop whose door is locked.
        </Body>
        <Body>
          Traffic that does not become enquiries is caused by one of four things, and each has a different fix.
        </Body>

        <CauseZones />

        <div className="mt-[clamp(28px,3.4vw,48px)] grid grid-cols-1 gap-x-[clamp(24px,4vw,72px)] gap-y-[clamp(20px,2.4vw,30px)] min-[900px]:grid-cols-2">
          <div>
            <h3 className="m-0 font-heading text-[1.2rem] font-bold tracking-[-0.03em]">Demand</h3>
            <p className="mt-2 max-w-[52ch] text-[1.0rem] leading-relaxed text-resolve-dim">
              The traffic is the wrong traffic. It arrives from searches with no commercial intent, from the
              wrong audience, at the wrong stage, or from the wrong country. No amount of page improvement
              makes a student enquire.
            </p>
          </div>
          <div>
            <h3 className="m-0 font-heading text-[1.2rem] font-bold tracking-[-0.03em]">Page</h3>
            <p className="mt-2 max-w-[52ch] text-[1.0rem] leading-relaxed text-resolve-dim">
              The page does not answer the visit. The message, the offer, the evidence or the obvious objection
              is missing, so the visitor gets what they asked for and still has no reason to act.
            </p>
          </div>
          <div>
            <h3 className="m-0 font-heading text-[1.2rem] font-bold tracking-[-0.03em]">Path</h3>
            <p className="mt-2 max-w-[52ch] text-[1.0rem] leading-relaxed text-resolve-dim">
              The enquiry cannot complete. The form fails on a phone, the booking widget does not render, the
              submission goes nowhere, or the enquiry arrives in an inbox nobody reads.
            </p>
          </div>
          <div>
            <h3 className="m-0 font-heading text-[1.2rem] font-bold tracking-[-0.03em]">Measurement</h3>
            <p className="mt-2 max-w-[52ch] text-[1.0rem] leading-relaxed text-resolve-dim">
              Enquiries may be arriving unseen. With no analytics, no source capture and no recorded
              conversion, an improvement and a disaster look identical.
            </p>
          </div>
        </div>

        <p className="mt-[clamp(24px,3vw,40px)] max-w-[58ch] border-l-4 pl-[clamp(18px,2.2vw,30px)] text-[clamp(1.06rem,1.5vw,1.28rem)] font-semibold leading-[1.4]" style={{ borderColor: 'var(--resolve-accent-deep)' }}>
          Measurement is the one to check first &mdash; not because it is the most likely cause, but because
          without it you cannot tell which of the other three you have.
        </p>
      </CommercialSection>

      {/* ---------------------------------------------------------- move 5
          The instrument. NO CTA and NO prompt of any kind inside this section. */}
      <CommercialSection tone="paper" mode="wide">
        <ChapterLabel>Five checks you can run today</ChapterLabel>
        <Display>No tool, no sign-up, no download, no email.</Display>
        <Note>
          Each of these is completable in minutes with things you already have, and each one ends in something
          you can see for yourself. Work through them in order.
        </Note>

        <CheckSequence checks={CHECKS} />
      </CommercialSection>

      {/* ---------------------------------------------------------- move 6 */}
      <CommercialSection mode="reverse">
        <ChapterLabel>What each finding means, and what to do about it</ChapterLabel>
        <Display>Two of these point away from us.</Display>
        <Body>
          Three, if you count the one where there is not yet enough evidence to say anything honest at all.
          They are in the order the checks produce them, and none of them is smaller than the others.
        </Body>

        <FindingList items={FINDINGS} />
      </CommercialSection>

      {/* ---------------------------------------------------------- move 7
          The worked example. BLOCKED LINK — RENDERS NOTHING: the
          LOW-COMMITMENT link to /research/{own-site-enquiry-diagnostic} waits on
          a technical prerequisite (the fixes shipping so the entry can
          publish). The finding stands either way and the paragraph closes up
          around the absent link — no placeholder, no "coming soon". */}
      <CommercialSection tone="paper" mode="split">
        <ChapterLabel>What we found when we ran this on ourselves</ChapterLabel>
        <Display>Four of the five checks failed.</Display>
        <Body>
          We ran these checks on our own site before offering them to anyone. The contact form had no
          submission target: it showed a success message and sent nothing, so every enquiry it ever received
          was lost while the visitor was told it had worked. The booking widget rendered empty. The thank-you
          page existed and nothing linked to it. There was no analytics of any kind, which is exactly why none
          of that had been noticed.
        </Body>
        <Body>
          That is not a comfortable thing to publish, and it is the most useful illustration we have: the loss
          was not in the design, the copy or the traffic. It was in a part nobody was looking at.
        </Body>
        <ProofLink href="/how-it-works">How we do this on a client site</ProofLink>
      </CommercialSection>

      {/* ---------------------------------------------------------- move 8
          The commercial transition, and only now.

          BLOCKED CONTROL — RENDERS NOTHING. The [ACT] DIAGNOSTIC control's
          WORDING is blocked on the entry-offer decision (free / paid / hybrid),
          and the approved copy lists three candidate labels of which none is
          chosen. Choosing one here would be taking a commercial decision this
          session has no authority to take, and inventing a fourth would be
          worse. The DIAGNOSTIC OFFER ITSELF still renders, in the paragraph
          below, so the reader still learns it exists; what does not render is a
          second button with an invented label. The approved PRIMARY — "Tell us
          what you're trying to fix" — is unblocked and is the page's last
          element, exactly as the copy specifies. */}
      <section className="border-t-2 border-resolve-ink bg-resolve-ground py-[clamp(48px,6.4vw,110px)] text-resolve-ink">
        <div className="mx-auto w-full max-w-[1400px] px-[var(--resolve-pad)]">
          <ChapterLabel>If you would rather we ran it</ChapterLabel>
          <p className="m-0 mt-[18px] max-w-[22ch] font-heading text-[clamp(1.8rem,3.8vw,3rem)] font-extrabold leading-[0.99] tracking-[-0.038em]">
            A specific question beats a general worry.
          </p>
          <p className="mt-[20px] max-w-[56ch] text-[clamp(1.02rem,1.2vw,1.16rem)] leading-relaxed text-resolve-dim">
            If you have run the checks and found something, you now have a specific question rather than a
            general worry &mdash; which is the right way to start a conversation.
          </p>
          <p className="mt-4 max-w-[56ch] text-[clamp(1.02rem,1.2vw,1.16rem)] leading-relaxed text-resolve-dim">
            If you would rather not run them yourself, we do this as a piece of work: the same five checks on
            your site and your data, with what we find and what it means, written down.
          </p>
          <ActionPair primaryLabel="Tell us what you're trying to fix" />
        </div>
      </section>
    </>
  );
}
