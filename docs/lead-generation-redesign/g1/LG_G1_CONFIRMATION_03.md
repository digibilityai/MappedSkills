# LG Owner Confirmation 03 (17 Oct 2026)

- **Source:** owner, "ABCB | Lead Generation G1 | Owner Confirmation 03".
- **Status:** **RECORDED OWNER REQUIREMENT** (operating fact). It confirms how Lead Generation works; it **approves no copy** and no other part of G1. All LG-D decisions other than the corrections stay pending.
- **Scope:** G1 review materials only. No production code, commit, push, merge or deployment. The live meta description is **not** changed.
- **Confirmed operating model (OWNER REQUIREMENT):** MappedSkills manages advertising campaigns. Enquiries are delivered **directly to the client’s own lead form, CRM or WhatsApp, depending on their setup**. MappedSkills **does not routinely receive, manually review, approve, reject or release individual enquiries.**
- **Wording care:** "routinely" and "depending on their setup" are the owner’s. The page therefore claims neither that MappedSkills never sees an enquiry, nor that every possible integration has been independently verified.

## 1. Actions → what was done

| # | Owner action | Done |
|---|---|---|
| 1 | Update LG-D27 to the confirmed standard arrangement; do not claim every integration is verified | LG-D27 rewritten (below). The page says "your own lead form, CRM or WhatsApp"; it never says verified, tested for every setup or guaranteed |
| 2 | LG-D28: preferred wording "You tell us who you want to reach. We build campaigns around them."; keep final copy approval pending | Applied in the mockup (section 4, left line) and recorded in LG-D12 and LG-D28. Status stays **P, final copy approval pending** |
| 3 | Audit the G1 mockup for contradictions with direct client delivery | §2. Five lines reworded |
| 4 | Propose replacement meta description under LG-D19; do not implement | §4. Three options, none implemented |
| 5 | Read-only audit of `/faq` and relevant homepage/service illustrations (LG-D29); distinguish own qualification from client lead generation | §5. Nothing assumed identical; nothing changed |
| 6 | Update decision register, copy document, review package | Done: `LG_G1_DECISIONS.md` (LG-D01 to LG-D30), `LG_G1_COPY.md`, `LG_G1_FEEDBACK_AND_ARCHITECTURE.md`, `LG_G1_REVIEW.html` and the review ZIP (both now archived outside Git, see `README.txt`), `LG_PRODUCTION_CORRECTION_PROPOSAL.md` |

## 2. LG-D27 and LG-D28 as now recorded

| ID | Before | Now |
|---|---|---|
| **LG-D27** | FC: "direct to the client" route undocumented | **Confirmed as the standard arrangement** (OWNER REQUIREMENT). Per-client integration status remains **UNKNOWN**, is not verified and is not claimed. The owner may still list exceptions |
| **LG-D28** | FC: "You tell us who your buyers are. We build each campaign around that." | **Owner-preferred wording applied; final copy approval pending.** Still a targeting statement only |
| **New LG-D30** | none | FC: basis of "A monthly report" now that MappedSkills does not routinely receive enquiries |

## 3. Audit of the G1 mockup against direct client delivery

Method: read every visible line, aria-label and illustration label of the rendered `<main>`; automated search for implied receipt or handling (`we receive`, `handed to us`, `we forward`, `we hold`, `release`, `review`, `approve`, `confirm`, `verif`, `criteria`, `filter`, `standard`, `introducing`, `qualified`, etc.: **0 matches**); then a manual read of every line containing send, receive, reach, arrive, team, report.

| Line (proposed page) | Finding | Action |
|---|---|---|
| Hero: "Someone sees your ad · They send an enquiry · Your team receives it"; chips Ad seen / Enquiry sent / Received; "Your sales team" tag; caption | Consistent: the receiver is the client’s team | Kept |
| Hero: "Real enquiries … We don’t buy in lists of names and forward them." | "forward" is in a denial about bought lists, not about enquiries | Kept |
| What we do, stop 2: "Make it easy to enquire · A clear page and a short form." | Implied MappedSkills supplies the page and form; the owner says delivery goes to the client’s **own** form, CRM or WhatsApp | **Reworded:** "Into your own form, CRM or WhatsApp." |
| What we do, stop 3: "Make sure it arrives · We test that enquiries reach you." | Implied every enquiry is tested and receipt is assured | **Reworded:** "We test the route to your team." Still FC under LG-D08 |
| What we do, stop 4: "Where we can tell, which work brought it in." | Compatible (campaign data), hedged | Kept (see LG-D30) |
| How it reaches you: intro "Enquiries from our campaigns go directly to you." | Correct but silent on the destination | **Reworded:** "Our campaigns send enquiries directly to your own lead form, CRM or WhatsApp." |
| Step 3: "Ready to follow up." | Compatible | **Reworded:** "In your own form, CRM or WhatsApp, ready to follow up." |
| Left line: "You tell us who your buyers are…" | Superseded by the owner’s preferred wording | **Replaced:** "You tell us who you want to reach. We build campaigns around them." |
| Right line: "We don’t call your enquiries to qualify them…" | Compatible | Kept |
| Accountability: "We bring the enquiry. Your team makes the sale."; mark "An enquiry, sent to you" | Compatible | Kept |
| "A monthly report and a review call." | Compatible, but its data basis is undocumented | Kept; flagged LG-D30 |
| FAQ 1: "…and send every enquiry straight to your team." | "send" could read as MappedSkills handling delivery | **Reworded:** "…so every enquiry goes straight to your team." |
| FAQ 3 and FAQ 2 | Compatible ("Enquiries go straight to your team"; "We capture a starting point first") | Kept |
| Close: "We reply by email or WhatsApp" (under What happens next) | This is MappedSkills replying to a **prospective client** who contacts it (`DEC-051` item 5), not a campaign enquiry | Kept |
| Problem section ("more sorting") | Refers to the client’s own inbox | Kept |
| Meta description (not in the mockup) | Contradicts (LG-D19) | §4 |

