import React, { useState, useCallback } from 'react';
import { 
  Zap, 
  Settings, 
  Info, 
  Target, 
  Grid, 
  Move, 
  MousePointer, 
  Compass, 
  Crosshair, 
  RotateCcw,
  Eye,
  Vibrate,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Tablet,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  Magnet,
  Layers,
  AlignCenter,
  Ruler,
  Focus
} from 'lucide-react';

// Types for Snap Configuration
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

interface SnapSettings {
  enabled: boolean;
  sensitivity: number;
  types: {
    gridIntersections: boolean;
    componentEdges: boolean;
    sectionBoundaries: boolean;
    centerLines: boolean;
    componentCenters: boolean;
  };
  feedback: {
    visual: boolean;
    haptic: boolean;
    audio: boolean;
    guides: boolean;
    highlights: boolean;
  };
  advanced: {
    magneticStrength: number;
    snapDistance: number;
    previewEnabled: boolean;
    smartSnap: boolean;
    multiSnap: boolean;
  };
}

interface SnapConfigTabProps {
  gridConfig: GridConfig;
  setGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>;
  theme: 'light' | 'dark';
  expandedSections: Set<string>;
  toggleSection: (sectionId: string) => void;
}

/**
 * Professional Snap Configuration Tab
 * 
 * Features:
 * - Comprehensive snap-to-grid settings
 * - Multiple snap types (grid, edges, boundaries, centers)
 * - Visual, haptic, and audio feedback options
 * - Advanced magnetic snapping controls
 * - Smart snap algorithms
 * - Multi-device preview and testing
 * - Keyboard shortcuts reference
 * - Real-time snap preview
 * - Performance optimization settings
 * - Accessibility features
 * 
 * This component provides enterprise-grade snap configuration
 * similar to professional design tools like Figma, Sketch, or Adobe XD
 */
