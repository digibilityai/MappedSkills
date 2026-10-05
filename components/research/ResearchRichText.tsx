import type { ReactNode } from 'react';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Document, type TopLevelBlock } from '@contentful/rich-text-types';
import type {
  ContentfulAsset,
  ContentfulEmbeddedEntry,
  ContentfulRichText,
} from '@/lib/contentful/types';
import { linkTargetProps } from '@/lib/internal-links';
import { mapContentfulFindingToCms } from '@/lib/contentful/mappers';
import { ResearchFindingEmbed } from '@/components/research/ResearchFindingEmbed';

type ResearchRichTextProps = {
  document: Document;
  links?: ContentfulRichText['links'];
  idPrefix?: string;
  className?: string;
};

type Chapter = {
  heading: TopLevelBlock | null;
  nodes: TopLevelBlock[];
};

function getAssetMap(links?: ContentfulRichText['links']) {
  const map = new Map<string, ContentfulAsset>();
  for (const asset of links?.assets?.block || []) {
    if (asset?.sys?.id) {
      map.set(asset.sys.id, asset);
    }
  }
  return map;
}

function getEntryMap(links?: ContentfulRichText['links']) {
  const map = new Map<string, ContentfulEmbeddedEntry>();
  for (const entry of links?.entries?.block || []) {
    if (entry?.sys?.id) {
      map.set(entry.sys.id, entry);
    }
  }
  return map;
}

function isImageAsset(asset: ContentfulAsset) {
  if (asset.contentType?.startsWith('image/')) return true;
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(asset.url || '');
}

function isChapterHeading(node: TopLevelBlock) {
  return node.nodeType === BLOCKS.HEADING_1 || node.nodeType === BLOCKS.HEADING_2;
}

function splitChapters(document: Document): Chapter[] {
  const chapters: Chapter[] = [];
  let current: Chapter = { heading: null, nodes: [] };

  for (const node of document.content) {
    if (isChapterHeading(node)) {
      if (current.heading || current.nodes.length) chapters.push(current);
      current = { heading: node, nodes: [] };
    } else {
      current.nodes.push(node);
    }
  }

  if (current.heading || current.nodes.length) chapters.push(current);
  return chapters;
}

function asDocument(nodes: TopLevelBlock[]): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: nodes,
  };
}

const STAT_LEAD = /^(\d[\d.,]*\s*%(?:\s*vs\.?\s*\d[\d.,]*\s*%)?)\s+([\s\S]+)/i;

function splitStatLead(children: ReactNode): { stat: string; rest: ReactNode } | null {
  if (typeof children === 'string') {
    const match = children.match(STAT_LEAD);
    return match ? { stat: match[1], rest: match[2] } : null;
  }
  if (Array.isArray(children) && typeof children[0] === 'string') {
    const match = children[0].match(STAT_LEAD);
    if (!match) return null;
    return { stat: match[1], rest: [match[2], ...children.slice(1)] };
  }
  return null;
}

function headingText(node: TopLevelBlock) {
  return documentToReactComponents(asDocument([node]), {
    renderNode: {
      [BLOCKS.HEADING_1]: (_n, children) => children,
      [BLOCKS.HEADING_2]: (_n, children) => children,
      [INLINES.HYPERLINK]: (hyperlink, children) => {
        const href = hyperlink.data?.uri as string | undefined;
        return (
          <a href={href} className="underline decoration-2 underline-offset-4" {...linkTargetProps(href)}>
            {children}
          </a>
        );
      },
    },
  });
}

