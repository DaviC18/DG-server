import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { createUserPacient } from "./http/routes/create-pacient";
import { getPacientUser } from "./http/routes/get-pacient";
import { createUserDoctor } from "./http/routes/create-doctor";
import { getDoctorUser } from "./http/routes/get-doctor";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "http://localhost:5173",
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);

app.setValidatorCompiler(validatorCompiler);

app.get("/", () => {
	return "ok";
});

app.register(createUserPacient);
app.register(getPacientUser);
app.register(createUserDoctor);
app.register(getDoctorUser);

app.listen({ port: env.PORT || 5432 });
