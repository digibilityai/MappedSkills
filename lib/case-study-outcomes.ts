import type { Block, Document, Inline, Text } from '@contentful/rich-text-types';

/**
 * PRESENTATION ONLY. The case-study schema has no structured results field, and none is added. When an editor writes
 * the outcomes of a study as the first bulleted list in `impact`, with each item starting with a bold run, the page may
 * show that list as an outcome board. This module only RE-LAYS OUT the editor's own words:
 *
 * - nothing is computed, rounded, converted, summed or inferred, and nothing is classified as verified: a bold number
 *   is a figure the editor chose to emphasise, shown with everything the editor wrote after it (metric, period, source);
 * - a figure always travels with its full context; an item that has a figure but no context makes the extraction
 *   uncertain, and so does anything this module cannot reproduce exactly (links, nested content, a list that is too long
 *   or too short, an item that does not start with bold text). Then `null` is returned and `impact` is rendered as the
 *   ordinary rich text it is.
 */
export type Outcome = {
  /** `figure`: a bold lead that is a number (see `isFigure`). `statement`: any other bold lead (a documented outcome). */
  kind: 'figure' | 'statement';
  lead: string;
  context: string;
};

export type ImpactSplit = { outcomes: Outcome[]; before: Document; after: Document };

/** A board of more outcomes than this is a long list, not a showcase. */
export const MAX_OUTCOMES = 6;
/**
 * A figure is a bold lead that IS a number: optional sign or currency, digits, an optional unit (`%`, `×`, `x`, `k`, `m`,
 * `pp`, `pts`, `cr`, `lakh`), optionally a before → after pair. A year, a date, a count with words ("12 weeks", "Q3 2025",
 * "Top 3") or a sentence that merely contains a digit is a statement: shown as written, at statement size, never as a
 * headline figure and never on a listing.
 */
const NUM = String.raw`[+\-−–~≈<>≥≤]?\s*[₹$€£]?\s*\d[\d,.]*\s*(?:%|×|x|k|m|bn|pp|pts|cr|lakhs?)?`;
const FIGURE = new RegExp(String.raw`^${NUM}(?:\s*(?:→|->|to)\s*${NUM})?$`, 'i');
const YEAR = /^(?:19|20)\d{2}$/;
const isFigure = (lead: string) => FIGURE.test(lead) && !YEAR.test(lead) && lead.length <= 24;

/** Whitespace only. A leading sign (`-27%`, `−3 pts`) is part of the editor's figure and is never trimmed. */
const tidy = (s: string) => s.replace(/\s+/g, ' ').trim();
/** The editor's separator between the bold lead and its context (`: `, ` – `, ` - `), not a sign on the context itself. */
const separator = (s: string) => s.replace(/^\s*(:|[–—-]\s)\s*/, '');

/** The bold lead and the remaining plain text of one list item, or null when the item cannot be reproduced exactly. */
function parseItem(item: Block): { lead: string; context: string } | null {
  // exactly one paragraph made only of text runs: no links, no nested lists, no embedded entries
  if (item.content?.length !== 1 || item.content[0].nodeType !== 'paragraph') return null;
  const runs = ((item.content[0] as Block).content ?? []) as Array<Text | Inline>;
  if (!runs.length || runs.some((r) => r.nodeType !== 'text')) return null;
  const [first, ...rest] = runs as Text[];
  if (!first.marks?.some((m) => m.type === 'bold') || !first.value.trim()) return null;
  return { lead: tidy(first.value).replace(/[:.]$/, ''), context: tidy(separator(rest.map((r) => r.value).join(''))) };
}

export function splitImpact(impact: Document): ImpactSplit | null {
  const blocks = (impact?.content ?? []) as Block[];
  const at = blocks.findIndex((b) => b.nodeType === 'unordered-list');
  if (at < 0) return null;
  const items = blocks[at].content as Block[];
  if (items.length < 1 || items.length > MAX_OUTCOMES) return null;
  const parsed = items.map(parseItem);
  if (parsed.some((p) => !p)) return null;
  const outcomes = (parsed as Array<{ lead: string; context: string }>).map((p): Outcome => ({
    kind: isFigure(p.lead) ? 'figure' : 'statement',
    ...p,
  }));
  // A figure without its metric, period or source is not shown on its own: the whole extraction is uncertain.
  if (outcomes.some((o) => o.kind === 'figure' && !o.context)) return null;
  return {
    outcomes,
    before: { ...impact, content: blocks.slice(0, at) } as Document,
    after: { ...impact, content: blocks.slice(at + 1) } as Document,
  };
}

/** Statements that carry no digit at all: the only outcome text the listing may quote (no number ever reaches a card). */
export const plainStatements = (outcomes: readonly Outcome[]): string[] =>
  outcomes.filter((o) => o.kind === 'statement' && !/\d/.test(o.lead)).map((o) => o.lead);
