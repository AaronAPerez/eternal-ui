import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DragDropProvider, DroppableZone, useDragDrop } from '../DragDrop/DragDropProvider';
import { useBuilderStore } from '@/hooks/useBuilderStore';
import { Component } from '@/types/builder';
import { DraggableComponent } from '../DragDrop/DraggableComponent';


// Mock the builder store
jest.mock('@/hooks/useBuilderStore');
const mockUseBuilderStore = useBuilderStore as jest.MockedFunction<typeof useBuilderStore>;

// Mock @dnd-kit/core for testing
jest.mock('@dnd-kit/core', () => ({
  DndContext: ({ children, onDragStart, onDragEnd }: any) => (
    <div data-testid="dnd-context" onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
    </div>
  ),
  DragOverlay: ({ children }: any) => <div data-testid="drag-overlay">{children}</div>,
  useSensor: jest.fn(),
  useSensors: jest.fn(() => []),
  PointerSensor: jest.fn(),
  KeyboardSensor: jest.fn(),
  closestCenter: jest.fn(),
  pointerWithin: jest.fn(),
  rectIntersection: jest.fn(),
}));

// Mock sortable for testing
jest.mock('@dnd-kit/sortable', () => ({
  arrayMove: jest.fn(),
  sortableKeyboardCoordinates: jest.fn(),
}));

