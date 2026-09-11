import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';
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
    renderNode: {
      [BLOCKS.HEADING_2]: (_node, children) => {
        const id = `section-${headingIndex}`;
        headingIndex += 1;
        return (
          <h2 id={id} className="scroll-mt-28 text-2xl sm:text-3xl font-bold font-heading tracking-tight mt-10 mb-4">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (_node, children) => {
        const id = `section-${headingIndex}`;
        headingIndex += 1;
        return (
          <h3 id={id} className="scroll-mt-28 text-xl sm:text-2xl font-bold font-heading tracking-tight mt-8 mb-3">
            {children}
          </h3>
        );
      },
      [BLOCKS.PARAGRAPH]: (_node, children) => (
        <p className="text-base leading-relaxed text-foreground mb-4">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (_node, children) => (
        <ul className="list-disc pl-6 space-y-2 mb-6 text-foreground">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node, children) => (
        <ol className="list-decimal pl-6 space-y-2 mb-6 text-foreground">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node, children) => <li className="leading-relaxed">{children}</li>,
      [BLOCKS.QUOTE]: (_node, children) => (
        <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-6">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-10 border-border" />,
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
              className="w-full h-auto rounded-lg border border-border/50"
              loading="lazy"
            />
            {asset.description ? (
              <figcaption className="text-sm text-muted-foreground mt-2 text-center">
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
            className="text-accent hover:underline underline-offset-4"
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
