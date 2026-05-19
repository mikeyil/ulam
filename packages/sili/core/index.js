// @ulam/sili: vanilla JS focus management and keyboard navigation core (no framework dependency)
// For React, use @ulam/sili/react. For Remix, use @ulam/sili/remix.

export { trapFocus, getFocusable } from './focusTrap.js'
export { hideBackground } from './ariaHide.js'
export { returnFocus } from './returnFocus.js'
export { onEscapeKey } from './escapeKey.js'
export { lockScroll } from './scrollLock.js'

export { onKeydown, dispatchKeyCommand, prefersReducedMotion, onPrefersReducedMotionChange } from './keyboard.js'
export { snapshotFlipPositions, animateFlipList } from './flipAnimation.js'
export { onSwipeGesture, getSwipeDirection, isHorizontalSwipe, clampSwipeDelta } from './swipeGesture.js'
