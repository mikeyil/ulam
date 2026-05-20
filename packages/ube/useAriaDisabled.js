import { useEffect } from 'react'
import { applyAriaDisabled, isAriaDisabledKeydown } from './core/ariaDisabled.js'

// React hook wrapping the vanilla aria-disabled utility
// Manages aria-disabled attribute, blocks keyboard/click/touch interactions
export function useAriaDisabled(ref, disabled) {
  useEffect(() => {
    if (!ref || !ref.current) return
    if (disabled) {
      return applyAriaDisabled(ref.current)
    } else {
      ref.current.removeAttribute('aria-disabled')
    }
  }, [ref, disabled])
}

// Backward compatibility: old hook for raw keydown event handlers
export function useAriaDisabledKeydown(isDisabled) {
  return (e) => {
    if (isDisabled && isAriaDisabledKeydown(e)) {
      e.preventDefault()
    }
  }
}
