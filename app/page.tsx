import { createMetadata } from '@/lib/metadata';
import { ResolveHomeR3 } from '@/components/resolve-home-r3/ResolveHomeR3';

// Must be a literal — Next.js cannot follow imported identifiers for route segment config
export const revalidate = 60;

export const metadata = createMetadata(
  'Google Ads & Meta Ads for Growing Businesses | MappedSkills',
  'Google Ads and Meta Ads management for growing D2C, education and enquiry-led businesses. Discuss your advertising goals with MappedSkills.',
  '/'
);

/** Paid-advertising revamp: THE RESOLVE R3 homepage design (frozen 27 October 2026). The live title, description, canonical,
 * revalidation, shared consent and form integrations are retained; the H1 is unchanged. */
export default function Home() {
  return <ResolveHomeR3 />;
}
