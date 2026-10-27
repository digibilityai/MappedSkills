# Real Estate R2: content-first local preview

27 October 2026. Local only. Nothing committed, pushed, merged or deployed. Live `/who-we-help/real-estate` untouched.
**Preview:** http://localhost:3412/real-estate-preview-r2 (noindex; a 404 in production; not in the sitemap; no structured data).
Audit: `docs/real-estate-r2/REAL_ESTATE_AUDIT.md`. Screenshots: `docs/real-estate-r2/screenshots/`.

## 1. Section-by-section copy
Grounds: Ink Deep, Paper, Ink Deep, Paper, Ground, Ink Deep, Paper, Ink Deep, closing band. Source: `components/real-estate-r2/content.ts`.

1. **Hero (dark).** Eyebrow: Who we help: property developers and agents. H1 (live H1, unchanged): **More property enquiries. More of the right buyers.** Lede: Reach people looking for property through Google Ads and Meta Ads, with messaging built for developers and for agents and brokers. CTAs: Discuss Property Advertising (`/contact`), Request a call (`/contact?intent=call`). Illustration: Buyer, Location, Budget and Property meet at one property "Enquire" card, then a dashed "May talk". Caption: Illustrative scene with a generic property. A good fit is the aim, not a promise.
2. **Two audiences (paper).** H2: A project and a portfolio need different advertising. Lede: Developers and brokers sell differently, so we plan their advertising differently.
   - Property developers and project teams. *One project, one buyer brief.* Advertising introduces a project, its location and its lifestyle to buyers who may fit the brief. A useful enquiry: a buyer whose budget, location and timing suit the project.
   - Agents, brokers and channel partners. *Many properties, many requirements.* Advertising shows properties and your local expertise to buyers and sellers searching in your area. A useful enquiry: a buyer with a clear requirement you can match to a property.
   - Note: Channel partners promoting a developer's project sit between the two. We plan around who owns the listing and the buyer relationship.
3. **Two buyer journeys (dark).** H2: Different routes to a meaningful next step. Lede: These are illustrative paths. Buyers move at their own pace, and many never reach the last step.
   - Developers, *From project discovery to a possible site visit:* Discovers the project, Evaluates it, Enquires, **May visit** (Your team). Foot: MappedSkills manages the advertising. Your sales team handles calls, qualification, visits and bookings.
   - Agents and brokers, *From buyer search to a possible viewing:* Searches or browses, Finds a possible match, Enquires, **May view** (Your team). Foot: MappedSkills manages the advertising. You handle property matching, viewings, negotiations and transactions.
4. **Google and Meta (paper).** H2: Two platforms. Different buyer moments. Google Ads, *when someone is searching for a home* (developers: searches naming a locality or configuration; brokers: searches for homes in your micro-market). Meta Ads, *when someone discovers a property* (developers: a launch or lifestyle introduced to relevant audiences; brokers: listings and local expertise shown to nearby buyers). Links to `/google-ads` and `/social-media-ads`.
5. **Campaign decisions (ground).** H2: Five decisions shape every campaign. Location, Property type, Buyer needs, Messaging, Optimisation (one line each). Who does what: **We handle** setup, targeting, ad copy, agreed creative adaptation, budget oversight and review. **You provide** original property photographs and videos, accurate property details and applicable registration information. **Scoped separately** video production, brochures, landing pages, CRM integration and additional creative.
6. **Measurement (dark).** H2: Look beyond the lead count. A low cost per enquiry means little if the buyer cannot afford the property or wants another area. Ladder: Enquiries, Relevant buyers, Visits and viewings (where you share that information). Callout: Feedback sharpens the advertising. We use the follow-up and visit information you share to guide decisions. We do not see what we are not given.
7. **Verified developer work (paper).** Om Sai Developer, Meta Ads, residential developer: Meta advertising for a residential development in Chembur, Mumbai, aimed at buyers who matched a narrow brief. Lifestyle-led messaging; relevant buyers over broad reach. Original conceptual illustration labelled "Conceptual illustration, not the project". Foot: This is developer work. We show no broker campaign here. Links: case study, `/work`.
8. **FAQ (dark, nine).** Guarantees; developers vs brokers; Google or Meta; location targeting; who provides photographs and videos; property and compliance details; calls, matching, visits and negotiations; measurement and tracking; ad spend and fee (link to `/pricing`).
9. **Close.** Tell us about your properties and the buyers you want to reach. Share the location, property type, price range and how your team follows up. We will discuss where advertising could fit. CTA: Discuss Property Advertising.

