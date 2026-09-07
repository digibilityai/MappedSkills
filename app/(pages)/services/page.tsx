import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CommercialHero } from '@/components/commercial/CommercialHero';
import { CommercialSection, ChapterLabel, Display, Body, Note, ProofLink, Mark } from '@/components/commercial/primitives';
import { BoundaryBlock } from '@/components/commercial/BoundaryBlock';
import { ScopeList } from '@/components/commercial/ScopeList';
import { CommercialClose } from '@/components/commercial/CommercialClose';
import { ChainFull } from '@/components/commercial/ChainFigure';

/**
 * SESSION 28 — PHASE F — `/services`, the proposition hub.
 *
 * ARCHETYPE 2 — proposition hub (03_PAGE_ARCHETYPES.md §1). This route does NOT
 * run the nine commercial moves: it has its own approved nine-block sequence
 * (docs/16-ux/42_WIREFRAME_VARIANT_SERVICES.md), and the blocks below map to it
 * one for one, in order, with none added, dropped or reordered.
 *
 * COPY: docs/09-content-pages/copy/services.md — COPY APPROVED, Gate 9,
 * DEC-014, with the Gate 9A DEC-015 correction to the hero already applied in
 * that file. Used verbatim; the only changes are the production-format ones
 * §7 of the session brief permits — headings, line breaks and link labels.
 *
 * F1: A — FULL, WITH THE JOINS MARKED. The joins are the page's argument, so a
 * figure of three tidy stages with no seams would state the opposite of the
 * page (22 §3).
 *
 * NOT A SERVICES GRID. There is no card grid, no icon per capability and no
 * equal-weight tile anywhere below: block 4 routes by CONTRIBUTION, in the
 * order the chain runs, as hairline rows. A service menu is the named failure
 * mode for this page.
 *
 * WHAT THIS REPLACED: a 671-line page carrying "300%+ ROI", "₹100Cr+",
 * fabricated ROAS multiples and a 65% figure, none of which is supported by
 * anything in this repository. None of it migrates.
 *
 * SEQUENCE DEPENDENCY, recorded not resolved: this page's PROOF link is
 * `/how-it-works`, whose §2 stage content is OWNER-BLOCKED. Phase F ships the
 * weaker onward route the plan explicitly permits (03_PAGE_ARCHETYPES.md §4.1)
 * rather than inventing the method.
 */
export const metadata = createMetadata(
  'What We Do: One Outcome, Three Connected Parts | MappedSkills',
  'Capture the demand, turn it into enquiries, and measure the whole chain. Three connected parts, the joins between them owned by one supplier, and a qualified enquiry as the unit.',
  '/services'
);

/* Block 2 — the three connected parts. The joins between them are the argument,
   which is why they are named again beneath the figure rather than left to it. */
const PARTS = [
  {
    lead: 'Capture the demand.',
    body: (
      <>
        Reach buyers who are already looking for what you sell. Organic search is the primary route because it
        compounds and because the intent is already there. Paid search buys access to the same demand
        immediately. Paid social reaches demand that search cannot yet reach, when the channel genuinely fits
        &mdash; and often it does not.
      </>
    ),
  },
  {
    lead: 'Turn it into enquiries.',
    body: (
      <>
        A visit becomes an enquiry only if the page answers the question the visitor arrived with, the enquiry
        path completes on the device they are holding, and the enquiry actually arrives somewhere a person
        reads. Each of those is a separate failure point, and each has a different fix.
      </>
    ),
  },
  {
    lead: 'Measure the whole chain.',
    body: (
      <>
        Where an enquiry came from, what it landed on, what it was about, whether it counts &mdash; recorded at
        the moment it is made, not reconstructed afterwards.
      </>
    ),
  },
];

/* Block 4 — capability routing, by contribution, in the order the chain runs.
   AI search gets ONE paragraph: no section, no score, no dedicated block. */
const CAPTURE = [
  {
    href: '/seo',
    name: 'Organic search (SEO)',
    body: 'the primary acquisition capability, and the slowest. Technical foundations, structure, and content aimed at commercial and problem-led searches. A 12-month-plus horizon, stated before you commit rather than after.',
  },
  {
    href: '/google-ads',
    name: 'Google Ads',
    body: 'access to demand that is active now, chosen on merit for your business, on the same measurement layer as everything else. Spend and fee are separate things.',
  },
  {
    href: '/social-media-ads',
    name: 'Paid social',
    body: 'an optional additional source, judged on qualified enquiries like every other. For a considered purchase it is frequently the wrong channel.',
  },
  {
    href: '/ai-seo',
    name: 'AI search',
    body: 'whether your business appears when a buyer asks an assistant for a supplier like you. On the evidence we have, that is mostly a question of which sources those answers are assembled from, much of which sits off your own site. Measured per system, with the run counts published, and guaranteed by nobody.',
  },
];

