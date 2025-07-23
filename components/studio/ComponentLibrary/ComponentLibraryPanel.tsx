// 'use client'

// import React from 'react'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { 
//   Type, 
//   Square, 
//   Image, 
//   RectangleHorizontal as ButtonIcon,
//   Layout,
 
//   List,
//   CreditCard as Card,
//   Navigation,
//   FileText as Form,
//   Grid
// } from 'lucide-react'
// import { useDrag } from 'react-dnd'
// import { DndProvider } from 'react-dnd'

// const COMPONENT_TYPES = [
//   {
//     id: 'text',
//     name: 'Text',
//     icon: Type,
//     category: 'Basic',
//     description: 'Add text content'
//   },
//   {
//     id: 'button',
//     name: 'Button',
//     icon: ButtonIcon,
//     category: 'Basic',
//     description: 'Interactive button'
//   },
//   {
//     id: 'container',
//     name: 'Container',
//     icon: Square,
//     category: 'Layout',
//     description: 'Layout container'
//   },
//   {
//     id: 'image',
//     name: 'Image',
//     icon: Image,
//     category: 'Media',
//     description: 'Image element'
//   },
//   {
//     id: 'card',
//     name: 'Card',
//     icon: Card,
//     category: 'Layout',
//     description: 'Content card'
//   },
//   {
//     id: 'navigation',
//     name: 'Navigation',
//     icon: Navigation,
//     category: 'Navigation',
//     description: 'Navigation menu'
//   },
//   {
//     id: 'form',
//     name: 'Form',
//     icon: Form,
//     category: 'Input',
//     description: 'Form container'
//   },
//   {
//     id: 'grid',
//     name: 'Grid',
//     icon: Grid,
//     category: 'Layout',
//     description: 'CSS Grid layout'
//   }
// ]

// interface DraggableComponentProps {
//   component: typeof COMPONENT_TYPES[0]
// }

// const DraggableComponent: React.FC<DraggableComponentProps> = ({ component }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: 'COMPONENT',
//     item: { 
//       componentType: component.id,
//       name: component.name
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging()
//     })
//   })

//   const Icon = component.icon

//   return (
//     <div
//       ref={drag}
//       className={`
//         p-3 border border-gray-200 rounded-lg cursor-move
//         hover:border-indigo-300 hover:bg-indigo-50
//         transition-all duration-200
//         ${isDragging ? 'opacity-50 rotate-2' : ''}
//       `}
//     >
//       <div className="flex items-center gap-3">
//         <div className="p-2 bg-gray-100 rounded-lg">
//           <Icon size={16} className="text-gray-600" />
//         </div>
//         <div>
//           <h4 className="font-medium text-sm text-gray-900">
//             {component.name}
//           </h4>
//           <p className="text-xs text-gray-500">
//             {component.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// const ComponentLibraryContent: React.FC = () => {
//   const categories = [...new Set(COMPONENT_TYPES.map(c => c.category))]

//   return (
//     <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//       <div className="p-4 border-b border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-900">
//           Component Library
//         </h2>
//         <p className="text-sm text-gray-600 mt-1">
//           Drag components to canvas
//         </p>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4">
//         {categories.map(category => (
//           <div key={category} className="mb-6">
//             <h3 className="text-sm font-medium text-gray-700 mb-3">
//               {category}
//             </h3>
//             <div className="space-y-2">
//               {COMPONENT_TYPES
//                 .filter(component => component.category === category)
//                 .map(component => (
//                   <DraggableComponent
//                     key={component.id}
//                     component={component}
//                   />
//                 ))
//               }
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // ✅ Wrap with DndProvider to provide drag-drop context
// export const ComponentLibraryPanel: React.FC = () => {
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <ComponentLibraryContent />
//     </DndProvider>
//   )
// }