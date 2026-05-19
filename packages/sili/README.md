# @ulam/sili

Focus management, ARIA hide, escape key, scroll lock, and routing hooks. Vanilla core with React, Remix, Vue, and Angular adapters.

Named for sili, the Filipino chili pepper: small, sharp, does exactly what it needs to.

## The ulam framework

```text
ulam
├── @ulam/sili         hot    : focus management, overlays, routing  ← you are here
├── @ulam/taho         warm   : ARIA live region announcer
├── @ulam/calamansi    sour   : i18n, hooks, utilities, logic
├── @ulam/ube          sweet  : React UI components, theming
└── @ulam/sawsawan     bridge : wires the above together
```

## Install

```bash
npm install @ulam/sili
```

## Usage

### Vanilla

```js
import { trapFocus, getFocusable, hideBackground, returnFocus, onEscapeKey, lockScroll } from '@ulam/sili'

// Focus trap
const release = trapFocus(containerEl)
release()

// Get all focusable elements
const focusable = getFocusable(containerEl)

// ARIA hide background content while an overlay is open
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

### React route focus

Move focus to the page heading after each client-side navigation:

```js
import { mountRouteFocus } from '@ulam/sili/react'

const unmount = mountRouteFocus()
unmount() // clean up on teardown
```

Or call manually from a router callback:

```js
import { focusPageHeading } from '@ulam/sili/react'

router.on('navigate', () => focusPageHeading())
```

### React hooks

```jsx
import {
  useFocusTrap,
  useAriaHide,
  useReturnFocus,
  useEscapeKey,
  useFocusOnMount,
  useFocusOnChange,
  usePaginationFocus,
  useDir,
  useMediaQuery,
  usePageTitle,
} from '@ulam/sili/react'

// Focus trap
const containerRef = useRef(null)
useFocusTrap(containerRef, isOpen)

// Focus the heading when a page or panel mounts
const headingRef = useFocusOnMount()
<h1 ref={headingRef} tabIndex={-1}>Page Title</h1>

// Restore focus to the trigger element when this component unmounts
useReturnFocus()

// Dismiss on Escape
useEscapeKey(() => onClose(), isOpen)

// RTL-aware direction, reactive to html[dir]
const dir = useDir() // 'ltr' | 'rtl'

// Set document.title
usePageTitle('Settings')
```

### Overlay components (React)

```jsx
import { Dialog, Drawer, Sheet } from '@ulam/sili/react'

<Dialog open={isOpen} onClose={close} heading="Confirm deletion" actions={[...]}>
  ...
</Dialog>

<Drawer open={isOpen} onClose={close} label="Filters">
  ...
</Drawer>

<Sheet open={isOpen} onClose={close} label="Details">
  ...
</Sheet>
```

All three overlays handle focus trap, ARIA hide, Escape to dismiss, and return focus automatically.

### OverlayManager: Multi-overlay orchestration

For apps with multiple overlays that need to transition between each other (dialog → sheet, drawer → panel, etc.), use `OverlayManager` to handle focus management across all transitions:

```jsx
import { OverlayManager } from '@ulam/sili/react'

const overlays = [
  {
    id: 'confirmDelete',
    type: 'dialog',
    heading: 'Delete item?',
    content: <p>This action cannot be undone.</p>,
    actions: [
      { label: 'Delete', onClick: () => handleDelete(), className: 'btn--danger' },
      { label: 'Cancel', onClick: () => closeOverlay(), className: 'btn--secondary' },
    ],
  },
  {
    id: 'filters',
    type: 'drawer',
    label: 'Filter options',
    content: <FilterPanel />,
  },
  {
    id: 'details',
    type: 'sheet',
    label: 'Item details',
    heading: 'Details',
    content: <DetailsPanel />,
    returnFocusRef={detailsTriggerRef}, // restore focus here on close
  },
]

<OverlayManager
  overlays={overlays}
  activeId={activeOverlayId}
  onClose={handleCloseOverlay}
  baseReturnFocusRef={defaultFocusRef}
