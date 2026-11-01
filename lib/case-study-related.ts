import type { ServiceRoute } from '@/lib/case-study-library';

/**
 * WHICH LIBRARY STUDIES BELONG ON A SERVICE PAGE OR AN INDUSTRY PAGE. Reads only fields the library already has (the study's service
 * classification, sector and industry name), so nothing is listed per study: a study published later appears on every page it
 * belongs to without a code change, and several studies can share a page.
 */
export type Audience = 'education' | 'd2c' | 'real-estate' | 'enquiry-led';

type Selectable = { href: string; serviceKey: ServiceRoute | null; sector: string | null; industry: string };

const AUDIENCE: Record<Audience, (s: Selectable) => boolean> = {
  education: (s) => s.sector === 'education',
  d2c: (s) => s.sector === 'ecommerce-retail',
  'real-estate': (s) => s.sector === 'real-estate',
  // the sector list has no local-services key, so the enquiry-led page matches on the industry name; professional services (enquiries that
  // become signed engagements) have a sector key, and the Online Library (Libros, owner decision 31 October 2026) is matched by its industry name
  'enquiry-led': (s) => /^local services$/i.test(s.industry) || /^online library$/i.test(s.industry) || s.sector === 'professional-services',
};

/** `exclude`: addresses the page already presents in its own bespoke card (kept as it is, never replaced). */
export function relatedStudies<T extends Selectable>(
  studies: readonly T[],
  by: { service?: ServiceRoute; audience?: Audience; exclude?: readonly string[] }
): T[] {
  const exclude = by.exclude ?? [];
  return studies.filter(
    (s) => !exclude.includes(s.href) && (by.service ? s.serviceKey === by.service : true) && (by.audience ? AUDIENCE[by.audience](s) : true)
  );
}
