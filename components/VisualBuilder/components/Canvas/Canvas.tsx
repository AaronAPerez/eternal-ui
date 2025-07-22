// src/components/builder/Canvas/Canvas.tsx
import * as React from "react"
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn, generateId } from "@/lib/utils"
import { useBuilderStore } from "@/stores/builder-store"


interface CanvasProps {
  className?: string
}

/**
 * Visual Builder Canvas
 * 
 * The main canvas where users can drag, drop, and arrange components
 * to build their pages visually.
 */
export function Canvas({ className }: CanvasProps) {
  const {
    sections,
    selectedComponentId,
    viewportMode,
    isPreviewMode,
    addSection,
    moveComponent,
    selectComponent,
    getComponentById
  } = useBuilderStore()

  const canvasRef = React.useRef<HTMLDivElement>(null)
  const [draggedComponent, setDraggedComponent] = React.useState<any>(null)

  // Handle drag end for components
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    // Check if dragging from component library
    if (active.data.current?.type === 'component-library') {
      const componentType = active.data.current.component.id
      const targetSectionId = over.id as string
      
      // Add new component to section
      addSection({
        id: generateId(),
        type: componentType,
        props: active.data.current.component.defaultProps,
        style: {
          mobile: {},
          tablet: {},
          desktop: {}
        },
        sectionId: targetSectionId
      })
    } else {
      // Handle reordering existing components
      moveComponent(active.id as string, over.id as string)
    }

    setDraggedComponent(null)
  }

  // Handle drag over for visual feedback
  const handleDragOver = (event: DragOverEvent) => {
    const { active } = event
    
    if (active.data.current?.type === 'component-library') {
      setDraggedComponent(active.data.current.component)
    }
  }

  // Get canvas viewport classes
  const getCanvasClasses = () => {
    const baseClasses = "transition-all duration-300 mx-auto bg-white shadow-lg"
    
    switch (viewportMode) {
      case 'mobile':
        return cn(baseClasses, "w-[375px] min-h-[667px]")
      case 'tablet':
        return cn(baseClasses, "w-[768px] min-h-[1024px]")
      case 'desktop':
        return cn(baseClasses, "w-full max-w-[1440px] min-h-screen")
      default:
        return cn(baseClasses, "w-full min-h-screen")
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className={cn("relative flex-1 overflow-auto bg-gray-100 p-8", className)}>
        {/* Canvas Toolbar */}
        <CanvasToolbar />

        {/* Canvas Container */}
        <div className="relative">
          {/* Viewport Frame */}
          <div className={getCanvasClasses()} ref={canvasRef}>
            {/* Canvas Content */}
            <div className="relative min-h-full">
              {sections.length === 0 ? (
                <EmptyCanvasState draggedComponent={draggedComponent} />
              ) : (
                <SortableContext
                  items={sections.map(s => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {sections.map((section, index) => (
                    <DroppableSection
                      key={section.id}
                      section={section}
                      index={index}
                      isSelected={selectedComponentId === section.id}
                      onClick={() => selectComponent(section.id)}
                    >
                      <ComponentRenderer
                        component={section}
                        viewportMode={viewportMode}
                        isPreviewMode={isPreviewMode}
                      />
                    </DroppableSection>
                  ))}
                </SortableContext>
              )}

              {/* Selection Overlay */}
              {selectedComponentId && !isPreviewMode && (
                <SelectionOverlay
                  componentId={selectedComponentId}
                  component={getComponentById(selectedComponentId)}
                />
              )}

              {/* Drop Zones */}
              {draggedComponent && (
                <DropZoneIndicators 
                  sections={sections}
                  draggedComponent={draggedComponent}
                />
              )}
            </div>
          </div>

          {/* Viewport Size Indicator */}
          <ViewportIndicator viewportMode={viewportMode} />
        </div>
      </div>
    </DndContext>
  )
}

// Empty state when no components are added
const EmptyCanvasState = ({ draggedComponent }: { draggedComponent: any }) => (
  <div className="flex items-center justify-center min-h-[500px] border-2 border-dashed border-gray-300 rounded-lg m-8">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {draggedComponent ? `Drop ${draggedComponent.name} here` : 'Start building your page'}
        </h3>
        <p className="text-gray-500">
          {draggedComponent 
            ? 'Release to add this component to your page'
            : 'Drag components from the library to start building'
          }
        </p>
      </div>
    </div>
  </div>
)

// Drop zone indicators
const DropZoneIndicators = ({ sections, draggedComponent }: any) => (
  <>
    {/* Between sections */}
    {sections.map((section: any, index: number) => (
      <React.Fragment key={`dropzone-${section.id}`}>
        {index === 0 && (
          <DropZone
            id={`before-${section.id}`}
            position="top"
            draggedComponent={draggedComponent}
          />
        )}
        <DropZone
          id={`after-${section.id}`}
          position="bottom"
          draggedComponent={draggedComponent}
        />
      </React.Fragment>
    ))}
  </>
)


const DropZone = ({ id, position, draggedComponent }: any) => (
  <div
    id={id}
    className={cn(
      "absolute left-0 right-0 h-2 bg-blue-500 opacity-0 transition-opacity duration-200",
      "hover:opacity-100 border-2 border-blue-500 border-dashed rounded",
      position === 'top' ? 'top-0' : 'bottom-0'
    )}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
        Add {draggedComponent?.name}
      </span>
    </div>
  </div>
)

const ViewportIndicator = ({ viewportMode }: { viewportMode: string }) => (
  <div className="absolute top-4 right-4 bg-black/75 text-white px-3 py-1 rounded-full text-sm">
    {viewportMode.charAt(0).toUpperCase() + viewportMode.slice(1)} View
  </div>
)