// biome-ignore assist/source/organizeImports: <FastifyPluginAsync>
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../../db/connections";
import bcrypt from "bcryptjs";
import { users } from "../../db/schema/users";

const CreateUserBody = z.object({
	name: z.string().min(1),
	cpf: z.string().length(11),
	email: z.string().email(),
	password: z.string().min(6),
	role: z.enum(["pacient", "doctor"]),
});

// biome-ignore lint/suspicious/useAwait: <Promisse>
export const authRoutes: FastifyPluginAsyncZod = async (app) => {
	app.post("/signup", async (request, reply) => {
		const parsed = CreateUserBody.safeParse(request.body);
		if (!parsed.success) {
			return reply.status(400).send({ error: parsed.error });
		}

		const { name, cpf, email, password, role } = parsed.data;
		const passwordHash = await bcrypt.hash(password, 10);

		try {
			const result = await db
				.insert(users)
				.values({
					name,
					cpf,
					email,
					password: passwordHash,
					role,
				})
				.returning();

			const inserted = result[0];
			return reply
				.status(201)
				.send({ id: inserted.id, created_at: inserted.createdAt });
		} catch (err) {
			return reply
				.status(409)
				.send({ error: "email or cpf already exists", details: err });
		}
	});

	app.post("/login", async (request, reply) => {
		const { email, password } = request.body as {
			email: string;
			password: string;
		};
		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (!user) {
			return reply.status(401).send({ error: "Invalid credentials" });
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return reply.status(401).send({ error: "Invalid credentials" });
		}

		const token = app.jwt.sign({ userId: user.id, role: user.role });
		// opcional: criar refresh token e guardar no DB
		return reply.send({ token, role: user.role });
	});
};
