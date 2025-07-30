import React from 'react';
import { Users } from 'lucide-react';

export const CollaborationIndicator: React.FC = () => {
  // This would connect to real collaboration state
  const activeUsers = 1; // Mock data
  
  return (
    <span className="flex items-center gap-1">
      <Users className="w-3 h-3" />
      {activeUsers} collaborator{activeUsers !== 1 ? 's' : ''}
    </span>
  );
};