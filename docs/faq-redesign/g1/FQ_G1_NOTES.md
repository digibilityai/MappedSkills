# /faq · G1 Visual Design & Copy Proposal (2026-10-20)

> **OWNER APPROVAL — 2026-10-20.** “FAQ G1 approved as shown. FQ-D2 to FQ-D5 as proposed.” That covers FQ-D1
> (approved as shown), the three new questions (FQ-D2), the “Request a call” label (FQ-D4) and the em dash as written
> (FQ-D5). **Open:** FQ-D3 (minimum term) and FQ-D7 (§4 statements); the owner will answer them separately. FQ-D6
> (title/description) is unchanged in G1.
>
> **G2 (2026-10-20, owner "FAQ Redesign | G2 Implementation"):** FQ-D3 answered verbatim and FQ-D7 qualifications given;
> both applied to `mockup/src/body.html` (the reference) and to production. Recorded in **DEC-063**. Report: `../g2/FQ_G2_REPORT.md`.

**Status:** G1 mockup only, approved by the owner (see above). No production source changed. Nothing committed, pushed or deployed.
Worktree `../MappedSkills-faq-g1`, branch `feat/faq-g1` from `origin/main` @ `07e76e9` (uncommitted).

- Mockup: `mockup/index.html` (launch config `faq-g1-mockup`, port 3204). `?banner=0` hides the review banner and the
  “New” markers; `?open=all` opens every answer.
- Screenshots: `screenshots/` at 1440, 1280, 768, 375 and 320 px (`*-fold`, `*-full`, `*-full-open`, `*-group-open`);
  live baseline in `screenshots/live/`; checks in `screenshots/checks.json`.
- Rebuild: `node tools/build.cjs`, then `node tools/capture.cjs`. Header and footer are the live C+ chrome (captured 17 Oct 2026).

> **Brief note:** the pasted brief was cut off in Section C (“Inc…”). Anything after that (likely the close and the
> deliverables) was not received. The close below follows the CTA rules given in §3 of the brief.

## 1. Page structure

| | Section | Live today | Proposed |
|---|---|---|---|
| A | Hero | H1 “Questions we get asked, answered plainly.”, side quote, full 11-question index (desktop) | H1 “Before we work together, you should know.”, one lede, five category links with counts |
| B | FAQ groups | 5 groups (Commercial, Outcome, Measurement, Fit, AI search), alternating bands | 5 categories (Pricing, Results, Measurement, Working together, AI search) on one paper band, heading left / accordion right |
| C | How it starts | 6-step flow + “every month: a report and a review call” | 3 stages + “Monthly report: Standard / Review calls: When agreed” |
| — | “Something not answered here” | Separate section | Removed; its links (`/how-it-works`, `/pricing`) now sit in the answers and in C |
| D | Close | “The awkward ones get the same answer either way.” | “Ask us. You’ll get a straight answer.” |

Page height at 1440 (all closed): 5,974 px live → 4,356 px proposed.

## 2. Proposed copy

**Hero** — Kicker: Questions, answered plainly · H1: Before we work together, **you should know.** · Lede: How we work,
what it costs, what to expect—and what we won’t promise. · Jump to: Pricing 3 · Results 3 · Measurement 2 · Working together 4 · AI search 2

**Answers** lead with a bold direct answer, then the explanation (full text in `mockup/src/body.html`).

| Category | Question (proposed) | Live question it replaces | Status |
|---|---|---|---|
| Pricing | How much does it cost? | What does this cost, and what changes that number? | Rewritten to DEC-061’s three factors |
| Pricing | Is the ad budget part of your fee? | — | **New** (DEC-061 item 3) |
| Pricing | Is there a minimum commitment? | What is the minimum commitment? | Rewritten (see C3) |
| Results | Can you guarantee results? | Why won’t you guarantee results? | Uses DEC-061’s approved line |
| Results | What are you responsible for? | What are you accountable for, and what will you not promise? | DEC-005 wording kept |
| Results | How long before we see a difference? | How long before anything changes? | Shortened |
| Measurement | How do you know where an enquiry came from? | How do you know an enquiry came from your work, and what can’t you tell? | Shortened |
| Measurement | What counts as a qualified enquiry? | What counts as a qualified enquiry here, and who decides? | Rewritten (see C4) |
| Working together | Are we a good fit for MappedSkills? | Who is this for, and who is it not for? | Shortened |
| Working together | Do we have to start with a call? | — | **New** (DEC-060, DEC-062) |
| Working together | How will we know how it’s going? | — | **New** (monthly report standard; review calls when agreed) |
| Working together | What access do you need, and what do we keep? | (was Measurement) | Moved, shortened |
| AI search | Can you get our business into ChatGPT and AI answers? | same | Rewritten (see C1) |
| AI search | Is GEO or AEO different from SEO? | Is GEO or AEO a separate discipline from SEO? | Shortened |

