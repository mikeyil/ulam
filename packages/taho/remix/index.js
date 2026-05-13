// vanilla core re-exported for convenience
export { announce, clearAnnouncements } from '../core/index.js'

// React adapter (requires react-router)
export { useRouteAnnouncer } from './useRouteAnnouncer.js'

// Vanilla adapter (no framework dependency)
export { mountRouteAnnouncer, notifyRouteChange } from './routeAnnouncer.js'
