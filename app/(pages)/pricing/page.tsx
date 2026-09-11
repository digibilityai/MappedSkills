import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Note, ProofLink } from '@/components/commercial/primitives';
import { RouteHero, StatedList } from '@/components/routes/primitives';
import { CommercialClose } from '@/components/commercial/CommercialClose';
import { FactorMatrix } from '@/components/routes/FactorMatrix';

/**
 * SESSION 29 — PHASE G — `/pricing`. ARCHETYPE 6.
 *
 * THE BLOCKED SECTION, STATED FIRST.
 *
 * §3 — "The bands" — is OWNER-BLOCKED IN FULL, and so is every figure that
 * would sit anywhere else on this page. `03_PAGE_ARCHETYPES.md` §4.3 lists
 * "`/pricing` — EVERY FIGURE" under BLOCKED, with the instruction "do not
 * invent a tier, a range, a 'from' price or a placeholder", and
 * `06_IMPLEMENTATION_SEQUENCE.md` Phase G names the route as "(every figure
 * blocked)". `DEC-019` confirms the blocker survived Gate 10 unresolved.
 *
 * §3 THEREFORE RENDERS NOTHING. No price. No band. No tier. No card. No
 * "starting from". No minimum. No comparison table. No plan recommendation. No
 * spend/fee split. No empty container, no greyed row, no "pricing available on
 * request" and no "coming soon". The approved copy is explicit that even the
 * figures currently displayed in production are NOT confirmed and must not be
 * carried forward as though they were — and the page that shipped before this
 * one displayed exactly those, alongside "300%+", "₹100Cr+" and ROAS claims.
 * None of it migrates.
 *
 * WHAT THIS COSTS THE PAGE, STATED HONESTLY. A reader arriving from a cost
 * query gets no number. That is the real consequence of the blocker, and it is
 * the honest state. The page still does its other job — what is actually being
 * bought, the horizon before the price, what genuinely moves the number, and
 * who this is not for — which is the part the approved copy calls "the most
 * useful section on the page" and "the part a quote will not tell you".
 *
 * F1: D — NONE (`22` §3). The page's own figure is F8, the factor matrix, and
 * a chain diagram would slow the opening of the most commercial page on the
 * site.
 *
 * PROHIBITED AND ABSENT: urgency, scarcity, countdowns, limited-time framing,
 * "only X slots", any ROI, payback or projected return, any calculator, and any
 * disparagement of cheaper suppliers.
 */
export const metadata = createMetadata(
  'What This Costs, and What Changes the Number | MappedSkills',
  'What you are buying, the horizon before anything changes, the six factors that actually move the number, and who this is not for. A real number comes from scope.',
  '/pricing'
);

/* §4 — F8. Six factors, each with the direction it pushes, in words. No figure,
   no multiplier, no band: every price on this page is owner-blocked and a
   matrix implying a magnitude would be inventing the blocked fact sideways. */
const FACTORS = [
  {
    factor: 'Scope',
    lower: <>One part of the chain, with the enquiry path already working.</>,
    higher: <>More of the chain covered, and the enquiry path being fixed as well as fed.</>,
  },
  {
    factor: 'How many demand sources',
    lower: <>One channel, chosen on merit.</>,
    higher: <>Three channels. Three is not automatically better than one.</>,
  },
  {
    factor: 'Site complexity',
    lower: <>A ten-page site, or a clean rebuild.</>,
    higher: <>A two-thousand-page site, or one carrying fifteen years of redirects.</>,
  },
  {
    factor: 'Existing measurement maturity',
    lower: <>Analytics, conversion tracking and source capture already work properly.</>,
    higher: <>None of it exists, so that comes first before anything else can be judged.</>,
  },
  {
    factor: 'Content requirements',
    lower: <>The pages that need to exist already do, and you write them.</>,
    higher: <>They do not exist, and we write them.</>,
  },
  {
    factor: 'How competitive your market is',
    lower: <>The specific searches your buyers use are not tightly held.</>,
    higher: <>They are held by competitors who started years earlier.</>,
  },
];

