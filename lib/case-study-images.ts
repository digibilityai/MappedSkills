import { STUDIES, type WorkArt } from '@/components/resolve/work';
import { MOTIF_NOTE, motifFor, type Motif } from '@/components/case-study/CaseArt';

/**
 * THE TWO IMAGE SLOTS OF A CASE STUDY (Stage 3B). Every study has two independent slots, so either can be replaced on its own
 * without touching a component:
 * - `card`: the listing image on /work. Recommended source 1600 x 1000 px (8:5). Today's card areas are 1.7:1 (lead), 1.4:1
 *   (library), 1.2:1 (side) and 1.3:1 on mobile, cropped with `object-fit: cover` around the centre.
 * - `feature`: the detail-page stage image. Recommended source 1920 x 1080 px (16:9). Today's stage is 2.6:1 on desktop (a 16:9
 *   image loses about a third of its height), 2:1 on tablet and 1.3:1 on mobile. Keep the subject in the central 70% x 60%.
 *   Changing the stage ratios is a separate, unapproved decision; this file does not change them.
 *
 * A slot is either REAL artwork (`image`, served at its own pixels and never upscaled) or a TEMPORARY code-drawn conceptual
 * placeholder (`conceptual`, see CaseArt.tsx), always carrying its disclosure note. A placeholder is never presented as client
 * artwork, a screenshot, a photograph, a chart or a result. Replacing a slot means editing that one entry (or, later,
 * supplying an optional Contentful Asset, below); the components render whichever kind they are given.
 *
 * FUTURE CONTENTFUL. `CmsImageFields` is the shape of two optional Asset fields (`listingImage`, `featureImage`) that a later,
 * separately authorised schema change may add. They are NOT queried or read today (no migration, queries unchanged); when
 * present they would take precedence per slot, with the asset's own `description` as alt text.
 */
export const SLOT_SPEC = {
  card: { w: 1600, h: 1000, ratio: '8:5' },
  feature: { w: 1920, h: 1080, ratio: '16:9' },
} as const;

export type ImageSlot =
  | { kind: 'image'; src: string; w?: number; h?: number; alt: string; note?: string; logo?: WorkArt['logo'] }
  | { kind: 'conceptual'; motif: Motif; note: string };

export type ImageSlots = { card: ImageSlot | null; feature: ImageSlot | null };

export type CmsImageAsset = { url: string; width?: number | null; height?: number | null; description?: string | null; title?: string | null };
export type CmsImageFields = { listingImage?: CmsImageAsset | null; featureImage?: CmsImageAsset | null };

const placeholder = (href: string): ImageSlot | null => {
  const motif = motifFor(href);
  return motif ? { kind: 'conceptual', motif, note: MOTIF_NOTE } : null;
};

/** Om Sai's approved artwork (1080 x 688). It is the only existing image, so both slots reference it until a second is supplied. */
const omSai = (): ImageSlot => {
  const a = STUDIES['om-sai'].art!;
  return { kind: 'image', src: a.src, w: 1080, h: 688, alt: a.alt, note: a.note, logo: a.logo };
};

/** The slots by page address. A study with no entry has no image in either slot (text-only card, no stage). */
const SLOTS: Record<string, ImageSlots> = {
  '/portfolio/om-sai-developer-meta-ads': { card: omSai(), feature: omSai() },
  '/portfolio/classpe-social-media-strategy': { card: placeholder('/portfolio/classpe-social-media-strategy'), feature: placeholder('/portfolio/classpe-social-media-strategy') },
  '/portfolio/insuryo-organic-growth': { card: placeholder('/portfolio/insuryo-organic-growth'), feature: placeholder('/portfolio/insuryo-organic-growth') },
  '/portfolio/google-ads-for-online-courses': { card: placeholder('/portfolio/google-ads-for-online-courses'), feature: placeholder('/portfolio/google-ads-for-online-courses') },
  '/portfolio/seo-ameba-software': { card: placeholder('/portfolio/seo-ameba-software'), feature: placeholder('/portfolio/seo-ameba-software') },
  // unlisted (not on /work) but live: only its own page uses its stage
  '/portfolio/seo-for-home-decor-brand': { card: null, feature: placeholder('/portfolio/seo-for-home-decor-brand') },
};

const fromAsset = (a: CmsImageAsset | null | undefined): ImageSlot | null =>
  a?.url ? { kind: 'image', src: a.url, w: a.width ?? undefined, h: a.height ?? undefined, alt: a.description?.trim() || a.title?.trim() || '' } : null;

export function imageSlotsFor(href: string, cms?: CmsImageFields | null): ImageSlots {
  const base = SLOTS[href] ?? { card: null, feature: null };
  return { card: fromAsset(cms?.listingImage) ?? base.card, feature: fromAsset(cms?.featureImage) ?? base.feature };
}
