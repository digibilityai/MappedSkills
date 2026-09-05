import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Breadcrumb, CommercialSection, ChapterLabel, Display, Body, Note, ProofLink } from '@/components/commercial/primitives';
import { CommercialHero } from '@/components/commercial/CommercialHero';
import { ScopeList } from '@/components/commercial/ScopeList';
import { BoundaryBlock } from '@/components/commercial/BoundaryBlock';
import { CommercialClose } from '@/components/commercial/CommercialClose';

/**
 * SESSION 28 — PHASE F — `/google-ads`.
 *
 * ARCHETYPE 3 — commercial / capability. Frozen sequence, and note where the
 * boundary sits: this is the EARLIEST boundary of the six capability routes,
 * and that position is the page's second move and its whole differentiation.
 *
 *   confirm → bridge → BOUNDARY → work → measurement → convert
 *
 * Moves 3, 7 and 8 are compressed on this page by design. Adding a problem
 * section, an evidence section or an objections section here would make it
 * `/seo` with a different noun.
 *
 * COPY AUTHORITY — READ CAREFULLY. copy/google-ads.md is the ONE Phase F route
 * whose copy record is **PARTIALLY BLOCKED**, not approved:
 * PAGE_COPY_INDEX.md §1 row 5, and the file's own header says "PROPOSED COPY —
 * NOT APPROVED". Two owner inputs are outstanding and BOTH are respected here
 * rather than filled:
 *
 *  1. BODY — how the management fee is separated from ad spend, and whether
 *     spend is billed through MappedSkills or paid directly to Google.
 *     `[OWNER INPUT REQUIRED]`. **IT RENDERS NOTHING.** No placeholder, no
 *     "typically", no "either way we can…", no illustrative arrangement. The
 *     sentence that survives it — "Whatever the arrangement, the two are stated
 *     as separate things" — is arrangement-independent approved copy and is the
 *     only thing that stands where the answer would go. A reader who arrives
 *     asking how the fee is separated does not get an answer here, and that is
 *     the honest state.
 *  2. FIGURE — F9, the fee/spend/measurement boundary diagram, is this page's
 *     assigned figure. Its entire content is the blocked fact, so **F9 RENDERS
 *     NOTHING** and no substitute figure is invented for it. Combined with
 *     F1 = D — NONE, this page carries NO FIGURE AT ALL.
 *
 * METADATA — DEC-007. The production title of this route carried
 * "300%+ ROI". It is gone and it does not migrate in any form. The title and
 * description below contain no ROI, no ROAS, no cost figure and no
 * "performance marketing" framing, which is a binding metadata constraint on
 * this route.
 *
 * WHAT THIS REPLACED: a 593-line page carrying "300%+ ROI", "₹100Cr+", "3x",
 * "6x" and "5x" ROAS multiples, a fabricated case-study card and two
 * guarantee statements. NONE of it is supported by anything in this repository
 * and none of it migrates.
 *
 * F1: D — NONE.
 */
export const metadata = createMetadata(
  'Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills',
  'Account structure, search terms, ad copy, bidding and budget — plus the page the click lands on, whether the enquiry completes, and whether you can see where it came from.',
  '/google-ads'
);

const SCOPE = [
  {
    lead: 'The account.',
    body: (
      <>
        Structure, search terms and negatives, match types, ad copy, extensions, bidding and budget pacing.
        Ordinary work, done properly.
      </>
    ),
  },
  {
    lead: 'Search-term review, continuously.',
    body: (
      <>
        Reading what people actually searched before they clicked, and excluding what should never have matched.
        It is not a setup task &mdash; irrelevant matches are where a budget quietly goes, and they accumulate.
      </>
    ),
  },
  {
    lead: 'The landing experience.',
    body: (
      <>
        Whether the page answers the search it was bought for. A campaign pointed at a page that does not is the
        most common way spend disappears without a trace.
      </>
    ),
  },
  {
    lead: 'The enquiry path.',
    body: <>The form, the booking, the phone route, and whether the enquiry actually arrives.</>,
  },
  {
    lead: 'Conversion measurement that is real.',
    body: (
      <>
        Conversions recorded server-side against the enquiry itself, not a thank-you page view or a button click.
        A conversion counted client-side inflates the number, and the account then optimises towards the
        inflation.
      </>
    ),
  },
  {
    lead: 'Reporting against enquiries.',
    body: (
      <>
        Enquiries and qualified enquiries by campaign, with what could not be attributed shown as such.
      </>
    ),
  },
];

