import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
import { analyses, forms, users } from "./schema";

dotenv.config;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, {
  logger: process.env.NODE_ENV !== "production",
});

export const Tables = {
  users,
  forms,
  analyses,
};
