import { text, uuid, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const pacient = pgTable("pacient", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	cpf: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
