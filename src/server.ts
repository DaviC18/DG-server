import Fastify from "fastify";
import dotenv from "dotenv";
import { timestamp } from "drizzle-orm/pg-core";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 5000;
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error(`Porta Invalida: ${port}`);
    }
    await fastify.listen({
      port: port,
      host: "0.0.0.0",
    });
    console.log(`🚀 Server Running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("🛑 Received SIGINT. Shutting down gracefully...");
  await fastify.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("🛑 Received SIGTERM. Shutting down gracefully...");
  await fastify.close();
  process.exit(0);
});

start();
