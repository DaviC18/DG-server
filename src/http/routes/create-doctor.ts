// biome-ignore assist/source/organizeImports: <FastifyPluginAsync>
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../../db/connections";
import bcrypt from "bcryptjs";
import { doctor } from "../../db/schema/user-doctor";

const CreateUserDoctorBody = z.object({
	name: z.string().min(1),
	cpf: z.string().length(11),
	email: z.string().email(),
	password: z.string().min(6),
});

type UserDoctorBody = z.infer<typeof CreateUserDoctorBody>;

// biome-ignore lint/suspicious/useAwait: <Promisse>
export const createUserDoctor: FastifyPluginAsyncZod = async (app) => {
	app.post("/user_doctor", async (request, reply) => {
		let parsed: UserDoctorBody;
		try {
			parsed = CreateUserDoctorBody.parse(request.body);
		} catch (err) {
			return reply
				.status(400)
				.send({ error: "Invalid request body", details: err });
		}

		const { name, cpf, email, password } = parsed;

		const passwordHash = await bcrypt.hash(password, 10);

		try {
			const result = await db
				.insert(doctor)
				.values({ name, cpf, email, password: passwordHash })
				.returning();

			const inserted = result[0];

			if (!inserted) {
				return reply
					.status(500)
					.send({ error: "Failed to create user pacient" });
			}

			const id = inserted.id;
			const createdAt = inserted.createdAt;

			return reply.status(201).send({ id, createdAt });
		} catch (err) {
			return reply.status(409).send({
				error: "User with this email or cpf already exists",
				details: err,
			});
		}
	});
};
