// Grid snap utility functions
export const GRID_SIZE = 20;

export function snapToGrid(value: number, gridSize: number = GRID_SIZE): number {
  return Math.round(value / gridSize) * gridSize;
}

export function snapPositionToGrid(position: { x: number; y: number }): { x: number; y: number } {
  return {
    x: snapToGrid(position.x),
    y: snapToGrid(position.y)
  };
}

export function getGridLines(containerWidth: number, containerHeight: number, gridSize: number = GRID_SIZE) {
  const verticalLines = [];
  const horizontalLines = [];

  for (let x = 0; x <= containerWidth; x += gridSize) {
    verticalLines.push(x);
  }

  for (let y = 0; y <= containerHeight; y += gridSize) {
    horizontalLines.push(y);
  }

  return { verticalLines, horizontalLines };
}