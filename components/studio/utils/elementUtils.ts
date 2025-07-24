import { StudioElement } from "../StudioProvider";

/**
 * Generate unique element ID
 */
export function generateElementId(type: string): string {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate element bounds
 */
export function getElementBounds(element: StudioElement): DOMRect {
  const { position, size = { width: 100, height: 100 } } = element;
  
  return new DOMRect(
    position.x,
    position.y,
    typeof size.width === 'string' ? 100 : size.width,
    typeof size.height === 'string' ? 100 : size.height
  );
}

/**
 * Check if point is within element bounds
 */
export function isPointInElement(point: { x: number; y: number }, element: StudioElement): boolean {
  const bounds = getElementBounds(element);
  return (
    point.x >= bounds.left &&
    point.x <= bounds.right &&
    point.y >= bounds.top &&
    point.y <= bounds.bottom
  );
}