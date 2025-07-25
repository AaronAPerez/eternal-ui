'use client';

import React, { useState } from 'react';
import { X, Trash2, Copy } from 'lucide-react';

interface StudioPropertiesProps {
  element: any;
  onUpdateElement: (id: string, updates: any) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onClose: () => void;
  isMobile?: boolean;
}

export function StudioProperties({
  element,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onClose,
  isMobile = false
}: StudioPropertiesProps) {
  const [activeSection, setActiveSection] = useState('general');

  if (!element) return null;

  const handlePropertyChange = (property: string, value: any) => {
    onUpdateElement(element.id, {
      props: {
        ...element.props,
        [property]: value
      }
    });
  };

  const sections = [
    { id: 'general', label: 'General' },
    { id: 'style', label: 'Style' },
    { id: 'layout', label: 'Layout' },
    { id: 'effects', label: 'Effects' }
  ];

  return (
    <div className={`
      ${isMobile ? 'w-80 max-w-[90vw]' : 'w-80'} 
      bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 
      flex flex-col h-full shadow-lg
    `}>
      {/* Properties Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Properties
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close properties panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Element Info */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
              {element.type.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            {element.metadata?.isAIGenerated && (
              <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                AI Generated
              </span>
            )}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            ID: {element.id.slice(0, 8)}...
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onDuplicateElement(element.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            <Copy className="w-3 h-3" />
            Duplicate
          </button>
          <button
            onClick={() => onDeleteElement(element.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>

      {/* Properties Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Section Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 min-w-0 px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeSection === section.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="p-4">
          {activeSection === 'general' && (
            <div className="space-y-4">
              {element.type === 'hero' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={element.props.title || ''}
                      onChange={(e) => handlePropertyChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subtitle
                    </label>
                    <textarea
                      value={element.props.subtitle || ''}
                      onChange={(e) => handlePropertyChange('subtitle', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    />
                  </div>
                </>
              )}
              {/* Add more element types as needed */}
            </div>
          )}
          {/* Add other sections as needed */}
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { 
// Palette, Layout, Type, 
//   Brain, Trash2, Copy
// } from 'lucide-react';
// import { Button } from '@/components/ui/Button';


// interface StudioPropertiesProps {
//   element: any;
// }

// export function StudioProperties({ element }: StudioPropertiesProps) {
//   const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout' | 'ai'>('content');
//   const { updateElement, deleteElement, generateWithAI } = useStudio();

//   const tabs = [
//     { id: 'content', label: 'Content', icon: Type },
//     { id: 'style', label: 'Style', icon: Palette },
//     { id: 'layout', label: 'Layout', icon: Layout },
//     ...(element.metadata?.isAIGenerated ? [{ id: 'ai', label: 'AI', icon: Brain }] : []),
//   ];

//   const handleUpdate = (updates: any) => {
//     updateElement(element.id, updates);
//   };

//   const handleDuplicate = () => {
//     const newElement = {
//       ...element,
//       id: `${element.type}-${Date.now()}`,
//       position: {
//         x: element.position.x + 20,
//         y: element.position.y + 20,
//       },
//     };
//     // addElement would be called here
//   };

//   return (
//     <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center gap-3 mb-3">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
//             {element.type.replace(/([A-Z])/g, ' $1').trim()}
//           </h3>
//           {element.metadata?.isAIGenerated && (
//             <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs flex items-center gap-1">
//               <Brain className="w-3 h-3" />
//               AI
//             </div>
//           )}
//         </div>

//         {/* Element ID and Metadata */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <div>ID: {element.id}</div>
//           {element.metadata?.prompt && (
//             <div className="italic">"{element.metadata.prompt}"</div>
//           )}
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-1 mt-3">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id as any)}
//                 className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
//                   activeTab === tab.id
//                     ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
//                     : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
//                 }`}
//               >
//                 <Icon className="w-3 h-3 mx-auto" />
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {activeTab === 'content' && (
//           <div className="space-y-4">
//             {/* Dynamic content based on element type */}
//             {element.type === 'hero' && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     value={element.props.title || ''}
//                     onChange={(e) => handleUpdate({
//                       props: { ...element.props, title: e.target.value }
//                     })}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Subtitle
//                   </label>
//                   <textarea
//                     value={element.props.subtitle || ''}
//                     onChange={(e) => handleUpdate({
//                       props: { ...element.props, subtitle: e.target.value }
//                     })}
//                     rows={3}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Primary CTA
//                   </label>
//                   <input
//                     type="text"
//                     value={element.props.primaryCta || ''}
//                     onChange={(e) => handleUpdate({
//                       props: { ...element.props, primaryCta: e.target.value }
//                     })}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Generic text content for other components */}
//             {['h1', 'h2', 'h3', 'paragraph', 'button'].includes(element.type) && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Text Content
//                 </label>
//                 <textarea
//                   value={element.props.text || ''}
//                   onChange={(e) => handleUpdate({
//                     props: { ...element.props, text: e.target.value }
//                   })}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'style' && (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Background Color
//               </label>
//               <input
//                 type="color"
//                 value={element.style?.backgroundColor || '#ffffff'}
//                 onChange={(e) => handleUpdate({
//                   style: { ...element.style, backgroundColor: e.target.value }
//                 })}
//                 className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Text Color
//               </label>
//               <input
//                 type="color"
//                 value={element.style?.color || '#000000'}
//                 onChange={(e) => handleUpdate({
//                   style: { ...element.style, color: e.target.value }
//                 })}
//                 className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Border Radius
//               </label>
//               <input
//                 type="range"
//                 min="0"
//                 max="20"
//                 value={parseInt(element.style?.borderRadius) || 0}
//                 onChange={(e) => handleUpdate({
//                   style: { ...element.style, borderRadius: `${e.target.value}px` }
//                 })}
//                 className="w-full"
//               />
//             </div>
//           </div>
//         )}

//         {activeTab === 'layout' && (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Position
//               </label>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">X</label>
//                   <input
//                     type="number"
//                     value={element.position.x}
//                     onChange={(e) => handleUpdate({
//                       position: { ...element.position, x: parseInt(e.target.value) || 0 }
//                     })}
//                     className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Y</label>
//                   <input
//                     type="number"
//                     value={element.position.y}
//                     onChange={(e) => handleUpdate({
//                       position: { ...element.position, y: parseInt(e.target.value) || 0 }
//                     })}
//                     className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Size
//               </label>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Width</label>
//                   <input
//                     type="text"
//                     value={element.size?.width || 'auto'}
//                     onChange={(e) => handleUpdate({
//                       size: { ...element.size, width: e.target.value }
//                     })}
//                     className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Height</label>
//                   <input
//                     type="text"
//                     value={element.size?.height || 'auto'}
//                     onChange={(e) => handleUpdate({
//                       size: { ...element.size, height: e.target.value }
//                     })}
//                     className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'ai' && element.metadata?.isAIGenerated && (
//           <div className="space-y-4">
//             <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
//               <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
//                 <Brain className="w-4 h-4" />
//                 AI Enhancement Options
//               </h5>
//               <div className="space-y-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="w-full justify-start"
//                   onClick={() => generateWithAI(`Improve the design of this ${element.type} component`)}
//                 >
//                   🎨 Improve Design
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="w-full justify-start"
//                   onClick={() => generateWithAI(`Optimize this ${element.type} for mobile devices`)}
//                 >
//                   📱 Optimize for Mobile
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="w-full justify-start"
//                   onClick={() => generateWithAI(`Enhance accessibility of this ${element.type} component`)}
//                 >
//                   ♿ Enhance Accessibility
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="w-full justify-start"
//                   onClick={() => generateWithAI(`Add animation effects to this ${element.type}`)}
//                 >
//                   ✨ Add Animations
//                 </Button>
//               </div>
//             </div>

//             <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//               <h6 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Generation Details</h6>
//               <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
//                 <div><strong>Framework:</strong> {element.metadata.framework}</div>
//                 <div><strong>Confidence:</strong> {element.metadata.confidence?.toFixed(0)}%</div>
//                 <div><strong>Generated:</strong> {new Date(element.metadata.generatedAt).toLocaleString()}</div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
//         <Button
//           variant="outline"
//           size="sm"
//           className="w-full"
//           onClick={handleDuplicate}
//         >
//           <Copy className="w-4 h-4 mr-2" />
//           Duplicate
//         </Button>
        
//         <Button
//           variant="destructive"
//           size="sm"
//           className="w-full"
//           onClick={() => deleteElement(element.id)}
//         >
//           <Trash2 className="w-4 h-4 mr-2" />
//           Delete
//         </Button>
//       </div>
//     </div>
//   );
// }