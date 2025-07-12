'use client'

import { useSortable, useDroppable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useBuilderStore } from '@/stores/builderStore'
import { getComponentByType } from '@/lib/componentRegistry'
import { ComponentRenderer } from './ComponentRenderer'
import { GripVertical, Plus } from 'lucide-react'

interface SortableElementProps {
  element: any
  isPreviewMode?: boolean
}

export function SortableElement({ element, isPreviewMode = false }: SortableElementProps) {
  const { 
    selectElement, 
    selectedElementId, 
    hoveredElementId, 
    hoverElement,
    draggedElementId,
    elements 
  } = useBuilderStore()
  
  const componentDef = getComponentByType(element.type)
  const children = elements.filter(el => el.parent === element.id)
  
  // Sortable for the element itself
  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: element.id,
    data: {
      type: 'existing-component',
      elementId: element.id,
      parentId: element.parent
    }
  })
  
  // Droppable for containers
  const {
    setNodeRef: setDroppableNodeRef,
    isOver: isDroppableOver
  } = useDroppable({
    id: element.id,
    data: {
      acceptsChildren: element.acceptsChildren,
      type: element.type,
      childrenCount: children.length,
      maxChildren: element.maxChildren
    },
    disabled: !element.acceptsChildren || isPreviewMode
  })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  }
  
  const isSelected = selectedElementId === element.id && !isPreviewMode
  const isHovered = hoveredElementId === element.id && !isPreviewMode && !isDragging
  const canAcceptDrop = element.acceptsChildren && 
    (!element.maxChildren || children.length < element.maxChildren)
  const isValidDropTarget = isDroppableOver && canAcceptDrop && !isDragging
  
  // Combine refs
  const setNodeRef = (node: HTMLElement | null) => {
    setSortableNodeRef(node)
    setDroppableNodeRef(node)
  }
  
  const handleClick = (e: React.MouseEvent) => {
    if (!isPreviewMode && !isDragging) {
      e.stopPropagation()
      selectElement(element.id)
    }
  }
  
  const handleMouseEnter = () => {
    if (!isPreviewMode && !isDragging) {
      hoverElement(element.id)
    }
  }
  
  const handleMouseLeave = () => {
    if (!isPreviewMode && !isDragging) {
      hoverElement(null)
    }
  }
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group transition-all ${
        !isPreviewMode ? 'cursor-pointer' : ''
      } ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${
        isHovered ? 'ring-1 ring-blue-300' : ''
      } ${
        isValidDropTarget ? 'ring-2 ring-green-400 bg-green-50' : ''
      } ${
        isDragging ? 'z-50' : ''
      }`}
    >
      {/* Selection Label */}
      {isSelected && !isPreviewMode && (
        <div className="absolute -top-8 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10 flex items-center gap-1">
          <span>{componentDef?.name || element.type}</span>
          {element.acceptsChildren && (
            <span className="opacity-75">
              ({children.length}/{element.maxChildren || '∞'})
            </span>
          )}
        </div>
      )}
      
      {/* Drag Handle */}
      {!isPreviewMode && (isSelected || isHovered) && (
        <div 
          {...attributes}
          {...listeners}
          className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-1 rounded cursor-grab active:cursor-grabbing hover:bg-gray-700 transition-colors z-10"
          title="Drag to reorder"
        >
          <GripVertical className="w-3 h-3" />
        </div>
      )}
      
      {/* Drop Indicator for Containers */}
      {isValidDropTarget && (
        <div className="absolute inset-0 border-2 border-green-400 border-dashed rounded bg-green-50 bg-opacity-30 pointer-events-none z-10 flex items-center justify-center">
          <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Plus className="w-3 h-3" />
            Drop inside {componentDef?.name}
          </div>
        </div>
      )}
      
      {/* Component Renderer */}
      <div className={element.acceptsChildren ? 'min-h-[100px]' : ''}>
        <ComponentRenderer element={element} />
        
        {/* Render Children */}
        {element.acceptsChildren && children.length > 0 && (
          <div className={`mt-4 space-y-4 ${
            element.type === 'grid' 
              ? `grid grid-cols-${element.props.cols || 3} gap-${element.props.gap || 4}` 
              : 'flex flex-col'
          }`}>
            {children.map((child) => (
              <SortableElement 
                key={child.id} 
                element={child} 
                isPreviewMode={isPreviewMode}
              />
            ))}
          </div>
        )}
        
        {/* Empty Container Indicator */}
        {element.acceptsChildren && children.length === 0 && !isPreviewMode && (
          <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500 bg-gray-50">
            <Plus className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              Drag components here or click them to add to this {componentDef?.name?.toLowerCase()}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {element.maxChildren ? `Max ${element.maxChildren} items` : 'No limit'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}