import React from 'react';
import { Component } from '@/types';

interface FooterComponentProps {
  component: Component;
}

const FooterComponent: React.FC<FooterComponentProps> = ({ component }) => {
  return (
    <div className="w-full h-full">
      {component.props.text || 'Footer Content'}
    </div>
  );
}

export default FooterComponent;