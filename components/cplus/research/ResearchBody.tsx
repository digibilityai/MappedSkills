import Link from 'next/link';
import { CONTACT_HREF } from '@/components/direction-c/primitives';
import { EdClose } from '@/components/editorial/EdClose';
import { splitAfterMarker } from '@/lib/headline-emphasis';
import { isDocumentPopulated } from '@/lib/contentful/mappers';
import { siteMetadata } from '@/lib/metadata';
import type { CmsResearchCard, CmsResearchCategory, CmsResearchFinding, CmsResearchReport } from '@/lib/contentful/types';
import { EdMotion } from '@/components/editorial/EdMotion';
import { EvidenceBars } from '@/components/editorial/EvidenceBars';
import { EvidenceField } from '@/components/editorial/EvidenceField';
import { LEAD_NOTES, RESEARCH as S } from './content';
import { validatedEvidence } from './evidence';
import './research.css';
import '@/components/editorial/editorial.css';

/**
 * C+ Research hub (/research), editorial R3 as revised by DEC-112: statement hero → the headline finding as its own scene (its
 * 120 squares with a text legend) → what it means and does not mean → the other findings, each with its own chart where an explicit,
 * validated count exists (evidence.ts) → the featured report once → how the research is done → the close. Every research fact is
 * Contentful data rendered as published; counts are checked against the recorded text and a finding that fails the check stands as text.
 * No count-up numbers; the only script is `EdMotion` (charts released once when scrolled into view).
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

/* A paired statistic ("66.7% vs 6.7%") is set smaller on one line, with the joining word in a lighter weight. */
function Stat({ value }: { value?: string }) {
  if (!value) return <p className="ed-fig v" />;
  const pair = /^(.+?)\s+(vs\.?)\s+(.+)$/i.exec(value);
  if (!pair) return <p className="ed-fig v">{value}</p>;
  return (
    <p className="ed-fig v is-pair">
      {pair[1]} <span>{pair[2]}</span> {pair[3]}
    </p>
  );
}

