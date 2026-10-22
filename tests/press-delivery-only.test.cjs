// Draft safety for Press: a configured Preview token must never expose an unpublished press release on the public
// listing, the detail route, static params or the sitemap. Runs the real application TypeScript through
// tests/helpers/ts-loader.cjs against a mocked Contentful that behaves like the real one: it serves draft entries
// ONLY to a request authenticated with the Preview token. No network, no Contentful calls, no real credentials.
const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/ts-loader.cjs');

const DELIVERY = 'delivery-token-test';
const PREVIEW = 'preview-token-test';
const published = { id: 'pub1', firstPublishedAt: '2026-10-30T00:00:00Z', publishedAt: '2026-10-30T00:00:00Z' };
const draft = { id: 'draft1', firstPublishedAt: null, publishedAt: null };
const release = (sys, slug) => ({ sys, headline: `Headline ${slug}`, slug, excerpt: 'Excerpt.', seoTitle: 'T', metaDescription: 'D' });
const RELEASES = [release(published, 'published-release'), release(draft, 'draft-release')];

function setup({ delivery = DELIVERY, preview = PREVIEW } = {}) {
  const calls = [];
  process.env.CONTENTFUL_SPACE_ID = 'spacetest01';
  process.env.CONTENTFUL_ENVIRONMENT = 'master';
  if (delivery) process.env.CONTENTFUL_ACCESS_TOKEN = delivery; else delete process.env.CONTENTFUL_ACCESS_TOKEN;
  if (preview) process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = preview; else delete process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  global.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    const token = init.headers.Authorization.replace('Bearer ', '');
    calls.push({ token, preview: body.variables.preview, query: body.query });
    // Like Contentful: drafts are returned only for the Preview token with preview: true.
    const seesDrafts = token === PREVIEW && body.variables.preview === true;
    const all = body.query.includes('pressReleaseCollection') ? RELEASES : [];
    let items = seesDrafts ? all : all.filter((r) => r.sys.publishedAt);
    if (body.variables.slug) items = items.filter((r) => r.slug === body.variables.slug);
    const key = body.query.includes('pressReleaseCollection') ? 'pressReleaseCollection' : 'researchReportCollection';
    return { ok: true, status: 200, json: async () => ({ data: { [key]: { items } } }) };
  };
  return calls;
}

for (const withPreview of [true, false]) {
  const label = withPreview ? 'with a Preview token configured' : 'without a Preview token';
  const env = () => setup({ preview: withPreview ? PREVIEW : '' });

  test(`${label}: unpublished releases are absent from the listing`, async () => {
    env();
    const cards = await load('lib/contentful/press.ts').getPressListCards();
    assert.deepStrictEqual(cards.map((c) => c.slug), ['published-release']);
  });

  test(`${label}: an unpublished release detail returns null (404); a published one stays reachable`, async () => {
    env();
    const { getPressReleaseBySlug } = load('lib/contentful/press.ts');
    assert.strictEqual(await getPressReleaseBySlug('draft-release'), null);
    const ok = await getPressReleaseBySlug('published-release');
    assert.strictEqual(ok && ok.slug, 'published-release');
  });

  test(`${label}: static params exclude unpublished releases`, async () => {
    env();
    const params = await load('lib/contentful/press.ts').getPressStaticParams();
    assert.deepStrictEqual(params, [{ slug: 'published-release' }]);
  });

  test(`${label}: the sitemap lists only published releases`, async () => {
    env();
    const urls = (await load('app/sitemap.ts').default()).map((e) => e.url);
    assert.ok(urls.some((u) => u.endsWith('/press/published-release')));
    assert.ok(!urls.some((u) => u.includes('draft-release')));
  });

  test(`${label}: every Press request uses the Delivery token with preview false`, async () => {
    const calls = env();
    const press = load('lib/contentful/press.ts');
    await press.getPressListCards();
    await press.getPressReleaseBySlug('published-release');
    await press.getPressStaticParams();
    assert.ok(calls.length >= 3);
    for (const c of calls) {
      assert.strictEqual(c.token, DELIVERY);
      assert.strictEqual(c.preview, false);
    }
  });
}

test('without a Delivery token Press shows nothing, even if a Preview token is set', async () => {
  const calls = setup({ delivery: '', preview: PREVIEW });
  const press = load('lib/contentful/press.ts');
  assert.deepStrictEqual(await press.getPressListCards(), []);
  assert.strictEqual(await press.getPressReleaseBySlug('published-release'), null);
  assert.strictEqual(calls.length, 0);
});

test('Research and Blog keep their existing behaviour: they still use the Preview token when configured', async () => {
  const calls = setup();
  await load('lib/contentful/research.ts').getResearchListCards();
  assert.ok(calls.length > 0);
  for (const c of calls) {
    assert.strictEqual(c.token, PREVIEW);
    assert.strictEqual(c.preview, true);
  }
  const blogCalls = setup();
  await load('lib/contentful/posts.ts').getBlogListPosts();
  assert.ok(blogCalls.length > 0);
  for (const c of blogCalls) assert.strictEqual(c.token, PREVIEW);
});

test('Press getters pass deliveryOnly on every Contentful call', () => {
  const src = require('node:fs').readFileSync(require('node:path').join(__dirname, '..', 'lib/contentful/press.ts'), 'utf8');
  assert.strictEqual((src.match(/contentfulGraphql</g) || []).length, 3);
  assert.strictEqual((src.match(/DELIVERY_ONLY\n/g) || []).length, 3);
});
