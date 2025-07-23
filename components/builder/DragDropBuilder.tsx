import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Type, Layout, MousePointer, Image, Grid, Square, 
  Plus, Trash2, Copy, Move, Eye, Code, Settings,
  Smartphone, Tablet, Monitor, Undo, Redo, Save,
  Play, Download, Share, Palette, Layers, Zap
} from 'lucide-react';

/**
 * 🎯 PRIORITY 1: DRAG & DROP INTERFACE
 * 
 * Core visual builder with:
 * - Smooth drag & drop interactions
 * - Component library sidebar
 * - Canvas with grid system
 * - Property editor
 * - Multi-device preview
 * - Undo/redo system
 */

// Component library data
const COMPONENT_LIBRARY = [
  {
    category: 'Typography',
    components: [
      { id: 'heading', name: 'Heading', icon: Type, color: 'bg-blue-500' },
      { id: 'paragraph', name: 'Paragraph', icon: Type, color: 'bg-blue-400' },
      { id: 'text', name: 'Text', icon: Type, color: 'bg-blue-300' }
    ]
  },
  {
    category: 'Layout',
    components: [
      { id: 'container', name: 'Container', icon: Square, color: 'bg-green-500' },
      { id: 'section', name: 'Section', icon: Layout, color: 'bg-green-400' },
      { id: 'grid', name: 'Grid', icon: Grid, color: 'bg-green-300' }
    ]
  },
  {
    category: 'Interactive',
    components: [
      { id: 'button', name: 'Button', icon: MousePointer, color: 'bg-purple-500' },
      { id: 'link', name: 'Link', icon: MousePointer, color: 'bg-purple-400' },
      { id: 'form', name: 'Form', icon: Layout, color: 'bg-purple-300' }
    ]
  },
  {
    category: 'Media',
    components: [
      { id: 'image', name: 'Image', icon: Image, color: 'bg-orange-500' },
      { id: 'video', name: 'Video', icon: Play, color: 'bg-orange-400' },
      { id: 'gallery', name: 'Gallery', icon: Image, color: 'bg-orange-300' }
    ]
  }
];

