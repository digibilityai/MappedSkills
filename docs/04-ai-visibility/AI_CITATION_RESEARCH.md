# AI Citation & Source-Pattern Research — Session 04

**Date:** 2026-08-31
**Lens:** India / Pune, English, signed out
**Status:** RESEARCH FINDING. Nothing here is an approved decision.

> **Scope limit.** "Citation" here means **a source domain the system attributed its answer to**, recovered from the rendered page. Exact cited URLs were not captured on Google surfaces (only domains), Gemini exposed **no** citations at all, and Claude and Grok were **NOT TESTABLE**. Frequencies below are counts over **28 unbranded runs**, not percentages of a population.

---

## 1. The single most important finding

**Directory and marketplace listings are the load-bearing source for agency-recommendation prompts, across every system that exposes citations.**

The evidence is not inferential. ChatGPT stated its own reasoning in the answer text:

> "Semrush… specifically identifies SEO Yodha, e intelligence, GO MO Group and others as serving manufacturing clients in India; Clutch's August 2026 B2B rankings also include e intelligence."

That is an AI system explaining that it selected the brands it recommended **by reading two directories**.

### Source-domain frequency across the 28 unbranded runs

| Source domain | Runs it appeared in | Where |
|---|---|---|
| **`agencies.semrush.com`** (Semrush Agency Partners) | **10** | Google AI Mode ×8 (India SEO, B2B SEO, AI SEO ×2, manufacturing ×2, upGrowth-alternatives, Pune B2B); Perplexity manufacturing; ChatGPT manufacturing |
| **`clutch.co`** | **5** | Google AI Overview (manufacturing); Google AI Mode (manufacturing run 2); Perplexity (manufacturing); ChatGPT ×2 (manufacturing, Pune) |
| `linkedin.com` | 4 | Google AI Mode ×3 (all AI-search-class prompts); Perplexity (AI SEO India) |
| `youtube.com` | 2 of 3 AI Overviews observed | "how to appear in ChatGPT"; "traffic but no leads" |
| `goodfirms.co` | 2 | Perplexity (Pune); ChatGPT (Pune) |
| `instagram.com` | 2 | Google AI Mode (Pune digital marketing; MappedSkills entity probe) |
| `aninews.in` (PR wire) | 1 | Perplexity (AI SEO India) |

**Semrush Agency Partners and Clutch together appear in 15 of 28 unbranded runs.** MappedSkills has a profile on **neither** (`AI_VISIBILITY_BASELINE.md` §9).

---

## 2. The second mechanism: single-listicle dominance

On several prompts, **one third-party listicle supplied essentially the whole answer**, and the brands in that listicle became the recommendations.

| Prompt | System | Dominating source | Effect |
|---|---|---|---|
| best SEO agencies for manufacturing companies in India | Perplexity | **`xsquareseo.com`** | **Every named agency (4 of 4 attributions) traced to this one page.** ChatGPT cited the same domain independently on the same topic |
| alternatives to upGrowth for SEO in India | Google AI Mode | **`thirdmeta.in`** | Four attributions. **ThirdMeta is both the dominant cited source and a recommended brand inside its own list** |
| digital marketing agencies for industrial companies in Pune | Google AI Mode | `shinescript.com` | Supplied the agency set, complete with street addresses |
| best AI SEO agencies in India | Google AI Mode + Perplexity | `factoryjet.com`, `repindia.com` | Both runs; the first-listed brand was also a cited source |

**The ThirdMeta case is the clearest observed statement of the mechanism in this whole session:** publish the comparison listicle for a category → become the cited source → be recommended inside your own list. This is the same acquisition pattern Session 02 observed on classic SERPs ("the ranking asset is the comparison listicle, not the service page") and Session 03 observed as listicles gatekeeping category terms — **now confirmed to carry through into the AI answer layer.**

**Caution.** This is a mechanism observation from a handful of prompts on one day. It shows the pattern is *available*; it does **not** establish that any given listicle will be picked up, how long dominance persists, or that the tactic scales. Google's own guidance also warns against scaled content produced primarily to game search (Project Rule 10 makes the same point for this project).

---

## 3. The third mechanism: local business listing data

**VERIFIED FACT.** ChatGPT's answer to *best SEO agencies in Pune* was not prose — it was a **16-entry local business list** with names, star ratings, review counts, business categories and open/closed status. Google's own classic SERP for the same query served a **Local Pack** and **no AI Overview at all**, with Opstech shown at 4.9 (507 reviews) and "7+ years in business".

**INFERENCE (strongly supported, not proven):** for local vendor prompts, the selection signal appears to be **local listing data — rating, review count, category, address** — not website content and not category positioning.

This is the mechanism MappedSkills is furthest from. It has no rating surfaced anywhere, no review count, no address that any system could state, and — on the evidence of §1 of `AI_VISIBILITY_BASELINE.md` §9 — an entity declaration whose `postalCode` field contains the word "India".

---

## 4. What did NOT drive citations

Recorded because the absences are as informative as the presences:

