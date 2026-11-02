/**
 * CASE-STUDY H1 EMPHASIS (B4-02, OD-10). The H1 is the study's own title, word for word. Where that title states the study's reported
 * result, the result phrase is shown in the display colour; every other title is one colour. Nothing is computed or inferred: the
 * phrase is written here per study, must be an exact run of words inside the title (otherwise no emphasis is drawn), and keeps every
 * qualifier the title carries ("attributed", "reported"). A client name or a growth metric that is not the study's reported result is
 * never listed. A study not listed here, or whose title changes so the phrase no longer matches, renders in one colour.
 */
const RESULT_PHRASE: Readonly<Record<string, string>> = {
  'google-ads-for-online-courses': '1,410 paid enrolments',
  'ekoching-google-ads': '178 paid enrolments',
  'klenzmo-meta-ads': '3,957 products sold',
  'bakersville-google-ads': '4,324 products sold',
  'phoenix-laundry-google-ads': '640 new customers',
  'hutnhomes-meta-ads': '329 site visits and 23 reported sales',
  'advit-prints-meta-ads': '874 attributed orders',
  'meticulous-business-plan-google-ads': '27 signed engagements',
  'libros-library-meta-ads': '540 new paid memberships',
  'bakedemy-google-ads': '627 paid enrolments',
  'bakedemy-meta-ads': '738 paid enrolments',
  'bblewrap-google-ads': '6 signed design projects',
  'talreja-talreja-google-ads': '19 signed engagements',
  'wanderlooms-meta-ads': '6,607 attributed orders and 3.12× revenue ROAS',
};

/** The title in three runs: before, emphasised result, after. The runs always join back into the title exactly. */
export function headlineRuns(slug: string, title: string): { before: string; em: string; after: string } {
  const phrase = RESULT_PHRASE[slug.replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '')];
  const at = phrase ? title.indexOf(phrase) : -1;
  if (!phrase || at < 0) return { before: title, em: '', after: '' };
  return { before: title.slice(0, at), em: phrase, after: title.slice(at + phrase.length) };
}

export const HEADLINE_RESULT_PHRASES = RESULT_PHRASE;
