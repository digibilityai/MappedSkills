'use client';
import { useEffect, useRef } from 'react';
import { JOURNEY } from './content';

const ICONS = [
  <><rect x="7" y="2.500" width="10" height="19" rx="2.500" /><rect x="9" y="8" width="6" height="5" rx="1" /><path d="M9.500 16h5" /></>,
  <><circle cx="11" cy="11" r="6" /><path d="m15.500 15.500 5 5" /></>,
  <><rect x="3" y="4.500" width="18" height="15" rx="2.500" /><path d="M3 9h18M7 13h6M7 16h4" /></>,
  <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.500a3 3 0 0 1 6 0V8" /></>,
  <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M18.500 12A7 7 0 0 0 6.300 8M5.500 12a7 7 0 0 0 12.200 4" /></>,
];

/** Customer journey. The finished state is the base style (no script, reduced motion). With script and motion, the stages are
 * held back once the section is near, then a single tangerine signal travels the track and lights each stage, one time. */
export function JourneyMeta() {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.7) { el.dataset.run = 'go'; return; }
    el.dataset.run = 'wait';
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { el.dataset.run = 'go'; io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <ol ref={ref} className="mr1-jt" aria-label="How a Meta ad leads to an enquiry or purchase">
    {JOURNEY.stages.map((s, i) => {
      const first = i === 0 || JOURNEY.stages[i - 1].who !== s.who;
      return <li key={s.k} className={`mr1-js mr1-js--${s.who}`} style={{ '--i': i } as React.CSSProperties}>
        <span className="mr1-js-who" aria-hidden={first ? undefined : 'true'}>{first ? JOURNEY.who[s.who as keyof typeof JOURNEY.who] : ''}</span>
        <span className="mr1-js-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round">{ICONS[i]}</svg></span>
        <h3>{s.k}</h3><p>{s.d}</p>
      </li>;
    })}
    <li className="mr1-sig" aria-hidden="true" />
  </ol>;
}
