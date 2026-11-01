import type { CmsResearchFinding } from '@/lib/contentful/types';

/**
 * Explicit evidence for the published findings that can be drawn (editorial batch, DEC-112).
 *
 * The counts below are written by hand from the recorded finding text; nothing is parsed out of prose. A chart is drawn
 * only when (1) the finding's recorded headline is the one listed here, (2) every `require` phrase is present in the
 * recorded description exactly as written, (3) the report's recorded sample size equals `total`, and (4) the counts agree
 * with the recorded percentage. If any check fails the finding stands as text, as before, and a warning is logged.
 */

export type Part = { count: number; label: string; kind: 'marked' | 'plain' | 'unknown' };
export type FieldSpec = { type: 'field'; total: number; parts: Part[]; require: string[] };
export type BarsSpec = { type: 'bars'; unit: '%'; rows: Array<{ label: string; value: number }>; require: string[]; sampleNote: string };
export type EvidenceSpec = FieldSpec | BarsSpec;

export const EVIDENCE: Record<string, EvidenceSpec> = {
  'More than 4 in 10 audited websites had no observable Google Analytics.': {
    type: 'field',
    total: 120,
    parts: [
      { count: 51, label: 'Google Analytics not observed', kind: 'marked' },
      { count: 67, label: 'Google Analytics observed', kind: 'plain' },
      { count: 2, label: 'unable to determine', kind: 'unknown' },
    ],
    require: ['not observed on 51 (42.5%)', 'observable on 67 (55.8%)', 'Two websites were classified as Unable to Determine'],
  },
  'Meta Pixel was observable on just over one-third of audited websites.': {
    type: 'field',
    total: 120,
    parts: [
      { count: 43, label: 'Meta Pixel observed', kind: 'marked' },
      { count: 77, label: 'the other websites audited', kind: 'plain' },
    ],
    require: ['Meta Pixel was observable on 43'],
  },
  'Google Ads-related measurement was observable on fewer than 3 in 10 websites.': {
    type: 'field',
    total: 120,
    parts: [
      { count: 33, label: 'Google Ads-related measurement observed', kind: 'marked' },
      { count: 87, label: 'the other websites audited', kind: 'plain' },
    ],
    require: ['Google Ads-related measurement was observable on 33'],
  },
  'Almost all audited websites preserved the UTM parameters used during testing.': {
    type: 'field',
    total: 120,
    parts: [
      { count: 117, label: 'preserved the UTM parameters', kind: 'marked' },
      { count: 3, label: 'the other websites audited', kind: 'plain' },
    ],
    require: ['117 preserved the UTM parameters'],
  },
  'Observable Meta Pixel presence varied sharply across sectors.': {
    type: 'bars',
    unit: '%',
    rows: [
      { label: 'Fashion', value: 66.7 },
      { label: 'Jewellery', value: 60 },
      { label: 'Technology', value: 10 },
      { label: 'Manufacturing', value: 6.7 },
    ],
    require: ['Fashion 66.7%', 'Jewellery 60%', 'Technology 10%', 'Manufacturing 6.7%'],
    sampleNote: 'Each sector is 30 websites.',
  },
};

const pct = (n: number, total: number) => Math.round((n / total) * 1000) / 10;
const norm = (s: string | undefined) => (s ?? '').replace(/\s+/g, ' ');

/** The explicit spec for a finding, only if it validates against the recorded text, sample and percentage. Otherwise null. */
export function validatedEvidence(finding: CmsResearchFinding | undefined, sampleSize: number | undefined): EvidenceSpec | null {
  if (!finding) return null;
  const spec = EVIDENCE[finding.headline];
  if (!spec) return null;
  const text = norm(finding.description);
  const fail = (why: string) => {
    console.warn(`[research-evidence] "${finding.headline.slice(0, 48)}": chart not drawn (${why}).`);
    return null;
  };
  if (!spec.require.every((p) => text.includes(p))) return fail('recorded text no longer states the counts');
  if (spec.type === 'field') {
    if (sampleSize !== spec.total) return fail('recorded sample size differs');
    if (spec.parts.reduce((a, p) => a + p.count, 0) !== spec.total) return fail('counts do not add up');
    const marked = spec.parts.find((p) => p.kind === 'marked');
    if (!marked || `${pct(marked.count, spec.total)}%` !== (finding.statistic ?? '').trim()) return fail('recorded percentage differs');
    return spec;
  }
  const stat = (finding.statistic ?? '').replace(/\s/g, '');
  const hi = Math.max(...spec.rows.map((r) => r.value));
  const lo = Math.min(...spec.rows.map((r) => r.value));
  if (stat !== `${hi}%vs${lo}%`) return fail('recorded statistic differs');
  if (!norm(finding.baseSample).includes('30')) return fail('recorded sample note differs');
  return spec;
}
