export function setDevUser(userId: string, segment: 'free' | 'premium' | 'beta' = 'free', beta: boolean = false) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_id', userId);
    localStorage.setItem('user_segment', segment);
    localStorage.setItem('user_beta', beta.toString());
    console.log(`🔧 Dev Mode: Set user ${userId} as ${segment}${beta ? ' (beta)' : ''}`);
    
    // Reload to apply changes
    window.location.reload();
  }
}

export function enableBetaMode() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('force_beta_mode', 'true');
    localStorage.setItem('user_segment', 'beta');
    console.log('🧪 Beta mode enabled');
    window.location.reload();
  }
}

export function disableBetaMode() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('force_beta_mode');
    localStorage.setItem('user_segment', 'free');
    console.log('🧪 Beta mode disabled');
    window.location.reload();
  }
}

export function clearDevUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_segment');
    localStorage.removeItem('user_beta');
    localStorage.removeItem('force_beta_mode');
    console.log('🔧 Dev user cleared');
    window.location.reload();
  }
}