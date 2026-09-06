import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Body, Note, ProofLink } from '@/components/commercial/primitives';
import { RouteHero, EntryList } from '@/components/routes/primitives';
import { getCaseStudyListCards } from '@/lib/contentful/case-studies';

export const revalidate = 60;

/**
 * SESSION 29 — PHASE G — `/work`. ARCHETYPE 9 — index.
 *
 * ZERO CASE STUDIES EXIST AND NONE MAY BE INVENTED. `03_PAGE_ARCHETYPES.md`
 * §4.3 lists case studies under BLOCKED: "Zero published and NONE MAY BE
 * INVENTED." `PAGE_COPY_INDEX.md` §3 gives the route's launch content
 * requirement as "No content. No 'coming soon' placeholder."
 *
 * WHAT IS ABSENT, and was present on the 370-line page this replaces: fabricated
 * result cards carrying "300%+", "₹100Cr+", ROI, a 65% figure and ROAS; a
 * testimonials block, for which no permissioned testimonial exists; client
 * logos; industry filters over an empty set; and an Organization schema block
 * describing the firm as a performance marketing agency. There is no
 * "Client A", no anonymised result, no illustrative case, no placeholder card,
 * no skeleton row and no "coming soon".
 *
 * WHAT RENDERS INSTEAD IS NOT A PLACEHOLDER. It is the same move `/about` §8
 * and `/pricing` §7 make in approved copy: state where the firm actually is,
 * with the reason, and point at what genuinely can be checked. "There are no
 * published case studies, because we do not have permission to publish client
 * results" is a fact about today, not a promise about tomorrow — it names no
 * future date, implies no pipeline of unpublished wins and does not suggest
 * results exist and are merely being withheld from display.
 *
 * THE LIST IS DATA-DRIVEN AND STAYS THAT WAY. If a permissioned study is ever
 * published to the CMS, `EntryList` renders it and the standing statement gives
 * way to it. `EntryList` has no empty-slot rendering path at all, so it cannot
 * produce a placeholder row even if called with nothing.
 *
 * `noindex, nofollow` IS ADDED HERE, and this is the one route-metadata
 * correction Phase G makes. `06_IMPLEMENTATION_SEQUENCE.md` states the Phase G
 * scope for this route as "`/work` (**`noindex`, out of sitemap**)" and the
 * archetype record binds it "until ≥1 permissioned case study exists". The
 * route was indexable before this change.
 *
 * THE SITEMAP IS NOT TOUCHED. `/work` is still listed in `app/sitemap.ts` and
 * removing it is sitemap work, which is out of Phase G scope and is recorded as
 * a deferral rather than fixed. The route is `noindex` regardless of what the
 * sitemap says.
 *
 * F1: D — NONE. No figure on this route.
 */
export const metadata: Metadata = {
  ...createMetadata(
    'Work | MappedSkills',
    'What can be checked about this firm today, and why there are no published case studies.',
    '/work'
  ),
  robots: 'noindex, nofollow',
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudyListCards();

  return (
    <>
      <RouteHero
        eyebrow="Work"
        title={<>What we can show you, and what we cannot.</>}
        lede={
          <>
            There are no published case studies here, because we do not have permission to publish client
            results.
          </>
        }
      />

      {caseStudies.length > 0 ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Published</ChapterLabel>
          <Display>Work published with the client&rsquo;s permission.</Display>
          <EntryList
            entries={caseStudies.map((study) => ({
              href: study.href,
              title: study.title,
              meta: study.industry,
              summary: study.summary,
            }))}
          />
        </CommercialSection>
      ) : (
        <CommercialSection tone="paper">
          <ChapterLabel>Where this stands today</ChapterLabel>
          <Display>Permission, not results, is what is missing.</Display>
          <Body>
            A case study needs a client&rsquo;s written permission to publish their numbers, and we hold none.
            Writing around that &mdash; an anonymised client, an illustrative example, a result with the name
            removed &mdash; would be the first thing you should not trust us on, and it is what most of this
            category does with the same gap.
          </Body>
          <Note>
            This page carries no logo wall, no &ldquo;trusted by&rdquo; strip, no rating, no review count and
            no client count. None of those exists.
          </Note>
        </CommercialSection>
      )}

      {/* What CAN be checked. Two of the three items are the same first-party
          measurements /about lists, and they are stated with their full scope
          rather than linked, because neither research entry has been produced —
          `PAGE_COPY_INDEX.md` §1 rows 13 and 14 record both as NOT DRAFTED, and
          one of them is additionally blocked on a technical prerequisite. No
          link renders to a route that does not exist. */}
      <CommercialSection>
        <ChapterLabel>What can be checked instead</ChapterLabel>
        <Display>Three things, and one of them found our own failures.</Display>
        <div className="mt-[clamp(24px,3vw,40px)] border-t-2 border-resolve-ink">
          <div className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
            <h2 className="m-0 max-w-[44ch] font-heading text-[clamp(1.12rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
              The method, published in full
            </h2>
            <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-resolve-dim">
              What is measured at each point, what cannot be attributed and why, and what will not be promised.
              It is written so a stranger can check the claims.
            </p>
            <ProofLink href="/how-it-works">Read the method</ProofLink>
          </div>

          <div className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
            <h2 className="m-0 max-w-[44ch] font-heading text-[clamp(1.12rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
              Our own visibility in AI answers, measured and published
            </h2>
            <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-resolve-dim">
              Four AI assistants, asked for agencies like this one, 28 times, on one day, from Pune, in
              English, signed out. This business was named in none of them. Directory and listing sources
              appeared in 15 of those 28 runs, and two further systems returned no testable result at all.
            </p>
            <p className="mt-3 max-w-[62ch] text-[.94rem] leading-[1.55] text-resolve-gap">
              One round, one day, one language, one location. A count, not a rate.
            </p>
          </div>

          <div className="border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
            <h2 className="m-0 max-w-[44ch] font-heading text-[clamp(1.12rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
              Our own enquiry path, diagnosed in public
            </h2>
            <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-resolve-dim">
              We ran the five checks we publish on our own site before offering them to anyone. Four of the
              five failed. The contact form showed a success message and transmitted nothing, so every enquiry
              it received was lost while the visitor was told it had worked.{' '}
              <Link
                href="/problems/traffic-but-no-enquiries"
                className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
              >
                The checks themselves
              </Link>
              .
            </p>
          </div>
        </div>
      </CommercialSection>
    </>
  );
}
