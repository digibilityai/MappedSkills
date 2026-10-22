import { createMetadata } from '@/lib/metadata';
import { getPressListCards } from '@/lib/contentful/press';
import { CplusPage } from '@/components/cplus/CplusPage';
import { PressBody } from '@/components/cplus/press/PressBody';

export const revalidate = 60;

/**
 * `/press` — the owner-approved C+ G1 design (docs/press-redesign/g1/), implemented in G2. The URL, title, description,
 * canonical, indexing and structured data are unchanged; release data still comes from the existing Contentful getter.
 */
export const metadata = createMetadata(
  'Press | MappedSkills',
  'News and press releases from MappedSkills, including research announcements and media contact details.',
  '/press'
);

export default async function PressIndexPage() {
  const releases = await getPressListCards();

  return (
    <CplusPage>
      <PressBody releases={releases} />
    </CplusPage>
  );
}
