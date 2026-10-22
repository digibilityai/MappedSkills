import Link from 'next/link';
import { Mark } from '@/components/direction-c/primitives';
import { WORK as S } from './content';
import type { WorkStudy } from './studies';

/**
 * The /work study previews (approved G7 listing design), shared by the server pages and the client filter (no hooks,
 * no server-only imports). A card names the service, the client and the study, then one line: an outcome statement the
 * editor wrote (never a figure) or, failing that, the challenge. Figures stay inside the study with their context.
 */

const meta = (s: WorkStudy) => [s.industry, s.period].filter(Boolean).join(' · ');

function Evidence({ study }: { study: WorkStudy }) {
  const parts = [study.figures ? S.labels.figures : '', study.outcomes.length ? S.labels.documented : ''].filter(Boolean);
  return parts.length ? <span className="wk-card-ev">{parts.join(' · ')}</span> : null;
}

export function Featured({ study }: { study: WorkStudy }) {
  const id = `cs-${study.slug}`;
  // Right-hand panel: what the editor recorded as having changed, else the legacy "what we changed" headings, else the challenge.
  const list = study.outcomes.length ? study.outcomes : study.changed;
  const heading = study.outcomes.length ? S.labels.outcomes : study.changed.length ? S.labels.changed : S.labels.challenge;
  return (
    <article className="wk-feat" id={id} aria-labelledby={`${id}-h`}>
      <div className="wk-feat-a">
        <p className="wk-feat-k">
          <span>{S.labels.featured}</span>
          {study.service ? <span className="wk-feat-svc">{study.service}</span> : null}
        </p>
        <p className="wk-feat-client">
          {study.client}
          {study.detail ? <span>, {study.detail}</span> : null}
        </p>
        <h2 id={`${id}-h`} className="wk-feat-t">
          <Link href={study.href}>{study.title}</Link>
        </h2>
        {study.challenge ? <p className="wk-feat-s">{study.challenge}</p> : null}
        {meta(study) ? <p className="wk-feat-m">{meta(study)}</p> : null}
        <span className="wk-feat-go" aria-hidden="true">
          {S.labels.read} →
        </span>
      </div>
      <div className="wk-feat-b">
        <p className="wk-feat-bk">{heading}</p>
        {list.length ? (
          <ol className="wk-feat-o">
            {list.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ol>
        ) : (
          <p className="wk-feat-o1">{study.challenge}</p>
        )}
        {study.figures ? (
          <p className="wk-feat-ev">
            <Mark state="named" /> {study.figures === 1 ? 'One reported figure' : `${study.figures} reported figures`} inside, each with its metric, period and source.
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function Card({ study, wide }: { study: WorkStudy; wide?: boolean }) {
  const id = `cs-${study.slug}`;
  const line = study.outcomes[0] ?? study.challenge;
  return (
    <li className={`wk-card${wide ? ' is-wide' : ''}${study.stage ? ` is-${study.stage.toLowerCase()}` : ''}`} id={id}>
      <article aria-labelledby={`${id}-h`}>
        <p className="wk-card-k">
          {study.service ? (
            <>
              <Mark state={study.stage === 'Convert' ? 'owned' : 'named'} />
              <span>{study.service}</span>
            </>
          ) : (
            <span>Case study</span>
          )}
          {study.period ? <span className="wk-card-p">{study.period}</span> : null}
        </p>
        <p className="wk-card-client">
          {study.client}
          {study.detail ? <span className="px-sr">, {study.detail}</span> : null}
        </p>
        <h3 id={`${id}-h`} className="wk-card-t">
          <Link href={study.href}>{study.title}</Link>
        </h3>
        {line ? (
          <p className="wk-card-l">
            <span className="wk-k">{study.outcomes.length ? S.labels.outcome : S.labels.challenge}</span> {line}
          </p>
        ) : null}
        <p className="wk-card-f">
          <span>{study.industry}</span>
          <Evidence study={study} />
        </p>
      </article>
    </li>
  );
}
