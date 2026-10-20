# Google Ads — G1 Visual Redesign Proposal, Revision 2

**Date:** 2026-10-16 · **Responds to:** owner review of the G1 screenshots ("static page NOT APPROVED") · **Basis:** DEC-053, storyboard v4, `copy.ts` (G0/G0.1)
**Status (updated 2026-10-16): IMPLEMENTED AS REVISION 2 AND OWNER-APPROVED VISUALLY; THIS DOCUMENT HAS BEEN CORRECTED TO MATCH WHAT WAS BUILT.** The R2 build is commit `74aec4e`; two bounded follow-ups were then applied, G1.1 (`1f3b5af`) and G1.2 (`33940ec`), so the **current build is `33940ec`** on `feat/google-ads-redesign` (pushed; no PR; not merged; not deployed). It was written as a design-only proposal and approved by the owner on 2026-10-16 (decisions A to J, with the owner's recommendations); the owner then approved the built look. §11 records where the build differs from the original proposal, §12 the owner feedback comparison and §13 the verification evidence. G2 (motion) is not started and is not authorised.

---

## 0. What went wrong in G1, and what the approved site actually looks like

**My own assessment of G1.** I built the seven blocks as formatted text sections: a list of questions, a list of tick rows, two columns of bullets, a six-column paragraph strip. The Path Figure was a diagram that needed explaining. Headings lost the black/orange emphasis (I dropped `b-named`). The result carried about **1,160 words** of customer-facing copy, and most of them were visible at once.

**What the approved C+ pages do instead** (I rendered `/seo` and `/how-it-works` from the same build and compared them; `/` did not load locally, so it is not part of this comparison):
- **Two-colour headings everywhere:** plain words in black (or white on ink) and the point in orange: "Where SEO **usually goes wrong.**", "What our SEO work **includes.**", "First, we get to **know your business.**"
- **Icon-led figures instead of paragraphs:** icon cards, a small journey trail with numbered markers, "illustrative layout" mock panels with hatched placeholder bars, orange "plus" controls for disclosure.
- **One idea per section, one dominant visual**, with a short lede (one or two lines) and generous whitespace; ink sections used sparingly for a mock panel; a tangerine close with one headline and two buttons.
- **Orange used for meaning:** the thing being measured, the current step, the call to action.

This proposal rebuilds each Google Ads block on those terms. It does **not** copy the SEO composition (no hero trail, no staircase cards, no performance-review panel layout).

---

## 1. Revised section architecture

| # | Section | Surface | One idea | Dominant visual | Interaction |
|---|---|---|---|---|---|
| 1 | **Hero** | Ground | What we do, and who is paid for what | The One Click receipt, now following a search | Pick a stage: Search, Click, Visit, Enquiry |
| 2 | **What we look at** | Paper | Six things decide if Google Ads suits you | A framework of six tiles in three groups | Pick a tile to read why it matters |
| 3 | **From budget to enquiry** | **Ink** | One search can end four ways | Journey of four stations, two readouts, who acts | Pick an ending |
| 4 | **What the work covers** | Ground | What is in the fee, and what is not | A solid frame (in the fee) beside a dashed box (agreed separately) | None |
| 5 | **What we answer for** | **Ink** | What we take responsibility for | Four pledge cards | None |
| 6 | **What you learn each month** | Paper | A finding becomes a decision | A mock monthly report with one worked example | Pick a finding |
| 7 | **What happens after you get in touch** *(new section)* | Ground | The six steps | A compact icon strip | None |
| 8 | **Close** | **Tangerine** | Decide and act | A headline and two buttons | None |

**Rhythm:** ground, paper, ink, ground, ink, paper, ground, tangerine. No two ink sections are adjacent; the dark moments are the journey (3) and the accountability (5).

**Architecture change needing your approval (item A in §9):** the approved seven blocks become **eight sections**. The seven narrative blocks are unchanged; block 7 ("Next step") is split into a process section (7) and a short closing call to action (8), as you asked. *Alternative:* keep one block with a visual divider between the process and the call to action. I recommend the split because the two jobs (reassure, then ask) need different surfaces.

---

## 2. Design language rules for the whole page

1. **Two-colour headings on every H1 and H2, except the close.** Plain words black on light surfaces, white on ink; the closing phrase orange. The close sits on the tangerine surface, where an orange phrase would be invisible, so its heading is a single ink colour (as on the approved SEO and Services closes). Splits: see §3.
2. **Orange means something:** the current step, the part of the service that is ours, the call to action. It is never decoration.
3. **Boundary device, kept and simplified:** a **solid frame with ticks** is the service; a **dashed outline with an empty box** is agreed separately. It appears on the receipt, the journey's "who acts" row and the work-covers diagram, and nowhere else. A plain empty box, or a hatched swatch, is neutral. **One inherited exception:** the receipt's "Paid to Google" tag and its tear line are dashed, as in the approved prototype receipt; no other element uses a dashed outline.
4. **Text budget:** no section shows more than one short lede plus the graphic. Detail sits one tap away or in the graphic's labels.
5. **Icons, not bullets:** the existing icon set (`search`, `cursor`, `page`, `form`, `user`, `phone`, `message`, `chart`, `check`, `cross`, `wrench`, `build`, `eyeoff`, `target`, `arrow`) covers every figure here. No new illustration style.
6. **Interaction only where it replaces text** (see the "why" under each section). There are four selectors: hero stage, factor, ending, finding. Nothing else moves or changes on interaction.
7. **No motion at this stage.** G2 remains unauthorised. All states are designed as static compositions first.

---

## 3. Section by section

### 3.1 Hero

**Concept.** The receipt is the story of **one search**. The visitor follows it from search to click to website visit to enquiry, and sees at each stage who is paid and what we do.

**What the visitor sees.**
- Left: breadcrumb, kicker, H1 (unchanged), **one** short paragraph, two buttons.
- Right: the One Click receipt in its established identity (paper, 3 px ink border, tangerine offset shadow, tilt, tear, dotted leaders, dashed "Paid to Google", solid orange "Paid to us, separately"), with a four-button stage selector beneath it.

```
 We run your ads.                    FOLLOW ONE SEARCH
 We look beyond the click.           ( Search )(Click)(Visit)(Enquiry)
                                     ┌──────────────────────┐
 One short paragraph.                │ One click            │
 [Tell us…] [Book a call]            │ WHERE YOUR MONEY GOES│ Paid to Google
                                     │ ▌Someone searches    │ ← lit at "Search"
                                     │  Your ad appears     │
                                     │  They click it       │ ← lit at "Click"
                                     │ ✂ THE CLICK ✂        │
                                     │ WHAT OUR FEE COVERS  │ Paid to us, separately
                                     │ ■ Choosing searches  │ ← lit at "Search"
                                     │ ■ Writing ads        │ ← lit at "Click"
                                     │ ■ Managing budget    │ ← lit at "Click"
                                     │ ■ Checking website…  │ ← lit at "Visit", "Enquiry"
                                     │ ┌╌ fixes: separate ╌┐│ ← outlined at "Enquiry"
                                     └──────────────────────┘
```

**Interaction (the stage selector).** Four icon buttons (`search`, `cursor`, `page`, `form`) form one radio group. The selected stage **lights the receipt lines that belong to it** in orange, so the receipt itself answers "what happens here, who is paid, what do we do":

| Stage | Lit on Google's half | Lit on our half |
|---|---|---|
| Search | "Someone searches for what you sell" | "Choosing which searches your ads show for" |
| Click | "Your ad appears", "They click it", and the "Paid to Google" tag | "Writing and improving your ads", "Managing your budget" |
| Visit | none | "Checking your website and enquiry route" |
| Enquiry | none | "Checking your website and enquiry route", and the dashed footer "Fixes to your website or tracking: agreed separately" outlined in orange |

**Why this beats text.** The two things people misread are *what they pay Google for* and *what the fee covers*. A paragraph can only list them; the receipt shows the click as the line where money leaves, and the stage selector shows which of our lines act before and after it.

**Copy (proposed; reductions flagged in §5).** One paragraph replaces two:
> We manage your Google Ads: your ads, searches and budget. We also check that your website makes it easy to enquire. If we find a problem with your website or tracking, we’ll explain it. Fixing it is agreed separately.

Receipt lines, tags and caption: **unchanged from `copy.ts`.** New micro-copy: the four stage labels (Search, Click, Visit, Enquiry) and a group label for screen readers ("Follow one search").

**Desktop.** Six-column copy beside a five-column receipt (the existing hero grid), the stage selector sits **above** the receipt so it is visible in the first screen. **Mobile (< 768 px).** Single column: breadcrumb, kicker, H1, paragraph, **both buttons**, then the four-button stage selector and the receipt (no tilt); the buttons are at least 60 px tall.

**Components.** Reuse: hero grid, `.ga-rc*`, `ActionPair`, `Icon`. **New:** a CSS-only radio group using `:has(input:checked)` to light lines. **No JavaScript**, so it works with scripts off, with a keyboard (arrow keys move between radios natively) and under reduced motion. The no-JS and no-`:has()` fallback is the full receipt, unlit, with the selector hidden.

**DEC-053.** OD-01, OD-02 (receipt tags, "Paid to us, separately"), OD-10 (both CTAs), F-2 (dashed footer), H1 and the "agreed separately" boundary are all retained.

---

### 3.2 What we look at before suggesting Google Ads

**Concept.** A **decision framework**: six tiles in three groups, read one at a time. No score, no result, no recommendation.

**What the visitor sees.** Six tiles in a 3 × 2 grid, paired by group (the market, your business, your website). **Each tile carries its group as a small eyebrow above its label (12 px; it was 11 px until G1.1); there are no separate group headings, because the existing `Tabs` component renders one flat list.** Each tile is an icon, the group eyebrow and a compact label. The first tile is selected by default; a detail panel beside (or, on mobile, below) shows its approved question and one-sentence answer.

```
 What we look at before suggesting Google Ads.        ┌ Search demand ───────────────┐
 Google Ads isn't right for every business.           │ Are people already searching │
 Here's what we look at.                              │ for what you sell?           │
                                                      │ Google Ads reaches people    │
 THE MARKET     [Search demand▮] [Other routes]       │ who are searching. If few    │
 YOUR BUSINESS  [Customer value] [Your response]      │ are, it may not be the right │
 YOUR WEBSITE   [Enquiry route]  [Tracking]           │ way to reach them.           │
                                                      └──────────────────────────────┘
 No score. We talk these through with you first, and tell you when something else may suit you better.
```

| Group (new micro-copy) | Tile label (new micro-copy) | Approved question shown in the detail panel |
|---|---|---|
| The market | Search demand | Are people already searching for what you sell? |
| The market | Other routes | What else could reach the same people? (with the SEO and social-ads links) |
| Your business | Customer value | What is a new customer worth to you? |
| Your business | Your response | Can your business answer enquiries when they arrive? |
| Your website | Enquiry route | Can people easily enquire on your website? |
| Your website | Tracking | Can your enquiries be tracked? |

**Why this beats text.** Six stacked question-and-answer rows read as a form to fill in. Grouping the six into three areas shows the *shape* of the decision (the market, your business, your site) at a glance, and one-at-a-time reading removes the wall of text. No scoring is implied: tiles cannot be ticked, ranked or totalled.

**Interaction and the disclosure rule.** The approved UX rule (`03_PAGE_TYPE_ARCHITECTURE.md` §14) permits collapsed-on-load accordions on the FAQ only, and never for anything a reader needs to evaluate a claim. This proposal therefore uses a **master-detail selector, not an accordion**: a detail panel is always visible (first tile selected on load), and every tile's content is in the page without JavaScript. If you prefer a true accordion, that is a documented exception for you to approve (item F).

**Desktop.** Tiles 3 × 2 on the left (7/12), detail panel on the right (5/12). **Mobile.** Tiles in a two-column grid; the detail panel sits below the grid; each tile ≥ 56 px.

**Components.** Reuse `Tabs` (`components/cplus/Interactive.tsx`): all panels shown stacked without JavaScript, arrow keys, `aria-selected`. New CSS for the grouped tile layout. **No new client component.**

**DEC-053.** OD-09 (suitability discussed before recommending, including when another approach may suit better) is kept in the closing line; no score; the tracking limit ("how far it can go depends on your website") is kept verbatim in the Tracking panel.

---

### 3.3 From budget to enquiry — rebuilt around **one search and four endings**

**Concept.** Follow one search. It can end four ways. For each ending, show three things side by side and nothing else:
1. **Where the journey stopped** (the visitor).
2. **What Google Ads records** at that point.
3. **What the business actually sees**, and **who acts**.

**What the visitor sees.** A dark section. A four-card selector (each card an icon and the ending's name), a four-station journey (Search → Click → Visit → Enquiry) with the stations the search reached filled in orange and the station where it stopped ringed, two readout panels labelled with the approved lane titles, and a "who acts" strip.

```
 From your budget to an enquiry — and where it can go wrong.
 Google Ads reports what it's set up to record. That isn't always the same as a genuine enquiry.

 [A genuine enquiry]  [The wrong person clicks]  [The page doesn't answer]  [A recorded action that isn't an enquiry]

   (search)──────(click)──────(visit)──────(enquiry)
       ●─────────────●─────────────○ ✕ ✕                       ← filled to where this search ended; the end station is ringed

 ┌ WHAT GOOGLE ADS CAN RECORD ──────┐   ┌ WHAT YOUR BUSINESS NEEDS TO KNOW ─┐
 │ ■ Ad shown   ■ Click             │   │ Whether it was a genuine enquiry — │
 │ □ A recorded action              │   │ a real person, reachable, asking   │
 └──────────────────────────────────┘   │ about your work.        ✓ / ✗      │
                                        └────────────────────────────────────┘
 ■ We manage this.        or       ■ We find and recommend.  ┆ Changing the page is agreed separately. ┆
```

| Ending | Journey stops | Google Ads records | The business sees | Who acts |
|---|---|---|---|---|
| **A genuine enquiry** | Enquiry | Ad shown, click, a recorded action | A genuine enquiry ✓ | — (the calm state) |
| **The wrong person clicks** | Click | Ad shown, click | No genuine enquiry | ■ **We manage this** (searches and campaigns) |
| **The page doesn't answer** | Visit | Ad shown, click | No genuine enquiry | ■ **We find and recommend** + ┆ *Changing the page is agreed separately* ┆ |
| **A recorded action that isn't an enquiry** | Enquiry (but not genuine) | Ad shown, click, **a recorded action ✓** | **Not a genuine enquiry ✗** | ■ **We find and recommend** + ┆ *Tracking repairs are agreed separately* ┆ |

**Why this beats text and the G1 timeline.** The G1 figure showed five dots, two rails and checkboxes, and asked the visitor to decode them. Here the visitor picks a *story* (a search that went wrong in a particular way) and sees only the three facts that differ between stories: where it stopped, what the report says, what the business sees. The misleading recorded action (ending D) is the only ending where the two readouts **disagree**, which is the whole point of the section, and it is visible without reading a sentence. The "who acts" strip makes the commercial boundary part of the story: a problem is either ours to manage (ticked) or ours to find and recommend, with the fix agreed separately (ticked, then dashed).

**Copy.** All strings are existing `copy.ts` text (readout titles, items, case sentences, actor and "agreed separately" lines, the single use of "conversion" and its explanation). **New micro-copy:** four station labels (Search, Click, Visit, Enquiry) and one card label ("A genuine enquiry"); the other three card labels are the existing tab labels, lightly shortened. **Cut:** the five long step labels and the duplicate sentence "Not every enquiry can be traced to an ad" from this section's closing line (it stays in the reporting section).

**Interaction.** Four cards form a selector; selecting one changes which stations are filled and ringed, both readouts and the who-acts strip. First card selected on load. Keyboard: arrows, Home, End. Reduced motion: instant changes (there is no motion at this stage). No JavaScript: all four endings are shown stacked, each with its heading.

**Desktop.** Four cards across; journey, then the two readouts side by side, then the who-acts strip. **Mobile.** Cards in a 2 × 2 grid; the journey runs **vertically** with the marker on the left; the two readouts stack; who-acts below.

**Components.** Reuse `Tabs` (tab labels as icon cards), `.ga-tick`, `Icon`. New CSS for stations, marker, readouts. **No new client component.**

**DEC-053.** The recorded-action versus genuine-enquiry distinction (and the single explained use of "conversion", OD-11), the tracking qualification ("as far as your tracking allows"), the F-2 boundary on the two endings that involve the website or tracking, and "Only where tracking is set up" are all retained.

---

### 3.4 What the work covers — the boundary as a picture

**Concept.** One solid frame labelled **"Covered by our management fee"** holds the two service layers; one dashed box **outside the frame** holds the work that is agreed separately. The visitor reads the boundary from the shape before reading a word.

**What the visitor sees.**

```
 What the work covers.
 Management and oversight are covered by our management fee. Anything we'd build or fix … is agreed separately.

 ┏━ COVERED BY OUR MANAGEMENT FEE ━━━━━━━━━━━━━━━━━━━━━━━┓    ┌ ╌ AGREED SEPARATELY ╌ ╌ ╌ ╌ ╌ ┐
 ┃ We run your Google Ads       ✂ THE CLICK ✂  We look    ┃    ┆ ☐ Landing pages               ┆
 ┃ ■ Set up and manage          beyond the click          ┃    ┆ ☐ Website and form fixes      ┆
 ┃ ■ Write and improve ads      ■ Review the landing page ┃    ┆ ☐ New or repaired tracking    ┆
 ┃ ■ Manage the budget          ■ Check people can enquire┃    └ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ┘
 ┃ ■ Review and improve         ■ Spot website/tracking … ┃
 ┃                              ■ Explain and recommend   ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Copy reduction.** Items become short chips (new micro-copy, 3 to 5 words each), the approved sentences are kept in `copy.ts`. **Since G1.1 each chip gives assistive technology its full approved sentence once, as visually hidden text, with the short visible label hidden from it; the earlier `title` tooltip was removed (see §11 item 4).** The Block 4 callout (the same sentence as the hero) is **removed**, because the hero and this section's sub-line already state it.

| Layer | Chip labels (proposed) |
|---|---|
| Core service | Set up and manage · Write and improve ads · Manage the budget · Review and improve campaigns |
| Oversight | Review the landing page · Check people can enquire · Spot website and tracking problems · Explain and recommend |
| Agreed separately | Landing pages · Website and form fixes · New or repaired tracking |

**Why this beats text.** Eleven bullet points ask the visitor to remember which ones are in the fee. A frame with a dashed neighbour answers the single question they have ("what's in the fee?") without reading the bullets.

**Interaction.** None. This is a static diagram. **Desktop.** Frame (two layers side by side with the click tear between them) on the left, the dashed box on the right. **Mobile.** The frame stacks its two layers with the tear as a horizontal line; the dashed box sits below, visibly detached (a gap and a dashed border). **Components.** Reuse `.ga-groups`/`.ga-vtear`/`.ga-tick`, `Icon`. New CSS for the frame. **No JavaScript.**

**DEC-053.** OD-01, F-2 (three layers, exact lists), no fee schedule, no claim that every technical task is included.

---

### 3.5 What we answer for — four pledges

**Concept.** Replace the six tick rows with **four pledge cards** on an ink surface, each a single verb phrase and one sentence, emphasising what you asked: budget responsibility, clear explanations, honest reporting, corrective decisions. All six approved commitments are folded in, none is dropped or softened.

```
 What we answer for.                         These are ours to get right.

 [ $ Your budget ]   [ Clear reasons ]   [ Honest reporting ]   [ Corrective action ]
 We manage it and    We explain          A performance report   If results disappoint,
 adjust campaigns    significant changes and a review call every we tell you and
 when results call   and why. We review   month. We use what     recommend what to
 for it. Before      your website and     they show to decide    change.
 significant changes enquiry route and    what to do next.
 we record your      recommend
 starting performance, improvements;
 where available.    making them is
                     agreed separately.

 ▌ We cannot promise a number of enquiries or what each will cost. Your market, prices, competitors and how quickly you answer all play a part.   (solid strip with an orange bar)
 Our management fee is separate from your ad spend. What it depends on is on the pricing page.
```

| Pledge card | Commitments carried (DEC-053) |
|---|---|
| **Your budget** | OD-06 adjust campaigns when results call for it; OD-07 record starting performance where available |
| **Clear reasons** | OD-05 explain significant changes and why; F-2 review website and enquiry route, recommend; changes agreed separately |
| **Honest reporting** | OD-03 monthly report and review call; OD-04 use what they show to decide what to do next |
| **Corrective action** | OD-05 proactively tell you when results disappoint and recommend what to change |

**Why this beats text.** Six items that start with the same pattern read as a policy list. Four named pledges give the visitor four things to remember and hold us to. The qualification becomes a calm strip with a solid outline and an orange bar instead of competing with the pledges; it is not dashed, because dashed is reserved for "agreed separately".

**Copy reduction.** The lede "You pay Google for the clicks. You pay us to run the work well." is dropped (the receipt carries it); "These are ours to get right." stays. Pledge sentences are the approved ones, grouped; wording is unchanged unless noted in §5. **Interaction:** none. **Desktop:** four columns. **Mobile:** four stacked cards, full width. **Components:** CSS only (icon, title, sentence). **Surface:** ink, with white/orange heading.

**DEC-053.** Every approved commitment, the single qualification (no contractions, no promised volume or cost), and the separate-fee line with the pricing link are retained. No claim that we control sales, guarantee volume or cost, or can attribute every enquiry.

---

### 3.6 What you learn each month — one worked example

**Concept.** Show **how a real type of finding becomes a business decision** with one mock monthly report. The visitor selects a finding and sees the decision it leads to. No data is invented: the report is an *illustrative layout* with hatched placeholder bars and the caption "Illustrative layout. No real figures."

```
 What you learn each month, and what we do with it.
 ┌ A MONTHLY REPORT · where the data allows ───────────────┐   ┌ WHAT WE DO ────────────────────────┐
 │ Which campaigns brought enquiries   ▒▒▒▒▒▒▒░░░           │   │ Finding                             │
 │ Which searches brought them         ▒▒▒░░░░░░░           │   │  Some searches bring clicks but few │
 │ How that compares with the starting point we recorded ▒▒ │   │  enquiries                          │
 │ ┌ Findings ────────────────────────────────────────────┐ │   │        ↓                            │
 │ │ ▸ Some searches bring enquiries                      │ │   │ We check whether they're the right │
 │ │ ● Some searches bring clicks but few enquiries       │ │   │ searches, and decide whether to     │
 │ │ ▸ A page gets visits but no enquiries                │ │   │ change or stop them.                │
 │ │ ▨ Source unknown   (hatched swatch)                  │ │   └─────────────────────────────────────┘
 │ └──────────────────────────────────────────────────────┘ │
 └──────────────────────────────────────────────────────────┘
 Not every enquiry can be traced to an ad. A phone call after someone saw your ad is a common example. Where we cannot tell, we say so. …
```

**Interaction.** Three findings are selectable rows inside the report. The default is **"Some searches bring clicks but few enquiries"** (owner decision D1, option B, applied in G1.1): the finding that shows an investigation most clearly. Unselected finding rows use the control-grey border (3.47:1, G1.2). Selecting a row shows its approved decision sentence in the "What we do" card; the third finding's card also states "Making them is agreed separately". A fourth, **non-selectable "Source unknown" row with a hatched swatch (not dashed)**, sits in the report as the visual form of the attribution limit; the full limit sentence is printed beneath. Keyboard: arrows, Home, End. No JavaScript: all three findings and their decisions are shown as stacked pairs.

**Why this beats text.** Three pairs of "finding, then decision" sentences repeat the accountability section and read as promises. A report with a selected finding shows the *mechanism*: a finding is read, investigated and turned into a decision. The hatched "Source unknown" row shows honest measurement as a normal part of the report, not a disclaimer.

**Copy reduction.** The three questions become the report's three section headings (no separate list); "Each month you get a report and a review call. Where the data allows, it covers:" becomes the report's header strip. "For example" stays as the label of the findings list. The limit sentence is kept in full (it is the honesty principle you asked to preserve). The `/how-it-works` link and the related links are retained.

**Desktop.** Report (7/12) beside the decision card (5/12). **Mobile.** Report first, then the decision card **below the whole findings list** (the existing `Tabs` places panels after the tab list, so the card cannot sit directly under the selected row); report rows full width, ≥ 56 px. **Components.** Reuse `Tabs` (vertical list styling), `.ga-limit`, `TLink`, `InlineLink`. New CSS for the mock report; the hatched placeholder bars are CSS gradients, no data. **Surface:** paper. **No new client component.**

**DEC-053.** OD-03, OD-04 (report and call; campaigns, searches, comparison with the starting point, "where the data allows"), the investigate-then-decide wording, "Making them is agreed separately", and the attribution limit.

---

### 3.7 What happens after you get in touch *(new section)*

**Concept.** A compact **six-step strip**, separate from the call to action. Icons carry the steps; one short line each, reusing the live How It Works and FAQ wording.

| Step | Icon | Line (approved) |
|---|---|---|
| Get in touch | `message` | You send a message. We reply by email or WhatsApp. |
| Discovery call | `phone` | We learn what you sell, who buys it and what you want more of. |
| Audit | `search` | We review what we can learn about your business before recommending next steps. |
| Proposal | `page` | The work we propose, described so you can judge it. |
| Your approval | `check` | Agreed work starts after you approve. |
| Work begins | `arrow` | We start the agreed work. |

Beneath: "You see our findings, a recommended plan and a proposal before any work starts." (OD-08).

**Heading (new micro-copy, for approval):** "What happens **after you get in touch.**"

**Why this beats text.** A six-item sentence list reads as a contract; icons on a line read as a path the visitor can see the end of. **Desktop:** one row of six. **Mobile:** vertical list with a connecting line. **Interaction:** none. **Components:** `Icon`, new CSS `.ga-steps`. **Surface:** ground.

**DEC-053.** OD-08 and the confirmed process only: no free offer, no price, no response time, no call length.

---

### 3.8 Close — short, decisive, tangerine

**Concept.** The existing shared C+ close: tangerine surface, one large two-colour headline, two stacked buttons. Nothing else competes with them.

**Copy (proposed):**
- Heading (unchanged): "Already running Google Ads, **or thinking about it?**"
- Two one-line prompts (shortened):
  - **Already advertising?** Tell us what you spend and what you’re getting.
  - **Thinking about it?** Tell us what you sell and what a new customer is worth.
- Buttons (unchanged): **Tell us what you’re trying to fix** and **Book a call**.

**Layout.** Desktop: heading left, buttons right (the existing `b-close-in`), the two prompts as two plain lines under the heading. Mobile: heading, prompts, buttons stacked full width (primary first). **Components:** the existing `.b-close`, `ActionPair`. **Interaction:** none.

**DEC-053.** OD-10 (both CTAs, with `/contact` and `/schedule-call`). The Calendly event's live availability is still an owner dependency.

---

## 4. Why each visual device exists

| Device | Understanding it adds that text cannot |
|---|---|
| Receipt stage selector | Shows *where* in a search money leaves and *which* of our lines act before and after it |
| Factor framework | Shows the shape of a decision (market, business, website) and removes the wall of questions |
| Journey with four endings | Shows that one search can end four ways and that Google Ads' report and the business' reality can **disagree** |
| Frame versus dashed box | Shows the fee boundary as a shape |
| Four pledge cards | Gives four things to remember and hold us to |
| Mock monthly report | Shows a finding turning into a decision and honest measurement as part of the report |
| Icon process strip | Shows the end of the path |

Not interactive, on purpose: the work-covers diagram, the pledge cards, the process strip and the close. They are read, not explored.

---

## 5. Copy reductions and new micro-copy (all need your approval; `copy.ts` and its tests are not changed)

**Customer-facing words in the G1 build, by block (my count of `copy.ts` strings): hero 134 · factors 179 · path 251 · scope 130 · answer 162 · reporting 172 · next 136 = 1,164.** **Measured result in the build (74aec4e):** words visible by default fall from 1,164 to **890** (about 24 % fewer), by section 139 / 90 / 136 / 89 / 143 / 159 / 90 / 44 (hero, factors, journey, scope, answer, reporting, process, close). The **40 to 60 %** estimate originally written here was not met. The DOM holds more words (about 1,357) because the one-at-a-time panels and the no-JavaScript headings are all in the page. Reductions that remain available are listed in §11.

| Section | What is cut or merged | What is new |
|---|---|---|
| Hero | Two paragraphs become one (about 55 → 38 words) | Stage labels (4), group label |
| Factors | Lede shortened; closing line shortened (26 → 20 words); six Q&A rows become six tiles plus one visible panel | 3 group labels, 6 tile labels |
| Path | Five long step labels removed; the second "Not every enquiry can be traced" sentence removed here (kept in reporting) | 4 station labels, 1 card label |
| Scope | Callout removed (duplicates hero); items become short chips | Frame label "Covered by our management fee", 11 chip labels |
| Answer | Lede cut to "These are ours to get right."; six rows folded into four pledges | 4 pledge titles |
| Reporting | List of three questions becomes the report's headings; lede shortened | Report header strip (reuses lede words) |
| Process | Moved out of the close | Heading "What happens after you get in touch." |
| Close | Two cards become two one-line prompts (about 24 words) | — |

Every cut removes or compresses approved wording; **no commitment, qualifier or boundary sentence is removed.** The H1 and the receipt lines are unchanged.

---

## 6. Component reuse and new-component implications

| Need | Reuse | New |
|---|---|---|
| Two-colour headings | `.b-h1`, `.b-h2`, `.b-named` | Heading strings split into black part and orange part (a **shape change** in `copy.ts`; wording unchanged) |
| Hero receipt | `.ga-rc*`, `ActionPair`, `Icon` | CSS-only radio stage selector (`:has(input:checked)`) |
| Factor framework | `Tabs`, `Icon` | CSS for grouped tiles |
| Journey and endings | `Tabs`, `Icon`, `.ga-tick` | CSS for stations, marker, readouts, who-acts strip |
| Work-covers diagram | `.ga-groups`, `.ga-vtear` | CSS for the frame and the dashed box |
| Pledge cards | `Icon`, ink surface | CSS only |
| Mock report | `Tabs`, `.ga-limit`, `TLink`, `InlineLink` | CSS for the report and hatched placeholders |
| Process strip | `Icon` | CSS `.ga-steps` |
| Close | `.b-close`, `ActionPair` | None |

**New client components: none.** Three selectors reuse the existing `Tabs`; the hero selector is native radios styled with `:has()`, which the site already uses. **No new dependency, no new analytics event.** `google-ads.css` grows and `GoogleAdsBody.tsx` is rewritten.

---

## 7. Accessibility, responsive and no-JavaScript summary

- One H1 and **seven** H2s (hero is the H1; the process section is the added one); H3s are the three scope layers and the four pledge titles, plus per-panel headings that are shown only when JavaScript is off; no skipped levels.
- Two-colour headings: orange text on ground/paper uses the existing `--dc-tang-display`, on ink the brighter `--dc-tang` (the same pairs as the approved pages); every new colour pair is contrast-tested before approval.
- Tab-based selectors: native keyboard behaviour (`Tabs`); without JavaScript every panel is shown stacked with a heading. The hero radio group works without JavaScript.
- Meaning never relies on colour: the boundary has words, ticks versus dashes, and frame versus dashed box.
- Mobile: single column everywhere; selectors wrap or stack; tap targets ≥ 48 px; no horizontal scroll from 320 px; no rotation on the receipt.
- No motion in this revision.

---

## 8. Explicit preservation of DEC-053

| Decision | Where it is kept |
|---|---|
| OD-01 fee covers management and oversight | Frame label and sub-line (3.4), receipt (3.1) |
| OD-02 spend paid to Google; separate fee | Receipt tags (3.1); fee line (3.5) |
| OD-03 monthly report and call | Pledge "Honest reporting" (3.5); report (3.6) |
| OD-04 campaigns, searches, comparison with the starting point, where data allows | Report headings (3.6) |
| OD-05 explain changes; proactively raise poor results; recommend action | Pledges "Clear reasons", "Corrective action" (3.5) |
| OD-06 adjust campaigns when needed | Pledge "Your budget" (3.5) |
| OD-07 record available baseline before significant changes | Pledge "Your budget" (3.5) |
| OD-08 process, plan before work | Process section (3.7) |
| OD-09 suitability discussed first | Closing line (3.2) |
| OD-10 both CTAs | Hero (3.1), close (3.8) |
| OD-11 "conversion" once, explained | Journey (3.3) |
| F-2 three layers; no automatic fixes | Hero paragraph, receipt footer, frame/dashed box, pledges, journey strip, findings |
| H1, metadata, structured data | H1 unchanged; `page.tsx` and metadata not touched |

---

## 9. Decisions I need from you

| # | Decision | My recommendation |
|---|---|---|
| A | **Split the close into a process section and a short CTA** (eight sections, seven narrative blocks) | Approve the split |
| B | **Heading emphasis:** split each heading into black and orange parts (`copy.ts` shape change; wording unchanged; tests updated to assert the joined text) | Approve; splits are in §2 and §3 |
| C | **Hero paragraph** consolidated into one (§3.1) | Approve the proposed wording |
| D | **New micro-copy:** stage labels, factor group and tile labels, station and card labels, frame label, chip labels, pledge titles, process heading | Approve, or edit the lists in §3 and §5 |
| E | **Copy cuts:** remove the Block 4 callout; shorten the factors lede and closing line; drop the lede "You pay Google…"; drop the duplicate "Not every enquiry…" from the journey close; shorten the close prompts | Approve; the close prompts lose the clause "whether you can tell which enquiries came from it", so tell me if you want it kept |
| F | **Factor disclosure:** master-detail (always one visible) rather than a collapsed accordion | Approve master-detail; a true accordion would be an exception to the FAQ-only rule in `03_PAGE_TYPE_ARCHITECTURE.md` §14 |
| G | **Mock report** with hatched placeholder bars and "Illustrative layout. No real figures." | Approve |
| H | **Journey ending names** (including the new "A genuine enquiry") | Approve |
| I | **Close headline:** keep "Already running Google Ads, or thinking about it?" | Keep (approved wording) |
| J | **Next step after approval:** a revised static G1 build for the same visual review, then motion as a separate gate | Agree |

---

## 10. Risks

- **Text can creep back** as labels and tiles are implemented; the review should count words visible on first load.
- **Hero radio selector depends on `:has()`.** It is already used elsewhere on the site, but the fallback (fully lit receipt, selector hidden) must be tested in WebKit and Firefox.
- **Four selectors may feel like a lot.** Each replaces a block of text; if you want fewer, the first to drop is the hero selector (the receipt still works unlit).
- **Mock report similarity to the SEO review panel.** The device (an illustrative panel with hatched bars) is shared C+ language; the composition (a selectable report beside a decision card, on paper rather than ink) is different, but you should confirm you are comfortable with the shared device.
- **Verification:** originally nothing in this proposal had been rendered. The build has since been rendered and checked at 1440, 768 and 390 px; the evidence and its limits are in §13 and §14.

---

## 11. Where the build (`74aec4e`) differs from the proposal above

Everything in §§1 to 10 has been corrected in place to match the build. These are the differences that were found when the document was compared with the implementation:

| # | Proposal said | Build does | Status |
|---|---|---|---|
| 1 | Stage selector beneath the receipt | Selector **above** the receipt, so it is visible in the first screen | Corrected in §3.1; deliberate |
| 2 | Three labelled groups of tiles | Six tiles with the group shown as a **small eyebrow on each tile**; no group headings (the existing `Tabs` renders one flat list) | Corrected in §3.2; deliberate |
| 3 | A marker shows where the search ended | Stations are **filled** up to where the search ended and the end station is **ringed**; no separate marker | Corrected in §3.3 |
| 4 | Chip sentences kept as `aria` descriptions | Kept as a **`title` tooltip** only. `title` is not reliably read by screen readers | **CLOSED in G1.1** (visually hidden full sentence; `title` removed) |
| 5 | Qualification as a dashed strip (diagram) | Solid strip with an orange bar; dashed is reserved for "agreed separately" | Corrected in §3.5 |
| 6 | "Source unknown" as a dashed row | A **hatched-swatch** row (not dashed) | Corrected in §3.6 |
| 7 | Default finding is "clicks but few enquiries" | Default is the **first** finding ("Some searches bring enquiries") | **RESOLVED in G1.1:** owner chose option B, so "clicks but few enquiries" is the default |
| 8 | On mobile the decision card sits under the selected finding | The card sits **below the whole findings list** (limit of the existing `Tabs`) | Corrected in §3.6 |
| 9 | Two-colour headings on every heading | **Single ink colour on the tangerine close**, because an orange phrase is invisible on orange | Corrected in §2 |
| 10 | Dashed outline "nowhere else" | The receipt's "Paid to Google" tag and tear line stay dashed (approved prototype receipt) | Corrected in §2 |
| 11 | Visible words fall to 40 to 60 % of G1 | They fall to **76 %** (1,164 → 890, about 24 % fewer) | Corrected in §5; **target not met** |
| 12 | Eight H2s; H3 only for scope layers | One H1, **seven** H2s; H3s also on the four pledges (and per-panel headings without JavaScript) | Corrected in §7 |
| 13 | (not specified) | The factor-tile eyebrow was **11 px** in `74aec4e` | Corrected to 12 px (the programme text floor) in G1.1 |
| 14 | (not specified) | Unselected finding rows used the decorative `--dc-line` border, **1.3:1** | Corrected to `--dc-control`, 3.47:1, in G1.2 |

## 12. Owner feedback on G1 and what R2 did about it

| # | Your feedback | What R2 does | Result |
|---|---|---|---|
| 1 | Hero: one paragraph; receipt as an interactive story; keep its identity | One 38-word paragraph; the receipt follows one search through Search, Click, Visit, Enquiry with a native radio selector that lights the lines; paper, tilt, tear, shadow and tags kept | Resolved |
| 2 | Before suggesting: a decision framework, all six factors, compact labels, progressive disclosure, no scoring | Six tiles with compact labels and group eyebrows, one factor read at a time (master-detail, not an accordion), no score or verdict | Resolved |
| 3 | Journey: rebuild from the ground up around one search; include success, unsuitable clicks, website problems and misleading recorded actions; show Google Ads versus the business versus our actions; keep the boundary | One search, four endings; journey stations, a "What Google Ads can record" panel, a "What your business needs to know" panel, and a who-acts strip that separates "we manage this" from "we find and recommend, fix agreed separately" | Resolved |
| 4 | Scope: keep three layers, less text, obvious boundary | Solid frame ("Covered by our management fee") beside a dashed box ("Agreed separately"); short chips; the duplicate callout removed | Resolved; the chip accessibility gap was closed in G1.1 |
| 5 | Answer: a stronger concept, every commitment preserved | Four pledges (budget, clear reasons, honest reporting, corrective action) carrying all six commitments | Resolved |
| 6 | Reporting: not a repeat of the accountability section; one interactive example; no invented data | One illustrative monthly report with hatched placeholders and a selectable finding that shows its decision | Resolved |
| 7 | Close: separate the process from the call to action; shorter, decisive; both actions | New "What happens after you get in touch" section; a short tangerine close with two prompts and both buttons; the section change was approved as decision A | Resolved |
| 8 | Two-colour headings, orange for meaning, better balance of text, whitespace and graphics | Two-colour headings everywhere except the tangerine close; orange used for the current stage, our lines and the actions | **Partly resolved:** heading treatment done; text volume only about 24 % lower |

**Not fully resolved:** how text-heavy the page still feels. Candidates for a further cut, none made: the pledge sentences (answer, 143 visible words), the attribution paragraph and the related-links line (reporting, 159), the journey's closing sentence and "conversion" line, the process descriptions and the factors lede.

## 13. Verification evidence for `74aec4e` (2026-10-16)

- **Build identity:** git clean at `74aec4e`; source files older than the build, the build older than the preview server; a clean `git archive` build of `74aec4e` produced **identical rendered markup** and **byte-identical CSS**. The JavaScript chunk differs only in webpack module ordering (builds are not reproducible).
- **Checks run:** copy guard 18 of 18 (32 of 32 deliberate breakages caught); full suite 75 pass, 0 fail, 1 skipped; typecheck, lint and two builds clean.
- **Page behaviour:** one H1 and seven H2s; all four selectors work with the mouse and the keyboard (arrows, Home, End; the radios wrap); every focus stop inside the page shows a ring (21 stops checked); with scripts off all 13 panels show stacked and the stage radios still work; no horizontal overflow at 320, 390, 640, 768, 1024 or 1440 px; text-spacing override clean at 390; 0 axe findings (WCAG 2.0/2.1 A and AA, plus best practice) at 1440 and across 13 interaction states at 390; the page's own elements have no animation or transition even with motion allowed (shared button hover aside); both CTAs resolve from the top and the close (`/contact`, `/schedule-call`, both HTTP 200); WebKit and Firefox render without overflow and the hero and journey selectors work.
- **Metadata:** title, description, canonical, Open Graph, Twitter and JSON-LD match production (local base URL normalised).
- **DEC-053 on the rendered page:** all of OD-01 to OD-11, the three-layer boundary and the approved H1 were checked against the served text; "conversion" appears once; no ROI, "return on", guarantee, "free" or digits.

### 13b. Verification evidence for G1.1 (`1f3b5af`) and G1.2 (`33940ec`) (2026-10-16)

- **What changed:** G1.1 raised the eyebrow to 12 px, gave each scope chip its full approved sentence once (visually hidden text, short label hidden from assistive technology, `title` removed), made "clicks but few enquiries" the default finding, and added guards for the 12 px floor and the chip markup. G1.2 changed one CSS declaration (unselected finding rows from `--dc-line` to `--dc-control`) and added a guard that no tab rule uses the decorative `--dc-line` border. G1.2 touched two files (14 insertions, 1 deletion).
- **Checks, run from a clean archive of `33940ec`:** copy guard 21 of 21; full suite 79 tests, 78 pass, 0 fail, 1 skipped (the export test against a disposable MariaDB, which needs `EXPORT_TEST_DB_ADMIN_*`); typecheck, lint and build clean; **mutation checks 11 of 11 behave as expected** (including a decorative hairline on a non-control row, which the guard correctly does not flag); the CSS of the clean build is byte-identical to the CSS the preview serves.
- **Page behaviour:** a text scan of every state finds **0 styles under 12 px** (185 styles) and no text-contrast failures; **17 marks and boundaries measured, all at least 3:1** (unselected finding row 3.47:1; selected and hover 16.8:1); against the previous build 14 of 14 unrelated section captures are pixel-identical, and only the reporting section changed; the chips' accessibility tree gives each full sentence once; 0 axe findings at 1440 px and across 13 interaction states at 390 px; all 21 keyboard stops show a ring; no overflow at 10 widths from 320 to 1440 px; both CTAs resolve; the served head matches production.
- **WebKit and Firefox:** full pages at 1440, 768 and 390 px render with no overflow or clipping and the selectors work. **The WebKit radio focus ring was closed by the owner's hand check in real Safari 26.2 on this Mac (2026-10-16):** Tab reached the stage buttons, the outline was visible and the arrow keys moved the selection. This is recorded as owner-reported. Playwright's WebKit is not a faithful stand-in for Safari's Tab behaviour.

## 14. Open items

**Closed since the first version of this list:** the chip sentences (G1.1), the default finding (G1.1), the 11 px eyebrow (G1.1), the finding-row border (G1.2), the WebKit radio focus ring (owner's real-Safari check), and the "WebKit and Firefox full-page layout" and "non-text contrast" items (verified, §13b).

1. **Real screen readers and real devices** (SR-1 to SR-5, E1) are not done. The owner's Safari keyboard check covers only the stage buttons. Playwright checks and axe are not a substitute.
2. **Calendly event:** `/schedule-call` links to `calendly.com/mappedskills/client-discovery` (page reachable); open slots and whether it is the intended event are unverified.
3. **Text volume:** about 24 % fewer words visible by default than the first static build, against the 40 to 60 % originally estimated.
4. **Consent and analytics regression** has not been re-run for this page.
5. **Not measured:** the contrast of the hatch pattern, gradients and focus rings. The contrast numbers come from a script over rendered colours, not a certified tool.
6. **Observation, not changed:** the shared `.px-tab` default in `cplus.css` still gives unselected tabs the decorative `--dc-line` border, and `/conversion-optimization` also uses it.
7. **The mutation checks and browser probes live outside the repository**; only the guard tests are in it.
8. **Code branch:** `feat/google-ads-redesign` is at `33940ec` with no pull request; nothing is merged or deployed; G2 (motion), pre-release QA and a code PR are not authorised.
9. **The `main` ruleset question** in DEC-064 item 4 is undecided.

---

**Document status.** Corrected to match the build `74aec4e` on 2026-10-16, then updated on 2026-10-16 for G1.1 (`1f3b5af`) and G1.2 (`33940ec`). It is kept as the design and implementation record for the R2 redesign (`DEC-064`).
