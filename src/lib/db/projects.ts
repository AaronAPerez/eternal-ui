import { Project } from '@/components/WebsiteBuilder/types';

export const saveProject = async (project: Project) => {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  
  return response.json();
};

export const loadProject = async (projectId: string): Promise<Project> => {
  const response = await fetch(`/api/projects/${projectId}`);
  return response.json();
};