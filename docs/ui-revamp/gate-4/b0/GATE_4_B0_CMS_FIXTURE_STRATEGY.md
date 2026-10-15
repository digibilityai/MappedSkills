# Gate 4 · B0 — CMS Fixture Strategy

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Files** | `docs/ui-revamp/gate-4/qa/cms-fixtures/` — `fixtures.cjs` (data), `preload.cjs` (fetch interception), `serve-fixture.cjs` (server wrapper) |
| **Application changes** | **None.** No file under `app/`, `components/`, `lib/` or `next.config.mjs` was touched |
| **Credentials** | **None used and none added.** `.env.local` has empty Contentful variables (names checked, values not printed). The fixture run sets the placeholder value `fixture`, which is not a credential and reaches no Contentful service |

## 1. Contentful data dependencies (VERIFIED from `lib/contentful/*`)

| Template | Queries (operation names) | Mapping path | Withholding |
|---|---|---|---|
| `/blog` | `GetAllPosts` | `posts.ts` → `mapContentfulPostToCms` → card | — |
| `/blog/[slug]` | `GetPostSlugs` (build-time params), `GetPostBySlug`, `GetRelatedPosts` (or `GetAllPosts` without a category) | `mapContentfulPostToCms` (TOC from h2/h3, reading time, CTA type from category, OG image) → `RichTextContent` | — |
| `/work` | `GetAllCaseStudies` | `case-studies.ts` → `getCaseStudyListCards` (result line blanked for withheld slugs) | `lib/case-study-proof.ts` |
| `/portfolio/[slug]` | `GetCaseStudySlugs`, `GetCaseStudyBySlug` (`slug_in` with and without the `portfolio/` prefix) | `mapContentfulCaseStudyToCms` → `parseCaseStudyContent` (h2/h3/h4 sections, metric tables) → page | `isCaseStudyProofWithheld` hides results, before/after, testimonial and rating |
| `/research`, `/research/[slug]`, `/press`, `/press/[slug]` | the research/press queries in `queries.ts` | `research.ts`, `press.ts` | — |

**Transport.** `lib/contentful/client.ts` sends a single `POST https://graphql.contentful.com/content/v1/spaces/{space}/environments/{env}`
when both `CONTENTFUL_SPACE_ID` and a token are non-empty. Otherwise it returns `null`, and every helper fails soft to `[]`.

## 2. Mechanism — real interfaces, real rendering path

1. `preload.cjs` is loaded with `NODE_OPTIONS=--require …` into **both** `next build` and `next start` of a **scratch copy**
   of the commit. It replaces `globalThis.fetch` before Next.js wraps it.
2. It answers exactly two hosts:
   - `graphql.contentful.com`: by GraphQL operation name, from `fixtures.cjs`;
   - `images.ctfassets.net`: with a 1×1 PNG.

   Every other request passes through unchanged.
3. Everything from there on is the application's own code: the client builds the real query, the real mappers parse the
   response, `generateStaticParams` prerenders the fixture slugs, and the real page and components render them.
4. In the browser, the harness context also fulfils `images.ctfassets.net` locally and blocks every other non-local request.

The build log confirms the real path ran: 18 fixture GraphQL calls; `/blog/fixture-article-full-structure`,
`/blog/fixture-article-minimal`, `/portfolio/fixture-case-study-open` and `/portfolio/google-ads-for-online-courses` prerendered
as SSG pages.

## 3. The fixtures (synthetic — not production content)

