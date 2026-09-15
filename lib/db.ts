import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var gameHostPool: Pool | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL не задан в .env.local");
}

export const db =
  global.gameHostPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });

if (process.env.NODE_ENV !== "production") {
  global.gameHostPool = db;
}
