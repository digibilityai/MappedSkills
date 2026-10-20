/**
 * Third-party research shown in the homepage AI visibility chart. NOT research by MappedSkills.
 * Source: Reckona AI, "AI visibility by industry: our prompt-panel results across 10 Indian sectors" (page last updated
 * 14 October 2026). 210 selected Indian brands, 10 sectors, tested July–August 2026 on ChatGPT, Gemini and Perplexity.
 * Metric: brand not mentioned, unprompted, in any buyer-intent category answer in the panel. Counts verified against the
 * source on 2026-10-15; percentages are always computed from these counts, never hardcoded.
 */

export const REPORT = {
  source: 'Reckona AI',
  period: 'July–August 2026',
  url: 'https://reckonaai.com/resources/ai-visibility-by-industry-india-prompt-panel-data/',
  metric: 'Not mentioned in tested AI recommendations',
  limitation: 'Selected, well-known brands: not an estimate for all Indian businesses.',
} as const;

export type IndiaFilterKey = 'all' | 'manufacturing' | 'realEstate' | 'd2c' | 'other';

export interface IndiaFilter {
  key: IndiaFilterKey;
  label: string;
  notMentioned: number;
  total: number;
  /** Noun phrase used in explanatory text. */
  scope: string;
  note?: string;
}

/** Jewellery is intentionally absent: the study has no Jewellery sector and no comparable dataset has been approved. */
export const INDIA_FILTERS: readonly IndiaFilter[] = [
  { key: 'all', label: 'All sectors', notMentioned: 141, total: 210, scope: 'tested brands' },
  { key: 'manufacturing', label: 'Manufacturing', notMentioned: 18, total: 25, scope: 'manufacturing brands' },
  { key: 'realEstate', label: 'Real estate', notMentioned: 14, total: 20, scope: 'real estate developers' },
  { key: 'd2c', label: 'D2C', notMentioned: 16, total: 25, scope: 'D2C brands' },
  {
    key: 'other',
    label: 'Others',
    notMentioned: 93,
    total: 140,
    scope: 'brands in other sectors',
    note: 'Seven other sectors combined.',
  },
];

export function percent(notMentioned: number, total: number): number {
  return Math.round((notMentioned / total) * 100);
}
