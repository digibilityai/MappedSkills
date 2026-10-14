import localFont from 'next/font/local';

/**
 * UI REVAMP GATE 2 — Direction C display face.
 *
 * Direction C sets its display roles at Bricolage's optical size 96 (hero) and
 * 72 (statement). The site-wide instance in `app/layout.tsx` is loaded with the
 * weight axis only, so `font-variation-settings: "opsz" …` does nothing there —
 * VERIFIED in the running app: the same line measures identically at opsz 12
 * and opsz 96. (The Gate 1 document's "optical size axis already available"
 * is therefore not accurate for production.)
 *
 * Changing the site-wide instance would change the font file, and with
 * `font-optical-sizing: auto` the rendering, of every legacy route. Gate 2 may
 * not do that, so this second instance carries the `opsz` axis and is
 * referenced ONLY by the Direction C page wrapper (`DcPage`), so it is
 * declared and preloaded only for the Direction C routes. Its byte cost is
 * reported in the Gate 2 handoff.
 *
 * GATE 3 R2 — WHY next/font/local, AND WHY A DISTINCT FAMILY NAME.
 * Gate 2 loaded this face with next/font/google, which names it "Bricolage
 * Grotesque" — the SAME family name as the site instance. Declared later, it
 * shadowed the site face on the Direction C routes, and while it was still
 * downloading Chrome painted the display text in the already-loaded site face
 * at its default optical size, which is much wider than opsz 96 / 72: on a slow
 * connection the homepage H1 set on three lines and collapsed to two when this
 * face arrived (CLS 0.158 at 1440). No fallback can engage while a same-named
 * face is available, so this instance now has its own family (next/font/local
 * names it after the variable), and each display role names a fallback that
 * wraps like the final face (`DC Display 96/72 Fallback`, app/direction-c.css).
 *
 * THE FILE is byte-identical to the one Google Fonts served for the Gate 2
 * build (Bricolage Grotesque, latin subset, axes opsz 12–96 and wght 200–800;
 * sha256 85f55a58…c377447), self-hosted as next/font already did. Licence:
 * SIL OFL 1.1, ./fonts/OFL.txt. The unicode-range is Google's latin range, so
 * anything outside it falls through to the site face as before.
 */
export const dcDisplay = localFont({
  src: './fonts/BricolageGrotesque-opsz-wght-latin.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  /* No automatic fallback: next/font would size Arial for this file's DEFAULT
     optical size (the same too-wide metrics). The roles name their own. */
  adjustFontFallback: false,
  /* Preloaded (the default). next/font scopes the preload to the routes that
     use this module. MEASURED: without it the opsz file arrives after first
     paint and the homepage H1 reflows (CLS 0.148 at 1440). A legacy route can
     still fetch it, but only through Next.js's own <Link> prefetch of /,
     /services or /seo — the same mechanism that already prefetches those
     routes' payloads — never because the legacy page references it. */
  variable: '--font-dc-display',
});
