import dotenv from "dotenv";

// Carga las variables de entorno del archivo .env
dotenv.config();

function validateEnv(varName: string) {
  const value = process.env[varName];
  if (!value) {
    const msg = `${varName} no definido, por favor defínelo en el archivo .env`;
    const line = "-".repeat(msg.length + 10);
    console.error(`${line}\n| ❌ ${msg} |\n${line}`);
    process.exit(1);
  }
  return value;
}

const JWT_X_AUTH_TOKEN = validateEnv("JWT_X_AUTH_TOKEN");

export { JWT_X_AUTH_TOKEN };
