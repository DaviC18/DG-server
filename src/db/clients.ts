import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../env";
import { users } from "./schema/users";
import { forms } from "./schema/forms";
import { doctors } from "./schema/doctors";
import { analyses } from "./schema/analyses";
import postgres from "postgres";


if (!env.POSTGRES_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

export const pg = postgres(env.POSTGRES_URL)

export const db = drizzle(pg, {
  schema: {
    users,
    forms,
    doctors,
    analyses
  }
})