import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance monitoring
  tracesSampleRate: 1.0,
  
  // Error filtering
  beforeSend(event, hint) {
    // Filter out known non-critical errors
    if (event.exception) {
      const error = hint.originalException;
      if (error && error.message && error.message.includes('Non-critical')) {
        return null;
      }
    }
    return event;
  },
  
  // Additional context
  beforeBreadcrumb(breadcrumb) {
    if (breadcrumb.category === 'ui.click') {
      breadcrumb.message = `User clicked: ${breadcrumb.message}`;
    }
    return breadcrumb;
  },
});