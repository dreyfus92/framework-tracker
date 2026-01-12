import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { packagesDir } from './constants.ts'
import type { CIStats } from './types.ts'

export async function getCIStats(pkgDir: string) {
  const ciStatsPath = join(packagesDir, pkgDir, '.ci-stats.json')

  try {
    const content = await readFile(ciStatsPath, 'utf-8')
    return JSON.parse(content) as CIStats
  } catch (error) {
    return null
  }
}
