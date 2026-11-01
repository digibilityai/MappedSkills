# /seo: page audit and proposed narrative redesign (revision 2, proposal only)

**Status:** PROPOSAL FOR OWNER APPROVAL. No application code, git history, Contentful or deployment was changed. The only files written are this document and the screenshots beside it.
**Date:** 2026-10-31
**Review baseline (corrected):** the page the owner reviewed: `MappedSkills-six-cases`, branch `feat/paid-case-studies-six-local`, served on port 3500. `origin/main` @ `1ebf7ba` is a comparison source only. It differs from the baseline in one place: the baseline adds an "SEO case studies" section (`RelatedCaseCards`, `components/cplus/seo/SeoBody.tsx`, uncommitted).
**Brand source:** `MappedSkills_Brand_DNA_v3_Strategy_Storytelling_Motion.docx` (24 Oct 2026), read in full. Where this proposal leans on it, the section is cited.
**Freeze:** the `DEC-092` freeze on `/seo` stayed in force until approval.

> **IMPLEMENTATION STATUS (2026-10-31): APPROVED (U1 to U3 as recommended) and IMPLEMENTED LOCALLY** in `MappedSkills-six-cases`, port 3500, recorded as `DEC-105` (supersedes `DEC-092` for this scope only). Nothing committed, pushed, deployed or published; Contentful read only. Report: `IMPLEMENTATION_REPORT.md`. Screenshots of the result: `screenshots-implemented/`. Where the build differs from this proposal, the report says so.

Page inspected with headless Chrome at **1440, 390 and 360 px**, with the cookie banner rejected and the page scrolled through so reveals had run.

**Saved screenshots** (`docs/seo-redesign/narrative-r1/screenshots/`): `seo-current-{1440,390,360}-full.png`, plus per-section crops `seo-current-1440-s00…s09.png` and `seo-current-390-s00…s09.png`. The small "Issue" badge visible in them is the Next.js dev overlay, not page content.

---

## 1. Corrected current-section audit

Length: **1440 px: 8,034 px (about 8.9 screens). 390 px: 9,305 px (about 11 screens). 360 px: 9,391 px.** No horizontal overflow at any width. Ten sections.

| # | Section (ground) | 1440 / 390 / 360 px tall | What it says | Links and CTAs |
|---|---|---|---|---|
| H | Hero (dark) | 823 / 779 / 735 | "SEO that is judged on the enquiries it produces." Four-station route graphic | Primary + Book a call |
| 1 | Problems (ground) | 729 / 709 / 730 | Three questions: competitors found first; visitors but no enquiries; reports positive, what improved | `/problems/traffic-but-no-enquiries` |
| 2 | The work (dark) | 823 / **1,179 / 1,257** | Four groups, 11 bullets, an "also" line, on the **same four-station route**; on narrow screens the route is shown a second time as a strip | "What each stage includes" anchor |
| 3 | How we work (paper) | 542 / 567 / 601 | Audit, Prioritise, Improve, Measure | `/how-it-works` |
| 4 | Measurement (ground) | 823 / 863 / 886 | Illustrative review sheet, four tiles, hatched "no figures" fills | `/how-it-works` (again) |
| 5 | What you can expect (dark) | 541 / 674 / 674 | Four pledges | none |
| 6 | SEO projects (paper) | 722 / 672 / 697 | **Anybody Can Bake** and **Bakedemy**, each "Results not yet published." | none |
| 7 | SEO case studies (ground, the approved placement) | 843 / 1,093 / 1,070 | Two image cards: Ameba Software; AnybodyCanBake ("25.49% more organic clicks. 46.15% more course enquiries.") | two "Read the SEO case study", "See all our work" |
| 8 | Questions (ground) | 550 / 560 / 560 | Four disclosures | `/google-ads` |
| C | Close (tangerine) | 823 / 779 / 735 | "Let's look at what search is doing for you today." | Primary + Book a call (repeat), four "Related" links |

