import { useEffect } from 'react'
import { onKeydown } from '../../core/keyboard.js'

/**
 * React hook wrapper around onKeydown vanilla utility.
 * Attach a keydown listener to a target element and clean up on unmount.
 *
 * @param {Function} handler - Keydown event handler. Should be stable (useCallback or defined outside render).
 * @param {{ target?: EventTarget|React.RefObject<EventTarget>, capture?: boolean }} [opts]
 *   target  — DOM node, React ref, or null/undefined (falls back to document).
 *   capture — whether to use capture phase (default false).
 *
 * @example
 * const handleKeyDown = useCallback((e) => {
 *   if (e.key === 'j') focusNext()
 * }, [])
 * useKeydown(handleKeyDown, { target: listRef })
 */
export function useKeydown(handler, { target, capture = false } = {}) {
  useEffect(() => {
    const el = target && 'current' in target ? target.current : (target ?? document)
    if (!el) return
    return onKeydown(el, handler, { capture })
  }, [handler, target, capture])
}
