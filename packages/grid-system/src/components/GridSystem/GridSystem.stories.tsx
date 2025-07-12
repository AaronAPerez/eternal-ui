import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { GridSystem } from './GridSystem'
import type { Position } from '@/types'

const meta: Meta<typeof GridSystem> = {
  title: 'Grid System/GridSystem',
  component: GridSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete grid system with overlay and controls for visual builders',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialConfig: {
      control: 'object',
      description: 'Initial grid configuration',
    },
    showControls: {
      control: 'boolean',
      description: 'Show grid controls panel',
    },
    controlsPosition: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position of controls panel',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Story wrapper component for interactive demos
const GridSystemDemo: React.FC<any> = (args) => {
  const [elements, setElements] = useState<Array<{ id: string; position: Position }>>([])

  const handleComponentDrag = (elementId: string, position: Position) => {
    setElements(prev => {
      const existing = prev.find(el => el.id === elementId)
      if (existing) {
        return prev.map(el => 
          el.id === elementId ? { ...el, position } : el
        )
      }
      return [...prev, { id: elementId, position }]
    })
  }

  return (
    <div className="w-full h-screen">
      <GridSystem {...args} onComponentDrag={handleComponentDrag}>
        {/* Demo elements */}
        {elements.map(element => (
          <div
            key={element.id}
            className="absolute bg-blue-500 text-white p-2 rounded shadow-lg cursor-move"
            style={{
              left: element.position.x,
              top: element.position.y,
              width: 100,
              height: 60,
            }}
            data-element-id={element.id}
            draggable
          >
            Element {element.id}
          </div>
        ))}
        
        {/* Add a draggable demo component */}
        <div
          className="absolute bg-green-500 text-white p-2 rounded shadow-lg cursor-move"
          style={{ left: 50, top: 50, width: 100, height: 60 }}
          data-element-id="demo-component"
          draggable
        >
          Drag Me!
        </div>
      </GridSystem>
    </div>
  )
}

export const Default: Story = {
  render: (args: any) => <GridSystemDemo {...args} />,
  args: {
    initialConfig: {
      enabled: true,
      size: 20,
      opacity: 0.3,
      color: '#3b82f6',
    },
    showControls: true,
    controlsPosition: 'top-right',
  },
}

export const GridDisabled: Story = {
  render: (args: any) => <GridSystemDemo {...args} />,
  args: {
    initialConfig: {
      enabled: false,
    },
    showControls: true,
  },
}

export const LargeGrid: Story = {
  render: (args: any) => <GridSystemDemo {...args} />,
  args: {
    initialConfig: {
      enabled: true,
      size: 50,
      opacity: 0.5,
      color: '#ef4444',
    },
  },
}

export const SnapToCorners: Story = {
  render: (args: any) => <GridSystemDemo {...args} />,
  args: {
    initialConfig: {
      enabled: true,
      size: 30,
      snap: {
        enabled: true,
        threshold: 15,
        corners: true,
        edges: false,
        center: false,
      },
    },
  },
}

export const SnapToEdges: Story = {
  render: (args: any) => <GridSystemDemo {...args} />,
  args: {
    initialConfig: {
      enabled: true,
      size: 25,
      snap: {
        enabled: true,
        threshold: 12,
        corners: false,
        edges: true,
        center: false,
      },
    },
  },
}

export const ControlsHidden: Story = {
  render: (args: any) => <GridSystemDemo {...args} />,
  args: {
    initialConfig: {
      enabled: true,
    },
    showControls: false,
  },
}

export const ControlsBottomLeft: Story = {
  render: (args: any) => <GridSystemDemo {...args} />,
  args: {
    initialConfig: {
      enabled: true,
    },
    controlsPosition: 'bottom-left',
  },
}