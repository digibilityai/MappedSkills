import { excerptFromDocument } from '@/lib/contentful/case-study-sections';
import { getCaseStudyService } from '@/lib/case-study-services';
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
 * - service and stage: the owner-approved service for the study (WORK-027, `lib/case-study-services.ts`) and its
 *   stage in the site navigation. A study with no approved service shows neither.
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
  const service = getCaseStudyService(study.slug);
  const stage = service ? SERVICE_GROUPS.find((g) => g.links.some((l) => l.href === service.link))?.stage ?? null : null;
  const industry = study.industry.toLowerCase() === client.toLowerCase() ? '' : study.industry;

  return {
    slug: study.slug,
    href: study.href,
    client,
    detail: rest.join(', '),
    industry,
    service: service?.title ?? null,
    stage: stage === 'Measure' ? null : stage,
    challenge: sentences(
      study.layout === 'new' && study.newLayout
        ? study.newLayout.summary
        : excerptFromDocument(study.sections.problemStatement, 10_000),
      challengeSentences
    ),
    blockers: (study.sections.challenges ?? []).map((c) => tidy(c.title)).filter(Boolean).slice(0, MAX_ITEMS),
    changed: (study.sections.servicesProvided ?? []).map((c) => tidy(c.title)).filter(Boolean).slice(0, MAX_ITEMS),
  };
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
