# Claude Session Handoff — Session 11: Page Copy Production

## Session
- **Session ID:** 11 — Page Copy Production
- **Date:** 2026-09-01
- **Model:** Claude Opus 5 (high effort)
- **Branch:** `test_branch`
- **Role:** Repository execution layer. The orchestrator remains the approval layer.
- **Purpose:** Produce the launch-page copy system from the approved strategy, search architecture, IA, CRO system, content strategy and messaging architecture already in the repository. **No strategy was restarted, no research was performed, no design was started, and no production code was changed.**

## Session objective
Turn fifteen approved messaging documents and eighteen approved page briefs into actual page copy — structured, evidence-classified, placeholder-marked, and auditable — for orchestrator review.

## Repository state at start
- Branch: `test_branch` — **confirmed.**
- `git status --porcelain`: `?? README.md` only — the pre-existing untracked root file, **not modified, not staged.**
- Session 10 commit `6b27d5d61216258d07a658af247e8e14764dbd8c` *"Define messaging architecture"* — **confirmed present as HEAD.**
- Gates 2, 5, 6, 7 and 8 passed (`DEC-005`–`DEC-013`). No contradiction with this prompt was found.

## Context read
**Project:** `CURRENT_STATE.md` · `DECISION_LOG.md` · `QUALITY_GATES.md` · `SESSION_HANDOFF_TEMPLATE.md` · `CLAUDE.md`.
**Business:** the frozen layer, via `CURRENT_STATE.md` and the messaging documents that carry it forward.
**Search:** `SEARCH_ARCHITECTURE.md` and the query-family rulings as carried into the briefs and the consistency matrix.
**AI visibility:** the Session 04 measurement as carried into `AI_SEARCH_LANGUAGE.md` and the claims ladder.
**Content:** `LAUNCH_CONTENT_INVENTORY.md` · `OWNER_INPUT_REGISTER.md`.
**IA:** `PAGE_INVENTORY.md` · `WEBSITE_INFORMATION_ARCHITECTURE.md`.
**CRO:** `QUALIFIED_ENQUIRY_DEFINITION.md` · `PAGE_TYPE_CRO_RULES.md` · `CTA_SYSTEM.md` · `FORM_AND_BOOKING_SPEC.md`.
**Messaging — all fifteen documents in `docs/08-messaging/`**, read in full.
**Briefs — all eighteen** in `docs/09-content-pages/briefs/`.
**Production source, read-only:** `app/layout.tsx`, `app/page.tsx`, the route inventory, and a repository-wide search for the prohibited claims. **Read to establish what must not migrate. Nothing was modified.**

## Routes covered

| Group | Routes | Outcome |
|---|---|---|
| **A — Homepage** | `/` | Drafted, with three H1 options compared and one recommended |
| **B — Commercial / capability** | `/services` `/seo` `/ai-seo` `/google-ads` `/social-media-ads` `/lead-generation` `/conversion-optimization` `/pricing` | Drafted |
| **C — Problem** | `/problems/traffic-but-no-enquiries` | Drafted, including a five-check diagnostic the reader can run unaided |
| **D — Support / trust / company** | `/how-it-works` `/research` `/blog` `/about` `/contact` `/schedule-call` `/faq` | Drafted, with blocked sections marked rather than filled |
| **E — Conditional / blocked** | `/industries/manufacturing` | **Copy deliberately not drafted** — see Unresolved Issues |

**17 copy files produced. 1 conditional record produced. Route counts unchanged: 22 unconditional indexable, 2 conditional, 5 non-indexable.**

