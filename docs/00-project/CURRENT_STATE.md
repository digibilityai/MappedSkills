# Current Project State

## Current Phase
**Session 01 + 01B Completed — Awaiting Orchestrator Review (Quality Gate 1)**

A read-only audit of the existing website/codebase was completed on 2026-08-31 on branch `test_branch` at HEAD `566d3e3`, followed by a narrowly scoped **live production verification pass (Session 01B)** on the same date. Artifacts are listed below. Quality Gate 1 has **not** been independently approved by Claude; it awaits orchestrator and owner review. Claude's recommendation is recorded in the Session 01B handoff.

## Production Website
**OWNER-SUPPLIED FACT:** the production website visitors use is **`https://mappedskills.com`**.

**VERIFIED FACT (live, 2026-08-31):** corroborated in production — the homepage canonical is `https://mappedskills.com/` and all 15 sitemap URLs use that host. `http://` redirects to `https://` (301) and HSTS is present. The `ms.mappedskills.com` reference in `doc/cpanel-deploy.md` is a repository/deployment artifact requiring explanation later, **not** an open question about the canonical production site.

**VERIFIED FACT (live):** the production edge is `Server: LiteSpeed` with HTTP/2 and HTTP/3, running Next.js behind it. Server-side ISR is functioning.

## Current Working Business Direction
**WORKING HYPOTHESIS:**
MappedSkills may reposition around:
1. AI + Search Visibility
2. Conversion Rate Optimisation
3. Marketing Automation

Working journey:
**GET FOUND → CONVERT → AUTOMATE → GROW**

## Current Positioning Territory
**WORKING HYPOTHESIS:**
Potential messaging territory includes:
- “Get Found. Convert More. Automate Growth.”
- “Search Visibility → CRO → Marketing Automation.”
- AI + Search Visibility as the likely spearhead acquisition category.
- CRO and Marketing Automation as expansion/value-multiplier services.

This requires market and search validation.

## Current Site Facts
**OWNER-SUPPLIED FACTS:**
- MappedSkills has an existing website.
- Current stack includes Next.js and Node.
- Existing pages and functionality should not be casually restructured.
- The owner wants a major visual/UI/UX transformation while protecting existing functionality and SEO value.

## Current Program Operating Model
- ChatGPT acts as program architect/orchestrator/reviewer.
- Claude acts as the execution team through bounded specialist roles.
- The owner runs Claude prompts and returns outputs for review.
- Claude sessions should be changed deliberately to control context and token use.
- Repository documents are the durable source of truth.

## Session 01 / 01B Artifacts (created 2026-08-31)
- `docs/10-technical/CURRENT_CODEBASE_AUDIT.md`
- `docs/10-technical/CURRENT_ROUTE_INVENTORY.md`
- `docs/10-technical/CURRENT_INTEGRATIONS.md`
- `docs/10-technical/CURRENT_SEO_IMPLEMENTATION.md`
- `docs/00-project/handoffs/SESSION_01_CODEBASE_AUDIT.md` (updated with the 01B verification record)

**Audit method limitation (VERIFIED FACT):** the audit was static file inspection only. `node_modules/` was not installed and the session was instructed not to install packages, so **no build, no lint, and no test was run**, and no page was loaded in a browser. The audit therefore contains no performance, Core Web Vitals, ranking, traffic, or conversion figures — none were available and none were estimated.

**Session 01B method limitation (VERIFIED FACT):** live verification was deliberately minimal — a small number of `curl` requests plus one browser session against ten URLs. **No crawler, no Lighthouse, no load testing, no form submission, no booking, no hosting-panel or environment-variable access, and no Contentful access.** Production environment-variable states noted below are **INFERENCES from observed behaviour**, not panel readings. No performance, ranking, traffic, or conversion figure was gathered in 01B either.

## Critical Findings — Status After Live Verification (Session 01B)
Recorded as state facts. Repository evidence in `CURRENT_CODEBASE_AUDIT.md` §21; live production evidence in §0 of the same file.

**Reclassification summary:** C1 PARTIALLY VERIFIED · C2 **CONFIRMED** · C3 **CLEARED as a live risk** (downgraded to latent) · C4 **CONFIRMED** · C5 **CLEARED** · C6 PARTIALLY VERIFIED (downgraded to pre-launch blocker). One finding was **escalated**: no analytics of any kind is running in production.