/>
```

**Layer order (automatic focus management):**
- Screen: 0 (lowest)
- Drawer/Panel: 1
- Sheet: 2
- Dialog: 3 (highest)

**Transition rules:**
- **Higher → Lower**: Current overlay closes, focus moves to target
- **Lower → Higher**: Lower layer stays open (inert), higher overlay opens with focus
- **Same level**: Current closes, new opens, focus in new

This means dialog can stack on top of any layer, sheet stacks on drawer/panel, but closing always moves focus correctly based on the layer hierarchy.

### Remix

`@ulam/sili/remix` is a drop-in replacement for `@ulam/sili/react` in Remix apps. All focus hooks and overlay components are identical. The hash router is replaced with Remix-backed router hooks.

```jsx
import { useRouter, useRouteMatch, mountRouteFocus } from '@ulam/sili/remix'
```

## Why Remix needs this

Remix and React Router v7 do not manage focus on route change. Their official docs reference Marcy Sutton's 2019 user research and acknowledge focus management as important, but nothing is implemented. An open discussion in the remix-run/react-router repo (#9555) has been unresolved since at least January 2025, with the core team noting it conflicts with scroll restoration.

Without explicit focus management, keyboard and screen reader users have no consistent entry point into a new route. They may remain focused on a now-removed element, or at a stale position in the document.

SvelteKit moves focus to `<body>` after every navigation by default, with opt-in customization. React Router does nothing.

User research (Sutton, 2019) found that moving focus to the page's main `<h1>` heading was the most preferred pattern among disabled users. `mountRouteFocus` and `focusPageHeading` implement this pattern.

Pair with `@ulam/taho/remix` for complete coverage. Sili handles moving keyboard focus to the new content; taho handles the screen reader announcement.

### Vue

All composables in `@ulam/sili/vue` wrap the same vanilla sili core used by the React adapter. They accept Vue `ref`s instead of React refs and use `watchEffect`/`onMounted`/`onUnmounted` instead of `useEffect`.

```js
import {
  useFocusTrap,
  useAriaHide,
  useReturnFocus,
  useEscapeKey,
  useFocusOnMount,
  useDir,
  useMediaQuery,
  usePageTitle,
} from '@ulam/sili/vue'
```

```vue
<script setup>
import { ref } from 'vue'
import { useFocusTrap, useAriaHide, useReturnFocus, useEscapeKey } from '@ulam/sili/vue'

const props = defineProps(['open'])
const emit = defineEmits(['close'])
const panelRef = ref(null)

useFocusTrap(panelRef, () => props.open)
useAriaHide(panelRef, () => props.open)
useReturnFocus()
useEscapeKey(() => props.open, () => emit('close'))
</script>

<template>
  <div v-if="open" ref="panelRef">
    <slot />
  </div>
</template>
```

`useDir()` returns a reactive ref (`'ltr'` or `'rtl'`) that updates whenever `html[dir]` changes. `useMediaQuery(query)` returns a reactive boolean ref.

`useFocusOnMount()` returns a template ref; attach it to any element with `tabindex="-1"` to receive focus when the component mounts (WCAG 2.4.3).

The vanilla functions are also re-exported from `@ulam/sili/vue` for cases where you need them outside a component.

### Angular

The Angular adapter provides injectable services and standalone directives. All services are `providedIn: 'root'` and tree-shakeable. Directives are standalone and can be imported directly into component `imports` arrays without a shared module.

```ts
import {
  FocusTrapDirective,
  FocusOnMountDirective,
  AriaHideService,
  EscapeKeyService,
  ScrollLockService,
} from '@ulam/sili/angular'
```

**Declarative focus trap (directive):**

```ts
@Component({
  imports: [FocusTrapDirective],
  template: `<div [siliTrapFocus]="isOpen"><ng-content /></div>`
})
export class ModalComponent {
  @Input() isOpen = false
}
```

The `[siliTrapFocus]` directive activates and deactivates the focus trap whenever its input changes.

**Focus on mount (directive):**

```html
<h1 siliFocusOnMount tabindex="-1">Page Title</h1>
```

Attach `siliFocusOnMount` to any element with `tabindex="-1"` to move focus to it when the view initializes (WCAG 2.4.3).

**Programmatic services:**

```ts
@Component({ ... })
export class DrawerComponent implements OnInit, OnDestroy {
  private ariaHide = inject(AriaHideService)
  private escapeKey = inject(EscapeKeyService)
  private scrollLock = inject(ScrollLockService)
  private el = inject(ElementRef)

