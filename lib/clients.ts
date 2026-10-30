/**
 * THE CLIENT-LOGO REGISTER (Stage 3B). One list, read by the homepage logo section, the /work cards and the case-study
 * pages. It holds a client's logo file, whether the logo may be shown, and the services that are VERIFIED for that client.
 *
 * DISPLAY. `show` = the founder authorised public display of the supplied logos (2026-10-29: all 31, except a client with a
 * documented restriction), the web copy is in `public/images/clients/` (or an existing approved file), and it may be shown as
 * "a business MappedSkills has worked with". That is a general client relationship only: it is NOT evidence of any service.
 * `blocked` = display is documented as restricted (Vibgyor High: written permission NO). Never show, and its file is never
 * copied into `public/` (anything there is publicly fetchable).
 *
 * SERVICES are listed only where the repository documents the engagement (source in `evidence`). A logo is never taken as
 * proof of a service: the 22 clients below with no `services` entry are clients, not a claim about Google Ads, Meta Ads or SEO. `clientsForService()` returns only `show` clients with that verified service.
 *
 * Originals stay outside the repository (owner's `MappedSkills_Client_Logos_Complete_31.zip`); only the web copies below are
 * committed. Web copies are lossless WebP, the empty margin cropped, longest side capped at 800 px, never upscaled; colours, shapes and
 * proportions are the originals'.
 *
 * COUNTS. The supplied ZIP has 31 logos (30 displayable + Vibgyor High, blocked). The register has 33 entries: those 31, plus
 * Omsai Group and Wanderlooms, whose logos were already approved and public in the repository and are not in the ZIP.
 * Displayed: 30 from the ZIP + 2 existing = 32.
 */
export type ServiceTag = 'google-ads' | 'meta-ads' | 'seo' | 'website' | 'other';

export type ClientLogo = { src: string; w: number; h: number; fit: 'wide' | 'mid' | 'square' };

export type Client = {
  key: string;
  name: string;
  /** The supplied original's filename (kept outside the repo). */
  source: string;
  display: 'show' | 'blocked';
  logo: ClientLogo | null;
  /** Verified services only. Empty means none is documented, not that none exists. */
  services: ServiceTag[];
  evidence?: string;
  /** The case study's page address, where the client's identity is confirmed by the case-study record. */
  caseStudy?: string;
};

/** A supplied logo that the founder authorised for display (general client relationship; no service is implied). */
const c = (key: string, name: string, source: string, logo: ClientLogo, extra: Partial<Client> = {}): Client => ({ key, name, source, display: 'show', logo, services: [], ...extra });

