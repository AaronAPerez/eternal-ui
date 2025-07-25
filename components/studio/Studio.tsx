'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Layers, 
  Square, 
  Type, 
  Image, 
  MousePointer, 
  FormInput, 
  Layout, 
  Grid, 
  Rows, 
  Columns,
  Navigation,
  CreditCard,
  Star,
  Wand2,
  Download,
  Save,
  Undo,
  Redo,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ZoomIn,
  ZoomOut,
  Users,
  Smartphone,
  Tablet,
  Monitor,
  X,
  Search,
  ClipboardPasteIcon
} from 'lucide-react';

// Import all our custom hooks
import { useStudio } from '@/components/studio/hooks/useStudio';
import { useStudioSelection } from '@/components/studio/hooks/useStudioSelection';
import { useStudioDragDrop } from '@/components/studio/hooks/useStudioDragDrop';
import { useStudioHistory } from '@/components/studio/hooks/useStudioHistory';
import { useStudioClipboard } from '@/components/studio/hooks/useStudioClipboard';
import { useStudioCanvas } from '@/components/studio/hooks/useStudioCanvas';
import { useStudioCollaboration } from '@/components/studio/hooks/useStudioCollaboration';

import { ENHANCED_COMPONENT_REGISTRY } from '@/data/enhancedComponentRegistry';
import { AIComponentGenerator } from '@/lib/ai/componentGenerator';
import { PerformanceMonitor } from '@/lib/performance/performanceMonitor';


// Import components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';
import { Modal } from '@/components/ui/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { generateReactCode } from '../VisualBuilder/utils/codeGeneration/reactGenerator';
import { generateVueCode, generateHTMLCode } from '../VisualBuilder/utils/codeGeneration';
import { ExportModal } from './ExportModal';
import { CollaboratorCursor } from './CollaboratorCursor';
import { StatusBar } from './StatusBar';


// Types
export interface ComponentDefinition {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  category: string;
  tags: string[];
}

interface TemplateDefinition {
  id: string;
  name: string;
  preview: string;
  description: string;
  category: string;
  elements: any[];
}

// ====================================
// COMPONENT DEFINITIONS
// ====================================

const componentDefinitions = ENHANCED_COMPONENT_REGISTRY.map(comp => ({
  id: comp.id,
  name: comp.name,
  icon: comp.icon,
  color: getColorForCategory(comp.category),
  description: comp.description,
  category: comp.category,
  tags: comp.tags,
  performance: comp.performance,
  features: comp.features
}));

function getColorForCategory(category: string): string {
  const categoryColors = {
    ui: 'bg-blue-500',
    layout: 'bg-green-500', 
    forms: 'bg-orange-500',
    navigation: 'bg-purple-500',
    marketing: 'bg-pink-500',
    feedback: 'bg-yellow-500',
    ecommerce: 'bg-red-500'
  };
  
  return categoryColors[category as keyof typeof categoryColors] || 'bg-gray-500';
}

