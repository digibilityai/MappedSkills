import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { resolveOgImageUrl, siteMetadata } from '@/lib/metadata';
import { generateNewsArticleSchema } from '@/lib/schema';
import {
  CommercialSection,
  ChapterLabel,
  Display,
} from '@/components/commercial/primitives';
import { RouteBreadcrumb } from '@/components/routes/primitives';
import { RichTextContent } from '@/components/blog/RichTextContent';
import { ResearchDownloads } from '@/components/research/ResearchDownloads';
import { ResearchAuthor } from '@/components/research/ResearchAuthor';
import { getPressReleaseBySlug, getPressStaticParams } from '@/lib/contentful/press';
import { isDocumentPopulated } from '@/lib/contentful/mappers';

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

export default async function PressReleasePage({ params }: PressReleasePageProps) {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);
  if (!release) notFound();

  const featuredAlt = release.featuredImage?.description || release.featuredImage?.title || release.headline;

  return (
    <>
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

      <RouteBreadcrumb
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Press', href: '/press' },
          { name: release.headline, href: `/press/${release.slug}` },
        ]}
      />

      <CommercialSection tone="ground" rule={false}>
        <ChapterLabel>Press release</ChapterLabel>
        <h1 className="mt-[18px] max-w-[24ch] font-heading text-[clamp(1.6rem,3.4vw,2.7rem)] font-extrabold leading-[1.0] tracking-[-0.035em]">
          {release.headline}
        </h1>
        {release.publishedDate ? (
          <p className="mt-4 text-[.82rem] font-semibold uppercase tracking-[0.14em] text-resolve-dim">
            {release.publishedDate}
          </p>
        ) : null}
        {release.excerpt ? (
          <p className="mt-[22px] max-w-none text-[clamp(1.06rem,1.35vw,1.28rem)] leading-relaxed text-resolve-dim">
            {release.excerpt}
          </p>
        ) : null}

        {release.relatedResearch ? (
          <aside className="mt-[clamp(24px,3vw,40px)] border-t-2 border-resolve-ink pt-6">
            <p className="m-0 text-[.82rem] font-semibold uppercase tracking-[0.14em] text-resolve-dim">
              Related research
            </p>
            <Link
              href={release.relatedResearch.href}
              className="mt-3 block max-w-[46ch] font-heading text-[clamp(1.1rem,1.9vw,1.4rem)] font-bold leading-[1.2] tracking-[-0.03em] text-resolve-ink underline decoration-resolve-line decoration-2 underline-offset-4"
            >
              {release.relatedResearch.title}
            </Link>
            {release.relatedResearch.excerpt ? (
              <p className="mt-2 max-w-[58ch] text-[1.0rem] leading-relaxed text-resolve-dim">
                {release.relatedResearch.excerpt}
              </p>
            ) : null}
          </aside>
        ) : null}

        {release.featuredImage?.url ? (
          <figure className="mt-[clamp(24px,3vw,40px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={release.featuredImage.url}
              alt={featuredAlt}
              width={release.featuredImage.width}
              height={release.featuredImage.height}
              className="h-auto w-full rounded-lg border border-resolve-line"
            />
          </figure>
        ) : null}
      </CommercialSection>

      {isDocumentPopulated(release.contentJson) && release.contentJson ? (
        <CommercialSection tone="paper">
          <article className="max-w-none">
            <RichTextContent document={release.contentJson} links={release.contentLinks} />
          </article>
        </CommercialSection>
      ) : null}

      {release.author ? (
        <CommercialSection tone="ground">
          <ChapterLabel>Author</ChapterLabel>
          <ResearchAuthor author={release.author} />
        </CommercialSection>
      ) : null}

      {release.mediaAssets.length > 0 ? (
        <CommercialSection tone="paper">
          <ChapterLabel>Media assets</ChapterLabel>
          <Display>Files published with this release.</Display>
          <ResearchDownloads mediaAssets={release.mediaAssets} />
        </CommercialSection>
      ) : null}
    </>
  );
}
