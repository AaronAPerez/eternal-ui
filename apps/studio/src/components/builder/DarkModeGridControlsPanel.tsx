import React, { useState, useCallback } from 'react';
import { 
  Grid, 
  Layers, 
  Move, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Copy, 
  RotateCcw,
  Palette,
  Settings,
  Maximize2,
  Minimize2,
  Lock,
  Unlock,
  Download,
  Upload,
  Sliders,
  Target,
  Zap,
  Info
} from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';
import SnapConfigTab from './SnapConfigTab';

// Types for Grid Controls Panel
interface GridConfig {
  visible: boolean;
  snapEnabled: boolean;
  columns: number;
  rows: number;
  cellSize: number;
  gap: number;
  opacity: number;
  color: string;
  style: 'lines' | 'dots' | 'solid';
}

interface GridSection {
  id: string;
  name: string;
  startCol: number;
  endCol: number;
  startRow: number;
  endRow: number;
  color: string;
  visible: boolean;
}

interface ColorPreset {
  name: string;
  value: string;
}

interface DarkModeGridControlsPanelProps {
  gridConfig: GridConfig;
  setGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>;
  sections: GridSection[];
  setSections: React.Dispatch<React.SetStateAction<GridSection[]>>;
  colorPresets: ColorPreset[];
  theme: 'light' | 'dark';
}

/**
 * Professional Grid Controls Panel
 * 
 * Features:
 * - Tabbed interface for organized controls
 * - Grid configuration with live preview
 * - Section management with visual indicators
 * - Snap settings with advanced options
 * - Color presets and custom color picker
 * - Import/export functionality
 * - Keyboard shortcuts
 * - Accessibility features
 * - Professional styling with animations
 */
