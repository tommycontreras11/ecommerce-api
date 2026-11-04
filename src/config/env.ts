import dotenv from "dotenv"
import z from "zod"

dotenv.config({
    quiet: true
})

const envSchema = z.object({
  APP_ENV: z.enum(["dev", "prod"]).default("dev"),
  PORT: z.coerce.number().int().positive().default(3000),

  //DB Config
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string(),

  //JWT Config
  JWT_ACCESS_TOKEN: z.string().min(1),
  JWT_REFRESH_ACCESS_TOKEN: z.string().min(1),
  JWT_EXPIRATION_TOKEN: z.string().default("24h")
})

export const env = envSchema.parse(process.env)