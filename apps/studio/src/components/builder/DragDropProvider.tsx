'use client'

import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent,
  DragOverlay, 
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { 
  SortableContext, 
  verticalListSortingStrategy,
  arrayMove 
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { useBuilderStore } from '@/stores/builderStore'
import { ComponentRenderer } from './ComponentRenderer'
import { createElementFromComponent, canAcceptChild, getComponentByType } from '@/lib/componentRegistry'
import { snapToGrid } from '@/lib/snapToGrid'

interface DragDropProviderProps {
  children: React.ReactNode
}

export function DragDropProvider({ children }: DragDropProviderProps) {
  const { 
    elements, 
    setDraggedElement, 
    draggedElementId,
    addElement,
    showGrid
  } = useBuilderStore()
  
  const [activeId, setActiveId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [dragData, setDragData] = useState<any>(null)
  
  // Configure sensors for better drag experience
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    })
  )
  
  const activeElement = elements.find(el => el.id === activeId)
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
    setDragData(active.data.current)
    setDraggedElement(active.id as string)
  }
  
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    setOverId(over?.id as string || null)
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event
    
    setActiveId(null)
    setOverId(null)
    setDraggedElement(null)
    
    if (!over) return
    
    const activeData = active.data.current
    const overData = over.data.current
    
    // Handle different drag scenarios
    if (activeData?.type === 'new-component') {
      // Dragging new component from library
      handleNewComponentDrop(activeData, over.id as string, overData)
    } else if (activeData?.type === 'existing-component') {
      // Reordering existing components
      handleExistingComponentMove(active.id as string, over.id as string, overData, delta)
    }
    
    setDragData(null)
  }
  
  const handleNewComponentDrop = (activeData: any, overId: string, overData: any) => {
    const componentType = activeData.componentType
    
    if (overId === 'canvas-drop-zone') {
      // Drop on main canvas
      try {
        const element = createElementFromComponent(componentType)
        addElement(element)
      } catch (error) {
        console.error('Failed to add component:', error)
      }
    } else if (overData?.acceptsChildren) {
      // Drop into container
      const parentElement = elements.find(el => el.id === overId)
      const parentDef = getComponentByType(parentElement?.type || '')
      
      if (parentDef && canAcceptChild(parentElement?.type || '', componentType)) {
        const currentChildren = elements.filter(el => el.parent === overId).length
        
        if (!parentDef.maxChildren || currentChildren < parentDef.maxChildren) {
          try {
            const element = createElementFromComponent(componentType, overId)
            addElement(element)
          } catch (error) {
            console.error('Failed to add component to container:', error)
          }
        }
      }
    }
  }
  
  const handleExistingComponentMove = (
    activeId: string, 
    overId: string, 
    overData: any,
    delta: { x: number, y: number }
  ) => {
    const activeElement = elements.find(el => el.id === activeId)
    const overElement = elements.find(el => el.id === overId)
    
    if (!activeElement) return
    
    if (overId === 'canvas-drop-zone') {
      // Move to main canvas
      moveElementToCanvas(activeId, delta)
    } else if (overData?.acceptsChildren && overElement) {
      // Move into container
      moveElementToContainer(activeId, overId, overElement.type)
    } else if (activeElement.parent === overElement?.parent) {
      // Reorder within same parent
      reorderElements(activeId, overId)
    }
  }
  
  const moveElementToCanvas = (elementId: string, delta: { x: number, y: number }) => {
    useBuilderStore.setState((state) => {
      const elementIndex = state.elements.findIndex(el => el.id === elementId)
      if (elementIndex === -1) return state
      
      const element = state.elements[elementIndex]
      const newPosition = snapToGrid(
        element.position.x + delta.x,
        element.position.y + delta.y,
        20,
        state.showGrid
      )
      
      const updatedElements = [...state.elements]
      updatedElements[elementIndex] = {
        ...element,
        parent: undefined,
        position: newPosition
      }
      
      return { elements: updatedElements }
    })
    
    useBuilderStore.getState().saveToHistory()
  }
  
  const moveElementToContainer = (elementId: string, containerId: string, containerType: string) => {
    const activeElement = elements.find(el => el.id === elementId)
    if (!activeElement) return
    
    // Check if move is valid
    if (!canAcceptChild(containerType, activeElement.type)) return
    
    const parentDef = getComponentByType(containerType)
    const currentChildren = elements.filter(el => el.parent === containerId).length
    
    if (parentDef?.maxChildren && currentChildren >= parentDef.maxChildren) return
    
    useBuilderStore.setState((state) => {
      const elementIndex = state.elements.findIndex(el => el.id === elementId)
      if (elementIndex === -1) return state
      
      const updatedElements = [...state.elements]
      updatedElements[elementIndex] = {
        ...updatedElements[elementIndex],
        parent: containerId
      }
      
      return { elements: updatedElements }
    })
    
    useBuilderStore.getState().saveToHistory()
  }
  
  const reorderElements = (activeId: string, overId: string) => {
    useBuilderStore.setState((state) => {
      const activeIndex = state.elements.findIndex(el => el.id === activeId)
      const overIndex = state.elements.findIndex(el => el.id === overId)
      
      if (activeIndex === -1 || overIndex === -1) return state
      
      const newElements = arrayMove(state.elements, activeIndex, overIndex)
      return { elements: newElements }
    })
    
    useBuilderStore.getState().saveToHistory()
  }
  
  // Get all element IDs for sortable context
  const allElementIds = elements.map(el => el.id)
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={allElementIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      
      {/* Enhanced Drag Overlay */}
      <DragOverlay>
        {activeElement ? (
          <div className="opacity-75 rotate-2 scale-105 shadow-2xl ring-2 ring-blue-400">
            <ComponentRenderer element={activeElement} />
          </div>
        ) : dragData?.type === 'new-component' ? (
          <div className="opacity-75 rotate-2 scale-105 shadow-2xl ring-2 ring-green-400 bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {getComponentByType(dragData.componentType)?.icon || '📦'}
              </span>
              <span className="font-medium">
                {getComponentByType(dragData.componentType)?.name || 'Component'}
              </span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}