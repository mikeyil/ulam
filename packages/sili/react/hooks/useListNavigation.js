import { useCallback, useRef } from 'react'
import { useKeydown } from './useKeydown.js'

/**
 * React hook for keyboard navigation in focusable list items.
 *
 * Provides vim-style j/k navigation, custom action shortcuts, and smart context awareness.
 * Integrates with ref-based focus management (items must have stable refs in a provided object).
 *
 * @param {React.RefObject} listRef - ref to the list container
 * @param {Object} config
 *   items          — array of displayable items (result of filtering/sorting)
 *   itemRefs       — object mapping item IDs to their ref.current focus targets
 *   commands       — object mapping key names to handler functions:
 *                    { 'j': (item, idx) => {}, 'k': (item, idx) => {}, ... }
 *   skipWhenFocusedOn — CSS selector to skip keyboard handling (e.g., 'input[type="search"]')
 *   getCurrentIndex  — function(focusedElement) => index in items array (optional, auto-detected by default)
 *
 * @example
 * useListNavigation(listRef, {
 *   items: displayResults,
 *   itemRefs: itemRefs.current,
 *   commands: {
 *     'j': (item, idx) => { focusNext() },
 *     'k': (item, idx) => { focusPrev() },
 *     's': (item, idx) => { announce('starred') }
 *   },
 *   skipWhenFocusedOn: 'input[type="search"]'
 * })
 */
export function useListNavigation(listRef, { items = [], itemRefs = {}, commands = {}, skipWhenFocusedOn = null, getCurrentIndex = null }) {
  const itemsRef = useRef(items)
  itemsRef.current = items

  const handleKeyDown = useCallback((e) => {
    if (!listRef.current) return

    const focused = document.activeElement
    if (!focused) return

    // Skip if typing in excluded element
    if (skipWhenFocusedOn && focused.matches(skipWhenFocusedOn)) return

    // Find current index in items
    let currentIndex = -1
    if (getCurrentIndex) {
      currentIndex = getCurrentIndex(focused)
    } else {
      currentIndex = itemsRef.current.findIndex(item => itemRefs[item.id] === focused)
    }

    if (currentIndex === -1) return

    const currentItem = itemsRef.current[currentIndex]
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
  }, [listRef, itemRefs, commands, skipWhenFocusedOn, getCurrentIndex])

  useKeydown(handleKeyDown, { target: listRef })
}
