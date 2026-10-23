import { Fragment, type ReactNode } from 'react';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';
import type { ContentfulRichText } from '@/lib/contentful/types';
import { linkTargetProps } from '@/lib/internal-links';
import { mapContentfulFindingToCms } from '@/lib/contentful/mappers';
import { assetAlt, assetMap, entryMap, isImageAsset, nodeText, type RtNode } from '../research-report/report-rules';
import { colophonRun, isReadNextPair, labelLine, limitIndex, parseDateline, parseLabelLedger, withoutLabel } from './release-rules';

/**
 * Press release body renderer (`/press/[slug]`, Press Detail G2). It renders the Contentful rich text node for node, with the
 * same node types, finding, image and hyperlink handling as the shared renderers, but with the approved reading styles
 * (`.pd-prose` in `release.css`) instead of utility classes. Presentation rules (release-rules.ts) never edit a word:
 *   - the first paragraph's "PLACE — " dateline is set as a run-in;
 *   - a bullet list whose every item reads "Label: text" is a ledger;
 *   - in a method chapter: the last prose paragraph before the read-next block is the limits note, a "…:" paragraph
 *     followed by a link-only paragraph is the read-next link, and short "Label: value" lines are a colophon list.
 * Anything that does not match a rule renders as ordinary prose.
 */

type Links = ContentfulRichText['links'];

const asDocument = (nodes: RtNode[]) => ({ nodeType: BLOCKS.DOCUMENT, data: {}, content: nodes }) as unknown as Document;

function Anchor({ href, children }: { href?: string; children: ReactNode }) {
  return (
    <a href={href} {...linkTargetProps(href)}>
      {children}
    </a>
  );
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
          <div className="pd-table" role="region" aria-label={first ? `Table: ${first.slice(0, 80)}` : 'Table'} tabIndex={0}>
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
        return (
          <figure className="pd-chart">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.url} alt={assetAlt(asset)} width={asset.width || undefined} height={asset.height || undefined} loading="lazy" decoding="async" />
          </figure>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = entries.get(node.data?.target?.sys?.id as string);
        if (entry && (entry.__typename === 'ResearchFinding' || entry.findingHeadline || entry.statistic)) {
          const finding = mapContentfulFindingToCms(entry);
          /* A finding that did not qualify for the strip (or sits later in the body) is shown in place, as plain lines:
             no heading element, so it can never break the page's heading order. */
          return finding ? (
            <div className="pd-embed">
              {finding.statistic ? <p className="pd-embed-s">{finding.statistic}</p> : null}
              <p className="pd-embed-h">{finding.headline}</p>
              {finding.description ? <p className="pd-embed-d">{finding.description}</p> : null}
              {finding.baseSample || finding.sourceNote ? (
                <p className="pd-embed-m">{[finding.baseSample, finding.sourceNote].filter(Boolean).join(' · ')}</p>
              ) : null}
            </div>
          ) : null;
        }
        /* Anything else is reported by `findUnrendered` (PressReleaseBody); it is never invented here. */
        return null;
      },
      [INLINES.HYPERLINK]: (node, children) => <Anchor href={node.data?.uri as string | undefined}>{children}</Anchor>,
      [INLINES.ENTRY_HYPERLINK]: (_n, children) => <>{children}</>,
      [INLINES.ASSET_HYPERLINK]: (_n, children) => <>{children}</>,
      [INLINES.EMBEDDED_ENTRY]: () => null,
    },
  };
}

/** Inline children of a node (its own marks kept), without the wrapping element. */
function inlineOf(node: RtNode, options: Options): ReactNode {
  return documentToReactComponents(asDocument([node]), {
    ...options,
    renderNode: {
      ...options.renderNode,
      [BLOCKS.PARAGRAPH]: (_n, children) => children,
      /* a chapter heading is drawn inside our own h2, so the node's own element is dropped (no nested headings) */
      [BLOCKS.HEADING_1]: (_n, children) => children,
      [BLOCKS.HEADING_2]: (_n, children) => children,
      [BLOCKS.HEADING_3]: (_n, children) => children,
    },
  });
}

export function ReleaseNodes({
  nodes,
  links,
  ids,
  method = false,
  dateline = false,
}: {
  nodes: RtNode[];
  links: Links;
  /** Heading ids from `assignHeadingIds` (release-rules.ts); an H3 takes its id from here, as the live page's H3s did. */
  ids?: Map<RtNode, string>;
  /** Apply the method-chapter rules (limits note, read-next link, colophon). */
  method?: boolean;
  /** Treat the first paragraph as the release's opening paragraph (lede size, dateline run-in). */
  dateline?: boolean;
}) {
  const options = makeOptions(links);
  const out: ReactNode[] = [];
  const limit = method ? limitIndex(nodes) : -1;
  let firstParagraphSeen = false;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];

    if (node.nodeType === 'paragraph' && !firstParagraphSeen && nodeText(node).trim()) {
      firstParagraphSeen = true;
      if (dateline) {
        const d = parseDateline(node);
        out.push(
          <p key={i} className="pd-first">
            {d ? (
              <>
                <span className="pd-dateline">{d.dateline}</span> {d.rest}
              </>
            ) : (
              inlineOf(node, options)
            )}
          </p>
        );
        continue;
      }
    }

    if (node.nodeType === 'heading-3') {
      out.push(
        <h3 key={i} id={ids?.get(node)}>
          {inlineOf(node, options)}
        </h3>
      );
      continue;
    }

    if (node.nodeType === 'unordered-list') {
      const rows = parseLabelLedger(node);
      if (rows) {
        out.push(
          <ul key={i} className="pd-ledger">
            {rows.map((r, k) => (
              <li key={k}>
                <span className="pd-term">{r.term}</span>
                <span className="pd-def">{r.def}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }
    }

    if (method && isReadNextPair(node, nodes[i + 1])) {
      out.push(
        <p key={i} className="pd-next-l">
          {nodeText(node).trim()}
        </p>,
        <p key={`${i}-link`} className="pd-next">
          {documentToReactComponents(asDocument([nodes[i + 1]]), {
            ...options,
            renderNode: {
              ...options.renderNode,
              [BLOCKS.PARAGRAPH]: (_n, children) => children,
              [INLINES.HYPERLINK]: (n, children) => (
                <Anchor href={n.data?.uri as string | undefined}>
                  <span>{children}</span> <span aria-hidden="true">→</span>
                </Anchor>
              ),
            },
          })}
        </p>
      );
      i += 1;
      continue;
    }

    if (node.nodeType === 'paragraph') {
      const run = colophonRun(nodes, i);
      if (run > 0) {
        out.push(
          <dl key={i} className="pd-colophon">
            {nodes.slice(i, i + run).map((p, k) => {
              const l = labelLine(p)!;
              return (
                <div key={k}>
                  <dt>{l.label}</dt>
                  <dd>{inlineOf(withoutLabel(p), options)}</dd>
                </div>
              );
            })}
          </dl>
        );
        i += run - 1;
        continue;
      }
    }

    if (i === limit) {
      out.push(
        <p key={i} className="pd-limit">
          {inlineOf(node, options)}
        </p>
      );
      continue;
    }

    out.push(<Fragment key={i}>{documentToReactComponents(asDocument([node]), options)}</Fragment>);
  }
  return <>{out}</>;
}

/** Stable chapter ids and the text of each heading, for the page's deep links. */
export function headingText(node: RtNode | null): string {
  return node ? nodeText(node).replace(/\s+/g, ' ').trim() : '';
}

export { inlineOf as renderInline, makeOptions as releaseOptions };
