import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import '@testing-library/jest-dom';
import { VisualBuilder } from '../VisualBuilder';

// Mock dependencies
jest.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }) => <div data-testid="dnd-context">{children}</div>,
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    isDragging: false
  }),
  useDroppable: () => ({
    isOver: false,
    setNodeRef: jest.fn()
  })
}));

describe('VisualBuilder', () => {
  it('renders the visual builder interface', () => {
    render(<VisualBuilder />);
    
    expect(screen.getByText('Eternal UI Builder')).toBeInTheDocument();
    expect(screen.getByText('Components Library')).toBeInTheDocument();
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });

  it('displays component categories', () => {
    render(<VisualBuilder />);
    
    expect(screen.getByText(/All Components/)).toBeInTheDocument();
    expect(screen.getByText(/Buttons & Actions/)).toBeInTheDocument();
    expect(screen.getByText(/Forms & Inputs/)).toBeInTheDocument();
  });

  it('filters components by search query', async () => {
    render(<VisualBuilder />);
    
    const searchInput = screen.getByPlaceholderText('Search components...');
    fireEvent.change(searchInput, { target: { value: 'button' } });

    await waitFor(() => {
      expect(screen.getByText('Primary Button')).toBeInTheDocument();
    });
  });

  it('toggles grid visibility', () => {
    render(<VisualBuilder />);
    
    const gridToggle = screen.getByTitle('Toggle grid snap');
    fireEvent.click(gridToggle);
    
    // Test grid state change
    expect(gridToggle).toHaveClass('bg-gray-100');
  });

  it('generates code for components', () => {
    render(<VisualBuilder />);
    
    const codeButton = screen.getByText('Code');
    fireEvent.click(codeButton);
    
    expect(screen.getByText('Generated Code')).toBeInTheDocument();
  });

  it('supports undo/redo functionality', () => {
    render(<VisualBuilder />);
    
    const undoButton = screen.getByTitle(/Undo/);
    const redoButton = screen.getByTitle(/Redo/);
    
    expect(undoButton).toBeDisabled();
    expect(redoButton).toBeDisabled();
  });
});