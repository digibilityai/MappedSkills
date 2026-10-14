import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { HomeBody } from '@/components/cplus/home/HomeBody';

// Must be a literal — Next.js cannot follow imported identifiers for route segment config
export const revalidate = 60;

export const metadata = createMetadata(
  'MappedSkills | Judge Us on the Enquiries, Not the Traffic',
  'We help businesses get found by the buyers already looking for what they sell, turn more of those visits into real enquiries, and measure the whole path so they can see what worked.',
  '/'
);

/**
 * `/` — the approved C+ homepage (proto/direction-c-plus 0a8b611) in production. The URL, metadata (title,
 * description, canonical, Open Graph/Twitter), `revalidate` and the global structured data (root layout) are unchanged.
 * The Direction C header and footer come from the root layout. The previous Direction C homepage components
 * (components/direction-c/home/*) are no longer rendered but are left in the repository.
 */
export default function Home() {
  return (
    <CplusPage>
      <HomeBody />
    </CplusPage>
  );
}