## Copy statuses
- **FINAL-CANDIDATE (7):** `/services` · `/seo` · `/ai-seo` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/problems/traffic-but-no-enquiries`
- **PARTIALLY BLOCKED (7):** `/` · `/google-ads` · `/pricing` · `/about` · `/contact` · `/schedule-call` · `/faq`
- **BLOCKED (1):** `/how-it-works`
- **CONDITIONAL (3):** `/research` · `/blog` · `/industries/manufacturing`

**FINAL-CANDIDATE means ready for orchestrator review. It does not mean approved.**

## Major copy decisions

1. **The homepage headline was chosen inside the approved territory rather than lifted from it.** `DEC-013` approves *"Judged on the enquiries."* as a strategic territory and explicitly not as final copy. The recommended H1 puts the reader in the sentence and adds the contrast that carries the commercial idea.
2. **Every commercial page confirms its searched capability in the first screen, in the searcher's own word,** then bridges to the outcome within two sentences. No page delays confirmation to protect the positioning.
3. **The accountability boundary is written at full strength on the homepage at block 4**, high on the page, as the approved architecture requires — not as a footnote.
4. **The attribution limitations are stated once at full strength, on `/how-it-works`.** A draft of `/faq` that restated them was trimmed during the audit.
5. **`/lead-generation` publishes the qualification definition in buyer language** — the five checks, the two things it deliberately does not judge, and the disqualifier list. It appears in full on no other page.
6. **The problem page's diagnostic is genuinely runnable**, and two of its five findings point away from conversion work. That honesty is the page's credibility.
7. **`/how-it-works` was written as far as the evidence allows and no further.** Eight sections are drafted; the stages and the post-enquiry sequence are placeholders describing exactly what the owner must supply.
8. **No price, person, date, address, hour or response time was invented anywhere**, and no gap was written around so that a missing load-bearing fact stopped being needed.

## Homepage alternatives considered

| Option | H1 | Verdict |
|---|---|---|
| **A** | *Judge us on the enquiries, not the traffic.* | **Recommended.** Ordinary words; the contrast object carries the meaning; defensible with no client result; names no technique |
| **B** | *You count enquiries. So do we.* | **Rejected.** Fails the swap test — any agency could publish it. Agrees with the buyer rather than committing to anything |
| **C** | *More enquiries — and you can see where each one came from.* | **Rejected.** Reads as a promise of a result, which is the one thing this business will not give; and it leads with measurement, which Session 04 found is a proof principle rather than a proposition |

**Recommended direction: Option A. Claude does not approve it. Selection is an owner and orchestrator decision.**

## Evidence constraints observed
- **Zero claims at ladder level E or F.** No client outcome in any form, including anonymised.
- **Every first-party measurement carries sample, date, location, language, access tier and run counts in the sentence.**
- **No search volume, keyword difficulty or CPC figure anywhere** — none has ever been obtained in this programme.
- **No conversion benchmark, average, uplift or before/after** — none exists, and MappedSkills has no baseline of its own.
- **No AI score, rank, blended figure or trend.** One measurement is not a trend, and the copy says so.
- **Claude and Grok named as untested wherever AI systems are discussed.**
- **Two claims carry `[VALIDATION REQUIRED]` for re-verification before publication** (Project Rule 19).

## Owner blockers
Consolidated in `PAGE_COPY_AUDIT.md` §6. In order of consequence: the real delivery process · verified company facts · team members and expertise · confirmed prices and the spend/fee separation · the entry-offer model · enquiry-response ownership and business hours · the production-claims decision · publishable client results · the manufacturing gate · named authorship.

**Plus four technical prerequisites** that block the same pages: a working form backend, a working booking surface, the own-site fixes shipped, and a `/blog` index that renders real articles.

## Unresolved issues

1. **The conditional vertical page.** The session brief's production sequence includes conditional pages; `COPY_PLACEHOLDER_STANDARD.md` §1 item 19 — approved at Gate 8 — says the two conditional assets are not written until the gate clears. **Copy was not drafted, a record file was created instead, and the conflict is reported for orchestrator decision** rather than resolved unilaterally.
2. **`/thank-you`** has a launch content requirement and no page brief. Not drafted; a matching success-state pattern exists inside `copy/contact.md`.
3. **The `/lead-generation` H1** uses the query phrase in a heading rather than only in metadata. Permitted under `DEC-008` on that route, and flagged for confirmation.
4. **No second reviewer exists.** Nine of the twenty Message Quality Gate items belong to a reviewer, and the gate states that where no second reader is available the page waits.

## Risks / regressions
- **Nothing in production was changed**, so no regression was introduced.
- **The largest live risk is unchanged and is now better quantified** — see `PAGE_COPY_AUDIT.md` §7: the prohibited "300%+ ROI" claim appears on at least seven production surfaces rather than the one the documentation records, and the sitewide default title carries a rejected company-level positioning plus a segment claim that contradicts the approved ICP. **Remediation is an owner decision; it was not performed.**
- **Several FINAL-CANDIDATE pages are sequence-blocked** behind `/how-it-works`, which cannot be written without owner input. Approving them does not make them publishable.

## Assumptions introduced
**One, stated explicitly:** that Session 11's remit is website page copy and not editorial or research assets, per the session brief §15 and the approved content architecture. The three launch articles and the two research entries were therefore not written, and their absence is recorded in the index rather than left implicit.

## Tests actually run
**None.** No build, lint, test or render was performed, and no page was rendered. The audit in `PAGE_COPY_AUDIT.md` is a documentation self-check, not a test run.

## Files created
- `docs/09-content-pages/copy/` — 18 files (17 page-copy files, 1 conditional record)
- `docs/09-content-pages/PAGE_COPY_INDEX.md`
- `docs/09-content-pages/PAGE_COPY_AUDIT.md`
- `docs/00-project/handoffs/SESSION_11_PAGE_COPY_PRODUCTION.md`

## Files modified
- `docs/00-project/CURRENT_STATE.md` — Session 11 recorded as **PROPOSED / AWAITING ORCHESTRATOR REVIEW**. No prior gate decision changed.

**Not modified:** `DECISION_LOG.md` · `QUALITY_GATES.md` · every approved document in `docs/01-` through `docs/13-` · the existing briefs · production code, configuration, dependencies, assets · root `README.md`.

## Git state
No commit. No staging. Working tree carries the new documentation files, the one modified state file, and the pre-existing untracked `README.md`.

## Decisions proposed
1. Homepage H1 — Option A recommended.
2. Whether `/industries/manufacturing` copy should be drafted now.
3. Whether `/thank-you` receives its own copy file.
4. Whether the `/lead-generation` H1 query-phrase use is confirmed.

## Decisions approved during session
**None. Claude approved nothing.**

## Recommended next task
**Orchestrator review of the copy set**, in this order: the homepage H1 selection · the conditional-page decision · then a page-by-page review against `MESSAGE_QUALITY_GATE.md` with a second reader.

**In parallel, and blocked by nothing:** collect owner inputs 1–5, and start the off-site listings and reviews programme.

## Next session should read
1. `docs/09-content-pages/PAGE_COPY_AUDIT.md`
2. `docs/09-content-pages/PAGE_COPY_INDEX.md`
3. `docs/09-content-pages/copy/homepage.md` — for the H1 decision
4. `docs/08-messaging/MESSAGE_QUALITY_GATE.md` — the binding per-page gate

## Stop condition
**Stop at the copy gate.** No page in this set may be published, implemented, designed or committed until the orchestrator reviews it, a second reader runs the reviewer's gate items, and the owner supplies the blocking inputs. **No copy gate has been passed, and no design or implementation phase is authorised by this session.**

---

# Session 11 — second-reader / orchestrator correction pass (2026-09-01)

**The record of the original pass above is preserved unedited.** This section appends what the correction pass changed and why. **Where the two differ, this section governs.**

## What this pass was
A skeptical second reading of **every word in every copy file**, performed under an explicit instruction to distrust the original pass's own audit, session summary and evidence notes until the actual sentences supported them. **No copy production was restarted, no research was performed, no approved upstream document was touched, no production code was changed, and no gate was passed.**

## Orchestrator decisions applied
1. **Homepage H1 approved as a copy direction** — *"Judge us on the enquiries, not the traffic."* — subject to the full page surviving review.
2. **`/lead-generation` may use the query phrase in its H1**, provided the page bridges immediately from the searched category to buyer-readable meaning to qualified enquiries, and does not redefine the company.
3. **The conditional manufacturing page stays undrafted.** The approved `COPY_PLACEHOLDER_STANDARD.md` rule controls. The contradiction reported in the original pass is **resolved in favour of the approved documentation.**
4. **`/thank-you` receives a dedicated copy artifact.**

## What the second reading actually found
**The original pass over-reported its own quality.** Its audit recorded four defects; this pass made **twenty-five substantive corrections** plus three fixes to third-person self-reference. The material ones:

- **`/services` carried a prohibited engagement-model absolute** — *"Here they are one piece of work"* — asserting a bundling the owner has not decided. **The original audit explicitly claimed this check passed.** Rewritten to the approved formulation.
- **The homepage hero failed the orchestrator's own test.** It was vague enough that "traffic" in the approved H1 could pull the proposition towards SEO-only, it used "qualified enquiry" in the first screen against the approved terminology ruling, and it carried two boundary clauses. Rewritten so search **and** paid demand are both present without a capability dump, with one boundary line.
- **Three claims went beyond their evidence** and were rewritten rather than disclaimed: a Session 03 finding about agency-category queries generalised into a claim about clients' commercial terms (`/seo`, `/google-ads`), and an unmeasured channel-effectiveness assertion (`/social-media-ads`).
- **`/google-ads` printed "performance marketing agency" in order to deny it** — a live risk given the verified finding that this site's assertions are redistributed by AI systems. Replaced with positive framing.
- **`/lead-generation` was missing a mandatory message move** (the bridge to the wider outcome) and read as a standalone lead-generation service.
- **The problem page had no honest "we cannot tell yet" outcome and no "fix it yourself" outcome.** Both were added; three of its five outcomes now lead somewhere other than a MappedSkills engagement.
- **The 28-run AI measurement appeared on seven pages.** Removed from `/seo`, reworded on `/` and `/about`.
- **Four lines were presumptuous, disparaging or editorial** — about the reader's previous supplier, about competitors' delivery, and about the category — and were removed.

## Statuses after independent reassignment
- **FINAL-CANDIDATE (7):** `/services` · `/seo` · `/ai-seo` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/problems/traffic-but-no-enquiries`
- **PARTIALLY BLOCKED (8):** `/` · `/google-ads` · `/pricing` · `/about` · `/contact` · `/schedule-call` · `/faq` · `/thank-you`
- **BLOCKED (1):** `/how-it-works`
- **CONDITIONAL (3):** `/research` · `/blog` · `/industries/manufacturing` *(not drafted)*

