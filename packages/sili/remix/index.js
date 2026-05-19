// @ulam/sili/remix: Remix 3+ adapter for @ulam/sili focus management and keyboard navigation
//
// Remix 3+ supports multiple frameworks (React, Vue, etc.) and is framework-agnostic.
// This export provides:
// 1. Vanilla core utilities (framework-agnostic, zero dependencies)
// 2. Remix-specific focus management utilities
// 3. Framework-specific adapters via subexports:
//    - @ulam/sili/remix/react — React hooks (useRouter, useRouteMatch, keyboard hooks)
//    - @ulam/sili/remix/vue — Vue composables (keyboard composables)
//
// For vanilla/isomorphic use, import from @ulam/sili (same as @ulam/sili/remix):
//   import { onKeydown, dispatchKeyCommand, prefersReducedMotion } from '@ulam/sili/remix'
//
// For Remix React routes with router utilities:
//   import { useRouter, useRouteMatch } from '@ulam/sili/remix/react'

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
  onSwipeGesture,
  getSwipeDirection,
  isHorizontalSwipe,
  clampSwipeDelta,
} from '../core/index.js'

export { mountRouteFocus, focusPageHeading } from './routeFocus.js'
