# External Visual Research — APPROVED

**Session:** 12 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** APPROVED — supporting evidence for `04_CREATIVE_TERRITORIES.md` and `06_RECOMMENDED_ART_DIRECTION.md`.

---

## 0. Method, and its limits — stated before the findings

**VERIFIED FACT.** Every site below was loaded in a real browser on **2026-09-01** and observed directly. Nothing in this document is recalled, assumed, or described from memory of a site not opened in this session.

**The limits, stated at full strength:**

1. **Above-the-fold only, in most cases.** Scroll was blocked on several pages by fixed overlays and consent banners, and no consent banner was accepted or dismissed. Findings therefore describe **entry screens**, which is where category convention is most concentrated — and is also a genuine limit on how much of each site's system was seen.
2. **One viewport, one day, one location.** Desktop at 1440×900 (and one page at the pane's default), from a single network, on a single date. No mobile rendering was inspected. No responsive behaviour was tested.
3. **No performance, accessibility or code inspection was run** on any external site. No Lighthouse, no contrast measurement, no axe run. Statements about accessibility risk in this document are **INFERENCE from what was visible**, and are labelled.
4. **This is a purposive sample, not a survey.** Sites were chosen to cover category convention (competitors) and to deliberately escape it (research organisations, publications, documentation, search products, design-led work). It supports no claim about frequency, prevalence or trend.
5. **No colour value, font name, or spacing figure was measured.** Descriptions of colour and type are observational characterisations, not specifications.

**Every observation below is `VERIFIED FACT (observed 2026-09-01)` unless labelled `INFERENCE`.**

---

## 1. The reference rule, restated

A reference is evidence of a **principle**, never a template. For each: what was observed, what principle is useful, why it works, what MappedSkills should take, and **what MappedSkills must not copy.** No entry says "make MappedSkills look like this", and none is a recommendation to clone a layout, a palette, a typeface pairing, a motion style or an illustration approach.

---

## 2. Non-agency references

### 2.1 The Markup — `themarkup.org`, and `themarkup.org/show-your-work`
**Type:** non-profit investigative newsroom. **Observed:** homepage and the "Show Your Work" index.

**What was observed.** A serif editorial masthead on a warm off-white ground, one pink-red accent used for kickers and rules, hairline dividers separating sections, and documentary photography that is specific and unposed. The second page is the important one: **"Show Your Work" is a named, branded, first-class section with its own index, its own kicker label on every entry, and dated methodology articles** — "How we tested and evaluated AI-generated dance videos" (dated January 2026), "How We Investigated Car Insurance Loopholes in Michigan" (dated July 2024).

**The principle.** *Methodology can be an editorial franchise rather than an appendix.* Giving method a name, a permanent home, a recurring label and a dateline turns "here is how we know" from a defensive footnote into a body of work that accumulates.

**Why it works.** The reader does not have to trust the newsroom's conclusion in order to find the method interesting. The method is independently valuable, and publishing it repeatedly is a claim no competitor can make cheaply — it costs real work, every time.

**What MappedSkills should learn.** `/how-it-works` and `/research` are currently architected as two separate proof surfaces. This reference argues they should share **one visible standard and one recognisable label system**, so that method reads as a franchise rather than as two isolated pages. It also validates the `/research` §1 rule already approved in Session 11 — "sample, date, location and method on every measurement, in the entry itself rather than in a methodology appendix nobody opens."

**What MappedSkills must NOT copy.** The newsroom identity — the serif masthead, the pink accent, the dotted textures, the donation-funded register, and above all the *name*. "Show Your Work" is theirs. MappedSkills must find its own label from its own vocabulary, and must not adopt a journalistic voice for a commercial firm; `VOICE_AND_TONE.md` §1 already prohibits sounding academic or press-release-like.

---

### 2.2 Our World in Data — `ourworldindata.org`
**Type:** non-profit research publication. **Observed:** homepage.

**What was observed.** The hero's primary element is **a search field with example queries as placeholder text** ("Try 'Life expectancy', 'Poverty Nigeria Vietnam', 'CO2 France'…"), not a headline plus a button. Immediately beneath it, four counters: **14,085 charts · 126 topic pages · 29 data explorers · 504 articles**, followed by "All free: open access and openly licensed". Deep navy ground with a yellow display headline; below the fold, chart-led cards with dated update notices ("DATA UPDATE - YESTERDAY", "DATA UPDATE - 9 DAYS AGO").

**Two principles, and the second is the valuable one.**

1. *Search can be the primary navigation gesture on an information-rich site*, and example queries in the field teach the reader what kind of thing lives here.
2. **Numbers as inventory, not as achievement.** Every counter is a *countable fact about what exists on the site* — you could go and count the charts. None is a performance claim, none is a superlative, and none needs a caveat.

**Why it works.** Inventory counters are unfalsifiable in the good sense: they are checkable. They convey scale without asserting outcome, which is exactly the distinction MappedSkills' claims governance turns on.

**What MappedSkills should learn.** MappedSkills is prohibited from displaying performance metrics and has none to display. It is **not** prohibited from displaying countable facts about its own published work — run counts, systems tested, systems that could not be tested, prompts published, dated versions. `AI_SEARCH_LANGUAGE.md` §3 already licenses exactly these. This reference shows that such figures can carry real visual weight without becoming the metric-counter anti-pattern, *provided every one of them is a count of a thing that exists rather than a claim about a result.*

**What MappedSkills must NOT copy.** The navy-and-yellow palette; the search-first hero (MappedSkills' homepage job is proposition legibility, not retrieval — `PAGE_TYPE_CRO_RULES.md` §1); and the counter treatment as a *layout*. Also: the dated "DATA UPDATE — YESTERDAY" cadence signal is only honest for an organisation that actually updates daily. MappedSkills will have two research entries at launch and must not imply a publishing tempo it does not have.

---

### 2.3 The Pudding — `pudding.cool`
**Type:** visual-essay publication. **Observed:** homepage index.

**What was observed.** A dark index grid where **every card's image is the actual artefact from the story** — a real heat-map, a real word-flow diagram, a real annotated chart — cropped and shown on a flat colour block. Each card carries an issue number (`#224`, `#223`, `#222`) and a month-year dateline as first-class metadata, above a lowercase serif title and a one-line question.

**The principle.** *The index shows the evidence, not an illustration of the evidence.* A listing page can be made visually rich without a single decorative image, by showing the thing itself.

**Why it works.** It sets an expectation that is then met. Nothing on the card is a promise the article has to live up to, because the card *is* a fragment of the article.

**What MappedSkills should learn.** This is the direct answer to a real problem in the approved architecture: `/research` §3 requires entry cards that "surface the method metadata at a glance: date · scope or systems · sample size · version", and `/blog` and `/research` will both launch nearly empty. **The correct card image is a crop of the actual figure** — the per-system run chart, the four-cause decision tree — not a stock image, not an abstract gradient, and not an icon. Two entries shown honestly as artefacts read better than twelve shown as decorated stubs.

**What MappedSkills must NOT copy.** The playful register — the sticker-like navigation, the hand-drawn logo, the saturated flat colour blocks, the lowercase titling. MappedSkills' buyer is a founder or commercial lead evaluating a premium retainer; `VOICE_AND_TONE.md` §10 permits dry understatement and nothing warmer. Also: issue numbers imply a serialised publication cadence MappedSkills is not committing to.

---

### 2.4 ProPublica — `propublica.org` (Nerd Blog)
**Type:** non-profit investigative newsroom. **Observed:** the "Nerd Blog" section page.

**What was observed.** A very large high-contrast display serif masthead on near-black, and immediately beneath it a persistent labelled strip reading **"REPORTING ON — Dismantling USAID · Skipping Newborn Shots · Contaminated Water"**. A second-level section ("The Nerd Blog") with a plain one-line self-description: "How we make stuff."

**The principle.** *A persistent, labelled statement of what is currently being worked on is a stronger credibility signal than a claim about past results* — and it costs nothing but honesty.

**Why it works.** It is specific, current, and checkable, and it converts an organisation's attention into public information. It also makes the organisation legible to a first-time visitor in about two seconds without a single adjective.

**What MappedSkills should learn.** MappedSkills has no results to show and does have live, dated, genuine work in progress: measurements it is running, own-site defects it is fixing in public, research entries in preparation. **A dated "what we are working on and measuring now" surface is available to MappedSkills today and to almost none of its competitors** — because a competitor publishing this would be publishing its own gaps.

**What MappedSkills must NOT copy.** The near-black ground and newsroom masthead scale; the donation/public-interest register; and — critically — this device must not become a substitute for proof or a rolling "coming soon". Homepage Block 6 already prohibits "any 'results coming soon' gesture", and that prohibition binds this pattern too: it may only ever list work that is genuinely under way, with real dates.

---

### 2.5 Works in Progress — `worksinprogress.co`
**Type:** independent essay magazine. **Observed:** homepage.

**What was observed.** A clear **two-register typographic system**: the site chrome — navigation, "Topics", "Issues", the subscribe controls — is set in **monospace**, while article titles and body are set in an editorial **serif**. Commissioned collage imagery (a painted mountain landscape with photographed objects composited in), not stock and not illustration-of-a-concept. Named authorship is prominent and set as a distinct element: "Words by Alex Chalmers & Rob Wiblin". Hairline rules; muted, slightly degraded print-like palette.

**The principle.** *Two typographic registers can separate apparatus from argument*, so that a reader instantly knows whether they are reading a claim or the machinery around it — without any colour, box or icon doing that work.

**Why it works.** The mono/serif split is doing semantic labour, not decoration. It also means the apparatus can be dense without competing with the prose, because it reads as a different kind of text.

**What MappedSkills should learn.** This is the typographic mechanism that makes §4 of `01_CREATIVE_DIRECTION.md` buildable. **Argument register and apparatus register, distinct and consistent sitewide.** It also validates prominent named authorship, which `POSITIONING.md` §5 item 7 lists as one of the few trust signals MappedSkills genuinely has.

**What MappedSkills must NOT copy.** The collage image-making, the degraded print palette, the magazine "Issues" structure, and the specific serif/mono pairing. Also: monospace must be used here as a *semantic register for apparatus*, never as a "technical credibility" aesthetic — `14_DESIGN_ANTI_PATTERNS.md` bans the fake-terminal look, and heavy mono is one step from it.

---

### 2.6 Stripe Documentation — `docs.stripe.com`
**Type:** developer documentation for a payments company. **Observed:** a checkout-integration page.

**What was observed.** A synchronised **split composition**: the argument runs down the left column in short prose steps with headings, while the right column holds a persistent panel containing the **actual artefact** — real, runnable code, with a file-tab row and a language/stack switcher rendered as chips above it ("Frontend: HTML | React · Backend: Ruby | Node.js | PHP | Python | Go | .NET | Java"). A left rail carries the document's structure. Density is high and it does not feel heavy, because the two columns do different jobs.

**The principle.** *Pair the explanation with the genuine artefact, side by side, and let the reader switch the artefact's variant without losing their place in the explanation.*

**Why it works.** The artefact is real. Nothing on the right column is a mock-up of what a thing would look like — it is the thing. That is what makes the density feel like generosity rather than clutter.

**What MappedSkills should learn.** Two things. First, **paired explanation-plus-artefact is the right structure for `/how-it-works` and for the research entries** — the argument short and readable, the evidence adjacent and complete. Second, and more subtly: the variant chips show how to let a reader **switch the system being examined** — which is precisely the interaction the AI-visibility research needs, where four systems must be shown separately and must never be blended (`AI_SEARCH_LANGUAGE.md` §6).

**What MappedSkills must NOT copy.** The documentation identity — the product-brand chrome, the "Ask AI" affordance, the code-editor aesthetic. **Code and terminal styling are prohibited for MappedSkills** (`14_DESIGN_ANTI_PATTERNS.md`): MappedSkills is not a developer product, and borrowing developer chrome for a marketing site is dashboard cosplay by another route. The *structure* transfers; the *skin* absolutely does not.

---

### 2.7 Baymard Institute — `baymard.com`
**Type:** research institute selling research subscriptions and consulting. **Observed:** homepage only. *(Two attempts to open specific research articles redirected to the homepage; the article-level evidence design was therefore NOT observed and no claim is made about it.)*

**What was observed.** A restrained light-blue-grey ground, navy wordmark, a modest left-aligned hero, and a single credibility line beneath it: "Baymard's UX research is used by 29,000+ UX professionals and by 71% of all Fortune 500 ecommerce companies." Beneath the fold, a plain content-led section. The organisation names itself an *Institute* and sells to commercial buyers.

**The principle.** *A commercial firm can adopt a research-institution identity — naming, restraint, evidence-first language — and still sell.* The institute framing is a positioning device carried mostly by typography, naming and restraint rather than by visual apparatus.

**Why it works.** The buyer is asked to purchase access to a body of knowledge rather than an agency's opinion, and the identity supports that transaction.

**What MappedSkills should learn.** The *register* is available and appropriate. The restraint is right.

**What MappedSkills must NOT copy.** The single credibility line is exactly the device MappedSkills cannot use — it is an adoption/scale claim of the sort MappedSkills has no data for, and "71% of all Fortune 500" is precisely the shape of statement `VOICE_AND_TONE.md` §8.2 prohibits ("no number as a hook"). MappedSkills must also **not** call itself an institute, a lab, or anything implying a research body it has not yet become; `POSITIONING.md` §8 is explicit that a name is not a moat.

---

### 2.8 Nielsen Norman Group — `nngroup.com`
**Type:** UX research, training and consulting firm. **Observed:** homepage.

**What was observed.** A light ground with a soft lilac wash behind the hero, a plain declarative headline, and beneath it a catalogue of courses. The useful detail is at card level: **every card carries structured metadata as first-class chips** — a topic label ("Artificial Intelligence", "Research"), a format label ("Live Online", "Self-Paced"), a duration ("4 Hours"), a lesson count ("16 Lessons") and a price.

**The principle.** *Metadata-forward cards.* Where every item in a list carries the same small set of honest, comparable attributes, a reader can triage a long list quickly and the list stops needing descriptive prose.

**Why it works.** The chips are facts, uniformly applied. A reader learns the schema once and then reads the whole index at a glance.

**What MappedSkills should learn.** This is the mechanism for the `/research` and `/blog` indexes and for the capability routing on the homepage: **a fixed, honest metadata schema on every card**, applied without exception. For research: date · systems · sample · version. For articles: date · named author · type. The schema itself is the design.

**What MappedSkills must NOT copy.** The soft gradient wash behind the hero; the course-catalogue commerce pattern; the promotional bar. And note the **INFERENCE**, offered as a caution rather than a finding: several chips on that page appeared to be distinguished largely by pale tint. MappedSkills' metadata must never rely on colour alone — `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` requires shape or label as well.

---

### 2.9 Linear — `linear.app` **(reference as ANTI-EXAMPLE)**
**Type:** B2B SaaS product. **Observed:** homepage.

**What was observed.** A near-black ground. At load, the headline and subhead were rendered **blurred and semi-transparent**, resolving in as an entrance animation; the hero region below was empty dark space awaiting a product-UI panel.

**The principle it demonstrates, negatively.** *Motion that gates content is a cost paid by every visitor to benefit none of them.* For a fraction of a second to several seconds, the page's primary message is unreadable by design.

**Why this matters here specifically.** MappedSkills' homepage exists to make a proposition legible in seconds (`PAGE_TYPE_CRO_RULES.md` §1), it is written to be quoted accurately by AI systems, and its buyers are India-first on mixed mobile connections. **INFERENCE:** an entrance animation on the H1 costs comprehension, perceived performance and Core Web Vitals — all three of which are named quality areas in `CLAUDE.md`.

**What MappedSkills should learn.** The dark, high-gloss, product-UI-hero convention is the single most recognisable "serious tech company" signal available in 2026 — and adopting it would (a) put MappedSkills in the SaaS category it is not in, and (b) require a product screenshot it does not have.

**What MappedSkills must NOT copy.** All of it: the near-black ground as a credibility device, the blur-in entrance, and the product-UI hero.

---

### 2.10 Perplexity — `perplexity.ai` **(reference as CATEGORY-CONVENTION EVIDENCE)**
**Type:** AI search product. **Observed:** signed-out landing state.

**What was observed.** A dark application shell with a left sidebar, a centred prompt field under the line "What do you want to know?", a teal accent on the primary suggestion tile, and model/mode controls beneath the input.

**The principle it establishes.** *This is what "AI search" currently looks like as a visual category* — dark app chrome, a prompt field, a cool accent, conversational framing.

**What MappedSkills should learn.** Only this: **it is a product identity, and MappedSkills is not that product.** `AI_SEARCH_LANGUAGE.md` §7 restricts AI search to one clause on the homepage and one commercial page; a visual language borrowed from an AI product would over-weight it instantly and would violate the approved subordination rule regardless of what the copy says.

**What MappedSkills must NOT copy.** The prompt field as a hero device, the dark app shell, the teal/violet AI accent, and any chat-shaped UI. The session brief §17 prohibits fake chatbot UI outright, and this is the exact aesthetic it names.

---

### 2.11 Kagi — `kagi.com`
**Type:** paid search engine. **Observed:** homepage.

**What was observed.** Dark ground, centred display type, a single pill CTA, then a section of large rounded cards in saturated pastel with soft organic blob textures.

**The principle.** Limited. **INFERENCE:** a genuinely differentiated product can still arrive at a fully generic entry screen — centred hero, one pill, pastel rounded cards — because those are the defaults of the current toolchain, not decisions.

**What MappedSkills should learn.** The negative lesson is the useful one: **defaults produce category membership.** MappedSkills' existing codebase is a shadcn/ui installation with unmodified neutral tokens and the Geist family (see `03_COMPETITOR_VISUAL_PATTERNS.md` §5); left alone, it will produce this. Escaping it requires deliberate decisions at the token and composition level, not a colour change.

**What MappedSkills must NOT copy.** The pastel blob cards, the centred pill hero, the dark ground.

---

## 3. What the reference set says collectively

Four findings, drawn from the observations above rather than asserted:

1. **The sites that carry evidence well are publications and research organisations, not commercial vendors.** Every genuinely useful evidence-design principle in this document came from The Markup, Our World in Data, The Pudding, ProPublica or Works in Progress. None came from a competitor. That is itself the argument for looking outside the category.

2. **The two strongest transferable mechanisms are structural, not stylistic** — the two-register typographic split (Works in Progress) and paired explanation-plus-real-artefact (Stripe Docs). Neither depends on a colour, a font or an illustration style, which is why both survive translation.

3. **Numbers can be honest at scale if they count things rather than claim outcomes** (Our World in Data). This is the only observed route to visual confidence that MappedSkills' claims governance actually permits.

4. **Dark grounds, centred heroes and pill CTAs are the current default, not a choice** — observed on Linear, Profound, Perplexity and Kagi, four companies with nothing else in common. **INFERENCE:** adopting them would be a decision to look like everything else, taken by omission.

---

## 4. Source register

| # | Site | Organisation type | Pages observed | Date observed | Role in this direction |
|---|---|---|---|---|---|
| R-01 | `themarkup.org` + `/show-your-work` | Non-profit newsroom | Homepage, section index | 2026-09-01 | Method as a named franchise |
| R-02 | `ourworldindata.org` | Research publication | Homepage | 2026-09-01 | Numbers as inventory; search as navigation |
| R-03 | `pudding.cool` | Visual-essay publication | Homepage index | 2026-09-01 | Index shows the artefact |
| R-04 | `propublica.org/nerds` | Non-profit newsroom | Section page | 2026-09-01 | Current-work strip as credibility |
| R-05 | `worksinprogress.co` | Essay magazine | Homepage | 2026-09-01 | Two typographic registers; named authorship |
| R-06 | `docs.stripe.com` | Product documentation | Integration page | 2026-09-01 | Paired explanation + real artefact; variant switching |
| R-07 | `baymard.com` | Research institute / consultancy | Homepage only | 2026-09-01 | Institute register for a commercial firm |
| R-08 | `nngroup.com` | Research / training firm | Homepage | 2026-09-01 | Metadata-forward cards |
| R-09 | `linear.app` | B2B SaaS | Homepage | 2026-09-01 | **Anti-example** — motion gating content; dark product hero |
| R-10 | `perplexity.ai` | AI search product | Signed-out landing | 2026-09-01 | **Category convention** — what AI search looks like |
| R-11 | `kagi.com` | Search product | Homepage | 2026-09-01 | **Anti-example** — toolchain defaults produce category membership |

Competitor sites observed in the same session are registered separately in `03_COMPETITOR_VISUAL_PATTERNS.md` §6.

**No claim in this document depends on any site not listed above.** Where a well-known pattern would have supported an argument but was not directly observed in this session, it was left out.
