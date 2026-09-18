'use client';

import { useEffect, useRef } from 'react';
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

  /* PHASE E — ARMING IS DECIDED ONCE, AT MOUNT.
     If motion was not available on the reader's FIRST paint, the page has
     already been composed for them and it stays composed. Turning reduced
     motion off half-way down the page therefore adds nothing and, crucially,
     takes nothing away: without this, the section the reader was looking at
     vanished and faded back in. Measured before this guard existed: flipping
     the preference off re-armed 17 of the 21 reveals and re-armed the chain,
     which dropped to 46% scale and 0.42 opacity. */
  const armingAllowed = useRef<boolean | null>(null);

  useEffect(() => {
    if (!mounted) return;
    if (armingAllowed.current === null) armingAllowed.current = enabled;
    if (!enabled || !armingAllowed.current) return;

    const registry = createResolveViewRegistry();
    const timers: ReturnType<typeof setTimeout>[] = [];
    const settle = (el: Element | null) => el?.setAttribute('data-rsv', 'on');

    // PHASE E — NEVER RE-ARM WHAT IS ALREADY SETTLED.
    // This effect re-runs whenever the reduced-motion preference changes. A
    // reader who turns reduced motion OFF part-way down the page must not watch
    // the section they are reading disappear and fade back in. Measured before
    // this guard existed: switching the preference off re-armed 17 of the 21
    // reveals and re-armed the chain, which shrank to 46% and faded.
    // The same principle applies within a single page view: a restored scroll
    // position (the reader pressing Back) can put a section on screen before
    // this leaf mounts. Nothing already on screen is armed — it is simply left
    // composed. On a first load every `.rsv-rv` sits below the fold at every
    // validated width, so this costs nothing there.
    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };
    const arm = (el: Element | null) => {
      if (!el || el.getAttribute('data-rsv') === 'on') return false;
      if (onScreen(el)) {
        settle(el);
        return false;
      }
      el.setAttribute('data-rsv', 'armed');
      return true;
    };

    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.rsv-rv'));
    const departure = document.getElementById('rsv-dep');
    const friction = document.getElementById('rsv-fail');
    const close = document.getElementById('rsv-close');

    /* PHASE E — THE LAST RESORT. If anything at all in the registration pass
       below fails, every element this leaf touches is composed and the page is
       simply the Phase C page. An uncaught error here would instead propagate
       out of the effect and tear down the React root, and any element already
       armed would stay hidden until the ~4s fallback. */
    const settleEverything = () => {
      reveals.forEach(settle);
      settle(departure);
      settle(friction);
      settle(close);
    };

    try {

    /* ------------------------------------------- composition-only reveals -- */
    reveals.forEach((el) => {
      if (!arm(el)) return;
      registry.onView(el, () => settle(el), T_REVEAL);
    });

    /* --------------------------------- the departure carrier and statement -- */
    if (departure && arm(departure)) {
      registry.onView(departure, () => settle(departure), T_DEPARTURE);
    }

    /* ------------------------------------------- the friction alignment -- */
    if (friction && arm(friction)) {
      registry.onView(
        friction,
        () => {
          // Hold each outcome at the natural end of its OWN run, measured from
          // layout offsets (transform-independent, so the armed scale cannot
          // corrupt the measurement), then release it to the shared column the
          // stylesheet already puts it in. The aligned state is the default, so
          // nothing has to win a cascade for the honest end state to show.
          // Every offset is READ first and every custom property WRITTEN after.
          // Interleaving them made each write invalidate style before the next
          // stop's read, forcing a synchronous reflow per stop. Same values,
          // same end state — ported from `main` (`de16f5c` lineage) during the
          // repository reconciliation.
          const pending: { stop: HTMLElement; back: number }[] = [];
          friction.querySelectorAll<HTMLElement>('.rsv-stop').forEach((stop) => {
            const previous = stop.previousElementSibling as HTMLElement | null;
            if (!previous) return;
            const back = Math.round(
              stop.offsetLeft - (previous.offsetLeft + previous.offsetWidth + RUN_GAP)
            );
            pending.push({ stop, back });
          });
          for (const { stop, back } of pending) {
            if (back > 0) stop.style.setProperty('--rsv-back', `${back}px`);
          }

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
    if (close && arm(close)) {
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
      settleEverything();
    };

    } catch {
      timers.forEach(clearTimeout);
      registry.destroy();
      settleEverything();
      return;
    }
  }, [mounted, enabled]);

  return null;
}
