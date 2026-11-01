'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * The cards of a case showcase. Wide screens: a plain grid (CSS). Below 1081 px: a swipeable row with the next card showing, previous and next buttons,
 * and a polite "Case 2 of 3" status. Nothing moves by itself. One small, once-only motion (the card artwork is uncovered left to right, 90 ms apart)
 * is released when the section scrolls into view; it is off under reduced motion and without script, and all text is visible from the first frame.
 */
export function ShowcaseTrack({ children, count, trackId, label }: { children: ReactNode; count: number; trackId: string; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const stride = () => {
      const a = el.children[0] as HTMLElement | undefined;
      const b = el.children[1] as HTMLElement | undefined;
      return a && b ? b.offsetLeft - a.offsetLeft : a ? a.offsetWidth : 1;
    };
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
        setIndex(atEnd ? count - 1 : Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / Math.max(1, stride())))));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  useEffect(() => {
    const root = track.current?.closest<HTMLElement>('[data-cs]');
    if (!root || typeof IntersectionObserver !== 'function') return;
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (root.getBoundingClientRect().top <= window.innerHeight * 0.92) return;
    root.setAttribute('data-cs-motion', 'pre');
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        requestAnimationFrame(() => root.setAttribute('data-cs-motion', 'run'));
      },
      { threshold: 0.2 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const go = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const a = el.children[0] as HTMLElement | undefined;
    const b = el.children[1] as HTMLElement | undefined;
    const stride = a && b ? b.offsetLeft - a.offsetLeft : a ? a.offsetWidth : 0;
    const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * stride, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <>
      <ul className="cs-track" id={trackId} ref={track} aria-label={label}>
        {children}
      </ul>
      {count > 1 ? (
        <div className="cs-btns">
          <button type="button" aria-controls={trackId} aria-label="Previous case study" onClick={() => go(-1)} disabled={index <= 0}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" aria-controls={trackId} aria-label="Next case study" onClick={() => go(1)} disabled={index >= count - 1}>
            <span aria-hidden="true">→</span>
          </button>
          <span className="cs-sr" role="status">
            Case {index + 1} of {count}
          </span>
        </div>
      ) : null}
    </>
  );
}