**`/schedule-call` is recorded as structurally correct and substantively hollow** until four owner inputs arrive — it is the page most at risk of being approved on structure while saying nothing.

## Files created in this pass
- `docs/09-content-pages/copy/thank-you.md`

## Files modified in this pass
- 13 files in `docs/09-content-pages/copy/` (copy corrections)
- `docs/09-content-pages/PAGE_COPY_INDEX.md` — `/thank-you` recorded, statuses revised, route counts unchanged
- `docs/09-content-pages/PAGE_COPY_AUDIT.md` — **SECOND-READER REVIEW** appended as §11–§16; §1–§10 preserved unedited
- `docs/00-project/handoffs/SESSION_11_PAGE_COPY_PRODUCTION.md` — this section
- `docs/00-project/CURRENT_STATE.md` — revised Session 11 state

**Unchanged:** every approved upstream document · the existing briefs · production code, configuration, assets · root `README.md`.

## Route integrity
**Unchanged: 22 unconditional indexable · 2 conditional · 5 non-indexable.** `/thank-you` is an existing non-indexable launch route and remains `noindex` and out of the sitemap; drafting its copy added no route.

## Decisions still requiring orchestrator approval
1. Every page's copy status, and the seven FINAL-CANDIDATE pages, **reviewed by someone other than their writer**.
2. Whether the ~0.28% AI-referral figure is retained on `/ai-seo` at all — **the weakest evidence anywhere in the set**, and the page's argument survives its removal.
3. The two `[VALIDATION REQUIRED]` re-verifications before any publication.
4. Whether the shared section headings across capability pages should be varied (§12.2 of the audit).
5. All ten owner inputs, unchanged.

