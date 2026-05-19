import { useRef } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useAriaHide } from '../hooks/useAriaHide.js'
import { useEscapeKey } from '../hooks/useEscapeKey.js'
import { useDir } from '../hooks/useDir.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { returnFocus } from '../../core/returnFocus.js'
import { getInitialFocusTarget } from '../../core/getInitialFocusTarget.js'
import { lockScroll } from '../../core/scrollLock.js'
import { useEffect } from 'react'
import Sheet from './Sheet.jsx'

/**
 * Sheet with automatic focus management per WCAG 2.4.3.
 *
 * Focus strategy (when open and not collapsed):
 * 1. Look for an element with tabindex="-1" (usually heading) — best practice
 * 2. Fall back to first focusable element (button, input, link, etc.)
 * 3. Override with focusElementRef if provided (advanced use; be careful)
 * 4. Last resort: focus the panel container (initialFocusContainer={true})
 *
 * Props:
 *   open, onClose, collapsed, returnFocusRef: core overlay props
 *   focusElementRef: override which element to focus on open
 *   initialFocusContainer: if true, focus the panel container instead
 *   children: overlay content
 */
export default function SheetReact({
  open,
  onClose,
  collapsed = false,
  returnFocusRef,
  focusElementRef,
  initialFocusContainer,
  children,
  ...rest
}) {
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const chromeRef = useRef(null)
  const dir = useDir()
  const isDesktop = useMediaQuery('(width >= 768px)')

  useFocusTrap(panelRef, open && !collapsed)
  useAriaHide(panelRef, open && !collapsed)
  useEscapeKey(open && !collapsed, onClose)

  useEffect(() => {
    if (open && !collapsed) {
      if (!returnFocusRef) triggerRef.current = document.activeElement

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
    } else if (!open) {
      returnFocus(returnFocusRef?.current ?? triggerRef.current)
    }
  }, [open, collapsed, returnFocusRef, focusElementRef, initialFocusContainer])

  useEffect(() => {
    if (open && !collapsed) return lockScroll()
  }, [open, collapsed])

  return (
    <Sheet
      open={open}
      onClose={onClose}
      collapsed={collapsed}
      panelRef={panelRef}
      chromeRef={chromeRef}
      dir={dir}
      isDesktop={isDesktop}
      returnFocusRef={returnFocusRef}
      {...rest}
    >
      {children}
    </Sheet>
  )
}
