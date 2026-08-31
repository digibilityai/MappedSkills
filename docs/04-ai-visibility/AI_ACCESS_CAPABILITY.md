# AI Access Capability Audit — Session 04

**Date:** 2026-08-31
**Branch:** `test_branch`
**Status:** RESEARCH RECORD. Nothing here is an approved decision.
**Purpose:** establish, **before** any brand testing, which AI-assisted discovery systems could legitimately be tested in this session and which could not.

---

## 0. Session environment (VERIFIED FACT)

| Property | Value | How established |
|---|---|---|
| Network egress | Pune, Maharashtra, IN — AS55836 Reliance Jio Infocomm | `https://ipinfo.io/json`, 2026-08-31 |
| Date/time of testing | 2026-08-31, ~09:50–10:30 UTC (15:20–16:00 IST) | session clock |
| Browser | Automated Chromium in the Claude Code browser pane | — |
| Authentication | **Signed out of every AI system tested.** No account was created, no credential was entered, no existing session was reused | direct observation of "Sign in" state on each surface |
| Consent banners | One cookie banner encountered (grok.com). "Reject All" was chosen (privacy-preserving default). No terms were accepted anywhere | direct observation |

The egress location is **the same Pune/Jio lens as Session 03**, so Session 03 and Session 04 observations are directly comparable. It also means **every result in this session is India- and Pune-localised.** No international vantage point was available, and Session 03's international gap is **not** closed by this session.

---

## 1. Access capability table

| System | Directly testable? | Method | Authentication state | Location / personalisation | Citation visibility | Repeatability | Limitations |
|---|---|---|---|---|---|---|---|
| **Google AI Mode** | **DIRECTLY TESTABLE** | `https://www.google.com/search?q=…&udm=50&hl=en&gl=in` in a real browser; answer text from `body.innerText`, source hosts parsed from rendered HTML | Signed out | IP-localised to Pune; no account personalisation | **Source hostnames recoverable** from the rendered document. Inline anchor `href`s are **not** exposed, so exact cited URLs were not captured — only domains | **Good.** Repeat navigations return regenerated answers | Domain-level citation only. Signed-out tier; a signed-in user may get a different model or personalisation |
| **Google AI Overviews** | **DIRECTLY TESTABLE** | Classic SERP `…&hl=en&gl=in`; presence detected by the "AI Overview" heading, absence distinguished from the "not available" fallback | Signed out | IP-localised to Pune | Attribution labels rendered (publisher names); domains recoverable | Good | **Session 03 could not observe these at all.** This session could. One observation per query |
| **ChatGPT** | **DIRECTLY TESTABLE (signed-out tier)** | `https://chatgpt.com/`, prompt submitted into the public logged-out composer; **"Web search" tool explicitly enabled** where search behaviour was being tested | Signed out. "Create image", "Deep research" and "Add files" were login-gated; **"Web search" was not** | IP-localised | **Yes** — inline source attributions and domains recoverable | Moderate — slower; a fresh page load per prompt | Model tier is undisclosed and is **not** necessarily what a paying ChatGPT user gets. Memory/personalisation absent. **This is "ChatGPT with web search", which is the relevant surface, but it is not a paid ChatGPT Search account** |
| **Perplexity** | **PARTIALLY TESTABLE** | `https://www.perplexity.ai/search/new?q=…`; sources revealed by activating the "N sources" control | Signed out | IP-localised | **Yes, and best-in-class** — the full cited source list is recoverable as domains | Moderate | Signed-out answers were **markedly shorter** than Perplexity's known signed-in output (one run returned three bare names). This is a **reduced tier**; findings understate what a real user sees |
| **Gemini** | **PARTIALLY TESTABLE** | `https://gemini.google.com/app`; text recoverable only via `textContent` (the answer is not exposed through `innerText` under automation) | Signed out | IP-localised | **NONE.** The signed-out surface exposed **no source links or attributions at all** | Moderate | Runs on **"3.5 Flash-Lite"**, an explicitly reduced signed-out tier. A signed-in Gemini user is served a different model. **Citation research is impossible on this surface** |
| **Claude** | **NOT TESTABLE IN THIS SESSION** | `https://claude.ai/new` redirects to `/login` | Login required | n/a | n/a | n/a | Requires an account. Creating accounts and entering credentials is out of scope. **No substitute was used** |
| **Grok** | **NOT TESTABLE IN THIS SESSION** | `https://grok.com/` accepts a first message into the composer, then replaces the answer area with "Continue your conversation — Sign up to continue seamlessly" | Sign-up gate on first message | n/a | n/a | n/a | **No answer was ever returned.** Account creation is out of scope. **No substitute was used** |

---

## 2. Explicit non-substitution record

Per the session brief, the following substitutions were **not** made and must not be inferred from any Session 04 artifact:

- Google Search results were **not** treated as ChatGPT, Gemini, Claude or Grok results.
- Google AI Mode was **not** treated as evidence about Gemini, and vice versa — they are recorded as two separate surfaces even though both are Google products.
- Google AI Overviews were **not** treated as the same surface as Google AI Mode. They behave differently (see `AI_VISIBILITY_BASELINE.md` §5) and are recorded separately.
- **Claude was not tested.** This Claude Code session's own model is *not* recorded as a proxy for the claude.ai product: this session has the MappedSkills repository in its context, so it could not produce an uncontaminated parametric-knowledge observation, and in any case an agentic coding session is not the consumer surface a buyer would use.
- **Grok was not tested.** No third-party "Grok says…" reporting was used as a stand-in.
- No authentication, anti-bot control, rate limit or platform restriction was bypassed at any point.

---

## 3. One access event worth recording

**VERIFIED FACT.** While attempting a Google search-operator query (`"MappedSkills" -site:mappedskills.com`) the session received Google's unusual-traffic interstitial ("Our systems have detected unusual traffic from your computer network"). **The bot check was not solved or bypassed.** Search-operator queries were abandoned from that point, and off-site footprint work was completed instead through the WebSearch tool (US lens) and direct URL retrieval.

Consequence: **no exhaustive count of off-site MappedSkills mentions was obtainable**, and none is asserted anywhere in Session 04.

---

## 4. What this capability profile means for the research

Four systems produced usable answers; two did not. That is enough to answer the session's primary questions, with three important qualifications:

1. **Two of the four testable systems are Google's.** Google AI Mode and Google AI Overviews are the highest-confidence evidence in this session. ChatGPT and Perplexity are single-tier observations. Gemini contributes **mention** data only, never **citation** data.
2. **Every system was tested at its lowest, signed-out tier.** Where an agency's real buyer is a signed-in user on a paid plan, this session **understates answer quality and may understate or overstate brand selection**. Direction of the bias is **UNKNOWN**.
3. **Two named systems in the charter — Claude and Grok — have no baseline at all.** Any MappedSkills service claiming to measure "visibility across ChatGPT, Gemini, Claude, Perplexity and Grok" would, on this session's evidence, require paid tooling or paid accounts for at least two of those five. That is a **commercial input**, recorded in `AI_TOOLING_LANDSCAPE.md`.

---

## 5. Reproduction notes

Anyone repeating this audit should record: egress geolocation, signed-in state, the exact surface URL (including `udm=50` for AI Mode), the date and time, and whether a tool such as "Web search" was explicitly enabled. Without those five facts an AI-visibility observation is not reproducible and should not be quoted.
