import { urlServerNode } from '~/services/util/server/server';

export async function fetchViewProductDui(
  dui: string,
  user: string,

  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api-store/view/product-edit?dui=${dui}`,
    {
      method: 'GET',
      signal: controller?.signal,
      headers: {
        'x-auth-token': user,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch inventory products');
  }

  const results = await response.json();

  return results;
}
