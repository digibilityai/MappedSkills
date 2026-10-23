import type { Document } from '@contentful/rich-text-types';
import type { ContentfulEmbeddedEntry, ContentfulRichText } from '@/lib/contentful/types';
import { createHeadingIdAllocator } from '@/lib/contentful/heading-ids';
import { entryMap, nodeText, splitChapters, type Chapter, type RtNode } from '../research-report/report-rules';

/**
 * Presentation rules for the press release body (Press Detail G2, docs/press-redesign/detail-g1/PD_G2_PLAN.md).
 *
 * Same contract as `research-report/report-rules.ts`: a rule never edits a word and never invents one. Where a rule
 * keys on wording (the method and back-matter headings, and "Label: text" lines) the page falls back to plain
 * styling when it does not match (owner decision OD-3). No React here, so the unit tests can load this file directly.
 *
 * The evidence strip reads STRUCTURED `ResearchFinding` entries only. It never reads a number out of prose.
 */

type Links = ContentfulRichText['links'];

export const MAX_FIGURES = 4;

/* ------------------------------------------------------- evidence strip -- */

export type Figure = {
  id: string;
  statistic: string;
  headline: string;
  description?: string;
  baseSample?: string;
  sourceNote?: string;
};

const clean = (s: string | null | undefined) => (typeof s === 'string' ? s.trim() : '');

/** A finding is a strip figure only if it carries its own statistic and headline. Anything less is left in the body. */
export function toFigure(entry: ContentfulEmbeddedEntry | undefined | null): Figure | null {
  if (!entry) return null;
  const isFinding = entry.__typename === 'ResearchFinding' || Boolean(entry.findingHeadline || entry.statistic);
  if (!isFinding) return null;
  const statistic = clean(entry.statistic);
  const headline = clean(entry.findingHeadline);
  if (!statistic || !headline) return null;
  return {
    id: entry.sys?.id || `${statistic}-${headline}`,
    statistic,
    headline,
    description: clean(entry.description) || undefined,
    baseSample: clean(entry.baseSample) || undefined,
    sourceNote: clean(entry.sourceNote) || undefined,
  };
}

const isBlankParagraph = (n: RtNode) => n.nodeType === 'paragraph' && nodeText(n).trim() === '' && (n.content || []).every((c) => c.nodeType === 'text');

/**
 * Splits the leading embedded findings (consecutive top-level `embedded-entry-block` nodes at the very start of the
 * body, blank paragraphs between them ignored) off the body. At most MAX_FIGURES are taken; extraction stops at the
 * first node that is not a complete finding, which stays in the body (and renders there as a normal embed).
 */
export function splitLeadingFigures(
  document: Document | null | undefined,
  links: Links
): { figures: Figure[]; rest: RtNode[] } {
  const nodes = ((document?.content as unknown as RtNode[]) || []).slice();
  const entries = entryMap(links);
  const figures: Figure[] = [];
  let i = 0;
  while (i < nodes.length && figures.length < MAX_FIGURES) {
    const node = nodes[i];
    if (isBlankParagraph(node)) {
      i += 1;
      continue;
    }
    if (node.nodeType !== 'embedded-entry-block') break;
    const figure = toFigure(entries.get(node.data?.target?.sys?.id as string));
    if (!figure) break;
    figures.push(figure);
    i += 1;
  }
  if (figures.length === 0) return { figures: [], rest: nodes };
  return { figures, rest: nodes.slice(i) };
}

/* ----------------------------------------------------------- text shapes -- */

const textOnly = (n: RtNode) => (n.content || []).every((c) => c.nodeType === 'text');
const plain = (n: RtNode) => nodeText(n).replace(/\s+/g, ' ').trim();

