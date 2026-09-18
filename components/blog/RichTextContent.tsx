import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, type Document } from '@contentful/rich-text-types';
import type { ContentfulAsset, ContentfulRichText } from '@/lib/contentful/types';

type RichTextContentProps = {
  document: Document;
  links?: ContentfulRichText['links'];
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

export function RichTextContent({ document, links }: RichTextContentProps) {
  const assetMap = getAssetMap(links);
  let headingIndex = 0;

  const options: Options = {
    renderMark: {
      [MARKS.CODE]: (text) => (
        /* Code: Wide 14px - Medium 14px - Narrow 13-14px - Line-height 1.5-1.65 */
        <code className="text-[clamp(13px,0.85vw,14px)] leading-[1.55] font-mono bg-resolve-ground px-1.5 py-0.5 rounded border border-resolve-line text-resolve-ink">
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.HEADING_2]: (_node, children) => {
        const id = `section-${headingIndex}`;
        headingIndex += 1;
        return (
          /* H2: Wide 40px - Medium 34px - Narrow 30px - Line-height 1.10-1.18 */
          <h2 id={id} className="scroll-mt-28 text-[clamp(30px,2.6vw,40px)] leading-[1.14] font-heading font-bold tracking-[-0.03em] mt-10 mb-4 text-resolve-ink">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (_node, children) => {
        const id = `section-${headingIndex}`;
        headingIndex += 1;
        return (
          /* H3: Wide 28px - Medium 26px - Narrow 24px - Line-height 1.18-1.25 */
          <h3 id={id} className="scroll-mt-28 text-[clamp(24px,1.8vw,28px)] leading-[1.20] font-heading font-bold tracking-[-0.02em] mt-8 mb-3 text-resolve-ink">
            {children}
          </h3>
        );
      },
      [BLOCKS.HEADING_4]: (_node, children) => {
        const id = `section-${headingIndex}`;
        headingIndex += 1;
        return (
          /* H4: Wide 22px - Medium 21px - Narrow 20px - Line-height 1.25-1.30 */
          <h4 id={id} className="scroll-mt-28 text-[clamp(20px,1.4vw,22px)] leading-[1.28] font-heading font-semibold tracking-[-0.01em] mt-6 mb-3 text-resolve-ink">
            {children}
          </h4>
        );
      },
      [BLOCKS.PARAGRAPH]: (_node, children) => (
        /* Body/Primary reading: Wide 16px - Medium 16px - Narrow 16px - Line-height 1.55-1.65 */
        <p className="text-[16px] leading-[1.60] text-resolve-dim mb-4 max-w-none">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (_node, children) => (
        <ul className="list-disc pl-6 space-y-2 mb-6 text-resolve-dim text-[16px] leading-[1.60]">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node, children) => (
        <ol className="list-decimal pl-6 space-y-2 mb-6 text-resolve-dim text-[16px] leading-[1.60]">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node, children) => <li className="leading-[1.60]">{children}</li>,
      [BLOCKS.QUOTE]: (_node, children) => (
        /* Lede / Quote: Wide 22px - Medium 21px - Narrow 20px - Line-height 1.45-1.55 */
        <blockquote className="border-l-4 border-resolve-accent-deep pl-4 italic text-[clamp(20px,1.4vw,22px)] leading-[1.50] text-resolve-dim my-6">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-10 border-resolve-line" />,
      [BLOCKS.TABLE]: (_node, children) => (
        <div className="my-8 w-full max-w-full overflow-x-auto rounded-lg border border-resolve-line shadow-sm">
          <table className="w-full text-left border-collapse min-w-[500px]">
            {children}
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (_node, children) => (
        <tr className="border-b border-resolve-line last:border-b-0 hover:bg-resolve-ground/40 transition-colors">
          {children}
        </tr>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
        <th className="px-4 py-3 bg-resolve-ground text-resolve-ink font-heading font-semibold text-[14px] leading-[1.4] border-r border-resolve-line last:border-r-0 align-top [&_p:not(:last-child)]:mb-2 [&_p:last-child]:mb-0">
          {children}
        </th>
      ),
      [BLOCKS.TABLE_CELL]: (_node, children) => (
        <td className="px-4 py-3 text-resolve-dim text-[14px] leading-[1.5] border-r border-resolve-line last:border-r-0 align-top [&_p:not(:last-child)]:mb-2 [&_p:last-child]:mb-0">
          {children}
        </td>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = node.data?.target?.sys?.id as string | undefined;
        const asset = id ? assetMap.get(id) : undefined;
        if (!asset?.url) return null;

        const alt = asset.description || asset.title || '';
        return (
          <figure className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.url}
              alt={alt}
              width={asset.width || undefined}
              height={asset.height || undefined}
              className="w-full h-auto rounded-lg border border-resolve-line"
              loading="lazy"
            />
            {asset.description ? (
              /* Small/note: Wide 14px - Medium 14px - Narrow 14px - Line-height 1.45-1.55 */
              <figcaption className="text-[14px] leading-[1.50] text-resolve-dim mt-2 text-center">
                {asset.description}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const href = node.data?.uri as string | undefined;
        return (
          <a
            href={href}
            className="text-resolve-accent-dark hover:underline underline-offset-4 font-semibold"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        );
      },
    },
  };

  return <div className="blog-rich-text">{documentToReactComponents(document, options)}</div>;
}