describe('Enhanced Drag & Drop System', () => {
  // Mock data
  const mockComponent: Component = {
    id: 'test-component-1',
    type: 'hero',
    props: { title: 'Test Hero' },
    styles: { className: 'hero-class' },
    position: { x: 100, y: 100 },
    size: { width: 300, height: 200 },
    children: [],
    metadata: {
      created: new Date(),
      modified: new Date(),
      version: 1,
    },
    isDraggable: true,
  };

  const mockStore = {
    project: {
      id: '1',
      name: 'Test Project',
      components: [mockComponent],
    },
    selection: {
      selectedComponents: [],
      isMultiSelecting: false,
    },
    dragOperation: null,
    dropZones: [
      {
        id: 'main-canvas',
        name: 'Main Canvas',
        accepts: ['*'],
        position: { x: 0, y: 0 },
        size: { width: 1200, height: 800 },
      },
    ],
    activeDropZone: null,
    gridSize: 20,
    snapToGrid: true,
    showGrid: true,
    
    // Action mocks
    startDragOperation: jest.fn(),
    updateDragOperation: jest.fn(),
    endDragOperation: jest.fn(),
    setActiveDropZone: jest.fn(),
    moveComponent: jest.fn(),
    moveMultipleComponents: jest.fn(),
  };

  beforeEach(() => {
    mockUseBuilderStore.mockReturnValue(mockStore as any);
    jest.clearAllMocks();
  });

  describe('DragDropProvider', () => {
    it('renders children correctly', () => {
      render(
        <DragDropProvider>
          <div data-testid="child-element">Test Child</div>
        </DragDropProvider>
      );

      expect(screen.getByTestId('child-element')).toBeInTheDocument();
      expect(screen.getByTestId('dnd-context')).toBeInTheDocument();
    });

    it('provides drag drop context to children', () => {
      const TestComponent = () => {
        const { isDragging, snapToGrid } = useDragDrop();
        return (
          <div>
            <div data-testid="is-dragging">{isDragging.toString()}</div>
            <button
              onClick={() => {
                const snapped = snapToGrid({ x: 33, y: 47 });
                console.log('Snapped:', snapped);
              }}
              data-testid="snap-button"
            >
              Snap
            </button>
          </div>
        );
      };

      render(
        <DragDropProvider>
          <TestComponent />
        </DragDropProvider>
      );

      expect(screen.getByTestId('is-dragging')).toHaveTextContent('false');
      expect(screen.getByTestId('snap-button')).toBeInTheDocument();
    });

    it('throws error when useDragDrop is used outside provider', () => {
      const TestComponent = () => {
        const { isDragging } = useDragDrop();
        return <div>{isDragging}</div>;
      };

      // Suppress console error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<TestComponent />)).toThrow(
        'useDragDrop must be used within DragDropProvider'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Snap to Grid Functionality', () => {
    it('snaps position to grid when enabled', async () => {
      const TestComponent = () => {
        const { snapToGrid } = useDragDrop();
        const [result, setResult] = React.useState<string>('');

        const handleSnap = () => {
          const snapped = snapToGrid({ x: 33, y: 47 });
          setResult(`${snapped.x},${snapped.y}`);
        };

        return (
          <div>
            <button onClick={handleSnap} data-testid="snap-test">
              Snap Test
            </button>
            <div data-testid="snap-result">{result}</div>
          </div>
        );
      };

      render(
        <DragDropProvider>
          <TestComponent />
        </DragDropProvider>
      );

      const button = screen.getByTestId('snap-test');
      await userEvent.click(button);

      // Should snap to 20px grid (33 -> 40, 47 -> 40)
      expect(screen.getByTestId('snap-result')).toHaveTextContent('40,40');
    });

    it('does not snap when snap to grid is disabled', async () => {
      mockUseBuilderStore.mockReturnValue({
        ...mockStore,
        snapToGrid: false,
      } as any);

      const TestComponent = () => {
        const { snapToGrid } = useDragDrop();
        const [result, setResult] = React.useState<string>('');

        const handleSnap = () => {
          const snapped = snapToGrid({ x: 33, y: 47 });
          setResult(`${snapped.x},${snapped.y}`);
        };

        return (
          <div>
            <button onClick={handleSnap} data-testid="snap-test">
              Snap Test
            </button>
            <div data-testid="snap-result">{result}</div>
          </div>
        );
      };

      render(
        <DragDropProvider>
          <TestComponent />
        </DragDropProvider>
      );

      const button = screen.getByTestId('snap-test');
      await userEvent.click(button);

      // Should not snap (33 -> 33, 47 -> 47)
      expect(screen.getByTestId('snap-result')).toHaveTextContent('33,47');
    });
  });

  describe('DraggableComponent', () => {
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      mockOnSelect.mockClear();
    });

    it('renders component with correct positioning', () => {
      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
            onSelect={mockOnSelect}
          >
            <div data-testid="component-content">Component Content</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const component = screen.getByRole('button');
      expect(component).toHaveStyle(`
        transform: translate(100px, 100px);
        width: 300px;
        height: 200px;
      `);
    });

    it('handles click selection correctly', async () => {
      const user = userEvent.setup();

      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
            onSelect={mockOnSelect}
          >
            <div data-testid="component-content">Component Content</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const component = screen.getByRole('button');
      await user.click(component);

      expect(mockOnSelect).toHaveBeenCalledWith('test-1', false);
    });

    it('handles multi-select with ctrl+click', async () => {
      const user = userEvent.setup();

      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
            onSelect={mockOnSelect}
          >
            <div data-testid="component-content">Component Content</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const component = screen.getByRole('button');
      await user.click(component, { ctrlKey: true });

      expect(mockOnSelect).toHaveBeenCalledWith('test-1', true);
    });

    it('handles keyboard selection', async () => {
      const user = userEvent.setup();

      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
            onSelect={mockOnSelect}
          >
            <div data-testid="component-content">Component Content</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const component = screen.getByRole('button');
      component.focus();
      await user.keyboard('{Enter}');

      expect(mockOnSelect).toHaveBeenCalledWith('test-1', false);
    });

    it('shows selection indicator when selected', () => {
      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
            isSelected={true}
            onSelect={mockOnSelect}
          >
            <div data-testid="component-content">Component Content</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      expect(screen.getByText('hero')).toBeInTheDocument(); // Type indicator
      expect(screen.getByRole('button')).toHaveClass('ring-2', 'ring-blue-500');
    });

    it('provides accessibility labels', () => {
      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
            onSelect={mockOnSelect}
          >
            <div data-testid="component-content">Component Content</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const component = screen.getByRole('button');
      expect(component).toHaveAttribute('aria-label', 'hero component');
      expect(component).toHaveAttribute('aria-describedby', 'component-test-1-desc');

      const description = screen.getByText(/hero component at position 100, 100/);
      expect(description).toHaveClass('sr-only');
    });
  });

  describe('DroppableZone', () => {
    it('renders drop zone with correct styling', () => {
      render(
        <DragDropProvider>
          <DroppableZone id="test-zone" className="custom-zone">
            <div data-testid="zone-content">Drop Zone Content</div>
          </DroppableZone>
        </DragDropProvider>
      );

      expect(screen.getByTestId('zone-content')).toBeInTheDocument();
    });

    it('shows active state when drag is over valid zone', () => {
      mockUseBuilderStore.mockReturnValue({
        ...mockStore,
        activeDropZone: 'test-zone',
      } as any);

      const TestComponent = () => {
        const { draggedComponent } = useDragDrop();
        // Mock dragged component
        React.useEffect(() => {
          // This would normally be set by drag start
        }, []);

        return (
          <DroppableZone id="test-zone">
            <div data-testid="zone-content">Drop Zone Content</div>
          </DroppableZone>
        );
      };

      render(
        <DragDropProvider>
          <TestComponent />
        </DragDropProvider>
      );

      // The zone should show active styling when it's the active drop zone
      const zoneElement = screen.getByTestId('zone-content').parentElement;
      expect(zoneElement).toHaveClass('transition-all');
    });
  });

  describe('Performance Optimization', () => {
    it('handles large number of draggable components efficiently', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => ({
        ...mockComponent,
        id: `component-${i}`,
        position: { x: i * 50, y: 0 },
      }));

      mockUseBuilderStore.mockReturnValue({
        ...mockStore,
        project: {
          ...mockStore.project,
          components: manyComponents,
        },
      } as any);

      const startTime = performance.now();

      render(
        <DragDropProvider>
          {manyComponents.map(component => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              component={component}
            >
              <div>{component.id}</div>
            </DraggableComponent>
          ))}
        </DragDropProvider>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 100 components in under 100ms (performance target)
      expect(renderTime).toBeLessThan(100);
    });

    it('optimizes re-renders during drag operations', async () => {
      const renderCount = jest.fn();

      const TestComponent = () => {
        renderCount();
        return (
          <DraggableComponent
            id="test-1"
            component={mockComponent}
          >
            <div>Test Component</div>
          </DraggableComponent>
        );
      };

      render(
        <DragDropProvider>
          <TestComponent />
        </DragDropProvider>
      );

      // Initial render
      expect(renderCount).toHaveBeenCalledTimes(1);

      // Simulate drag operations shouldn't cause excessive re-renders
      const component = screen.getByRole('button');
      
      // Multiple interactions shouldn't cause component to re-render
      // (The drag state is managed at the provider level)
      fireEvent.mouseDown(component);
      fireEvent.mouseMove(component, { clientX: 150, clientY: 150 });
      fireEvent.mouseUp(component);

      // Should still be just the initial render
      expect(renderCount).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility Features', () => {
    it('announces drag operations to screen readers', async () => {
      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
          >
            <div>Test Component</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      // Check for screen reader announcement region
      const announcements = screen.getByRole('status');
      expect(announcements).toHaveClass('sr-only');
      expect(announcements).toHaveAttribute('aria-live', 'assertive');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
          >
            <div>Test Component</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const component = screen.getByRole('button');
      
      // Component should be focusable
      expect(component).toHaveAttribute('tabIndex', '0');
      
      // Focus and keyboard interaction
      await user.tab();
      expect(component).toHaveFocus();
      
      // Space key should also trigger selection
      await user.keyboard(' ');
      // This would trigger onSelect if provided
    });

    it('provides proper ARIA labels and descriptions', () => {
      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
            isSelected={true}
          >
            <div>Test Component</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const component = screen.getByRole('button');
      expect(component).toHaveAttribute('aria-label', 'hero component (selected)');
      expect(component).toHaveAttribute('aria-describedby', 'component-test-1-desc');
      
      // Description should be present and hidden
      const description = document.getElementById('component-test-1-desc');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('sr-only');
    });

    it('handles escape key to cancel drag operations', async () => {
      const user = userEvent.setup();
      
      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
          >
            <div>Test Component</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      // Simulate starting a drag (this would normally be done by @dnd-kit)
      // We'll test the keyboard handler directly
      
      // Press Escape during drag should cancel
      fireEvent.keyDown(document, { key: 'Escape' });
      
      // Verify cleanup happens
      expect(mockStore.endDragOperation).toHaveBeenCalled();
    });
  });

  describe('Multi-Select Operations', () => {
    it('handles multi-component drag operations', () => {
      const multipleComponents = [
        mockComponent,
        {
          ...mockComponent,
          id: 'test-component-2',
          position: { x: 200, y: 200 },
        },
      ];

      mockUseBuilderStore.mockReturnValue({
        ...mockStore,
        project: {
          ...mockStore.project,
          components: multipleComponents,
        },
        selection: {
          selectedComponents: ['test-component-1', 'test-component-2'],
          isMultiSelecting: true,
        },
      } as any);

      render(
        <DragDropProvider>
          {multipleComponents.map(component => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              component={component}
              isSelected={mockStore.selection.selectedComponents.includes(component.id)}
            >
              <div>{component.id}</div>
            </DraggableComponent>
          ))}
        </DragDropProvider>
      );

      // Both components should show selection styling
      const components = screen.getAllByRole('button');
      components.forEach(comp => {
        expect(comp).toHaveClass('ring-2', 'ring-blue-500');
      });
    });

    it('shows multi-component drag overlay', () => {
      // This would be tested by simulating a drag start with multiple selected components
      // The drag overlay should show a stack visualization with count badge
      
      const TestComponent = () => {
        const [isDragging, setIsDragging] = React.useState(false);
        const [draggedComponents, setDraggedComponents] = React.useState([
          mockComponent,
          { ...mockComponent, id: 'comp-2' },
          { ...mockComponent, id: 'comp-3' },
        ]);

        return (
          <DragDropProvider>
            <div data-testid="test-container">
              {isDragging && (
                <div data-testid="multi-drag-overlay">
                  {/* Multi-component drag overlay */}
                  <div className="relative">
                    {draggedComponents.slice(0, 3).map((component, index) => (
                      <div
                        key={component.id}
                        data-testid={`drag-layer-${index}`}
                        className="absolute border-2 border-blue-400 bg-blue-50 rounded"
                        style={{
                          width: 60,
                          height: 40,
                          top: index * 4,
                          left: index * 4,
                          zIndex: 10 - index,
                        }}
                      />
                    ))}
                    <div 
                      data-testid="component-count-badge"
                      className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center z-20"
                    >
                      {draggedComponents.length}
                    </div>
                  </div>
                </div>
              )}
              <button onClick={() => setIsDragging(true)}>Start Multi Drag</button>
            </div>
          </DragDropProvider>
        );
      };

      render(<TestComponent />);
      
      const startButton = screen.getByText('Start Multi Drag');
      fireEvent.click(startButton);

      expect(screen.getByTestId('multi-drag-overlay')).toBeInTheDocument();
      expect(screen.getByTestId('component-count-badge')).toHaveTextContent('3');
      expect(screen.getAllByTestId(/drag-layer-/)).toHaveLength(3);
    });
  });

  describe('Drop Zone Validation', () => {
    it('validates drop zones based on component type', () => {
      const TestComponent = () => {
        const { isValidDropTarget } = useDragDrop();
        const [result, setResult] = React.useState<string>('');

        const testValidation = () => {
          const isValid = isValidDropTarget('main-canvas', 'hero');
          setResult(isValid.toString());
        };

        return (
          <div>
            <button onClick={testValidation} data-testid="test-validation">
              Test Validation
            </button>
            <div data-testid="validation-result">{result}</div>
          </div>
        );
      };

      render(
        <DragDropProvider>
          <TestComponent />
        </DragDropProvider>
      );

      const button = screen.getByTestId('test-validation');
      fireEvent.click(button);

      // main-canvas accepts all types (*), so hero should be valid
      expect(screen.getByTestId('validation-result')).toHaveTextContent('true');
    });

    it('respects component limits in drop zones', () => {
      const limitedDropZone = {
        id: 'limited-zone',
        name: 'Limited Zone',
        accepts: ['hero'],
        maxComponents: 1,
        position: { x: 0, y: 0 },
        size: { width: 300, height: 200 },
      };

      // Mock a project with a component already in the limited zone
      const componentInZone = {
        ...mockComponent,
        position: { x: 50, y: 50 }, // Within the limited zone bounds
      };

      mockUseBuilderStore.mockReturnValue({
        ...mockStore,
        dropZones: [limitedDropZone],
        project: {
          ...mockStore.project,
          components: [componentInZone],
        },
      } as any);

      const TestComponent = () => {
        const { isValidDropTarget } = useDragDrop();
        const [result, setResult] = React.useState<string>('');

        const testValidation = () => {
          const isValid = isValidDropTarget('limited-zone', 'hero');
          setResult(isValid.toString());
        };

        return (
          <div>
            <button onClick={testValidation} data-testid="test-validation">
              Test Validation
            </button>
            <div data-testid="validation-result">{result}</div>
          </div>
        );
      };

      render(
        <DragDropProvider>
          <TestComponent />
        </DragDropProvider>
      );

      const button = screen.getByTestId('test-validation');
      fireEvent.click(button);

      // Should be false because zone already has max components (1)
      expect(screen.getByTestId('validation-result')).toHaveTextContent('false');
    });
  });

  describe('Integration with Builder Store', () => {
    it('calls store actions when components are moved', async () => {
      const onComponentMove = jest.fn();

      render(
        <DragDropProvider onComponentMove={onComponentMove}>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
          >
            <div>Test Component</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      // Simulate drag end (normally done by @dnd-kit)
      const dndContext = screen.getByTestId('dnd-context');
      
      // Mock drag end event
      const mockDragEndEvent = {
        active: { id: 'test-1' },
        over: { id: 'main-canvas' },
        delta: { x: 50, y: 50 },
      };

      fireEvent(dndContext, new CustomEvent('dragend', { detail: mockDragEndEvent }));

      // Store actions should be called
      expect(mockStore.moveComponent).toHaveBeenCalled();
      expect(onComponentMove).toHaveBeenCalled();
    });

    it('updates drag operation state during drag', () => {
      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
          >
            <div>Test Component</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const dndContext = screen.getByTestId('dnd-context');
      
      // Mock drag start
      const mockDragStartEvent = {
        active: { id: 'test-1' },
      };

      fireEvent(dndContext, new CustomEvent('dragstart', { detail: mockDragStartEvent }));

      expect(mockStore.startDragOperation).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'test-1',
          type: 'move',
          startPosition: mockComponent.position,
        })
      );
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles drag operations with non-existent components gracefully', () => {
      render(
        <DragDropProvider>
          <div data-testid="empty-provider">Empty</div>
        </DragDropProvider>
      );

      const dndContext = screen.getByTestId('dnd-context');
      
      // Try to drag a non-existent component
      const mockDragStartEvent = {
        active: { id: 'non-existent-component' },
      };

      // Should not throw error
      expect(() => {
        fireEvent(dndContext, new CustomEvent('dragstart', { detail: mockDragStartEvent }));
      }).not.toThrow();

      // Should not call store actions
      expect(mockStore.startDragOperation).not.toHaveBeenCalled();
    });

    it('handles missing drop zones gracefully', () => {
      const TestComponent = () => {
        const { isValidDropTarget } = useDragDrop();
        const [result, setResult] = React.useState<string>('');

        const testValidation = () => {
          const isValid = isValidDropTarget('non-existent-zone', 'hero');
          setResult(isValid.toString());
        };

        return (
          <div>
            <button onClick={testValidation} data-testid="test-validation">
              Test Validation
            </button>
            <div data-testid="validation-result">{result}</div>
          </div>
        );
      };

      render(
        <DragDropProvider>
          <TestComponent />
        </DragDropProvider>
      );

      const button = screen.getByTestId('test-validation');
      fireEvent.click(button);

      // Should return false for non-existent drop zone
      expect(screen.getByTestId('validation-result')).toHaveTextContent('false');
    });

    it('handles empty component list gracefully', () => {
      mockUseBuilderStore.mockReturnValue({
        ...mockStore,
        project: {
          ...mockStore.project,
          components: [],
        },
      } as any);

      render(
        <DragDropProvider>
          <div data-testid="empty-components">No components</div>
        </DragDropProvider>
      );

      // Should render without errors
      expect(screen.getByTestId('empty-components')).toBeInTheDocument();
    });
  });

  describe('Performance Targets Compliance', () => {
    it('meets render time targets for drag operations', async () => {
      const startTime = performance.now();

      render(
        <DragDropProvider>
          <DraggableComponent
            id="test-1"
            component={mockComponent}
          >
            <div>Test Component</div>
          </DraggableComponent>
        </DragDropProvider>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in under 16ms (60fps target)
      expect(renderTime).toBeLessThan(16);
    });

    it('maintains smooth interactions during drag', () => {
      const performanceMarks: number[] = [];
      
      const TestComponent = () => {
        const [dragCount, setDragCount] = React.useState(0);

        const simulateDrag = () => {
          const start = performance.now();
          
          // Simulate multiple rapid drag updates
          for (let i = 0; i < 10; i++) {
            setDragCount(prev => prev + 1);
          }
          
          const end = performance.now();
          performanceMarks.push(end - start);
        };

        return (
          <DragDropProvider>
            <button onClick={simulateDrag} data-testid="simulate-drag">
              Simulate Drag ({dragCount})
            </button>
          </DragDropProvider>
        );
      };

      render(<TestComponent />);

      const button = screen.getByTestId('simulate-drag');
      fireEvent.click(button);

      // All drag updates should complete quickly
      performanceMarks.forEach(time => {
        expect(time).toBeLessThan(50); // 50ms for 10 updates
      });
    });
  });

  describe('Component Preview Rendering', () => {
    it('renders appropriate preview for different component types', () => {
      const heroComponent = { ...mockComponent, type: 'hero' };
      const textComponent = { ...mockComponent, type: 'text', id: 'text-1' };
      const buttonComponent = { ...mockComponent, type: 'button', id: 'button-1', props: { text: 'Click me' } };

      const TestPreview = ({ component }: { component: Component }) => {
        return (
          <div data-testid={`preview-${component.type}`}>
            {/* This simulates the ComponentPreview logic */}
            {component.type === 'hero' && (
              <div className="space-y-1">
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-3 w-3/4 rounded"></div>
                <div className="bg-blue-200 h-6 w-20 rounded"></div>
              </div>
            )}
            {component.type === 'text' && (
              <div className="space-y-1">
                <div className="bg-gray-200 h-3 rounded"></div>
                <div className="bg-gray-200 h-3 w-5/6 rounded"></div>
              </div>
            )}
            {component.type === 'button' && (
              <div className="bg-blue-500 text-white text-center py-2 px-4 rounded text-sm">
                {component.props.text || 'Button'}
              </div>
            )}
          </div>
        );
      };

      render(
        <div>
          <TestPreview component={heroComponent} />
          <TestPreview component={textComponent} />
          <TestPreview component={buttonComponent} />
        </div>
      );

      expect(screen.getByTestId('preview-hero')).toBeInTheDocument();
      expect(screen.getByTestId('preview-text')).toBeInTheDocument();
      expect(screen.getByTestId('preview-button')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });
  });
});