const DarkModeGridControlsPanel: React.FC<DarkModeGridControlsPanelProps> = ({ 
  gridConfig,
  setGridConfig,
  sections,
  setSections,
  colorPresets,
  theme
}) => {
  const [activeTab, setActiveTab] = useState<'grid' | 'sections' | 'snap'>('grid');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basic']));

  // Tab configuration
  const tabs = [
    { 
      id: 'grid' as const, 
      label: 'Grid', 
      icon: Grid,
      description: 'Configure grid appearance and behavior'
    },
    { 
      id: 'sections' as const, 
      label: 'Sections', 
      icon: Layers,
      description: 'Manage layout sections and regions'
    },
    { 
      id: 'snap' as const, 
      label: 'Snap', 
      icon: Move,
      description: 'Configure snap-to-grid settings'
    }
  ];

  // Toggle section expansion
  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  // Export grid configuration
  const exportConfig = useCallback(() => {
    const config = {
      gridConfig,
      sections,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [gridConfig, sections]);

  // Import grid configuration
  const importConfig = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        if (config.gridConfig) {
          setGridConfig(config.gridConfig);
        }
        if (config.sections) {
          setSections(config.sections);
        }
      } catch (error) {
        console.error('Failed to import configuration:', error);
      }
    };
    reader.readAsText(file);
  }, [setGridConfig, setSections]);

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300 h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
            Grid Controls
          </h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={exportConfig}
              className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              title="Export configuration"
            >
              <Download className="w-4 h-4" />
            </button>
            <label className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept=".json"
                onChange={importConfig}
                className="hidden"
              />
            </label>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="text-xs text-gray-600 dark:text-gray-400 grid grid-cols-2 gap-2">
          <div className="flex justify-between">
            <span>Grid:</span>
            <span className="font-mono">{gridConfig.columns}×{gridConfig.rows}</span>
          </div>
          <div className="flex justify-between">
            <span>Sections:</span>
            <span className="font-mono">{sections.filter(s => s.visible).length}/{sections.length}</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center px-3 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id 
                ? 'border-b-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            aria-label={`Switch to ${tab.label} tab`}
            title={tab.description}
          >
            <tab.icon className="w-4 h-4 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'grid' && (
          <GridConfigTab 
            gridConfig={gridConfig}
            setGridConfig={setGridConfig}
            colorPresets={colorPresets}
            theme={theme}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        )}

        {activeTab === 'sections' && (
          <SectionsTab 
            sections={sections}
            setSections={setSections}
            gridConfig={gridConfig}
            theme={theme}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        )}

        {activeTab === 'snap' && (
          <SnapConfigTab 
            gridConfig={gridConfig}
            setGridConfig={setGridConfig}
            theme={theme}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={`font-medium ${gridConfig.visible ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
              {gridConfig.visible ? 'Active' : 'Hidden'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Snap:</span>
            <span className={`font-medium ${gridConfig.snapEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
              {gridConfig.snapEnabled ? 'On' : 'Off'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Grid Configuration Tab Component
interface GridConfigTabProps {
  gridConfig: GridConfig;
  setGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>;
  colorPresets: ColorPreset[];
  theme: 'light' | 'dark';
  expandedSections: Set<string>;
  toggleSection: (sectionId: string) => void;
}

const GridConfigTab: React.FC<GridConfigTabProps> = ({ 
  gridConfig, 
  setGridConfig, 
  colorPresets, 
  theme,
  expandedSections,
  toggleSection
}) => {
  // Preset grid configurations
  const gridPresets = [
    { name: '12 Column', columns: 12, rows: 8, cellSize: 60 },
    { name: '16 Column', columns: 16, rows: 10, cellSize: 50 },
    { name: '24 Column', columns: 24, rows: 12, cellSize: 40 },
    { name: 'Mobile', columns: 4, rows: 8, cellSize: 80 },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Quick Presets */}
      <CollapsibleSection
        id="presets"
        title="Grid Presets"
        icon={Target}
        expanded={expandedSections.has('presets')}
        onToggle={toggleSection}
      >
        <div className="grid grid-cols-2 gap-2">
          {gridPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setGridConfig(prev => ({
                ...prev,
                columns: preset.columns,
                rows: preset.rows,
                cellSize: preset.cellSize
              }))}
              className="p-2 text-xs bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors text-center"
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{preset.name}</div>
              <div className="text-gray-500 dark:text-gray-400">{preset.columns}×{preset.rows}</div>
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Basic Settings */}
      <CollapsibleSection
        id="basic"
        title="Grid Dimensions"
        icon={Grid}
        expanded={expandedSections.has('basic')}
        onToggle={toggleSection}
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Columns</label>
              <span className="text-sm font-mono text-gray-900 dark:text-gray-100">{gridConfig.columns}</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              value={gridConfig.columns}
              onChange={(e) => setGridConfig(prev => ({ ...prev, columns: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(gridConfig.columns / 24) * 100}%, #e5e7eb ${(gridConfig.columns / 24) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Rows</label>
              <span className="text-sm font-mono text-gray-900 dark:text-gray-100">{gridConfig.rows}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={gridConfig.rows}
              onChange={(e) => setGridConfig(prev => ({ ...prev, rows: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(gridConfig.rows / 20) * 100}%, #e5e7eb ${(gridConfig.rows / 20) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Appearance Settings */}
      <CollapsibleSection
        id="appearance"
        title="Appearance"
        icon={Palette}
        expanded={expandedSections.has('appearance')}
        onToggle={toggleSection}
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Cell Size</label>
              <span className="text-sm font-mono text-gray-900 dark:text-gray-100">{gridConfig.cellSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={gridConfig.cellSize}
              onChange={(e) => setGridConfig(prev => ({ ...prev, cellSize: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Gap</label>
              <span className="text-sm font-mono text-gray-900 dark:text-gray-100">{gridConfig.gap}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              value={gridConfig.gap}
              onChange={(e) => setGridConfig(prev => ({ ...prev, gap: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Opacity</label>
              <span className="text-sm font-mono text-gray-900 dark:text-gray-100">{Math.round(gridConfig.opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={gridConfig.opacity}
              onChange={(e) => setGridConfig(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Color Settings */}
      <CollapsibleSection
        id="colors"
        title="Grid Colors"
        icon={Palette}
        expanded={expandedSections.has('colors')}
        onToggle={toggleSection}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-3">Color Presets</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setGridConfig(prev => ({ ...prev, color: preset.value }))}
                  className={`w-full h-10 rounded-lg border-2 transition-all duration-200 ${
                    gridConfig.color === preset.value 
                      ? 'border-gray-900 dark:border-gray-100 scale-110 shadow-lg' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: preset.value }}
                  title={preset.name}
                  aria-label={`Set grid color to ${preset.name}`}
                />
              ))}
            </div>
          </div>
          
          {/* Custom Color Input */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Custom Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={gridConfig.color}
                onChange={(e) => setGridConfig(prev => ({ ...prev, color: e.target.value }))}
                className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={gridConfig.color}
                onChange={(e) => setGridConfig(prev => ({ ...prev, color: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
                placeholder="#6366f1"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Style Settings */}
      <CollapsibleSection
        id="style"
        title="Grid Style"
        icon={Sliders}
        expanded={expandedSections.has('style')}
        onToggle={toggleSection}
      >
        <div className="space-y-3">
          {(['lines', 'dots', 'solid'] as const).map((style) => (
            <label key={style} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                value={style}
                checked={gridConfig.style === style}
                onChange={(e) => setGridConfig(prev => ({ ...prev, style: e.target.value as GridConfig['style'] }))}
                className="w-4 h-4 text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize group-hover:text-gray-900 dark:group-hover:text-gray-100">
                {style}
              </span>
              <div 
                className="ml-auto w-8 h-8 border rounded flex-shrink-0"
                style={{
                  backgroundImage: style === 'dots' 
                    ? `radial-gradient(circle, ${gridConfig.color} 1px, transparent 1px)`
                    : style === 'lines'
                    ? `linear-gradient(to right, ${gridConfig.color} 1px, transparent 1px), linear-gradient(to bottom, ${gridConfig.color} 1px, transparent 1px)`
                    : `linear-gradient(${gridConfig.color}, ${gridConfig.color})`,
                  backgroundSize: style === 'solid' ? '100% 100%' : '8px 8px'
                }}
              />
            </label>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

// Sections Tab Component
interface SectionsTabProps {
  sections: GridSection[];
  setSections: React.Dispatch<React.SetStateAction<GridSection[]>>;
  gridConfig: GridConfig;
  theme: 'light' | 'dark';
  expandedSections: Set<string>;
  toggleSection: (sectionId: string) => void;
}

const SectionsTab: React.FC<SectionsTabProps> = ({ 
  sections, 
  setSections, 
  gridConfig, 
  theme,
  expandedSections,
  toggleSection
}) => {
  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, visible: !section.visible }
          : section
      )
    );
  }, [setSections]);

  const updateSectionColor = useCallback((sectionId: string, color: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, color }
          : section
      )
    );
  }, [setSections]);

  const updateSectionName = useCallback((sectionId: string, name: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, name }
          : section
      )
    );
  }, [setSections]);

  const deleteSection = useCallback((sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
  }, [setSections]);

  const addNewSection = useCallback(() => {
    const newSection: GridSection = {
      id: `section-${Date.now()}`,
      name: 'New Section',
      startCol: 1,
      endCol: 4,
      startRow: 1,
      endRow: 2,
      color: '#8b5cf6',
      visible: true
    };
    setSections(prev => [...prev, newSection]);
  }, [setSections]);

  return (
    <div className="p-4 space-y-6">
      {/* Section Management */}
      <CollapsibleSection
        id="section-list"
        title="Layout Sections"
        icon={Layers}
        expanded={expandedSections.has('section-list')}
        onToggle={toggleSection}
        action={
          <button
            onClick={addNewSection}
            className="p-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors"
            title="Add new section"
          >
            <Plus className="w-4 h-4" />
          </button>
        }
      >
        <div className="space-y-3">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1">
                  <div 
                    className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: section.color }}
                  />
                  <input
                    type="text"
                    value={section.name}
                    onChange={(e) => updateSectionName(section.id, e.target.value)}
                    className="flex-1 text-sm font-medium bg-transparent text-gray-900 dark:text-gray-100 border-none outline-none focus:bg-white dark:focus:bg-gray-700 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => toggleSectionVisibility(section.id)}
                    className={`p-1 rounded transition-colors ${
                      section.visible 
                        ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20' 
                        : 'text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title={section.visible ? 'Hide section' : 'Show section'}
                  >
                    {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    title="Delete section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-mono">
                Col {section.startCol}-{section.endCol}, Row {section.startRow}-{section.endRow}
              </div>
              
              <input
                type="color"
                value={section.color}
                onChange={(e) => updateSectionColor(section.id, e.target.value)}
                className="w-full h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                title="Change section color"
              />
            </div>
          ))}
          
          {sections.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No sections defined</p>
              <button
                onClick={addNewSection}
                className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline mt-2"
              >
                Create your first section
              </button>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Section Presets */}
      <CollapsibleSection
        id="section-presets"
        title="Common Layouts"
        icon={Target}
        expanded={expandedSections.has('section-presets')}
        onToggle={toggleSection}
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Header/Footer', sections: ['Header', 'Main', 'Footer'] },
            { name: 'Sidebar Left', sections: ['Header', 'Sidebar', 'Main', 'Footer'] },
            { name: 'Sidebar Right', sections: ['Header', 'Main', 'Sidebar', 'Footer'] },
            { name: 'Three Column', sections: ['Header', 'Left', 'Center', 'Right', 'Footer'] },
          ].map((preset) => (
            <button
              key={preset.name}
              className="p-2 text-xs bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors text-center"
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{preset.name}</div>
              <div className="text-gray-500 dark:text-gray-400">{preset.sections.length} sections</div>
            </button>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default DarkModeGridControlsPanel;