'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
    Layout,
    Sidebar,
    PanelLeft,
    PanelRight,
    Play,
    Download,
    Share,
    Save,
    Undo,
    Redo,
    Settings,
    Eye,
    Code,
    Smartphone,
    Monitor,
    Tablet,
    Maximize,
    Minimize,
    Menu,
    X,
    Zap,
    Layers
} from 'lucide-react'

// Import all Phase 1 components
import { CanvasProvider, Canvas, CanvasToolbar, useCanvas } from '../Canvas/CanvasSystem'
import DragDropInterface, {
    ComponentLibrary,
    DropZone,
    QuickActions,
    COMPONENT_LIBRARY
} from '../DragDrop/DragDropInterface'
import PropertyEditor from '../PropertyEditor/PropertyEditor'
import { CodeExportPanel } from '../Export/CodeExportSystem'
import { PREVIEW_DEVICES } from '../Preview/PreviewSystem'
import ResponsivePreview from '../Preview/ResponsivePreview'
import LivePreview from '../Preview/LivePreview';



/**
 * Visual Builder Layout Types
 */

interface BuilderLayout {
    leftPanel: 'components' | 'layers' | 'assets' | 'none'
    rightPanel: 'properties' | 'export' | 'settings' | 'none'
    bottomPanel: 'preview' | 'code' | 'console' | 'none'
    showToolbar: boolean
    showQuickActions: boolean
}

interface BuilderState {
    layout: BuilderLayout
    selectedDevice: string
    previewMode: boolean
    isCollaborating: boolean
    autoSave: boolean
    lastSaved?: string
}

/**
 * Panel Components
 */

const LeftPanel: React.FC<{
    activePanel: BuilderLayout['leftPanel']
    onClose: () => void
}> = ({ activePanel, onClose }) => {
    if (activePanel === 'none') return null

    const panels = {
        components: {
            title: 'Components',
            icon: Layout,
            content: <ComponentLibrary />
        },
        layers: {
            title: 'Layers',
            icon: Layers,
            content: <LayersPanel />
        },
        assets: {
            title: 'Assets',
            icon: Download,
            content: <AssetsPanel />
        }
    }

    const panel = panels[activePanel]

    return (
        <div className="w-80 bg-white border-r flex flex-col h-full">
            <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <panel.icon className="w-4 h-4" />
                    <h2 className="font-medium">{panel.title}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded hover:bg-gray-100"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="flex-1 overflow-hidden">
                {panel.content}
            </div>
        </div>
    )
}

const RightPanel: React.FC<{
    activePanel: BuilderLayout['rightPanel']
    onClose: () => void
}> = ({ activePanel, onClose }) => {
    if (activePanel === 'none') return null

    const panels = {
        properties: {
            title: 'Properties',
            icon: Settings,
            content: <PropertyEditor />
        },
        export: {
            title: 'Export',
            icon: Download,
            content: <CodeExportPanel />
        },
        settings: {
            title: 'Settings',
            icon: Settings,
            content: <SettingsPanel />
        }
    }

    const panel = panels[activePanel]

    return (
        <div className="w-80 bg-white border-l flex flex-col h-full">
            <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <panel.icon className="w-4 h-4" />
                    <h2 className="font-medium">{panel.title}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded hover:bg-gray-100"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="flex-1 overflow-hidden">
                {panel.content}
            </div>
        </div>
    )
}

const BottomPanel: React.FC<{
    activePanel: BuilderLayout['bottomPanel']
    onClose: () => void
}> = ({ activePanel, onClose }) => {
    if (activePanel === 'none') return null

    const panels = {
        preview: {
            title: 'Preview',
            icon: Eye,
            content: <ResponsivePreview />
        },
        code: {
            title: 'Code',
            icon: Code,
            content: <CodePanel />
        },
        console: {
            title: 'Console',
            icon: Monitor,
            content: <ConsolePanel />
        }
    }

    const panel = panels[activePanel]

    return (
        <div className="h-80 bg-white border-t flex flex-col">
            <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <panel.icon className="w-4 h-4" />
                    <h2 className="font-medium">{panel.title}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded hover:bg-gray-100"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="flex-1 overflow-hidden">
                {panel.content}
            </div>
        </div>
    )
}

