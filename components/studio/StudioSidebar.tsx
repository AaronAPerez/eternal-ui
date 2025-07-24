'use client';

import React, { useMemo, useState } from 'react';
import { Badge, Columns, CreditCard, FormInput, Grid, Layout, MousePointer, Navigation, Rows, Search, Square, Star, Type, Wand2, X } from 'lucide-react';
import { Button, Input, Tabs, TabsList, TabsTrigger, ScrollArea, TabsContent, Card, CardContent, Modal } from '../ui';// Import components
// import { Button } from '@/components/ui/Button';
// import { Input } from '@/components/ui/Input';
// import { Badge } from '@/components/ui/Badge';
// import { Tooltip } from '@/components/ui/Tooltip';
// import { Modal } from '@/components/ui/Modal';

// import { Separator } from '@/components/ui/Separator';
// import { ScrollArea } from '@/components/ui/ScrollArea';
// import { Tabs, TabsList, TabsTrigger, TabsContent, Card, CardContent } from '../ui';
import { generateReactCode, generateVueCode, generateHTMLCode } from '../VisualBuilder/utils/codeGeneration';
import StudioCanvas from './StudioCanvas';
import StudioSidebar from './StudioSidebar';
import StudioToolbar from './StudioToolbar';
import PropertiesPanel from './PropertiesPanel';
import { ComponentDefinition } from '@/lib/components';

// // Types
// interface ComponentDefinition {
//   id: string;
//   name: string;
//   icon: React.ComponentType<any>;
//   color: string;
//   description: string;
//   category: string;
//   tags: string[];
// }

interface TemplateDefinition {
  id: string;
  name: string;
  preview: string;
  description: string;
  category: string;
  elements: any[];
}


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

  
// ====================================
// COMPONENT DEFINITIONS
// ====================================

const componentDefinitions: ComponentDefinition[] = [
  // Layout Components
  { id: 'container', name: 'Container', icon: Square, color: 'bg-blue-500', description: 'Content wrapper', category: 'layout', tags: ['basic', 'layout'] },
  { id: 'grid', name: 'Grid', icon: Grid, color: 'bg-purple-500', description: 'CSS Grid layout', category: 'layout', tags: ['layout', 'grid'] },
  { id: 'flexbox', name: 'Flexbox', icon: Rows, color: 'bg-indigo-500', description: 'Flexible layout', category: 'layout', tags: ['layout', 'flex'] },
  { id: 'columns', name: 'Columns', icon: Columns, color: 'bg-green-500', description: 'Column layout', category: 'layout', tags: ['layout', 'columns'] },
  { id: 'section', name: 'Section', icon: Layout, color: 'bg-teal-500', description: 'Page section', category: 'layout', tags: ['layout', 'section'] },

  // UI Components
  { id: 'button', name: 'Button', icon: MousePointer, color: 'bg-indigo-500', description: 'Interactive button', category: 'ui', tags: ['interactive', 'button'] },
  { id: 'input', name: 'Input', icon: FormInput, color: 'bg-orange-500', description: 'Text input field', category: 'ui', tags: ['form', 'input'] },
  { id: 'badge', name: 'Badge', icon: Square, color: 'bg-pink-500', description: 'Status badge', category: 'ui', tags: ['badge', 'status'] },
  { id: 'navbar', name: 'Navbar', icon: Navigation, color: 'bg-blue-600', description: 'Navigation bar', category: 'ui', tags: ['navigation', 'header'] },
  { id: 'card', name: 'Card', icon: CreditCard, color: 'bg-green-600', description: 'Content card', category: 'ui', tags: ['card', 'content'] },

  // Content Components
  { id: 'text', name: 'Text', icon: Type, color: 'bg-gray-500', description: 'Text content', category: 'content', tags: ['text', 'content'] },
  { id: 'heading', name: 'Heading', icon: Type, color: 'bg-red-500', description: 'Page heading', category: 'content', tags: ['heading', 'typography'] },
  { id: 'image', name: 'Image', icon: Image, color: 'bg-yellow-500', description: 'Image element', category: 'content', tags: ['image', 'media'] },
  { id: 'icon', name: 'Icon', icon: Star, color: 'bg-purple-600', description: 'Icon element', category: 'content', tags: ['icon', 'visual'] },
];

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
                      onClick={() => onAddElement({
                        type: component.id,
                        position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
                        props: getDefaultProps(component.id)
                      })}
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

export default StudioSidebar;