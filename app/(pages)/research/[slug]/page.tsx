import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createMetadata, resolveOgImageUrl, siteMetadata } from '@/lib/metadata';
import { generateResearchReportSchema } from '@/lib/schema';
import { routeTrailJsonLd } from '@/components/routes/primitives';
import '@/components/editorial/editorial.css';
import { EdMotion } from '@/components/editorial/EdMotion';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ReportBody } from '@/components/cplus/research-report/ReportBody';
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
  /* The structured-data trail keeps the full report title (the visible breadcrumb shortens it to its first clause). */
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Research', href: '/research' },
    ...(report.categoryName && report.categorySlug
      ? [{ name: report.categoryName, href: `/research/${report.categorySlug}` }]
      : []),
    { name: report.title, href: `/research/${report.slug}` },
  ];

  return (
    <CplusPage>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: routeTrailJsonLd(trail) }} />
      <ReportBody report={report} />
    </CplusPage>
  );
}

function CategoryPage({
  category,
  reports,
}: {
  category: CmsResearchCategory;
  reports: CmsResearchCard[];
}) {
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Research', href: '/research' },
    { name: category.name, href: category.href },
  ];
  return (
    <CplusPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: routeTrailJsonLd(trail) }} />
      <section className="ed-hero" aria-labelledby="rc-h1">
        <div className="ed-w">
          <nav aria-label="Breadcrumb" className="ed-crumb">
            <Link href="/">Home</Link>
            <Link href="/research">Research</Link>
            <span aria-current="page">{category.name}</span>
          </nav>
          <div className="ed-hl">
            <p className="ed-k">Research</p>
            <h1 id="rc-h1">{category.name}</h1>
            {category.description ? <p className="ed-lede">{category.description}</p> : null}
          </div>
        </div>
      </section>
      {category.featuredImage?.url ? (
        <section className="ed-band">
          <div className="ed-w">
            <figure className="m-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.featuredImage.url}
                alt={category.featuredImage.description || category.featuredImage.title || category.name}
                width={category.featuredImage.width}
                height={category.featuredImage.height}
                style={{ height: 'auto', width: '100%' }}
              />
            </figure>
          </div>
        </section>
      ) : null}
      <section className="ed-band paper" aria-labelledby="rc-h-list">
        <div className="ed-w">
          <p className="ed-ch">
            <span>01</span>
            <span id="rc-h-list">Reports in this area</span>
          </p>
          {reports.length > 0 ? (
            <ul className="ed-rec">
              {reports.map((r) => (
                <li key={r.href}>
                  <Link href={r.href}>
                    <p className="ty">{r.publishedDate}</p>
                    <div>
                      <h2>{r.title}</h2>
                      {r.excerpt ? <p>{r.excerpt}</p> : null}
                    </div>
                    <span className="ar" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <h2 className="ed-h2">Nothing is published in this area yet.</h2>
              <p className="ed-dek">When a report is filed under this category, it will appear here.</p>
            </>
          )}
        </div>
      </section>
      <EdMotion />
    </CplusPage>
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
