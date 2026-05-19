import { useMemo } from 'react'
import { Dialog, Sheet, Drawer } from '@ulam/sili/react'

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
    type = 'modal',
    heading,
    label,
    content,
    actions = [],
    children,
    collapsed,
    onCollapse,
    hideCloseBottom,
    focusOnClose,
    heading: sheetHeading,
    closeLabel,
  } = activeOverlay

  const isOpen = activeId === activeOverlay.id

  switch (type) {
    case 'dialog':
    case 'modal':
      return (
        <Dialog
          open={isOpen}
          onClose={onClose}
          heading={heading}
          actions={actions}
          returnFocusRef={returnFocusRef}
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
          heading={sheetHeading || heading}
          closeLabel={closeLabel}
          returnFocusRef={returnFocusRef}
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
          focusOnClose={focusOnClose}
        >
          {content || children}
        </Drawer>
      )

    default:
      return null
  }
}
