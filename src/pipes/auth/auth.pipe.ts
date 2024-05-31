import { z } from 'zod'

export const AuthPipe = z.object({
  email: z.string().email(),
  password: z.string(),
})