const NOT_FOR = [
  <>
    <span className="text-resolve-dim">
      Businesses where a single new customer is worth a small amount. The arithmetic does not work, and it is not
      close.
    </span>
  </>,
  <>
    <span className="text-resolve-dim">Purchases made on impulse or on price alone.</span>
  </>,
  <>
    <span className="text-resolve-dim">
      Markets where the demand does not exist yet and would have to be created. That is a different discipline
      and we are not it.
    </span>
  </>,
  <>
    <span className="text-resolve-dim">
      Businesses that cannot or will not grant measurement access. Without it, nothing we reported to you
      afterwards could be checked, and we would rather not take the work.
    </span>
  </>,
  <>
    <span className="text-resolve-dim">
      Anyone who needs the outcome guaranteed. That is a legitimate requirement and this is not where to get it.
    </span>
  </>,
];

export default function PricingPage() {
  return (
    <>
      {/* The hero cannot promise "prices are below", because they are not. The
          approved hero supporting copy opens "Prices are below, along with the
          things that actually move them" — that sentence rests on §3, which is
          blocked, so it does not render. What renders is the half of it that is
          true and load-bearing: the number depends far more on the situation
          than on a package name. Nothing is invented to replace the other half. */}
      <RouteHero
        eyebrow="Cost"
        title={<>What this costs, and <span style={{ color: 'var(--resolve-accent-deep)' }}> what changes the number.</span></>}
        lede={
          <> <p className='text-[clamp(1.06rem,1.35vw,1.28rem)]'>
            The number depends far more on your situation than on a package name, and knowing which way each
            factor pushes will tell you more than a quote will.</p>
          </>
        }
        action="Get an actual number"
        secondaryLabel="Book a time to talk" mode="editorial" />

      {/* ------------------------------------------------------------- §1 */}
      <CommercialSection tone="paper">
        <div className="max-w-[95%] max-[1024px]:max-w-none">
          <ChapterLabel>What you are buying</ChapterLabel>
          <Display>One piece of work with <span style={{ color: 'var(--resolve-accent-deep)' }}> an outcome attached.</span></Display>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            Not a list of services: reaching buyers who are already looking, making the route from that first
            visit to a sent enquiry work, and measuring the whole thing so the result can be checked rather than
            believed.
          </p>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            We are accountable up to the qualified enquiry. Where you supply close data, we report through to the
            revenue your own system recorded. We do not promise rankings, positions in AI answers, enquiry
            volumes, revenue or a return on spend.
          </p>
          <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
            The measurement is included. It is not a reporting add-on, and it is not optional &mdash; nothing we
            tell you afterwards is checkable without it.
          </p>
          <ProofLink href="/how-it-works">The method, in full</ProofLink>
        </div>
      </CommercialSection>

      {/* ------------------------------------------------------------- §2 */}
      <CommercialSection>
        <ChapterLabel>How long before anything changes</ChapterLabel>
        <Display>Organic search is a <span style={{ color: 'var(--resolve-accent-deep)' }}> 12-month-plus engine.</span></Display>
        <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
          That is stated here, before anything else, because a monthly figure with no horizon attached reads as
          a fee rather than as an investment &mdash; and because the answer changes whether this is right for
          you at all.
        </p>
        <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
          Some things move sooner. Paid search can produce enquiries in weeks where the demand exists. A broken
          enquiry path can often be fixed in days, and where that turns out to be the problem it is usually the
          least expensive thing we ever do for a client.
        </p>
        <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
          What does not move quickly is organic search against competitors who started years earlier.
        </p>
      </CommercialSection>

      {/*
        §3 — THE BANDS — OWNER-BLOCKED, AND IT RENDERS NOTHING.

        No heading, no container, no row, no "from" figure, no placeholder. §2
        above and §4 below read as consecutive chapters and there is no gap,
        marker or seam where a price would go. When the owner confirms the
        bands, the inclusions, the minimum and the spend/fee separation, this
        position takes them as a content change, not a redesign.
      */}

      {/* ------------------------------------------------------------- §4 */}
      <CommercialSection tone="paper" mode="wide">
        <ChapterLabel>What moves the number</ChapterLabel>
        <Display>This is the part a quote will <span style={{ color: 'var(--resolve-accent-deep)' }}> not tell you.</span></Display>
        <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
          Six factors, and which way each one pushes. Reading them will let you place yourself before you talk
          to anybody &mdash; which is most of what a price band is for.
        </p>

        <FactorMatrix factors={FACTORS} />

        <Note>
          There is no calculator here and there is not going to be one. A calculator on this page would produce
          an implied return, a payback period or a &ldquo;clients typically see&rdquo; figure, and we have
          measured none of those.
        </Note>
      </CommercialSection>

      {/* ------------------------------------------------------------- §5 */}
      <CommercialSection>
        <ChapterLabel>What this needs from you</ChapterLabel>
        <Display>Four things, and the work stops <span style={{ color: 'var(--resolve-accent-deep)' }}> without them.</span></Display>
        <p className="mt-4 max-w-none text-resolve-dim leading-relaxed">
          Access to your analytics, ad accounts and site. Decisions at a reasonable pace. Product knowledge,
          which nobody outside your business has. And the capacity to answer enquiries when they arrive &mdash;
          the work stops being worth anything at the point they are ignored.
        </p>
      </CommercialSection>

      {/* ------------------------------------------------------------- §6 */}
      <CommercialSection tone="paper">
        <ChapterLabel>Who this is not for</ChapterLabel>
        <Display>Five reasons to <span style={{ color: 'var(--resolve-accent-deep)' }}> not buy this.</span></Display>
        <StatedList items={NOT_FOR} />
        <Note>
          There is no revenue or headcount threshold here, deliberately. Size is not the test; what one
          customer is worth is.
        </Note>
      </CommercialSection>

      {/* ------------------------------------------------------------- §7
          The hardest objection. The approved copy closes this section with a
          sentence gated on `[DECISION REQUIRED — entry-offer model]`: whether a
          smaller entry engagement exists, and what it costs, is undecided and
          MUST NOT BE IMPLIED. That sentence renders nothing. The objection is
          answered in full without it. */}
      <CommercialSection>
        <ChapterLabel>A premium price with no case studies</ChapterLabel>
        <Display>It is a fair objection and <span style={{ color: 'var(--resolve-accent-deep)' }}> the one we get most.</span></Display>
        <div className="mt-[clamp(20px,2.4vw,32px)] max-w-none text-resolve-dim leading-relaxed [&>p+p]:mt-4">
          <p className="m-0">
            Cheaper suppliers in this market are real, and many of them do exactly what they say: manage an ad
            account, or produce an agreed number of pages or posts each month. If that is what a business
            needs, paying more here would be a poor decision.
          </p>
          <p>
            What is different here is what the fee covers and what it is measured against. The enquiry path and
            the measurement are inside the work rather than somebody else&rsquo;s problem, and the number we
            answer for is enquiries rather than deliverables.
          </p>
          <p>
            What we cannot offer you is a portfolio of client results, because we do not have permission to
            publish any. Writing around that would be the first thing you should not trust us on.
          </p>
          <p>
            What is available instead is checkable before you commit: the method is published in full,
            including what cannot be attributed. We measured our own visibility in AI answers and published the
            result, which was zero. We ran our own enquiry diagnostic on ourselves and published what it found,
            which was worse. And the accountability boundary is written down rather than negotiated later.
          </p>
          <p>If that is not enough, that is a reasonable conclusion to reach.</p>
        </div>
        <ProofLink href="/how-it-works">What is published, and what it commits us to</ProofLink>
      </CommercialSection>

      {/* ------------------------------------------------------------- §8 */}
      <CommercialClose
        label="Get an actual number"
        heading={
          <>
            A real number comes from{' '}
            <span style={{ color: 'var(--resolve-accent-deep)' }}>scope.</span>
          </>
        }
        body={
          <>
            Scope comes from a conversation about what is currently happening &mdash; which is not an evasion,
            it is the reason two businesses of the same size get different quotes from anyone honest. Booking a
            time is usually faster than writing it out.
          </>
        }
        action="Tell us what you're trying to fix" mode="centred" />
    </>
  );
}

