export function safeGetCurrentUserId(): string | undefined {
  // Generate a consistent anonymous ID for development
  if (typeof window !== 'undefined') {
    let anonymousId = localStorage.getItem('anonymous_user_id');
    if (!anonymousId) {
      anonymousId = `anon_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('anonymous_user_id', anonymousId);
    }
    return anonymousId;
  }
  
  // Server-side: return undefined for now
  return undefined;
}

export function safeGetUserSegment(): string {
  // Default to 'free' segment for now
  return 'free';
}

export function safeIsUserInBeta(): boolean {
  // Default to false for now, can be overridden with localStorage
  if (typeof window !== 'undefined') {
    return localStorage.getItem('force_beta_mode') === 'true';
  }
  return false;
}
