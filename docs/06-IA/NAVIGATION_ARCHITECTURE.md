# Navigation Architecture — PROPOSED

**Session:** 07 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 5 open.

**No final navigation labels are approved.** Labels below are **functional descriptions** indicating what each item must communicate. Final wording belongs to the messaging phase; labels must use buyer comprehension, not internal capability taxonomy.

---

## 1. Principles

1. **Six primary items maximum.** The site has 22 indexable pages (24 if the manufacturing gate clears); exposing the taxonomy would be disproportionate.
2. **No mega-menu.** One dropdown, five children — six if the manufacturing gate clears. A mega-menu is justified by breadth this site does not have and should not acquire.
3. **Every dropdown parent is itself a link.** The current "Services" trigger is a button, not a link — which is why `/services`, the site's most schema-rich page, is **unreachable from the primary navigation today**.
4. **Navigation reflects buyer comprehension.** Not "AI + Search Visibility", not "GEO/AEO", not "CRO", not "RevOps".
5. **Navigation is not a sitemap.** The footer carries completeness; the header carries the decision path.
6. **Nothing enters the navigation before it is real.** `/work` stays out until a case study exists; `/research` enters only because it launches with two genuine entries.

---

## 2. Primary navigation (6 items + CTA)

| # | Functional label | Destination | Children | Why it earns a slot |
|---|---|---|---|---|
| 1 | **What we do** | `/services` | Dropdown, 6 items | The core proposition. Must be a **link**, not only a trigger |
| 2 | **How it works** | `/how-it-works` | — | The published methodology, including what cannot be attributed. **The highest-value proof asset available today** and unclaimed by every competitor examined |
| 3 | **Evidence** | `/research` | — | Where proof accumulates. Launches with two genuine entries; becomes the home of case studies when they exist |
| 4 | **Pricing** | `/pricing` | — | Retained from current navigation. Price transparency is an under-served query family and a trust signal in a price-aware market |
| 5 | **Insights** | `/blog` | — | Editorial stream. Retained from current navigation |
| 6 | **About** | `/about` | — | **Newly promoted from footer-only.** The entity anchor: MappedSkills has working branded retrieval and zero unbranded discovery, and branded AI answers are assembled largely from first-party sources — this is the page they read |

### "What we do" dropdown (5 children, 6 if the manufacturing gate clears)

| Child | Destination | Note |
|---|---|---|
| Overview — the enquiry system | `/services` | The parent, repeated as an explicit first child so the hub is reachable by click |
| Search / SEO | `/seo` | |
| AI search | `/ai-seo` | Buyer-facing phrasing. **Never "GEO", "AEO" or "LLMO"** |
| Turning traffic into enquiries | `/conversion-optimization` | **Never "CRO"** — the acronym resolves to pharmaceutical Contract Research Organisations in India |
| Paid demand | `/google-ads` | Single entry point; `/lead-generation` and `/social-media-ads` are reached from `/services` and from `/google-ads`, not from the header |
| Manufacturing & industrial B2B | `/industries/manufacturing` | **CONDITIONAL — appears only if the manufacturing validation gate clears before content freeze.** The beachhead is candidate #1, not an approved specialisation. **One item, never an "Industries" submenu.** The dropdown must render correctly with five children, so this item's presence is a config flag rather than a layout change |

### CTA button

A persistent button driving the **primary conversion — qualified enquiry creation**, separate from the six navigation items.

**Mechanism-independent.** The conversion may be completed through the form surface (`/contact`) or the booking surface (`/schedule-call`); which surface the header CTA leads to is a CRO-phase decision, not a navigation-architecture decision. **Model-agnostic** too — the label must be changeable when the free/paid/hybrid entry decision is made (`OFFER_ARCHITECTURE.md` §2) without altering the navigation structure.

### Deliberately NOT in the primary navigation

| Excluded | Why |
|---|---|
| **Case studies / `/work`** | Zero case studies exist. A navigation item leading to an empty hub is a credibility exposure against an already-premium displayed price. **Enters navigation the day the first permissioned case study publishes** — no redesign required |
| `/lead-generation`, `/social-media-ads` | Reachable from `/services` and the footer. Off company positioning; a header slot would overweight them |
| `/problems/traffic-but-no-enquiries` | A search-entry page, not a browse-path page. It is reached from search, from `/conversion-optimization` and from articles. **Adding a "Problems" menu would advertise a family with one member** |
| A "Proof" or "Evidence" **gate** | "Evidence" exists as a navigation destination, but **proof is never a required step between a commercial page and the conversion.** Navigation offers it; the visitor's intent decides whether to take it |
| `/faq` | Footer. Late-stage and long-tail |
| `/contact` | Utility navigation + CTA, not a primary item |

