import {
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  form_id: integer("form_id").notNull(),
  generate_by: varchar("generate_by", { length: 11 }).notNull(),
  analysis_json: jsonb("analysis_json").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});