/**
 * Supporting Panel Components
 */

const LayersPanel: React.FC = () => {
    const { state, selectElement } = useCanvas()

    const renderElement = (element: any, depth = 0) => (
        <div key={element.id} style={{ paddingLeft: `${depth * 16}px` }}>
            <div
                className={`
          p-2 rounded cursor-pointer flex items-center space-x-2 text-sm
          ${state.selectedElements.has(element.id) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}
        `}
                onClick={() => selectElement(element.id)}
            >
                <Eye className="w-3 h-3" />
                <span className="flex-1">{element.name}</span>
                <span className="text-xs text-gray-500">{element.type}</span>
            </div>
            {element.children?.map((child: any) => renderElement(child, depth + 1))}
        </div>
    )

    const rootElements = Array.from(state.elements.values()).filter(el => !el.parent)

    return (
        <div className="p-3 space-y-1">
            {rootElements.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No elements yet</p>
                </div>
            ) : (
                rootElements.map(element => renderElement(element))
            )}
        </div>
    )
}

const AssetsPanel: React.FC = () => {
    const [assets, setAssets] = useState<any[]>([])

    return (
        <div className="p-3">
            <div className="text-center text-gray-500 py-8">
                <Download className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No assets uploaded</p>
                <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Upload Assets
                </button>
            </div>
        </div>
    )
}

