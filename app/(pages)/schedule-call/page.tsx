import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { CommercialSection, ChapterLabel, Display, Body } from '@/components/commercial/primitives';
import { RouteHero, StatedList } from '@/components/routes/primitives';
import { BookingLink } from '@/components/analytics/BookingLink';

/**
 * SESSION 29 — PHASE G — `/schedule-call`. ARCHETYPE 7 — conversion surface.
 *
 * SCOPE: PRESENTATION ONLY. `06_IMPLEMENTATION_SEQUENCE.md` gives Phase G the
 * presentation of this route and gives PHASE H1 "booking vendor selection and
 * integration". SAME VENDOR, SAME URL, SAME ENVIRONMENT VARIABLE: nothing about
 * the booking integration is selected, configured, repaired or replaced here.
 *
 * WHY `CalendlyEmbed` IS NOT RENDERED ON THIS ROUTE ANY MORE. It was, in the
 * first pass of this session, and measuring the server-rendered HTML is what
 * caught it: the component's initial client state is "no URL", so THE ONLY
 * THING IT EVER PUTS IN THE SERVER-RENDERED DOCUMENT IS ITS FALLBACK — and that
 * fallback publishes a hard-coded phone number and email address. Both are
 * OWNER-BLOCKED entity facts. Every other surface in this phase renders nothing
 * rather than a partial or unconfirmed fact set, and a translated route that
 * published them through a component would have defeated that everywhere at
 * once. It also read, to a visitor with JavaScript disabled, as an internal
 * configuration error message.
 *
 * The component file itself is UNMODIFIED and stays in the repository. This
 * route now links to the booking page directly instead, which is a presentation
 * change with three properties worth stating: it uses the same
 * `NEXT_PUBLIC_CALENDLY_URL` and the same default, it works with JavaScript
 * disabled, and it makes no claim about availability.
 *
 * WHAT PHASE H1 MUST STILL RESOLVE, recorded rather than patched over. All of
 * this is pre-existing and none of it is hidden by this translation:
 *   1. The embedded booking surface does not work. The production container
 *      renders empty with zero iframes on the page — VERIFIED in the approved
 *      copy record. The component mounts Calendly's INLINE widget container and
 *      then calls `Calendly.initBadgeWidget`, which is the FLOATING BADGE API,
 *      so the inline container is never populated by anything.
 *   2. `initBadgeWidget` injects a floating persistent element. The Resolve
 *      budget is 0 fixed and 0 sticky elements site-wide and the CTA
 *      architecture prohibits a floating persistent CTA, so H1's integration
 *      must not use the badge.
 *   3. Its no-URL fallback hard-codes the owner-blocked phone number and email.
 *      That path must go before the component is used anywhere again.
 *   4. There is an open question, recorded in the approved copy, about whether
 *      the chosen tool can accept runtime custom fields and expose the
 *      completed booking server-side. If it cannot, channel measurement is
 *      lost — but a booking meeting the five qualification conditions is still
 *      a qualified enquiry.
 * NO FAKE BOOKING CONFIRMATION, NO FABRICATED AVAILABILITY AND NO SECOND
 * BOOKING PROVIDER is introduced here. The page does not claim a slot can be
 * booked, and it does not say when one is free.
 *
 * BLOCKED CONTENT, AND WHAT RENDERS NOTHING.
 *  - Who takes the calls, by name and role — OWNER-BLOCKED. Nothing renders.
 *    The approved copy's own reason is worth keeping in view: "naming the
 *    person is the point — 'a member of our team' is what a call centre says",
 *    which is exactly why an unnamed substitute is worse than an omission.
 *  - The actual call length — OWNER-BLOCKED. No duration appears anywhere on
 *    this page.
 *  - Real availability and business hours — OWNER-BLOCKED. No availability
 *    claim, no hours, no "usually within", no scarcity of any kind.
 *  - The published phone number — OWNER-BLOCKED. The direct-contact line
 *    renders nothing rather than carrying the production default.
 *  - The entry-offer model is a DECISION REQUIRED. Until it is recorded this
 *    page states what the call covers and DOES NOT describe it as free, as an
 *    audit or as a strategy session. "Free", "complimentary", "free audit" and
 *    "free strategy session" appear nowhere below.
 *
 * MANDATORY STILLNESS (M6): zero figures, zero proof elements, zero motion.
 * F1: D — NONE, and `22` §3 puts this route at zero figures of any kind.
 *
 * `/contact` REMAINS THE PRIMARY COMMERCIAL PATH. This page carries one neutral
 * cross-link back to it and does not present the two as a comparison.
 */
export const metadata = createMetadata(
  'Book a Time to Talk | MappedSkills',
  'A conversation about what is actually happening with your enquiries — what you are getting, what you are not, and where the loss most likely sits. You will leave with a view either way.',
  '/schedule-call'
);

/**
 * PAGE-058 (owner, 2026-09-23). The fallback is now the CANONICAL booking
 * event, verified live on 2026-09-23: host "MappedSkills Marketing", event
 * "Client Discovery Call", 30 minutes — the positioning approved in
 * BLOG-095/BLOG-093.
 *
 * This matters because the fallback is what production actually serves.
 * `NEXT_PUBLIC_CALENDLY_URL` is not a repository variable, is not a secret and
 * is not passed by the release workflow's build step, so it has never been
 * defined in a production build and every build falls through to this default.
 * The previous value `https://calendly.com/mappedskills` is the bare profile
 * page, not a bookable event.
 *
 * Adding the variable to CI is deliberately NOT part of R2 (owner decision).
 * The env lookup is retained so a future configured value still wins.
 */
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mappedskills/client-discovery';

