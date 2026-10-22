// Safari/VoiceOver drops list semantics from lists styled `list-style: none` unless `role="list"` is explicit.
// Every <ul> in the case-study template whose class removes its bullets must carry it.
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const dir = path.join(__dirname, '..', 'components', 'case-study')
const tsx = fs.readFileSync(path.join(dir, 'CaseStudyTemplate.tsx'), 'utf8')
const css = fs.readFileSync(path.join(dir, 'case-study.css'), 'utf8')

test('every <ul> in the template carries role="list"', () => {
  const uls = tsx.match(/<ul\b[^>]*>/g) ?? []
  assert.ok(uls.length >= 4, 'expected the four template lists')
  for (const tag of uls) assert.match(tag, /role="list"/, `missing role="list": ${tag}`)
})

test('every unstyled-bullet class used by a template <ul> is declared list-style: none', () => {
  for (const cls of ['ct-bullets', 'ct-ul', 'ct-res-more', 'ct-said']) {
    assert.match(css, new RegExp(`\\.${cls}\\s*\\{[^}]*list-style:\\s*none`), `.${cls} should be list-style: none`)
    assert.ok(tsx.includes(cls), `${cls} should be used by the template`)
  }
})
