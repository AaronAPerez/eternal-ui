import React, { useState } from 'react';
import { useBuilderStore } from '@/stores/builderStore';

interface ProjectInfoProps {
  name: string;
  componentCount: number;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ name, componentCount }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const updateProjectName = useBuilderStore(state => state.updateProjectName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjectName(editName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditName(name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="font-medium text-gray-900 bg-transparent border-b border-blue-500 outline-none"
          autoFocus
        />
      </form>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setIsEditing(true)}
        className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
        title="Click to edit project name"
      >
        {name}
      </button>
      
      <div className="text-xs text-gray-500">
        {componentCount} components
      </div>
    </div>
  );
};