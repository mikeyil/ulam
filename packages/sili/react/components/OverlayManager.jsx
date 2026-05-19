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
 * Props:
 *   overlays: Array of overlay configs { id, type, heading, content, actions, returnFocusRef, etc. }
 *   activeId: ID of currently active overlay (null = no overlay open)
 *   onClose: Callback when user closes overlay
 *   baseReturnFocusRef: Default focus target when all overlays close
 */
export default function OverlayManager({
  overlays = [],
  activeId = null,
  onClose = () => {},
  baseReturnFocusRef = null,
}) {
  const baseTriggerRef = useRef(null)
  const baseTitleRef = useRef(null)

  // Track base trigger (element focused before any overlay opened)
  useEffect(() => {
    if (activeId && !baseTriggerRef.current) {
      baseTriggerRef.current = document.activeElement
    }
  }, [activeId])

  // Clear base trigger when all overlays closed
  useEffect(() => {
    if (!activeId && baseTriggerRef.current) {
      baseTriggerRef.current = null
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
  } = activeOverlay

  const isOpen = activeId === activeOverlay.id

  // Determine effective returnFocusRef: overlay-specific > baseReturnFocusRef > baseTrigger
  const effectiveReturnFocusRef = overlayReturnFocusRef || baseReturnFocusRef || baseTriggerRef.current

  switch (type) {
    case 'dialog':
      return (
        <Dialog
          open={isOpen}
          onClose={onClose}
          heading={heading}
          actions={actions}
          returnFocusRef={effectiveReturnFocusRef}
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
        >
          {content || children}
        </Drawer>
      )

    default:
      return null
  }
}
