/**
 * Vanilla aria-disabled interaction blocking.
 *
 * aria-disabled = "true" means: the element is in the DOM, focusable via Tab, but non-interactive.
 * This utility blocks keyboard (Space/Enter), click, and touch interactions.
 *
 * On touch, blocking touchstart prevents touchmove and touchend, which effectively blocks
 * gesture handlers like onSwipeGesture (which attach with passive: false and expect touchstart
 * to possibly be prevented).
 *
 * Standalone usage on any element:
 *   import { setAriaDisabled } from '@ulam/ube/core/ariaDisabled.js'
 *   const link = document.querySelector('a.btn')
 *   setAriaDisabled(link, true)   // disables; sets aria-disabled + listeners
 *   setAriaDisabled(link, false)  // enables; removes aria-disabled + listeners
 *
 *   // Or manually:
 *   el.setAttribute('aria-disabled', 'true')
 *   const cleanup = applyAriaDisabled(el)
 *   // ... later ...
 *   cleanup()  // removes listeners, caller removes aria-disabled attr
 *
 * In web components:
 *   this._ariaDisabledCleanup?.()
 *   this._ariaDisabledCleanup = applyAriaDisabled(this)
 */

/**
 * Check if a keydown event is Space or Enter (the two aria-disabled keys to block).
 *
 * @param {KeyboardEvent} e
 * @returns {boolean}
 */
export function isAriaDisabledKeydown(e) {
  return e.key === ' ' || e.key === 'Enter'
}

/**
 * Attach listeners that block keyboard, click, and touch/swipe interactions.
 * Does not set aria-disabled attribute — caller must set it before or after.
 *
 * @param {HTMLElement} el
 * @param {Object} [opts]
 * @param {Function} [opts.onInteractionBlocked] - optional callback on blocked interaction
 * @returns {Function} cleanup function — removes all listeners
 */
export function applyAriaDisabled(el, { onInteractionBlocked } = {}) {
  const handleKeydown = (e) => {
    if (isAriaDisabledKeydown(e)) {
      e.preventDefault()
      onInteractionBlocked?.()
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    onInteractionBlocked?.()
  }

  const handleTouchStart = (e) => {
    e.preventDefault()
    onInteractionBlocked?.()
  }

  el.addEventListener('keydown', handleKeydown, false)
  el.addEventListener('click', handleClick, false)
  el.addEventListener('touchstart', handleTouchStart, false)

  return () => {
    el.removeEventListener('keydown', handleKeydown, false)
    el.removeEventListener('click', handleClick, false)
    el.removeEventListener('touchstart', handleTouchStart, false)
  }
}

/**
 * Check if an element is a native control or custom control (inherently actionable).
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function isControl(el) {
  const tagName = el.tagName.toLowerCase()
  const role = el.getAttribute('role')

  // Native controls
  if (['button', 'a', 'input', 'select', 'textarea'].includes(tagName)) {
    return true
  }

  // Custom controls with explicit role
  if (role && ['button', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'switch', 'link'].includes(role)) {
    return true
  }

  // Custom web components (assume they're controls if they're registered)
  if (tagName.includes('-')) {
    return true
  }

  return false
}

/**
 * Convenience function: toggle aria-disabled on any element.
 * Manages the attribute and listener lifecycle automatically.
 * Only works on native controls (button, a, input, select, textarea) or elements with
 * explicit control roles (button, menuitem, switch, link) or custom web components.
 *
 * @param {HTMLElement} el
 * @param {boolean} disabled
 * @param {Object} [opts]
 * @param {Function} [opts.onInteractionBlocked] - optional callback on blocked interaction
 * @throws {TypeError} if element is not a control
 */
export function setAriaDisabled(el, disabled, opts = {}) {
  if (!isControl(el)) {
    throw new TypeError(
      `setAriaDisabled() requires a native control (button, a, input, select, textarea) or ` +
      `an element with an explicit control role (button, switch, menuitem, link) or a custom web component. ` +
      `Received: <${el.tagName.toLowerCase()}>`
    )
  }

  if (!el._ariaDisabledCleanup) {
    el._ariaDisabledCleanup = null
  }

  if (disabled) {
    el.setAttribute('aria-disabled', 'true')
    el._ariaDisabledCleanup?.()
    el._ariaDisabledCleanup = applyAriaDisabled(el, opts)
  } else {
    el.removeAttribute('aria-disabled')
    el._ariaDisabledCleanup?.()
    el._ariaDisabledCleanup = null
  }
}
