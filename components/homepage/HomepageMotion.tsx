'use client';

import { useEffect } from 'react';
import { createResolveViewRegistry, useResolveMotion } from '@/hooks/use-resolve-motion';

/**
 * SESSION 26 — PHASE D — the homepage's class-driven motion, in one leaf.
 *
 * Renders nothing. It exists so that the departure, the friction alignment,
 * the close's arrival and the page's composition reveals do not each need a
 * client wrapper around server-rendered copy: everything they touch is Server
 * Component output that React never re-renders, so a class or attribute added
 * here is safe and permanent.
 *
 * THE CONTRACT THIS LEAF OBEYS — 04_MOTION_IMPLEMENTATION.md §2:
 * it may only ADD an attribute or a class, or write a start state it also
 * guarantees to release. It never injects DOM, text, links or figures, and it
 * never removes content.
 *
 * FAIL OPEN, NEVER FAIL HIDDEN. Every start state below is written HERE, after
 * hydration — never by the server and never by an unconditional stylesheet
 * rule. The server-rendered page therefore has no hidden or displaced content
 * at all, and each armed element is released by whichever comes first: the
 * observer, the ~4s force, or the tab being hidden. Every armed element is
 * below the fold at every validated width, so arming is never seen as a
 * disappearance.
 */

/* thresholds, transcribed from the approved prototype */
const T_REVEAL = 0.12;
const T_DEPARTURE = 0.45;
const T_FRICTION = 0.35;
const T_CLOSE = 0.28;

/** the friction outcomes are held at the end of their own run, then released */
const FRICTION_RELEASE_MS = 1100;
/** the gap between marks in a run, in px — the shared alignment maths needs it */
const RUN_GAP = 7;

export function HomepageMotion() {
  const { mounted, enabled } = useResolveMotion();

  useEffect(() => {
    if (!mounted || !enabled) return;

    const registry = createResolveViewRegistry();
    const timers: ReturnType<typeof setTimeout>[] = [];
    const arm = (el: Element | null) => el?.setAttribute('data-rsv', 'armed');
    const settle = (el: Element | null) => el?.setAttribute('data-rsv', 'on');

    /* ------------------------------------------- composition-only reveals -- */
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.rsv-rv'));
    reveals.forEach((el) => {
      arm(el);
      registry.onView(el, () => settle(el), T_REVEAL);
    });

    /* --------------------------------- the departure carrier and statement -- */
    const departure = document.getElementById('rsv-dep');
    if (departure) {
      arm(departure);
      registry.onView(departure, () => settle(departure), T_DEPARTURE);
    }

    /* ------------------------------------------- the friction alignment -- */
    const friction = document.getElementById('rsv-fail');
    if (friction) {
      arm(friction);
      registry.onView(
        friction,
        () => {
          // Hold each outcome at the natural end of its OWN run, measured from
          // layout offsets (transform-independent, so the armed scale cannot
          // corrupt the measurement), then release it to the shared column the
          // stylesheet already puts it in. The aligned state is the default, so
          // nothing has to win a cascade for the honest end state to show.
          friction.querySelectorAll<HTMLElement>('.rsv-stop').forEach((stop) => {
            const previous = stop.previousElementSibling as HTMLElement | null;
            if (!previous) return;
            const back = Math.round(
              stop.offsetLeft - (previous.offsetLeft + previous.offsetWidth + RUN_GAP)
            );
            if (back > 0) stop.style.setProperty('--rsv-back', `${back}px`);
          });

          // If the document is not being rendered, transitions do not advance,
          // so the displacement would never resolve — the composed alignment
          // stands instead.
          if (document.hidden) {
            settle(friction);
            return;
          }
          friction.setAttribute('data-rsv', 'hold');
          timers.push(setTimeout(() => settle(friction), FRICTION_RELEASE_MS));
        },
        T_FRICTION
      );
    }

    /* ----------------------------------------------- the close's arrival -- */
    const close = document.getElementById('rsv-close');
    if (close) {
      arm(close);
      registry.onView(close, () => settle(close), T_CLOSE);
    }

    /* --------------------------------------------- visibility / background --
       A tab hidden mid-page resumes COMPOSED, never displaced and never
       mid-gesture. Nothing replays: the reader gets the result of every event
       they were not there to see. */
    const onVisibility = () => {
      if (!document.hidden) return;
      timers.forEach(clearTimeout);
      registry.forceAll();
      settle(friction);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      timers.forEach(clearTimeout);
      registry.destroy();
      document.removeEventListener('visibilitychange', onVisibility);
      // Unmounting must never leave the page holding a start state.
      reveals.forEach(settle);
      settle(departure);
      settle(friction);
      settle(close);
    };
  }, [mounted, enabled]);

  return null;
}
