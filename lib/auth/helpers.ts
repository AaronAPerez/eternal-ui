export function getCurrentUserId(): string | undefined {
  // Option 1: If you're using Next.js with cookies/sessions
  if (typeof window === 'undefined') {
    // Server-side: Get from cookies or headers
    const { cookies } = require('next/headers');
    const userCookie = cookies().get('user_id');
    return userCookie?.value;
  }
  
  // Client-side: Get from localStorage, context, or session
  try {
    const userId = localStorage.getItem('user_id');
    return userId || undefined;
  } catch {
    return undefined;
  }
}

export function getUserSegment(): string {
  // Option 1: Get from user profile/database
  if (typeof window === 'undefined') {
    // Server-side: Get from cookies or database
    const { cookies } = require('next/headers');
    const segmentCookie = cookies().get('user_segment');
    return segmentCookie?.value || 'free';
  }
  
  // Client-side: Get from localStorage or context
  try {
    const segment = localStorage.getItem('user_segment');
    return segment || 'free';
  } catch {
    return 'free';
  }
}

export function isUserInBeta(): boolean {
  // Option 1: Check user flags
  if (typeof window === 'undefined') {
    // Server-side: Get from cookies or database
    const { cookies } = require('next/headers');
    const betaCookie = cookies().get('user_beta');
    return betaCookie?.value === 'true';
  }
  
  // Client-side: Get from localStorage or context
  try {
    const beta = localStorage.getItem('user_beta');
    return beta === 'true';
  } catch {
    return false;
  }
}