Descriptions run about 8 to 25 words; no dashes used as punctuation (test-enforced).

## 2. The two journey animations
One component per journey, shared once-only mechanism (`InViewOnce`, threshold 0.4). Each journey sits armed at 30% strength, then plays once when first mostly in view; nothing loops or sticks.
- **Developer:** solid line with circle markers (tangerine). The line draws left to right in 1.0 s while the four steps come to full strength 0.3 s apart. The final step ("May visit") has a dashed marker and a "Your team" tag: it may happen and is the client's.
- **Broker:** dashed line with diamond markers. Draws in 1.3 s with steps 0.38 s apart, so it is deliberately not in lockstep with the developer lane and does not read as one funnel.
- Measured (1440): all steps at 30% on arrival, last step at full strength by about 2.4 s.
- Mobile (860 px and below): the lanes become vertical and the line draws downward.
- Hero scene: a one-off 2.4 s fade-in of the fit factors, the enquiry card and the dashed "May talk".
- Reduced motion and no JavaScript: final state shown, no armed elements (verified).
- **Caveat on both lanes at 1440:** a 900 px viewport shows both lanes together, so they play at the same moment with different timing. On narrower screens they play separately.

## 3. Comparison with the live page
| | Live page | R2 preview |
|---|---|---|
| Audience | Developers; "channel partners" in a strip | Developers, agents and brokers, channel partners in context |
| Structure | 9 sections: hero, audience strip, readiness, platforms, journey, proof, measurement, FAQ, close | 9 sections: hero, audiences, two journeys, platforms, decisions and who-does-what, measurement, proof, FAQ, close |
| Journey | One five-stage developer journey | Two independent journeys, developer and broker |
| Visual system | Older `.pa` styles with SVG tower | Approved R3 (`.rv3`) system, same as Education R2B and D2C R1.1 |
| FAQ | 7 | 9 (adds developers vs brokers, creative assets, compliance details) |
| Proof | Om Sai, with disclosure | Om Sai, qualitative only, plus "no broker campaign" note |
| Creative | Static allowances proposal-defined | Client supplies photos and videos; we write copy and adapt; extra production scoped separately |
| Metadata, schema, canonical | Developer-oriented | Preview: noindex, no schema. Live: untouched |
| H1 | More property enquiries. More of the right buyers. | Same (kept to protect continuity; audiences carried by eyebrow and lede) |

## 4. Proof and compliance limitations
- Om Sai: only the case's qualitative context (Chembur, Mumbai, residential, Meta, lifestyle-led messaging, relevance over reach). No figures, no testimonial, no star rating, no spend or lead counts. "Narrow brief" is from the case's own wording.
- No broker evidence exists; the page states that this example is developer work. It does not claim broker clients.
- The reserved Google real-estate case URL is not linked (test-enforced).
- The visual is an original illustration with a "Conceptual illustration, not the project" label.
- No RERA, Meta Housing or Google policy statement is made as fact (test-enforced). The compliance FAQ asks clients for accurate property details and applicable registration information and to confirm requirements with their own advisers.
- **Pre-release verification still owed:** state RERA and agent registration display rules (incl. Maharashtra QR code), the occupancy-certificate position, Meta's Housing special-ad-category effect in India on location targeting, Google policy for property ads, ASCI guidance, and counsel review of the FAQ wording.
- Owner-supplied "channel partners" wording is used as context only. Their ownership of listings and buyer relationships is described, not promised.
- Location FAQ is hedged ("each platform supports ... can vary") pending the Meta check.

