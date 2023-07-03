import { urlServerLocal } from "~/services/util/server/server";

export async function fetchStoreInventoryProducts(
  category: string,
  subcategory: string,
  query: string,
  orderPrice: string,
  rating: string,
  order: string,
  page: number,
  brand: string,
  user: string ,
  
  controller?: AbortController
): Promise<any> {
    console.log(query);
  const response = await fetch(
    `
   ${urlServerLocal}/api-store/all-products?page=${page}&query=${query}&category=${category}&subcategory=${subcategory}&price=${orderPrice}&rating=${rating}&order=${order}&brand=${brand}`,
    {
      method: 'GET',
      signal: controller?.signal,
      headers: {
        'x-auth-token': user ,
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