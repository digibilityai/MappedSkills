/**
 * RELEASE GATE FOR THE FINAL COPY OF CLASSPE, INSURYO AND AMEBA SOFTWARE (DEC-117).
 *
 * These three studies are live with their earlier Contentful copy. Their new artwork, card copy, dashboard and (for Ameba Software) figures are
 * code-resident, so they must appear ONLY together with the approved final copy. The gate is therefore the content itself, not a build switch:
 * a study is "final copy" when its published title, summary, problem, what-we-did, impact and evidence note ALL equal the approved final text (compared
 * by one fingerprint over the six fields, so the copy is not duplicated in the production bundle and a single outdated field keeps the gate closed). Before the Contentful entry is updated the gate is closed and the page is exactly what it is today (the old proof
 * stays withheld); once the entry is published with the approved copy the gate opens by itself. The code can therefore be deployed before or after
 * the Contentful update with no window in which old proof, new artwork or unevidenced figures are shown. No environment variable is involved, so
 * the preview switches stay off in production and the browser bundle (the /work filter builds cards in the browser) agrees with the server.
 *
 * Wanderlooms and the paid batch are new entries: they are inert until their Contentful entries exist, so they need no gate.
 * The fingerprints are pinned by `tests/case-study-final-four.test.cjs` against the approved final summaries.
 */
/** The copy fields that must ALL be the approved final ones before the final artwork, card copy and figures are used. */
export type CopyFields = {
  title?: string | null;
  summary?: string | null;
  problem?: unknown;
  whatWeDid?: unknown;
  impact?: unknown;
  evidenceNote?: string | null;
};

/** Text of a rich-text document (or a plain string) as node types and text only: marks, node data and empty data objects are ignored, so the
 *  same document fingerprints the same whether it comes from the GraphQL API, the management API or the code-resident preview. */
const flat = (n: unknown): string => {
  if (n == null) return '';
  if (typeof n === 'string') return n;
  const o = n as { json?: unknown; nodeType?: string; value?: string; content?: unknown[] };
  if (o.json) return flat(o.json);
  if (o.nodeType === 'text') return String(o.value ?? '');
  return `<${o.nodeType ?? ''}>${(o.content ?? []).map(flat).join('')}</>`;
};

const hash = (text: string): string => {
  const s = text.normalize('NFC').replace(/\s+/g, ' ').trim();
  // cyrb53: small, dependency-free, identical on the server and in the browser; a fingerprint, not a security measure
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
};

/** One fingerprint over title, summary, problem, what we did, impact and evidence note. Any one of them differing changes it. */
export const copyFingerprint = (c: CopyFields | null | undefined): string =>
  hash(['title', 'summary', 'problem', 'whatWeDid', 'impact', 'evidenceNote'].map((k) => `${k}:${flat((c as Record<string, unknown> | null | undefined)?.[k]).replace(/\s+/g, ' ').trim()}`).join('\u241e'));

/** route slug (no `portfolio/` prefix) -> fingerprint of the approved final copy (six fields) */
export const FINAL_COPY_FINGERPRINTS: Readonly<Record<string, string>> = {
  'classpe-social-media-strategy': 'kenmk6rbg1',
  'insuryo-organic-growth': '13d7j7tqubw',
  'seo-ameba-software': '26xqhjf1vfu',
};

const route = (slug: string | null | undefined) => (slug ?? '').replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');

/** True when this study's published copy (all six fields) is the approved final copy. False for any other study and for any earlier or partly updated copy. */
export function hasFinalCopy(slug: string | null | undefined, copy: CopyFields | null | undefined): boolean {
  const want = FINAL_COPY_FINGERPRINTS[route(slug)];
  return !!want && !!copy && copyFingerprint(copy) === want;
}

/** The six copy fields of a mapped case study (its title and its new-layout content), as the gate reads them. */
export const studyCopy = (study: { title?: string | null; newLayout?: Omit<CopyFields, 'title'> | null }): CopyFields => ({ title: study.title, ...(study.newLayout ?? {}) });
