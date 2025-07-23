import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Type, Layout, MousePointer, Image, Grid, Square, 
  Plus, Trash2, Copy, Move, Eye, Code, Settings,
  Smartphone, Tablet, Monitor, Undo, Redo, Save,
  Play, Download, Share, Palette, Layers, Zap,
  Brain, Wand2, Sparkles, Search, Filter, Bell,
  CheckCircle2, AlertCircle, Loader, RefreshCw,
  Lightbulb, Target, Rocket, Award, Shield, Globe,
  ChevronDown, ChevronRight, Clock, Send, Menu, X
} from 'lucide-react';

/**
 * 🚀 INTEGRATED AI-POWERED VISUAL BUILDER
 * 
 * Complete integration of:
 * - AI Component Generator
 * - Drag & Drop Canvas
 * - Component Library
 * - Property Editor
 * - Multi-device Preview
 */

// =====================================
// ENHANCED COMPONENT LIBRARY
// =====================================

const ENHANCED_COMPONENT_LIBRARY = [
  {
    category: 'AI Generated',
    icon: Brain,
    components: [] // Dynamically populated by AI
  },
  {
    category: 'Typography',
    icon: Type,
    components: [
      { id: 'h1', name: 'H1 Heading', icon: Type, color: 'bg-blue-500' },
      { id: 'h2', name: 'H2 Heading', icon: Type, color: 'bg-blue-500' },
      { id: 'h3', name: 'H3 Heading', icon: Type, color: 'bg-blue-500' },
      { id: 'paragraph', name: 'Paragraph', icon: Type, color: 'bg-blue-400' },
      { id: 'quote', name: 'Quote', icon: Type, color: 'bg-blue-300' },
      { id: 'list', name: 'List', icon: Type, color: 'bg-blue-300' }
    ]
  },
  {
    category: 'Layout',
    icon: Layout,
    components: [
      { id: 'hero', name: 'Hero Section', icon: Layout, color: 'bg-green-500' },
      { id: 'container', name: 'Container', icon: Square, color: 'bg-green-400' },
      { id: 'section', name: 'Section', icon: Layout, color: 'bg-green-400' },
      { id: 'features', name: 'Features Grid', icon: Grid, color: 'bg-green-600' },
      { id: 'cta', name: 'Call to Action', icon: MousePointer, color: 'bg-green-700' }
    ]
  },
  {
    category: 'Forms',
    icon: Square,
    components: [
      { id: 'contactForm', name: 'Contact Form', icon: Square, color: 'bg-purple-500' },
      { id: 'newsletter', name: 'Newsletter', icon: Square, color: 'bg-purple-600' },
      { id: 'input', name: 'Input Field', icon: Type, color: 'bg-purple-400' }
    ]
  },
  {
    category: 'E-commerce',
    icon: Square,
    components: [
      { id: 'productCard', name: 'Product Card', icon: Square, color: 'bg-orange-500' },
      { id: 'pricingCard', name: 'Pricing Card', icon: Square, color: 'bg-orange-600' },
      { id: 'shoppingCart', name: 'Shopping Cart', icon: Square, color: 'bg-orange-400' }
    ]
  },
  {
    category: 'Social',
    icon: Square,
    components: [
      { id: 'testimonial', name: 'Testimonial', icon: Square, color: 'bg-pink-500' },
      { id: 'teamMember', name: 'Team Member', icon: Square, color: 'bg-pink-600' },
      { id: 'socialLinks', name: 'Social Links', icon: Square, color: 'bg-pink-400' }
    ]
  }
];

// =====================================
// AI COMPONENT GENERATOR (INTEGRATED)
// =====================================

