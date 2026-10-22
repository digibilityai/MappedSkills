import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { isDocumentPopulated } from '@/lib/contentful/mappers';
import { siteMetadata } from '@/lib/metadata';
import type { CmsResearchFinding, CmsResearchReport } from '@/lib/contentful/types';
import { REPORT as R } from './content';
import { ReportChapters, ReportProse, reportToc } from './ReportRichText';
import { ReportCopy } from './ReportCopy';
import { findUnrendered } from './report-rules';
import '../research/research.css';
import './report.css';

/**
 * C+ research report (`/research/[slug]`, report variant): the owner-approved Research Report G1 R1 design
 * (docs/research-redesign/report-g1/RR_G1_PROPOSAL.md), implemented in G2 as a server component (only the copy buttons
 * are client code).
 *
 *   hero (ivory) → key findings, one ledger (paper) → contents rail + reading column (ivory) → methodology (paper) →
 *   limitations (ivory) → cite (paper) → media strip → the tangerine close, the one conversion section.
 *
 * Every research word, number, sample, source, caveat and classification is Contentful data rendered as published; the
 * only new words are labels and headings (content.ts). The report does not repeat the /research hub's 120-square
 * figure. `findUnrendered` reports any rich-text part this page cannot show, so a dropped embed never passes unnoticed.
 */

/* A paired statistic ("66.7% vs 6.7%") is set smaller on one line, as on /research. */
function Stat({ value, lead }: { value?: string; lead?: boolean }) {
  const cls = lead ? 'rs-stat rr-stat-lead' : 'rs-stat';
  if (!value) return <p className={cls} />;
  const pair = /^(.+?)\s+(vs\.?)\s+(.+)$/i.exec(value);
  if (!pair) return <p className={cls}>{value}</p>;
  return (
    <p className={`${cls} rs-stat-pair`}>
      {pair[1]} <span>{pair[2]}</span> {pair[3]}
    </p>
  );
}

function Finding({ f, lead }: { f: CmsResearchFinding; lead: boolean }) {
  return (
    <li className="rs-row">
      <Stat value={f.statistic} lead={lead} />
      <div className="rs-row-t">
        <h3 className="rs-row-h">{f.headline}</h3>
        {f.description ? <p className="rs-row-d">{f.description}</p> : null}
      </div>
      <p className="rs-meta">
        {f.baseSample ? (
          <>
            <span className="rs-meta-k">{R.findings.sample}</span> {f.baseSample}{' '}
          </>
        ) : null}
        {f.sourceNote ? (
          <>
            <span className="rs-meta-k">{R.findings.source}</span> {f.sourceNote}
          </>
        ) : null}
      </p>
    </li>
  );
}

