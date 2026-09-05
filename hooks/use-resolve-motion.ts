'use client';

/**
 * SESSION 26 — PHASE D — THE ONE SHARED MOTION PRIMITIVE.
 *
 * Source of truth: docs/27-production-translation/04_MOTION_IMPLEMENTATION.md §2
 * ("The one shared primitive") and the approved prototype's own `onView` /
 * `pending` mechanism at docs/26-resolve-homepage/prototype/index.html.
 *
 * There is deliberately NO animation library and NO animation framework here.
 * This file contains exactly two things:
 *
 *   1. `useResolveMotion()` — is motion allowed AT ALL right now.
 *   2. `createResolveViewRegistry()` — fire a callback ONCE when an element
 *      enters view, with the three robustness mechanisms the production plan
 *      makes non-negotiable.
 *
 * THE ROBUSTNESS CONTRACT (04_MOTION_IMPLEMENTATION.md §2):
 *   - fires once, never replays;
 *   - ALSO forced after ~4s from registration, because an IntersectionObserver
 *     does not run in a hidden or throttled tab and nothing on the page may
 *     depend on the observer having run;
 *   - works with no IntersectionObserver at all (the callback runs immediately);
 *   - a callback may only ADD a class / attribute or REMOVE an inline start
 *     state. It may never inject DOM, text, links or figures.
 *   - everything is torn down on unmount; no listener may accumulate.
 */

import { useEffect, useState } from 'react';

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

/** ~4s safety floor. The mechanism is the observer; this is the floor. */
export const RESOLVE_FORCE_AFTER_MS = 4000;

export type ResolveMotionState = {
  /** the component has hydrated — JavaScript is actually running */
  mounted: boolean;
  /** the reader asked for reduced motion */
  reduced: boolean;
  /** motion may play: hydrated AND not reduced */
  enabled: boolean;
};

/**
 * Every Phase D component renders its COMPOSED END STATE while this returns
 * `mounted: false`. That is what makes the server-rendered, no-JS and
 * pre-hydration page identical to the approved Phase C static baseline: no
 * start state is ever written by the server, so nothing can be left hidden by
 * an enhancement that never arrived.
 */
export function useResolveMotion(): ResolveMotionState {
  const [state, setState] = useState<ResolveMotionState>({
    mounted: false,
    reduced: false,
    enabled: false,
  });

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      setState({ mounted: true, reduced: false, enabled: true });
      return;
    }
    const mq = window.matchMedia(REDUCE_QUERY);
    const apply = () =>
      setState({ mounted: true, reduced: mq.matches, enabled: !mq.matches });
    apply();
    // A reader who turns reduced motion ON mid-page gets the resolved state.
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return state;
}

export type ResolveViewRegistry = {
  /** register `fn` to run ONCE when `el` reaches `threshold` visibility */
  onView(el: Element | null | undefined, fn: () => void, threshold?: number): void;
  /** run every still-pending callback now (composes everything) */
  forceAll(): void;
  /** disconnect every observer and clear every timer */
  destroy(): void;
};

/**
 * One registry per client leaf, created inside an effect and destroyed on
 * unmount. Observers are shared per threshold so a page with twenty reveals
 * still allocates a single observer for them.
 */
export function createResolveViewRegistry(
  forceAfterMs: number = RESOLVE_FORCE_AFTER_MS
): ResolveViewRegistry {
  const observers = new Map<number, IntersectionObserver>();
  const runners = new WeakMap<Element, () => void>();
  const pending = new Set<() => void>();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let destroyed = false;

  const forceAll = () => {
    // copy first: each runner removes itself from `pending`
    Array.from(pending).forEach((run) => run());
  };

  const registry: ResolveViewRegistry = {
    onView(el, fn, threshold = 0.3) {
      if (destroyed || !el) return;

      let done = false;
      const run = () => {
        if (done) return;
        done = true;
        pending.delete(run);
        observers.get(threshold)?.unobserve(el);
        fn();
      };

      // No IntersectionObserver: the reader gets the composed end state now.
      if (typeof IntersectionObserver === 'undefined') {
        run();
        return;
      }

      pending.add(run);
      runners.set(el, run);

      let io = observers.get(threshold);
      if (!io) {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) runners.get(entry.target)?.();
            });
          },
          { threshold }
        );
        observers.set(threshold, io);
      }
      io.observe(el);

      if (timer === undefined) timer = setTimeout(forceAll, forceAfterMs);
    },

    forceAll,

    destroy() {
      destroyed = true;
      observers.forEach((io) => io.disconnect());
      observers.clear();
      pending.clear();
      if (timer !== undefined) clearTimeout(timer);
      timer = undefined;
    },
  };

  return registry;
}
