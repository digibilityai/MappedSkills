import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { isDocumentPopulated } from '@/lib/contentful/mappers';
import { siteMetadata } from '@/lib/metadata';
import type { CmsResearchCard, CmsResearchCategory, CmsResearchFinding, CmsResearchReport } from '@/lib/contentful/types';
import { Breadcrumb } from '../Breadcrumb';
import { LEAD_NOTES, RESEARCH as S } from './content';
import { sampleField } from './sample';
import './research.css';

/**
 * C+ Research hub (/research): the owner-approved G1 R1 design (docs/research-redesign/g1/). Hero → the lead finding with
 * its sample drawn → the other findings → the featured report, once, with how the research is done → media → the close.
 * Every research fact is Contentful data rendered as published. The lead section's DOM order is its reading order at
 * every width (head, figure, body). No `data-rv`, no count-up.
 */

export type ResearchHubData = {
  /** The featured report (or the newest), with its key findings, facts and section flags. */
  report: CmsResearchReport | null;
  /** Its card (for the hero line), even when the full report could not be read. */
  card: CmsResearchCard | null;
  /** Lead first, then the rest: the report's key findings in report order, else the latest-findings feed. */
  findings: CmsResearchFinding[];
  /** Other published reports, newest first (excluding the featured one). */
  others: CmsResearchCard[];
  categories: CmsResearchCategory[];
};

const shortTitle = (t: string) => t.split(':')[0].trim();

/* A paired statistic ("66.7% vs 6.7%") is set smaller on one line, with the joining word in a lighter weight. */
function Stat({ value }: { value?: string }) {
  if (!value) return <p className="rs-stat" />;
  const pair = /^(.+?)\s+(vs\.?)\s+(.+)$/i.exec(value);
  if (!pair) return <p className="rs-stat">{value}</p>;
  return (
    <p className="rs-stat rs-stat-pair">
      {pair[1]} <span>{pair[2]}</span> {pair[3]}
    </p>
  );
}