export function ResearchRichText({ document, links, idPrefix = 'research', className }: ResearchRichTextProps) {
  const assetMap = getAssetMap(links);
  const entryMap = getEntryMap(links);
  const chapters = splitChapters(document);
  const chaptered = chapters.some((chapter) => chapter.heading);

  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_3]: (_node, children) => (
        <h3 className="scroll-mt-28 mt-[clamp(22px,2.6vw,34px)] mb-4 w-full text-balance font-heading text-[clamp(1.15rem,2vw,1.55rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-resolve-ink first:mt-0">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (_node, children) => (
        <h4 className="scroll-mt-28 mt-6 mb-2 text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-resolve-dim first:mt-0">
          {children}
        </h4>
      ),
      [BLOCKS.PARAGRAPH]: (_node, children) => {
        const lead = splitStatLead(children);
        if (lead) {
          return (
            <p className="mb-0 grid w-full grid-cols-1 gap-x-[clamp(16px,2.4vw,36px)] gap-y-1 border-b border-resolve-line py-[clamp(12px,1.6vw,18px)] first:border-t min-[700px]:grid-cols-[minmax(10ch,14ch)_minmax(0,1fr)]">
              <span className="font-heading text-[clamp(1.15rem,1.8vw,1.4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-resolve-ink">
                {lead.stat}
              </span>
              <span className="min-w-0 text-[1.02rem] leading-relaxed text-resolve-dim">{lead.rest}</span>
            </p>
          );
        }
        return (
          <p className="mb-4 w-full text-[1.02rem] leading-relaxed text-resolve-dim last:mb-0">
            {children}
          </p>
        );
      },
      [BLOCKS.UL_LIST]: (_node, children) => (
        <ul className="mb-6 ml-0 w-full list-none border-t border-resolve-line p-0 text-[1.02rem] leading-relaxed text-resolve-dim">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (_node, children) => (
        <ol className="mb-6 w-full list-decimal space-y-2 pl-6 text-[1.02rem] leading-relaxed text-resolve-dim">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node, children) => (
        <li className="border-b border-resolve-line py-[clamp(10px,1.4vw,16px)] leading-relaxed [&_p]:mb-0">
          {children}
        </li>
      ),
      [BLOCKS.QUOTE]: (_node, children) => (
        <blockquote className="my-8 w-full max-w-[36ch] border-t-2 border-resolve-ink pt-4 font-heading text-[clamp(1.2rem,2vw,1.55rem)] font-bold leading-[1.18] tracking-[-0.03em] text-resolve-ink [&_p]:mb-0 [&_p]:max-w-none [&_p]:text-[inherit] [&_p]:leading-[inherit]">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-[clamp(28px,3.4vw,48px)] border-resolve-line" />,
      [BLOCKS.TABLE]: (_node, children) => (
        <div className="my-[clamp(24px,3vw,40px)] w-full max-w-full overflow-x-auto border-t-2 border-resolve-ink">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <tbody>{children}</tbody>
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (_node, children) => (
        <tr className="border-b border-resolve-line">{children}</tr>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
        <th className="border-r border-resolve-line px-4 py-3 align-top font-heading text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.12em] text-resolve-ink last:border-r-0 [&_p]:mb-0">
          {children}
        </th>
      ),
      [BLOCKS.TABLE_CELL]: (_node, children) => (
        <td className="border-r border-resolve-line px-4 py-3 align-top text-[.94rem] leading-[1.5] text-resolve-dim last:border-r-0 first:font-medium first:text-resolve-ink [&_p]:mb-0">
          {children}
        </td>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = node.data?.target?.sys?.id as string | undefined;
        const asset = id ? assetMap.get(id) : undefined;
        if (!asset?.url) return null;

        const alt = asset.description || asset.title || '';
        if (!isImageAsset(asset)) {
          return (
            <p className="my-6 w-full">
              <a
                href={asset.url}
                className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4"
              >
                {asset.title || asset.fileName || 'Download file'}
              </a>
            </p>
          );
        }

        return (
          <figure className="my-[clamp(24px,3vw,40px)] max-w-none bg-resolve-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.url}
              alt={alt}
              width={asset.width || undefined}
              height={asset.height || undefined}
              className="mx-auto h-auto w-auto max-w-full object-contain object-left"
              loading="lazy"
            />
            {(asset.description || asset.title) && (
              <figcaption className="border-t border-resolve-line px-0 py-3 w-full text-[.9rem] leading-[1.55] text-resolve-dim">
                {asset.description || asset.title}
              </figcaption>
            )}
          </figure>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const id = node.data?.target?.sys?.id as string | undefined;
        const entry = id ? entryMap.get(id) : undefined;
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
        return (
          <a
            href={href}
            className="font-semibold underline decoration-2 underline-offset-4"
            style={{ color: 'var(--resolve-accent-dark)' }}
            {...linkTargetProps(href)}
          >
            {children}
          </a>
        );
      },
    },
  };

  if (!chaptered) {
    return (
      <div className={`research-rich-text min-w-0 w-full min-[1081px]:w-[72%] ${className ?? ''}`.trim()}>
        {documentToReactComponents(document, options)}
      </div>
    );
  }

  return (
    <div className={`research-rich-text flex flex-col ${className ?? ''}`.trim()}>
      {chapters.map((chapter, index) => {
        const headingId = `${idPrefix}-${index}`;
        const body =
          chapter.nodes.length > 0
            ? documentToReactComponents(asDocument(chapter.nodes), options)
            : null;

        if (!chapter.heading) {
          return (
            <div key={headingId} className="min-w-0 w-full min-[1081px]:w-[72%]">
              {body}
            </div>
          );
        }

        return (
          <section
            key={headingId}
            aria-labelledby={headingId}
            className={
              index === 0
                ? ''
                : 'mt-[clamp(36px,4.2vw,56px)] border-t-2 border-resolve-ink pt-[clamp(18px,2.2vw,28px)]'
            }
          >
            <div className="w-full min-[1081px]:w-[72%]">
              <h2
                id={headingId}
                className="m-0 scroll-mt-28 w-full text-balance font-heading text-[clamp(1.6rem,3.4vw,2.7rem)] font-extrabold leading-[1.0] tracking-[-0.035em] text-resolve-ink"
              >
                {headingText(chapter.heading)}
              </h2>
              <div className="mt-[clamp(18px,2.2vw,26px)] min-w-0 w-full [&>*:first-child]:mt-0">{body}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
