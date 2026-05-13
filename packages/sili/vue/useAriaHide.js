import { watchEffect, onUnmounted } from 'vue'
import { hideBackground } from '../core/ariaHide.js'

/**
 * Hides all document.body children from the a11y tree while the overlay is open,
 * then restores them when it closes. Stacking-safe.
 *
 * @param {Ref<HTMLElement|null>} panelRef - template ref for the overlay panel element
 * @param {Ref<boolean>|boolean} open      - whether the overlay is currently visible
 */
export function useAriaHide(panelRef, open) {
  let cleanup = null

  watchEffect(() => {
    if (cleanup) { cleanup(); cleanup = null }
    const isOpen = typeof open === 'object' ? open.value : open
    if (isOpen && panelRef.value) {
      cleanup = hideBackground(panelRef.value)
    }
  })

  onUnmounted(() => { if (cleanup) cleanup() })
}
