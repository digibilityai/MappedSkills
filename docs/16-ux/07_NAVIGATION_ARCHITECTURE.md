# Navigation UX Architecture — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `docs/06-IA/NAVIGATION_ARCHITECTURE.md` (approved, `DEC-010`) — **the approved item set, destinations and exclusions are not changed here.** This document adds **behaviour**: interaction, state, keyboard, mobile semantics, breadcrumbs, sticky policy and recovery.

**No final navigation labels are decided here.** Labels in the approved IA are functional descriptions; final wording belongs to the messaging layer.

---

## 1. The approved structure, carried unchanged

| Slot | Destination | Children |
|---|---|---|
| 1 — What we do | `/services` | Dropdown, 5 items (**6 if the manufacturing gate clears**) |
| 2 — How it works | `/how-it-works` | — |
| 3 — Evidence | `/research` | — |
| 4 — Pricing | `/pricing` | — |
| 5 — Insights | `/blog` | — |
| 6 — About | `/about` | — |
| CTA | The primary conversion | Separate from the six |
| Utility | `/contact` · phone / WhatsApp | Visually subordinate, always visible |

**Six primary items maximum. No mega-menu. Every dropdown parent is itself a link.**

**Deliberately excluded, and not reopened:** `/work` (until a permissioned case study exists) · `/lead-generation`, `/social-media-ads` · `/problems/*` · `/faq` · a proof gate of any kind · a search box · a language or region switcher · a client login.

**No conflict with the approved IA was found in this session.** Nothing below changes a route, an item, a destination or an exclusion.

---

## 2. The one structural defect this must fix

**VERIFIED FACT (Session 01):** the current header's "Services" trigger is a **button, not a link**, so `/services` — the site's most schema-rich page — is **unreachable from the primary navigation, including by keyboard**.

**The fix is a behaviour requirement, not a layout one:**

> **The parent is a link. The disclosure is a separate control.**

| Element | Behaviour |
|---|---|
| **Parent** | A real link to `/services`. Activating it navigates. It is reachable by keyboard as a link |
| **Disclosure** | A separate, adjacent control that opens the child list. It carries `aria-expanded` and a name that says what it opens |
| **First child** | `/services` repeated explicitly as "Overview", so the hub is reachable by click from inside the menu as well as from the parent |

**Why a separate control rather than a link that also opens on focus:** a link that opens a menu on focus traps keyboard users who wanted to navigate, and a link that only navigates hides the children from touch users. Two controls, two jobs, no ambiguity. **This is a behaviour decision the design phase must not collapse back into one element.**

---

## 3. Dropdown behaviour

| Aspect | Requirement |
|---|---|
| **Open trigger** | Click or tap on the disclosure; `Enter`/`Space` when focused. **Hover may open it on pointer devices as an enhancement — hover is never the only way** (§3.4 of the approved responsive principles) |
| **Close** | `Escape` closes and returns focus to the disclosure · click outside · navigating away |
| **Keyboard** | Arrow keys move within the list; `Tab` leaves it; focus is never trapped |
| **Focus visibility** | Visible, distinctive, consistent, never removed, never the low-contrast browser default |
| **Delay** | If hover-open is implemented, a short intent delay so a diagonal mouse path does not open and close it. **No animation that delays reaching a child** |
| **Conditional child** | `/industries/manufacturing` renders from a config flag. **The dropdown must render correctly with five children** — its presence is a flag, not a layout change |
| **Current page** | The item matching the current page is indicated **and not by colour alone** |

**Prohibited:** a mega-menu · a second level of nesting · promotional content, imagery or a CTA inside the menu · a menu that requires hover to stay open while the pointer crosses a gap.

---

## 4. Sticky navigation — decision

> **APPROVED 2026-09-02 (H3): NON-STICKY IS THE DEFAULT.** Option B below is adopted.
> **One permitted experiment:** a restrained compact sticky navigation **may be tested during low-fidelity wireframe validation, on genuinely long commercial pages only**, if it improves orientation. It is bound by six constraints in `21_ORCHESTRATOR_DECISIONS_H1_H5.md` §H3 — the decisive one being that **it carries no CTA**, because a sticky control carrying the primary CTA is the persistent sales control H2 prohibits. **An inconclusive experiment does not promote itself; the default stands.**

