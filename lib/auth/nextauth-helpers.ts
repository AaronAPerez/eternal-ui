import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getServerUserId(): Promise<string | undefined> {
  const session = await getServerSession(authOptions);
  return session?.user?.id;
}

export async function getServerUserSegment(): Promise<string> {
  const session = await getServerSession(authOptions);
  return session?.user?.segment || 'free';
}

export async function getServerUserBeta(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return session?.user?.beta || false;
}