import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    generateToken: (payload: object) => string;
  }
}
