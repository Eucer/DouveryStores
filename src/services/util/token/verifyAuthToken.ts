import jwtDecode from "jwt-decode";
import ShowSessionExpiremodal from "~/components/modal/show-session-expiredmodal/show-session-expiremodal";

interface DecodedToken {
  exp?: number;
  iat?: number;
  sub?: string;
  // otros campos que tu token podría tener
}

export function decodeAuthToken(token: any): DecodedToken | null {
  if (typeof token !== "string") {
    throw new Error(`Token must be a string, received type ${typeof token}`);
  }

  try {
    const decoded = jwtDecode(token) as DecodedToken;

    // Verificar si el token ha expirado
    const currentTimestamp = Date.now() / 1000; // Convertir a segundos
    if (decoded.exp && decoded.exp < currentTimestamp) {
      throw new Error("Token has expired");
    }

    return decoded;
  } catch (error: any) {
    console.log(`Invalid token: ${error.message}`);
    if (error.message === "Token has expired") {
      // Aquí puedes mostrar el popup
      ShowSessionExpiremodal("Su sesión ha expirado"); // Asumo que esta función muestra el modal
    }
    return null;
  }
}
