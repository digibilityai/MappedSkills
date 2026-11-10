# R4 acceptance corrections: evidence (DEC-125)

Branch `fix/r4-acceptance-corrections` from `main` `cffb441`, 2026-11-11. "Before" is the live site (`cffb441`); "after" is a
local production build of this branch (`npm run build`, `next start`). Chromium (Playwright), axe-core from the repository.

| File | What it shows |
|---|---|
| `menu-open-{360,390,768}-{before,after}.png` | F-03: mobile menu open. Before, logo and toggle move inward; after, both stay where they were with the menu closed. |
| `legacy-fixture-{before,after}-390.png` | F-04 and F-05: the legacy case-study rich-text renderer, server-rendered with a link and a wide table and placed inside the built site's CSS. |
| `validation-results.json` | Raw output: axe (live and local), menu positions and keyboard checks at 360, 390 and 768, metadata comparison, pricing text counts. |

## Results

- **F-03 (menu, `/`):** logo x and toggle x, closed and then open. Live: 360 `16/300` to `87/229`; 390 `16/330` to `102/244`; 768 logo `31` to `227`.
  Branch: 360 and 390 unchanged; 768 logo unchanged and the toggle's right edge unchanged (737 to 738 px). The toggle's visible label
  changes from "Menu" to "Close menu" at 600 px and wider, so the pill grows leftwards. `aria-expanded` true then false, Escape closes
  and returns focus to the toggle, the first menu link is focused on open, and the menu scrolls inside the header at 360 x 560,
  390 x 600 and 768 x 600 without moving the bar.
- **F-04 and F-05 (legacy template fixture):** before, axe `link-in-text-block` 1 and `scrollable-region-focusable` 1; after, both
  pass. The link is underlined; Tab reaches the region "Table, scrolls sideways"; ArrowRight scrolls it (0 to 144 px); the focus
  ring is 3 px solid.
- **F-06 (`/services`):** live axe `color-contrast` flags `.x3-measure > b` (`#D94400`, 4.33:1); the branch no longer flags it (`#A83400`, 6.55:1).
- **Pricing (`/pricing`, `/seo`):** "within 30 days of audit completion" once on each page, "within 90 days" nowhere; GST, six-month
  minimum, cash condition and every price count identical to live.

## Limitations

- No Contentful credentials locally, so the branch build has no CMS pages. `/portfolio/google-ads-for-online-courses` renders on
  live (and in the local preview data) with the new case-study template, which has neither of the F-04 or F-05 elements; the legacy
  template was therefore checked with a fixture, not with live CMS content.
- Metadata: titles, descriptions, robots and JSON-LD types match live on `/`, `/services`, `/pricing`, `/seo`, `/google-ads` and
  `/social-media-ads`. Canonical and Open Graph hosts differ only because the local build has no production site URL. The sitemap
  differs only by CMS routes. No metadata, route, redirect, sitemap or analytics file is in the diff.
- `/services` still has three pre-existing `color-contrast` nodes (the "Explore" text actions in the decision section). Not in R4 scope.
- Not run: real devices, Safari, Firefox, screen readers.
