import { onMounted, onUnmounted } from 'vue'
import { onKeydown } from '../core/keyboard.js'

/**
 * Vue composable wrapper around onKeydown vanilla utility.
 * Attach a keydown listener to a target element and clean up on unmount.
 *
 * @param {Function} handler - Keydown event handler. Should be stable.
 * @param {{ target?: Element|Ref<Element>, capture?: boolean }} [opts]
 *   target  — DOM node, Vue ref, or null/undefined (falls back to document).
 *   capture — whether to use capture phase (default false).
 *
 * @example
 * import { useKeydown } from '@ulam/sili/vue'
 * import { ref } from 'vue'
 *
 * const listRef = ref(null)
 * const handleKeyDown = (e) => {
 *   if (e.key === 'j') focusNext()
 * }
 *
 * useKeydown(handleKeyDown, { target: listRef })
 */
export function useKeydown(handler, { target, capture = false } = {}) {
  let cleanup

  onMounted(() => {
    const el = target && 'value' in target ? target.value : (target ?? document)
    if (!el) return
    cleanup = onKeydown(el, handler, { capture })
  })

  onUnmounted(() => cleanup?.())
}