## 5. QA summary (Chrome, local dev)
| Check | Result |
|---|---|
| Widths 320, 360, 390, 768, 1024, 1440 | `scrollWidth` equals viewport at all six; `scrollY` 0 after load; one H1; no console errors |
| Header and content alignment | Logo and `.rv3-wrap` left edges match (96 px at 1440, 41 px at 1024), identical to Education R2 |
| Journeys | Both render, horizontal at 1024 and above, vertical at 768 and below; steps, dashed final marker and "Your team" tag visible |
| Animation | Armed on load, plays once, opacity timeline measured; first version had a CSS selector bug (armed attribute is on an inner wrapper) that left the lanes unanimated, fixed before these results |
| Reduced motion | 0 armed elements, hero scene opacity 1 |
| No JavaScript | 0 armed, all journey steps opacity 1, no horizontal overflow |
| FAQ | 9 of 9 open |
| CTAs | `/contact`, `/contact?intent=call`, `/google-ads`, `/social-media-ads`, `/work`, `/pricing` all 200. `/portfolio/om-sai-developer-meta-ads` is 404 locally only because the local environment has no Contentful content; it is 200 in production (checked) |
| Claims | No figures, testimonial or reserved link in rendered text (test) |
| Tests | New `tests/real-estate-r2-preview.test.cjs`: 7 pass. Full `node --test tests/*.test.cjs`: 486 tests, 485 pass, 0 fail, 1 skipped |
| TypeScript, ESLint | `tsc --noEmit` and eslint on the new files: clean |
| Not run | Safari, Firefox, real devices, screen reader, production build, Lighthouse |
| Observed, unchanged | The site cookie banner covers the lower part of the screen on first view at 390 px; not touched |
| Observed, not mine | The same selector issue (`[data-arm] .x-path ol` where the attribute sits on an inner wrapper) appears in Education R2's route lines and handoff; I did not edit Education. Worth a check before that page is approved |

## 6. Exact files changed
New: `app/real-estate-preview-r2/page.tsx`; `components/real-estate-r2/{RealEstateR2.tsx,content.ts,real-estate-r2.css,InViewOnce.tsx}`; `tests/real-estate-r2-preview.test.cjs`; `docs/real-estate-r2/{REAL_ESTATE_R2_REPORT.md,screenshots/*}`.
No tracked file was edited by this task. (`tests/paid-advertising-real-estate.test.cjs` and the header files show as modified from earlier, unrelated work.)
Reversal: `rm -rf app/real-estate-preview-r2 components/real-estate-r2 tests/real-estate-r2-preview.test.cjs docs/real-estate-r2/screenshots docs/real-estate-r2/REAL_ESTATE_R2_REPORT.md`

## 7. Decisions for the owner
1. Keep the live H1 (done) or approve a broker-inclusive H1.
2. Approve the "Verified developer work" note "We show no broker campaign here", or remove it.
3. Naming: "Agents, brokers and channel partners" as one audience card.
4. Visual approval, desktop and mobile.
5. Pre-release compliance checks in section 4.
6. Release route for editing the live URL (the preview does not touch it).

---

# R2.1: copy refinements and Education animation verification (27 October 2026)
Preview unchanged at http://localhost:3412/real-estate-preview-r2. Nothing committed, pushed, merged or deployed. Live Real Estate and Education routes untouched.

## A. Real Estate copy changes (exact)
| Where | Before | After |
|---|---|---|
| Om Sai section | Footer line "This is developer work. We show no broker campaign here." | Removed. Verified developer context kept (Chembur, Mumbai, residential, Meta, lifestyle-led messaging, relevance over reach). No broker proof added |
| Who does what | Three panels: We handle, You provide, **Scoped separately** (video production, brochures, landing pages, CRM integration, additional creative) | Two panels: We handle, You provide. The dashed "Scoped separately" panel removed as an unneeded scope explanation; the handoff look is unchanged |
| FAQ "Who provides photographs and videos?" | "...Video production and additional creative are scoped separately." | "...Video production, brochures, landing pages and additional creative are scoped separately." (carries the boundary that left the panel) |
CRM integration and tracking boundaries remain in the existing FAQ on measurement. Nothing else in the copy or structure changed. The test now asserts no "broker campaign" line, no "Scoped separately" panel and exactly two who-does-what panels.

