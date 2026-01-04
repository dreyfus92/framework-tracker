import { access, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { packagesDir } from './constants'

export async function saveStats(packageName: string, stats: FrameworkStats) {
  const outputDir = join(packagesDir, 'docs', 'src', 'content', 'stats')

  try {
    await access(outputDir)
  } catch {
    throw new Error(
      `Stats content for Astro Docs site does not exist: ${outputDir}`,
    )
  }

  const fileName = `${packageName}.json`
  const filePath = join(outputDir, fileName)

  let mergedStats = stats
  try {
    const existingContent = await readFile(filePath, 'utf-8')
    const existingStats = JSON.parse(existingContent) as FrameworkStats
    mergedStats = { ...existingStats, ...stats }
  } catch {
    throw new Error(`Initial Stats for ${packageName} does not exist`)
  }

  await writeFile(filePath, JSON.stringify(mergedStats, null, 2), 'utf-8')
}
