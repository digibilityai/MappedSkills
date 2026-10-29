'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import {
  CONTROLS_MIN_STUDIES,
  PAGE_SIZE,
  filterStudies,
  isFiltering,
  libraryQuery,
  pageCount,
  pageHref,
  pageSlice,
  parseLibraryQuery,
  asSector,
  asService,
  type LibraryFilter,
} from '@/lib/case-study-library';
import { WORK as S } from '../cplus/work/content';
import type { WorkStudy } from '../cplus/work/studies';
import { WorkCard } from '../resolve/WorkCard';
import { toCard } from './work-cards';
import type { WorkLibraryProps } from './Work';

const EMPTY: LibraryFilter = { q: '', sector: null, service: null };
const noop = () => () => {};
/** False in the server HTML and during hydration, true once the page is interactive. */
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * The library (G7, hybrid). The server renders this page's twelve studies and real page links, so every study is
 * reachable without JavaScript and by crawlers. Search and filters run in the browser over `/work/index.json` — the
 * same ordered list the pages are cut from — loaded on first use. Filter state lives in the query string (shareable;
 * the canonical stays `/work`). Below `CONTROLS_MIN_STUDIES` studies the controls are not rendered at all, and without
 * JavaScript they stay hidden (G1 R3 rule): the numbered pages then list every study.
 *
 * THE RESOLVE (Stage 3): on page 1, unfiltered, the first two studies open the work in the homepage lead and side
 * composition (paper); the library follows on the shared case-study cards (ground). Filtering replaces both with results.
 */