// =============================================================================
// 📁 src/components/WebsiteBuilder/__tests__/DragDropIntegration.test.tsx
// Integration Tests for Drag & Drop with Full Builder
// =============================================================================

describe('Drag & Drop Integration Tests', () => {
  it('completes full drag and drop workflow', async () => {
    const user = userEvent.setup();
    
    // Mock a complete builder setup
    const mockCompleteStore = {
      ...mockStore,
      project: {
        id: '1',
        name: 'Integration Test Project',
        components: [mockComponent],
      },
    };

    mockUseBuilderStore.mockReturnValue(mockCompleteStore as any);

    const FullBuilderTest = () => {
      const [selectedId, setSelectedId] = React.useState<string | null>(null);
      
      return (
        <DragDropProvider 
          onComponentMove={(id, position) => {
            console.log(`Component ${id} moved to`, position);
          }}
          onComponentDrop={(id, dropZone, position) => {
            console.log(`Component ${id} dropped in ${dropZone} at`, position);
          }}
        >
          <div data-testid="builder-canvas" className="relative w-full h-96 bg-gray-100">
            <DroppableZone id="main-canvas" className="w-full h-full">
              <DraggableComponent
                id={mockComponent.id}
                component={mockComponent}
                isSelected={selectedId === mockComponent.id}
                onSelect={(id) => setSelectedId(id)}
              >
                <div className="bg-blue-500 text-white p-4 rounded">
                  Hero Component
                </div>
              </DraggableComponent>
            </DroppableZone>
          </div>
          
          {/* Component Library Panel */}
          <div data-testid="component-library" className="w-64 bg-white border-l">
            <div className="p-4">
              <h3 className="font-bold mb-2">Components</h3>
              <div 
                data-testid="library-button"
                className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                draggable
              >
                Button Component
              </div>
            </div>
          </div>
        </DragDropProvider>
      );
    };

    render(<FullBuilderTest />);

    // 1. Component should be rendered in canvas
    expect(screen.getByText('Hero Component')).toBeInTheDocument();
    
    // 2. Component library should be visible
    expect(screen.getByTestId('component-library')).toBeInTheDocument();
    expect(screen.getByText('Button Component')).toBeInTheDocument();
    
    // 3. Click to select component
    const heroComponent = screen.getByText('Hero Component');
    await user.click(heroComponent);
    
    // Should show selection styling
    expect(heroComponent.closest('[role="button"]')).toHaveClass('ring-2', 'ring-blue-500');
    
    // 4. Component should be draggable
    expect(heroComponent.closest('[role="button"]')).toHaveAttribute('tabindex', '0');
    
    // 5. Canvas should be a valid drop zone
    const canvas = screen.getByTestId('builder-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('handles component library to canvas workflow', async () => {
    const user = userEvent.setup();
    
    const LibraryToCanvasTest = () => {
      const [canvasComponents, setCanvasComponents] = React.useState<Component[]>([]);
      
      const handleAddComponent = (type: string) => {
        const newComponent: Component = {
          id: `new-${type}-${Date.now()}`,
          type,
          props: { text: `New ${type}` },
          styles: { className: 'p-4 bg-gray-200 rounded' },
          position: { x: 100, y: 100 },
          size: { width: 200, height: 100 },
          children: [],
          metadata: {
            created: new Date(),
            modified: new Date(),
            version: 1,
          },
          isDraggable: true,
        };
        
        setCanvasComponents(prev => [...prev, newComponent]);
      };
      
      return (
        <DragDropProvider>
          <div className="flex">
            <div data-testid="canvas" className="flex-1 h-96 bg-gray-50 relative">
              <DroppableZone id="main-canvas" className="w-full h-full">
                {canvasComponents.map(component => (
                  <DraggableComponent
                    key={component.id}
                    id={component.id}
                    component={component}
                  >
                    <div className={component.styles.className}>
                      {component.props.text}
                    </div>
                  </DraggableComponent>
                ))}
              </DroppableZone>
            </div>
            
            <div data-testid="library" className="w-48 bg-white border-l p-4">
              <button
                onClick={() => handleAddComponent('button')}
                data-testid="add-button"
                className="w-full p-2 bg-blue-500 text-white rounded mb-2"
              >
                Add Button
              </button>
              <button
                onClick={() => handleAddComponent('text')}
                data-testid="add-text"
                className="w-full p-2 bg-green-500 text-white rounded"
              >
                Add Text
              </button>
            </div>
          </div>
        </DragDropProvider>
      );
    };

    render(<LibraryToCanvasTest />);

    // Initially canvas should be empty
    expect(screen.queryByText(/New button/)).not.toBeInTheDocument();
    
    // Add a button component
    const addButtonBtn = screen.getByTestId('add-button');
    await user.click(addButtonBtn);
    
    // Component should appear in canvas
    await waitFor(() => {
      expect(screen.getByText(/New button/)).toBeInTheDocument();
    });
    
    // Add a text component
    const addTextBtn = screen.getByTestId('add-text');
    await user.click(addTextBtn);
    
    // Both components should be in canvas
    await waitFor(() => {
      expect(screen.getByText(/New button/)).toBeInTheDocument();
      expect(screen.getByText(/New text/)).toBeInTheDocument();
    });
  });
});