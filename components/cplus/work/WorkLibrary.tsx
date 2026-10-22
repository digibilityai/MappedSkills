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
import { WORK as S } from './content';
import { Card, Featured } from './WorkCards';
import type { WorkStudy } from './studies';
import type { WorkLibraryProps } from './WorkBody';

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

  return (
    <div className="wk-coll">
      {showControls ? (
        <form className="wk-ctl" role="search" aria-label={S.library.controls} hidden={!hydrated} onSubmit={(e) => e.preventDefault()}>
          <div className="wk-ctl-f wk-ctl-q">
            <label htmlFor="wk-q">{S.library.search}</label>
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
          </div>
          {facets.sectors.length ? (
            <div className="wk-ctl-f">
              <label htmlFor="wk-industry">{S.library.industry}</label>
              <select id="wk-industry" value={filter.sector ?? ''} onChange={(e) => update({ sector: asSector(e.target.value) })}>
                <option value="">{S.library.anyIndustry}</option>
                {facets.sectors.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label} ({o.count})
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {facets.services.length ? (
            <div className="wk-ctl-f">
              <label htmlFor="wk-service">{S.library.service}</label>
              <select
                id="wk-service"
                value={filter.service ? filter.service.slice(1) : ''}
                onChange={(e) => update({ service: asService(e.target.value ? `/${e.target.value}` : null) })}
              >
                <option value="">{S.library.anyService}</option>
                {facets.services.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label} ({o.count})
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {filtering ? (
            <button type="button" className="wk-ctl-clear" onClick={clear}>
              {S.library.clear}
            </button>
          ) : null}
        </form>
      ) : null}

      {showControls ? (
        <>
          <p className="wk-count" role="status" aria-live="polite">
            {hydrated ? status : ''}
          </p>
          <h3 className="px-sr" tabIndex={-1} ref={resultsRef}>
            {filtering ? 'Search results' : 'Case studies'}
          </h3>
        </>
      ) : null}

      {!filtering ? (
        <>
          {page === 1 && items[0] ? <Featured study={items[0]} /> : null}
          <Grid studies={page === 1 ? items.slice(1) : items} />
          <ServerPager page={page} pages={pages} />
        </>
      ) : state === 'failed' ? (
        <ServerPager page={page} pages={pages} />
      ) : !all ? null : results.length ? (
        <>
          <Grid studies={pageSlice(results, shownPage)} />
          <ClientPager page={shownPage} pages={resultPages} onPage={goTo} />
        </>
      ) : (
        <div className="wk-nomatch">
          <p className="wk-nomatch-h">{S.library.noMatch}</p>
          <p>{S.library.noMatchHint}</p>
          <button type="button" className="wk-ctl-clear" onClick={clear}>
            {S.library.showAll}
          </button>
        </div>
      )}
    </div>
  );
}

function Grid({ studies }: { studies: WorkStudy[] }) {
  if (!studies.length) return null;
  return (
    <ul className="wk-grid">
      {studies.map((s) => (
        <Card key={s.slug} study={s} />
      ))}
    </ul>
  );
}

/** Numbered pages, previous and next as real links (crawlable, no JavaScript needed). */
function ServerPager({ page, pages }: { page: number; pages: number }) {
  if (pages <= 1) return null;
  return (
    <nav className="wk-pager" aria-label={S.library.pages}>
      {page > 1 ? (
        <Link className="wk-pg wk-pg-step" href={pageHref(page - 1)} rel="prev">
          <span aria-hidden="true">←</span> {S.library.prev}
        </Link>
      ) : null}
      <ol>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            {n === page ? (
              <span className="wk-pg is-on" aria-current="page">
                <span className="px-sr">Page </span>
                {n}
              </span>
            ) : (
              <Link className="wk-pg" href={pageHref(n)}>
                <span className="px-sr">Page </span>
                {n}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {page < pages ? (
        <Link className="wk-pg wk-pg-step" href={pageHref(page + 1)} rel="next">
          {S.library.next} <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </nav>
  );
}

/** The same pager for filtered results, as buttons (the results exist only in the browser). */
function ClientPager({ page, pages, onPage }: { page: number; pages: number; onPage: (p: number) => void }) {
  if (pages <= 1) return null;
  return (
    <nav className="wk-pager" aria-label={`${S.library.pages} (search results)`}>
      {page > 1 ? (
        <button type="button" className="wk-pg wk-pg-step" onClick={() => onPage(page - 1)}>
          <span aria-hidden="true">←</span> {S.library.prev}
        </button>
      ) : null}
      <ol>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <button type="button" className={n === page ? 'wk-pg is-on' : 'wk-pg'} aria-current={n === page ? 'page' : undefined} onClick={() => onPage(n)}>
              <span className="px-sr">Page </span>
              {n}
            </button>
          </li>
        ))}
      </ol>
      {page < pages ? (
        <button type="button" className="wk-pg wk-pg-step" onClick={() => onPage(page + 1)}>
          {S.library.next} <span aria-hidden="true">→</span>
        </button>
      ) : null}
    </nav>
  );
}
