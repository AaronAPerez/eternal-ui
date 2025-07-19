'use client'

import React, { useState, useCallback, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  closestCenter,
  rectIntersection
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Search,
  Grid,
  List,
  Filter,
  Star,
  Package,
  Layout,
  Type,
  Image,
  Navigation,
  ShoppingCart,
  BarChart,
  Calendar,
  Mail,
  Video,
  Map,
  Music,
  Camera,
  MessageSquare,
  User,
  Settings,
  Download,
  Plus,
  LucideFormInput,
  Circle
} from 'lucide-react'
import { CanvasElement, ComponentDefinition, useCanvas } from '../Canvas/CanvasSystem'


/**
 * Component Library Data
 * 
 * Comprehensive component definitions with categories,
 * schemas, and export templates for multiple frameworks.
 */

// Component categories for organization
export const COMPONENT_CATEGORIES = {
  layout: {
    name: 'Layout',
    icon: Layout,
    description: 'Structural components for page layout'
  },
  ui: {
    name: 'UI Elements',
    icon: Package,
    description: 'Basic user interface components'
  },
  typography: {
    name: 'Typography',
    icon: Type,
    description: 'Text and heading components'
  },
  media: {
    name: 'Media',
    icon: Image,
    description: 'Images, videos, and media components'
  },
  navigation: {
    name: 'Navigation',
    icon: Navigation,
    description: 'Navigation and menu components'
  },
  forms: {
    name: 'Forms',
    icon: LucideFormInput,
    description: 'Form inputs and controls'
  },
  ecommerce: {
    name: 'E-commerce',
    icon: ShoppingCart,
    description: 'Shopping and commerce components'
  },
  data: {
    name: 'Data Display',
    icon: BarChart,
    description: 'Charts, tables, and data visualization'
  },
  communication: {
    name: 'Communication',
    icon: MessageSquare,
    description: 'Chat, messaging, and social components'
  },
  marketing: {
    name: 'Marketing',
    icon: Star,
    description: 'CTAs, testimonials, and marketing components'
  }
} as const

