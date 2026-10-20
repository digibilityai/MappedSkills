# Logo correction — G1 approval gate (artwork + sizing)

- **Status:** **G1 APPROVED by the owner on 2026-10-20 (`DEC-069`).** G2 (production implementation) is NOT authorised and is on hold until the owner authorises it.
- **Prepared:** 2026-10-20.
- **Scope of this session:** local proposal only. No production code, `public/` asset, CSS, commit, push or deploy was changed.
- **Review page:** [`proposal/REVIEW.html`](proposal/REVIEW.html) (self-contained; open it in a browser).
- **Artwork:** [`proposal/`](proposal/) — `mappedskills-{lockup,wordmark}-{light,dark}-bg.svg`.
- **Generator:** [`proposal/tools/gen-logo.cjs`](proposal/tools/gen-logo.cjs). Regenerate with
  `node docs/logo-redesign/proposal/tools/gen-logo.cjs . docs/logo-redesign/proposal`. The tagline font file lives in `.next/static/media`, so it needs a local `.next` build to be present.

## 1. Why
- **OWNER REQUIREMENT (2026-10-20):** The brand name is **MappedSkills**. The production logo reads “MappedSkill”, which is an error in the artwork.
- **VERIFIED FACT:** The missing “s” is in the source artwork, not caused by cropping:
  - In both production WebPs (555×144), the last glyph ends at x≈544, leaving 11px of empty canvas after it.
  - The older 500×500 PNG masters (commit `de16f5c`) also end in “Skill”, with 58px of margin.
  - Commit `ef34657` imported the lockup describing it as `"apped" + "Skill"`.
- **VERIFIED FACT:** The tagline is about 2–3px tall at the live header sizes, so it cannot be read. No SVG, wordmark-only or tagline-free version existed anywhere in the repo or its history.
- **VERIFIED FACT (live, measured 2026-10-20):** Below 380px the header logo renders at **24px**, not the intended 22px. In `app/direction-c.css`, the `max-width:379px` rule (line 277) comes before the `max-width:599px` block (line 280), and the later rule overrides it at the same specificity. So the 22px rule has no effect today.

## 2. What the owner is asked to approve (G1)
| # | Item | Proposal |
|---|---|---|
| A1 | Name in the artwork | “MappedSkills”: “apped” in ink, “Skills” in tangerine. The M mark is unchanged in concept. |
| A2 | Typeface | **Bricolage Grotesque ExtraBold, opsz 96**, the site’s display face. Already accepted in principle by the owner on 2026-10-20 (“Bricolage is fine”). |
| A3 | Tagline (lockup only) | “TURN DEMAND INTO OPPORTUNITY” in **Manrope Bold** caps, tracked to the width of the wordmark (0.47em), the same way as the original. |
| A4 | M mark | A vector redraw of the current mark. Every row is within about 1px of the production raster. Colours kept: mark `#FF5F24`, “Skills” `#FD5C03`, ink `#232323`, `#FAFAFA` on dark. |
| A5 | Two variants | **Lockup** (with tagline) for uses ≥44px tall: OG images, print, About. **Wordmark-only** (no tagline) for the header and footer. |
| A6 | Header sizes | Wordmark height **28px** at ≥600px, **24px** at 360–599px, **19px** below 360px. |

### Legibility at the proposed sizes (x-height = the height of lowercase letters on screen)
| Viewport | Current logo | Proposed wordmark |
|---|---|---|
| ≥600px | 28px tall → x-height 9.9px, 108px wide | 28px → x-height **12.8px**, 154px wide |
| 360–599px | 24px → 8.5px, 92.5px wide | 24px → **10.9px**, 132px wide |
| <360px | 24px (22px rule has no effect) → 8.5px | 19px → **8.7px**, 104.5px wide |

The x-height is equal to or larger than today at every width, and the name is now correct.

## 3. Header fit evidence
These results come from simulating the change in a local browser pane on the live site. The SVG was injected client-side and nothing was deployed.
- **VERIFIED FACT:** The free space for the logo was measured from the live DOM:

  | Viewport | Free space | Proposed width |
  |---|---|---|
  | 320 | 111.6px | 104.5 |
  | 340 | 131.6px | 104.5 |
  | 360 | 151.6px | 132 |
  | 375 | 166.6px | 132 |
  | 390 | 162.6px | 132 |
  | 600 | 171.9px | 154 |

  At ≥1200 the nav keeps 83px of slack, compared with 129px today.
