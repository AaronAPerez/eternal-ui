import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Tablet, Monitor, RotateCcw, Share2, Download, Eye, Code, Zap } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import { useUIStore } from '@/stores/uiStore';
import { ComponentRenderer } from '../Canvas/ComponentRenderer';

export const PreviewMode: React.FC = () => {
  const project = useBuilderStore(state => state.project);
  const device = useBuilderStore(state => state.device);
  const setDevice = useBuilderStore(state => state.setDevice);
  const togglePreviewMode = useBuilderStore(state => state.togglePreviewMode);
  const performanceMetrics = useUIStore(state => state.performanceMetrics);
  
  const [showMultiPreview, setShowMultiPreview] = useState(false);
  const [showPerformanceOverlay, setShowPerformanceOverlay] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);

  const devices = [
    { id: 'mobile', icon: Smartphone, label: 'Mobile', width: 375, height: 667 },
    { id: 'tablet', icon: Tablet, label: 'Tablet', width: 768, height: 1024 },
    { id: 'desktop', icon: Monitor, label: 'Desktop', width: 1200, height: 800 },
    { id: 'wide', icon: Monitor, label: '4K/Wide', width: 1920, height: 1080 }
  ];

  const currentDevice = devices.find(d => d.id === device) || devices[2];

  const generateHTML = () => {
    // Simple HTML generation for preview
    const componentToHTML = (comp: any): string => {
      const styles = Object.entries(comp.styles)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
        .join('; ');

      switch (comp.type) {
        case 'hero':
          return `
            <div style="${styles}; position: absolute; left: ${comp.position.x}px; top: ${comp.position.y}px; width: ${comp.size.width}px; min-height: ${comp.size.height}px;">
              <div style="max-width: 48rem; text-align: center; margin: auto;">
                <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">${comp.props.title}</h1>
                <p style="font-size: 1.125rem; margin-bottom: 1.5rem; opacity: 0.9;">${comp.props.subtitle}</p>
                <button style="background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; border: none; cursor: pointer;">${comp.props.ctaText}</button>
              </div>
            </div>`;
        case 'text':
          return `<div style="${styles}; position: absolute; left: ${comp.position.x}px; top: ${comp.position.y}px; width: ${comp.size.width}px; min-height: ${comp.size.height}px; display: flex; align-items: center; padding: 0.5rem;">${comp.props.content}</div>`;
        case 'button':
          return `<button style="${styles}; position: absolute; left: ${comp.position.x}px; top: ${comp.position.y}px; width: ${comp.size.width}px; height: ${comp.size.height}px; border: none; cursor: pointer;">${comp.props.text}</button>`;
        default:
          return `<div style="${styles}; position: absolute; left: ${comp.position.x}px; top: ${comp.position.y}px; width: ${comp.size.width}px; min-height: ${comp.size.height}px;">${comp.type}</div>`;
      }
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <style>
        body { margin: 0; padding: 0; font-family: Inter, sans-serif; }
        .container { position: relative; width: 100%; min-height: 100vh; }
    </style>
</head>
<body>
    <div class="container">
        ${project.components.map(componentToHTML).join('\n        ')}
    </div>
</body>
</html>`;
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Preview Header */}
      <div className="h-16 bg-gray-900 text-white flex items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePreviewMode}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Editor
          </button>
          <span className="font-medium">{project.name} - Preview</span>

          {/* Performance Indicator */}
          <button
            onClick={() => setShowPerformanceOverlay(!showPerformanceOverlay)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              performanceMetrics.renderTime < 16 ? 'bg-green-600' : 
              performanceMetrics.renderTime < 33 ? 'bg-yellow-600' : 'bg-red-600'
            }`}
            title="Performance Metrics"
          >
            {performanceMetrics.renderTime.toFixed(1)}ms
          </button>
        </div>

        {/* Center Section - Device Controls */}
        <div className="flex items-center gap-3">
          {/* Multi-device preview toggle */}
          <button
            onClick={() => setShowMultiPreview(!showMultiPreview)}
            className={`px-3 py-2 rounded transition-colors ${
              showMultiPreview ? 'bg-blue-600' : 'bg-gray-700'
            } hover:bg-blue-500`}
          >
            Multi-View
          </button>

          {/* Device toggles */}
          {!showMultiPreview && devices.map((d) => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id as any)}
              className={`p-2 rounded transition-colors ${
                device === d.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title={`${d.label} (${d.width}x${d.height})`}
            >
              <d.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCodeView(!showCodeView)}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              showCodeView ? 'bg-purple-600' : 'bg-gray-700'
            } hover:bg-purple-500`}
          >
            <Code className="w-4 h-4 inline mr-2" />
            Code
          </button>

          <button
            onClick={() => {
              const html = generateHTML();
              const blob = new Blob([html], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${project.name}.html`;
              a.click();
            }}
            className="px-3 py-2 bg-green-600 rounded text-sm hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 inline mr-2" />
            Export HTML
          </button>

          <button className="px-3 py-2 bg-blue-600 rounded text-sm hover:bg-blue-700 transition-colors">
            <Share2 className="w-4 h-4 inline mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden">
        {showCodeView ? (
          /* Code View */
          <div className="h-full bg-gray-900 text-green-400 p-4 overflow-auto">
            <pre className="text-sm font-mono">
              <code>{generateHTML()}</code>
            </pre>
          </div>
        ) : showMultiPreview ? (
          /* Multi-Device Preview */
          <div className="h-full bg-gray-100 flex justify-center items-center gap-8 p-8 overflow-auto">
            {/* Mobile Preview */}
            <div className="bg-gray-800 p-4 rounded-2xl">
              <div className="w-6 h-6 bg-gray-600 rounded-full mx-auto mb-2"></div>
              <div
                className="bg-white shadow-lg relative overflow-hidden rounded-lg"
                style={{ width: '375px', height: '600px', transform: 'scale(0.8)' }}
              >
                <div className="relative w-full h-full">
                  {project.components.map((component) => (
                    <div
                      key={component.id}
                      className="absolute"
                      style={{
                        ...component.styles,
                        left: `${component.position.x}px`,
                        top: `${component.position.y}px`,
                        width: `${component.size.width}px`,
                        minHeight: `${component.size.height}px`,
                      }}
                    >
                      <ComponentRenderer components={[component]} onComponentMouseDown={() => {}} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-white text-center mt-2 text-sm">Mobile (375px)</div>
            </div>

            {/* Tablet Preview */}
            <div className="bg-gray-800 p-6 rounded-2xl">
              <div
                className="bg-white shadow-lg relative overflow-hidden rounded-lg"
                style={{ width: '768px', height: '600px', transform: 'scale(0.6)' }}
              >
                <div className="relative w-full h-full">
                  {project.components.map((component) => (
                    <div
                      key={component.id}
                      className="absolute"
                      style={{
                        ...component.styles,
                        left: `${component.position.x}px`,
                        top: `${component.position.y}px`,
                        width: `${component.size.width}px`,
                        minHeight: `${component.size.height}px`,
                      }}
                    >
                      <ComponentRenderer components={[component]} onComponentMouseDown={() => {}} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-white text-center mt-2 text-sm">Tablet (768px)</div>
            </div>

            {/* Desktop Preview */}
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div
                className="bg-white shadow-lg relative overflow-hidden rounded-lg"
                style={{ width: '1200px', height: '600px', transform: 'scale(0.4)' }}
              >
                <div className="relative w-full h-full">
                  {project.components.map((component) => (
                    <div
                      key={component.id}
                      className="absolute"
                      style={{
                        ...component.styles,
                        left: `${component.position.x}px`,
                        top: `${component.position.y}px`,
                        width: `${component.size.width}px`,
                        minHeight: `${component.size.height}px`,
                      }}
                    >
                      <ComponentRenderer components={[component]} onComponentMouseDown={() => {}} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-white text-center mt-2 text-sm">Desktop (1200px)</div>
            </div>
          </div>
        ) : (
          /* Single Device Preview */
          <div className="h-full bg-gray-100 flex justify-center items-center p-8">
            <div
              className="bg-white shadow-lg relative overflow-hidden"
              style={{
                width: `${currentDevice.width}px`,
                height: `${Math.min(currentDevice.height, window.innerHeight - 200)}px`,
                borderRadius: device === 'mobile' ? '20px' : '8px',
                transform: device === 'mobile' ? 'scale(0.9)' : 'scale(1)',
                transformOrigin: 'center'
              }}
            >
              {/* Device Frame */}
              {device === 'mobile' && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-400 rounded-full"></div>
              )}

              {/* Component Rendering */}
              <div className="relative w-full h-full overflow-auto">
                {project.components.map((component) => (
                  <div
                    key={component.id}
                    className="absolute"
                    style={{
                      ...component.styles,
                      left: `${component.position.x}px`,
                      top: `${component.position.y}px`,
                      width: `${component.size.width}px`,
                      minHeight: `${component.size.height}px`,
                    }}
                  >
                    <ComponentRenderer components={[component]} onComponentMouseDown={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Overlay */}
        {showPerformanceOverlay && (
          <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-sm max-w-xs">
            <div className="font-bold mb-2">📊 Performance Metrics</div>
            <div className="space-y-1">
              <div>Components: {project.components.length}</div>
              <div className={`${performanceMetrics.renderTime < 16 ? 'text-green-400' : performanceMetrics.renderTime < 33 ? 'text-yellow-400' : 'text-red-400'}`}>
                Render: {performanceMetrics.renderTime.toFixed(1)}ms
              </div>
              <div>Memory: {performanceMetrics.memoryUsage.toFixed(1)}MB</div>
              <div>DOM Nodes: {performanceMetrics.domNodes}</div>
              <div className={`${performanceMetrics.fps >= 55 ? 'text-green-400' : performanceMetrics.fps >= 25 ? 'text-yellow-400' : 'text-red-400'}`}>
                FPS: {performanceMetrics.fps}
              </div>
            </div>
          </div>
        )}

        {/* SEO Preview Overlay */}
        <div className="fixed bottom-4 left-4 bg-purple-600 text-white p-3 rounded-lg text-sm max-w-xs">
          <div className="font-bold mb-1">🔍 SEO Preview</div>
          <div className="text-blue-200">Title: {project.name}</div>
          <div className="text-green-200">Components: {project.components.length}</div>
          <div className="text-yellow-200">Device: {currentDevice.label}</div>
        </div>
      </div>
    </div>
  );
};
