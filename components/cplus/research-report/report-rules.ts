import type { Document } from '@contentful/rich-text-types';
import type { ContentfulAsset, ContentfulEmbeddedEntry, ContentfulRichText } from '@/lib/contentful/types';

/**
 * Presentation rules and the "nothing silently dropped" guard for the report body (Research Report G2).
 *
 * Every rule here keys on the CONTENTFUL STRUCTURE (a list whose every item reads "**Label**: NN.N%", a paragraph set
 * entirely in bold or italic, a two-column table), never on a particular sentence or number, and none edits a word.
 * No imports from React, so the unit tests can load this file directly.
 */

/* Contentful rich-text node shapes, loosely typed: the document is data, so every access is guarded. */
export type RtNode = {
  nodeType: string;
  value?: string;
  marks?: { type: string }[];
  data?: { target?: { sys?: { id?: string } }; uri?: string };
  content?: RtNode[];
};

type Links = ContentfulRichText['links'];

export function nodeText(node: RtNode | null | undefined): string {
  if (!node) return '';
  if (node.nodeType === 'text') return node.value || '';
  return (node.content || []).map(nodeText).join('');
}

/* ----------------------------------------------------------- chapters -- */

export type Chapter = { heading: RtNode | null; nodes: RtNode[] };

/** The same split the shared renderer uses: an H1 or H2 opens a chapter; text before the first one is an unheaded intro. */
export function splitChapters(document: Document): Chapter[] {
  const chapters: Chapter[] = [];
  let current: Chapter = { heading: null, nodes: [] };
  for (const node of document.content as unknown as RtNode[]) {
    if (node.nodeType === 'heading-1' || node.nodeType === 'heading-2') {
      if (current.heading || current.nodes.length) chapters.push(current);
      current = { heading: node, nodes: [] };
    } else {
      current.nodes.push(node);
    }
  }
  if (current.heading || current.nodes.length) chapters.push(current);
  return chapters;
}

/** "Finding 3: Foo" -> { n: 'Finding 3', rest: 'Foo' }; any other heading -> null. The text itself is never changed. */
export function findingLabel(text: string): { label: string; rest: string } | null {
  const m = /^(Finding \d+):\s*([\s\S]*)$/.exec(text.trim());
  return m ? { label: m[1], rest: m[2] } : null;
}

/* ------------------------------------------------- paragraph emphasis -- */

/** All of a paragraph's text is carried by one inline mark (and it holds nothing but text): a takeaway (bold) or a note (italic). */
export function wholeParagraphMark(node: RtNode, mark: 'bold' | 'italic'): boolean {
  if (node.nodeType !== 'paragraph') return false;
  const kids = node.content || [];
  const texts = kids.filter((k) => k.nodeType === 'text' && (k.value || '').trim() !== '');
  if (!texts.length || kids.some((k) => k.nodeType !== 'text')) return false;
  return texts.every((k) => (k.marks || []).some((m) => m.type === mark));
}

/* ----------------------------------------------------------- bar lists -- */

export type BarItem = { label: string; value: string; number: number };

/** A list whose EVERY item is one paragraph reading "<bold label>: NN.N%". Anything else is an ordinary list. */
export function parseBarList(list: RtNode): BarItem[] | null {
  if (list.nodeType !== 'unordered-list') return null;
  const items = list.content || [];
  if (!items.length) return null;
  const out: BarItem[] = [];
  for (const li of items) {
    const paras = li.content || [];
    if (li.nodeType !== 'list-item' || paras.length !== 1 || paras[0].nodeType !== 'paragraph') return null;
    const kids = paras[0].content || [];
    if (kids.length !== 2 || kids.some((k) => k.nodeType !== 'text')) return null;
    const [a, b] = kids;
    if (!(a.marks || []).some((m) => m.type === 'bold') || (b.marks || []).some((m) => m.type === 'bold')) return null;
    const m = /^:\s*(\d+(?:\.\d+)?)%\s*$/.exec(b.value || '');
    const label = (a.value || '').trim();
    if (!m || !label) return null;
    out.push({ label, value: `${m[1]}%`, number: Number(m[1]) });
  }
  return out;
}

