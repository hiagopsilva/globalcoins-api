import { z } from 'zod'

export const FavoriteValidator = z.object({
  coin: z.string(),
  userId: z.number(),
})
