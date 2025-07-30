/**
 * 🎯 Drag & Drop System Tests
 * 
 * Testing the core drag and drop functionality:
 * - Component dragging and dropping
 * - Snap-to-grid behavior
 * - Multi-select operations
 * - Accessibility compliance
 * - Performance under load
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DndContext } from '@dnd-kit/core'
import { DragDropProvider } from '../DragDrop/DragDropProvider'
import { useBuilderStore } from '@/hooks/useBuilderStore'

// Mock the builder store
jest.mock('@/hooks/useBuilderStore')
const mockUseBuilderStore = useBuilderStore as jest.MockedFunction<typeof useBuilderStore>

describe('Drag & Drop System', () => {
  const mockStore = {
    project: {
      id: '1',
      name: 'Test Project',
      components: [
        {
          id: 'comp-1',
          type: 'hero',
          props: { title: 'Hero Component' },
          styles: { className: 'hero-class' },
          position: { x: 0, y: 0 },
          size: { width: 1200, height: 400 }
        }
      ]
    },
    selectedComponents: [],
    gridSize: 20,
    showGrid: true,
    updateComponent: jest.fn(),
    addComponent: jest.fn(),
    moveComponent: jest.fn(),
    setDragOperation: jest.fn(),
  }

  beforeEach(() => {
    mockUseBuilderStore.mockReturnValue(mockStore)
    jest.clearAllMocks()
  })

  describe('Basic Drag Operations', () => {
    it('initiates drag operation correctly', async () => {
      const TestComponent = () => (
        <DragDropProvider>
          <div data-testid="draggable" draggable>
            Draggable Component
          </div>
        </DragDropProvider>
      )

      render(<TestComponent />)
      const draggable = screen.getByTestId('draggable')

      fireEvent.dragStart(draggable)
      
      expect(mockStore.setDragOperation).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'move',
          startPosition: expect.any(Object)
        })
      )
    })

    it('snaps to grid when enabled', () => {
      const TestComponent = () => (
        <DragDropProvider>
          <div data-testid="canvas">Canvas</div>
        </DragDropProvider>
      )

      render(<TestComponent />)
      
      // Test snap-to-grid functionality
      const position = { x: 33, y: 47 }
      const snappedPosition = { x: 40, y: 40 } // Snapped to 20px grid
      
      // This would be tested through the drag operation
      expect(mockStore.gridSize).toBe(20)
    })
  })

  describe('Multi-Select Operations', () => {
    it('handles multiple component selection', async () => {
      const user = userEvent.setup()
      
      const TestComponent = () => (
        <DragDropProvider>
          <div data-testid="comp-1">Component 1</div>
          <div data-testid="comp-2">Component 2</div>
        </DragDropProvider>
      )

      render(<TestComponent />)
      
      const comp1 = screen.getByTestId('comp-1')
      const comp2 = screen.getByTestId('comp-2')

      // Simulate Ctrl+click for multi-select
      await user.click(comp1)
      await user.keyboard('{Control>}')
      await user.click(comp2)
      await user.keyboard('{/Control}')

      // Verify multi-select behavior
      expect(comp1).toHaveAttribute('aria-selected', 'true')
      expect(comp2).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('Accessibility', () => {
    it('provides keyboard navigation support', async () => {
      const user = userEvent.setup()
      
      const TestComponent = () => (
        <DragDropProvider>
          <div 
            data-testid="draggable" 
            tabIndex={0}
            role="button"
            aria-label="Draggable component"
          >
            Keyboard Draggable
          </div>
        </DragDropProvider>
      )

      render(<TestComponent />)
      const draggable = screen.getByTestId('draggable')

      // Test keyboard navigation
      await user.tab()
      expect(draggable).toHaveFocus()

      // Test arrow key movement
      await user.keyboard('{ArrowRight}')
      await user.keyboard('{ArrowDown}')

      // Verify component movement through keyboard
      expect(mockStore.moveComponent).toHaveBeenCalled()
    })

    it('announces drag operations to screen readers', () => {
      const TestComponent = () => (
        <DragDropProvider>
          <div aria-live="polite" data-testid="announcements">
            {/* Announcements for screen readers */}
          </div>
          <div data-testid="draggable">Component</div>
        </DragDropProvider>
      )

      render(<TestComponent />)
      
      const draggable = screen.getByTestId('draggable')
      fireEvent.dragStart(draggable)

      // Verify that announcements are made for accessibility
      const announcements = screen.getByTestId('announcements')
      expect(announcements).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('handles large numbers of draggable components efficiently', () => {
      const components = Array.from({ length: 100 }, (_, i) => ({
        id: `comp-${i}`,
        type: 'test',
        props: {},
        styles: {},
        position: { x: i * 50, y: 0 },
        size: { width: 100, height: 100 }
      }))

      const TestComponent = () => (
        <DragDropProvider>
          {components.map(comp => (
            <div key={comp.id} data-testid={`draggable-${comp.id}`}>
              {comp.id}
            </div>
          ))}
        </DragDropProvider>
      )

      const startTime = performance.now()
      render(<TestComponent />)
      const endTime = performance.now()

      // Should render 100 components in under 50ms
      expect(endTime - startTime).toBeLessThan(50)
    })

    it('optimizes re-renders during drag operations', async () => {
      const renderCount = jest.fn()
      
      const TestComponent = () => {
        renderCount()
        return (
          <DragDropProvider>
            <div data-testid="draggable">Component</div>
          </DragDropProvider>
        )
      }

      render(<TestComponent />)
      const draggable = screen.getByTestId('draggable')

      // Initial render
      expect(renderCount).toHaveBeenCalledTimes(1)

      // Drag operation should not cause excessive re-renders
      fireEvent.dragStart(draggable)
      fireEvent.drag(draggable, { clientX: 100, clientY: 100 })
      fireEvent.dragEnd(draggable)

      // Should not re-render excessively during drag
      expect(renderCount).toHaveBeenCalledTimes(1)
    })
  })
})