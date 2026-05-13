/**
 * @ulam/taho/vue: Vue composables adapter
 *
 * Thin wrappers around the vanilla taho core. The vanilla announce() and
 * clearAnnouncements() functions work anywhere without any adapter; these
 * composables are offered for consistency with Vue's Composition API style.
 */
export { announce, clearAnnouncements } from '../core/index.js'

export { useAnnounce } from './useAnnounce.js'
