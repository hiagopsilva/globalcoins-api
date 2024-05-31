import { z } from 'zod'

export const updateUserValidator = z.object({
  id: z.number(),
  name: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
})
