/**
 * Homepage-only motion CSS. Kept unlayered so start states outrank Tailwind
 * utilities, and imported here so other routes do not download it.
 */
import './resolve-motion.css';
import { HomepageHero } from '@/components/homepage/HomepageHero';
import { HomepageActivity } from '@/components/homepage/HomepageActivity';
import { HomepageFriction } from '@/components/homepage/HomepageFriction';
import { HomepageIntervention } from '@/components/homepage/HomepageIntervention';
import { HomepageAccountability } from '@/components/homepage/HomepageAccountability';
import { HomepageFinalCTA } from '@/components/homepage/HomepageFinalCTA';
import { HomepageMotion } from '@/components/homepage/HomepageMotion';
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
 * SESSION 26 — PHASE D — MOTION + INTERACTION, as progressive enhancement.
 *
 * Translates the approved Resolve homepage (docs/26-resolve-homepage/prototype/index.html,
 * Gate 10, DEC-019) into production Next.js. Phase C built the static page;
 * Phase D adds the approved Resolve motion ON TOP of it without changing it —
 * see docs/27-production-translation/14_PHASE_D_HOMEPAGE_MOTION.md. Forms,
 * analytics, SEO surfaces and every other route remain out of scope.
 *
 * The page below is entirely Server Components. Motion is confined to three
 * client leaves — the hero's two-state surface, the system view's tablist, and
 * `HomepageMotion`, which renders nothing and only adds classes to
 * server-rendered nodes. With no JavaScript, a failed hydration or
 * `prefers-reduced-motion: reduce`, this file renders exactly the Phase C page.
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
      <HomepageMotion />
    </>
  );
}
