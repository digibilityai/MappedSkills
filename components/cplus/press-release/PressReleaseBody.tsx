import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { isDocumentPopulated } from '@/lib/contentful/mappers';
import { siteMetadata } from '@/lib/metadata';
import type { CmsPressRelease } from '@/lib/contentful/types';
import { findUnrendered, type RtNode } from '../research-report/report-rules';
import { RELEASE as R } from './content';
import { headingText, ReleaseNodes, releaseOptions, renderInline } from './ReleaseRichText';
import { assignHeadingIds, chaptersOf, classifyChapters, isPairStatistic, splitHeadlineEmphasis, splitLeadingFigures, type Classified, type Figure } from './release-rules';
import './release.css';

/* A headline over this many characters is set one step smaller and wider so it cannot fill a phone screen (the field's length; no prose matching). */
export const LONG_HEADLINE = 130;

/**
 * C+ press release (`/press/[slug]`): the owner-approved Press Detail G1 design, THE EVIDENCE EDITORIAL
 * (docs/press-redesign/detail-g1/), implemented in G2 as a server component with no client JavaScript.
 *
 *   hero (ivory) → evidence strip, only when the body opens with complete ResearchFinding entries (paper) → the release
 *   (side-heading rows) → a quotation stage and a method band when the content has them → back matter → author and
 *   files when present → the closing journey (one editorial action, one quiet media action).
 *
 * Every word and number is Contentful data rendered as published; this file and content.ts add only labels. Nothing
 * specific to any one release is here: the strip reads structured findings and never a number out of prose. A part that
 * is absent is not drawn; a part that does not match a rule is plain prose. `findUnrendered` reports any rich-text part
 * this page cannot show, so a dropped embed never passes unnoticed.
 */

/* A figure longer than seven characters (or a pair) stays stacked above its headline on narrow screens; short ones sit beside it. */
const isWideStatistic = (value: string) => value.length > 7;

function Stat({ value }: { value: string }) {
  const pair = /^(.+?)\s+(vs\.?)\s+(.+)$/i.exec(value);
  const wide = isWideStatistic(value) ? ' pd-stat-wide' : '';
  if (!isPairStatistic(value) || !pair) return <p className={`pd-stat${wide}`}>{value}</p>;
  return (
    <p className={`pd-stat pd-stat-pair${wide}`}>
      {pair[1]} <span>{pair[2]}</span> {pair[3]}
    </p>
  );
}

