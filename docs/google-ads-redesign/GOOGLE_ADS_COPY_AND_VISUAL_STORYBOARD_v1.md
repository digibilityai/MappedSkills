# Google Ads Copy & Visual Storyboard — `/google-ads`

**Phase 1 · Copy refinement and visual storyboard · 2026-10-15 · Branch `feat/seo-page-redesign` (untouched; no branch or commit created)**
**Status: PROPOSAL — AWAITING OWNER APPROVAL. Nothing here is implemented, committed or deployed. No source file was modified.**

> **Stop point.** This document is the deliverable. No implementation, animation build, metadata change or deployment is authorised until the owner approves the decisions in Part F.

---

## 0. What was reviewed, and one correction to the brief

**Read:** `CLAUDE.md`, `CONTEXT_INDEX.md`, `CURRENT_STATE.md`, `DECISION_LOG.md` (`DEC-005`, `DEC-007`, `DEC-013`, `DEC-032`, `DEC-051`, `DEC-052`), `SERVICE_ARCHITECTURE.md` §7, `VOICE_AND_TONE.md`, `CLAIMS_LADDER.md`, `TERMINOLOGY_DICTIONARY.md`, `CTA_LANGUAGE_SYSTEM.md`, `docs/09-content-pages/copy/google-ads.md` and `PAGE_COPY_AUDIT.md`. **Inspected the implementation:** `app/(pages)/google-ads/page.tsx`, `components/cplus/google-ads/{content.ts, GoogleAdsBody.tsx, google-ads.css}`, `CplusMotion.tsx`, `Close.tsx`, and the live SEO page's copy (`components/cplus/seo/content.ts`) as the benchmark. The live page at `mappedskills.com/google-ads` was fetched and matches the repository (same primary CTA, same "paid directly to Google" line). *I did not render the pages in a browser for this phase.*

**Brand DNA:** there is no file named "Brand DNA" in the repository (UNKNOWN — only the SEO redesign documents use the term). I used the approved equivalents: `POSITIONING.md`, `VOICE_AND_TONE.md`, `TERMINOLOGY_DICTIONARY.md`, `CLAIMS_LADDER.md` and the C+ system (ivory/ink/tangerine, Bricolage + Manrope, receipts, hard-edged cards, scroll-once reveals, no looping or sticky motion). If a separate Brand DNA document exists, please point me to it.

**The page does not have nine sections.** The brief's nine areas are nine *ideas*; the live page packs them into six blocks:

| Brief area | Where it lives today |
|---|---|
| 1 Hero · 2 One click | Hero (the "One click" receipt is the hero graphic) |
| 3 Where paid search fits · 4 Where the work is measured | One ink section ("Where paid search sits") containing the three-dot ruler |
| 5 Spend, fee, accountability | "Spend, fee, and what we will not promise" |
| 6 In scope | "What is in scope" |
| 7 What we measure · 8 Attribution limits | One section ("What we measure") with "The limit" aside |
| 9 Final CTA | The close |

The storyboard below keeps all nine ideas and says where each one lands.

**Evidence labels** follow `CLAUDE.md`. Every claim in the proposed copy carries a ladder level (A fact · C capability · D labelled judgement) and a status in Part F. **No figures, guarantees, case studies, testimonials, response times or "free" offers appear anywhere in the proposed copy.**

---

# A. Executive assessment

## What is already working (VERIFIED FACT — from the live source)
- **The "One click" receipt.** Splitting what is paid to Google from what is paid to us is the single most useful idea on the page, and it is already a picture. Keep the concept.
- **The principle.** Judge the work by enquiries, not clicks, and say where the data cannot tell. This is genuinely differentiating and consistent with the approved positioning (`DEC-005`).
- **No unsupported claims.** No ROI, no figures, no case studies. The two corrections already made (removed reporting promises) are right and stay.
- **Honest attribution limit.** "We say so rather than claiming credit" is good and stays — reframed so it reads as confidence, not caution.
- **The C+ visual system.** Receipt, hard edges, ink/paper rhythm. The page already looks like MappedSkills.
- **The URL, title, description, canonical, breadcrumb and structured data.** Unchanged in this proposal.

## What needs improving (customer-comprehension problems, from reading as a first-time advertiser)
1. **The hero asks a newcomer to parse an agency sentence.** "Account structure, keywords, negatives, ad copy, bidding and budget" is a list of jargon, not a value proposition.
2. **"One click" shows what we also answer for, not what we do.** The receipt's bottom half omits the core work (choosing searches, ads, budget).
3. **"It earns its place, or it does not"** is abstract. The page never says when Google Ads is a poor fit, or what that means for the budget. This is the biggest content gap.
4. **The ruler ("two steps further down the chain")** asks the visitor to imagine a chain that is never shown. It also compares us to "a supplier paid to manage spend" — an implied swipe at others (the earlier audit removed a similar one).
5. **The accountability section is a list of refusals.** "We do not promise" ×4 plus "We do not report ROI" is the first thing a worried buyer reads about responsibility. The only positive commitment is "we record where things stand at the start".
6. **Scope is vocabulary-first:** match types, negatives, extensions, budget pacing. It also asserts everything is "in scope" without saying what is agreed when.
7. **"Enquiries, not clicks" appears in the title, H1, hero, ruler, scope, measurement heading and body** — six times in different words. The message is right; the repetition dilutes it.
8. **"What we measure" says what is measured, not what the customer learns or what happens next.** It never closes the loop to decisions.
9. **The close asks for a message but does not say what happens after it.** Confirmed process details exist (`DEC-051`) and are unused.
10. **There is no sense of who the page is for.** It does not address someone who has never run Google Ads.

## What should remain unchanged
URL · title / description / canonical (recommended; see F-4) · breadcrumb and `BreadcrumbList` · primary CTA wording ("Tell us what you're trying to fix") · the receipt as a *concept* · the fee-separate / spend-paid-to-Google statement (already live; see F-1) · the C+ component and token system · the `/how-it-works`, `/problems/traffic-but-no-enquiries`, `/services`, `/lead-generation` links · no figures, no guarantees, no proof claims.

---

# B. Proposed page narrative

## The customer journey
A business owner arrives with one of three states of mind: *"What is this?"*, *"Is it for me?"*, *"What am I signing up to?"* The page answers in that order.

