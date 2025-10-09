import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const doctors = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    cpf: varchar("cpf", { length: 11 }).notNull(),
    crm: varchar("crm", {length: 8}).notNull(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password_hash: varchar("password_hash", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      cpf_idx: uniqueIndex("users_cpf_unique").on(table.cpf),
      crm_idx: uniqueIndex("doctors_crm_unique").on(table.crm),
      email_idx: uniqueIndex("users_email_unique").on(table.email),
    };
  }
);