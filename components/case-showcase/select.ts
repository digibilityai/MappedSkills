import { CONTROLS_MIN_STUDIES, SECTOR_OPTION_MIN, type SectorKey, type ServiceRoute } from '@/lib/case-study-library';

/**
 * Selection rules of the reusable case showcase. Pure, so they can be tested without the application build.
 * The studies passed in are always the public library (`loadLibrary().all`: published, eligible, preview content only where the local preview
 * switches allow it), so nothing here can reveal an unpublished study.
 */
export const SHOWCASE_MAX = 3;

type Selectable = { href: string; serviceKey: ServiceRoute | null; sector?: SectorKey | string | null };

/** The page's preferred cases, in its order, that are in the library; then (optionally) the library's other studies of one service; at most `max`. */
export function selectCases<T extends Selectable>(all: readonly T[], preferred: readonly string[], opts: { fillService?: ServiceRoute; fillWhere?: (s: T) => boolean; max?: number } = {}): T[] {
  const max = opts.max ?? SHOWCASE_MAX;
  const picked: T[] = [];
  for (const href of preferred) {
    const s = all.find((x) => x.href === href);
    if (s && !picked.includes(s)) picked.push(s);
  }
  if (opts.fillService) for (const s of all) if (picked.length < max && s.serviceKey === opts.fillService && !picked.includes(s)) picked.push(s);
  if (opts.fillWhere) for (const s of all) if (picked.length < max && opts.fillWhere(s) && !picked.includes(s)) picked.push(s);
  return picked.slice(0, max);
}

/**
 * Where "View all" goes. `/work?service=...` filters the complete library, but `/work` shows its filter controls and applies the filter only from
 * `CONTROLS_MIN_STUDIES` public studies; below that a filtered link would land on the unfiltered library. So the link promises a filter only when
 * the library can keep the promise; otherwise it is the plain library link with a plain label. `/work` itself is not touched.
 */
export function viewAllTarget(all: readonly Selectable[], service: ServiceRoute, filteredLabel: string, plainLabel = 'View all case studies'): { href: string; label: string; filtered: boolean } {
  const filtered = all.length >= CONTROLS_MIN_STUDIES && all.some((s) => s.serviceKey === service);
  return filtered ? { href: `/work?service=${service.slice(1)}`, label: filteredLabel, filtered } : { href: '/work', label: plainLabel, filtered };
}

/**
 * "View all" for a page that is about an industry rather than a service: `/work?industry=<sector>` when the library shows its controls and offers that
 * sector as an option (at least `SECTOR_OPTION_MIN` public studies), otherwise the plain library link. A page with no accurate existing filter
 * (`sector` undefined, `service` undefined) always gets the plain link.
 */
export function viewAllFor(
  all: readonly Selectable[],
  by: { service?: ServiceRoute; sector?: SectorKey },
  filteredLabel: string,
  plainLabel = 'View all case studies'
): { href: string; label: string; filtered: boolean } {
  if (by.service) return viewAllTarget(all, by.service, filteredLabel, plainLabel);
  const ok = !!by.sector && all.length >= CONTROLS_MIN_STUDIES && all.filter((s) => s.sector === by.sector).length >= SECTOR_OPTION_MIN;
  return ok ? { href: `/work?industry=${by.sector}`, label: filteredLabel, filtered: true } : { href: '/work', label: plainLabel, filtered: false };
}