| # | Block | The question it answers | Brief area(s) |
|---|---|---|---|
| 1 | **Hero** — plain value + the money split | What do you do, and what do I pay whom? | 1, 2 |
| 2 | **Is Google Ads right for you?** — when it fits, when it doesn't | Could this help *my* business? | 3 |
| 3 | **From budget to enquiry** — the path, and where it breaks | Why do clicks alone mislead me? | 4 |
| 4 | **What the work covers** — plain-language scope | What will you actually manage? | 6 |
| 5 | **What we answer for** — commitments | What are you responsible for? What if it goes badly? | 5 |
| 6 | **What you learn each month** — reporting and honest measurement | How will I know? | 7, 8 |
| 7 | **Next step** — two starting points + what happens after you enquire | What do I do, and what happens then? | 9 |

## Why this sequence
**Know it → fit it → understand the risk → see the work → see the responsibility → see the proof of progress → act.** Each block is a precondition for the next: nobody cares what we commit to until they know what the service is and whether it suits them; nobody trusts a commitment until they have seen the work it applies to.

## Recommended merges, reorder and additions (all need approval — F-3)
| Change | Why |
|---|---|
| **Merge brief §2 ("One click") into the hero.** | On the live page the receipt already *is* the hero graphic. A separate section would repeat it. |
| **Split the live "Where paid search sits" into two blocks:** *Is it right for you?* (new content) and *From budget to enquiry* (replaces the ruler). | Brief §3 and §4 are different questions; the old block answered neither well. This is the **only net-new section**: the live page has six blocks, the proposal has seven. Justification: the page currently never says when Google Ads is the wrong choice. |
| **Move "scope" before "accountability"** (brief order is the reverse). | Commitments only make sense once the visitor has seen the work. Putting accountability first made it either vague or a duplicate of scope. Accountability stays the page's emotional centre, placed after the work and before the proof of progress. |
| **Merge attribution limits (brief §8) into reporting (brief §7).** | The limit is part of how reporting stays honest. A standalone section creates anxiety; inside reporting it reads as a feature. |
| **Remove the ruler graphic and the "supplier paid to manage spend" line.** | Replaced by the path in block 3. The comparison line is an implied swipe at others and is not needed. |
| **Remove the "We do not promise" four-item list.** | Replaced by one calm sentence (once, at full strength — `VOICE_AND_TONE.md` §3) after the commitments. The prohibitions in `DEC-007` still hold: no ROI, ROAS, cost-per-lead or volume promises. |

---

# C. Section-by-section storyboard

> **Voice used:** "we" for the company; "you" for the reader; sentence case; British/Indian spelling; contractions in commercial copy, none in the boundary and measurement-limit sentences (`VOICE_AND_TONE.md` §6). **No "ROI", "free", "audit included", response times, percentages or amounts.**

---

## C1 · Hero (brief areas 1 + 2)

**1. Existing section and purpose.** Kicker "Paid search"; H1 "Google Ads, measured on the enquiries rather than the clicks."; a 55-word lede listing account mechanics; a side note; CTA; the One click receipt. Purpose: state the offer and set up the money split.

**2. Comprehension problem.** A newcomer reads "keywords, negatives, bidding" and cannot tell what they would be buying. The receipt shows what we "also" answer for but not the core work. The H1 is accurate but reads as a position statement, not an offer.

**3. Proposed headline.**
> **Google Ads, run for real enquiries — not just clicks.**

(`b-named` emphasis on "real enquiries".)

**4. Proposed supporting copy.**

Kicker: **Google Ads**

Lede (two sentences):
> We set up and manage your Google Ads, so people searching for what you sell can find you. Then we check whether those searches turn into enquiries, and change what doesn't.

Side note (replaces "Paid is a way to reach demand…"):
> Google Ads isn't right for every business. If it isn't right for yours, we'll say so.

Primary CTA: **Tell us what you're trying to fix** *(unchanged)*. Secondary: **Book a call** *(see F-2)*.

Receipt graphic copy:

| Element | Text |
|---|---|
| Title | **One click** *(retained)* |
| Top label / tag | **Where your money goes** · **Paid to Google** |
| Top lines | Someone searches for what you sell · Your ad appears · They click it |
| Tear label | **The click** *(retained)* |
| Bottom label / tag | **What our fee pays for** · **Paid to us, separately** |
| Bottom lines | Choosing which searches your ads show for · Writing and improving your ads · Managing how your budget is spent · Checking people can enquire once they land |
| Caption | *Illustration. No amounts.* *(retained)* |

**5. Graphic / animation — "One click" receipt (retained and clarified).**
- **Concept communicated:** advertising spend and our fee are two different payments for two different things, and the click is the dividing line.
- **What the visitor sees:** a paper receipt (existing component). Upper half is stamped "Paid to Google" with three ticks drawn as dashed boxes (outside our fee). Below the tear, "Paid to us, separately" with four filled tangerine ticks.
- **Interaction:** on first view only, the receipt "prints" top to bottom (staggered line reveal via the existing `data-rv` mechanism, one pass, ≈ 1 s); the tear line then draws across. No loop, no hover requirement. Tapping/hovering a line adds nothing — the picture is the explanation.
- **Why easier than text:** "ad spend vs management fee" is the most-misunderstood point in this category; a receipt is a format everyone already reads.
- **Mobile:** full-width, no rotation, reduced shadow (existing behaviour). Same reveal.
- **No animation / reduced motion:** fully rendered receipt, all ticks visible, nothing hidden. Without JavaScript the content is already present (`CplusMotion` never hides content by default).

**6. Intended takeaway.** "They run my Google Ads for me. Google gets my ad money; they get a separate fee for doing the work. And they care about enquiries."

**7. Retained / removed / changed.** *Retained:* receipt, "One click", the tear, CTA, concept of enquiries over clicks. *Removed:* the jargon list, "take responsibility for what happens after the click" (moved into scope and accountability), the "demand that is active now" phrasing. *Changed:* H1, lede, side note, all receipt lines.

**8. Unverified claims / dependencies.**
- "Paid directly to Google" / "our fee is separate" — already live; supported by the live `/pricing` page and Terms (§ "Ad Spend and Third-Party Costs") but **not recorded as an owner-confirmed commercial fact in the decision log** (F-1).
- "If it isn't right for yours, we'll say so" — consistent with `SERVICE_ARCHITECTURE.md` §7 ("chosen on merit per client") but is a behavioural promise (F-1).
- "Checking people can enquire once they land" — rests on the live page's existing scope claim; whether it is always in scope is a commercial assumption (F-2).

