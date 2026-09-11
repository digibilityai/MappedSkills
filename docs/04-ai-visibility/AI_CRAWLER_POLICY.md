# AI Crawler & Retrieval Policy Research — Session 04

**Date:** 2026-08-31
**Status:** RESEARCH FINDING. **No file was modified. `robots.txt` was NOT changed and no change is implemented here.**
**Sources:** first-party vendor documentation retrieved on 2026-08-31; full entries in `docs/02-research/SOURCE_REGISTER.md` §K.

> **Rule 19 applies with unusual force here.** Crawler documentation changes frequently. Every statement below must be re-verified at implementation time.

---

## 1. The four mechanisms, kept separate

The single most common error in this field is collapsing these. They are governed by different tokens, serve different purposes, and have different consequences.

| Mechanism | What it is | Consequence of blocking |
|---|---|---|
| **Search indexing** | Classic crawling for a search index | Removal from that search engine |
| **AI answer / search crawling** | Crawling specifically to build the corpus an AI *search* product answers from | Removal from that AI product's answers |
| **User-triggered retrieval** | A live fetch made because a specific user asked a specific question | The page cannot be read during a conversation |
| **Model-training crawling** | Collecting content that may train a foundation model | Content excluded from future training. **No effect on current retrieval** |

---

## 2. First-party documentation, verbatim

### OpenAI — `developers.openai.com/api/docs/bots`

| Token | Category | Stated purpose (verbatim) |
|---|---|---|
| `OAI-SearchBot/1.4` | **AI search crawling** | "OAI-SearchBot is used to surface websites in search results in ChatGPT's search features." |
| `GPTBot/1.4` | **Model training** | "GPTBot is used to crawl content that may be used in training our generative AI foundation models." |
| `ChatGPT-User/1.0` | **User-triggered** | "ChatGPT-User is used for certain user actions in ChatGPT and Custom GPTs". Documentation notes robots.txt rules may not apply since actions are user-initiated, and it is "not used for automatic crawling or search determination" |
| `OAI-AdsBot/1.0` | Ad-safety validation | "OAI-AdsBot is used to validate the safety of web pages submitted as ads on ChatGPT." Visits only pages submitted as advertisements |

OpenAI documents that allowing `OAI-SearchBot` is what governs appearance in ChatGPT search results, and that opt-out changes take roughly 24 hours to process.

**The decisive point: `GPTBot` and `OAI-SearchBot` are different bots with different jobs.** Blocking `GPTBot` opts out of *training* and does **not** remove a site from ChatGPT search. Blocking `OAI-SearchBot` does.

### Anthropic — `support.claude.com` article 8896518

| Name | Category | Stated purpose (verbatim) |
|---|---|---|
| `ClaudeBot` | **Model training** | "helps enhance the utility and safety of our generative AI models by collecting web content that could potentially contribute to their training" |
| `Claude-User` | **User-triggered** | "supports Claude AI users. When individuals ask questions to Claude, it may access websites using a Claude-User agent" |
| `Claude-SearchBot` | **AI search crawling** | "navigates the web to improve search result quality for users. It analyzes online content specifically to enhance the relevance and accuracy of search responses" |

### Perplexity — `docs.perplexity.ai/guides/bots`

| Token | Category | Stated purpose (verbatim) |
|---|---|---|
| `PerplexityBot` | **AI search crawling** | "designed to surface and link websites in search results on Perplexity. **It is not used to crawl content for AI foundation models.**" |
| `Perplexity-User` | **User-triggered** | "supports user actions within Perplexity… **It is not used for web crawling or to collect content for training AI foundation models.**" |

### Google

| Token | Category | Stated scope |
|---|---|---|
| `Googlebot` | **Search indexing** — and, per Google, the control that also governs AI features | "robots.txt directives for Googlebot is the control for site owners to manage access to how their sites are crawled for Search" |
| `Google-Extended` | **Training + Gemini grounding only** | Governs Gemini Apps training, Vertex AI Gemini training, grounding in Gemini Apps, and grounding with Google Search on Vertex AI. **"Google-Extended does not impact a site's inclusion in Google Search nor is it used as a ranking signal in Google Search."** It has **no separate HTTP user-agent string** — it is a robots.txt product token only |

Google's AI-features documentation states: **"There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."** Eligibility follows from being indexed and snippet-eligible. The documented preview controls are `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex` — **general** preview controls, not AI-specific ones.

**Consequence worth stating plainly: there is no documented way to opt out of AI Overviews while keeping normal Search snippets.** `nosnippet` suppresses both. This is a real trade-off, not a configuration detail.

### xAI / Grok

**UNKNOWN.** No first-party xAI crawler documentation page was located in this session. Tokens circulating in secondary sources (`GrokBot`, `xAI-Grok`, `Grok-DeepSearch`, `xAI-Bot`) are **not first-party verified** and are recorded here only as unverified. Given Grok was also **NOT TESTABLE** (`AI_ACCESS_CAPABILITY.md`), **MappedSkills has neither a crawler policy nor a visibility baseline for Grok.**

