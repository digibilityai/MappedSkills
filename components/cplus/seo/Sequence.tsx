'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * /seo motion trigger. Every /seo sequence is one state flip that CSS choreographs (`seo.css`), so there are no timers
 * here and nothing loops.
 *   data-seq="idle"  the calm start state (styled only when motion is allowed)
 *   data-seq="run"   the event: CSS transitions play once, then settle in the final state
 *   data-seq="done"  the final state with no transition (reduced motion, no IntersectionObserver, or scrolled past)
 * Without JavaScript nothing is ever set, so the page is in its final state. `trigger="load"` (the hero) is rendered as
 * `idle` by the server, so its start state paints with no flash; the CSS for it also releases itself if this script never
 * runs. `trigger="view"` is armed after mount and runs once when the block is about 40% visible.
 */
export function Sequence({
  children,
  trigger = 'view',
  className,
}: {
  children: ReactNode;
  trigger?: 'load' | 'view';
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver !== 'function') {
      el.dataset.seq = 'done';
      return;
    }

    if (trigger === 'load') {
      // two frames, so the idle state is painted before the event starts
      let second = 0;
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => {
          el.dataset.seq = 'run';
        });
      });
      return () => {
        cancelAnimationFrame(first);
        cancelAnimationFrame(second);
      };
    }

    el.dataset.seq = 'idle';
    void el.offsetHeight; // commit the idle state before anything can run
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const vh = e.rootBounds?.height ?? window.innerHeight;
          if (e.boundingClientRect.bottom < 0) {
            el.dataset.seq = 'done'; // already scrolled past: show the final state, do not replay
            io.disconnect();
            return;
          }
          // 40% of the block, or 45% of the screen for blocks taller than the screen allows 40% of
          if (e.isIntersecting && (e.intersectionRatio >= 0.4 || e.intersectionRect.height >= vh * 0.45)) {
            el.dataset.seq = 'run';
            io.disconnect();
            return;
          }
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  return (
    <div ref={ref} className={className} data-seq={trigger === 'load' ? 'idle' : undefined}>
      {children}
    </div>
  );
}