---

## C2 · Is Google Ads right for you? (brief area 3)

**1. Existing section and purpose.** "Where paid search sits" — "One way to reach buyers. It earns its place, or it does not."

**2. Comprehension problem.** The headline states a conclusion and never gives the criteria. A buyer cannot tell if they are on the "earns its place" or "does not" side, and nothing says what that means for their budget.

**3. Proposed headline.**
> **Google Ads suits some businesses better than others.**

**4. Proposed supporting copy.**

Lede:
> It works best when people already search for what you sell, and a new customer is worth a good deal to you. Tick what's true for you.

Four statements (each a tickable row):
1. **People already search for what I sell.**
2. **One new customer is worth a good deal to me.**
3. **My website makes it easy to enquire, or I'm willing to fix that.**
4. **Someone can answer enquiries when they arrive.**

Result messages (one shown, `aria-live="polite"`), based on number ticked:

| Ticked | Message |
|---|---|
| Three or four | **Worth a conversation.** The next step is to tell us what you sell and what a new customer is worth. |
| One or two | **Sort the gaps first.** Spending before these are in place sends money to Google with nothing to catch it. |
| None | **Google Ads probably isn't where to start.** If that's the case, we'll tell you. |

Static fallback / default two-column version (also what is shown with no JavaScript):
- **It usually makes sense when:** people already search for what you sell · one new customer is worth a good deal to you · your website lets people enquire · someone answers enquiries.
- **It may not be right when:** few people search for what you do, because you're creating a new need · a new customer is worth little compared with what it costs to win one · nobody can answer enquiries when they arrive.

Link line: *Not sure paid is the right route? See [SEO](/seo) and [social media ads](/social-media-ads).* (existing routes; optional — F-3)

**5. Graphic / animation — "Fit check".**
- **Concept:** whether to spend is a business decision about *your* customer value and readiness, not a Google decision.
- **What the visitor sees:** four large tick-rows and a result panel below. Default state shows the neutral prompt "Tick what's true for you."
- **Interaction:** ticking a row fills its box (tangerine, same tick as the receipt) and updates the result text. Nothing is sent, stored or tracked. Result text swaps with a 150 ms fade only.
- **Why easier than text:** it converts a vague "it depends" into a personal answer in under ten seconds and shows the budget consequence directly.
- **Mobile:** full-width rows with ≥ 44 px tap targets; result panel sits under the list.
- **No animation / reduced motion:** instant text swap; no fade. **No JavaScript:** shows the two-column "makes sense / may not" list instead.
- **Honesty note:** the result is general guidance (level D, a labelled judgement), not a verdict on the visitor's business. Label under the panel: *A rough guide, not advice on your business.*

**6. Intended takeaway.** "They'll tell me honestly if this isn't right for me, and I now know what makes it right."

**7. Retained / removed / changed.** *Retained:* the idea that paid is chosen on merit, not sold to everyone. *Removed:* "It earns its place, or it does not"; "What we are accountable for here is the same as everywhere else on this site". *Changed:* abstract position → four concrete criteria and budget consequence.

**8. Unverified claims / dependencies.**
- All criteria are general business logic (ladder level D), not MappedSkills findings. Owner should confirm they are comfortable with the "may not be right" criteria and the "we'll tell you" line.
- The interactive component is **new technical work** (small client component) and needs owner approval (F-5). If rejected, ship the two-column static version.

---

## C3 · From budget to enquiry (brief area 4)

**1. Existing section and purpose.** The three-dot ruler "The account → After the click → The enquiry", with "A supplier paid to manage spend improves the account. We work to a number two steps further down the chain."

**2. Comprehension problem.** The visitor must imagine a chain that is never shown. The key insight — a report can look healthy while the business gets nothing — is implied, not demonstrated.

**3. Proposed headline.**
> **From your budget to an enquiry — and where it can go wrong.**

**4. Proposed supporting copy.**

Lede:
> An ad report can look healthy while your phone stays quiet. Clicks only count at the start of the path.

Five steps (labels):
1. **Your budget**
2. **Someone searches and clicks**
3. **They visit your website**
4. **They enquire**
5. **You learn what worked — we change what didn't**

Two rails' labels: **What an ad report shows** (marks only at steps 1–2) · **What your business gets** (marks at steps 3–5).

Three "What if…" selectors:
- **…the wrong people click**
- **…the page doesn't answer them**
- **…the form doesn't send**

Caption when a case is selected (one per case, same line):
> The ad report still shows clicks. Only counting enquiries shows the gap.

Closing line under the figure:
> That's why we count enquiries, and use clicks only to find out why they're missing.

**5. Graphic / animation — "The path and its breaks".**
- **Concept:** the real result sits at the end of a chain; ad dashboards only see the first links.
- **What the visitor sees:** a vertical path of five nodes (desktop: a horizontal path with the two rails stacked beneath). Healthy state: all nodes lit, a tangerine line connects them, the "ad report" rail shows ticks at steps 1–2 only.
- **Interaction:** on first scroll-in, the line draws from step 1 to 5 once (≈ 1.2 s) so the visitor sees the intended journey. The three "What if" selectors then become active. Selecting one "breaks" the path at the relevant step: the line stops with a dashed gap, steps after it dim, step 4 reads **Nothing arrives**, and **the ad-report rail stays ticked**. Selecting another swaps the break. Selecting again (or "Show the healthy path") restores it. Keyboard: selectors are native buttons in a `role="group"`; state announced via `aria-pressed` and an `aria-live` caption.
- **Why easier than text:** the whole argument is one contrast — ticks stay while the result disappears — which a paragraph cannot show.
- **Mobile:** path runs vertically; the two rails become two small labelled columns beside the nodes; selectors become a three-segment control above the path. No horizontal scroll.
- **No animation / reduced motion:** path fully drawn at load; selecting a case changes state instantly (no draw). **No JavaScript:** three stacked mini-paths, one per "what if", all visible.
- **Difference from the SEO page:** the SEO page's hero is a horizontal "trail" from a search to an enquiry with breaks. This graphic is vertical/money-led, shows two competing rails (dashboard vs business) and is interactive. It must **not** reuse the SEO trail component or its geometry (constraint: do not copy the SEO page's layout).

**6. Intended takeaway.** "A report full of clicks doesn't prove anything. What matters is whether enquiries reach me — and they check that."