## Stop condition, unchanged
**Stop at the copy gate.** No page may be published, implemented, designed or committed. **No copy gate has been passed by either pass.**

---

# Session 11 — final orchestrator-directed check (2026-09-01)

**Third pass, narrow by instruction.** No strategy reconsidered, no alternative positioning generated, no page rewritten for style, no research, no production change. **Earlier history in this handoff is preserved unedited.**

## What was checked
The actual current copy of the seven FINAL-CANDIDATE pages, plus the homepage whose hero was materially corrected in the second pass, against seven fixed tests: first-screen comprehension · category · claims · engagement model · terminology · swap · AI-writing.

**Result: all eight pages pass all seven tests as they now stand.**

## Directed change carried out
**The ~0.28% AI-referral-traffic statistic was removed from `/ai-seo`** — the only page in the set that carried it — **and no replacement statistic was added.** The source was a vendor blog citing an unaudited third-party panel, and the page's argument does not depend on it. The page now sizes the opportunity qualitatively and says plainly that it will not publish a share figure it cannot stand behind. The evidence note records the removal and forbids reintroduction. *(The Session 04 research record of the figure in `CURRENT_STATE.md` is evidence history and was not touched.)*

## Four further corrections
- `/social-media-ads` used "qualified enquiry" in its first screen, where the approved ruling reserves it for pages that can explain qualification immediately.
- `/conversion-optimization` carried a stacked "not X, it is Y" construction with an em-dash pair in one sentence.
- `/seo` used the same rhetorical construction four times in body copy; two instances rewritten.

