'use client';

import type { CSSProperties } from 'react';
import { useSequence, type Sequence } from '../ai-seo/Sequence';
import { CO } from './content';

/**
 * The animated stories on /conversion-optimization (owner-approved G1 design, DEC-055). They use the same sequencer as
 * /ai-seo (../ai-seo/Sequence, unchanged) with the Conversion Optimization timing: 2 seconds between steps, and step 1
 * on screen from the start (never a blank block). Each plays once and keeps the finished state. Without JavaScript or
 * with reduced motion every step is shown complete. A numbered step is a button once the page is interactive: choosing
 * one stops the sequence and shows that step.
 */
const OPTS = { stepMs: 1500, first: 0, dwellMs: 150 };

const at = (q: Sequence, n: number) => {
  for (let j = 0; j < n; j++) if (q.on(j)) return j;
  return -1;
};

function Num({ q, j, label, className = 'co-n' }: { q: Sequence; j: number; label: string; className?: string }) {
  return q.armed ? (
    <button type="button" className={className} aria-label={`Show step ${label}`} aria-current={q.on(j) ? 'step' : undefined} onClick={() => q.select(j)}>
      {j + 1}
    </button>
  ) : (
    <span className={className} aria-hidden="true">
      {j + 1}
    </span>
  );
}

const cls = (q: Sequence, extra: string) => `co-seq ${extra} ${q.cls}`;
const root = (q: Sequence, n: number) => ({ 'data-at': at(q, n), style: q.style as CSSProperties });

/* ------------------------------------------------------------------ 1. hero story */
export function HeroStory() {
  const [ref, q] = useSequence<HTMLOListElement>(3, OPTS);
  const s = CO.story.steps;
  return (
    <ol ref={ref} className={cls(q, 'co-story')} data-reveal="dim" aria-label={CO.story.label} {...root(q, 3)}>
      <li className={`co-tile co-tile-cream co-sb ${q.state(0)}`} data-i="" aria-current={q.on(0) ? 'step' : undefined}>
        <span className="co-n" aria-hidden="true">1</span>
        <svg className="co-sb-art" viewBox="0 0 168 104" aria-hidden="true" focusable="false">
          <g className="co-ppl co-ppl-in"><circle cx="20" cy="30" r="7" /><path d="M8 52c0-8 5-12 12-12s12 4 12 12" /><circle cx="20" cy="70" r="7" /><path d="M8 92c0-8 5-12 12-12s12 4 12 12" /><circle cx="46" cy="50" r="7" /><path d="M34 72c0-8 5-12 12-12s12 4 12 12" /></g>
          <path className="co-arw" d="M66 52h22m-8-8 8 8-8 8" />
          <rect className="co-frame" x="98" y="12" width="64" height="80" /><path className="co-frame" d="M98 26h64" />
          <path className="co-soft" d="M108 40h40M108 50h30M108 60h36" /><rect className="co-btn" x="108" y="72" width="26" height="10" />
        </svg>
        <div className="co-sb-tx"><p className="co-sb-t">{s[0].t}</p><p className="co-sb-d">{s[0].d}</p></div>
      </li>
      <li className={`co-tile co-tile-cream co-sb co-sb-stop ${q.state(1)}`} data-i="" aria-current={q.on(1) ? 'step' : undefined}>
        <span className="co-n" aria-hidden="true">2</span>
        <svg className="co-sb-art" viewBox="0 0 168 104" aria-hidden="true" focusable="false">
          <rect className="co-frame" x="10" y="8" width="104" height="88" /><path className="co-frame" d="M10 22h104" />
          <rect className="co-field" x="22" y="34" width="80" height="10" /><rect className="co-field" x="22" y="50" width="80" height="10" /><rect className="co-field" x="22" y="66" width="80" height="10" />
          <rect className="co-btn co-btn-off" x="22" y="82" width="34" height="8" />
          <circle className="co-q" cx="140" cy="44" r="21" /><text className="co-q-t" x="140" y="54" textAnchor="middle">?</text>
          <path className="co-arw" d="M118 58l6-4" />
        </svg>
        <div className="co-sb-tx"><p className="co-sb-t">{s[1].t}</p><p className="co-sb-d">{s[1].d}</p></div>
      </li>
      <li className={`co-tile co-tile-ink co-sb ${q.state(2)}`} data-i="" aria-current={q.on(2) ? 'step' : undefined}>
        <span className="co-n" aria-hidden="true">3</span>
        <svg className="co-sb-art" viewBox="0 0 168 104" aria-hidden="true" focusable="false">
          <path className="co-frame-on-ink" d="M10 46h40l8 14h32l8-14h40v46H10z" />
          <path className="co-dash-on-ink" d="M24 30h108M24 18h108" />
          <g className="co-ppl co-ppl-out"><circle cx="128" cy="62" r="6" /><path d="M118 80c0-7 4-10 10-10s10 3 10 10" /><circle cx="152" cy="62" r="6" /><path d="M142 80c0-7 4-10 10-10s10 3 10 10" /></g>
          <path className="co-arw" d="M120 92h40m-7-7 7 7-7 7" />
        </svg>
        <div className="co-sb-tx"><p className="co-sb-t">{s[2].t}</p><p className="co-sb-d">{s[2].d}</p></div>
      </li>
    </ol>
  );
}

