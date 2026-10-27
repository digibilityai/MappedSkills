# Navigation and User Journeys

27 October 2026. Read-only. Header, mobile menu and footer were exercised in a headless browser against the dev server on `:3412` (this worktree). The navigation inspected is the **uncommitted** version in the working tree; the live site still serves the committed version without a Who We Help dropdown. Nothing was implemented.

## 1. What exists today

### Header, desktop (browser-tested, 1440 px)

`Logo (/)` · **Services** (panel: Google Ads, Meta Ads, All services, "Understand Our Pricing Approach") · **Who We Help** (panel: D2C brands, Education, Real estate, "See how we help each business" → `/#who-we-help`) · Our Work · How We Work · About · primary CTA **Discuss Your Advertising** (`/contact`).

Behaviour observed: hover opens the Who We Help panel and `aria-expanded` becomes true; Escape closes it and returns `aria-expanded` to false; Arrow Down from the Services button opens its panel. Active state: the Services and Who We Help buttons carry `data-current` on their routes (code-inspected; no audience route was current on the Enquiry-Led preview, as expected).

### Mobile and tablet menu (browser-tested, touch emulation at 320, 390 and 768 px)

Menu button works at all three widths; Who We Help expands to the same three links plus the overview link, each 44 px tall; Our Work, How We Work and About are 56 to 60 px; **Discuss Your Advertising** (54 px) and **Request a call** (44 px) are inside the open menu; Escape closes it. The header CTA is hidden below 600 px by design and appears at 768 px.

### Footer (browser-tested)

Services: All services, Google Ads, Meta Ads. Company: How it works, Case studies, Pricing, About, FAQ. Insights: Blog, Research, Press. Email, **Discuss Your Advertising**, Privacy Policy, Terms, three social links. **There is no Who We Help group and no link to any audience page.**

## 2. Gaps and duplication

| # | Finding | Evidence | Severity |
|---|---|---|---|
| N1 | No destination for the fourth audience | Dropdown, footer and homepage show three audiences | P1-06 |
| N2 | Homepage third card is labelled "Real estate developers" but carries `id="enquiry-led"` | `components/paid-advertising/home/content.ts` line 13, used by R3 | P1-06 |
| N3 | Retained service pages unlinked from global chrome | Live HTML; header and footer list only Google Ads, Meta Ads and the hub | P1-07 |
| N4 | Audience labels shorter than page names | Dropdown "Real estate", "Education" vs page "Property developers and Channel Partners", "Education and Training" | P2-02 |
| N5 | Duplicate links to the same page are normal here | Pricing appears in Services panel, footer and body; Contact in header, hero, close and footer. These help users and are not removal candidates | none |
| N6 | `/who-we-help` is intentionally absent | `DEC-081`; the overview link goes to the homepage section | Deferred |
| N7 | No broken links found | Every internal `href` on the seven previews and in the header and footer was extracted; every target matches an existing route folder, a live sitemap URL or the intended new route (targets were checked against the route list, not each fetched individually). The Enquiry-Led preview links to `/lead-generation`, `/pricing`, `/google-ads`, `/social-media-ads` and the three audience pages | none |

## 3. Recommended smallest coherent structure (not implemented)

**Header (desktop):**

| Item | Contents |
|---|---|
| Home | the logo (no separate "Home" text link, as now) |
| Services | Google Ads · Meta Ads · All services · Understand Our Pricing Approach (unchanged) |
| Who We Help | D2C and Ecommerce · Education and Training · Real Estate · **Enquiry-Led Businesses** · See how we help each business |
| Our Work · How We Work · About | unchanged |
| Primary CTA | **Discuss Your Advertising** → `/contact` (unchanged) |

**Mobile and tablet:** the same order; Who We Help gains the one extra link; **Request a call** stays as the secondary action inside the menu.

**Footer:** add one column, **Who We Help** (four audience pages). Keep Services, Company and Insights. If the owner agrees to D3, add a short **More services** group (Lead generation, SEO, AI search, Conversion optimisation) so retained indexed pages have a crawlable site-wide link. Nothing else changes.

**Active states:** extend `WHO_WE_HELP_ROUTES` with the fourth route; no new pattern.

**Homepage:** add the fourth audience as a card or as a link on the existing cards, and give the real-estate card its own id.

