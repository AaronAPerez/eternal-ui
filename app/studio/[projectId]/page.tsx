import { notFound } from 'next/navigation';
import { getProject } from '@/lib/db/projects';
import { StudioWorkspace } from '@/components/studio/StudioWorkspace';

interface StudioProjectPageProps {
  params: {
    projectId: string;
  };
}

export async function generateMetadata({ params }: StudioProjectPageProps) {
  const project = await getProject(params.projectId);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} - Studio`,
    description: `Edit ${project.name} with Eternal UI Pro`,
  };
}

export default async function StudioProjectPage({ params }: StudioProjectPageProps) {
  const project = await getProject(params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <StudioWorkspace 
      projectId={params.projectId}
      initialProject={project}
    />
  );
}