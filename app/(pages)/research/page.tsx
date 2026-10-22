import { createMetadata } from '@/lib/metadata';
import {
  getFeaturedResearchCards,
  getLatestResearchFindings,
  getResearchCategories,
  getResearchListCards,
  getResearchReportBySlug,
} from '@/lib/contentful/research';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ResearchBody } from '@/components/cplus/research/ResearchBody';

export const revalidate = 60;

/**
 * `/research` — the owner-approved C+ G1 R1 design (docs/research-redesign/g1/), implemented in G2.
 *
 * - The URL, title, description, indexing and structured data are unchanged (no BreadcrumbList is added; the live page
 *   has none). The conversational H1 is approved; the metadata is not changed.
 * - Every research fact is Contentful data, read by the existing getters. The featured report (else the newest) is read
 *   once more by slug for its key findings, in report order, and its facts; if it has none, the latest-findings feed
 *   is used, as before.
 * - The report is shown once. Other reports and research areas are listed only when more than one exists.
 */
export const metadata = createMetadata(
  'MappedSkills Research',
  'Original MappedSkills research on how businesses are found, measured, and converted — published with method, limits, and the data behind each finding.',
  '/research'
);

export default async function ResearchHubPage() {
  const [featured, latest, categories, feed] = await Promise.all([
    getFeaturedResearchCards(),
    getResearchListCards(),
    getResearchCategories(),
    getLatestResearchFindings(),
  ]);

  const card = featured[0] ?? latest[0] ?? null;
  const report = card ? await getResearchReportBySlug(card.slug) : null;
  const findings = report?.keyFindings.length ? report.keyFindings : feed;
  const others = latest.filter((r) => r.slug !== card?.slug);

  return (
    <CplusPage>
      <ResearchBody data={{ report, card, findings, others, categories }} />
    </CplusPage>
  );
}
