import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 5000;
    await fastify.listen({
      port: port,
      host: "0.0.0.0",
    });
    console.log(`Server Running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