**Exact before/after wording is recorded in `PAGE_COPY_AUDIT.md` §19.**

## Standing rules recorded
- A claim carrying `[VALIDATION REQUIRED]` — currently one, Google's published statement on `/ai-seo` and `/faq` — **remains documented but is not publication-ready until re-verified.** `/ai-seo`'s Copy Status now states this on the page file itself.
- **Repeated structural headings across capability pages are accepted as-is.** The earlier flag is withdrawn, and no heading was changed to manufacture difference.

## Statuses — unchanged by this pass
7 FINAL-CANDIDATE · 8 PARTIALLY BLOCKED · 1 BLOCKED · 3 CONDITIONAL. **No page was upgraded because a review does not supply a missing owner fact.**

## Files changed in this pass
`copy/ai-seo.md` · `copy/social-media-ads.md` · `copy/conversion-optimization.md` · `copy/seo.md` · `PAGE_COPY_INDEX.md` · `PAGE_COPY_AUDIT.md` (§17–§21 appended) · this handoff · `CURRENT_STATE.md`.

## Stop condition, unchanged
**Stop at the copy gate.** The seven FINAL-CANDIDATE pages are recommended for orchestrator approval on their substantive copy. **No gate has been passed by any of the three passes.**

## Gate 9 approved — 2026-09-01 (annotation added later)

**The orchestrator completed the independent review this handoff called for, and Quality Gate 9 (Page Copy Production) was reviewed and PASSED on 2026-09-01.** The independent-review requirement recorded throughout this handoff — a second reader for the reviewer-assigned Message Quality Gate items, and orchestrator sign-off — is satisfied. Decision trail: `DEC-014` in `DECISION_LOG.md`.

**Approved specifically:**
- **Substantive copy** for the seven FINAL-CANDIDATE routes named above: `/services` · `/seo` · `/ai-seo` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/problems/traffic-but-no-enquiries`.
- **Homepage H1, as actual copy:** *"Judge us on the enquiries, not the traffic."* — the homepage headline recommendation made in this handoff is adopted, within the hero territory approved in `DEC-013`. The revised homepage supporting direction is approved alongside it.
- The page-copy system and copy standards applied across the production and correction passes documented above.

**Explicitly NOT changed by this approval:** the 8 PARTIALLY BLOCKED routes (`/`, `/google-ads`, `/pricing`, `/about`, `/contact`, `/schedule-call`, `/faq`, `/thank-you` — the homepage among them, remaining PARTIALLY BLOCKED on unresolved owner inputs elsewhere on the page), the 1 BLOCKED route (`/how-it-works`), and the 3 CONDITIONAL routes (`/research`, `/blog`, `/industries/manufacturing`) all keep their documented status. The removed ~0.28% AI-referral statistic stays removed and is not reintroduced. The `[VALIDATION REQUIRED]` flag on Google's published generative-AI/SEO position (`/ai-seo`, `/faq`) stays in place and is not publication-ready evidence. **Gate 9 passing is not publication approval for any of these.**

**§ "Stop condition, unchanged" above and every historical review section are preserved as the record of this session's own stop state**; they are superseded as current fact by this note and by `QUALITY_GATES.md` / `CURRENT_STATE.md`. This annotation performs no new research, rewrites no reviewed copy, and reopens nothing.

**Next phase: Session 12 — Creative / Art Direction.** Not begun by this annotation. **Session 11 is closed. Creative / Art Direction is next.**
