# /about G2: implementation report

**Status: G2 APPROVED BY THE OWNER (2026-10-18: "G2 implementation for /about approved. Stop here; commit not yet authorised.").** Implemented and verified locally. Branch `feat/about-g2` (worktree `../MappedSkills-about-g2`) from `origin/main` `a6d75b7`. **Not committed, pushed, merged or deployed.** The brief's stop gate arrived truncated ("Authorized: G2 local i…"), so it was read as local implementation and verification only. **Release blocker:** the four team-head profiles are still placeholders, and the owner has said the page must not go public with them.

## What was implemented
The approved G1 design, frozen at R4 (`../g1/mockup/`, `../g1/AB_G1_NOTES.md`), as a server component with **no client JavaScript**. It has five sections:
1. the hero with "the bigger picture" drawn still;
2. "Your marketing should work together.", a still comparison;
3. "Four things we promise to do.", with the boundary and one line on guarantees;
4. "Meet the people leading the work.", four team-head cards;
5. the tangerine close with "What happens next".

The CSS is the mockup's `ab.css`, ported unchanged except for selectors adapted to the React markup. It reuses the shared C+ classes, `Breadcrumb`, `ActionPair` and `CplusPage`. Micro-interactions are 150 ms (photo frame and link underline), and they are switched off under reduced motion.

**Team placeholders:** `TEAM_HEADS` in `components/cplus/about/content.ts` holds four placeholder entries (`placeholder: true`, "[Name]", "[Role]", "[One sentence…]"). To replace one, fill in `name`, `role` and `intro`, add `photo: { src, alt }` (rendered with `next/image`, cropped to 4:5), and set `placeholder: false`. The visible "Placeholders…" tag disappears automatically once no entry is a placeholder.

## Files changed (worktree `MappedSkills-about-g2`)
| File | Change |
|---|---|
| `components/cplus/about/AboutBody.tsx` | Rewritten: the R4 page |
| `components/cplus/about/content.ts` | Rewritten: R4 copy plus `TEAM_HEADS` |
| `components/cplus/about/about.css` | Rewritten: ported from the R4 mockup (`ax-` classes) |
| `components/cplus/about/icons.tsx` | New: page-local line icons |
| `components/cplus/about/AccountFigure.tsx` | Deleted (the old figure; nothing else imported it) |
| `app/(pages)/about/page.tsx` | **Title and description** (owner G2 review wording) plus the comment |
| `docs/00-project/DECISION_LOG.md` | `DEC-060` appended |
| `docs/about-redesign/` | Lightweight records only (772 KB): G0, G1 (including the approved R4 mockup) and G2 report, tools and `checks.json`, plus a `README.md`. **No screenshots.** |

No shared component, other page, dependency or configuration changed.

## Verification (local production build, `next start` on 127.0.0.1:3210; Chromium, playwright-core)
| Check | Result |
|---|---|
| Typecheck, lint | pass, pass |
| Unit tests | 141 pass, 0 fail, 1 skipped |
| `next build`, `verify:build`, `build:cpanel` | pass, OK, pass |
| Visual fidelity against the R4 mockup | **every section's height identical to the pixel** at 1440, 1280, 820, 390 and 320; `<main>` text identical to the mockup (478 words) |
| Layouts | no horizontal overflow at 1440, 1280, 820, 390 or 320; no text under 12 px; one H1, no skipped heading levels |
| CTAs (hero and close) | "Tell us about your business" → `/contact`; "Book a call" → `/schedule-call`; in-body link → `/how-it-works`. Primary CTA on the first screen at every width. |
| Keyboard | Tab order in `<main>`: Contact, Book a call, See how the work runs, Contact, Book a call. Every one shows a visible focus indicator. There are no other controls. |
| Reduced motion | transitions 0, no running animations, no hidden sections |
| No JavaScript | page complete (478 words, 4 cards) |
| Errors | 0 console errors, 0 failed requests |
| Metadata | title "About MappedSkills \| Our Team & Approach"; description "Meet the team behind MappedSkills. Discover how we connect digital marketing services, turn interest into enquiries and measure what matters."; og/twitter title and description match; canonical and og:url `https://mappedskills.com/about`; robots `index, follow`; og:image unchanged; global `Organization` JSON-LD only |
| Other pages | 13 routes (`/`, `/services`, `/how-it-works`, `/seo`, `/google-ads`, `/social-media-ads`, `/ai-seo`, `/conversion-optimization`, `/lead-generation`, `/pricing`, `/faq`, `/contact`, `/schedule-call`): head and `<main>` text identical to live |

Raw results: `checks.json`. Re-run after the metadata change (2026-10-18), with identical results apart from the intended metadata change. The CTA destinations `/contact`, `/schedule-call` and `/how-it-works` return 200. Script: `tools/verify.cjs`.
**Not done:** manual screen reader, Firefox/WebKit, real devices, GTM Preview.

## Deviations from the approved design
None in layout or copy against G1 R4. The metadata now carries the owner's G2 review wording (not part of G1). The review-only mockup banner and flags are not carried over.

## Screenshot storage (owner G2 review decision)
All 115 review screenshots (G0, G1, R0 and G2) are kept **outside Git**, as for `/how-it-works` and `/lead-generation`:
- **Archive:** `AB_G0_G2_evidence_archive.zip`, stored uncompressed (18,444,656 bytes; SHA-256 `55f3271a…ebcea`), with `MANIFEST.sha256` inside it and alongside it. It was verified with 0 mismatches.
- **Location:** the owner's local MappedSkills checkout, `docs/about-redesign/`. The originals stay there too; nothing was deleted except duplicate copies in the branch worktree, each checked against its original first.

The branch keeps only the lightweight records (`docs/about-redesign/README.md` explains where the evidence is). The fresh G2 screenshots are in the main checkout's `docs/about-redesign/g2/screenshots/`. Because they were taken after the archive was made, they are not in it.

## Release blockers
1. Real profiles for the four team heads: photograph, name, role and one-sentence introduction each.
2. Written photo consent from each person shown.
3. Owner approval to commit, push, open a PR, merge and deploy (none authorised).

## R5 copy simplification (owner-directed, 2026-10-18; APPROVED as shown by the owner, 2026-10-18)
Copy only, in "Why we work this way" and "What you can count on us for" (`components/cplus/about/content.ts`; the second paragraph in `AboutBody.tsx` and its CSS rule are removed). Layout, other sections, the placeholders and the metadata are unchanged. Visible words: 478 → 371. Height: 4,967 → 4,892 px at 1440 and 6,745 → 6,258 px at 390. The checks re-ran with the same results: no overflow, CTAs correct, 0 errors, keyboard, reduced motion and no-JS all fine, and the 13 sibling pages are identical to live. Screenshots (outside Git): `g2/screenshots-r5/` in the main checkout.
**Wording that loosens earlier qualifiers, for owner awareness:** "Monthly reports show what's working…" drops "where tracking allows" and the review-call clause; "Managing your marketing." no longer limits the scope to the services you hire us for; "more enquiries" is stated as the goal, not a promise.

## Local preview
`http://127.0.0.1:3210/about` (launch config `about-g2-prod`, serving the cPanel build of `feat/about-g2`).