---

## 3. Comparison with production `robots.txt`

**VERIFIED FACT (live, 2026-08-31).** `https://mappedskills.com/robots.txt` returns the static `public/robots.txt` (681 bytes, `Server: LiteSpeed`, no `x-nextjs-*` headers), exactly as Session 01B established. `app/robots.ts` remains inert dead code.

Served content, checked against the tokens above:

| Token | Category | Current production state |
|---|---|---|
| `OAI-SearchBot` | ChatGPT search | **Not named.** Permitted via `User-agent: *  Allow: /` |
| `GPTBot` | OpenAI training | **Not named.** Permitted in production (blocked only in the inert `app/robots.ts`) |
| `ChatGPT-User` | user-triggered | Not named |
| `Claude-SearchBot` | Claude search | **Not named.** Permitted |
| `ClaudeBot` | Anthropic training | **Not named.** Permitted |
| `Claude-User` | user-triggered | Not named |
| `PerplexityBot` | Perplexity search | **Not named.** Permitted |
| `Perplexity-User` | user-triggered | Not named |
| `Google-Extended` | Gemini training/grounding | **Not named.** Permitted |
| `Googlebot` | Search + Google AI features | Explicitly allowed, `Crawl-delay: 0` |
| `CCBot` | Common Crawl | **Not named.** Permitted in production |

**Live verification of retrieval access.** Full server-rendered HTML was returned to requests carrying `OAI-SearchBot/1.4` and `ClaudeBot/1.0` user-agent strings — 233KB on the homepage with the `<h1>` present, 226KB on `/seo`. **Crawler access is not the reason MappedSkills is absent from unbranded AI answers.**

### Defects in the served file that are worth recording

These are pre-existing and are recorded as observations only.

1. **`Disallow: /admin/` and `Disallow: /api/` sit after a `User-agent: SemrushBot` group.** By robots.txt grammar they therefore apply **to SemrushBot only**, not globally. (Carried forward from Session 01; re-confirmed here.)
2. **`AhrefsBot` and `SemrushBot` are blocked site-wide.** These are SEO-tool crawlers, not AI crawlers, so this is unrelated to AI visibility. But it is worth noting alongside `AI_CITATION_RESEARCH.md` §1 that **Semrush Agency Partners is the most frequently cited source domain in this session's unbranded runs** — a *directory listing*, entirely separate from `SemrushBot` crawling. **These are two different things and must not be conflated.** Blocking `SemrushBot` has no bearing on whether MappedSkills could list on Semrush Agency Partners.
3. **The latent risk from Session 01B stands unchanged:** deleting `public/robots.txt` during a redesign would hand `/robots.txt` to `app/robots.ts` and silently activate a site-wide `GPTBot` and `CCBot` block — an opt-out of OpenAI training, with no code change and no review.

---

## 4. What actually matters for discoverability, and what does not

Stated as findings, not recommendations. **This session explicitly does not say "allow every AI bot".**

**Matters, on documented evidence:**
- `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot` are the tokens that govern *appearance in those products' search answers*. These are the crawler decisions with a documented visibility consequence.
- `Googlebot` access plus snippet eligibility governs AI Overviews and AI Mode. Nothing else does, per Google.

**Does not matter for current discoverability:**
- `GPTBot`, `ClaudeBot`, `Google-Extended` and `CCBot` govern **training**, not retrieval. Blocking them removes nothing from today's answers. (Whether being in training data has a long-run effect on parametric brand knowledge is a genuinely different question, and it is **UNKNOWN**. This session's one relevant observation — ChatGPT with search off did not know MappedSkills — is consistent with a small brand simply being absent from training data, but a single observation establishes nothing.)
- `llms.txt`. It does not exist on `mappedskills.com` (HTTP 404), no system tested was documented as consuming one, and Google states no new files are required. **No claim is made in either direction.**

**UNKNOWN and material:**
- Grok/xAI entirely.
- Whether allowing a search crawler *increases* the chance of being cited, as opposed to merely being a precondition. Every system tested already has full access to `mappedskills.com`, and MappedSkills appeared in **zero** of 28 unbranded runs. **Access is necessary and demonstrably not sufficient.**

---

## 5. Implications for a MappedSkills service offer

Recorded as findings for the Gate 4 synthesis, not as an approved service definition:

1. **A crawler-access audit is real, cheap, defensible technical work** — and it is the one AI-search deliverable this session found MappedSkills is already credentialed to do, since Session 01/01B produced exactly this analysis on its own site.
2. **It is also small.** It is a configuration check, not a retainer. It is a component of a technical audit, not a product.
3. **Its honest framing is "necessary, not sufficient".** Any agency selling crawler configuration as the route to AI visibility would be overselling it — and this session's own baseline is the counter-example: full crawler access, zero unbranded appearances.
4. **The training/retrieval distinction is a genuine competence differentiator.** Most market messaging collapses it. Being precise about it is defensible, correct, and cheap to demonstrate — but it is an editorial position, copyable in a week (Session 02 §5 made the same point about Google's guidance).
