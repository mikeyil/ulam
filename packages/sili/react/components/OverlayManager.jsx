import { useMemo, useEffect, useRef } from 'react'
import { Dialog, Sheet, Drawer } from '@ulam/sili/react'

/**
 * OverlayManager: Generic overlay orchestration component.
 *
 * Manages focus across overlay transitions using a layering model:
 *   screen = 0 (lowest)
 *   drawer/panel = 1
 *   sheet = 2
 *   dialog = 3 (highest)
 *
 * Transition rules:
 *   Higher → Lower: Close higher, focus lower
 *   Lower → Higher: Keep lower inert, show higher
 *   Same → Same: Close current, open new, focus new
 *
 * Focus on open (WCAG 2.4.3):
 *   Default (best practice):
 *     1. Look for tabindex=-1 element (e.g., <h2 tabIndex={-1}>Heading</h2>)
 *     2. Fall back to first focusable element (button, input, link, etc.)
 *     3. Last resort: focus the container
 *   Overrides (use with caution):
 *     - focusElementRef: focus a specific element (skip content at your peril)
 *     - initialFocusContainer: focus the overlay container instead
 *
 * Focus on close:
 *   - Automatically saves the trigger element (element focused before overlay opened)
 *   - Default return focus: overlay-specific returnFocusRef > saved trigger element
 *   - When all overlays close: focus returns to saved trigger
 *
 * Page titles:
 *   - Non-dialog overlays can set pageTitle prop
 *   - Dialog overlays cannot change page title (transient, not navigation)
 *
 * Props:
 *   overlays: Array of overlay configs
 *     - id, type ('dialog'|'sheet'|'drawer'|'panel'), heading, content, actions
 *     - returnFocusRef (optional): override where focus goes when overlay closes
 *     - focusElementRef (optional): focus a specific element on open (advanced; be careful)
 *     - initialFocusContainer (optional): focus container instead of content on open
 *     - pageTitle (optional, non-dialog only): set document.title
 *   activeId: ID of currently active overlay (null = no overlay open)
 *   onClose: Callback when user closes overlay
 */
export default function OverlayManager({
  overlays = [],
  activeId = null,
  onClose = () => {},
}) {
  const triggerRef = useRef(null)
  const baseTitleRef = useRef(null)

  // Save trigger element (element focused before first overlay opened)
  useEffect(() => {
    if (activeId && !triggerRef.current) {
      triggerRef.current = document.activeElement
    }
  }, [activeId])

  // Clear trigger when all overlays closed
  useEffect(() => {
    if (!activeId && triggerRef.current) {
      triggerRef.current = null
    }
  }, [activeId])

  // Track and manage page titles
  useEffect(() => {
    const activeOverlay = overlays.find(o => o.id === activeId)

    if (!activeOverlay) {
      // All overlays closed: restore base title
      if (baseTitleRef.current) {
        document.title = baseTitleRef.current
      }
      return
    }

    const { type, pageTitle } = activeOverlay

    // Dialog cannot change page title
    if (type === 'dialog') {
      return
    }

    // Non-dialog overlay: update page title if provided
    if (pageTitle) {
      // Save base title on first overlay open
      if (!baseTitleRef.current) {
        baseTitleRef.current = document.title
      }
      document.title = pageTitle
    }
  }, [activeId, overlays])

  const activeOverlay = useMemo(
    () => overlays.find(o => o.id === activeId),
    [overlays, activeId]
  )

  if (!activeOverlay) return null

  // Layer order: screen=0, drawer/panel=1, sheet=2, dialog=3
  const layerMap = {
    screen: 0,
    drawer: 1,
    panel: 1,
    sheet: 2,
    dialog: 3,
  }

  const {
    type = 'dialog',
    heading,
    label,
    content,
    actions = [],
    children,
    collapsed,
    onCollapse,
    hideCloseBottom,
    focusOnClose,
    closeLabel,
    returnFocusRef: overlayReturnFocusRef,
    focusElementRef,
    initialFocusContainer,
  } = activeOverlay

  const isOpen = activeId === activeOverlay.id

  // Determine effective returnFocusRef: overlay-specific > saved trigger element
  const effectiveReturnFocusRef = overlayReturnFocusRef || triggerRef.current

  switch (type) {
    case 'dialog':
      return (
        <Dialog
          open={isOpen}
          onClose={onClose}
          heading={heading}
          actions={actions}
          returnFocusRef={effectiveReturnFocusRef}
          focusElementRef={focusElementRef}
          initialFocusContainer={initialFocusContainer}
        >
          {content || children}
        </Dialog>
      )

    case 'sheet':
      return (
        <Sheet
          open={isOpen}
          onClose={onClose}
          collapsed={collapsed}
          onCollapse={onCollapse}
          label={label || heading}
          heading={heading}
          closeLabel={closeLabel}
          returnFocusRef={effectiveReturnFocusRef}
          hideCloseBottom={hideCloseBottom}
          focusElementRef={focusElementRef}
          initialFocusContainer={initialFocusContainer}
        >
          {content || children}
        </Sheet>
      )

    case 'drawer':
    case 'panel':
      return (
        <Drawer
          open={isOpen}
          onClose={onClose}
          label={label || heading}
          focusOnClose={focusOnClose || effectiveReturnFocusRef}
          focusElementRef={focusElementRef}
          initialFocusContainer={initialFocusContainer}
        >
          {content || children}
        </Drawer>
      )

    default:
      return null
  }
}
