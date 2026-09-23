/**
 * INTERNAL-LINK DETECTION FOR CMS RICH TEXT.
 *
 * Authority: `docs/14-qa/link-audit-2026-09-19/LINK_ROUTING_OWNER_REVIEW.md`
 * — BLOG-012 and WORK-005, authorized for implementation under GATE R2.
 *
 * THE POLICY. Internal links open in the SAME tab, with no `target` and no
 * `rel`. Genuine external links open in a new tab with
 * `rel="noopener noreferrer"`.
 *
 * WHAT WAS WRONG. Both rich-text renderers decided this with
 * `href.startsWith('http')`. Contentful authors write absolute URLs, so
 * `https://mappedskills.com/seo` counted as external and opened a new tab.
 * The audit found 38 such placements across four articles. Spawning a tab for
 * an internal hop breaks the back button and fragments the session, which is
 * the behaviour BLOG-012 exists to stop.
 *
 * WHY A SHARED MODULE. The blog renderer and the case-study renderer carried
 * byte-identical logic. Fixing it in two places invites the two from drifting
 * apart the next time either is touched, so the rule lives once, here.
 *
 * SCOPE. This decides `target`/`rel` only. It does NOT rewrite hrefs, strip
 * hosts, resolve redirects or change any destination — those are separate
 * decisions applied in Contentful, not in the renderer.
 */

/** Hosts that are this site. `www.` is included because authors use both. */
const INTERNAL_HOSTS: ReadonlySet<string> = new Set([
  'mappedskills.com',
  'www.mappedskills.com',
]);

/**
 * True when `href` points at this site and must therefore open in the same tab.
 *
 * Covers root-relative (`/seo`), fragment (`#section`) and query-only (`?p=1`)
 * hrefs, plus absolute URLs on a known internal host. Anything else — another
 * domain, `mailto:`, `tel:` — is treated as external.
 *
 * A malformed absolute URL is treated as EXTERNAL: that is the safer default,
 * because an external link wrongly opened in the same tab is a worse outcome
 * than an internal one wrongly opened in a new tab.
 */
export function isInternalHref(href: string | null | undefined): boolean {
  if (!href) return false;

  const trimmed = href.trim();
  if (trimmed === '') return false;

  // Root-relative, fragment and query-only links are always internal.
  // `//example.com` is protocol-relative and is NOT internal, so it is excluded.
  if (trimmed.startsWith('#') || trimmed.startsWith('?')) return true;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;

  try {
    const { protocol, hostname } = new URL(trimmed);
    if (protocol !== 'http:' && protocol !== 'https:') return false;
    return INTERNAL_HOSTS.has(hostname.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * The anchor attributes a rich-text hyperlink should carry under BLOG-012 /
 * WORK-005. Internal links get neither attribute; external links get both.
 */
export function linkTargetProps(href: string | null | undefined): {
  target?: '_blank';
  rel?: 'noopener noreferrer';
} {
  return isInternalHref(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' };
}
