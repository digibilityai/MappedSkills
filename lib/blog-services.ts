/**
 * PER-ARTICLE RELATED SERVICES.
 *
 * Authority: `docs/14-qa/link-audit-2026-09-19/LINK_ROUTING_OWNER_REVIEW.md`
 * — BLOG-007 and BLOG-008, mapping OWNER-APPROVED in §15.2, authorized for
 * implementation under GATE R2.
 *
 * WHAT WAS WRONG. The related-services block was keyed on the Contentful
 * `category` field with a blanket fallback:
 *
 *     SERVICE_MAP[post.category] || SERVICE_MAP['Marketing Strategy']
 *
 * No Contentful category matched a key, so EVERY article fell through to the
 * same fallback and showed the same three cards — Google Ads, SEO and Lead
 * Generation — and the sidebar always showed Google Ads. An article about
 * content writing recommended Google Ads management.
 *
 * WHAT THIS IS. An explicit per-slug selection of genuinely related approved
 * services, exactly as approved. There is no fallback and no inference: an
 * article that is not listed here shows NO related-services block and NO
 * sidebar service, and nothing is substituted in their place. That is the
 * approved behaviour, not a degraded one — three of the seven live articles
 * are approved to omit the block entirely, because their subjects (content
 * marketing, email list building, content writing) are not approved services
 * and a card there would imply a service MappedSkills does not sell.
 *
 * THE SIDEBAR uses the FIRST entry of the selection, which in every approved
 * row is the sidebar service the owner named. Where the selection is empty the
 * sidebar renders nothing.
 *
 * SCOPE. Adding a slug requires an owner decision. `freelancing-in-india` is
 * deliberately absent: it is approved for unpublishing under GATE R3, and
 * listing it here would pre-empt that.
 */

import { serviceCards, type ServiceCard, type ServiceKey } from '@/lib/services';

/** Owner-approved selection, in the approved order. §15.2. */
const ARTICLE_SERVICES: Readonly<Record<string, readonly ServiceKey[]>> = {
  'seo-company-in-pune': ['/seo'],
  'facebook-advertising-agency-pune': ['/social-media-ads'],
  'performance-marketing-vs-digital-marketing': ['/google-ads', '/social-media-ads'],
  '7-proven-strategies-of-digital-marketing-for-real-estate-developers': [
    '/lead-generation',
    '/google-ads',
    '/seo',
  ],
  // Approved OMIT — no block, no sidebar service, nothing substituted:
  //   content-marketing-services-in-pune
  //   building-an-email-list
  //   importance-of-content-writing
};

/**
 * The approved related services for an article slug, in approved order.
 * Returns an empty array for an article with no approved selection, and for
 * any article not named in the decision.
 */
export function getRelatedServices(slug: string | null | undefined): ServiceCard[] {
  if (!slug) return [];
  const normalised = slug.replace(/^blog\//i, '').replace(/^\/+|\/+$/g, '');
  const keys = ARTICLE_SERVICES[normalised];
  return keys ? serviceCards(keys) : [];
}
