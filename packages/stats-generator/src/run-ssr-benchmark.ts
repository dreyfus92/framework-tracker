import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { runSSRBenchmark } from './ssr/index.ts'
import { packagesDir } from './constants.ts'

async function main() {
  const packageName = process.argv[2]

  if (!packageName) {
    console.error('Usage: run-ssr-benchmark <package-name>')
    console.error('Example: run-ssr-benchmark app-astro')
    process.exit(1)
  }

  console.info(`Running SSR benchmark for ${packageName}...\n`)

  const result = await runSSRBenchmark(packageName)
  const timestamp = new Date().toISOString()

  const ciStats = {
    timingMeasuredAt: timestamp,
    runner: process.env.RUNNER_NAME || 'local',
    ssrOpsPerSec: result.opsPerSec,
    ssrAvgLatencyMs: result.avgLatencyMs,
    ssrSamples: result.samples,
    ssrBodySizeKb: result.bodySizeKb,
    ssrDuplicationFactor: result.duplicationFactor,
  }

  const outputPath = join(packagesDir, result.package, '.ci-stats.json')
  await writeFile(outputPath, JSON.stringify(ciStats, null, 2), 'utf-8')

  console.info(`\n✓ Saved ${result.displayName} (${result.package})`)
}

main().catch(console.error)
