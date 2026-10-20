# /pricing G2: implementation report

**Status: G2 IMPLEMENTED AND VERIFIED LOCALLY; METADATA PROPOSAL APPROVED AND APPLIED (owner, 2026-10-18: "Approved: keep the G1 H1 and apply the proposed title and description for /pricing. Still no commit, push or deploy.").** Branch `feat/pricing-g2` (worktree `../MappedSkills-pricing-g2`) from `origin/main` `74dca3e`. **Local commit authorised (owner, "Pricing Page | G2 Commit Authorization", 2026-10-18); not pushed, merged or deployed.** The approved title and description from §4 are applied in `app/(pages)/pricing/page.tsx`.

## What was implemented
The approved G1 R0 design (`../g1/mockup/`, `../g1/PR_G1_NOTES.md`, `DEC-061`) as a server component with **no client JavaScript**:
1. hero, "The right work. A price that makes sense.", with the numberless price tag;
2. "Three things shape the quote.", three factors on one less-to-more axis;
3. "One plan, with only what you need.", optional vs standard work, the proposal contents, ad spend vs fee;
4. "Three steps, and you decide.";
5. the tangerine close, "Know what you're paying for."

The CSS is the mockup's `pr.css`, ported unchanged except for three selector adaptations (review banner rule dropped; icon strokes on `.pr-gl`; `.is-fixrow` instead of `:has()`). It reuses the shared C+ classes, `Breadcrumb`, `ActionPair` and `CplusPage`. Micro-interactions are 150 ms and off under reduced motion.

## Files changed
| File | Change |
|---|---|
| `components/cplus/pricing/PricingBody.tsx` | Rewritten: the G1 R0 page |
| `components/cplus/pricing/content.ts` | Rewritten: the approved copy |
| `components/cplus/pricing/pricing.css` | Rewritten: ported from the mockup (`pr-` classes) |
| `components/cplus/pricing/icons.tsx` | New: page-local line icons |
| `app/(pages)/pricing/page.tsx` | **Title and description** (owner-approved, §4) plus the comment |
| `docs/00-project/DECISION_LOG.md` | `DEC-061` appended |
| `docs/pricing-redesign/` | `README.md`; G1 notes, mockup and tools; G2 report, `tools/verify.cjs`, `checks.json`. **No screenshots** (kept in the main checkout, `docs/pricing-redesign/g1/screenshots/` and `g2/screenshots/`, untracked). |

No shared component, other page, dependency or configuration changed.

## Verification (local production build, `next start` on 127.0.0.1:3211; Chromium, playwright-core; `checks.json`)
| Check | Result |
|---|---|
| Typecheck, lint (`eslint .`) | pass, pass |
| Unit tests | 141 pass, 0 fail, 1 skipped |
| `next build`, `verify:build`, `build:cpanel` | pass, OK, pass |
| Fidelity against the G1 mockup | **every section height identical** at 1440, 1280, 820, 390 and 320; `<main>` text identical (381 words) |
| Layout | no horizontal overflow at any width; no text under 12 px; one H1, no skipped heading levels; HTTP 200; 0 console errors; 0 failed requests |
| CTAs | hero "Discuss your requirements" → `/contact`, close "Get a proposal" → `/contact`, "Book a call" → `/schedule-call` (both); primary CTA on the first screen at every width |
| Keyboard | Tab order in `<main>`: the four CTAs, each with a visible focus indicator; no other controls |
| Reduced motion / no JavaScript | transitions off, 0 running animations; complete without JavaScript (5 sections, 381 words, nothing hidden) |
| Head | new title, description, og:title/description and twitter:title served; canonical `https://mappedskills.com/pricing`, robots `index, follow` and JSON-LD (`Organization` only) unchanged |
| Sibling pages | `/`, `/services`, `/how-it-works`, `/seo`, `/google-ads`, `/social-media-ads`, `/ai-seo`, `/conversion-optimization`, `/lead-generation`, `/about`, `/faq`, `/contact`, `/schedule-call`: head and `<main>` text identical to live (13/13) |

Rebuilt and re-verified after the metadata change (typecheck, lint, 141 tests, `next build`, `verify:build`, and the full `verify.cjs` run). `build:cpanel` passed on the first build and was not rerun. **Not done:** manual screen reader, Firefox/WebKit, real devices, GTM Preview, Core Web Vitals.

## 4. H1 and metadata (APPROVED and applied, 2026-10-18)
The current title and description describe the old page ("the horizon before anything changes, the six factors… who this is not for") and no longer match it.

| | Live (before) | Approved and applied on the branch |
|---|---|---|
| H1 | (G2 already uses the approved G1 H1) "The right work. A price that makes sense." | **Keep as approved.** The word "Pricing" sits in the breadcrumb and kicker above it, and the title carries the search term. |
| Title | What This Costs, and What Changes the Number \| MappedSkills | **Pricing \| Tailored Digital Marketing Quotes \| MappedSkills** (58 characters) |
| Description | What you are buying, the horizon before anything changes, the six factors that actually move the number, and who this is not for. A real number comes from scope. | **Every MappedSkills quote is tailored to your business. See what affects your price, what your fee covers and how to get a clear proposal before work begins.** (156 characters) |

Open Graph and Twitter follow the title and description through `createMetadata`; URL, canonical, robots and JSON-LD stay unchanged. Keyword demand for these phrases is **RESEARCH REQUIRED** (no search data was used).

**Alternative H1, only if you want the keyword in it:** "Pricing: the right work, at a price that makes sense." Not recommended: it weakens the approved two-line headline.
