const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Find the best focus target in a container for WCAG 2.4.3 compliance.
 * Returns: tabindex=-1 element (heading), first focusable element, or null
 *
 * Strategy:
 * 1. Look for an element with tabindex="-1" (usually a heading made focusable)
 * 2. Fall back to first focusable element (button, input, link, etc.)
 * 3. Return null if nothing found (rare; caller should handle)
 *
 * @param {HTMLElement} container
 * @returns {HTMLElement | null}
 */
export function getInitialFocusTarget(container) {
  if (!container) return null

  // First choice: element with tabindex="-1" (intended focus target like a heading)
  const tabindexTarget = container.querySelector('[tabindex="-1"]')
  if (tabindexTarget && !tabindexTarget.closest('[inert]')) {
    return tabindexTarget
  }

  // Second choice: first focusable element
  const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
    (el) => !el.closest('[inert]')
  )
  return focusable[0] ?? null
}
