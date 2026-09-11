# Primary User Journeys — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `FUNNEL_ARCHITECTURE.md` §3–§4 · `PAGE_TYPE_CRO_RULES.md` · `WEBSITE_INFORMATION_ARCHITECTURE.md` §2 (all approved).

---

## 0. How to read these

**A journey is a description of what a buyer is likely to do, not a route the site forces them down.** Each journey below states its entry, its decision points, its permitted exits, and the one thing that would break it. Every journey shares one terminus — **qualified enquiry creation, through either surface** — and every journey permits the reader to reach that terminus at any point.

**Three rules bind all seven:**

1. **Proof is never a required step** between any page and the conversion (`DEC-010` restriction 5c). Where a journey shows an evaluation detour, that detour is **chosen by the visitor**, never imposed.
2. **No journey requires a particular conversion mechanism** (restriction 5d). Form and booking are two doors to one outcome; direct contact is a peer, not a fallback.
3. **A journey may be entered at any node.** Search delivers readers into the middle of every one of these.

**Notation:** `→` a movement the visitor makes · `⟂` an optional branch the visitor may take or ignore · `■` the primary conversion outcome.

---

## A. Search-intent journey — the one the business is built on

**Who:** a buyer who has named a discipline and is looking for a supplier. Commercial-investigation or transactional intent.
**Entry:** an organic or paid result landing on `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`, `/pricing`, or the conditional `/industries/manufacturing`.

```
Search result
   → Commercial page  [first screen confirms the searched capability, in the searcher's word]
   → ■  qualified enquiry, form or booking            ← the default path
        ⟂ /how-it-works        (method, for an evaluator who wants it)
        ⟂ /research/{entry}    (the measurement, same)
        ⟂ /pricing             (cost, if they are price-stage)
        ⟂ /problems/…          (if the page reveals their problem is upstream)
        → ■
```

**Decision points, in the order the reader hits them.**

| # | Point | What the UX must deliver | Failure mode |
|---|---|---|---|
| 1 | **Is this the right page?** | Search-intent confirmation in the first screen, in the searcher's own word, before anything else | The page protects its positioning by delaying confirmation and loses the demand it exists to capture (`MESSAGING_ARCHITECTURE.md` §2 failure mode B) |
| 2 | **Is this the right kind of firm?** | The bridge to the commercial outcome, within two sentences of confirmation | The page reads as a category page and the company drifts into that category |
| 3 | **What am I actually buying?** | The work, the boundary, the measurement — the slow middle | Vagueness, which in this category reads as inexperience |
| 4 | **Do I believe them?** | Apparatus present beside the claims; `/how-it-works` and the relevant research linked prominently as **offers** | Proof made into a step. The readiest buyers are the ones a detour costs |
| 5 | **How do I start?** | One outcome, two surfaces, direct contact at equal weight | A CTA that promises an outcome, or a page that dead-ends |

**Friction tolerance: highest on the site.** The visitor declared a need by choosing this page, which is what justifies the four-field form.

**What breaks this journey:** anything above the fold that is not the commercial answer. Apparatus, a figure, a proof module, an evidence badge or a limit in the first screen converts a commercial page into a publication in one screen (B27).

---

## B. Problem-aware journey — the most winnable surface in the programme

**Who:** someone with traffic and no enquiries who **has not named a discipline** and may not think an agency is the answer.
**Entry:** `/problems/traffic-but-no-enquiries` from a symptom query; or from `/conversion-optimization`, `/seo`, `/ai-seo`, `/lead-generation`, the homepage symptom list, or launch article 3.

```
Problem page
   → recognition        "this is my situation"
   → refusal            "it is one of four things, and they need different fixes"
   → self-diagnosis     five checks, each ending in an observable outcome
   → what each finding means
        ├── two findings → "fix this yourself; you do not need an agency"   ← a real exit
        ├── one finding  → "you have too little evidence to diagnose anything yet"  ← a real exit
        ├── demand finding    ⟂ /seo
        ├── page finding      ⟂ /conversion-optimization
        └── any finding       → ■  qualified enquiry, diagnostic-framed
```

**The binding constraint, restated as a UX requirement:** the diagnostic must be **completable by the reader without contacting anyone** — no tool, no sign-up, no download, no email, no score (B25). This is a CRO constraint as much as an SEO one: a page that fails it will not convert either.

