import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Vue composable for keyboard navigation in focusable list items.
 *
 * Provides vim-style j/k navigation, custom action shortcuts, and smart context awareness.
 * Integrates with ref-based focus management (items must have stable refs accessible via ID).
 *
 * @param {{ target?: Ref<Element>, items?: any[], itemRefs?: Object, commands?: Object, skipWhenFocusedOn?: string, getCurrentIndex?: Function }} config
 *   target          — Vue ref to the list container (or null → document)
 *   items           — array of displayable items (result of filtering/sorting)
 *   itemRefs        — object mapping item IDs to DOM elements for focus
 *   commands        — object mapping key names to handler functions:
 *                     { 'j': (item, idx) => {}, 'k': (item, idx) => {}, ... }
 *   skipWhenFocusedOn — CSS selector to skip keyboard handling (e.g., 'input[type="search"]')
 *   getCurrentIndex  — function(focusedElement) => index in items array (optional, auto-detected by default)
 *
 * @example
 * import { useListNavigation } from '@ulam/sili/vue'
 * import { ref } from 'vue'
 *
 * export default {
 *   setup() {
 *     const listRef = ref(null)
 *     const itemRefs = ref({})
 *     const results = ref([...])
 *
 *     useListNavigation({
 *       target: listRef,
 *       items: results,
 *       itemRefs: itemRefs.value,
 *       commands: {
 *         'j': (item, idx) => { focusNext() },
 *         'k': (item, idx) => { focusPrev() },
 *         's': (item, idx) => { toggleStar(item.id) }
 *       },
 *       skipWhenFocusedOn: 'input[type="search"]'
 *     })
 *
 *     return { listRef, itemRefs, results }
 *   }
 * }
 *
 * <ul :ref="listRef">
 *   <li v-for="item in results" :key="item.id"
 *       :ref="el => { itemRefs[item.id] = el }"
 *       tabindex="0">
 *     {{ item.title }}
 *   </li>
 * </ul>
 */
export function useListNavigation({ target, items = [], itemRefs = {}, commands = {}, skipWhenFocusedOn = null, getCurrentIndex = null } = {}) {
  const itemsRef = ref(items)
  let cleanup

  const handleKeyDown = (e) => {
    const listEl = target && 'value' in target ? target.value : target
    if (!listEl) return

    const focused = document.activeElement
    if (!focused) return

    // Skip if typing in excluded element
    if (skipWhenFocusedOn && focused.matches(skipWhenFocusedOn)) return

    // Find current index in items
    let currentIndex = -1
    if (getCurrentIndex) {
      currentIndex = getCurrentIndex(focused)
    } else {
      currentIndex = itemsRef.value.findIndex(item => itemRefs[item.id] === focused)
    }

    if (currentIndex === -1) return

    const currentItem = itemsRef.value[currentIndex]
    const keyName = e.key.toLowerCase()
    const handler = commands[keyName]

    if (!handler) {
      // Check for Shift+Arrow variants
      if (e.shiftKey && (e.key === 'ArrowUp' || e.key === '↑')) {
        const shiftUpHandler = commands['Shift+ArrowUp']
        if (shiftUpHandler) {
          e.preventDefault()
          shiftUpHandler(currentItem, currentIndex)
        }
      } else if (e.shiftKey && (e.key === 'ArrowDown' || e.key === '↓')) {
        const shiftDownHandler = commands['Shift+ArrowDown']
        if (shiftDownHandler) {
          e.preventDefault()
          shiftDownHandler(currentItem, currentIndex)
        }
      }
      return
    }

    e.preventDefault()
    handler(currentItem, currentIndex)
  }

  onMounted(() => {
    const listEl = target && 'value' in target ? target.value : (target ?? document)
    if (!listEl) return
    listEl.addEventListener('keydown', handleKeyDown)
    cleanup = () => listEl.removeEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => cleanup?.())
}
