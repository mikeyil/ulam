import { ref, watch } from 'vue'

/**
 * Focuses the container element when the page number changes, but only if the
 * inner HTML actually changed (guards against re-renders without new content).
 *
 * @param {Ref<HTMLElement|null>} containerRef
 * @param {Ref<number>}           page
 */
export function usePaginationFocus(containerRef, page) {
  const prevHtml = ref('')

  watch(page, () => {
    const el = containerRef.value
    if (!el) return
    if (el.innerHTML !== prevHtml.value) {
      prevHtml.value = el.innerHTML
      el.focus()
    }
  })
}
