import { useEffect, useRef } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useAriaHide } from '../hooks/useAriaHide.js'
import { returnFocus } from '../../core/returnFocus.js'
import { getInitialFocusTarget } from '../../core/getInitialFocusTarget.js'
import { onEscapeKey } from '../../core/escapeKey.js'
import DialogPrimitive from './Dialog.jsx'

/**
 * Dialog with automatic focus management per WCAG 2.4.3.
 *
 * Focus strategy:
 * 1. Look for an element with tabindex="-1" (usually heading) — best practice
 * 2. Fall back to first focusable element (button, input, link, etc.)
 * 3. Override with focusElementRef if provided (advanced use; be careful not to skip content)
 * 4. Last resort: focus the panel container (initialFocusContainer={true})
 *
 * Props:
 *   open, onClose, returnFocusRef: core overlay props
 *   focusElementRef: override which element to focus on open (use with caution)
 *   initialFocusContainer: if true, focus the panel container instead of content (fallback only)
 *   children: overlay content
 */
export default function Dialog({ open, onClose, returnFocusRef, focusElementRef, initialFocusContainer, children, ...rest }) {
  const autoTriggerRef = useRef(null)
  const panelRef = useRef(null)

  useFocusTrap(panelRef, open)
  useAriaHide(panelRef, open)

  useEffect(() => {
    if (open) {
      if (!returnFocusRef) autoTriggerRef.current = document.activeElement
      requestAnimationFrame(() => {
        if (!panelRef.current) return

        let focusTarget = null

        // Priority 1: explicit override
        if (focusElementRef?.current) {
          focusTarget = focusElementRef.current
        }
        // Priority 2: container focus (explicit override)
        else if (initialFocusContainer) {
          focusTarget = panelRef.current
        }
        // Priority 3: find best target in content (WCAG 2.4.3)
        else {
          focusTarget = getInitialFocusTarget(panelRef.current)
        }

        // Fallback to container if nothing found
        if (!focusTarget) {
          focusTarget = panelRef.current
        }

        focusTarget.focus({ preventScroll: true })
        focusTarget.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      })
    } else {
      returnFocus(returnFocusRef?.current ?? autoTriggerRef.current)
    }
  }, [open, returnFocusRef, focusElementRef, initialFocusContainer])

  // Capture phase so this fires before Drawer / Sheet Escape handlers
  useEffect(() => {
    if (!open) return
    return onEscapeKey(onClose, { useCapture: true, stopPropagation: true })
  }, [open, onClose])

  return (
    <DialogPrimitive open={open} onClose={onClose} panelRef={panelRef} {...rest}>
      {children}
    </DialogPrimitive>
  )
}
