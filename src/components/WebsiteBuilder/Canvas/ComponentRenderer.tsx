import React from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { useResize } from '@/hooks/useResize';
import { Component } from '@/types';
import { ImageComponent } from './components/ImageComponent';
import { ButtonComponent } from './components/ButtonComponent';
import { HeroComponent } from './components/HeroComponent';
import { NavigationComponent } from './components/NavigationComponent';
import { TextComponent } from './components/TextComponent';
import FooterComponent from './components/FooterComponent';
import { ResizeHandles } from './ResizeHandles';
import { EternalUILogo } from './components/eternal-ui-logo';
import ContainerComponent from './components/ContainerComponent';


interface ComponentRendererProps {
  components: Component[];
  onComponentMouseDown: (e: React.MouseEvent, componentId: string) => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  components,
  onComponentMouseDown
}) => {
  const selectedComponent = useBuilderStore(state => state.selectedComponent);
  const selectedComponents = useBuilderStore(state => state.selectedComponents);
  const selectComponent = useBuilderStore(state => state.selectComponent);
  const toggleComponentSelection = useBuilderStore(state => state.toggleComponentSelection);

  const renderComponentContent = (component: Component) => {
    switch (component.type) {
      case 'hero':
        return <HeroComponent component={component} />;
      case 'text':
      case 'heading':
        return <TextComponent component={component} />;
      case 'button':
        return <ButtonComponent component={component} />;
      case 'image':
        return <ImageComponent component={component} />;
      case 'navigation':
        return <NavigationComponent component={component} />;
      case 'footer':
        return <FooterComponent component={component} />;
      case 'logo':
        return <EternalUILogo component={component} />;
      case 'container':
        return <ContainerComponent component={component} />;
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {component.type}
          </div>
        );
    }
  };

  return (
    <>
      {components.map((component) => {
        const isSelected = selectedComponent === component.id;
        const isMultiSelected = selectedComponents.includes(component.id);

        const handleClick = (e: React.MouseEvent) => {
          e.stopPropagation();

          if (e.ctrlKey || e.metaKey) {
            toggleComponentSelection(component.id);
          } else {
            selectComponent(component.id);
          }
        };

        return (
          <div key={component.id}>
            <div
              className={`absolute transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-blue-500 ring-offset-2 z-20' :
                isMultiSelected 
                  ? 'ring-2 ring-purple-400 ring-offset-2 z-20' : 'z-10'
              } ${!component.locked ? 'hover:ring-2 hover:ring-blue-300' : ''}
              ${component.locked ? 'opacity-75' : ''}`}
              style={{
                ...component.styles,
                left: `${component.position.x}px`,
                top: `${component.position.y}px`,
                width: `${component.size.width}px`,
                minHeight: `${component.size.height}px`,
                cursor: !component.locked ? 'grab' : 'default',
              }}
              onMouseDown={(e) => !component.locked && onComponentMouseDown(e, component.id)}
              onClick={handleClick}
            >
              {renderComponentContent(component)}
              
              {/* Component lock indicator */}
              {component.locked && (
                <div className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded text-xs">
                  🔒
                </div>
              )}
            </div>
            
            {/* Resize handles */}
            <ResizeHandles
              componentId={component.id}
              position={component.position}
              size={component.size}
              isSelected={isSelected}
              isLocked={component.locked}
            />
          </div>
        );
      })}
    </>
  );
};
