import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createMetadata, resolveOgImageUrl, siteMetadata } from '@/lib/metadata';
import { generateResearchReportSchema } from '@/lib/schema';
import {
  CommercialSection,
  ChapterLabel,
  Display,
  Note,
  ProofLink,
} from '@/components/commercial/primitives';
import { RouteBreadcrumb, RouteHero, EntryList } from '@/components/routes/primitives';
import { ResearchRichText } from '@/components/research/ResearchRichText';
import { ResearchFindingEmbed } from '@/components/research/ResearchFindingEmbed';
import { ResearchDownloads } from '@/components/research/ResearchDownloads';
import { CopyActions } from '@/components/research/CopyActions';
import { ResearchAuthor } from '@/components/research/ResearchAuthor';
import { JournalistsCta } from '@/components/research/JournalistsCta';
import { isDocumentPopulated } from '@/lib/contentful/mappers';
import {
  getResearchStaticParams,
  resolveResearchSlug,
} from '@/lib/contentful/research';
import type { CmsResearchCategory, CmsResearchCard, CmsResearchReport } from '@/lib/contentful/types';

export const revalidate = 60;

interface ResearchSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getResearchStaticParams();
}

export async function generateMetadata({ params }: ResearchSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveResearchSlug(slug);
  if (!resolved) notFound();

  if (resolved.kind === 'category') {
    return createMetadata(
      resolved.category.seoTitle,
      resolved.category.metaDescription,
      resolved.category.href
    );
  }

  const title = resolved.report.metaTitle;
  const description = resolved.report.metaDescription;
  const ogImage = resolved.report.featuredImage?.url;
  const resolvedOgImage = resolveOgImageUrl(ogImage);

  return {
    metadataBase: new URL(siteMetadata.baseUrl),
    title,
    description,
    alternates: { canonical: resolved.report.canonicalUrl },
    openGraph: {
      title,
      description,
      url: resolved.report.canonicalUrl,
      type: 'article',
      publishedTime: resolved.report.publishedAtISO || undefined,
      modifiedTime: resolved.report.updatedAtISO || undefined,
      siteName: siteMetadata.siteName,
      images: [
        {
          url: resolvedOgImage,
          alt: resolved.report.featuredImage?.description || resolved.report.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedOgImage],
    },
    authors: [{ name: resolved.report.author.name, url: `${siteMetadata.baseUrl}/about` }],
    publisher: siteMetadata.siteName,
  };
}

function ReportPage({ report }: { report: CmsResearchReport }) {
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Research', href: '/research' },
    ...(report.categoryName && report.categorySlug
      ? [{ name: report.categoryName, href: `/research/${report.categorySlug}` }]
      : []),
    { name: report.title, href: `/research/${report.slug}` },
  ];

  const facts = [
    { label: 'Author', value: report.author.name },
    { label: 'Publication date', value: report.publishedDate },
    { label: 'Research period', value: report.researchPeriod },
    { label: 'Geography', value: report.geography },
    {
      label: 'Sample size',
      value: typeof report.sampleSize === 'number' ? String(report.sampleSize) : undefined,
    },
  ].filter((fact) => Boolean(fact.value));

  const featuredAlt =
    report.featuredImage?.description || report.featuredImage?.title || report.title;
  const hasLimitations = isDocumentPopulated(report.limitationsJson);
  const hasDownloads = Boolean(report.reportPdf || report.dataFile || report.mediaAssets.length);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateResearchReportSchema({
              title: report.title,
              description: report.metaDescription || report.excerpt,
              url: report.canonicalUrl,
              image: report.featuredImage?.url,
              datePublished: report.publishedAtISO || undefined,
              dateModified: report.updatedAtISO || undefined,
              authorName: report.author.name,
              identifier: report.researchId,
              about: report.excerpt || undefined,
              spatialCoverage: report.geography,
              temporalCoverage: report.researchPeriod,
            })
          ),
        }}
      />

      <RouteBreadcrumb trail={trail} />

      <RouteHero
        eyebrow={report.categoryName || 'Research'}
        title={<>{report.title}</>}
        lede={report.excerpt || undefined}
        mode="editorial"
      />

      <CommercialSection tone="paper">
        <ChapterLabel>Study</ChapterLabel>
        {facts.length > 0 ? (
          <dl className="mt-[clamp(24px,3vw,40px)] grid grid-cols-1 gap-x-[clamp(20px,3vw,40px)] gap-y-5 border-t-2 border-resolve-ink min-[700px]:grid-cols-2 min-[1081px]:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.label} className="border-b border-resolve-line py-[clamp(12px,1.6vw,18px)]">
                <dt className="m-0 text-[.82rem] font-semibold uppercase tracking-[0.14em] text-resolve-dim">
                  {fact.label}
                </dt>
                <dd className="m-0 mt-2 text-[1.02rem] leading-snug text-resolve-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {report.featuredImage?.url ? (
          <figure className="mt-[clamp(24px,3vw,40px)] overflow-hidden border border-resolve-line bg-resolve-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={report.featuredImage.url}
              alt={featuredAlt}
              width={report.featuredImage.width}
              height={report.featuredImage.height}
              className="mx-auto h-auto w-auto max-w-full object-contain"
            />
            {report.featuredImage.description ? (
              <figcaption className="border-t border-resolve-line px-[clamp(14px,1.8vw,20px)] py-3 text-[.9rem] leading-[1.55] text-resolve-dim">
                {report.featuredImage.description}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </CommercialSection>

      {report.keyFindings.length > 0 ? (
        <CommercialSection tone="ground">
          <ChapterLabel>Key findings</ChapterLabel>
          <Display>What the research found.</Display>
          <div className="mt-[clamp(24px,3vw,40px)] grid grid-cols-1 gap-[clamp(12px,1.6vw,20px)] min-[760px]:grid-cols-2 min-[1180px]:grid-cols-3">
            {report.keyFindings.map((finding) => (
              <ResearchFindingEmbed key={finding.id} finding={finding} inList />
            ))}
          </div>
        </CommercialSection>
      ) : null}

      {isDocumentPopulated(report.executiveSummaryJson) && report.executiveSummaryJson ? (
        <CommercialSection tone="paper" id="executive-summary">
          <ChapterLabel>Overview</ChapterLabel>
          <Display className="max-w-none">Executive Summary</Display>
          <div className="mt-6">
            <ResearchRichText
              idPrefix="summary"
              document={report.executiveSummaryJson}
              links={report.executiveSummaryLinks}
            />
          </div>
        </CommercialSection>
      ) : null}

      {isDocumentPopulated(report.contentJson) && report.contentJson ? (
        <CommercialSection tone="ground">
          <ResearchRichText idPrefix="body" document={report.contentJson} links={report.contentLinks} />
        </CommercialSection>
      ) : null}

      {isDocumentPopulated(report.methodologyJson) && report.methodologyJson ? (
        <CommercialSection tone="paper" id="methodology">
          <ChapterLabel>Methodology</ChapterLabel>
          <Display>Research framework and data collection.</Display>
          <div className="mt-6 rounded-xl border border-resolve-line bg-resolve-ground p-[clamp(20px,3vw,36px)] border-l-4 border-l-resolve-ink min-[1081px]:max-w-[85%]">
            <ResearchRichText
              idPrefix="method"
              document={report.methodologyJson}
              links={report.methodologyLinks}
            />
          </div>
        </CommercialSection>
      ) : null}

      {hasLimitations && report.limitationsJson ? (
        <CommercialSection tone="ground" id="limitations">
          <ChapterLabel>Limitations</ChapterLabel>
          <Display>Where the observation &amp; data stops.</Display>
          <div className="mt-6 rounded-xl border border-resolve-line bg-resolve-paper p-[clamp(20px,3vw,36px)] border-l-4 border-l-[var(--resolve-accent-deep)] min-[1081px]:max-w-[85%]">
            <ResearchRichText
              idPrefix="limits"
              document={report.limitationsJson}
              links={report.limitationsLinks}
            />
          </div>
        </CommercialSection>
      ) : null}

      {hasDownloads ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Downloads</ChapterLabel>
          <Display>Files published with this report.</Display>
          <ResearchDownloads
            reportPdf={report.reportPdf}
            dataFile={report.dataFile}
            mediaAssets={report.mediaAssets}
          />
        </CommercialSection>
      ) : null}

      <CommercialSection tone="ground">
        <ChapterLabel>Cite this research</ChapterLabel>
        <Display>How to reference this report.</Display>
        <blockquote className="mt-6 w-full border-l-2 border-resolve-ink pl-4 text-[1.02rem] leading-relaxed text-resolve-dim min-[1081px]:w-[72%]">
          {report.citation}
        </blockquote>
        <p className="mt-4 text-[.94rem] leading-[1.55] text-resolve-dim">
          Canonical URL:{' '}
          <a href={report.canonicalUrl} className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
            {report.canonicalUrl}
          </a>
        </p>
        <CopyActions citation={report.citation} url={report.canonicalUrl} />
      </CommercialSection>

      <CommercialSection tone="paper">
        <ChapterLabel>About the author</ChapterLabel>
        <ResearchAuthor author={report.author} />
      </CommercialSection>

      <CommercialSection tone="ground">
        <ChapterLabel>For journalists</ChapterLabel>
        <Display>Media enquiries.</Display>
        <div className="mt-6">
          <JournalistsCta subject={`Media enquiry: ${report.title}`} />
        </div>
      </CommercialSection>

      {report.relatedResearch.length > 0 ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Related research</ChapterLabel>
          <EntryList
            entries={report.relatedResearch.map((item) => ({
              href: item.href,
              title: item.title,
              meta: [item.categoryName, item.publishedDate].filter(Boolean).join(' · '),
              summary: item.excerpt,
            }))}
          />
        </CommercialSection>
      ) : null}

      <CommercialSection tone="ground">
        <ChapterLabel>Next</ChapterLabel>
        <p className="mt-4 w-full text-[1.02rem] leading-relaxed text-resolve-dim min-[1081px]:w-[72%]">
          If you want to compare how your own marketing is measured against what this research describes,
          start with how conversion work is run.
        </p>
        <ProofLink href="/conversion-optimization">How conversion work starts</ProofLink>
      </CommercialSection>
    </>
  );
}

