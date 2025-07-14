import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Minimize, 
  Maximize, 
  Trash2, 
  Move, 
  RotateCcw,
  Copy,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  MoreHorizontal
} from 'lucide-react';

// Types for the Draggable Resizable Component
interface CanvasComponent {
  id: string;
  type: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  styles: Record<string, string>;
  isMinimized?: boolean;
  isLocked?: boolean;
  isHidden?: boolean;
  zIndex?: number;
}

interface DraggableResizableComponentProps {
  component: CanvasComponent;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onResizeStart: (e: React.MouseEvent, handle: string) => void;
  onMinimize: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  onLock?: () => void;
  onHide?: () => void;
  theme: 'light' | 'dark';
  gridConfig?: {
    snapEnabled: boolean;
    cellSize: number;
    gap: number;
  };
  showGrid?: boolean;
}

interface ResizeHandle {
  id: string;
  className: string;
  cursor: string;
  position: string;
}

/**
 * Professional Draggable and Resizable Component
 * 
 * Features:
 * - 8-point resize handles (corners and edges)
 * - Drag and drop functionality with snap-to-grid
 * - Minimize/maximize functionality
 * - Component locking to prevent accidental changes
 * - Visibility toggle
 * - Advanced visual feedback and animations
 * - Context menu with common actions
 * - Keyboard shortcuts support
 * - Accessibility features
 * - Professional styling with hover effects
 * 
 * Usage:
 * - Click and drag to move component
 * - Drag resize handles to change size
 * - Use control bar for component actions
 * - Right-click for context menu
 * - Keyboard shortcuts for common operations
 */
