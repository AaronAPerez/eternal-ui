import React from 'react';
import { Suspense } from 'react';
import { StudioWorkspace } from '@/components/studio/StudioWorkspace';

// import { redirect } from 'next/navigation';
// import { getServerSession } from 'next-auth';
import { StudioSkeleton } from '@/components/studio/StudioSkeleton';

export default async function StudioPage() {
  // const session = await getServerSession();
  
  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <Suspense fallback={<StudioSkeleton />}>
      <StudioWorkspace />
    </Suspense>
  );
}