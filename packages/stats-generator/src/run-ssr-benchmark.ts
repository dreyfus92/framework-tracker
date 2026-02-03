import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { runSSRBenchmark } from './ssr/index.ts'
import { packagesDir } from './constants.ts'
import { getFrameworks } from './get-frameworks.ts'

async function getFrameworkVersion(
  packageName: string,
): Promise<string | undefined> {
  const frameworks = await getFrameworks()
  const framework = frameworks.find((f) => f.package === packageName)

  if (!framework?.frameworkPackage) {
    return undefined
  }

  try {
    const pkgJsonPath = join(
      packagesDir,
      packageName,
      'node_modules',
      framework.frameworkPackage,
      'package.json',
    )
    const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf-8'))
    return pkgJson.version
  } catch {
    console.warn(
      `Could not read version for ${framework.frameworkPackage} in ${packageName}`,
    )
    return undefined
  }
}

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
  const frameworkVersion = await getFrameworkVersion(packageName)

  const ciStats = {
    timingMeasuredAt: timestamp,
    runner: process.env.RUNNER_NAME || 'local',
    frameworkVersion,
    ssrOpsPerSec: result.opsPerSec,
    ssrAvgLatencyMs: result.avgLatencyMs,
    ssrSamples: result.samples,
    ssrBodySizeKb: result.bodySizeKb,
    ssrDuplicationFactor: result.duplicationFactor,
  }

  const outputPath = join(packagesDir, result.package, '.ci-stats.json')
  await writeFile(outputPath, JSON.stringify(ciStats, null, 2), 'utf-8')

  console.info(
    `\n✓ Saved ${result.displayName} v${frameworkVersion ?? 'unknown'} (${result.package})`,
  )
}

main().catch(console.error)
