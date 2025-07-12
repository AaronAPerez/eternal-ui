// =================================================================
// USAGE EXAMPLE COMPONENT
// =================================================================

/**
 * Example implementation showing grid snap system integration
 * Demonstrates how to use the grid system in a builder context
 */
const GridSnapExample = () => {
  const {
    gridConfig,
    updateGridConfig,
    toggleGrid,
    calculateSnapPosition,
    responsiveGridSize,
    setCanvasDimensions
  } = useGridSnap()

  const canvasRef = useRef<HTMLDivElement>(null)
  const [draggedElement, setDraggedElement] = useState<{ id: string; position: Position } | null>(null)

  // Update canvas dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect()
        setCanvasDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [setCanvasDimensions])

  // Example drag handler with snap integration
  const handleElementDrag = useCallback((elementId: string, position: Position) => {
    const snapResult = calculateSnapPosition(position, { width: 100, height: 60 })
    
    setDraggedElement({
      id: elementId,
      position: snapResult.position
    })

    // Provide haptic feedback for successful snaps
    if (snapResult.snapped && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }, [calculateSnapPosition])

  return (
    <div className="w-full h-screen bg-gray-50 flex">
      {/* Canvas area */}
      <div className="flex-1 relative">
        <div
          ref={canvasRef}
          className="w-full h-full relative bg-white border border-gray-200"
          role="application"
          aria-label="Design canvas with grid snap system"
        >
          {/* Grid overlay */}
          <GridOverlay
            config={gridConfig}
            canvasWidth={800}
            canvasHeight={600}
            gridSize={responsiveGridSize}
          />

          {/* Example draggable element */}
          {draggedElement && (
            <div
              className="absolute bg-blue-500 text-white p-4 rounded shadow-lg cursor-move"
              style={{
                left: draggedElement.position.x,
                top: draggedElement.position.y,
                width: 100,
                height: 60
              }}
              role="button"
              tabIndex={0}
              aria-label="Draggable component"
            >
              Component
            </div>
          )}

          {/* Click to create element */}
          <div
            className="absolute inset-0"
            onClick={(e) => {
              const rect = canvasRef.current?.getBoundingClientRect()
              if (rect) {
                const position = {
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                }
                handleElementDrag('new-element', position)
              }
            }}
          />
        </div>
      </div>

      {/* Controls sidebar */}
      <div className="w-80 p-4 bg-gray-50 border-l border-gray-200">
        <GridControls
          config={gridConfig}
          onConfigUpdate={updateGridConfig}
          onToggle={toggleGrid}
        />

        {/* Grid information panel */}
        <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Ruler size={14} aria-hidden="true" />
            Grid Information
          </h3>
          <div className="space-y-1 text-xs text-gray-600">
            <p>Status: {gridConfig.enabled ? 'Active' : 'Inactive'}</p>
            <p>Size: {responsiveGridSize}px</p>
            <p>Snap: {gridConfig.snap.enabled ? 'Enabled' : 'Disabled'}</p>
            <p>Type: {gridConfig.type}</p>
          </div>
        </div>

        {/* Keyboard shortcuts info */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 mb-2">
            Keyboard Shortcuts
          </h3>
          <div className="space-y-1 text-xs text-blue-600">
            <p><kbd className="bg-blue-100 px-1 rounded">Ctrl+G</kbd> Toggle Grid</p>
            <p><kbd className="bg-blue-100 px-1 rounded">Esc</kbd> Close Settings</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GridSnapExample
