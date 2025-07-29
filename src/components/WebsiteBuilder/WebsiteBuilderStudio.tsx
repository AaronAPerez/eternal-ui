'use client';

import React from 'react';
import {
  Layers,
  Type,
  Square,
  Image,
  MousePointer,
  Smartphone,
  Tablet,
  Monitor,
  Play,
  Eye,
  Code,
  Download,
  Share2,
  Settings,
  Palette,
  Grid3X3,
  Move,
  RotateCcw,
  Save,
  Users,
  Zap,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Minus,
  Plus,
  CornerDownRight,
  Navigation,
  Mail,
  Phone,
  MapPin,
  Home,
  Grid,
  Ruler,
  Target
} from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';

// Enhanced component types
interface Component {
  id: string;
  type: 'text' | 'image' | 'button' | 'container' | 'hero' | 'card' | 'form' | 'group' | 'auto-layout' | 'navigation' | 'footer' | 'logo';
  props: Record<string, any>;
  styles: React.CSSProperties;
  children?: Component[];
  position: { x: number; y: number };
  size: { width: number; height: number };
  grouped?: boolean;
  groupId?: string;
  locked?: boolean;
  autoLayout?: {
    direction: 'horizontal' | 'vertical';
    spacing: number;
    padding: number;
    align: 'start' | 'center' | 'end';
    justify: 'start' | 'center' | 'end' | 'space-between';
  };
}

interface HistoryState {
  components: Component[];
  selectedComponent: string | null;
  timestamp: number;
  action: string;
}

interface Project {
  id: string;
  name: string;
  components: Component[];
  styles: {
    colors: string[];
    fonts: string[];
    spacing: number[];
  };
  history: HistoryState[];
  historyIndex: number;
  zoom: number;
  showGrid: boolean;
  gridSize: number;
}

