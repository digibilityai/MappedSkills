'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createResolveViewRegistry, useResolveMotion } from '@/hooks/use-resolve-motion';

/**
 * SESSION 26 — PHASE D — THE SYSTEM VIEW.
 *
 * This chapter carries two of the page's budgeted behaviours and its one
 * reader-driven control:
 *
 *   T2  the re-read     — Capture -> Convert -> Measure resolves once, on view.
 *   T3  the descent     — F1 scales up from a distance while the chain draws.
 *   disclosure          — the reader can take the sequence over at any time.
 *
 * WHAT THE SEQUENCE MEANS. Choosing a stage changes WHICH DISCRETE POINTS AND
 * JOINS on the chain are the subject. It never changes a length, never fills a
 * bar, never adds or removes a point, and never shows a number. A point cannot
 * express a percentage, so no reading of this figure can produce a rate, a
 * proportion, an uplift or a conversion claim.
 *
 * READER-DRIVEN CONTROL. The three stages play through ONCE on entering view
 * and then rest — they never loop and never replay. The moment the reader
 * selects a stage, the auto-advance is cancelled for good.
 *
 * WHY THIS IS A DISCLOSURE SET AND NOT A TABLIST. It was authored as a
 * tablist, and that was the wrong pattern twice over. Structurally, a
 * `tablist` may own nothing but `tab` children, yet this design requires each
 * panel to sit INSIDE its own stage row, directly beneath the heading it
 * belongs to; a conformant tablist cannot hold its own panels, which is why
 * the markup failed `aria-required-children`, `aria-required-parent` and
 * `listitem` at once. Behaviourally, tabs are mutually exclusive by
 * definition, but the composed state below opens ALL THREE panels together,
 * which no tablist can express. So each stage heading is now a button carrying
 * `aria-expanded` over its own `region`, which states exactly what is true in
 * both states. Every heading is in the page tab sequence, Left/Right/Up/Down,
 * Home and End still move between the headings and still take the sequence
 * over, and `inert` on a collapsed panel still means a focus ring can never
 * land on a control the reader cannot see. The list is a real list again.
 * Focus is never moved for the reader
 * — only in response to their own arrow key.
 *
 * THE FALLBACK IS THE PHASE C PAGE. Until this component has hydrated it
 * renders exactly what Phase C shipped: an ordered list of three headed stages
 * with every panel open and all seven links present and tabbable. That is what
 * the server sends, what a reader with no JavaScript keeps, and what a failed
 * hydration leaves behind. Under reduced motion the headings are present but
 * every panel stays open, so the reader is never shown one reading of the
 * system in place of three.
 */

export type Stage = {
  n: string;
  title: string;
  body: string;
  links: { href: string; label: string }[];
};

const AUTO_STAGE_2_MS = 2100;
const AUTO_STAGE_3_MS = 4200;