  #cleanups = []

  open() {
    this.#cleanups.push(
      this.ariaHide.hide(this.el.nativeElement),
      this.escapeKey.listen(() => this.close()),
      this.scrollLock.lock()
    )
  }

  close() {
    this.#cleanups.forEach(fn => fn())
    this.#cleanups = []
  }
}
```

Each service method returns a cleanup function that reverses exactly what it set, making stacking safe (multiple overlays do not interfere with each other).

## Subpath exports

| Import | Contents |
| ------ | -------- |
| `@ulam/sili` | Vanilla core: `trapFocus`, `getFocusable`, `hideBackground`, `returnFocus`, `onEscapeKey`, `lockScroll` |
| `@ulam/sili/react` | React hooks, overlay components, hash router |
| `@ulam/sili/remix` | Remix adapter: same hooks and overlays, Remix router instead of hash router |
| `@ulam/sili/vue` | Vue composables: all hooks, vanilla re-exports |
| `@ulam/sili/angular` | Angular services and directives, vanilla re-exports |

## Overlay components

| Component | Description |
| --------- | ----------- |
| `Dialog` | Centered modal dialog, stacks at z-index 301 |
| `Drawer` | Slide-in panel from the left |
| `Sheet` | Slide-up bottom sheet, collapses on desktop |

Primitive versions (`DialogPrimitive`, `DrawerPrimitive`, `SheetPrimitive`) are also exported. Structure only, no built-in focus management, for cases where you need full control.

## Where sili stops (app responsibility)

Sili provides **generic focus management foundations**. Your app provides **app-specific behavior**:

| Aspect | Sili (generic) | Your app (specific) |
| ------ | -------------- | ------------------- |
| Focus trap, escape, return focus | ✓ Handles automatically | — |
| Layer order (screen=0, dialog=3) | ✓ Defines the hierarchy | — |
| Transition rules (higher→lower, etc.) | ✓ Implements automatically | — |
| Which overlay is active | — | ✓ Manage `activeId` |
| Overlay state (open/close booleans) | — | ✓ Track state in your component |
| Focus target on close (where focus lands) | — | ✓ Pass `returnFocusRef` per overlay |
| Content of each overlay | — | ✓ Define config with headings, content, actions |
| App-level focus patterns | — | ✓ Handle (e.g., "closing sheet focuses results area") |

**Example: A11yFred's approach**

A11yFred uses a centralized overlay manager (A11yOverlayManager) that:
- Tracks all app overlay state (viewAllConfirm, pendingEntry, privacy sheet, etc.)
- Determines `activeId` based on state priority
- Passes `returnFocusRef` for each overlay to sili's OverlayManager
- Provides overlay configs with app-specific content, headings, actions
- Handles app-specific focus behavior (where focus goes when closing)

Sili just orchestrates the generic parts; a11yfred provides the app logic.

## Focus rules (WCAG 2.4.3)

1. New page: focus the main heading (`tabIndex={-1}`)
2. Modal open: focus first focusable element (usually close button)
3. Modal close: restore focus to trigger (`useReturnFocus`)
4. Overlay open: set background inert (`useAriaHide`)
5. Escape: each overlay layer handles its own
6. Paginated content: use `usePaginationFocus` on page change
7. Accordion: leave focus on the trigger, do not use `useFocusOnMount` on the panel

## License

MIT
