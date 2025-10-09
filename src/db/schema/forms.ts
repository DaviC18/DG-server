import {
  boolean,
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  pacient_cpf: varchar("pacient_cpf", { length: 11 }).notNull(),
  data: jsonb("data").notNull(),
  consent_to_ai: boolean("consent_to_ai").notNull().default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});