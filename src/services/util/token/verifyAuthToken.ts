import jwt from "jsonwebtoken";
import { JWT_X_AUTH_TOKEN } from "~/config";

export function verifyAuthToken(token: any) {
  const secret = JWT_X_AUTH_TOKEN;

  if (typeof token !== "string") {
    throw new Error("Token must be a string, received type " + typeof token);
  }

  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error: any) {
    console.log("Invalid token: " + error.message);
  }
}
