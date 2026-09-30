import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, siteMetadata } from '@/lib/metadata';
import { generateResearchReportSchema } from '@/lib/schema';
import {
  CommercialSection,
  ChapterLabel,
  Display,
  Note,
  ProofLink,
} from '@/components/commercial/primitives';
import { RouteBreadcrumb, RouteHero, EntryList } from '@/components/routes/primitives';
import { RichTextContent } from '@/components/blog/RichTextContent';
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

  return {
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
      images: ogImage ? [{ url: ogImage, alt: resolved.report.featuredImage?.description || resolved.report.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
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

      <CommercialSection tone="ground" rule={false}>
        {report.categoryName && report.categorySlug ? (
          <ChapterLabel>
            <Link href={`/research/${report.categorySlug}`} className="text-inherit no-underline">
              {report.categoryName}
            </Link>
          </ChapterLabel>
        ) : (
          <ChapterLabel>Research</ChapterLabel>
        )}
        <h1 className="mt-[18px] max-w-[24ch] font-heading text-[clamp(1.6rem,3.4vw,2.7rem)] font-extrabold leading-[1.0] tracking-[-0.035em]">
          {report.title}
        </h1>
        {report.excerpt ? (
          <p className="mt-[22px] max-w-none text-[clamp(1.06rem,1.35vw,1.28rem)] leading-relaxed text-resolve-dim">
            {report.excerpt}
          </p>
        ) : null}

        {facts.length > 0 ? (
          <dl className="mt-[clamp(24px,3vw,40px)] grid grid-cols-1 gap-x-8 gap-y-4 border-t border-resolve-line pt-6 min-[700px]:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="m-0 text-[.82rem] font-semibold uppercase tracking-[0.14em] text-resolve-dim">
                  {fact.label}
                </dt>
                <dd className="m-0 mt-1 text-[1.02rem] text-resolve-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {report.featuredImage?.url ? (
          <figure className="mt-[clamp(24px,3vw,40px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={report.featuredImage.url}
              alt={featuredAlt}
              width={report.featuredImage.width}
              height={report.featuredImage.height}
              className="h-auto w-full rounded-lg border border-resolve-line"
            />
          </figure>
        ) : null}
      </CommercialSection>

      {report.keyFindings.length > 0 ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Key findings</ChapterLabel>
          <Display>What the research found.</Display>
          <div className="mt-4">
            {report.keyFindings.map((finding) => (
              <ResearchFindingEmbed key={finding.id} finding={finding} />
            ))}
          </div>
        </CommercialSection>
      ) : null}

      {isDocumentPopulated(report.executiveSummaryJson) && report.executiveSummaryJson ? (
        <CommercialSection tone="ground">
          <ChapterLabel>Executive summary</ChapterLabel>
          <article className="mt-6 max-w-none">
            <RichTextContent document={report.executiveSummaryJson} links={report.executiveSummaryLinks} />
          </article>
        </CommercialSection>
      ) : null}

      {isDocumentPopulated(report.contentJson) && report.contentJson ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Research</ChapterLabel>
          <article className="mt-6 max-w-none">
            <RichTextContent document={report.contentJson} links={report.contentLinks} />
          </article>
        </CommercialSection>
      ) : null}

      {isDocumentPopulated(report.methodologyJson) && report.methodologyJson ? (
        <CommercialSection tone="ground">
          <ChapterLabel>Methodology</ChapterLabel>
          <article className="mt-6 max-w-none">
            <RichTextContent document={report.methodologyJson} links={report.methodologyLinks} />
          </article>
        </CommercialSection>
      ) : null}

      {hasLimitations && report.limitationsJson ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Limitations</ChapterLabel>
          <article className="mt-6 max-w-none">
            <RichTextContent document={report.limitationsJson} links={report.limitationsLinks} />
          </article>
        </CommercialSection>
      ) : null}

      {hasDownloads ? (
        <CommercialSection tone="ground">
          <ChapterLabel>Downloads</ChapterLabel>
          <Display>Files published with this report.</Display>
          <ResearchDownloads
            reportPdf={report.reportPdf}
            dataFile={report.dataFile}
            mediaAssets={report.mediaAssets}
          />
        </CommercialSection>
      ) : null}

      <CommercialSection tone="paper">
        <ChapterLabel>Cite this research</ChapterLabel>
        <Display>How to reference this report.</Display>
        <blockquote className="mt-6 max-w-[64ch] border-l-2 border-resolve-ink pl-4 text-[1.02rem] leading-relaxed text-resolve-dim">
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

      <CommercialSection tone="ground">
        <ChapterLabel>About the author</ChapterLabel>
        <ResearchAuthor author={report.author} />
      </CommercialSection>

      <CommercialSection tone="paper">
        <ChapterLabel>For journalists</ChapterLabel>
        <Display>Media enquiries.</Display>
        <div className="mt-6">
          <JournalistsCta subject={`Media enquiry: ${report.title}`} />
        </div>
      </CommercialSection>

      {report.relatedResearch.length > 0 ? (
        <CommercialSection tone="ground">
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

      <CommercialSection tone="paper">
        <ChapterLabel>Next</ChapterLabel>
        <p className="mt-4 max-w-[58ch] text-[1.02rem] leading-relaxed text-resolve-dim">
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
