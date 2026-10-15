'use client';

import { useEffect } from 'react';

/**
 * UI REVAMP GATE 2 — DIRECTION C — sectional motion (L2, T2/T3).
 *
 * Renders nothing. On a page that has hydrated, with motion allowed, it gives
 * every `[data-dc-motion]` element that is still BELOW THE FOLD its pre-state
 * class (`dc-pre`) and removes it, once, when the element is 35% on screen.
 * The resolved state is what the server rendered, so:
 *   - with no JavaScript, under reduced motion, or for anything already on
 *     screen at hydration, nothing ever leaves its composed state;
 *   - nothing loops, nothing is pinned, nothing counts, and an element that has
 *     resolved stays resolved.
 * Transform, opacity and colour only (app/direction-c.css "motion pre-states").
 */
export function DcMotion() {
  useEffect(() => {
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver !== 'function') return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-dc-motion]')).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight
    );
    if (!targets.length) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const release = (el: HTMLElement) => el.classList.remove('dc-pre');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          timers.push(setTimeout(() => release(el), 120));
        });
      },
      { threshold: 0.35 }
    );
    targets.forEach((el) => {
      el.classList.add('dc-pre');
      io.observe(el);
    });

    /* A printed page is always the composed page. */
    const onPrint = () => targets.forEach(release);
    window.addEventListener('beforeprint', onPrint);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('beforeprint', onPrint);
      targets.forEach(release);
    };
  }, []);

  return null;
}
