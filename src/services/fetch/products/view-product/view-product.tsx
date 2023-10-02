import { urlServerLocalPostgres } from '~/services/util/server/server';

export async function fetchStoreProductsByDui(
  dui: string,
  tokenUser: string
): Promise<any> {
  const query = `
  query byDuiProduct($dui: String!) {
    findProductDui(dui: $dui) {
      dui
     
      name
      brand
      price
      description
      bullets
      gtin
      quantity
      maxQuantitySale
      discount
     category {
      categoryName
    }
    subCategory {
      subCategoryName
    }
      images {
       url
      }
      basicFeatures {
    weight
    width
    height
    depth
    condition
  }
  status{
    active
  }
  dates {
     createdAt
     updatedAt
     
     uploadedBy {
       profile {
         name
       }
      
     }
   }
    }
  }
`;
  const variants = {
    dui,
  };

  try {
    const response = await fetch(`${urlServerLocalPostgres}/graphql`, {
      method: 'POST',
      headers: {
        Authorization: 'x-user-auth ' + tokenUser,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variants,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch inventory products');
    }

    const data = await response.json();

    return data.data.findProductDui[0];
  } catch (error) {
    console.error('Error fetching inventory products:', error);
    throw error;
  }
}
