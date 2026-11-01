// Owner request (31 October 2026): the standalone "Evidence basis" section is removed from every case-study detail page. The data field stays
// (no Contentful change) but is not rendered; the metric definitions and attribution labels that matter stay in the main narrative.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { load, root } = require('./helpers/ts-loader.cjs');
Module._extensions['.css'] = () => {};
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const textOf = (n) => (n.nodeType === 'text' ? n.value : (n.content || []).map(textOf).join(' '));

test('the template renders no Evidence basis section, heading, anchor or spacing rule', () => {
  const t = read('components/case-study/CaseStudyTemplate.tsx');
  assert.doesNotMatch(t, /Evidence basis|ct-evidence|ct-h-ev|c\.evidenceNote/);
  assert.doesNotMatch(t, /outcomes and evidence|See the evidence/);
  assert.doesNotMatch(read('components/case-study/case-study.css'), /ct-evidence/);
  // the impact wrapper is only rendered when it has content, so removing the section leaves no empty block
  assert.match(t, /split \|\| impactMedia \? \(/);
  assert.match(t, /\{split && split\.after\.content\?\.length \? \(\s*<div className="ct-impact-tail">/, 'the tail is rendered only when it has content');
});

test('the legacy template and every page file render no evidence section either', () => {
  for (const f of ['components/case-study/CaseStudyContent.tsx', 'app/(pages)/portfolio/[slug]/page.tsx', 'components/case-study/RelatedCaseCards.tsx']) assert.doesNotMatch(read(f), /Evidence basis|evidenceNote/, f);
});

test('metric definitions stay in the main narrative: revenue return is not profit, lifetime value is not revenue, period ratios are not cohorts, no sole causation', () => {
  const prev = { NODE_ENV: process.env.NODE_ENV, F: process.env.CASE_STUDY_LOCAL_PREVIEW, S: process.env.NEXT_PUBLIC_CASE_FINAL_FOUR };
  Object.assign(process.env, { NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: '1', NEXT_PUBLIC_CASE_FINAL_FOUR: '1' });
  try {
    const entries = load('lib/case-study-local-preview.ts').withLocalPreview([]);
    const impact = (e) => textOf(e.impact.json);
    for (const e of entries) {
      const t = impact(e);
      if (e.slug !== 'libros-library-meta-ads' && (/ROAS|return on (ad|advertising) spend/i.test(t) || /return on ad/.test(e.summary || ''))) assert.match(t, /not profit|does not establish profit/i, `${e.slug}: ROAS is not profit`);
    }
    const by = (s) => impact(entries.find((e) => e.slug === s));
    assert.match(by('libros-library-meta-ads'), /lifetime value is not revenue collected during the campaign/);
    assert.match(by('libros-library-meta-ads'), /not part of any return on ad spend/);
    assert.match(by('seo-ameba-software'), /does not show that the work alone caused the change/);
    assert.match(by('anybodycanbake-seo'), /does not show that the work alone caused the change/);
    assert.match(by('classpe-social-media-strategy'), /not growth attributed to social content alone/);
    assert.match(by('insuryo-organic-growth'), /separate from revenue, funding raised and marketing results/);
    for (const s of ['meticulous-business-plan-google-ads', 'bakedemy-google-ads', 'bakedemy-meta-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads', 'libros-library-meta-ads']) assert.match(by(s), /period totals|not a tracked cohort/, `${s}: period ratio stated`);
    // reporting periods still appear in the narrative
    assert.match(by('wanderlooms-meta-ads'), /April 2026 to September 2026/);
    assert.match(by('google-ads-for-online-courses'), /February 2020 to August 2021/);
  } finally { process.env.NODE_ENV = prev.NODE_ENV; for (const [k, v] of [['CASE_STUDY_LOCAL_PREVIEW', prev.F], ['NEXT_PUBLIC_CASE_FINAL_FOUR', prev.S]]) v === undefined ? delete process.env[k] : (process.env[k] = v); }
});