**Three of the outcomes point away from MappedSkills, and the UX must not weaken them.** Two tell the reader to fix it themselves; one tells them they cannot yet diagnose anything. They must not be visually demoted, collapsed, moved below the CTA, or set in a lighter treatment than the outcomes that route to the firm. **A demoted honest outcome is a dark pattern with good manners.**

**Friction tolerance: low.** No hard sell above the fold. Sticky CTA below the fold only. The commercial transition happens **only after the reader has an answer**.

**What breaks this journey:** gating the diagnostic; producing a score; making the checks require a tool; or letting the last screen be a form wall rather than a route to something useful.

---

## C. Homepage journey — comprehension, then route or convert

**Who:** mixed and mostly mid-funnel — a brand search, a referral, a directory listing, or a link from a deeper page. **Not primarily a cold organic entry point.**

```
Homepage
   → the standard the firm accepts        [H1, alone, at first paint]
   → one dated checkable item             [the single first-screen apparatus exception]
   → recognition
   → the mechanism (the run)              ← the page's one figure of full weight
   → the accountability boundary          ← a state on the same object
   → capability routing                   → /services · /seo · /ai-seo · /google-ads
   │                                        /social-media-ads · /conversion-optimization
   │                                        /lead-generation · /how-it-works
   → what can be checked                  ⟂ /how-it-works · /research · /about
   → fit                                  ⟂ /pricing · /services   ← a real exit for a poor fit
   → ■  two surfaces, direct contact as a peer
```

**Two exits are as important as the conversion.** A mixed-intent visitor who came to route should be able to leave for the page they came for **in seconds**, from the capability block — that block's job is routing, not persuasion. And a poor-fit visitor should be able to establish they are a poor fit and leave without enquiring.

**Returning and informed visitors must be able to skip.** Two mechanisms, both cheap: the header carries every route the page routes to, so a returning visitor never has to scroll to navigate; and the capability block is reachable by heading navigation, so a screen-reader or keyboard user reaches the routes without traversing the argument.

**What breaks this journey:** anything competing with the H1 at first paint; a capability card grid (B14); an apparatus-first opening; or a page whose accumulated gaps and limits outweigh what the firm does (B32).

---

## D. Research and editorial journey — must survive its own commercial section being deleted

**Who:** evaluators, practitioners, potential linkers, journalists, AI systems — **and a meaningful share of students and job-seekers**, by design, because the target vocabulary is career- and course-contaminated.

```
/research/{entry} or /blog/{slug}
   → the question, and why it was asked   ← never the conclusion as a hook
   → method, at full provenance           [apparatus IMMEDIATE on research]
   → findings, including the adverse ones
   → interpretation, labelled as interpretation
   → limitations, including what was not testable at all
   → commercial relevance                 ← short, at the end, once
        ⟂ the relevant commercial or problem page
        → ■
```

**Conversion is incidental here and the restraint is a commercial decision, not modesty.** The launch research entries publish MappedSkills' own **measured zero**. A hard conversion push on that page contradicts the exact quality it is published to demonstrate.

**UX consequences, all binding:** no sticky CTA (B16) · no PRIMARY CTA above the fold · no gate, email wall or download form · at most one or two contextual commercial links in a whole entry · the entry must remain useful to a reader who will never buy.

**The editorial variant differs in one way:** an article delivers its answer first and offers **one** relevant next step afterwards. No booking prompt on an article, ever.

**What breaks this journey:** a research entry that reads as a disguised landing page — which, on this site, would discredit the one asset the firm can publish without anyone's permission.

---

## E. Direct-contact journey — the only job left is not to lose them

**Who:** a visitor who has decided.

```
Header CTA · footer · any commercial page · /pricing
   → /contact  (form surface)   ⟂ cross-link → /schedule-call
   → four required fields, context already carried
   → submit
   → server confirms durable persistence          ← the only blocking step
   → ■  /thank-you  — confirmation, one useful link, no second ask

   or:  tel: / WhatsApp  → conversion *intent* recorded, never a qualified enquiry
```

**Zero apparatus, zero figures, zero proof on either conversion surface** (B17). Proof here is a distraction from a decided visitor.

**The failure state is part of the journey and must be designed as such.** If persistence fails, the visitor sees an explicit failure with every typed value preserved, a retry, and a fallback route. **A false success is the one outcome that is never acceptable** — and it is the exact defect the firm's own published diagnostic uses as its worked example.

**What breaks this journey:** anything that offers a route away from a decided visitor; a second competing goal; a success state shown on a client-side timer; or a form that loses a typed message on failure.

---

## F. Pricing journey — self-selection before the enquiry

