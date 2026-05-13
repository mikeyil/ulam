// @ulam/sili/remix: Remix adapter for @ulam/sili focus management
// Drop-in replacement for @ulam/sili/react when migrating to Remix.
// Import from @ulam/sili/remix instead of @ulam/sili/react in Remix route modules.

// All sili React hooks are re-exported unchanged; they are router-agnostic
export { useFocusTrap }       from '../react/hooks/useFocusTrap.js'
export { useAriaHide }        from '../react/hooks/useAriaHide.js'
export { useReturnFocus }     from '../react/hooks/useReturnFocus.js'
export { useEscapeKey }       from '../react/hooks/useEscapeKey.js'
export { useFocusOnMount }    from '../react/hooks/useFocusOnMount.js'
export { useFocusOnChange }   from '../react/hooks/useFocusOnChange.js'
export { usePaginationFocus } from '../react/hooks/usePaginationFocus.js'
export { useDir }             from '../react/hooks/useDir.js'
export { useMediaQuery }      from '../react/hooks/useMediaQuery.js'

// Overlay components are router-agnostic; re-exported unchanged
export { default as Modal }       from '../react/components/ModalReact.jsx'
export { default as Drawer }      from '../react/components/DrawerReact.jsx'
export { default as Sheet }       from '../react/components/SheetReact.jsx'

// Remix-backed router hooks: replace @ulam/sili/react hash-router equivalents
export { useRouter, useRouteMatch } from './router/useRouter.js'

// No-op shim: migrate call sites to Remix meta exports, then delete
export { usePageTitle } from './router/usePageTitle.js'

// Vanilla adapter (no framework dependency)
export { mountRouteFocus, focusPageHeading } from './routeFocus.js'