| Expected source type | Observed |
|---|---|
| **Reddit** | **Zero appearances in 28 runs.** Session 03 found Reddit is a page-one competitor on every question-shaped Google query. It did not surface as an AI citation in this sample. Do not assume Session 03's Reddit finding transfers to the AI layer |
| **`llms.txt`, structured data, AI-specific markup** | Nothing observed suggests these drove any selection. Consistent with Google's published position (`AI_CRAWLER_POLICY.md` §3) |
| **GEO/AEO category positioning** | Zero appearances for upGrowth, SEOTonic and DigiMark across 28 runs, on prompts explicitly about GEO and AI SEO. **Selling the category did not produce citations in this sample** |
| **News and industry publications** | One PR-wire domain (`aninews.in`) in one Perplexity run. Otherwise absent |
| **YouTube** | Present in 2 of 3 AI Overviews observed, both on **informational** queries — never on a vendor-selection query |

---

## 5. First-party vs third-party: the split is by prompt type

| Prompt type | Source pattern observed |
|---|---|
| **Branded** ("what is MappedSkills") | **Almost entirely first-party.** Own site + LinkedIn, occasionally Instagram. Identical pattern for upGrowth and SEOTonic |
| **Unbranded vendor-selection** ("best X agency for Y") | **Almost entirely third-party.** Directories, listicles, local listing data. First-party sites appear only *after* the brand has been selected, as corroboration |
| **Unbranded informational** ("why does my site get traffic but no leads") | **Mixed and brand-free.** Answered with roles and reasons, not vendors. Cited small agency blogs and YouTube |

**This is the structural answer to the question the brief poses in §14.**

> **MappedSkills' future AI visibility almost certainly requires authority outside its own website.** Its own site is already sufficient for the branded layer — that layer works today. It is worth **nothing** in the unbranded layer, where every observed selection came from somewhere else.

---

## 6. A finding about tool brands displacing agency brands

Two prompts in the AI-search class returned **software, not agencies**, as the primary answer:

- *companies that improve visibility in AI search* → **Semrush, SE Ranking, Ahrefs** named first; a single agency (Contensify) fourth.
- *who can help my company get found in Google and AI search* → **Profound** named by brand, ahead of any agency, with `tryprofound.com` cited.

Session 03 found that AI-visibility search demand resolves to free tools rather than agencies (page one of `ai visibility checker` was ten free tools). **Session 04 finds the same displacement inside the AI answer layer itself, from an independent evidence base.**

This is direct evidence against an "AI Visibility Score" as an acquisition asset — it now fails on the classic SERP *and* in AI answers.

---

## 7. Realistically, can MappedSkills enter the source set?

Assessed against what was actually observed, in rough order of feasibility. **All are WORKING HYPOTHESES. None is recommended here — that is Gate 4's decision.**

| Route | Feasibility | Basis |
|---|---|---|
| **Directory profiles (Semrush Agency Partners, Clutch, GoodFirms)** | **Highest.** Self-serve, no proof asset required to list | Present in 15 of 28 runs. MappedSkills is on none |
| **Local listing data — Google Business Profile, reviews** | **High, but slow and owner-dependent** — reviews cannot be manufactured (Rule 15) | The observed mechanism for every local prompt |
| **Being *in* other people's listicles** | Medium. Requires outreach, not publishing | Session 02 §3.8 reached the same conclusion for classic SERPs |
| **Publishing the listicle / comparison asset** | Medium, and **strategically double-edged** | Demonstrated by ThirdMeta. But it is a crowded, low-trust format and sits close to Rule 10 |
| **Original vertical research** (the Session 02/03 moat candidate) | **Unproven in this sample.** No research asset was observed being cited in 28 runs | Recorded honestly: this session found **no evidence** that original research drives AI citations for agency prompts in India |
| **LinkedIn presence** | Already working for the branded layer; appeared 4× in unbranded AI-search prompts | Cheapest observed third-party surface MappedSkills already occupies |

**The uncomfortable line in that table is the research row.** Session 02 and Session 03 both proposed original benchmark research as MappedSkills' most durable moat. Session 04 tested for it and **did not observe a single research asset being cited in any unbranded agency prompt.** That is not proof the moat is wrong — the prompt universe was vendor-selection-heavy, and a research asset earns links and authority through channels this session did not measure — but **it is the first evidence gathered against it, and it should not be quietly dropped when Sessions 02–04 are synthesised.**

---

## 8. Limitations

1. **Domain-level citations only** on Google surfaces; no exact URLs.
2. **Gemini contributed no citation data whatsoever.** Claude and Grok contributed none. Half the charter's named systems are unmeasured here.
3. **28 runs on one day, one location, signed out.** Frequencies are counts, not rates, and carry no confidence interval.
4. **Signed-out Perplexity returned abbreviated answers**, which may have suppressed both brand counts and source counts.
5. **The prompt universe is vendor-selection-weighted.** Source patterns for informational, comparison or procurement-stage prompts are largely unmeasured.
6. **No causal claim.** That Semrush Agency Partners appears in 10 runs and MappedSkills has no profile there does not establish that creating one would produce appearances.
