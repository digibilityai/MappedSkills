import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { Breadcrumb } from '../Breadcrumb';
import { WORK as S } from './content';
import type { WorkStudy } from './studies';
import './work.css';

/**
 * C+ Case studies (/work): the owner-approved G1 R3 design (docs/work-redesign/g1-r3/), without the service filter
 * (hidden at launch by owner decision). Hero → client work (one featured study, then the rest on a wrapping grid)
 * → one evidence note → the shared tangerine close (TB markup, no reveal). No `data-rv` on this page.
 */

const STAGES = ['Capture', 'Convert', 'Measure'] as const;

/* Where the work sat on Capture → Convert → Measure: three equal cells, a classification, not data. */
function StagePath({ stage, size }: { stage: WorkStudy['stage']; size: 'lg' | 'sm' }) {
  if (!stage) return null;
  return (
    <div className={`wk-path wk-path-${size}`}>
      <p className="wk-lbl">{S.labels.stage}</p>
      <ol className="wk-path-l">
        {STAGES.map((s) => (
          <li key={s} className={s === stage ? 'is-on' : undefined} aria-current={s === stage ? 'true' : undefined}>
            <span className="wk-path-d" aria-hidden="true" />
            {s}
            {s === stage ? <span className="px-sr"> (this project)</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Meta({ study, withDetail }: { study: WorkStudy; withDetail: boolean }) {
  const parts = [study.industry, withDetail ? study.detail : ''].filter(Boolean);
  return (
    <p className="wk-meta">
      {study.service ? <span className="wk-tag">{study.service}</span> : null}
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 ? (
            <>
              <span aria-hidden="true">· </span>
              <span className="px-sr">, </span>
            </>
          ) : null}
          {p}
        </span>
      ))}
    </p>
  );
}

function ReadLink({ study, large }: { study: WorkStudy; large?: boolean }) {
  return (
    <Link href={study.href} className={large ? 'wk-go wk-go-lg' : 'wk-go'}>
      <span className="wk-go-t">{S.labels.read}</span>
      <span className="px-sr">: {study.client}</span> <span aria-hidden="true">→</span>
    </Link>
  );
}

function Featured({ study }: { study: WorkStudy }) {
  const id = `cs-${study.slug}`;
    return (
    <article className="wk-feat" id={id} aria-labelledby={`${id}-h`}>
      <div className="wk-feat-bar">
        <span>{S.labels.featured}</span>
        {study.detail ? <span>{study.detail}</span> : null}
      </div>
      <div className="wk-feat-g">
        <div className="wk-feat-a">
          <Meta study={study} withDetail={false} />
          <h3 id={`${id}-h`} className="wk-feat-t">
            {study.client}
          </h3>
          {study.challenge ? (
            <p className="wk-feat-c">
              <span className="wk-lbl">{S.labels.challenge}</span>
              {study.challenge}
            </p>
          ) : null}
          <StagePath stage={study.stage} size="lg" />
          <p className="wk-feat-link">
            <ReadLink study={study} large />
          </p>
        </div>
        {study.blockers.length || study.changed.length ? (
          <div
            className={study.blockers.length && study.changed.length ? 'wk-feat-b' : 'wk-feat-b wk-feat-b-one'}
            role="group"
            aria-label="From what stood in the way to what we changed"
          >
            {study.blockers.length ? (
              <div className="wk-col">
                <p className="wk-lbl">{S.labels.blockers}</p>
                <ul className="wk-list wk-list-x">
                  {study.blockers.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {study.blockers.length && study.changed.length ? (
              <div className="wk-turn" aria-hidden="true">
                <span />
              </div>
            ) : null}
            {study.changed.length ? (
              <div className="wk-col">
                <p className="wk-lbl">{S.labels.changed}</p>
                <ol className="wk-list wk-list-n">
                  {study.changed.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Card({ study }: { study: WorkStudy }) {
  const id = `cs-${study.slug}`;
  return (
    <li className="wk-card" id={id}>
      <article aria-labelledby={`${id}-h`}>
        <div className="wk-card-a">
          <Meta study={study} withDetail />
          <h3 id={`${id}-h`} className="wk-card-t">
            {study.client}
          </h3>
          {study.challenge ? (
            <p className="wk-card-c">
              <span className="wk-lbl">{S.labels.challenge}</span>
              {study.challenge}
            </p>
          ) : null}
        </div>
        <div className="wk-card-b">
          {study.changed.length ? (
            <div className="wk-card-w">
              <p className="wk-lbl">{S.labels.changed}</p>
              <ul className="wk-inline">
                {study.changed.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <StagePath stage={study.stage} size="sm" />
          <p className="wk-card-link">
            <ReadLink study={study} />
          </p>
        </div>
      </article>
    </li>
  );
}

export function WorkBody({ featured, rest }: { featured: WorkStudy | null; rest: WorkStudy[] }) {
  return (
    <>
      {/* 1 — hero (ivory): breadcrumb, then the headline and the lede side by side. No CTA, no index. */}
      <section className="b-hero wk-hero" aria-labelledby="wk-h1">
        <div className="px-wrap">
          <Breadcrumb current={S.crumb} />
          <div className="wk-hero-g">
            <h1 id="wk-h1" className="b-h1">
              {S.hero.h1.a} <span className="b-named">{S.hero.h1.b}</span>
            </h1>
            <p className="b-lede">{S.hero.lede}</p>
          </div>
        </div>
      </section>

      {/* 2 — client work (paper). Only published studies; the section is left out if Contentful returns none. */}
      {featured ? (
        <section className="b-sec b-paper wk-work" aria-labelledby="wk-h-work">
          <div className="px-wrap">
            <div className="wk-work-h">
              <p className="b-kicker">{S.work.kicker}</p>
              <h2 id="wk-h-work" className="b-h2">
                {S.work.h}
              </h2>
              <p className="wk-intro">{S.work.intro}</p>
            </div>
            <div className="wk-coll">
              <Featured study={featured} />
              {rest.length ? (
                <ul className="wk-grid">
                  {rest.map((s) => (
                    <Card key={s.slug} study={s} />
                  ))}
                </ul>
              ) : null}
            </div>
            <aside className="wk-note" aria-label="About the evidence">
              <p>
                <strong>{S.note.h}</strong> {S.note.body}
              </p>
            </aside>
          </div>
        </section>
      ) : null}

      {/* close: the shared tangerine close */}
      <section className="b-close" aria-labelledby="wk-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker wk-close-k">{S.close.kicker}</p>
            <h2 id="wk-h-close" className="b-h2">
              {S.close.h}
            </h2>
            <p className="b-lede">{S.close.body}</p>
          </div>
          <div className="dc-actions">
            <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
              <Mark />
              {S.close.primary}
            </Link>
            <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
              {S.close.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
