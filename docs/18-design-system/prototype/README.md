# Session 15 prototype — complete homepage — THE RECORD / Direction 2

**PROPOSED. NOT APPROVED. NOT PRODUCTION.**

## How to look at it

Open **`index.html`** for a contact sheet showing WIDE and NARROW side by side, or open
**`homepage.html`** directly and resize the window.

Any static server works, for example from this directory:

```bash
python3 -m http.server 8781
```

then open `http://localhost:8781/index.html`.

Opening `homepage.html` from the filesystem also works. With no network the two web fonts fall
back to system faces and **every structural claim in the design still holds** — the type scale, the
grid, the rules, the budgets and the register distinction are all unaffected.

## What is here

| File | What it is |
|---|---|
| `homepage.html` | **The deliverable.** The complete approved homepage, blocks 1–8 plus header and footer, responsive from 320px up. No validation chrome, so measured bands are the bands a reader experiences |
| `foundation.css` | The Session 15 design-system foundation. Documented inline; the prose version is `../01_DESIGN_SYSTEM_FOUNDATION.md` |
| `index.html` | A contact sheet. Presentation only — **not part of the visual language.** The WIDE frame is scaled to 50% to fit, so judge type size in the full-size page |

## Isolation

This prototype is **self-contained and imported by nothing**. It shares no build, no stylesheet and
no component with the production application. Nothing in `app/`, `components/`, `styles/`, `hooks/`,
`lib/`, `public/`, `scripts/` or any config file was read for it or changed by it.

**Copying `foundation.css` into `styles/` is a production migration and requires its own approved
decision. Session 15 did not authorise one.**

## What is deliberately not drawn

Six slots are owner-blocked or technically blocked and **nothing stands in for any of them** — no
container, no heading, no dotted outline, no placeholder. The list is in the HTML's opening comment
and in `../02_HOMEPAGE_DESIGN_RATIONALE.md` §2.

## Relationship to Session 14

`../../17-visual-validation/prototype/` is unmodified. Its stylesheet remains the Session 14/14A
validation artefact; `foundation.css` is a separate file that carries its validated tokens forward
and adds what a complete page needed.
