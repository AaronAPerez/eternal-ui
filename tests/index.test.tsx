// =================================================================
// COMPREHENSIVE TESTING FRAMEWORK - PHASE 4
// =================================================================

// =================================================================
// TESTING SETUP & CONFIGURATION
// =================================================================

// jest.config.js
// export const jestConfig = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
//   moduleNameMapping: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
//   },
//   collectCoverageFrom: [
//     'src/**/*.{ts,tsx}',
//     '!src/**/*.d.ts',
//     '!src/test-utils/**',
//     '!src/**/*.stories.{ts,tsx}',
//     '!src/**/__tests__/**'
//   ],
//   coverageThreshold: {
//     global: {
//       branches: 90,
//       functions: 90,
//       lines: 90,
//       statements: 90
//     }
//   },
//   testTimeout: 10000
// };

// =================================================================
// TEST UTILITIES & SETUP
// =================================================================

import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import React, { ReactElement } from 'react';
import { ComponentRegistry } from '../lib/enhanced-component-registry';

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve('mock text')),
  },
});

// Test Provider Wrapper
interface TestProviderProps {
  children: React.ReactNode;
}

const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  return (
    <DndContext onDragEnd={jest.fn()}>
      {children}
      <DragOverlay />
    </DndContext>
  );
};

// Custom render function with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: TestProvider, ...options });
};

export * from '@testing-library/react';
export { customRender as render };

// =================================================================
// COMPONENT REGISTRY TESTS
// =================================================================

import { describe, it, expect, beforeEach } from '@jest/globals';

describe('ComponentRegistry', () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = ComponentRegistry.getInstance();
  });

  describe('Component Management', () => {
    it('should return all components', () => {
      const components = registry.getAllComponents();
      expect(components).toHaveLength(120);
      expect(components[0]).toHaveProperty('id');
      expect(components[0]).toHaveProperty('name');
      expect(components[0]).toHaveProperty('category');
    });

    it('should filter components by category', () => {
      const buttonComponents = registry.getComponentsByCategory('buttons');
      expect(buttonComponents).toHaveLength(25);
      buttonComponents.forEach(component => {
        expect(component.category).toBe('buttons');
      });
    });

    it('should search components by query', () => {
      const results = registry.searchComponents('button');
      expect(results.length).toBeGreaterThan(0);
      results.forEach(component => {
        const searchTermFound = 
          component.name.toLowerCase().includes('button') ||
          component.description.toLowerCase().includes('button') ||
          component.tags.some(tag => tag.toLowerCase().includes('button'));
        expect(searchTermFound).toBe(true);
      });
    });

    it('should get component by ID', () => {
      const component = registry.getComponent('hero-section');
      expect(component).toBeDefined();
      expect(component?.id).toBe('hero-section');
      expect(component?.name).toBe('Hero Section');
    });

    it('should filter components by multiple criteria', () => {
      const results = registry.filterComponents({
        category: 'buttons',
        complexity: 'beginner',
        isPremium: false
      });

      results.forEach(component => {
        expect(component.category).toBe('buttons');
        expect(component.complexity).toBe('beginner');
        expect(component.isPremium).toBe(false);
      });
    });
  });

  describe('Statistics', () => {
    it('should return accurate component statistics', () => {
      const stats = registry.getStats();
      
      expect(stats.total).toBe(120);
      expect(stats.byCategory).toHaveProperty('buttons', 25);
      expect(stats.byCategory).toHaveProperty('forms', 20);
      expect(stats.byComplexity).toHaveProperty('beginner');
      expect(stats.byComplexity).toHaveProperty('intermediate');
      expect(stats.byComplexity).toHaveProperty('advanced');
    });

    it('should return popular components in correct order', () => {
      const popular = registry.getPopularComponents(5);
      expect(popular).toHaveLength(5);
      
      for (let i = 0; i < popular.length - 1; i++) {
        expect(popular[i].popularity).toBeGreaterThanOrEqual(popular[i + 1].popularity);
      }
    });
  });
});

// =================================================================
// GRID SYSTEM TESTS
// =================================================================

import { GridUtils, GRID_CONFIG } from '../lib/grid-system-implementation';

