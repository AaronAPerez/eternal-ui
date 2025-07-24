import { useStudio } from "./useStudio";

/**
 * Hook for collaboration features
 */
export function useStudioCollaboration() {
  const { state, updateCollaborator, removeCollaborator } = useStudio();
  
  return {
    collaborators: state.collaborators,
    activeCollaborators: state.collaborators.filter(c => c.isActive),
    updateCollaborator,
    removeCollaborator,
  };
}
