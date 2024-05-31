import { z } from 'zod'

export const createUserValidator = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
})