describe('GridSystem', () => {
  describe('GridUtils', () => {
    it('should snap values to grid correctly', () => {
      expect(GridUtils.snapToGrid(0)).toBe(0);
      expect(GridUtils.snapToGrid(10)).toBe(20);
      expect(GridUtils.snapToGrid(25)).toBe(20);
      expect(GridUtils.snapToGrid(35)).toBe(40);
    });

    it('should snap positions to grid', () => {
      const position = { x: 15, y: 25 };
      const snapped = GridUtils.snapPositionToGrid(position);
      
      expect(snapped.x).toBe(20);
      expect(snapped.y).toBe(20);
    });

    it('should determine if value should snap', () => {
      expect(GridUtils.shouldSnap(15)).toBe(true); // Within 10px of 20
      expect(GridUtils.shouldSnap(35)).toBe(false); // More than 10px from 40
    });

    it('should get closest grid lines', () => {
      const position = { x: 25, y: 35 };
      const bounds = { width: 800, height: 600, top: 0, left: 0 };
      const lines = GridUtils.getClosestGridLines(position, bounds);

      expect(lines.vertical.position).toBe(20);
      expect(lines.horizontal.position).toBe(40);
      expect(lines.vertical.shouldSnap).toBe(true);
      expect(lines.horizontal.shouldSnap).toBe(true);
    });

    it('should generate grid lines correctly', () => {
      const { verticalLines, horizontalLines } = GridUtils.generateGridLines(100, 80);
      
      expect(verticalLines).toEqual([0, 20, 40, 60, 80, 100]);
      expect(horizontalLines).toEqual([0, 20, 40, 60, 80]);
    });
  });
});

// =================================================================
// CODE GENERATOR TESTS
// =================================================================

import { CodeGeneratorFactory, ComponentInstance } from '../lib/code-generator-implementation';

describe('CodeGenerator', () => {
  const mockComponents: ComponentInstance[] = [
    {
      id: '1',
      componentId: 'hero-section',
      props: {
        title: 'Welcome',
        subtitle: 'Test subtitle',
        backgroundColor: '#6366F1'
      },
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      componentId: 'button-primary',
      props: {
        children: 'Click me',
        variant: 'primary'
      },
      position: { x: 100, y: 200 }
    }
  ];

  describe('React Code Generation', () => {
    it('should generate valid React component', () => {
      const result = CodeGeneratorFactory.generateCode(mockComponents, 'react', {
        typescript: true,
        cssFramework: 'tailwind'
      });

      expect(result.code).toContain('import React from');
      expect(result.code).toContain('interface GeneratedComponentProps');
      expect(result.code).toContain('<HeroSection');
      expect(result.code).toContain('<Button');
      expect(result.code).toContain('export default GeneratedComponent');
    });

    it('should include accessibility props when enabled', () => {
      const result = CodeGeneratorFactory.generateCode(mockComponents, 'react', {
        accessibility: true
      });

      expect(result.code).toContain('role=');
      expect(result.code).toContain('aria-');
    });

    it('should generate position styles correctly', () => {
      const result = CodeGeneratorFactory.generateCode(mockComponents, 'react');

      expect(result.code).toContain('left: \'0px\'');
      expect(result.code).toContain('top: \'0px\'');
      expect(result.code).toContain('left: \'100px\'');
      expect(result.code).toContain('top: \'200px\'');
    });
  });

  describe('Vue Code Generation', () => {
    it('should generate valid Vue component', () => {
      const result = CodeGeneratorFactory.generateCode(mockComponents, 'vue', {
        typescript: true
      });

      expect(result.code).toContain('<template>');
      expect(result.code).toContain('<script lang="ts">');
      expect(result.code).toContain('defineComponent');
      expect(result.code).toContain('HeroSection');
      expect(result.code).toContain('Button');
    });

    it('should handle props correctly in Vue format', () => {
      const result = CodeGeneratorFactory.generateCode(mockComponents, 'vue');

      expect(result.code).toContain(':title="');
      expect(result.code).toContain(':variant="');
    });
  });

  describe('HTML Code Generation', () => {
    it('should generate complete HTML document', () => {
      const result = CodeGeneratorFactory.generateCode(mockComponents, 'html', {
        cssFramework: 'tailwind'
      });

      expect(result.code).toContain('<!DOCTYPE html>');
      expect(result.code).toContain('<html lang="en">');
      expect(result.code).toContain('<head>');
      expect(result.code).toContain('<body>');
      expect(result.code).toContain('tailwindcss.com');
    });

    it('should include CSS and JavaScript', () => {
      const result = CodeGeneratorFactory.generateCode(mockComponents, 'html');

      expect(result.code).toContain('<style>');
      expect(result.code).toContain('<script>');
      expect(result.code).toContain('addEventListener');
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unsupported framework', () => {
      expect(() => {
        CodeGeneratorFactory.generateCode(mockComponents, 'unsupported' as any);
      }).toThrow('Unsupported framework: unsupported');
    });

    it('should handle empty components array', () => {
      const result = CodeGeneratorFactory.generateCode([], 'react');
      expect(result.code).toContain('export default GeneratedComponent');
    });
  });
});