**7. Retained / removed / changed.** *Retained:* the "two steps further down the chain" idea, now shown. *Removed:* the ruler, "A supplier paid to manage spend…", "the week the account looks healthy and the enquiries have stopped". *Changed:* text-only idea → interactive path. Also adds step 5 ("better decisions") linking to the reporting block.

**8. Unverified claims / dependencies.** "We count enquiries" rests on tracking being "configured around meaningful enquiry actions, where technically feasible" (existing approved wording). The caption must not imply tracking is always possible. New client component (F-5).

---

## C4 · What the work covers (brief area 6)

**1. Existing section and purpose.** "What is in scope" — six items in three groups (In the account / After the click / In the record).

**2. Comprehension problem.** Mixed vocabulary ("match types", "negatives", "extensions", "budget pacing"), six dense descriptions, and an assertion that all of it is in scope with no word on what is agreed when. "In the record" is internal language.

**3. Proposed headline.**
> **What the work covers.**

**4. Proposed supporting copy.**

Sub-line:
> What's included is set out in your proposal before any work starts.

Group 1 — **Before the click**
- **Choose the searches your ads show for.** *(Google calls this keyword research.)*
- **Write and improve your ads.**
- **Manage how your budget is spent.** *(Bids and daily spend.)*

Group 2 — **After the click**
- **Check the page people land on answers what they searched for.**
- **Check the enquiry route works** — form, booking or phone — and that enquiries reach you.
- **Record each enquiry, so we can trace where it came from** where tracking allows.

Group 3 — **Every month**
- **Remove searches that waste money.** *(Google calls these negative keywords.)*
- **Report back, and review it with you on a call.**

Scope boundary (one line under the figure):
> Changes to your website or tracking are agreed with you in the proposal first.

**5. Graphic / animation — "Before and after the click" rail.**
- **Concept:** the service is not just the ads; it continues past the click and repeats every month.
- **What the visitor sees:** a horizontal rail with the tear marker labelled **The click** (retained from the existing page). Group 1 sits left of the tear, group 2 right of it, group 3 as a repeating band beneath the whole rail ("Every month").
- **Interaction:** none required. Group cards reveal left to right once on scroll-in; the rail draws as they appear. Technical terms appear in a muted "Google calls this…" line so experienced advertisers can match items to what they know.
- **Why easier than text:** position on the rail *is* the explanation of what happens before versus after the click, without a paragraph.
- **Mobile:** groups stack vertically with the tear as a horizontal dashed line between group 1 and group 2; group 3 last.
- **No animation / reduced motion:** static rail; all content visible.

**6. Intended takeaway.** "They handle the ads *and* the page and enquiry route, every month. Exactly what's included is agreed in writing first."

**7. Retained / removed / changed.** *Retained:* the three-group structure, the tear-on-the-click idea, search-term review as an ongoing task, landing and enquiry-path checks, conversion tracking and "where technically feasible". *Removed:* match types, extensions, budget pacing, "irrelevant matches are where a budget quietly goes" (explanatory but jargon-led), "Ordinary work, done properly" (a quality claim without evidence). *Changed:* "In the record" group becomes "Every month"; six dense items → eight one-liners.

**8. Unverified claims / dependencies.** **Key owner decision (F-2):** which items are always included in the management fee versus agreed per client. The copy above is deliberately neutral ("set out in your proposal") and says only that changes to the website or tracking are agreed first. **Confirmed (`DEC-051`):** a proposal precedes work and MappedSkills handles most agreed implementation. **Not confirmed:** that every listed activity is in every agreement. If the owner wants a firmer "Included / Agreed separately" split, supply the split and I will tag each line.

---

## C5 · What we answer for (brief area 5 — critical)

**1. Existing section and purpose.** "Your advertising spend is paid directly to Google. Our management fee is separate." plus a "We do not promise" list of four items and a closing line.

**2. Comprehension problem.** The section reads as legal defence. Of its five statements about responsibility, four are refusals. The visitor never learns how decisions are made or what happens when results disappoint.

**3. Proposed headline.**
> **What we answer for.**

**4. Proposed supporting copy.**

Lede:
> You pay Google for the clicks. You pay us to run the work well. These are ours to get right.

Five commitments:

1. **Your budget.** We're responsible for how your Google Ads budget is used. We check where it goes, and move it away from what isn't working.
2. **A starting point.** Before we change anything, we write down where you are, so results are compared with something real.
3. **Our decisions.** We make changes for a reason, and we tell you the reason.
4. **When results are poor.** You hear it from us. We show you what we think is causing it and what we'd change — including when the cause is something we got wrong.
5. **A monthly review.** Each month you get a report and a review call, so nothing drifts unnoticed.

What we cannot promise (one paragraph, once, at full strength; no contractions):
> We cannot promise how many enquiries you will get, or what each will cost. Your market, your prices, your competitors and how quickly you answer all play a part. We commit to the work above instead.

Fee line with link:
> Our management fee is separate from your ad spend. [See pricing →](/pricing)

**5. Graphic / animation — "Commitments ledger".**
- **Concept:** responsibility as a visible list of things we take on, each with a tick we have put our name to.
- **What the visitor sees:** a ledger in the page's receipt language — five rows, each with a number, a short bold commitment, one sentence, and a tangerine tick. The final row, "A monthly review", has a small loop icon. A dashed-outline "Cannot promise" panel sits beside or below, visually quieter than the ledger (so the page leads with what we do).
- **Interaction:** ticks fill one by one as the ledger scrolls into view (≈ 0.15 s stagger, once). No hover or click dependency.
- **Why easier than text:** five ticked lines read as a signed list of obligations; the same content as a paragraph reads as policy.
- **Mobile:** single column; "Cannot promise" panel below the ledger.
- **No animation / reduced motion:** all ticks already filled; no stagger.

**5b. Responsibility check against the brief.** Budget handling (1), review of results (5), how decisions are made (3), what happens if results are poor (4). **No guarantee, target, ROI claim or deliverable is stated.**

**6. Intended takeaway.** "They take ownership of how my money is used and what they decide, and they'll tell me straight if it isn't working."

**7. Retained / removed / changed.** *Retained:* "we record where things stand at the start" (now commitment 2); the fee-separate statement (now a line with a link to `/pricing`); the principle that volume and cost per enquiry are not promised. *Removed:* the four-item "We do not promise" list; the explicit words "return on ad spend", "cost per lead" and "ROI" (`ROI` is prohibited by name in `TERMINOLOGY_DICTIONARY.md`); "which of these we do not control" phrasing. *Changed:* headline; negative-led structure → commitment-led structure.