const SnapConfigTab: React.FC<SnapConfigTabProps> = ({ 
  gridConfig, 
  setGridConfig, 
  theme,
  expandedSections,
  toggleSection
}) => {
  // Extended snap settings state
  const [snapSettings, setSnapSettings] = useState<SnapSettings>({
    enabled: gridConfig.snapEnabled,
    sensitivity: 15,
    types: {
      gridIntersections: true,
      componentEdges: true,
      sectionBoundaries: true,
      centerLines: true,
      componentCenters: false,
    },
    feedback: {
      visual: true,
      haptic: true,
      audio: false,
      guides: true,
      highlights: true,
    },
    advanced: {
      magneticStrength: 50,
      snapDistance: 20,
      previewEnabled: true,
      smartSnap: true,
      multiSnap: false,
    }
  });

  // Sync with grid config
  React.useEffect(() => {
    setSnapSettings(prev => ({
      ...prev,
      enabled: gridConfig.snapEnabled
    }));
  }, [gridConfig.snapEnabled]);

  // Update snap settings
  const updateSnapSettings = useCallback((updates: Partial<SnapSettings>) => {
    setSnapSettings(prev => {
      const newSettings = { ...prev, ...updates };
      
      // Sync with grid config if enabled state changed
      if (updates.enabled !== undefined) {
        setGridConfig(prevGrid => ({
          ...prevGrid,
          snapEnabled: updates.enabled
        }));
      }
      
      return newSettings;
    });
  }, [setGridConfig]);

  // Update nested snap settings
  const updateNestedSettings = useCallback(<T extends keyof SnapSettings>(
    category: T, 
    updates: Partial<SnapSettings[T]>
  ) => {
    setSnapSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], ...updates }
    }));
  }, []);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    const defaults: SnapSettings = {
      enabled: true,
      sensitivity: 15,
      types: {
        gridIntersections: true,
        componentEdges: true,
        sectionBoundaries: true,
        centerLines: true,
        componentCenters: false,
      },
      feedback: {
        visual: true,
        haptic: true,
        audio: false,
        guides: true,
        highlights: true,
      },
      advanced: {
        magneticStrength: 50,
        snapDistance: 20,
        previewEnabled: true,
        smartSnap: true,
        multiSnap: false,
      }
    };
    
    setSnapSettings(defaults);
    setGridConfig(prev => ({ ...prev, snapEnabled: defaults.enabled }));
  }, [setGridConfig]);

  return (
    <div className="p-4 space-y-6">
      {/* Quick Enable/Disable */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center space-x-3">
          <Zap className={`w-6 h-6 ${snapSettings.enabled ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Snap to Grid
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {snapSettings.enabled ? 'Components will snap to grid positions' : 'Free positioning enabled'}
            </p>
          </div>
        </div>
        <button
          onClick={() => updateSnapSettings({ enabled: !snapSettings.enabled })}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            snapSettings.enabled 
              ? 'bg-indigo-600' 
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
          aria-label="Toggle snap to grid"
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              snapSettings.enabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Basic Snap Settings */}
      <CollapsibleSection
        id="snap-basic"
        title="Basic Settings"
        icon={Settings}
        expanded={expandedSections.has('snap-basic')}
        onToggle={toggleSection}
      >
        <div className="space-y-6">
          {/* Sensitivity Control */}
          <div className={`transition-opacity ${snapSettings.enabled ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Snap Sensitivity
              </label>
              <span className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {snapSettings.sensitivity}px
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Distance threshold for automatic snapping. Lower values require more precision.
            </p>
            <input
              type="range"
              min="5"
              max="50"
              value={snapSettings.sensitivity}
              onChange={(e) => updateSnapSettings({ sensitivity: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              disabled={!snapSettings.enabled}
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(snapSettings.sensitivity / 50) * 100}%, #e5e7eb ${(snapSettings.sensitivity / 50) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Precise (5px)</span>
              <span>Relaxed (50px)</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Precise', sensitivity: 8, icon: Focus },
                { name: 'Balanced', sensitivity: 15, icon: Target },
                { name: 'Relaxed', sensitivity: 25, icon: Compass },
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => updateSnapSettings({ sensitivity: preset.sensitivity })}
                  disabled={!snapSettings.enabled}
                  className={`p-3 text-xs rounded-lg border transition-all ${
                    snapSettings.sensitivity === preset.sensitivity
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${!snapSettings.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <preset.icon className="w-4 h-4 mx-auto mb-1" />
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-gray-500 dark:text-gray-400">{preset.sensitivity}px</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Snap Types */}
      <CollapsibleSection
        id="snap-types"
        title="Snap Types"
        icon={Grid}
        expanded={expandedSections.has('snap-types')}
        onToggle={toggleSection}
        description="Choose what elements components can snap to"
      >
        <div className="space-y-4">
          {[
            {
              key: 'gridIntersections' as const,
              label: 'Grid Intersections',
              description: 'Snap to grid line crossings',
              icon: Grid,
              recommended: true
            },
            {
              key: 'componentEdges' as const,
              label: 'Component Edges',
              description: 'Snap to edges of other components',
              icon: Move,
              recommended: true
            },
            {
              key: 'sectionBoundaries' as const,
              label: 'Section Boundaries',
              description: 'Snap to layout section borders',
              icon: Layers,
              recommended: true
            },
            {
              key: 'centerLines' as const,
              label: 'Center Guidelines',
              description: 'Snap to center alignment guides',
              icon: AlignCenter,
              recommended: false
            },
            {
              key: 'componentCenters' as const,
              label: 'Component Centers',
              description: 'Snap to center points of components',
              icon: Crosshair,
              recommended: false
            },
          ].map((snapType) => (
            <div
              key={snapType.key}
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                snapSettings.types[snapType.key]
                  ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/10'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              } ${!snapSettings.enabled ? 'opacity-50' : ''}`}
            >
              <label className="flex items-center cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={snapSettings.types[snapType.key]}
                  onChange={(e) => updateNestedSettings('types', { [snapType.key]: e.target.checked })}
                  disabled={!snapSettings.enabled}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <snapType.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {snapType.label}
                    </span>
                    {snapType.recommended && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {snapType.description}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Feedback Settings */}
      <CollapsibleSection
        id="snap-feedback"
        title="Visual & Audio Feedback"
        icon={Eye}
        expanded={expandedSections.has('snap-feedback')}
        onToggle={toggleSection}
        description="Configure how snap events are communicated"
      >
        <div className="space-y-4">
          {[
            {
              key: 'visual' as const,
              label: 'Visual Indicators',
              description: 'Show snap guides and highlights',
              icon: Eye,
              available: true
            },
            {
              key: 'guides' as const,
              label: 'Snap Guidelines',
              description: 'Show temporary alignment guides',
              icon: Ruler,
              available: true
            },
            {
              key: 'highlights' as const,
              label: 'Snap Point Highlights',
              description: 'Highlight active snap targets',
              icon: Target,
              available: true
            },
            {
              key: 'haptic' as const,
              label: 'Haptic Feedback',
              description: 'Vibration on snap (mobile devices)',
              icon: Vibrate,
              available: 'vibrate' in navigator
            },
            {
              key: 'audio' as const,
              label: 'Audio Cues',
              description: 'Sound effects for snap events',
              icon: Volume2,
              available: true
            },
          ].map((feedback) => (
            <div
              key={feedback.key}
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                snapSettings.feedback[feedback.key]
                  ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              } ${!snapSettings.enabled || !feedback.available ? 'opacity-50' : ''}`}
            >
              <label className="flex items-center cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={snapSettings.feedback[feedback.key]}
                  onChange={(e) => updateNestedSettings('feedback', { [feedback.key]: e.target.checked })}
                  disabled={!snapSettings.enabled || !feedback.available}
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <feedback.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {feedback.label}
                    </span>
                    {!feedback.available && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                        N/A
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {feedback.description}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Advanced Settings */}
      <CollapsibleSection
        id="snap-advanced"
        title="Advanced Options"
        icon={Settings}
        expanded={expandedSections.has('snap-advanced')}
        onToggle={toggleSection}
        description="Fine-tune snap behavior and performance"
      >
        <div className="space-y-6">
          {/* Magnetic Strength */}
          <div className={`transition-opacity ${snapSettings.enabled ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Magnet className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Magnetic Strength
                </label>
              </div>
              <span className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {snapSettings.advanced.magneticStrength}%
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              How strongly components are pulled toward snap points
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={snapSettings.advanced.magneticStrength}
              onChange={(e) => updateNestedSettings('advanced', { magneticStrength: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              disabled={!snapSettings.enabled}
            />
          </div>

          {/* Snap Distance */}
          <div className={`transition-opacity ${snapSettings.enabled ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Crosshair className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Snap Distance
                </label>
              </div>
              <span className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {snapSettings.advanced.snapDistance}px
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Maximum distance for snap detection
            </p>
            <input
              type="range"
              min="10"
              max="100"
              value={snapSettings.advanced.snapDistance}
              onChange={(e) => updateNestedSettings('advanced', { snapDistance: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              disabled={!snapSettings.enabled}
            />
          </div>

          {/* Advanced Toggles */}
          <div className="space-y-3">
            {[
              {
                key: 'previewEnabled' as const,
                label: 'Snap Preview',
                description: 'Show preview of snap position while dragging'
              },
              {
                key: 'smartSnap' as const,
                label: 'Smart Snap',
                description: 'Automatically choose the best snap target'
              },
              {
                key: 'multiSnap' as const,
                label: 'Multi-directional Snap',
                description: 'Allow snapping to multiple axes simultaneously'
              },
            ].map((toggle) => (
              <div key={toggle.key} className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {toggle.label}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {toggle.description}
                  </p>
                </div>
                <button
                  onClick={() => updateNestedSettings('advanced', { 
                    [toggle.key]: !snapSettings.advanced[toggle.key] 
                  })}
                  disabled={!snapSettings.enabled}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    snapSettings.advanced[toggle.key] && snapSettings.enabled
                      ? 'bg-indigo-600' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  } ${!snapSettings.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      snapSettings.advanced[toggle.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Device Testing */}
      <CollapsibleSection
        id="snap-testing"
        title="Device Testing"
        icon={Smartphone}
        expanded={expandedSections.has('snap-testing')}
        onToggle={toggleSection}
        description="Test snap behavior across different devices"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Desktop', icon: Monitor, sensitivity: 15 },
              { name: 'Tablet', icon: Tablet, sensitivity: 20 },
              { name: 'Mobile', icon: Smartphone, sensitivity: 25 },
            ].map((device) => (
              <button
                key={device.name}
                onClick={() => updateSnapSettings({ sensitivity: device.sensitivity })}
                className="p-3 text-center border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <device.icon className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{device.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{device.sensitivity}px</div>
              </button>
            ))}
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <Info className="w-4 h-4 inline mr-2" />
              Device presets adjust sensitivity for optimal touch/mouse interaction
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Keyboard Shortcuts */}
      <CollapsibleSection
        id="snap-shortcuts"
        title="Keyboard Shortcuts"
        icon={Target}
        expanded={expandedSections.has('snap-shortcuts')}
        onToggle={toggleSection}
        description="Learn snap-related keyboard shortcuts"
      >
        <div className="space-y-3">
          {[
            { keys: ['Ctrl', 'Shift', 'S'], action: 'Toggle snap on/off' },
            { keys: ['Alt'], action: 'Temporarily disable snap (hold)' },
            { keys: ['Shift'], action: 'Constrain to single axis (hold)' },
            { keys: ['Ctrl'], action: 'Duplicate while snapping (hold)' },
            { keys: ['Arrow Keys'], action: 'Fine positioning (1px increments)' },
            { keys: ['Shift', 'Arrow'], action: 'Coarse positioning (10px increments)' },
            { keys: ['Ctrl', 'Alt', 'C'], action: 'Snap to canvas center' },
            { keys: ['Ctrl', 'Alt', 'G'], action: 'Snap to nearest grid intersection' },
          ].map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {shortcut.action}
              </span>
              <div className="flex items-center space-x-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <React.Fragment key={keyIndex}>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs font-mono">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="text-gray-400 text-xs">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Reset and Help */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={resetToDefaults}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Defaults</span>
        </button>
        
        <button className="flex items-center space-x-2 px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors">
          <HelpCircle className="w-4 h-4" />
          <span>Learn More</span>
        </button>
      </div>
    </div>
  );
};

// Simplified CollapsibleSection for this component
interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  expanded: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
  description?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  icon: Icon,
  expanded,
  onToggle,
  children,
  description
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors flex items-center justify-between text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</span>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <div className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {expanded && (
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

export default SnapConfigTab;