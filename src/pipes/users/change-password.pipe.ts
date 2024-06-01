import { z } from 'zod'

export const changePasswordValidator = z.object({
  id: z.number(),
  password: z.string().optional(),
  newPassword: z.string().optional(),
})
