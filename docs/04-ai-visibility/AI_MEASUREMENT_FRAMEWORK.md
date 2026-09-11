# AI Visibility Measurement Framework — Session 04

**Date:** 2026-08-31
**Status:** RESEARCH FINDING and a proposed **internal** method. Not an approved service, product or pricing decision.
**Evidence:** `AI_VISIBILITY_BASELINE.md`, `AI_ACCESS_CAPABILITY.md`; external evidence in `SOURCE_REGISTER.md` (S-14/S-15, Session 02; §K, Session 04).

---

## 1. What this session's own data says about measurability

Two results from §7 and §8 of the baseline shape everything below.

**Result 1 — within a single system, membership is often stable; order never was.**

| Prompt | System | Runs | Names recurring in every run | Order stable? |
|---|---|---|---|---|
| best SEO agencies in Pune | Google AI Mode | 3 | **4 of 4–5** | No |
| best AI SEO agencies in India | Google AI Mode | 2 | 4 of ~5 | No |
| best SEO agencies for manufacturing companies in India | Google AI Mode | 2 | **2 of ~5** | No |

**Result 2 — across systems, agreement collapses.** For the same prompt on the same day from the same location, **no agency appeared in three or more of the four systems tested.** On the manufacturing prompt, Google AI Mode and Perplexity returned **no overlapping names at all**.

These two results are compatible with the SparkToro/Gumshoe finding recorded in Session 02 (identical brand lists recurring under 1-in-100, while leading names still appear in 60–90% of responses for a given intent) and they sharpen it: **the stable thing is per-system membership; the unstable things are order and cross-system agreement.**

---

## 2. Metric-by-metric verdict

Each metric from the session brief, challenged against what was actually observed.

| Metric | Verdict | Reasoning from this session's data |
|---|---|---|
| **Prompt coverage** (how many defined prompts return an answer at all) | **KEEP.** Sound and cheap | Directly observable. Also caught a real finding: `best SEO agencies in Pune` returns **no AI Overview** in classic Search |
| **Mention frequency** (appearances ÷ runs, per system, per prompt) | **KEEP — the primary metric** | Reproducible; degrades gracefully; supported by the stability seen in Result 1 |
| **Recommendation frequency** (appearing in a *shortlist or ranked pick*, not merely named) | **KEEP, and keep it separate from mention** | ChatGPT named seven manufacturing agencies but *recommended* three. Google AI Mode's "companies that improve visibility in AI search" mentioned agencies but *led with tools*. Collapsing these loses the commercially important half |
| **Citation frequency** (own domain used as a source) | **KEEP, with a hard caveat** | Recoverable on Google AI Mode, ChatGPT, Perplexity. **Not recoverable on Gemini at all**, and not at all on Claude/Grok. Any "citation rate across AI systems" figure is a rate across *the systems that expose citations* and must say so |
| **Linked-citation frequency** (a clickable link, not just an attribution) | **DOWNGRADE to unmeasurable in this environment** | Google surfaces exposed **domains but not anchor hrefs**. Distinguishing "attributed" from "linked" was not possible. Do not report it |
| **Share of mentions** (own ÷ all brands named) | **KEEP, but only per prompt and per system** | Denominator instability makes it dangerous: ChatGPT returned 16 Pune brands, Perplexity returned 3. A blended share-of-voice figure would move purely on answer length |
| **Competitor co-occurrence** | **KEEP — high value, low cost** | Produced the session's most awkward finding: upGrowth 0/28, SEOTonic 0/28, DigiMark 0/28, Qoulomb 3/28 |
| **Source-domain frequency** | **KEEP — the most actionable metric found** | Yielded the directory finding (Semrush Agency Partners in 10 of 28 runs; Clutch in 5). This metric points at *what to do*, which mention frequency does not |
| **Factual accuracy** (is the description correct) | **KEEP, and treat as a risk metric, not a vanity metric** | Caught AI systems redistributing MappedSkills' unsubstantiated "300%+ ROI" claim, and a staging subdomain being cited as a source |
| **Prompt-class coverage** (mentions spread across classes) | **KEEP** | Cheap, and it prevents a single flattering prompt from carrying a report |
| **Run-to-run variance** | **KEEP, and publish it alongside every other number** | The whole framework's credibility rests on this |
| **"Average AI rank"** | **REJECT** | Order was unstable in **every** repeated prompt. There is no evidence in this session that position within an AI answer is a stable quantity, and reporting a mean of unstable ordinals manufactures precision that does not exist |
| **A single blended cross-system "AI Visibility Score"** | **REJECT** | Result 2 is decisive. Averaging across systems that agree on almost nothing destroys the only stable signal. Session 02 and Session 03 already rejected this as a *commercial* asset; Session 04 rejects it on *methodological* grounds as well |

