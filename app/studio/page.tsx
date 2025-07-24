import { Suspense } from 'react';
import { StudioWorkspace } from '@/components/studio/StudioWorkspace';
import { StudioSkeleton } from '@/components/studio/StudioSkeleton';

export default function StudioPage() {
  // Remove authentication check for now
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