# F2 and F3 release fixes: evidence

Base: 43c3c797e3db40b71f0aa703292649d84bc663fa. Production build, loopback only, nothing submitted.

## F2 (/ai-seo overflow, 768 to 844px)

Cause: the third reporting card's `.ax-mini` was a grid with an implicit auto column, and `.ax-trk` cells were `nowrap`. The table's minimum width (about 276px) exceeded the card content width (218 to 241px between 768 and 844px).

Fix (`components/cplus/ai-seo/ai-seo.css`): `grid-template-columns: minmax(0, 1fr)` on `.ax-mini`, plus one rule for 768 to 1023px that lets cells wrap and reuses the tighter header spacing, cell padding and card padding already used at 767px and below. Desktop (1024px and up) and stacked (767px and below) rules are untouched.

| Viewport | Page overflow before | after | Table right edge past card edge before | after |
|---|---|---|---|---|
| 768 | 27px | 0 | 58px | 0 |
| 800 | 16px | 0 | 48px | 0 |
| 820 | 9px | 0 | 42px | 0 |
| 844 | 1px | 0 | 35px | 0 |
| 845 | 0 | 0 | 34px | 0 |
| 900 | 0 | 0 | 17px | 0 |
| 360, 390, 767, 1024, 1280, 1440 | 0 | 0 | 0 | 0 |

After the fix the table also stays inside the card's padded content box at every width (checked in the e2e script).

Screenshots: f2-768.png, f2-820.png, f2-845.png, f2-1024.png.

## F3 (mobile menu focus)

Cause: `SiteHeader` opened the menu in page flow with no focus handling, so focus stayed on the trigger and Tab after the last item (the email link) went on to page content.

Fix (`components/direction-c/SiteHeader.tsx`): on open, focus moves to the first menu control and `#main` and the page footer become `inert`; a Tab handler on the header wraps Tab and Shift+Tab; inert is cleared on close. Escape still closes and returns focus to the Menu button (existing). Link selection closes the menu and does not move focus.

Before (390px): opening left focus on the trigger; Tab after the email link landed on "Discuss Your Advertising" in page content.

After (390px), forward: Services > Who We Help > Our Work > How We Work > About > Discuss Your Advertising > Request a call > email > logo > Menu trigger.
After (390px), reverse from the trigger: logo > email > Request a call > Discuss Your Advertising > About > How We Work > Our Work > Who We Help > Services.

Screenshot: menu-open-390.png.

## Checks run

- `tests/e2e/release-f2-f3.e2e.cjs`: 105 of 105 pass (F2 at 12 widths; F3 at 360, 390, 768 and 1024px, resize across the breakpoint, consent banner at 360, 390 and 768px, no console errors).
- `npm test`: 678 pass, 0 fail, 1 skipped (includes `tests/release-f2-f3.test.cjs` and the Footer Variant A test).
- `npx tsc --noEmit`: clean. `npm run lint`: 0 errors (14 existing warnings). `npm run build`: passed.

## F3 follow-up: consent banner while the menu is open

Finding (independent acceptance): with a fresh consent state the banner is visible but Tab never reached it while the menu was open, because the trap covered only the header and the banner precedes the header in the document.

Fix (`SiteHeader.tsx`): the Tab boundary is now the consent banner (when present) plus the header, handled by one document-level keydown listener while the menu is open; the header `onKeyDown` handler is removed. The banner stays non-inert, as its own component documents. If a consent choice removes the banner and the focused button, focus moves to the first menu control. `ConsentBanner`, consent wording, defaults, analytics and GTM are untouched.

Fresh state, 360/390/768px, forward from the open menu: Services > Who We Help > Our Work > How We Work > About > Discuss Your Advertising > Request a call > email > Privacy Policy > Accept analytics > Reject analytics > logo > Close menu > Services. Reverse mirrors it. With consent already accepted or rejected the sequence is exactly the earlier one (no banner).

Matrix run against a production build (360, 390 and 768px; fresh at 900 and 700px viewport height, accepted, rejected): 159 of 159 checks. Covered Tab and Shift+Tab, Accept and Reject by keyboard and Reject by mouse (stored value, banner removed, menu still open and inert behind, focus on Services, trap then identical to the no-banner sequence), Escape, Close menu, both disclosures expanded and collapsed, no focus in main, footer or hidden controls, no console errors. Chrome's "preloaded but not used" resource hint warning appears on any plain page reload and is unrelated to the menu.

F2 files are unchanged in this commit; the F2 e2e checks (12 widths) still pass.
