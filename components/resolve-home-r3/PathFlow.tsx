'use client';
import { useEffect, useRef } from 'react';
import { FlowGlyph } from './ArtR3';

/**
 * Buyer path: Buyer intent, Relevant advertising, Website or landing page, Enquiry or purchase, Measurement and improvement.
 * Every word is in the HTML and readable before and without the animation. Script only arms the decorative parts (stage
 * circles and connectors) once the diagram is below the fold, then plays them once when it scrolls into view. Transforms and
 * opacity only, so nothing shifts. Reduced motion, no IntersectionObserver or no script: the settled diagram is shown.
 * No figures and no outcomes are shown.
 */
const FLOW = [
  { label: 'Buyer intent', note: 'Your customer', who: 'buyer' },
  { label: 'Relevant advertising', note: 'MappedSkills plans and manages', who: 'ms' },
  { label: 'Website or landing page', note: 'Your business', who: 'you' },
  { label: 'Enquiry or purchase', note: 'Your business follows up', who: 'you' },
  { label: 'Measurement and improvement', note: 'MappedSkills tests and reviews', who: 'ms' },
] as const;

export function PathFlow() {
  const root = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.75) return; /* already on screen: leave it settled */
    el.setAttribute('data-anim', 'armed');
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      el.setAttribute('data-anim', 'play');
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); el.removeAttribute('data-anim'); };
  }, []);
  return <>
    <ul className="rv3-legend" aria-label="Who is responsible">
      <li><i className="ms" aria-hidden="true" />Managed by MappedSkills</li>
      <li><i className="you" aria-hidden="true" />Owned by your business</li>
      <li><i aria-hidden="true" />Your customer</li>
    </ul>
    <ol className="rv3-pflow" ref={root}>
      {FLOW.map((f, i) => <li key={f.label} className={`rv3-pf rv3-pf--${f.who}`} style={{ '--i': i } as React.CSSProperties}>
        <FlowGlyph n={(i + 1) as 1 | 2 | 3 | 4 | 5} /><b>{f.label}</b><span>{f.note}</span>
      </li>)}
    </ol>
  </>;
}