---

## 3. Secondary / utility navigation

Small, visually subordinate to the primary set.

| Item | Destination | Note |
|---|---|---|
| **Contact** | `/contact` | Kept out of the primary six so the CTA is the unambiguous conversion path, but always visible |
| Phone / WhatsApp | `tel:` / WhatsApp | Real, direct contact. A meaningful conversion path for the beachhead segment |

**Not in utility navigation:** language or region switchers (India-first; no i18n exists and none should be added), a client login (none exists), or a search box (**and `WebSite` schema must not declare a `SearchAction` unless a real site search is built**).

---

## 4. Footer architecture

The footer carries completeness. Four columns plus an entity block.

| Column | Contents |
|---|---|
| **What we do** | `/services` · `/seo` · `/ai-seo` · `/conversion-optimization` · `/google-ads` · `/lead-generation` · `/social-media-ads` · `/industries/manufacturing` *(conditional — omitted if the gate does not clear)* |
| **Evidence & method** | `/how-it-works` · `/research` · `/work` *(added only when populated and indexable)* · `/about` |
| **Learn** | `/blog` · `/problems/traffic-but-no-enquiries` · `/faq` · `/pricing` |
| **Company & legal** | `/contact` · `/schedule-call` · `/privacy-policy` · `/terms` |
| **Entity block** | Full NAP — legal name, complete postal address, phone, email — plus real social profiles |

### Footer requirements
- **The entity block is not decoration.** It is a primary local and AI-discovery signal. **The current entity declaration's `postalCode` field contains the word "India"** — a verified defect that must be fixed here and in schema simultaneously.
- **No link farm.** The footer lists real destinations only. No keyword-stuffed city lists, no service permutations, no "SEO company in [city]" grids.
- **Social profiles must be real and current.** Three are currently hard-coded; verify each before launch.
- `/thank-you` and `/launch-checklist` never appear in navigation.

---

## 5. Supporting navigation systems

| System | Requirement |
|---|---|
| **Breadcrumbs** | **Add a visible breadcrumb UI.** `BreadcrumbList` schema is currently emitted on 11 routes with **no visible breadcrumb anywhere on the site**, and an unused `components/ui/breadcrumb.tsx` primitive already exists. Structured data should describe the page, not assert navigation the page lacks |
| **In-page contextual links** | Existing `RelatedPosts`, `RelatedServices`, `CTABlock`, `StickySidebarCTA` and `TableOfContents` components are retained and retargeted to the new architecture |
| **Pagination** | Required on `/blog` before the editorial stream scales — the Contentful query ceiling is 100 items and silently truncates the index, `generateStaticParams` and the sitemap together. An unused `components/ui/pagination.tsx` exists |
| **Category filtering** | `?category=` currently produces no crawlable hub URL. **Either give categories real paths (PHASE 2) or leave filtering non-indexable. Do not build both** |
| **404 recovery** | Recovery links must be **generated from live routes**. The current 404 page hard-codes three blog slugs that all return 404 |
| **Link styling** | `app/globals.css` applies the brand accent colour and `hover:underline` to **every** `<a>` globally, including navigation and footer. Link affordance is currently styling-driven rather than semantic — a design-phase item, recorded here because it affects navigation legibility and accessibility |

---

## 6. Changes from the current navigation

| Change | Reason |
|---|---|
| `/services` becomes reachable from the header | It is currently unreachable from the primary navigation despite being the most schema-rich page on the site |
| `/about` promoted from footer-only into the primary navigation | Entity authority. Branded AI answers are built from first-party sources |
| `/work` ("Case Studies") **removed** from the primary navigation | Zero case studies exist. Returns when the first one publishes |
| `/how-it-works` retained but repositioned | Becomes the published methodology rather than a process overview |
| Services dropdown: paid pages reduced from three header entries to one | Paid media is retained as a capability but removed from company positioning |
| `/ai-seo` added to the dropdown; `/industries/manufacturing` added **conditionally** | The two new commercial pages. The vertical item appears only if its validation gate clears |
| **"Evidence" added as a primary item** | The proof deficit is the binding business constraint; the architecture must give proof a permanent, visible home |
