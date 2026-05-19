import { useEffect, useRef } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useAriaHide } from '../hooks/useAriaHide.js'
import { useEscapeKey } from '../hooks/useEscapeKey.js'
import { returnFocus } from '../../core/returnFocus.js'
import { getInitialFocusTarget } from '../../core/getInitialFocusTarget.js'
import DrawerPrimitive from './Drawer.jsx'

/**
 * Drawer with automatic focus management per WCAG 2.4.3.
 *
 * Focus strategy:
 * 1. Look for an element with tabindex="-1" (usually heading) — best practice
 * 2. Fall back to first focusable element (button, input, link, etc.)
 * 3. Override with focusElementRef if provided (advanced use; be careful)
 * 4. Last resort: focus the panel container (initialFocusContainer={true})
 *
 * Props:
 *   open, onClose: core overlay props
 *   focusOnClose: deprecated; use returnFocusRef instead (from parent OverlayManager)
 *   focusElementRef: override which element to focus on open
 *   initialFocusContainer: if true, focus the panel container instead
 *   children: overlay content
 */
export default function Drawer({ open, onClose, focusOnClose, focusElementRef, initialFocusContainer, children, ...rest }) {
  const triggerRef = useRef(null)
  const panelRef = useRef(null)

  useFocusTrap(panelRef, open)
  useAriaHide(panelRef, open)
  useEscapeKey(open, onClose)

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement

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

        focusTarget.focus()
      })
    } else {
      returnFocus(focusOnClose?.current ?? triggerRef.current)
    }
  }, [open, focusOnClose, focusElementRef, initialFocusContainer])

  return (
    <DrawerPrimitive open={open} onClose={onClose} panelRef={panelRef} {...rest}>
      {children}
    </DrawerPrimitive>
  )
}
