import { SECTORS } from '@/lib/case-study-library';
import { clientForHref } from '@/lib/clients';
import { imageSlotsFor } from '@/lib/case-study-images';
import { STUDIES, type WorkStudy as CardStudy } from '../resolve/work';
import type { WorkStudy } from '../cplus/work/studies';

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
  const label = s.sector ? SECTORS[s.sector] : s.industry;
  const base: CardStudy = approved
    ? { ...approved, id: s.slug, art: undefined }
    : {
        id: s.slug,
        eyebrow: [s.service, label].filter(Boolean).join(' · ') || 'Case study',
        title: s.client,
        body: s.challenge,
        href: s.href,
        cta: s.service ? `Read the ${s.service} case study` : 'Read the case study',
      };
  // the card's image comes from the study's listing slot (lib/case-study-images.ts): real artwork, or a disclosed conceptual placeholder
  const slot = imageSlotsFor(s.href).card;
  if (slot?.kind === 'image') return { ...base, art: { src: slot.src, alt: slot.alt, note: slot.note ?? '', logo: slot.logo, position: slot.position } };
  return { ...base, motif: slot?.kind === 'conceptual' ? slot.motif : undefined, clientLogo: clientForHref(s.href) ?? undefined };
}