**8. Unverified claims / dependencies — owner confirmation needed (F-1).**
| Commitment | Basis | Status |
|---|---|---|
| 1 Budget responsibility | Capability: bidding and budget management is in existing approved scope | Needs confirmation that "we check where it goes and move it" describes real practice |
| 2 Starting point | Existing approved sentence | Retained from live page |
| 3 "We tell you the reason" | **New commitment** | **Needs owner approval** |
| 4 Poor results: tell, show, recommend, own our mistakes | **New commitment**; supported in spirit by the confirmed monthly review call | **Needs owner approval** — the "including when the cause is something we got wrong" clause especially |
| 5 Monthly report and review call | **OWNER REQUIREMENT** (`DEC-051`) | Confirm it applies to Google Ads clients specifically |

The paragraph "We cannot promise…" removes "return on ad spend", "cost per lead" and "ROI" while preserving the commitment not to promise outcomes (`DEC-007`).

---

## C6 · What you learn each month (brief areas 7 + 8)

**1. Existing section and purpose.** "The enquiry, not the click." Body: "Enquiries by campaign and by search term where the data allows it, against a starting point…". "The limit" aside. Related links.

**2. Comprehension problem.** The heading repeats the page's thesis for the sixth time. It lists what is measured but not what the customer learns or what we do with it. The limit sits in a separate box that reads as a disclaimer.

**3. Proposed headline.**
> **What you learn each month, and what we do with it.**

**4. Proposed supporting copy.**

Lede:
> Each month we review the results with you. The report answers three plain questions:

1. **Which campaigns brought enquiries?**
2. **Which searches brought them?**
3. **How does that compare with where you started?**

Findings → decisions (labelled *For example*):

| What we find | What we do |
|---|---|
| Searches that bring enquiries | Give them more of your budget. |
| Searches that bring clicks but no enquiries | Stop your ads showing for them. |
| A page that gets visits but no enquiries | Look at what it asks people to do, and propose a change. |

Honest measurement (reframed from "The limit"):
> **When we can't tell where an enquiry came from, we say so.** A phone call after someone saw your ad is a common example. We don't claim those enquiries, and we don't hide them either. That's how you can trust the rest of the report.

Link: **How we measure, including what can't be traced →** `/how-it-works` *(retained)*.
Related (retained): if the clicks arrive and the enquiries do not · the whole system · the enquiries themselves.

**5. Graphic / animation — "Findings become decisions" + "Source unknown" tray.**
- **Concept:** reporting is only useful if it changes what we do next — and a report that shows its gaps is more believable than one that doesn't.
- **What the visitor sees:** left, a short loop strip: **Report → Review call → Decision → Change → next month's report** (five small nodes; the first two are the confirmed monthly report and call). Below it, three rows pairing a finding with a decision, joined by an arrow. To the right, a tray of small enquiry cards sorting into two bins: **Traced to Google Ads** and **Source unknown**, the second drawn with a dashed border but the same visual weight as the first.
- **Interaction:** on first scroll-in, the loop strip draws once, arrows in each pair draw in sequence, and the enquiry cards slide into their bins (≈ 1.5 s total, once). Keyboard/pointer: tapping a finding row highlights its paired decision (progressive enhancement only; meaning does not depend on it).
- **Why easier than text:** "findings lead to decisions" is a flow; "we show the gaps" is a sorting action. Both are physical ideas.
- **Mobile:** loop strip becomes a vertical list of five; finding/decision pairs stack; bins sit side by side under the pairs.
- **No animation / reduced motion:** final state shown; no sliding or drawing. **No JavaScript:** same final state (no content depends on JS).
- **No numbers on the cards or bins**; caption: *Illustration. No figures.*

**6. Intended takeaway.** "I'll see which ads bring enquiries, they'll act on it, and they'll tell me where they can't be sure."

**7. Retained / removed / changed.** *Retained:* by campaign and by search term where data allows, against a starting point, the attribution principle, the `/how-it-works` link and the related links. *Removed:* the repeated "enquiry, not the click" heading, the stand-alone "The limit" box. *Changed:* what is measured → what you learn and what we do; limit becomes a trust feature; attribution section merged.

**8. Unverified claims / dependencies.**
- **OWNER REQUIREMENT (`DEC-051`):** monthly performance reports and monthly review calls. **Not confirmed:** report format, metrics, whether it contains the three questions above in that form. "By campaign and by search term where the data allows" is existing approved wording (reporting content is therefore **WORKING HYPOTHESIS** at the level of a three-question summary; F-1).
- The three decision rows are **illustrative examples** of normal optimisation logic (level C/D), not promises of specific actions; labelled "For example".
- "A phone call after someone saw your ad" — an illustration taken from the earlier approved copy brief, not a measurement.

---

## C7 · Next step (brief area 9)

**1. Existing section and purpose.** "Tell us what the account is doing now" — H2 "What you spend, and what you get back." plus a long paragraph and one CTA.

**2. Comprehension problem.** The heading ("what you get back") edges toward return language and is the wrong register for a close. The body makes two audiences read one block. Nothing says what happens after the message is sent.

**3. Proposed headline.**
> **Already running Google Ads, or thinking about it?**

**4. Proposed supporting copy.**

Two starting points (side by side):

- **Already advertising on Google?** Tell us what you spend, what you're getting, and whether you can tell which enquiries came from it.
- **Thinking about it?** Tell us what you sell and what one new customer is worth to you. It helps us tell you whether Google Ads is worth considering.

What happens next (stepper; first step labelled *You are here* before the action, *Done* after on the thank-you page — optional):

1. **You get in touch.** We follow up by email or WhatsApp.
2. **Discovery call.**
3. **Audit.** We review where you are now.
4. **Proposal.** Our findings, a recommended plan and a proposal.
5. **Your approval.** Nothing starts until you agree.
6. **We begin.** We handle most of the agreed work, and ask for your input where we need it.

CTAs: **Tell us what you're trying to fix** *(primary, unchanged)* · **Book a call** *(secondary)*.

