import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Body, Note, ProofLink } from '@/components/commercial/primitives';
import { RouteHero, StatedList } from '@/components/routes/primitives';
import { CommercialClose } from '@/components/commercial/CommercialClose';

/**
 * SESSION 29 — PHASE G — `/about`. ARCHETYPE 11 — entity / trust.
 *
 * TWO BLOCKED SECTIONS, AND BOTH RENDER NOTHING.
 *
 * §4 — THE PEOPLE. Named individuals, their real roles and their genuine
 * expertise are OWNER-BLOCKED. `03_PAGE_ARCHETYPES.md` §4.2 is unusually
 * specific about this one: "No silhouette, no stock, no 'our team' without
 * names. A staff name surfaced by Google AI Mode is NOT VERIFIED." Nothing
 * renders at that position — no heading, no container, no placeholder avatar,
 * no headcount, no "our team" paragraph, no culture claim.
 *
 * §6 — THE COMPANY FACTS. Legal entity name, complete registered postal
 * address with a real postal code, published phone and email, and founding year
 * are ALL OWNER-BLOCKED. The programme record notes two specific traps: the
 * current production declaration's `postalCode` field contains the word
 * "India", which is malformed on its own terms and must not be carried forward;
 * and AI systems report a founding year of 2016 from LinkedIn, which is NOT
 * VERIFIED in this programme. Nothing renders — not a partial address, not a
 * city on its own presented as an address, not a year.
 *
 * NO `Organization` OR `LocalBusiness` JSON-LD IS EMITTED FROM THIS PAGE.
 * `03` §4.2 binds the footer and all entity schema to the same blocked fact
 * set: "renders nothing rather than a partial address". The page that shipped
 * before this one emitted its own Organization block built from the malformed
 * declaration; that is removed rather than corrected, because correcting it
 * would require the blocked facts.
 *
 * A SITE-WIDE ONE STILL EXISTS AND IS NOT FIXED HERE, and it should not be read
 * out of this file as though it were. `app/layout.tsx` emits `Organization` and
 * `LocalBusiness` on EVERY route — homepage and all seven Phase F routes
 * included — from `lib/schema.ts`, carrying the owner-blocked phone and email,
 * the superseded "performance marketing agency" description, and the
 * `postalCode` field whose value is the word "India". That is SHARED CHROME:
 * Phase A/B files, changed by neither Phase F nor Phase G, and the session
 * brief's standing instruction for shared-chrome defects is record and defer.
 * It is recorded in this phase's document as a shared-chrome / entity finding.
 *
 * F1: D — NONE. No figure of any kind on this route.
 *
 * ABSENT BY RULE, and verified absent below: founding year · team size · client
 * count · logos · testimonials · ratings · awards · partnerships ·
 * certifications · superlatives · any industry specialisation claim · any
 * origin story or founding myth · any timeline · any international or export
 * claim. WHAT THIS REPLACED: a 716-line page carrying "300%+", "₹100Cr+", ROI,
 * ROAS in four places, a certifications block and a team section.
 */
export const metadata = createMetadata(
  'Who We Are, and What We Can Actually Show You | MappedSkills',
  'A small firm in Pune working on one thing: turning demand that already exists into enquiries a business can act on. The accountability boundary, what can be checked, and an honest account of where the firm is today.',
  '/about'
);

const FOR_WHOM = [
  <>Businesses where a customer takes time to decide and one good enquiry is worth real money.</>,
  <>Businesses where demand already exists or can reasonably be reached.</>,
  <>Businesses where measurement access is not a problem.</>,
];

const NOT_FOR_WHOM = [
  <>Not businesses that need demand created from nothing.</>,
  <>Not impulse or price-only purchases.</>,
  <>Not anyone who needs the outcome guaranteed.</>,
];

