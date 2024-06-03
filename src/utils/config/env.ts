import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: '.env' })

export const envSchema = z.object({
  NODE_ENV: z.string(),
  DB_TYPE: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  ENTITIES_PATH: z.string(),
  MIGRATIONS_PATH: z.string(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_TOKEN: z.string(),
  API_COINS: z.string(),
  DB_URL_MONGO: z.string(),
})

export type Env = z.infer<typeof envSchema>
