'use client';

import { useConsent } from '@/components/analytics/ConsentProvider';

/**
 * SESSION 33 — PHASE H2 — the way back to the consent decision.
 *
 * WITHDRAWAL HAS TO BE AS EASY AS CONSENT, and a banner that never returns is
 * a one-way door. This reopens the same banner with the same two buttons, so a
 * visitor who accepted can reject and a visitor who rejected can accept, from
 * every page on the site, in one click.
 *
 * WHAT REJECTING AFTER ACCEPTING ACTUALLY DOES, stated honestly because a
 * control that overstates its effect is worse than no control:
 *   - `analytics_storage` is pushed back to `denied` immediately, and Google's
 *     tag stops writing analytics storage from that moment.
 *   - The container script, if it already loaded on this page, cannot be
 *     unloaded — no browser can unload an executed script. It is not loaded
 *     again on any subsequent page load.
 * That is exactly what Consent Mode v2 is for, and it is why the state is
 * pushed as a consent command rather than simulated by unmounting a tag.
 *
 * IT RENDERS NOTHING UNTIL THE STORED VALUE HAS BEEN READ, which also means it
 * renders nothing in the server HTML and therefore nothing at all with
 * JavaScript disabled. That is correct rather than incidental: without
 * JavaScript there is no banner to reopen, no stored decision to change and no
 * analytics running to withdraw from, so a visible control that could do none
 * of those things would be a lie in the footer. The footer's legal row is then
 * byte-for-byte the Phase B row it has always been.
 *
 * IT IS A BUTTON, BECAUSE IT IS AN ACTION. It goes nowhere and has no URL, so
 * it must not be an `<a>`. It carries the footer's own link styling so it reads
 * as part of that row, and it keeps a 40px target and the site's focus
 * treatment on the dark footer surface.
 */
export function ConsentPreferencesLink({ className }: { className?: string }) {
  const { hydrated, reopen } = useConsent();

  if (!hydrated) return null;

  return (
    <button type="button" onClick={reopen} className={className}>
      Analytics preferences
    </button>
  );
}
