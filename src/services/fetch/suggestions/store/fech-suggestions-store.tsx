import { urlServerLocal } from '~/services/util/server/server';

export async function fetchSuggestionsName(
  searchInput: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerLocal}/api/store/suggestions-name-store?q=${searchInput}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}
