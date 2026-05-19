/**
 * @ulam/sili/vue: Vue composables adapter
 *
 * All composables wrap the same vanilla sili core used by the React adapter.
 * The vanilla functions (trapFocus, hideBackground, etc.) are also re-exported
 * and can be called directly from setup() or outside components.
 */
export {
  trapFocus,
  getFocusable,
  hideBackground,
  returnFocus,
  onEscapeKey,
  lockScroll,
  onKeydown,
  dispatchKeyCommand,
  prefersReducedMotion,
  onPrefersReducedMotionChange,
  snapshotFlipPositions,
  animateFlipList,
} from '../core/index.js'

export { useFocusTrap } from './useFocusTrap.js'
export { useAriaHide } from './useAriaHide.js'
export { useReturnFocus } from './useReturnFocus.js'
export { useEscapeKey } from './useEscapeKey.js'
export { useFocusOnMount } from './useFocusOnMount.js'
export { useFocusOnChange } from './useFocusOnChange.js'
export { usePaginationFocus } from './usePaginationFocus.js'
export { useDir } from './useDir.js'
export { useMediaQuery } from './useMediaQuery.js'
export { usePageTitle } from './usePageTitle.js'
export { useKeydown } from './useKeydown.js'
export { useListNavigation } from './useListNavigation.js'
export { usePrefersReducedMotion } from './usePrefersReducedMotion.js'
export { useFlipList } from './useFlipList.js'

// Vue components (fully wired with sili hooks)
export { default as Dialog } from './Dialog.vue'
export { default as Sheet } from './Sheet.vue'
export { default as Drawer } from './Drawer.vue'

// Primitive shells (structure only, no sili hooks)
export { default as DialogShell } from './DialogShell.vue'
export { default as SheetShell } from './SheetShell.vue'
export { default as DrawerShell } from './DrawerShell.vue'
