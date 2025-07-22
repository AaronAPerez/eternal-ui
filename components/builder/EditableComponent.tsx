import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Copy, Move } from 'lucide-react';

interface EditableComponentProps {
  component: CanvasComponent;
  isSelected: boolean;
  showGrid: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<CanvasComponent>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function EditableComponent({
  component,
  isSelected,
  showGrid,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate
}: EditableComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(component.props.children || component.props.text || '');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (component.componentId.includes('text') || component.componentId.includes('button')) {
      setIsEditing(true);
    }
  };

  const handleTextSave = () => {
    const updateKey = component.props.children !== undefined ? 'children' : 'text';
    onUpdate(component.id, {
      props: { ...component.props, [updateKey]: tempText }
    });
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextSave();
    } else if (e.key === 'Escape') {
      setTempText(component.props.children || component.props.text || '');
      setIsEditing(false);
    }
  };

  // Snap position to grid if enabled
  const position = showGrid 
    ? {
        x: Math.round(component.position.x / 20) * 20,
        y: Math.round(component.position.y / 20) * 20
      }
    : component.position;

  return (
    <div
      className={`absolute border-2 transition-all cursor-pointer group ${
        isSelected 
          ? 'border-indigo-500 shadow-lg z-10' 
          : 'border-transparent hover:border-gray-300'
      }`}
      style={{ left: position.x, top: position.y }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(component.id);
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Selection handles */}
      {isSelected && (
        <>
          {/* Corner handles */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-indigo-500 rounded-full cursor-nw-resize" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full cursor-ne-resize" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-500 rounded-full cursor-sw-resize" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full cursor-se-resize" />
          
          {/* Action buttons */}
          <div className="absolute -top-10 -right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(component.id);
              }}
              className="w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded flex items-center justify-center"
              title="Duplicate"
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(component.id);
              }}
              className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </>
      )}

      {/* Component content */}
      <div className="relative">
        {isEditing ? (
          <input
            ref={inputRef}
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onBlur={handleTextSave}
            onKeyDown={handleKeyPress}
            className="border-2 border-indigo-500 px-2 py-1 rounded text-sm min-w-20 bg-white"
            style={{ fontSize: 'inherit', fontFamily: 'inherit' }}
          />
        ) : (
          <ComponentRenderer component={component} />
        )}
      </div>
    </div>
  );
}

// Component renderer with enhanced styling
function ComponentRenderer({ component }: { component: CanvasComponent }) {
  const { componentId, props } = component;
  
  switch (componentId) {
    case 'button-primary':
      return (
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
          {props.children || 'Button'}
        </button>
      );
    
    case 'button-secondary':
      return (
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors">
          {props.children || 'Button'}
        </button>
      );
    
    case 'button-outline':
      return (
        <button className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors">
          {props.children || 'Button'}
        </button>
      );
    
    case 'button-gradient':
      return (
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium transition-all hover:scale-105">
          {props.children || 'Button'}
        </button>
      );
    
    case 'button-neon':
      return (
        <button className="px-4 py-2 bg-black text-cyan-400 border-2 border-cyan-400 rounded-lg font-medium shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/50 transition-all">
          {props.children || 'Button'}
        </button>
      );
    
    case 'button-glass':
      return (
        <button className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 rounded-lg font-medium hover:bg-white/30 transition-all">
          {props.children || 'Button'}
        </button>
      );
    
    case 'input-text':
    case 'input-email':
    case 'input-password':
    case 'input-search':
      return (
        <input
          type={props.type || 'text'}
          placeholder={props.placeholder}
          className="border border-gray-300 rounded-lg px-3 py-2 min-w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      );
    
    case 'card':
      return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow min-w-64">
          <h3 className="font-semibold text-gray-900 mb-2">{props.title || 'Card Title'}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{props.content || 'Card content goes here'}</p>
        </div>
      );
    
    case 'navbar':
      return (
        <nav className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm min-w-96">
          <div className="flex items-center justify-between">
            <div className="font-bold text-indigo-600 text-lg">{props.brand || 'Logo'}</div>
            <div className="flex gap-6">
              {(props.links || ['Home', 'About', 'Contact']).map((link, i) => (
                <a key={i} href="#" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </nav>
      );
    
    case 'hero':
      return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-xl min-w-96">
          <h1 className="text-3xl font-bold mb-4">{props.title || 'Hero Title'}</h1>
          <p className="text-indigo-100 text-lg mb-6">{props.subtitle || 'Hero subtitle goes here'}</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Get Started
          </button>
        </div>
      );
    
    default:
      return (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 min-w-32 min-h-16 flex items-center justify-center text-gray-500 text-sm">
          <div className="text-center">
            <div className="font-medium">{componentId}</div>
            <div className="text-xs text-gray-400 mt-1">Component</div>
          </div>
        </div>
      );
  }
}