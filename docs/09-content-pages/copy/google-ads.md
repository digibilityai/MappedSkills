# Route
`/google-ads`

**Session:** 11 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED COPY — NOT APPROVED.**
**Governed by:** `briefs/google-ads.md` · `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §1.2 (moves 1, 2, 4, 5, 6, 9) · `CAPABILITY_LANGUAGE.md` §5 · `MESSAGE_CONSISTENCY_MATRIX.md` row 5.

---

# Page Role
Capability page. Hold existing paid-search demand and URL equity, repositioned as a demand source inside the enquiry system.

# Primary Intent
T — provider-seeking.

# Search Intent / Search Status
Google Ads / paid-search provider intent. **Not targeted:** `reduce cost per lead` and its family, which was rejected.
**Metadata constraint, binding:** the title and meta description must not contain "performance marketing", and must not contain any ROI or ROAS figure. **The current production title for this route carries "300%+ ROI" and must change** (`DEC-007`).

# Primary Audience
A business already spending on Google Ads and unable to trace enquiries back to it, or about to start and unsure what it will get. Medium sophistication, frequently burned by a previous agency, price-aware.

# Primary Message
Yes, we run Google Ads — as one demand source inside the enquiry system, on the same measurement layer as everything else.

# H1
Google Ads, measured on the enquiries rather than the clicks.

# Hero Supporting Copy
We run paid search: account structure, keywords, negatives, ad copy, bidding and budget. We also take responsibility for what happens after the click — the page it lands on, whether the enquiry completes, and whether you can see where it came from. Paid is a way to reach demand that is active now. It is chosen because it fits your business, not because every client gets one.

# Primary CTA
**Role: PRIMARY**, both surfaces.

# Secondary CTA
**Role: PROOF** → `/how-it-works`.

---

## Move 2 — The bridge, made unambiguous

### Heading
Where paid search sits in the work

### Copy
Paid search is one of several ways we reach buyers, and it earns its place for a particular business or it does not. What we are accountable for here is the same as everywhere else on this site: enquiries you can act on, measured.

That difference is practical rather than philosophical. A supplier paid to manage spend improves the account. We are working to a number two steps further down the chain, which changes what gets attention on the week the account looks healthy and the enquiries have stopped.

---

## Move 4 — What the work involves

### Heading
What is in scope

### Copy
**The account.** Structure, search terms and negatives, match types, ad copy, extensions, bidding and budget pacing. Ordinary work, done properly.

**Search-term review, continuously.** Reading what people actually searched before they clicked, and excluding what should never have matched. It is not a setup task — irrelevant matches are where a budget quietly goes, and they accumulate.

**The landing experience.** Whether the page answers the search it was bought for. A campaign pointed at a page that does not is the most common way spend disappears without a trace.

**The enquiry path.** The form, the booking, the phone route, and whether the enquiry actually arrives.

**Conversion measurement that is real.** Conversions recorded server-side against the enquiry itself, not a thank-you page view or a button click. A conversion counted client-side inflates the number, and the account then optimises towards the inflation.

**Reporting against enquiries.** Enquiries and qualified enquiries by campaign, with what could not be attributed shown as such.

---

## Move 5 — The boundary, above the midpoint

### Heading
Spend, fee, and what we will not promise

### Copy
`[OWNER INPUT REQUIRED — how the management fee is separated from ad spend, and whether spend is billed through MappedSkills or paid directly to Google]`. Whatever the arrangement, the two are stated as separate things on every invoice and in every report, and the fee is never expressed as a percentage of spend in a way that rewards spending more.

We do not promise a return on ad spend, a cost per enquiry, a cost per lead, or a number of enquiries per month. Those depend on your market, your price, your competitors and your own follow-up, none of which we control. What we will do instead is capture where you are starting from and report against it.

We do not report ROI. Where you supply close data, we report the revenue your own system recorded against the enquiries, and state what we did not control.

### Supporting Elements
- **Visual explanation useful here.** A plain boundary diagram: what the fee covers, what the spend covers, and where the measurement sits. It removes the single most common source of dispute in this category.
- **Prohibited:** any ROI, ROAS, cost-per-lead, cost-per-click or spend figure · any client account screenshot · "300%+ ROI" in any form.

---

## Move 6 — Measurement

### Heading
What you will actually see

### Copy
Enquiries by campaign and by search term where the data allows it, against a starting point captured before we change anything. Qualified enquiries separated from total enquiries, because the two move differently and the gap between them is usually the interesting part.

Where an enquiry arrives by phone after someone saw an ad, we will usually not be able to attribute it, and we will show it as unattributed rather than assigning it to paid to make the campaign look better.

---

## Move 9 — Convert

### Heading
Tell us what the account is doing now

### Copy
If you are already spending, the useful first message is what you spend, what you are getting, and whether you can currently tell which enquiries came from it. If you are not spending yet, tell us what you sell and what a single new customer is worth — that decides whether paid search makes sense at all.

### Supporting Elements
- CONTEXTUAL: *If the clicks arrive and the enquiries do not* → `/problems/traffic-but-no-enquiries` · *The whole system* → `/services` · *The enquiries themselves* → `/lead-generation`.
- PRIMARY, both surfaces. DIRECT visible.

---

# Evidence / Claim Notes

| Claim | Class | Ladder | Basis |
|---|---|---|---|
| "A meaningful share of clicks on commercial terms come from students, job-seekers and competitors" | A | **B/D** | Session 03 observed heavy career and course contamination across the target vocabulary. **Stated qualitatively — no share figure exists and none is given** |
| "A conversion counted client-side inflates the number" | C | **A** | Ordinary technical fact, stated without a figure |
| Everything in "what is in scope" | A | **C** | Capability statements |
| The fee/spend arrangement | — | **Blocked** | `[OWNER INPUT REQUIRED]` |

**Absent by rule:** ROI · ROAS · cost per lead · cost per click · spend figures · client accounts · guaranteed volume · any "performance marketing" framing in copy, title or meta description.

# Owner-Input Placeholders
1. `[OWNER INPUT REQUIRED — how the management fee is separated from ad spend, and how spend is billed]` — one sentence, and it is the question this page's buyer asks first.
2. `[OWNER INPUT REQUIRED — the decision on "300%+ ROI" in the production title of this route]` — blocks the page's metadata, not its body copy.

# Internal-Link Intent
**Up:** `/services`. **Across:** `/lead-generation`, `/social-media-ads`. **Down:** `/how-it-works`, `/problems/traffic-but-no-enquiries`.
**In:** `/services` · header dropdown ("Paid demand" — the single paid entry point) · `/lead-generation` · footer.

# Copy Status
**PARTIALLY BLOCKED** — one owner input inside the body copy (fee/spend separation) and one on the metadata.
