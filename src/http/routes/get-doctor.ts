import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { schema } from "../../db/schema";

// biome-ignore lint/suspicious/useAwait: <async>
export const getDoctorUser: FastifyPluginAsyncZod = async (app) => {
	app.get("/user_doctor", async () => {
		const result = await db
			.select({
				id: schema.doctor.id,
				name: schema.doctor.name,
				cpf: schema.doctor.cpf,
				email: schema.doctor.email,
				password: schema.doctor.password,
			})
			.from(schema.doctor)
			.groupBy(schema.doctor.id)
			.orderBy(schema.doctor.createdAt);

		return result;
	});
};