const DraggableResizableComponent: React.FC<DraggableResizableComponentProps> = ({
  component,
  isSelected,
  onMouseDown,
  onResizeStart,
  onMinimize,
  onDelete,
  onDuplicate,
  onLock,
  onHide,
  theme,
  gridConfig,
  showGrid = false
}) => {
  // Local state for interactions
  const [isHovered, setIsHovered] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [dragPreview, setDragPreview] = useState<{ x: number; y: number } | null>(null);
  
  const componentRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Define resize handles with enhanced positioning
  const resizeHandles: ResizeHandle[] = [
    { 
      id: 'nw', 
      className: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2', 
      cursor: 'nw-resize',
      position: 'top-left'
    },
    { 
      id: 'n', 
      className: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', 
      cursor: 'n-resize',
      position: 'top-center'
    },
    { 
      id: 'ne', 
      className: 'top-0 right-0 translate-x-1/2 -translate-y-1/2', 
      cursor: 'ne-resize',
      position: 'top-right'
    },
    { 
      id: 'e', 
      className: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', 
      cursor: 'e-resize',
      position: 'middle-right'
    },
    { 
      id: 'se', 
      className: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2', 
      cursor: 'se-resize',
      position: 'bottom-right'
    },
    { 
      id: 's', 
      className: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', 
      cursor: 's-resize',
      position: 'bottom-center'
    },
    { 
      id: 'sw', 
      className: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2', 
      cursor: 'sw-resize',
      position: 'bottom-left'
    },
    { 
      id: 'w', 
      className: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2', 
      cursor: 'w-resize',
      position: 'middle-left'
    },
  ];

  // Handle context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (component.isLocked) return;
    
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  }, [component.isLocked]);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false);
      }
    };

    if (showContextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showContextMenu]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSelected) return;

      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          onDelete();
          break;
        case 'd':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onDuplicate?.();
          }
          break;
        case 'l':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onLock?.();
          }
          break;
        case 'h':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onHide?.();
          }
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          e.preventDefault();
          // Fine positioning with arrow keys would be handled by parent
          break;
      }
    };

    if (isSelected) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSelected, onDelete, onDuplicate, onLock, onHide]);

  // Get component type styling
  const getComponentTypeStyles = () => {
    const baseStyles = {
      borderRadius: component.styles.borderRadius || '8px',
      padding: component.styles.padding || '12px',
      fontSize: component.styles.fontSize || '16px',
      border: component.styles.border || '2px solid #6366f1',
      backgroundColor: component.styles.backgroundColor || (theme === 'dark' ? '#374151' : '#ffffff'),
      color: component.styles.color || (theme === 'dark' ? '#f3f4f6' : '#111827')
    };

    // Add type-specific styling
    switch (component.type) {
      case 'button':
        return {
          ...baseStyles,
          cursor: 'pointer',
          fontWeight: '600',
          textAlign: 'center' as const,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
      case 'text':
        return {
          ...baseStyles,
          lineHeight: '1.5',
          overflow: 'hidden'
        };
      case 'card':
        return {
          ...baseStyles,
          boxShadow: theme === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px'
        };
      case 'image':
        return {
          ...baseStyles,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
        //   backgroundSize: '20px 20px',
        //   backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        };
      default:
        return baseStyles;
    }
  };

  // Context menu items
  const contextMenuItems = [
    { 
      icon: Copy, 
      label: 'Duplicate', 
      action: onDuplicate, 
      shortcut: 'Ctrl+D',
      disabled: !onDuplicate 
    },
    { 
      icon: component.isLocked ? Unlock : Lock, 
      label: component.isLocked ? 'Unlock' : 'Lock', 
      action: onLock, 
      shortcut: 'Ctrl+L',
      disabled: !onLock 
    },
    { 
      icon: component.isHidden ? Eye : EyeOff, 
      label: component.isHidden ? 'Show' : 'Hide', 
      action: onHide, 
      shortcut: 'Ctrl+H',
      disabled: !onHide 
    },
    { 
      icon: RotateCcw, 
      label: 'Reset Position', 
      action: () => {
        // This would need to be handled by parent component
        console.log('Reset position');
      }, 
      shortcut: '',
      disabled: false 
    },
    { 
      icon: Trash2, 
      label: 'Delete', 
      action: onDelete, 
      shortcut: 'Del',
      disabled: false,
      destructive: true 
    },
  ];

  return (
    <>
      <div
        ref={componentRef}
        className={`absolute select-none transition-all duration-200 group ${
          isSelected ? 'z-20' : isHovered ? 'z-10' : 'z-0'
        } ${component.isMinimized ? 'opacity-50' : 'opacity-100'} ${
          component.isLocked ? 'pointer-events-none' : ''
        } ${component.isHidden ? 'opacity-30' : ''}`}
        style={{
          left: component.position.x,
          top: component.position.y,
          width: component.isMinimized ? 40 : component.size.width,
          height: component.isMinimized ? 40 : component.size.height,
          zIndex: component.zIndex || 1,
          transform: dragPreview ? `translate(${dragPreview.x}px, ${dragPreview.y}px)` : 'none'
        }}
        onMouseDown={component.isLocked ? undefined : onMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onContextMenu={handleContextMenu}
        role="button"
        tabIndex={0}
        aria-label={`${component.type} component: ${component.content}`}
        aria-selected={isSelected}
      >
        {/* Component Content */}
        <div 
          className={`w-full h-full transition-all duration-200 flex items-center justify-center text-center relative overflow-hidden ${
            isSelected 
              ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' 
              : isHovered && !component.isLocked
              ? 'ring-1 ring-indigo-300 dark:ring-indigo-500'
              : ''
          } ${
            component.isLocked ? 'cursor-not-allowed' : 'cursor-move'
          }`}
          style={getComponentTypeStyles()}
        >
          {/* Lock indicator */}
          {component.isLocked && (
            <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <Lock className="w-2 h-2 text-white" />
            </div>
          )}

          {/* Hidden indicator */}
          {component.isHidden && (
            <div className="absolute top-1 left-1 w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center">
              <EyeOff className="w-2 h-2 text-white" />
            </div>
          )}

          {/* Component content */}
          {!component.isMinimized ? (
            <div className="w-full h-full p-2 overflow-hidden">
              {/* Type-specific content rendering */}
              {component.type === 'image' ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🖼️</div>
                    <div className="text-xs">Image</div>
                  </div>
                </div>
              ) : component.type === 'button' ? (
                <div className="font-semibold">{component.content || 'Button'}</div>
              ) : (
                <div>
                  <div className="text-sm font-medium truncate">{component.content || 'Content'}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                    {component.type}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-500 dark:text-gray-400">•••</div>
          )}

          {/* Grid snap indicator */}
          {showGrid && gridConfig?.snapEnabled && isSelected && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-2 h-2 bg-green-500 rounded-full opacity-75"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full opacity-75"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-500 rounded-full opacity-75"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full opacity-75"></div>
            </div>
          )}
        </div>

        {/* Component Controls */}
        {isSelected && !component.isMinimized && !component.isLocked && (
          <>
            {/* Control Bar */}
            <div className="absolute -top-10 left-0 flex items-center space-x-1 bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs shadow-lg backdrop-blur-sm bg-opacity-95">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                className="hover:bg-indigo-700 p-1 rounded transition-colors"
                title="Minimize (M)"
                aria-label="Minimize component"
              >
                <Minimize className="w-3 h-3" />
              </button>
              
              {onLock && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLock();
                  }}
                  className="hover:bg-indigo-700 p-1 rounded transition-colors"
                  title="Lock component (Ctrl+L)"
                  aria-label="Lock component"
                >
                  <Lock className="w-3 h-3" />
                </button>
              )}

              {onDuplicate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate();
                  }}
                  className="hover:bg-indigo-700 p-1 rounded transition-colors"
                  title="Duplicate (Ctrl+D)"
                  aria-label="Duplicate component"
                >
                  <Copy className="w-3 h-3" />
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="hover:bg-red-600 p-1 rounded transition-colors"
                title="Delete (Del)"
                aria-label="Delete component"
              >
                <Trash2 className="w-3 h-3" />
              </button>

              <div className="px-2 py-1 bg-indigo-500 rounded text-xs font-mono">
                {component.id}
              </div>
            </div>

            {/* Resize Handles */}
            {resizeHandles.map((handle) => (
              <div
                key={handle.id}
                className={`absolute w-3 h-3 bg-indigo-600 border-2 border-white rounded-sm opacity-0 group-hover:opacity-100 hover:opacity-100 hover:scale-125 hover:bg-indigo-700 transition-all duration-150 ${handle.className}`}
                style={{ cursor: handle.cursor }}
                onMouseDown={(e) => onResizeStart(e, handle.id)}
                title={`Resize ${handle.position}`}
                aria-label={`Resize handle ${handle.position}`}
              />
            ))}

            {/* Selection outline with animation */}
            <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg pointer-events-none">
              <div className="absolute inset-0 border border-white rounded-lg opacity-50"></div>
            </div>

            {/* Component info tooltip */}
            <div className="absolute -bottom-8 left-0 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {component.size.width}×{component.size.height} • {component.position.x},{component.position.y}
            </div>
          </>
        )}

        {/* Minimized Component Restore */}
        {component.isMinimized && (
          <div className="absolute -top-8 left-0 flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="bg-indigo-600 text-white px-2 py-1 rounded text-xs hover:bg-indigo-700 transition-colors shadow-lg flex items-center space-x-1"
              title="Restore"
              aria-label="Restore component"
            >
              <Maximize className="w-3 h-3" />
              <span>{component.type}</span>
            </button>
          </div>
        )}

        {/* Hover effects for non-selected components */}
        {!isSelected && isHovered && !component.isLocked && !component.isMinimized && (
          <div className="absolute inset-0 border-2 border-indigo-300 dark:border-indigo-500 rounded-lg pointer-events-none transition-all duration-200 opacity-75">
            <div className="absolute -top-6 left-0 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-90">
              Click to select
            </div>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-48"
          style={{
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
          }}
        >
          {contextMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (!item.disabled && item.action) {
                  item.action();
                }
                setShowContextMenu(false);
              }}
              disabled={item.disabled}
              className={`w-full px-3 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                item.disabled 
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                  : item.destructive
                  ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <span className="text-xs text-gray-400 dark:text-gray-600">
                  {item.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default DraggableResizableComponent;