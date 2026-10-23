export function dockConfig(width: number, count: number, reduced = false) {
  const padding = 12
  const gap = width < 480 ? 3 : 6
  const available = Math.min(740, width - 24)
  const size = Math.max(24, Math.min(46, (available - padding * 2 - Math.max(0, count - 1) * gap) / Math.max(1, count)))
  return { size, gap, padding, maxScale: reduced || width < 480 ? 1 : 1.65, effectWidth: 170 }
}

export function dockScale(distance: number, effectWidth: number, maxScale: number) {
  const normalized = Math.abs(distance) / (effectWidth / 2)
  return normalized >= 1 ? 1 : 1 + (1 + Math.cos(normalized * Math.PI)) / 2 * (maxScale - 1)
}
