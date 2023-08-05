import { urlServerLocalPostgres } from "~/services/util/server/server";

export async function fetchStoreInventoryProducts(
  tokenUser: string
): Promise<any> {
  const query = `
  query FetchProducts {
    products {
      _id
      dui
      name
      brand
      price
      quantity
      images {
        url
      }
    }
  }
`;

  try {
    const response = await fetch(`${urlServerLocalPostgres}/graphql`, {
      method: "POST",
      headers: {
        Authorization: "x-user-auth " + tokenUser,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch inventory products");
    }

    const data = await response.json();

    return data.data.products;
  } catch (error) {
    console.error("Error fetching inventory products:", error);
    throw error;
  }
}
