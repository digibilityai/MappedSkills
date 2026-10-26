import { createMetadata } from '@/lib/metadata';
import { PaidAdvertisingHome } from '@/components/paid-advertising/home/PaidAdvertisingHome';

// Must be a literal — Next.js cannot follow imported identifiers for route segment config
export const revalidate = 60;

export const metadata = createMetadata(
  'Google Ads & Meta Ads for Growing Businesses | MappedSkills',
  'Google Ads and Meta Ads management for growing D2C, education and enquiry-led businesses. Discuss your advertising goals with MappedSkills.',
  '/'
);

/** Paid-advertising revamp: copy and visual approved 26 October 2026.
 * Existing canonical, revalidation, shared consent and form integrations are retained. */
export default function Home() {
  return <PaidAdvertisingHome />;
}
