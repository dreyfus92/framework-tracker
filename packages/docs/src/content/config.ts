import { defineCollection, z } from 'astro:content'

const statsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    type: z.string(),
    prodDependencies: z.number(),
    devDependencies: z.number(),
    npmGraphUrl: z.string().url().optional(),
    installTimeMs: z.number(),
    coldBuildTimeMs: z.number(),
    warmBuildTimeMs: z.number(),
    timingMeasuredAt: z.string(),
    runner: z.string(),
  }),
})

export const collections = {
  stats: statsCollection,
}
