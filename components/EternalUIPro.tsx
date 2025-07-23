import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Save, Download, Share, Settings, Code, Eye, Globe, Moon, Sun,
  Menu, X, Plus, Folder, File, Search, Terminal, Git, Package,
  Zap, Star, Crown, Users, Layers, Palette, Monitor, Smartphone,
  Tablet, Layout, Grid, Type, Image, MousePointer, Copy, Trash2,
  ArrowLeft, ArrowRight, RotateCcw, Undo, Redo, Cloud, Shield,
  Timer, BarChart3, Target, Rocket, Sparkles, Wand2, Brain,
  Database, Server, Key, Lock, CheckCircle2, AlertCircle
} from 'lucide-react';

/**
 * 🚀 ETERNAL UI PRO - REPLIT COMPETITOR
 * 
 * A revolutionary visual development platform that dominates:
 * - Real-time collaborative coding
 * - AI-powered component generation  
 * - Visual drag-and-drop builder
 * - Multi-framework export (React, Vue, Svelte, Angular)
 * - Enterprise deployment pipeline
 * - Advanced performance monitoring
 */

// 🎨 FIXED DESIGN SYSTEM
const theme = {
  colors: {
    // Indigo theme as requested
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1', // Main indigo
      600: '#4f46e5', // Darker indigo
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    }
  }
};

// 🧠 AI COMPONENT GENERATOR
const AIComponentGenerator = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [framework, setFramework] = useState('react');
  const [generating, setGenerating] = useState(false);

  const frameworks = [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue.js', icon: '💚' },
    { id: 'svelte', name: 'Svelte', icon: '🧡' },
    { id: 'angular', name: 'Angular', icon: '🔴' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedCode = generateComponentCode(prompt, framework);
      onGenerate(generatedCode);
      setGenerating(false);
    }, 2000);
  };

  const generateComponentCode = (prompt, framework) => {
    const baseComponent = `
// AI Generated ${framework} Component
// Prompt: ${prompt}

${framework === 'react' ? `
import React from 'react';

const GeneratedComponent = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        ${prompt}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        This component was generated using AI from your description.
      </p>
      <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors">
        Interact
      </button>
    </div>
  );
};

export default GeneratedComponent;
` : framework === 'vue' ? `
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
      ${prompt}
    </h3>
    <p class="text-gray-600 dark:text-gray-300">
      Vue component generated from AI.
    </p>
    <button 
      @click="handleClick"
      class="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
    >
      Interact
    </button>
  </div>
</template>

<script>
export default {
  name: 'GeneratedComponent',
  methods: {
    handleClick() {
      console.log('Vue component clicked');
    }
  }
}
</script>
` : `// ${framework.toUpperCase()} Component would be generated here`}`;
    
    return baseComponent;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
          <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI Component Generator
        </h3>
        <div className="flex-1"></div>
        <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
          GPT-4 Powered
        </div>
      </div>

      <div className="space-y-4">
        {/* Framework Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Framework
          </label>
          <div className="grid grid-cols-4 gap-2">
            {frameworks.map((fw) => (
              <button
                key={fw.id}
                onClick={() => setFramework(fw.id)}
                className={`p-3 rounded-lg border transition-all ${
                  framework === fw.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="text-lg mb-1">{fw.icon}</div>
                <div className="text-xs font-medium">{fw.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Describe Your Component
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A responsive pricing card with gradient background, animated counter, and call-to-action button'"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={3}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || generating}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Component...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Component
            </>
          )}
        </button>

        {/* Features List */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            Responsive Design
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            Accessibility Ready
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            TypeScript Support
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            Dark Mode Compatible
          </div>
        </div>
      </div>
    </div>
  );
};