**5. Graphic / animation — "What happens next" stepper.**
- **Concept:** removing uncertainty about the process before the visitor commits.
- **What the visitor sees:** a six-step horizontal stepper in the ink close section, numbered, with the first step highlighted in tangerine.
- **Interaction:** steps reveal in order once on scroll-in (≈ 1 s). No click behaviour.
- **Why easier than text:** a numbered path is scannable in seconds and visibly short.
- **Mobile:** vertical stepper; CTAs stacked.
- **No animation / reduced motion:** static stepper. Reuse of the existing `Stages` primitive from the B5/How It Works work should be evaluated during build (**RESEARCH REQUIRED** — I did not inspect that component this phase).

**6. Intended takeaway.** "It's easy to get started, I'll know what happens, and I won't be committed before I've seen a plan."

**7. Retained / removed / changed.** *Retained:* both audience prompts (already-spending / not-yet-spending) from the live close; primary CTA wording. *Removed:* "What you spend, and what you get back." *Changed:* single paragraph → two parallel prompts; added the confirmed process.

**8. Unverified claims / dependencies.**
- **Confirmed (`DEC-051`):** email or WhatsApp follow-up; Discovery Call → Audit → Proposal → Approval → Execution; findings, plan and proposal before work; MappedSkills handles most agreed implementation with client input where required.
- **Not stated anywhere in the copy:** price of the audit or call, whether anything is free, response time, call length, or who attends. The word "free" does not appear.
- "Nothing starts until you agree" — inferred from the Approval → Execution order; owner to confirm wording (F-1).
- Whether the process is the same for Google Ads clients as for general clients is not stated in `DEC-051` (F-1).

---

# D. Copy comparison

| Area | Existing | Proposed | Reason |
|---|---|---|---|
| H1 | Google Ads, measured on the enquiries rather than the clicks. | Google Ads, run for real enquiries — not just clicks. | Plain verb ("run"); states the service rather than a measurement position; keeps "Google Ads" and "enquiries". |
| Hero lede | We run paid search: account structure, keywords, negatives, ad copy, bidding and budget. We also take responsibility for what happens after the click — the page it lands on, whether the enquiry completes, and whether you can see where it came from. | We set up and manage your Google Ads, so people searching for what you sell can find you. Then we check whether those searches turn into enquiries, and change what doesn't. | Removes jargon and the nine-item list; gives the whole service in two sentences. |
| Hero side note | Paid is a way to reach demand that is active now. It is chosen because it fits your business, not because every client gets one. | Google Ads isn't right for every business. If it isn't right for yours, we'll say so. | Same idea, in plain speech. |
| Receipt top | The search term / The ad / The click | Someone searches for what you sell / Your ad appears / They click it | Complete sentences a layperson understands. |
| Receipt bottom | The page it lands on / Whether the enquiry completes / Where it came from | Choosing which searches your ads show for / Writing and improving your ads / Managing how your budget is spent / Checking people can enquire once they land | Shows what we *do*; old list showed only the after-click extras. |
| Section 2 heading | One way to reach buyers. It earns its place, or it does not. | Google Ads suits some businesses better than others. | Removes abstraction; leads into criteria. |
| Section 2 body | What we are accountable for here is the same as everywhere else on this site: enquiries you can act on, measured. | It works best when people already search for what you sell, and a new customer is worth a good deal to you. Tick what's true for you. | Replaces corporate framing with decision criteria and an action. |
| Ruler | A supplier paid to manage spend improves the account. We work to a number two steps further down the chain. | *(removed; replaced by the path figure)* An ad report can look healthy while your phone stays quiet. Clicks only count at the start of the path. | The chain is now shown, and the implied criticism of others is dropped. |
| Section 2 closer | That changes what gets attention on the week the account looks healthy and the enquiries have stopped. | That's why we count enquiries, and use clicks only to find out why they're missing. | Concrete; less abstract. |
| Accountability heading | Your advertising spend is paid directly to Google. Our management fee is separate. | What we answer for. *(spend/fee moved into the hero receipt and a short line with a pricing link)* | Responsibility becomes the heading; money split is explained once, visually, in the hero. |
| Accountability body | We record where things stand at the start, so we have a clear point of comparison. We do not report ROI, and we do not claim results we did not control. | Five commitments (budget, starting point, decisions, poor results, monthly review). | Positive, specific commitments in place of refusals. |
| Not promised list | a return on ad spend; a cost per enquiry; a cost per lead; a number of enquiries per month. Those depend on your market, your price, your competitors and your own follow-up, none of which we control. | We cannot promise how many enquiries you will get, or what each will cost. Your market, your prices, your competitors and how quickly you answer all play a part. We commit to the work above instead. | Same boundary, once, calmly; removes "ROI" and "return on ad spend" terminology; ends on what we do commit to. |
| Scope heading | The account, and everything after the click. | What the work covers. | Plain and descriptive. |
| Scope item | The account. Structure, search terms and negatives, match types, ad copy, extensions, bidding and budget pacing. Ordinary work, done properly. | Choose the searches your ads show for. Write and improve your ads. Manage how your budget is spent. | Jargon removed; "done properly" (unevidenced) dropped; Google terms available in a muted line. |
| Scope item | Search-term review, continuously. Reading what people actually searched before they clicked, and excluding what should never have matched. Irrelevant matches are where a budget quietly goes. | Remove searches that waste money. *(Google calls these negative keywords.)* | Same task, one line. |
| Scope item | The landing experience. Whether the page answers the search it was bought for. A campaign pointed at a page that does not is how spend disappears without a trace. | Check the page people land on answers what they searched for. | Same idea; drops the dramatic ending. |
| Scope item | The enquiry path. The form, the booking, the phone route, and whether the enquiry actually arrives. | Check the enquiry route works — form, booking or phone — and that enquiries reach you. | Retained, shortened. |
| Scope item | Conversion measurement that is real. Conversion tracking configured around meaningful enquiry actions, where technically feasible. | Record each enquiry, so we can trace where it came from, where tracking allows. | Removes "conversion measurement"; keeps the feasibility limit. |
| Scope item | Focused on enquiries. We look at enquiries, not just clicks or impressions, and use campaign-level information where the data allows it. | *(removed — covered in the path figure and the monthly review)* | Repeated the page's thesis. |
| Scope boundary | *(none)* | Changes to your website or tracking are agreed with you in the proposal first. | Distinguishes included work from agreed changes; flagged in F-2. |
| Measurement heading | The enquiry, not the click. | What you learn each month, and what we do with it. | Says what the customer gets; stops repeating the thesis. |
| Measurement body | Enquiries by campaign and by search term where the data allows it, against a starting point captured before we change anything. | Three plain questions: which campaigns brought enquiries, which searches, and how that compares with where you started. + three finding→decision examples. | Keeps the approved content; adds the "so what". |
| The limit | When an enquiry's source cannot be identified, we say so rather than claiming credit for it. | When we can't tell where an enquiry came from, we say so. A phone call after someone saw your ad is a common example. We don't claim those enquiries, and we don't hide them either. That's how you can trust the rest of the report. | Same principle, framed as trust. |
| Close heading | What you spend, and what you get back. | Already running Google Ads, or thinking about it? | Names both audiences; removes "get back" (return language). |
| Close body | If you are already spending, the useful first message is what you spend, what you are getting, and whether you can currently tell which enquiries came from it. If you are not spending yet, tell us what you sell and what a single new customer is worth — that decides whether paid search makes sense at all. | Two parallel prompts + a six-step "what happens next" stepper. | Same asks, easier to find; adds confirmed process. |

