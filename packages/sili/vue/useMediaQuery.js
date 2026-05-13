import { ref, watchEffect, onUnmounted } from 'vue'

/**
 * Reactive wrapper around window.matchMedia. Returns a ref that is true when
 * the query matches and updates automatically as the viewport changes.
 *
 * Usage:
 *   const isDesktop = useMediaQuery('(width >= 768px)')
 */
export function useMediaQuery(query) {
  const mq = window.matchMedia(query)
  const matches = ref(mq.matches)

  const handler = (e) => { matches.value = e.matches }
  mq.addEventListener('change', handler)
  onUnmounted(() => mq.removeEventListener('change', handler))

  return matches
}
