import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Note, ProofLink } from '@/components/commercial/primitives';
import { RouteHero, StateComparison } from '@/components/routes/primitives';
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
  <><span className="text-resolve-dim">Not businesses that need demand created from nothing.</span></>,
  <><span className="text-resolve-dim">Not impulse or price-only purchases.</span></>,
  <><span className="text-resolve-dim">Not anyone who needs the outcome guaranteed.</span></>,
];

export default function AboutPage() {
  return (
    <>
      <RouteHero
        eyebrow="The firm"
        title={<>Who we are, and what we can <span style={{ color: 'var(--resolve-accent-deep)' }}> actually show you.</span></>}
        lede={
          <><p className='text-[clamp(1.06rem,1.35vw,1.28rem)]'>
            A small firm in Pune working on one thing: helping businesses capture the demand that already
            exists for what they sell and turn it into enquiries they can act on.</p>
          </>
        } mode="editorial">
        <p className='text-[clamp(1.06rem,1.35vw,1.28rem)]'>This page has an honest account of where the firm is today, and it is a short one.</p>
      </RouteHero>

      {/* ------------------------------------------------------------- §1
          NOT A FOUNDING MYTH. No origin story, no "we saw a gap in the market",
          no invented frustration narrative — the approved copy names all three. */}
      <CommercialSection tone="paper">
        <div className="max-w-[95%] max-[1024px]:max-w-none">
          <ChapterLabel>Why we work this way</ChapterLabel>
          <Display>The enquiry sits at the end of <span style={{ color: 'var(--resolve-accent-deep)' }}> everybody else&rsquo;s report.</span></Display>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            Most marketing suppliers are measured on their own part going up. The search agency reports rankings.
            The ads agency reports clicks and cost per click. The web developer reports a finished site. Every
            one of those reports can be accurate while the business receives no more enquiries than before
            &mdash; because the enquiry sits at the end of all of them, and where the work is split it can easily
            be nobody&rsquo;s job.
          </p>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            That is the belief the firm is built on: the enquiry is the unit that matters, and someone has to be
            accountable for it across the whole path rather than for one segment of it.
          </p>
        </div>
      </CommercialSection>

      {/* ------------------------------------------------------------- §2 */}
      <CommercialSection>
        <div className="max-w-[95%] max-[1024px]:max-w-none">
          <ChapterLabel>What we hold ourselves to</ChapterLabel>
          <Display>Accountable up to the <span style={{ color: 'var(--resolve-accent-deep)' }}> qualified enquiry.</span></Display>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            Where a client supplies close data, we report through to the revenue their own system recorded,
            stating what we did and did not control.
          </p>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            We do not promise rankings, positions in AI answers, enquiry counts, revenue or a return on spend,
            and we publish what cannot be attributed rather than presenting a measurement as more complete than
            it is.
          </p>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">We publish the limits because the alternative is asking you to take the numbers on trust.</p>
        </div>
      </CommercialSection>

      {/* ------------------------------------------------------------- §3 */}
      <CommercialSection tone="paper">
        <ChapterLabel>How we work</ChapterLabel>
        <Display>Short, because it is written out <span style={{ color: 'var(--resolve-accent-deep)' }}> properly elsewhere.</span></Display>
        <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
          Reach the buyers already looking, make the route from that visit to a sent enquiry work, and measure
          the whole chain so the result can be checked. The method, including its limits, is published in full.
        </p>
        <ProofLink href="/how-it-works">The method</ProofLink>
      </CommercialSection>

      {/* ------------------------------------------------------------- §5 */}
      <CommercialSection>
        <ChapterLabel>What you can check</ChapterLabel>
        <Display>Three things, and one of them <span style={{ color: 'var(--resolve-accent-deep)' }}> does not flatter us.</span></Display>

        <div className="mt-[clamp(24px,3vw,40px)] border-t-2 border-resolve-ink">
          <div className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
            <h3 className="m-0 max-w-none font-heading text-[clamp(1.12rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
              The method, published in full
            </h3>
            <p className="mt-3 max-w-none text-resolve-dim leading-relaxed">
              Including a section on what cannot be attributed, which is a third of the page rather than a
              footnote at the bottom of it.
            </p>
            <ProofLink href="/how-it-works">Read the method</ProofLink>
          </div>

          <div className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
            <h3 className="m-0 max-w-none font-heading text-[clamp(1.12rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
              A measurement of ourselves that we would rather have not published
            </h3>
            <p className="mt-3 max-w-none text-resolve-dim leading-relaxed">
              We asked four AI assistants for agencies like this one, 28 times, on one day, from Pune, in
              English, signed out. This business was named in none of them. Directory and listing sources
              appeared in 15 of those 28 runs. Two further systems returned no testable result at all, so we
              hold no baseline for either and make no claim about either.
            </p>
            <p className="mt-3 max-w-none text-[.94rem] leading-[1.55] text-resolve-gap">
              That is one round, on one day, in one language, from one location. It is a count, not a rate, and
              one measurement is not a trend.
            </p>
          </div>
        </div>
      </CommercialSection>

      {/* ------------------------------------------------------------- §7 */}
      <CommercialSection tone="paper" mode="wide">
        <ChapterLabel>Who we work with</ChapterLabel>
        <Display>And who we <span style={{ color: 'var(--resolve-accent-deep)' }}> do not.</span></Display>
        <StateComparison
          aLabel="Where this works"
          aItems={FOR_WHOM}
          bLabel="Where it does not"
          bItems={NOT_FOR_WHOM}
        />
        <Note>
          We are based in Pune and work with businesses across India. No international or export claim is made
          here, because no evidence supporting one exists.
        </Note>
      </CommercialSection>

      {/* ------------------------------------------------------------- §8 */}
      <CommercialSection>
        <div className="max-w-[95%] max-[1024px]:max-w-none">
          <ChapterLabel>Where we are today</ChapterLabel>
          <Display>We are building the evidence base in public, and <span style={{ color: 'var(--resolve-accent-deep)' }}> it is thin.</span></Display>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            There are no published case studies, because we do not have permission to publish client results.
            There are no reviews or directory profiles yet. There is one round of AI measurement rather than a
            series, so we can describe a position and not a trend.
          </p>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            What exists is the method and two first-party measurements &mdash; one of which found nothing and one
            of which found our own failures. That is a smaller set of proof than most firms display, and every
            item in it can be checked, which is the trade we would rather make.
          </p>
        </div>
      </CommercialSection>

      <CommercialClose
        label="If that is the kind of supplier you want"
        heading={
          <>
            Tell us what is actually{' '}
            <span style={{ color: 'var(--resolve-accent-deep)' }}>happening.</span>
          </>
        }
        body={
          <>
            The most useful first message is what you are getting, what you are not, and what you can currently
            see.
          </>
        }
        action="Tell us what you're trying to fix" mode="centred" />
    </>
  );
}

