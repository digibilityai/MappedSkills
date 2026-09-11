# Cross-Page Wireframe Consistency Check — Gate 9B Deliverable C — PROPOSED

**Session:** 13 — Gate 9B remediation and re-assessment pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** A pass over `30`–`49` against the six checks named in `27_GATE_9B_SCOPE_RECONCILIATION.md` §4C, the anti-pattern framework in `18_UX_ANTI_PATTERNS.md` / `14_DESIGN_ANTI_PATTERNS.md`, and the four orchestrator rulings applied in this pass.

> **RE-RUN FROM THE CORRECTED ARTEFACTS, 2026-09-02.** The previous version of this file recorded **PASS on every check and "no fix required"**. A cold second-reader audit found three of those PASS statements to be false as written. **They are corrected below rather than carried forward**, and no PASS is retained merely because it existed before.
>
> **The three corrected claims:**
> 1. *"All masters and variants (`31`–`42`) show exactly 2 `[ACT]` objects."* **False.** The tag counts differ by page type, and three page types legitimately carry a different number. §4 now counts them and states the exceptions.
> 2. *"No apparatus appears above any fold ... which, after `24`, is nowhere at launch."* **False as a blanket claim.** B27 is scoped to **commercial pages**; two page types carry IMMEDIATE apparatus in the first screen **by requirement**. §5 now distinguishes them.
> 3. *"W2 (`/seo`): opener → mechanism-compressed → scope → boundary → worked-context → objections(sentence) → act ... no two orderings are identical."* **The conclusion held; the evidence for it did not.** That sequence was not `/seo`'s approved move order, and the master it described mislabelled the approved moves. §2 now compares the corrected sequences.
>
> **Rule applied throughout: every PASS must correspond to something actually visible in the source wireframe.** Where it does not, the result is PARTIAL and the gap is named.

---

## 1. The spine holds across every page type

**Check:** every master (`31`–`36`) and variant (`37`–`42`) opens with `[NAV]`, closes with a conversion or navigational region, and carries `[NAV]` footer.

**Result: PASS**, with two documented differences that are not inconsistencies:

- **`/contact` and `/schedule-call` (`34`, `41`) carry utility nav**, not the primary header treatment — `03` §12–§13: neither is a primary nav item. Deliberate and documented.
- **`/thank-you` (`44`) closes with no conversion region at all** — the conversion has happened, and `09` §9.4 prohibits a second ask. **A page that "closes with a conversion region" would fail the gate here, not pass it.**

**Finding — notation, not architecture.** The sitewide header `[ACT]` is drawn as a tagged object on `31` and `32`, and appears as untagged prose ("header CTA") or is absent from the header line on `33`, `35`, `36`, `39`, `40`, `41`, `42`. **The architecture is consistent — one persistent header CTA sitewide, routing to `/contact` (H2) — but the artboards annotate it inconsistently.** Recorded as a notation finding for Gate 10, not corrected by renumbering every artboard in this pass.

---

## 2. No two commercial pages share a sequence

