'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

/**
 * SESSION 26 — PHASE D — the hero's two-state surface, and the page's ONE
 * requestAnimationFrame-throttled scroll handler.
 *
 * This leaf owns nothing but STATE and one listener. Every word, link, heading
 * and figure inside it is passed in as server-rendered `children`, so the H1,
 * the supporting line, both calls to action and the method link are all Server
 * Component output and none of them is in the client bundle.
 *
 * `data-state` is absent on the server. Absent IS the approved resolved/light
 * composition, which is why the no-JS page and the pre-hydration paint are the
 * Phase C static baseline exactly.
 *
 * THE HERO DEPARTURE (T3). The resolved stage drifts up and fades as the reader
 * leaves, so the next chapter reads as the same demand moving on rather than a
 * new section. This is the ONE scroll handler the production plan permits on
 * the page: one listener, `{passive:true}`, rAF-throttled, writing exactly two
 * compositor properties on exactly one element, and never setting React state.
 * No content is pinned and no scroll position is ever taken over.
 */

export type HeroState = 'traffic' | 'enquiries';

type HeroSurfaceContext = {
  /** null until a client leaf drives it — null renders as `enquiries` */
  state: HeroState | null;
  setState: (next: HeroState) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
};

const HeroSurfaceCtx = createContext<HeroSurfaceContext>({
  state: null,
  setState: () => {},
  sectionRef: { current: null },
});

export function useHeroSurface() {
  return useContext(HeroSurfaceCtx);
}

export function HeroSurface({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<HeroState | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const section = sectionRef.current;
    const stage = section?.querySelector<HTMLElement>('[data-rsv-stage]');
    if (!section || !stage) return;
    if (typeof requestAnimationFrame !== 'function') return;

    let ticking = false;
    // PHASE E: a frame callback that throws would be reported every frame and,
    // on the first commit, could tear the React root down. The departure is the
    // least important thing on the page; the copy under it is the most.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        try {
          const r = section.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
          stage.style.transform = `translate3d(0,${(-p * 48).toFixed(1)}px,0)`;
          stage.style.opacity = (1 - p * 0.85).toFixed(3);
        } catch {
          // never leave the stage displaced or faded behind a failure
          stage.style.transform = '';
          stage.style.opacity = '';
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      // never leave the stage displaced or faded behind us
      stage.style.transform = '';
      stage.style.opacity = '';
    };
  }, []);

  return (
    <HeroSurfaceCtx.Provider value={{ state, setState, sectionRef }}>
      <section
        ref={sectionRef}
        className={className}
        data-state={state ?? undefined}
      >
        {children}
      </section>
    </HeroSurfaceCtx.Provider>
  );
}
