'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { FeedArt, StoriesArt, ReelsArt, CarouselArt, LeadArt } from '../meta-ads-r1/ArtMeta';
import { FORMATS } from '../meta-ads-r1/content';

const ART = { feed: <FeedArt />, stories: <StoriesArt />, reels: <ReelsArt />, carousel: <CarouselArt />, lead: <LeadArt /> } as const;

/** One compact selector for the five ad formats (WAI-ARIA tabs, automatic activation, roving tabindex).
 * Server-rendered with the first tab active; a <noscript> rule shows every panel in turn and hides the tab row. All panels
 * share one grid cell, so the module's height is that of the tallest panel and switching never shifts the page. The small
 * illustration animation plays only after the visitor has chosen a format (data-int), never on load, and never with reduced motion. */
export function FormatSelector() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  /* R2.1 fix. R1 and R2 called scrollIntoView on mount, which scrolled the whole page down to the tab row on every load.
   * Now only the tab row scrolls (never the page), and only after the visitor has chosen a format. */
  useEffect(() => {
    if (!touched) return;
    const tab = tabs.current[active], row = tab?.closest<HTMLElement>('.mr1-tabs-row');
    if (!tab || !row) return;
    const l = tab.offsetLeft, r = l + tab.offsetWidth;
    if (l < row.scrollLeft) row.scrollLeft = l - 8; else if (r > row.scrollLeft + row.clientWidth) row.scrollLeft = r - row.clientWidth + 8;
  }, [active, touched]);

  const pick = (i: number) => { setTouched(true); setActive(i); };
  const onKey = (e: KeyboardEvent) => {
    const n = FORMATS.items.length;
    const next = e.key === 'ArrowRight' ? (active + 1) % n : e.key === 'ArrowLeft' ? (active + n - 1) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault(); pick(next); tabs.current[next]?.focus({ preventScroll: true });
  };

  return <div className="mr1-sel" data-int={touched ? 'true' : 'false'}>
    <noscript><style>{'.mr1-tabs-row{display:none}.mr1-panels{display:block}.mr1-panel{visibility:visible!important;opacity:1!important;padding-block:32px;border-top:1px solid #2C2833}.mr1-panel *{animation:none!important}'}</style></noscript>
    <div className="mr1-tabs-row"><div className="mr1-tablist" role="tablist" aria-label="Meta ad formats" onKeyDown={onKey}>
      {FORMATS.items.map((t, i) => <button key={t.id} ref={(el) => { tabs.current[i] = el; }} role="tab" type="button" id={`mr1-tab-${t.id}`} aria-selected={active === i} aria-controls={`mr1-panel-${t.id}`} tabIndex={active === i ? 0 : -1} className="mr1-tab" onClick={() => pick(i)}>{t.name}</button>)}
    </div></div>
    <div className="mr1-panels">
      {FORMATS.items.map((t, i) => <div key={t.id} id={`mr1-panel-${t.id}`} role="tabpanel" aria-labelledby={`mr1-tab-${t.id}`} className="mr1-panel" data-active={active === i ? 'true' : 'false'}>
        <div className="mr1-panel-copy">
          <h3>{t.name}</h3>
          <p className="mr1-benefit">{t.benefit}</p>
          <dl>
            <div><dt>What the visitor experiences</dt><dd>{t.sees}</dd></div>
            <div><dt>Useful when</dt><dd>{t.useful}</dd></div>
            <div><dt>What they may do</dt><dd>{t.action}</dd></div>
          </dl>
        </div>
        <div className="mr1-panel-art"><div>{ART[t.id as keyof typeof ART]}</div><p className="mr1-cap">Illustrative example with a generic business. Not a client campaign.</p></div>
      </div>)}
    </div>
    <p className="mr1-sel-note">{FORMATS.note} <Link href={FORMATS.alt.href}>{FORMATS.alt.label}</Link>.</p>
  </div>;
}