// Template definitions
const templateDefinitions: TemplateDefinition[] = [
  {
    id: 'hero-section',
    name: 'Hero Section',
    preview: '/templates/hero-preview.jpg',
    description: 'Modern hero section with CTA',
    category: 'sections',
    elements: [
      {
        type: 'section',
        props: { className: 'hero-section bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20' },
        children: [
          { type: 'heading', props: { text: 'Build Amazing Websites', className: 'text-5xl font-bold mb-4' } },
          { type: 'text', props: { text: 'Create stunning websites with our drag-and-drop builder', className: 'text-xl mb-8' } },
          { type: 'button', props: { text: 'Get Started', className: 'bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold' } }
        ]
      }
    ]
  },
  {
    id: 'pricing-table',
    name: 'Pricing Table',
    preview: '/templates/pricing-preview.jpg',
    description: 'Three-tier pricing table',
    category: 'sections',
    elements: [
      {
        type: 'section',
        props: { className: 'pricing-section py-16' },
        children: [
          { type: 'heading', props: { text: 'Choose Your Plan', className: 'text-3xl font-bold text-center mb-12' } },
          {
            type: 'grid',
            props: { className: 'grid-cols-3 gap-8' },
            children: [
              { type: 'card', props: { title: 'Basic', price: '$9/mo', features: ['10 Projects', 'Basic Support'] } },
              { type: 'card', props: { title: 'Pro', price: '$29/mo', features: ['Unlimited Projects', 'Priority Support', 'Advanced Features'] } },
              { type: 'card', props: { title: 'Enterprise', price: '$99/mo', features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Support'] } }
            ]
          }
        ]
      }
    ]
  }
];

// ====================================
// TOOLBAR COMPONENT
// ====================================

interface StudioToolbarProps {
  canvasMode: 'desktop' | 'tablet' | 'mobile';
  onCanvasModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canPaste: boolean;
  onPaste: () => void;
  hasSelection: boolean;
  onCopy: () => void;
  onDelete: () => void;
  onSave: () => void;
  collaborators: any[];
  elementsCount: number;
}

const StudioToolbar: React.FC<StudioToolbarProps> = ({
  canvasMode,
  onCanvasModeChange,
  zoom,
  onZoomChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  canPaste,
  onPaste,
  hasSelection,
  onCopy,
  onDelete,
  onSave,
  collaborators,
  elementsCount
}) => {
  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      {/* Left Section - Project Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-gray-900 dark:text-white">Eternal UI Studio</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {elementsCount} elements
        </Badge>
      </div>

      {/* Center Section - Canvas Controls */}
      <div className="flex items-center gap-2">
        {/* Device Mode Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <Tooltip content="Desktop View">
            <Button
              variant={canvasMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCanvasModeChange('desktop')}
              className="p-2"
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Tablet View">
            <Button
              variant={canvasMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCanvasModeChange('tablet')}
              className="p-2"
            >
              <Tablet className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Mobile View">
            <Button
              variant={canvasMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCanvasModeChange('mobile')}
              className="p-2"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <Tooltip content="Zoom Out">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onZoomChange(Math.max(0.1, zoom - 0.1))}
              className="p-2"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
          </Tooltip>
          <span className="text-sm font-medium w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Tooltip content="Zoom In">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onZoomChange(Math.min(5, zoom + 0.1))}
              className="p-2"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* History Controls */}
        <Tooltip content="Undo (Ctrl+Z)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2"
          >
            <Undo className="w-4 h-4" />
          </Button>
        </Tooltip>
        <Tooltip content="Redo (Ctrl+Y)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        {/* Clipboard Controls */}
        <Tooltip content="Copy (Ctrl+C)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopy}
            disabled={!hasSelection}
            className="p-2"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </Tooltip>
        <Tooltip content="Paste (Ctrl+V)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPaste}
            disabled={!canPaste}
            className="p-2"
          >
            <ClipboardPasteIcon className="w-4 h-4" />
          </Button>
        </Tooltip>
        <Tooltip content="Delete (Del)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            disabled={!hasSelection}
            className="p-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        {/* Collaboration */}
        {collaborators.length > 0 && (
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">{collaborators.length}</span>
          </div>
        )}

        {/* Save Button */}
        <Button onClick={onSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save
        </Button>
      </div>
    </div>
  );
};

// ====================================
// SIDEBAR COMPONENT
// ====================================

interface StudioSidebarProps {
  isOpen: boolean;
  onAddElement: (element: any) => void;
  onAddTemplate: (template: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const StudioSidebar: React.FC<StudioSidebarProps> = ({
  isOpen,
  onAddElement,
  onAddTemplate,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  const [activeTab, setActiveTab] = useState('components');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    return componentDefinitions.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = [
    { id: 'all', name: 'All', count: componentDefinitions.length },
    { id: 'layout', name: 'Layout', count: componentDefinitions.filter(c => c.category === 'layout').length },
    { id: 'ui', name: 'UI', count: componentDefinitions.filter(c => c.category === 'ui').length },
    { id: 'content', name: 'Content', count: componentDefinitions.filter(c => c.category === 'content').length },
  ];

const handleComponentClick = (component: any) => {
  const elementData = getDefaultPropsWithSize(component.id);
  
  onAddElement({
    type: component.id,
    position: { 
      x: Math.random() * 400 + 100, 
      y: Math.random() * 300 + 100 
    },
    props: elementData.props,
    size: elementData.size,
    style: elementData.props.style || {},
    metadata: {
      createdAt: new Date().toISOString(),
      componentSource: 'library'
    }
  });
};


  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    // Simulate AI generation
    const generatedElement = {
      id: `ai-${Date.now()}`,
      type: 'div',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 100 },
      props: {
        className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg',
        children: `AI Generated: ${aiPrompt}`
      },
      metadata: {
        isAIGenerated: true,
        prompt: aiPrompt,
        createdAt: new Date().toISOString()
      }
    };
    
    onAddElement(generatedElement);
    setAiPrompt('');
    setShowAIGenerator(false);
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Components</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAIGenerator(true)}
            className="gap-2"
          >
            <Wand2 className="w-4 h-4" />
            AI Generate
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Sidebar Content */}
      <ScrollArea className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="components" className="p-4 space-y-4">
            {/* Categories */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onCategoryChange(category.id)}
                    className="justify-between"
                  >
                    {category.name}
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Component Grid */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Components ({filteredComponents.length})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredComponents.map(component => {
                  const IconComponent = component.icon;
                  return (
            <Card
  key={component.id}
  className="cursor-pointer hover:shadow-md transition-shadow p-3"
  onClick={() => handleComponentClick(component)}
>
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 ${component.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {component.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="p-4 space-y-4">
            {/* Template Grid */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Templates ({templateDefinitions.length})
              </h3>
              <div className="space-y-3">
                {templateDefinitions.map(template => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onAddTemplate(template)}
                  >
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <div className="w-16 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <Layout className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {template.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {template.description}
                          </p>
                          <Badge variant="outline" className="text-xs mt-2">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>

      {/* AI Generator Modal */}
      <Modal
        isOpen={showAIGenerator}
        onClose={() => setShowAIGenerator(false)}
        title="AI Component Generator"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Describe what you want to create:
            </label>
            <Input
              placeholder="e.g., Create a hero section with a blue gradient background..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAIGenerator(false)}>
              Cancel
            </Button>
            <Button onClick={handleAIGenerate} disabled={!aiPrompt.trim()}>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ====================================
// CANVAS COMPONENT
// ====================================

interface StudioCanvasProps {
  mode: 'desktop' | 'tablet' | 'mobile';
  elements: any[];
  selectedElement: any;
  onSelectElement: (element: any) => void;
  onUpdateElement: (id: string, updates: any) => void;
  zoom: number;
  gridEnabled: boolean;
  isDragging: boolean;
}

const StudioCanvas: React.FC<StudioCanvasProps> = ({
  mode,
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  zoom,
  gridEnabled,
  isDragging
}) => {
  const canvasWidth = mode === 'desktop' ? '100%' : mode === 'tablet' ? '768px' : '375px';
  const { isDragging: dragState, startDrag, updateDrag, endDrag } = useStudioDragDrop();

  const handleElementClick = (element: any, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectElement(element);
  };

  const handleElementMouseDown = (element: any, e: React.MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const startPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    startDrag([element.id], startPos, e);
  };

  const handleCanvasClick = () => {
    onSelectElement(null);
  };
  

  return (
    <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto">
      <div className="min-h-full flex items-center justify-center p-8">
        <div 
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg relative"
          style={{ 
            width: canvasWidth,
            minHeight: '600px',
            transform: `scale(${zoom})`,
            transformOrigin: 'center top'
          }}
          onClick={handleCanvasClick}
        >
          {/* Grid Overlay */}
          {gridEnabled && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          )}

          

          {/* Canvas Elements */}
          {elements.map(element => (
            <div
              key={element.id}
              className={`absolute cursor-move ${
                selectedElement?.id === element.id 
                  ? 'ring-2 ring-indigo-500 ring-offset-2' 
                  : 'hover:ring-1 hover:ring-gray-300'
              } ${element.metadata?.isAIGenerated ? 'ring-purple-300' : ''}`}
              style={{
                left: element.position.x,
                top: element.position.y,
                width: element.size?.width || 'auto',
                height: element.size?.height || 'auto',
                zIndex: element.zIndex || 1
              }}
              onClick={(e) => handleElementClick(element, e)}
              onMouseDown={(e) => handleElementMouseDown(element, e)}
            >




              {/* Render element content based on type */}
              {renderElement(element)}
              
              {/* AI Generated Badge */}
              {element.metadata?.isAIGenerated && (
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="text-xs">
                    <Wand2 className="w-3 h-3 mr-1" />
                    AI
                  </Badge>
                </div>
              )}
            </div>
          ))}

          {/* Selection Indicators and Handles */}
          {selectedElement && (
            <SelectionHandles
              element={selectedElement}
              onResize={(newSize) => onUpdateElement(selectedElement.id, { size: newSize })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ====================================
// MAIN STUDIO PAGE COMPONENT
// ====================================

function getDefaultProps(type: string): Record<string, any> {
  const defaults: Record<string, any> = {
    text: { 
      text: 'Sample Text', 
      className: 'text-gray-900 dark:text-white text-base'
    },
    heading: { 
      text: 'Heading Text', 
      level: 1, 
      className: 'text-3xl font-bold text-gray-900 dark:text-white'
    },
    button: { 
      text: 'Click Me', 
      variant: 'default', 
      className: 'bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
    },
    input: { 
      type: 'text', 
      placeholder: 'Enter text...', 
      className: 'border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2'
    },
    image: { 
      src: 'https://via.placeholder.com/300x200?text=Image+Placeholder', 
      alt: 'Placeholder Image', 
      className: 'w-full h-auto rounded-lg object-cover'
    },
    container: { 
      className: 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'
    },
    card: { 
      title: 'Card Title',
      content: 'Card content goes here...',
      className: 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6'
    },
    navbar: {
      brand: 'Brand Name',
      links: ['Home', 'About', 'Contact'],
      className: 'bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'
    },
    grid: { 
      columns: 3,
      gap: 4,
      className: 'grid grid-cols-3 gap-4'
    },
    badge: {
      text: 'New',
      className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
    },
    icon: {
      name: 'star',
      className: 'text-gray-600 dark:text-gray-400'
    },
    default: {
      className: 'bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center',
      content: 'New Element'
    }
  };

  return defaults[type] || defaults.default;
}

function getDefaultPropsWithSize(type: string): { props: Record<string, any>; size: { width: number; height: number } } {
  const baseProps = getDefaultProps(type);
  
  const defaultSizes: Record<string, { width: number; height: number }> = {
    text: { width: 200, height: 30 },
    heading: { width: 300, height: 40 },
    button: { width: 120, height: 40 },
    input: { width: 200, height: 40 },
    image: { width: 300, height: 200 },
    icon: { width: 24, height: 24 },
    container: { width: 400, height: 200 },
    card: { width: 300, height: 200 },
    navbar: { width: 800, height: 60 },
    grid: { width: 600, height: 300 },
    badge: { width: 60, height: 24 },
    default: { width: 200, height: 100 }
  };

  return {
    props: baseProps,
    size: defaultSizes[type] || defaultSizes.default
  };
}


const renderElementWithMonitoring = (element: any) => {
  const startMark = performanceMonitor.startComponentRender(element.id);

function renderElement(element: any): React.ReactNode {
  const style = {
    ...element.style,
    width: '100%',
    height: '100%'
  };

  switch (element.type) {
    case 'text':
      return (
        <div 
          className={element.props.className || 'text-gray-900 dark:text-white'} 
          style={style}
        >
          {element.props.text || 'Text'}
        </div>
      );

    case 'heading':
      const HeadingTag = `h${element.props.level || 1}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag 
          className={element.props.className || 'text-2xl font-bold text-gray-900 dark:text-white'} 
          style={style}
        >
          {element.props.text || 'Heading'}
        </HeadingTag>
      );

    case 'button':
      return (
        <button 
          className={element.props.className || 'bg-indigo-600 text-white px-4 py-2 rounded-lg'} 
          style={style}
          onClick={(e) => e.preventDefault()}
        >
          {element.props.text || 'Button'}
        </button>
      );

    case 'input':
      return (
        <input
          type={element.props.type || 'text'}
          placeholder={element.props.placeholder || 'Enter text...'}
          className={element.props.className || 'border border-gray-300 rounded-lg px-3 py-2'}
          style={style}
          readOnly
        />
      );

    case 'image':
      return (
        <img
          src={element.props.src || 'https://via.placeholder.com/300x200?text=Image'}
          alt={element.props.alt || 'Image'}
          className={element.props.className || 'w-full h-auto rounded-lg'}
          style={style}
        />
      );

    case 'container':
      return (
        <div 
          className={element.props.className || 'bg-white border-2 border-dashed border-gray-300 rounded-lg'} 
          style={style}
        >
          <div className="p-4 text-center text-gray-500 text-sm">
            Container
          </div>
        </div>
      );

    case 'card':
      return (
        <div 
          className={element.props.className || 'bg-white rounded-lg shadow-md border border-gray-200'} 
          style={style}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">
              {element.props.title || 'Card Title'}
            </h3>
            <p className="text-gray-600">
              {element.props.content || 'Card content'}
            </p>
          </div>
        </div>
      );

    case 'navbar':
      return (
        <nav 
          className={element.props.className || 'bg-white shadow-sm border-b border-gray-200'} 
          style={style}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="font-semibold">
              {element.props.brand || 'Brand'}
            </div>
            <div className="flex gap-4">
              {(element.props.links || ['Home', 'About', 'Contact']).map((link: string, index: number) => (
                <a key={index} href="#" className="text-gray-600 hover:text-gray-900" onClick={(e) => e.preventDefault()}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </nav>
      );

    case 'grid':
      return (
        <div 
          className={`grid grid-cols-${element.props.columns || 3} gap-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg`} 
          style={style}
        >
          {Array.from({ length: element.props.columns || 3 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded border text-center text-gray-500 text-sm">
              Item {index + 1}
            </div>
          ))}
        </div>
      );

    case 'badge':
      return (
        <span 
          className={element.props.className || 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'} 
          style={style}
        >
          {element.props.text || 'Badge'}
        </span>
      );

    case 'icon':
      return (
        <div 
          className={element.props.className || 'flex items-center justify-center text-gray-600'} 
          style={style}
        >
          <Star className="w-6 h-6" />
        </div>
      );

    default:
      return (
        <div 
          className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg" 
          style={style}
        >
          <span className="text-gray-500 text-sm">
            {element.type || 'Element'}
          </span>
        </div>
      );
  }
}

  useEffect(() => {
    PerformanceMonitor.endComponentRender(element.id, startMark);
  });
  
  return renderElement(element);
};

export default function StudioPage() {
  // Core studio state
  const { state, addElement, updateElement, deleteElement, selectElement } = useStudio();
  
  // Specialized hooks
  const { 
    selectedItems, 
    hasSelection, 
    selectAll, 
    clearSelection,
    getSelectedElements 
  } = useStudioSelection();
  
  const {
    canUndo,
    canRedo,
    undo,
    redo
  } = useStudioHistory();
  
  const {
    canPaste,
    copyElements,
    pasteElements
  } = useStudioClipboard();
  
  const {
    canvasMode,
    zoom,
    setCanvasMode,
    setZoom,
    gridEnabled,
    toggleGrid
  } = useStudioCanvas();
  
  const { collaborators } = useStudioCollaboration();

  // Local state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);

  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false);
  const [performanceMonitor] = useState(() => new PerformanceMonitor());
  const [aiGenerator] = useState(() => new AIComponentGenerator());

  // Get computed values
  const selectedElement = state.elements.find(el => el.id === state.selectedElementId);
  const canvasElements = state.elements.filter(el => el.visible !== false);

  function getDefaultProps(type: string): Record<string, any> {
  const defaults: Record<string, any> = {
    text: { text: 'Sample Text', className: 'text-gray-900' },
    heading: { text: 'Heading', className: 'text-2xl font-bold' },
    button: { text: 'Button', className: 'bg-blue-500 text-white px-4 py-2 rounded' },
    input: { placeholder: 'Enter text...', className: 'border rounded px-3 py-2' },
    image: { src: 'https://via.placeholder.com/300x200', alt: 'Image' },
    container: { className: 'bg-gray-100 p-4 rounded border-dashed border-2' },
    card: { title: 'Card Title', content: 'Card content' },
    navbar: { brand: 'Brand', links: ['Home', 'About', 'Contact'] },
    grid: { columns: 3, gap: 4 },
    badge: { text: 'Badge' },
    icon: { name: 'star' }
  };

  return defaults[type] || { 
    className: 'bg-gray-100 p-4 rounded border-dashed border-2',
    content: `${type} element`
  };
}

  // ====================================
  // EVENT HANDLERS
  // ====================================

  const handleAddElement = useCallback((elementData: any) => {
    const element = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: elementData.type || 'div',
      position: elementData.position || { 
        x: Math.random() * 400 + 100, 
        y: Math.random() * 300 + 100 
      },
      size: elementData.size || { width: 200, height: 100 },
      props: elementData.props || getDefaultProps(elementData.type),
      style: elementData.style || {},
      metadata: {
        createdAt: new Date().toISOString(),
        isAIGenerated: elementData.metadata?.isAIGenerated || false,
        ...elementData.metadata
      },
      visible: true,
      locked: false,
      zIndex: state.elements.length
    };

    addElement(element);
  }, [addElement, state.elements.length]);

  const handleAddTemplate = useCallback((template: TemplateDefinition) => {
    // Add all elements from the template
    template.elements.forEach((templateElement, index) => {
      const element = {
        id: `template-${template.id}-${index}-${Date.now()}`,
        type: templateElement.type,
        position: { 
          x: 100 + (index * 20), 
          y: 100 + (index * 20) 
        },
        size: templateElement.size || { width: 300, height: 150 },
        props: templateElement.props || {},
        style: templateElement.style || {},
        metadata: {
          createdAt: new Date().toISOString(),
          templateId: template.id,
          templateName: template.name
        },
        visible: true,
        locked: false,
        zIndex: state.elements.length + index
      };

      addElement(element);
    });
  }, [addElement, state.elements.length]);

  const handleCopy = useCallback(() => {
    if (hasSelection) {
      const selectedElements = getSelectedElements();
      copyElements(selectedElements, 'toolbar');
    }
  }, [hasSelection, getSelectedElements, copyElements]);

  const handleDelete = useCallback(() => {
    if (hasSelection && selectedElement) {
      deleteElement(selectedElement.id);
    }
  }, [hasSelection, selectedElement, deleteElement]);

  const handleSave = useCallback(async () => {
    try {
      // Simulate save operation
      const projectData = {
        id: 'current-project',
        name: 'My Project',
        elements: state.elements,
        lastSaved: new Date().toISOString(),
        version: (state.project?.version || 0) + 1
      };

      // In a real app, you'd save to your backend
      console.log('Saving project:', projectData);
      
      // Show success message
      // toast.success('Project saved successfully!');
    } catch (error) {
      console.error('Failed to save project:', error);
      // toast.error('Failed to save project');
    }
  }, [state.elements, state.project]);

  const handleExport = useCallback((format: string) => {
    const exportData = {
      format,
      elements: canvasElements,
      timestamp: new Date().toISOString(),
      metadata: {
        totalElements: canvasElements.length,
        aiGeneratedElements: canvasElements.filter(el => el.metadata?.isAIGenerated).length,
        canvasMode,
        zoom
      }
    };

    // Generate export based on format
    switch (format) {
      case 'react':
        generateReactCode(exportData);
        break;
      case 'vue':
        generateVueCode(exportData);
        break;
      case 'html':
        generateHTMLCode(exportData);
        break;
      case 'json':
        downloadJSON(exportData);
        break;
      default:
        console.warn('Unknown export format:', format);
    }

    setShowExportModal(false);
  }, [canvasElements, canvasMode, zoom]);

  // ====================================
  // KEYBOARD SHORTCUTS (Additional)
  // ====================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      
      // Additional shortcuts specific to the studio page
      if (isCtrlOrCmd) {
        switch (event.key.toLowerCase()) {
          case 's':
            event.preventDefault();
            handleSave();
            break;
          case 'e':
            event.preventDefault();
            setShowExportModal(true);
            break;
          case 'g':
            event.preventDefault();
            toggleGrid();
            break;
          case '1':
            event.preventDefault();
            setCanvasMode('desktop');
            break;
          case '2':
            event.preventDefault();
            setCanvasMode('tablet');
            break;
          case '3':
            event.preventDefault();
            setCanvasMode('mobile');
            break;
        }
      }

      // Non-modifier shortcuts
      switch (event.key) {
        case 'Tab':
          event.preventDefault();
          setSidebarOpen(!sidebarOpen);
          break;
        case 'F11':
          event.preventDefault();
          // Toggle fullscreen mode
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, toggleGrid, setCanvasMode, sidebarOpen]);



function getDefaultPropsWithSize(type: string): { props: Record<string, any>; size: { width: number; height: number } } {
  const baseProps = getDefaultProps(type);
  
  // Define default sizes for different component types
  const defaultSizes: Record<string, { width: number; height: number }> = {
    text: { width: 200, height: 30 },
    heading: { width: 300, height: 40 },
    button: { width: 120, height: 40 },
    input: { width: 200, height: 40 },
    image: { width: 300, height: 200 },
    icon: { width: 24, height: 24 },
    container: { width: 400, height: 200 },
    section: { width: 800, height: 300 },
    card: { width: 300, height: 200 },
    navbar: { width: 800, height: 60 },
    grid: { width: 600, height: 300 },
    flexbox: { width: 400, height: 150 },
    columns: { width: 500, height: 200 },
    badge: { width: 60, height: 24 },
    form: { width: 350, height: 200 },
    textarea: { width: 300, height: 100 },
    select: { width: 200, height: 40 },
    productCard: { width: 250, height: 350 },
    hero: { width: 800, height: 400 },
    testimonial: { width: 400, height: 200 },
    socialShare: { width: 150, height: 40 },
    default: { width: 200, height: 100 }
  };

  return {
    props: baseProps,
    size: defaultSizes[type] || defaultSizes.default
  };
}



  // ====================================
  // RENDER MAIN COMPONENT
  // ====================================

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Studio Toolbar */}
      <StudioToolbar
        canvasMode={canvasMode}
        onCanvasModeChange={setCanvasMode}
        zoom={zoom}
        onZoomChange={setZoom}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        canPaste={canPaste}
        onPaste={pasteElements}
        hasSelection={hasSelection}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onSave={handleSave}
        collaborators={collaborators}
        elementsCount={canvasElements.length}
      />

      {/* Main Studio Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <StudioSidebar
          isOpen={sidebarOpen}
          onAddElement={handleAddElement}
          onAddTemplate={handleAddTemplate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas */}
          <StudioCanvas
            mode={canvasMode}
            elements={canvasElements}
            selectedElement={selectedElement}
            onSelectElement={selectElement}
            onUpdateElement={updateElement}
            zoom={zoom}
            gridEnabled={gridEnabled}
            isDragging={state.isDragging}
          />
        </div>

        {/* Right Properties Panel */}
        {selectedElement && (
          <PropertiesPanel
            element={selectedElement}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
            onClose={() => selectElement(null)}
          />
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        elements={canvasElements}
      />

      {/* Collaboration Cursors */}
      {collaborators.map(collaborator => (
        <CollaboratorCursor
          key={collaborator.id}
          collaborator={collaborator}
          zoom={zoom}
        />
      ))}

      {/* Status Bar */}
      <StatusBar
        elementsCount={canvasElements.length}
        selectedCount={selectedItems.length}
        canvasMode={canvasMode}
        zoom={zoom}
        gridEnabled={gridEnabled}
        collaborators={collaborators}
      />
    </div>
  );
}

// ====================================
// SELECTION HANDLES COMPONENT
// ====================================

interface SelectionHandlesProps {
  element: any;
  onResize: (newSize: { width: number; height: number }) => void;
}

const SelectionHandles: React.FC<SelectionHandlesProps> = ({ element, onResize }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: element.size?.width || 200,
      height: element.size?.height || 100
    });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - resizeStart.x;
      const deltaY = moveEvent.clientY - resizeStart.y;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;

      switch (direction) {
        case 'se': // Southeast
          newWidth = Math.max(50, resizeStart.width + deltaX);
          newHeight = Math.max(30, resizeStart.height + deltaY);
          break;
        case 'sw': // Southwest
          newWidth = Math.max(50, resizeStart.width - deltaX);
          newHeight = Math.max(30, resizeStart.height + deltaY);
          break;
        case 'ne': // Northeast
          newWidth = Math.max(50, resizeStart.width + deltaX);
          newHeight = Math.max(30, resizeStart.height - deltaY);
          break;
        case 'nw': // Northwest
          newWidth = Math.max(50, resizeStart.width - deltaX);
          newHeight = Math.max(30, resizeStart.height - deltaY);
          break;
        case 'e': // East
          newWidth = Math.max(50, resizeStart.width + deltaX);
          break;
        case 'w': // West
          newWidth = Math.max(50, resizeStart.width - deltaX);
          break;
        case 'n': // North
          newHeight = Math.max(30, resizeStart.height - deltaY);
          break;
        case 's': // South
          newHeight = Math.max(30, resizeStart.height + deltaY);
          break;
      }

      onResize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handlePositions = [
    { position: 'nw', cursor: 'nw-resize', style: { top: -4, left: -4 } },
    { position: 'n', cursor: 'n-resize', style: { top: -4, left: '50%', transform: 'translateX(-50%)' } },
    { position: 'ne', cursor: 'ne-resize', style: { top: -4, right: -4 } },
    { position: 'e', cursor: 'e-resize', style: { top: '50%', right: -4, transform: 'translateY(-50%)' } },
    { position: 'se', cursor: 'se-resize', style: { bottom: -4, right: -4 } },
    { position: 's', cursor: 's-resize', style: { bottom: -4, left: '50%', transform: 'translateX(-50%)' } },
    { position: 'sw', cursor: 'sw-resize', style: { bottom: -4, left: -4 } },
    { position: 'w', cursor: 'w-resize', style: { top: '50%', left: -4, transform: 'translateY(-50%)' } },
  ];

  return (
    <>
      {handlePositions.map(handle => (
        <div
          key={handle.position}
          className="absolute w-2 h-2 bg-indigo-500 border border-white rounded-sm"
          style={{
            ...handle.style,
            cursor: handle.cursor,
            zIndex: 1000
          }}
          onMouseDown={(e) => handleResizeStart(e, handle.position)}
        />
      ))}
    </>
  );
};

// ====================================
// PROPERTIES PANEL COMPONENT
// ====================================

interface PropertiesPanelProps {
  element: any;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ element, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = useState('properties');

  const handleStyleChange = (property: string, value: any) => {
    onUpdate({
      style: {
        ...element.style,
        [property]: value
      }
    });
  };

  const handlePropChange = (property: string, value: any) => {
    onUpdate({
      props: {
        ...element.props,
        [property]: value
      }
    });
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Properties
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {element.type} • {element.id}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">Props</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="properties" className="space-y-4">
              {/* Position & Size */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Position & Size
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">X</label>
                    <Input
                      type="number"
                      value={element.position.x}
                      onChange={(e) => onUpdate({
                        position: { ...element.position, x: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Y</label>
                    <Input
                      type="number"
                      value={element.position.y}
                      onChange={(e) => onUpdate({
                        position: { ...element.position, y: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Width</label>
                    <Input
                      type="number"
                      value={element.size?.width || 200}
                      onChange={(e) => onUpdate({
                        size: { ...element.size, width: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Height</label>
                    <Input
                      type="number"
                      value={element.size?.height || 100}
                      onChange={(e) => onUpdate({
                        size: { ...element.size, height: Number(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Element-specific properties */}
              {element.type === 'text' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Text Properties
                  </h4>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Content</label>
                    <Input
                      value={element.props.text || ''}
                      onChange={(e) => handlePropChange('text', e.target.value)}
                      placeholder="Enter text content..."
                    />
                  </div>
                </div>
              )}

              {element.type === 'button' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Button Properties
                  </h4>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Button Text</label>
                    <Input
                      value={element.props.text || ''}
                      onChange={(e) => handlePropChange('text', e.target.value)}
                      placeholder="Button text..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Variant</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={element.props.variant || 'default'}
                      onChange={(e) => handlePropChange('variant', e.target.value)}
                    >
                      <option value="default">Default</option>
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="outline">Outline</option>
                      <option value="ghost">Ghost</option>
                    </select>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              {/* Background */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background
                </h4>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Background Color</label>
                  <Input
                    type="color"
                    value={element.style?.backgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  />
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Typography
                </h4>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Font Size</label>
                  <Input
                    value={element.style?.fontSize || '16px'}
                    onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                    placeholder="16px"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Color</label>
                  <Input
                    type="color"
                    value={element.style?.color || '#000000'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                  />
                </div>
              </div>

              {/* Spacing */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Spacing
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Padding</label>
                    <Input
                      value={element.style?.padding || '8px'}
                      onChange={(e) => handleStyleChange('padding', e.target.value)}
                      placeholder="8px"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Margin</label>
                    <Input
                      value={element.style?.margin || '0px'}
                      onChange={(e) => handleStyleChange('margin', e.target.value)}
                      placeholder="0px"
                    />
                  </div>
                </div>
              </div>

              {/* Border */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Border
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Width</label>
                    <Input
                      value={element.style?.borderWidth || '0px'}
                      onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
                      placeholder="0px"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Color</label>
                    <Input
                      type="color"
                      value={element.style?.borderColor || '#000000'}
                      onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Radius</label>
                  <Input
                    value={element.style?.borderRadius || '0px'}
                    onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                    placeholder="0px"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              {/* Element Controls */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Element Controls
                </h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdate({ visible: !element.visible })}
                    className="gap-2"
                  >
                    {element.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {element.visible ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdate({ locked: !element.locked })}
                    className="gap-2"
                  >
                    {element.locked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    {element.locked ? 'Unlock' : 'Lock'}
                  </Button>
                </div>
              </div>

              {/* Z-Index */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Layer Order (Z-Index)
                </h4>
                <Input
                  type="number"
                  value={element.zIndex || 1}
                  onChange={(e) => onUpdate({ zIndex: Number(e.target.value) })}
                />
              </div>

              {/* Metadata */}
              {element.metadata && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Metadata
                  </h4>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Created: {new Date(element.metadata.createdAt).toLocaleString()}</p>
                    {element.metadata.lastModified && (
                      <p>Modified: {new Date(element.metadata.lastModified).toLocaleString()}</p>
                    )}
                    {element.metadata.isAIGenerated && (
                      <Badge variant="secondary" className="text-xs">
                        <Wand2 className="w-3 h-3 mr-1" />
                        AI Generated
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