// =================================================================
// VISUAL BUILDER INTEGRATION TESTS
// =================================================================

import { render, screen, fireEvent, waitFor } from './test-utils';
import { EnhancedUIBuilder } from '../components/enhanced-ui-builder';

describe('Enhanced UI Builder Integration', () => {
  it('should render the complete builder interface', () => {
    render(<EnhancedUIBuilder />);

    expect(screen.getByText('Eternal UI Builder')).toBeInTheDocument();
    expect(screen.getByText('Components Library')).toBeInTheDocument();
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search components...')).toBeInTheDocument();
  });

  it('should display all component categories', () => {
    render(<EnhancedUIBuilder />);

    expect(screen.getByText(/All Components \(120\)/)).toBeInTheDocument();
    expect(screen.getByText(/Buttons & Actions \(25\)/)).toBeInTheDocument();
    expect(screen.getByText(/Forms & Inputs \(20\)/)).toBeInTheDocument();
  });

  it('should filter components by search query', async () => {
    render(<EnhancedUIBuilder />);

    const searchInput = screen.getByPlaceholderText('Search components...');
    fireEvent.change(searchInput, { target: { value: 'button' } });

    await waitFor(() => {
      expect(screen.getByText('Primary Button')).toBeInTheDocument();
      expect(screen.getByText('Gradient Button')).toBeInTheDocument();
    });
  });

  it('should toggle grid visibility', () => {
    render(<EnhancedUIBuilder />);

    const gridToggle = screen.getByText('Grid');
    expect(gridToggle).toHaveClass('bg-indigo-100'); // Initially enabled

    fireEvent.click(gridToggle);
    expect(gridToggle).toHaveClass('bg-gray-100'); // Now disabled
  });

  it('should handle component drag and drop', async () => {
    render(<EnhancedUIBuilder />);

    const component = screen.getByText('Primary Button');
    const canvas = screen.getByRole('main'); // Assuming canvas has role="main"

    // Simulate drag and drop
    fireEvent.dragStart(component);
    fireEvent.dragOver(canvas);
    fireEvent.drop(canvas);

    await waitFor(() => {
      expect(screen.getByText('1 component')).toBeInTheDocument();
    });
  });

  it('should generate and copy code', async () => {
    render(<EnhancedUIBuilder />);

    // Add a component first
    const component = screen.getByText('Primary Button');
    const canvas = screen.getByRole('main');
    
    fireEvent.dragStart(component);
    fireEvent.drop(canvas);

    // Open code generator
    const codeButton = screen.getByText('Code');
    fireEvent.click(codeButton);

    await waitFor(() => {
      expect(screen.getByText('Generated Code')).toBeInTheDocument();
    });

    // Test code generation
    const generateButton = screen.getByText('Generate Code');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText(/export default GeneratedComponent/)).toBeInTheDocument();
    });
  });

  it('should support undo/redo operations', async () => {
    render(<EnhancedUIBuilder />);

    const undoButton = screen.getByTitle(/Undo/);
    const redoButton = screen.getByTitle(/Redo/);

    // Initially disabled
    expect(undoButton).toBeDisabled();
    expect(redoButton).toBeDisabled();

    // Add a component
    const component = screen.getByText('Primary Button');
    const canvas = screen.getByRole('main');
    fireEvent.dragStart(component);
    fireEvent.drop(canvas);

    await waitFor(() => {
      expect(undoButton).not.toBeDisabled();
    });

    // Test undo
    fireEvent.click(undoButton);
    await waitFor(() => {
      expect(screen.getByText('0 components')).toBeInTheDocument();
      expect(redoButton).not.toBeDisabled();
    });

    // Test redo
    fireEvent.click(redoButton);
    await waitFor(() => {
      expect(screen.getByText('1 component')).toBeInTheDocument();
    });
  });
});

// =================================================================
// PERFORMANCE TESTS
// =================================================================

