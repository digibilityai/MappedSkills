/**
 * BL-D6 (owner-approved G1, 2026-10-20) — ONE heading-id rule for blog articles.
 *
 * WHAT WAS WRONG. The table of contents and the headings were given ids by two different rules:
 * `extractTocFromDocument` used `section-${index}` and `RichTextContent` used `slugify(text)`. They never matched, so
 * every contents link on every live article (126 of 126) pointed at an id that did not exist.
 *
 * THE FIX. Both now take their ids from this module, walking the same H2/H3 headings in the same document order:
 *   - the id is the SAME slug the live headings already carry (`headingSlug` is the production `slugify`, unchanged),
 *     so any existing link to `/blog/<slug>#<heading>` keeps working;
 *   - a repeated heading gets `-2`, `-3`, … so every id on the page is unique;
 *   - a heading with no usable text gets `section` (then `section-2`, …).
 *
 * No imports, so the unit tests can transpile and run it directly.
 */

type TextNode = { nodeType?: string; value?: string; content?: unknown[] };

/** The production slug rule from `components/blog/RichTextContent.tsx`, unchanged. */
export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Plain text of a Contentful rich-text node (marks and hyperlinks contribute their text). */
export function nodeText(node: TextNode | null | undefined): string {
  if (!node) return '';
  if (node.nodeType === 'text') return node.value || '';
  if (!Array.isArray(node.content)) return '';
  return (node.content as TextNode[]).map(nodeText).join('');
}

/**
 * Returns a function that turns heading text into a page-unique id. Create ONE per document and call it for each
 * H2/H3 in document order; the contents list and the rendered headings do exactly that, so their ids match.
 */
export function createHeadingIdAllocator(): (text: string) => string {
  const used = new Map<string, number>();
  return (text: string) => {
    const base = headingSlug(text) || 'section';
    const n = (used.get(base) || 0) + 1;
    used.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };
}

/**
 * The approved "main headings" rule for the contents list (BL-D6 G1, D-2): the H2s when an article has at least three;
 * otherwise its H2s and H3s together. H4 and below are never listed.
 */
export function mainHeadings<T extends { level: 2 | 3 }>(items: readonly T[]): T[] {
  const h2 = items.filter((i) => i.level === 2);
  return h2.length >= 3 ? h2 : [...items];
}
