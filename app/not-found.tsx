import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Body } from '@/components/commercial/primitives';
import { RouteHero, EntryList } from '@/components/routes/primitives';

/**
 * SESSION 29 — PHASE G — `not-found`. ARCHETYPE 12 — legal / system.
 *
 * THE DEFECT THIS FIXES, which is the reason the route is in Phase G scope at
 * all: `03_PAGE_ARCHETYPES.md` §1 archetype 12 records that "/404 currently
 * hard-codes three blog slugs that all 404 — links must be generated from live
 * routes", and `PAGE_COPY_INDEX.md` §3 repeats it: the page "must stop
 * hard-coding three blog slugs that currently return 404". A recovery page
 * whose recovery links are themselves broken is the one page on a site where
 * that failure is unambiguously a bug.
 *
 * The three slugs — `how-to-calculate-google-ads-roi`,
 * `facebook-ads-not-working` and `seo-vs-ppc` — are removed and nothing
 * replaces them. `/blog` currently has no articles at all, so there is no
 * article to link to and none is invented.
 *
 * EVERY LINK BELOW IS A ROUTE THAT EXISTS IN THIS REPOSITORY, and the list is
 * built from one array so a route added or removed later is a one-line change
 * in one place rather than three lists to reconcile. `/work` and `/blog` are
 * deliberately absent: both are `noindex` or empty of content today, and
 * sending someone recovering from a broken URL to a page with nothing on it is
 * the same failure in a different place.
 *
 * ALSO REMOVED, and not replaced: "Schedule Free Strategy Call" in two places.
 * "Free" is blocked on the entry-offer decision — no candidate may say free
 * until it is recorded — and the booking surface does not work. The gradient
 * washes, the blurred accent orbs, the hover-lift card grid, the shadow
 * transitions and the six lucide icons are gone with them; none of that is in
 * the Resolve system.
 *
 * `noindex, nofollow` is preserved. F1: D — NONE.
 */
export const metadata: Metadata = {
  ...createMetadata(
    'Page Not Found | MappedSkills',
    'The page you were looking for is not here. These are the pages that are.',
    '/404'
  ),
  robots: 'noindex, nofollow',
};

/* Live routes only. Each one is a directory under `app/` in this repository. */
const RECOVERY = [
  {
    href: '/services',
    title: 'What we do',
    meta: 'Proposition',
    summary: 'The whole chain from demand to a recorded enquiry, and where the joins are.',
  },
  {
    href: '/how-it-works',
    title: 'How we work, what we measure, and what we cannot tell you',
    meta: 'Method',
    summary: 'The published method, written so a stranger can check the claims.',
  },
  {
    href: '/problems/traffic-but-no-enquiries',
    title: 'Traffic but no enquiries: which of four things is happening',
    meta: 'Diagnostic',
    summary: 'Five checks you can run yourself today, with no sign-up and no tool.',
  },
  {
    href: '/pricing',
    title: 'What this costs, and what changes the number',
    meta: 'Cost',
    summary: 'The six factors that move it, and which way each one pushes.',
  },
  {
    href: '/faq',
    title: 'Questions we get asked, answered plainly',
    meta: 'Questions',
    summary: 'Including the ones with answers that lose us work.',
  },
  {
    href: '/about',
    title: 'Who we are, and what we can actually show you',
    meta: 'The firm',
    summary: 'An honest account of where the firm is today, and it is a short one.',
  },
];

const CAPABILITIES = [
  { href: '/seo', title: 'Search', meta: 'Capability', summary: 'Being found by buyers already looking.' },
  { href: '/ai-seo', title: 'AI search', meta: 'Capability', summary: 'What those answers are actually assembled from.' },
  { href: '/google-ads', title: 'Google Ads', meta: 'Capability', summary: 'Paid search as a demand source, on the same measurement layer.' },
  { href: '/social-media-ads', title: 'Social ads', meta: 'Capability', summary: 'Where the channel fits, and where it does not.' },
  { href: '/lead-generation', title: 'Lead generation', meta: 'Capability', summary: 'What counts as a qualified enquiry, published.' },
  { href: '/conversion-optimization', title: 'Conversion work', meta: 'Capability', summary: 'Diagnosis first, because two of the four causes are not the page.' },
];

export default function NotFound() {
  return (
    <>
      <RouteHero
        eyebrow="404"
        title={<>That page is not here.</>}
        lede={<>It may have moved, or the address may be wrong. These are the pages that do exist.</>}
        size="quiet"
        mode="editorial"
      />

      <CommercialSection tone="paper">
        <ChapterLabel>Where you probably meant to go</ChapterLabel>
        <EntryList entries={RECOVERY} />
      </CommercialSection>

      <CommercialSection>
        <ChapterLabel>The capabilities</ChapterLabel>
        <EntryList entries={CAPABILITIES} />
      </CommercialSection>

      <CommercialSection tone="paper">
        <ChapterLabel>Or tell us what you were looking for</ChapterLabel>
        <Display>A broken link is worth knowing about.</Display>
        <Body>
          If you followed a link here from somewhere else, saying so is genuinely useful &mdash; it is the
          fastest way for us to find what is broken.
        </Body>
      </CommercialSection>
    </>
  );
}
