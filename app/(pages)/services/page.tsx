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
  'Digital Marketing Services for Qualified Enquiries | MappedSkills',
  'SEO, Google Ads, paid social, conversion optimisation and measurement connected around one goal: generating and understanding qualified enquiries.',
  '/services'
);

/* Block 2 — the three stages, at equal weight. The longer explanation of how
   they connect (and why splitting them across suppliers breaks the joins)
   follows underneath, in Body copy, rather than inside this list. */
const PARTS = [
  { lead: 'Capture', body: 'Get found by buyers already looking.' },
  { lead: 'Convert', body: 'Turn more relevant visits into enquiries.' },
  { lead: 'Measure', body: 'See what created the enquiry and where the path breaks.' },
];

/* Block 4 — capability routing, by contribution, in the order the chain runs.
   AI search gets ONE paragraph: no section, no score, no dedicated block. */
const CAPTURE = [
  {
    href: '/seo',
    name: 'SEO',
    body: 'Build long-term search visibility for the products, services and problems your buyers are already searching for. SEO compounds over time and is typically a longer-term acquisition channel.',
  },
  {
    href: '/google-ads',
    name: 'Google Ads',
    body: 'Reach buyers searching right now and send high-intent demand to the most relevant page.',
  },
  {
    href: '/social-media-ads',
    name: 'Paid social',
    body: 'Reach relevant audiences where paid social makes commercial sense, rather than using the channel simply because it is available.',
  },
  {
    href: '/ai-seo',
    name: 'AI search visibility',
    body: 'Improve the signals and sources that can help your business become discoverable when buyers use AI-assisted search and recommendation tools.',
  },
];

const CONVERT = [
  {
    href: '/conversion-optimization',
    name: 'Conversion optimisation',
    body: 'Identify and reduce the friction that stops interested visitors from taking the next step.',
  },
  {
    href: '/lead-generation',
    name: 'Lead generation',
    body: 'Build a clear route from buyer interest to a genuine enquiry, including landing pages, forms and enquiry journeys where required.',
  },
];

const MEASURE = [
  {
    href: '/how-it-works',
    name: 'Measurement',
    body: 'Connect analytics, enquiry tracking and attribution so you can see where enquiries came from and where potential buyers are being lost.',
  },
];

