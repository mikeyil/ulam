/**
 * FLIP animation utilities (First, Last, Invert, Play).
 * Vanilla JS — no framework dependencies.
 *
 * Smoothly animate list items when their order changes without explicit animation triggers.
 */

/**
 * Snapshot the current positions of list items before a re-sort.
 * Call this immediately before you trigger a sort/re-render that changes item order.
 *
 * @param {Element} listEl - container with [data-flip-id] children
 *
 * @returns {Object} position map to pass to animateFlipList after re-sort
 *
 * @example
 * const snapshot = snapshotFlipPositions(ul)
 * setSorted(newOrder)  // trigger re-sort
 * // callback or Promise should then call animateFlipList
 */
export function snapshotFlipPositions(listEl) {
  if (!listEl) return {}
  const map = {}
  listEl.querySelectorAll('[data-flip-id]').forEach(el => {
    map[el.dataset.flipId] = el.getBoundingClientRect().top
  })
  return map
}

/**
 * Animate items from old positions to new positions using FLIP.
 * Call this after a re-sort has already occurred (items are in their new positions).
 *
 * @param {Element} listEl - container with [data-flip-id] children
 * @param {Object} snapshot - position map from snapshotFlipPositions
 * @param {{ duration?: number, easing?: string }} [opts]
 *   duration — animation time in ms (default 320)
 *   easing   — CSS easing function (default cubic-bezier(0.25, 0.46, 0.45, 0.94))
 *
 * @example
 * const snapshot = snapshotFlipPositions(ul)
 * setSorted(newOrder)
 * // React useLayoutEffect, Promise.then, setTimeout, etc.:
 * animateFlipList(ul, snapshot)
 */
export function animateFlipList(listEl, snapshot = {}, { duration = 320, easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' } = {}) {
  if (!listEl) return

  listEl.querySelectorAll('[data-flip-id]').forEach(el => {
    const id = el.dataset.flipId
    const prevTop = snapshot[id]
    if (prevTop === undefined) return

    const nextTop = el.getBoundingClientRect().top
    const delta = prevTop - nextTop
    if (delta === 0) return

    // Apply inverse transform so element appears to stay in place
    el.style.transform = `translateY(${delta}px)`
    el.style.transition = 'none'

    // Force reflow so the browser registers the starting position
    el.getBoundingClientRect()

    // Play forward: animate to natural position
    el.style.transform = ''
    el.style.transition = `transform ${duration}ms ${easing}`

    function cleanup() {
      el.style.transition = ''
      el.removeEventListener('transitionend', cleanup)
    }
    el.addEventListener('transitionend', cleanup)
  })
}