const IntegratedAIGenerator = ({ onComponentGenerate, existingComponents }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [showQuickActions, setShowQuickActions] = useState(true);

  const frameworks = [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue.js', icon: '🟢' },
    { id: 'svelte', name: 'Svelte', icon: '🧡' },
    { id: 'angular', name: 'Angular', icon: '🔴' }
  ];

  const quickPrompts = [
    { text: "Hero section with 'Welcome' title", type: 'hero', icon: Layout },
    { text: "Product card for $99.99", type: 'product', icon: Square },
    { text: "Contact form with email", type: 'form', icon: Square },
    { text: "Pricing card for Pro plan", type: 'pricing', icon: Square },
    { text: "Team member card", type: 'team', icon: Square },
    { text: "Customer testimonial", type: 'testimonial', icon: Square }
  ];

  // AI Component Templates
  const COMPONENT_TEMPLATES = {
    hero: {
      patterns: ['hero section', 'landing page header', 'main banner', 'welcome section'],
      generate: (prompt) => ({
        type: 'hero',
        props: {
          title: extractTitle(prompt) || 'Welcome to Our Platform',
          subtitle: extractSubtitle(prompt) || 'Build amazing experiences with our tools',
          primaryCta: extractCTA(prompt) || 'Get Started',
          secondaryCta: 'Learn More'
        }
      })
    },
    productCard: {
      patterns: ['product card', 'item showcase', 'product display'],
      generate: (prompt) => ({
        type: 'productCard',
        props: {
          name: extractProductName(prompt) || 'Premium Product',
          price: extractPrice(prompt) || '99.99',
          description: extractDescription(prompt) || 'Amazing product with great features',
          rating: extractRating(prompt) || 4.5
        }
      })
    },
    contactForm: {
      patterns: ['contact form', 'get in touch', 'contact us'],
      generate: (prompt) => ({
        type: 'contactForm',
        props: {
          title: extractTitle(prompt) || 'Get In Touch',
          description: extractDescription(prompt) || 'We\'d love to hear from you'
        }
      })
    },
    pricingCard: {
      patterns: ['pricing card', 'subscription plan', 'plan card'],
      generate: (prompt) => ({
        type: 'pricingCard',
        props: {
          plan: extractPlanName(prompt) || 'Pro Plan',
          price: extractPrice(prompt) || '29',
          features: extractFeatures(prompt) || ['Unlimited projects', 'Priority support']
        }
      })
    },
    teamMember: {
      patterns: ['team member', 'staff card', 'employee card'],
      generate: (prompt) => ({
        type: 'teamMember',
        props: {
          name: extractName(prompt) || 'Team Member',
          role: extractRole(prompt) || 'Position'
        }
      })
    },
    testimonial: {
      patterns: ['testimonial', 'review', 'customer feedback'],
      generate: (prompt) => ({
        type: 'testimonial',
        props: {
          quote: extractQuote(prompt) || 'Great service and support!',
          name: extractName(prompt) || 'Happy Customer',
          role: extractRole(prompt) || 'CEO, Company'
        }
      })
    }
  };

  // Text extraction functions (simplified for integration)
  const extractTitle = (prompt) => {
    const match = prompt.match(/["']([^"']+)["']/);
    return match ? match[1] : null;
  };

  const extractPrice = (prompt) => {
    const match = prompt.match(/\$?(\d+(?:\.\d{2})?)/);
    return match ? match[1] : null;
  };

  const extractCTA = (prompt) => {
    const ctaMatch = prompt.match(/(get started|sign up|learn more|contact us|buy now)/i);
    return ctaMatch ? ctaMatch[0] : null;
  };

  const extractDescription = (prompt) => {
    const sentences = prompt.split(/[.!?]+/).filter(s => s.length > 10);
    return sentences[0]?.trim() || null;
  };

  const extractSubtitle = extractDescription;
  const extractProductName = extractTitle;
  const extractPlanName = extractTitle;
  const extractName = extractTitle;
  const extractRole = (prompt) => {
    const roleMatch = prompt.match(/as\s+["']?([^"'\n]+)["']?/i);
    return roleMatch ? roleMatch[1] : null;
  };
  const extractQuote = extractTitle;
  const extractRating = (prompt) => {
    const match = prompt.match(/(\d+(?:\.\d+)?)\s*stars?/i);
    return match ? parseFloat(match[1]) : null;
  };
  const extractFeatures = (prompt) => {
    const features = prompt.match(/includes?\s+([^.!?]+)/i);
    return features ? features[1].split(',').map(f => f.trim()) : null;
  };

  // Analyze prompt for suggestions
  const analyzePrompt = useCallback((text) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = [];
    const lowerText = text.toLowerCase();

    for (const [componentType, template] of Object.entries(COMPONENT_TEMPLATES)) {
      for (const pattern of template.patterns) {
        if (lowerText.includes(pattern)) {
          const confidence = (pattern.split(' ').filter(word => 
            lowerText.includes(word)
          ).length / pattern.split(' ').length) * 100;

          newSuggestions.push({
            type: componentType,
            confidence,
            preview: `${componentType.charAt(0).toUpperCase() + componentType.slice(1)} component`
          });
          break;
        }
      }
    }

    newSuggestions.sort((a, b) => b.confidence - a.confidence);
    setSuggestions(newSuggestions.slice(0, 2));
  }, []);

  // Generate component
  const generateComponent = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let bestMatch = null;
      let bestScore = 0;
      
      for (const [componentType, template] of Object.entries(COMPONENT_TEMPLATES)) {
        for (const pattern of template.patterns) {
          const score = pattern.split(' ').filter(word => 
            prompt.toLowerCase().includes(word)
          ).length / pattern.split(' ').length * 100;
          
          if (score > bestScore) {
            bestScore = score;
            bestMatch = { type: componentType, template };
          }
        }
      }
      
      if (bestMatch && bestScore > 30) {
        const component = bestMatch.template.generate(prompt);
        component.metadata = {
          generatedAt: new Date().toISOString(),
          prompt: prompt,
          confidence: bestScore,
          framework: selectedFramework,
          isAIGenerated: true
        };
        
        // Add to canvas immediately
        onComponentGenerate(component);
        setPrompt('');
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* AI Header */}
      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 text-sm">
            AI Component Generator
          </h4>
          <p className="text-xs text-purple-600 dark:text-purple-400">
            Describe what you want to create
          </p>
        </div>
        <div className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded">
          GPT-4
        </div>
      </div>

      {/* Framework Selection */}
      <div className="grid grid-cols-4 gap-1">
        {frameworks.map((framework) => (
          <button
            key={framework.id}
            onClick={() => setSelectedFramework(framework.id)}
            className={`p-2 rounded text-center transition-all ${
              selectedFramework === framework.id
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 border border-purple-300'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <div className="text-sm mb-1">{framework.icon}</div>
            <div className="text-xs">{framework.name}</div>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      {showQuickActions && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Quick Start</span>
            <button
              onClick={() => setShowQuickActions(false)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Hide
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickPrompts.slice(0, 4).map((quick, index) => (
              <button
                key={index}
                onClick={() => setPrompt(quick.text)}
                className="p-2 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
              >
                <div className="flex items-center gap-2">
                  <quick.icon className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                    {quick.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input */}
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            analyzePrompt(e.target.value);
          }}
          placeholder="e.g., 'Hero section with Welcome title and Get Started button'"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          rows={3}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <span className="text-xs text-gray-400">{prompt.length}/200</span>
          {prompt.length > 5 && <Lightbulb className="w-3 h-3 text-yellow-500" />}
        </div>
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-900 rounded text-xs">
              <span className="text-purple-700 dark:text-purple-300 capitalize">
                {suggestion.type} detected
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-medium">
                {suggestion.confidence.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generateComponent}
        disabled={!prompt.trim() || isGenerating}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm"
      >
        {isGenerating ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            Generate & Add to Canvas
          </>
        )}
      </button>

      {/* Stats */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="text-center">
          <div className="font-semibold text-purple-600 dark:text-purple-400">{existingComponents.length}</div>
          <div>Components</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-purple-600 dark:text-purple-400">50+</div>
          <div>AI Types</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-purple-600 dark:text-purple-400">&lt;2s</div>
          <div>Generation</div>
        </div>
      </div>
    </div>
  );
};

// =====================================
// ENHANCED CANVAS ELEMENT
// =====================================

const EnhancedCanvasElement = ({ element, isSelected, onSelect, onUpdate, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);

  const renderElementContent = () => {
    switch (element.type) {
      case 'hero':
        return (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg min-h-32">
            <h1 className="text-2xl font-bold mb-2">{element.props.title}</h1>
            <p className="text-indigo-100 mb-4">{element.props.subtitle}</p>
            <div className="flex gap-2">
              <button className="bg-white text-indigo-600 px-4 py-2 rounded text-sm font-medium">
                {element.props.primaryCta}
              </button>
              <button className="border border-white text-white px-4 py-2 rounded text-sm font-medium">
                {element.props.secondaryCta}
              </button>
            </div>
          </div>
        );
      
      case 'productCard':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-w-xs">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">{element.props.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{element.props.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">${element.props.price}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 ${i < element.props.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'contactForm':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{element.props.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{element.props.description}</p>
            <div className="space-y-3">
              <input placeholder="Name" className="w-full px-3 py-2 border rounded text-sm" />
              <input placeholder="Email" className="w-full px-3 py-2 border rounded text-sm" />
              <textarea placeholder="Message" className="w-full px-3 py-2 border rounded text-sm" rows={3}></textarea>
              <button className="w-full bg-indigo-500 text-white py-2 rounded text-sm font-medium">
                Send Message
              </button>
            </div>
          </div>
        );
      
      case 'pricingCard':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{element.props.plan}</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              ${element.props.price}<span className="text-sm text-gray-500">/mo</span>
            </div>
            <div className="space-y-2 mb-4">
              {(element.props.features || []).map((feature, index) => (
                <div key={index} className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  {feature}
                </div>
              ))}
            </div>
            <button className="w-full bg-indigo-500 text-white py-2 rounded text-sm font-medium">
              Get Started
            </button>
          </div>
        );
      
      case 'teamMember':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs text-center">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{element.props.name}</h3>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm">{element.props.role}</p>
          </div>
        );
      
      case 'testimonial':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 text-yellow-400">★</div>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{element.props.quote}"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{element.props.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{element.props.role}</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
            <div className="font-medium text-gray-900 dark:text-white capitalize">
              {element.type.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {element.props.title || element.props.name || 'Component'}
            </div>
          </div>
        );
    }
  };

  return (
    <div
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
      className={`absolute cursor-move transition-all ${
        isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        zIndex: isSelected ? 10 : 1
      }}
    >
      {renderElementContent()}
      
      {/* AI Generated Badge */}
      {element.metadata?.isAIGenerated && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Brain className="w-3 h-3" />
          AI
        </div>
      )}
      
      {/* Element controls */}
      {isSelected && (
        <div className="absolute -top-8 left-0 flex items-center gap-1 bg-indigo-500 text-white px-2 py-1 rounded text-xs z-20">
          <span className="capitalize">{element.type}</span>
          {element.metadata?.isAIGenerated && (
            <Brain className="w-3 h-3 text-purple-200" />
          )}
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
    </div>
  );
};

// =====================================
// MAIN INTEGRATED BUILDER
// =====================================

const IntegratedAIBuilder = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [canvasMode, setCanvasMode] = useState('desktop');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('AI Generated');
  const [showAIPanel, setShowAIPanel] = useState(true);
  const canvasRef = useRef(null);

  // Filter components based on search and category
  const getFilteredLibrary = () => {
    let library = [...ENHANCED_COMPONENT_LIBRARY];
    
    // Add AI generated components to the AI category
    const aiGeneratedComponents = elements
      .filter(el => el.metadata?.isAIGenerated)
      .map(el => ({
        id: `ai-${el.type}`,
        name: `AI ${el.type}`,
        icon: Brain,
        color: 'bg-purple-500',
        template: el
      }));
    
    library[0].components = aiGeneratedComponents;

    return library.filter(category => {
      if (activeCategory !== 'all' && category.category !== activeCategory) {
        return false;
      }
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return category.components.some(comp => 
          comp.name.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  };

  // Add element to canvas
  const addElement = useCallback((componentData, position) => {
    let newElement;
    
    if (componentData.template) {
      // AI generated component
      newElement = {
        ...componentData.template,
        id: `${componentData.template.type}-${Date.now()}`,
        position: position || { x: 100, y: 100 },
        size: { width: 'auto', height: 'auto' },
        props: getDefaultProps(componentData.id),
        metadata: {
          createdAt: new Date().toISOString(),
          isAIGenerated: false
        }
      };
    }

    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  }, []);

  // Handle AI component generation
  const handleAIGeneration = useCallback((generatedComponent) => {
    const position = {
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 100
    };
    
    const newElement = {
      ...generatedComponent,
      id: `ai-${generatedComponent.type}-${Date.now()}`,
      position,
      size: { width: 'auto', height: 'auto' }
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
    
    // Show success notification
    showNotification('AI component generated and added to canvas!', 'success');
  }, []);

  // Get default props for component type
  const getDefaultProps = (type) => {
    const defaults = {
      h1: { text: 'Main Heading' },
      h2: { text: 'Section Heading' },
      paragraph: { text: 'This is a paragraph of text.' },
      hero: { 
        title: 'Welcome to Our Platform',
        subtitle: 'Build amazing experiences',
        primaryCta: 'Get Started',
        secondaryCta: 'Learn More'
      },
      productCard: {
        name: 'Product Name',
        price: '99.99',
        description: 'Product description',
        rating: 4.5
      },
      contactForm: {
        title: 'Contact Us',
        description: 'Get in touch with us'
      }
    };
    return defaults[type] || {};
  };

  // Handle drag operations
  const handleDragStart = (e, component) => {
    setDraggedItem(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (!draggedItem) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const position = {
      x: e.clientX - canvasRect.left - 100,
      y: e.clientY - canvasRect.top - 50
    };

    addElement(draggedItem, position);
    setDraggedItem(null);
  }, [draggedItem, addElement]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Update element
  const updateElement = useCallback((elementId, updates) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  }, []);

  // Delete element
  const deleteElement = useCallback((elementId) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    setSelectedElement(null);
  }, []);

  // Canvas dimensions
  const getCanvasDimensions = () => {
    switch (canvasMode) {
      case 'mobile': return { width: '375px', height: '812px' };
      case 'tablet': return { width: '768px', height: '1024px' };
      default: return { width: '100%', height: '100%' };
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    // Simple notification - could be enhanced with a proper notification system
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  // Get selected element data
  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      
      {/* Enhanced Sidebar */}
      <div className={`${showAIPanel ? 'w-80' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {showAIPanel && (
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Eternal UI Pro
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Builder</p>
              </div>
            )}
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="ml-auto p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              {showAIPanel ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* AI Generator Panel */}
        {showAIPanel && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <IntegratedAIGenerator 
              onComponentGenerate={handleAIGeneration}
              existingComponents={elements}
            />
          </div>
        )}

        {/* Component Library */}
        {showAIPanel && (
          <>
            {/* Search & Categories */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-2 py-1 text-xs rounded ${
                    activeCategory === 'all'
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  All
                </button>
                {ENHANCED_COMPONENT_LIBRARY.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(category.category)}
                    className={`px-2 py-1 text-xs rounded ${
                      activeCategory === category.category
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Component Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {getFilteredLibrary().map((category) => (
                <div key={category.category} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <category.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      {category.category} ({category.components.length})
                    </h3>
                  </div>
                  
                  {category.components.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      {category.category === 'AI Generated' 
                        ? 'Generate components with AI to see them here'
                        : 'No components found'
                      }
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {category.components.map((component) => {
                        const Icon = component.icon;
                        return (
                          <div
                            key={component.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, component)}
                            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group relative"
                          >
                            <div className={`w-8 h-8 ${component.color} rounded-lg flex items-center justify-center mb-2`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-xs font-medium text-gray-900 dark:text-white">
                              {component.name}
                            </div>
                            
                            {/* Quick Add Button */}
                            <button
                              onClick={() => addElement(component)}
                              className="absolute top-1 right-1 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>

                            {/* AI Badge */}
                            {component.template?.metadata?.isAIGenerated && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                                <Brain className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div>
                  <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {elements.length}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Total</div>
                </div>
                <div>
                  <div className="font-semibold text-purple-600 dark:text-purple-400">
                    {elements.filter(el => el.metadata?.isAIGenerated).length}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">AI Generated</div>
                </div>
                <div>
                  <div className="font-semibold text-green-600 dark:text-green-400">
                    {ENHANCED_COMPONENT_LIBRARY.reduce((acc, cat) => acc + cat.components.length, 0)}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Available</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Collapsed Sidebar */}
        {!showAIPanel && (
          <div className="flex-1 flex flex-col items-center py-4 gap-4">
            <button
              onClick={() => setShowAIPanel(true)}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
              title="Open AI Generator"
            >
              <Brain className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowAIPanel(true)}
              className="p-3 bg-indigo-500 text-white rounded-lg hover:shadow-lg transition-all"
              title="Open Component Library"
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Enhanced Toolbar */}
        <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Device Preview */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setCanvasMode('desktop')}
                className={`p-2 rounded ${canvasMode === 'desktop' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCanvasMode('tablet')}
                className={`p-2 rounded ${canvasMode === 'tablet' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCanvasMode('mobile')}
                className={`p-2 rounded ${canvasMode === 'mobile' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {/* Element Count & AI Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{elements.length} elements</span>
              {elements.filter(el => el.metadata?.isAIGenerated).length > 0 && (
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span>{elements.filter(el => el.metadata?.isAIGenerated).length} AI</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex items-center gap-1">
              <Code className="w-4 h-4" />
              Export Code
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex items-center gap-1">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="px-3 py-1 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded flex items-center gap-1">
              <Save className="w-4 h-4" />
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
            className="relative bg-white dark:bg-gray-800 shadow-xl rounded-lg mx-auto min-h-screen"
            style={{
              ...getCanvasDimensions(),
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
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-10 h-10 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Start with AI or Drag & Drop
                  </h3>
                  <p className="text-gray-400 dark:text-gray-500 max-w-md">
                    Describe what you want to create using AI, or drag components from the library
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                      Try: "Hero section with welcome title"
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Render elements */}
            {elements.map((element) => (
              <EnhancedCanvasElement
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

      {/* Enhanced Properties Panel */}
      {selectedElementData && (
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {selectedElementData.type.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              {selectedElementData.metadata?.isAIGenerated && (
                <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  AI Generated
                </div>
              )}
            </div>
            {selectedElementData.metadata?.prompt && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                "{selectedElementData.metadata.prompt}"
              </p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              
              {/* Dynamic Properties Based on Component Type */}
              {(['hero', 'productCard', 'contactForm', 'pricingCard', 'teamMember', 'testimonial'].includes(selectedElementData.type)) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Main Content
                  </label>
                  {selectedElementData.type === 'hero' && (
                    <>
                      <input
                        type="text"
                        value={selectedElementData.props.title || ''}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          props: { ...selectedElementData.props, title: e.target.value }
                        })}
                        placeholder="Hero title"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-2"
                      />
                      <input
                        type="text"
                        value={selectedElementData.props.subtitle || ''}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          props: { ...selectedElementData.props, subtitle: e.target.value }
                        })}
                        placeholder="Hero subtitle"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-2"
                      />
                      <input
                        type="text"
                        value={selectedElementData.props.primaryCta || ''}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          props: { ...selectedElementData.props, primaryCta: e.target.value }
                        })}
                        placeholder="Primary button text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </>
                  )}

                  {selectedElementData.type === 'productCard' && (
                    <>
                      <input
                        type="text"
                        value={selectedElementData.props.name || ''}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          props: { ...selectedElementData.props, name: e.target.value }
                        })}
                        placeholder="Product name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-2"
                      />
                      <input
                        type="text"
                        value={selectedElementData.props.price || ''}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          props: { ...selectedElementData.props, price: e.target.value }
                        })}
                        placeholder="Price"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-2"
                      />
                      <textarea
                        value={selectedElementData.props.description || ''}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          props: { ...selectedElementData.props, description: e.target.value }
                        })}
                        placeholder="Product description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </>
                  )}
                </div>
              )}

              {/* Position & Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">X</label>
                    <input
                      type="number"
                      value={selectedElementData.position.x}
                      onChange={(e) => updateElement(selectedElementData.id, {
                        position: { ...selectedElementData.position, x: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Y</label>
                    <input
                      type="number"
                      value={selectedElementData.position.y}
                      onChange={(e) => updateElement(selectedElementData.id, {
                        position: { ...selectedElementData.position, y: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* AI Enhancement Actions */}
              {selectedElementData.metadata?.isAIGenerated && (
                <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                  <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI Enhancements
                  </h5>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 bg-white dark:bg-gray-800 rounded border text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                      🎨 Improve Design
                    </button>
                    <button className="w-full text-left px-3 py-2 bg-white dark:bg-gray-800 rounded border text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                      📱 Optimize for Mobile
                    </button>
                    <button className="w-full text-left px-3 py-2 bg-white dark:bg-gray-800 rounded border text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                      ♿ Enhance Accessibility
                    </button>
                  </div>
                </div>
              )}

              {/* Element Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <button
                  onClick={() => {
                    const newElement = {
                      ...selectedElementData,
                      id: `${selectedElementData.type}-${Date.now()}`,
                      position: {
                        x: selectedElementData.position.x + 20,
                        y: selectedElementData.position.y + 20
                      }
                    };
                    setElements(prev => [...prev, newElement]);
                    setSelectedElement(newElement.id);
                  }}
                  className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Duplicate Element
                </button>
                
                <button
                  onClick={() => deleteElement(selectedElementData.id)}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
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

export default IntegratedAIBuilder;