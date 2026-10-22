/**
 * THE CASE-STUDY LIBRARY RULES (G7). Shared by the server pages (`/work`, `/work/page/[n]`, `/work/index.json`) and the
 * client filter, so the static pages and the in-browser search can never order, page or filter studies differently.
 *
 * No imports on purpose: unit-testable without the application build, and safe to bundle for the browser.
 *
 * - Sectors: a controlled list. The same keys are the Contentful `sector` field's `in` validation (G7 schema plan).
 *   An unknown value is ignored (the study simply has no sector), never shown or guessed.
 * - Services: only the six current MappedSkills service pages (`DEC-005`; `lib/services.ts`). An unknown value is
 *   ignored. Work outside the catalogue has no service: no tag, no filter option, no substitute (WORK-027 as amended).
 * - Ordering: `listingOrder` ascending (unset last), then the incoming Contentful order (`sys_firstPublishedAt_DESC`).
 */

export const PAGE_SIZE = 12;

/** The library shows search and filters only from this many studies (G1 R3 hid the filter at launch; OD-06). */
export const CONTROLS_MIN_STUDIES = 7;

/** A sector is offered as a filter option only when at least this many public studies use it (no one-study filters). */
export const SECTOR_OPTION_MIN = 2;

export const SECTORS = {
  'real-estate': 'Real estate',
  'education': 'Education and training',
  'financial-services': 'Financial services and insurance',
  'software-technology': 'Software and technology',
  'ecommerce-retail': 'eCommerce and retail',
  'healthcare': 'Healthcare',
  'manufacturing-industrial': 'Manufacturing and industrial',
  'professional-services': 'Professional services',
  'hospitality-food': 'Hospitality and food',
  'other': 'Other',
} as const;
export type SectorKey = keyof typeof SECTORS;

/** Service routes and their short filter names. Must stay equal to the keys of `SERVICES` in `lib/services.ts` (tested). */
export const SERVICE_FILTERS = {
  '/seo': 'SEO',
  '/ai-seo': 'AI search',
  '/google-ads': 'Google Ads',
  '/social-media-ads': 'Social media ads',
  '/conversion-optimization': 'Conversion optimisation',
  '/lead-generation': 'Lead generation',
} as const;
export type ServiceRoute = keyof typeof SERVICE_FILTERS;

export const asSector = (v: unknown): SectorKey | null =>
  typeof v === 'string' && Object.prototype.hasOwnProperty.call(SECTORS, v) ? (v as SectorKey) : null;

export const asService = (v: unknown): ServiceRoute | null =>
  typeof v === 'string' && Object.prototype.hasOwnProperty.call(SERVICE_FILTERS, v) ? (v as ServiceRoute) : null;

/** A listing priority is a positive whole number; anything else counts as unset. */
export const asListingOrder = (v: unknown): number | null =>
  typeof v === 'number' && Number.isInteger(v) && v > 0 ? v : null;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = (iso: string): string | null => {
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  if (!m) return null;
  const i = Number(m[2]) - 1;
  return i >= 0 && i < 12 ? `${MONTHS[i]} ${m[1]}` : null;
};

/**
 * The engagement period as written on cards and pages, from optional Contentful dates. No start date = no period
 * (dates are never invented). Start without end = "Since …".
 */
export function periodLabel(start?: string | null, end?: string | null): string {
  const a = start ? month(start) : null;
  if (!a) return '';
  const b = end ? month(end) : null;
  if (!b) return `Since ${a}`;
  return a === b ? a : `${a} – ${b}`;
}

/** Stable sort: listing priority first, the rest keep their incoming order. */
export function orderStudies<T>(studies: readonly T[], listingOrder: (s: T) => number | null): T[] {
  return studies
    .map((s, i) => ({ s, i }))
    .sort((x, y) => {
      const a = listingOrder(x.s) ?? Infinity;
      const b = listingOrder(y.s) ?? Infinity;
      return a === b ? x.i - y.i : a - b;
    })
    .map(({ s }) => s);
}

export const pageCount = (total: number): number => Math.max(1, Math.ceil(total / PAGE_SIZE));

export function pageSlice<T>(items: readonly T[], page: number): T[] {
  return items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}

/** `/work` for page 1, `/work/page/{n}` after it. */
export const pageHref = (page: number): string => (page <= 1 ? '/work' : `/work/page/${page}`);

/** Lower case, accents removed, whitespace collapsed. */
export const normalise = (s: string): string =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

export type LibraryFilter = { q: string; sector: SectorKey | null; service: ServiceRoute | null };

export type Filterable = { search: string; sector: SectorKey | null; serviceKey: ServiceRoute | null };

/** Every word of the query must appear somewhere in the study's search text (client, industry, sector, service, summary). */
export function filterStudies<T extends Filterable>(studies: readonly T[], f: LibraryFilter): T[] {
  const words = normalise(f.q).split(' ').filter(Boolean);
  return studies.filter(
    (s) =>
      (!f.sector || s.sector === f.sector) &&
      (!f.service || s.serviceKey === f.service) &&
      words.every((w) => s.search.includes(w))
  );
}

export type FacetOption = { value: string; label: string; count: number };

/** Filter options from the public set only: services with at least one study, sectors with `SECTOR_OPTION_MIN`. */
export function facets(studies: readonly Filterable[]): { sectors: FacetOption[]; services: FacetOption[] } {
  const count = <K extends string>(key: (s: Filterable) => K | null) => {
    const m = new Map<K, number>();
    for (const s of studies) {
      const k = key(s);
      if (k) m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  };
  const sec = count((s) => s.sector);
  const svc = count((s) => s.serviceKey);
  return {
    sectors: (Object.keys(SECTORS) as SectorKey[])
      .filter((k) => (sec.get(k) ?? 0) >= SECTOR_OPTION_MIN)
      .map((k) => ({ value: k, label: SECTORS[k], count: sec.get(k)! })),
    services: (Object.keys(SERVICE_FILTERS) as ServiceRoute[])
      .filter((k) => (svc.get(k) ?? 0) >= 1)
      .map((k) => ({ value: k.slice(1), label: SERVICE_FILTERS[k], count: svc.get(k)! })),
  };
}

/** Reads the library state from a query string. Unknown values are dropped, so a bad link shows the full library. */
export function parseLibraryQuery(search: string): LibraryFilter & { page: number } {
  const p = new URLSearchParams(search);
  const page = Number(p.get('p'));
  return {
    q: (p.get('q') ?? '').slice(0, 100),
    sector: asSector(p.get('industry')),
    service: asService(p.get('service') ? `/${p.get('service')}` : null),
    page: Number.isInteger(page) && page > 1 ? page : 1,
  };
}

export function libraryQuery(f: LibraryFilter & { page: number }): string {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set('q', f.q.trim());
  if (f.sector) p.set('industry', f.sector);
  if (f.service) p.set('service', f.service.slice(1));
  if (f.page > 1) p.set('p', String(f.page));
  const s = p.toString();
  return s ? `?${s}` : '';
}

export const isFiltering = (f: LibraryFilter): boolean => Boolean(f.q.trim() || f.sector || f.service);
