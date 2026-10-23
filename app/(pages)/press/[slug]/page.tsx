import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveOgImageUrl, siteMetadata } from '@/lib/metadata';
import { generateNewsArticleSchema } from '@/lib/schema';
import { routeTrailJsonLd } from '@/components/routes/primitives';
import { CplusPage } from '@/components/cplus/CplusPage';
import { PressReleaseBody } from '@/components/cplus/press-release/PressReleaseBody';
import { getPressReleaseBySlug, getPressStaticParams } from '@/lib/contentful/press';

export const revalidate = 60;

interface PressReleasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPressStaticParams();
}

export async function generateMetadata({ params }: PressReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);
  if (!release) notFound();

  const title = release.metaTitle;
  const description = release.metaDescription;
  const ogImage = release.featuredImage?.url;
  const resolvedOgImage = resolveOgImageUrl(ogImage);

  return {
    metadataBase: new URL(siteMetadata.baseUrl),
    title,
    description,
    alternates: { canonical: release.canonicalUrl },
    openGraph: {
      title,
      description,
      url: release.canonicalUrl,
      type: 'article',
      publishedTime: release.publishedAtISO || undefined,
      modifiedTime: release.updatedAtISO || undefined,
      siteName: siteMetadata.siteName,
      images: [
        {
          url: resolvedOgImage,
          alt: release.featuredImage?.description || release.headline,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedOgImage],
    },
    authors: release.author ? [{ name: release.author.name, url: `${siteMetadata.baseUrl}/about` }] : undefined,
    publisher: siteMetadata.siteName,
  };
}

/**
 * `/press/[slug]`: the owner-approved Press Detail G1 design (docs/press-redesign/detail-g1/), implemented in G2 on the C+
 * shell. The URL, metadata, NewsArticle and BreadcrumbList structured data, revalidation and the delivery-only getters
 * are unchanged; only the visible page changes. The BreadcrumbList keeps the full headline.
 */
export default async function PressReleasePage({ params }: PressReleasePageProps) {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);
  if (!release) notFound();

  return (
    <CplusPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateNewsArticleSchema({
              headline: release.headline,
              description: release.metaDescription || release.excerpt,
              url: release.canonicalUrl,
              image: release.featuredImage?.url,
              datePublished: release.publishedAtISO || undefined,
              dateModified: release.updatedAtISO || undefined,
              authorName: release.author?.name,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: routeTrailJsonLd([
            { name: 'Home', href: '/' },
            { name: 'Press', href: '/press' },
            { name: release.headline, href: `/press/${release.slug}` },
          ]),
        }}
      />
      <PressReleaseBody release={release} />
    </CplusPage>
  );
}
