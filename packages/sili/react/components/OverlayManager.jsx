import { useMemo } from 'react'
import { Dialog, Sheet, Drawer } from '@ulam/sili/react'

/**
 * OverlayManager: Generic overlay orchestration component.
 *
 * Supports single active overlay at a time with smooth transitions.
 * When transitioning between overlays, the current overlay closes before
 * the next one opens, allowing for sequential (drawer→sheet), same-type
 * (dialog→dialog, sheet→sheet), or navigation transitions.
 *
 * Props:
 *   overlays: Array of overlay configs { id, type, heading, content, actions, etc. }
 *   activeId: ID of currently active overlay (null = no overlay open)
 *   onClose: Callback when user closes overlay
 *   returnFocusRef: Optional ref to restore focus on close
 */
export default function OverlayManager({
  overlays = [],
  activeId = null,
  onClose = () => {},
  returnFocusRef = null,
}) {
  const activeOverlay = useMemo(
    () => overlays.find(o => o.id === activeId),
    [overlays, activeId]
  )

  if (!activeOverlay) return null

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

  switch (type) {
    case 'dialog':
      return (
        <Dialog
          open={isOpen}
          onClose={onClose}
          heading={heading}
          actions={actions}
          returnFocusRef={overlayReturnFocusRef || returnFocusRef}
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
          returnFocusRef={overlayReturnFocusRef || returnFocusRef}
          hideCloseBottom={hideCloseBottom}
        >
          {content || children}
        </Sheet>
      )

    case 'drawer':
      return (
        <Drawer
          open={isOpen}
          onClose={onClose}
          label={label || heading}
          focusOnClose={focusOnClose || overlayReturnFocusRef}
        >
          {content || children}
        </Drawer>
      )

    default:
      return null
  }
}
