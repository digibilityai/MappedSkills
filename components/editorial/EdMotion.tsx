'use client';

import { useEffect } from 'react';
import { BannerFocus } from './BannerFocus';

/**
 * Editorial motion (DEC-112). The keyboard focus protection against the consent banner is the shared `BannerFocus` (DEC-114), mounted here for the
 * editorial pages. Only the evidence charts need script: a chart that starts below the fold is held in its unmarked state and released once, when it is
 * a quarter visible. Charts already in view at load stay as they are. Every value, legend and sentence is real text from the start; nothing is held
 * under reduced motion, without IntersectionObserver, or without script. The opening stage and the image reveal are CSS only (editorial.css).
 */
export function EdMotion() {
  useEffect(() => {
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver !== 'function') return;
    const held = Array.from(document.querySelectorAll<HTMLElement>('[data-ed-evidence]')).filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (!held.length) return;
    held.forEach((el) => el.setAttribute('data-ed', 'pre'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          requestAnimationFrame(() => e.target.setAttribute('data-ed', 'run'));
        }
      },
      { threshold: 0.25 }
    );
    held.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return <BannerFocus />;
}