**Check:** compare the move order across W2 (`32`), V1 (`37`), V2 (`38`), V3 (`39`), against the approved orders in `23` §3 and the mandatory-move sets in `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §1.2.

**Result: PASS — and now on corrected evidence.**

| Page | Sequence as wireframed | Second move | Boundary position |
|---|---|---|---|
| **W2 `/seo`** (`32`) | confirm → bridge → **problem** → work → **horizon boundary** → measurement *(F1 PARTIAL + limits + compressed evidence)* → objections *(section)* → convert | The horizon | Above midpoint |
| **V1 `/ai-seo`** (`37`) | confirm → bridge → problem → work → **evidence section (F3)** → **strong boundary** → measurement → objections *(section)* → convert | The four layers, kept separate | **Early and strongest**, after the evidence |
| **V2 `/conversion-optimization`** (`38`) | confirm → bridge *(on the loss)* → **routes down** → **four zones (F2-shallow), second move** → work *(compressed)* → **experimentation boundary** → measurement → evidence → convert | The four loss zones | Above midpoint, experimentation validity |
| **V3 `/social-media-ads`** (`39`) | confirm → bridge → work → **channel-fit boundary** → convert | The honest channel answer | Above midpoint, channel fit |

**No two orderings are identical, no two boundaries are the same boundary in the same place, and the move sets differ.** `/seo` carries moves 3, 6 and a move-8 section; `/social-media-ads` carries none of the three — **three fewer structural moves, which `23` §3 names as the exact thing that must not be normalised.**

**Ruling A applied.** `/ai-seo`'s evidence-before-boundary order is the one in `05` §4.2. The contradicting row in `23` §3 was corrected at source, so **only one binding `/ai-seo` sequence now exists in the repository.**

---

## 3. The run does not appear on every commercial wireframe

**Check, per `22` §7:** *"lay the commercial wireframes side by side. If the run appears on all of them, the taxonomy was ignored."*

**Result: PASS.**

| Page | F1 class as wireframed | P3 used? |
|---|---|---|
| W2 `/seo` (`32`) | **B — PARTIAL**, discovery segment, at move 6 | Yes |
| V1 `/ai-seo` (`37`) | **D — NONE** | **No** |
| V2 `/conversion-optimization` (`38`) | **B — PARTIAL** *(as F2-shallow, one object)* | Yes |
| V3 `/social-media-ads` (`39`) | **D — NONE** | **No** |
| V4 `/pricing` (`40`) | **D — NONE** | **No** |
| V-services `/services` (`42`) | **A — FULL**, joins marked | Yes |

**Three of six are D — NONE**, including the two `22` §7 names as the required proofs (V1 and V3). **Ruling C applied:** `05` §4.4's stale pre-taxonomy sentence — that the run "is sufficient" on `/social-media-ads` — was corrected at source, and **no run was introduced into `39`.**

**Class coverage across the whole set:** A — FULL (`31` Block 3, `42`) · B — PARTIAL (`32`, `38`) · C — STATE (`31` Block 4, on the same instance) · D — NONE (`33`, `34`, `35`, `36`, `37`, `39`, `40`, `41`, `44`). **One instance of each class, as `22` §7 requires.**

**Ruling D applied.** `35`'s blanket D — NONE declaration conflicted with `22` §3 for `/how-it-works` (**A — FULL + C — STATE as F4**) and was corrected. **The route remains case 0 and owner-blocked, F17 remains BLOCKED, and no `/how-it-works` artboard exists in this set.**

---

## 4. CTA repetition — counted, not asserted

**Check, per `08` §3:** at most two PRIMARY objects plus one optional sticky instance per commercial page; DIRECT at most one instance per page outside the two conversion surfaces (H4-corrected).

**Result: PASS**, on the following stated reading, **with three page-type exceptions that the previous "exactly 2" claim concealed.**

**The reading:** the budget counts **PRIMARY conversion regions** — the first screen and the end — each of which offers the **two approved surfaces** of one outcome (I7). The sitewide header CTA is the **one persistent PRIMARY control** `CTA_SYSTEM.md` §3 requires and is **not** a page-level repetition. **Counting raw `[ACT]` tags instead produces four on a compliant commercial page, which is why the earlier "exactly 2 `[ACT]` objects" statement was false.**

| Wireframe | Raw `[ACT]` tags on the artboard | PRIMARY conversion regions | Within budget? |
|---|---|---|---|
| `31` `/` | 5 *(header + 2 surfaces × 2 regions)* | 2 | **Yes** |
| `32` `/seo` | 4 *(header + first screen + 2 surfaces at the end)* | 2 | **Yes** |
| `37` `/ai-seo` | 2 *(differences-only diagram; inherits W2)* | 2 | **Yes** |
| `38` `/conversion-optimization` | 2 *(differences-only diagram; inherits W2)* | 2 | **Yes** |
| `39` `/social-media-ads` | 3 | 2 | **Yes** |
| `42` `/services` | 2 | 2 | **Yes** |
| `40` `/pricing` | 1 | 1, **booking emphasised** | **Yes** — one region, `03` §5 |
| **`33` problem page** | 2 | **0 above the fold; 2 at the very end only** *(DIAGNOSTIC then PRIMARY)* | **Exception, required.** `06`: no CTA above the fold, no CTA inside the checks section |
| **`34` `/contact`** | 1 *(the submit control)* | **1** | **Exception, required.** A conversion surface has one conversion object |
| **`41` `/schedule-call`** | 0 `[ACT]`; 1 `[BOOK]` | **1** | **Exception, required.** The booking region is the conversion object |
| **`44` `/thank-you`** | **0** | **0** | **Exception, required.** No second ask of any kind (`09` §9.4) |
| `35` long-form, `36` index | 1 each | 1, well below the fold **if at all**, **no sticky** | **Yes** — B16 |

**DIRECT contact instances (H4: available, not omnipresent — one per page outside the two conversion surfaces):** `31` Block 8 (1) · `32` move 9 (1) · `37`/`38`/`39` inherit that one instance · `34` and `41` are the two conversion surfaces, where DIRECT is prominent by design. **No wireframe shows two.**

**Finding carried forward (unchanged, non-blocking):** the conditional vertical page is not wireframed at launch (`28` §6), so its DIRECT-elevated treatment (`03` §15) is **specified in prose only, not validated in wireframe form.** Consistent with declared scope; recorded so Gate 10 does not lose it.

---

## 5. Apparatus above the fold — with the page-type exceptions stated

**Check:** every first-screen region in `31`–`42` for an `[EVD]` tag.

**Result: PASS on the rule as it is actually scoped — and the previous blanket claim is withdrawn.**

**B27 prohibits apparatus above the fold on a *commercial page*** (`14_DESIGN_ANTI_PATTERNS.md` B27), and `24` sets the homepage launch default to zero. **It is not a sitewide prohibition, and two page types carry IMMEDIATE apparatus in the first screen because their page type requires it.**

| Page type | First screen | Result |
|---|---|---|
| Homepage (`31`) | Four elements, `[EVD: ABSENT]`. The Gate 9A exception is **preserved and unspent** (`24` §4) | **Zero apparatus** |
| Six commercial pages + `/services` + `/pricing` (`32`, `37`–`40`, `42`) | `[EVD: ABSENT]` on every opener, **including `/ai-seo`, whose evidence section is early but never above the fold** | **Zero apparatus** |
| Problem page (`33`) | `[EVD: ABSENT]`, and no CTA either | **Zero apparatus** |
| `/contact`, `/schedule-call`, `/thank-you` (`34`, `41`, `44`) | `[EVD: ABSENT]` — **zero apparatus and zero figures page-wide** (B17) | **Zero apparatus** |
| **Long-form (`35`)** | **Byline and date are `[EVD: IMMEDIATE]` in the first screen** | **Apparatus above the fold — REQUIRED.** `03` §8: apparatus is IMMEDIATE throughout a research entry. **B27 does not reach this page type**, and removing the byline would break the credibility contract the page exists to hold |
| **Index (`36`)** | **Entry-card metadata — date · systems · sample · version — is `[EVD: IMMEDIATE]` and cards begin immediately after the standard statement** | **Apparatus above the fold — REQUIRED.** `03` §7: metadata-forward cards are what distinguish this index from a generic blog listing. **Removing it to satisfy a sitewide reading of B27 would destroy the pattern's only justification** |

**Corrected statement of the rule:** *zero apparatus above the fold on every commercial page, the homepage, the problem page and all three conversion/confirmation surfaces — with long-form and index page types carrying IMMEDIATE apparatus in the first screen by requirement.* **That is the claim the wireframes actually support.**

---

## 6. Pattern inventory cross-check, both directions

**Check, per `29` §5 criteria 3–4.**

> **Method changed in this pass.** The previous version asserted this table from structural inference — most wireframes named no pattern ID at all, so "every pattern used in a wireframe exists in the inventory, **under the same name**" could not be verified from the artefacts. **Each wireframe `31`–`47` now carries an explicit `Patterns used` margin line**, so the check below is read off the artefacts rather than inferred.

### 6a. Inventory → wireframe (every one of the 16 entries is used at least once)

| Entry | Used in |
|---|---|
| P1 commercial opener | `32`, `34`, `37`, `38`, `39`, `40`, `41`, `42` |
| P2 capability routing | `31`, `42`, `47` |
| P3 the run wrapper | `31` *(FULL+STATE)*, `32` *(PARTIAL)*, `38` *(PARTIAL)*, `42` *(FULL)*, `47` |
| P4 evidence disclosure | `31`, `32`, `33`, `35`, `37`, `38`, `40`, `45`, `47` |
| P5 the limits block | `31`, `32`, `35`, `36`, `37`, `38`, `39`, `40`, `42`, `47` |
| P6 problem diagnostic | `33` *(full)*, `38` *(shallow)* |
| P7 fit test | `31`, `40`, `42`, `47` |
| P8 contact block | `31`, `32`, `34`, `37`, `38`, `39`, `40`, `41`, `42`, `47` |
| P9 entry card | `36`, `48` §2.6 |
| P10 conversion surface | `34`, `41`, `43`, `44` |
| P11 return-to-decision link | `35` |
| P12 breadcrumb | `32`, `33`, `35`, `37`, `38`, `39`, `46` §3 |
| P13 figure wrapper | `31`, `32`, `33`, `35`, `37`, `38`, `40`, `42`, `47` |
| P14 long-form scaffold | `35` |
| R1 header / primary navigation | every page-level wireframe; complete state set in `46` |
| R2 footer / entity block | every page-level wireframe |

**Result: PASS. No unused inventory entry.**

### 6b. Wireframe → inventory (every pattern used has an entry, under the same name)

**Result: PASS after one fix.** Every ID in every `Patterns used` line resolves to an entry in `49` under the identical name.

**Fix applied (§7.1).** `36` draws a `[LIM]` "what this is not yet" block, but **P5's allowed-page-types field did not list the index.** Either the tag was wrong or the field was incomplete; the field was incomplete. `49` P5 field 8 now includes the index block, dated and attributed to this check.

**Recorded as deliberate absences, not gaps:** P3 is **not** used on `37`, `39` or `40` — D — NONE means the pattern does not render, and listing it there would be the "applied for consistency" failure `22` §2 prohibits. P1 is **not** used on `31` — the commercial opener is not permitted on `/`. P12 is **not** used on `31`, `36`, `40`, `41`, `42`, `44` — all top-level or utility routes (`07` §6).

---

## 7. Fixes applied during this pass

**Four, all traceable. Recorded because the previous version claimed "none required" while three false PASS statements stood.**

**7.1 — `49` P5 field 8 extended** to cover the index's "what this is not yet" block and `/services` Block 7, both of which the wireframes draw. *(Found by check 6b.)*

**7.2 — `49` P4 field 4 extended** to state the no-JavaScript behaviour explicitly and to point at `45` STATE 4. *(Found by the F7 check in §8.)*

**7.3 — `49` P14 field 6** no longer restates a character-count measure, which is a dimension and violated the inventory's own criterion 8. It names `12` §14 as the source instead. **The inventory remains at exactly 16 entries; no entry was added, removed or replaced.**

**7.4 — Blocked-slot notation removed from seven artboards.** `31`, `33`, `34`, `40`, `41`, `44`, `47` and `48` §M1 each drew at least one `[BLK]` tag or a parenthetical "does not render" note **inside the diagram**. `26` §5 and `30` §4 require margin annotation only. Each is now a margin table naming the slot, its case (0/A/B) and its blocker; **the artboards draw nothing at those positions.** `30` §4.1 records the convention so the same drift cannot recur.

---

## 8. Anti-pattern and behavioural-test check

| Test / anti-pattern | Checked against | Result |
|---|---|---|
| **B14** capability card grid | `31` Block 5, `42` Block 4 | **PASS** — one line per capability, no grid |
| **B16** sticky CTA on credibility surfaces | `35`, `36`, and the header default in `46` §4 | **PASS** — no sticky annotated anywhere on a credibility surface; **the header itself is non-sticky at every class** (H3) |
| **B17** proof on a conversion surface | `34`, `41`, `44` | **PASS** — zero apparatus and zero figures page-wide |
| **B25** gated diagnostic | `33` | **PASS** — no tool, sign-up, download, email or score |
| **B26** lead score / grade | `33`, `43` | **PASS** — and `43`'s analytics contract now also prevents the screening outcome leaking through an event |
| **B27** apparatus above the fold on a commercial page | all commercial masters/variants | **PASS** — see §5, with the page-type scope stated correctly |
| **B28** limit before the capability it limits | `31` Block 4, `32` moves 5–6, `37` moves 7→5 | **PASS** |
| **B29** collapsible limits | `31`–`42`, `45`, `48` §4 check 3 | **PASS** — never collapsible at **any of the three width classes**; verified per instance in `48` |
| **B30** apparatus in a CTA region | every ACT block | **PASS** — every action region annotated `[EVD: ABSENT]` |
| **B7** aggregate score | `33`, `37`, `48` §M7 | **PASS** — AI layers never aggregated, at any width |
| **B1 / F5** greyscale | `35`, `37`, `48` §M7, `43` STATE 2 | **PASS** — not-testable carries shape **and** label; the form's focus indicator is not colour-only |
| **B18** branded name | all | **PASS** — no method, run or stage carries a name |
| **A13** icon per capability | `31`, `42` | **PASS** |
| **F1 standalone** | hide every `[EVD]` across `31`–`42` | **PASS** — the commercial argument survives; the apparatus qualifies claims, it never carries them |
| **F7 no-script, no-hover, greyscale** | `45` STATE 4, `48` §4 check 11 | **PASS — and this is a change.** The previous set left the no-script case in prose; `45` now draws it, and the failure mode it prohibits — a control that renders but cannot be operated — is named |
| **F8 detour** | `31`–`42` | **PASS** — no page interposes anything before a conversion surface; proof is a link at the claim (I6) |
| **F9 away-outcome** | `33`, `48` §2.3 | **PASS**, with a constraint recorded: at MEDIUM width a two-column arrangement of the six findings would make one column read as secondary, so `48` §2.3 requires a single column unless equal position priority is preserved |

---

## 9. Overall consistency verdict

**PASS on all six required checks (`27` §4C) and on the anti-pattern / behavioural-test check — after four fixes and with three previously-false claims corrected.**

**Two findings carried, both non-blocking and both recorded rather than resolved:**
1. **Header-CTA notation is inconsistent across artboards** (§1). Architecture consistent; annotation is not.
2. **The conditional vertical page is not wireframed** (§4), consistent with `28` §6's declared scope.

**RESOLVED 2026-09-02 (orchestrator ruling 1, Gate 9B narrow closure pass).** The earlier open item read `40`'s use of **DEFERRED** as a candidate fourth apparatus-visibility state absent from `10_EVIDENCE_INTERACTION_UX.md`. **The orchestrator ruled: DEFERRED describes *when* approved evidence apparatus enters the page sequence, not a fourth evidence-disclosure behaviour.** Once the apparatus appears on `/pricing`, it uses one of the three approved behaviours — IMMEDIATE, ADJACENT-SECONDARY or EXPANDABLE — as appropriate. `40` was given the minimum documentation clarification needed so it no longer reads as introducing an unsupported fourth state. See `51` §1, criterion A3.

**This check does not pass Gate 9B.** It reports whether the set is internally consistent. The gate assessment is `51_GATE_9B_FINAL_ASSESSMENT.md`.
