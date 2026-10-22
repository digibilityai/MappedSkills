import { Fragment, type ReactNode } from 'react';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';
import type { ContentfulRichText } from '@/lib/contentful/types';
import { linkTargetProps } from '@/lib/internal-links';
import { mapContentfulFindingToCms } from '@/lib/contentful/mappers';
import { ResearchFindingEmbed } from '@/components/research/ResearchFindingEmbed';
import { REPORT as R } from './content';
import {
  assetAlt,
  assetMap,
  entryMap,
  findingLabel,
  isImageAsset,
  nodeText,
  parseTwoColumnTable,
  planChapter,
  splitChapters,
  wholeParagraphMark,
  type BarItem,
  type Plan,
  type RtNode,
} from './report-rules';

/**
 * Report body renderer for `/research/[slug]` (Research Report G2). It renders the Contentful rich text node for node
 * as `components/research/ResearchRichText.tsx` does (same node types, same research-finding, image, file and hyperlink
 * handling), but without that component's Tailwind classes: the approved reading styles come from `.rr-prose` in
 * `report.css`. `ResearchRichText` itself is unchanged because `/press/[slug]` and the legacy routes share it.
 *
 * Presentation rules (report-rules.ts) key on structure, never on wording, and never edit a word:
 *   - a list whose every item is "**Label**: NN.N%" is drawn as a bar list (the text stays; the bar is decoration);
 *   - a published chart image is replaced by that bar list ONLY when its alt text verifies label and value pair by pair,
 *     and then its description is the visible caption, with a link to the published image;
 *   - a paragraph set entirely in bold is a takeaway, entirely in italic a note (a quote in "A Note From …");
 *   - a two-column table that holds the YES / NO / UTD / N/A codes becomes a term list with the honesty marks.
 * Heading ids are `${idPrefix}-${index}` over the same chapter split as before, so every `#body-N` deep link is unchanged.
 */

type Links = ContentfulRichText['links'];
type Kind = 'body' | 'method' | 'limits' | 'summary';

const textOnly = (node: RtNode) => (node.content || []).every((k) => k.nodeType === 'text');

const asDocument = (nodes: RtNode[]) =>
  ({ nodeType: BLOCKS.DOCUMENT, data: {}, content: nodes }) as unknown as Document;

/** Inline children of a node, with its own bold/italic marks dropped (the class carries the emphasis). */
function inlineOf(node: RtNode): ReactNode {
  return documentToReactComponents(asDocument([node]), {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_n, children) => children,
      [BLOCKS.HEADING_2]: (_n, children) => children,
      [BLOCKS.HEADING_3]: (_n, children) => children,
      [BLOCKS.TABLE_CELL]: (_n, children) => children,
      [INLINES.HYPERLINK]: (n, children) => {
        const href = n.data?.uri as string | undefined;
        return (
          <a href={href} {...linkTargetProps(href)}>
            {children}
          </a>
        );
      },
    },
    renderMark: { bold: (t) => t, italic: (t) => t },
  });
}

