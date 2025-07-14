'use client'

import React from 'react'

const DarkModeEnhancedGridSystem = () => {
  return (
    <div className="h-screen bg-white dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Enhanced Grid System
        </h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Grid system will be implemented here
          </p>
        </div>
      </div>
    </div>
  )
}

export default DarkModeEnhancedGridSystem;
// 'use client'

// import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
// import { 
//   Grid, Settings, Eye, EyeOff, Move, RotateCw, Maximize2, Minimize2,
//   Palette, Layers, Ruler, Lock, Unlock, AlignCenter, AlignLeft, AlignRight,
//   Plus, Minus, MoreHorizontal, Separator, Square, Circle, Sun, Moon, Monitor
// } from 'lucide-react';
// import { useTheme } from '@/hooks/useTheme';

// // Dark Mode Enhanced Grid System
// const DarkModeEnhancedGridSystem = () => {
//   const { theme, toggleTheme, mounted } = useTheme();
  
//   const [gridConfig, setGridConfig] = useState({
//     enabled: true,
//     visible: true,
//     columns: 12,
//     rows: 8,
//     gap: 16,
//     cellSize: 40,
//     color: theme === 'dark' ? '#6366f1' : '#3b82f6', // Adapt to theme
//     opacity: 0.3,
//     snapEnabled: true,
//     snapThreshold: 10,
//     showLabels: true,
//     showGuides: true,
//     magneticSnap: true,
//     type: 'standard'
//   });

//   const [sections, setSections] = useState([
//     { id: 'header', name: 'Header', startRow: 1, endRow: 2, color: '#ef4444' },
//     { id: 'content', name: 'Content', startRow: 2, endRow: 7, color: '#10b981' },
//     { id: 'footer', name: 'Footer', startRow: 7, endRow: 8, color: '#8b5cf6' }
//   ]);

//   const [selectedComponent, setSelectedComponent] = useState(null);
//   const [canvasComponents, setCanvasComponents] = useState([]);
//   const [showGridControls, setShowGridControls] = useState(true);

//   // Update grid color when theme changes
//   useEffect(() => {
//     if (mounted) {
//       setGridConfig(prev => ({
//         ...prev,
//         color: theme === 'dark' ? '#6366f1' : '#3b82f6'
//       }));
//     }
//   }, [theme, mounted]);

//   // Dark mode color presets
//   const colorPresets = [
//     { name: 'Blue', value: theme === 'dark' ? '#60a5fa' : '#3b82f6' },
//     { name: 'Purple', value: theme === 'dark' ? '#a78bfa' : '#8b5cf6' },
//     { name: 'Green', value: theme === 'dark' ? '#4ade80' : '#10b981' },
//     { name: 'Red', value: theme === 'dark' ? '#f87171' : '#ef4444' },
//     { name: 'Yellow', value: theme === 'dark' ? '#fbbf24' : '#f59e0b' },
//     { name: 'Pink', value: theme === 'dark' ? '#f472b6' : '#ec4899' },
//     { name: 'Indigo', value: theme === 'dark' ? '#818cf8' : '#6366f1' },
//     { name: 'Gray', value: theme === 'dark' ? '#9ca3af' : '#6b7280' }
//   ];

//   return (
//     <div className="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
//       {/* Dark Mode Enhanced Toolbar */}
//       <DarkModeGridToolbar 
//         gridConfig={gridConfig}
//         setGridConfig={setGridConfig}
//         colorPresets={colorPresets}
//         showGridControls={showGridControls}
//         setShowGridControls={setShowGridControls}
//         theme={theme}
//         toggleTheme={toggleTheme}
//         mounted={mounted}
//       />

//       <div className="flex-1 flex overflow-hidden">
//         {/* Dark Mode Grid Controls Panel */}
//         {showGridControls && (
//           <DarkModeGridControlsPanel 
//             gridConfig={gridConfig}
//             setGridConfig={setGridConfig}
//             sections={sections}
//             setSections={setSections}
//             colorPresets={colorPresets}
//             theme={theme}
//           />
//         )}

//         {/* Dark Mode Canvas Area */}
//         <div className="flex-1 relative overflow-auto bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
//           <DarkModeGridCanvas 
//             gridConfig={gridConfig}
//             sections={sections}
//             canvasComponents={canvasComponents}
//             setCanvasComponents={setCanvasComponents}
//             selectedComponent={selectedComponent}
//             setSelectedComponent={setSelectedComponent}
//             theme={theme}
//           />
//         </div>