export function WorkLibrary({ items, page, pages, total, facets }: WorkLibraryProps) {
  const showControls = total >= CONTROLS_MIN_STUDIES && (facets.sectors.length > 0 || facets.services.length > 0 || total > PAGE_SIZE);
  const [filter, setFilter] = useState<LibraryFilter>(EMPTY);
  const [clientPage, setClientPage] = useState(1);
  const [all, setAll] = useState<WorkStudy[] | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'failed'>('idle');
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const loading = useRef(false);
  /** The query string is written only after the shared-link restore below has read it. */
  const restored = useRef(false);
  const hydrated = useHydrated();

  const load = () => {
    if (all || loading.current) return;
    loading.current = true;
    setState('loading');
    fetch('/work/index.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { studies: WorkStudy[] }) => {
        setAll(d.studies);
        setState('idle');
      })
      .catch(() => setState('failed'))
      .finally(() => {
        loading.current = false;
      });
  };

  // A shared link (?q=…&industry=…&service=…&p=…) restores its view after hydration (the server HTML is always the
  // unfiltered page, so the URL is read in the next frame rather than during render).
  useEffect(() => {
    if (!showControls) return;
    const frame = requestAnimationFrame(() => {
      const q = parseLibraryQuery(window.location.search);
      restored.current = true;
      if (!isFiltering(q)) return;
      setFilter({ q: q.q, sector: q.sector, service: q.service });
      setClientPage(q.page);
      load();
    });
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showControls]);

  const filtering = showControls && isFiltering(filter);
  const results = useMemo(() => (filtering && all ? filterStudies(all, filter) : []), [filtering, all, filter]);
  const resultPages = pageCount(results.length);
  const shownPage = Math.min(clientPage, resultPages);

  useEffect(() => {
    if (!showControls || !restored.current) return;
    const qs = filtering ? libraryQuery({ ...filter, page: shownPage }) : '';
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${qs}`);
  }, [showControls, filtering, filter, shownPage]);

  const update = (next: Partial<LibraryFilter>) => {
    load();
    setFilter((f) => ({ ...f, ...next }));
    setClientPage(1);
  };
  const goTo = (p: number) => {
    setClientPage(p);
    resultsRef.current?.focus();
  };
  const clear = () => {
    setFilter(EMPTY);
    setClientPage(1);
  };

  const status = !filtering
    ? `${total} case ${total === 1 ? 'study' : 'studies'}${pages > 1 ? `, page ${page} of ${pages}` : ''}`
    : state === 'failed'
      ? S.library.failed
      : !all
        ? S.library.loading
        : `${results.length} of ${total} case ${total === 1 ? 'study' : 'studies'} match${results.length > 1 && resultPages > 1 ? `, page ${shownPage} of ${resultPages}` : ''}`;

  const opening = !filtering && page === 1 ? items.slice(0, 2) : [];
  const rest = !filtering && page === 1 ? items.slice(opening.length) : items;
  const L = S.resolve.library;
  const css = (i: number) => ({ '--i': i }) as React.CSSProperties;

  return (
    <>
      {opening.length ? (
        <section className="wk-act b2-paper" aria-labelledby="wk-h-feat">
          <div className="pa-wrap">
            <header className="wk-head" data-reveal>
              <p className="wk-ch"><span>01</span>{S.resolve.featured.ch}</p>
              <h2 id="wk-h-feat" className="b2-h2">{S.resolve.featured.a} <span className="b2-em">{S.resolve.featured.b}</span></h2>
            </header>
            <div className="rs-wc-grid wk-open">
              <WorkCard s={toCard(opening[0])} lead />
              {opening[1] ? <WorkCard s={toCard(opening[1])} /> : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="wk-act wk-ground" aria-labelledby="wk-h-lib">
        <div className="pa-wrap">
          <header className="wk-head wk-lib-head" data-reveal>
            <p className="wk-ch">{opening.length ? <span>02</span> : null}{L.ch}</p>
            <h2 id="wk-h-lib" className="b2-h2" tabIndex={-1} ref={resultsRef}>
              {filtering ? S.library.status : page === 1 ? <>{L.a} <span className="b2-em">{L.b}</span></> : <>Case studies, <span className="b2-em">page {page}.</span></>}
            </h2>
          </header>

          {showControls ? (
            <form className="wk-ctl" role="search" aria-label={S.library.controls} hidden={!hydrated} onSubmit={(e) => e.preventDefault()}>
              <div className="wk-ctl-row">
                <label className="wk-q" htmlFor="wk-q">
                  <span className="sr-only">{S.library.search}</span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
                    <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M13 13l5 5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <input
                    id="wk-q"
                    type="search"
                    value={filter.q}
                    placeholder={S.library.searchHint}
                    autoComplete="off"
                    maxLength={100}
                    onFocus={load}
                    onChange={(e) => update({ q: e.target.value })}
                  />
                </label>
                {facets.sectors.length ? (
                  <label className="wk-sel" htmlFor="wk-industry">
                    <span className="wk-k">{S.library.industry}</span>
                    <select id="wk-industry" value={filter.sector ?? ''} onChange={(e) => update({ sector: asSector(e.target.value) })}>
                      <option value="">{S.library.anyIndustry}</option>
                      {facets.sectors.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label} ({o.count})
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </div>
              {facets.services.length ? (
                <div className="wk-chips" role="group" aria-label={S.library.service}>
                  <button type="button" aria-pressed={!filter.service} onClick={() => update({ service: null })}>
                    {S.library.anyService}
                  </button>
                  {facets.services.map((o) => {
                    const route = asService(`/${o.value}`);
                    return (
                      <button key={o.value} type="button" aria-pressed={filter.service === route} onClick={() => update({ service: filter.service === route ? null : route })}>
                        {o.label} <span className="wk-n">{o.count}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </form>
          ) : null}

          <p className="wk-status" role="status" aria-live="polite">
            {showControls ? (hydrated ? status : '') : status}
            {filtering ? (
              <button type="button" className="wk-clear" onClick={clear}>
                {S.library.clear}
              </button>
            ) : null}
          </p>

          {!filtering ? (
            <>
              <Grid studies={rest} css={css} />
              <ServerPager page={page} pages={pages} />
            </>
          ) : state === 'failed' ? (
            <ServerPager page={page} pages={pages} />
          ) : !all ? null : results.length ? (
            <>
              <Grid studies={pageSlice(results, shownPage)} css={css} />
              <ClientPager page={shownPage} pages={resultPages} onPage={goTo} />
            </>
          ) : (
            <div className="wk-nomatch">
              <p className="wk-nomatch-h">{S.library.noMatch}</p>
              <p>{S.library.noMatchHint}</p>
              <button type="button" className="wk-clear" onClick={clear}>
                {S.library.showAll}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/** The library cards: the shared case-study card, text-only unless the study has approved artwork. */
function Grid({ studies, css }: { studies: WorkStudy[]; css: (i: number) => React.CSSProperties }) {
  if (!studies.length) return null;
  return (
    <ul className="wk-grid" role="list">
      {studies.map((s, i) => (
        <li key={s.slug} style={css(i % 3)}>
          <WorkCard s={toCard(s)} sizes="(min-width: 1081px) 420px, (min-width: 761px) 45vw, 100vw" />
        </li>
      ))}
    </ul>
  );
}

/** Numbered pages, windowed (first, last and one either side of the current page); previous and next are always shown. */
function windowed(page: number, pages: number): Array<number | '…'> {
  const keep = [...new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages))].sort((a, b) => a - b);
  const out: Array<number | '…'> = [];
  keep.forEach((n, i) => {
    if (i && n - keep[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
}

type PageItemProps = { n: number; cls: string; rel?: string; onPage?: (n: number) => void; children: React.ReactNode };

/** A real link on the numbered server pages (crawlable, no JavaScript needed); a button for in-browser results. */
function PageItem({ n, cls, rel, onPage, children }: PageItemProps) {
  return onPage ? (
    <button type="button" className={cls} onClick={() => onPage(n)}>
      {children}
    </button>
  ) : (
    <Link className={cls} href={pageHref(n)} rel={rel}>
      {children}
    </Link>
  );
}

function Pager({ page, pages, onPage, label }: { page: number; pages: number; onPage?: (n: number) => void; label: string }) {
  if (pages <= 1) return null;
  return (
    <nav className="wk-pager" aria-label={label}>
      {page > 1 ? (
        <PageItem n={page - 1} rel="prev" cls="wk-pg wk-pg-s" onPage={onPage}>
          <span aria-hidden="true">←</span> {S.library.prev}
        </PageItem>
      ) : (
        <button type="button" className="wk-pg wk-pg-s is-off" disabled>
          ← {S.library.prev}
        </button>
      )}
      <ol>
        {windowed(page, pages).map((n, i) =>
          n === '…' ? (
            <li key={`gap${i}`} className="wk-gap" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={n}>
              {n === page ? (
                <span className="wk-pg is-on" aria-current="page">
                  <span className="sr-only">Page </span>
                  {n}
                </span>
              ) : (
                <PageItem n={n} cls="wk-pg" onPage={onPage}>
                  <span className="sr-only">Page </span>
                  {n}
                </PageItem>
              )}
            </li>
          )
        )}
      </ol>
      <p className="wk-pg-of">
        Page {page} of {pages}
      </p>
      {page < pages ? (
        <PageItem n={page + 1} rel="next" cls="wk-pg wk-pg-s" onPage={onPage}>
          {S.library.next} <span aria-hidden="true">→</span>
        </PageItem>
      ) : (
        <button type="button" className="wk-pg wk-pg-s is-off" disabled>
          {S.library.next} →
        </button>
      )}
    </nav>
  );
}

const ServerPager = ({ page, pages }: { page: number; pages: number }) => <Pager page={page} pages={pages} label={S.library.pages} />;

const ClientPager = ({ page, pages, onPage }: { page: number; pages: number; onPage: (p: number) => void }) => (
  <Pager page={page} pages={pages} onPage={onPage} label={`${S.library.pages} (search results)`} />
);
