const DEFAULT_REVALIDATE_SECONDS = 60;

export function getContentfulConfig() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  const deliveryToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  const isPreview = Boolean(previewToken && previewToken.trim().length > 0);
  const accessToken = isPreview ? previewToken : deliveryToken;

  if (!spaceId || !accessToken) {
    return null;
  }

  return { spaceId, accessToken, environment, isPreview };
}

export function getContentfulGraphqlEndpoint() {
  const config = getContentfulConfig();
  if (!config) return null;
  return `https://graphql.contentful.com/content/v1/spaces/${config.spaceId}/environments/${config.environment}`;
}

type GraphqlResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function contentfulGraphql<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = DEFAULT_REVALIDATE_SECONDS
): Promise<T | null> {
  const config = getContentfulConfig();
  const endpoint = getContentfulGraphqlEndpoint();

  if (!config || !endpoint) {
    console.warn('[contentful] Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN / CONTENTFUL_PREVIEW_ACCESS_TOKEN');
    return null;
  }

  const queryVariables = {
    preview: config.isPreview,
    ...variables,
  };

  const fetchRevalidate = config.isPreview ? 0 : revalidate;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: queryVariables }),
    ...(fetchRevalidate === 0
      ? { cache: 'no-store' as const }
      : { next: { revalidate: fetchRevalidate } }),
  });

  if (!response.ok) {
    console.error(`[contentful] GraphQL HTTP ${response.status}`);
    return null;
  }

  const json = (await response.json()) as GraphqlResponse<T>;

  if (json.errors?.length) {
    console.error('[contentful] GraphQL errors:', json.errors.map((e) => e.message).join('; '));
  }

  // Contentful may return HTTP 200 with errors[] and usable data (e.g. UNRESOLVABLE_LINK).
  // Keep logging those errors, but return the payload when data is present.
  if (json.data == null) {
    return null;
  }

  return json.data;
}

export const CONTENTFUL_REVALIDATE_SECONDS = DEFAULT_REVALIDATE_SECONDS;