export function ResearchBody({ data }: { data: ResearchHubData }) {
  const { report, card, findings, others, categories } = data;
  const [lead, ...more] = findings;
  const notes = lead ? LEAD_NOTES[lead.headline] : undefined;
  const leadHeading = S.lead.h(report?.sampleSize);
  const leadSpec = validatedEvidence(lead, report?.sampleSize);
  const leadField = leadSpec?.type === 'field' ? leadSpec : null;
  const specs = more.map((f) => validatedEvidence(f, report?.sampleSize));
  const anyField = specs.some((x) => x?.type === 'field');
  const href = report?.slug ? `/research/${report.slug}` : card?.href;
  const title = report?.title ?? card?.title ?? '';
  const head = splitAfterMarker(title);
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
  const c = S.close;
  let n = 0;
  const ch = () => String(++n).padStart(2, '0');

  return (
    <>
      <section className="ed-hero" aria-labelledby="rs-h1">
        <div className="ed-w">
          <div className="ed-hg">
            <div className="ed-hl wide">
              <p className="ed-k">{S.crumb}</p>
              <h1 id="rs-h1">
                {S.hero.h1.a} <em>{S.hero.h1.b}</em>
              </h1>
              <p className="ed-lede">{S.hero.lede}</p>
              {card && href ? (
                <div className="ed-act">
                  <a className="ed-btn" href="#rs-report">
                    {S.report.read}
                  </a>
                  {lead ? (
                    <a className="ed-link" href="#rs-finding">
                      {S.lead.see} <span aria-hidden="true">↓</span>
                    </a>
                  ) : (
                    <Link className="ed-link" href="/press">
                      {S.media.press}
                    </Link>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {lead ? (
        <section className="ed-band dark" id="rs-finding" aria-labelledby="rs-h-lead">
          <div className="ed-w">
            <p className="ed-ch">
              <span>{ch()}</span>
              {S.lead.kicker}
            </p>
            <h2 id="rs-h-lead" className="ed-h2">
              {leadHeading.a} {leadHeading.b ? <em>{leadHeading.b}</em> : null}
            </h2>
            <div className="ed-scene">
              {leadField ? <EvidenceField spec={leadField} idBase="rs-lead" /> : null}
              <div className="fx">
                <Stat value={lead.statistic} />
                <h3>{lead.headline}</h3>
                {lead.description ? <p>{lead.description}</p> : null}
                {lead.baseSample || lead.sourceNote ? <p className="src">{[lead.baseSample, lead.sourceNote].filter(Boolean).join(' · ')}</p> : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {notes ? (
        <section className="ed-band paper" aria-labelledby="rs-h-means">
          <div className="ed-w">
            <p className="ed-ch">
              <span>{ch()}</span>
              {S.means.kicker}
            </p>
            <h2 id="rs-h-means" className="ed-h2">
              {S.means.h.a} <em>{S.means.h.b}</em>
            </h2>
            <div className="ed-big2">
              <div>
                <p className="ed-pk">{S.means.yes}</p>
                <p className="b">{notes.means}</p>
              </div>
              <div>
                <p className="ed-pk">{S.means.no}</p>
                <p className="b">{notes.notMeans}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {more.length ? (
        <section className="ed-band dark" aria-labelledby="rs-h-more">
          <div className="ed-w">
            <p className="ed-ch">
              <span>{ch()}</span>
              {S.more.kicker}
            </p>
            <h2 id="rs-h-more" className="ed-h2">
              What else <em>we found.</em>
            </h2>
            {anyField ? <p className="ed-dek">{S.more.dek}</p> : null}
            <ul className="ed-multi">
              {more.map((f, i) => {
                const spec = specs[i];
                const bars = spec?.type === 'bars' ? spec : null;
                const field = spec?.type === 'field' ? spec : null;
                return (
                  <li key={f.id} className={bars ? 'wide' : undefined}>
                    {field ? <EvidenceField spec={field} idBase={`rs-more-${i}`} /> : null}
                    <div>
                      <Stat value={f.statistic} />
                      <h3>{f.headline}</h3>
                      {f.description ? <p className="d">{f.description}</p> : null}
                      {bars ? <EvidenceBars spec={bars} /> : null}
                      <p className="src">
                        {f.baseSample ? (
                          <>
                            <b>{S.more.sample}</b> {f.baseSample}{' '}
                          </>
                        ) : null}
                        {f.sourceNote ? (
                          <>
                            <b>{S.more.source}</b> {f.sourceNote}
                          </>
                        ) : null}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="ed-band paper" id="rs-report" aria-labelledby={card ? 'rs-h-report' : 'rs-h-empty'}>
        <div className="ed-w">
          {card && href ? (
            <>
              <p className="ed-ch">
                <span>{ch()}</span>
                {S.report.kicker}
              </p>
              <div className="ed-two">
                <div>
                  <h2 id="rs-h-report" className="ed-h2 ed-h2-wide">
                    {head.emphasis ? (
                      <>
                        {head.before.trim()} <em>{head.emphasis}</em>
                      </>
                    ) : (
                      title
                    )}
                  </h2>
                  {(report?.excerpt ?? card.excerpt) ? <p className="ed-dek">{report?.excerpt ?? card.excerpt}</p> : null}
                  {facts.length ? (
                    <dl className="ed-facts">
                      {facts.map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <div className="ed-act">
                    <Link className="ed-btn" href={href}>
                      {S.report.read}
                    </Link>
                    {report && isDocumentPopulated(report.methodologyJson) ? (
                      <Link className="ed-link dk" href={`${href}#methodology`}>
                        {S.report.methodology}
                      </Link>
                    ) : null}
                    {report && isDocumentPopulated(report.limitationsJson) ? (
                      <Link className="ed-link dk" href={`${href}#limitations`}>
                        {S.report.limitations}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rs-empty">
              <h2 id="rs-h-empty" className="ed-h2">
                {S.empty.h}
              </h2>
              <p className="ed-dek">{S.empty.body}</p>
            </div>
          )}

          {others.length ? (
            <nav className="ed-more" aria-labelledby="rs-h-others">
              <h2 id="rs-h-others" className="ed-pk">
                {S.report.more}
              </h2>
              <ul className="ed-rec">
                {others.map((r) => (
                  <li key={r.slug}>
                    <Link href={r.href}>
                      <p className="ty">
                        {r.categoryName}
                        <small>{r.publishedDate}</small>
                      </p>
                      <div>
                        <h3>{r.title}</h3>
                      </div>
                      <span className="ar" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {categories.length > 1 ? (
            <nav className="ed-more" aria-labelledby="rs-h-areas">
              <h2 id="rs-h-areas" className="ed-pk">
                {S.report.areas}
              </h2>
              <ul className="ed-rec">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={cat.href}>
                      <p className="ty">{S.report.areas}</p>
                      <div>
                        <h3>{cat.name}</h3>
                      </div>
                      <span className="ar" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </section>

      <section className="ed-band" aria-labelledby="rs-h-method">
        <div className="ed-w">
          <p className="ed-ch">
            <span>{ch()}</span>
            {S.method.kicker}
          </p>
          <h2 id="rs-h-method" className="ed-h2">
            {S.method.h.a} <em>{S.method.h.b}</em>
          </h2>
          <ol className="ed-three ed-three-lt">
            {S.method.steps.map((st, i) => (
              <li key={st.t}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
          <p className="ed-media" aria-labelledby="rs-h-media">
            <span id="rs-h-media" className="ed-pk">
              {S.media.h}
            </span>{' '}
            {S.media.body} <a href={mailto}>{siteMetadata.email}</a> {S.media.tail}{' '}
            <Link href={CONTACT_HREF}>{S.media.link}</Link> · <Link href="/press">{S.media.press}</Link>
          </p>
        </div>
      </section>

      <EdMotion />
      <EdClose id="rs-h-close" h={c.h} body={c.body} primary={c.primary} secondary={c.secondary} />
    </>
  );
}