const WebsiteBuilderStudio = () => {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showDesignGuide, setShowDesignGuide] = useState(false);
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('landing');
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [showRulers, setShowRulers] = useState(false);
  const [selectedStylePanel, setSelectedStylePanel] = useState<'design' | 'layout' | 'text' | 'effects'>('design');

  const [project, setProject] = useState<Project>({
    id: '1',
    name: 'My Awesome Website',
    components: [
      {
        id: 'hero-1',
        type: 'hero',
        props: {
          title: 'Welcome to the Future of Web Design',
          subtitle: 'Build stunning websites with the power of professional design tools',
          ctaText: 'Get Started Free'
        },
        styles: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center' as const,
          borderRadius: '0px'
        },
        position: { x: 0, y: 0 },
        size: { width: 1200, height: 400 }
      }
    ],
    styles: {
      colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4ecdc4', '#45b7d1'],
      fonts: ['Inter', 'Playfair Display', 'Source Sans Pro', 'Roboto', 'Open Sans'],
      spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
    },
    history: [],
    historyIndex: -1,
    zoom: 100,
    showGrid: true,
    gridSize: 20
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [showSnapGuides, setShowSnapGuides] = useState(false);
  const [snapGuides, setSnapGuides] = useState<{ x: number[]; y: number[] }>({ x: [], y: [] });
  const [clipboard, setClipboard] = useState<Component[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [selectionBox, setSelectionBox] = useState<{
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null>(null);

  // Design Guide data
  const designGuideComponents = [
    {
      id: 'navigation',
      name: 'Navigation',
      icon: Navigation,
      description: 'Essential for user navigation and site structure',
      benefits: ['Improves user experience', 'Reduces bounce rate', 'SEO benefits'],
      position: { x: 0, y: 0 },
      size: { width: 1200, height: 80 },
      color: '#3b82f6'
    },
    {
      id: 'hero',
      name: 'Hero Section',
      icon: Target,
      description: 'First impression that captures visitor attention',
      benefits: ['Communicates value proposition', 'Drives conversions', 'Sets brand tone'],
      position: { x: 0, y: 80 },
      size: { width: 1200, height: 400 },
      color: '#10b981'
    },
    {
      id: 'content',
      name: 'Content Area',
      icon: Type,
      description: 'Main content that provides value to visitors',
      benefits: ['Educates users', 'Builds trust', 'Improves SEO'],
      position: { x: 0, y: 480 },
      size: { width: 1200, height: 300 },
      color: '#f59e0b'
    },
    {
      id: 'contact',
      name: 'Contact Section',
      icon: Mail,
      description: 'Enable visitors to get in touch',
      benefits: ['Generates leads', 'Builds relationships', 'Increases conversions'],
      position: { x: 0, y: 780 },
      size: { width: 1200, height: 200 },
      color: '#8b5cf6'
    },
    {
      id: 'footer',
      name: 'Footer',
      icon: Minus,
      description: 'Secondary navigation and important links',
      benefits: ['SEO benefits', 'Legal compliance', 'Additional navigation'],
      position: { x: 0, y: 980 },
      size: { width: 1200, height: 120 },
      color: '#6b7280'
    }
  ];

  // Tools configuration
  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'container', icon: Square, label: 'Container' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'button', icon: Zap, label: 'Button' }
  ];

  const devices = [
    { id: 'mobile', icon: Smartphone, label: 'Mobile', width: 375 },
    { id: 'tablet', icon: Tablet, label: 'Tablet', width: 768 },
    { id: 'desktop', icon: Monitor, label: 'Desktop', width: 1200 }
  ];

  // Component library
  const componentLibrary = [
    {
      category: 'Layout',
      components: [
        { type: 'hero', label: 'Hero Section', preview: '🎯' },
        { type: 'container', label: 'Container', preview: '📦' },
        { type: 'card', label: 'Card', preview: '🃏' },
        { type: 'navigation', label: 'Navigation', preview: '🧭' }
      ]
    },
    {
      category: 'Content',
      components: [
        { type: 'text', label: 'Text', preview: 'T' },
        { type: 'image', label: 'Image', preview: '🖼️' },
        { type: 'button', label: 'Button', preview: '🔘' },
        { type: 'logo', label: 'Logo', preview: '🏷️' }
      ]
    },
    {
      category: 'Forms',
      components: [
        { type: 'form', label: 'Contact Form', preview: '📝' },
        { type: 'footer', label: 'Footer', preview: '📄' }
      ]
    }
  ];

  // History management
  const saveToHistory = useCallback((action: string, newComponents?: Component[]) => {
    const historyState: HistoryState = {
      components: newComponents || project.components,
      selectedComponent,
      timestamp: Date.now(),
      action
    };

    setProject(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(historyState);

      if (newHistory.length > 50) {
        newHistory.shift();
      }

      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, [project.components, selectedComponent]);

  const updateComponents = useCallback((newComponents: Component[], action: string) => {
    setProject(prev => ({ ...prev, components: newComponents }));
    saveToHistory(action, newComponents);
  }, [saveToHistory]);

  const undo = useCallback(() => {
    if (project.historyIndex > 0) {
      const prevState = project.history[project.historyIndex - 1];
      setProject(prev => ({
        ...prev,
        components: prevState.components,
        historyIndex: prev.historyIndex - 1
      }));
      setSelectedComponent(prevState.selectedComponent);
    }
  }, [project.historyIndex, project.history]);

  const redo = useCallback(() => {
    if (project.historyIndex < project.history.length - 1) {
      const nextState = project.history[project.historyIndex + 1];
      setProject(prev => ({
        ...prev,
        components: nextState.components,
        historyIndex: prev.historyIndex + 1
      }));
      setSelectedComponent(nextState.selectedComponent);
    }
  }, [project.historyIndex, project.history]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 25, 300));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 25, 25));
  }, []);

  const handleFitToCanvas = useCallback(() => {
    setZoom(100);
  }, []);

  // Smart snap guides with alignment validation
  const generateSnapGuides = useCallback((currentComponent: Component) => {
    const guides = { x: [] as number[], y: [] as number[] };

    project.components.forEach(comp => {
      if (comp.id === currentComponent.id) return;

      // Vertical guides (X positions)
      guides.x.push(comp.position.x);
      guides.x.push(comp.position.x + comp.size.width);
      guides.x.push(comp.position.x + comp.size.width / 2);

      // Horizontal guides (Y positions)
      guides.y.push(comp.position.y);
      guides.y.push(comp.position.y + comp.size.height);
      guides.y.push(comp.position.y + comp.size.height / 2);
    });

    return guides;
  }, [project.components]);

  const snapToGuides = useCallback((x: number, y: number, component: Component) => {
    const guides = generateSnapGuides(component);
    const threshold = 8;
    let snappedX = x;
    let snappedY = y;
    const activeGuides = { x: [] as number[], y: [] as number[] };

    // Snap X position
    for (const guideX of guides.x) {
      if (Math.abs(x - guideX) < threshold) {
        snappedX = guideX;
        activeGuides.x.push(guideX);
        break;
      }
    }

    // Snap Y position
    for (const guideY of guides.y) {
      if (Math.abs(y - guideY) < threshold) {
        snappedY = guideY;
        activeGuides.y.push(guideY);
        break;
      }
    }

    setSnapGuides(activeGuides);
    setShowSnapGuides(activeGuides.x.length > 0 || activeGuides.y.length > 0);

    return { x: snappedX, y: snappedY };
  }, [generateSnapGuides]);

  // Drag and Drop handlers
  const handleMouseDown = useCallback((e: React.MouseEvent, componentId: string) => {
    if (selectedTool !== 'select') return;

    e.preventDefault();
    e.stopPropagation();

    const component = project.components.find(c => c.id === componentId);
    if (!component || component.locked) return;

    setIsDragging(true);
    setDraggedComponent(componentId);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const zoomFactor = zoom / 100;
      setDragOffset({
        x: (e.clientX - rect.left) / zoomFactor - component.position.x,
        y: (e.clientY - rect.top) / zoomFactor - component.position.y
      });
    }
  }, [selectedTool, project.components, zoom]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !draggedComponent || !canvasRef.current) return;

    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const zoomFactor = zoom / 100;
    const deviceWidth = devices.find(d => d.id === device)?.width || 1200;

    let newX = (e.clientX - rect.left) / zoomFactor - dragOffset.x;
    let newY = (e.clientY - rect.top) / zoomFactor - dragOffset.y;

    const component = project.components.find(c => c.id === draggedComponent);
    if (!component) return;

    // Smart snapping
    const snapped = snapToGuides(newX, newY, component);
    newX = snapped.x;
    newY = snapped.y;

    // Grid snapping
    if (showGrid) {
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }

    // Constrain to canvas bounds
    newX = Math.max(0, Math.min(newX, deviceWidth - component.size.width));
    newY = Math.max(0, newY);

    setProject(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === draggedComponent
          ? { ...comp, position: { x: newX, y: newY } }
          : comp
      )
    }));
  }, [isDragging, draggedComponent, dragOffset, device, snapToGuides, showGrid, gridSize, zoom]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      saveToHistory('Move Component');
    }
    setIsDragging(false);
    setDraggedComponent(null);
    setIsResizing(false);
    setResizeHandle(null);
    setShowSnapGuides(false);
    setSnapGuides({ x: [], y: [] });
  }, [isDragging, saveToHistory]);

  // Resize handlers
  const handleResizeStart = useCallback((e: React.MouseEvent, componentId: string, handle: string) => {
    e.preventDefault();
    e.stopPropagation();

    const component = project.components.find(c => c.id === componentId);
    if (!component || component.locked) return;

    setIsResizing(true);
    setDraggedComponent(componentId);
    setResizeHandle(handle);
    setSelectedComponent(componentId);
  }, [project.components]);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !draggedComponent || !resizeHandle || !canvasRef.current) return;

    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const zoomFactor = zoom / 100;
    const component = project.components.find(c => c.id === draggedComponent);
    if (!component) return;

    const mouseX = (e.clientX - rect.left) / zoomFactor;
    const mouseY = (e.clientY - rect.top) / zoomFactor;

    let newWidth = component.size.width;
    let newHeight = component.size.height;
    let newX = component.position.x;
    let newY = component.position.y;

    switch (resizeHandle) {
      case 'se':
        newWidth = Math.max(50, mouseX - component.position.x);
        newHeight = Math.max(30, mouseY - component.position.y);
        break;
      case 'sw':
        newWidth = Math.max(50, component.position.x + component.size.width - mouseX);
        newHeight = Math.max(30, mouseY - component.position.y);
        newX = mouseX;
        break;
      case 'ne':
        newWidth = Math.max(50, mouseX - component.position.x);
        newHeight = Math.max(30, component.position.y + component.size.height - mouseY);
        newY = mouseY;
        break;
      case 'nw':
        newWidth = Math.max(50, component.position.x + component.size.width - mouseX);
        newHeight = Math.max(30, component.position.y + component.size.height - mouseY);
        newX = mouseX;
        newY = mouseY;
        break;
      case 'e':
        newWidth = Math.max(50, mouseX - component.position.x);
        break;
      case 'w':
        newWidth = Math.max(50, component.position.x + component.size.width - mouseX);
        newX = mouseX;
        break;
      case 's':
        newHeight = Math.max(30, mouseY - component.position.y);
        break;
      case 'n':
        newHeight = Math.max(30, component.position.y + component.size.height - mouseY);
        newY = mouseY;
        break;
    }

    // Grid snapping for resize
    if (showGrid) {
      newWidth = Math.round(newWidth / gridSize) * gridSize;
      newHeight = Math.round(newHeight / gridSize) * gridSize;
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }

    setProject(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === draggedComponent
          ? {
            ...comp,
            position: { x: newX, y: newY },
            size: { width: newWidth, height: newHeight }
          }
          : comp
      )
    }));
  }, [isResizing, draggedComponent, resizeHandle, project.components, showGrid, gridSize, zoom]);

  // Image upload handler
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;

        const newImage: Component = {
          id: `image-${Date.now()}`,
          type: 'image',
          props: { src: imageUrl, alt: 'Uploaded image' },
          styles: {
            width: '100%',
            height: 'auto',
            borderRadius: '0px'
          },
          position: { x: 100, y: 100 },
          size: { width: 300, height: 200 }
        };

        setProject(prev => ({
          ...prev,
          components: [...prev.components, newImage]
        }));

        saveToHistory('Add Image');
      };
      reader.readAsDataURL(file);
    }
  }, [saveToHistory]);

  // Style update handler
  const updateComponentStyle = useCallback((componentId: string, styleKey: string, value: any) => {
    const updatedComponents = project.components.map(comp =>
      comp.id === componentId
        ? { ...comp, styles: { ...comp.styles, [styleKey]: value } }
        : comp
    );
    setProject(prev => ({ ...prev, components: updatedComponents }));
  }, [project.components]);

  // Global mouse event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', isDragging ? handleMouseMove : handleResizeMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isDragging ? 'grabbing' : 'nw-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, isResizing, handleMouseMove, handleResizeMove, handleMouseUp]);

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // Zoom shortcuts
      if (ctrlOrCmd && e.key === '=') {
        e.preventDefault();
        handleZoomIn();
        return;
      }

      if (ctrlOrCmd && e.key === '-') {
        e.preventDefault();
        handleZoomOut();
        return;
      }

      if (ctrlOrCmd && e.key === '0') {
        e.preventDefault();
        handleFitToCanvas();
        return;
      }

      // Undo/Redo
      if (ctrlOrCmd && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      if (ctrlOrCmd && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
        return;
      }

      // Delete selected components
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedComponent) {
        e.preventDefault();
        const updatedComponents = project.components.filter(c => c.id !== selectedComponent);
        updateComponents(updatedComponents, 'Delete Component');
        setSelectedComponent(null);
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handleFitToCanvas, undo, redo, selectedComponent, project.components, updateComponents]);

  // Component functions
  function getDefaultProps(type: string) {
    switch (type) {
      case 'text':
        return { content: 'Your text here' };
      case 'button':
        return { text: 'Click me' };
      case 'image':
        return { src: '', alt: 'Image description' };
      case 'hero':
        return {
          title: 'Hero Title',
          subtitle: 'Hero subtitle',
          ctaText: 'Get Started'
        };
      case 'navigation':
        return {
          logo: 'Brand',
          links: ['Home', 'About', 'Services', 'Contact']
        };
      case 'footer':
        return {
          copyright: '© 2024 Your Company',
          links: ['Privacy', 'Terms', 'Contact']
        };
      case 'logo':
        return { text: 'LOGO' };
      default:
        return {};
    }
  }

  function getDefaultStyles(type: string) {
    switch (type) {
      case 'text':
        return {
          fontSize: '16px',
          fontFamily: 'Inter',
          color: '#333',
          padding: '16px',
          borderRadius: '0px',
          fontWeight: '400',
          textAlign: 'left' as const
        };
      case 'button':
        return {
          background: '#667eea',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600'
        };
      case 'container':
        return {
          background: '#f8f9fa',
          padding: '24px',
          borderRadius: '12px',
          border: '2px dashed #e9ecef'
        };
      case 'navigation':
        return {
          background: '#ffffff',
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        };
      case 'footer':
        return {
          background: '#1f2937',
          color: 'white',
          padding: '40px 24px',
          textAlign: 'center' as const
        };
      case 'logo':
        return {
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937'
        };
      default:
        return {};
    }
  }

  const addComponentAtPosition = useCallback((type: string, clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const zoomFactor = zoom / 100;
    const x = (clientX - rect.left) / zoomFactor;
    const y = (clientY - rect.top) / zoomFactor;

    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      props: getDefaultProps(type),
      styles: getDefaultStyles(type),
      position: { x: Math.max(0, x - 50), y: Math.max(0, y - 25) },
      size: {
        width: type === 'navigation' ? 1200 : type === 'footer' ? 1200 : 300,
        height: type === 'button' ? 50 : type === 'navigation' ? 80 : type === 'footer' ? 120 : 100
      }
    };

    setProject(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));

    setSelectedComponent(newComponent.id);
    saveToHistory('Add Component');
  }, [zoom, saveToHistory]);

  // Resize handles component
  const ResizeHandles = ({ componentId, position, size }: {
    componentId: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }) => {
    if (selectedComponent !== componentId) return null;

    const handles = [
      { id: 'nw', style: { left: -4, top: -4, cursor: 'nw-resize' } },
      { id: 'n', style: { left: size.width / 2 - 4, top: -4, cursor: 'n-resize' } },
      { id: 'ne', style: { right: -4, top: -4, cursor: 'ne-resize' } },
      { id: 'e', style: { right: -4, top: size.height / 2 - 4, cursor: 'e-resize' } },
      { id: 'se', style: { right: -4, bottom: -4, cursor: 'se-resize' } },
      { id: 's', style: { left: size.width / 2 - 4, bottom: -4, cursor: 's-resize' } },
      { id: 'sw', style: { left: -4, bottom: -4, cursor: 'sw-resize' } },
      { id: 'w', style: { left: -4, top: size.height / 2 - 4, cursor: 'w-resize' } }
    ];

    return (
      <>
        {handles.map(handle => (
          <div
            key={handle.id}
            className="absolute w-2 h-2 bg-blue-500 border border-white rounded-sm z-30"
            style={{
              ...handle.style,
              cursor: handle.style.cursor
            }}
            onMouseDown={(e) => handleResizeStart(e, componentId, handle.id)}
          />
        ))}
      </>
    );
  };

  // Enhanced render component
  const renderComponent = (component: Component) => {
    const isSelected = selectedComponent === component.id;
    const isMultiSelected = selectedComponents.includes(component.id);
    const zoomFactor = zoom / 100;

    const componentStyle = {
      ...component.styles,
      left: `${component.position.x}px`,
      top: `${component.position.y}px`,
      width: `${component.size.width}px`,
      minHeight: `${component.size.height}px`,
      cursor: selectedTool === 'select' ? (isDragging && draggedComponent === component.id ? 'grabbing' : 'grab') : 'default',
      transition: isDragging && draggedComponent === component.id ? 'none' : 'all 0.1s ease'
    };

    const wrapperClass = `absolute transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 z-20' :
      isMultiSelected ? 'ring-2 ring-purple-400 ring-offset-2 z-20' : 'z-10'
      } ${selectedTool === 'select' ? 'hover:ring-2 hover:ring-blue-300' : ''}
    ${component.locked ? 'opacity-75' : ''}`;

    let content;
    switch (component.type) {
      case 'hero':
        content = (
          <div
            className="w-full h-full flex items-center justify-center relative"
            style={{
              background: component.styles.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: component.styles.color || 'white',
              padding: component.styles.padding || '40px 20px',
              textAlign: component.styles.textAlign || 'center',
              borderRadius: component.styles.borderRadius || '0px'
            }}
          >
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {component.props.title}
              </h1>
              <p className="text-lg mb-6 opacity-90">
                {component.props.subtitle}
              </p>
              <button
                className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                style={{ borderRadius: component.styles.borderRadius || '8px' }}
              >
                {component.props.ctaText}
              </button>
            </div>
          </div>
        );
        break;

      case 'text':
        content = (
          <div
            className="w-full h-full flex items-center p-2"
            style={{
              fontSize: component.styles.fontSize || '16px',
              fontFamily: component.styles.fontFamily || 'Inter',
              color: component.styles.color || '#333',
              fontWeight: component.styles.fontWeight || '400',
              textAlign: component.styles.textAlign || 'left',
              borderRadius: component.styles.borderRadius || '0px'
            }}
          >
            {component.props.content}
          </div>
        );
        break;

      case 'button':
        content = (
          <button
            className="w-full h-full transition-colors"
            style={{
              background: component.styles.background || '#667eea',
              color: component.styles.color || 'white',
              padding: component.styles.padding || '12px 24px',
              borderRadius: component.styles.borderRadius || '8px',
              border: component.styles.border || 'none',
              fontSize: component.styles.fontSize || '16px',
              fontWeight: component.styles.fontWeight || '600',
              cursor: 'pointer'
            }}
          >
            {component.props.text}
          </button>
        );
        break;

      case 'navigation':
        content = (
          <div className="w-full h-full flex items-center justify-between px-6">
            <div
              className="font-bold text-xl"
              style={{ color: component.styles.color || '#1f2937' }}
            >
              {component.props.logo}
            </div>
            <div className="flex gap-6">
              {component.props.links?.map((link: string, index: number) => (
                <span
                  key={index}
                  className="hover:text-blue-600 cursor-pointer"
                  style={{ color: component.styles.color || '#1f2937' }}
                >
                  {link}
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'footer':
        content = (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex gap-6 mb-4">
              {component.props.links?.map((link: string, index: number) => (
                <span
                  key={index}
                  className="hover:text-gray-300 cursor-pointer"
                  style={{ color: component.styles.color || 'white' }}
                >
                  {link}
                </span>
              ))}
            </div>
            <div style={{ color: component.styles.color || 'white' }}>
              {component.props.copyright}
            </div>
          </div>
        );
        break;

      case 'logo':
        content = (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              fontSize: component.styles.fontSize || '24px',
              fontWeight: component.styles.fontWeight || 'bold',
              color: component.styles.color || '#1f2937'
            }}
          >
            {component.props.text}
          </div>
        );
        break;

      case 'image':
        content = (
          <div className="w-full h-full overflow-hidden" style={{ borderRadius: component.styles.borderRadius || '0px' }}>
            {component.props.src ? (
              <img
                src={component.props.src}
                alt={component.props.alt || 'Image'}
                className="w-full h-full object-cover"
                style={{ borderRadius: component.styles.borderRadius || '0px' }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <Image className="w-8 h-8" />
              </div>
            )}
          </div>
        );
        break;

      case 'container':
        content = (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Drop components here
          </div>
        );
        break;

      default:
        content = (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {component.type}
          </div>
        );
    }

    return (
      <div key={component.id}>
        <div
          className={wrapperClass}
          style={componentStyle}
          onMouseDown={(e) => !component.locked && handleMouseDown(e, component.id)}
          onClick={(e) => {
            e.stopPropagation();

            if (e.ctrlKey || e.metaKey) {
              if (selectedComponents.includes(component.id)) {
                setSelectedComponents(prev => prev.filter(id => id !== component.id));
              } else {
                setSelectedComponents(prev => [...prev, component.id]);
                setSelectedComponent(null);
              }
            } else {
              setSelectedComponent(component.id);
              setSelectedComponents([]);
            }
          }}
        >
          {content}
          {/* Component lock indicator */}
          {component.locked && (
            <div className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded text-xs">
              🔒
            </div>
          )}
        </div>
        <ResizeHandles
          componentId={component.id}
          position={component.position}
          size={component.size}
        />
      </div>
    );
  };

  // Enhanced drag and drop with ghost element
  const handleComponentDragStart = useCallback((e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    e.dataTransfer.effectAllowed = 'copy';

    // Create ghost element
    const ghostElement = e.currentTarget.cloneNode(true) as HTMLElement;
    ghostElement.style.opacity = '0.5';
    ghostElement.style.transform = 'rotate(5deg)';
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 50, 25);

    setTimeout(() => document.body.removeChild(ghostElement), 0);
  }, []);

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      addComponentAtPosition(componentType, e.clientX, e.clientY);
    }
  }, [addComponentAtPosition]);

  const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  // Multi-device preview system
  const [previewDevices, setPreviewDevices] = useState<string[]>(['desktop']);
  const [showMultiPreview, setShowMultiPreview] = useState(false);

  // Performance monitoring
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0,
    loadTime: 0
  });

  // SEO and Accessibility audit
  const [auditResults, setAuditResults] = useState({
    seo: { score: 85, issues: [] },
    accessibility: { score: 92, issues: [] },
    performance: { score: 78, issues: [] }
  });

  // Real-time preview with performance monitoring
  useEffect(() => {
    const startTime = performance.now();

    setPerformanceMetrics(prev => ({
      ...prev,
      componentCount: project.components.length,
      renderTime: performance.now() - startTime
    }));
  }, [project.components]);

  const getCanvasWidth = () => {
    return devices.find(d => d.id === device)?.width || 1200;
  };


  if (isPreviewMode) {
    return (
      <div className="h-screen bg-white">
        {/* Enhanced Preview Header */}
        <div className="h-16 bg-gray-900 text-white flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreviewMode(false)}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Editor
            </button>
            <span className="font-medium">{project.name} - Preview</span>

            {/* Performance overlay toggle */}
            <button
              className="px-3 py-1 bg-green-600 rounded text-sm"
              title="Performance Metrics"
            >
              {performanceMetrics.renderTime.toFixed(1)}ms
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-device preview toggle */}
            <button
              onClick={() => setShowMultiPreview(!showMultiPreview)}
              className={`px-3 py-2 rounded ${showMultiPreview ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500`}
            >
              Multi-View
            </button>

            {/* Device toggles */}
            {devices.map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id as any)}
                className={`p-2 rounded ${device === d.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
              >
                <d.icon className="w-4 h-4" />
              </button>
            ))}

            {/* Audit overlay toggle */}
            <button className="px-3 py-2 bg-purple-600 rounded text-sm">
              SEO: {auditResults.seo.score}
            </button>
          </div>
        </div>

        {/* Preview Canvas */}
        {showMultiPreview ? (
          <div className="h-full bg-gray-100 flex justify-center items-center gap-8 p-8">
            {/* Mobile Preview */}
            <div className="bg-gray-800 p-4 rounded-2xl">
              <div className="w-6 h-6 bg-gray-600 rounded-full mx-auto mb-2"></div>
              <div
                className="bg-white shadow-lg relative overflow-hidden rounded-lg"
                style={{ width: '375px', height: '600px', transform: 'scale(0.8)' }}
              >
                {project.components.map(renderComponent)}
              </div>
              <div className="text-white text-center mt-2 text-sm">Mobile</div>
            </div>

            {/* Tablet Preview */}
            <div className="bg-gray-800 p-6 rounded-2xl">
              <div
                className="bg-white shadow-lg relative overflow-hidden rounded-lg"
                style={{ width: '768px', height: '600px', transform: 'scale(0.6)' }}
              >
                {project.components.map(renderComponent)}
              </div>
              <div className="text-white text-center mt-2 text-sm">Tablet</div>
            </div>

            {/* Desktop Preview */}
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div
                className="bg-white shadow-lg relative overflow-hidden rounded-lg"
                style={{ width: '1200px', height: '600px', transform: 'scale(0.4)' }}
              >
                {project.components.map(renderComponent)}
              </div>
              <div className="text-white text-center mt-2 text-sm">Desktop</div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-gray-100 flex justify-center overflow-auto">
            <div
              className="bg-white shadow-lg relative"
              style={{
                width: `${getCanvasWidth()}px`,
                transform: device === 'mobile' ? 'scale(0.9)' : 'scale(1)',
                transformOrigin: 'top center'
              }}
            >
              {project.components.map(renderComponent)}

              {/* Performance Metrics Overlay */}
              <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs">
                <div>Components: {performanceMetrics.componentCount}</div>
                <div>Render Time: {performanceMetrics.renderTime.toFixed(1)}ms</div>
                <div>Performance: {auditResults.performance.score}/100</div>
              </div>

              {/* SEO Preview Overlay */}
              <div className="fixed bottom-4 left-4 bg-purple-600 text-white p-3 rounded-lg text-xs max-w-xs">
                <div className="font-bold mb-1">SEO Preview</div>
                <div className="text-blue-200">Title: {project.name}</div>
                <div className="text-green-200">Score: {auditResults.seo.score}/100</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Enhanced Top Toolbar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-900">Studio Pro</span>
          </div>
          <div className="h-6 w-px bg-gray-300" />
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
            className="font-medium text-gray-900 bg-transparent border-none outline-none"
          />

          {/* Performance indicator */}
          <div className="text-xs text-gray-500">
            {project.components.length} components
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Enhanced Tools */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-2 rounded transition-all ${selectedTool === tool.id
                  ? 'bg-white shadow-sm text-blue-600 scale-105'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
                title={tool.label}
              >
                <tool.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-300" />

          {/* Enhanced History Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={undo}
              disabled={project.historyIndex <= 0}
              className={`p-2 rounded transition-all ${project.historyIndex <= 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105'
                }`}
              title={`Undo (${project.historyIndex} actions)`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={project.historyIndex >= project.history.length - 1}
              className={`p-2 rounded transition-all ${project.historyIndex >= project.history.length - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105'
                }`}
              title="Redo"
            >
              <RotateCcw className="w-4 h-4 scale-x-[-1]" />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300" />

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              title="Zoom Out (Ctrl+-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-sm font-medium text-gray-700 min-w-[60px] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              title="Zoom In (Ctrl+=)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleFitToCanvas}
              className="p-2 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              title="Fit to Canvas (Ctrl+0)"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300" />

          {/* Grid Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded transition-all ${showGrid ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              title="Toggle Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowRulers(!showRulers)}
              className={`p-2 rounded transition-all ${showRulers ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              title="Toggle Rulers"
            >
              <Ruler className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300" />

          {/* Device Toggle with real device frames */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {devices.map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id as any)}
                className={`p-2 rounded transition-all ${device === d.id
                  ? 'bg-white shadow-sm text-blue-600 scale-105'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
                title={`${d.label} (${d.width}px)`}
              >
                <d.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-300" />

          {/* Design Guide Toggle */}
          <button
            onClick={() => setShowDesignGuide(!showDesignGuide)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${showDesignGuide
              ? 'bg-purple-100 text-purple-800'
              : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            <Info className="w-4 h-4" />
            Guide
          </button>

          {/* Actions */}
          <button
            onClick={() => setShowTemplateLibrary(true)}
            className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Palette className="w-4 h-4" />
            Templates
          </button>

          <button
            onClick={() => setIsPreviewMode(true)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Play className="w-4 h-4" />
            Preview
          </button>

          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Component Library */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Components</h3>

            {componentLibrary.map((category) => (
              <div key={category.category} className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">{category.category}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {category.components.map((comp) => (
                    <div
                      key={comp.type}
                      draggable
                      onDragStart={(e) => handleComponentDragStart(e, comp.type)}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
                      title={comp.label}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{comp.preview}</div>
                        <div className="text-xs text-gray-600">{comp.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Rulers */}
          {showRulers && (
            <>
              {/* Horizontal Ruler */}
              <div className="h-6 bg-gray-100 border-b border-gray-200 relative" style={{ marginLeft: '24px' }}>
                <svg className="w-full h-full">
                  {Array.from({ length: Math.ceil(getCanvasWidth() / 50) }, (_, i) => (
                    <g key={i}>
                      <line
                        x1={i * 50 * (zoom / 100)}
                        y1="0"
                        x2={i * 50 * (zoom / 100)}
                        y2="24"
                        stroke="#9ca3af"
                        strokeWidth="1"
                      />
                      <text
                        x={i * 50 * (zoom / 100) + 2}
                        y="16"
                        fontSize="10"
                        fill="#6b7280"
                      >
                        {i * 50}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Vertical Ruler */}
              <div className="absolute left-0 top-16 w-6 bg-gray-100 border-r border-gray-200" style={{ height: 'calc(100vh - 64px)' }}>
                <svg className="w-full h-full">
                  {Array.from({ length: 40 }, (_, i) => (
                    <g key={i}>
                      <line
                        x1="0"
                        y1={i * 50 * (zoom / 100)}
                        x2="24"
                        y2={i * 50 * (zoom / 100)}
                        stroke="#9ca3af"
                        strokeWidth="1"
                      />
                      <text
                        x="2"
                        y={i * 50 * (zoom / 100) + 12}
                        fontSize="10"
                        fill="#6b7280"
                        transform={`rotate(-90 2 ${i * 50 * (zoom / 100) + 12})`}
                      >
                        {i * 50}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </>
          )}

          {/* Canvas Container */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="min-h-full flex justify-center p-8" style={{ paddingTop: showRulers ? '56px' : '32px', paddingLeft: showRulers ? '56px' : '32px' }}>
              <div
                ref={canvasRef}
                className="bg-white shadow-lg relative overflow-hidden"
                style={{
                  width: `${getCanvasWidth()}px`,
                  minHeight: '800px',
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top left'
                }}
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
                onClick={(e) => {
                  if (e.target === canvasRef.current) {
                    setSelectedComponent(null);
                    setSelectedComponents([]);
                  }
                }}
              >
                {/* Enhanced Grid System */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <svg width="100%" height="100%" className="opacity-20">
                      <defs>
                        <pattern
                          id="grid"
                          width={gridSize}
                          height={gridSize}
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                )}

                {/* Design Guide Overlay */}
                {showDesignGuide && (
                  <div className="absolute inset-0 pointer-events-none z-40">
                    {designGuideComponents.map((guide) => (
                      <div
                        key={guide.id}
                        className="absolute border-2 border-dashed"
                        style={{
                          left: `${guide.position.x}px`,
                          top: `${guide.position.y}px`,
                          width: `${guide.size.width}px`,
                          height: `${guide.size.height}px`,
                          borderColor: guide.color,
                          backgroundColor: `${guide.color}10`
                        }}
                      >
                        <div
                          className="absolute -top-8 left-0 text-xs font-medium px-2 py-1 rounded text-white flex items-center gap-1"
                          style={{ backgroundColor: guide.color }}
                        >
                          <guide.icon className="w-3 h-3" />
                          {guide.name}
                        </div>
                        <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white p-2 rounded shadow-sm max-w-xs">
                          <div className="font-medium mb-1">{guide.description}</div>
                          <ul className="text-xs text-gray-500">
                            {guide.benefits.map((benefit, index) => (
                              <li key={index}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Smart Snap Guides with Alignment Validation */}
                {showSnapGuides && (
                  <>
                    {snapGuides.x.map((x, index) => (
                      <div
                        key={`guide-x-${index}`}
                        className="absolute pointer-events-none z-50"
                        style={{
                          left: `${x}px`,
                          top: 0,
                          width: '1px',
                          height: '100%',
                          background: 'linear-gradient(to bottom, #10b981, #3b82f6)',
                          boxShadow: '0 0 4px rgba(16, 185, 129, 0.5)'
                        }}
                      />
                    ))}
                    {snapGuides.y.map((y, index) => (
                      <div
                        key={`guide-y-${index}`}
                        className="absolute pointer-events-none z-50"
                        style={{
                          left: 0,
                          top: `${y}px`,
                          width: '100%',
                          height: '1px',
                          background: 'linear-gradient(to right, #10b981, #3b82f6)',
                          boxShadow: '0 0 4px rgba(16, 185, 129, 0.5)'
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Selection Box for Multi-Select */}
                {selectionBox && (
                  <div
                    className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-20 pointer-events-none z-40"
                    style={{
                      left: `${Math.min(selectionBox.start.x, selectionBox.end.x)}px`,
                      top: `${Math.min(selectionBox.start.y, selectionBox.end.y)}px`,
                      width: `${Math.abs(selectionBox.end.x - selectionBox.start.x)}px`,
                      height: `${Math.abs(selectionBox.end.y - selectionBox.start.y)}px`
                    }}
                  />
                )}

                {/* Render all components with enhanced interactions */}
                {project.components.map(renderComponent)}

                {/* Canvas overlay for new component placement */}
                {selectedTool !== 'select' && (
                  <div
                    className="absolute inset-0 cursor-crosshair"
                    onClick={(e) => {
                      addComponentAtPosition(selectedTool, e.clientX, e.clientY);
                      setSelectedTool('select');
                    }}
                  />
                )}

                {/* Performance and alignment indicators */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white p-2 rounded shadow">
                  <div>Zoom: {zoom}%</div>
                  <div>Grid: {showGrid ? 'On' : 'Off'}</div>
                  <div>Components: {project.components.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Right Sidebar - Advanced Properties Panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Style Panel Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'design', label: 'Design', icon: Palette },
                { id: 'layout', label: 'Layout', icon: Grid3X3 },
                { id: 'text', label: 'Text', icon: Type },
                { id: 'effects', label: 'Effects', icon: Sparkles }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStylePanel(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-1 py-3 text-sm ${selectedStylePanel === tab.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>

            {selectedComponent ? (
              <div className="space-y-6">
                {/* Component Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Component Type
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded text-sm flex items-center justify-between">
                    <span>{project.components.find(c => c.id === selectedComponent)?.type}</span>
                    <button
                      onClick={() => {
                        const component = project.components.find(c => c.id === selectedComponent);
                        if (component) {
                          const updatedComponents = project.components.map(comp =>
                            comp.id === selectedComponent
                              ? { ...comp, locked: !comp.locked }
                              : comp
                          );
                          setProject(prev => ({ ...prev, components: updatedComponents }));
                        }
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {project.components.find(c => c.id === selectedComponent)?.locked ? '🔒 Locked' : '🔓 Unlocked'}
                    </button>
                  </div>
                </div>

                {/* Design Panel */}
                {selectedStylePanel === 'design' && (
                  <>
                    {/* Background Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background
                      </label>
                      <div className="space-y-2">
                        <input
                          type="color"
                          value={(() => {
                            const bg = project.components.find(c => c.id === selectedComponent)?.styles.background;
                            if (typeof bg === 'string' && bg.startsWith('#')) {
                              return bg;
                            }
                            return '#ffffff';
                          })()}
                          onChange={(e) => updateComponentStyle(selectedComponent, 'background', e.target.value)}
                          className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                        />

                        {/* Gradient presets */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                          ].map((gradient, index) => (
                            <button
                              key={index}
                              onClick={() => updateComponentStyle(selectedComponent, 'background', gradient)}
                              className="w-full h-8 rounded border border-gray-300"
                              style={{ background: gradient }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Border Radius */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Corner Radius: {project.components.find(c => c.id === selectedComponent)?.styles.borderRadius || '0px'}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={parseInt(project.components.find(c => c.id === selectedComponent)?.styles.borderRadius as string || '0')}
                        onChange={(e) => updateComponentStyle(selectedComponent, 'borderRadius', `${e.target.value}px`)}
                        className="w-full"
                      />
                    </div>

                    {/* Shadow */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shadow
                      </label>
                      <select
                        value={project.components.find(c => c.id === selectedComponent)?.styles.boxShadow || 'none'}
                        onChange={(e) => updateComponentStyle(selectedComponent, 'boxShadow', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="none">None</option>
                        <option value="0 1px 3px rgba(0,0,0,0.1)">Small</option>
                        <option value="0 4px 6px rgba(0,0,0,0.1)">Medium</option>
                        <option value="0 10px 15px rgba(0,0,0,0.1)">Large</option>
                        <option value="0 20px 25px rgba(0,0,0,0.1)">X-Large</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Layout Panel */}
                {selectedStylePanel === 'layout' && (
                  <>
                    {/* Position */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-500">X</label>
                          <input
                            type="number"
                            value={project.components.find(c => c.id === selectedComponent)?.position.x || 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              const updatedComponents = project.components.map(comp =>
                                comp.id === selectedComponent
                                  ? { ...comp, position: { ...comp.position, x: value } }
                                  : comp
                              );
                              setProject(prev => ({ ...prev, components: updatedComponents }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Y</label>
                          <input
                            type="number"
                            value={project.components.find(c => c.id === selectedComponent)?.position.y || 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              const updatedComponents = project.components.map(comp =>
                                comp.id === selectedComponent
                                  ? { ...comp, position: { ...comp.position, y: value } }
                                  : comp
                              );
                              setProject(prev => ({ ...prev, components: updatedComponents }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-500">Width</label>
                          <input
                            type="number"
                            value={project.components.find(c => c.id === selectedComponent)?.size.width || 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              const updatedComponents = project.components.map(comp =>
                                comp.id === selectedComponent
                                  ? { ...comp, size: { ...comp.size, width: value } }
                                  : comp
                              );
                              setProject(prev => ({ ...prev, components: updatedComponents }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Height</label>
                          <input
                            type="number"
                            value={project.components.find(c => c.id === selectedComponent)?.size.height || 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              const updatedComponents = project.components.map(comp =>
                                comp.id === selectedComponent
                                  ? { ...comp, size: { ...comp.size, height: value } }
                                  : comp
                              );
                              setProject(prev => ({ ...prev, components: updatedComponents }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Padding */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Padding
                      </label>
                      <input
                        type="text"
                        value={project.components.find(c => c.id === selectedComponent)?.styles.padding || '0px'}
                        onChange={(e) => updateComponentStyle(selectedComponent, 'padding', e.target.value)}
                        placeholder="e.g., 20px or 10px 20px"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </>
                )}

                {/* Text Panel */}
                {selectedStylePanel === 'text' && (
                  <>
                    {/* Text Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Color
                      </label>
                      <input
                        type="color"
                        value={project.components.find(c => c.id === selectedComponent)?.styles.color as string || '#000000'}
                        onChange={(e) => updateComponentStyle(selectedComponent, 'color', e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                      />
                    </div>

                    {/* Font Family */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Family
                      </label>
                      <select
                        value={project.components.find(c => c.id === selectedComponent)?.styles.fontFamily as string || 'Inter'}
                        onChange={(e) => updateComponentStyle(selectedComponent, 'fontFamily', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      >
                        {project.styles.fonts.map((font) => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size: {project.components.find(c => c.id === selectedComponent)?.styles.fontSize || '16px'}
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="72"
                        value={parseInt(project.components.find(c => c.id === selectedComponent)?.styles.fontSize as string || '16')}
                        onChange={(e) => updateComponentStyle(selectedComponent, 'fontSize', `${e.target.value}px`)}
                        className="w-full"
                      />
                    </div>

                    {/* Font Weight */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Weight
                      </label>
                      <div className="grid grid-cols-4 gap-1">
                        {['300', '400', '500', '600', '700', '800', '900'].map((weight) => (
                          <button
                            key={weight}
                            onClick={() => updateComponentStyle(selectedComponent, 'fontWeight', weight)}
                            className={`px-2 py-1 text-xs border rounded ${project.components.find(c => c.id === selectedComponent)?.styles.fontWeight === weight
                                ? 'bg-blue-100 border-blue-500 text-blue-700'
                                : 'border-gray-300 hover:bg-gray-100'
                              }`}
                          >
                            {weight}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Alignment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Alignment
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { value: 'left', icon: AlignLeft },
                          { value: 'center', icon: AlignCenter },
                          { value: 'right', icon: AlignRight }
                        ].map((align) => (
                          <button
                            key={align.value}
                            onClick={() => updateComponentStyle(selectedComponent, 'textAlign', align.value)}
                            className={`p-2 border rounded flex items-center justify-center ${project.components.find(c => c.id === selectedComponent)?.styles.textAlign === align.value
                                ? 'bg-blue-100 border-blue-500 text-blue-700'
                                : 'border-gray-300 hover:bg-gray-100'
                              }`}
                          >
                            <align.icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Effects Panel */}
                {selectedStylePanel === 'effects' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opacity: {Math.round(parseFloat(project.components.find(c => c.id === selectedComponent)?.styles.opacity as string || '1') * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={project.components.find(c => c.id === selectedComponent)?.styles.opacity || 1}
                        onChange={(e) => updateComponentStyle(selectedComponent, 'opacity', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transform
                      </label>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs text-gray-500">Rotation (degrees)</label>
                          <input
                            type="number"
                            min="-180"
                            max="180"
                            value={0}
                            onChange={(e) => updateComponentStyle(selectedComponent, 'transform', `rotate(${e.target.value}deg)`)}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Content Editing for Text Components */}
                {project.components.find(c => c.id === selectedComponent)?.type === 'text' && (
                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={project.components.find(c => c.id === selectedComponent)?.props.content || ''}
                      onChange={(e) => {
                        const updatedComponents = project.components.map(comp =>
                          comp.id === selectedComponent
                            ? { ...comp, props: { ...comp.props, content: e.target.value } }
                            : comp
                        );
                        setProject(prev => ({ ...prev, components: updatedComponents }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            ) : selectedComponents.length > 1 ? (
              <div className="text-center">
                <div className="text-lg font-medium text-gray-900 mb-4">
                  {selectedComponents.length} components selected
                </div>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors">
                    Group Components
                  </button>
                  <button className="w-full px-3 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors">
                    Delete Selected
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-sm text-center">
                <div className="mb-4">
                  <Target className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  Select a component to edit its properties
                </div>
                <div className="text-xs">
                  <div>• Click to select</div>
                  <div>• Ctrl+Click for multi-select</div>
                  <div>• Drag to move</div>
                  <div>• Drag corners to resize</div>
                </div>
              </div>
            )}

            {/* Design System Shortcuts */}
            <div className="mt-8 border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-4">Design System</h4>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Colors
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {project.styles.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => selectedComponent && updateComponentStyle(selectedComponent, 'background', color)}
                      className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spacing Scale
                </label>
                <div className="grid grid-cols-6 gap-1">
                  {project.styles.spacing.map((space, index) => (
                    <button
                      key={index}
                      onClick={() => selectedComponent && updateComponentStyle(selectedComponent, 'padding', `${space}px`)}
                      className="px-1 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200 transition-colors"
                      title={`${space}px padding`}
                    >
                      {space}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Status Bar */}
      <div className="h-8 bg-gray-800 text-gray-300 text-xs flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Ready
          </span>
          <span>{project.components.length} components</span>
          <span>{device} view ({getCanvasWidth()}px)</span>
          <span>Zoom: {zoom}%</span>
          {selectedComponent && <span>Selected: {selectedComponent}</span>}
          {selectedComponents.length > 1 && <span>{selectedComponents.length} selected</span>}
        </div>
        <div className="flex items-center gap-4">
          <span>Auto-save enabled</span>
          <Users className="w-3 h-3" />
          <span>1 collaborator</span>
          <span className="text-gray-400">
            ⌘C Copy • ⌘V Paste • ⌘Z Undo • ⌘+ Zoom In • ⌘- Zoom Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilderStudio;