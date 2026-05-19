// @ulam/taho/remix: Remix 3+ adapter for @ulam/taho announcements
// Framework-agnostic vanilla utilities (no React dependency)

export { announce, clearAnnouncements } from '../core/index.js'

export { mountRouteAnnouncer, notifyRouteChange } from './routeAnnouncer.js'
