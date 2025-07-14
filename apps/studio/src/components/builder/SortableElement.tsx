'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface SortableElementProps {
  id: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export function SortableElement({ 
  id, 
  children, 
  className = '', 
  disabled = false 
}: SortableElementProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    disabled 
  })

  const {
    setNodeRef: setDroppableRef,
    isOver,
  } = useDroppable({
    id: `droppable-${id}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // Combine refs
  const setNodeRef = (node: HTMLElement | null) => {
    setSortableRef(node)
    setDroppableRef(node)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isOver ? 'ring-2 ring-blue-500' : ''} ${
        isDragging ? 'z-50' : ''
      } transition-all duration-200`}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

export default SortableElement