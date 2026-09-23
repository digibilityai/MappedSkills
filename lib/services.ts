/**
 * THE APPROVED SERVICE SET, AS LINK TARGETS.
 *
 * Authority: `docs/14-qa/link-audit-2026-09-19/LINK_ROUTING_OWNER_REVIEW.md`
 * — the approved service architecture. Six routes, no others:
 * `/seo` · `/ai-seo` · `/google-ads` · `/social-media-ads` ·
 * `/conversion-optimization` · `/lead-generation`.
 *
 * WHY THIS EXISTS. Under GATE R2 two separate features need to point at an
 * approved service — the blog related-services block (BLOG-007/008) and the
 * case-study related-service link (WORK-027). Giving each its own literals
 * would let them drift apart and would make it possible to add a service that
 * is not in the approved set. Here the set is closed by the `ServiceKey` type,
 * so an unapproved route cannot be referenced without a type error.
 *
 * WHERE THE DESCRIPTIONS COME FROM. Verbatim from the live header dropdown
 * (`components/layout/Header.tsx`), which is already published wording. They
 * are NOT rewritten here, and no capability claim is introduced. This matters:
 * the previous blog `SERVICE_MAP` described paid social as "Expert Meta,
 * LinkedIn, and TikTok campaign management", which asserts channels beyond the
 * approved architecture — §0.15 records that MappedSkills does not offer
 * social media management. §12.7 excludes paid-social capability wording from
 * routing work, so that description is dropped rather than carried over.
 *
 * KNOWN DUPLICATION. The header and footer still hold their own copies of
 * these labels. Unifying all three is a content/structure change, not routing,
 * and is deliberately NOT done under R2. Recorded for the content phase.
 */

export type ServiceKey =
  | '/seo'
  | '/ai-seo'
  | '/google-ads'
  | '/social-media-ads'
  | '/conversion-optimization'
  | '/lead-generation';

export type ServiceCard = {
  title: string;
  description: string;
  /** Root-relative, so it is internal by construction (BLOG-012/WORK-005). */
  link: ServiceKey;
};

export const SERVICES: Readonly<Record<ServiceKey, ServiceCard>> = {
  '/seo': {
    title: 'SEO',
    description: 'Rank for high-intent keywords and grow organic visibility.',
    link: '/seo',
  },
  '/ai-seo': {
    title: 'AI Search',
    description: 'What AI answers are assembled from.',
    link: '/ai-seo',
  },
  '/google-ads': {
    title: 'Google Ads',
    description: 'High-intent campaigns that drive leads and sales.',
    link: '/google-ads',
  },
  '/social-media-ads': {
    title: 'Social Media Ads',
    description: 'Facebook and Instagram ads for leads, sales, and retargeting.',
    link: '/social-media-ads',
  },
  '/conversion-optimization': {
    title: 'Conversion Optimization',
    description: 'Turn more visitors into leads and customers.',
    link: '/conversion-optimization',
  },
  '/lead-generation': {
    title: 'Lead Generation',
    description: 'Build a qualified enquiry pipeline.',
    link: '/lead-generation',
  },
};

/** Resolve approved service keys to cards, preserving the given order. */
export function serviceCards(keys: readonly ServiceKey[]): ServiceCard[] {
  return keys.map((key) => SERVICES[key]);
}
