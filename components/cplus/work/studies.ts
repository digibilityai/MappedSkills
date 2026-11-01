import { excerptFromDocument } from '@/lib/contentful/case-study-sections';
import { getCaseStudyService } from '@/lib/case-study-services';
import { isCaseStudyProofWithheld } from '@/lib/case-study-proof';
import { hasFinalCopy, studyCopy } from '@/lib/case-study-release';
import { caseStudyStage } from '@/lib/case-study-stage';
import { plainStatements, splitImpact } from '@/lib/case-study-outcomes';
import { SERVICES } from '@/lib/services';
import {
  PAGE_SIZE,
  SECTORS,
  SERVICE_FILTERS,
  normalise,
  pageCount,
  pageSlice,
  type SectorKey,
  type ServiceRoute,
} from '@/lib/case-study-library';
import type { CmsCaseStudy } from '@/lib/contentful/types';

/**
 * The `/work` view of a published case study, read only from fields Contentful already returns for the listing
 * query (no new fields, no extra request). Nothing is paraphrased:
 * - title: the study's own title, whitespace-normalised;
 * - client: the first part of the Client field (the rest, usually the location, is `detail`); the title if empty;
 * - challenge: the opening sentence(s) of the Problem Statement only. Business Goals, Results, Before & After and
 *   the review are never read here, so withheld proof (`lib/case-study-proof.ts`, DEC-031) cannot reach the page.
 *   A study on the new template (simplified G6, `layout: 'new'`) has no legacy sections: its challenge is the opening
 *   sentence(s) of its editor-approved `newLayout.summary`, nothing else. A legacy study never reads that field, even
 *   if an editor fills it in Contentful, so the three legacy studies render exactly as before;
 * - changed: the Services Provided headings (legacy template only; empty, and therefore not shown, for a new-template
 *   study);
 * - outcomes / figures (new template only, presentation of the editor's own `impact` text; `lib/case-study-outcomes.ts`):
 *   up to three outcome statements that contain no digit, and how many figures the study states. A figure itself never
 *   reaches the listing, so no number can appear on a card without its metric, period and source;
 * - service and stage: the study's explicit Contentful service classification (G7, one of the six current services),
 *   or for the three legacy studies their owner-approved service (WORK-027, `lib/case-study-services.ts`), and its
 *   stage in the site navigation. A study with no service shows neither; nothing is inferred or substituted;
 * - sector and period (G7): optional editor metadata, validated in `lib/case-study-library.ts`;
 * - lead (R2, 31 October 2026): the study's own first outcome when it is a figure, exactly as the editor wrote it (the bold figure and
 *   the text after it, which carries the metric definition and the period), for the library card. Nothing is computed or reworded. It is
 *   `null` for a study without a figure first (the card then shows the short approved summary) and always `null` while the study's proof is
 *   withheld (`lib/case-study-proof.ts`), so withheld proof cannot reach a card;
 * - search: the normalised text the library search matches (client, industry, sector, service, title, challenge).
 */
export type WorkStudy = {
  slug: string;
  href: string;
  title: string;
  client: string;
  detail: string;
  industry: string;
  service: string | null;
  stage: 'Capture' | 'Convert' | null;
  challenge: string;
  changed: string[];
  outcomes: string[];
  figures: number;
  /** The lead figure and its definition and period, from the study's own outcome list; null when there is none or proof is withheld. */
  lead: { v: string; c: string } | null;
  sector: SectorKey | null;
  serviceKey: ServiceRoute | null;
  period: string;
  /** True when the published copy (title, summary, problem, what we did, impact, evidence note) is the approved final copy (`lib/case-study-release.ts`): the code-resident final artwork and copy may then be used. */
  finalCopy: boolean;
  search: string;
};

const MAX_ITEMS = 4;
const MAX_OUTCOMES = 3;

/** Only whitespace is normalised (Contentful text has spaces before some commas and full stops). */
const tidy = (s: string) => s.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();

