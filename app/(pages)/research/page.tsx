import { createMetadata } from '@/lib/metadata';
import { CommercialSection, ChapterLabel, Display, Note } from '@/components/commercial/primitives';
import { RouteHero, EntryList, FindingList } from '@/components/routes/primitives';
import {
  getFeaturedResearchCards,
  getLatestResearchFindings,
  getResearchCategories,
  getResearchListCards,
} from '@/lib/contentful/research';
import { JournalistsCta } from '@/components/research/JournalistsCta';

export const revalidate = 60;

export const metadata = createMetadata(
  'MappedSkills Research',
  'Original MappedSkills research on how businesses are found, measured, and converted — published with method, limits, and the data behind each finding.',
  '/research'
);

export default async function ResearchHubPage() {
  const [featured, latest, categories, findings] = await Promise.all([
    getFeaturedResearchCards(),
    getResearchListCards(),
    getResearchCategories(),
    getLatestResearchFindings(),
  ]);

  return (
    <>
      <RouteHero
        eyebrow="Research"
        title={<>MappedSkills Research</>}
        lede="Published diagnostics on how businesses are found, measured, and converted. Each report states what was observed, over what period, and where the observation stops."
        mode="editorial"
      />

      {featured.length > 0 ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Featured research</ChapterLabel>
          <Display>Featured reports.</Display>
          <EntryList
            entries={featured.map((report) => ({
              href: report.href,
              title: report.title,
              meta: [report.categoryName, report.publishedDate].filter(Boolean).join(' · '),
              summary: report.excerpt,
            }))}
          />
        </CommercialSection>
      ) : null}

      {findings.length > 0 ? (
        <CommercialSection tone="ground">
          <ChapterLabel>Latest data</ChapterLabel>
          <Display>Findings from published research.</Display>
          <FindingList
            items={findings.map((finding) => ({
              term: finding.statistic ? `${finding.statistic} — ${finding.headline}` : finding.headline,
              body: [finding.description, finding.baseSample, finding.sourceNote].filter(Boolean).join(' '),
            }))}
          />
        </CommercialSection>
      ) : null}

      {categories.length > 0 ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Research areas</ChapterLabel>
          <Display>Where the work is grouped.</Display>
          <EntryList
            entries={categories.map((category) => ({
              href: category.href,
              title: category.name,
              summary: category.description,
            }))}
          />
        </CommercialSection>
      ) : null}

      {latest.length > 0 ? (
        <CommercialSection tone="ground">
          <ChapterLabel>Latest research</ChapterLabel>
          <Display>Published reports, newest first.</Display>
          <EntryList
            entries={latest.map((report) => ({
              href: report.href,
              title: report.title,
              meta: [report.categoryName, report.publishedDate].filter(Boolean).join(' · '),
              summary: report.excerpt,
            }))}
          />
        </CommercialSection>
      ) : (
        <CommercialSection tone="ground">
          <ChapterLabel>Latest research</ChapterLabel>
          <Display>Nothing is published here yet.</Display>
          <Note>When a research report is published in Contentful, it will appear on this page. No stub or placeholder is shown in the meantime.</Note>
        </CommercialSection>
      )}

      <CommercialSection tone="paper">
        <ChapterLabel>Methodology</ChapterLabel>
        <Display>What a report is allowed to claim.</Display>
        <p className="mt-4 max-w-[58ch] text-[1.02rem] leading-relaxed text-resolve-dim">
          MappedSkills research records what was observed, the period and geography it covers, the sample
          where one exists, and the limits of that observation. Findings are not restated as guarantees.
        </p>
        <Note>
          A dedicated research methodology page is not published yet, so this section does not link to one.
        </Note>
      </CommercialSection>

      <CommercialSection tone="ground">
        <ChapterLabel>For journalists</ChapterLabel>
        <Display>Media enquiries.</Display>
        <div className="mt-6">
          <JournalistsCta subject="Media enquiry: MappedSkills Research" />
        </div>
      </CommercialSection>
    </>
  );
}
