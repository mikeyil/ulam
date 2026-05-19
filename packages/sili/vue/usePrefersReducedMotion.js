import { ref, onMounted, onUnmounted } from 'vue'
import { prefersReducedMotion, onPrefersReducedMotionChange } from '../core/keyboard.js'

/**
 * Vue composable for prefers-reduced-motion media query.
 * Returns a reactive ref that is true when user has enabled reduced motion preferences.
 *
 * Use to conditionally disable animations, transitions, or auto-play behaviors.
 *
 * @returns {Ref<boolean>} reactive ref: true if prefers-reduced-motion: reduce is active
 *
 * @example
 * import { usePrefersReducedMotion } from '@ulam/sili/vue'
 *
 * export default {
 *   setup() {
 *     const prefersReducedMotion = usePrefersReducedMotion()
 *     return { prefersReducedMotion }
 *   }
 * }
 *
 * <div :style="{ transition: prefersReducedMotion ? 'none' : 'opacity 300ms' }">
 *   Content
 * </div>
 */
export function usePrefersReducedMotion() {
  const prefersReduced = ref(prefersReducedMotion())
  let cleanup

  onMounted(() => {
    cleanup = onPrefersReducedMotionChange(({ matches }) => {
      prefersReduced.value = matches
    })
  })

  onUnmounted(() => cleanup?.())

  return prefersReduced
}