1. **VERIFIED FACT — the site has no backend.** There is no `app/api/` directory and no route handler anywhere. `components/forms/ContactForm.tsx` simulates submission with `setTimeout`; `components/forms/BlogNewsletterForm.tsx` does the same; a third form on `/blog` has no submit handler. **VERIFIED FACT (live):** the production `/contact` form has **no `action` and no `method`**, no CAPTCHA and no consent checkbox. **`DELIVERY NOT VERIFIED`** — no test enquiry was submitted, and lead capture is not inferred from the success UI. **Owner must confirm whether enquiries have been arriving at `info@mappedskills.com`.**
2. **VERIFIED FACT (live) — CONFIRMED.** `Cache-Control: public, max-age=31536000, immutable` is served on production HTML: `/`, `/seo`, `/contact`, `/schedule-call`, `/blog`. `/sitemap.xml` correctly receives `max-age=3600, must-revalidate`, proving the `.xml` branch of the override matches while extensionless HTML routes do not. Server-side ISR works, but browsers and intermediary caches are told not to revalidate HTML for a year.
3. **VERIFIED FACT (live) — RESOLVED.** `public/robots.txt` is the file production serves (static, LiteSpeed-served, bypassing Next.js); `app/robots.ts` is inert dead code. **`GPTBot` and `CCBot` are NOT blocked in production, and no AI-crawler directive of any kind is live.** The charter conflict is therefore **not currently active**. Residual latent risk: deleting `public/robots.txt` would silently activate the Next.js route's site-wide GPTBot/CCBot block.
4. **RESOLVED.** Production is `https://mappedskills.com` (owner-confirmed, live-corroborated). Migration planning is no longer blocked on this. **Residual Medium issue:** `https://www.mappedskills.com` returns 200 rather than redirecting to the apex, so the site is reachable on two hostnames — mitigated by the `www` response self-canonicalising to the apex.
5. **VERIFIED FACT — the five service landing pages and `/portfolio/[slug]` emit no structured data at all.**
6. **VERIFIED FACT — no consent management exists** while GTM and Meta Pixel load unconditionally. The site's own privacy policy states a banner is required before launch.
7. **VERIFIED FACT — no tests, no ESLint configuration, and `typescript.ignoreBuildErrors: true`.** There is no automated safety net for a redesign.
8. **VERIFIED FACT (live) — CONFIRMED, and this is the current production state.** `/blog` returns HTTP 200 rendering **"No articles found"** with zero article links; `/work` shows zero case studies; `/sitemap.xml` contains **exactly 15 static URLs and no CMS URLs**; the three blog slugs hard-coded in the 404 page all return **404**. **The production site currently publishes no blog articles and no case studies.** **UNKNOWN:** whether the cause is missing/invalid Contentful credentials or an empty Contentful space — the observable outcome is identical.

9. **VERIFIED FACT (live) — NEW, escalated.** **No analytics of any kind is running in production.** `window.dataLayer`, `window.gtag` and `window.fbq` are all undefined in a real browser, there is no GTM `<noscript>` iframe, and `/contact` loads zero third-party scripts. **INFERENCE:** `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` are unset in production. Consequences: **no analytics baseline exists for this site**, there is no GTM container configuration to protect during migration, and — because no tracking actually fires — the consent-management gap is a **pre-launch blocker rather than a live compliance breach**.

10. **VERIFIED FACT (live) — NEW.** **There is no working conversion path on the production site.** `/schedule-call` loads the Calendly script but the inline widget container renders **empty (0 children, zero iframes on the page)**; a misplaced badge bar appears at the top of the viewport instead. The pre-hydration HTML shows the "Calendly booking link is not configured yet" fallback, which is what non-JS crawlers see. Combined with a contact form that transmits nothing, **neither documented conversion path currently functions.**

## Stack Facts Confirmed (supersedes the prior OWNER-SUPPLIED summary)
**VERIFIED FACT:** Next.js 16.2.6 App Router, React 19, TypeScript 5.7.3, Tailwind CSS v4 (CSS-first, no `tailwind.config.js`), shadcn/ui + Radix, Contentful GraphQL CMS, custom `server.cjs` Node server, deployed by GitHub Actions over SSH to cPanel/Phusion Passenger. 22 routes. No API routes, no middleware, no Server Actions.

## Next Intended Phase
1. Orchestrator and owner review of the Session 01 + 01B evidence against Quality Gate 1. Claude recommends **PASS** with two owner confirmations attached; see the 01B handoff. Claude has no authority to approve the gate.
2. Two owner confirmations that do not require a Claude session:
   - whether enquiries have been arriving at `info@mappedskills.com` (resolves C1 definitively);
   - whether the Contentful space contains published posts/case studies, or the production build is missing credentials (resolves the C4 cause).
3. No strategy, design, IA, or implementation phase should begin until Gate 1 is reviewed by the orchestrator.

## Open Items Explicitly Deferred (not gate-blocking)
Recorded so they are not lost, and judged safe to address during implementation rather than before strategy:
- `.htaccess` contents and host-level configuration review;
- why `www` is not normalised to the apex;
- cPanel environment-variable audit;
- Search Console verification status and property setup;
- Core Web Vitals and accessibility measurement;
- backlink inventory against the nine legacy redirect sources.

## Not Yet Approved
- Quality Gate 1 (existing site audit) — artifacts delivered, review pending;
- final positioning;
- final services;
- final homepage messaging;
- final sitemap;
- final keywords;
- final content plan;
- final industries;
- final pricing;
- final design direction;
- final technical migration plan.