function sentences(text: string, count: number): string {
  const parts = tidy(text).split(/(?<=[.!?])\s+(?=[A-Z“"])/);
  return parts.slice(0, count).join(' ');
}

export function toWorkStudy(study: CmsCaseStudy, challengeSentences: number): WorkStudy {
  const [first = '', ...rest] = study.clientName.split(',').map((s) => s.trim()).filter(Boolean);
  const client = first || study.title;
  const explicit = study.library.serviceKey;
  const service = explicit ? SERVICES[explicit] : getCaseStudyService(study.slug);
  // Historical case classification is independent of the current sales navigation.
  const stage = caseStudyStage(service?.link);
  const industry = study.industry.toLowerCase() === client.toLowerCase() ? '' : study.industry;
  const challenge = sentences(
    study.layout === 'new' && study.newLayout
      ? study.newLayout.summary
      : excerptFromDocument(study.sections.problemStatement, 10_000),
    challengeSentences
  );
  const split = study.layout === 'new' && study.newLayout ? splitImpact(study.newLayout.impact) : null;
  const outcomes = split ? plainStatements(split.outcomes).slice(0, MAX_OUTCOMES) : [];
  const sector = study.library.sector;
  const serviceKey = service ? service.link : null;
  const top = split?.outcomes[0];
  const lead = top && top.kind === 'figure' && top.context && !isCaseStudyProofWithheld(study.slug, studyCopy(study)) ? { v: top.lead, c: top.context } : null;
  const finalCopy = hasFinalCopy(study.slug, studyCopy(study));

  return {
    slug: study.slug,
    href: study.href,
    title: tidy(study.title),
    client,
    detail: rest.join(', '),
    industry,
    service: service?.title ?? null,
    stage,
    challenge,
    changed: (study.sections.servicesProvided ?? []).map((c) => tidy(c.title)).filter(Boolean).slice(0, MAX_ITEMS),
    outcomes,
    figures: split ? split.outcomes.filter((o) => o.kind === 'figure').length : 0,
    lead,
    sector,
    serviceKey,
    period: study.library.period,
    finalCopy,
    search: normalise(
      [client, rest.join(' '), study.title, study.industry, sector ? SECTORS[sector] : '', serviceKey ? SERVICE_FILTERS[serviceKey] : '', service?.title ?? '', challenge, ...outcomes].join(' ')
    ),
  };
}

/**
 * The library as one ordered list: the featured study first (the lowest listing priority if any study has one,
 * otherwise `featuredSlug`, otherwise the first), then the rest in library order. Page 1 shows the featured study and
 * the next eleven; `/work/index.json` holds the same list in the same order, so pages and search agree.
 */
export function libraryStudies(studies: CmsCaseStudy[], featuredSlug: string): WorkStudy[] {
  const featured =
    (studies.some((s) => s.library.listingOrder !== null) ? studies[0] : studies.find((s) => s.slug === featuredSlug)) ??
    studies[0];
  if (!featured) return [];
  return [toWorkStudy(featured, 2), ...studies.filter((s) => s !== featured).map((s) => toWorkStudy(s, 1))];
}

/** One server page of the library: the studies, the page count, and whether the first is the featured study. */
export function libraryPage(all: WorkStudy[], page: number) {
  return { items: pageSlice(all, page), page, pages: pageCount(all.length), total: all.length, pageSize: PAGE_SIZE };
}

/** The featured study and the rest, in Contentful order. Any number of studies; none is invented. */
export function splitStudies(studies: CmsCaseStudy[], featuredSlug: string) {
  const featured = studies.find((s) => s.slug === featuredSlug) ?? studies[0];
  if (!featured) return { featured: null, rest: [] };
  return {
    featured: toWorkStudy(featured, 2),
    rest: studies.filter((s) => s !== featured).map((s) => toWorkStudy(s, 1)),
  };
}
