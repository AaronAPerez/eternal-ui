'use client';

import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className = '',
  maxHeight = '400px'
}) => {
  return (
    <div
      className={`overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 ${className}`}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};