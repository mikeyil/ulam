import { useRef, useEffect } from 'react'
import { onSwipeGesture } from '../../core/swipeGesture.js'

/**
 * React hook wrapper around onSwipeGesture vanilla utility.
 * Attach a non-passive touchmove listener for swipe gesture tracking.
 *
 * Non-passive is critical because we need to call preventDefault() to enable smooth
 * swiping without browser interference.
 *
 * @param {React.RefObject|null} target - ref to element to listen on (or null → document)
 * @param {Function} handler - touchmove handler: (event, touch) => {}
 * @param {React.RefObject} touchRef - ref to store current touch state
 * @param {{ passive?: boolean }} [opts]
 *
 * @example
 * const listRef = useRef(null)
 * const touchRef = useRef(null)
 *
 * useSwipeGesture(listRef, (e, touch) => {
 *   if (!touch.moved && Math.abs(touch.dy) > Math.abs(touch.dx)) {
 *     touchRef.current = null  // vertical scroll, bail
 *     return
 *   }
 *   touch.moved = true
 *   const clamped = Math.max(-100, Math.min(100, touch.dx))
 *   el.style.transform = `translateX(${clamped}px)`
 *   e.preventDefault()
 * }, touchRef)
 */
export function useSwipeGesture(target, handler, touchRef, { passive = false } = {}) {
  useEffect(() => {
    const el = target && 'current' in target ? target.current : (target ?? document)
    if (!el) return
    return onSwipeGesture(el, handler, touchRef, { passive })
  }, [handler, target, touchRef, passive])
}
