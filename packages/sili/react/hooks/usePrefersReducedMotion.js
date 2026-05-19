import { useState, useEffect } from 'react'
import { prefersReducedMotion, onPrefersReducedMotionChange } from '../../core/keyboard.js'

/**
 * React hook wrapper around prefers-reduced-motion media query.
 * Returns true when the user has enabled reduced motion preferences.
 *
 * Use to conditionally disable animations, transitions, or auto-play behaviors.
 *
 * @returns {boolean} true if prefers-reduced-motion: reduce is active
 *
 * @example
 * const prefersReducedMotion = usePrefersReducedMotion()
 * if (!prefersReducedMotion) {
 *   // Play animation
 * }
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== 'undefined' ? prefersReducedMotion() : false
  )

  useEffect(() => {
    return onPrefersReducedMotionChange(({ matches }) => {
      setPrefersReduced(matches)
    })
  }, [])

  return prefersReduced
}
