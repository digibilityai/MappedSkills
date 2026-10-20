# /blog · G1 Static Mockup (2026-10-20)

> **OWNER APPROVAL — 2026-10-20:** "BL-G1 approved as shown. Hold G2 implementation until I authorise it."
> G1 design and copy are approved as shown. **G2 (implementation) is NOT authorised.** BL-D6 remains open.
>
> **Later (2026-10-20):** G2 was authorised, implemented and approved; recorded in **DEC-066**. Report: `../g2/BL_G2_REPORT.md`.
> The screenshots referenced below are kept outside Git (only `screenshots/checks.json` is committed).

> **OWNER APPROVAL (input to this G1), 2026-10-20:** "BL-D1 approved: build the G1 static mockup for R1–R7 as proposed.
> Copy decisions BL-D2 to BL-D5 as proposed. No production change."

**Status:** static review mockup only. No production source, Contentful entry, metadata or data changed. Nothing committed,
pushed or deployed. This is **not** a recorded DEC entry; the decision log is unchanged until the owner authorises a
documentation change.

- Mockup: `mockup/index.html` (open in a browser; `?banner=0` hides the review banner; `?empty=1` shows the empty state).
- Source: `mockup/src/body.html`, `mockup/src/bl.css` (all rules `bl-` scoped), `mockup/src/bl.js` (review flags only).
- Header, footer and base styles: the live C+ chrome and stylesheet, as used by the approved FAQ G1 kit (captured from the live site on 17 Oct 2026; `tools/live-chrome.json`, `mockup/vendor/`).
- Rebuild and re-check: `node tools/build.cjs`, then `node tools/capture.cjs`.
- Screenshots: `screenshots/` at 1440, 1280, 768, 375, 320 (`*-fold`, `*-full`, `*-row-hover`, `*-row-focus`), `desktop-1440-empty-full.png`; results in `screenshots/checks.json`.
- Audit and proposal this follows: `../audit/BL_AUDIT_AND_PROPOSAL.md`.

## 1. What the mockup covers (R1–R7)

| # | Item | In the mockup |
|---|---|---|
| R1 | Accurate hero lede | "Practical reads on search, ads, content and turning website visits into enquiries — for business owners deciding what to do next." (BL-D2). The meta description (BL-D3) is not visible in a mockup; it is listed in §4. |
| R2 | Hover and focus | Hover (150 ms): row background → ground, padding 4 → 12 px, title underline → tangerine, arrow box fills ink. Focus: 3 px tangerine outline. |
| R3 | One close | Shared C+ close band (tangerine, as `/faq`): "Reading about a problem you have?" / "Tell us what's happening with your marketing. If we're not the right fit, we'll say so." / **Tell us about your business** → `/contact`, **Request a call** → `/schedule-call` (BL-D5). |
| R4 | C+ shell | `px-wrap` container, breadcrumb "Home / Blog", kicker "Blog", the `/faq` hero proportions. |
| R5 | Reading time | Row meta: category + "N min read"; date removed from rows (BL-D4). |
| R6 | List label | "7 guides" above the 3 px ink rule (count from data); floating "ARTICLES" removed. |
| R7 | H1 | "Marketing guides, **written plainly.**" (tangerine phrase) (BL-D2). |

Article titles, categories, excerpts, reading times, order and URLs are the **live Contentful data as served on 2026-10-20,
unchanged**. Their wording issues (audit CL3, BD2–BD4) are R11, outside this mockup, so the rows still read as they do live.

## 2. Layout as built

| Width | Rows | Meta | Action cue |
|---|---|---|---|
| Wide ≥1081 | 3 columns: meta 3fr · title + excerpt 8fr · 40 px arrow box | two lines (category / reading time) | arrow box |
| Medium 761–1080 | 3 columns: 2.6fr · 6fr · 40 px | two lines | arrow box |
| Narrow ≤760 | one column | one line, "CATEGORY · N MIN READ" | "Read →" (44 px tall) |

Page height at 1440: live 2,454 px → mockup 3,327 px (adds the close band and roomier rows).

## 3. Checks (VERIFIED FACT — Chromium, static mockup, emulated viewports)

From `screenshots/checks.json`:
- No horizontal overflow at 1440, 1280, 768, 375, 320. No text under 12 px. 0 console errors.
- Left edge aligns with the C+ page grid: list and H1 at 156 px at 1440 (same as live `/faq`); 16 px at 375/320. (Audit VD2 fixed.)
- Meta never wraps mid-item: two lines at ≥761 px, one line at ≤760 px, at every width. (Audit UX3 fixed.)
- Hover changes background, padding, underline colour and arrow box (computed styles differ from rest); keyboard focus shows a 3 px `rgb(255,91,4)` outline. (Audit UX1, UX2, AN1 fixed.)
- Reduced motion: transitions resolve to ~0 s (the live global rule; the `bl-` scoped rule matches the `/faq` pattern).
- Headings: H1 "Marketing guides, written plainly." → H2 "7 guides" → H2 close. One H1, no skipped levels.
- Row links: the 7 live `/blog/{slug}` URLs, unchanged, in live order.
- JavaScript off: all 7 rows render (JavaScript only handles the review flags).
- Empty state (`?empty=1`): list removed, lede "Nothing is published here yet." (live wording), close kept; no placeholder rows.
- Touch targets: every link ≥44 px except the breadcrumb "Home" (19 px), which is the shared C+ breadcrumb, identical on live `/faq`.

**Not done:** Firefox and WebKit, real devices, VoiceOver/TalkBack, a production build of the route. The fonts are the
live files; rendering in the shipping browsers may differ slightly.

## 4. For implementation later (not done; needs separate authorisation)

- `/blog` metadata description → "Practical guides on search, paid ads, content and turning website visits into enquiries, written for business owners." (BL-D3, approved as proposed). Title unchanged ("Writing | MappedSkills"), canonical, robots and URL unchanged.
- Implementation scope as in the audit §6: `app/(pages)/blog/page.tsx` + new `components/cplus/blog/` (`BlogBody.tsx`, `content.ts`, `blog.css`) + `tests/blog-page.test.cjs`. `EntryList`/`RouteHero` and every article component untouched. No new dependency, event or `data-*` hook.
- Heading ids for E6 (GTM): `bl-h1`, `bl-list-l`, `b-close-h` (new); the live page's H1/H2 had no ids that analytics reads (to re-verify at G2).

## 5. Corrections to the audit
- Audit §4.2 drew the close as "ink". The shared C+ close used by `/faq` is a **tangerine** band (`.px-h .b-close`); the mockup uses it unchanged, as `/faq` does.

## 6. Open items for the owner
| ID | Item |
|---|---|
| BL-G1 | Approve the mockup as shown, or list changes. |
| BL-D6 | Article hygiene (R10: remove the dead newsletter block; D4 "Request a call" relabel) and the content review (R11: city-page articles, "Book a Client Discovery Call (30 minutes)", excerpts, categories) — schedule or defer. |
| — | The em dash in the lede is kept as written in the approved copy. |

**Stopping here. Awaiting owner review of G1; no implementation.**
