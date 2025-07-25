export interface GridConfig {
  columns: number;
  gap: number;
  margin: number;
  maxWidth: number;
}

export class GridSystem {
  constructor(private config: GridConfig) {}

  snapToGrid(x: number, y: number, containerWidth: number) {
    const columnWidth = (containerWidth - (this.config.margin * 2)) / this.config.columns;
    const snappedX = Math.round(x / (columnWidth + this.config.gap)) * (columnWidth + this.config.gap);
    const snappedY = Math.round(y / 50) * 50; // 50px grid
    
    return { x: snappedX, y: snappedY };
  }

  getGridLines(containerWidth: number, containerHeight: number) {
    const columnWidth = (containerWidth - (this.config.margin * 2)) / this.config.columns;
    const vertical: number[] = [];
    const horizontal: number[] = [];

    // Vertical lines
    for (let i = 0; i <= this.config.columns; i++) {
      vertical.push(this.config.margin + (i * (columnWidth + this.config.gap)));
    }

    // Horizontal lines
    for (let y = 0; y <= containerHeight; y += 50) {
      horizontal.push(y);
    }

    return { vertical, horizontal };
  }
}

export const defaultGridConfig: GridConfig = {
  columns: 12,
  gap: 24,
  margin: 32,
  maxWidth: 1200
};