---

# E. Visual interaction plan

## Primary visual narrative — "Follow the money"
One idea runs down the page: **money goes in at the top and the question is what comes out at the bottom.** The visitor sees it three times, at three depths:

1. **Hero receipt:** the money splits (Google / us). *Static + print-in reveal.*
2. **Path figure:** the money's route to an enquiry, and how a dashboard can look fine while the route is broken. *Interactive.*
3. **Findings → decisions:** what we learn from the route and change next. *Reveal-once.*

The conceptual starting journey in the brief (**budget → potential customer → website visit → enquiry → better decisions**) is used as-is in the path figure's five nodes. It is *not* repeated elsewhere as a second journey graphic.

## Supporting graphics
| Block | Graphic | Type | New component? |
|---|---|---|---|
| Hero | One click receipt | Reveal once | Existing; copy and one animation tweak |
| Fit | Fit check | Interactive (tick) | **New** (small client component) — optional |
| Path | Path and breaks | Interactive (select) + reveal | **New** client component |
| Scope | Before/after-click rail | Reveal once | CSS variant of existing tear |
| Accountability | Commitments ledger | Reveal once (ticks) | Receipt-styled list; CSS only |
| Reporting | Loop strip, finding→decision pairs, source-unknown tray | Reveal once; optional highlight | New CSS; light JS optional |
| Close | What happens next stepper | Reveal once | Existing `Stages` primitive if it fits (RESEARCH REQUIRED) |

## Interaction behaviour — rules for all of them
- **Reveal-once only**, using the existing `CplusMotion` `data-rv` mechanism. No looping, no ambient motion, no canvas, no sticky or pinned elements (`DEC-018`-era rules that C+ retains).
- **Two interactive components only** (Fit check, Path). Everything else is a reveal. The page should not become a toy.
- **Nothing hides content.** Without JavaScript, with reduced motion, without `IntersectionObserver`, or in print, every figure renders in its final, readable state.
- **No new analytics events** (the five-event taxonomy is approved; adding events needs separate approval and consent review — F-5). The Fit check stores and sends nothing.
- **No figures.** Every graphic carries "Illustration." where it shows a layout, never data.

## Desktop and mobile
- **Desktop (≥ 1024 px):** receipt right of the hero copy (existing); path figure horizontal with two rails beneath; scope rail horizontal with the tear; reporting loop horizontal beside the tray.
- **Tablet (768–1023 px):** scope groups stack, tear becomes horizontal rule (existing pattern); other figures keep a single column.
- **Mobile (< 768 px):** everything single column; path figure vertical with the two rails as compact columns; selectors as a segmented control; tap targets ≥ 44 px; no rotation on the receipt; no horizontal scroll; text ≥ 12 px and ≥ 4.5:1 contrast (KD-09/KD-10 rules); no text inside figures that cannot reflow.

## Accessibility and reduced motion
- **`prefers-reduced-motion: reduce`:** no drawing, no staggering, no sliding; each figure shows its final state; interactive state changes swap instantly.
- **No JavaScript:** Fit check shows the two-column list; Path shows three stacked mini-paths; everything else is already static.
- **Keyboard:** all interactive controls are native buttons or checkboxes in labelled groups; visible `:focus-visible` outline (existing).
- **Screen readers:** each figure has a text equivalent (e.g. "The path from budget to enquiry has five steps. An ad report shows the first two."); live regions (`aria-live="polite"`) announce Fit check and Path results; decorative ticks and lines are `aria-hidden`.
- **Heading hierarchy:** one H1; seven H2s; H3 only where a group needs one (scope groups). No skipped levels (C+ requirement, `DEC-051`).
- **Not required by this phase but flagged:** SR-1–SR-5 (real-device screen-reader checks) remain outstanding programme prerequisites; any new interactive figure inherits that dependency before production release.

---

# F. Decisions requiring owner approval

## F-1 · Unverified claims and operational facts
| # | Claim / commitment | Where | Needed |
|---|---|---|---|
| 1 | Ad spend is paid directly to Google; our fee is separate | Hero, C5 | Already live and consistent with `/pricing` and the Terms, but not logged as an owner decision. **Confirm in writing** and ideally record in `DECISION_LOG.md`. |
| 2 | "If it isn't right for yours, we'll say so" (hero) and "we'll tell you" (fit check) | Hero, C2 | Confirm MappedSkills will actually turn work away or say Google Ads is not suitable. |
| 3 | "We check where your budget goes and move it away from what isn't working" | C5 | Confirm it describes real practice for Google Ads. |
| 4 | **New commitment:** "We tell you the reason for changes" | C5 | Approve or reject. |
| 5 | **New commitment:** "If results are poor, you hear it from us, with the cause and our recommendation, including when we got it wrong" | C5 | Approve, soften or reject. This is the answer to quality-test question 6. |
| 6 | Monthly report and review call apply to Google Ads clients | C5, C6 | Confirm (`DEC-051` states it generally). |
| 7 | Report answers "which campaigns / which searches / how it compares with the start" | C6 | Confirm the report can show this, or provide the real report contents. |
| 8 | The Discovery Call → Audit → Proposal → Approval → Execution process applies to a Google Ads enquiry; "nothing starts until you agree" | C7 | Confirm. |
| 9 | "We handle most of the agreed work, and ask for your input where we need it" | C7 | Already `DEC-051`; confirm wording. |

