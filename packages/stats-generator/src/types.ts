interface FrameworkStats {
  prodDependencies: number
  devDependencies: number
}

interface StatsMap {
  [key: string]: FrameworkStats
}
