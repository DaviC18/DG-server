import { z } from "zod"

const envSchema = z.object({
    PORT: z.coerce.number().default(5000),
    POSTGRES_URL: z.url(),
    REDIS_URL: z.url(),
    JWT_SECRET: z.string().min(8),
    GEMINI_API_KEY: z.string().min(1),
    GEMINI_ENDPOINT: z.url(),
    WEB_URl: z.url()
})

export const env = envSchema.parse(process.env)