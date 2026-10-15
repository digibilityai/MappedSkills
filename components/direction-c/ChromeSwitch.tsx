'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LEGACY_CHROME_ROUTES } from '@/components/direction-c/nav';

/**
 * UI REVAMP — route-scoped chrome seam.
 *
 * Gate 2 introduced this seam so Direction C's navigation and footer could be
 * proven on `/`, `/services` and `/seo` without changing any other route.
 *
 * GATE 4 B1 (DEC-037, strategy S3): the rule is inverted. Direction C chrome
 * renders on EVERY route by default; the legacy header and footer render only
 * for a pathname listed in `LEGACY_CHROME_ROUTES` (nav.ts), which is empty and
 * exists solely as a one-line rollback for an individual route. The legacy
 * components are kept, unrendered, until B11 deletes them with this seam.
 *
 * WHY NOT A ROUTE GROUP: moving `app/page.tsx` into a group would break
 * `scripts/verify-server-files.cjs`, which the deploy path requires to find
 * that file, and would move two more route files.
 *
 * `usePathname()` is available during server rendering, so the correct chrome
 * is in the first HTML response — there is no client-side swap or flash.
 */
export function ChromeSwitch({ legacy, next }: { legacy: ReactNode; next: ReactNode }) {
  const pathname = usePathname();
  return <>{pathname && LEGACY_CHROME_ROUTES.has(pathname) ? legacy : next}</>;
}
