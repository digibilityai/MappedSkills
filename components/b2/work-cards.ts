import { SECTORS } from '@/lib/case-study-library';
import { clientForHref } from '@/lib/clients';
import { imageSlotsFor } from '@/lib/case-study-images';
import { presentationFor } from '@/lib/case-study-presentation';
import { STUDIES, type WorkStudy as CardStudy } from '../resolve/work';
import type { WorkStudy } from '../cplus/work/studies';
import type { Motif } from '../case-study/CaseArt';

/**
 * A `/work` library study as a shared THE RESOLVE case-study card (`components/resolve/WorkCard`). A study that already has
 * an approved card (About, DEC-088) keeps that card's copy, artwork and disclosure, so it reads the same on every page.
 * Any other study is built only from its published listing fields: service and sector (or industry) as the eyebrow, the
 * client as the title, the challenge as the body. No artwork is added for it, so it is a text-only card unless it has a code-drawn conceptual illustration (components/case-study/CaseArt.tsx, /work only; About keeps its approved cards). No outcome,
 * figure or quote reaches a card.
 */
const APPROVED = Object.values(STUDIES);

export function toCard(s: WorkStudy): CardStudy {
  const approved = APPROVED.find((c) => c.href === s.href);
  const copy = presentationFor(s.href, s.finalCopy).card;
  const label = s.sector ? SECTORS[s.sector] : s.industry;
  const base: CardStudy = approved
    ? { ...approved, id: s.slug, art: undefined }
    : {
        id: s.slug,
        eyebrow: copy?.eyebrow ?? ([s.service, label].filter(Boolean).join(' · ') || 'Case study'),
        title: s.client,
        body: copy?.body ?? s.challenge,
        href: s.href,
        cta: copy?.cta ?? (s.service ? `Read the ${s.service} case study` : 'Read the case study'),
      };
  // the card's image comes from the study's listing slot (lib/case-study-images.ts): real artwork, or a disclosed conceptual placeholder
  const slot = imageSlotsFor(s.href, undefined, s.finalCopy).card;
  if (slot?.kind === 'image') return { ...base, art: { src: slot.src, alt: slot.alt, note: '', logo: slot.logo, position: slot.position } };
  return { ...base, motif: slot?.kind === 'conceptual' ? slot.motif : undefined, clientLogo: clientForHref(s.href) ?? undefined };
}

/**
 * The /work library card (R2): everything `WorkLibCard` shows, from the same sources as `toCard` (approved copy, then the study's own
 * listing fields; the image from its listing slot) plus the study's lead figure. The service is shown only for a study that has a
 * catalogue service key, using the service words of its existing card eyebrow ("Meta Ads", "Google Ads", "SEO"); a study without one
 * (ClassPe, InsurYo) shows none. No industry is shown (the industry filter stays). The image keeps its own ratio.
 */
export type LibCard = {
  id: string;
  href: string;
  name: string;
  service: string | null;
  art: { src: string; alt: string; w: number; h: number; position?: string } | null;
  motif?: Motif;
  lead: { v: string; c: string } | null;
  summary: string;
};

export function toLibCard(s: WorkStudy): LibCard {
  const base = toCard(s);
  const slot = imageSlotsFor(s.href, undefined, s.finalCopy).card;
  const head = (base.eyebrow || '').split(' · ')[0].trim();
  const service = s.serviceKey ? (/\b(ads|seo|search|lead|conversion)\b/i.test(head) ? head : s.service) : null;
  return {
    id: s.slug,
    href: s.href,
    name: s.client,
    service,
    art: slot?.kind === 'image' ? { src: slot.src, alt: slot.alt, w: slot.w ?? 1600, h: slot.h ?? 1000, position: slot.position } : null,
    motif: slot?.kind === 'conceptual' ? slot.motif : undefined,
    lead: s.lead ?? null,
    summary: base.body,
  };
}
