'use client';

import { useEffect } from 'react';

/**
 * C+ motion: the approved prototype's ProtoMotion (proto/direction-c-plus 0a8b611), with the same behaviour.
 *   - `[data-rv]` blocks that start below the fold are held (`rv-pre`) and released once when they scroll into view.
 *     Content is never hidden by default: nothing is held without JavaScript, under reduced motion, without
 *     IntersectionObserver, or in print.
 *   - `[data-count]` numbers (the homepage's published counts) count up once from 0 to their own printed value; the
 *     DOM holds the real value before and after, and a visually hidden copy carries it for assistive technology.
 */
export function CplusMotion() {
  useEffect(() => {
    const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('px-js');
    if (reduce || typeof IntersectionObserver !== 'function') return;

    const held = Array.from(document.querySelectorAll<HTMLElement>('[data-rv]')).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92
    );
    held.forEach((el) => {
      el.classList.add('rv-pre');
      el.querySelectorAll<HTMLElement>('[data-rv-i]').forEach((c, i) => c.style.setProperty('--rv-i', String(i)));
    });

    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    const runCount = (el: HTMLElement) => {
      const to = Number(el.dataset.count);
      if (!Number.isFinite(to) || to === 0) return;
      const t0 = performance.now();
      const dur = 900;
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = String(Math.round(to * e));
        if (k < 1) requestAnimationFrame(step);
        else el.textContent = String(to);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          if (el.dataset.count !== undefined) runCount(el);
          else {
            el.classList.remove('rv-pre');
            el.classList.add('rv-in');
          }
        }
      },
      { threshold: 0.25 }
    );
    held.forEach((el) => io.observe(el));
    counters.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.6).forEach((el) => io.observe(el));

    const onPrint = () => held.forEach((el) => el.classList.remove('rv-pre'));
    window.addEventListener('beforeprint', onPrint);
    return () => {
      io.disconnect();
      window.removeEventListener('beforeprint', onPrint);
      held.forEach((el) => el.classList.remove('rv-pre'));
    };
  }, []);
  return null;
}
