import React from 'react';
import { 
  Zap, 
  Undo, 
  Redo, 
  MousePointer, 
  Move, 
  Grid, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Minus, 
  Plus, 
  Edit, 
  Eye, 
  Sparkles, 
  Download, 
  Save,
  Code 
} from 'lucide-react';
import { useCanvas } from '../../hooks/useCanvas';
import { DeviceType } from '../../types';

export const Toolbar: React.FC = () => {
  const { state, actions } = useCanvas();

  const devices = [
    { id: 'desktop' as DeviceType, name: 'Desktop', icon: Monitor },
    { id: 'tablet' as DeviceType, name: 'Tablet', icon: Tablet },
    { id: 'mobile' as DeviceType, name: 'Mobile', icon: Smartphone }
  ];

  const exportFormats = [
    { id: 'react', name: 'React', icon: Code },
    { id: 'vue', name: 'Vue', icon: Code },
    { id: 'angular', name: 'Angular', icon: Code },
    { id: 'html', name: 'HTML', icon: Code }
  ];

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Eternal UI Builder
          </span>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* History controls */}
        <div className="flex items-center space-x-1">
          <button
            onClick={actions.undo}
            disabled={state.history.past.length === 0}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={actions.redo}
            disabled={state.history.future.length === 0}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Tools */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => actions.setMode('select')}
            className={`p-2 rounded transition-colors ${
              state.mode === 'select' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            title="Select Tool"
          >
            <MousePointer className="w-4 h-4" />
          </button>
          <button
            onClick={() => actions.setMode('pan')}
            className={`p-2 rounded transition-colors ${
              state.mode === 'pan' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            title="Pan Tool"
          >
            <Move className="w-4 h-4" />
          </button>
          <button
            onClick={actions.toggleGrid}
            className={`p-2 rounded transition-colors ${
              state.grid.enabled 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            title="Toggle Grid"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center section - Device controls */}
      <div className="flex items-center space-x-2">
        {devices.map(device => {
          const Icon = device.icon;
          return (
            <button
              key={device.id}
              onClick={() => actions.setDevice(device.id)}
              className={`p-2 rounded transition-colors ${
                state.device === device.id 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title={device.name}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Zoom controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => actions.setViewport({ zoom: Math.max(0.1, state.viewport.zoom - 0.1) })}
            className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600 min-w-[3rem] text-center font-medium">
            {Math.round(state.viewport.zoom * 100)}%
          </span>
          <button
            onClick={() => actions.setViewport({ zoom: Math.min(3, state.viewport.zoom + 0.1) })}
            className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => actions.setViewport({ zoom: 1 })}
            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Reset Zoom"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Preview mode toggle */}
        <button
          onClick={() => actions.setMode(state.mode === 'preview' ? 'select' : 'preview')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            state.mode === 'preview'
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {state.mode === 'preview' ? (
            <>
              <Edit className="w-4 h-4 mr-1 inline" />
              Edit Mode
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1 inline" />
              Preview
            </>
          )}
        </button>

        {/* AI Assistant */}
        <button
          onClick={() => actions.generateAIComponent('Create a modern hero section')}
          className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm font-medium hover:bg-purple-200 transition-colors"
          title="AI Component Generator"
        >
          <Sparkles className="w-4 h-4 mr-1 inline" />
          AI Assistant
        </button>

        {/* Export dropdown */}
        <div className="relative group">
          <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4 mr-1 inline" />
            Export
          </button>
          
          {/* Dropdown menu */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-1 font-medium">Export as Code</div>
              {exportFormats.map(format => (
                <button
                  key={format.id}
                  onClick={() => actions.exportCode(format.id as never)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center transition-colors"
                >
                  <format.icon className="w-4 h-4 mr-2" />
                  {format.name}
                </button>
              ))}
              
              <div className="border-t border-gray-200 my-1" />
              
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download ZIP
              </button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <button 
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" 
          title="Save Project"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};