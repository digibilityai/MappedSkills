# Meta Ads R2.2: simplified "Why Meta Ads" (local preview, NOT live)

27 October 2026. **Preview:** http://localhost:3412/meta-ads-preview-r22 (R1, R2 and R2.1 kept). Nothing committed, pushed or deployed; no tracked file changed.

## What changed (section 2 only)
Replaced the three-scene composition (sponsored tiles, thought bubbles, six labelled lines, long note) with one headline, one sentence and one thin line with three points.
- Headline (unchanged message): Your next customer may not be searching for you yet.
- Sentence: They may discover something worth exploring while scrolling Facebook or Instagram.
- Thread: Discover (An ad catches their interest.), Explore (They learn more about the offer.), Act (They enquire or buy when ready.). Dots on the line (grey, ink, tangerine), no cards, borders, icons, imagery or motion.
- Caveat in small text: Illustrative possibilities, not a guaranteed sequence.
- Words in the section: about 40, down from about 120. Mobile: the thread turns vertical.
- Not repeated: the detailed journey (later section) is untouched.

| | R2.1 | R2.2 |
|---|---|---|
| Section height 1440 / 390 | 952 / 1790 | 637 / 580 |

## Preserved (tested)
Every other section renders identically to R2.1 (HTML compared before and after the section, content objects deep-equal). R2.1 scroll fix and the homepage client images remain; page still loads at scroll 0.

## QA (run, Chromium)
- 320, 360, 390, 768, 1024, 1440: load scroll position 0; no horizontal overflow; section width equals the other sections; one H1.
- Interactions at every width: tab End key selects the last tab with no page movement; FAQ opens.
- Console: no errors at any width. At 320 to 768 Chromium logged two font-preload warnings ("preloaded but not used within a few seconds") on the shared site font links, which also appear on `/pricing` and come from the site layout, not this section. None at 1024 and 1440.
- Tests: `npm test` below; 4 new tests. TypeScript and ESLint clean.
- Not done: production build, Safari/Firefox, real devices, screen reader.

## Screenshots (`docs/meta-ads-r22/screenshots/`)
`before-r21-why-{390,1440}.png`, `after-why-{320,360,390,768,1024,1440}.png`, `meta-ads-r22-{390,1440}-full.png` (settled state, reduced motion).

## Files and reversal
New: `components/meta-ads-r22/`, `app/meta-ads-preview-r22/page.tsx`, `tests/meta-ads-r22-preview.test.cjs`, `docs/meta-ads-r22/`.
```
rm -rf components/meta-ads-r22 app/meta-ads-preview-r22 tests/meta-ads-r22-preview.test.cjs docs/meta-ads-r22
```
