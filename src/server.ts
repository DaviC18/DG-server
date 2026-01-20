import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";

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

app.listen({ port: env.PORT || 5432 });