## B. Education R2B animation verdict: DEFECT CONFIRMED (routes only)
Method: Chrome, 1440x900, in-page opacity and transform sampling after scrolling, plus screenshots in `docs/real-estate-r2/education-verification/` (`before-*` and `after-*`).
| Item | Before the fix | After the fix |
|---|---|---|
| Three learner routes, steps | Opacity 1 at load, never animated (nine steps at 1 throughout) | 0.3 at load, step by step to 1 over about 1.1 s once the route is mostly in view |
| Three routes, vertical line | Computed `::before` transform "none" at all times: never drawn | `scaleY(0)` at load, draws to 1 once |
| Three routes, end chip | Fades 0.3 to 1 (this part worked) | Unchanged |
| Who Does What handoff | Works: columns 0.3 at load, then 1, then 2 then 3 in turn; arrows draw. Measured again in a clean page: [0.3,0.3,0.3] then 0.95, 1, 1 / 0.9 / 0.74, then all 1 by 2.8 s | Same, unchanged |
| Chart bars (challenge section) | Work (armed scaleX(0)) | Unchanged |
| Reduced motion | 0 armed, all steps, columns and arrows at final state, also after scrolling | Same |
| No JavaScript | 0 armed, all content at full opacity | Same |
Cause: `InViewOnce` puts `data-arm` on `.edr2-path-in`, which is inside each route `li.edr2-path`. Seven CSS selectors were written `[data-arm] .edr2-path ol...`, which needs `.edr2-path` to be a descendant of the armed element. It never is, so the step and line rules never matched, while the `.edr2-end` rules (written without `.edr2-path`) did.
Fix (smallest): reorder those seven selectors to `.edr2-path [data-arm] ol...` in `components/education-r2/education-r2.css` (6 lines changed). Values, timings, copy, layout and the `.edr2-end` rules are unchanged. This restores the already-approved behaviour described in the file's own comment ("each route draws its own line, once").
Real Estate was built with the corrected pattern, and re-sampling after the fix shows its lanes still animate (30% at load, last step full at about 2.4 s). One caution: the Education route animation is now visible for the first time in review, so it deserves a look.

## C. Visual QA (Real Estate, Chrome)
| Check | Result |
|---|---|
| 1440 and 390, plus 320, 360, 768, 1024 | No horizontal overflow at any of six widths; scrollY 0 after load; one H1; no console errors |
| Hero, audience cards, journeys, who-does-what, Om Sai, FAQ, CTA | Reviewed in `re-r2-{1440,390}-{hero,audiences,journeys,decisions,omsai,faq,cta}.png`; whitespace and alignment consistent with siblings; header and content edges match |
| Who does what | Two equal panels, no gap or orphan at either width |
| Both journeys | Animate once; final state correct; vertical at 390 |
| FAQ | 9 of 9 open |
| CTAs | `/contact`, `/contact?intent=call`, `/google-ads`, `/social-media-ads`, `/work`, `/pricing` 200. Om Sai case 404 locally only (no Contentful content), 200 in production |
| Reduced motion, no JavaScript | Final state, all content visible |
| Proof claims | None; the automated "bad" flag in my script was the FAQ sentence "We do not guarantee enquiries..." (a negation) |
| `tsc --noEmit`, eslint (real-estate-r2, education-r2, route, test) | Clean |
| `node --test tests/*.test.cjs` | 486 tests, 485 pass, 0 fail, 1 skipped |
| Not run | Safari, Firefox, real devices, screen reader, production build |

## D. Exact files changed in R2.1
- `components/real-estate-r2/content.ts` (Om Sai foot, third who-does-what item, FAQ 5)
- `components/real-estate-r2/RealEstateR2.tsx` (two removed elements)
- `components/real-estate-r2/real-estate-r2.css` (two columns, removed unused rules)
- `tests/real-estate-r2-preview.test.cjs`
- `components/education-r2/education-r2.css` (seven selectors reordered; preview only, not the live route)
- `docs/real-estate-r2/REAL_ESTATE_R2_REPORT.md`, `docs/real-estate-r2/screenshots/*` (refreshed), `docs/real-estate-r2/education-verification/*` (new)
Education before-state of the CSS is recoverable with `git diff --no-index` against a copy only if kept; the change is six lines and described above. Old screenshots were overwritten in place; one stale file, `re-r2-390-nojs-top.png` (from R2), remains because a bulk delete was blocked by the environment.

---

# R2.1 (second round): copy simplification and unified buyer journey (27 October 2026)
Preview: http://localhost:3412/real-estate-preview-r2 (same route). Local only; nothing committed, pushed or deployed; no production route, metadata, schema or navigation changed. Before and after screenshots: `docs/real-estate-r2/r21/` (`before-*`, `after-*`, and `after-{1440,390}-journey-anim-{100,1000,2000,3600}ms.png`).

