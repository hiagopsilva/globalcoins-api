import { z } from 'zod'

export const getHistoricValidator = z.object({
  days: z.number(),
  coin: z.string(),
})
