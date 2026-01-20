import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { schema } from "../../db/schema";

// biome-ignore lint/suspicious/useAwait: <async>
export const getPacientUser: FastifyPluginAsyncZod = async (app) => {
	app.get("/user_pacient", async () => {
		const result = await db
			.select({
				id: schema.pacient.id,
				name: schema.pacient.name,
				cpf: schema.pacient.cpf,
				email: schema.pacient.email,
				password: schema.pacient.password,
			})
			.from(schema.pacient)
			.groupBy(schema.pacient.id)
			.orderBy(schema.pacient.createdAt);

		return result;
	});
};