export function SystemStages({ stages, chain }: { stages: Stage[]; chain: React.ReactNode }) {
  const { mounted, reduced, enabled } = useResolveMotion();
  const [stage, setStage] = useState(1);
  const [chainPhase, setChainPhase] = useState<'armed' | 'on' | null>(null);

  /* PHASE E — the descent is armed only if motion was available at mount. See
     HomepageMotion for the reasoning; F1 is the largest object on the page and
     re-arming it under a reader's eyes is the most visible version of the bug. */
  const armingAllowed = useRef<boolean | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const chainRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const autoStage = useRef(true);

  // Reduced motion resolves rather than freezing: without the auto-advance the
  // reader would never be shown stages 01 and 02, so all three are composed
  // open and nothing is `inert`.
  //
  // PHASE E: `armingAllowed.current === false` means motion was unavailable on
  // the reader's first paint, so all three readings were composed open for
  // them. If they later turn reduced motion off, those panels stay open — the
  // page does not take back content it has already shown.
  const allOpen = !mounted || reduced || armingAllowed.current === false;

  const select = useCallback((next: number, fromUser: boolean) => {
    if (fromUser) autoStage.current = false;
    setStage(next);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (armingAllowed.current === null) armingAllowed.current = enabled;

    const registry = createResolveViewRegistry();
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (!enabled || !armingAllowed.current) {
      // composed: stage 3 is the reading the page rests on, every panel open
      setStage(3);
      return () => registry.destroy();
    }

    /* PHASE E — THE LAST RESORT. If the registration pass below fails for any
       reason, the chain is composed and the sequence rests on its final
       reading. An uncaught error here would tear down the React root and leave
       the chain armed — shrunk and faded — until the ~4s fallback. */
    const composeSystem = () => {
      setChainPhase('on');
      if (autoStage.current) setStage(3);
    };

    try {

    // PHASE E — NEVER RE-ARM A CHAIN THAT HAS ALREADY ARRIVED. This effect
    // re-runs when the reduced-motion preference changes; a reader who turns
    // reduced motion OFF while looking at F1 must not watch it shrink to 46%
    // and fade out before growing back.
    const chainOnScreen = (() => {
      const el = chainRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    })();
    let descended = chainOnScreen;
    setChainPhase((phase) => {
      if (phase === 'on' || chainOnScreen) {
        descended = true;
        return 'on';
      }
      return 'armed';
    });

    // the descent — the page gets closer to the object, once
    if (!descended) registry.onView(chainRef.current, () => setChainPhase('on'), 0.2);

    // the three readings play once, on entering view, and never replay
    registry.onView(
      sectionRef.current,
      () => {
        if (document.hidden) {
          setChainPhase('on');
          if (autoStage.current) setStage(3);
          return;
        }
        setStage(1);
        timers.push(setTimeout(() => { if (autoStage.current) setStage(2); }, AUTO_STAGE_2_MS));
        timers.push(setTimeout(() => { if (autoStage.current) setStage(3); }, AUTO_STAGE_3_MS));
      },
      0.25
    );

    // a tab hidden mid-sequence comes back COMPOSED, never mid-draw
    const onVisibility = () => {
      if (!document.hidden) return;
      timers.forEach(clearTimeout);
      registry.forceAll();
      setChainPhase('on');
      if (autoStage.current) setStage(3);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      timers.forEach(clearTimeout);
      registry.destroy();
      document.removeEventListener('visibilitychange', onVisibility);
    };

    } catch {
      timers.forEach(clearTimeout);
      registry.destroy();
      composeSystem();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, enabled]);

  const onStageKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % stages.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + stages.length) % stages.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = stages.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(next + 1, true);
    listRef.current?.querySelectorAll<HTMLButtonElement>('button[data-rsv-stg]')[next]?.focus();
  };

  return (
    <div
      ref={sectionRef}
      className="mt-[clamp(26px,3vw,46px)] grid grid-cols-1 items-start gap-[clamp(26px,3.4vw,52px)]"
    >
      {mounted ? (
        <ul
          ref={listRef}
          aria-label="The three stages of the work"
          className="m-0 max-w-[104ch] list-none border-t-2 border-resolve-ink p-0"
        >
          {stages.map((s, i) => {
            const selected = stage === i + 1;
            const open = allOpen || selected;
            return (
              <li key={s.n} className="border-b border-resolve-line py-[clamp(14px,1.8vw,20px)]">
                {/* The heading matches the static composition below, so the
                    document outline is the same before and after hydration.
                    `aria-expanded` tracks `open`, not `selected`: in the
                    composed state all three panels really are open. */}
                <h3 className="m-0">
                  <button
                    type="button"
                    data-rsv-stg={s.n}
                    id={`rsv-stg-${s.n}`}
                    aria-expanded={open}
                    aria-controls={`rsv-panel-${s.n} rsv-chain`}
                    onClick={() => select(i + 1, true)}
                    onKeyDown={(event) => onStageKey(event, i)}
                    className="rsv-stg grid w-full grid-cols-[20px_1fr] items-baseline gap-x-4 gap-y-0 bg-transparent p-0 text-left max-[761px]:grid-cols-1"
                  >
                    <span
                      aria-hidden="true"
                      className={`rsv-stg-n text-[.82rem] font-bold tracking-[0.18em] max-[761px]:hidden ${
                        open ? 'text-resolve-accent-dark' : 'text-resolve-dim'
                      }`}
                    >
                      {s.n}
                    </span>
                    <span
                      className={`rsv-stg-t font-heading text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] ${
                        open ? 'text-resolve-ink' : 'text-resolve-dim'
                      } ${i === 0 || selected ? 'max-[761px]:text-[1.5rem]' : 'max-[761px]:text-[1.15rem]'}`}
                    >
                      {s.title}
                    </span>
                  </button>
                </h3>

                <div
                  className="rsv-stg-b ml-9 mt-1 max-w-[80ch] max-[761px]:ml-0"
                  id={`rsv-panel-${s.n}`}
                  role="region"
                  aria-labelledby={`rsv-stg-${s.n}`}
                  data-rsv-open={open ? 'true' : 'false'}
                  inert={!open}
                >
                  <span>
                    <span className="block text-base leading-[1.45] text-resolve-dim">{s.body}</span>
                    <StageLinks links={s.links} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        /* The Phase C static composition, unchanged: what the server sends and
           what a reader with no JavaScript keeps. */
        <ol className="max-w-[52ch] list-none border-t-2 border-resolve-ink p-0">
          {stages.map((s, i) => (
            <li key={s.n} className="border-b border-resolve-line py-[clamp(14px,1.8vw,20px)]">
              <div className="grid grid-cols-[20px_1fr] items-baseline gap-4 max-[761px]:grid-cols-1 max-[761px]:gap-0">
                <span
                  aria-hidden="true"
                  className="text-[.82rem] font-bold tracking-[0.18em] max-[761px]:hidden"
                  style={{ color: 'var(--resolve-accent-dark)' }}
                >
                  {s.n}
                </span>
                <h3
                  className={`font-heading text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-resolve-ink ${
                    i === 0 ? 'max-[761px]:text-[1.5rem]' : 'max-[761px]:text-[1.15rem]'
                  }`}
                >
                  {s.title}
                </h3>
              </div>
              <p className="ml-9 mt-1 max-w-[40ch] text-base leading-[1.45] text-resolve-dim max-[761px]:ml-0">
                {s.body}
              </p>
              <StageLinks links={s.links} className="ml-9 max-[761px]:ml-0" />
            </li>
          ))}
        </ol>
      )}

      <div>
        <div
          ref={chainRef}
          id="rsv-chain"
          className="rsv-chain"
          data-stage={String(stage)}
          data-rsv={chainPhase ?? undefined}
        >
          {chain}
        </div>
        <ChainLegend />
      </div>
    </div>
  );
}

function StageLinks({
  links,
  className = '',
}: {
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <span
      className={`${className} mt-3 flex flex-wrap gap-x-2.5 gap-y-2 max-[761px]:mt-2 max-[761px]:gap-x-5 max-[761px]:gap-y-0`}
    >
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="inline-flex min-h-[40px] items-center rounded-full border-[1.5px] border-resolve-line px-[15px] text-[.88rem] font-semibold text-resolve-ink no-underline hover:border-resolve-ink max-[761px]:rounded-none max-[761px]:border-0 max-[761px]:border-b-2 max-[761px]:px-0 max-[761px]:py-2.5"
        >
          {l.label}
        </a>
      ))}
    </span>
  );
}

