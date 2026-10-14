# MappedSkills UI Revamp — Gate 4 · A1: Accessibility Readiness and B5 Preparation

| | |
|---|---|
| **Date** | 2026-10-11 |
| **Authority** | `DEC-049` (owner "A1: Accessibility Readiness and B5 Preparation" brief). A1 engineering and B5 preparation only. **B5 is not authorised** |
| **Branch / base** | `ui-revamp` @ `a4f9710` (OBS-19 closed, `DEC-048`). The parallel release-control session works in its own worktree (`MappedSkills-r0-deploy`, branch `r0/secure-production-deploy`); nothing here touches it |
| **Status** | **ENGINEERING COMPLETE AND VERIFIED · MANUAL SCREEN-READER CHECKS BLOCKED.** KD-09 and KD-10 remediated on the branch (closure recommended, owner to confirm). SR-1 – SR-5 not performed: no real iPhone/Android screen-reader environment here. **B5 cannot begin under the existing requirements** (§6) |
| **Not changed** | Copy, claims, headings, URLs, metadata, JSON-LD, analytics, consent, forms, fonts and font loading, OBS-19 files, workflows, deployment scripts, route files. Nothing pushed, merged or deployed |

## 1. What changed (three component files)

| File | Figures (route) | Change |
|---|---|---|
| `components/commercial/ChainFigure.tsx` | `ChainFull` (`/services`), `ChainDiscovery` (`/seo`), `ChainLossZones` (`/conversion-optimization`), `ChainTerminus` (`/lead-generation`) | Text colours, vertical-drawing type sizes, line breaks, three label moves |
| `components/routes/CauseZones.tsx` | `CauseZones` (`/problems/traffic-but-no-enquiries`) | Text colours, type sizes (both drawings), line breaks |
| `components/routes/MethodChain.tsx` | `MethodChain`, `MethodChainState` (`/how-it-works` — component only; the B5 route file is untouched) | Text colours, type sizes, line breaks, recessive labels moved out of the 34 % group, drawing switch at 1100px |

**Method, within the approved design (no new token, colour, font, weight or breakpoint system):**
- **KD-10 (contrast).** Marks keep their colours: `--resolve-gap` and `--resolve-accent-deep` clear the 3:1 non-text floor on every line, dash and mark. **Text** in those registers takes the design system's existing text-grade tokens: `--dc-gap-text` (#6E6778, 4.90:1 on ground, 5.34:1 on paper) and the small-text accent role `--resolve-accent-dark` (#A83400, 6.02:1 / 6.55:1). The `MethodChainState` recessive labels measured **1.67:1** (34 % group opacity); they now sit outside the group in `--dc-gap-text`, and the lines and marks still recede.
- **KD-09 (size).** Rendered size = font-size × drawing scale. The vertical drawings (330 or 300 units) are shown in 284–288px columns at 320px, so their type is set at 14–15 units (≥ 12.05px there; `ChainDiscovery`, 300 units, ≥ 13.4px). The horizontal drawings already rendered at ≥ 12px except `ChainFull` join numbers (11 → 12 units), `CauseZones` (760 units in a 700px column at 761px → 14 units) and the two `/how-it-works` drawings. Those were 1000 units wide in a 713–720px column, rendering 7.8–9.9px. They now switch to the horizontal form at 1100px (the existing `ChainFull` boundary) and are set at 14 and 16 units.
- **KD-05 (text spacing).** SVG text cannot reflow, so each vertical-drawing line is short enough to hold the WCAG 1.4.12 overrides inside the drawing (≈ 25 characters from x=72). Longer strings break at a word boundary onto further lines; **no word was added, removed or changed**. `ChainTerminus`'s chain moved from x=96 to x=60 so its labels have room.
- **Collisions removed:**
  - OBS-14 (`/lead-generation` arrival label crossed by the spine);
  - the `/services` and `/lead-generation` boundary labels crossing their spines;
  - the `/seo` "THIS PAGE" label crossing the dashed demand line;
  - the `/lead-generation` qualified label sitting over the branch mark;
  - two horizontal labels touching join ticks or drop lines.

## 2. Results (local production builds `a4f9710` vs working tree; Playwright engines; evidence `gate-4/a1/evidence/`)

**Figure probe** (`gate-4/a1/figure-a11y.cjs`): 6 routes × 9 widths (320, 360, 390, 430, 761, 768, 1024, 1100, 1440) = 63 figure-views.

