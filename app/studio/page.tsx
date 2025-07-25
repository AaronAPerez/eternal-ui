import { Suspense } from 'react';

import { StudioSkeleton } from '@/components/studio/StudioSkeleton';
import VisualBuilder from '../../components/builder/VisualBuilder';

export default function StudioPage() {
  // Remove authentication check for now
  // const session = await getServerSession();
  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <Suspense fallback={<StudioSkeleton />}>
      <VisualBuilder/>
    </Suspense>
  );
}