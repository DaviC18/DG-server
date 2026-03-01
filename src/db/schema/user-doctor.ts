// biome-ignore assist/source/organizeImports: <drizzles>
import { text, uuid, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const doctor = pgTable("doctor", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	cpf: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
