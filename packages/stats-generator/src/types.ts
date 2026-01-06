export interface CIStats {
  installTimeMs?: number
  coldBuildTimeMs?: number
  warmBuildTimeMs?: number
  timingMeasuredAt?: string
}

export interface FrameworkStats extends CIStats {
  prodDependencies: number
  devDependencies: number
}

export interface StatsMap {
  [key: string]: FrameworkStats
}

export interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}
