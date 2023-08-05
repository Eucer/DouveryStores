import jwtDecode from "jwt-decode";

export function decodeAuthToken(token: any) {
  if (typeof token !== "string") {
    throw new Error(`Token must be a string, received type ${typeof token}`);
  }

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error: any) {
    console.log(`Invalid token: ${error.message}`);
  }
}
