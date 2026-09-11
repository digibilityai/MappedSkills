'use client';

import { EVENTS, pageTypeOf, safePagePath, track } from '@/lib/analytics';

/**
 * SESSION 32 — PHASE H2 — the booking-page link, with one diagnostic event.
 *
 * WHAT THIS IS NOT. It is NOT a booking conversion, and nothing downstream may
 * treat it as one.
 *
 *   - No booking vendor has ever been recorded as an approved selection.
 *   - `NEXT_PUBLIC_CALENDLY_URL` is empty in `.env.example`, so this link falls
 *     back to a hard-coded default that NO RECORD IN THIS REPOSITORY CONFIRMS IS
 *     A REAL, BOOKABLE ACCOUNT.
 *   - There is no booking webhook, so the server cannot learn that a meeting was
 *     booked, rescheduled, cancelled or attended.
 *
 * The destination is a third-party page on another origin. What happens there is
 * unobservable from here, so the ONLY honest statement this component can make
 * is that a visitor left for the booking page. `EVENT_TAXONOMY.md` §2 row 6
 * defines exactly that — `meeting_started`, "Booking surface opened", client
 * authority — and §4 lists it explicitly among the events that are NOT a
 * business conversion. The approved name is used unchanged rather than a new
 * one invented, because event names are the contract in that document.
 *
 * `meeting_booked` IS THE CONVERSION AND IT IS NOT IMPLEMENTED. It requires a
 * webhook the vendor has not been chosen to provide. BOOKING REMAINS
 * OWNER-BLOCKED, and this event must never be reported as a booked meeting.
 *
 * PRESENTATION IS UNCHANGED. Every class, style and attribute is the Phase G
 * markup this replaced, moved verbatim behind a client boundary. It stays a
 * plain `<a href>` with a real destination, so it works with JavaScript
 * disabled, opens in a new tab the same way, keeps `rel="noopener noreferrer"`,
 * and remains reachable and activatable by keyboard exactly as before. The
 * event is additive: `track` never throws and nothing is awaited, so a blocked
 * or failed analytics layer cannot prevent the navigation.
 */
export function BookingLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  function handleClick() {
    const path =
      typeof window === 'undefined' ? '/schedule-call' : safePagePath(window.location.pathname);
    track(EVENTS.MEETING_STARTED, {
      page_path: path,
      page_type: pageTypeOf(path),
      // `CTA_SYSTEM.md` vocabulary, from `EVENT_TAXONOMY.md` §3. The destination
      // host is deliberately NOT sent: it comes from an environment variable and
      // saying which vendor a click went to adds nothing while no vendor is
      // confirmed.
      cta_location: 'inline',
      cta_role: 'direct',
      conversion_surface: 'booking',
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
