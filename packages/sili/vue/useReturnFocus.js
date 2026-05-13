import { onMounted, onUnmounted } from 'vue'
import { returnFocus } from '../core/returnFocus.js'

/**
 * Saves the currently focused element on mount and returns focus to it on unmount.
 * Use in any panel that temporarily takes focus so keyboard users land back where
 * they started after closing.
 */
export function useReturnFocus() {
  let saved = null

  onMounted(() => {
    saved = document.activeElement
  })

  onUnmounted(() => {
    if (saved) returnFocus(saved)
  })
}