### What the corrected baseline shows (VERIFIED on port 3500)

**New and more serious than in revision 1:**
1. **The page contradicts itself.** Section 6 tells the visitor AnybodyCanBake's "Results not yet published". The very next section, 7, headlines AnybodyCanBake with 25.49% and 46.15%. Both claim to be proof.
2. **Two proof sections back to back, proof at position 7 and 8 of 10.** Five sections of assertion come first.
3. **Section 6 is now wrong, not just weak.** It spells the client "Anybody Can Bake" (the exact spelling is AnybodyCanBake, `DEC-102`), it keeps **Bakedemy**, which the owner has excluded, and it labels each project "Historical SEO project", which is no longer true for AnybodyCanBake (May to October 2026). Brand DNA v3 §14 says historical SEO proof must be distinguished from current work; this label now blurs it.
4. **The proof now exists but is outside the story.** The approved ACB case has its own narrative (separate discovery from learning intent, make content navigable, measure beyond traffic). The page tells nothing like it before the cards.
5. **The cards are the page's only picture of real work, and they are image cards.** Ameba's card is conceptual artwork with a client logo; ACB's carries baked-in headline figures. Neither shows the period or the caveat that the case page carries.
6. Console shows one hydration-mismatch error on load (dev server). Not diagnosed here; flagged for the implementation phase.

**Still apply from revision 1 (re-verified at all three widths):**
- The four-station route is drawn in the hero, again as the section 2 rail, and a third time as a mobile strip.
- Reporting and measurement are said six times: hero lede, problem 3, step 4, whole section 4, pledges 3 and 4, FAQ 3. Section 5 restates sections 3 and 4.
- `/how-it-works` is linked twice with two labels.
- Section 2 is a menu: 11 bullets. On mobile it is the tallest section on the page (about 1.5 screens).
- Every section has the same rhythm: heading, then a row of three or four items. Nothing is allowed to be big.

**No longer applies:** "no proof"; "Ameba is missing"; "no Brand DNA document".

### Fit against Brand DNA v3

| Brand DNA v3 | Current /seo |
|---|---|
| §23 "One section = one question answered" | Sections 3, 4 and 5 answer the same question; sections 6 and 7 answer the same question twice |
| §24 Evidence: "Verified case studies, dates, definitions, caveats. No count-up on numbers" | Real figures are on the page only as an image card, without period or caveat |
| §11 Proof: challenge, intervention, metric definition, period, source, caveats | The ACB and Ameba case pages do this; /seo does not surface it |
| §6 Proof tone: "Precise, attributed and caveated" | Section 6 is vague; section 7 is precise but caveat-free |
| §25 Section transition: "typographic rhythm and contrast first" | Rhythm is even, so no section carries weight |
| §4 service maturity (SEO is not a listed core channel; `DEC-092`: SEO is a supporting service) | Fine today; the redesign must not inflate it |

---

## 2. Proposed narrative and section order

Seven scenes, from ten. The four-station motif stays in the hero only. Nothing else on the page repeats it.

| # | Scene | Visitor question | Why it leads to the next |
|---|---|---|---|
| H | **Hero** (dark): promise, with the existing route graphic | "What is this, and is it for me?" | The route is incomplete: where does it break? |
| 1 | **Clicks are not customers** (ground): the three approved breaks | "Why isn't search bringing me enquiries?" | Now you know the problem: what do you do about it? |
| 2 | **What we work on** (dark): three plain lines, led by search intent | "What will you actually change?" | A claim needs evidence: has it worked? |
| 3 | **Here is what changed, and how we measured it** (paper, the big scene): AnybodyCanBake in full, Ameba candidly | "Have you done this for a business like mine?" | If I start, what happens, and how will I see it? |
| 4 | **How it runs** (ground): four quiet steps ending in the monthly report and review call | "What happens if I start?" | Last doubts |
| 5 | **Questions** (paper, four disclosures) | "How long? Any guarantee? SEO or ads?" | Ready to act |
| C | **Close** (tangerine): one action | "What do I do now?" | |