## F-2 · Scope and deliverable assumptions
- Which scope items are **always included in the management fee** versus **agreed per client** (especially landing-page changes, enquiry-route fixes and tracking setup). The proposal uses neutral wording until this is answered.
- Whether "write and improve your ads" and "remove wasted searches" are ongoing monthly activities (the live page says "continuously"; the proposal places them under "Every month").
- Whether a **secondary CTA ("Book a call")** should appear on this page. It is live on the SEO page; the live Google Ads page has one CTA only. Discovery Call is a confirmed stage, so the button is consistent, but CTA roles are an owner call.
- Whether **audit** wording ("We review where you are now") is acceptable without stating whether the audit is free or paid. **No free audit, consultation or proposal is promised.**

## F-3 · Proposed structural changes
1. Add one net-new section (**Is Google Ads right for you?**). Total blocks: six → seven.
2. Remove the ruler and the "supplier paid to manage spend" line.
3. Merge brief §2 into the hero and §8 into reporting.
4. **Reorder:** scope before accountability (the brief lists them the other way round).
5. Replace the "We do not promise" list with one paragraph.
6. Optional links to `/seo`, `/social-media-ads` and `/pricing` from the Fit and Accountability blocks.

## F-4 · SEO and metadata (per `DEC-051`: any changed H1, title or intent is reviewed explicitly)
- **H1 changes** ("measured on the enquiries rather than the clicks" → "run for real enquiries — not just clicks"). The primary query phrase "Google Ads" and "enquiries" remain. **Recommend** approving the new H1 and **keeping the title, meta description and canonical unchanged.** If the owner wants the title aligned with the new H1, that is a separate SEO review.
- The H2 set changes; no URL, canonical or structured-data change is proposed. The page has no FAQ, so no `FAQPage` schema is affected.
- "ROI" never appears in the proposed copy (`DEC-007`; `TERMINOLOGY_DICTIONARY.md`). The title and description contain no ROI figure today.

## F-5 · New assets and technical work (not authorised; estimates are not provided)
- **Two new client components:** Fit check and Path figure (the latter is the primary visual and the main build item). Both need accessible markup, no-JS fallbacks and reduced-motion behaviour, and must pass the layout/a11y, text-spacing and CLS gates used in B0–B5.
- **Small CSS additions:** commitments ledger, before/after rail, loop strip, source-unknown tray, stepper.
- **Possible reuse** of existing primitives (`Stages`, `DisclosureGroup` and the receipt) — to be confirmed during build planning.
- **No new images, illustrations or photography** are required. No new fonts. No analytics events. No new dependencies.
- **Pre-release dependencies unchanged:** real-device checks (E1), SR-1–SR-5, consent/analytics regression.

## F-6 · Not in this proposal (flagged for completeness)
- No case studies, testimonials, client logos or results — **none exist** (`CLAIMS_LADDER.md` Level E is empty). The page therefore builds trust through transparency, not proof (see quality test, Q7).
- No pricing figures on this page. Fee bands live on `/pricing`.
- No response-time statement. No service-level promise.

---

# Quality test — read as a business owner who has never used Google Ads

I read the proposed page top to bottom and tried to answer the eight questions using only the proposed copy.

| # | Question | Answer the page now gives | Where | Verdict |
|---|---|---|---|---|
| 1 | What does MappedSkills do? | "We set up and manage your Google Ads, so people searching for what you sell can find you." | Hero | **Clear** |
| 2 | How could Google Ads help my business? | Reaches people already searching for what I sell; the fit check says when it suits me. | Hero, Fit | **Clear.** Deliberately no outcome claim. |
| 3 | What will MappedSkills manage? | Searches, ads, budget, the landing page and enquiry route, recording enquiries, removing wasted searches, monthly reporting. | Scope | **Clear** — subject to F-2 for what is included. |
| 4 | What am I paying Google for, and what am I paying MappedSkills for? | Google: the click. Us: the work, listed on the receipt, billed separately. | Hero receipt + C5 line | **Very clear** — answered in the first screen. Dependent on F-1 #1. |
| 5 | How will I know whether the advertising is working? | Monthly report and review call; three plain questions; enquiries are counted, not just clicks. | Path, Reporting | **Clear.** Report contents are partly hypothesis (F-1 #7). |
| 6 | What will MappedSkills do if the results are poor? | "You hear it from us, with what we think is causing it and what we'd change — including when we got it wrong." | Accountability, Reporting | **Clear, but depends on a new commitment (F-1 #5).** If rejected, the page can only say "we review it with you monthly", which is a weaker answer. |
| 7 | Why should I trust MappedSkills? | Separate, visible fee; a written starting point; honest "source unknown"; a stated process with a plan and proposal before any work; commitments instead of promises. | Throughout | **Partly.** This is trust through transparency. There is **no external proof** (no case studies, clients or results exist), and the page does not fake any. If permissioned proof becomes available later, Section 5 or the close is where it belongs. |
| 8 | What happens after I contact them? | We follow up by email or WhatsApp → discovery call → audit → proposal → your approval → we begin. | Close | **Clear.** No response time (not measured). |

**Result:** six answers are clear on confirmed facts or existing approved copy; two (Q6, Q7) depend on owner decisions or are inherently limited. **The one revision made during the test:** Q6 initially had no direct answer, so commitment 4 ("When results are poor") was added to Section 5 and the review call was linked to decisions in Section 6. Q7's limitation is stated, not hidden.

**Repetition check.** "Enquiries, not clicks" now appears in the hero (once), the path figure's caption (as the argument, once) and nowhere else as a slogan. Money split: hero only (plus one pricing link). Monthly review: once as a commitment, once with its content. Attribution limit: once.

**Voice and claims check.** No ROI, ROAS, cost-per-lead, figure, percentage, "free", guarantee, case study, testimonial, response time or ranking claim. No "MappedSkills" as a sentence subject in body copy. No exclamation marks. No war, sport or magic metaphors. Jargon appears only in muted "Google calls this…" glosses.

---

## Stop

This is the end of Phase 1. **No source file, branch, commit, test, animation or deployment was touched**; the only change in the repository is this untracked document. Awaiting owner direction on Part F before any implementation. Suggested minimum approvals to proceed to a design pass: F-1 (#1, #4, #5), F-2 (scope split), F-3 (structure), F-4 (H1) and F-5 (the two new components).
