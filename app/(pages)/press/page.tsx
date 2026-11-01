import { createMetadata } from '@/lib/metadata';
import { getPressListCards, getPressReleaseBySlug } from '@/lib/contentful/press';
import { splitLeadingFigures } from '@/components/cplus/press-release/release-rules';
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
  /* The latest release's recorded findings (the same structured entries its own page uses), read once with the existing getter. Read-only; no new query. */
  const latest = releases[0] ? await getPressReleaseBySlug(releases[0].slug) : null;
  const figures = latest?.contentJson ? splitLeadingFigures(latest.contentJson, latest.contentLinks).figures : [];

  return (
    <CplusPage>
      <PressBody releases={releases} figures={figures} />
    </CplusPage>
  );
}