function ChainLegend() {
  return (
    <>
      <ul className="m-0 mt-5 flex list-none flex-wrap items-center gap-x-[clamp(16px,2.2vw,30px)] gap-y-2 p-0 text-[.84rem] font-medium text-resolve-dim">
        {/* Session 18C: below 761px the figure's own labels already name both
            honest states, so only the mark they do NOT name keeps a legend
            entry. */}
        <li className="m-0 mb-0 flex items-center gap-[9px] p-0 max-[761px]:hidden">
          <span
            aria-hidden="true"
            className="h-[13px] w-[13px] flex-none border-2"
            style={{ background: 'var(--resolve-ink)', borderColor: 'var(--resolve-ink)' }}
          />
          <span className="leading-[1.4]">a point on the chain</span>
        </li>
        <li className="m-0 mb-0 flex items-center gap-[9px] p-0 max-[761px]:hidden">
          <span
            aria-hidden="true"
            className="h-[13px] w-[13px] flex-none"
            style={{ background: 'transparent', border: '2px dashed var(--resolve-gap)' }}
          />
          <span className="leading-[1.4]">arrived with no usable trail</span>
        </li>
        <li className="m-0 mb-0 flex items-center gap-[9px] p-0" style={{ color: 'var(--resolve-accent-dark)' }}>
          <span aria-hidden="true" className="inline-flex h-[13px] w-[13px] flex-none items-center justify-center font-bold leading-none">|</span>
          <span className="leading-[1.4]">a join, where the work is done</span>
        </li>
      </ul>
      <p className="mt-4 max-w-none text-[.82rem] font-medium leading-[1.5] text-resolve-dim">
        Structure only. <b className="font-bold text-resolve-ink">No quantity, proportion, rate or
        duration is drawn</b>, and the spacing between points carries no meaning.
      </p>
    </>
  );
}