---

## 3. What can and cannot be responsibly said

**Can be said, with the run count attached:**
- "In *n* runs on *system S* on *date D* from *location L*, brand B appeared in *k* of them."
- "The same four names appeared in all three runs; the order changed every time."
- "Across 28 unbranded runs, `agencies.semrush.com` was a cited source in 10."
- "MappedSkills was identified accurately when asked by name, and appeared in none of 28 unbranded runs."

**Cannot be said on this evidence:**
- "MappedSkills ranks #N in ChatGPT." Order is unstable, and Grok and Claude were untested.
- "Our AI Visibility Score is X." Rejected above.
- "AI visibility improved *y*%." One measurement exists. There is no trend.
- "Competitor C has no AI visibility." Zero appearances in a 28-run sample at signed-out tiers is not absence.
- Anything about Claude or Grok.
- Anything about markets outside India, or languages other than English.

---

## 4. What a defensible measurement method would actually require

Derived from what broke in this session, not from a template.

1. **Per-system reporting, always. Never blended.** Result 2.
2. **Repeated runs, with the repeat count published beside every number.** Three runs distinguishes "once" from "always" and nothing more. A number without its *n* is not a measurement.
3. **A frozen, pre-registered prompt universe**, containing prompts the brand is expected to fail. `AI_PROMPT_UNIVERSE.md` §0 is the pattern.
4. **Full environment capture per run** — system, surface URL (`udm=50` matters), signed-in state, model tier where disclosed, egress geolocation, timestamp, whether a tool such as "Web search" was enabled. Without these five, a result is not reproducible.
5. **Four separate layers, never one number** — retrieval, discovery, recommendation, citation. This session's central finding (MappedSkills scores full marks on retrieval and zero on the other three) would be invisible under any single score.
6. **A stated stability class per prompt.** Membership stability ranged from ~100% to ~40% *within one system on one day*. A prompt's reliability is a property of the prompt, and reporting a fragile prompt with the same confidence as a stable one is the core dishonesty in this category.
7. **Explicit non-coverage.** Every report must name the systems it could not test. On this session's evidence a signed-out method cannot cover Claude or Grok at all.

---

## 5. Cost and coverage reality — the commercial constraint

This session measured four surfaces at their **signed-out tiers**, and two of six charter-named systems could not be tested at all. Anyone offering "visibility across ChatGPT, Gemini, Claude, Perplexity and Grok" would need paid accounts, paid tooling, or both.

Verified at source, 2026-08-31:

| Product | Price | Coverage | Repeated-run methodology published? |
|---|---|---|---|
| Profound Starter | $99/mo | **1 engine** (ChatGPT), 50 prompts, 1 seat | No |
| Profound Growth | $399/mo | 3 engines, 100 prompts, 3 seats | No |
| Profound Enterprise | custom | up to 9 engines | No |
| Semrush AI Visibility Toolkit | "$99/mo per domain billed annually" | 25 prompts, 1 domain; ChatGPT, Google AI, Gemini, Perplexity | No |

**Two things follow.** First, full multi-system coverage is a **paid input with a real recurring cost**, and any MappedSkills service must price it in. Second — and more useful — **neither vendor publishes run-to-run variance**, while both use ranking language. Profound's own description is that it "runs structured prompts across AI platforms daily… tracking citations, sentiment, **ranking**, and competitive presence."

That gap between what the tools report and what the data supports is the only genuinely open methodological position observed in this market. Whether it is *commercially* valuable is a separate question, answered unfavourably in `AI_STRATEGIC_VALIDATION.md` §11.

---

## 6. Honest limitations of this framework

1. It is derived from **one day, one location, signed-out tiers, 39 total runs**. It is a method sketch validated at small scale, not a validated methodology.
2. **It has no day-to-day variance data at all.** All repeats were inside a ~40-minute window. Cross-day drift may be far larger than the within-session variance measured, and is the single most important unmeasured quantity in this document.
3. **Two of six systems are entirely outside it.**
4. It measures **visibility only**. It says nothing about traffic, enquiries or revenue — see `AI_STRATEGIC_VALIDATION.md` §12.
5. **No claim is made that following this method produces better commercial outcomes than a commodity dashboard.** It produces more *defensible* numbers. Those are different claims, and conflating them would repeat the error the framework exists to avoid.
