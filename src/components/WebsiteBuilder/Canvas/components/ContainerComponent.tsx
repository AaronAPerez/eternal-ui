import React from 'react';
import { Component } from '@/types';

interface ContainerComponentProps {
  component: Component;
}

const ContainerComponent: React.FC<ContainerComponentProps> = ({ component }) => {
  return (
    <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center">
      {component.props.children || 'Container'}
    </div>
  );
}

export default ContainerComponent