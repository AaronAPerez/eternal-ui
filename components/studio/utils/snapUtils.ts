import { SnapGuide, StudioElement } from "../StudioProvider";
import { getElementBounds } from "./elementUtils";

/**
 * Calculate snap guides for element positioning
 */
export function calculateSnapGuides(
  draggedElement: StudioElement,
  allElements: StudioElement[],
  snapDistance: number = 5
): SnapGuide[] {
  const guides: SnapGuide[] = [];
  const draggedBounds = getElementBounds(draggedElement);
  
  allElements.forEach(element => {
    if (element.id === draggedElement.id) return;
    
    const bounds = getElementBounds(element);
    
    // Horizontal guides
    if (Math.abs(draggedBounds.top - bounds.top) <= snapDistance) {
      guides.push({
        id: `h-top-${element.id}`,
        type: 'horizontal',
        position: bounds.top,
        elements: [draggedElement.id, element.id],
        visible: true
      });
    }
    
    if (Math.abs(draggedBounds.bottom - bounds.bottom) <= snapDistance) {
      guides.push({
        id: `h-bottom-${element.id}`,
        type: 'horizontal',
        position: bounds.bottom,
        elements: [draggedElement.id, element.id],
        visible: true
      });
    }
    
    // Vertical guides
    if (Math.abs(draggedBounds.left - bounds.left) <= snapDistance) {
      guides.push({
        id: `v-left-${element.id}`,
        type: 'vertical',
        position: bounds.left,
        elements: [draggedElement.id, element.id],
        visible: true
      });
    }
    
    if (Math.abs(draggedBounds.right - bounds.right) <= snapDistance) {
      guides.push({
        id: `v-right-${element.id}`,
        type: 'vertical',
        position: bounds.right,
        elements: [draggedElement.id, element.id],
        visible: true
      });
    }
  });
  
  return guides;
}
