import { excerptFromDocument } from '@/lib/contentful/case-study-sections';
import { getCaseStudyService } from '@/lib/case-study-services';
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
import { SERVICE_GROUPS, type NavGroup } from '@/components/direction-c/nav';
import type { CmsCaseStudy } from '@/lib/contentful/types';

/**
 * The `/work` view of a published case study, read only from fields Contentful already returns for the listing
 * query (no new fields, no extra request). Nothing is paraphrased:
 * - client: the first part of the Client field (the rest, usually the location, is `detail`); the title if empty;
 * - challenge: the opening sentence(s) of the Problem Statement only. Business Goals, Results, Before & After and
 *   the review are never read here, so withheld proof (`lib/case-study-proof.ts`, DEC-031) cannot reach the page.
 *   A study on the new template (simplified G6, `layout: 'new'`) has no legacy sections: its challenge is the opening
 *   sentence(s) of its editor-approved `newLayout.summary`, nothing else. A legacy study never reads that field, even
 *   if an editor fills it in Contentful, so the three legacy studies render exactly as before;
 * - blockers / changed: the Challenges and Services Provided headings (legacy template only; empty, and therefore
 *   not shown, for a new-template study);
 * - service and stage: the study's explicit Contentful service classification (G7, one of the six current services),
 *   or for the three legacy studies their owner-approved service (WORK-027, `lib/case-study-services.ts`), and its
 *   stage in the site navigation. A study with no service shows neither; nothing is inferred or substituted;
 * - sector and period (G7): optional editor metadata, validated in `lib/case-study-library.ts`;
 * - search: the normalised text the library search matches (client, industry, sector, service, title, challenge).
 */
export type WorkStudy = {
  slug: string;
  href: string;
  client: string;
  detail: string;
  industry: string;
  service: string | null;
  stage: NavGroup['stage'] | null;
  challenge: string;
  blockers: string[];
  changed: string[];
  sector: SectorKey | null;
  serviceKey: ServiceRoute | null;
  period: string;
  search: string;
};

const MAX_ITEMS = 4;

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
  const stage = service ? SERVICE_GROUPS.find((g) => g.links.some((l) => l.href === service.link))?.stage ?? null : null;
  const industry = study.industry.toLowerCase() === client.toLowerCase() ? '' : study.industry;
  const challenge = sentences(
    study.layout === 'new' && study.newLayout
      ? study.newLayout.summary
      : excerptFromDocument(study.sections.problemStatement, 10_000),
    challengeSentences
  );
  const sector = study.library.sector;
  const serviceKey = service ? service.link : null;

  return {
    slug: study.slug,
    href: study.href,
    client,
    detail: rest.join(', '),
    industry,
    service: service?.title ?? null,
    stage: stage === 'Measure' ? null : stage,
    challenge,
    blockers: (study.sections.challenges ?? []).map((c) => tidy(c.title)).filter(Boolean).slice(0, MAX_ITEMS),
    changed: (study.sections.servicesProvided ?? []).map((c) => tidy(c.title)).filter(Boolean).slice(0, MAX_ITEMS),
    sector,
    serviceKey,
    period: study.library.period,
    search: normalise(
      [client, rest.join(' '), study.title, study.industry, sector ? SECTORS[sector] : '', serviceKey ? SERVICE_FILTERS[serviceKey] : '', service?.title ?? '', challenge].join(' ')
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
