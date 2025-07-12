import type { Position, ElementSize, SnapResult, SnapPoint, GridConfig } from '../types'

/**
 * Calculate snap position based on grid configuration
 * Implements intelligent snapping with multiple snap points
 */
export function calculateSnapPosition(
  position: Position,
  gridConfig: GridConfig,
  elementSize: ElementSize = { width: 0, height: 0 }
): SnapResult {
  if (!gridConfig.snap.enabled) {
    return {
      position,
      snapped: false,
      snapType: 'none',
      gridCell: { x: 0, y: 0 },
      distance: 0
    }
  }

  const { size, snap } = gridConfig
  const { threshold } = snap

  // Calculate grid cell position
  const gridX = Math.floor(position.x / size)
  const gridY = Math.floor(position.y / size)

  // Generate possible snap points
  const snapPoints = generateSnapPoints(gridX, gridY, size, snap)

  // Find closest snap point within threshold
  const closestSnap = findClosestSnapPoint(position, snapPoints, threshold)

  if (closestSnap) {
    return {
      position: closestSnap.position,
      snapped: true,
      snapType: closestSnap.type,
      gridCell: { x: gridX, y: gridY },
      distance: closestSnap.distance
    }
  }

  return {
    position,
    snapped: false,
    snapType: 'none',
    gridCell: { x: gridX, y: gridY },
    distance: 0
  }
}

/**
 * Generate snap points for a grid cell
 */
function generateSnapPoints(
  gridX: number,
  gridY: number,
  gridSize: number,
  snapConfig: GridConfig['snap']
): SnapPoint[] {
  const snapPoints: SnapPoint[] = []

  // Grid corners
  if (snapConfig.corners) {
    snapPoints.push(
      { position: { x: gridX * gridSize, y: gridY * gridSize }, type: 'corner', distance: 0 },
      { position: { x: (gridX + 1) * gridSize, y: gridY * gridSize }, type: 'corner', distance: 0 },
      { position: { x: gridX * gridSize, y: (gridY + 1) * gridSize }, type: 'corner', distance: 0 },
      { position: { x: (gridX + 1) * gridSize, y: (gridY + 1) * gridSize }, type: 'corner', distance: 0 }
    )
  }

  // Grid edges (midpoints of cell sides)
  if (snapConfig.edges) {
    snapPoints.push(
      { position: { x: gridX * gridSize + gridSize / 2, y: gridY * gridSize }, type: 'edge', distance: 0 },
      { position: { x: gridX * gridSize + gridSize / 2, y: (gridY + 1) * gridSize }, type: 'edge', distance: 0 },
      { position: { x: gridX * gridSize, y: gridY * gridSize + gridSize / 2 }, type: 'edge', distance: 0 },
      { position: { x: (gridX + 1) * gridSize, y: gridY * gridSize + gridSize / 2 }, type: 'edge', distance: 0 }
    )
  }

  // Grid center
  if (snapConfig.center) {
    snapPoints.push({
      position: { x: gridX * gridSize + gridSize / 2, y: gridY * gridSize + gridSize / 2 },
      type: 'center',
      distance: 0
    })
  }

  return snapPoints
}

/**
 * Find the closest snap point within threshold
 */
function findClosestSnapPoint(
  position: Position,
  snapPoints: SnapPoint[],
  threshold: number
): SnapPoint | null {
  let closestSnap: SnapPoint | null = null

  for (const snapPoint of snapPoints) {
    const distance = calculateDistance(position, snapPoint.position)
    
    if (distance <= threshold) {
      if (!closestSnap || distance < closestSnap.distance) {
        closestSnap = { ...snapPoint, distance }
      }
    }
  }

  return closestSnap
}

/**
 * Calculate Euclidean distance between two points
 */
export function calculateDistance(point1: Position, point2: Position): number {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  )
}

/**
 * Check if a position is within snap threshold of grid
 */
export function isWithinSnapThreshold(
  position: Position,
  gridConfig: GridConfig
): boolean {
  const snapResult = calculateSnapPosition(position, gridConfig)
  return snapResult.snapped
}
