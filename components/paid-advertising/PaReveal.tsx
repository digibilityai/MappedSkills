'use client';
import { useEffect } from 'react';

/**
 * Progressive entrance for `[data-reveal]` elements inside `.pa`. Everything is visible without script; only elements
 * that start below the first screen are marked pending after mount, then released as they enter view. Reduced motion
 * leaves the page untouched. No scroll listeners, no scroll hijacking.
 */
export function PaReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.pa [data-reveal]'));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).removeAttribute('data-pending'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue;
      el.setAttribute('data-pending', '');
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return null;
}
