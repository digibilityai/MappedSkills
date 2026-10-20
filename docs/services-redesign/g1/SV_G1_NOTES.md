# /services G1: design notes for owner review

**Status: G1 FINAL VISUAL DESIGN APPROVED (owner, 2026-10-18).** G2 (implementation) is not authorised and not started. The production `/services` page, shared components and metadata are unchanged. Nothing is committed, pushed or deployed.

## Preview
- **Mockup:** `mockup/index.html`. It is served locally at `http://localhost:3198/mockup/index.html` (launch config `sv-g1-mockup`). The header and footer are the live chrome, and their links point at live paths.
- **Review flags:**
  - `?pick=cap|cv|ms` preselects a problem;
  - `?step=N` freezes the journey at step N;
  - `?motion=reduce` shows everything complete;
  - `?banner=0` hides the review banner.
- **Screenshots** are in `screenshots/`:
  - `desktop-1440-full.png` and `mobile-390-full.png`;
  - folds at 1440, 820, 390 and 320 px;
  - sections `*-s1` to `*-s5`;
  - a selected problem: `*-pick-cv.png`;
  - journey at step 1: `*-journey-step1.png`;
  - no JavaScript: `desktop-1440-nojs-full.png`;
  - measurements: `checks.json`.
- **Rebuild:** run `node tools/build.cjs` and then `node tools/capture.cjs` from `g1/`. The sources are `mockup/src/body.html`, `sv.css` and `seq.js`.

## 0. Owner decisions recorded (2026-10-18, "Services | G1 Final Refinement")
- **SV-D01 APPROVED:** H1 "Get found. Get enquiries. See what's working." Title, description and canonical unchanged.
- **SV-D06 APPROVED:** "Book a call" stays as the secondary CTA in both the hero and the close.
- **SV-D05 APPROVED:** concise service-card copy; detailed qualifications stay on the dedicated service pages.
- **Example APPROVED:** the fictional kitchen fitter, labelled "Illustrative example. Not a real client."
- **Length ACCEPTED:** current phone length, with avoidable spacing and repetition removed (refinement R1 below).
- To be entered in `docs/00-project/DECISION_LOG.md` on the G2 branch with the final approval, as for `/how-it-works` (DEC-058); this checkout is not `main`.

## R1 refinement (2026-10-18)
1. **Hero:**
   - The route is drawn without its card frame, as a margin note beside the headline.
   - On wide screens each station sits level with its headline line, within 1 px at 1440 and 1280: Get found with "They find you", Get enquiries with "They get in touch", See what's working with "You see where they came from".
   - "Illustration" is a small tag under the route.
2. **Hero lede:** it no longer repeats the H1. It now reads "Digital marketing that works together: search, ads, your website and enquiry tracking, joined into one route."
3. **Card copy:**
   - SEO: "It usually takes 12 months or more."
   - AI search: "Work on how AI tools like ChatGPT find and describe your business." The old wording ("Help … find") could read as a promise.
   - Conversion optimisation: "Find and fix what stops visitors…"
4. **Selector link:** "Something else? Tell us". It no longer repeats the close's "Not sure".
5. **Phone:**
   - tighter exclusion tags;
   - no reserved empty status line;
   - no decorative result bars in the search illustration;
   - no hero card padding.
   - Height at 390 px: 7,135 → **6,942 px** (live 7,133).
6. **Unchanged:** sections, features, animations, 150 ms micro-interactions, 1.5 s one-time journey (measured 1,502 ms), and CTAs (`/contact` primary, `/schedule-call` secondary, in both the hero and the close).

## 1. G0 decisions (SV-D01 to SV-D08) against the G1 brief
| ID | G0 wording (recommended) | G1 brief | Applied | Flag |
|---|---|---|---|---|
| SV-D01 | New H1 "Get found. Get enquiries. See what's working."; title and description unchanged | Same H1 | Yes. "Digital marketing that works together" moves to the lede. | **Open.** The brief sets the direction, but the H1 change is an SEO decision. It needs explicit owner approval before G2. |
| SV-D02 | Selector and cards merged into one section | Combined | Yes | None |
| SV-D03 | Three stages | Capture → Convert → Measure | Yes | None |
| SV-D04 | Compact strip | Compact scope clarification | Yes | None |
| SV-D05 | One plain line per card; caveats left to the service pages; SEO's 12-month horizon kept as a short note | Not mentioned | Yes, as in G0 | **Open.** This drops the live Google Ads fee note and the AI search "nobody can guarantee it" line from this page. Both stay on the service pages. |
| SV-D06 | "Book a call" in the **hero and** the close | Secondary booking CTA named **in the close** only | Applied in both, as in G0 and `/how-it-works` | **Minor discrepancy.** Easy to drop from the hero if you prefer. |
| SV-D07 | 150 ms on this page; 1.5 s journey steps | Same | Yes. Sequence entrances stay at 400 ms, as on the released pages. | Differs from the 200 ms approved for `/conversion-optimization` (DEC-056). Page-specific, as intended. |
| SV-D08 | Lead generation wording in line with DEC-057 | "No implied lead qualification" | "Ad campaigns that send enquiries straight to your own form, CRM or WhatsApp." | None |

