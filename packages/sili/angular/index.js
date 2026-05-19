/**
 * @ulam/sili/angular: Angular adapter
 *
 * Injectable services and standalone directives wrapping the vanilla sili core.
 * All services are tree-shakeable (providedIn: 'root'). Directives are standalone
 * and can be imported directly into components without a shared module.
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

export { FocusTrapService } from './focus-trap.service.ts'
export { FocusTrapDirective } from './focus-trap.directive.ts'
export { AriaHideService } from './aria-hide.service.ts'
export { EscapeKeyService } from './escape-key.service.ts'
export { ScrollLockService } from './scroll-lock.service.ts'
export { FocusOnMountDirective } from './focus-on-mount.directive.ts'
export { KeyboardService } from './keyboard.service.ts'
export { AnimationService } from './animation.service.ts'
export { ListNavigationDirective, type ListNavigationConfig } from './list-navigation.directive.ts'
