import Link from 'next/link';
import { EdClose } from '@/components/editorial/EdClose';
import { OnThisPage } from '@/components/editorial/OnThisPage';
import { EdMotion } from '@/components/editorial/EdMotion';
import { splitAfterMarker } from '@/lib/headline-emphasis';
import { CONTACT_HREF } from '@/components/direction-c/primitives';
import { isDocumentPopulated } from '@/lib/contentful/mappers';
import { siteMetadata } from '@/lib/metadata';
import type { CmsResearchFinding, CmsResearchReport } from '@/lib/contentful/types';
import { REPORT as R } from './content';
import { ReportChapters, ReportProse, reportToc } from './ReportRichText';
import { ReportCopy } from './ReportCopy';
import { findUnrendered } from './report-rules';
import { groupContents } from './chapters';
import '../research/research.css';
import './report.css';
import '@/components/editorial/editorial.css';

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

/* A paired statistic ("66.7% vs 6.7%") is set smaller on one line. */
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

function Finding({ f }: { f: CmsResearchFinding }) {
  return (
    <li>
      <Stat value={f.statistic} />
      <h3 className="c">{f.headline}</h3>
      {f.description ? <p className="d">{f.description}</p> : null}
      <p className="s">
        {f.baseSample ? (
          <>
            <b>{R.findings.sample}</b> {f.baseSample}{' '}
          </>
        ) : null}
        {f.sourceNote ? (
          <>
            <b>{R.findings.source}</b> {f.sourceNote}
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
  const split = splitAfterMarker(report.title);
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

  const contents = [
    hasFindings && { id: 'findings', text: R.findings.kicker },
    hasSummary && { id: 'executive-summary', text: R.summary.rail },
    ...toc.map((t) => ({ id: t.id, text: `${t.label ? `${t.label} ` : ''}${t.title}` })),
    hasMethod && { id: 'methodology', text: R.jump.methodology },
    hasLimits && { id: 'limitations', text: R.jump.limitations },
    { id: 'cite', text: R.jump.cite },
  ].filter(Boolean) as { id: string; text: string }[];
  /* Reading chapters: navigation and a plain label above each chapter's first heading. Headings, text and anchors are unchanged. */
  const groups = groupContents(contents);
  const chapterLabels: Record<string, string> = {};
  groups?.forEach((g, i) => {
    chapterLabels[g.items[0].id] = `Chapter ${i + 1} of ${groups.length} · ${g.label}`;
  });
  const mailto = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(`Media enquiry: ${report.title}`)}`;
  const jumps = [
    hasFindings ? [R.jump.findings, '#findings'] : null,
    hasMethod ? [R.jump.methodology, '#methodology'] : null,
    hasLimits ? [R.jump.limitations, '#limitations'] : null,
    [R.jump.cite, '#cite'],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      <section className="ed-hero rr-hero" aria-labelledby="rr-h1">
        <div className="ed-w">
          <nav aria-label="Breadcrumb" className="ed-crumb">
            <Link href="/">Home</Link>
            <Link href="/research">Research</Link>
            {report.categoryName && report.categorySlug ? <Link href={`/research/${report.categorySlug}`}>{report.categoryName}</Link> : null}
            <span aria-current="page">{shortTitle}</span>
          </nav>
          <div className="ed-hg">
            <div className="ed-hl">
              <p className="ed-k">
                {R.kickerPrefix}
                {report.categoryName ? ` · ${report.categoryName}` : ''}
              </p>
              <h1 id="rr-h1">
                {split.emphasis ? (
                  <>
                    {split.before.trim()} <em>{split.emphasis}</em>
                  </>
                ) : (
                  report.title
                )}
              </h1>
              {report.excerpt ? <p className="ed-lede">{report.excerpt}</p> : null}
            </div>
            <div className="ed-hr ed-panel">
              {facts.length ? (
                <dl className="ed-facts dk">
                  {facts.map(([k, v, href]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{href ? <Link href={href}>{v}</Link> : v}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <nav className="ed-jump" aria-label={R.jump.label}>
                {jumps.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label} <span aria-hidden="true">↓</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      {hasFindings ? (
        <section className="ed-band dark" id="findings" aria-labelledby="rr-h-more">
          <div className="ed-w">
            {chapterLabels.findings ? <p className="ed-chap">{chapterLabels.findings}</p> : null}
            <p className="ed-ch">
              <span>01</span>
              {R.findings.kicker}
            </p>
            <h2 id="rr-h-more" className="ed-h2">
              {R.findings.h}
            </h2>
            <ol className="ed-ev ed-ev4 ed-evn">
              {report.keyFindings.map((f) => (
                <Finding key={f.id} f={f} />
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* 3 — the full report (ivory): a contents rail at wide widths only, and one reading column. Nothing is collapsed. */}
      {hasSummary || hasBody ? (
        <div className="rr-read">
          <div className="px-wrap rr-grid">
            <aside className="rr-oa">
              <OnThisPage items={contents} groups={groups} label={R.rail} />
            </aside>
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
                  <ReportChapters document={report.contentJson} links={report.contentLinks} chapterLabels={chapterLabels} />
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
              {chapterLabels.methodology ? <p className="ed-chap">{chapterLabels.methodology}</p> : null}
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
            <Link className="rs-go" href="/conversion-optimization">
              <span className="rs-go-t">{R.close.tertiary}</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </aside>

      <EdMotion />
      <EdClose id="rr-h-close" h={R.close.h} body={R.close.body} primary={R.close.primary} secondary={R.close.secondary} />
    </>
  );
}