**C. How working together starts** — Three steps. **You decide.** · Nothing starts until you’ve seen the plan and approved it.
1 Tell us the problem — By form, email or WhatsApp. A call is there if you’d rather talk, not required.
2 We review the situation — We look at what’s working and what isn’t, then share our findings, a recommended plan and a proposal.
3 Agree on next steps — You decide. Work starts only after you approve the scope and the fee.
Once the work starts: Monthly performance report — Standard · Review calls — When agreed · See the full process → `/how-it-works`

**D. Close** — Still have a question? · Ask us. **You’ll get a straight answer.** · Tell us what’s going on in your
business. If we’re not the right fit, we’ll say so. · Primary “Tell us about your business” → `/contact` · Secondary “Request a call” → `/schedule-call`

## 3. Outdated claims and contradictions found in the live /faq

| # | Live copy | Conflicts with | Proposed fix |
|---|---|---|---|
| C1 | AI answer: “28 unbranded runs across **four systems** … from Pune … directory sources appeared in **15** of those runs” | DEC-054 preserved record on `/ai-seo`: 28 questions, **five** AI tools, “one location”, directories cited in **at least 10** of 28. DEC-060 removed the self-test from `/about`. | Drop the figures from the FAQ; point to the full dated record on `/ai-seo` |
| C2 | “Every month: a performance report and a review call.” | DEC-057 item 4, DEC-058 HW-D01, DEC-060, DEC-061: review calls only where agreed | Report standard, review calls when agreed |
| C3 | Six-step flow starting “Discovery call”; close “Book a call” | DEC-060 (no mandatory call), DEC-062 (no booking; request a call) | Call optional; “Request a call” label |
| C4 | “The published definition” link to `/lead-generation` | DEC-057 LG-D29 (that definition no longer exists there) | Link removed; definition kept in the answer |
| C5 | Price factors list (scope, demand sources, site complexity, measurement, content, competitiveness) | DEC-061’s three approved factors | Uses the three factors |
| C6 | “Minimum commitment” answer never states a term | DEC-051 (no contract terms may be stated) | Says there is no standard term to quote; see FQ-D3 |

## 4. Statements kept from the live page but not re-confirmed by a recent decision

Flagged so the owner can confirm or cut them; none are new claims.
- “If you share your own sales figures, we can report through to revenue” (live Outcome answer).
- “Often weeks” for paid search; “often days” to fix a broken enquiry form (live: “weeks”, “days”).
- “The accounts stay in your name and the data is yours” (live access answer).
- Qualified-enquiry exclusions (job applications, pitches, student requests). The live line “The system decides,
  automatically … five checks” and “stored and reported separately” are **removed**: DEC-057 says MappedSkills does not
  review client enquiries, so the automatic-check claim is UNKNOWN for client sites.

## 5. Owner decisions needed

- **FQ-D1** Approve the H1 and copy above (H1 change is an SEO change under DEC-051).
- **FQ-D2** Approve the three **new** questions. They change the `FAQPage` structured data (still generated from the same array as the visible questions).
- **FQ-D3** Is there any minimum term? If yes, the answer must state it; if no, approve the proposed wording.
- **FQ-D4** Secondary CTA label: “Request a call” (proposed, matches `/schedule-call`) vs “Book a call” (sitewide label until the separate D4 relabel).
- **FQ-D5** Lede punctuation: the brief’s em dash is kept as written; earlier pages removed long dashes (DEC-055 CO-D01). Alternative: “…what to expect, and what we won’t promise.”
- **FQ-D6** Title/description: unchanged in G1. Live title “Questions We Get Asked, Answered Plainly” no longer matches the H1; a proposal can follow at G2. Keyword demand not researched (RESEARCH REQUIRED).
- **FQ-D7** Confirm the §4 statements.

## 6. Technical notes for G2 (not implemented)

- Every live question id (`q-…`) is kept on its question even where the wording changes; the five live group ids
  (`g-commercial`, `g-outcome`, `g-measurement`, `g-fit`, `g-ai-search`) survive as anchors inside the new categories.
  New category ids: `pricing`, `results`, `measurement`, `working-together`, `ai-search`. No internal links to `/faq#…` exist in the repo.
- Native `<details>`, closed on load, no-JS operable; “Open all answers” and hash-opening behave as the live `FaqTools`.
- Heading ids change (`fq-h1` → `fx-h1`, etc.); no analytics code reads them (to be re-checked with `rg` at G2; E6 GTM check open).
- No search, filter, chatbot, backend or new analytics events.

## 7. Checks run (Chromium, mockup on disk)

- 1440 / 1280 / 768 / 375 / 320: no horizontal overflow (closed and all-open), no text under 12 px, no console errors.
- One H1, H2 per category, H3s only in section C; no skipped levels.
- Answer measure ≤ 639 px (~64ch), line-height 1.65.
- Keyboard: Enter opens, Space closes, focus ring 3 px tangerine. All answers closed on load. Open-all toggles label and announces status.
- Deep links: `#q-what-is-the-minimum-commitment` opens and scrolls to the question; `#g-outcome` lands on Results; category links scroll correctly. All 16 live ids present.
- No JavaScript: disclosures open; the open-all button stays hidden.
- 150 ms transitions; with reduced motion, transitions and the answer fade are off.
- **Not verified:** Safari/Firefox, real devices, screen readers.