function CategoryPage({
  category,
  reports,
}: {
  category: CmsResearchCategory;
  reports: CmsResearchCard[];
}) {
  return (
    <>
      <RouteBreadcrumb
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Research', href: '/research' },
          { name: category.name, href: category.href },
        ]}
      />
      <RouteHero
        eyebrow="Research"
        title={<>{category.name}</>}
        lede={category.description}
        mode="editorial"
      />
      {category.featuredImage?.url ? (
        <CommercialSection tone="ground" rule={false}>
          <figure className="m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.featuredImage.url}
              alt={category.featuredImage.description || category.featuredImage.title || category.name}
              width={category.featuredImage.width}
              height={category.featuredImage.height}
              className="h-auto w-full rounded-lg border border-resolve-line"
            />
          </figure>
        </CommercialSection>
      ) : null}
      <CommercialSection tone="paper">
        <ChapterLabel>Reports in this area</ChapterLabel>
        {reports.length > 0 ? (
          <EntryList
            entries={reports.map((report) => ({
              href: report.href,
              title: report.title,
              meta: report.publishedDate,
              summary: report.excerpt,
            }))}
          />
        ) : (
          <>
            <Display>Nothing is published in this area yet.</Display>
            <Note>When a report is filed under this category, it will appear here.</Note>
          </>
        )}
      </CommercialSection>
    </>
  );
}

export default async function ResearchSlugPage({ params }: ResearchSlugPageProps) {
  const { slug } = await params;
  const resolved = await resolveResearchSlug(slug);
  if (!resolved) notFound();

  if (resolved.kind === 'category') {
    return <CategoryPage category={resolved.category} reports={resolved.reports} />;
  }

  return <ReportPage report={resolved.report} />;
}