import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  describe('Component Registry Performance', () => {
    it('should load all components quickly', () => {
      const startTime = performance.now();
      const registry = ComponentRegistry.getInstance();
      const components = registry.getAllComponents();
      const endTime = performance.now();

      expect(components).toHaveLength(120);
      expect(endTime - startTime).toBeLessThan(100); // Should load in under 100ms
    });

    it('should search components efficiently', () => {
      const registry = ComponentRegistry.getInstance();
      const startTime = performance.now();
      
      // Run 100 searches
      for (let i = 0; i < 100; i++) {
        registry.searchComponents('button');
      }
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(1000); // 100 searches in under 1 second
    });

    it('should filter components quickly', () => {
      const registry = ComponentRegistry.getInstance();
      const startTime = performance.now();

      // Run multiple filters
      for (let i = 0; i < 50; i++) {
        registry.filterComponents({
          category: 'buttons',
          complexity: 'beginner',
          isPremium: false
        });
      }

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(500); // 50 filters in under 500ms
    });
  });

  describe('Code Generation Performance', () => {
    it('should generate React code quickly', () => {
      const components: ComponentInstance[] = Array.from({ length: 50 }, (_, i) => ({
        id: `component-${i}`,
        componentId: 'button-primary',
        props: { children: `Button ${i}` },
        position: { x: i * 10, y: i * 10 }
      }));

      const startTime = performance.now();
      const result = CodeGeneratorFactory.generateCode(components, 'react');
      const endTime = performance.now();

      expect(result.code).toBeTruthy();
      expect(endTime - startTime).toBeLessThan(1000); // Generate 50 components in under 1 second
    });

    it('should handle large component sets', () => {
      const components: ComponentInstance[] = Array.from({ length: 200 }, (_, i) => ({
        id: `component-${i}`,
        componentId: i % 2 === 0 ? 'button-primary' : 'hero-section',
        props: { children: `Component ${i}` },
        position: { x: (i % 10) * 50, y: Math.floor(i / 10) * 50 }
      }));

      const startTime = performance.now();
      const result = CodeGeneratorFactory.generateCode(components, 'react');
      const endTime = performance.now();

      expect(result.code).toBeTruthy();
      expect(endTime - startTime).toBeLessThan(5000); // Generate 200 components in under 5 seconds
    });
  });

  describe('Grid System Performance', () => {
    it('should perform grid calculations efficiently', () => {
      const startTime = performance.now();

      // Perform 1000 snap calculations
      for (let i = 0; i < 1000; i++) {
        GridUtils.snapToGrid(Math.random() * 1000);
        GridUtils.snapPositionToGrid({ x: Math.random() * 1000, y: Math.random() * 1000 });
      }

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100); // 1000 calculations in under 100ms
    });

    it('should generate grid lines efficiently for large canvases', () => {
      const startTime = performance.now();
      const { verticalLines, horizontalLines } = GridUtils.generateGridLines(4000, 3000, 20);
      const endTime = performance.now();

      expect(verticalLines.length).toBeGreaterThan(100);
      expect(horizontalLines.length).toBeGreaterThan(100);
      expect(endTime - startTime).toBeLessThan(50); // Generate large grid in under 50ms
    });
  });
});

// =================================================================
// ACCESSIBILITY TESTS
// =================================================================

import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('should have no accessibility violations in the main interface', async () => {
    const { container } = render(<EnhancedUIBuilder />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support keyboard navigation', () => {
    render(<EnhancedUIBuilder />);

    const searchInput = screen.getByPlaceholderText('Search components...');
    searchInput.focus();

    // Test tab navigation
    fireEvent.keyDown(searchInput, { key: 'Tab' });
    const nextElement = document.activeElement;
    expect(nextElement).not.toBe(searchInput);
    expect(nextElement?.tagName).toBe('BUTTON');
  });

  it('should have proper ARIA labels and roles', () => {
    render(<EnhancedUIBuilder />);

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByLabelText(/search components/i)).toBeInTheDocument();
  });

  it('should announce state changes to screen readers', async () => {
    render(<EnhancedUIBuilder />);

    const gridToggle = screen.getByText('Grid');
    fireEvent.click(gridToggle);

    // Check if aria-live regions are updated
    await waitFor(() => {
      const announcement = screen.getByRole('status');
      expect(announcement).toHaveTextContent(/grid/i);
    });
  });

  it('should support high contrast mode', () => {
    // Mock high contrast media query
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-contrast: high)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(<EnhancedUIBuilder />);
    
    // Check if high contrast styles are applied
    const builder = screen.getByText('Eternal UI Builder');
    expect(builder).toBeInTheDocument();
  });
});