/* ------------------------------------------------------------------ 2. four places + verdict */
export function FourPlaces() {
  const [ref, q] = useSequence<HTMLDivElement>(5, OPTS);
  return (
    <div ref={ref} className={cls(q, 'co-route')} {...root(q, 5)}>
      <ol className="co-route-l co-flow">
        {CO.stations.map((st, j) => (
          <li key={st.t} className={`co-tile co-tile-cream co-stn ${st.fix ? 'is-fix' : 'is-not'}${j === 3 ? ' co-dash' : ''} ${q.state(j)}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
            <div className="co-stn-top">
              <Num q={q} j={j} label={st.label} />
              <svg className="co-ic" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={st.icon} /></svg>
            </div>
            <h3 className="co-stn-t">{st.t}</h3>
            <p className="co-stn-d">{st.d}</p>
            <p className={`co-tag ${st.fix ? 'co-tag-fix' : 'co-tag-not'}`}>{st.fix ? CO.tagFix : CO.tagNot}</p>
          </li>
        ))}
      </ol>
      <p className={`co-verdict co-tile co-tile-ink ${q.state(4)}`} data-i="">
        <span className="co-verdict-k">{CO.verdictK}</span>
        <span className="co-verdict-t">It can help with <b>2</b> and <b>3</b>. It won’t fix <b>1</b> or <b>4</b>.</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. how we work */
const Tick = ({ s = 20 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true" focusable="false"><path d="M4.5 12.5l5 5 10-11" /></svg>
);

export function HowWeWork() {
  const [ref, q] = useSequence<HTMLDivElement>(4, OPTS);
  const a = at(q, 4);
  const fig = (j: number) => `co-fig${a === j ? ' is-on' : ''}`;
  return (
    <div ref={ref} className={cls(q, 'co-work')} {...root(q, 4)}>
      <ol className="co-wl">
        {CO.steps.map((st, j) => (
          <li key={st.t} className={`co-ws ${q.state(j)}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
            <Num q={q} j={j} label={st.label.replace(/^Step /, '')} />
            <div>
              <h3 className="co-ws-t">{st.t}</h3>
              <p className="co-ws-d">{st.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="co-stage co-tile co-tile-cream" aria-hidden="true">
        <div className={fig(0)}>
          <p className="co-fig-k">1 · A test enquiry</p>
          <div className="co-fig-row">
            <div className="co-phone"><i /><i /><i className="co-short" /><b>Send</b></div>
            <span className="co-fig-arw" />
            <div className="co-inbox"><span className="co-inbox-h">Your inbox</span><span className="co-row co-row-new"><Tick s={18} />Test enquiry arrived</span><span className="co-row" /><span className="co-row" /></div>
          </div>
          <p className="co-fig-q">Did it arrive?</p>
        </div>
        <div className={fig(1)}>
          <p className="co-fig-k">2 · What we found, biggest first</p>
          <ol className="co-rank">
            <li className="is-first"><span>The form asks too much</span><em>Fix first</em></li>
            <li><span>Prices are hard to find</span></li>
            <li><span>The page is slow on phones</span></li>
          </ol>
          <p className="co-fig-note">Example list.</p>
        </div>
        <div className={fig(2)}>
          <p className="co-fig-k">3 · The agreed changes</p>
          <ul className="co-done">
            {['The form', 'The booking page', 'The reply people get', 'The tracking'].map((t) => (
              <li key={t}><Tick />{t}</li>
            ))}
          </ul>
          <p className="co-fig-note">Example. What changes depends on what we find.</p>
        </div>
        <div className={fig(3)}>
          <p className="co-fig-k">4 · Measured the same way</p>
          <div className="co-ba">
            <div className="co-ba-c"><span className="co-ba-l">Before</span><span className="co-ba-v">Starting point recorded</span></div>
            <span className="co-ba-vs">then</span>
            <div className="co-ba-c co-ba-after"><span className="co-ba-l">After</span><span className="co-ba-v">Compared with the start</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. improve, measure, review (CO-D06 as revised) */
export function ImproveMeasureReview() {
  const [ref, q] = useSequence<HTMLDivElement>(3, OPTS);
  const m = CO.measSteps;
  return (
    <div ref={ref} className={cls(q, 'co-meas')} data-reveal="dim" {...root(q, 3)}>
      <ol className="co-ml co-flow">
        <li className={`co-tile co-tile-cream co-mi ${q.state(0)}`} data-i="" aria-current={q.on(0) ? 'step' : undefined}>
          <Num q={q} j={0} label={m[0].label} />
          <div className="co-mi-art co-mini-page" aria-hidden="true"><i /><i className="co-short" /><b className="co-new">New</b></div>
          <p className="co-mi-t">{m[0].t}</p>
          <p className="co-mi-d">{m[0].d}</p>
        </li>
        <li className={`co-tile co-tile-cream co-mi ${q.state(1)}`} data-i="" aria-current={q.on(1) ? 'step' : undefined}>
          <Num q={q} j={1} label={m[1].label} />
          <div className="co-mi-art co-bars" aria-hidden="true"><i /><i /><i /><i /></div>
          <p className="co-mi-t">{m[1].t}</p>
          <p className="co-mi-d">{m[1].d}</p>
        </li>
        <li className={`co-tile co-tile-ink co-mi ${q.state(2)}`} data-i="" aria-current={q.on(2) ? 'step' : undefined}>
          <Num q={q} j={2} label={m[2].label} />
          <div className="co-mi-art co-cmp" aria-hidden="true"><span>Before</span><svg viewBox="0 0 32 24" width="32" height="24" focusable="false"><path d="M2 8h26m-6-6 6 6-6 6M30 17H4m6-6-6 6 6 6" /></svg><span>After</span></div>
          <p className="co-mi-t">{m[2].t}</p>
          <p className="co-mi-d">{m[2].d}</p>
        </li>
      </ol>
      <p className="px-cap co-meas-cap">{CO.measCaption}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. our own form */
export function OwnForm() {
  const [ref, q] = useSequence<HTMLDivElement>(5, OPTS);
  const p = CO.proof;
  return (
    <div ref={ref} className={cls(q, 'co-proof')} data-reveal="cum" {...root(q, 5)}>
      <ol className="co-pl co-flow">
        <li className={`co-pi ${q.state(0)}`} data-i="" aria-current={q.on(0) ? 'step' : undefined}>
          <Num q={q} j={0} label={p[0].label} />
          <div className="co-pi-art co-tile co-tile-cream" aria-hidden="true"><div className="co-ph"><i /><i /><i className="co-short" /><b>Send</b></div></div>
          <p className="co-pi-t">{p[0].t}</p>
        </li>
        <li className={`co-pi ${q.state(1)}`} data-i="" aria-current={q.on(1) ? 'step' : undefined}>
          <Num q={q} j={1} label={p[1].label} />
          <div className="co-pi-art co-tile co-tile-cream" aria-hidden="true">
            <div className="co-ph co-ph-ok"><span className="co-ok"><Tick s={26} /></span><strong>{CO.thanks.t}</strong><small>{CO.thanks.d}</small></div>
          </div>
          <p className="co-pi-t">{p[1].t}</p>
        </li>
        <li className={`co-pi ${q.state(2)}`} data-i="" aria-current={q.on(2) ? 'step' : undefined}>
          <Num q={q} j={2} label={p[2].label} />
          <div className="co-pi-art co-tile co-tile-ink co-dash" aria-hidden="true"><div className="co-ib"><span className="co-ib-h">{CO.inbox.h}</span><i /><i /><i /><strong>{CO.inbox.v}</strong></div></div>
          <p className="co-pi-t">{p[2].t}</p>
        </li>
        <li className={`co-pi ${q.state(3)}`} data-i="" aria-current={q.on(3) ? 'step' : undefined}>
          <Num q={q} j={3} label={p[3].label} />
          <div className="co-pi-art co-tile co-tile-ink" aria-hidden="true"><svg className="co-eye" viewBox="0 0 24 24" width="64" height="64" focusable="false"><path d="M3 12s3.5-6.5 9-6.5S21 12 21 12s-3.5 6.5-9 6.5S3 12 3 12Zm9-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM4 4l16 16" /></svg></div>
          <p className="co-pi-t">{p[3].t}</p>
        </li>
      </ol>
      <p className="px-cap px-cap-ink co-pi-cap">{CO.reconstruction}</p>
      <div className={`co-lesson co-tile co-tile-cream ${q.state(4)}`} data-i="">
        <p className="co-tl">{CO.lesson.k}</p>
        <p className="co-lesson-t">{CO.lesson.a} <span className="co-lesson-b">{CO.lesson.b}</span></p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. what happens next */
export function WhatHappensNext() {
  const [ref, q] = useSequence<HTMLOListElement>(CO.close.next.length, OPTS);
  return (
    <ol ref={ref} className={cls(q, 'co-next')} data-reveal="dim" {...root(q, CO.close.next.length)}>
      {CO.close.next.map((t, j) => (
        <li key={t} className={`co-tile co-tile-ink ${q.state(j)}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
          <span className="co-n" aria-hidden="true">{j + 1}</span>
          <p>{t}</p>
        </li>
      ))}
    </ol>
  );
}