**One correction to G0.** G0 §5 estimated 300 to 350 visible words. The mockup has **502** (live: 563). The difference is the journey's illustration text (about 35 words) and the new "What happens next" row. The page is shorter on desktop. It is about the same length on a phone (see §4).

## 2. Design choices
- **The Route is the one visual idea.** A single path with three equal stations, Capture, Convert and Measure. The H1 names them in customer words: Get found, Get enquiries, See what's working. The route appears three times:
  - the hero draws it still, from "Someone needs what you sell";
  - the selector lights up the part the visitor picks;
  - section 3 plays it once for one example enquiry.
- **Hero:** a compact two-column layout, with the CTA at 532 px on a 1440×900 screen. The route stands beside the headline, one station per line. The old plate of non-clickable service chips is gone, so there are no fake buttons.
- **Where to start:**
  - Three native `aria-pressed` buttons. Choosing one marks its group "Start here" with a tangerine rule and shadow, and a status line links to it.
  - Nothing is hidden or dimmed. All six service cards stay visible, and every link is a plain `<a>` in the HTML.
  - Each service appears once on the page body (the header and footer menus are unchanged).
  - Measure is not a seventh card. It is an ink panel: "Part of every service, not sold separately."
- **One enquiry, start to finish:**
  - Step 1 is on screen from the start, then one step every 1.5 s (measured: 1,501 ms). It plays once.
  - The numbers become buttons, so visitors can jump to a step.
  - The illustrations are a search result, a message bubble and a report row with a hatched "can't be tracked" line. They contain no form fields and no figures, and are labelled "Illustrative example. Not a real client."
- **Scope strip:** three ruled columns. The six exclusions use the live wording, shown as dashed tags.
- **Close:**
  - Full-bleed tangerine, with Contact as the primary action and Book a call as the secondary one.
  - "What happens next" uses only confirmed facts (DEC-051 item 5): reply by email or WhatsApp, a call, then a plan; nothing starts without the client's yes.
- **Claims:**
  - no figures, guarantees or "qualified";
  - "where tracking allows" on the measurement step;
  - the monthly report is mentioned, a review call is not (HW-D01, DEC-057).
- **Kept unchanged:**
  - the breadcrumb ("What we do");
  - every in-body destination (`/contact`, `/schedule-call`, the six services, `/how-it-works`, `/pricing`);
  - the existing CTA text "Tell us what you're trying to fix".
- **Heading ids for E6:** `sv-h1`, `sv-h-pick`, `sv-h-jr`, `sv-h-scope`, `b-close-h`. No analytics hooks were added.

## 3. Checks run (Chromium, headless, plus the in-app browser)
- **No horizontal overflow** at 1440, 820, 390 or 320 px.
- **All six service links are visible and clickable** with JavaScript and without it.
- **No long dashes** in the rendered copy.
- **No console errors.**
- **Selector behaviour:** single choice; pressing the same button again clears the choice; the status line and its link are correct.
- **Step buttons:** each shows its step and sets `aria-current`.
- **Tab order** runs: hero CTAs → three problems → "Not sure?" → six cards → report link → steps 1 to 3 → pricing → close CTAs.
- **Reduced motion** shows the journey complete.
- **Without JavaScript**, the selector is absent, and each group shows its problem line ("When not enough people find you.") so the page still reads as problem → services.
- **Not done:** screen-reader, Safari, Firefox and real-device testing. Contrast uses the existing site tokens and was not measured separately.

## 4. Page at a glance
| | Live | G1 |
|---|---|---|
| Words in `<main>` | 563 | 494 |
| Height, desktop 1440 | 5,390 px | 5,070 px |
| Height, tablet 820 | 5,466 px | 5,651 px |
| Height, phone 390 | 7,133 px | 6,942 px |

The phone version is now slightly shorter than the live page. The tablet version is longer, because the hero stacks and the journey runs vertically. The owner accepted the current length (2026-10-18).

## 5. Next
G1 approved by the owner on 2026-10-18 ("Approved: the final G1 visual design for /services. Stop here; G2 not yet authorised."). Next step, when authorised: G2 implementation, with the `DECISION_LOG.md` entry appended on the G2 branch.