function makeOptions(links: Links): Options {
  const assets = assetMap(links);
  const entries = entryMap(links);
  return {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_n, children) => <p>{children}</p>,
      [BLOCKS.HEADING_2]: (_n, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (_n, children) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (_n, children) => <h4>{children}</h4>,
      [BLOCKS.HEADING_5]: (_n, children) => <h5>{children}</h5>,
      [BLOCKS.HEADING_6]: (_n, children) => <h6>{children}</h6>,
      [BLOCKS.UL_LIST]: (_n, children) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (_n, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (_n, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (_n, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.HR]: () => <hr />,
      /* A wide table scrolls inside its own focusable, named region, so keyboard users can scroll it. */
      [BLOCKS.TABLE]: (node, children) => {
        const first = nodeText((node.content[0] as unknown as RtNode) || null).replace(/\s+/g, ' ').trim();
        return (
          <div className="rr-table" role="region" aria-label={first ? `Table: ${first.slice(0, 80)}` : 'Table'} tabIndex={0}>
            <table>
              <tbody>{children}</tbody>
            </table>
          </div>
        );
      },
      [BLOCKS.TABLE_ROW]: (_n, children) => <tr>{children}</tr>,
      [BLOCKS.TABLE_HEADER_CELL]: (_n, children) => <th>{children}</th>,
      [BLOCKS.TABLE_CELL]: (_n, children) => <td>{children}</td>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assets.get(node.data?.target?.sys?.id as string);
        if (!asset?.url) return null;
        if (!isImageAsset(asset)) {
          return (
            <p>
              <a href={asset.url}>{asset.title || asset.fileName || 'Download file'}</a>
            </p>
          );
        }
        /* The visible caption repeated the alt text (read twice by a screen reader), so the alt text is the description. */
        return (
          <figure className="rr-chart">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.url} alt={assetAlt(asset)} width={asset.width || undefined} height={asset.height || undefined} loading="lazy" decoding="async" />
          </figure>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = entries.get(node.data?.target?.sys?.id as string);
        if (entry && (entry.__typename === 'ResearchFinding' || entry.findingHeadline || entry.statistic)) {
          const finding = mapContentfulFindingToCms(entry);
          return finding ? (
            <div className="rr-embed">
              <ResearchFindingEmbed finding={finding} />
            </div>
          ) : null;
        }
        /* Anything else is reported by `findUnrendered` (ReportBody); it is never invented here. */
        return null;
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const href = node.data?.uri as string | undefined;
        return (
          <a href={href} {...linkTargetProps(href)}>
            {children}
          </a>
        );
      },
      /* The query asks for no inline entries or entry/asset links. Keep the text; the guard reports them. */
      [INLINES.ENTRY_HYPERLINK]: (_n, children) => <>{children}</>,
      [INLINES.ASSET_HYPERLINK]: (_n, children) => <>{children}</>,
      [INLINES.EMBEDDED_ENTRY]: () => null,
    },
  };
}

