'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { SerpArt, ShoppingArt, PmaxArt, DisplayArt, YoutubeArt } from '../google-ads-r3/ArtGa3';
import { TYPES } from './content';

const ART = { search: <SerpArt />, shopping: <ShoppingArt />, pmax: <PmaxArt />, display: <DisplayArt />, youtube: <YoutubeArt /> } as const;

/** One compact selector for the five campaign types (WAI-ARIA tabs, automatic activation, roving tabindex).
 * Server-rendered with the first tab active (no layout change on load); a <noscript> rule shows every panel in turn and hides the tab row. All panels share one grid cell, so the module's
 * height is that of the tallest panel and switching never shifts the page. */
export function CampaignSelector() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = useRef(active);
  // Keep the chosen tab in view after a selection only. Running on mount scrolled the whole page down to the selector.
  useEffect(() => {
    if (shown.current === active) return;
    shown.current = active;
    tabs.current[active]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [active]);

  const onKey = (e: KeyboardEvent) => {
    const n = TYPES.items.length;
    const next = e.key === 'ArrowRight' ? (active + 1) % n : e.key === 'ArrowLeft' ? (active + n - 1) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault(); setActive(next); tabs.current[next]?.focus();
  };

  return <div className="ga4-sel">
    <noscript><style>{'.ga4-tabs-row{display:none}.ga4-panels{display:block}.ga4-panel{visibility:visible!important;opacity:1!important;padding-block:32px;border-top:1px solid #2C2833}'}</style></noscript>
    <div className="ga4-tabs-row"><div className="ga4-tablist" role="tablist" aria-label="Google Ads campaign types" onKeyDown={onKey}>
      {TYPES.items.map((t, i) => <button key={t.id} ref={(el) => { tabs.current[i] = el; }} role="tab" type="button" id={`ga4-tab-${t.id}`} aria-selected={active === i} aria-controls={`ga4-panel-${t.id}`} tabIndex={active === i ? 0 : -1} className="ga4-tab" onClick={() => setActive(i)}>{t.name}</button>)}
    </div></div>
    <div className="ga4-panels">
      {TYPES.items.map((t, i) => <div key={t.id} id={`ga4-panel-${t.id}`} role="tabpanel" aria-labelledby={`ga4-tab-${t.id}`} className="ga4-panel" data-active={active === i ? 'true' : 'false'}>
        <div className="ga4-panel-copy">
          <h3>{t.name}</h3>
          <p className="ga4-benefit">{t.benefit}</p>
          <dl>
            <div><dt>Suits you when</dt><dd>{t.situation}</dd></div>
            <div><dt>How it works</dt><dd>{t.how}</dd></div>
            <div><dt>Best for</dt><dd>{t.best}</dd></div>
          </dl>
        </div>
        <div className="ga4-panel-art"><div>{ART[t.id as keyof typeof ART]}</div><p className="ga4-cap">Illustrative example with a generic business. Not a client campaign.</p></div>
      </div>)}
    </div>
    <p className="ga4-sel-note">{TYPES.note} <Link href={TYPES.meta.href}>{TYPES.meta.label}</Link>.</p>
  </div>;
}
