import { HomepageHero } from '@/components/homepage/HomepageHero';
import { HomepageActivity } from '@/components/homepage/HomepageActivity';
import { HomepageFriction } from '@/components/homepage/HomepageFriction';
import { HomepageIntervention } from '@/components/homepage/HomepageIntervention';
import { HomepageAccountability } from '@/components/homepage/HomepageAccountability';
import { HomepageFinalCTA } from '@/components/homepage/HomepageFinalCTA';
import { createMetadata } from '@/lib/metadata';

// Must be a literal — Next.js cannot follow imported identifiers for route segment config
export const revalidate = 60;

export const metadata = createMetadata(
  'MappedSkills | Judge Us on the Enquiries, Not the Traffic',
  'We help businesses get found by the buyers already looking for what they sell, turn more of those visits into real enquiries, and measure the whole path so they can see what worked.',
  '/'
);

/**
 * SESSION 25 — PHASE C — HOMEPAGE STATIC TRANSLATION.
 *
 * Translates the approved Resolve homepage (docs/26-resolve-homepage/prototype/index.html,
 * Gate 10, DEC-019) into static production Next.js. No motion, no scroll
 * choreography, no IntersectionObserver reveal, no forms, no analytics — all
 * deferred to Phase D or later, per docs/27-production-translation/13_PHASE_C_HOMEPAGE_STATIC.md.
 *
 * The chapter sequence below preserves the approved journey — ACTIVITY →
 * ATTENTION → FRICTION → INTERVENTION → RESOLUTION → ACCOUNTABILITY → ACTION
 * — in the compressed form Session 18B validated and Gate 10 approved: the
 * hero carries ACTIVITY/ATTENTION (the population figure), the system view
 * carries INTERVENTION/RESOLUTION together (Session 18B's own merge), and
 * ACCOUNTABILITY carries the boundary, evidence and fit chapters together.
 */
export default function Home() {
  return (
    <>
      <HomepageHero />
      <HomepageActivity />
      <HomepageFriction />
      <HomepageIntervention />
      <HomepageAccountability />
      <HomepageFinalCTA />
    </>
  );
}