| Fixture | Purpose | Exercises |
|---|---|---|
| Post "FIXTURE — Article exercising every rich-text node" | Maximal structure | h2, h3, paragraph marks (bold, italic, code), internal and external hyperlinks, both list types, quote, hr, **table**, embedded asset, featured image, author with profile image, category → related posts, SEO title |
| Post "FIXTURE — Minimal article (fallback paths)" | Fallbacks | No author, no featured image, no SEO title, one paragraph |
| Case "FIXTURE — Case study, proof not withheld" (`fixture-case-study-open`) | **Positive control** | Every parsed section (problem, goals, challenges, strategy, services, tools, results table, before/after), review. Its sentinels **must** render |
| Case on slug `portfolio/google-ads-for-online-courses` | **Withholding control** | A slug that `lib/case-study-proof.ts` withholds, with the `portfolio/` prefix, so slug normalisation is also tested. Title and body are synthetic and labelled "FIXTURE"; nothing is the real entry's content. Its sentinels (`FIXTURE-WITHHELD-…`) **must not** appear in the DOM or the served HTML (including the inline RSC payload) |

Every string is labelled "FIXTURE". No figure is a client result. No real article or case study is reproduced or paraphrased.

**Result (VERIFIED, baseline run):**
- withheld sentinels found in the served HTML or DOM of the withheld fixture: **none**;
- the open fixture shows both open sentinels (metric and testimonial);
- `/work` (fixture) lists both studies.

## 4. Coverage — what is and is not proven

| Template | Plain build (no credentials) | Fixture build | Still needs live Contentful |
|---|---|---|---|
| `/blog` | Real empty state | Listing of 2 fixture posts | Real post set, ordering, images |
| `/blog/[slug]` | Unknown slug → 404 (real) | Full and minimal articles render through the real path | Real rich-text variety (embedded **entries**, unusual marks), real image dimensions, real related-post sets, live `Article`/`FAQPage` JSON-LD values |
| `/work` | Real empty state | Listing of 2 fixture studies (withheld result line blank) | Real three studies; **X10** (Ameba copy names "TechWave Solutions") |
| `/portfolio/[slug]` | Unknown slug → 404 (real) | Open and withheld paths render; withholding proven | The three real entries (all on withheld slugs) |
| `/research`, `/press` | Real empty states | Empty (not fixtured) | Everything |
| `/research/[slug]`, `/press/[slug]` | Unknown slug → 404 only | **Not covered** | **Everything**, including the research **category** variant, `ResearchReport` and `NewsArticle` JSON-LD, `CopyActions`, downloads. `/press/[slug]` has **0 production entries** |

**Fixture-based results are labelled `cms: fixture`** in every result file and report. **An empty CMS page is never counted
as proof of rendering.**

## 5. Recommended next steps (owner decisions, not done)

1. **Before B7 (editorial batch):** either provide a **read-only Contentful delivery token** for local QA builds, held outside the
   repository (for example, exported in the shell that runs the build), or approve extending `fixtures.cjs` with research, press and category
   entries. Without one of these, B7 cannot verify `/research/[slug]` or `/press/[slug]`.
2. **Before B8/B9:** one credentialed comparison run of `/blog/[slug]` and `/portfolio/[slug]` against the real entries. The fixtures
   prove the rendering path; they do not prove real content renders well.
3. Note `X6`: if `CONTENTFUL_PREVIEW_ACCESS_TOKEN` is ever present, the client switches to **preview** (drafts). QA must not use a preview token
   unless that is the intent.

## 6. How to run it (also in `QA_REGRESSION_RUNBOOK.md` §5)

Run from the repository root; `<scratch>` is any empty directory outside the repository.

```bash
R="$PWD"; mkdir -p <scratch>/fixture
git archive <commit> -- . ':!docs' | tar -x -C <scratch>/fixture
ln -s "$R/node_modules" <scratch>/fixture/node_modules
cp .env.local <scratch>/fixture/
(cd <scratch>/fixture && CONTENTFUL_SPACE_ID=fixture CONTENTFUL_ACCESS_TOKEN=fixture NODE_OPTIONS="--require $R/docs/ui-revamp/gate-4/qa/cms-fixtures/preload.cjs" npm run build)
node docs/ui-revamp/gate-4/qa/cms-fixtures/serve-fixture.cjs <scratch>/fixture 3520
```
