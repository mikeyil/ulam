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
} from '../core/index.js'

export { FocusTrapService } from './FocusTrapService.js'
export { FocusTrapDirective } from './FocusTrapDirective.js'
export { AriaHideService } from './AriaHideService.js'
export { EscapeKeyService } from './EscapeKeyService.js'
export { ScrollLockService } from './ScrollLockService.js'
export { FocusOnMountDirective } from './FocusOnMountDirective.js'
