'use client';
import { useEffect } from 'react';

/** Calm, once-only entrances for `.rv3 [data-rv]`. Visible without script; only blocks below the first screen are marked
 * pending after mount, then released as they enter view. Reduced motion leaves the page untouched. */
export function RvReveal3() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv3 [data-rv]'));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).removeAttribute('data-pending'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue;
      el.setAttribute('data-pending', '');
      io.observe(el);
    }
    return () => { io.disconnect(); els.forEach((el) => el.removeAttribute('data-pending')); };
  }, []);
  return null;
}