## Exact copy changes
| # | Before | After |
|---|---|---|
| 1 | Who we help: property developers and agents | Who we help: property developers and Channel Partners |
| 2 | Hero caption "Illustrative scene with a generic property. A good fit is the aim, not a promise." | Removed (figcaption and its rule deleted) |
| 3 | Developers and brokers sell differently, so we plan their advertising differently. | Developers and partners sell differently, so we plan their advertising differently. |
| 4 | Channel partners promoting a developer's project sit between the two... | Removed |
| 5, 6 | Two "MappedSkills manages the advertising..." journey footers | Removed with the old journeys; neither sentence appears anywhere in the main page |
| 7 | Two journeys (developers; agents and brokers) | One journey: Discover, Explore, Enquire, Connect, Potential Visit |
| 8 | "...to guide decisions. We do not see what we are not given." | "...to guide decisions." |

Terminology (same round, for consistency): audience cards are now "Property Developers" and "Channel Partners" (was "Property developers and project teams" and "Agents, brokers and channel partners"); hero lede "messaging built for property developers and Channel Partners"; Google and Meta panel lines "Property Developers: ..." and "Channel Partners: ..."; FAQ 2 "Do property developers and Channel Partners use the same approach?"; FAQ 7 and the measurement ladder no longer say "viewings" (now "visits"); the card "and sellers" removed; preview meta description updated. No "agents" or "brokers" remains in rendered text (test-enforced). The test also asserts none of the eight removed sentences appears anywhere in rendered text or source.

Unified journey copy: Discover (A buyer sees a relevant property advertisement.), Explore (They look at the location, configuration and price.), Enquire (They ask for details or share what they need.), Connect (A conversation with your team may follow.), Potential Visit (A visit to the property may be arranged.). Heading "From discovery to a possible visit." Lede: "An illustrative path for property developers and Channel Partners. Buyers move at their own pace, and many never reach the last step."

## Animation
One once-only sequence on a single card, armed at 30% and played when 40% in view. Each step lights in turn (0.5 s apart) and its outgoing line draws to the next step: solid grey while the buyer acts (Discover to Explore to Enquire), dashed tangerine from Enquire onward because Connect and Potential Visit depend on a conversation and may not happen. Connect and the last node have dashed outlines; the last node is larger with a pin icon and fills softly, so the ending is the visit, not a conversion. Measured at 1440: all five at 30% on arrival, sequential rise, all at full by about 3.0 s; at 390 the same on a vertical line drawing downward. Reduced motion and no JavaScript: no armed elements, all five steps visible, no line animation. No counts, no narrowing funnel.

## QA (Chrome, local dev)
| Check | Result |
|---|---|
| 320, 390, 768, 1440 | No horizontal overflow; scrollY 0 after load; one H1; no console errors; step boxes do not overlap |
| Journey reading | Five steps in one row at 1440 and 768, one column at 390 and 320; line segments join nodes; last node aligned |
| Animation | Plays once, in order; reduced motion and no JS show the final state |
| Gaps after removals | None visible: hero stays vertically centred, the audience cards sit directly below the lede |
| FAQ and CTAs | 9 of 9 FAQs open; `/contact`, `/contact?intent=call`, `/google-ads`, `/social-media-ads`, `/work`, `/pricing` 200; Om Sai case 404 locally only (no Contentful content), 200 in production |
| Other pages | No tracked file edited by this round; the modified tracked files are the earlier, unrelated set |
| `tsc --noEmit`, eslint | Clean |
| `node --test tests/*.test.cjs` | 487 tests, 486 pass, 0 fail, 1 skipped (real-estate preview test now 8 tests) |
| Not run | Safari, Firefox, real devices, screen reader, production build |

## Files changed in this round
`components/real-estate-r2/content.ts`, `components/real-estate-r2/RealEstateR2.tsx`, `components/real-estate-r2/real-estate-r2.css`, `tests/real-estate-r2-preview.test.cjs`, `docs/real-estate-r2/REAL_ESTATE_R2_REPORT.md`, `docs/real-estate-r2/r21/*` (new). Internal code identifiers (`id: 'broker'`, `dev`/`broker` keys) are unchanged because they are not audience-facing.
