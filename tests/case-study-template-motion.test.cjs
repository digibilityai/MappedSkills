// The site-wide CplusMotion script treats any `[data-count]` element as a count-up and replaces its content with the number.
// The case-study template must therefore carry no `data-count` attribute (G7 R3 fix).
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..', 'components', 'case-study')
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

test('case-study template and stylesheet carry no data-count hook', () => {
  for (const f of ['CaseStudyTemplate.tsx', 'case-study.css']) {
    const src = strip(fs.readFileSync(path.join(root, f), 'utf8'))
    assert.ok(!/data-count/.test(src), `${f} must not use data-count`)
  }
})
