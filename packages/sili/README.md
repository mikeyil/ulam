# @ulam/sili

Focus management, ARIA hide, escape key, scroll lock, and routing hooks. Vanilla core with React and Remix adapters.

Named for sili, the Filipino chili pepper: small, sharp, does exactly what it needs to.

## Packages

Sili is one of four ulam packages:

```text
ulam
├── @ulam/ube          sweet  : UI, components, CSS, theming, router, announce
├── @ulam/calamansi    sour   : i18n, hooks, utilities, logic
├── @ulam/sili         hot    : focus management, overlays, routing  ← you are here
└── @ulam/sawsawan     bridge : wires the three together
```

## Install

```bash
npm install @ulam/sili
```

## Usage

### Vanilla (no framework)

```js
import { trapFocus, getFocusable, hideBackground, returnFocus, onEscapeKey, lockScroll } from '@ulam/sili'

// Focus trap
const release = trapFocus(containerEl)
release() // restore

// Get all focusable elements
const focusable = getFocusable(containerEl)

// ARIA hide background content
const restore = hideBackground(panelEl)
restore()

// Return focus to the previously focused element
returnFocus()

// Escape key handler
const off = onEscapeKey(() => closeModal())
off()

// Scroll lock
const unlock = lockScroll()
unlock()
```

### React

```jsx
import {
  useFocusTrap, useAriaHide, useReturnFocus, useEscapeKey,
  useFocusOnMount, useFocusOnChange, usePaginationFocus,
  useDir, useMediaQuery, usePageTitle,
  Modal, Drawer, Sheet,
  Router, useRouter,
} from '@ulam/sili/react'
// or: import { ... } from '@ulam/sili/labuyo'

// Focus trap
const containerRef = useRef(null)
useFocusTrap(containerRef, isOpen)

// Focus on mount (page headings, modal open)
const headingRef = useFocusOnMount()
<h1 ref={headingRef} tabIndex={-1}>Page Title</h1>

// Restore focus to trigger on unmount
useReturnFocus()

// Escape key
useEscapeKey(() => onClose(), isOpen)

// RTL-aware direction
const dir = useDir() // 'ltr' | 'rtl'

// Page title
usePageTitle('Settings')

// Hash-based SPA router
<Router>
  <AppShell />
</Router>

const { route, navigate } = useRouter()
```

### Remix

```jsx
import {
  useFocusTrap, useAriaHide, useReturnFocus, useEscapeKey,
  useFocusOnMount, useFocusOnChange, usePaginationFocus,
  useDir, useMediaQuery,
  Modal, Drawer, Sheet,
  useRouter, useRouteMatch,
  mountRouteFocus, focusPageHeading,
} from '@ulam/sili/remix'
// or: import { ... } from '@ulam/sili/mahaba'
```

`@ulam/sili/remix` is a drop-in replacement for `@ulam/sili/react` in Remix apps. All focus hooks and overlay components are identical. The hash router is replaced with Remix-backed router hooks.

## Subpath exports

| Import | Alias | Contents |
| ------ | ----- | -------- |
| `@ulam/sili` | -- | Vanilla core: `trapFocus`, `getFocusable`, `hideBackground`, `returnFocus`, `onEscapeKey`, `lockScroll` |
| `@ulam/sili/react` | `@ulam/sili/labuyo` | React hooks + overlay components + hash router |
| `@ulam/sili/remix` | `@ulam/sili/mahaba` | Remix adapter -- same hooks and overlays, Remix router replaces hash router |

## Overlay components

All three overlays handle focus trap, ARIA hide, escape to dismiss, and return focus automatically.

| Component | Description |
| --------- | ----------- |
| `Modal` | Centered dialog, stacks at z-index 301 |
| `Drawer` | Slide-in panel from the left |
| `Sheet` | Slide-up bottom sheet, collapses on desktop |

Primitive versions (`ModalPrimitive`, `DrawerPrimitive`, `SheetPrimitive`) are also exported -- structure only, no focus management, for cases where you need full control.

## Focus rules (WCAG 2.4.3)

1. New page: focus the main heading (`tabIndex={-1}`)
2. Modal open: focus first focusable element (usually close button)
3. Modal close: restore focus to trigger (`useReturnFocus`)
4. Overlay open: set background inert (`useAriaHide`)
5. Escape: each overlay layer handles its own
6. Paginated content: use `usePaginationFocus` on page change
7. Accordion: leave focus on trigger, do not use `useFocusOnMount` on content

## License

MIT
