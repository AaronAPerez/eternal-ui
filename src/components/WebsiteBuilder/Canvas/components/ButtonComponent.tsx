import React from 'react';
import { Component } from '@/types';

interface ButtonComponentProps {
  component: Component;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({ component }) => {
  return (
    <button className="w-full h-full transition-all hover:opacity-90">
      {component.props.text}
    </button>
  );
};