function EvidenceStrip({ figures, methodHref }: { figures: Figure[]; methodHref?: string }) {
  const allSampled = figures.every((f) => f.baseSample);
  return (
    <section className="pd-ev" aria-labelledby="pd-h-ev">
      <div className="px-wrap">
        <h2 id="pd-h-ev" className="pd-label pd-ev-h">
          {R.evidence.h}
        </h2>
        <ul className="pd-ev-l" data-n={figures.length}>
          {figures.map((f, i) => (
            <li key={`${f.id}-${i}`} className={i === 0 ? 'pd-ev-i pd-ev-lead' : 'pd-ev-i'}>
              <Stat value={f.statistic} />
              <p className="pd-ev-t">{f.headline}</p>
              {f.description ? <p className="pd-ev-d">{f.description}</p> : null}
              {f.baseSample || f.sourceNote ? (
                <p className="pd-ev-m">
                  {f.baseSample ? (
                    <span className="pd-ev-line">
                      <span className="pd-ev-k">{R.evidence.sample}</span> {f.baseSample}
                    </span>
                  ) : null}
                  {f.sourceNote ? (
                    <span className="pd-ev-line">
                      <span className="pd-ev-k">{R.evidence.source}</span> {f.sourceNote}
                    </span>
                  ) : null}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        {allSampled || methodHref ? (
          <p className="pd-ev-n">
            {allSampled ? <>{R.evidence.note} </> : null}
            {methodHref ? <a href={methodHref}>{R.evidence.method}</a> : null}
          </p>
        ) : null}
      </div>
    </section>
  );
}

type HeadingIds = ReturnType<typeof assignHeadingIds>;

function Chapter({ c, links, ids, small = false }: { c: Classified; links: CmsPressRelease['contentLinks']; ids: HeadingIds; small?: boolean }) {
  const { chapter } = c;
  const id = chapter.heading ? ids.get(chapter.heading) : undefined;
  const options = releaseOptions(links);
  if (!chapter.heading) {
    return (
      <div className="pd-intro pd-row">
        <p className="pd-side pd-label" aria-hidden="true">
          {R.intro}
        </p>
        <div className="pd-prose">
          <ReleaseNodes nodes={chapter.nodes} links={links} ids={ids} dateline />
        </div>
      </div>
    );
  }
  return (
    <section className="pd-row pd-sec" aria-labelledby={id}>
      <h2 id={id} className={small ? 'pd-side pd-h2 pd-h2-s' : 'pd-side pd-h2'}>
        {renderInline(chapter.heading, options)}
      </h2>
      <div className={small ? 'pd-prose pd-prose-s' : 'pd-prose'}>
        <ReleaseNodes nodes={chapter.nodes} links={links} ids={ids} />
      </div>
    </section>
  );
}

export function PressReleaseBody({ release }: { release: CmsPressRelease }) {
  const hasBody = isDocumentPopulated(release.contentJson) && !!release.contentJson;
  const links = release.contentLinks;
  const { figures, rest } = hasBody ? splitLeadingFigures(release.contentJson, links) : { figures: [], rest: [] as RtNode[] };
  const chapters = chaptersOf(rest);
  const classified = classifyChapters(chapters);
  /* Heading ids: the production slug rule, in document order, unique (lib/contentful/heading-ids.ts). */
  const headingIds = assignHeadingIds(chapters);
  const related = release.relatedResearch;
  const image = release.featuredImage;
  const author = release.author;

  const unrendered = findUnrendered(release.contentJson, links, 'Body');
  if (unrendered.length) {
    console.warn(
      `[press-release] ${release.slug}: ${unrendered.length} rich-text part(s) are not rendered —`,
      unrendered.map((u) => `${u.where}: ${u.kind} (${u.detail})`).join('; ')
    );
  }

  /* Consecutive chapters of the same plain kind share one container; a quotation or method chapter is its own stage. */
  const groups: { kind: 'plain' | 'back' | 'quote' | 'method'; run?: number; items: Classified[] }[] = [];
  for (const c of classified) {
    const kind = c.kind === 'main' ? 'plain' : c.kind;
    const last = groups[groups.length - 1];
    if (last && last.kind === kind && last.run === c.run && (kind === 'plain' || kind === 'back' || kind === 'method')) last.items.push(c);
    else groups.push({ kind, run: c.run, items: [c] });
  }

  const mailto = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(R.press.subject + release.headline)}`;
  const featuredAlt = image?.description || image?.title || release.headline;
  const files = release.mediaAssets;
  /* Two-colour H1 (the C+ `.b-named` pattern): the phrase the headline shares with its related report's title, else one colour. */
  const headline = splitHeadlineEmphasis(release.headline, related?.title) ?? { before: release.headline, emphasis: '', after: '' };

  const meta = (
    <dl className="pd-meta">
      <div>
        <dt>{R.facts.published}</dt>
        <dd>{release.publishedAtISO ? <time dateTime={release.publishedAtISO}>{release.publishedDate}</time> : release.publishedDate}</dd>
      </div>
      {related ? (
        <div>
          <dt>{R.facts.related}</dt>
          <dd>
            <Link href={related.href}>{related.title}</Link>
          </dd>
        </div>
      ) : null}
      {author ? (
        <div>
          <dt>{R.facts.author}</dt>
          <dd>{author.profileUrl ? <a href={author.profileUrl}>{author.name}</a> : author.name}</dd>
        </div>
      ) : null}
    </dl>
  );

  const headingIdOf = (c: Classified) => (c.chapter.heading ? headingIds.get(c.chapter.heading) : undefined);
  const body: ReactNode[] = groups.map((g, gi) => {
    if (g.kind === 'quote') {
      const c = g.items[0];
      const q = c.quote!;
      const id = headingIdOf(c);
      return (
        <section key={gi} className="pd-quote" aria-labelledby={id}>
          <div className="px-wrap pd-row">
            <h2 id={id} className="pd-side pd-qh">
              {headingText(c.chapter.heading)}
            </h2>
            <figure className="pd-q">
              <span className="pd-q-g" aria-hidden="true">
                “
              </span>
              <blockquote className="pd-q-b">
                <p>{q.quote}</p>
              </blockquote>
              <figcaption className="pd-q-by">
                <span className="pd-q-rule" aria-hidden="true" />
                <span className="pd-q-n">{q.name}</span>
                {q.role ? <span className="pd-q-r"> {q.role}</span> : null}
              </figcaption>
            </figure>
          </div>
        </section>
      );
    }
    if (g.kind === 'method') {
      return (
        <div key={gi} className="pd-method">
          {g.items.map((c, k) => {
            const id = headingIdOf(c);
            return (
              <section key={c.index} aria-labelledby={id}>
                <div className="px-wrap">
                  <div className={k === 0 ? 'pd-row pd-sec pd-sec-first' : 'pd-row pd-sec'}>
                    <h2 id={id} className="pd-side pd-h2">
                      {renderInline(c.chapter.heading!, releaseOptions(links))}
                    </h2>
                    <div className="pd-prose">
                      <ReleaseNodes nodes={c.chapter.nodes} links={links} ids={headingIds} method />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      );
    }
    return (
      <div key={gi} className="px-wrap pd-grp">
        {g.items.map((c) => (
          <Fragment key={c.index}>
            <Chapter c={c} links={links} ids={headingIds} small={g.kind === 'back'} />
          </Fragment>
        ))}
      </div>
    );
  });

  return (
    <>
      {/* 1 — hero (ivory): identity, the Contentful headline unchanged, the excerpt, and the featured image as a framed figure. */}
      <section className={image?.url ? 'b-hero pd-hero' : 'b-hero pd-hero pd-hero-solo'} aria-labelledby="pd-h1">
        <div className="px-wrap">
          <nav aria-label="Breadcrumb" className="b-crumb pd-crumb">
            <ol>
              <li>
                <Link href="/">Home</Link>{' '}
              </li>
              <li>
                <span aria-hidden="true">/</span> <Link href="/press">Press</Link>{' '}
              </li>
              <li>
                <span aria-hidden="true">/</span> <span aria-current="page" className="pd-crumb-cur">{release.headline}</span>
              </li>
            </ol>
          </nav>
          <div className={image?.url ? 'pd-hero-g' : 'pd-hero-g pd-hero-g-solo'}>
            <div className="pd-hero-t">
              <p className="pd-kicker">
                <span className="pd-mk" aria-hidden="true" />
                {related ? R.kicker.research : R.kicker.general} <span aria-hidden="true">·</span> {R.kickerKind}
              </p>
              <h1 id="pd-h1" className={release.headline.length > LONG_HEADLINE ? 'b-h1 pd-h1 pd-h1-long' : 'b-h1 pd-h1'}>
                {headline.emphasis ? (
                  <>
                    {headline.before}
                    <span className="b-named">{headline.emphasis}</span>
                    {headline.after}
                  </>
                ) : (
                  release.headline
                )}
              </h1>
              {release.excerpt ? <p className="b-lede pd-lede">{release.excerpt}</p> : null}
            </div>
            {image?.url ? (
              <div className="pd-hero-s">
                <figure className="pd-fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url} alt={featuredAlt} width={image.width} height={image.height} fetchPriority="high" decoding="async" />
                </figure>
                {meta}
              </div>
            ) : (
              <div className="pd-facts">{meta}</div>
            )}
          </div>
        </div>
      </section>

      {/* 2 — the evidence strip (paper): only complete, structured findings at the head of the body; otherwise not drawn. */}
      {figures.length > 0 ? <EvidenceStrip figures={figures} methodHref={related ? `${related.href}#methodology` : undefined} /> : null}

      {/* 3 — the release: side-heading rows, a quotation stage and a method band where the content has them. */}
      {hasBody ? (
        <article className="pd-read pd-art" aria-label={R.article}>
          {body}
        </article>
      ) : null}

      {author || files.length > 0 ? (
        <div className="px-wrap pd-grp pd-extra">
          {author ? (
            <section className="pd-row pd-sec" aria-labelledby="pd-h-author">
              <h2 id="pd-h-author" className="pd-side pd-h2 pd-h2-s">
                {R.author.h}
              </h2>
              <div className="pd-prose pd-prose-s">
                <div className="pd-author">
                  <span className="pd-author-n">{author.name}</span>
                  {author.description ? <span className="pd-author-r">{author.description}</span> : null}
                  {author.profileUrl ? (
                    <a className="pd-go" href={author.profileUrl}>
                      <span className="pd-go-t">{R.author.profile}</span> <span aria-hidden="true">→</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}
          {files.length > 0 ? (
            <section className="pd-row pd-sec" aria-labelledby="pd-h-files">
              <h2 id="pd-h-files" className="pd-side pd-h2 pd-h2-s">
                {R.media.h}
              </h2>
              <div className="pd-prose pd-prose-s">
                <ul className="pd-files">
                  {files.map((a) => (
                    <li key={a.url}>
                      <a href={a.url}>{a.title || a.fileName || R.media.fallback}</a>
                      {a.description ? <span>{a.description}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}
        </div>
      ) : null}

      {/* 4 — the closing journey: one editorial action (the related report, else the newsroom) and one quiet media action. */}
      <section className="pd-close" aria-labelledby="pd-h-close">
        <div className="px-wrap pd-close-g">
          <div className="pd-close-p">
            <p className="pd-label">{related ? R.close.kicker : R.close.fallbackKicker}</p>
            <h2 id="pd-h-close" className="pd-close-h">
              {related ? (
                <Link className="pd-close-a" href={related.href}>
                  {related.title}
                </Link>
              ) : (
                R.close.fallbackH
              )}
            </h2>
            {related?.excerpt ? <p className="pd-close-x">{related.excerpt}</p> : null}
            <Link className="dc-btn dc-btn-primary" href={related ? related.href : '/press'}>
              <Mark />
              {related ? R.close.primary : R.close.fallbackPrimary}
            </Link>
          </div>
          <aside className="pd-close-s" aria-labelledby="pd-h-press">
            <h2 id="pd-h-press" className="pd-label">
              {R.press.h}
            </h2>
            <p>
              {R.press.body} <a href={mailto}>{siteMetadata.email}</a> {R.press.tail}
            </p>
            <Link className="pd-go" href={CONTACT_HREF}>
              <span className="pd-go-t">{R.press.link}</span> <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
