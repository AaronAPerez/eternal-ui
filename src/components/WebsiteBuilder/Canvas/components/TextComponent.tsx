import React from 'react';
import { Component } from '@/types';

interface TextComponentProps {
  component: Component;
}

export const TextComponent: React.FC<TextComponentProps> = ({ component }) => {
  return (
    <div className="w-full h-full flex items-center p-2">
      {component.props.content}
    </div>
  );
};