export default function AboutPage() {
  return (
    <>
      <RouteHero
        eyebrow="The firm"
        title={<>Who we are, and what we can actually show you.</>}
        lede={
          <>
            A small firm in Pune working on one thing: helping businesses capture the demand that already
            exists for what they sell and turn it into enquiries they can act on.
          </>
        }
      >
        <p>This page has an honest account of where the firm is today, and it is a short one.</p>
      </RouteHero>

      {/* ------------------------------------------------------------- §1
          NOT A FOUNDING MYTH. No origin story, no "we saw a gap in the market",
          no invented frustration narrative — the approved copy names all three. */}
      <CommercialSection tone="paper" mode="split">
        <ChapterLabel>Why we work this way</ChapterLabel>
        <Display>The enquiry sits at the end of everybody else&rsquo;s report.</Display>
        <Body>
          Most marketing suppliers are measured on their own part going up. The search agency reports rankings.
          The ads agency reports clicks and cost per click. The web developer reports a finished site. Every
          one of those reports can be accurate while the business receives no more enquiries than before
          &mdash; because the enquiry sits at the end of all of them, and where the work is split it can easily
          be nobody&rsquo;s job.
        </Body>
        <Body>
          That is the belief the firm is built on: the enquiry is the unit that matters, and someone has to be
          accountable for it across the whole path rather than for one segment of it.
        </Body>
      </CommercialSection>

      {/* ------------------------------------------------------------- §2 */}
      <CommercialSection mode="split">
        <ChapterLabel>What we hold ourselves to</ChapterLabel>
        <Display>Accountable up to the qualified enquiry.</Display>
        <Body>
          Where a client supplies close data, we report through to the revenue their own system recorded,
          stating what we did and did not control.
        </Body>
        <Body>
          We do not promise rankings, positions in AI answers, enquiry counts, revenue or a return on spend,
          and we publish what cannot be attributed rather than presenting a measurement as more complete than
          it is.
        </Body>
        <Body>We publish the limits because the alternative is asking you to take the numbers on trust.</Body>
      </CommercialSection>

      {/* ------------------------------------------------------------- §3 */}
      <CommercialSection tone="paper" mode="statement">
        <ChapterLabel>How we work</ChapterLabel>
        <Display>Short, because it is written out properly elsewhere.</Display>
        <Body>
          Reach the buyers already looking, make the route from that visit to a sent enquiry work, and measure
          the whole chain so the result can be checked. The method, including its limits, is published in full.
        </Body>
        <ProofLink href="/how-it-works">The method</ProofLink>
      </CommercialSection>

      {/*
        §4 — THE PEOPLE — OWNER-BLOCKED, AND IT RENDERS NOTHING.

        This is the section a writer is most tempted to fill, and the one where
        filling it is most damaging: named authorship and visible founder
        expertise are among the very few trust signals genuinely available to
        this firm, so a generic "our team" would spend the signal rather than
        earn it. Nothing renders — no heading, no grid, no silhouette, no stock
        photograph, no headcount, no unnamed roles.
      */}

      {/* ------------------------------------------------------------- §5
          TWO OF THE THREE ITEMS' LINKS DO NOT RENDER.

          The own-site diagnostic entry is blocked on a TECHNICAL PREREQUISITE
          (the fixes shipping) and the approved copy marks it as such; the
          AI-visibility entry has not been produced — `PAGE_COPY_INDEX.md` §1
          row 13 records it as NOT DRAFTED, out of Session 11 scope, and Phase G
          does not create it. Neither link renders rather than pointing at a 404.

          The AI-visibility MEASUREMENT itself is first-party, dated and
          verified, so it still renders — with its full scope attached, which is
          what makes it checkable in the only sense that matters here: somebody
          else can run it again from what is stated. */}
      <CommercialSection mode="split">
        <ChapterLabel>What you can check</ChapterLabel>
        <Display>Three things, and one of them does not flatter us.</Display>

        <div className="mt-[clamp(24px,3vw,40px)] border-t-2 border-resolve-ink">
          <div className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
            <h3 className="m-0 max-w-[44ch] font-heading text-[clamp(1.12rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
              The method, published in full
            </h3>
            <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-resolve-dim">
              Including a section on what cannot be attributed, which is a third of the page rather than a
              footnote at the bottom of it.
            </p>
            <ProofLink href="/how-it-works">Read the method</ProofLink>
          </div>

          <div className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
            <h3 className="m-0 max-w-[44ch] font-heading text-[clamp(1.12rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
              A measurement of ourselves that we would rather have not published
            </h3>
            <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-resolve-dim">
              We asked four AI assistants for agencies like this one, 28 times, on one day, from Pune, in
              English, signed out. This business was named in none of them. Directory and listing sources
              appeared in 15 of those 28 runs. Two further systems returned no testable result at all, so we
              hold no baseline for either and make no claim about either.
            </p>
            <p className="mt-3 max-w-[62ch] text-[.94rem] leading-[1.55] text-resolve-gap">
              That is one round, on one day, in one language, from one location. It is a count, not a rate, and
              one measurement is not a trend.
            </p>
          </div>
        </div>
      </CommercialSection>

      {/*
        §6 — COMPANY FACTS — OWNER-BLOCKED, AND IT RENDERS NOTHING.

        No legal entity name, no address, no postal code, no phone, no email, no
        founding year, and no Organization or LocalBusiness JSON-LD built from
        any of them. The approved copy's binding requirement is that this fact
        set be IDENTICAL on /about, /contact, the footer, the structured data
        and every external profile — inconsistency here is what produced two AI
        systems describing the same company two different ways. A partial set
        published in one place and not another is that same failure, so nothing
        is published anywhere until the whole set exists.
      */}

      {/* ------------------------------------------------------------- §7 */}
      <CommercialSection tone="paper" mode="reverse">
        <ChapterLabel>Who we work with</ChapterLabel>
        <Display>And who we do not.</Display>
        <StatedList items={FOR_WHOM} />
        <StatedList items={NOT_FOR_WHOM} className="mt-[clamp(18px,2vw,26px)]" />
        <Note>
          We are based in Pune and work with businesses across India. No international or export claim is made
          here, because no evidence supporting one exists.
        </Note>
      </CommercialSection>

      {/* ------------------------------------------------------------- §8
          The distinctive move: the page says where the firm actually is. */}
      <CommercialSection mode="split">
        <ChapterLabel>Where we are today</ChapterLabel>
        <Display>We are building the evidence base in public, and it is thin.</Display>
        <Body>
          There are no published case studies, because we do not have permission to publish client results.
          There are no reviews or directory profiles yet. There is one round of AI measurement rather than a
          series, so we can describe a position and not a trend.
        </Body>
        <Body>
          What exists is the method and two first-party measurements &mdash; one of which found nothing and one
          of which found our own failures. That is a smaller set of proof than most firms display, and every
          item in it can be checked, which is the trade we would rather make.
        </Body>
      </CommercialSection>

      <CommercialClose
        label="If that is the kind of supplier you want"
        heading={<>Tell us what is actually happening.</>}
        body={
          <>
            The most useful first message is what you are getting, what you are not, and what you can currently
            see.
          </>
        }
        action="Tell us what you're trying to fix"
      />
    </>
  );
}
