# /faq · G2 Implementation Report (2026-10-20)

**Status:** implemented and verified locally on `feat/faq-g1` (worktree `../MappedSkills-faq-g1`, base `origin/main` `07e76e9`). Recorded in `DEC-063`. **Not pushed, no PR, not merged, not deployed.**

- Local preview: `faq-g2-prod` launch config → http://127.0.0.1:3213/faq (`next start` on the cPanel build).
- Checks: `checks.json` (from `node tools/verify.cjs`). Screenshots: `screenshots/` (kept outside Git, as for earlier pages).

## Files changed

| File | Change |
|---|---|
| `app/(pages)/faq/page.tsx` | FAQPage built with `plainAnswer(qa)`; metadata unchanged |
| `components/cplus/faq/faqData.ts` | New: 5 categories, 14 questions, live ids kept; replaces `faqData.tsx` (deleted) |
| `components/cplus/faq/content.ts` | Hero, start section and close copy |
| `components/cplus/faq/FaqBody.tsx` | New page body (server component) |
| `components/cplus/faq/FaqTools.tsx` | Class names only (`faq-*`); behaviour unchanged |
| `components/cplus/faq/faq.css` | Replaced; every rule scoped to `faq-` |
| `tests/faq-page.test.cjs` | New guard tests (8) |
| `docs/00-project/DECISION_LOG.md` | `DEC-063` appended |
| `docs/faq-redesign/` | G1 notes, mockup and tools; this report, `checks.json`, `tools/verify.cjs` |

No shared component, shared stylesheet or other route changed.

## Verification (run 2026-10-20)

- `npm run typecheck` pass · `npm run lint` pass · `npm test` 157 pass, 0 fail, 1 skipped (pre-existing) · `npm run build:cpanel` pass (BUILD_ID `1Cb8gfgLaApPNtcwYy89k`) · `npm run verify:build` pass (23 prerendered pages). `verify:build:production` (needs the GTM env) not run.
- **G2 vs approved G1 mockup**, Chromium, 1440 / 1280 / 768 / 375 / 320: section heights identical, visible text identical with every answer open, page height identical; no horizontal overflow; no text under 12 px; no console errors.
- Metadata: title, description and canonical unchanged; H1 as approved.
- FAQPage: 14 entries; names and answer texts equal to the visible questions and answers (related links excluded).
- Accordions: closed on load; Enter opens, Space closes; 3 px tangerine focus ring; "Open all answers" toggles all 14 and announces it. No JavaScript: disclosures work, the tools button is hidden.
- Deep links: `#q-what-is-the-minimum-commitment` and `#q-who-is-this-for-and-who-is-it-not-for` open and scroll to the question; `#g-outcome` and `#g-ai-search` land on their categories; category links scroll correctly.
- 150 ms transitions; reduced motion removes transitions and the answer fade. Forced colours: plus/minus stays visible.
- CTAs: "Tell us about your business" → `/contact`, "Request a call" → `/schedule-call`.
- `faq.css` is not loaded on `/`, `/ai-seo`, `/how-it-works`, `/google-ads`, `/pricing` or `/contact` (all 200).

## Differences from the G1 mockup

None in layout or copy. Implementation-only: class prefix `fx-` → `faq-` (collision with `/google-ads`); review banner and “New” markers not shipped; the open-all button is shown by the existing `px-js` rule rather than the mockup’s `hidden` attribute; forced-colours rule added for the plus/minus (parity with the shared `.fq-pm`). The FQ-D3 answer uses the site’s curly apostrophe (“We’ll”).

## Remaining risks

- Not done: VoiceOver/TalkBack, Firefox/WebKit, real devices, GTM Preview (E6).
- `FAQPage` content changed (wording and three new questions): rich-result appearance may change; not measurable before release.
- Live title/description still read “Questions We Get Asked, Answered Plainly” and no longer echo the H1 (kept by decision, FQ-D6).
- `DEC-063` is appended at the end of `DECISION_LOG.md`; open docs PRs #21/#23 also append there, so a textual merge conflict is likely (keep both).
- The header and footer still say “Book a call” (DEC-062 D4, separate change).
