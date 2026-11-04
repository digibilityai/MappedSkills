import { createMetadata } from '@/lib/metadata';
import { loadCaseShowcase } from '@/components/case-showcase/CaseShowcase';
import { HOME_CASES } from '@/components/resolve-home-r3/home-cases';
import { ResolveHomeR3 } from '@/components/resolve-home-r3/ResolveHomeR3';

// Must be a literal — Next.js cannot follow imported identifiers for route segment config
export const revalidate = 60;

export const metadata = createMetadata(
  'Performance Marketing & SEO Agency in India | MappedSkills',
  'MappedSkills is a performance marketing and SEO agency in India. We manage Google Ads, Meta Ads and SEO for businesses that want more commercially meaningful enquiries, not just more traffic.',
  '/'
);

/** Paid-advertising revamp: THE RESOLVE R3 homepage design (frozen 27 October 2026) with the Brand DNA 4.0 refinements (DEC-118). The live
 * title, description, canonical, revalidation, shared consent and form integrations are retained; the H1 is unchanged. The featured case
 * studies are read from the public library on the server first, as the case showcase pages do. */
export default async function Home() {
  const showcase = await loadCaseShowcase(HOME_CASES);
  return <ResolveHomeR3 showcase={showcase} />;
}
