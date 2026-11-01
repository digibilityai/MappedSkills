import Link from 'next/link';
import { Fragment } from 'react';
import { CONTACT_HREF } from '@/components/direction-c/primitives';
import { OnThisPage } from '@/components/editorial/OnThisPage';
import { EdMotion } from '@/components/editorial/EdMotion';
import { isDocumentPopulated } from '@/lib/contentful/mappers';
import { siteMetadata } from '@/lib/metadata';
import type { CmsPressRelease } from '@/lib/contentful/types';
import { findUnrendered, type RtNode } from '../research-report/report-rules';
import { RELEASE as R } from './content';
import { headingText, ReleaseNodes, releaseOptions, renderInline } from './ReleaseRichText';
import { assignHeadingIds, chaptersOf, classifyChapters, isPairStatistic, splitHeadlineEmphasis, splitLeadingFigures, type Classified, type Figure } from './release-rules';
import './release.css';
import '@/components/editorial/editorial.css';

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

/**
 * The evidence band (R3): the structured headline figures with their sample and source, on deep ink. When the release has a "Key findings" chapter it is
 * merged into this band (one section, not two): the band's heading is that chapter's heading and keeps its anchor, and `pd-h-ev`, the old anchor of the
 * separate evidence block, is kept as an alias here. A row of that chapter that only restates a displayed headline figure is not repeated.
 */
