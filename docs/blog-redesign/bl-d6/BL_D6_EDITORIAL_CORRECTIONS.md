# BL-D6 · Editorial Correction List for Contentful (2026-10-20)

**Status:** list only. **Contentful has not been edited** (owner instruction, 2026-10-20: "Prepare an exact editorial
correction list… Do not edit Contentful yet."). Nothing committed, pushed or deployed.

**Source:** the rich text as served by production on 2026-10-20 (Playwright, `.blog-rich-text` children). "Block" is
the 0-based position of the paragraph/heading/list among the article body's top-level blocks, as rendered; use the
**Find** phrase to locate it in the Contentful rich-text editor.

**Scope rules applied (owner direction 7):** titles, H1s, slugs, SEO titles and meta descriptions of the Pune
articles are **not** in this list — they are held pending Search Console evidence (see §3). Body corrections inside
the Pune articles are included, because they fix internal notes, booking wording and unsupported claims without
retitling, merging or unpublishing.

**Replacement rule:** every replacement removes or softens a claim; none adds a new number, duration, promise,
client name, "free" offer or booking language. Where the owner holds evidence that supports the original claim, the
alternative is "keep, and add the source".

Priority: **Must** = internal note, booking wording (DEC-062 / DEC-051) or an unsupported claim about MappedSkills or
a guarantee · **Should** = unsupported general claim or unverified attribution · **Could** = tone / editorial.
Evidence label for each original statement in brackets.

---

## 1. Corrections by article

### `/blog/seo-company-in-pune`
| ID | Block | Find (current text, exact) | Issue | Proposed replacement | Priority |
|---|---|---|---|---|---|
| SEO-1 | 3 | "If you want SEO that supports business growth instead of vanity metrics, **Book a Client Discovery Call (30 minutes)**." (bold text is a link to `/schedule-call`) | Implies an appointment is booked (DEC-062 item 1); 30-minute duration not confirmed (DEC-051) [UNKNOWN] | "If you want SEO that supports business growth instead of vanity metrics, **request a call** and we'll get in touch to find a time." — keep the link on "request a call" → `/schedule-call` | **Must** |
| SEO-2 | 122 | "Results vary. If you want this page to convert better, add first-party proof like case study summaries, before/after examples, or reporting snapshots." | Internal writer note published to readers [VERIFIED FACT] | "Results vary." (delete the second sentence) | **Must** |
| SEO-3 | 146 | "**Book a Client Discovery Call (30 minutes).**" (link to `/schedule-call`) | As SEO-1 | "**Request a call** and we'll get in touch to find a time." — link on "Request a call" → `/schedule-call` | **Must** |
| SEO-4 | 118 | "Most businesses start seeing meaningful movement in 3 to 6 months, depending on:" | Timeline stated as typical without evidence [RESEARCH REQUIRED] | "How quickly things move depends on:" — or keep and cite first-party evidence | Should |

### `/blog/facebook-advertising-agency-pune`
| ID | Block | Find (current text, exact) | Issue | Proposed replacement | Priority |
|---|---|---|---|---|---|
| FB-1 | 3 | "**Book a Client Discovery Call (30 minutes).**" (bold, **not a link**) | Booking wording (DEC-062, DEC-051) and a dead instruction | "**Request a call** and we'll get in touch to find a time." — add a link on "Request a call" → `/schedule-call` | **Must** |
| FB-2 | 71, 72, 73 | "We also recommend supporting this page over time with:" + numbered list "1. verified performance snapshots … 5. creative examples where possible" + "That will make the page stronger for both conversion and SEO." | Internal writer note published to readers (three consecutive blocks) [VERIFIED FACT] | Delete all three blocks | **Must** |
| FB-3 | 70 | List: "Social Media Ads for OmSaiGroup / Social Media Ads for GEMS Education / Social Media Ads for Mohali Citi Center / Social Media Ads for Advit Prints / Social Media Ads for AnybodyCanBake" (plain text, no links) | Named clients as proof. Only AnybodyCanBake is found on `/work`; the other four are not on the site [RESEARCH REQUIRED: owner to confirm each engagement and permission to name the client] | Keep only clients the owner confirms and is permitted to name; link each to its case study where one exists (AnybodyCanBake → its `/work` entry). If none is confirmed, delete blocks 67–70 (the H2 "Proof Through Relevant Campaign Experience" and its list) | **Must** (owner verification) |
| FB-4 | 125 | "**Book a Client Discovery Call (30 minutes).**" (bold, not a link) | As FB-1 | As FB-1 | **Must** |

### `/blog/content-marketing-services-in-pune`
| ID | Block | Find (current text, exact) | Issue | Proposed replacement | Priority |
|---|---|---|---|---|---|
| CM-1 | 9 | "For instance, Pune's digital advertising spending grew by 15% in 2023 alone." ("digital advertising spending" links to `statista.com/outlook/amo/advertising/india`) | City-level figure linked to a **national** (India) source; figure not verified; dated (2023) [RESEARCH REQUIRED] | Delete the sentence (and its link). Alternative: keep only with a Pune-level source that states the figure | **Must** |
| CM-2 | 64 | "This case demonstrates how effective content marketing services can achieve tangible results." | Refers to a case that the article does not contain [VERIFIED FACT] | Delete the sentence | **Must** |
| CM-3 | 59, 60, 61 | "…which can cost anywhere between ₹5,000 to ₹20,000 per month." / "Rates can range from ₹1,000 to ₹5,000 per article…" / "Costs can range from ₹20,000 to ₹1,00,000 per month…" | Unsourced market price ranges; could be read as MappedSkills pricing [RESEARCH REQUIRED] | Owner choice: keep, introduced as "Typical market ranges vary widely; as a rough guide:" and confirm they are current; **or** delete the figures and keep the qualitative comparison | Should (O) |
| CM-4 | 1 | "Jonathan Perelman" (attribution of the opening quote) | Attribution unsourced [RESEARCH REQUIRED] | Keep if the owner confirms the source; otherwise remove the quote | Could |

### `/blog/building-an-email-list`
| ID | Block | Find (current text, exact) | Issue | Proposed replacement | Priority |
|---|---|---|---|---|---|
| EM-1 | 0 | ""The money is in the list, but the relationship is in the message." - Amit Gupta" | Attribution to the author not verified [RESEARCH REQUIRED] | Owner confirms authorship; otherwise remove the attribution (or the quote) | Should |
| EM-2 | 1 | "…email marketing is still one of the highest ROI channels available, surpassing social media in many ways." | Comparative ROI claim without a source [RESEARCH REQUIRED] | "…email is still one of the most direct ways to stay in touch with people who asked to hear from you." | Should |
| EM-3 | 28 | "Email marketing has consistently shown better conversion rates than many other forms of marketing." | Comparative claim without a source [RESEARCH REQUIRED] | "Because subscribers chose to hear from you, email is often where interested readers take the next step." | Should |

### `/blog/performance-marketing-vs-digital-marketing`
| ID | Block | Find (current text, exact) | Issue | Proposed replacement | Priority |
|---|---|---|---|---|---|
| PM-1 | 42 | "…the performance marketing approach guarantees that you get what you pay for." | Guarantee language [VERIFIED FACT: text] | "…you pay for defined outcomes, such as clicks, leads or sales, so spend is easier to tie to results." | **Must** |
| PM-2 | 23 | "3. Higher ROI: Since you are paying for concrete results, it often provides a better return on investment (ROI)." | General ROI claim without a source | "3. Clearer return: because you pay for defined outcomes, it is easier to see what the spend produced." | Should |
| PM-3 | 0 | "- Seth Godin" (attribution of the opening quote) | Attribution unsourced | Keep if confirmed; otherwise remove | Could |

### `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers`
| ID | Block | Find (current text, exact) | Issue | Proposed replacement | Priority |
|---|---|---|---|---|---|
| RE-1 | 106 | "Setting benchmarks, such as increasing web traffic by 20% in three months or reducing customer acquisition costs by 15%, provides clear targets…" | Specific percentages read as expected results [WORKING HYPOTHESIS at best] | "Setting benchmarks, such as a target for website traffic or for cost per enquiry over a fixed period, provides clear targets…" | Should |
| RE-2 | 0 | "…sells the dream." - Amit Gupta" | Attribution to the author not verified | As EM-1 | Should |
| RE-3 | 7 | "Prepare to take notes—these insights are designed not just to inform, but to deliver results!" | Promotional promise | Delete the sentence | Could |
| RE-4 | 115, 116 | H2 "So why wait?" + "Dive into these tactics with enthusiasm and watch them transform your business, positioning you at the forefront of success in the real estate industry." | Promotional close; adds an empty H2 to the outline | Delete both blocks (the preceding "Embrace Digital Marketing for Real Estate Success" section already concludes) | Could |

### `/blog/importance-of-content-writing`
| ID | Block | Find (current text, exact) | Issue | Proposed replacement | Priority |
|---|---|---|---|---|---|
| CW-1 | 0 | "- Rebecca Lieb" (attribution of the opening quote) | Attribution unsourced | Keep if confirmed; otherwise remove | Could |

No booking wording, internal notes or MappedSkills claims were found in this article. Its career-advice angle
(audit CL3) is an editorial decision, not a correction.

---

## 2. Totals
| Priority | Count | IDs |
|---|---|---|
| **Must** | 10 | SEO-1, SEO-2, SEO-3, FB-1, FB-2, FB-3, FB-4, CM-1, CM-2, PM-1 |
| Should | 8 | SEO-4, CM-3, EM-1, EM-2, EM-3, PM-2, RE-1, RE-2 |
| Could | 5 | CM-4, PM-3, RE-3, RE-4, CW-1 |

FB-3 cannot be actioned until the owner confirms each named client and the permission to name them.

Booking wording: **4 occurrences** — SEO-1, SEO-3 (links), FB-1, FB-4 (plain bold text). Internal notes: **2
articles, 4 blocks** — SEO-2 (1), FB-2 (3).

## 3. Held — not in this list (owner direction 7, pending Search Console evidence)
| Item | Where | Note |
|---|---|---|
| "Best" in the title and H1 | `seo-company-in-pune` (H1 "Best SEO Company in Pune for…", SEO title "Best SEO Company in Pune for Lead-Driven Growth \| MappedSkills") | Superlative claim (audit BD4). Retitling held. |
| City-page framing, slugs, titles, meta descriptions | all three Pune articles | Retain; no unpublishing, merging or retitling. |
| "Pune vs Mumbai agencies" sections, outbound link to fiverr.com | `content-marketing-services-in-pune` | Editorial / positioning (audit BD5); not a factual error. |
| Excerpts / meta descriptions with stock phrasing ("Boost Your Business Now", "MappedSkills gets results") | several | Excerpt = meta description in code; changing it changes the SERP snippet. Hold with the SEO decision. |
| Category taxonomy | all | Audit BL-D6.7, still open. |

## 4. How to apply later (when authorised)
1. Edit in Contentful only; publish each entry individually; no content-model change.
2. After publishing, wait for ISR (60 s) and re-run the BL-D6 probe (`live-probe.json` method): booking wording count 0,
   internal-note phrases 0, `tocBroken` unchanged (the anchor fix is code, not content).
3. Changing body text changes `dateModified` in the Article JSON-LD and the visible "Updated" date; that is expected.
