import { readdir } from 'node:fs/promises'
import { packagesDir } from './constants.ts'

export async function getStarterPackages() {
  const packageDirs = await readdir(packagesDir)

  return packageDirs.filter((dir) => dir.startsWith('starter-'))
}