// 🎨 VISUAL BUILDER COMPONENT
const VisualBuilder = ({ onCodeChange }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([
    { id: 1, type: 'heading', content: 'Welcome to Eternal UI', x: 50, y: 50 },
    { id: 2, type: 'text', content: 'Build amazing websites visually', x: 50, y: 100 },
    { id: 3, type: 'button', content: 'Get Started', x: 50, y: 150 }
  ]);

  const elementTypes = [
    { type: 'heading', icon: Type, label: 'Heading' },
    { type: 'text', icon: Type, label: 'Text' },
    { type: 'button', icon: MousePointer, label: 'Button' },
    { type: 'image', icon: Image, label: 'Image' },
    { type: 'card', icon: Layout, label: 'Card' },
    { type: 'grid', icon: Grid, label: 'Grid' }
  ];

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      content: `New ${type}`,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50
    };
    setElements([...elements, newElement]);
  };

  const updateElement = (id, updates) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const generateCode = () => {
    const code = `
import React from 'react';

const GeneratedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        ${elements.map(el => {
          switch (el.type) {
            case 'heading':
              return `<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">${el.content}</h1>`;
            case 'text':
              return `<p className="text-lg text-gray-600 dark:text-gray-300 mb-4">${el.content}</p>`;
            case 'button':
              return `<button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">${el.content}</button>`;
            case 'card':
              return `<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">${el.content}</div>`;
            default:
              return `<div>${el.content}</div>`;
          }
        }).join('\n        ')}
      </div>
    </div>
  );
};

