// @ulam/sili/remix: Remix 3+ adapter for @ulam/sili focus management and keyboard navigation
//
// Remix 3+ supports multiple frameworks (React, Vue, etc.) and is framework-agnostic.
// This export provides:
// 1. Vanilla core utilities (framework-agnostic, zero dependencies)
// 2. Remix-specific routing utilities
// 3. Framework-specific adapters via subexports:
//    - @ulam/sili/remix/react — React hooks
//    - @ulam/sili/remix/vue — Vue composables
//
// For vanilla/isomorphic use, import from @ulam/sili (same as @ulam/sili/remix):
//   import { onKeydown, dispatchKeyCommand, prefersReducedMotion } from '@ulam/sili/remix'

export {
  trapFocus,
  getFocusable,
  hideBackground,
  returnFocus,
  onEscapeKey,
  lockScroll,
  onKeydown,
  dispatchKeyCommand,
  prefersReducedMotion,
  onPrefersReducedMotionChange,
  snapshotFlipPositions,
  animateFlipList,
} from '../core/index.js'

export { useRouter, useRouteMatch } from './router/useRouter.js'

export { mountRouteFocus, focusPageHeading } from './routeFocus.js'
