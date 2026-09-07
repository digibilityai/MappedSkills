import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Breadcrumb, CommercialSection, ChapterLabel, Body, Note, ProofLink } from '@/components/commercial/primitives';
import { CommercialHero } from '@/components/commercial/CommercialHero';
import { BoundaryBlock } from '@/components/commercial/BoundaryBlock';
import { CommercialClose } from '@/components/commercial/CommercialClose';

/**
 * SESSION 28 — PHASE F — `/social-media-ads`. THE MINIMAL VARIANT.
 *
 * ARCHETYPE 3, minimal variant (docs/16-ux/39_WIREFRAME_VARIANT_SOCIAL_MEDIA_ADS.md).
 * Frozen sequence — five moves, and only five:
 *
 *   confirm → bridge → work → CHANNEL-FIT BOUNDARY → convert
 *
 * ITS BREVITY IS THE DESIGN, NOT AN OMISSION. This is the shortest page in the
 * commercial set and it exists specifically to prove the system permits a short
 * page. The failure condition is written down and is checkable:
 *
 *   > "If `/social-media-ads` acquires a problem move, a measurement section,
 *   > an objections section or any figure, it becomes `/seo` and the
 *   > differentiation has collapsed."
 *   — 23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md §3
 *
 * So: NO problem section. NO measurement section. NO objections section. NO
 * figure of any kind. Moves 3, 7 and 8 are absorbed at sentence level into
 * moves 2, 4 and 5. Do not pad this page to match its siblings' length —
 * length parity is the tell.
 *
 * F1: D — NONE. Ruling C. Adding the run here would be applying F1 for
 * consistency, which the taxonomy prohibits, and inventing a page-specific
 * figure for parity would be visual novelty as a driver, which 05 §3 prohibits.
 *
 * COPY: docs/09-content-pages/copy/social-media-ads.md — COPY APPROVED, Gate 9,
 * DEC-014.
 *
 * WHAT THIS REPLACED: a 647-line page carrying "₹100Cr+", "6x ROAS", a "25%"
 * figure and a testimonial block sourced from `TESTIMONIALS` in lib/constants.
 * No permissioned testimonial exists. None of it migrates. There is no Meta
 * dashboard visual, no reach, impression, follower or engagement figure, and no
 * ad-performance metric anywhere below.
 */
export const metadata = createMetadata(
  'Paid Social, Judged on the Enquiries It Produces | MappedSkills',
  'We run paid social advertising, and we will tell you when it is the wrong channel for your business. Where it fits, it is one demand source inside the same measured outcome as everything else.',
  '/social-media-ads'
);

export default function SocialMediaAdsPage() {
  return (
    <>
      <Breadcrumb label="Paid social" path="/social-media-ads" />

      {/* ---- MOVE 1 + 2 — confirm, bridge ---------------------------------- */}
      <CommercialHero
        eyebrow="Paid social"
        title="Paid social, judged on the enquiries it produces."
        lede="We run paid social advertising, and we will tell you when it is the wrong channel for your business. For something a buyer takes weeks to decide on, it frequently is: search reaches people who have already decided they want it, and social interrupts people who have not."
        action="Tell us what you’re trying to fix"
      >
        <p>
          Where it genuinely fits, it is one demand source inside the same outcome as everything else here, and
          we are accountable for the enquiries it produces rather than for reach, clicks or engagement.
        </p>
      </CommercialHero>

      {/* ---- MOVE 4 — scope, minimal --------------------------------------- */}
      <CommercialSection mode="split">
        <ChapterLabel>What is in scope</ChapterLabel>
        <Body className="mt-[18px]">
          Audience definition, creative and message testing within the volume available, campaign structure,
          budget pacing, and the landing experience the click arrives on.
        </Body>
        <Body>
          The same conversion measurement as every other source: recorded server-side against the enquiry itself,
          and reported as enquiries rather than as engagement.
        </Body>
      </CommercialSection>

      {/* ---- MOVE 5 — the boundary: THE HONEST CHANNEL ANSWER --------------
             The page's most valuable content. It is not softened by placement,
             it sits above the midpoint, and it is never collapsible. */}
      <CommercialSection tone="paper">
        <BoundaryBlock
          label="When we would tell you not to do this"
          heading={
            <>
              Cheap clicks are{' '}
              <em className="not-italic" style={{ color: 'var(--resolve-accent-deep)' }}>
                not the same as enquiries.
              </em>
            </>
          }
          intro={
            <p className="m-0">
              When what you sell is a considered purchase with a long decision, a small addressable audience, and
              buyers who search for it by name. Our judgement in that situation is that the same budget works
              harder in search &mdash; social is reaching people at the moment they were thinking about something
              else.
            </p>
          }
        >
          <p>
            When there is no reliable way to measure what the spend produced. Paid social is the easiest channel
            to be flattered by, because reach and engagement figures look like progress and are not.
          </p>
          <p>
            We do not do social media management, content calendars, community management, or brand-building
            campaigns. Those are different jobs with a different unit of value.
          </p>
          <p>
            <b className="font-bold">We do not claim one channel outperforms another for your business.</b>{' '}
            Nothing has been measured on your account yet, and a claim made before that would be invented.
          </p>
        </BoundaryBlock>
        <ProofLink href="/how-it-works">The method, including what cannot be attributed</ProofLink>
      </CommercialSection>

      {/* ---- MOVE 9 — convert ---------------------------------------------- */}
      <CommercialSection>
        <Note className="mt-0">
          Related:{' '}
          <Link href="/google-ads" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            paid search as the alternative source
          </Link>{' '}
          &middot;{' '}
          <Link href="/services" className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            the whole system
          </Link>
          .
        </Note>
      </CommercialSection>

      <CommercialClose
        label="Tell us what you are running now"
        heading="What it costs, and what it brings."
        body={
          <>
            If paid social is already running, the useful first message is what it costs, what it brings, and
            whether any of it turns into an enquiry you could quote for. If the honest answer is that you cannot
            tell, that is the finding worth starting from.
          </>
        }
        action="Tell us what you’re trying to fix"
      />
    </>
  );
}