**Who:** price-stage, frequently late-stage, sometimes a price-shopper.

```
/pricing
   → what is actually being bought        ← before any number
   → the horizon                          ← a price with no horizon reads as a fee
   → the price                            [OWNER-BLOCKED]
   → what moves the number                ← the most useful section on the page
   → what the engagement needs from you
   → who this is not for                  ← a real exit, without disparagement
   → the hardest objection, answered      ← premium price, no case studies
   → ■  booking emphasised — price-stage buyers want a person
        ⟂ /how-it-works
```

**A rising unqualified rate from this page is expected and is not a defect.** The `ICP.md` fit criteria are the mitigation, not the page. The UX consequence is that the "who this is not for" section must be genuinely reachable and genuinely readable — a poor-fit buyer leaving **without enquiring** is this journey working correctly.

**Apparatus is DEFERRED on this page** to "what moves the number" (`17` §3). Price first, machinery later.

**What breaks this journey:** a decorated price, which reads as defensive; a calculator or quote generator (F8 is a factor matrix, never a calculator); or justifying the number before stating it.

---

## G. Returning and evidence-seeking journey — the one where the proof route is genuinely used

**Who:** an evaluator who has been here before, or who arrived from a directory, a saved link or a brand search, and who has decided to check the firm out properly.

```
/ or /about or a commercial page
   → /how-it-works        [apparatus IMMEDIATE — this page *is* the apparatus]
   → /research/{entry}    [full provenance, method reproducible]
   → back to the commercial decision      ← the return path must exist and be obvious
   → ■
```

**This is the only journey in which the proof detour is the point**, and it is taken because the visitor chose it. The architecture's job is to make the **return** as easy as the departure: every proof page carries a clear, contextual route back to the commercial decision — not a generic "back to services", but the page or capability the evaluation was about where that is known, and `/services` where it is not.

**No sticky CTA on `/how-it-works`, `/research` or `/research/*`.** PRIMARY appears at the end only, after the method has been delivered.

**What breaks this journey:** a proof page that dead-ends; a proof page with a persistent sales prompt on it; or an apparatus so dominant elsewhere on the site that this journey stops feeling like a deliberate choice and starts feeling like the default reading experience.

---

## H. The journeys as one system

**One terminus, seven approaches, no forced sequence.**

| Journey | Entry page type | Primary CTA role | Friction tolerance | Sticky permitted | Apparatus on first screen |
|---|---|---|---|---|---|
| A — search intent | Commercial | PRIMARY | Highest | Yes | **No** |
| B — problem-aware | Problem | DIAGNOSTIC | Low | Below fold only | **No** |
| C — homepage | Homepage | PRIMARY | Low | Yes | **One dated item only** |
| D — research / editorial | Research, article | RESEARCH / LOW-COMMITMENT | Lowest | **No** | Research: yes, IMMEDIATE. Articles: byline only |
| E — direct contact | Contact, booking | PRIMARY | Highest, but no extra fields | N/A | **No — none anywhere on the page** |
| F — pricing | Pricing | PRIMARY, booking emphasised | High | Yes | **No — deferred** |
| G — returning evaluator | Methodology, research, about | PROOF | Medium | **No** | Yes |

**Two journeys the architecture deliberately does not build.**

- **A diagnostic-tool journey.** It is the obvious eighth path and it is not built at launch — blocked on the free/paid/hybrid entry-offer decision. A free self-serve version would price the entry offer at zero (IA §11, `FUNNEL_ARCHITECTURE.md` §1).
- **A vertical journey on any unconditional page.** `/industries/manufacturing` is conditional; no unconditional page links to it, and the homepage explicitly does not.

---

## I. Where the journeys are currently broken (VERIFIED FACT, Sessions 01/01B)

Recorded here because a journey document that describes only the intended state would be misleading.

| Journey | Current production state |
|---|---|
| **E — form** | The form has no `action` and no `method`, transmits nothing, and shows a success screen. Every enquiry it received was lost while the visitor was told it worked |
| **E — booking** | The booking container renders empty, with zero iframes; non-JavaScript clients see a "not configured yet" fallback |
| **E — thank-you** | `/thank-you` exists and is orphaned. Nothing links or redirects to it |
| **All** | No analytics of any kind runs in production, so no journey is currently measurable |
| **C** | `/services` is unreachable from the header; `/about` and `/faq` are footer-only |
| **G** | `/research` and the problem page do not exist yet |

**None of this is fixed by UX.** It is fixed by the technical prerequisites, which remain the parallel priority.