//         {/* Dark Mode Properties Panel */}
//         {selectedComponent && (
//           <DarkModePropertiesPanel 
//             component={canvasComponents.find(c => c.id === selectedComponent)}
//             onUpdate={(updates) => {
//               setCanvasComponents(prev => 
//                 prev.map(c => c.id === selectedComponent ? { ...c, ...updates } : c)
//               );
//             }}
//             gridConfig={gridConfig}
//             sections={sections}
//             theme={theme}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Dark Mode Enhanced Toolbar
// const DarkModeGridToolbar = ({ 
//   gridConfig, 
//   setGridConfig, 
//   colorPresets,
//   showGridControls,
//   setShowGridControls,
//   theme,
//   toggleTheme,
//   mounted
// }) => {
//   return (
//     <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-2">
//           <Grid className="w-5 h-5 text-blue-500 dark:text-blue-400" />
//           <span className="font-semibold text-gray-900 dark:text-gray-100">Enhanced Grid System</span>
//         </div>

//         {/* Grid Toggle */}
//         <button
//           onClick={() => setGridConfig(prev => ({ ...prev, visible: !prev.visible }))}
//           className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
//             gridConfig.visible 
//               ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
//               : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//           }`}
//         >
//           {gridConfig.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//           <span className="text-sm">Grid</span>
//         </button>

//         {/* Snap Toggle */}
//         <button
//           onClick={() => setGridConfig(prev => ({ ...prev, snapEnabled: !prev.snapEnabled }))}
//           className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
//             gridConfig.snapEnabled 
//               ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
//               : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//           }`}
//         >
//           {gridConfig.snapEnabled ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
//           <span className="text-sm">Snap</span>
//         </button>

//         {/* Grid Size Controls */}
//         <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-300">
//           <button
//             onClick={() => setGridConfig(prev => ({ ...prev, columns: Math.max(4, prev.columns - 2) }))}
//             className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400 transition-colors duration-200"
//           >
//             <Minus className="w-4 h-4" />
//           </button>
//           <span className="px-2 text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[2rem] text-center">
//             {gridConfig.columns}
//           </span>
//           <button
//             onClick={() => setGridConfig(prev => ({ ...prev, columns: Math.min(24, prev.columns + 2) }))}
//             className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400 transition-colors duration-200"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center space-x-3">
//         {/* Theme Toggle */}
//         {mounted && (
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
//             title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
//           >
//             {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
//           </button>
//         )}

//         {/* Color Picker */}
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-600 dark:text-gray-400">Color:</span>
//           <div className="flex space-x-1">
//             {colorPresets.slice(0, 4).map(color => (
//               <button
//                 key={color.value}
//                 onClick={() => setGridConfig(prev => ({ ...prev, color: color.value }))}
//                 className={`w-6 h-6 rounded border-2 transition-all duration-200 ${
//                   gridConfig.color === color.value 
//                     ? 'border-gray-700 dark:border-gray-300 scale-110' 
//                     : 'border-gray-300 dark:border-gray-600 hover:scale-105'
//                 }`}
//                 style={{ backgroundColor: color.value }}
//                 title={color.name}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Controls Toggle */}
//         <button
//           onClick={() => setShowGridControls(!showGridControls)}
//           className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-gray-700 dark:text-gray-300"
//         >
//           <Settings className="w-4 h-4" />
//           <span className="text-sm">Controls</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Dark Mode Grid Controls Panel
// const DarkModeGridControlsPanel = ({ 
//   gridConfig, 
//   setGridConfig, 
//   sections, 
//   setSections, 
//   colorPresets,
//   theme
// }) => {
//   const [activeTab, setActiveTab] = useState('grid');

//   return (
//     <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 dark:border-gray-700">
//         {[
//           { id: 'grid', label: 'Grid', icon: Grid },
//           { id: 'sections', label: 'Sections', icon: Layers },
//           { id: 'snap', label: 'Snap', icon: Move }
//         ].map(tab => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-300 ${
//               activeTab === tab.id 
//                 ? 'border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
//                 : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
//             }`}
//           >
//             <tab.icon className="w-4 h-4" />
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900">
//         {activeTab === 'grid' && (
//           <DarkModeGridConfigTab 
//             gridConfig={gridConfig}
//             setGridConfig={setGridConfig}
//             colorPresets={colorPresets}
//             theme={theme}
//           />
//         )}

//         {activeTab === 'sections' && (
//           <DarkModeSectionsTab 
//             sections={sections}
//             setSections={setSections}
//             gridConfig={gridConfig}
//             theme={theme}
//           />
//         )}

//         {activeTab === 'snap' && (
//           <DarkModeSnapConfigTab 
//             gridConfig={gridConfig}
//             setGridConfig={setGridConfig}
//             theme={theme}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Additional dark mode components would be defined here...
// // (GridConfigTab, SectionsTab, SnapConfigTab, etc. with dark mode styling)

// export default DarkModeEnhancedGridSystem;