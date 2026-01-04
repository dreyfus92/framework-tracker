import { readdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { packagesDir } from './constants'

const __filename = fileURLToPath(import.meta.url)

export async function getStarterPackages() {
  const packageDirs = await readdir(packagesDir)

  return packageDirs.filter((dir) => dir.startsWith('starter-'))
}
