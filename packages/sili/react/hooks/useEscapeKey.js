import { useEffect } from 'react'
import { onEscapeKey } from '../../core/escapeKey.js'

export function useEscapeKey(isActive, onEscape) {
  useEffect(() => {
    if (!isActive) return
    return onEscapeKey(onEscape)
  }, [isActive, onEscape])
}
