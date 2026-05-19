// @ulam/sili/remix: Remix 3+ adapter for @ulam/sili focus management
// Framework-agnostic vanilla utilities with Remix-specific routing

export {
  trapFocus,
  getFocusable,
  hideBackground,
  returnFocus,
  onEscapeKey,
  lockScroll,
} from '../core/index.js'

export { useRouter, useRouteMatch } from './router/useRouter.js'

export { mountRouteFocus, focusPageHeading } from './routeFocus.js'
