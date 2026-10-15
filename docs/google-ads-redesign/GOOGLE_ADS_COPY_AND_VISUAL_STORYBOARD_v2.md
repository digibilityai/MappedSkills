# Google Ads Copy & Visual Storyboard — `/google-ads` (v2, revised after owner review)

**Phase 1 · Revision 2 · 2026-10-15 · Branch `feat/seo-page-redesign` (untouched; no branch, commit, merge or deployment)**
**Status: OWNER APPROVAL IN PRINCIPLE, WITH CONDITIONS. IMPLEMENTATION NOT AUTHORISED.**
The first version is kept unchanged as `GOOGLE_ADS_COPY_AND_VISUAL_STORYBOARD_v1.md`. Both files are untracked documents; no source code was changed.

> **How to read the status tags.** **[OWNER-APPROVED]** wording the owner supplied or approved in review. **[PENDING]** an owner-dependent claim or commitment not yet confirmed; it must be confirmed (or the line removed) before the page is built. **[EXISTING LIVE COPY]** appears on the live site today, but that does not make it verified (owner decision F-1).

---

## 1. What changed from v1 (summary)

| Area | v1 | v2 |
|---|---|---|
| Hero lede | Two-sentence lede | Owner's shorter supporting copy, verbatim |
| Hero side note ("we'll say so") | Present | **Removed** (an unconfirmed behavioural promise; the Fit block now carries the idea neutrally) |
| Fit Check | Tick four boxes → verdict by count | **Educational checklist of factors we consider. No score, no verdict, no tick-counting.** Built from native disclosures: no JavaScript needed |
| Path Figure | Ad report "shows clicks only" | **Corrected:** Google Ads can also record "conversions" (actions it is set up to count). The figure now separates a *recorded action* from a *genuine enquiry* |
| Scope | 8 lines + glosses | **Three clearly different categories**, shorter, no glosses: set up and manage · check · change (agreed first) |
| Accountability | 5 commitments, longer | 5 one-line commitments + one qualification. All marked **[PENDING]** |
| Reporting | Included a sorting-tray animation | Tray animation **removed** (decorative). Attribution limit is a short static note inside reporting |
| Optimisation examples | "Give them more budget / stop showing" | **Investigation-and-decision** wording |
| Close | Six steps with sentences | Six compact steps, one line of explanation |
| Interactive components | Two new client components | **One** new client component (Path Figure). Fit Check needs none |

---

# 2. Page narrative (approved: seven blocks)

| # | Block | Question answered | Brief areas |
|---|---|---|---|
| 1 | Hero, with the One Click receipt | What do you do, and who do I pay for what? | 1, 2 |
| 2 | What we look at before suggesting Google Ads | Could this suit my business? | 3 |
| 3 | From budget to enquiry | Why can a report look good when the business is not? | 4 |
| 4 | What the work covers | What will you manage, check and change? | 6 |
| 5 | What we answer for | What are you responsible for? | 5 |
| 6 | What you learn each month | How will I know, and what do you do with it? | 7, 8 |
| 7 | Next step | What do I do, and what happens then? | 9 |

Implemented as owner-approved: One Click receipt kept in the hero · old ruler and the "supplier paid to manage spend" comparison removed · scope before accountability · attribution merged into reporting · four-item refusal list replaced by positive commitments and **one** concise qualification.

**Motion budget (owner: no decorative animation).** Only three graphics get bespoke motion: the **receipt** (print-in, once), the **Path Figure** (draw-in once, then user-selected states) and the **findings-to-decisions** graphic (arrows draw once). Everything else uses the site's standard section reveal (the existing `data-rv` behaviour) and nothing more. No looping, no ambient motion, no sticky elements.

---

# 3. Revised, publishable copy — block by block

Voice: "we" and "you"; sentence case; British/Indian spelling; contractions in commercial copy, none in the qualification and attribution-limit sentences (`VOICE_AND_TONE.md` §6). No ROI, figures, "free", guarantees, case studies, response times or invented reporting capabilities.

## Block 1 · Hero

**H1 [OWNER-APPROVED]:** **Google Ads, run for real enquiries — not just clicks.**

**Supporting copy [OWNER-APPROVED, verbatim]:**
> We manage your Google Ads to reach people looking for what you sell. We track the enquiries and improve what's not working.

