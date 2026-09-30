import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Note } from '@/components/commercial/primitives';
import { RouteHero, EntryList } from '@/components/routes/primitives';
import { getPressListCards } from '@/lib/contentful/press';
import { JournalistsCta } from '@/components/research/JournalistsCta';

export const revalidate = 60;

export const metadata = createMetadata(
  'Press | MappedSkills',
  'News and press releases from MappedSkills, including research announcements and media contact details.',
  '/press'
);

export default async function PressIndexPage() {
  const releases = await getPressListCards();

  return (
    <>
      <RouteHero
        eyebrow="Press"
        title={<>Newsroom</>}
        lede="Published press releases, newest first. For comment or materials, use the media contact below."
        mode="editorial"
      />

      {releases.length > 0 ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Press releases</ChapterLabel>
          <EntryList
            entries={releases.map((release) => ({
              href: release.href,
              title: release.headline,
              meta: release.publishedDate,
              summary: release.excerpt,
            }))}
          />
        </CommercialSection>
      ) : (
        <CommercialSection tone="paper">
          <ChapterLabel>Press releases</ChapterLabel>
          <Display>Nothing is published here yet.</Display>
          <Note>When a press release is published in Contentful, it will appear on this page.</Note>
        </CommercialSection>
      )}

      <CommercialSection tone="ground">
        <ChapterLabel>Media contact</ChapterLabel>
        <Display>For journalists.</Display>
        <div className="mt-6">
          <JournalistsCta subject="Media enquiry: MappedSkills" />
        </div>
      </CommercialSection>
    </>
  );
}