/* --------------------------------------------- chart equivalence rule -- */

const PCT = /(\d+(?:\.\d+)?)%/g;
const pcts = (s: string) => Array.from(s.matchAll(PCT), (m) => Number(m[1]));

/**
 * The approved strict rule (RR_G1_PROPOSAL §3.4 R1): a published chart image may be replaced by a bar list ONLY when
 *   1. the image's alt text states exactly as many percentages as the list has items, and
 *   2. every item's value appears in an alt-text segment (split on commas / "and") that also names that item's label
 *      (case-insensitive; a hyphenated qualifier such as "-related" may be absent).
 * A changed, missing, extra or swapped value or label fails. Nothing is inferred from the image pixels.
 */
export function chartEquivalent(alt: string, items: BarItem[]): boolean {
  if (!items.length || pcts(alt).length !== items.length) return false;
  const segments = alt.split(/,\s*(?:and\s+)?|\s+and\s+/);
  return items.every((item) => {
    const names = new Set([item.label.toLowerCase(), item.label.replace(/-\w+/g, '').toLowerCase()]);
    return segments.some(
      (seg) => pcts(seg).includes(item.number) && Array.from(names).some((n) => n && seg.toLowerCase().includes(n))
    );
  });
}

export type Plan = {
  /** top-level node index -> the published image that this bar list replaces (its alt text is the caption). */
  barCharts: Map<number, ContentfulAsset>;
  /** top-level node indexes that are bar lists (with or without a published chart). */
  bars: Map<number, BarItem[]>;
  /** top-level node indexes of chart images that a verified bar list replaces; the image stays reachable by link. */
  replaced: Set<number>;
};

export const assetAlt = (a: ContentfulAsset) => a.description || a.title || '';

export function isImageAsset(asset: ContentfulAsset) {
  if (asset.contentType?.startsWith('image/')) return true;
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(asset.url || '');
}

export function assetMap(links?: Links) {
  const map = new Map<string, ContentfulAsset>();
  for (const asset of links?.assets?.block || []) if (asset?.sys?.id) map.set(asset.sys.id, asset);
  return map;
}

export function entryMap(links?: Links) {
  const map = new Map<string, ContentfulEmbeddedEntry>();
  for (const entry of links?.entries?.block || []) if (entry?.sys?.id) map.set(entry.sys.id, entry);
  return map;
}

/** Within ONE chapter: find bar lists, then pair each with at most one image in the same chapter whose alt text verifies. */
export function planChapter(nodes: RtNode[], assets: Map<string, ContentfulAsset>): Plan {
  const bars = new Map<number, BarItem[]>();
  nodes.forEach((n, i) => {
    const items = parseBarList(n);
    if (items) bars.set(i, items);
  });
  const barCharts = new Map<number, ContentfulAsset>();
  const replaced = new Set<number>();
  nodes.forEach((n, i) => {
    if (n.nodeType !== 'embedded-asset-block') return;
    const asset = assets.get(n.data?.target?.sys?.id || '');
    if (!asset?.url || !isImageAsset(asset)) return;
    for (const [li, items] of bars) {
      if (barCharts.has(li)) continue;
      if (chartEquivalent(assetAlt(asset), items)) {
        barCharts.set(li, asset);
        replaced.add(i);
        break;
      }
    }
  });
  return { barCharts, bars, replaced };
}

/* ------------------------------------------------------ status table -- */

export type StatusRow = { code: string; cells: [RtNode[], RtNode[]]; mark: 'yes' | 'no' | 'utd' | 'na' | null };
const MARKS: Record<string, StatusRow['mark']> = { YES: 'yes', NO: 'no', UTD: 'utd', 'N/A': 'na' };

