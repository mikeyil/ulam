/**
 * Vanilla utility for aria-disabled state management.
 * No framework dependency. Used by web components and React adapters.
 *
 * Blocks Space/Enter keydown, click, and touchstart/swipe initiation.
 * Keeps element in tab order (unlike HTML disabled attribute).
 */

export function applyAriaDisabled(el) {
  el.setAttribute('aria-disabled', 'true')

  const onKeydown = (e) => {
    if (isAriaDisabledKeydown(e)) {
      e.preventDefault()
    }
  }

  const onBlock = (e) => {
    e.preventDefault()
  }

  el.addEventListener('keydown', onKeydown)
  el.addEventListener('click', onBlock)
  el.addEventListener('touchstart', onBlock, { passive: false })

  return () => {
    el.removeAttribute('aria-disabled')
    el.removeEventListener('keydown', onKeydown)
    el.removeEventListener('click', onBlock)
    el.removeEventListener('touchstart', onBlock)
  }
}

export function isAriaDisabledKeydown(e) {
  return e.key === ' ' || e.key === 'Enter'
}
