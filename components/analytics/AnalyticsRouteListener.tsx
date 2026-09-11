'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { EVENTS, pageTypeOf, safePagePath, track } from '@/lib/analytics';
import { recordPageView } from '@/lib/attribution';

/**
 * SESSION 32 — PHASE H2 — pageview and acquisition capture, in one place.
 *
 * WHY THIS EXISTS AT ALL. GTM's snippet injects `gtm.js` once per document, and
 * a container's default "All Pages" trigger fires when that container loads —
 * ONCE. Under the App Router every subsequent navigation is a client-side render
 * with no new document, so WITHOUT THIS COMPONENT A GTM SITE MEASURES ONE
 * PAGEVIEW PER VISIT no matter how many pages are read. That is the standard
 * single-page-application defect and it is not detectable by reading the GTM
 * snippet, which is why the session brief requires pageview behaviour to be
 * audited rather than assumed.
 *
 * ONE LISTENER, MOUNTED ONCE, IN THE ROOT LAYOUT. Not a hook repeated per route,
 * because per-route hooks are how a page ends up counted twice.
 *
 * `usePathname()` AND DELIBERATELY NOT `useSearchParams()`. Reading search
 * params through the Next hook opts every route that contains it out of static
 * rendering — it would convert this site's static pages to dynamic ones as a
 * side effect of adding analytics, which the session brief treats as an
 * unexplained route-mode change. The query string is read from
 * `window.location.search` inside the effect instead, where it is a plain
 * browser value with no rendering consequence. It never reaches an event
 * payload: `page_path` is path-only by `EVENT_TAXONOMY.md` §7.
 *
 * ORDER MATTERS. Acquisition is recorded BEFORE the pageview is emitted, so the
 * first pageview of a campaign visit is emitted with the campaign already
 * stored and available to anything that reads it later in the session.
 *
 * NO PII, AND STRUCTURALLY SO. The only values this component can emit are a
 * path and a category derived from that path. It cannot see a form, a field or
 * a submitted value.
 *
 * REQUIRED CONTAINER CONFIGURATION, recorded because it cannot be enforced from
 * here. The GA4 configuration tag must have automatic page-view sending
 * DISABLED, and a page-view tag must trigger on this custom `page_view` event.
 * Leaving both on — the container's own load trigger AND this event — double
 * counts the first page of every visit. This repository cannot see the
 * container, so it is stated as an owner action rather than claimed as done.
 */
export function AnalyticsRouteListener() {
  const pathname = usePathname();

  /**
   * Guards the pathname that has already been reported. React may run an effect
   * twice for the same committed value — Strict Mode in development does so
   * deliberately — and a pageview counted twice is a reporting defect, so the
   * comparison is against a ref rather than against the dependency array alone.
   */
  const lastReportedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (lastReportedRef.current === pathname) return;
    lastReportedRef.current = pathname;

    // Acquisition first. Internal navigation records nothing — `readAcquisition`
    // returns null for a same-site referrer — so this cannot overwrite a
    // campaign touch as the visitor moves around the site.
    recordPageView();

    const path = safePagePath(pathname);
    track(EVENTS.PAGE_VIEW, {
      page_path: path,
      page_type: pageTypeOf(path),
    });
  }, [pathname]);

  return null;
}
