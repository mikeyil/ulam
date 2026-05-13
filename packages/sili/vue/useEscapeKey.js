import { watchEffect, onUnmounted } from 'vue'
import { onEscapeKey } from '../core/escapeKey.js'

/**
 * Calls onEscape when the Escape key is pressed while active.
 *
 * @param {Ref<boolean>|boolean} isActive
 * @param {() => void}           onEscape
 */
export function useEscapeKey(isActive, onEscape) {
  let cleanup = null

  watchEffect(() => {
    if (cleanup) { cleanup(); cleanup = null }
    const active = typeof isActive === 'object' ? isActive.value : isActive
    if (active) cleanup = onEscapeKey(onEscape)
  })

  onUnmounted(() => { if (cleanup) cleanup() })
}