> **Recommendation: the header does not stick on any page. Sticky conversion elements exist only where the approved CRO rules permit them, below the fold.**

**The problem this resolves.** `CTA_SYSTEM.md` §3 requires "one persistent PRIMARY control sitewide" in the header. B16 and `PAGE_TYPE_CRO_RULES.md` §§5–7 **prohibit a sticky CTA on `/how-it-works`, `/research`, `/research/*`, `/blog` and `/blog/*`**. A fixed header carrying the primary CTA would place a persistent sales prompt over exactly those pages — including the page that publishes the firm's own measured zero.

**Two ways to resolve it were considered.**

| Option | Assessment |
|---|---|
| **A — Header sticks on permitted page types, does not stick on the five restricted ones** | Honours both rules, but produces navigation chrome that behaves differently on different pages. Inconsistent chrome is its own usability cost, and the inconsistency is invisible until the reader notices it |
| **B — Header never sticks; sticky conversion elements appear only where permitted, below the fold** *(recommended)* | One consistent header sitewide. "Persistent" is satisfied by presence on every page, which is what the approved rule requires. Better for reading, better for small viewports, better for performance, and it removes an entire class of overlap defects |

**Consequence of B, stated plainly:** on a long page the header scrolls away, and a reader who wants to navigate scrolls back up. That is ordinary behaviour and the approved architecture already provides the alternative — a conversion route at the end of every page and, where permitted, a quiet sticky element below the fold.

### 4.1 The related tension — RESOLVED 2026-09-02 (H4)

> **B16 takes precedence over R7. Direct contact is available, not omnipresent.**
> Direct contact must be easy to find where commercially relevant — **`/contact`, `/schedule-call`, and mobile contact surfaces** — but must not become a persistent floating contact strip, a repeated CTA on every section, a second competing navigation system, or a high-pressure conversion device.
> **Operative rule: one instance per page outside the two conversion surfaces.** Full table in `21` §H4.
> The original analysis is preserved below as the decision trail.

`16` §5 R7 requires phone and WhatsApp **"persistent and at equal weight to the form, sitewide."** Under option B there is no fixed element on the five restricted page types, so nothing is literally fixed to the viewport there.

**Proposed reading, requiring approval:** *persistent* means **consistently present, at consistent weight, wherever contact is offered** — header utility, every contact region, and the footer — **not** a fixed overlay on every page. **B16 is a HARD ban and takes precedence over an interpretation of R7.**

**If the orchestrator reads R7 as requiring a fixed overlay sitewide, then B16 and R7 are in genuine conflict on five page types, and that conflict needs a recorded decision rather than a designer's judgement.**

---

## 5. Mobile navigation — semantics, not just layout

**Mobile navigation is semantically the same navigation.** Same six items, same dropdown children, same utility, same CTA. Nothing is removed because it is difficult to fit.

| Aspect | Requirement |
|---|---|
| **Disclosure** | A single menu control with `aria-expanded` and a state-dependent accessible name |
| **Panel** | Opens in place. **Not a modal**, and never an overlay the reader cannot escape. `Escape` and an explicit close control both work; focus returns to the trigger |
| **Focus** | Focus moves into the panel on open and is contained while it is open — this is the one permitted focus containment on the site, and it must be escapable |
| **The dropdown parent** | Still a link **and** still separately expandable. The same two-control rule applies |
| **Order** | Six primary items → utility (contact, phone, WhatsApp) → CTA. **The CTA is last in the panel and first in visual priority in the header bar** |
| **Background** | The page beneath does not scroll while the panel is open |
| **Touch targets** | Comfortably above minimum, with real spacing between adjacent targets |

**Prohibited:** a bottom tab bar (this is a website, not an app shell) · gesture-only access to any destination · a hamburger that opens a full-screen takeover with no visible close · nav items hidden behind a "more" affordance.

---

## 6. Breadcrumbs

**Required, and currently absent.** `BreadcrumbList` schema is emitted on 11 routes with **no visible breadcrumb anywhere on the site**. Structured data must describe the page, not assert navigation the page lacks.

