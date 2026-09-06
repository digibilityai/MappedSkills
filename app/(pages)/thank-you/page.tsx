import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Body } from '@/components/commercial/primitives';
import { RouteHero } from '@/components/routes/primitives';

/**
 * SESSION 29 — PHASE G — `/thank-you`. ARCHETYPE 8 — post-conversion.
 *
 * SCOPE: PRESENTATION ONLY. `06_IMPLEMENTATION_SEQUENCE.md` gives Phase G the
 * presentation of this route and gives PHASE H1 "`/thank-you` wired as the
 * destination" and PHASE H2 the server-side conversion events.
 *
 * NO CONVERSION TRACKING IS IMPLEMENTED OR CHANGED HERE. There is no `gtag`,
 * no `dataLayer`, no `fbq`, no pixel and no view-based event anywhere in this
 * file. `05_FORMS_ANALYTICS.md` and H2's acceptance make both conversion events
 * SERVER-ONLY BY DEFINITION, and a conversion fired from a view of this page is
 * precisely the defect the taxonomy exists to remove: this page can be reached
 * by typing its address.
 *
 * THE ROUTE STAYS ORPHANED, AND THAT IS DELIBERATE. Nothing on the site links
 * or redirects here today, and Phase G adds no link and no redirect. H1's own
 * acceptance is that success "shows only after confirmed persistence" and never
 * on a client-side timer, so the route becomes reachable at the point a server
 * can confirm an enquiry was durably stored — not before. Phase G therefore
 * does not create a success path, does not shorten one, and does not simulate
 * one.
 *
 * `noindex, nofollow` IS PRESERVED, and the route stays out of the sitemap.
 * Neither is changed here — no robots, sitemap or indexation work is in Phase G
 * scope, and this route was already correct on both counts.
 *
 * §2 — WHAT HAPPENS NEXT — OWNER-BLOCKED, AND IT RENDERS NOTHING. Who reads
 * enquiries, what they do with them and what the first reply contains are owner
 * input; the same input blocks `/how-it-works` §9 and `/contact` §2, and all
 * three render nothing so that when it arrives all three say the same thing.
 *
 * NO RESPONSE TIME APPEARS ANYWHERE ON THIS PAGE. Not in hours, not in days,
 * not as "shortly", "soon" or "as quickly as we can". No response-time
 * distribution has ever been measured, and this is the page where an unmeasured
 * promise would be most tempting and least defensible. WHAT THIS REPLACED
 * carried "within 24 hours" twice — in the page metadata and in a four-step
 * process that was itself invented — plus links to three blog articles that do
 * not exist. None of it migrates.
 *
 * §3 — IF IT IS URGENT — the published phone number is OWNER-BLOCKED and the
 * section RENDERS NOTHING rather than carrying the production default.
 *
 * NO SECOND ASK. The conversion has happened. There is no CTA, no form, no
 * booking prompt, no upsell, no newsletter, no review request, no referral
 * request and no social prompt. Exactly ONE onward link renders, and it is a
 * route to something useful rather than another request. Zero motion, zero
 * figures, zero celebration language, zero exclamation marks, and nothing
 * implying the enquiry has been assessed.
 */
export const metadata: Metadata = {
  ...createMetadata(
    'Your Enquiry Has Arrived | MappedSkills',
    'Confirmation that an enquiry has been received.',
    '/thank-you'
  ),
  robots: 'noindex, nofollow',
};

export default function ThankYouPage() {
  return (
    <>
      <RouteHero
        eyebrow="Received"
        title={<>Your enquiry has arrived.</>}
        lede={<>We have it. Nothing else is needed from you.</>}
        size="quiet"
      />

      {/*
        §2 — WHAT HAPPENS NEXT — OWNER-BLOCKED, RENDERS NOTHING.
        §3 — IF IT IS URGENT — the phone number is OWNER-BLOCKED, RENDERS NOTHING.

        No headings, no containers, no placeholders. Also absent by rule and not
        merely unwritten: any promise of a meeting, any statement about whether
        the enquiry qualifies, any offer of an audit or diagnostic, and any
        description of a document that will be sent. None of those is decided,
        and inventing one here would set an expectation the first reply then has
        to break.
      */}

      {/* §4 — exactly one link, and it is the method. No grid, no "related
          pages", no second ask. H1 will set this from the page the enquiry came
          from; until an enquiry can carry that context, one useful default
          renders and no more. */}
      <CommercialSection>
        <ChapterLabel>While you wait</ChapterLabel>
        <Display>One thing worth reading.</Display>
        <Body>
          The method is published in full, including a section on what cannot be attributed and what will not
          be promised.{' '}
          <Link
            href="/how-it-works"
            className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
          >
            How we work, what we measure, and what we cannot tell you
          </Link>
          .
        </Body>
      </CommercialSection>
    </>
  );
}
