# Forms — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED

> **Visual treatment only.** The approved `/contact` architecture, field set, form and booking
> specification, lifecycle states and the analytics/privacy contract are approved (`DEC-011`,
> `DEC-016`) and are **not reopened**. **No field is added, removed or renamed here. No budget
> field is introduced. No backend is implemented.**

---

## 1. The principle

> **A form is the place the whole site has been travelling toward. It must be the easiest thing on
> the page, and it must not be where the design shows off.**

**THE ARRIVAL's motion language does not apply to forms.** No signals, no field, no capture line, no
transformation. The only motion is **feedback**: focus, validation, submission. This is deliberate —
the visual system earns attention everywhere else so the form can be plain.

---

## 2. Visual treatment

| Element | Treatment |
|---|---|
| **Surface** | The form sits on a **raised surface** so it is visibly a distinct place to act |
| **Label** | Interface 600, `text-primary`, **above** the field. Never a placeholder-as-label |
| **Hint** | Interface 400, `text-secondary`, beneath the label and above the field |
| **Input / textarea** | Ground-coloured fill, **1px `border-control` outline**, 2px radius, `text-primary`, min-height 52px. Textarea min ~5 rows |
| **Placeholder** | `text-tertiary`, and **never carries information the label does not** |
| **Required** | The word **"required"** in the label row, in `text-secondary`. **Never an asterisk alone**, never colour alone |
| **Optional** | Marked explicitly where most fields are required, so nothing is ambiguous |
| **Focus** | Border → `commercial-accent` **plus** the sitewide 3px amber ring at 3px offset |
| **Error** | Border → `commercial-accent`; the message **in words**, in `text-primary`, directly beneath the field, with an amber left rule. **Never red, never colour alone, never an icon alone** |
| **Success** | A stated sentence on a raised surface. **No confetti, no animation, no signal language** |
| **Consent** | A real checkbox with a full-sentence label at body size. **Never pre-ticked, never smaller than body text, never collapsed behind a link** |
| **Submit** | The **primary action**, full width at NARROW |
| **Loading** | The button label changes to a stated word and the control is disabled with `aria-busy`. **No spinner theatre, no progress animation** |

### 2.1 Why error is amber and not red
The system has **no red and no green** (`02` §5). Colour never grades anything. An error is
communicated by **the words, the position and the rule** — the amber border marks *"this field
needs you"*, which is a state, not a judgement. **The message must be complete without colour.**

---

## 3. Lifecycle states

The approved lifecycle is unchanged; this is only how each state looks.

| State | Visual |
|---|---|
| **Empty** | Labels, hints and fields at rest on the raised surface |
| **Focused** | Amber border + focus ring on the active field only |
| **Filled** | `text-primary` value; no visual celebration |
| **Invalid** | Amber border, worded message below, focus moved to the first invalid field, and an error summary above the form linking to each |
| **Submitting** | Submit disabled, `aria-busy`, label states what is happening |
| **Succeeded** | The approved `/thank-you` state. **A real post-conversion page, not a toast** |
| **Failed** | A stated sentence with the direct-contact route offered as an alternative. **The failure is never silent** |

---

## 4. Binding requirements

1. **Every field has a persistent visible label.** No placeholder-only fields.
2. **Errors are announced**, associated with their field (`aria-describedby`), and reachable by
   keyboard.
3. **No validation on keystroke.** Validate on blur and on submit.
4. **Target sizes ≥ 44px**, with real spacing between adjacent controls.
5. **The form works without JavaScript** to the extent the approved architecture allows; client
   validation is an enhancement, never the only validation.
6. **Nothing in the form depends on motion.**
7. **No evidence apparatus inside or adjacent to a conversion region** — carried unchanged.
8. **Direct contact is offered as a peer**, at equal weight, wherever the approved CTA architecture
   places it. Never as a smaller "or call us".

---

## 5. What is deliberately absent

Multi-step wizards · progress bars · inline "smart" suggestions · address autocomplete · a budget
field · a "how did you hear about us?" field · social sign-in · captchas visible to the user ·
countdown timers · any urgency device · any field the approved architecture does not specify.