Re-verified after the edits: journey gaps 2,002 to 2,003 ms; keyboard selection holds; reduced motion static for all four journeys; no-JavaScript shows everything; no horizontal overflow at 1440, 1366, 390 and 320; the hero still ends at 589 px (1440×900) and 585 px (1366×768); 0 long or double dashes; console errors 0. Not run: assistive-technology testing, browsers other than Chromium.

## 4. LG-D19: proposed replacement meta description (NOT IMPLEMENTED)

- **Live (to be replaced):** "Enquiries from real businesses, with a real need, worth picking up the phone about — with a published definition of what counts as one, and that definition is the number we report." Problems: the "published definition" no longer exists on the page; it implies a reporting standard MappedSkills computes; it has a long dash.
- **SEO intent preserved:** the primary term "lead generation", "enquiries", the "worth acting on" angle (the live title "…Where the Unit Is an Enquiry You Can Act On" is kept), and a plain statement of what the service is. **No** ranking, volume or performance claim is made (WORKING HYPOTHESIS that this wording suits search intent; no search data was used).
- It would also become the Open Graph and Twitter description, because `createMetadata` reuses it.

| Option | Text | Length |
|---|---|---|
| **A (recommended)** | Lead generation that brings in enquiries worth calling back. We manage the campaigns; enquiries go directly to your own form, CRM or WhatsApp. | 142 |
| B | Lead generation campaigns that bring real enquiries from people who need what you sell, delivered straight to your own lead form, CRM or WhatsApp. | 146 |
| C | Lead generation for businesses that want enquiries worth picking up the phone about. We manage the campaigns; the enquiries go directly to your team. | 149 |

All three stay under about 155 characters (WORKING HYPOTHESIS: search engines may rewrite snippets). A matches the G1 H1 "judged on enquiries worth calling back" (LG-D01). If LG-D01 option B (keep the live H1) is chosen, C is closer to the live wording. Implementation is a one-string change in `app/(pages)/lead-generation/page.tsx`, to be done only with explicit authorisation (see `LG_PRODUCTION_CORRECTION_PROPOSAL.md`).

## 5. LG-D29: read-only audit of `/faq` and homepage/service illustrations

Method: read the source (`components/cplus/faq/faqData.tsx`, `components/commercial/ChainFigure.tsx`, `components/routes/MethodChain.tsx`, `components/homepage/*`, `components/cplus/about`, `components/cplus/how-it-works`, `docs/07-cro/QUALIFIED_ENQUIRY_DEFINITION.md`), and fetched the live pages `/`, `/services`, `/how-it-works`, `/about`, `/faq`, `/work`, `/lead-generation` on 17 Oct 2026 to count and read "qualified enquiry" statements. **Nothing was changed.**

### 5.1 Two different processes (do not assume they are the same)

| | **MappedSkills’ own enquiry qualification** | **Lead generation for clients** |
|---|---|---|
| Whose enquiries | Enquiries made on MappedSkills’ own site (own forms) | Enquiries from client campaigns |
| Who evaluates | "The system, automatically, at the moment the enquiry arrives" (`/faq`; `QUALIFIED_ENQUIRY_DEFINITION.md` §2: five machine-checkable conditions) | **Not MappedSkills.** Enquiries go to the client’s own form, CRM or WhatsApp; no routine receipt or review by MappedSkills (Confirmation 03) |
| Status of the rule | `QUALIFIED_ENQUIRY_DEFINITION.md` is marked **PROPOSED, NOT APPROVED** (dated 2026-08-31); the live `/faq` presents it as the current rule. Whether it was later approved is **UNKNOWN** here (check `DECISION_LOG.md`) | Not applicable |
| Evidence that it applies to client campaigns | None found | n/a |

### 5.2 Findings by place