export default function GoogleAdsPage() {
  return (
    <>
      <Breadcrumb label="Paid search" path="/google-ads" />

      {/* ---- MOVE 1 + 2 — confirm, bridge ---------------------------------- */}
      <CommercialHero
        eyebrow="Paid search"
        title="Google Ads, measured on the enquiries rather than the clicks."
        lede="We run paid search: account structure, keywords, negatives, ad copy, bidding and budget. We also take responsibility for what happens after the click — the page it lands on, whether the enquiry completes, and whether you can see where it came from."
        action="Tell us what you’re trying to fix"
      >
        <p>
          Paid is a way to reach demand that is active now. It is chosen because it fits your business, not
          because every client gets one.
        </p>
      </CommercialHero>

      <CommercialSection>
        <ChapterLabel>Where paid search sits in the work</ChapterLabel>
        <Body className="mt-[18px]">
          Paid search is one of several ways we reach buyers, and it earns its place for a particular business or
          it does not. What we are accountable for here is the same as everywhere else on this site: enquiries
          you can act on, measured.
        </Body>
        <Body>
          That difference is practical rather than philosophical. A supplier paid to manage spend improves the
          account. We are working to a number two steps further down the chain, which changes what gets attention
          on the week the account looks healthy and the enquiries have stopped.
        </Body>
      </CommercialSection>

      {/* ---- MOVE 5 — THE BOUNDARY, AS THE SECOND MOVE ---------------------
             The earliest boundary of the six capability routes. The fee/spend
             arrangement itself is OWNER-BLOCKED and renders nothing — see the
             file header. Nothing stands in its place. */}
      <CommercialSection tone="paper">
        <BoundaryBlock
          label="Spend, fee, and what we will not promise"
          heading={
            <>
              Whatever the arrangement, the two are{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                stated as separate things.
              </em>
            </>
          }
          intro={
            <p className="m-0">
              On every invoice and in every report &mdash; and the fee is never expressed as a percentage of
              spend in a way that rewards spending more.
            </p>
          }
          notPromised={[
            'a return on ad spend',
            'a cost per enquiry',
            'a cost per lead',
            'a number of enquiries per month',
          ]}
          closing="Those depend on your market, your price, your competitors and your own follow-up, none of which we control."
        >
          <p>
            What we will do instead is capture where you are starting from and report against it.
          </p>
          <p>
            We do not report ROI. Where you supply close data, we report the revenue your own system recorded
            against the enquiries, and state what we did not control.
          </p>
        </BoundaryBlock>
      </CommercialSection>

      {/* ---- MOVE 4 — what is in scope ------------------------------------- */}
      <CommercialSection>
        <ChapterLabel>What is in scope</ChapterLabel>
        <ScopeList items={SCOPE} />
      </CommercialSection>

      {/* ---- MOVE 6 — measurement, with its limit adjacent and open -------- */}
      <CommercialSection tone="paper">
        <ChapterLabel>What you will actually see</ChapterLabel>
        <Display className="max-w-[24ch]">
          Qualified enquiries, separated from{' '}
          <span style={{ color: 'var(--resolve-accent-deep)' }}>total enquiries.</span>
        </Display>
        <Body>
          Enquiries by campaign and by search term where the data allows it, against a starting point captured
          before we change anything. The two move differently, and the gap between them is usually the
          interesting part.
        </Body>
        <div className="mt-[clamp(20px,2.4vw,32px)] border-l-4 pl-[clamp(18px,2.2vw,30px)]" style={{ borderColor: 'var(--resolve-gap)' }}>
          <p className="m-0 max-w-[58ch] text-[1.02rem] leading-relaxed">
            Where an enquiry arrives by phone after someone saw an ad, we will usually not be able to attribute
            it, and we will show it as <b className="font-bold">unattributed</b> rather than assigning it to paid
            to make the campaign look better.
          </p>
        </div>
        <ProofLink href="/how-it-works">The method, including what cannot be attributed</ProofLink>

        <Note className="mt-8">
          Related:{' '}
          <Link href="/problems/traffic-but-no-enquiries" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            if the clicks arrive and the enquiries do not
          </Link>{' '}
          &middot;{' '}
          <Link href="/services" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the whole system
          </Link>{' '}
          &middot;{' '}
          <Link href="/lead-generation" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the enquiries themselves
          </Link>
          .
        </Note>
      </CommercialSection>

      {/* ---- MOVE 9 — convert ---------------------------------------------- */}
      <CommercialClose
        label="Tell us what the account is doing now"
        heading="What you spend, and what you get back."
        body={
          <>
            If you are already spending, the useful first message is what you spend, what you are getting, and
            whether you can currently tell which enquiries came from it. If you are not spending yet, tell us
            what you sell and what a single new customer is worth &mdash; that decides whether paid search makes
            sense at all.
          </>
        }
        action="Tell us what you’re trying to fix"
      />
    </>
  );
}
