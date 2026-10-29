import { SECTORS } from '@/lib/case-study-library';
import { STUDIES, type WorkStudy as CardStudy } from '../resolve/work';
import type { WorkStudy } from '../cplus/work/studies';

/**
 * A `/work` library study as a shared THE RESOLVE case-study card (`components/resolve/WorkCard`). A study that already has
 * an approved card (About, DEC-088) keeps that card's copy, artwork and disclosure, so it reads the same on every page.
 * Any other study is built only from its published listing fields: service and sector (or industry) as the eyebrow, the
 * client as the title, the challenge as the body. No artwork is added for it, so it is a text-only card. No outcome,
 * figure or quote reaches a card.
 */
const APPROVED = Object.values(STUDIES);

export function toCard(s: WorkStudy): CardStudy {
  const approved = APPROVED.find((c) => c.href === s.href);
  if (approved) return { ...approved, id: s.slug };
  const label = s.sector ? SECTORS[s.sector] : s.industry;
  return {
    id: s.slug,
    eyebrow: [s.service, label].filter(Boolean).join(' · ') || 'Case study',
    title: s.client,
    body: s.challenge,
    href: s.href,
    cta: s.service ? `Read the ${s.service} case study` : 'Read the case study',
  };
}
