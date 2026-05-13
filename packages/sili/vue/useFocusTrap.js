import { watchEffect, onUnmounted } from 'vue'
import { trapFocus } from '../core/focusTrap.js'

/**
 * Restricts Tab / Shift+Tab to elements within the given element ref while active.
 *
 * @param {Ref<HTMLElement|null>} elRef  - template ref for the container element
 * @param {Ref<boolean>|boolean} active  - trap is only active when true
 */
export function useFocusTrap(elRef, active) {
  let cleanup = null

  watchEffect(() => {
    if (cleanup) { cleanup(); cleanup = null }
    const isActive = typeof active === 'object' ? active.value : active
    if (isActive && elRef.value) {
      cleanup = trapFocus(elRef.value)
    }
  })

  onUnmounted(() => { if (cleanup) cleanup() })
}