| Measure | Before (Chromium · WebKit) | After (Chromium · WebKit · Firefox) |
|---|---|---|
| SVG text items < 12px (KD-09) | 377 · 377 (min 7.84px) | **0 · 0 · 0** (min 12.00px: `ChainFull`'s 12-unit labels at scale 1) |
| SVG text items < 4.5:1 (KD-10) | 464 · 464 (min 1.67:1) | **0 · 0 · 0** (min 4.90:1) |
| Text clipped at the drawing edge | 0 · 0 | **0 · 0** |
| Text–text box overlaps | 3 · 4 | **0 · 0** |
| Text crossing a line, rule or mark | 38 · 41 | **0 · 0** |
| Under 1.4.12 text spacing, 320–430px: clipped text (KD-05) | 52 · 46 (max overflow 65px) | **0 · 0** |

**Firefox geometry:**
- Gecko reports larger SVG text boxes. The unchanged baseline already shows 44 "clipped" items and 102 overlaps there, against 0 and 3 in Chromium. Clipping and overlap counts in Firefox are therefore not comparable; size and contrast are (0 · 0).
- The Firefox renders were reviewed visually (`shots/after-firefox-*-320-*.jpg`): no clipping, overlap or crossing.
- A sweep of all 18 static routes found SVG figure text only on these six.

**Figure words and names:**
- **Same text, same reading order, in 57 of 63 views.** The other 6 are `/how-it-works` at 761–1024px, where the existing vertical drawing (its existing wording) now shows instead of the 1000-unit one (§3).
- Figure accessible names (`<title>` + `<desc>`) are identical in all 63.

**Regression** (both builds, harness of record):

| Check | Result |
|---|---|
| `layout.cjs` × Chromium, WebKit, Firefox (9 targets: 6 figure routes + `/`, `/pricing`, `/contact`) | **NEW 0** · RESOLVED 15 (all KD-05 text-spacing fingerprints) · KNOWN 14, in each engine |
| `a11y.cjs` (axe, Tab walk and focus visibility, names, reduced motion, forced colours) × 3 engines | **NEW 0** in each engine |
| `accessible-names.cjs` × 3 engines (6 figure routes) | headings, links, buttons, form controls, img names identical |
| `inventory.cjs` + `diff-inventory.cjs` (34 targets) | 850 facets identical, 0 differences |
| `served-head.cjs` | 34/34 identical status, titles, meta, canonical, JSON-LD |
| `analytics-forms.cjs --compare` (consent states, `page_view` walk, BookingLink, ContactForm outcomes) | 0 differing sections |
| `cls-routes.cjs` (throttled, 6 routes × 320/390/768/1440) | max 0.004 before and after |
| typecheck · lint · unit tests · build · cPanel build | pass · pass · 30/30 · pass · pass |

Keyboard: the figures contain no focusable element (Tab walk unchanged). They are static SVG, so reduced motion and no-JS rendering are identical.

## 3. Declared differences (visible; owner review)

1. **Figure text is darker and larger**, as KD-09/KD-10 require. The hierarchy is kept: the recessive register is still the lightest text, and owned-colour text is still tangerine-family.
2. **Narrow drawings are 4–24 % taller** (more wrapped lines; `/problems` 700 → 846 units). The page gets longer below the figures; this is static height, so CLS is unchanged.
3. **`/how-it-works` at 761–1099px shows the vertical drawings** (max 360px wide) instead of the 1000-unit horizontal ones, whose text rendered at 7.8–9.9px. Each form's existing wording is unchanged; only which form shows at those widths changes.
4. **Label positions** moved where they collided (§1); `ChainTerminus`'s narrow chain sits further left.
5. Out of scope and unchanged: OBS-8 (`/seo` horizon-plate `dt` HTML text at 11.52px) and OBS-12 (homepage HTML chain labels) are HTML labels, not SVG figures. R-3 is not retroactive (`DEC-041`).

## 4. Not performed

- **SR-1 – SR-5: BLOCKED.** No real iPhone (VoiceOver), Android (TalkBack) or tester here. Automated accessibility-tree inspection is **not** a substitute and no screen-reader result is claimed.
- **E1 real devices:** not performed (no phones; no iOS or Windows). Real Safari 26.2 and official Firefox 157 exist on this Mac, but this gate used Playwright engines only.
- Text-spacing tolerance was measured on the vertical drawings at 320–430px, the harness's scope. Horizontal drawings under 1.4.12 at ≥ 761px were not measured.
- KD-02 (forced-colours focus on legacy bodies) was not in A1 scope; its gate stays "before staging", and its instances sit on B6/B8/B9/B10 routes.

## 5. SR-1 – SR-5 manual checklist (required before B5 reuses the affected components)

Use a **real** screen reader on a **real** device. Test the current `ui-revamp` build served to the device (LAN preview needs owner approval; it is not authorised by `DEC-049`), or a later approved staging build.

| # | Component · route | Screen reader | Do | PASS when (all must hold) | FAIL if |
|---|---|---|---|---|---|
| **SR-1** | Stacked `DataTable` · `/pricing` "What moves the number", phone width | iPhone · iOS Safari · **VoiceOver** | Swipe right through the table; then rotor › Tables, move by cell | Caption read once; each cell announced with its row header ("Scope") and column header ("Pushes it lower"); the stacked label not read twice; "IT" not spelled out; no "clickable" | Any cell without its headers, a duplicated label, or a spelled-out "I-T" |
| **SR-2** | Same as SR-1 | Android · Chrome · **TalkBack** | Swipe through; use the Tables/Controls reading control if offered | Same as SR-1 | Same as SR-1 |
| **SR-3** | `Sequence` · `/problems/traffic-but-no-enquiries` "Five checks you can run today" | **VoiceOver and TalkBack** | Swipe through checks 1–2; then Headings navigation between checks | "Check 1" read once, then heading level 3 "Is anything being recorded at all?"; "01" never read; outcome label and text in order; heading jumps reach all five | "01" read, ordinal read twice, wrong level, or a check unreachable by heading |
| **SR-4** | Label-crumb trail · top of `/problems/traffic-but-no-enquiries` | **VoiceOver and TalkBack** | Swipe through the breadcrumb | "Breadcrumb, navigation"; "Home, link"; "Problems" **without** "link"; "Traffic but no enquiries" with "current page" (or equivalent); "/" not read | "Problems" announced as a link, the separator read, or no current-page cue |
| **SR-5** | `NotPromised` · `/pricing` "Who this is not for" | **VoiceOver and TalkBack** | Swipe through the five items | Five list items read as sentences; no "checkbox", "unchecked", "image" or "dimmed" | Any of those words, or items merged or missing |

**Record per check:**
- device and OS version;
- browser version;
- screen reader and verbosity settings;
- the verbatim announcements;
- PASS / FAIL;
- a screen recording with audio.

**Record a defect** as a new row in `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` with:
- the SR-n ID and route;
- expected and actual announcement;
- device and AT versions;
- a link to the recording.

Then stop B5 reuse of that component until it is corrected and re-tested. An owner may revise the prerequisite only by decision-log entry.

**What is needed to run it:**
- an iPhone with VoiceOver;
- an Android phone with TalkBack;
- a tester familiar with both (about 1–2 hours);
- a reachable build: owner approval for a LAN preview of `ui-revamp`, or a staging URL.

## 6. B5 readiness

| Item | State |
|---|---|
| **SR-1 – SR-5** | **OPEN — the blocking prerequisite.** `DEC-043` – `DEC-048` make all five mandatory before B5 reuses the stacked `DataTable`, `Sequence`, the label-crumb trail or `NotPromised`. B5 is planned to depend on `Sequence` (`GATE_4_IMPLEMENTATION_SEQUENCE.md` B5 "Depends on B4 (`Sequence`, `FindingRows`)"), so SR-3 is a genuine dependency. `/how-it-works` and `/about` also carry list structures that are `NotPromised` candidates (SR-5). Whether B5 needs the stacked `DataTable` (SR-1/2) or the label-crumb variant (SR-4) is a B5 design question; narrowing the prerequisite to the components B5 actually reuses would need an owner decision |
| **KD-09 / KD-10** | **Remediated on the branch** (this gate), including the `/how-it-works` figures B5 will move into `Figure`. Closure is the owner's |
| **B5 authorisation** | **Not given** (`DEC-048`). Needs its own brief and decision-log entry |
| **S2 signature motion** (`/how-it-works` measured chain, `GATE_4_MOTION_SPECIFICATION.md` §6; O7) | **Owner decision outstanding.** B5 can proceed without S2 if the owner declines or defers it |
| **Components ready for reuse** | Direction C primitives (`Section`, `Label`, `Statement`, `Lede`, `Body`, `Note`, `ServiceOpener`, `Plate`, `Fit`, `ScopeRows`, `QuestionRows`, `Close`, `Figure`, `FindingRows`, `DcMotion`); the remediated `MethodChain` / `MethodChainState` drawings. To build in B5: `Compare`, `DisclosureGroup`. **Gated by SR:** `DataTable` (stacked), `Sequence`, label-crumb trail, `NotPromised` |
| **Technical blockers** | **None found** apart from the SR prerequisite. Content: `/how-it-works` copy remains owner-BLOCKED and figure F17 BLOCKED for publication readiness (B5 preserves the existing copy, so this does not block the redesign). OBS-20 (Bricolage late-font movement, non-blocking) applies to B5's new headings: re-run the fallback sweep per new heading (`DEC-041`) |

**Conclusion: B5 can begin only after SR-1 – SR-5 genuinely pass (or the owner revises that prerequisite by decision) and B5 is separately authorised.**

## 7. Minimum remaining owner actions

1. Arrange SR-1 – SR-5: devices and tester, and approve a way to reach the build (LAN preview of `ui-revamp`, or staging).
2. Review the declared differences (§3), and confirm or decline closure of **KD-09, KD-10** and the figure-text scope of **KD-05**.
3. Decide **S2** (adopt / decline / defer) and issue the B5 brief.

## 8. Session handoff

- **Files changed:** the three components (§1).
- **Added:**
  - `gate-4/a1/figure-a11y.cjs` and `figure-shots.cjs`;
  - `gate-4/a1/evidence/` (`probe/`, `regression/`, 35 `shots/`);
  - this report.
- **Updated:** `GATE_4_B0_KNOWN_DEFECTS.md` §18, `QA_REGRESSION_RUNBOOK.md` §5.15, `CURRENT_STATE.md`, `DECISION_LOG.md` (`DEC-049`).
- **Tests run:** §2, all actually run. **Not run:** §4.
- **Next:** SR-1 – SR-5 on real devices, then a B5 brief.
- **Stop condition honoured:** no B5 work, no push, merge or deploy.
