import React from 'react';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Block, type Document, type Inline } from '@contentful/rich-text-types';
import type { ContentfulAsset, ContentfulEmbeddedEntry, ContentfulRichText } from '@/lib/contentful/types';
import { linkTargetProps } from '@/lib/internal-links';
import { mapContentfulFindingToCms } from '@/lib/contentful/mappers';
import { createHeadingIdAllocator, nodeText } from '@/lib/contentful/heading-ids';
import { ResearchFindingEmbed } from '@/components/research/ResearchFindingEmbed';

/**
 * Article body renderer for `/blog/[slug]` (BL-D6 G2). The Contentful rich text is rendered node for node as
 * `components/blog/RichTextContent.tsx` renders it (same node types, same image, file, research-finding and hyperlink
 * handling, BLOG-012 same-tab internal links), but WITHOUT the Tailwind classes: the C+ reading styles come from
 * `.ba-prose` in `article.css`. `RichTextContent` itself is unchanged because `/press/[slug]` also uses it.
 *
 * Heading ids: H2 and H3 take their ids from the shared allocator in document order, exactly as
 * `extractTocFromDocument` does, so every contents link resolves (the BL-D6 anchor fix). H4–H6 carry no id, as before.
 * Wording is never changed here.
 */
type Props = { document: Document; links?: ContentfulRichText['links'] };

function assetMap(links?: ContentfulRichText['links']) {
  const map = new Map<string, ContentfulAsset>();
  for (const asset of links?.assets?.block || []) if (asset?.sys?.id) map.set(asset.sys.id, asset);
  return map;
}

function entryMap(links?: ContentfulRichText['links']) {
  const map = new Map<string, ContentfulEmbeddedEntry>();
  for (const entry of links?.entries?.block || []) if (entry?.sys?.id) map.set(entry.sys.id, entry);
  return map;
}

function isImageAsset(asset: ContentfulAsset) {
  if (asset.contentType?.startsWith('image/')) return true;
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(asset.url || '');
}

/** A short accessible name for a scrollable table region: its first row's text. */
function tableLabel(node: Block | Inline) {
  const first = (node.content || [])[0] as Block | undefined;
  const text = nodeText(first).replace(/\s+/g, ' ').trim();
  return text ? `Table: ${text.slice(0, 80)}` : 'Table';
}

export function ArticleRichText({ document, links }: Props) {
  const assets = assetMap(links);
  const entries = entryMap(links);
  const idFor = createHeadingIdAllocator();

  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => <h2 id={idFor(nodeText(node))}>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 id={idFor(nodeText(node))}>{children}</h3>,
      [BLOCKS.HEADING_4]: (_node, children) => <h4>{children}</h4>,
      [BLOCKS.HEADING_5]: (_node, children) => <h5>{children}</h5>,
      [BLOCKS.HEADING_6]: (_node, children) => <h6>{children}</h6>,
      [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
      [BLOCKS.UL_LIST]: (_node, children) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (_node, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (_node, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.HR]: () => <hr />,
      /* Wide tables scroll inside their own focusable region, so keyboard users can scroll them too. */
      [BLOCKS.TABLE]: (node, children) => (
        <div className="ba-table" role="region" aria-label={tableLabel(node)} tabIndex={0}>
          <table>
            <tbody>{children}</tbody>
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (_node, children) => <tr>{children}</tr>,
      [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => <th>{children}</th>,
      [BLOCKS.TABLE_CELL]: (_node, children) => <td>{children}</td>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = node.data?.target?.sys?.id as string | undefined;
        const asset = id ? assets.get(id) : undefined;
        if (!asset?.url) return null;
        const alt = asset.description || asset.title || '';
        if (!isImageAsset(asset)) {
          return (
            <p>
              <a href={asset.url}>{asset.title || asset.fileName || 'Download file'}</a>
            </p>
          );
        }
        return (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.url}
              alt={alt}
              width={asset.width || undefined}
              height={asset.height || undefined}
              loading="lazy"
              decoding="async"
            />
            {asset.description ? <figcaption>{asset.description}</figcaption> : null}
          </figure>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const id = node.data?.target?.sys?.id as string | undefined;
        const entry = id ? entries.get(id) : undefined;
        if (!entry) return null;
        const typename = entry.__typename || '';
        if (typename === 'ResearchFinding' || entry.findingHeadline || entry.statistic) {
          const finding = mapContentfulFindingToCms(entry);
          return finding ? <ResearchFindingEmbed finding={finding} /> : null;
        }
        return null;
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const href = node.data?.uri as string | undefined;
        /* BLOG-012: internal links (including absolute mappedskills.com URLs) open in the same tab. */
        return (
          <a href={href} {...linkTargetProps(href)}>
            {children}
          </a>
        );
      },
    },
  };

  return <div className="ba-prose">{documentToReactComponents(document, options)}</div>;
}