Pacing: small dark hero, then light large type, a dark lift for the method, a single heavy evidence scene, then three quiet scenes and a decisive close. The page has one place where figures are big, and it is the proof.

---

## 3. Proposed copy

**A** = existing approved wording, reused. **NEW** = new or adapted, needs approval. Facts for scene 3 come only from the two case pages on port 3500; Ameba's proof restrictions are preserved. Nothing below promises traffic, rankings, enquiries or sales.

**Unchanged:** URL, canonical, robots, title, meta description, H1, `BreadcrumbList`, structured data, CTA destinations.

### Hero (all **A**)
- Eyebrow: Organic search
- H1: SEO that is judged on the **enquiries** it produces.
- Lede: "We help your business show up for the searches that matter and improve the pages people land on. Then we measure whether organic search is producing genuine enquiries."
- CTAs: Tell us what you're trying to fix · Book a call
- Caption: Illustration. It shows no results.

### 01 Clicks are not customers
- H2 **A**: "Where SEO usually goes wrong."
- Q1 **A**: "Your competitors appear in Google. Why don't you?" / "Buyers may be finding others first. We look at which searches matter and what is holding your pages back."
- Q2 **A**: "Your website gets visitors. Why aren't they contacting you?" / "Visits only help if the page gives people a reason and a way to get in touch. We look at what happens after the click." Link **A**: Have the traffic but not the enquiries? Start here
- Q3 **A**: "Your SEO reports look positive. What has actually improved?" / "Rankings and visits are not the same as enquiries. We focus on what changed for the business."

### 02 What we work on
- H2 **NEW**: "Match each search to a page that answers it."
- Sub **A**: "Scoped to what your business needs. Not every engagement includes every item."
- Line 1 **A, folded**: **Find the right searches.** Search intent, relevant opportunities, competitor research.
- Line 2 **A, folded**: **Make your site easy to find and use.** Technical SEO, indexing, site structure and internal links. Also page speed, structured data and protecting rankings during a site rebuild.
- Line 3 **A, folded**: **Build pages that answer, then turn visits into enquiries.** Service pages, content, on-page optimisation, landing-page improvements and conversion opportunities.

### 03 Proof
- Eyebrow **NEW**: SEO case studies
- H2 **NEW**: "Here is what changed, and how we measured it."
- **AnybodyCanBake**, Pune, education and training. *Source: its case page.*
  - Lead **NEW**: "A baking website can attract recipe readers without making its courses easy to find. We separated recipe searches from course searches, made the content easier to navigate, and measured beyond traffic."
  - Figures, shown static, no count-up, same two periods on every row: **May to July 2026 → August to October 2026**
    - Organic clicks **16,400 → 20,580** (up 25.49%)
    - Nonbrand organic clicks **15,348 → 20,039** (up 30.56%)
    - Tracked organic course enquiries **91 → 133** (up 46.15%)
  - Read-across **NEW**: "Enquiries grew faster than clicks. That is the result for one business, not a promise for yours."
  - Caveat **A (from the case page, shortened)**: "Two three-month periods compared. This is not proof that the work alone caused the change. The figures were supplied by MappedSkills and have not been independently checked against Search Console or analytics exports."
  - Link: Read the AnybodyCanBake SEO case study → `/portfolio/anybodycanbake-seo`
- **Ameba Software**, Chandigarh, B2B software. *Source: its case page. No figures.*
  - **NEW**: "A B2B software company that wasn't being found for the solutions it sells. We fixed its technical SEO, targeted key pages for high-intent searches and built content and links."
  - Restriction line **A**: "We do not publish traffic, ranking or enquiry figures for this engagement, because we have not been able to verify them against Ameba Software's own records."
  - Link: Read the Ameba Software case study → `/portfolio/seo-ameba-software`