/** A table whose every row has exactly two cells: first row = the list's label, the rest = term / meaning. */
export function parseTwoColumnTable(table: RtNode): { head: [string, string]; rows: StatusRow[] } | null {
  if (table.nodeType !== 'table') return null;
  const rows = table.content || [];
  if (rows.length < 2) return null;
  const parsed = rows.map((r) => (r.content || []).map((c) => c));
  if (parsed.some((cells) => cells.length !== 2)) return null;
  const [head, ...rest] = parsed;
  return {
    head: [nodeText(head[0]).trim(), nodeText(head[1]).trim()],
    rows: rest.map(([a, b]) => ({
      code: nodeText(a).trim(),
      cells: [a.content || [], b.content || []],
      mark: MARKS[nodeText(a).trim()] ?? null,
    })),
  };
}

/* ------------------------------------------------- the OD-10 guard -- */

export type Unrendered = { where: string; kind: string; detail: string };

const SUPPORTED_BLOCKS = new Set([
  'paragraph', 'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6',
  'unordered-list', 'ordered-list', 'list-item', 'blockquote', 'hr',
  'table', 'table-row', 'table-header-cell', 'table-cell', 'embedded-asset-block', 'embedded-entry-block',
  'hyperlink', 'text',
]);
const SUPPORTED_MARKS = new Set(['bold', 'italic', 'underline', 'code', 'superscript', 'subscript']);

/**
 * Every part of a rich-text document that this report page would NOT show, or would show without its content. The
 * renderer is deliberately unchanged in what it supports (research findings embedded as blocks, images and files,
 * links); this reports the rest so a dropped embed can never pass unnoticed (OD-10):
 *   - an embedded block entry that cannot be resolved, or is not a research finding;
 *   - an embedded block asset with no published URL, or that is not in the query's asset links;
 *   - an inline embedded entry, an entry link or an asset link (the query asks for none of them);
 *   - any node type or text mark this page has no rendering for.
 * `where` names the document and the position (top-level node index) so an editor can find it.
 */
export function findUnrendered(document: Document | null | undefined, links: Links, where: string): Unrendered[] {
  const out: Unrendered[] = [];
  if (!document) return out;
  const assets = assetMap(links);
  const entries = entryMap(links);

  const visit = (node: RtNode, at: string) => {
    const t = node.nodeType;
    if (t === 'embedded-entry-block') {
      const id = node.data?.target?.sys?.id || '(no id)';
      const entry = entries.get(id);
      if (!entry) out.push({ where: at, kind: 'embedded entry (block)', detail: `entry ${id} could not be resolved, so nothing is shown` });
      else if (!(entry.__typename === 'ResearchFinding' || entry.findingHeadline || entry.statistic))
        out.push({ where: at, kind: 'embedded entry (block)', detail: `entry ${id} is a ${entry.__typename || 'non-finding'} entry; only research findings are shown` });
      return;
    }
    if (t === 'embedded-asset-block') {
      const id = node.data?.target?.sys?.id || '(no id)';
      const asset = assets.get(id);
      if (!asset?.url) out.push({ where: at, kind: 'embedded asset (block)', detail: `asset ${id} has no published file, so nothing is shown` });
      return;
    }
    if (t === 'embedded-entry-inline') return void out.push({ where: at, kind: 'embedded entry (inline)', detail: `entry ${node.data?.target?.sys?.id || '(no id)'} is not shown` });
    if (t === 'entry-hyperlink' || t === 'asset-hyperlink')
      return void out.push({ where: at, kind: t, detail: `link to ${node.data?.target?.sys?.id || '(no id)'} is not rendered as a link; its text is kept` });
    if (!SUPPORTED_BLOCKS.has(t)) return void out.push({ where: at, kind: 'unsupported node', detail: t });
    for (const m of node.marks || []) if (!SUPPORTED_MARKS.has(m.type)) out.push({ where: at, kind: 'unsupported mark', detail: m.type });
    for (const child of node.content || []) visit(child, at);
  };

  (document.content as unknown as RtNode[]).forEach((n, i) => visit(n, `${where} · node ${i + 1}`));
  return out;
}