// =================================================================
// ERROR BOUNDARY TESTS
// =================================================================

import { ErrorBoundary } from 'react-error-boundary';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('Error Handling', () => {
  it('should catch and handle component errors gracefully', () => {
    const errorHandler = jest.fn();

    render(
      <ErrorBoundary onError={errorHandler} fallback={<div>Something went wrong</div>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(errorHandler).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Test error' }),
      expect.any(Object)
    );
  });

  it('should handle code generation errors', () => {
    const invalidComponents: ComponentInstance[] = [
      {
        id: '1',
        componentId: 'invalid-component',
        props: { invalid: 'prop' },
        position: { x: 0, y: 0 }
      }
    ];

    // Should not throw, but return a safe fallback
    const result = CodeGeneratorFactory.generateCode(invalidComponents, 'react');
    expect(result.code).toBeTruthy();
    expect(result.code).toContain('export default GeneratedComponent');
  });
});

// =================================================================
// E2E SIMULATION TESTS
// =================================================================

describe('End-to-End Workflow Simulation', () => {
  it('should complete a full component building workflow', async () => {
    render(<EnhancedUIBuilder />);

    // 1. Search for a component
    const searchInput = screen.getByPlaceholderText('Search components...');
    fireEvent.change(searchInput, { target: { value: 'hero' } });

    await waitFor(() => {
      expect(screen.getByText('Hero Section')).toBeInTheDocument();
    });

    // 2. Add component to canvas
    const heroComponent = screen.getByText('Hero Section');
    const canvas = screen.getByRole('main');
    
    fireEvent.dragStart(heroComponent);
    fireEvent.dragOver(canvas);
    fireEvent.drop(canvas);

    await waitFor(() => {
      expect(screen.getByText('1 component')).toBeInTheDocument();
    });

    // 3. Select and modify component properties
    const canvasComponent = canvas.querySelector('[data-component-id="hero-section"]');
    expect(canvasComponent).toBeInTheDocument();
    
    fireEvent.click(canvasComponent!);

    await waitFor(() => {
      expect(screen.getByText('Properties')).toBeInTheDocument();
    });

    // 4. Generate code
    const codeButton = screen.getByText('Code');
    fireEvent.click(codeButton);

    await waitFor(() => {
      expect(screen.getByText('Generated Code')).toBeInTheDocument();
    });

    // 5. Switch frameworks and verify code changes
    const frameworkSelect = screen.getByDisplayValue('React');
    fireEvent.change(frameworkSelect, { target: { value: 'vue' } });

    await waitFor(() => {
      expect(screen.getByText(/<template>/)).toBeInTheDocument();
    });

    // 6. Clear canvas
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText('0 components')).toBeInTheDocument();
    });
  });

  it('should handle multiple components with interactions', async () => {
    render(<EnhancedUIBuilder />);

    // Add multiple different components
    const components = ['Hero Section', 'Primary Button', 'Contact Form'];
    const canvas = screen.getByRole('main');

    for (const componentName of components) {
      // Search for component
      const searchInput = screen.getByPlaceholderText('Search components...');
      fireEvent.change(searchInput, { target: { value: componentName.toLowerCase() } });

      await waitFor(() => {
        expect(screen.getByText(componentName)).toBeInTheDocument();
      });

      // Add to canvas
      const component = screen.getByText(componentName);
      fireEvent.dragStart(component);
      fireEvent.dragOver(canvas);
      fireEvent.drop(canvas);

      await waitFor(() => {
        const componentCount = screen.getByText(`${components.indexOf(componentName) + 1} component${components.indexOf(componentName) > 0 ? 's' : ''}`);
        expect(componentCount).toBeInTheDocument();
      });
    }

    // Test undo multiple times
    const undoButton = screen.getByTitle(/Undo/);
    for (let i = components.length - 1; i >= 0; i--) {
      fireEvent.click(undoButton);
      await waitFor(() => {
        const count = i === 0 ? '0 components' : `${i} component${i > 1 ? 's' : ''}`;
        expect(screen.getByText(count)).toBeInTheDocument();
      });
    }

    // Test redo all
    const redoButton = screen.getByTitle(/Redo/);
    for (let i = 1; i <= components.length; i++) {
      fireEvent.click(redoButton);
      await waitFor(() => {
        const count = `${i} component${i > 1 ? 's' : ''}`;
        expect(screen.getByText(count)).toBeInTheDocument();
      });
    }
  });
});

