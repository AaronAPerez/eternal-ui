'use client';

import React, { useState, useCallback } from 'react';
import { 
  Sparkles, 
  X, 
  Maximize2, 
  Minimize2,
  Settings,
  Wand2
} from 'lucide-react';
import { CompleteStudioBuilderInterface } from './CompleteStudioBuilderInterface';
import { AIGeneratorInterface } from '../ai/AIGeneratorInterface';
import { GeneratedComponent } from '@eternal-ui/ai-engine';

/**
 * Builder with AI Integration
 * 
 * This component enhances your existing CompleteStudioBuilderInterface
 * with the Enhanced AI Generator, providing:
 * - Floating AI panel
 * - Seamless component integration
 * - Real-time canvas updates
 * - Brand-aware generation
 */

interface BuilderWithAIProps {
  // Props from your existing builder
  onSave?: () => void;
  onExport?: () => void;
  projectId?: string;
  theme?: 'light' | 'dark';
}

export const BuilderWithAI: React.FC<BuilderWithAIProps> = ({
  onSave,
  onExport,
  projectId,
  theme = 'light'
}) => {
  // AI Panel state
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiPanelExpanded, setAIPanelExpanded] = useState(false);
  const [lastGeneratedComponent, setLastGeneratedComponent] = useState<GeneratedComponent | null>(null);
  
  // Builder state (you might want to lift this up to a shared state manager)
  const [canvasComponents, setCanvasComponents] = useState<any[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [brandGuidelines, setBrandGuidelines] = useState(null);

  // Handle AI-generated component
  const handleComponentGenerated = useCallback((component: GeneratedComponent) => {
    setLastGeneratedComponent(component);
    console.log('Component generated:', component);
    
    // You can add analytics tracking here
    // analytics.track('ai_component_generated', {
    //   componentName: component.name,
    //   complexity: component.complexity,
    //   performanceScore: component.performance.score
    // });
  }, []);

  // Handle adding AI component to canvas
  const handleAddToCanvas = useCallback((component: GeneratedComponent) => {
    // Convert GeneratedComponent to your canvas component format
    const canvasComponent = {
      id: component.id,
      type: 'ai-generated',
      name: component.name,
      code: component.code,
      props: {
        className: 'ai-generated-component',
        'data-component-id': component.id
      },
      position: {
        x: 100,
        y: 100
      },
      size: {
        width: 300,
        height: 200
      },
      metadata: {
        aiGenerated: true,
        performance: component.performance,
        accessibility: component.accessibility,
        brandCompliance: component.brandCompliance
      }
    };

    // Add to canvas
    setCanvasComponents(prev => [...prev, canvasComponent]);
    
    // Select the new component
    setSelectedComponent(component.id);
    
    // Close AI panel after adding
    setShowAIPanel(false);
    
    // Show success notification
    showNotification('Component added to canvas!', 'success');
  }, []);

  // Handle AI panel toggle
  const toggleAIPanel = useCallback(() => {
    setShowAIPanel(prev => !prev);
  }, []);

  // Handle panel expansion
  const toggleAIPanelExpansion = useCallback(() => {
    setAIPanelExpanded(prev => !prev);
  }, []);

  // Simple notification system (you might want to use a proper toast library)
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // This is a simple implementation - replace with your notification system
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-3 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 
      'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }, []);

  // Mock brand guidelines extraction (you should implement this based on your project structure)
  const extractBrandGuidelines = useCallback(() => {
    // This would typically come from your project settings or design system
    return {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#F59E0B',
        neutral: ['#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF']
      },
      typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        headingScale: '1.25',
        bodySize: '16px'
      },
      spacing: {
        scale: '8px',
        rhythm: '1.5'
      },
      borderRadius: '8px',
      shadows: {
        small: '0 1px 3px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
        large: '0 10px 15px rgba(0, 0, 0, 0.1)'
      },
      brandVoice: 'Professional yet approachable, modern and accessible'
    };
  }, []);

  // Initialize brand guidelines
  React.useEffect(() => {
    setBrandGuidelines(extractBrandGuidelines());
  }, [extractBrandGuidelines]);

  const aiPanelClasses = aiPanelExpanded 
    ? 'fixed inset-4 z-50' 
    : 'fixed bottom-4 right-4 w-96 h-96 z-50';

  return (
    <div className="builder-with-ai relative">
      {/* Main Builder Interface */}
      <CompleteStudioBuilderInterface />

      {/* AI Trigger Button */}
      {!showAIPanel && (
        <button
          onClick={toggleAIPanel}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-40"
          title="Open AI Component Generator"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}

      {/* AI Panel */}
      {showAIPanel && (
        <div className={aiPanelClasses}>
          {/* Panel Header */}
          <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Wand2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">AI Generator</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleAIPanelExpansion}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title={aiPanelExpanded ? 'Minimize' : 'Maximize'}
              >
                {aiPanelExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={toggleAIPanel}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-hidden">
            <AIGeneratorInterface
              onComponentGenerated={handleComponentGenerated}
              onAddToCanvas={handleAddToCanvas}
              brandGuidelines={brandGuidelines}
              theme={theme}
            />
          </div>
        </div>
      )}

      {/* Panel Overlay for expanded mode */}
      {showAIPanel && aiPanelExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setAIPanelExpanded(false)}
        />
      )}

      {/* AI Status Indicator */}
      {lastGeneratedComponent && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2 z-30">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>AI Ready</span>
        </div>
      )}
    </div>
  );
};

export default BuilderWithAI;