function EvidenceBand({ figures, methodHref, merged, ids, links }: { figures: Figure[]; methodHref?: string; merged: Classified | null; ids: HeadingIds; links: CmsPressRelease['contentLinks'] }) {
  const allSampled = figures.every((f) => f.baseSample);
  const mid = merged?.chapter.heading ? ids.get(merged.chapter.heading) : undefined;
  const nodes = merged ? withoutRestatedRows(merged.chapter.nodes, figures) : [];
  return (
    <section className="ed-band dark pd-ev" aria-labelledby={mid ?? 'pd-h-ev'}>
      <div className="ed-w">
        {mid ? <span id="pd-h-ev" aria-hidden="true" /> : null}
        <p className="ed-ch">
          <span>02</span>
          {R.evidence.h}
        </p>
        <h2 id={mid ?? 'pd-h-ev'} className="ed-h2">
          {merged ? renderInline(merged.chapter.heading!, releaseOptions(links)) : R.evidence.h}
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
        {merged && nodes.length ? (
          <div className="pd-ev-more pd-prose">
            <ReleaseNodes nodes={nodes} links={links} ids={ids} />
          </div>
        ) : null}
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

const plain = (n: RtNode | undefined): string => (!n ? '' : typeof n.value === 'string' ? n.value : (n.content ?? []).map(plain).join(' '));
/** Lists in the merged chapter lose only an item that contains a displayed figure's exact statistic (the item restates the figure above it). A list left empty is kept whole. */
function withoutRestatedRows(nodes: RtNode[], figures: Figure[]): RtNode[] {
  const stats = figures.map((f) => f.statistic).filter((st) => st && st.includes('%'));
  const escapeRe = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const restated = (item: RtNode) => stats.some((st) => new RegExp(`(^|[^\\w.])${escapeRe(st)}($|[^\\w])`).test(plain(item)));
  return nodes.map((n) => {
    if (n.nodeType !== 'unordered-list' && n.nodeType !== 'ordered-list') return n;
    const items = n.content ?? [];
    const kept = items.filter((i) => !restated(i));
    return kept.length && kept.length < items.length ? { ...n, content: kept } : n;
  });
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

  const mailto = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(R.press.subject + release.headline)}`;
  const featuredAlt = image?.description || image?.title || release.headline;
  const files = release.mediaAssets;
  /* Two-colour H1: the phrase the headline shares with its related report's title, else one colour. Styling only; the heading text is the recorded headline. */
  const headline = splitHeadlineEmphasis(release.headline, related?.title) ?? { before: release.headline, emphasis: '', after: '' };

  const headingIdOf = (c: Classified) => (c.chapter.heading ? headingIds.get(c.chapter.heading) : undefined);
  const isKeyFindings = (c: Classified) => c.kind === 'main' && !!c.chapter.heading && /^key findings\b/i.test(headingText(c.chapter.heading));
  /* Key findings merge into the evidence band when the release has structured headline figures. */
  const merged = figures.length > 0 ? classified.find(isKeyFindings) ?? null : null;
  const rest2 = classified.filter((c) => c !== merged);
  /* The trailing run of method and back-matter chapters is the supporting material, shown as separate cards after the release. */
  let cut = rest2.length;
  while (cut > 0 && (rest2[cut - 1].kind === 'method' || rest2[cut - 1].kind === 'back')) cut -= 1;
  const flow = rest2.slice(0, cut);
  const support = rest2.slice(cut);
  const pre = merged ? flow.filter((c) => c.index < merged.index) : [];
  const post = merged ? flow.filter((c) => c.index > merged.index) : flow;

  const renderChapter = (c: Classified) => {
    if (c.kind === 'quote') {
      const q = c.quote!;
      const id = headingIdOf(c);
      return (
        <section key={c.index} className="pd-quote" aria-labelledby={id}>
          <div className="pd-row">
            <h2 id={id} className="pd-side pd-qh">
              {headingText(c.chapter.heading)}
            </h2>
            <figure className="pd-q">
              <blockquote className="pd-q-b">
                <p>{q.quote}</p>
              </blockquote>
              <figcaption className="pd-q-by">
                <span className="pd-q-n">{q.name}</span>
                {q.role ? <span className="pd-q-r"> {q.role}</span> : null}
              </figcaption>
            </figure>
          </div>
        </section>
      );
    }
    return <Chapter key={c.index} c={c} links={links} ids={headingIds} small={c.kind !== 'main'} />;
  };

  /* "On this page": the headings that exist, in reading order, each to its existing anchor. */
  const toc = [
    ...pre.filter((c) => c.chapter.heading).map(headingItem),
    ...(figures.length > 0 ? [{ id: merged ? headingIdOf(merged)! : 'pd-h-ev', text: merged ? headingText(merged.chapter.heading) : R.evidence.h }] : []),
    ...post.filter((c) => c.chapter.heading).map(headingItem),
    ...support.filter((c) => c.chapter.heading).map(headingItem),
    ...(author ? [{ id: 'pd-h-author', text: R.author.h }] : []),
    ...(files.length > 0 ? [{ id: 'pd-h-files', text: R.media.h }] : []),
  ];
  function headingItem(c: Classified) {
    return { id: headingIdOf(c)!, text: headingText(c.chapter.heading) };
  }

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

  const shell = (list: Classified[], first: boolean) =>
    list.length === 0 && !first ? null : (
      <section className="ed-body pd-read" aria-label={first ? R.article : undefined}>
        <div className="ed-w">
          <div className="ed-shell">
            <aside className="ed-rail" aria-hidden={first ? undefined : true}>
              {first ? <OnThisPage items={toc} /> : null}
            </aside>
            <div className="ed-col pd-art">{list.map(renderChapter)}</div>
          </div>
        </div>
      </section>
    );

  return (
    <>
      <section className="ed-hero pd-hero" aria-labelledby="pd-h1">
        <div className="ed-w">
          <nav aria-label="Breadcrumb" className="ed-crumb pd-crumb">
            <Link href="/">Home</Link>
            <Link href="/press">Press</Link>
            <span aria-current="page">{release.headline}</span>
          </nav>
          <div className="ed-hg">
            <div className="ed-hl wide">
              <p className="ed-k">{related ? R.kicker.research : R.kicker.general}</p>
              <ul className="ed-chips" aria-label="About this release">
                <li>
                  <span className="ed-chip">{R.kickerKind}</span>
                </li>
                <li>
                  <span className="ed-chip plain">{release.publishedAtISO ? <time dateTime={release.publishedAtISO}>{release.publishedDate}</time> : release.publishedDate}</span>
                </li>
              </ul>
              <h1 id="pd-h1" className={release.headline.length > LONG_HEADLINE ? 'long pd-h1-long' : 'long'}>
                {headline.emphasis ? (
                  <>
                    {headline.before}
                    <em>{headline.emphasis}</em>
                    {headline.after}
                  </>
                ) : (
                  release.headline
                )}
              </h1>
              {release.excerpt ? <p className="ed-lede">{release.excerpt}</p> : null}
              <div className="ed-act">
                <a className="ed-btn" href={related ? related.href : mailto}>
                  {related ? R.close.primary : R.press.h}
                </a>
                <a className="ed-link" href="#pr-media">
                  {R.press.h}
                </a>
              </div>
            </div>
            <div className="ed-hr narrow ed-ann ed-feat pd-hero-s">
              {image?.url ? (
                <figure className="pd-fig ed-shot ed-wipe">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url} alt={featuredAlt} width={image.width} height={image.height} fetchPriority="high" decoding="async" />
                </figure>
              ) : null}
              <div className="t">{meta}</div>
            </div>
          </div>
        </div>
      </section>

      {hasBody ? shell(pre, true) : null}

      {figures.length > 0 ? <EvidenceBand figures={figures} methodHref={related ? `${related.href}#methodology` : undefined} merged={merged} ids={headingIds} links={links} /> : null}

      {hasBody ? shell(post, pre.length === 0 && figures.length === 0) : null}

      {support.length > 0 || author || files.length > 0 ? (
        <section className="ed-band paper pd-support" aria-label="Supporting material">
          <div className="ed-w">
            <div className="ed-sup ed-sup-3">
              {support.map((c) => {
                const id = headingIdOf(c);
                const media = /media|press/i.test(headingText(c.chapter.heading));
                return (
                  <section key={c.index} className={media ? 'ed-note dk' : 'ed-note'} aria-labelledby={id}>
                    <h2 id={id} className="ed-pk pd-h2-s">
                      {renderInline(c.chapter.heading!, releaseOptions(links))}
                    </h2>
                    <div className="pd-prose pd-prose-s">
                      <ReleaseNodes nodes={c.chapter.nodes} links={links} ids={headingIds} method={c.kind === 'method'} />
                    </div>
                  </section>
                );
              })}
              {author ? (
                <section className="ed-note" aria-labelledby="pd-h-author">
                  <h2 id="pd-h-author" className="ed-pk">
                    {R.author.h}
                  </h2>
                  <div className="pd-author">
                    <span className="pd-author-n">{author.name}</span>
                    {author.description ? <span className="pd-author-r">{author.description}</span> : null}
                    {author.profileUrl ? (
                      <a className="pd-go" href={author.profileUrl}>
                        <span className="pd-go-t">{R.author.profile}</span> <span aria-hidden="true">→</span>
                      </a>
                    ) : null}
                  </div>
                </section>
              ) : null}
              {files.length > 0 ? (
                <section className="ed-note" aria-labelledby="pd-h-files">
                  <h2 id="pd-h-files" className="ed-pk">
                    {R.media.h}
                  </h2>
                  <ul className="pd-files">
                    {files.map((a) => (
                      <li key={a.url}>
                        <a href={a.url}>{a.title || a.fileName || R.media.fallback}</a>
                        {a.description ? <span>{a.description}</span> : null}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <EdMotion />
      <section className="ed-close pd-close" id="pr-media" aria-labelledby="pd-h-close">
        <div className="ed-w">
          <p className="ed-k">{related ? R.close.kicker : R.close.fallbackKicker}</p>
          <h2 id="pd-h-close">
            {related ? (
              <Link className="pd-close-a" href={related.href}>
                {related.title}
              </Link>
            ) : (
              R.close.fallbackH
            )}
          </h2>
          {related?.excerpt ? <p>{related.excerpt}</p> : null}
          <div className="ed-act">
            <Link className="ed-btn" href={related ? related.href : '/press'}>
              {related ? R.close.primary : R.close.fallbackPrimary}
            </Link>
            <Link className="ed-link" href={CONTACT_HREF}>
              {R.press.link} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="ed-close-s">
            {R.press.body} <a href={mailto}>{siteMetadata.email}</a> {R.press.tail}
          </p>
        </div>
      </section>
    </>
  );
}
