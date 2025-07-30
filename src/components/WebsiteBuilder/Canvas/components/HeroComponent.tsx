import React from 'react';
import { Component } from '@/types';

interface HeroComponentProps {
  component: Component;
}

export const HeroComponent: React.FC<HeroComponentProps> = ({ component }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="max-w-2xl text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          {component.props.title}
        </h1>
        <p className="text-lg mb-6 opacity-90">
          {component.props.subtitle}
        </p>
        <button className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-2 rounded-lg font-semibold hover:bg-opacity-30 transition-all">
          {component.props.ctaText}
        </button>
      </div>
    </div>
  );
};