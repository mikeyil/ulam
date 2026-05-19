/**
 * Vanilla touch/swipe gesture utilities.
 * No framework dependencies — can be used in vanilla JS, React, Vue, Angular, etc.
 *
 * Supports:
 * - Swipe detection (horizontal, vertical, threshold-based)
 * - Non-passive touchmove handling for preventDefault()
 * - Multi-touch state tracking
 */

/**
 * Attach a non-passive touchmove listener to track swipe gestures.
 *
 * Non-passive is critical because we need to call preventDefault() to enable smooth
 * swiping without browser interference.
 *
 * @param {Element} target - element to listen on
 * @param {Function} handler - touchmove handler: (event, touch) => {}
 *   touch object: { id, startX, startY, moved, currentX, currentY, dx, dy }
 * @param {{ passive?: boolean }} [opts]
 *
 * @returns {Function} cleanup function to remove the listener
 *
 * @example
 * const touchRef = { current: null }
 * const cleanup = onSwipeGesture(listEl, (e, touch) => {
 *   const dx = touch.dx
 *   const dy = touch.dy
 *   if (!touch.moved && Math.abs(dy) > Math.abs(dx)) {
 *     touchRef.current = null  // vertical scroll, bail out
 *     return
 *   }
 *   touch.moved = true
 *   const clamped = Math.max(-100, Math.min(100, touch.dx))
 *   el.style.transform = `translateX(${clamped}px)`
 *   e.preventDefault()
 * }, touchRef)
 */
export function onSwipeGesture(target, handler, touchRef, { passive = false } = {}) {
  const touches = new Map()

  function handleTouchStart(e) {
    for (const touch of e.touches) {
      touches.set(touch.identifier, {
        id: touch.identifier,
        startX: touch.clientX,
        startY: touch.clientY,
        moved: false,
      })
    }
  }

  function handleTouchMove(e) {
    for (const touch of e.touches) {
      const state = touches.get(touch.identifier)
      if (!state) continue

      state.currentX = touch.clientX
      state.currentY = touch.clientY
      state.dx = state.currentX - state.startX
      state.dy = state.currentY - state.startY

      // Update the shared ref so handlers can read latest state
      if (touchRef) touchRef.current = state

      handler(e, state)
    }
  }

  function handleTouchEnd(e) {
    for (const touch of e.changedTouches) {
      touches.delete(touch.identifier)
    }
  }

  const opts = { passive, capture: false }
  target.addEventListener('touchstart', handleTouchStart, opts)
  target.addEventListener('touchmove', handleTouchMove, opts)
  target.addEventListener('touchend', handleTouchEnd, opts)

  return () => {
    target.removeEventListener('touchstart', handleTouchStart, opts)
    target.removeEventListener('touchmove', handleTouchMove, opts)
    target.removeEventListener('touchend', handleTouchEnd, opts)
  }
}

/**
 * Determine swipe direction based on dx/dy deltas.
 *
 * @param {number} dx - horizontal delta
 * @param {number} dy - vertical delta
 * @param {number} threshold - minimum movement to consider a swipe (default 10px)
 *
 * @returns {string|null} 'left' | 'right' | 'up' | 'down' | null (no swipe)
 *
 * @example
 * const direction = getSwipeDirection(touch.dx, touch.dy)
 * if (direction === 'left') onSwipeLeft()
 */
export function getSwipeDirection(dx, dy, threshold = 10) {
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)

  if (absDx < threshold && absDy < threshold) return null

  if (absDx > absDy) {
    return dx > 0 ? 'right' : 'left'
  } else {
    return dy > 0 ? 'down' : 'up'
  }
}

/**
 * Check if touch is primarily horizontal (swipe-left/right).
 * Useful for distinguishing swipe actions from vertical scrolling.
 *
 * @param {number} dx - horizontal delta
 * @param {number} dy - vertical delta
 * @param {number} threshold - ratio for movement to be considered horizontal
 *
 * @returns {boolean} true if horizontal movement dominates
 *
 * @example
 * if (!touch.moved && isHorizontalSwipe(touch.dx, touch.dy)) {
 *   touch.moved = true
 *   // proceed with swipe handling
 * }
 */
export function isHorizontalSwipe(dx, dy, threshold = 1.2) {
  return Math.abs(dx) > Math.abs(dy) * threshold
}

/**
 * Clamp a swipe delta within allowed bounds.
 * Useful for constraining drag distance to prevent over-swiping.
 *
 * @param {number} delta - current swipe delta
 * @param {number} minBound - minimum allowed (typically negative, left edge)
 * @param {number} maxBound - maximum allowed (typically positive, right edge)
 *
 * @returns {number} clamped delta
 *
 * @example
 * const clamped = clampSwipeDelta(touch.dx, -100, 50)
 * el.style.transform = `translateX(${clamped}px)`
 */
export function clampSwipeDelta(delta, minBound, maxBound) {
  return Math.max(minBound, Math.min(maxBound, delta))
}