const CONVERT = [
  {
    href: '/conversion-optimization',
    name: 'The enquiry path',
    body: 'the route from arrival to a received enquiry: the page, the form, the booking, the delivery. Diagnosed before it is optimised, because in at least two of the four places demand gets lost, page-level conversion work is the wrong fix.',
  },
  {
    href: '/lead-generation',
    name: 'Enquiry generation',
    body: 'the outcome named: more of the right enquiries, with a published definition of what "right" means.',
  },
];

const MEASURE = [
  {
    href: '/how-it-works',
    name: 'Measurement',
    body: 'analytics, event instrumentation, enquiry-source capture and attribution. It has no page and it is not sold separately, because it is the precondition for everything above being checkable.',
  },
];

function RoutingGroup({
  title,
  items,
}: {
  title: string;
  items: { href: string; name: string; body: string }[];
}) {
  return (
    <div className="mt-[clamp(28px,3.4vw,48px)]">
      <h3 className="m-0 flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em]">
        <Mark state="owned" size={13} />
        {title}
      </h3>
      <ul className="m-0 mt-4 list-none border-t-2 border-resolve-ink p-0">
        {items.map((item) => (
          <li key={item.href} className="border-b border-resolve-line">
            <Link
              href={item.href}
              className="grid grid-cols-1 gap-x-[clamp(20px,3vw,52px)] gap-y-2 py-[clamp(16px,2vw,24px)] text-resolve-ink no-underline min-[900px]:grid-cols-[minmax(0,24ch)_1fr]"
            >
              <span className="font-heading text-[clamp(1.08rem,1.7vw,1.4rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                {item.name}
                <span aria-hidden="true" style={{ color: 'var(--resolve-accent-dark)' }}>
                  {' '}
                  &rarr;
                </span>
              </span>
              <span className="max-w-[58ch] text-[1rem] leading-relaxed text-resolve-dim">{item.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* ---- BLOCK 1 — the outcome, as the page's subject ---------------- */}
      <CommercialHero
        eyebrow="What we do"
        title="One outcome: enquiries you can act on."
        lede="There is buyer demand for what you sell, and some of it never reaches you. Getting them in front of you, getting the enquiry to actually complete, and being able to see which part worked are three different skills, usually bought from three different suppliers."
        action="Tell us what you’re trying to fix"
      >
        <p>Here they are connected, the joins between them are ours, and the enquiry at the end is what we answer for.</p>
      </CommercialHero>

      <CommercialSection mode="split">
        <ChapterLabel>What the whole system is for</ChapterLabel>
        <Display>
          The unit is a{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>qualified enquiry.</span>
        </Display>
        <Body>
          Real, reachable, from a business with a stated need, and not a duplicate.{' '}
          <Link href="/lead-generation" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            What counts as one
          </Link>{' '}
          is published rather than decided case by case.
        </Body>
        <Body>
          Everything below exists to produce more of those. Rankings, sessions, impressions and click-through
          rates are how the work is diagnosed, not what it is for.
        </Body>
      </CommercialSection>

      {/* ---- BLOCK 2 — three connected parts, the joins as the subject ---- */}
      <CommercialSection tone="paper" mode="wide">
        <ChapterLabel>Three parts, and the joins between them</ChapterLabel>
        <Display className="max-w-[20ch]">
          They are different skills.{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>The joins decide the result.</span>
        </Display>

        <ScopeList items={PARTS} />

        <Body className="mt-[clamp(24px,3vw,40px)]">
          They are described separately because they are different skills. What decides the outcome is
          frequently the joins between them: between the search work and the page it feeds, between the page and
          the form, between the form and wherever the enquiry is supposed to land, and between all of that and
          the measurement.{' '}
          <b className="font-bold">Split across suppliers, those joins can belong to nobody.</b>
        </Body>

        <ChainFull />

        <Note>
          Parts can be scoped. If you want the search work alone, say so and we will tell you honestly whether it
          is likely to change the number you care about &mdash; because fixing one part while another is broken
          usually does not.
        </Note>
      </CommercialSection>

      {/* ---- BLOCK 3 — the accountability boundary ------------------------ */}
      <CommercialSection>
        <BoundaryBlock
          label="What we are accountable for, and where that stops"
          heading={
            <>
              We are accountable up to{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                the qualified enquiry.
              </em>
            </>
          }
          intro={<p className="m-0">That is the number we work to and the number we report.</p>}
          notPromised={[
            'rankings',
            'positions in AI answers',
            'enquiry volumes',
            'revenue',
            'a return on spend',
          ]}
          closing="None of that is ours to control."
        >
          <p>
            Where you supply your close data, we report through to the opportunities and revenue your own system
            recorded &mdash; as your numbers, with what we controlled and what we did not stated beside them. We
            do not control your price, your product, your capacity, how quickly you follow up, or whether you win
            the work.
          </p>
          <p>
            Some enquiries arrive with no usable trail: direct visits, phone calls, a recommendation from a
            customer. We record those as unattributed rather than assigning them to a channel, and an enquiry we
            could not trace still counts as an enquiry.
          </p>
        </BoundaryBlock>
        <ProofLink href="/how-it-works">See what can and cannot be attributed</ProofLink>
      </CommercialSection>

      {/* ---- BLOCK 4 — where each capability enters the chain -------------- */}
      <CommercialSection tone="paper" mode="statement">
        <ChapterLabel>Where each discipline comes in</ChapterLabel>
        <Body className="mt-[18px]">Named by what each contributes, in the order the chain runs.</Body>
        <RoutingGroup title="Capture" items={CAPTURE} />
        <RoutingGroup title="Convert" items={CONVERT} />
        <RoutingGroup title="Measure" items={MEASURE} />
      </CommercialSection>

      {/* ---- BLOCK 5 — selective expansion, and BLOCK 6 — what we do not do */}
      <CommercialSection mode="split">
        <ChapterLabel>What can be added later</ChapterLabel>
        <Body className="mt-[18px]">
          When the enquiries are arriving and the constraint moves downstream, there is a limited amount we will
          take on after the enquiry exists: routing it to the right person, acknowledging it, and reminding both
          sides about a booked call.
        </Body>
        <Body>
          <b className="font-bold">That is the boundary.</b> We do not implement CRMs, build lifecycle programmes
          or run sales operations.
        </Body>

        <div className="mt-[clamp(38px,4.6vw,72px)] border-t border-resolve-line pt-[clamp(38px,4.6vw,72px)]">
          <ChapterLabel>What we do not do</ChapterLabel>
          <Body className="mt-[18px]">
            CRM implementation and migration. Revenue operations and sales-operations consulting. Lifecycle and
            nurture programmes. Standalone web development. Ecommerce merchandising and ecommerce conversion.
            Social media management, brand building and PR.
          </Body>
          <Body>
            Some of those are good work. They are not this, and taking them on would make us worse at the thing
            we are accountable for.
          </Body>
        </div>
      </CommercialSection>

      {/* ---- BLOCK 7 — scope honesty on testing ---------------------------- */}
      <CommercialSection tone="paper" mode="split">
        <ChapterLabel>What we can and cannot test</ChapterLabel>
        <Display className="max-w-[22ch]">
          Below a real threshold of traffic and enquiries, a test cannot reach significance.
        </Display>
        <Body>
          That is most businesses in this market. Anyone promising you A/B testing at that volume is promising a
          result the arithmetic cannot produce.
        </Body>
        <Body>
          Below the threshold, the work is research, diagnosis and design: we find what is wrong, we change it,
          and we observe what happens afterwards, saying plainly that observation is what it is. Above the
          threshold, we test properly and report the significance.
        </Body>
      </CommercialSection>

      {/* ---- BLOCK 8 — fit -------------------------------------------------- */}
      <CommercialSection mode="split">
        <ChapterLabel>Who this is for</ChapterLabel>
        <div className="mt-[clamp(24px,3vw,44px)] grid grid-cols-1 gap-[clamp(26px,3.4vw,60px)] min-[900px]:grid-cols-2">
          <div className="border-t-2 border-resolve-ink pt-5">
            <h3 className="m-0 flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em]">
              <Mark state="owned" size={14} />
              This works where
            </h3>
            <p className="mt-4 max-w-[46ch] text-[clamp(1.02rem,1.2vw,1.16rem)] leading-relaxed">
              The customer takes time to decide and one good enquiry is worth real money. Demand for what you
              sell already exists or can reasonably be reached. You can act on enquiries when they arrive, and
              you are willing to grant the measurement access that makes the result checkable.
            </p>
          </div>
          <div className="border-t-2 pt-5" style={{ borderColor: 'var(--resolve-gap)' }}>
            <h3 className="m-0 flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em] text-resolve-dim">
              <Mark state="open" size={14} />
              It is a poor fit where
            </h3>
            <p className="mt-4 max-w-[46ch] text-[clamp(1.02rem,1.2vw,1.16rem)] leading-relaxed text-resolve-dim">
              Demand has to be created from nothing, the purchase is impulse or price-only, or a guaranteed
              outcome is a requirement.
            </p>
          </div>
        </div>
        <ProofLink href="/pricing">What this costs, and what moves the number</ProofLink>
      </CommercialSection>

      {/* ---- BLOCK 9 — action ----------------------------------------------- */}
      <CommercialClose
        label="Start with the situation, not the service"
        heading="Tell us what is actually happening."
        body={
          <>
            The enquiries you are getting, the ones you are not, and what you can currently see. That is a more
            useful first message than a list of services, and it is what the first conversation will be about
            anyway.
          </>
        }
        action="Tell us what you’re trying to fix"
      />
    </>
  );
}
