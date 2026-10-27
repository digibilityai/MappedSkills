'use client';
import { useLayoutEffect, useRef } from 'react';

/** Plays a one-time entrance for its children when they are first mostly in view. Without script, or under reduced motion,
 * the children stay in their final state. Sets `data-arm` (start state) then `data-play` (settle); CSS does the rest. */
export function InViewOnce({ children, className, threshold = 0.5 }: { children: React.ReactNode; className?: string; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    el.setAttribute('data-arm', '');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.setAttribute('data-play', ''); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => { io.disconnect(); el.removeAttribute('data-arm'); el.removeAttribute('data-play'); };
  }, [threshold]);
  return <div ref={ref} className={className}>{children}</div>;
}