export const CLIENTS: readonly Client[] = [
  {
    key: 'anybodycanbake', name: 'AnybodyCanBake', source: 'Anybody-Can-Bake-Logo.png', display: 'show',
    logo: { src: '/images/clients/anybodycanbake.png', w: 544, h: 180, fit: 'wide' },
    services: ['google-ads', 'seo'], evidence: 'Google Ads case study (WORK-027); historical SEO project (components/cplus/seo/content.ts)',
    caseStudy: '/portfolio/google-ads-for-online-courses',
  },
  {
    key: 'ameba-software', name: 'Ameba Software', source: 'Ameba Softwares.png', display: 'show',
    logo: { src: '/images/clients/ameba-software.png', w: 225, h: 117, fit: 'mid' },
    services: ['seo'], evidence: 'SEO case study (WORK-027)', caseStudy: '/portfolio/seo-ameba-software',
  },
  {
    key: 'classpe', name: 'ClassPe', source: 'Classpe.jpg', display: 'show',
    logo: { src: '/images/clients/classpe.webp', w: 600, h: 153, fit: 'wide' },
    services: ['other'], evidence: 'Social media strategy and content case study', caseStudy: '/portfolio/classpe-social-media-strategy',
  },
  {
    key: 'insuryo', name: 'InsurYo', source: 'Insuryo.jpg', display: 'show',
    logo: { src: '/images/clients/insuryo-family.webp', w: 477, h: 396, fit: 'square' },
    services: ['other'], evidence: 'Organic growth case study', caseStudy: '/portfolio/insuryo-organic-growth',
  },
  {
    key: 'om-sai', name: 'Omsai Group', source: 'public/images/resolve-r3/omsai-logo.jpg (frozen homepage copy, unchanged)', display: 'show',
    logo: { src: '/images/clients/omsai-group.webp', w: 336, h: 232, fit: 'mid' },
    services: ['meta-ads'], evidence: 'Meta Ads case study', caseStudy: '/portfolio/om-sai-developer-meta-ads',
  },
  {
    // Already shown publicly on the homepage and D2C page. Meta advertising is stated in DEC-080/081, but the services
    // register says "no approved service evidence", so no service tag is carried until the owner reconciles it.
    key: 'wanderlooms', name: 'Wanderlooms', source: 'public/images/resolve-r3/wanderlooms-logo.png', display: 'show',
    logo: { src: '/images/resolve-r3/wanderlooms-logo.png', w: 500, h: 149, fit: 'wide' },
    services: [], evidence: 'DEC-080/081 (service unreconciled)',
  },
  { key: 'vibgyor-high', name: 'Vibgyor High', source: 'Vibgyor.svg', display: 'blocked', logo: null, services: [], evidence: 'Written permission NO (owner fact 2026-09-19, LINK_ROUTING_OWNER_REVIEW §0.21)' },
  c('advit-prints', 'Advit Prints', 'Advit Prints.jpg', { src: '/images/clients/advit-prints.webp', w: 800, h: 799, fit: 'square' }),
  c('asset-creators', 'Asset Creators', 'Asset Creators Logo & Colours 2026 - 4.png', { src: '/images/clients/asset-creators.webp', w: 800, h: 391, fit: 'mid' }),
  c('bptp', 'BPTP', 'BPTP.png', { src: '/images/clients/bptp.webp', w: 576, h: 146, fit: 'wide' }),
  c('bakedemy', 'Bakedemy', 'Bakedemy.png', { src: '/images/clients/bakedemy.webp', w: 800, h: 502, fit: 'mid' }, {services: ['seo'], evidence: 'Historical SEO project (components/cplus/seo/content.ts)' }),
  c('bakersville', 'Bakersville India', 'Bakersville.png', { src: '/images/clients/bakersville.webp', w: 800, h: 292, fit: 'wide' }),
  c('dolphin-group', 'Dolphin Group', 'Dolphin group.png', { src: '/images/clients/dolphin-group.webp', w: 287, h: 171, fit: 'mid' }),
  c('ekoching', 'Ekoching', 'EKoching.png', { src: '/images/clients/ekoching.webp', w: 225, h: 224, fit: 'square' }),
  c('flaunt-basket', 'Flaunt Basket', 'Flaunt Basket.webp', { src: '/images/clients/flaunt-basket.webp', w: 284, h: 87, fit: 'wide' }),
  c('geek', 'Geek', 'Geek.png', { src: '/images/clients/geek.webp', w: 432, h: 117, fit: 'wide' }),
  c('gems-international-school', 'Gems International School', 'Gems International School.png', { src: '/images/clients/gems-international-school.webp', w: 194, h: 76, fit: 'mid' }),
  c('hut-n-homes', 'Hut N Homes', 'Hutnhomes.jpg', { src: '/images/clients/hut-n-homes.webp', w: 384, h: 143, fit: 'wide' }),
  c('kiyaan-gold', 'Kiyaan Gold', 'Kiyaan Gold.png', { src: '/images/clients/kiyaan-gold.webp', w: 800, h: 733, fit: 'square' }),
  c('kiyaan-silver', 'Kiyaan Silver', 'Kiyaan Silver.png', { src: '/images/clients/kiyaan-silver.webp', w: 96, h: 97, fit: 'square' }),
  c('klenzmo', 'Klenzmo', 'Klenzmo.png', { src: '/images/clients/klenzmo.webp', w: 329, h: 104, fit: 'wide' }),
  c('libros', 'Libros', 'Libros Library.png', { src: '/images/clients/libros.webp', w: 677, h: 579, fit: 'square' }),
  c('mbp', 'MBP', 'MBP.png', { src: '/images/clients/mbp.webp', w: 99, h: 57, fit: 'mid' }),
  c('marshal', 'Marshal', 'Marshal Logo - 1.png', { src: '/images/clients/marshal.webp', w: 292, h: 300, fit: 'square' }),
  c('nuyan-events', 'Nuyan Events', 'Nuyan_Logo.png', { src: '/images/clients/nuyan-events.webp', w: 382, h: 277, fit: 'mid' }),
  c('olambit', 'Olambit', 'Olambit.png', { src: '/images/clients/olambit.webp', w: 166, h: 54, fit: 'wide' }),
  c('ossoro', 'Ossoro', 'Ossoro-Flavors.png', { src: '/images/clients/ossoro.webp', w: 695, h: 587, fit: 'square' }),
  c('phoenix-laundry', 'Phoenix Laundry', 'Phoenix-Laundry.png', { src: '/images/clients/phoenix-laundry.webp', w: 800, h: 481, fit: 'mid' }),
  c('prakrta', 'Prakrta', 'Prakrta.png', { src: '/images/clients/prakrta.webp', w: 800, h: 562, fit: 'mid' }),
  c('sunget', 'Sunget', 'Sunget Logo.png', { src: '/images/clients/sunget.webp', w: 294, h: 77, fit: 'wide' }),
  c('trinexa-global', 'Trinexa Global', 'Trinexa Global.png', { src: '/images/clients/trinexa-global.webp', w: 633, h: 337, fit: 'mid' }),
  c('agarwal-veneers', 'Agarwal Veneers', 'agarwal veneers logo .png', { src: '/images/clients/agarwal-veneers.webp', w: 800, h: 719, fit: 'square' }),
  c('entie', 'Entie', 'entie logo.png', { src: '/images/clients/entie.webp', w: 800, h: 633, fit: 'square' }),
];

const shown = (c: Client): c is Client & { logo: ClientLogo } => c.display === 'show' && c.logo !== null;

/** The logos the homepage section shows: `show` clients only, in alphabetical order (no client is placed above another). */
export const wallClients = () => CLIENTS.filter(shown).sort((a, b) => a.name.localeCompare(b.name, 'en'));

/** The client for a case study, by its page address, when it has a shown logo. */
export const clientForHref = (href: string) => CLIENTS.filter(shown).find((c) => c.caseStudy === href) ?? null;

/** Shown clients with a VERIFIED engagement in this service. */
export const clientsForService = (tag: ServiceTag) => CLIENTS.filter(shown).filter((c) => c.services.includes(tag));
