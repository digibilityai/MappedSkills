import { createMetadata } from '@/lib/metadata';
import { EducationR2 } from '@/components/education-r2/EducationR2';
import { EducationJsonLd } from '@/components/paid-advertising/education/EducationJsonLd';

/**
 * `/who-we-help/education`: renders the frozen Education and Training R2B design (27 October 2026; live title, description and
 * canonical preserved, D1). Previously: the Education audience page (Content R1 as a working draft, Visual R4 as the design reference,
 * 26 October 2026; DEC-082). A new route with no legacy SEO to preserve (`/education` and `/who-we-help` do not exist; there is
 * no hub). Local implementation only: not published or deployed. Header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Google Ads & Meta Ads for Education Businesses in India | MappedSkills',
  'Google Ads and Meta Ads management for online courses, coaching and training businesses in India. Focus on relevant enquiries and enrolment outcomes.',
  '/who-we-help/education'
);

export default function Page() {
  return (
    <>
      <EducationJsonLd />
      <EducationR2 />
    </>
  );
}
