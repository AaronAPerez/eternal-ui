import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function getSupabaseUserId(): Promise<string | undefined> {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id;
}

export async function getSupabaseUserSegment(): Promise<string> {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user?.id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('segment')
      .eq('id', session.user.id)
      .single();
    
    return profile?.segment || 'free';
  }
  
  return 'free';
}