// @ulam/sili/remix: Remix 3+ adapter for @ulam/sili focus management and keyboard navigation
// Framework-agnostic vanilla utilities with Remix-specific routing + React hooks for keyboard

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

// Re-export React hooks (Remix uses React)
export { useKeydown } from '../react/hooks/useKeydown.js'
export { useListNavigation } from '../react/hooks/useListNavigation.js'
export { usePrefersReducedMotion } from '../react/hooks/usePrefersReducedMotion.js'
export { useFlipList } from '../react/hooks/useFlipList.js'

export { useRouter, useRouteMatch } from './router/useRouter.js'

export { mountRouteFocus, focusPageHeading } from './routeFocus.js'