- **VERIFIED FACT:** With the proposed sizes, no header row wraps and there is no horizontal scroll at 320, 340, 360, 375, 600 or 1200px. Screenshots are in `proposal/screenshots/`.
- **VERIFIED FACT:** At 320px with 200% root text, the header wraps with both the current and the proposed logo. This is the header’s documented behaviour (`direction-c.css` comment on `.dc-bar`), so the change adds no regression.
- **WORKING HYPOTHESIS:** 24px is too wide for 340–359px (it would need 132px against 131.6px free). That is why the small breakpoint is 360px, not 380px.
- **Not tested:** real devices, Safari/Firefox rendering of the SVG, forced-colours mode, and the legacy `Header`/`Footer` (rollback-only routes).

## 4. Implementation plan — G2 (NOT authorised by G1; needs its own go-ahead)
1. Add `mappedskills-wordmark-{light,dark}-bg.svg` and `mappedskills-lockup-{light,dark}-bg.svg` to `public/`. Keep the old WebPs in place for rollback and for the docs mockups that vendor them.
2. `lib/metadata.ts`: point `logoPath` and `logoPathOnDark` at the wordmark SVGs.
3. `components/Logo.tsx`: set the intrinsic size to the wordmark’s 616×112 (5.5:1) so the space reserved before load stays correct, avoiding layout shift. Alt text stays “MappedSkills Logo” (to be confirmed).
   **VERIFIED FACT:** `next.config` sets `images.unoptimized: true`, so `next/image` serves the SVG as-is without `dangerouslyAllowSVG`.
4. `app/direction-c.css`: replace the header logo rules with 28 / 24 / 19px at ≥600 / 360–599 / <360. This also fixes the rule-order bug. Footer (`SiteFooter`, `h-7`) stays at 28px.
5. Structured data (`lib/schema.ts:81,199`, `blog/[slug]/page.tsx:121`) uses `logoPath` today. **RESEARCH REQUIRED:** confirm which formats Google accepts for an Organization `logo`. Until then, give schema a PNG exported from the approved lockup instead of the SVG.
6. Verify: build, header and footer at the widths above, dark footer, CLS/LCP on the home page, and a forced-colours check. Then go through the normal release gate (DEC-061 deploy process).

## 5. Risks and open questions
- **Brand change:** The letterforms change from the old unidentified face to Bricolage. Anywhere the old artwork is used (social profiles, Google Business Profile, invoices, decks) will read “MappedSkill” until it is replaced. That replacement is outside this repo. **UNKNOWN:** where else the old artwork is used.
- **Favicon / `ms_icon.webp`:** this is the mark only, with no text, so it is unaffected.
- **The redrawn mark** is close to the original but is not the designer’s master. If an original vector of the mark exists, it should replace the redraw. **UNKNOWN:** whether one exists.
- **Tooling note:** Next’s bundled fontkit cannot instance variable WOFF2 fonts as shipped. The generator patches this so the weights are exact (see the comments in the generator). This only affects how the drafts are produced, not the site.

## 6. Draft decision-log entry (superseded by the recorded `DEC-069`)
> **DEC-069 (as drafted; the recorded text is in DECISION_LOG) — Corrected MappedSkills logo artwork and header sizing (G1).**
> The owner ruled (2026-10-20) that the logo must read “MappedSkills”; the production artwork reading “MappedSkill” is an error.
> Approved: the vector lockup and wordmark in `docs/logo-redesign/proposal/` (Bricolage Grotesque ExtraBold opsz 96; Manrope Bold tagline; redrawn M mark; existing colours); wordmark-only in header/footer at 28 / 24 / 19px (≥600 / 360–599 / <360).
> Not approved: any production change (G2), schema logo format, off-site brand assets.
> *(Number assigned at merge time; DEC-068 is the latest on `main` as of 2026-10-20.)*
