/**
 * Reading chapters for the report's "On this page" navigation (editorial batch, DEC-112). Navigation only: it groups the
 * report's existing headings, each keeping its own text and anchor, under at most five chapter names. Nothing is renamed
 * or removed. If the report does not look like this structure (fewer than three chapters match), no grouping is used and
 * the flat list stands.
 */
export type ContentsItem = { id: string; text: string; sub?: boolean };
export type ContentsGroup = { label: string; items: ContentsItem[] };

type Kind = 'start' | 'early' | 'late' | 'meaning' | 'method';

const finding = /^finding\s+(\d+)\b/i;

function kindOf(text: string): Kind | null {
  const t = text.trim();
  const f = finding.exec(t);
  if (f) return Number(f[1]) <= 3 ? 'early' : 'late';
  if (/^(key findings|executive summary|why we conducted)/i.test(t)) return 'start';
  if (/conversion measurement/i.test(t)) return 'late';
  if (/(mean\?|founders and ceos|^a note from)/i.test(t)) return 'meaning';
  if (/^(methodology|limitations|cite this report)/i.test(t)) return 'method';
  return null;
}

const nums = (items: ContentsItem[]) => items.map((i) => Number(finding.exec(i.text.trim())?.[1])).filter(Number.isFinite);
function findingsLabel(items: ContentsItem[], fallback: string) {
  const n = nums(items);
  if (!n.length) return fallback;
  const lo = Math.min(...n);
  const hi = Math.max(...n);
  return lo === hi ? `Finding ${lo}` : hi === lo + 1 ? `Findings ${lo} and ${hi}` : `Findings ${lo} to ${hi}`;
}

export function groupContents(items: ContentsItem[]): ContentsGroup[] | null {
  const order: Kind[] = ['start', 'early', 'late', 'meaning', 'method'];
  let current: Kind = 'start';
  const buckets = new Map<Kind, ContentsItem[]>();
  for (const item of items) {
    const k = kindOf(item.text);
    if (k && order.indexOf(k) >= order.indexOf(current)) current = k;
    (buckets.get(current) ?? buckets.set(current, []).get(current)!).push(item);
  }
  const used = order.filter((k) => buckets.get(k)?.length);
  if (used.length < 3) return null;
  const names: Record<Kind, (b: ContentsItem[]) => string> = {
    start: () => 'Summary and why',
    early: (b) => findingsLabel(b, 'Findings'),
    late: (b) => findingsLabel(b, 'More findings'),
    meaning: () => 'Meaning',
    method: () => 'Method and limits',
  };
  return used.map((k) => ({ label: names[k](buckets.get(k)!), items: buckets.get(k)! }));
}