// Sample component definitions
export const COMPONENT_LIBRARY: ComponentDefinition[] = [
  // Layout Components
  {
    type: 'container',
    name: 'Container',
    category: 'layout',
    icon: Layout,
    defaultProps: {
      maxWidth: '1200px',
      padding: '1rem',
      centerContent: true
    },
    propSchema: {
      maxWidth: {
        type: 'string',
        label: 'Max Width',
        default: '1200px',
        options: [
          { label: 'Small (640px)', value: '640px' },
          { label: 'Medium (768px)', value: '768px' },
          { label: 'Large (1024px)', value: '1024px' },
          { label: 'XL (1280px)', value: '1280px' },
          { label: 'Full Width', value: '100%' }
        ]
      },
      padding: {
        type: 'string',
        label: 'Padding',
        default: '1rem'
      },
      centerContent: {
        type: 'boolean',
        label: 'Center Content',
        default: true
      }
    },
    previewComponent: ({ maxWidth, padding, centerContent, children }: any) => (
      <div
        className={`container ${centerContent ? 'mx-auto' : ''}`}
        style={{ maxWidth, padding }}
      >
        {children || <div className="h-32 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500">Container Content</div>}
      </div>
    ),
    exportTemplate: {
      react: `
<div className="container mx-auto" style={{ maxWidth: '{{maxWidth}}', padding: '{{padding}}' }}>
  {{children}}
</div>`,
      vue: `
<div class="container mx-auto" :style="{ maxWidth: '{{maxWidth}}', padding: '{{padding}}' }">
  {{children}}
</div>`,
      angular: `
<div class="container mx-auto" [ngStyle]="{ maxWidth: '{{maxWidth}}', padding: '{{padding}}' }">
  {{children}}
</div>`
    }
  },
  
  // UI Components
  {
    type: 'button',
    name: 'Button',
    category: 'ui',
    icon: Circle,
    defaultProps: {
      variant: 'primary',
      size: 'medium',
      text: 'Click me',
      disabled: false,
      fullWidth: false
    },
    propSchema: {
      text: {
        type: 'string',
        label: 'Button Text',
        default: 'Click me'
      },
      variant: {
        type: 'select',
        label: 'Variant',
        default: 'primary',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Outline', value: 'outline' },
          { label: 'Ghost', value: 'ghost' },
          { label: 'Link', value: 'link' }
        ]
      },
      size: {
        type: 'select',
        label: 'Size',
        default: 'medium',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' }
        ]
      },
      disabled: {
        type: 'boolean',
        label: 'Disabled',
        default: false
      },
      fullWidth: {
        type: 'boolean',
        label: 'Full Width',
        default: false
      }
    },
    previewComponent: ({ variant, size, text, disabled, fullWidth }: any) => {
      const variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
        outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
        ghost: 'hover:bg-gray-100 text-gray-700',
        link: 'text-blue-500 hover:underline'
      }
      
      const sizes = {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2',
        large: 'px-6 py-3 text-lg'
      }
      
      return (
        <button
          className={`
            rounded transition-colors
            ${variants[variant as keyof typeof variants]}
            ${sizes[size as keyof typeof sizes]}
            ${fullWidth ? 'w-full' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={disabled}
        >
          {text}
        </button>
      )
    },
    exportTemplate: {
      react: `
<button 
  className="{{className}}"
  disabled={{{disabled}}}
  onClick={{{onClick}}}
>
  {{text}}
</button>`,
      vue: `
<button 
  class="{{className}}"
  :disabled="{{disabled}}"
  @click="{{onClick}}"
>
  {{text}}
</button>`,
      angular: `
<button 
  class="{{className}}"
  [disabled]="{{disabled}}"
  (click)="{{onClick}}"
>
  {{text}}
</button>`
    }
  },

  // Typography Components
  {
    type: 'heading',
    name: 'Heading',
    category: 'typography',
    icon: Type,
    defaultProps: {
      level: 1,
      text: 'Your Heading Here',
      align: 'left',
      color: '#000000'
    },
    propSchema: {
      text: {
        type: 'string',
        label: 'Heading Text',
        default: 'Your Heading Here'
      },
      level: {
        type: 'select',
        label: 'Heading Level',
        default: 1,
        options: [
          { label: 'H1', value: 1 },
          { label: 'H2', value: 2 },
          { label: 'H3', value: 3 },
          { label: 'H4', value: 4 },
          { label: 'H5', value: 5 },
          { label: 'H6', value: 6 }
        ]
      },
      align: {
        type: 'select',
        label: 'Text Align',
        default: 'left',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ]
      },
      color: {
        type: 'color',
        label: 'Text Color',
        default: '#000000'
      }
    },
    previewComponent: ({ level, text, align, color }: any) => {
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
      const sizes = {
        1: 'text-4xl font-bold',
        2: 'text-3xl font-bold',
        3: 'text-2xl font-semibold',
        4: 'text-xl font-semibold',
        5: 'text-lg font-medium',
        6: 'text-base font-medium'
      }
      
      return React.createElement(HeadingTag, {
        className: `${sizes[level as keyof typeof sizes]} text-${align}`,
        style: { color }
      }, text)
    },
    exportTemplate: {
      react: `<h{{level}} className="{{className}}" style={{ color: '{{color}}', textAlign: '{{align}}' }}>{{text}}</h{{level}}>`,
      vue: `<h{{level}} class="{{className}}" :style="{ color: '{{color}}', textAlign: '{{align}}' }">{{text}}</h{{level}}>`,
      angular: `<h{{level}} class="{{className}}" [ngStyle]="{ color: '{{color}}', textAlign: '{{align}}' }">{{text}}</h{{level}}>`
    }
  },

  // Media Components
  {
    type: 'image',
    name: 'Image',
    category: 'media',
    icon: Image,
    defaultProps: {
      src: 'https://via.placeholder.com/400x300',
      alt: 'Placeholder image',
      width: 'auto',
      height: 'auto',
      objectFit: 'cover',
      rounded: false
    },
    propSchema: {
      src: {
        type: 'image',
        label: 'Image Source',
        default: 'https://via.placeholder.com/400x300'
      },
      alt: {
        type: 'string',
        label: 'Alt Text',
        default: 'Placeholder image',
        validation: { required: true }
      },
      width: {
        type: 'string',
        label: 'Width',
        default: 'auto'
      },
      height: {
        type: 'string',
        label: 'Height',
        default: 'auto'
      },
      objectFit: {
        type: 'select',
        label: 'Object Fit',
        default: 'cover',
        options: [
          { label: 'Cover', value: 'cover' },
          { label: 'Contain', value: 'contain' },
          { label: 'Fill', value: 'fill' },
          { label: 'None', value: 'none' }
        ]
      },
      rounded: {
        type: 'boolean',
        label: 'Rounded Corners',
        default: false
      }
    },
    previewComponent: ({ src, alt, width, height, objectFit, rounded }: any) => (
      <img
        src={src}
        alt={alt}
        className={`${rounded ? 'rounded-lg' : ''}`}
        style={{
          width,
          height,
          objectFit,
          maxWidth: '100%'
        }}
      />
    ),
    exportTemplate: {
      react: `<img src="{{src}}" alt="{{alt}}" className="{{className}}" style={{ width: '{{width}}', height: '{{height}}', objectFit: '{{objectFit}}' }} />`,
      vue: `<img src="{{src}}" alt="{{alt}}" class="{{className}}" :style="{ width: '{{width}}', height: '{{height}}', objectFit: '{{objectFit}}' }" />`,
      angular: `<img src="{{src}}" alt="{{alt}}" class="{{className}}" [ngStyle]="{ width: '{{width}}', height: '{{height}}', objectFit: '{{objectFit}}' }" />`
    }
  }
]

/**
 * Draggable Component Item
 */
interface DraggableComponentProps {
  component: ComponentDefinition
  onDragStart?: (component: ComponentDefinition) => void
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ 
  component, 
  onDragStart 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useSortable({
    id: component.type,
    data: {
      type: 'component',
      component
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="component-item p-3 border rounded-lg hover:bg-gray-50 cursor-grab active:cursor-grabbing transition-colors"
      onMouseDown={() => onDragStart?.(component)}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded">
          {(() => {
            const Icon = component.icon;
            return React.isValidElement(<Icon />)
              ? React.cloneElement(<Icon />, { className: "w-4 h-4 text-blue-600" })
              : <Icon />;
          })()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {component.name}
          </h4>
          <p className="text-xs text-gray-500 truncate">
            {COMPONENT_CATEGORIES[component.category as keyof typeof COMPONENT_CATEGORIES]?.name}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Component Library Panel
 */
interface ComponentLibraryProps {
  onComponentSelect?: (component: ComponentDefinition) => void
  className?: string
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
  onComponentSelect,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [draggedComponent, setDraggedComponent] = useState<ComponentDefinition | null>(null)

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    return COMPONENT_LIBRARY.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Group components by category
  const groupedComponents = useMemo(() => {
    const groups: Record<string, ComponentDefinition[]> = {}
    
    filteredComponents.forEach(component => {
      if (!groups[component.category]) {
        groups[component.category] = []
      }
      groups[component.category].push(component)
    })
    
    return groups
  }, [filteredComponents])

  return (
    <div className={`component-library h-full flex flex-col ${className || ''}`}>
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Components</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {Object.entries(COMPONENT_CATEGORIES).map(([key, category]) => (
            <option key={key} value={key}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'list' ? (
          <div className="space-y-2">
            {Object.entries(groupedComponents).map(([categoryKey, components]) => (
              <div key={categoryKey} className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  {COMPONENT_CATEGORIES[categoryKey as keyof typeof COMPONENT_CATEGORIES]?.name}
                </h3>
                <div className="space-y-2">
                  {components.map(component => (
                    <DraggableComponent
                      key={component.type}
                      component={component}
                      onDragStart={setDraggedComponent}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredComponents.map(component => (
              <div
                key={component.type}
                className="component-item p-2 border rounded-lg hover:bg-gray-50 cursor-grab text-center"
              >
                <div className="p-2 bg-blue-100 rounded mx-auto w-fit mb-2">
                  {React.isValidElement(<component.icon />)
                    ? React.cloneElement(<component.icon />, { className: "w-4 h-4 text-blue-600" })
                    : <component.icon />}
                </div>
                <h4 className="text-xs font-medium text-gray-900 truncate">
                  {component.name}
                </h4>
              </div>
            ))}
          </div>
        )}

        {filteredComponents.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No components found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Drop Zone Component
 */
interface DropZoneProps {
  onDrop: (component: ComponentDefinition, position?: { x: number; y: number }) => void
  children: React.ReactNode
  className?: string
  placeholder?: string
}

export const DropZone: React.FC<DropZoneProps> = ({
  onDrop,
  children,
  className,
  placeholder = "Drag components here"
}) => {
  const [isOver, setIsOver] = useState(false)

  return (
    <div
      className={`
        drop-zone relative min-h-full
        ${isOver ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}
        ${className || ''}
      `}
      onDragOver={(e) => {
        e.preventDefault()
        setIsOver(true)
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsOver(false)
        
        const componentData = e.dataTransfer.getData('application/json')
        if (componentData) {
          try {
            const component = JSON.parse(componentData) as ComponentDefinition
            const rect = e.currentTarget.getBoundingClientRect()
            onDrop(component, {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            })
          } catch (error) {
            console.error('Failed to parse dropped component:', error)
          }
        }
      }}
    >
      {children}
      
      {isOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-400 rounded-lg">
          <div className="text-center">
            <Plus className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-blue-600 font-medium">{placeholder}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Main Drag and Drop Interface
 */
const DragDropInterface: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { addElement } = useCanvas()
  const [draggedComponent, setDraggedComponent] = useState<ComponentDefinition | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const component = active.data.current?.component as ComponentDefinition
    if (component) {
      setDraggedComponent(component)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setDraggedComponent(null)

    if (over && active.data.current?.component) {
      const component = active.data.current.component as ComponentDefinition
      
      // Create new canvas element from component
      const newElement: Omit<CanvasElement, 'id' | 'metadata'> = {
        type: component.type,
        name: component.name,
        props: { ...component.defaultProps },
        children: [],
        position: { x: 0, y: 0, z: 0 },
        constraints: {
          width: 'auto',
          height: 'auto',
          responsive: true,
          locked: false
        },
        styling: {
          className: ''
        }
      }
      
      addElement(newElement)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="drag-drop-interface h-full">
        {children}
      </div>
      
      <DragOverlay>
        {draggedComponent && (
          <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-lg opacity-90">
            <div className="flex items-center space-x-2">
              {(() => {
                const Icon = draggedComponent.icon;
                return React.isValidElement(<Icon />)
                  ? React.cloneElement(<Icon />, { className: "w-4 h-4 text-blue-600" })
                  : <Icon />;
              })()}
              <span className="text-sm font-medium">{draggedComponent.name}</span>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

export default DragDropInterface;

/**
 * Quick Actions Toolbar
 */
export const QuickActions: React.FC = () => {
  const { addElement } = useCanvas()

  const quickComponents = [
    { type: 'container', name: 'Container', icon: Layout },
    { type: 'button', name: 'Button', icon: Circle },
    { type: 'heading', name: 'Heading', icon: Type },
    { type: 'image', name: 'Image', icon: Image }
  ]

  const handleQuickAdd = (componentType: string) => {
    const componentDef = COMPONENT_LIBRARY.find(c => c.type === componentType)
    if (componentDef) {
      const newElement: Omit<CanvasElement, 'id' | 'metadata'> = {
        type: componentDef.type,
        name: componentDef.name,
        props: { ...componentDef.defaultProps },
        children: [],
        position: { x: 0, y: 0, z: 0 },
        constraints: {
          width: 'auto',
          height: 'auto',
          responsive: true,
          locked: false
        },
        styling: {
          className: ''
        }
      }
      addElement(newElement)
    }
  }

  return (
    <div className="quick-actions flex items-center space-x-2 p-2 bg-white border-b">
      <span className="text-sm text-gray-600 mr-2">Quick Add:</span>
      {quickComponents.map(({ type, name, icon: Icon }) => (
        <button
          key={type}
          onClick={() => handleQuickAdd(type)}
          className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          title={`Add ${name}`}
        >
          <Icon className="w-3 h-3" />
          <span>{name}</span>
        </button>
      ))}
    </div>
  )
}

// Export component library data for use in other parts of the app
// export { COMPONENT_CATEGORIES }
export type { ComponentDefinition, DraggableComponentProps }