### 04 How it runs
- H2 **A**: "Four steps, in this order."
- **A**: Audit: review your site, searches and how enquiries arrive. · Prioritise: agree what to fix first in a written plan. · Improve: we make the agreed improvements. · Measure: a monthly report and review call show what changed.
- Sign-off **A** (from the removed pledges): "SEO takes consistent work. We'll explain what needs attention first and what progress you can realistically expect."
- Note **A**: "Some enquiries arrive with no clear source. We show those separately instead of counting them as SEO."
- Link **A**: See the full process → `/how-it-works` (the only one)

### 05 Questions: all four **A**, unchanged.

### Close (all **A**)
"Let's look at what search is doing for you today." / "Tell us what you're seeing now, and we'll tell you where to look first." Same two CTAs. "Related" links cut from four to three: Google Ads, AI search, All services (Conversion optimization is reachable from All services).

---

## 4. Wireframes

Legend: `▓` dark · `░` ivory · `▒` paper · `█` tangerine · `○ ◌` solid / ghost station.

### Desktop 1440

```
▓▓ HERO (1 screen) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  Organic search                         ○ A search
  SEO that is judged on the ENQUIRIES    ○ A result
  it produces.   lede                    ◌ Your page   ◌ An enquiry
  [Tell us…] Book a call                 (existing graphic, hero only)
░░ 01 CLICKS ARE NOT CUSTOMERS (0.9 screen) ░░░░░░░░░░░░░░░░░░░░░░░░░░
  Where SEO usually goes wrong.
  ◆━━━━━━━━━━━━◆━━━━━━━━━━━━◆   three questions on one rule, no icons
  Q1 text       Q2 text       Q3 text
  → Start here
▓▓ 02 WHAT WE WORK ON (0.9 screen) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  Match each search          1  Find the right searches. one line
  to a page that             2  Make your site easy to find and use. one line
  answers it.                3  Build pages that answer… one line
  (large type left, three typographic rows right; no cards, no route)
▒▒ 03 PROOF (about 1.6 screens, the heaviest scene) ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
  SEO case studies
  Here is what changed, and how we measured it.
  AnybodyCanBake · Pune · May–Jul 2026 → Aug–Oct 2026
  lead sentence (left col)       Organic clicks      16,400 → 20,580  +25.49%
                                 Nonbrand clicks     15,348 → 20,039  +30.56%
                                 Course enquiries        91 → 133     +46.15%  (largest row)
  Enquiries grew faster than clicks…   Caveat (small, adjacent)   Read the case study →
  ───────────────────────────────────────────────────────────────────
  Ameba Software · Chandigarh · B2B software        (compact row, text only)
  what we did, in one line  ·  restriction line     Read the case study →
░░ 04 HOW IT RUNS (0.6 screen) ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  Four steps, in this order.
  1 Audit ─ 2 Prioritise ─ 3 Improve ─ 4 Measure     one row, quiet
  sign-off sentence · attribution note · See the full process →
▒▒ 05 QUESTIONS (0.6 screen) ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
  Common questions.   [+] [+] [+] [+]
██ CLOSE (1 screen) ██████████████████████████████████████████████████
  Let's look at what search is doing…   [Tell us…] Book a call
```

### Mobile 390 / 360 (identical structure; 360 checked for no clipped figures)

```
▓ HERO ▓        ░ 01 ░           ▓ 02 ▓              ▒ 03 PROOF ▒
 eyebrow         Where SEO…       Match each search   SEO case studies
 H1              ┃ Q1             to a page that      Here is what changed…
 lede            ┃ Q2  → link     answers it.         AnybodyCanBake
 [CTA]           ┃ Q3             1 Find…  (3 short   lead sentence
 Book a call                      lines, vertical)    Organic clicks
 ○─○┄◌┄◌                                              16,400 → 20,580  +25.49%
 (mini route)                                         Nonbrand clicks … (stacked rows,
                                                      one per row, same two periods stated once)
 ░ 04 ░          ▒ 05 ▒           █ CLOSE █           Course enquiries 91 → 133 +46.15%
 4 short steps   4 disclosures    one CTA + link row  caveat · case link
                                                      ── Ameba Software (text) · link
```