export function ReportBody({ report }: { report: CmsResearchReport }) {
  const hasSummary = isDocumentPopulated(report.executiveSummaryJson) && !!report.executiveSummaryJson;
  const hasBody = isDocumentPopulated(report.contentJson) && !!report.contentJson;
  const hasMethod = isDocumentPopulated(report.methodologyJson) && !!report.methodologyJson;
  const hasLimits = isDocumentPopulated(report.limitationsJson) && !!report.limitationsJson;
  const hasFindings = report.keyFindings.length > 0;
  const hasFiles = Boolean(report.reportPdf || report.dataFile || report.mediaAssets.length);
  const toc = hasBody && report.contentJson ? reportToc(report.contentJson) : [];

  const unrendered = [
    ...findUnrendered(report.executiveSummaryJson, report.executiveSummaryLinks, 'Executive summary'),
    ...findUnrendered(report.contentJson, report.contentLinks, 'Body'),
    ...findUnrendered(report.methodologyJson, report.methodologyLinks, 'Methodology'),
    ...findUnrendered(report.limitationsJson, report.limitationsLinks, 'Limitations'),
  ];
  if (unrendered.length) {
    console.warn(
      `[research-report] ${report.slug}: ${unrendered.length} rich-text part(s) are not rendered —`,
      unrendered.map((u) => `${u.where}: ${u.kind} (${u.detail})`).join('; ')
    );
  }

  const colon = report.title.indexOf(':');
  const head = colon > 0 ? report.title.slice(0, colon + 1) : report.title;
  const tail = colon > 0 ? report.title.slice(colon + 1).trim() : '';
  const shortTitle = colon > 0 ? report.title.slice(0, colon).trim() : report.title;

  const facts = (
    [
      [R.facts.author, report.author.name, '/about'],
      [R.facts.published, report.publishedDate],
      [R.facts.period, report.researchPeriod],
      [R.facts.geography, report.geography],
      [R.facts.sample, typeof report.sampleSize === 'number' ? String(report.sampleSize) : undefined],
      [R.facts.id, report.researchId],
    ] as [string, string | undefined, string?][]
  ).filter(([, v]) => Boolean(v));

  const mailto = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(`Media enquiry: ${report.title}`)}`;
  const jumps = [
    hasFindings ? [R.jump.findings, '#findings'] : null,
    hasMethod ? [R.jump.methodology, '#methodology'] : null,
    hasLimits ? [R.jump.limitations, '#limitations'] : null,
    [R.jump.cite, '#cite'],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      {/* 1 — hero (ivory): report identity, no sales CTA. The H1 is the Contentful title, unchanged; only its setting changes. */}
      <section className="b-hero rr-hero" aria-labelledby="rr-h1">
        <div className="px-wrap">
          <nav aria-label="Breadcrumb" className="b-crumb">
            <ol>
              <li>
                <Link href="/">Home</Link>{' '}
              </li>
              <li>
                <span aria-hidden="true">/</span> <Link href="/research">Research</Link>{' '}
              </li>
              {report.categoryName && report.categorySlug ? (
                <li>
                  <span aria-hidden="true">/</span> <Link href={`/research/${report.categorySlug}`}>{report.categoryName}</Link>{' '}
                </li>
              ) : null}
              <li>
                <span aria-hidden="true">/</span> <span aria-current="page">{shortTitle}</span>
              </li>
            </ol>
          </nav>
          <div className="rr-hero-g">
            <div>
              <p className="b-kicker rr-kicker">
                {R.kickerPrefix}
                {report.categoryName ? (
                  <>
                    {' '}
                    <span aria-hidden="true">·</span> {report.categoryName}
                  </>
                ) : null}
              </p>
              <h1 id="rr-h1" className="b-h1 rr-h1">
                {head}
                {tail ? (
                  <>
                    {' '}
                    <span className="rr-h1-sub">{tail}</span>
                  </>
                ) : null}
              </h1>
              {report.excerpt ? <p className="b-lede rr-lede">{report.excerpt}</p> : null}
            </div>
            <div className="rr-hero-side">
              {facts.length ? (
                <dl className="rr-facts">
                  {facts.map(([k, v, href]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{href ? <Link href={href}>{v}</Link> : v}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <nav className="rr-jump" aria-label={R.jump.label}>
                {jumps.map(([label, href]) => (
                  <a key={href} className="rs-go" href={href}>
                    <span className="rs-go-t">{label}</span> <span aria-hidden="true">↓</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — key findings (paper): all of them in one ledger, in report order, as on /research. */}
      {hasFindings ? (
        <section className="b-sec b-paper rs-more rr-more" id="findings" aria-labelledby="rr-h-more">
          <div className="px-wrap">
            <p className="b-kicker">{R.findings.kicker}</p>
            <h2 id="rr-h-more" className="b-h2 rs-h2">
              {R.findings.h}
            </h2>
            <ol className="rs-ledger">
              {report.keyFindings.map((f, i) => (
                <Finding key={f.id} f={f} lead={i === 0} />
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* 3 — the full report (ivory): a contents rail at wide widths only, and one reading column. Nothing is collapsed. */}
      {hasSummary || hasBody ? (
        <div className="rr-read">
          <div className="px-wrap rr-grid">
            <nav className="rr-rail" aria-label={R.rail}>
              <p className="rs-label">{R.rail}</p>
              <ol className="rr-toc">
                {hasFindings ? (
                  <li>
                    <a href="#findings">{R.findings.kicker}</a>
                  </li>
                ) : null}
                {hasSummary ? (
                  <li>
                    <a href="#executive-summary">{R.summary.rail}</a>
                  </li>
                ) : null}
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>
                      {t.label ? <span className="rr-toc-n">{t.label}</span> : null}
                      {t.title}
                    </a>
                  </li>
                ))}
                {hasMethod ? (
                  <li>
                    <a href="#methodology">{R.jump.methodology}</a>
                  </li>
                ) : null}
                {hasLimits ? (
                  <li>
                    <a href="#limitations">{R.jump.limitations}</a>
                  </li>
                ) : null}
                <li>
                  <a href="#cite">{R.jump.cite}</a>
                </li>
              </ol>
            </nav>
            <article className="rr-col" aria-label={R.summary.article} data-unrendered={unrendered.length || undefined}>
              {hasSummary && report.executiveSummaryJson ? (
                <section id="executive-summary" className="rr-sum" aria-labelledby="rr-h-sum">
                  <p className="b-kicker">{R.summary.kicker}</p>
                  <h2 id="rr-h-sum" className="rr-h2">
                    {R.summary.h}
                  </h2>
                  <ReportProse
                    className="rr-abstract"
                    kind="summary"
                    document={report.executiveSummaryJson}
                    links={report.executiveSummaryLinks}
                  />
                </section>
              ) : null}
              {hasBody && report.contentJson ? (
                <div className="rr-prose">
                  <ReportChapters document={report.contentJson} links={report.contentLinks} />
                </div>
              ) : null}
            </article>
          </div>
        </div>
      ) : null}

      {/* 4 — methodology (paper) and limitations (ivory): the full text, always open; ids unchanged. */}
      {hasMethod && report.methodologyJson ? (
        <section className="b-sec b-paper rr-method" id="methodology" aria-labelledby="rr-h-method">
          <div className="px-wrap rr-grid rr-grid-plain">
            <div className="rr-side-h">
              <p className="b-kicker">{R.method.kicker}</p>
              <h2 id="rr-h-method" className="rr-h2">
                {R.method.h}
              </h2>
            </div>
            <ReportProse className="rr-col rr-prose rr-prose-method" kind="method" document={report.methodologyJson} links={report.methodologyLinks} />
          </div>
        </section>
      ) : null}
      {hasLimits && report.limitationsJson ? (
        <section className="b-sec rr-limits" id="limitations" aria-labelledby="rr-h-limits">
          <div className="px-wrap rr-grid rr-grid-plain">
            <div className="rr-side-h">
              <p className="b-kicker">{R.limits.kicker}</p>
              <h2 id="rr-h-limits" className="rr-h2">
                {R.limits.h.a} <span className="b-named">{R.limits.h.b}</span>
              </h2>
            </div>
            <ReportProse className="rr-col rr-prose rr-limits-b" kind="limits" document={report.limitationsJson} links={report.limitationsLinks} />
          </div>
        </section>
      ) : null}

      {/* 5 — cite (paper): citation, canonical URL, copy actions, the author (linked, no avatar), files only when there are any. */}
      <section className="b-sec b-paper rr-cite" id="cite" aria-labelledby="rr-h-cite">
        <div className="px-wrap rr-grid rr-grid-plain">
          <div className="rr-side-h">
            <p className="b-kicker">{R.cite.kicker}</p>
            <h2 id="rr-h-cite" className="rr-h2">
              {R.cite.h}
            </h2>
          </div>
          <div className="rr-col">
            <blockquote className="rr-citation" id="rr-citation">
              {report.citation}
            </blockquote>
            <p className="rr-canon">
              {R.cite.canonical} <a href={report.canonicalUrl}>{report.canonicalUrl}</a>
            </p>
            <ReportCopy
              citation={report.citation}
              url={report.canonicalUrl}
              labels={{ citation: R.cite.copyCitation, link: R.cite.copyLink, citationDone: R.cite.citationCopied, linkDone: R.cite.linkCopied }}
            />
            <p className="rr-author">
              <span className="rs-label">{R.cite.author}</span> <Link href="/about">{report.author.name}</Link>
            </p>
            {hasFiles ? (
              <div className="rr-files">
                <h3 className="rs-label">{R.downloads.h}</h3>
                <ul>
                  {[
                    report.reportPdf && { a: report.reportPdf, label: report.reportPdf.title || 'Report PDF' },
                    report.dataFile && { a: report.dataFile, label: report.dataFile.title || 'Data file' },
                    ...report.mediaAssets.map((a) => ({ a, label: a.title || 'Media asset' })),
                  ]
                    .filter(Boolean)
                    .map((x) => {
                      const f = x as { a: { url: string; description?: string }; label: string };
                      return (
                        <li key={f.a.url}>
                          <a href={f.a.url}>{f.label}</a>
                          {f.a.description ? <span>{f.a.description}</span> : null}
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {report.relatedResearch.length > 0 ? (
        <section className="b-sec rr-related" aria-labelledby="rr-h-related">
          <div className="px-wrap">
            <nav className="rs-list rr-related-l" aria-labelledby="rr-h-related">
              <h2 id="rr-h-related" className="rs-label">
                {R.related.kicker}
              </h2>
              <ul>
                {report.relatedResearch.map((r) => (
                  <li key={r.href}>
                    <Link className="rs-go" href={r.href}>
                      <span className="rs-go-t">{r.title}</span> <span aria-hidden="true">→</span>
                    </Link>
                    <span className="rs-list-m">{[r.categoryName, r.publishedDate].filter(Boolean).join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      ) : null}

      {/* 6 — media (slim, secondary): the existing media enquiry text, report-specific subject and link. */}
      <aside className="rs-media" aria-labelledby="rr-h-media">
        <div className="px-wrap rs-media-in">
          <h2 id="rr-h-media" className="rs-label">
            {R.media.h}
          </h2>
          <div className="rs-media-b">
            <p>
              {R.media.body} <a href={mailto}>{siteMetadata.email}</a> {R.media.tail}
            </p>
            <Link className="rs-go" href={CONTACT_HREF}>
              <span className="rs-go-t">{R.media.link}</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* 7 — close: the shared tangerine close (the /research copy), the only conversion section. */}
      <section className="b-close" aria-labelledby="rr-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <h2 id="rr-h-close" className="b-h2">
              {R.close.h}
            </h2>
            <p className="b-lede">{R.close.body}</p>
          </div>
          <div className="dc-actions rr-close-a">
            <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
              <Mark />
              {R.close.primary}
            </Link>
            <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
              {R.close.secondary}
            </Link>
            <Link className="rs-go rr-close-go" href="/conversion-optimization">
              <span className="rs-go-t">{R.close.tertiary}</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