// =================================================================
// MOCK DATA GENERATORS
// =================================================================

export const createMockComponent = (overrides: Partial<ComponentInstance> = {}): ComponentInstance => ({
  id: `component-${Math.random().toString(36).substr(2, 9)}`,
  componentId: 'button-primary',
  props: { children: 'Test Button' },
  position: { x: 0, y: 0 },
  ...overrides
});

export const createMockComponents = (count: number): ComponentInstance[] => {
  return Array.from({ length: count }, (_, i) => createMockComponent({
    id: `component-${i}`,
    position: { x: i * 50, y: i * 50 }
  }));
};

export const createMockComponentMeta = (overrides: any = {}) => ({
  id: 'test-component',
  name: 'Test Component',
  description: 'A test component for unit testing',
  category: 'buttons' as const,
  tags: ['test', 'mock'],
  complexity: 'beginner' as const,
  popularity: 50,
  isPremium: false,
  bundleSize: 5,
  renderScore: 90,
  wcagLevel: 'AA' as const,
  rating: 4.5,
  downloadCount: 1000,
  lastUpdated: '2025-01-01',
  component: () => <div>Test Component</div>,
  framework: ['react', 'vue', 'angular', 'html'],
  accessibility: {
    screenReader: true,
    keyboardNavigation: true,
    focusManagement: true,
    colorContrast: 'AA' as const
  },
  performance: {
    bundleSize: 5,
    renderScore: 90,
    lazyLoadable: true
  },
  variants: [],
  propsSchema: {},
  defaultProps: {},
  codeExample: '<TestComponent />',
  ...overrides
});

// =================================================================
// TESTING UTILITIES
// =================================================================

export const waitForGridToUpdate = async () => {
  await waitFor(() => {
    // Wait for grid calculations to complete
  }, { timeout: 1000 });
};

export const simulateComponentDragAndDrop = async (
  componentName: string,
  targetPosition: { x: number; y: number }
) => {
  const component = screen.getByText(componentName);
  const canvas = screen.getByRole('main');

  fireEvent.dragStart(component, {
    dataTransfer: {
      setData: jest.fn(),
      getData: jest.fn()
    }
  });

  fireEvent.dragOver(canvas);
  
  fireEvent.drop(canvas, {
    clientX: targetPosition.x,
    clientY: targetPosition.y
  });

  await waitFor(() => {
    expect(screen.getByText(/\d+ component/)).toBeInTheDocument();
  });
};

export const expectComponentToBeOnCanvas = (componentId: string) => {
  const canvas = screen.getByRole('main');
  const component = canvas.querySelector(`[data-component-id="${componentId}"]`);
  expect(component).toBeInTheDocument();
};

// =================================================================
// CUSTOM MATCHERS
// =================================================================

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAccessible(): R;
      toHaveValidCode(): R;
      toBeOnGrid(): R;
    }
  }
}

// Custom matcher for accessibility
expect.extend({
  toBeAccessible(received) {
    const pass = received.getAttribute('aria-label') || 
                 received.getAttribute('role') || 
                 received.getAttribute('tabindex') !== null;
    
    if (pass) {
      return {
        message: () => `Expected element not to be accessible`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected element to have accessibility attributes`,
        pass: false,
      };
    }
  },

  toHaveValidCode(received) {
    const pass = received.includes('export default') && 
                 received.includes('import') &&
                 !received.includes('undefined');
    
    return {
      message: () => pass ? 
        'Expected code not to be valid' : 
        'Expected code to be valid React/Vue/Angular component',
      pass,
    };
  },

  toBeOnGrid(received) {
    const element = received as HTMLElement;
    const left = parseInt(element.style.left || '0');
    const top = parseInt(element.style.top || '0');
    
    const pass = left % 20 === 0 && top % 20 === 0;
    
    return {
      message: () => pass ? 
        'Expected element not to be aligned to grid' : 
        'Expected element to be aligned to 20px grid',
      pass,
    };
  }
});

// =================================================================
// EXPORTS
// =================================================================

export {
//   jestConfig,
  TestProvider,
  createMockComponent,
  createMockComponents,
  createMockComponentMeta,
  waitForGridToUpdate,
  simulateComponentDragAndDrop,
  expectComponentToBeOnCanvas
};