*Note for the owner:* "We track the enquiries" is stated without qualification here because the copy is yours. The qualification (tracking depends on how your website and phone calls are set up; not every enquiry can be traced) appears in Blocks 3 and 6. Please confirm that is enough, or add a short qualifier to the hero.

**Kicker:** Google Ads · **Primary CTA:** Tell us what you're trying to fix *(unchanged)* · **Secondary CTA:** Book a call **[PENDING — F-2, see below]**.

**One Click receipt (retained):**

| Element | Text |
|---|---|
| Title | One click |
| Upper label / tag | Where your money goes · **Paid to Google** |
| Upper lines | Someone searches for what you sell · Your ad appears · They click it |
| Tear label | The click |
| Lower label / tag | What our fee pays for · **Paid to us, separately** |
| Lower lines | Choosing which searches your ads show for · Writing and improving your ads · Managing how your budget is spent · Checking the page and the enquiry route |
| Caption | Illustration. No amounts. |

**Pending:** "Paid to Google / paid to us, separately" and every lower line are **[PENDING]** (F-1 #1, F-2). The lower lines are deliberately limited to *setting up, managing and checking* — they do **not** claim that building website or tracking changes is covered by the fee.

**Graphic — receipt.** *Concept:* spend and fee are different payments for different things, divided by the click. *Visitor sees:* the paper receipt, upper half dashed ticks (not ours), lower half filled ticks. *Motion:* one print-in, top to bottom, then the tear line draws (≈ 1 s, once). *Why better than text:* the split is the most-misunderstood point in the category; a receipt is a format everyone reads. *Mobile:* full width, no rotation (existing). *Reduced motion / no JS:* fully drawn at load; all ticks visible.

## Block 2 · What we look at before suggesting Google Ads *(revised Fit Check)*

**Heading:** **What we look at before suggesting Google Ads.**

**Lead-in:**
> Google Ads isn't right for every business. These are the questions we go through with you.

**Six factors** (each a native disclosure; question visible, "why it matters" revealed on open):

| Question | Why it matters |
|---|---|
| **Are people already searching for what you sell?** | Google Ads reaches people who are searching. If few are, it may not be the right way to reach them. |
| **What is a new customer worth to you?** | This shapes how much it makes sense to spend to win one. |
| **Can people easily enquire on your website?** | Ads send people to a page. If they can't enquire there, the budget goes to waste. |
| **Can your business answer enquiries when they arrive?** | An enquiry only helps if someone responds to it. |
| **Can your enquiries be tracked?** | Tracking is what lets us learn which searches bring genuine enquiries. How far it can go depends on your website and how people contact you. |
| **What else could reach the same people?** | Sometimes search (SEO) or another channel fits better. See [SEO](/seo) and [social media ads](/social-media-ads). |

**Closing line:** **There's no score. We talk these through with you before suggesting anything.** *[PENDING: relies on the confirmed Discovery Call stage; "before suggesting anything" is a behavioural commitment.]*

**Revised Fit Check interaction.**
- **Concept communicated:** the decision to use Google Ads rests on factors specific to the business; the visitor sees what we weigh, not a verdict.
- **What the visitor sees:** six compact rows in a single list. Each row is a question in bold with a small "+" indicator.
- **How it works:** each row is a native `<details>`/`<summary>`. Opening a row reveals one sentence. Several can be open at once. **No ticks, no counting, no result panel, no score, no recommendations generated from user input, nothing sent or stored.** (An optional "notes to bring" list was considered and **not** proposed: it risks becoming a diagnostic.)
- **Why easier than text:** the visitor scans six questions in seconds and opens only the ones they care about.
- **Mobile:** full-width rows, ≥ 44 px targets, one column.
- **Reduced motion:** none needed (no animation beyond the browser's default disclosure). **No JavaScript:** works natively; all text is in the DOM. **Keyboard:** Tab, Enter/Space (native). **Screen reader:** native disclosure semantics.
- **Technical impact:** **no new client component**, which removes one item from the v1 build list.

## Block 3 · From budget to enquiry *(corrected Path Figure)*

**Heading:** **From your budget to an enquiry — and where it can go wrong.**

**Lead-in:**
> Google Ads reports what it's set up to record. That isn't always the same as a genuine enquiry.

**Five steps:**
1. **Your budget**
2. **Someone searches and clicks**
3. **They visit your website**
4. **They enquire**
5. **We learn what worked, and decide what to change**

**Two rails — corrected:**
- **What Google Ads can record:** ad shown · click · a "conversion" — *the action it has been set up to count, such as a form being sent or a button pressed.* (Rail marks run from step 1 to step 4 **only where tracking is set up**; shown with a dashed "if set up" marker at step 4.)
- **What your business needs to know:** was it a **genuine enquiry** — a real person, reachable, asking about your work. (Mark at step 4, drawn solid.)

**Plain definition (the only gloss kept on the page, because it's essential):** *Google Ads calls a recorded action a "conversion". We look at whether each one is a genuine enquiry.* **[PENDING: "we look at" is a capability claim tied to tracking set-up.]**

**Three "What if…" selectors:**
- **…the wrong people click**
- **…the page doesn't answer them**
- **…a recorded action isn't a genuine enquiry**

**Caption on selection** (one sentence per case):
- Wrong people click → *Clicks are recorded, but few of them are people you'd want to hear from.*
- Page doesn't answer → *People arrive and leave. Clicks are recorded; enquiries aren't.*
- Recorded action isn't genuine → *Google Ads counts a conversion. On inspection, it was spam, a mistake or someone with no real interest.*

**Closing line (qualified):**
> So we look past the report to the enquiries your business receives, as far as your tracking allows. Not every enquiry can be traced to an ad.

**Corrected Path Figure logic.**
1. **What it must not suggest:** that Google Ads reporting only measures clicks. The Google Ads rail now explicitly includes recorded conversions, **where set up**.
2. **The real distinction:** *recorded advertising conversion* (what the platform counts, depending on set-up) versus *genuine business enquiry* (what the business can confirm). They can differ in either direction: a recorded action may not be a genuine enquiry, and a genuine enquiry may not be recorded or traceable to an ad.
3. **Cases reflect that.** Case 3 shows a recorded action that isn't genuine. The closing line covers the reverse (genuine but untraced).
4. **Default (healthy) state:** all five nodes lit; Google Ads rail shows its marks; business rail confirms step 4. No claim that the healthy path is typical.
5. **Selected state:** the path breaks at the relevant step; steps after it dim; step 4 reads **Fewer genuine enquiries** (not "Nothing arrives") — a softer, accurate statement; the Google Ads rail still shows the marks it would show.
6. **Not shown:** any numbers, rates, benchmarks or proportions.

**Interaction and accessibility.**
- *Motion:* draw-in once on first view (≈ 1.2 s). Selecting a case swaps state with a short transition.
- *Controls:* native buttons in a `role="group"`; `aria-pressed` for the active case; an `aria-live="polite"` caption announces the result; a "Show the healthy path" reset.
- *Mobile:* vertical path; rails shown as two labelled columns beside the nodes; selectors become a three-segment control; no horizontal scroll.
- *Reduced motion:* path fully drawn at load; state changes are instant.
- *No JavaScript:* three stacked mini-paths, one per case, all visible with their captions.
- *Screen-reader text equivalent:* "A path with five steps from budget to learning. Google Ads can record clicks and, where set up, conversions. Your business confirms which are genuine enquiries."
- *Not the SEO trail:* vertical, two-rail and interactive. It must not reuse the SEO "trail" component or its geometry.

**Technical impact:** **one new client component**. It is the page's primary graphic.

## Block 4 · What the work covers *(shortened; no glosses; three separate categories)*

**Heading:** **What the work covers.**

**Sub-line:**
> Exactly what's included is set out in your proposal before any work starts.

**1. Set up and manage your advertising**
- Choose which searches your ads show for
- Write and improve your ads
- Manage your budget and bids
- Remove searches that waste money

**2. Check the page, the enquiry route and tracking**
- Check the page people land on answers what they searched for
- Check the form, booking or phone route works and enquiries reach you
- Check enquiries are being recorded properly

**3. Change your website or tracking**
> Agreed with you in the proposal before anything is done.

**Graphic — "Before the click, after the click, agreed first".**
- *Concept:* three kinds of work, with the third deliberately set apart because it is agreed rather than assumed.
- *Visitor sees:* a horizontal rail with the tear marker labelled **The click** (retained). Category 1 sits left of the tear, category 2 right of it. Category 3 is drawn as a **dashed-outline** card at the far right labelled **Agreed first**.
- *Interaction:* none. Standard section reveal only.
- *Mobile:* stacked; tear becomes a horizontal rule between 1 and 2; category 3 last, dashed.
- *Reduced motion / no JS:* static.
- *Why better than text:* the dashed outline shows at a glance which work is routine and which is by agreement.

**Not claimed:** that categories 2 or 3 are included in the management fee. **[PENDING — F-2.]**

**Removed from v1:** all "Google calls this…" glosses, "Ordinary work, done properly", "Every month" group (report and review moved to Block 5/6), the explanatory sentences under each item.

## Block 5 · What we answer for *(concise, positive; all [PENDING])*

**Heading:** **What we answer for.**

**Lead-in:**
> You pay Google for the clicks. You pay us to run the work well. These are ours to get right.

**Five commitments** *(one line each)*:

1. **Your budget.** We manage how it's spent, and move it away from what isn't working. **[PENDING]**
2. **A starting point.** We record where you begin, so progress is measured against something real. **[PENDING]**
3. **Clear reasons.** When we change something that matters, we tell you why. **[PENDING — new]**
4. **Straight answers.** If results are poor, we tell you what we think is causing it and what we'd change. **[PENDING — new]**
5. **A monthly review.** A report and a review call every month. **[PENDING — confirm for Google Ads]**

**One qualification (no contractions):**
> We cannot promise a number of enquiries or what each will cost. Your market, prices, competitors and how quickly you answer all play a part.

**Fee line:** Our management fee is separate from your ad spend. [See pricing →](/pricing) **[PENDING — F-1 #1]**

**Graphic — commitments ledger.** Five receipt-style rows with ticks. Ticks fill once, in sequence (≈ 0.15 s stagger) — *this is the one motion in this block, and it can be dropped if you want a stricter motion budget.* Mobile single column. Reduced motion / no JS: all ticks already filled.

**Commercial meaning.** Each commitment is a specific action the buyer can hold us to: how the budget is handled, what is recorded at the start, how decisions are explained, what happens on poor results, and when they will review it with us. None is a result.

## Block 6 · What you learn each month *(attribution limits merged in)*

**Heading:** **What you learn each month, and what we do with it.**

**Lead-in:**
> Each month we review the results with you. Where the data allows, that covers:

1. **Which campaigns brought enquiries**
2. **Which searches brought them**
3. **How that compares with where you started**

*(Existing approved wording: "by campaign and by search term where the data allows it, against a starting point". Report format and contents **[PENDING — F-1 #7]**.)*

**Findings → decisions** *(labelled "For example"; investigation-and-decision wording)*:

| What we find | What we do |
|---|---|
| Some searches bring enquiries | We look at why, and decide whether they deserve more of the budget. |
| Some searches bring clicks but few enquiries | We check whether they're the right searches, and decide whether to change or stop them. |
| A page gets visits but no enquiries | We look at what it asks people to do, and recommend whether to change it. |

**Honest measurement (short, static note; no contractions):**
> **Not every enquiry can be traced to an ad.** A phone call after someone saw your ad is a common example. Where we cannot tell, we say so. We do not claim those enquiries, and we do not hide them.

**Link:** How we measure, including what can't be traced → `/how-it-works` *(retained)*. **Related (retained):** if the clicks arrive and the enquiries do not · the whole system · the enquiries themselves.

**Graphic — findings to decisions.**
- *Concept:* a report is only useful if it leads to a decision, and a decision is an investigation first.
- *Visitor sees:* three rows; each pairs a finding on the left with an arrow and a decision on the right. A small strip above shows the monthly rhythm: **Report → Review call → Decision → Change → Next report.**
- *Interaction:* arrows draw once, in order, on first view (≈ 1 s). No hover or tap dependency.
- *Mobile:* each pair stacks (finding above, arrow down, decision below); the strip becomes a vertical list of five.
- *Reduced motion / no JS:* final state; nothing hidden.
- *Removed from v1:* the animated "source unknown" bins. The limit is now a short static note with a "Source unknown" label, same visual weight as other content.

## Block 7 · Next step

**Heading:** **Already running Google Ads, or thinking about it?**

**Two starting points:**
- **Already advertising?** Tell us what you spend, what you're getting, and whether you can tell which enquiries came from it.
- **Thinking about it?** Tell us what you sell and what one new customer is worth to you.

**Six compact steps** *(one row on desktop; vertical list on mobile)*:

**1 Get in touch** (we follow up by email or WhatsApp) → **2 Discovery call** → **3 Audit** → **4 Proposal** → **5 Approval** → **6 We begin**

**One line beneath:**
> You see our findings, a recommended plan and a proposal before any work starts.

**CTAs:** Tell us what you're trying to fix *(primary)* · Book a call *(secondary, [PENDING])*.

**Graphic.** A compact numbered stepper, numbers only plus short labels; step 1 highlighted. Standard reveal, no bespoke motion. Mobile: vertical list. Reduced motion / no JS: static. Reuse of the existing `Stages` primitive to be evaluated at build planning (**RESEARCH REQUIRED** — not inspected this phase).

**Deliberately not stated:** price or length of any step, whether any step is free, who attends, response time. The word "free" does not appear.

---

# 4. Copy comparison (revised)

| Area | Existing live copy | Proposed v2 | Reason |
|---|---|---|---|
| H1 | Google Ads, measured on the enquiries rather than the clicks. | Google Ads, run for real enquiries — not just clicks. **[OWNER-APPROVED]** | Plain verb; states the service |
| Hero lede | We run paid search: account structure, keywords, negatives, ad copy, bidding and budget. We also take responsibility for what happens after the click… | We manage your Google Ads to reach people looking for what you sell. We track the enquiries and improve what's not working. **[OWNER-APPROVED]** | Removes jargon; two sentences |
| Hero side note | Paid is a way to reach demand that is active now… | *(removed)* | Replaced by Block 2 |
| Receipt lower lines | The page it lands on / Whether the enquiry completes / Where it came from | Choosing which searches your ads show for / Writing and improving your ads / Managing how your budget is spent / Checking the page and the enquiry route | Shows the work; avoids claiming website or tracking changes |
| Section 2 | One way to reach buyers. It earns its place, or it does not. | What we look at before suggesting Google Ads. + six factors, no score | Concrete factors; educational |
| Ruler + comparison | A supplier paid to manage spend improves the account. We work to a number two steps further down the chain. | *(removed)* + Path Figure | Implied comparison removed (owner) |
| Accountability heading | Your advertising spend is paid directly to Google. Our management fee is separate. | What we answer for. | Spend/fee shown in the hero receipt and one fee line |
| Refusal list | We do not promise: a return on ad spend; a cost per enquiry; a cost per lead; a number of enquiries per month… | We cannot promise a number of enquiries or what each will cost. Your market, prices, competitors and how quickly you answer all play a part. | One qualification (owner); no "return on ad spend" or "ROI" wording |
| Starting-point line | We record where things stand at the start, so we have a clear point of comparison. | A starting point. We record where you begin, so progress is measured against something real. | Now a commitment **[PENDING]** |
| Scope | Structure, search terms and negatives, match types, ad copy, extensions, bidding and budget pacing. Ordinary work, done properly. … (six dense items) | Three categories, ten short lines, no glosses | Shorter; separates managing, checking and changing |
| Tracking line | Conversion tracking configured around meaningful enquiry actions, where technically feasible. | Check enquiries are being recorded properly. / Changes to tracking are agreed in the proposal first. | Keeps the feasibility limit; separates checking from changing |
| Measurement heading | The enquiry, not the click. | What you learn each month, and what we do with it. | Customer outcome; stops repeating the thesis |
| The limit | When an enquiry's source cannot be identified, we say so rather than claiming credit for it. | Not every enquiry can be traced to an ad… Where we cannot tell, we say so. We do not claim those enquiries, and we do not hide them. | Same principle, inside reporting |
| Close heading | What you spend, and what you get back. | Already running Google Ads, or thinking about it? | Names both audiences; removes return language |
| Close process | *(none)* | Six compact steps and one line | Confirmed stages only (`DEC-051`) |

---

# 5. Visual interaction plan (revised)

**Primary visual narrative: "Follow the money."** Money splits in the hero → its route to a genuine enquiry in the Path Figure → what we learn and decide in findings-to-decisions. Priority order: **receipt → Path Figure → findings-to-decisions.**

| Block | Graphic | Motion | New component |
|---|---|---|---|
| 1 | One Click receipt | Print-in once | No (copy/animation tweak) |
| 2 | Factor list | None | **No** (native `<details>`) |
| 3 | Path Figure | Draw-in once + user-selected states | **Yes — one client component** |
| 4 | Rail with dashed "Agreed first" card | Standard reveal | CSS only |
| 5 | Commitments ledger | Tick stagger (optional; droppable) | CSS only |
| 6 | Findings-to-decisions | Arrows draw once | CSS only (light JS optional) |
| 7 | Compact stepper | Standard reveal | Possibly existing primitive |

**Behaviour rules.** Reveal-once only. No looping, canvas, sticky or ambient motion. Nothing hides content: with no JavaScript, reduced motion, no `IntersectionObserver` or in print, every figure renders in its final, readable state. No new analytics events. No figures anywhere; layout-only graphics carry "Illustration."

**Responsive.** Desktop: receipt beside hero copy; Path Figure horizontal; scope as a rail; stepper in one row. Tablet: scope stacks. Mobile (< 768 px): single column everywhere, Path Figure vertical, selectors as a segmented control, ≥ 44 px targets, no horizontal scroll, figure text ≥ 12 px and ≥ 4.5:1 contrast, no rotation on the receipt.

**Accessibility.** One H1; seven H2s; H3 only for scope categories; no skipped levels. Visible focus ring. Text equivalents for the receipt, Path Figure and findings-to-decisions. `aria-live="polite"` on the Path caption only. **SR-1 to SR-5 and E1 (real-device checks) remain outstanding programme prerequisites** for any new interactive figure before production release.

---

# 6. Updated decision table (F-1 → F-5)

| ID | Owner decision | Effect on this storyboard | Status |
|---|---|---|---|
| **F-1** Claims | Positive accountability direction **kept**. The nine operational claims are **not** treated as commercially verified because they appear in existing copy or governance documents. Owner-dependent commitments marked pending. Keep clear qualifications where tracking or attribution is technically limited. | Every claim in the table below is tagged **[PENDING]**. Qualifications are explicit in Blocks 3 and 6 and in the hero note. | **Revised; confirmation outstanding** |
| **F-2** Scope | Pending owner confirmation. Three categories separated; **not** assumed to be all in the fee. | Block 4 is rebuilt as three categories with a dashed "Agreed first" card. Receipt lower lines limited to setting up, managing and checking. | **Revised; confirmation outstanding** |
| **F-3** Structure | Seven-block narrative approved; receipt stays in hero; ruler and comparison removed; scope before accountability; attribution merged into reporting; refusal list replaced by commitments + one qualification. | Done in Sections 2–3. | **Approved; reflected** |
| **F-4** H1 and metadata | H1 approved. Supporting copy supplied. Title, description, canonical and structured data **unchanged**. | H1 and supporting copy verbatim. No metadata proposal. | **Approved; reflected** |
| **F-5** Components | Path Figure approved subject to corrections. Fit Check revised to an educational checklist. Preserve reduced-motion, keyboard, screen-reader and no-JS behaviour. Prioritise receipt, Path Figure and findings-to-decisions; no decorative animation. | Path Figure logic corrected (recorded conversion vs genuine enquiry). Fit Check has no score and no JS. Sorting animation removed. | **Approved in principle; revised** |

## Operational claims register (F-1: all PENDING)

| # | Claim | Where it appears in the copy | Status |
|---|---|---|---|
| 1 | Ad spend is paid directly to Google; our fee is separate | Receipt tags; fee line in Block 5 | **PENDING** *(see risk note below)* |
| 2 | We say when Google Ads isn't the right fit / talk factors through before suggesting anything | Block 2 closing line | **PENDING** |
| 3 | We manage the budget and move it away from what isn't working | Block 5 #1 | **PENDING** |
| 4 | We tell you why when we change something that matters | Block 5 #3 | **PENDING (new)** |
| 5 | If results are poor, we tell you the cause and what we'd change | Block 5 #4 | **PENDING (new)** |
| 6 | A monthly report and review call apply to Google Ads clients | Block 5 #5, Block 6 | **PENDING** (`DEC-051` states it generally) |
| 7 | The review covers campaigns, searches and comparison with the start | Block 6 | **PENDING** (report contents unconfirmed) |
| 8 | The Discovery Call → Audit → Proposal → Approval → Execution process applies to a Google Ads enquiry; findings, plan and proposal come before work | Block 7 | **PENDING** (general in `DEC-051`) |
| 9 | We handle most agreed implementation, with your input where needed | Block 4 (category 3) and Block 7 | **PENDING** (general in `DEC-051`) |

**Risk note on #1 (needs a decision, not a code change today).** The statement "paid directly to Google, fee separate" is **already published** on `/google-ads`, `/pricing` and `/services`. If it is not commercially verified, it is live today. This storyboard does not change those pages, but the owner may want to confirm or correct it ahead of the redesign. Please tell me which you prefer; I have not touched any page.

---

# 7. Quality test (re-run on v2)

| # | Question | Answer from the revised page | Verdict |
|---|---|---|---|
| 1 | What does MappedSkills do? | "We manage your Google Ads to reach people looking for what you sell. We track the enquiries and improve what's not working." | Clear |
| 2 | How could Google Ads help my business? | It reaches people already searching; Block 2 shows the factors that decide if it suits you. No outcome promised | Clear |
| 3 | What will MappedSkills manage? | Block 4: setup and management; checks; changes agreed first | Clear — scope pending F-2 |
| 4 | What do I pay Google, and what do I pay MappedSkills? | Receipt: Google for the clicks; us, separately, for the work listed | Very clear — pending F-1 #1 |
| 5 | How will I know whether it's working? | Path Figure (recorded conversions vs genuine enquiries) + monthly review (Block 6) | Clear — report contents pending |
| 6 | What will MappedSkills do if results are poor? | Block 5 #4 and Block 6 findings-to-decisions: investigate, tell you, recommend | Clear — depends on new commitment (F-1 #5) |
| 7 | Why trust MappedSkills? | Transparency: separate fee, starting point, honest attribution limits, process with plan and proposal first. **No external proof exists** and none is faked | Partly — by design |
| 8 | What happens after I contact them? | Block 7: email or WhatsApp → discovery call → audit → proposal → approval → we begin | Clear — pending F-1 #8 |

**Check for the owner's specific corrections.** (1) Scope shortened further, glosses removed ✔ · (2) commitments concise, positive and meaningful ✔ · (3) optimisation examples are investigate-and-decide ✔ · (4) six-step process compact ✔ · (5) no claim that every enquiry can be tracked or sourced; qualified in Blocks 3 and 6 ✔ · (6) no invented evidence, guarantees or reporting capabilities ✔.

---

# 8. Owner confirmations still required (concise)

**Commercial / operational (blocks building)**
1. Is ad spend paid directly to Google, with MappedSkills' fee billed separately? *(Also resolves the already-live statement.)*
2. Which of the three work categories are in the management fee: (a) setup and ongoing management; (b) checking pages, enquiry routes and tracking; (c) implementing website or tracking changes? Or is (c) quoted separately?
3. Are the two new commitments acceptable: "we tell you why we change things" and "if results are poor, we tell you the cause and what we'd change"?
4. Does the budget commitment ("we move it away from what isn't working") describe real practice?
5. Do the monthly report and review call apply to Google Ads clients, and can the report cover campaigns, searches and a comparison with the starting point?
6. Does the Discovery Call → Audit → Proposal → Approval → Execution process apply as written to a Google Ads enquiry, including "plan and proposal before work"?
7. Is "we talk the factors through before suggesting anything" acceptable on Block 2?

**Copy / CTA**
8. Hero: is "We track the enquiries" acceptable without a qualifier, given qualifications appear in Blocks 3 and 6?
9. Secondary CTA "Book a call" on this page: yes or no?
10. Is the term "conversion" acceptable as the page's one retained industry word (needed to explain recorded actions vs genuine enquiries)?

**Technical / programme (not authorised)**
11. Approve one new client component (Path Figure) and the CSS-only additions. Confirm the commitments-ledger tick stagger may be dropped to tighten the motion budget.
12. Reuse of the existing `Stages` primitive for the stepper to be evaluated at build planning.
13. SR-1 to SR-5 and E1 (real-device checks) remain prerequisites before release.

**Governance.** Once you confirm the above, I propose recording the approved decisions as a `DEC-` entry in `docs/00-project/DECISION_LOG.md` (not done yet, because the approval is conditional).

---

**STOP.** This is the end of the revised Phase 1. No website source code, component, branch, commit, merge or deployment was touched. The only repository changes are this document and its untracked v1 copy.
