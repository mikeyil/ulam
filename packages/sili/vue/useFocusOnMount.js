import { ref, onMounted } from 'vue'

/**
 * Returns a template ref. Attach it to any element with tabindex="-1" and
 * that element will receive programmatic focus the moment it mounts (WCAG 2.4.3).
 *
 * Usage:
 *   const headingRef = useFocusOnMount()
 *   <h2 :ref="headingRef" tabindex="-1">Settings</h2>
 */
export function useFocusOnMount() {
  const elRef = ref(null)
  onMounted(() => { elRef.value?.focus() })
  return elRef
}