/** "PUNE, INDIA — Text": an upper-case place line, a dash, then the sentence. The dateline text keeps its dash. */
export function parseDateline(paragraph: RtNode): { dateline: string; rest: string } | null {
  if (paragraph.nodeType !== 'paragraph' || !textOnly(paragraph)) return null;
  const m = /^([A-Z][A-Z .,'’-]{2,40}?\s[—–])\s+(\S[\s\S]*)$/.exec(plain(paragraph));
  return m ? { dateline: m[1], rest: m[2] } : null;
}

export type LedgerRow = { term: string; def: string };

/** A bullet list whose every item is one text-only paragraph reading "Label: text" (a short label, two or more items). */
export function parseLabelLedger(list: RtNode): LedgerRow[] | null {
  if (list.nodeType !== 'unordered-list') return null;
  const items = list.content || [];
  if (items.length < 2) return null;
  const rows: LedgerRow[] = [];
  for (const item of items) {
    const kids = item.content || [];
    if (kids.length !== 1 || kids[0].nodeType !== 'paragraph' || !textOnly(kids[0])) return null;
    const m = /^([^:.?!]{2,48}?):\s+(\S[\s\S]*)$/.exec(plain(kids[0]));
    if (!m || m[1].trim().split(/\s+/).length > 6) return null;
    rows.push({ term: m[1].trim(), def: m[2].trim() });
  }
  return rows;
}

export type QuoteBlock = { quote: string; name: string; role?: string };

const OPEN = /^["“]/;
const CLOSE = /["”]$/;
const DASH = /^[—–―-]\s*/;

/**
 * A chapter that is exactly one quoted paragraph followed by one "— Name, Role" paragraph. The outer quotation marks are
 * dropped (the blockquote and the decorative mark carry them); every word of the quotation is kept.
 */
export function parseQuoteChapter(nodes: RtNode[]): QuoteBlock | null {
  const body = nodes.filter((n) => !isBlankParagraph(n));
  if (body.length !== 2) return null;
  const [q, by] = body;
  if (q.nodeType !== 'paragraph' || by.nodeType !== 'paragraph' || !textOnly(q) || !textOnly(by)) return null;
  const quoted = plain(q);
  const attribution = plain(by);
  if (!OPEN.test(quoted) || !CLOSE.test(quoted) || quoted.length < 12 || !DASH.test(attribution)) return null;
  const who = attribution.replace(DASH, '').trim();
  if (!who) return null;
  const comma = who.indexOf(',');
  return {
    quote: quoted.replace(OPEN, '').replace(CLOSE, '').trim(),
    name: comma > 0 ? who.slice(0, comma).trim() : who,
    role: comma > 0 ? who.slice(comma + 1).trim() || undefined : undefined,
  };
}

/* --------------------------------------------------------- chapter kinds -- */

/* The word boundary closes the whole group, so "Methodist" and "About the researchers" are not method headings. */
const METHOD = /^(about the (research|study|methodology|audit)|methodology|methods?|limitations?|research methods?|how (we|the research|the study) (did|was done))\b/i;
export const isMethodHeading = (heading: string) => METHOD.test(heading.trim());
const BACK = /^(about (mapped ?skills|us|the company|the organi[sz]ation)|media (enquiries|contact|inquiries)|press (contact|enquiries|inquiries)|contact (us|details|information))\b/i;

export type ChapterKind = 'main' | 'quote' | 'method' | 'back';

/** `run` numbers each method section: consecutive method chapters share one; a quotation (or any other chapter) ends it. */
export type Classified = { chapter: Chapter; kind: ChapterKind; quote?: QuoteBlock; index: number; run?: number };

/**
 * Chapter kinds in document order. Consecutive method chapters form one method section (one `run`). A quotation chapter
 * ends the active section, so a method heading after it begins a separate section. After any other chapter ends a
 * section, a later method heading is plain prose again (the approved OD-3 fallback).
 */
export function classifyChapters(chapters: Chapter[]): Classified[] {
  let runDone = false; /* set once a non-quotation chapter has ended a method section */
  let inRun = false;
  let run = 0;
  return chapters.map((chapter, index) => {
    const heading = chapter.heading ? plain(chapter.heading) : '';
    if (heading) {
      const quote = parseQuoteChapter(chapter.nodes);
      if (quote) {
        inRun = false; /* a quotation closes the active method section; it does not forbid a later one */
        return { chapter, kind: 'quote', quote, index };
      }
      if (isMethodHeading(heading) && !runDone) {
        if (!inRun) run += 1;
        inRun = true;
        return { chapter, kind: 'method', index, run };
      }
      if (inRun) {
        runDone = true;
        inRun = false;
      }
      if (BACK.test(heading)) return { chapter, kind: 'back', index };
    }
    if (inRun) runDone = true;
    inRun = false;
    return { chapter, kind: 'main', index };
  });
}

/**
 * One id per H2 chapter heading and per top-level H3, in document order, from the production heading-slug rule
 * (`lib/contentful/heading-ids.ts`, the rule the live press page already used), made unique when a heading repeats.
 * Keyed by the node itself so the renderer needs no second pass; headings with no text get "section".
 */
export function assignHeadingIds(chapters: Chapter[]): Map<RtNode, string> {
  const allocate = createHeadingIdAllocator();
  const ids = new Map<RtNode, string>();
  for (const chapter of chapters) {
    if (chapter.heading) ids.set(chapter.heading, allocate(plain(chapter.heading)));
    for (const node of chapter.nodes) if (node.nodeType === 'heading-3') ids.set(node, allocate(plain(node)));
  }
  return ids;
}

export function chaptersOf(rest: RtNode[]): Chapter[] {
  return splitChapters({ nodeType: 'document', data: {}, content: rest } as unknown as Document);
}

/* ------------------------------------------- method chapter sub-structures -- */

/** "Read the full research report:" followed by a paragraph that holds only a link. */
export function isReadNextPair(a: RtNode | undefined, b: RtNode | undefined): boolean {
  if (!a || !b || a.nodeType !== 'paragraph' || b.nodeType !== 'paragraph' || !textOnly(a)) return false;
  if (!/:\s*$/.test(plain(a)) || plain(a).length > 80) return false;
  const kids = (b.content || []).filter((c) => !(c.nodeType === 'text' && !(c.value || '').trim()));
  return kids.length === 1 && kids[0].nodeType === 'hyperlink';
}

const LABEL_LINE = /^([A-Z][A-Za-z0-9 .&'’/-]{1,32}):\s+(\S[\s\S]{0,88})$/;

/** A short "Label: value" paragraph. At most one link, nothing else but text. */
export function labelLine(p: RtNode): { label: string; value: string } | null {
  if (p.nodeType !== 'paragraph') return null;
  const links = (p.content || []).filter((c) => c.nodeType === 'hyperlink').length;
  if ((p.content || []).some((c) => c.nodeType !== 'text' && c.nodeType !== 'hyperlink') || links > 1) return null;
  const m = LABEL_LINE.exec(plain(p));
  if (!m || m[1].trim().split(/\s+/).length > 4) return null;
  return { label: m[1].trim(), value: m[2].trim() };
}

const URL_VALUE = /^(https?:\/\/|www\.)\S+$/i;

/** Consecutive "Label: value" paragraphs from `start`: two or more, or a single one whose value is a link or address. */
export function colophonRun(nodes: RtNode[], start: number): number {
  let end = start;
  while (end < nodes.length && labelLine(nodes[end])) end += 1;
  const n = end - start;
  if (n >= 2) return n;
  if (n === 1) {
    const only = nodes[start];
    const hasLink = (only.content || []).some((c) => c.nodeType === 'hyperlink');
    return hasLink || URL_VALUE.test(labelLine(only)!.value) ? 1 : 0;
  }
  return 0;
}

/** The paragraph node with its "Label:" prefix removed from the first text run (links and later text kept). */
export function withoutLabel(p: RtNode): RtNode {
  const kids = (p.content || []).map((c) => ({ ...c }));
  const first = kids.find((c) => c.nodeType === 'text' && (c.value || '').trim());
  if (first) first.value = (first.value || '').replace(/^\s*[^:]*:\s*/, '');
  return { ...p, content: kids };
}

/**
 * Index of the limitations paragraph in a method chapter: the last plain paragraph before the first read-next pair or
 * "Label: value" run, when at least three plain paragraphs precede that block. It is a convention (limits come last),
 * not a wording match; if the shape differs, nothing is emphasised.
 */
export function limitIndex(nodes: RtNode[]): number {
  let stop = nodes.length;
  for (let i = 0; i < nodes.length; i += 1) {
    if (isReadNextPair(nodes[i], nodes[i + 1]) || colophonRun(nodes, i) > 0) {
      stop = i;
      break;
    }
  }
  const prose: number[] = [];
  for (let i = 0; i < stop; i += 1) if (nodes[i].nodeType === 'paragraph' && !isBlankParagraph(nodes[i])) prose.push(i);
  return prose.length >= 3 ? prose[prose.length - 1] : -1;
}

/** A statistic such as "66.7% vs 6.7%" is set smaller on one line. */
export function isPairStatistic(statistic: string): boolean {
  return /^.+?\s+vs\.?\s+.+$/i.test(statistic);
}

/* ------------------------------------------------- headline emphasis -- */

const STOP = new Set(['the', 'a', 'an', 'of', 'on', 'in', 'for', 'to', 'and', 'or', 'with', 'by', 'at', 'from', 'as', 'is', 'are', 'what', 'how', 'why', 'that', 'this', 'its', 'their']);

type Word = { text: string; key: string; start: number; end: number };

/** Words of a headline with their exact character offsets; surrounding punctuation is kept out of the word, inner punctuation ("42.5%") stays in. */
function words(text: string): Word[] {
  const out: Word[] = [];
  for (const m of text.matchAll(/\S+/g)) {
    const raw = m[0];
    const lead = raw.length - raw.replace(/^[^\p{L}\p{N}]+/u, '').length;
    const trimmed = raw.slice(lead).replace(/[^\p{L}\p{N}%]+$/u, '');
    if (!trimmed) continue;
    const start = (m.index ?? 0) + lead;
    out.push({ text: trimmed, key: trimmed.toLowerCase(), start, end: start + trimmed.length });
  }
  return out;
}

export type HeadlineSplit = { before: string; emphasis: string; after: string };

/**
 * The two-colour C+ headline (`.b-named`) for a press release, without guessing which words deserve emphasis and without a
 * new Contentful field. The emphasised phrase is the longest run of consecutive words the headline SHARES WITH ITS RELATED
 * RESEARCH REPORT'S TITLE (both written by the editor, so the overlap is the studied subject). A run qualifies only if it has
 * at least three words including two that are not stop-words, does not include the headline's first word, and covers at
 * most 70% of the headline. No qualifying run, or no related research, means no emphasis (the headline stays one colour).
 * The three parts are exact slices of the headline: concatenated they are the Contentful text, character for character.
 */
export function splitHeadlineEmphasis(headline: string, relatedTitle: string | undefined | null): HeadlineSplit | null {
  if (!headline || !relatedTitle) return null;
  const h = words(headline);
  const t = words(relatedTitle);
  if (h.length < 4 || t.length < 3) return null;
  let best: { from: number; len: number } | null = null;
  for (let i = 1; i < h.length; i += 1) {
    /* i starts at 1: the headline's first word is never part of the emphasis */
    for (let j = 0; j < t.length; j += 1) {
      let len = 0;
      while (i + len < h.length && j + len < t.length && h[i + len].key === t[j + len].key) len += 1;
      if (len >= 3 && (!best || len > best.len)) {
        const run = h.slice(i, i + len);
        if (run.filter((w) => !STOP.has(w.key)).length >= 2) best = { from: i, len };
      }
    }
  }
  if (!best) return null;
  const start = h[best.from].start;
  const end = h[best.from + best.len - 1].end;
  if ((end - start) / headline.length > 0.7) return null;
  return { before: headline.slice(0, start), emphasis: headline.slice(start, end), after: headline.slice(end) };
}
