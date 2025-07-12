import { useState, useMemo, useCallback, useEffect } from "react"
import { VisualGridOverlayProps } from "../types"

/**
 * Visual Grid Overlay Component
 * Shows dotted grid lines for professional visual feedback
 */
export const VisualGridOverlay: React.FC<VisualGridOverlayProps> = ({
  containerRef,
  columns,
  gap,
  visibility = 'on-hover',
  gridColor = '#3b82f6',
  opacity = '0.3'
}) => {
  const [isVisible, setIsVisible] = useState(visibility === 'always')
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })

  /**
   * Calculate grid line positions
   */
  const gridLines = useMemo(() => {
    const { width, height } = containerDimensions
    if (!width || !height) return { columnLines: [], rowLines: [] }

    // Calculate column positions
    const totalGapWidth = (columns - 1) * gap
    const availableWidth = width - totalGapWidth
    const columnWidth = availableWidth / columns

    const columnLines = Array.from({ length: columns + 1 }, (_, i) => {
      return i * (columnWidth + gap)
    })

    // Calculate row lines (every 100px for visual reference)
    const rowHeight = 100
    const rows = Math.ceil(height / (rowHeight + gap))
    const rowLines = Array.from({ length: rows + 1 }, (_, i) => {
      return i * (rowHeight + gap)
    })

    return { columnLines, rowLines }
  }, [containerDimensions, columns, gap])

  /**
   * Update container dimensions
   */
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerDimensions({
        width: rect.width,
        height: rect.height
      })
    }
  }, [containerRef])

  /**
   * Handle mouse events for visibility
   */
  const handleMouseEnter = useCallback(() => {
    if (visibility === 'on-hover') {
      setIsVisible(true)
    }
  }, [visibility])

  const handleMouseLeave = useCallback(() => {
    if (visibility === 'on-hover') {
      setIsVisible(false)
    }
  }, [visibility])

  /**
   * Set up event listeners
   */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Update dimensions
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // Mouse events
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [containerRef, updateDimensions, handleMouseEnter, handleMouseLeave])

  // Don't render if hidden or no dimensions
  if (visibility === 'hidden' || !isVisible || !containerDimensions.width) {
    return null
  }

  const { columnLines, rowLines } = gridLines

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-200"
      style={{
        opacity: isVisible ? 1 : 0,
        zIndex: 1000
      }}
    >
      {/* Column lines */}
      {columnLines.map((x, index) => (
        <div
          key={`column-${index}`}
          className="absolute top-0 bottom-0 border-l-2 border-dashed"
          style={{
            left: `${x}px`,
            borderColor: gridColor,
            opacity: opacity
          }}
        />
      ))}

      {/* Row lines */}
      {rowLines.map((y, index) => (
        <div
          key={`row-${index}`}
          className="absolute left-0 right-0 border-t-2 border-dashed"
          style={{
            top: `${y}px`,
            borderColor: gridColor,
            opacity: opacity
          }}
        />
      ))}
    </div>
  )
}

export default VisualGridOverlay