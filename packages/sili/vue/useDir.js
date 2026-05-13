import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Returns a reactive ref containing the current document writing direction
 * ('ltr' or 'rtl'). Updates automatically whenever document.documentElement.dir
 * changes.
 */
export function useDir() {
  const dir = ref(document.documentElement.dir || 'ltr')
  let observer = null

  onMounted(() => {
    observer = new MutationObserver(() => {
      dir.value = document.documentElement.dir || 'ltr'
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] })
  })

  onUnmounted(() => { observer?.disconnect() })

  return dir
}
