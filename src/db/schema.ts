import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    cpf: varchar("cpf", { length: 11 }).notNull(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password_hash: varchar("password_hash", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      cpf_idx: uniqueIndex("users_cpf_unique").on(table.cpf),
      email_idx: uniqueIndex("users_email_unique").on(table.email),
    };
  }
);

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  pacient_cpf: varchar("pacient_cpf", { length: 11 }).notNull(),
  data: jsonb("data").notNull(),
  consent_to_ai: boolean("consent_to_ai").notNull().default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  form_id: integer("form_id").notNull(),
  generate_by: varchar("generate_by", { length: 11 }).notNull(),
  analysis_json: jsonb("analysis_json").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
