# AI Prompt Universe — Session 04

**Date:** 2026-08-31
**Status:** RESEARCH INSTRUMENT. Defined **before** results were interpreted.
**Lens:** India / Pune (session egress), English, all systems signed out.

---

## 0. Design rules applied

1. **Prompt classes were fixed before testing**, so that a null result in one class could not be quietly dropped.
2. **Favourable and unfavourable prompts were both included.** The universe deliberately contains prompt classes where MappedSkills' *current* declared category should surface it (local Pune agency prompts) and classes where it almost certainly would not (national category prompts) — so that absence in the second cannot be presented as the whole story.
3. **Branded prompts are separated from unbranded prompts** and are never combined into a single score. Retrieval, discovery, recommendation and citation are recorded as four different things.
4. **Competitor-comparison prompts were included even though they favour the competitor**, because they are how a real buyer researching upGrowth would behave.
5. Prompts are **buyer-phrased where the buyer would phrase them that way**, using Session 03's finding that Indian buyers do not use the industry's acronyms.

---

## 1. The universe

### Class A — Category discovery (unbranded, generic)
| ID | Prompt |
|---|---|
| A1 | best SEO agencies in Pune |
| A2 | best SEO companies in India |
| A3 | SEO agency for B2B companies in India |
| A4 | best digital marketing agency in Pune |

A4 was added during the session because it is **MappedSkills' actual current declared category** (`/` describes a performance-marketing agency; Session 03 established this family has strong Pune demand). Without it the baseline would only have measured absence from a category MappedSkills does not yet claim.

### Class B — AI-search discovery
| ID | Prompt |
|---|---|
| B1 | best AI SEO agencies in India |
| B2 | agencies that help brands appear in ChatGPT |
| B3 | generative engine optimization agencies in India |
| B4 | companies that improve visibility in AI search |

### Class C — Problem discovery (buyer's own symptom sentence)
| ID | Prompt |
|---|---|
| C1 | my website gets traffic but no leads who can help |
| C2 | why is my website getting traffic but no leads *(AI Overview trigger test)* |
| C3 | who can help my company get found in Google and AI search |
| C4 | how to appear in chatgpt search results *(AI Overview trigger test)* |

### Class D — Vertical discovery (manufacturing hypothesis)
| ID | Prompt |
|---|---|
| D1 | best SEO agencies for manufacturing companies in India |
| D2 | digital marketing agencies for industrial companies in Pune |
| D3 | agencies that generate enquiries for manufacturers in India |

### Class E — Competitor / comparison
| ID | Prompt |
|---|---|
| E1 | alternatives to upGrowth for SEO in India |
| E2 | compare SEO agencies in Pune for B2B companies |

### Class F — Branded factual
| ID | Prompt |
|---|---|
| F1 | what is MappedSkills |
| F1b | What is MappedSkills (mappedskills.com)? What services does it offer? *(domain-disambiguated variant)* |
| F2 | what services does MappedSkills offer |
| F3 | is MappedSkills an SEO agency |
| F4 | MappedSkills Pune address reviews google business profile *(entity/listing probe)* |

### Class G — Competitor branded (baseline control)
| ID | Prompt |
|---|---|
| G1 | what is upGrowth Pune agency |
| G2 | what is SEOTonic |

Class G exists to answer a question the brief requires and that a MappedSkills-only baseline cannot answer: **is MappedSkills' branded source footprint actually worse than a competitor's, or does every agency in this market look equally thin to an AI system?**

---

## 2. Deliberate variant pairs

Two prompts are near-duplicates by design, because the difference between them is itself the finding:

- **F1 vs F1b** — the bare brand name versus the brand name plus its domain. This separates *entity recognition* from *live URL retrieval*.
- **C1 vs C2** — a "who can help me" framing versus a "why is this happening" framing of the same symptom. This separates *vendor-seeking* from *explanation-seeking* behaviour, which Session 03 predicted would rank differently and which turned out to route to different Google surfaces.

The ChatGPT F1 prompt was additionally run **twice: once with the Web search tool off and once with it on.** That pair separates parametric model knowledge from live retrieval, and it produced one of the session's clearest results.

---

## 3. Repeat design

Repeats were concentrated where the strategic stake is highest rather than spread evenly:

| Prompt | System | Runs | Why repeated |
|---|---|---|---|
| A1 | Google AI Mode | **3** | Anchor prompt. Tests whether a stable "recommended set" exists at all |
| B1 | Google AI Mode | **2** | The one AI category term Session 03 found commercially live |
| D1 | Google AI Mode | **2** | The manufacturing hypothesis. Highest strategic stake |
| all others | — | 1 | Coverage, not variance |

**Three runs is not a rank measurement and is not presented as one.** It is sufficient to distinguish "this name appeared once" from "this name appeared every time", and nothing more. See `AI_MEASUREMENT_FRAMEWORK.md` §4 for what this sample size does and does not license.

---

## 4. Coverage actually achieved

| System | Unbranded runs | Branded runs (MappedSkills) | Competitor branded runs | Total |
|---|---|---|---|---|
| Google AI Mode | 19 | 4 | 2 | 25 |
| Google AI Overviews | 3 answered + 1 confirmed absent | 0 | 0 | 4 |
| ChatGPT (signed out) | 2 | 2 (search off / search on) | 0 | 4 |
| Perplexity (signed out) | 3 | 1 | 0 | 4 |
| Gemini (signed out) | 1 | 1 | 0 | 2 |
| Claude | **0 — NOT TESTABLE** | 0 | 0 | 0 |
| Grok | **0 — NOT TESTABLE** | 0 | 0 | 0 |
| **Total** | **28 answered** | **8** | **2** | **39** |

---

## 5. Known gaps in this universe

Recorded so they are not mistaken for tested ground:

1. **No international-lens prompt was run.** Every prompt was answered through a Pune IP. "best SEO agency for manufacturers UK" and equivalents remain **UNTESTED**, and Session 03's international gap is unchanged.
2. **No healthcare-vertical prompt was run.** Session 03 flagged healthcare as an untested rival to manufacturing; Session 04 did not close that gap either, so the two verticals still cannot be ranked against each other.
3. **No pricing, procurement or shortlist-stage prompt** ("how much should I pay an SEO agency in Pune", "questions to ask an SEO agency") was run. These are late-funnel and may behave differently.
4. **No Hindi or Marathi prompt was run**, although Google's AI Mode is documented as available in those languages in India (Session 02, S-06). Every observation is English-only.
5. **Repeats were run within a single ~40-minute window on one day.** They therefore measure *within-session* variance, not day-to-day or week-to-week drift, which is a different and larger source of variation.
6. **Class C and Class D prompts were not repeated**, so no variance figure exists for problem-led or vertical prompts on any system except the two D1 runs on AI Mode.
