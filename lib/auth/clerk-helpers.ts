import { currentUser } from '@clerk/nextjs';

export async function getClerkUserId(): Promise<string | undefined> {
  const user = await currentUser();
  return user?.id;
}

export async function getClerkUserSegment(): Promise<string> {
  const user = await currentUser();
  return user?.publicMetadata?.segment as string || 'free';
}

export async function getClerkUserBeta(): Promise<boolean> {
  const user = await currentUser();
  return user?.publicMetadata?.beta as boolean || false;
}