function RoutingGroup({
  title,
  items,
}: {
  title: string;
  items: { href?: string; name: string; body: string }[];
}) {
  return (
    <div className="mt-[clamp(28px,3.4vw,48px)]">
      <h3 className="m-0 flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em]">
        <Mark state="owned" size={13} />
        {title}
      </h3>
      <ul className="m-0 mt-4 list-none border-t-2 border-resolve-ink p-0">
        {items.map((item) => {
          const row = (
            <>
              <span className="font-heading text-[clamp(1.08rem,1.7vw,1.4rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                {item.name}
                {item.href && (
                  <span aria-hidden="true" style={{ color: 'var(--resolve-accent-dark)' }}>
                    {' '}
                    &rarr;
                  </span>
                )}
              </span>
              <span className="max-w-[58ch] text-[1rem] leading-relaxed text-resolve-dim">{item.body}</span>
            </>
          );
          const rowClass =
            'grid grid-cols-1 gap-x-[clamp(20px,3vw,52px)] gap-y-2 py-[clamp(16px,2vw,24px)] text-resolve-ink no-underline min-[900px]:grid-cols-[minmax(0,24ch)_1fr]';
          return (
            <li key={item.name} className="border-b border-resolve-line">
              {item.href ? (
                <Link href={item.href} className={rowClass}>
                  {row}
                </Link>
              ) : (
                <div className={rowClass}>{row}</div>
              )}
            </li>
          );
        })}
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
        title=""
        lede=""
        action="Tell us what you’re trying to fix"
        mode="editorial"
      >
        <h1 className='m-0 mt-[clamp(14px,1.8vw,22px)] font-heading text-[clamp(2rem,4.6vw,3.9rem)] font-extrabold leading-[0.98] tracking-[-0.038em] max-w-none text-black'>One system. One commercial outcome: <span style={{ color: 'var(--resolve-accent-deep)' }}> qualified enquiries.</span></h1>
        <p className='text-[clamp(1.06rem,1.35vw,1.28rem)]'>Buyers have to find you, your website has to give them a reason to enquire, and you need to know what created the enquiry.</p>
        <p className='text-[clamp(1.06rem,1.35vw,1.28rem)]'>MappedSkills connects those three parts through Capture, Convert and Measure.</p>
        <p className='text-[clamp(1.06rem,1.35vw,1.28rem)]'>
          SEO, Google Ads, paid social, conversion optimisation and measurement are the tools. The goal is not more activity. It is more qualified enquiries with a clearer path to them.
        </p>
      </CommercialHero>

      <CommercialSection>
        <ChapterLabel>What counts as success</ChapterLabel>
        <Display>
          A qualified{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}> enquiry.</span>
        </Display>
        <Body className="max-w-none">
          An enquiry from a real, reachable business or buyer with a stated need, recorded once rather than
          counted repeatedly.
        </Body>
        <Body className="max-w-none">
          We publish{' '}
          <Link href="/lead-generation" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            what counts as a qualified enquiry
          </Link>{' '}
          before measurement begins. Rankings, sessions, impressions and clicks help diagnose the journey, but
          they are not the final outcome.
        </Body>
      </CommercialSection>

      {/* ---- BLOCK 2 — three stages, equal weight, then the joins ---------- */}
      <CommercialSection tone="paper">
        <ChapterLabel>Capture, convert, measure</ChapterLabel>
        <Display className="max-w-none">
          Three stages.{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>One path to an enquiry.</span>
        </Display>

        <ScopeList items={PARTS} />

        <Body className="mt-[clamp(24px,3vw,40px)] max-w-none">
          Most businesses buy these capabilities separately. SEO or ads bring the visitor. The website converts
          the visitor. Measurement shows what created the enquiry.
        </Body>
        <Body className="max-w-none">
          When those parts are disconnected, each supplier can optimise its own work while the enquiry path
          still breaks. MappedSkills connects the whole journey.
        </Body>
 
        <ChainFull />

        <Note className="max-w-none">
          Parts can be scoped. If you want the search work alone, say so and we will tell you honestly whether
          it is likely to change the number you care about, because fixing one part while another is broken
          usually does not.
        </Note>
      </CommercialSection>

      {/* ---- BLOCK 3 — the accountability boundary ------------------------ */}
      <CommercialSection>
        <BoundaryBlock
          label="What we take responsibility for"
          heading={
            <>
              Whatever the arrangement, the two are{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                a qualified enquiry.
              </em>
            </>
          }
          intro={
            <p className="m-0">
              We work on whether the right buyers find you, whether your website helps them take the next step,
              and whether the enquiry can be traced back to what worked.
            </p>
          }
          notPromised={[
            'a specific Google ranking',
            'inclusion in a particular AI answer',
            'a fixed number of enquiries',
            'revenue',
            'a return on ad spend',
          ]}
          closing="These depend on factors outside marketing alone. We measure what we can influence and make the limits visible."
        >
          <p>
            If you share opportunity and revenue data from your sales system, we can report it alongside
            marketing data. We do not claim control over pricing, sales follow-up, capacity or whether the
            business wins the deal.
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
      <CommercialSection tone="paper">
        <ChapterLabel>Where each service fits</ChapterLabel>
        <Display className="max-w-none">Named by what each contributes, <span style={{ color: 'var(--resolve-accent-deep)' }}> in the order the chain runs.</span></Display>
        <RoutingGroup title="Reach buyers already looking for what you sell" items={CAPTURE} />
        <RoutingGroup title="Turn more relevant visits into enquiries" items={CONVERT} />
        <RoutingGroup title="See what worked and where the path broke" items={MEASURE} />
      </CommercialSection>

      {/* ---- BLOCK 5 — selective expansion, and BLOCK 6 — what we do not do */}
      <CommercialSection>
        <ChapterLabel>Beyond the enquiry</ChapterLabel>
        <Display>The sales process <span style={{ color: 'var(--resolve-accent-deep)' }}> remains yours.</span></Display>
        <Body>
          Where useful, we can help connect enquiry routing and basic follow-up mechanics. We do not implement
          CRMs, run sales operations or manage full lifecycle programmes.
        </Body>

        <div className="mt-[clamp(38px,4.6vw,72px)] border-t border-resolve-line pt-[clamp(38px,4.6vw,72px)]">
          <ChapterLabel>What we don&rsquo;t do</ChapterLabel>
          <Body className="mt-[18px]">
            MappedSkills is not a general-purpose marketing agency. We do not offer standalone brand building,
            PR, social media management, ecommerce merchandising, CRM implementation or sales-operations
            consulting.
          </Body>
          <Body>We stay focused on the path from buyer demand to qualified enquiry.</Body>
        </div>
      </CommercialSection>

      {/* ---- BLOCK 7 — scope honesty on testing ---------------------------- */}
      <CommercialSection tone="paper">
        <ChapterLabel>How we test</ChapterLabel>
        <Display className="max-w-none">
          We only call something a test when <span style={{ color: 'var(--resolve-accent-deep)' }}> the numbers can support it.</span>
        </Display>
        <Body>
          Smaller websites often do not have enough traffic or enquiries for statistically reliable A/B testing.
          In those cases, we use research, diagnosis and observed behaviour rather than pretending the result is
          statistically proven.
        </Body>
        <ProofLink href="/how-it-works">See how we test</ProofLink>
      </CommercialSection>

      {/* ---- BLOCK 8 — fit -------------------------------------------------- */}
      <CommercialSection>
        <Display className="max-w-none">Who this is <span style={{ color: 'var(--resolve-accent-deep)' }}>for</span></Display>
        <div className="mt-[clamp(24px,3vw,44px)] grid grid-cols-1 gap-[clamp(26px,3.4vw,60px)] min-[900px]:grid-cols-2">
          <div className="border-t-2 border-resolve-ink pt-5">
            <h3 className="m-0 flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em]">
              <Mark state="owned" size={14} />
              This works best when
            </h3>
            <p className="mt-4 max-w-[46ch] text-[clamp(1.02rem,1.2vw,1.16rem)] leading-relaxed">
              Customers take time to decide, each qualified enquiry has meaningful commercial value, demand
              already exists or can reasonably be reached, and you are willing to measure the journey properly.
            </p>
          </div>
          <div className="border-t-2 pt-5" style={{ borderColor: 'var(--resolve-gap)' }}>
            <h3 className="m-0 flex items-center gap-3 text-[.84rem] font-bold uppercase leading-[1.3] tracking-[0.16em] text-resolve-dim">
              <Mark state="open" size={14} />
              It may not be the right fit when
            </h3>
            <p className="mt-4 max-w-[46ch] text-[clamp(1.02rem,1.2vw,1.16rem)] leading-relaxed text-resolve-dim">
              Customers buy mainly on impulse or price, demand first has to be created from scratch, or you
              require guaranteed marketing outcomes.
            </p>
          </div>
        </div>
        <ProofLink href="/pricing">What this costs, and what moves the number</ProofLink>
      </CommercialSection>

      {/* ---- BLOCK 9 — action ----------------------------------------------- */}
      <CommercialClose
        label="Start with the problem"
        heading="Tell us where the enquiry path is breaking."
        body={
          <>
            You do not need to diagnose the channel first. Tell us what you are seeing: enquiries you are
            getting, enquiries you are not, and what you can currently measure.
          </>
        }
        action="Tell us what you’re trying to fix"
        mode="centred"
      />
    </>
  );
}
