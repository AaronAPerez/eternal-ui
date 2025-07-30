import { cn } from "@/components/utils/cn";
import { useDragDrop } from "./DragDropProvider";
import { Component } from "@/types";

/**
 * 📦 DRAGGABLE COMPONENT WRAPPER
 * 
 * Makes any component draggable with accessibility features
 */
interface DraggableComponentProps {
  id: string;
  children: React.ReactNode;
  component: Component;
  isSelected?: boolean;
  onSelect?: (id: string, multiSelect?: boolean) => void;
  className?: string;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({
  id,
  children,
  component,
  isSelected = false,
  onSelect,
  className,
}) => {
  const { isDragging, draggedComponents } = useDragDrop();
  const isDraggedComponent = draggedComponents.some(c => c.id === id);
  
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect?.(id, event.ctrlKey || event.metaKey);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.(id, event.ctrlKey || event.metaKey);
    }
  };

  return (
     <>
     <DraggableComponent
          id={component.id}
          component={component}
          isSelected={isSelected}
          onSelect={onSelect}
      >
       <div
          className={cn(
              'relative transition-all duration-200',
              {
                  'ring-2 ring-blue-500 ring-offset-2': isSelected,
                  'opacity-50': isDragging && isDraggedComponent,
                  'cursor-move': component.isDraggable,
                  'cursor-pointer': !component.isDraggable,
              },
              className
          )}
          style={{
              transform: `translate(${component.position.x}px, ${component.position.y}px)`,
              width: component.size.width,
              height: component.size.height,
          }}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`${component.type} component${isSelected ? ' (selected)' : ''}`}
          aria-describedby={`component-${id}-desc`}
      >
              {children}

              {/* Selection indicator */}
              {isSelected && (
                  <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {component.type}
                  </div>
              )}

              {/* Hidden description for screen readers */}
              <div id={`component-${id}-desc`} className="sr-only">
                  {component.type} component at position {component.position.x}, {component.position.y}
              </div>
          </div>
     </DraggableComponent>
     </>
  );
};