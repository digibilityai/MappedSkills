import { MetadataRoute } from 'next';

/**
 * SESSION 33 — PHASE I — THE SINGLE AUTHORITATIVE ROBOTS IMPLEMENTATION.
 *
 * ---------------------------------------------------------------------------
 * THE TRAP THIS CLOSES, AND WHY THE TWO CHANGES HAD TO BE MADE TOGETHER.
 *
 * `public/robots.txt` existed alongside this route handler, and Phase A0
 * OBSERVED IN PRODUCTION that the static file wins: `GET /robots.txt` served
 * `public/robots.txt`, 681 bytes, with no `cache-control` and none of the
 * application's security headers. **This route handler has never been live.**
 *
 * That made the `GPTBot: disallow /` and `CCBot: disallow /` rules below into a
 * LATENT TRAP rather than a live policy — recorded as risk **R20**. Deleting the
 * static file as obvious tidy-up, on its own, would have silently switched on a
 * site-wide GPTBot and CCBot block as a side effect, and that block contradicts
 * the programme's AI-visibility objective.
 *
 * **So the static file is deleted and the GPTBot/CCBot rules are removed in the
 * same change.** Live crawler behaviour is unchanged; there is now one
 * implementation instead of two; and the trap is gone.
 *
 * ---------------------------------------------------------------------------
 * GPTBot AND CCBot REMAIN AN OPEN OWNER / PROGRAMME DECISION. THIS FILE DOES
 * NOT DECIDE IT.
 *
 * What is true today, and all that is true: neither agent is named in the
 * robots policy production serves, so both are permitted by `User-agent: *`.
 * That is the status quo, preserved deliberately, NOT an endorsement. Phase I
 * was told not to invent crawler policy and has not.
 *
 * When the owner decides, the change is one block appended to `rules`:
 *
 *     { userAgent: 'GPTBot', disallow: '/' },
 *     { userAgent: 'CCBot',  disallow: '/' },
 *
 * ---------------------------------------------------------------------------
 * WHAT WAS CARRIED OVER FROM THE STATIC FILE, AND WHAT WAS NOT.
 *
 * CARRIED — the three bad-bot blocks that are genuinely live: `MJ12bot`,
 * `AhrefsBot`, `SemrushBot`. And Bing's `Crawl-delay: 1`, which Bing honours.
 *
 * DROPPED, because each was a no-op:
 *   · `Crawl-delay: 0.1` on `*` and `Crawl-delay: 0` on Googlebot — Google
 *     ignores `Crawl-delay` entirely, and `0` asks for nothing.
 *   · A `Googlebot` group whose only content was `Allow: /`, which `*` already
 *     grants.
 *   · `Allow: /api/sitemap` and `Allow: /api/rss` — neither route exists in this
 *     application.
 *
 * ---------------------------------------------------------------------------
 * ONE DELIBERATE DELTA FROM LIVE, STATED RATHER THAN SMUGGLED IN.
 *
 * The static file's `Disallow: /admin/` and `Disallow: /api/` **were never in
 * force.** They appear after `User-agent: SemrushBot` with no new `User-agent:`
 * line before them, so robots.txt grouping rules attach them to SemrushBot —
 * which is already disallowed from everything, making them dead lines. The
 * author's intent is unambiguous, and it is honoured here for `*`.
 *
 * This affects NO content route. `/api/enquiry` is the only route under `/api`,
 * it accepts POST only, and **robots.txt governs crawling, not form
 * submission** — a visitor's browser posting the contact form is not a crawler
 * and is not affected. Phase A0 recorded that reasoning explicitly.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
        crawlDelay: 1,
      },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