| Route family | Breadcrumb | Trail |
|---|---|---|
| `/` | **None** | — |
| `/services` | **None** | Top level |
| Capability pages | **Yes** | Home → What we do → *page* |
| `/problems/{slug}` | **Yes** | Home → Problems → *page* |
| `/industries/{slug}` *(conditional)* | **Yes** | Home → Industries → *page* |
| `/research`, `/blog`, `/pricing`, `/about`, `/how-it-works` | **None** | Top level |
| `/research/{slug}`, `/blog/{slug}` | **Yes** | Home → Evidence / Insights → *entry* |
| `/contact`, `/schedule-call`, `/thank-you`, legal, 404 | **None** | Utility |

**Three binding rules:**

1. **The visible breadcrumb and the emitted `BreadcrumbList` are generated from one source.** Two sources drift, and a mismatch between visible navigation and structured data is the defect this fix exists to remove.
2. **A breadcrumb may express a hierarchy the URL does not have.** `/seo` is flat by deliberate IA decision; `Home → What we do → Search` is the correct trail and is what the schema already describes.
3. **A breadcrumb segment that is not a real page is not a link.** `Problems` and `Industries` have no hub at launch — `/industries` 404s by design. Those segments render as **text, not links**.

**Prohibited:** a breadcrumb on the homepage · a breadcrumb used as a substitute for the header · a breadcrumb whose last item is a link to itself · a breadcrumb carrying a keyword phrase rather than the page's name.

---

## 7. Contextual and in-page navigation

| System | Requirement |
|---|---|
| **Sub-navigation within a page** | **Only on `/how-it-works` and long research entries** — the two genuinely long documents. A table of contents, static, in the reading order, not a floating overlay. **Not on commercial pages**, which are not long enough to need one |
| **Related content** | Articles link within their cluster only. Research entries carry at most one or two contextual commercial links in a whole entry |
| **Up-links** | Every capability page links up to `/services`; every article and research entry links up to its index |
| **Return path from proof pages** | **Required.** `/how-it-works` and research entries carry a contextual route back to the commercial decision — the specific page or capability where it is known, `/services` where it is not. Journey G depends on it |
| **Cross-surface links** | `/contact` ↔ `/schedule-call`, and nothing else outbound from either |

---

## 8. Footer

**Four columns plus an entity block**, per the approved IA. The UX additions:

| Requirement | Detail |
|---|---|
| **The entity block is content, not decoration** | Full NAP — legal name, complete postal address, phone, email — plus real, verified social profiles. It is a primary local and AI-discovery signal |
| **Consistency** | The entity facts are **byte-identical** to `/about`, `/contact` and the structured data. One source |
| **Conditional item** | `/industries/manufacturing` appears in the footer only if the gate clears, and **must be removable in a single change** |
| **`/work`** | Absent until it is populated and indexable |
| **`/thank-you`, `/launch-checklist`** | Never appear |
| **Link affordance** | Footer links are distinguishable **without relying on colour**. The current global rule colours every `<a>` brand red with underline on hover only, which is a colour-only distinction |
| **No link farm** | Real destinations only. No keyword-stuffed city lists, no service permutations |

---

## 9. 404 and recovery

| Requirement | Detail |
|---|---|
| **Recovery links generated from live routes** | **VERIFIED FACT:** the current 404 hard-codes three blog slugs that all return 404. A recovery page that links to 404s is worse than no recovery page |
| **What it offers** | The primary navigation, `/services`, the problem page, and the two conversion surfaces. **Nothing more** |
| **What it does not do** | No search box (there is no site search) · no conversion push · no humour at the visitor's expense · no automatic redirect |
| **`/industries`** | Resolves to 404 at launch by design, with one child and no hub. **An accepted, recorded condition, not a defect** |

---

## 10. Navigation states and feedback

| State | Requirement |
|---|---|
| **Current page** | Indicated in the header, **not by colour alone** — and for the dropdown, the parent indicates when a child is current |
| **Focus** | Visible on every navigable element, in one consistent treatment, never removed |
| **Hover** | Supplementary only. Nothing is reachable only by hover |
| **Loading** | Navigation feels like turning a page. **No page-transition animation** — it is a delay on every navigation for readers who are evaluating and comparing |
| **JavaScript off** | Every destination in the header, dropdown, utility and footer remains reachable. The dropdown's children must be reachable without script — either always rendered, or reachable via the parent page, which is why the parent must be a link |

---

## 11. What this document does not decide

Header height, position, composition or appearance · the CTA's label · type, colour, spacing or breakpoint values · the dropdown's visual form · the mobile panel's presentation · icon usage · logo treatment. Those belong to Gate 10.
