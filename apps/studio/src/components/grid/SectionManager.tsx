import React, { useState, useCallback } from 'react';
import {
  Layers,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  GripVertical,
  Edit2,
  Save,
  X,
  ChevronUp,
  ChevronDown,
  Navigation,
  Home,
  FileText,
  Sidebar,
  MapPin,
  Settings
} from 'lucide-react';

interface WebPageSection {
  id: string;
  name: string;
  type: 'header' | 'navigation' | 'hero' | 'content' | 'sidebar' | 'footer';
  height: number;
  backgroundColor: string;
  order: number;
  visible: boolean;
  required: boolean;
}

interface SectionManagerProps {
  sections: WebPageSection[];
  onSectionsChange: (sections: WebPageSection[]) => void;
  theme: 'light' | 'dark';
  className?: string;
}

/**
 * Website Section Manager Component
 * 
 * Features:
 * - Add/remove page sections
 * - Reorder sections with drag handles
 * - Edit section properties (height, background color)
 * - Toggle section visibility
 * - Pre-defined section types with appropriate defaults
 * - Visual section type indicators
 * - Responsive height controls
 */
const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onSectionsChange,
  theme,
  className = ''
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WebPageSection>>({});

  // Section type configurations
  const sectionTypes = [
    {
      type: 'header' as const,
      name: 'Header',
      icon: Home,
      defaultHeight: 80,
      description: 'Site header with logo and navigation',
      color: '#3b82f6'
    },
    {
      type: 'navigation' as const,
      name: 'Navigation',
      icon: Navigation,
      defaultHeight: 60,
      description: 'Main navigation menu',
      color: '#8b5cf6'
    },
    {
      type: 'hero' as const,
      name: 'Hero Section',
      icon: FileText,
      defaultHeight: 400,
      description: 'Large banner or hero content',
      color: '#10b981'
    },
    {
      type: 'content' as const,
      name: 'Content',
      icon: FileText,
      defaultHeight: 600,
      description: 'Main page content area',
      color: '#f59e0b'
    },
    {
      type: 'sidebar' as const,
      name: 'Sidebar',
      icon: Sidebar,
      defaultHeight: 300,
      description: 'Side content area',
      color: '#ef4444'
    },
    {
      type: 'footer' as const,
      name: 'Footer',
      icon: MapPin,
      defaultHeight: 200,
      description: 'Site footer with links and info',
      color: '#6b7280'
    }
  ];

  // Get section background color based on type and theme
  const getSectionBackgroundColor = (type: string, currentTheme: 'light' | 'dark'): string => {
    const colors = {
      header: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
      navigation: currentTheme === 'dark' ? '#111827' : '#f8fafc',
      hero: currentTheme === 'dark' ? '#1e293b' : '#f1f5f9',
      content: currentTheme === 'dark' ? '#0f172a' : '#ffffff',
      sidebar: currentTheme === 'dark' ? '#1e293b' : '#f8fafc',
      footer: currentTheme === 'dark' ? '#111827' : '#f9fafb'
    };
    return colors[type as keyof typeof colors] || (currentTheme === 'dark' ? '#1f2937' : '#ffffff');
  };

  // Add new section
  const addSection = useCallback((type: WebPageSection['type']) => {
    const sectionConfig = sectionTypes.find(s => s.type === type);
    if (!sectionConfig) return;

    const newSection: WebPageSection = {
      id: `${type}-${Date.now()}`,
      name: sectionConfig.name,
      type,
      height: sectionConfig.defaultHeight,
      backgroundColor: getSectionBackgroundColor(type, theme),
      order: sections.length + 1,
      visible: true,
      required: type === 'header' || type === 'content' || type === 'footer'
    };

    onSectionsChange([...sections, newSection]);
  }, [sections, theme, onSectionsChange]);

  // Remove section
  const removeSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.required) return; // Can't remove required sections

    onSectionsChange(sections.filter(s => s.id !== sectionId));
  }, [sections, onSectionsChange]);

  // Toggle section visibility
  const toggleVisibility = useCallback((sectionId: string) => {
    onSectionsChange(sections.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    ));
  }, [sections, onSectionsChange]);

  // Move section up/down
  const moveSection = useCallback((sectionId: string, direction: 'up' | 'down') => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;

    if (targetIndex < 0 || targetIndex >= sections.length) return;

    // Swap sections
    [newSections[sectionIndex], newSections[targetIndex]] = [newSections[targetIndex], newSections[sectionIndex]];
    
    // Update order values
    newSections.forEach((section, index) => {
      section.order = index + 1;
    });

    onSectionsChange(newSections);
  }, [sections, onSectionsChange]);

  // Start editing section
  const startEditing = useCallback((section: WebPageSection) => {
    setEditingSection(section.id);
    setEditForm(section);
  }, []);

  // Save section edits
  const saveEdits = useCallback(() => {
    if (!editingSection || !editForm) return;

    onSectionsChange(sections.map(section => 
      section.id === editingSection 
        ? { ...section, ...editForm }
        : section
    ));

    setEditingSection(null);
    setEditForm({});
  }, [editingSection, editForm, sections, onSectionsChange]);

  // Cancel editing
  const cancelEditing = useCallback(() => {
    setEditingSection(null);
    setEditForm({});
  }, []);

  // Get section type configuration
  const getSectionTypeConfig = (type: string) => {
    return sectionTypes.find(st => st.type === type) || sectionTypes[0];
  };

  return (
    <div className={`w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-indigo-500" />
            Page Sections
          </h2>
        </div>

        {/* Add Section Dropdown */}
        <div className="relative">
          <select
            onChange={(e) => {
              if (e.target.value) {
                addSection(e.target.value as WebPageSection['type']);
                e.target.value = ''; // Reset selection
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            defaultValue=""
          >
            <option value="" disabled>Add Section...</option>
            {sectionTypes.map(type => (
              <option key={type.type} value={type.type}>
                {type.name} - {type.description}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Stats */}
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 flex justify-between">
          <span>Total: {sections.length} sections</span>
          <span>Height: {sections.filter(s => s.visible).reduce((sum, s) => sum + s.height, 0)}px</span>
        </div>
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => {
              const typeConfig = getSectionTypeConfig(section.type);
              const isEditing = editingSection === section.id;

              return (
                <div
                  key={section.id}
                  className={`border rounded-lg transition-all ${
                    section.visible
                      ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-60'
                  } ${isEditing ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  {isEditing ? (
                    /* Edit Mode */
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <typeConfig.icon 
                          className="w-5 h-5" 
                          style={{ color: typeConfig.color }} 
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEdits}
                            className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                            title="Save changes"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            title="Cancel editing"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Section Name
                        </label>
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Height: {editForm.height || 0}px
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="800"
                          value={editForm.height || 0}
                          onChange={(e) => setEditForm(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>50px</span>
                          <span>800px</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Background Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={editForm.backgroundColor || '#ffffff'}
                            onChange={(e) => setEditForm(prev => ({ ...prev, backgroundColor: e.target.value }))}
                            className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={editForm.backgroundColor || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, backgroundColor: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <typeConfig.icon 
                            className="w-5 h-5 flex-shrink-0" 
                            style={{ color: typeConfig.color }} 
                          />
                          <div className="min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {section.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {section.height}px • {typeConfig.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          {/* Visibility Toggle */}
                          <button
                            onClick={() => toggleVisibility(section.id)}
                            className={`p-1 rounded transition-colors ${
                              section.visible
                                ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            title={section.visible ? 'Hide section' : 'Show section'}
                          >
                            {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => startEditing(section)}
                            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Edit section"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Move Up */}
                          {index > 0 && (
                            <button
                              onClick={() => moveSection(section.id, 'up')}
                              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                          )}

                          {/* Move Down */}
                          {index < sections.length - 1 && (
                            <button
                              onClick={() => moveSection(section.id, 'down')}
                              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete Button (only for non-required sections) */}
                          {!section.required && (
                            <button
                              onClick={() => removeSection(section.id)}
                              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                              title="Delete section"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Section Preview */}
                      <div 
                        className="w-full h-8 rounded border border-gray-200 dark:border-gray-600 relative overflow-hidden"
                        style={{ backgroundColor: section.backgroundColor }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mix-blend-difference">
                            {section.type}
                          </span>
                        </div>
                      </div>

                      {/* Required Badge */}
                      {section.required && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            Required
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

          {sections.length === 0 && (
            <div className="text-center py-8">
              <Layers className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                No sections added yet
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Use the dropdown above to add your first section
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>Visible Sections:</span>
            <span className="font-mono">{sections.filter(s => s.visible).length}/{sections.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Height:</span>
            <span className="font-mono">{sections.filter(s => s.visible).reduce((sum, s) => sum + s.height, 0)}px</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionManager;