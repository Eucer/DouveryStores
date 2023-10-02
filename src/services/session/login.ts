import { urlServerLocalPostgres } from '../util/server/server';

export async function loginUser(email: string, password: string): Promise<any> {
  const mutation = `
    mutation LoginUserStore($email: String!, $password: String!) {
      loginUserStore(email: $email, password: $password) {
        accessToken
        refreshToken
    
      }
    }
  `;

  const variables = {
    email,
    password,
  };

  const response = await fetch(`${urlServerLocalPostgres}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: mutation,
      variables: variables,
    }),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to log in');
  }

  const data = await response.json();
  console.log(data);
  return data.data.loginUserStore;
}
