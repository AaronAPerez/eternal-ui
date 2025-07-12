export interface GridConfig {
  size: number
  enabled: boolean
  showLines: boolean
}

export interface SnapResult {
  x: number
  y: number
  snapped: boolean
}

export function snapToGrid(
  x: number, 
  y: number, 
  gridSize: number = 20,
  enabled: boolean = true
): SnapResult {
  if (!enabled) {
    return { x, y, snapped: false }
  }
  
  const snappedX = Math.round(x / gridSize) * gridSize
  const snappedY = Math.round(y / gridSize) * gridSize
  
  // Only snap if we're close enough (within 10px)
  const threshold = 10
  const shouldSnapX = Math.abs(x - snappedX) <= threshold
  const shouldSnapY = Math.abs(y - snappedY) <= threshold
  
  return {
    x: shouldSnapX ? snappedX : x,
    y: shouldSnapY ? snappedY : y,
    snapped: shouldSnapX || shouldSnapY
  }
}

export function getGridLines(
  containerWidth: number,
  containerHeight: number,
  gridSize: number = 20
): { x: number[], y: number[] } {
  const xLines = []
  const yLines = []
  
  for (let x = 0; x <= containerWidth; x += gridSize) {
    xLines.push(x)
  }
  
  for (let y = 0; y <= containerHeight; y += gridSize) {
    yLines.push(y)
  }
  
  return { x: xLines, y: yLines }
}