'use client';

import { useEffect } from 'react';

/**
 * Arms the one-time reveal. Nothing is hidden until this runs (`prr-armed` is added to <html> only when motion is allowed),
 * so without script or with reduced motion every panel stays visible. Each `[data-prr-reveal]` element gets `is-in` once,
 * when it first reaches the viewport, and is then left alone (no loops, no scroll-linked motion).
 */
export function PricingR2Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-prr-reveal]'));
    if (reduce || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-in');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );

    targets.forEach((el) => observer.observe(el));
    root.classList.add('prr-armed');

    return () => {
      observer.disconnect();
      root.classList.remove('prr-armed');
    };
  }, []);

  return null;
}
