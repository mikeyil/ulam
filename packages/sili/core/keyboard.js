/**
 * Vanilla keyboard event management utilities.
 * No framework dependencies — can be used in vanilla JS, React, Vue, Angular, etc.
 */

/**
 * Attach a keydown listener to a target element and clean up.
 *
 * @param {Element} target - DOM element to listen on (or null/undefined → document)
 * @param {Function} handler - Keydown event handler
 * @param {{ capture?: boolean }} [opts]
 *
 * @returns {Function} cleanup function to remove the listener
 *
 * @example
 * const cleanup = onKeydown(document.querySelector('.list'), (e) => {
 *   if (e.key === 'j') focusNext()
 *   if (e.key === 'k') focusPrev()
 * })
 * // later...
 * cleanup()
 */
export function onKeydown(target, handler, { capture = false } = {}) {
  const el = target ?? document
  el.addEventListener('keydown', handler, capture)
  return () => el.removeEventListener('keydown', handler, capture)
}

/**
 * Generic keyboard event dispatcher.
 * Maps key names to handler functions and dispatches on match.
 *
 * @param {KeyboardEvent} event - keyboard event
 * @param {Object} commands - object mapping key names (or key combinations) to handler functions
 * @param {{ skipWhenFocusedOn?: string }} [opts]
 *   skipWhenFocusedOn — CSS selector to skip handling (e.g., 'input[type="search"]')
 *
 * @example
 * document.addEventListener('keydown', (e) => {
 *   dispatchKeyCommand(e, {
 *     'j': () => focusNext(),
 *     'k': () => focusPrev(),
 *     'Shift+ArrowUp': () => rankUp(),
 *     'Shift+ArrowDown': () => rankDown(),
 *   }, { skipWhenFocusedOn: 'input[type="search"]' })
 * })
 */
export function dispatchKeyCommand(event, commands = {}, { skipWhenFocusedOn = null } = {}) {
  const focused = document.activeElement
  if (!focused) return

  // Skip if typing in excluded element
  if (skipWhenFocusedOn && focused.matches(skipWhenFocusedOn)) return

  // Build compound key name for Shift+Arrow variants
  let keyName = event.key.toLowerCase()
  if (event.shiftKey && (event.key === 'ArrowUp' || event.key === '↑')) {
    keyName = 'Shift+ArrowUp'
  } else if (event.shiftKey && (event.key === 'ArrowDown' || event.key === '↓')) {
    keyName = 'Shift+ArrowDown'
  }

  const handler = commands[keyName]
  if (!handler) return

  event.preventDefault()
  handler(event)
}

/**
 * Reactive wrapper around prefers-reduced-motion media query.
 * Returns true when user has enabled reduced motion preferences.
 *
 * @returns {boolean} true if prefers-reduced-motion: reduce is active
 *
 * @example
 * if (!prefersReducedMotion()) {
 *   el.style.transition = 'opacity 300ms'
 * }
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Watch prefers-reduced-motion and invoke callback on change.
 *
 * @param {Function} callback - called with { matches: boolean } when preference changes
 *
 * @returns {Function} cleanup function to stop listening
 *
 * @example
 * const cleanup = onPrefersReducedMotionChange(({ matches }) => {
 *   console.log('reduced motion:', matches)
 * })
 * cleanup()
 */
export function onPrefersReducedMotionChange(callback) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}
