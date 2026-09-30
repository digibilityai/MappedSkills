/**
 * Mocked-response harness for contentfulGraphql.
 * Does not call Contentful. Run: npx tsx scripts/contentful-graphql-harness.ts
 */

type CollectionResponse = {
  postCollection?: {
    items?: Array<{ slug: string } | null>;
  };
};

function filterNull<T>(items: Array<T | null | undefined>): T[] {
  return items.filter((item): item is T => Boolean(item));
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function withMockedFetch(
  impl: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
  run: () => Promise<void>
) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = impl as typeof fetch;
  try {
    await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function main() {
  const originalSpace = process.env.CONTENTFUL_SPACE_ID;
  const originalToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const originalEnv = process.env.CONTENTFUL_ENVIRONMENT;

  const errors: string[] = [];
  const originalError = console.error;
  const originalWarn = console.warn;
  console.error = (...args: unknown[]) => {
    errors.push(args.map(String).join(' '));
  };
  console.warn = () => {};

  try {
    delete process.env.CONTENTFUL_SPACE_ID;
    delete process.env.CONTENTFUL_ACCESS_TOKEN;

    const { contentfulGraphql } = await import('../lib/contentful/client');

    const missing = await contentfulGraphql('{ __typename }');
    assert(missing === null, 'missing credentials should return null');

    process.env.CONTENTFUL_SPACE_ID = 'harness-space';
    process.env.CONTENTFUL_ACCESS_TOKEN = 'harness-token';

    const cleanData = { postCollection: { items: [{ slug: 'a' }] } };
    await withMockedFetch(async () => jsonResponse({ data: cleanData }), async () => {
      errors.length = 0;
      const result = await contentfulGraphql<typeof cleanData>('{ posts }');
      assert(result === cleanData || JSON.stringify(result) === JSON.stringify(cleanData), 'clean data should be returned');
      assert(errors.length === 0, 'clean response should not log GraphQL errors');
    });

    const partialData = {
      postCollection: {
        items: [{ slug: 'valid-one' }, { slug: 'valid-two' }],
      },
    };
    await withMockedFetch(
      async () =>
        jsonResponse({
          data: partialData,
          errors: [{ message: 'Link cannot be resolved' }],
        }),
      async () => {
        errors.length = 0;
        const result = await contentfulGraphql<typeof partialData>('{ posts }');
        assert(JSON.stringify(result) === JSON.stringify(partialData), 'errors + partial data should return data');
        assert(
          errors.some((line) => line.includes('GraphQL errors') && line.includes('Link cannot be resolved')),
          'errors + partial data should still log GraphQL errors'
        );
      }
    );

    await withMockedFetch(
      async () =>
        jsonResponse({
          data: null,
          errors: [{ message: 'Query execution failed' }],
        }),
      async () => {
        const result = await contentfulGraphql('{ posts }');
        assert(result === null, 'errors + data:null should return null');
      }
    );

    await withMockedFetch(
      async () => jsonResponse({ errors: [{ message: 'absent data' }] }),
      async () => {
        const result = await contentfulGraphql('{ posts }');
        assert(result === null, 'errors + absent data should return null');
      }
    );

    await withMockedFetch(async () => jsonResponse({ message: 'Unauthorized' }, 401), async () => {
      errors.length = 0;
      const result = await contentfulGraphql('{ posts }');
      assert(result === null, 'HTTP error should return null');
      assert(
        errors.some((line) => line.includes('GraphQL HTTP 401')),
        'HTTP error should log status'
      );
    });

    const collectionWithHole: CollectionResponse = {
      postCollection: {
        items: [{ slug: 'keep-a' }, null, { slug: 'keep-b' }],
      },
    };
    await withMockedFetch(
      async () =>
        jsonResponse({
          data: collectionWithHole,
          errors: [{ message: 'UNRESOLVABLE_LINK on item 1' }],
        }),
      async () => {
        const data = await contentfulGraphql<CollectionResponse>('{ posts }');
        const items = filterNull(data?.postCollection?.items || []);
        assert(items.length === 2, 'null collection items should be dropped by downstream filterNull');
        assert(items[0]?.slug === 'keep-a' && items[1]?.slug === 'keep-b', 'valid collection items should survive');
      }
    );

    console.info('contentful graphql harness: all cases passed');
  } finally {
    console.error = originalError;
    console.warn = originalWarn;
    if (originalSpace === undefined) delete process.env.CONTENTFUL_SPACE_ID;
    else process.env.CONTENTFUL_SPACE_ID = originalSpace;
    if (originalToken === undefined) delete process.env.CONTENTFUL_ACCESS_TOKEN;
    else process.env.CONTENTFUL_ACCESS_TOKEN = originalToken;
    if (originalEnv === undefined) delete process.env.CONTENTFUL_ENVIRONMENT;
    else process.env.CONTENTFUL_ENVIRONMENT = originalEnv;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
