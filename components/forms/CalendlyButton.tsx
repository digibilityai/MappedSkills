'use client';

/**
 * SESSION 34 — PHASE H2A — the direct `window.gtag` emitter is REMOVED.
 *
 * WHAT WAS HERE. `window.gtag('event','schedule_call_click', …)`, behind a
 * `typeof window.gtag` guard.
 *
 * WHY NO H2 EVENT REPLACED IT, EVEN THOUGH ONE WOULD FIT. `schedule_call_click`
 * is semantically "booking surface opened", which IS in the taxonomy as
 * `meeting_started`. It was not wired up here for one reason: **this component
 * is not rendered anywhere.** `components/CalendlyButton.tsx` re-exports it and
 * nothing imports either. Adding an emitter to unreachable code would create a
 * second, untested source of a conversion-adjacent event.
 *
 * `components/analytics/BookingLink.tsx` IS THE COMPONENT THAT DOES THIS JOB,
 * it already emits `meeting_started` through `lib/analytics.ts`, and it is the
 * one that is actually rendered. If a booking button is ever needed again, use
 * it rather than reviving this file. That this file duplicates it is recorded
 * as debt in the H2A documentation; deleting a component is outside the scope
 * of an analytics-surface change and was not done here.
 *
 * `meeting_started` REMAINS DIAGNOSTIC ONLY. It is not a booking, and
 * `meeting_booked` is still not implemented.
 *
 * NOTHING A VISITOR SEES OR DOES HAS CHANGED. The button still opens the same
 * destination in a new tab with the same `noopener,noreferrer`.
 */

import { Button } from '@/components/ui/button';

/*
 * `variant` and `size` are derived from `Button`'s OWN prop types rather than
 * restated. The restated union declared `size?: 'sm' | 'md' | 'lg'`, but the
 * button has no `'md'` size — its middle step is `'default'` — so this file
 * raised the repository's only TypeScript error. Deriving the types means the
 * two cannot drift apart again. No call site passed `'md'`: there is no call
 * site at all (see the note above), so nothing rendered changes.
 */
interface CalendlyButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
  className?: string;
}

export function CalendlyButton({
  href,
  children,
  variant = 'default',
  size = 'lg',
  className,
}: CalendlyButtonProps) {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
