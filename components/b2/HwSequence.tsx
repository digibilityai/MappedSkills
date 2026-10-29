'use client';
import { useEffect } from 'react';

/**
 * Once-only diagram sequences for `/how-it-works` (the homepage PathFlow convention). Every word is in the HTML and readable
 * before and without the animation; the settled diagram is the base style. Script only arms `[data-hw-seq]` diagrams that
 * start below the fold, then plays each once when it scrolls into view. Reduced motion, no IntersectionObserver or no
 * script: nothing is armed and the settled diagram is shown. No scroll listeners, no scroll hijacking, nothing loops.
 */
export function HwSequence() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.hw [data-hw-seq]'))
      .filter((el) => el.getBoundingClientRect().top >= window.innerHeight * 0.8);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute('data-anim', 'play');
        io.unobserve(e.target);
      }
    }, { threshold: 0.3 });
    for (const el of els) { el.setAttribute('data-anim', 'armed'); io.observe(el); }
    return () => { io.disconnect(); els.forEach((el) => el.removeAttribute('data-anim')); };
  }, []);
  return null;
}