const SettingsPanel: React.FC = () => {
    const [settings, setSettings] = useState({
        autoSave: true,
        showGrid: false,
        snapToGrid: true,
        showRulers: false
    })

    return (
        <div className="p-3 space-y-4">
            <div>
                <h3 className="text-sm font-medium mb-2">Editor Settings</h3>
                <div className="space-y-2">
                    {Object.entries(settings).map(([key, value]) => (
                        <label key={key} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => setSettings(prev => ({
                                    ...prev,
                                    [key]: e.target.checked
                                }))}
                                className="mr-2"
                            />
                            <span className="text-sm capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

const CodePanel: React.FC = () => {
    const { exportToCode } = useCanvas()
    const [framework, setFramework] = useState<'react' | 'vue' | 'angular'>('react')
    const [code, setCode] = useState('')

    useEffect(() => {
        const generatedCode = exportToCode(framework)
        setCode(generatedCode)
    }, [framework, exportToCode])

    return (
        <div className="h-full flex flex-col">
            <div className="p-3 border-b flex items-center space-x-2">
                <select
                    value={framework}
                    onChange={(e) => setFramework(e.target.value as any)}
                    className="px-2 py-1 border rounded text-sm"
                >
                    <option value="react">React</option>
                    <option value="vue">Vue</option>
                    <option value="angular">Angular</option>
                </select>
                <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                    Copy Code
                </button>
            </div>
            <div className="flex-1 overflow-auto">
                <pre className="p-3 text-xs bg-gray-900 text-green-400 h-full overflow-auto">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    )
}

const ConsolePanel: React.FC = () => {
    const [logs, setLogs] = useState<Array<{ type: string; message: string; timestamp: Date }>>([])

    return (
        <div className="h-full flex flex-col">
            <div className="p-3 border-b flex items-center justify-between">
                <span className="text-sm font-medium">Console</span>
                <button
                    onClick={() => setLogs([])}
                    className="px-2 py-1 text-xs bg-gray-100 rounded"
                >
                    Clear
                </button>
            </div>
            <div className="flex-1 overflow-auto p-3 bg-gray-900 text-green-400 font-mono text-xs">
                {logs.length === 0 ? (
                    <div className="text-gray-500">Console output will appear here...</div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className="mb-1">
                            <span className="text-gray-500">
                                {log.timestamp.toLocaleTimeString()}
                            </span>
                            {' '}
                            <span className={log.type === 'error' ? 'text-red-400' : 'text-green-400'}>
                                {log.message}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

/**
 * Main Toolbar Component
 */
const MainToolbar: React.FC<{
    builderState: BuilderState
    onLayoutChange: (layout: Partial<BuilderLayout>) => void
    onStateChange: (state: Partial<BuilderState>) => void
}> = ({ builderState, onLayoutChange, onStateChange }) => {
    const { state, undo, redo } = useCanvas()

    const handleSave = useCallback(() => {
        // Implement save functionality
        onStateChange({ lastSaved: new Date().toISOString() })
    }, [onStateChange])

    const handlePreview = useCallback(() => {
        onStateChange({ previewMode: !builderState.previewMode })
    }, [builderState.previewMode, onStateChange])

    const deviceIcons = {
        'desktop-large': Monitor,
        'tablet-ipad': Tablet,
        'mobile-iphone': Smartphone
    }

    return (
        <div className="h-12 bg-white border-b flex items-center justify-between px-4">
            {/* Left Section - Layout Controls */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => onLayoutChange({
                        leftPanel: builderState.layout.leftPanel === 'components' ? 'none' : 'components'
                    })}
                    className={`p-2 rounded ${builderState.layout.leftPanel === 'components' ? 'bg-blue-100' : 'hover:bg-gray-100'
                        }`}
                >
                    <PanelLeft className="w-4 h-4" />
                </button>

                <button
                    onClick={() => onLayoutChange({
                        rightPanel: builderState.layout.rightPanel === 'properties' ? 'none' : 'properties'
                    })}
                    className={`p-2 rounded ${builderState.layout.rightPanel === 'properties' ? 'bg-blue-100' : 'hover:bg-gray-100'
                        }`}
                >
                    <PanelRight className="w-4 h-4" />
                </button>
            </div>

            {/* Center Section - Actions */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={undo}
                    disabled={state.history.past.length === 0}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                    <Undo className="w-4 h-4" />
                </button>

                <button
                    onClick={redo}
                    disabled={state.history.future.length === 0}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                    <Redo className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-gray-300" />

                <button
                    onClick={handlePreview}
                    className={`px-3 py-1 rounded text-sm ${builderState.previewMode
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                        }`}
                >
                    <Play className="w-4 h-4 mr-1 inline" />
                    {builderState.previewMode ? 'Edit' : 'Preview'}
                </button>

                <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                >
                    <Save className="w-4 h-4 mr-1 inline" />
                    Save
                </button>
            </div>

            {/* Right Section - Device Selection & Export */}
            <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-100 rounded p-1">
                    {PREVIEW_DEVICES.slice(0, 3).map(device => {
                        const Icon = deviceIcons[device.id as keyof typeof deviceIcons] || Monitor
                        return (
                            <button
                                key={device.id}
                                onClick={() => onStateChange({ selectedDevice: device.id })}
                                className={`p-1 rounded ${builderState.selectedDevice === device.id
                                    ? 'bg-white shadow-sm'
                                    : 'hover:bg-gray-200'
                                    }`}
                                title={device.name}
                            >
                                <Icon className="w-4 h-4" />
                            </button>
                        )
                    })}
                </div>

                <div className="w-px h-6 bg-gray-300" />

                <button
                    onClick={() => onLayoutChange({
                        rightPanel: builderState.layout.rightPanel === 'export' ? 'none' : 'export'
                    })}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                    <Download className="w-4 h-4 mr-1 inline" />
                    Export
                </button>
            </div>
        </div>
    )
}

/**
 * Canvas Area Component
 */
const CanvasArea: React.FC<{
    builderState: BuilderState
}> = ({ builderState }) => {
    const { state } = useCanvas()

    const renderCanvasElement = useCallback((element: any) => {
        const componentDef = COMPONENT_LIBRARY.find(c => c.type === element.type)
        if (!componentDef) return <div key={element.id}>Unknown component</div>

        const PreviewComponent = componentDef.previewComponent
        return (
            <div key={element.id} className="canvas-element">
                <PreviewComponent {...element.props}>
                    {element.children?.map(renderCanvasElement)}
                </PreviewComponent>
            </div>
        )
    }, [])

    const rootElements = Array.from(state.elements.values()).filter(el => !el.parent)

    if (builderState.previewMode) {
        return (
            <div className="flex-1 bg-gray-100">
                <LivePreview previewMode={true} />
            </div>
        )
    }

    return (
        <div className="flex-1 bg-gray-100 relative">
            {builderState.layout.showQuickActions && <QuickActions />}

            <DropZone
                onDrop={(component, position) => {
                    // Handle component drop
                    console.log('Dropped component:', component, 'at position:', position)
                }}
                className="h-full"
            >
                <Canvas
                    className="h-full"
                    renderElement={renderCanvasElement}
                />
            </DropZone>

            {rootElements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center text-gray-400">
                        <Layout className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">Start Building</h3>
                        <p className="text-sm max-w-sm">
                            Drag components from the left panel or use the quick actions toolbar to add your first element
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

/**
 * Main Visual Builder Component
 */
const VisualBuilder: React.FC<{
    className?: string
    initialElements?: any[]
}> = ({ className, initialElements = [] }) => {
    const [builderState, setBuilderState] = useState<BuilderState>({
        layout: {
            leftPanel: 'components',
            rightPanel: 'properties',
            bottomPanel: 'none',
            showToolbar: true,
            showQuickActions: true
        },
        selectedDevice: 'desktop-large',
        previewMode: false,
        isCollaborating: false,
        autoSave: true
    })

    const handleLayoutChange = useCallback((layout: Partial<BuilderLayout>) => {
        setBuilderState(prev => ({
            ...prev,
            layout: { ...prev.layout, ...layout }
        }))
    }, [])

    const handleStateChange = useCallback((state: Partial<BuilderState>) => {
        setBuilderState(prev => ({ ...prev, ...state }))
    }, [])

    // Auto-save functionality
    useEffect(() => {
        if (!builderState.autoSave) return

        const interval = setInterval(() => {
            // Auto-save logic would go here
            console.log('Auto-saving...')
        }, 30000) // Save every 30 seconds

        return () => clearInterval(interval)
    }, [builderState.autoSave])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault()
                // Save
            } else if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
                e.preventDefault()
                handleStateChange({ previewMode: !builderState.previewMode })
            } else if (e.key === 'Escape') {
                // Exit preview mode
                if (builderState.previewMode) {
                    handleStateChange({ previewMode: false })
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [builderState.previewMode, handleStateChange])

    return (
        <CanvasProvider initialElements={initialElements}>
            <DragDropInterface>
                <div className={`visual-builder h-screen flex flex-col bg-gray-50 ${className || ''}`}>
                    {/* Main Toolbar */}
                    {builderState.layout.showToolbar && (
                        <MainToolbar
                            builderState={builderState}
                            onLayoutChange={handleLayoutChange}
                            onStateChange={handleStateChange}
                        />
                    )}

                    {/* Main Content Area */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left Panel */}
                        <LeftPanel
                            activePanel={builderState.layout.leftPanel}
                            onClose={() => handleLayoutChange({ leftPanel: 'none' })}
                        />

                        Center Canvas Area
                        <div className="flex-1 flex flex-col">
                            <CanvasArea builderState={builderState} />

                            {/* Bottom Panel */}
                            <BottomPanel
                                activePanel={builderState.layout.bottomPanel}
                                onClose={() => handleLayoutChange({ bottomPanel: 'none' })}
                            />
                        </div>

                        {/* Right Panel */}
                        <RightPanel
                            activePanel={builderState.layout.rightPanel}
                            onClose={() => handleLayoutChange({ rightPanel: 'none' })}
                        />
                    </div>
                </div>
            </DragDropInterface>
        </CanvasProvider>
    )
}
export default VisualBuilder;
export type { BuilderLayout, BuilderState }


// /**
//  * Status Bar Component
//  */
// const StatusBar: React.FC<{
//             builderState: BuilderState
//         }> = ({ builderState }) => {
//             const { state } = useCanvas()

//             return (
//                 <div className="h-6 bg-gray-100 border-t flex items-center justify-between px-4 text-xs text-gray-600">
//                     <div className="flex items-center space-x-4">
//                         <span>{Array.from(state.elements.values()).length} elements</span>
//                         <span>Ready</span>
//                         {builderState.lastSaved && (
//                             <span>Saved {new Date(builderState.lastSaved).toLocaleTimeString()}</span>
//                         )}
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <Zap className="w-3 h-3" />
//                         <span>Eternal UI</span>
//                     </div>
//                 </div>
//             )
//         }

//     /**
//      * Main Visual Builder Component
//      */
//     export const VisualBuilder: React.FC<{
//         className?: string
//         initialElements?: any[]
//     }> = ({ className, initialElements = [] }) => {
//         const [builderState, setBuilderState] = useState<BuilderState>({
//             layout: {
//                 leftPanel: 'components',
//                 rightPanel: 'properties',
//                 bottomPanel: 'none',
//                 showToolbar: true,
//                 showQuickActions: true
//             },
//             selectedDevice: 'desktop-large',
//             previewMode: false,
//             isCollaborating: false,
//             autoSave: true
//         })

//         const handleLayoutChange = useCallback((layout: Partial<BuilderLayout>) => {
//             setBuilderState(prev => ({
//                 ...prev,
//                 layout: { ...prev.layout, ...layout }
//             }))
//         }, [])

//         const handleStateChange = useCallback((state: Partial<BuilderState>) => {
//             setBuilderState(prev => ({ ...prev, ...state }))
//         }, [])

//         // Auto-save functionality
//         useEffect(() => {
//             if (!builderState.autoSave) return

//             const interval = setInterval(() => {
//                 // Auto-save logic would go here
//                 console.log('Auto-saving...')
//             }, 30000) // Save every 30 seconds

//             return () => clearInterval(interval)
//         }, [builderState.autoSave])

//         // Keyboard shortcuts
//         useEffect(() => {
//             const handleKeyDown = (e: KeyboardEvent) => {
//                 if ((e.metaKey || e.ctrlKey) && e.key === 's') {
//                     e.preventDefault()
//                     // Save
//                 } else if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
//                     e.preventDefault()
//                     handleStateChange({ previewMode: !builderState.previewMode })
//                 } else if (e.key === 'Escape') {
//                     // Exit preview mode
//                     if (builderState.previewMode) {
//                         handleStateChange({ previewMode: false })
//                     }
//                 }
//             }

//             window.addEventListener('keydown', handleKeyDown)
//             return () => window.removeEventListener('keydown', handleKeyDown)
//         }, [builderState.previewMode, handleStateChange])

//         return (
//             <CanvasProvider initialElements={initialElements}>
//                 <DragDropInterface>
//                     <div className={`visual-builder h-screen flex flex-col bg-gray-50 ${className || ''}`}>
//                         {/* Main Toolbar */}
//                         {builderState.layout.showToolbar && (
//                             <MainToolbar
//                                 builderState={builderState}
//                                 onLayoutChange={handleLayoutChange}
//                                 onStateChange={handleStateChange}
//                             />
//                         )}

//                         {/* Main Content Area */}
//                         <div className="flex-1 flex overflow-hidden">
//                             {/* Left Panel */}
//                             <LeftPanel
//                                 activePanel={builderState.layout.leftPanel}
//                                 onClose={() => handleLayoutChange({ leftPanel: 'none' })}
//                             />

//                             {/* Center Canvas Area */}
//                             <div className="flex-1 flex flex-col">
//                                 <CanvasArea builderState={builderState} />

//                                 {/* Bottom Panel */}
//                                 <BottomPanel
//                                     activePanel={builderState.layout.bottomPanel}
//                                     onClose={() => handleLayoutChange({ bottomPanel: 'none' })}
//                                 />
//                             </div>

//                             {/* Right Panel */}
//                             <RightPanel
//                                 activePanel={builderState.layout.rightPanel}
//                                 onClose={() => handleLayoutChange({ rightPanel: 'none' })}
//                             />
//                         </div>

//                         {/* Status Bar */}
//                         <StatusBar builderState={builderState} />
//                     </div>
//                 </DragDropInterface>
//             </CanvasProvider>
//         )
//     }

//     export default VisualBuilder
//     export type { BuilderLayout, BuilderState }