export default GeneratedPage;`;
    
    onCodeChange(code);
  };

  useEffect(() => {
    generateCode();
  }, [elements]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Builder Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visual Builder</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Undo className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Redo className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Monitor className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Tablet className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Smartphone className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Element Toolbar */}
        <div className="grid grid-cols-6 gap-2">
          {elementTypes.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => addElement(type)}
              className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-all group"
            >
              <Icon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mx-auto mb-1" />
              <div className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative h-96 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        {elements.map((element) => (
          <div
            key={element.id}
            className={`absolute cursor-pointer p-2 border-2 transition-all ${
              selectedElement === element.id
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900'
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            style={{ left: element.x, top: element.y }}
            onClick={() => setSelectedElement(element.id)}
          >
            {element.type === 'heading' && (
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{element.content}</h3>
            )}
            {element.type === 'text' && (
              <p className="text-gray-600 dark:text-gray-300">{element.content}</p>
            )}
            {element.type === 'button' && (
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">{element.content}</button>
            )}
            {element.type === 'card' && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                {element.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Properties Panel */}
      {selectedElement && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Element Properties</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Content</label>
              <input
                type="text"
                value={elements.find(el => el.id === selectedElement)?.content || ''}
                onChange={(e) => updateElement(selectedElement, { content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 📊 PERFORMANCE DASHBOARD
const PerformanceDashboard = () => {
  const metrics = [
    { label: 'Lighthouse Score', value: 98, color: 'green' },
    { label: 'Bundle Size', value: '24.3 KB', color: 'blue' },
    { label: 'Load Time', value: '0.8s', color: 'green' },
    { label: 'Accessibility', value: 'AAA', color: 'green' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
          <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Analytics</h3>
        <div className="flex-1"></div>
        <div className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
          All Systems Optimal
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl font-bold ${
              metric.color === 'green' ? 'text-green-600 dark:text-green-400' :
              metric.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-300">Performance Score</span>
          <span className="text-green-600 dark:text-green-400 font-medium">98/100</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-300">SEO Optimization</span>
          <span className="text-green-600 dark:text-green-400 font-medium">95/100</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
        </div>
      </div>
    </div>
  );
};

// 🔥 MAIN APPLICATION
const EternalUIPro = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('builder');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [generatedCode, setGeneratedCode] = useState('');

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const tabs = [
    { id: 'builder', label: 'Visual Builder', icon: Layout },
    { id: 'ai', label: 'AI Generator', icon: Brain },
    { id: 'code', label: 'Code Editor', icon: Code },
    { id: 'preview', label: 'Live Preview', icon: Eye },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'deploy', label: 'Deploy', icon: Rocket }
  ];

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Eternal UI Pro
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Visual Builder</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{tab.label}</span>}
                </button>
              );
            })}
          </div>

          {sidebarOpen && (
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-lg border border-indigo-200 dark:border-indigo-700">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Pro Features</span>
                </div>
                <ul className="text-xs text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• AI Component Generation</li>
                  <li>• Real-time Collaboration</li>
                  <li>• Advanced Export Options</li>
                  <li>• Performance Monitoring</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recent Projects</div>
                <div className="space-y-2">
                  {['E-commerce Store', 'Dashboard UI', 'Landing Page'].map((project, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Folder className="w-3 h-3" />
                      {project}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Bar */}
        <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
              {activeTab.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
            </button>

            {/* Action Buttons */}
            <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Save className="w-4 h-4" />
              Save
            </button>
            
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Play className="w-4 h-4" />
              Preview
            </button>

            <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Rocket className="w-4 h-4" />
              Deploy
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'builder' && (
            <VisualBuilder onCodeChange={setGeneratedCode} />
          )}
          
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <AIComponentGenerator onGenerate={(code) => setGeneratedCode(code)} />
              
              {/* AI Features Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Smart Generation</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    AI understands context and generates production-ready components with proper TypeScript types and accessibility.
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    ✓ 99% accuracy rate
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Multi-Framework</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Generate the same component for React, Vue, Svelte, or Angular with consistent design and functionality.
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    ✓ 4 frameworks supported
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Enterprise Ready</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Generated code follows enterprise standards with proper testing, documentation, and security practices.
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    ✓ Production validated
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code Editor</h3>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                      TypeScript
                    </button>
                    <button className="px-3 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-md">
                      React
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono overflow-auto max-h-96 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <code>{generatedCode || '// Generated code will appear here...\n// Use the AI Generator or Visual Builder to create components'}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h3>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Monitor className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Tablet className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Smartphone className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-96">
                  {/* Live Preview Content */}
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Eternal UI</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Build amazing websites visually</p>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Get Started
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                          <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                        <p className="text-gray-600 dark:text-gray-300">Build websites 10x faster with our AI-powered visual builder.</p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Powered</h3>
                        <p className="text-gray-600 dark:text-gray-300">Generate components from natural language descriptions.</p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                          <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise Ready</h3>
                        <p className="text-gray-600 dark:text-gray-300">Production-ready code with testing and documentation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <PerformanceDashboard />
              
              {/* Additional Performance Features */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Core Web Vitals</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Largest Contentful Paint</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">1.2s</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">First Input Delay</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">89ms</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Cumulative Layout Shift</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">0.02</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bundle Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Main Bundle</span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">18.2 KB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Vendor Bundle</span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">6.1 KB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Total Gzipped</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">24.3 KB</span>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                          Excellent bundle size
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Deploy Your Project</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all group">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-black dark:bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white dark:text-black font-bold text-lg">▲</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Vercel</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Deploy in seconds</p>
                    </div>
                  </button>

                  <button className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900 transition-all group">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">N</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Netlify</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Continuous deployment</p>
                    </div>
                  </button>

                  <button className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900 transition-all group">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <Cloud className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">AWS</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Enterprise scale</p>
                    </div>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Deploy</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Code optimized for production</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Environment variables configured</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">SSL certificate included</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">CDN optimization enabled</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deployment History */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Deployments</h3>
                <div className="space-y-3">
                  {[
                    { id: 1, status: 'success', time: '2 minutes ago', commit: 'Added AI generator', url: 'https://eternal-ui-pro.vercel.app' },
                    { id: 2, status: 'success', time: '1 hour ago', commit: 'Updated color theme', url: 'https://eternal-ui-pro-git-main.vercel.app' },
                    { id: 3, status: 'success', time: '3 hours ago', commit: 'Performance optimizations', url: 'https://eternal-ui-pro-git-perf.vercel.app' }
                  ].map((deployment) => (
                    <div key={deployment.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          deployment.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{deployment.commit}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{deployment.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a 
                          href={deployment.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          View
                        </a>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EternalUIPro;