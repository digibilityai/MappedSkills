# Direction C — THE TRACE — Session 15B — PROPOSED

**Prototype:** `prototype/c-trace.html` · **Date:** 2026-09-02 · **Status: PROPOSED, not approved.**
**Register:** unexpected · distinctive · memorable — and a deliberate creative risk.

---

## 1. Core idea

> ### **The site instruments this visit and shows the reader the record it kept — including, explicitly, everything it could not see. The product is demonstrated on the reader instead of described to them.**

A trace line draws itself down the left edge as the reader scrolls. A live record fills on the
right, event by event, in the apparatus register. At the *measure* moment the page replays the
visit back as an enquiry chain — with the reader's own missing source segment drawn dashed.

## 2. Why it belongs to MappedSkills

No other direction can say this: **the entire approved proposition is performed rather than
asserted.**

- *"The measurement that shows where each enquiry came from"* — the page shows where **you** came
  from, or admits it cannot.
- *"We record those as unattributed rather than assigning them to a channel"* — most readers arrive
  with no referrer, so the page's very first recorded line is *"arrived — with no usable trail"*,
  drawn with a dashed rule. **The firm's most awkward honesty commitment is the first thing the
  site does, to the reader, about the reader.**
- *"What we are accountable for, and where that stops"* — the replayed chain **visibly stops** at
  the qualified enquiry, and the stretch beyond it is dashed and labelled as the client's own
  system.

## 3. What makes it memorable

A visitor is told something true and slightly uncomfortable about their own visit, by the site,
within four seconds — and then told, in the same breath, exactly what it could not learn. It is the
kind of thing a founder repeats to a colleague.

## 4. How it communicates marketing capability

It is the only one of the three that is **also a working demonstration of the service**. Anyone can
say they instrument the chain. This runs the instrument, on the person evaluating it, and then
publishes its own limits.

## 5. CAPTURE → CONVERT → MEASURE, visually

**Three zones of one continuous trace, each answering what the instrument can and cannot see.**

| Zone | Treatment |
|---|---|
| **01 capture** | Four statements split into **recorded** (solid rule) and **not measured** (dashed rule): that you arrived · where you came from · whether you are a buyer · what you searched. The second cell **rewrites itself** depending on whether a referrer exists |
| **02 convert** | Prose, but the reader has been watching the record fill while reading it, so *"this page is observing yours right now"* is verifiable by glancing right |
| **03 measure** | **The replay.** The visit rendered as the approved enquiry chain: discovery and source (dashed if unattributed) → landing → interaction → the enquiry (dashed: not sent, because nothing here is wired) → the qualified enquiry → opportunity and revenue (dashed: the client's system) |

## 6. How THE RECORD appears without dominating

This direction **inverts the Session 15 mistake precisely**: the apparatus is present continuously,
but it is confined to a 300px rail and drawn as **live behaviour**, so it never sets the page's
typographic genre. The main column is black display type, a yellow highlighter and generous space.

The published AI-visibility evidence is a **node on the trace**: it opens in place, on the line,
with its provenance rows, its limitation and its two status marks.

**Privacy is the load-bearing detail, and it is true of the file:** no network request, no cookie,
no `localStorage`, no identifier, no third-party script. The rail says so, and invites the reader
to check the network tab. **If this direction is chosen, that statement must remain literally true
in production or the direction must be abandoned — a measurement site caught being coy about its
own measurement would be fatal.**

## 7. Motion language

Quiet, continuous, and entirely driven by the reader.

| Kind | Behaviour |
|---|---|
| **The trace** | An SVG stroke-dashoffset tied to scroll progress — the line is literally drawn by reading |
| **Pips** | Each recorded event drops a yellow marker onto the trace at the scroll position it happened |
| **The record** | Log rows fade and rise in as they are appended; the oldest scroll out |
| **The highlighter** | A yellow mark is drawn behind a word over 700ms, once |
| **The replay** | Chain nodes pop in 90ms apart when the section is reached |

No parallax, no scroll hijack, no scrubbing, no cursor effects.

## 8. Interaction language

**The reader's ordinary behaviour is the interaction.** Scrolling, hovering an action and opening
the evidence node are all recorded and reflected back. There is one conventional control — the
evidence node — and nothing is required.

## 9. Mobile transformation

The most substantial transformation of the three, and it is a genuine redesign rather than a
stack. At ≤1079px the record **leaves the column and becomes a fixed live strip along the bottom
of the screen**, showing the running count and the three most recent events, with the privacy note
under it. The reader watches it fill while they read. The trace narrows to a 22px gutter; the
replay chain stays full width. **Measured: no horizontal overflow at 390px.**

## 10. Primary risk

> **It can read as surveillance rather than as honesty, and it puts the visitor at the centre of a page that is supposed to be about the buyer's commercial problem.**

Two specific failure modes:

1. **Creepiness.** *"We are watching you"* is one tone away from *"we are watching you"*. The
   prototype answers it with the strongest possible disclosure, in the same panel, permanently
   — but tone here is not a detail, it is the whole risk.
2. **Cleverness over selling.** The concept is about measurement, which Session 04 found is a
   *proof principle, not a proposition* — a business owner looking for enquiries does not have a
   methodology problem. **If the trace ever out-competes the commercial argument for attention,
   this direction has failed on its own terms.** The prototype keeps the H1 and the two actions
   above everything, but that balance is not proven.

**Third risk, practical:** the replay's honesty depends on the referrer, which is absent for most
real arrivals. That is *good* — it is the honest case — but it means the memorable moment will
usually be the negative one, and that has to be worth having.
