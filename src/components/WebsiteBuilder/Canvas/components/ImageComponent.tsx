import React from 'react';
import Image from 'next/image';
import { Component } from '@/types';

interface ImageComponentProps {
  component: Component;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ component }) => {
  const { src, alt, width, height } = component.props;
  
  return (
    <div className="w-full h-full relative">
      <Image
        src={src || '/placeholder-image.jpg'}
        alt={alt || 'Image'}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};