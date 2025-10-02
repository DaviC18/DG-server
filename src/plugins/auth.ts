import fp from "fastify-plugin";
import dotenv from "dotenv";
import { FastifyInstance } from "fastify";
import fastifyJwt from "fastify-jwt";

dotenv.config();

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "dev-secret",
  });

  fastify.decorate("generateToken", function (payload: object) {
    return fastify.jwt.sign(payload, { expiresIn: "12h" });
  });
});
