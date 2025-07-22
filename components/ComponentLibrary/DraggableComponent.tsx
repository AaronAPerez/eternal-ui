import { useDrag } from 'react-dnd'

export const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COMPONENT',
    item: { componentType: component.type, ...component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div 
      ref={drag}
      className={`component-item ${isDragging ? 'dragging' : ''}`}
    >
      {component.name}
    </div>
  )
}