export function ResearchBody({ data }: { data: ResearchHubData }) {
  const { report, card, findings, others, categories } = data;
  const [lead, ...more] = findings;
  const notes = lead ? LEAD_NOTES[lead.headline] : undefined;
  const field = lead ? sampleField(lead.statistic, report?.sampleSize) : null;
  const marked = notes?.marked ?? (lead?.statistic ? S.figure.marked(lead.statistic) : '');
  const href = report?.slug ? `/research/${report.slug}` : card?.href;
  const facts = report
    ? ([
        [S.report.facts.published, report.publishedDate],
        [S.report.facts.period, report.researchPeriod],
        [S.report.facts.geography, report.geography],
        [S.report.facts.sample, report.sampleSize != null ? String(report.sampleSize) : undefined],
        [S.report.facts.category, report.categoryName],
        [S.report.facts.author, report.author?.name],
      ].filter(([, v]) => v) as [string, string][])
    : [];
  const mailto = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(S.media.subject)}`;

  return (
    <>
      {/* 1 — hero (ivory). No CTA in the first screen. */}
      <section className="b-hero rs-hero" aria-labelledby="rs-h1">
        <div className="px-wrap">
          <Breadcrumb current={S.crumb} />
          <div className="rs-hero-g">
            <h1 id="rs-h1" className="b-h1 rs-h1">
              {S.hero.h1.a} <span className="b-named">{S.hero.h1.b}</span>
            </h1>
            <div>
              <p className="b-lede rs-lede">{S.hero.lede}</p>
              {card ? (
                <p className="rs-latest">
                  <span className="rs-label">{S.hero.latest}</span>{' '}
                  <a href="#rs-report" className="rs-go">
                    <span className="rs-go-t">{shortTitle(card.title)}</span> <span aria-hidden="true">↓</span>
                  </a>{' '}
                  <span className="rs-latest-d">{card.publishedDate}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 2 — the lead finding (ink): head, figure, body, in this order in the DOM and on screen. */}
      {lead ? (
        <section className="b-sec b-ink rs-lead" aria-labelledby="rs-h-lead">
          <div className={field ? 'px-wrap rs-lead-g' : 'px-wrap rs-lead-g rs-lead-g-text'}>
            <div className="rs-lead-head">
              <p className="b-kicker">{S.lead.kicker}</p>
              {lead.statistic ? <p className="rs-stat rs-stat-xl">{lead.statistic}</p> : null}
              <h2 id="rs-h-lead" className="b-h2 rs-lead-h">
                {lead.headline}
              </h2>
            </div>

            {field ? (
              <figure className="rs-fig">
                <div
                  className="rs-field"
                  style={{ gridTemplateColumns: `repeat(${field.cols}, minmax(0, 1fr))` }}
                  role="img"
                  aria-label={`${field.total} squares, one for each audited website, in 10 rows of ${field.cols}. ${field.marked} are marked: ${marked}. The other ${field.rest} are plain.`}
                >
                  {Array.from({ length: field.total }, (_, i) => (
                    <span key={i} className={i < field.marked ? 'rs-mk rs-mk-gap' : 'rs-mk'} />
                  ))}
                </div>
                <ul className="rs-key" aria-hidden="true">
                  <li>
                    <span className="rs-mk rs-mk-gap" />
                    <strong>{field.marked}</strong> {marked}
                  </li>
                  <li>
                    <span className="rs-mk" />
                    <strong>{field.rest}</strong> {S.figure.rest}
                  </li>
                </ul>
                <figcaption className="px-cap px-cap-ink rs-cap">{S.figure.cap(field.cols, field.rest)}</figcaption>
              </figure>
            ) : null}

            <div className="rs-lead-body">
              {lead.description ? <p className="rs-lead-d">{lead.description}</p> : null}
              {notes ? (
                <dl className="rs-read">
                  <div>
                    <dt>What this means for you</dt>
                    <dd>{notes.means}</dd>
                  </div>
                  <div>
                    <dt>What it doesn’t mean</dt>
                    <dd>{notes.notMeans}</dd>
                  </div>
                </dl>
              ) : null}
              {lead.baseSample || lead.sourceNote ? (
                <p className="rs-meta rs-meta-ink">
                  {[lead.baseSample, lead.sourceNote].filter(Boolean).join(' · ')}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* 3 — the other findings (paper): every number beside its full description, sample and source. */}
      {more.length ? (
        <section className="b-sec b-paper rs-more" aria-labelledby="rs-h-more">
          <div className="px-wrap">
            <p className="b-kicker">{S.more.kicker}</p>
            <h2 id="rs-h-more" className="b-h2 rs-h2">
              {S.more.h}
            </h2>
            <ol className="rs-ledger">
              {more.map((f) => (
                <li key={f.id} className="rs-row">
                  <Stat value={f.statistic} />
                  <div className="rs-row-t">
                    <h3 className="rs-row-h">{f.headline}</h3>
                    {f.description ? <p className="rs-row-d">{f.description}</p> : null}
                  </div>
                  <p className="rs-meta">
                    {f.baseSample ? (
                      <>
                        <span className="rs-meta-k">{S.more.sample}</span> {f.baseSample}{' '}
                      </>
                    ) : null}
                    {f.sourceNote ? (
                      <>
                        <span className="rs-meta-k">{S.more.source}</span> {f.sourceNote}
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* 4 — the featured report, once (ivory), then how the research is done. */}
      <section className="b-sec rs-report" id="rs-report" aria-labelledby={card ? 'rs-h-report' : 'rs-h-empty'}>
        <div className="px-wrap">
          {card && href ? (
            <div className="rs-card">
              <div>
                <p className="b-kicker">{S.report.kicker}</p>
                <h2 id="rs-h-report" className="rs-card-h">
                  {report?.title ?? card.title}
                </h2>
                {(report?.excerpt ?? card.excerpt) ? <p className="rs-card-x">{report?.excerpt ?? card.excerpt}</p> : null}
                <p className="rs-card-a">
                  <Link className="dc-btn dc-btn-primary" href={href}>
                    <Mark />
                    {S.report.read}
                  </Link>
                  {report && isDocumentPopulated(report.methodologyJson) ? (
                    <Link className="rs-go" href={`${href}#methodology`}>
                      <span className="rs-go-t">{S.report.methodology}</span> <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                  {report && isDocumentPopulated(report.limitationsJson) ? (
                    <Link className="rs-go" href={`${href}#limitations`}>
                      <span className="rs-go-t">{S.report.limitations}</span> <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </p>
              </div>
              {facts.length ? (
                <dl className="rs-facts">
                  {facts.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          ) : (
            <div className="rs-empty">
              <h2 id="rs-h-empty" className="b-h2 rs-h2">
                {S.empty.h}
              </h2>
              <p>{S.empty.body}</p>
            </div>
          )}

          {/* only when there is more than one report, or more than one research area */}
          {others.length ? (
            <nav className="rs-list" aria-labelledby="rs-h-others">
              <h2 id="rs-h-others" className="rs-label">
                {S.report.more}
              </h2>
              <ul>
                {others.map((r) => (
                  <li key={r.slug}>
                    <Link className="rs-go" href={r.href}>
                      <span className="rs-go-t">{r.title}</span> <span aria-hidden="true">→</span>
                    </Link>
                    <span className="rs-list-m">{[r.categoryName, r.publishedDate].filter(Boolean).join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {categories.length > 1 ? (
            <nav className="rs-list" aria-labelledby="rs-h-areas">
              <h2 id="rs-h-areas" className="rs-label">
                {S.report.areas}
              </h2>
              <ul>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link className="rs-go" href={c.href}>
                      <span className="rs-go-t">{c.name}</span> <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div className="rs-method">
            <p className="b-kicker">{S.method.kicker}</p>
            <h2 className="rs-method-h">
              {S.method.h.a} <span className="b-named">{S.method.h.b}</span>
            </h2>
            <ol className="rs-steps">
              {S.method.steps.map((s) => (
                <li key={s.t}>
                  <p className="rs-step-t">{s.t}</p>
                  <p className="rs-step-d">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 5 — media (slim, secondary): the existing media enquiry text, mailto subject and link. */}
      <aside className="rs-media" aria-labelledby="rs-h-media">
        <div className="px-wrap rs-media-in">
          <h2 id="rs-h-media" className="rs-label">
            {S.media.h}
          </h2>
          <div className="rs-media-b">
            <p>
              {S.media.body} <a href={mailto}>{siteMetadata.email}</a> {S.media.tail}
            </p>
            <Link className="rs-go" href={CONTACT_HREF}>
              <span className="rs-go-t">{S.media.link}</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* close: the shared tangerine close, owner copy */}
      <section className="b-close" aria-labelledby="rs-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <h2 id="rs-h-close" className="b-h2">
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
