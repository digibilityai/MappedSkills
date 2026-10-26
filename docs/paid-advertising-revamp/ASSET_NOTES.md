# Homepage image asset notes (internal — not shown on the page)

Updated 26 October 2026, homepage revision 1.

| File | What it is | Provenance | Status |
|---|---|---|---|
| `public/images/paid-advertising/campaign-journeys.webp` | Original three-panel image (1536×1024) | AI-generated illustrative image prepared in the ChatGPT environment (handoff 26 Oct 2026). Not a photograph of any client or campaign. | Source file kept locally only; NOT committed or published (it is not rendered; the three tiles below are) |
| `tile-apparel.webp`, `tile-baking.webp`, `tile-property.webp` | The three panels cut to 512×1024 with `sharp` | Derived from the file above | In use for hero tiles, audience cards and work cards |

## Replacement images still required (owner feedback, 26 Oct 2026)

No image-generation or licensed-stock tool is available in the Claude Code workspace, so these are NOT yet supplied:

1. **D2C brands** — clear men's apparel image with recognisable products (currently the folded-sweater tile).
2. **Education, training and coaches** — several educators/coaches in a learning or workshop setting (currently the cake tile). Must not imply they are MappedSkills staff or clients.
3. **Wanderlooms (featured work)** — adventure apparel. Any image must not be presented as Wanderlooms' actual campaign unless supplied by the client with permission (currently the generic sweater tile).
4. Optional: **Meta mockup product image** — currently the generic sweater tile.

Drop replacements into `public/images/paid-advertising/` and change `TILES` / `AUDIENCES` / `WORK` in `components/paid-advertising/home/content.ts`. Generic images must not be described as actual client campaigns.

## Update 26 October 2026 (release preparation)
The two homepage featured-work cards (Wanderlooms, Om Sai Developer) now use original illustrations (`FeaturedArt`), not photographic tiles, so they cannot be mistaken for client imagery. Generic tiles remain only on the hero, the audience cards and the labelled illustrative ad mockups. The tiles are AI-generated illustrative images prepared in the ChatGPT environment; confirm the tool's commercial-use terms before relying on them.