| Place | What it says (live, 17 Oct 2026) | Relation to client lead generation | Risk |
|---|---|---|---|
| `/faq` "What counts as a qualified enquiry here, and who decides?" | System decides automatically against five checks; ends "The published definition" → `/lead-generation` | Correctly scoped by the word **"here"** (own site). **But** the link sends readers to `/lead-generation` as "the published definition", and after G1 that page will not contain a definition | **Dangling reference** (certain after G1); possible reader confusion |
| `/faq` "What are you accountable for…" | "accountable up to the qualified enquiry: real, reachable, from a business with a stated need, not a duplicate. That is the number we work to and the number we report" | Does not say who runs the check. For a client campaign where MappedSkills does not routinely receive enquiries, "the number we report" and the checks are **unexplained** | Ambiguity; strategic wording (`DEC-005`), not for G1 to change |
| `/faq` page meta description | "…what counts as a qualified enquiry." | Own-site framing | Low |
| `/about` | "We answer for … the qualified enquiry"; defines it ("a real person, reachable, from a business, with a stated need"); figure "Form → Qualified enquiry" | Describes MappedSkills’ route from search to the qualified enquiry **on a business’s own form**; does not distinguish own-site from client delivery | Ambiguity |
| `/how-it-works` step 05 | "The qualified enquiry: whether it is real, reachable…, and not a duplicate. This is the accountable number." | Method for the **own-site enquiry path**; does not say who checks it for a client | Ambiguity |
| Homepage and `/services` (visible text) | The live visible text has **no** "qualified enquiry" statement. The only occurrence in the page payload is the 404 helper list: "Lead generation: What counts as a qualified enquiry, published." | Not shown on those pages | None visible |
| Homepage/service **illustrations** in the repository: `ChainFigure.tsx` (`ChainFull`, `ChainDiscovery`, `ChainLossZones`, `ChainTerminus`), `MethodChain.tsx`, `HomepageIntervention.tsx`, `AccountFigure.tsx` | They draw "a rule crosses the chain at the point the five conditions are checked, at the moment the enquiry arrives", "the qualified enquiry", "the rest is stored and reported separately, never deleted" | This describes a **system that receives and checks enquiries**, i.e. the own-site process, **not** client delivery. `ChainTerminus` ("/lead-generation, STATE at the terminus") is **not imported anywhere** (VERIFIED by search), so it is not rendered on `/lead-generation`. Whether the others render on a live route was **not confirmed** (UNKNOWN); `AccountFigure` renders on `/about` | If any is shown on a client-lead-generation context, it would contradict direct delivery. None is on `/lead-generation` |
| Pointers calling `/lead-generation` the published definition: 404 list ("What counts as a qualified enquiry, published."), blog `CTABlock` ("…published in full."), header description ("Build a qualified enquiry pipeline."), homepage accountability text ("What counts as one is published") | They promise a published definition at `/lead-generation` | After G1 the page carries none | Dangling references |
| `/lead-generation` live | Its own five steps (captured and screened, eligible, confirmed, reviewed, handed over) **do not match** the `/faq` five checks (abuse screening, reachable identity, business context, stated need, not a duplicate) | The live page already mixes the two processes | This is a pre-existing inconsistency (VERIFIED), fixed in G1 by removing the steps |
| `/work` and `/problems/traffic-but-no-enquiries` | "Five checks" here are a **diagnostic for the reader’s own site** | Unrelated, but the phrase "five checks" now names three different things | Naming collision (low) |

### 5.3 Options for the owner (no recommendation to change strategy)
1. **Leave all of it** and accept the dangling "published definition" pointers (not advised).
2. **Scope the pointers (smallest):** keep the `/faq` answer, label it as MappedSkills’ own website, repoint "The published definition" to `/faq` or to the own-site definition, and retarget the 404, blog and header descriptions. One added `/faq` entry could say that client campaign enquiries go to the client’s own form, CRM or WhatsApp.
3. **Scope the shared accountability language** ("accountable up to the qualified enquiry") on `/faq`, `/about`, `/how-it-works` and the homepage to say whose enquiries and who checks them. This touches approved positioning (`DEC-005`) and needs its own owner decision.

None is part of G1. All need a separate, owner-approved step.

## 6. Remaining owner decisions
1. **G1 itself:** approve, change or reject the direction. Each LG-D item still needs its own answer; visual approval does not approve copy, claims, structure, SEO or form items.
2. **LG-D28:** approve the wording "You tell us who you want to reach. We build campaigns around them."
3. **LG-D27:** list any known exceptions to direct delivery, if they should be stated.
4. **LG-D08 / LG-D30:** is "We test the route to your team" true for every client; is "a monthly report" accurate and on what data.
5. **LG-D19:** choose meta option A, B or C (or edit). Implementation needs authorisation.
6. **LG-D29:** choose option 1, 2 or 3 above, or defer.
7. **LG-D24 / production proposal:** authorise or decline the narrow live-page correction (still not authorised; now using the Confirmation 03 wording).
8. Existing open items: LG-D01 (H1), LG-D03 (secondary CTA), LG-D22 (privacy policy lists "Marketing budget range").