Mobile rules: figures stack as rows, never a three-up grid; one period statement is shown once per block, not on every figure; no horizontal scroll at 360; the cookie-banner overlap is sitewide and unchanged. Target length: about 6.7 screens on 1440 and about 8 on 390, down from 8.9 and 11. These are layout targets, not measurements.

---

## 5. Remove, combine, retain

| Item | Action | Reason |
|---|---|---|
| Hero, H1, lede, CTAs, route graphic | **Retain** (route graphic hero only) | Approved; the route stops repeating |
| Problems (1) | **Retain** unchanged | Best story asset; approved wording |
| Section 2 route rail, mobile strip, 11 bullets | **Combine** into three folded lines; **remove** rail and strip | Same picture three times; menu feel |
| "How we work" (3) | **Retain**, trimmed to one row | Needed; but one link only |
| Illustrative review sheet (4) | **Remove** (see U1) | Real figures now sit in scene 3; an "illustrative, no figures" sheet beside real figures confuses |
| "What you can expect" (5) | **Remove**, keep its one sentence | Restates steps 2 and 4 |
| SEO projects (6) | **Remove** | Contradicts section 7; wrong spelling; Bakedemy excluded; "historical" label no longer true |
| SEO case studies cards (7) | **Rebuild** as scene 3, with narrative, figures, period and caveat | Proof belongs in the story, not at the end as image cards |
| Duplicate `/how-it-works` link | **Remove** | Duplicate destination |
| FAQ (8) | **Retain** unchanged | Carries the guarantee and timeline answers honestly |
| Close | **Retain**, "Related" cut to three | One action |

Not added: new card grids, a second service list, counters or count-up, parallax, looping or ambient motion. The existing once-only reveal stays. Brand DNA v3 §25: case metrics are immediate static numbers.

---

## 6. Proof rules applied

- **AnybodyCanBake:** only the SEO case figures supplied by the owner are used (clicks, nonbrand clicks, tracked enquiries, both periods, each growth figure re-derived: 20,580 ÷ 16,400 = +25.49%; 20,039 ÷ 15,348 = +30.56%; 133 ÷ 91 = +46.15%). The Google Ads case and its figures are not used. The "not proof the work alone caused the change" and "not independently checked" limits stay beside the figures.
- **Ameba Software:** both routes (`/portfolio/anybodycanbake-seo`, `/portfolio/seo-ameba-software`) return 200 on port 3500 and render. The Ameba page states the SEO work and publishes no figures; `lib/case-study-proof.ts` still withholds its proof. `/seo` does the same. No traffic, ranking, enquiry or star figure appears, and the Ameba logo file is not edited.
- **Brand spelling:** AnybodyCanBake throughout (`DEC-102`). Note that Brand DNA v3 (24 Oct) still writes "AnyBodyCanBake"; `DEC-102` (30 Oct) supersedes it.
- **Bakedemy** does not appear on `/seo`.

## 7. Genuinely unresolved decisions

Everything else from revision 1 is settled by your instruction or by the corrected baseline.

| ID | Decision | Recommendation |
|---|---|---|
| U1 | Remove the illustrative review sheet (it was part of the approved `DEC-092` page)? | Yes. Real figures now do its job; keep its attribution note as one sentence |
| U2 | Replace the auto-populating "SEO case studies" card section (`RelatedCaseCards`, which adds future SEO studies without code) with a hand-composed proof scene? | Yes for now. A third SEO case later becomes a small design edit |
| U3 | Show the three ACB figures with growth percentages on `/seo`, not only on the case page? | Yes, with the caveat adjacent; it is the page's only strong evidence |

**Next step if approved:** record the decision lifting `DEC-092` for this change, build locally on a branch from the six-cases baseline, update `tests/seo-page.test.cjs`, capture 1440, 390 and 360, then return for visual approval. No commit, push, Contentful change or deploy without separate authorisation.