// Canvas element component
const CanvasElement = ({ element, isSelected, onSelect, onUpdate, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const renderElementContent = () => {
    switch (element.type) {
      case 'heading':
        return (
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {element.props.text || 'Sample Heading'}
          </h2>
        );
      case 'paragraph':
        return (
          <p className="text-gray-600 dark:text-gray-300">
            {element.props.text || 'This is a sample paragraph text that demonstrates how the component looks.'}
          </p>
        );
      case 'text':
        return (
          <span className="text-gray-800 dark:text-gray-200">
            {element.props.text || 'Sample text'}
          </span>
        );
      case 'button':
        return (
          <button className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            element.props.variant === 'secondary' 
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}>
            {element.props.text || 'Click Me'}
          </button>
        );
      case 'container':
        return (
          <div className={`min-h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 ${
            element.children?.length ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            {element.children?.length ? (
              element.children.map(child => (
                <CanvasElement
                  key={child.id}
                  element={child}
                  isSelected={false}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Drop components here
              </div>
            )}
          </div>
        );
      case 'section':
        return (
          <section className="min-h-32 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700">
            <div className="text-center text-gray-600 dark:text-gray-300">
              Section Component
            </div>
          </section>
        );
      case 'image':
        return (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
        );
      default:
        return (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded border">
            {element.type} Component
          </div>
        );
    }
  };

  return (
    <div
      ref={elementRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
      className={`relative group cursor-move ${
        isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
      style={{
        position: 'absolute',
        left: element.position.x,
        top: element.position.y,
        width: element.size?.width || 'auto',
        height: element.size?.height || 'auto'
      }}
    >
      {renderElementContent()}
      
      {/* Element controls */}
      {isSelected && (
        <div className="absolute -top-8 left-0 flex items-center gap-1 bg-indigo-500 text-white px-2 py-1 rounded text-xs">
          <span>{element.type}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
            className="ml-2 hover:bg-indigo-600 p-1 rounded"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {/* Resize handles */}
      {isSelected && (
        <>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full cursor-se-resize"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full cursor-ne-resize"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-500 rounded-full cursor-sw-resize"></div>
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-indigo-500 rounded-full cursor-nw-resize"></div>
        </>
      )}
    </div>
  );
};

// Main drag & drop builder
const DragDropBuilder = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [canvasMode, setCanvasMode] = useState('desktop'); // desktop, tablet, mobile
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef(null);

  // Save state to history for undo/redo
  const saveToHistory = useCallback((newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newElements)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Add element to canvas
  const addElement = useCallback((componentType, position) => {
    const newElement = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      position: position || { x: 100, y: 100 },
      size: { width: 'auto', height: 'auto' },
      props: {
        text: componentType === 'heading' ? 'New Heading' :
              componentType === 'paragraph' ? 'New paragraph text.' :
              componentType === 'button' ? 'Button' :
              componentType === 'text' ? 'Text' : 'Content'
      },
      children: componentType === 'container' ? [] : undefined
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(newElement.id);
  }, [elements, saveToHistory]);

  // Handle drag start from component library
  const handleDragStart = (e, component) => {
    setDraggedItem(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Handle drop on canvas
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const position = {
      x: e.clientX - canvasRect.left - 50, // Offset for better positioning
      y: e.clientY - canvasRect.top - 25
    };

    addElement(draggedItem.id, position);
    setDraggedItem(null);
  }, [draggedItem, addElement]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Update element properties
  const updateElement = useCallback((elementId, updates) => {
    const newElements = elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    );
    setElements(newElements);
    saveToHistory(newElements);
  }, [elements, saveToHistory]);

  // Delete element
  const deleteElement = useCallback((elementId) => {
    const newElements = elements.filter(el => el.id !== elementId);
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(null);
  }, [elements, saveToHistory]);

  // Undo/Redo functionality
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  // Get selected element data
  const selectedElementData = elements.find(el => el.id === selectedElement);

  // Canvas dimensions based on mode
  const getCanvasDimensions = () => {
    switch (canvasMode) {
      case 'mobile':
        return { width: '375px', height: '812px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      
      {/* Component Library Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Components</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Drag to add to canvas</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {COMPONENT_LIBRARY.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {category.components.map((component) => {
                  const Icon = component.icon;
                  return (
                    <div
                      key={component.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, component)}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                    >
                      <div className={`w-8 h-8 ${component.color} rounded-lg flex items-center justify-center mb-2`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xs font-medium text-gray-900 dark:text-white">
                        {component.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Toolbar */}
        <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Undo/Redo */}
            <div className="flex items-center gap-1">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {/* Device Preview */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCanvasMode('desktop')}
                className={`p-2 rounded ${canvasMode === 'desktop' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCanvasMode('tablet')}
                className={`p-2 rounded ${canvasMode === 'tablet' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCanvasMode('mobile')}
                className={`p-2 rounded ${canvasMode === 'mobile' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
              <Eye className="w-4 h-4 inline mr-1" />
              Preview
            </button>
            <button className="px-3 py-1 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded">
              <Save className="w-4 h-4 inline mr-1" />
              Save
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-8">
          <div
            ref={canvasRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => setSelectedElement(null)}
            className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg mx-auto"
            style={{
              ...getCanvasDimensions(),
              minHeight: '600px',
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            {/* Drop zone indicator */}
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Plus className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Start Building
                  </h3>
                  <p className="text-gray-400 dark:text-gray-500">
                    Drag components from the sidebar to get started
                  </p>
                </div>
              </div>
            )}

            {/* Render elements */}
            {elements.map((element) => (
              <CanvasElement
                key={element.id}
                element={element}
                isSelected={selectedElement === element.id}
                onSelect={setSelectedElement}
                onUpdate={updateElement}
                onDelete={deleteElement}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      {selectedElementData && (
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
              {selectedElementData.type} Properties
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              
              {/* Text Content */}
              {['heading', 'paragraph', 'text', 'button'].includes(selectedElementData.type) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text Content
                  </label>
                  <input
                    type="text"
                    value={selectedElementData.props.text || ''}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      props: { ...selectedElementData.props, text: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter text..."
                  />
                </div>
              )}

              {/* Button Variant */}
              {selectedElementData.type === 'button' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Button Style
                  </label>
                  <select
                    value={selectedElementData.props.variant || 'primary'}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      props: { ...selectedElementData.props, variant: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
              )}

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={selectedElementData.position.x}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      position: { ...selectedElementData.position, x: parseInt(e.target.value) || 0 }
                    })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="X"
                  />
                  <input
                    type="number"
                    value={selectedElementData.position.y}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      position: { ...selectedElementData.position, y: parseInt(e.target.value) || 0 }
                    })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Y"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => deleteElement(selectedElementData.id)}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4 inline mr-2" />
                  Delete Element
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropBuilder;