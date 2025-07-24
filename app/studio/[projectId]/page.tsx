import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page


// import { StudioWorkspace } from '@/components/studio/StudioWorkspace';

// interface StudioProjectPageProps {
//   params: {
//     projectId: string;
//   };
// }

// export async function generateMetadata({ params }: StudioProjectPageProps) {
//   return {
//     title: `Project ${params.projectId} - Studio`,
//     description: `Edit project ${params.projectId} with Eternal UI Pro`,
//   };
// }

// export default function StudioProjectPage({ params }: StudioProjectPageProps) {
//   // Mock project data for now
//   const mockProject = {
//     id: params.projectId,
//     name: `Project ${params.projectId}`,
//     elements: []
//   };

//   return (
//     <StudioWorkspace 
//       projectId={params.projectId}
//       initialProject={mockProject}
//     />
//   );
// }