function Bars({ items }: { items: BarItem[] }) {
  return (
    <ul className="rr-bars">
      {items.map((item) => (
        <li key={item.label}>
          <span className="rr-bar-l">{item.label}</span>
          <span className="rr-bar-v">{item.value}</span>
          <span className="rr-bar-t" aria-hidden="true">
            <i style={{ ['--w' as string]: `${Math.min(100, Math.max(0, item.number))}%` }} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function StatusList({ table }: { table: NonNullable<ReturnType<typeof parseTwoColumnTable>> }) {
  return (
    <dl className="rr-status" aria-label={`${table.head[0]} and ${table.head[1].toLowerCase()}`}>
      {table.rows.map((row, i) => (
        <div key={`${row.code}-${i}`}>
          <dt>
            {row.mark ? <span className={`rr-st rr-st-${row.mark}`} aria-hidden="true" /> : null}
            {row.code}
          </dt>
          <dd>{row.cells[1].map((c, j) => <Fragment key={j}>{inlineOf(c)}</Fragment>)}</dd>
        </div>
      ))}
    </dl>
  );
}

function renderTop(
  node: RtNode,
  index: number,
  ctx: { options: Options; plan: Plan; emphasis: boolean; quote: boolean }
): ReactNode {
  const { options, plan, emphasis, quote } = ctx;
  if (plan.replaced.has(index)) return null;

  const bars = plan.bars.get(index);
  if (bars) {
    const chart = plan.barCharts.get(index);
    if (!chart) return <Bars items={bars} />;
    return (
      <figure className="rr-barfig">
        <Bars items={bars} />
        <figcaption className="rr-barcap">
          <span className="rr-barcap-k">{R.chart.published}</span> {assetAlt(chart)}{' '}
          <a className="rr-barcap-a" href={chart.url ?? undefined}>
            {R.chart.open}
          </a>
        </figcaption>
      </figure>
    );
  }

  if (node.nodeType === 'table') {
    const table = parseTwoColumnTable(node);
    if (table && table.rows.some((r) => r.mark)) return <StatusList table={table} />;
  }

  if (emphasis && node.nodeType === 'paragraph') {
    const bold = wholeParagraphMark(node, 'bold');
    const italic = wholeParagraphMark(node, 'italic');
    if (quote && italic) return <p className="rr-quote">{inlineOf(node)}</p>;
    if (quote && bold && /^[-–—]/.test(nodeText(node).trim())) return <p className="rr-quote-by">{inlineOf(node)}</p>;
    if (bold) return <p className="rr-take">{inlineOf(node)}</p>;
    if (italic) return <p className="rr-note">{inlineOf(node)}</p>;
  }

  if (node.nodeType === 'heading-3' && emphasis) {
    const q = textOnly(node) ? /^(\d+)\.\s*([\s\S]*)$/.exec(nodeText(node).trim()) : null;
    if (q) {
      return (
        <h3 className="rr-q">
          <span className="rr-q-n">{q[1]}.</span> {q[2]}
        </h3>
      );
    }
    return <h3>{inlineOf(node)}</h3>;
  }

  return documentToReactComponents(asDocument([node]), options);
}

function renderNodes(nodes: RtNode[], links: Links, emphasis: boolean, quote = false): ReactNode[] {
  const options = makeOptions(links);
  const plan = planChapter(nodes, assetMap(links));
  return nodes.map((node, i) => (
    <Fragment key={i}>{renderTop(node, i, { options, plan, emphasis, quote })}</Fragment>
  ));
}

/** Executive summary, methodology or limitations: the nodes are direct children of `className`'s element. */
export function ReportProse({
  document,
  links,
  kind,
  className,
}: {
  document: Document;
  links?: Links;
  kind: Exclude<Kind, 'body'>;
  className?: string;
}) {
  const nodes = document.content as unknown as RtNode[];
  return <div className={className}>{renderNodes(nodes, links, kind === 'method')}</div>;
}

export type Toc = { id: string; text: string; label?: string; title: string }[];

/** The chapter list the contents rail uses: the same split and the same ids the body renders. */
export function reportToc(document: Document, idPrefix = 'body'): Toc {
  return splitChapters(document).flatMap((chapter, index) => {
    if (!chapter.heading) return [];
    const text = nodeText(chapter.heading).trim();
    const f = findingLabel(text);
    return [{ id: `${idPrefix}-${index}`, text, label: f?.label, title: f ? f.rest : text }];
  });
}

/** The ten body chapters (any number): an unheaded intro, then one section per H2 with its `body-N` id. */
export function ReportChapters({ document, links, idPrefix = 'body' }: { document: Document; links?: Links; idPrefix?: string }) {
  const chapters = splitChapters(document);
  return (
    <>
      {chapters.map((chapter, index) => {
        if (!chapter.heading) {
          return (
            <div key={`${idPrefix}-intro`} className="rr-ch rr-ch-intro">
              {renderNodes(chapter.nodes, links, true)}
            </div>
          );
        }
        const id = `${idPrefix}-${index}`;
        const text = nodeText(chapter.heading).trim();
        const f = textOnly(chapter.heading) ? findingLabel(text) : null;
        const quote = text.startsWith('A Note From');
        return (
          <section key={id} className={quote ? 'rr-ch rr-ch-note' : 'rr-ch'} aria-labelledby={id}>
            <h2 id={id}>
              {f ? (
                <>
                  <span className="rr-fn">{f.label}:</span> {f.rest}
                </>
              ) : (
                inlineOf(chapter.heading)
              )}
            </h2>
            {renderNodes(chapter.nodes, links, true, quote)}
          </section>
        );
      })}
    </>
  );
}