const COVERS = [
  <>What you sell, and what one customer is worth.</>,
  <>What is happening now with enquiries.</>,
  <>What you can currently measure.</>,
  <>Where, on the evidence available in a conversation, the loss is most likely to be.</>,
];

const BRING = [
  <>How many enquiries you get in a typical month, roughly.</>,
  <>Roughly how many of those are worth quoting for.</>,
  <>Whether you can see where any of them came from.</>,
];

export default function ScheduleCallPage() {
  return (
    <>
      <RouteHero
        eyebrow="Booking"
        title={<>Book a time to talk.</>}
        lede={
          <>
            A conversation about what is actually happening &mdash; what you are getting, what you are not, and
            what would have to be true for that to change.
          </>
        }
        size="quiet"
      >
        <p>
          You will leave with a view on where the problem probably sits, whether or not you go any further with
          us.
        </p>
      </RouteHero>

      {/* The booking surface: the same vendor and the same configured URL, as a
          plain outbound link. No availability is stated, no slot count, no
          duration, no scarcity, and no confirmation of any kind — this control
          opens the booking page and nothing more. PHASE H1 owns the integration
          itself.

          SESSION 32 — PHASE H2. The `<a>` became `<BookingLink>`: the same
          element, the same href, the same target, the same rel, the same classes
          and the same inline style, with ONE added click handler that emits the
          approved DIAGNOSTIC event `meeting_started` ("Booking surface opened",
          `EVENT_TAXONOMY.md` §2 row 6). Nothing else on this route changed — no
          copy, no layout, no vendor, no URL, no environment variable.

          IT IS NOT A BOOKING CONVERSION AND MUST NEVER BE REPORTED AS ONE.
          §4 of the taxonomy lists `meeting_started` among the events that are
          NOT a business conversion. The booking page is a third-party origin, so
          a click is the last thing observable from here; `meeting_booked`
          requires a webhook from a vendor that has never been recorded as
          selected. BOOKING REMAINS OWNER-BLOCKED. */}
      <section className="border-t border-resolve-line bg-resolve-paper py-[clamp(40px,5vw,88px)] text-resolve-ink">
        <Container className="max-w-[1400px] px-[var(--resolve-pad)]">
          <div className="max-w-[62ch]">
            <ChapterLabel>The booking page</ChapterLabel>
            <Body>
              Times are shown on the booking page itself, so it is the only place that can tell you what is
              actually open. Nothing on this page claims a slot for you.
            </Body>
            <BookingLink
              href={CALENDLY_URL}
              className="mt-[26px] inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[520px]:w-full"
              style={{
                background: 'var(--resolve-accent-dark)',
                borderColor: 'var(--resolve-accent-dark)',
                color: '#FFFFFF',
              }}
            >
              Open the booking page
            </BookingLink>
          </div>
        </Container>
      </section>

      {/*
        §1 — WHAT THE CALL IS — who takes it, how long it runs and when it is
        available are ALL OWNER-BLOCKED, AND ALL RENDER NOTHING. What the call
        covers is unblocked and renders below under its own heading, which does
        not promise a name, a length or a time.
      */}
      <CommercialSection>
        <ChapterLabel>What the call covers</ChapterLabel>
        <Display>Four things, and none of them is a pitch.</Display>
        <StatedList items={COVERS} />
      </CommercialSection>

      {/* ------------------------------------------------------------- §2 */}
      <CommercialSection tone="paper">
        <ChapterLabel>What you get from it either way</ChapterLabel>
        <Display>A view on which of four things is most likely losing you enquiries.</Display>
        <Body>
          The demand, the page, the enquiry path, or the measurement &mdash; and what you would check next to
          confirm it. That is useful whether you work with us or hand it to somebody else.
        </Body>
        <Body>
          If you would rather work through it yourself first,{' '}
          <Link
            href="/problems/traffic-but-no-enquiries"
            className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
          >
            the five checks are published in full
          </Link>{' '}
          and you do not need us to run them.
        </Body>
      </CommercialSection>

      {/* ------------------------------------------------------------- §3 */}
      <CommercialSection>
        <ChapterLabel>What it is not</ChapterLabel>
        <Display>Three things it will not be.</Display>
        <Body>
          It is not a pitch deck. It is not a full audit &mdash; that is a piece of work with a scope and a
          price, and a conversation is not it. And it is not a qualification interview: if what you need is
          something we do not do, the useful outcome is finding that out quickly.
        </Body>
      </CommercialSection>

      {/* ------------------------------------------------------------- §4 */}
      <CommercialSection tone="paper">
        <ChapterLabel>What to have to hand</ChapterLabel>
        <Display>Rough numbers are enough.</Display>
        <StatedList items={BRING} />
        <Body>
          Access to your analytics is useful and not required &mdash; if there is none, that is itself worth
          knowing before we talk.
        </Body>
      </CommercialSection>

      {/*
        §5's DIRECT CONTACT LINE — the published phone number is OWNER-BLOCKED
        and renders nothing. The cross-link to /contact below is unblocked and
        is the one route away from this page.
      */}
      <CommercialSection>
        <ChapterLabel>Or write instead</ChapterLabel>
        <Display>The form reaches the same place.</Display>
        <Body>
          If you would rather set it out in writing, neither route is a lesser one.{' '}
          <Link href="/contact" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            Tell us what you&rsquo;re trying to fix
          </Link>
          .
        </Body>
      </CommercialSection>
    </>
  );
}
