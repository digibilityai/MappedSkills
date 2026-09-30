import { contentfulGraphql, CONTENTFUL_REVALIDATE_SECONDS } from '@/lib/contentful/client';
import {
  GET_ALL_PRESS_RELEASES_QUERY,
  GET_PRESS_RELEASE_BY_SLUG_QUERY,
  GET_PRESS_RELEASE_SLUGS_QUERY,
} from '@/lib/contentful/queries';
import { mapContentfulPressToCard, mapContentfulPressToCms } from '@/lib/contentful/mappers';
import type { CmsPressCard, CmsPressRelease, ContentfulPressRelease } from '@/lib/contentful/types';

type PressCollectionResponse = {
  pressReleaseCollection?: {
    items?: Array<ContentfulPressRelease | null>;
  };
};

function filterNull<T>(items: Array<T | null | undefined>): T[] {
  return items.filter((item): item is T => Boolean(item));
}

export async function getPressListCards(limit = 100): Promise<CmsPressCard[]> {
  const data = await contentfulGraphql<PressCollectionResponse>(
    GET_ALL_PRESS_RELEASES_QUERY,
    { limit },
    CONTENTFUL_REVALIDATE_SECONDS
  );
  return filterNull(data?.pressReleaseCollection?.items || [])
    .map(mapContentfulPressToCard)
    .filter((item): item is CmsPressCard => Boolean(item));
}

export async function getPressReleaseBySlug(slug: string): Promise<CmsPressRelease | null> {
  const data = await contentfulGraphql<PressCollectionResponse>(
    GET_PRESS_RELEASE_BY_SLUG_QUERY,
    { slug, limit: 1 },
    CONTENTFUL_REVALIDATE_SECONDS
  );
  const item = data?.pressReleaseCollection?.items?.[0];
  if (!item) return null;
  return mapContentfulPressToCms(item);
}

export async function getPressStaticParams(): Promise<Array<{ slug: string }>> {
  const data = await contentfulGraphql<PressCollectionResponse>(GET_PRESS_RELEASE_SLUGS_QUERY, {
    limit: 100,
  });
  return filterNull(data?.pressReleaseCollection?.items || [])
    .map((item) => item.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}
