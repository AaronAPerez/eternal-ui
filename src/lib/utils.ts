import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function focusVisibleStyles(color: string = 'blue') {
  return `focus:outline-none focus-visible:ring-2 focus-visible:ring-${color}-500 focus-visible:ring-offset-2`;
}

export function generateId(): string {
  return `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}

export function getElementBounds(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2
  };
}

export function calculateAlignmentGuides(
  draggedElement: { x: number; y: number; width: number; height: number },
  otherElements: Array<{ x: number; y: number; width: number; height: number }>,
  threshold: number = 5
) {
  const guides: { type: string; position: number; color: string; }[] = [];
  const draggedRect = {
    left: draggedElement.x,
    right: draggedElement.x + draggedElement.width,
    top: draggedElement.y,
    bottom: draggedElement.y + draggedElement.height,
    centerX: draggedElement.x + draggedElement.width / 2,
    centerY: draggedElement.y + draggedElement.height / 2
  };

  otherElements.forEach(element => {
    const rect = {
      left: element.x,
      right: element.x + element.width,
      top: element.y,
      bottom: element.y + element.height,
      centerX: element.x + element.width / 2,
      centerY: element.y + element.height / 2
    };

    // Vertical alignment guides
    if (Math.abs(draggedRect.left - rect.left) < threshold) {
      guides.push({ type: 'vertical', position: rect.left, color: '#3b82f6' });
    }
    if (Math.abs(draggedRect.centerX - rect.centerX) < threshold) {
      guides.push({ type: 'vertical', position: rect.centerX, color: '#8b5cf6' });
    }
    if (Math.abs(draggedRect.right - rect.right) < threshold) {
      guides.push({ type: 'vertical', position: rect.right, color: '#3b82f6' });
    }

    // Horizontal alignment guides
    if (Math.abs(draggedRect.top - rect.top) < threshold) {
      guides.push({ type: 'horizontal', position: rect.top, color: '#3b82f6' });
    }
    if (Math.abs(draggedRect.centerY - rect.centerY) < threshold) {
      guides.push({ type: 'horizontal', position: rect.centerY, color: '#8b5cf6' });
    }
    if (Math.abs(draggedRect.bottom - rect.bottom) < threshold) {
      guides.push({ type: 'horizontal', position: rect.bottom, color: '#3b82f6' });
    }
  });

  return guides;
}