**Not recommended:** a Pricing top-level item, a separate "Home" link, a mega-menu, a `/who-we-help` hub page, or removing any existing footer link. Each adds surface without fixing a journey.

Page names above follow the frozen designs; the dropdown descriptions already in the working tree ("Products sold online to customers directly", and so on) can stay.

## 4. User journeys

All steps were traced from rendered links and CTAs (browser-extracted), not from assumed funnels. Final contact destination is `/contact` (form) or `/contact?intent=call` (request-a-call), the existing destinations of `DEC-062` and `DEC-071`.

| Journey | Entry | Relevant next pages | Primary CTA | Final destination | Broken or confusing transitions | Friction |
|---|---|---|---|---|---|---|
| **A. Business owner understands MappedSkills** | `/` (R3) | `/#who-we-help` cards, `/google-ads`, `/social-media-ads`, `/how-it-works`, `/pricing`, `/work` | Discuss Your Advertising (twice) | `/contact` | None found. R3 links: `/contact /work /who-we-help/{d2c,education,real-estate} /google-ads /social-media-ads /how-it-works /pricing`. The review-call sentence contradicts policy (P1-04) | None observed |
| **B. Google Ads prospect** | `/google-ads` (or Services panel) | `/social-media-ads` (fit link), `/portfolio/google-ads-for-online-courses`, `/work`, `/pricing`, `/how-it-works` | Discuss Your Google Ads; secondary Request a call | `/contact` or `/contact?intent=call` | None. No audience links from this page (users who want an industry view must go back to navigation) | Two CTA labels differ from the header's ("Discuss Your Google Ads" vs "Discuss Your Advertising") |
| **C. Meta Ads prospect** | `/social-media-ads` | `/google-ads`, `/portfolio/om-sai-developer-meta-ads`, `/work`, `/pricing`, `/how-it-works` | Discuss Your Meta Ads; Request a call | `/contact` / call | Nav label "Meta Ads" leads to a URL containing "social-media-ads"; visible pages and breadcrumbs say "Meta Ads" or "Paid social". Not broken, recorded trade-off (`DEC-080`) | None |
| **D. D2C owner finds the right service** | `/who-we-help/d2c` (dropdown or homepage card) | `/google-ads`, `/social-media-ads`, `/work`, `/pricing` | Discuss Your Advertising | `/contact` | None | The page offers no call-request option (only "Discuss Your Advertising"), unlike Google, Meta, Real Estate and Enquiry-Led |
| **E. Education owner on learner acquisition** | `/who-we-help/education` | `/google-ads`, `/social-media-ads`, `/portfolio/google-ads-for-online-courses`, `/work`, `/pricing` | Discuss Your Advertising | `/contact` | None | Same as D |
| **F. Property developer or Channel Partner** | `/who-we-help/real-estate` | `/google-ads`, `/social-media-ads`, `/portfolio/om-sai-developer-meta-ads`, `/work`, `/pricing` | Discuss Property Advertising; Request a call | `/contact` / call | Reachable only through the third homepage card or the Real estate dropdown item; label omits Channel Partners (P2-02). No other audience cross-link | None |
| **G. Enquiry-led business owner** | **none today.** Intended entry: `/who-we-help/enquiry-led-businesses` | Preview links to `/google-ads`, `/social-media-ads`, `/lead-generation`, `/pricing`, and the three sibling audiences | Discuss Your Advertising; Request a call | `/contact` / call | **Cannot be reached** from homepage, header or footer (P1-06). `/lead-generation` does not link back (P2-06) | Not applicable until a route exists |

### Cross-journey observations

- Every CTA on every page resolves to `/contact` or `/contact?intent=call`; there is no second form, funnel or third contact destination, and none is recommended.
- Only four of the seven pages offer "Request a call". That is a design decision of the frozen pages, not a contradiction; it is listed for the owner's awareness (P2-01).
- The sibling-audience links on the Enquiry-Led page are a good fit for journey G and for visitors who are unsure which audience they belong to; no equivalent exists on the other three audience pages. Not a defect; do not add.
- Contact page behaviour (form, call request, consent, delivery) was not re-tested here; it is outside the seven designs and was verified in earlier releases (`DEC-071`).
