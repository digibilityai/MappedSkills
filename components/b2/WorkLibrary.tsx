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
import { WorkLibCard } from './WorkLibCard';
import { toLibCard } from './work-cards';
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
 * R2 (31 October 2026): one grid of this page's twelve studies (two columns on desktop, one on mobile) on the library card, with Search, Service and
 * Industry selects and a result count above it. Filtering replaces the grid with results.
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

  // The count line (R2): "20 case studies" and the range on a numbered page; while filtering, "2 of 20 case studies match". The unfiltered line
  // comes from props, so the server HTML and the first client render agree.
  const rangeOf = (n: number, p: number) => (n > PAGE_SIZE || p > 1 ? `Showing ${(p - 1) * PAGE_SIZE + 1} to ${Math.min(p * PAGE_SIZE, n)}` : '');
  const noun = (n: number) => `case stud${n === 1 ? 'y' : 'ies'}`;
  const count: { a: React.ReactNode; b: string } = !filtering
    ? { a: <><b>{total}</b> {noun(total)}</>, b: rangeOf(total, page) }
    : state === 'failed'
      ? { a: S.library.failed, b: '' }
      : !all
        ? { a: S.library.loading, b: '' }
        : { a: <><b>{results.length}</b> of {total} {noun(total)} match</>, b: rangeOf(results.length, shownPage) };
  const heading = filtering ? S.library.status : page === 1 ? S.library.all : `Case studies, page ${page}`;

  return (
    <section className="wk-lib" aria-labelledby="wk-h-lib">
      <div className="pa-wrap">
        <h2 id="wk-h-lib" className="sr-only" tabIndex={-1} ref={resultsRef}>
          {heading}
        </h2>

        {showControls ? (
          <form className="wk-ctl" role="search" aria-label={S.library.controls} hidden={!hydrated} onSubmit={(e) => e.preventDefault()}>
            <div className="wk-ctl-row">
              <label className="wk-f wk-q" htmlFor="wk-q">
                <span className="wk-k">{S.library.search}</span>
                <input
                  id="wk-q"
                  type="search"
                  value={filter.q}
                  className={filter.q ? 'is-on' : undefined}
                  placeholder={S.library.searchHint}
                  autoComplete="off"
                  maxLength={100}
                  onFocus={load}
                  onChange={(e) => update({ q: e.target.value })}
                />
              </label>
              {facets.services.length ? (
                <label className="wk-f" htmlFor="wk-service">
                  <span className="wk-k">{S.library.service}</span>
                  <select id="wk-service" className={filter.service ? 'is-on' : undefined} value={filter.service ? filter.service.slice(1) : ''} onFocus={load} onChange={(e) => update({ service: asService(e.target.value ? `/${e.target.value}` : null) })}>
                    <option value="">{S.library.anyService}</option>
                    {facets.services.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label} ({o.count})
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              {facets.sectors.length ? (
                <label className="wk-f" htmlFor="wk-industry">
                  <span className="wk-k">{S.library.industry}</span>
                  <select id="wk-industry" className={filter.sector ? 'is-on' : undefined} value={filter.sector ?? ''} onFocus={load} onChange={(e) => update({ sector: asSector(e.target.value) })}>
                    <option value="">{S.library.anyIndustry}</option>
                    {facets.sectors.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label} ({o.count})
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              {filtering ? (
                <button type="button" className="wk-clear" onClick={clear}>
                  {S.library.clear}
                </button>
              ) : null}
            </div>
          </form>
        ) : null}

        <p className="wk-count" role="status" aria-live="polite">
          <span>{count.a}</span>
          {count.b ? <span>{count.b}</span> : null}
        </p>

        {!filtering ? (
          <>
            <Grid studies={items} />
            <ServerPager page={page} pages={pages} />
          </>
        ) : state === 'failed' ? (
          <>
            <Grid studies={items} />
            <ServerPager page={page} pages={pages} />
          </>
        ) : !all ? null : results.length ? (
          <>
            <Grid studies={pageSlice(results, shownPage)} />
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
  );
}

/** The library cards (R2): two columns on desktop, one on mobile. */
function Grid({ studies }: { studies: WorkStudy[] }) {
  if (!studies.length) return null;
  return (
    <ul className="wk-grid" role="list">
      {studies.map((s) => (
        <li key={s.slug}>
          <WorkLibCard c={toLibCard(s)} />
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
