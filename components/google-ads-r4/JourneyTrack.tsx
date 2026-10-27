'use client';
import { useEffect, useRef } from 'react';
import { JOURNEY } from './content';

/** Connected buyer journey. The finished state is the base style (no script, reduced motion). With script and motion, the
 * track is held back once the section is near and then drawn stage by stage, a single time. */
export function JourneyTrack() {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) { el.dataset.run = 'go'; return; }
    el.dataset.run = 'wait';
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { el.dataset.run = 'go'; io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <ol ref={ref} className="ga4-jt" aria-label="How advertising connects customer need to an enquiry or purchase">
    {JOURNEY.stages.map((s, i) => <li key={s.k} className={`ga4-js ga4-js--${s.who}`} style={{ '--i': i } as React.CSSProperties}>
      <span className="ga4-js-who">{JOURNEY.who[s.who as keyof typeof JOURNEY.who]}</span>
      <span className="ga4-js-dot" aria-hidden="true">{i + 1}</span>
      <h3>{s.k}</h3><p>{s.d}</p>
    </li>)}
  </ol>;
}
