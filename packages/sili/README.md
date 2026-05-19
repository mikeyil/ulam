# @ulam/sili

Focus management, ARIA hide, escape key, scroll lock, and routing hooks. Vanilla core with React, Remix, Vue, and Angular adapters.

Named for sili, the Filipino chili pepper: small, sharp, does exactly what it needs to.

## Purpose & Scope

**What sili does:**

- Focus management for keyboard and screen reader users (WCAG 2.4.3)
- Overlay orchestration (Dialog, Sheet, Drawer, Panel transitions)
- Automatic focus restoration on close
- Escape key handling for overlays
- Scroll locking during overlays
- Route-based focus management (move focus to page heading on navigation)
- Page title management for navigation-level overlays
- ARIA hiding of background content

**What sili doesn't do:**

- UI component rendering (use @ulam/ube or your own components)
- State management (you manage overlay state, pass to sili)
- Content of overlays (you define what goes in each overlay)
- Styling beyond structural focus/ARIA states (use your own CSS)

**Who should use sili:**

- React, Remix, Vue, or Angular apps with overlays or focus management needs
- SPAs requiring route-based focus management
- Custom overlay systems needing automatic focus orchestration
- Accessibility-first projects requiring WCAG 2.4.3 compliance

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

```javascript
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

```javascript
import { mountRouteFocus } from '@ulam/sili/react'

const unmount = mountRouteFocus()
unmount() // clean up on teardown
```

Or call manually from a router callback:

```javascript
import { focusPageHeading } from '@ulam/sili/react'

router.on('navigate', () => focusPageHeading())
```

### React hooks

```javascript
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

```javascript
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

```javascript
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
/>
```

**Layer order (0–3, lowest to highest):**

| Layer | Type | Escape Key | Notes |
| --- | --- | --- | --- |
| 0 | Screen (page content) | ✗ Not closeable | Base layer; never overlaid |
| 1 | Drawer/Panel | ✓ Closeable | Slides in from side; dismissible |
| 2 | Sheet | ✓ Closeable | Bottom sheet or full-width slide-up; dismissible (unless `collapsed`) |
| 3 | Dialog | ✓ Closeable | Modal dialog; intercepts Escape first (capture phase) |

**Escape key behavior:**

- **Dialog** (layer 3): Closes immediately on Escape (capture phase) before lower layers
- **Drawer** (layer 1): Closes on Escape if no dialog is open
- **Sheet** (layer 2): Closes on Escape if not `collapsed`; capture phase allows Dialog to intercept
- **Screen** (layer 0): Cannot be closed; Escape is not handled

**Transition rules when closing:**

- **Higher → Lower**: Current overlay closes, focus returns to previous overlay or trigger
- **Lower → Higher**: Lower layer stays open (inert), higher overlay opens with focus trap
- **Same level**: Current closes, new opens, focus moves to new overlay

Example: If a Dialog opens over a Drawer, pressing Escape closes the Dialog. Pressing Escape again closes the Drawer. Layer 3 always wins on Escape because Dialog uses `useCapture: true, stopPropagation: true`.

**Page title management:**

- Non-dialog overlays (drawer, panel, sheet) can set `pageTitle` in their config
- OverlayManager tracks the base page title (before any overlays opened)
- When a non-dialog overlay opens, page title updates to its `pageTitle`
- When all overlays close, page title restores to the base
- Dialogs cannot change page title (they're transient, not navigation destinations)

```javascript
const overlays = [
  {
    id: 'settings',
    type: 'drawer',
    label: 'Settings',
    pageTitle: 'Settings',  // Updates document.title
    content: <SettingsPanel />,
  },
  {
    id: 'confirmDelete',
    type: 'dialog',
    heading: 'Confirm deletion',
    pageTitle: 'Delete?',   // Ignored - dialogs don't change page title
    content: <p>This cannot be undone.</p>,
  },
]
```

### Remix

`@ulam/sili/remix` is a drop-in replacement for `@ulam/sili/react` in Remix apps. All focus hooks and overlay components are identical. The hash router is replaced with Remix-backed router hooks.

```javascript
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

```javascript
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

### Example: A11yFred's approach

A11yFred uses a centralized overlay manager (A11yOverlayManager) that:

- Tracks all app overlay state (viewAllConfirm, pendingEntry, privacy sheet, etc.)
- Determines `activeId` based on state priority
- Passes `returnFocusRef` for each overlay to sili's OverlayManager
- Provides overlay configs with app-specific content, headings, actions
- Handles app-specific focus behavior (where focus goes when closing)

Sili just orchestrates the generic parts; a11yfred provides the app logic.

## Focus rules (WCAG 2.4.3)

**Sili's default focus strategy (best practice):**

When an overlay opens, focus moves in this order:

1. Any element with `tabIndex={-1}` (typically a heading: `<h2 tabIndex={-1}>Modal Title</h2>`)
2. First focusable element (button, input, link, etc.)
3. The overlay container itself (fallback if nothing focusable found)

This matches WCAG 2.4.3 guidance: "Give focus to the first heading or first item in dialog content."

**Focus overrides (advanced):**

If the default doesn't work for your overlay, you can override with:

```javascript
{
  id: 'myOverlay',
  type: 'dialog',
  heading: 'Title',
  focusElementRef: customRef,        // focus a specific element
  initialFocusContainer: true,       // focus the overlay container instead
}
```

⚠️ **Warning**: Skipping content to place focus lower on the page breaks keyboard navigation and screen reader orientation. Only override if you have a strong UX reason and have tested with actual users.

**Overlay close and return focus:**

Sili automatically tracks which element was focused before the overlay opened. When the overlay closes, focus returns to that element by default. Override with `returnFocusRef` to restore focus elsewhere:

```javascript
{
  id: 'filter',
  type: 'sheet',
  returnFocusRef: resultsAreaRef,  // focus results after closing filter
}
```

**Other focus rules:**

- **New page/route**: Focus the main heading (`<h1 tabIndex={-1}>{title}</h1>`) using `mountRouteFocus()` or manual `focusPageHeading()`
- **Background**: ARIA hide + inert when any overlay is open
- **Escape**: Each overlay layer handles its own Escape key
- **Paginated content**: Use `usePaginationFocus` on page change
- **Accordion**: Leave focus on the trigger; do not use `useFocusOnMount` on the panel

## API Reference

### Vanilla Core

#### `trapFocus(container)`

Installs a focus trap on `container`. Tab/Shift+Tab wrap focus to first/last focusable element.

- **Params**: `container: HTMLElement`
- **Returns**: `cleanup: () => void`

#### `getFocusable(container)`

Returns all focusable elements within `container` (buttons, inputs, links, custom tabindex).

- **Params**: `container: HTMLElement`
- **Returns**: `HTMLElement[]`

#### `hideBackground(element)`

Sets `aria-hidden="true"` and `inert` on all elements outside `element` while it's open.

- **Params**: `element: HTMLElement`
- **Returns**: `restore: () => void`

#### `returnFocus(element)`

Moves focus to `element` (or previously-focused element if not provided).

- **Params**: `element?: HTMLElement`
- **Returns**: `void`

#### `onEscapeKey(callback, options?)`

Calls `callback` when user presses Escape. Options: `{ useCapture?: boolean, stopPropagation?: boolean }`

- **Params**: `callback: () => void, options?: object`
- **Returns**: `off: () => void`

#### `lockScroll()`

Prevents body scroll by setting `overflow: hidden`. Re-entrant (multiple calls stack safely).

- **Returns**: `unlock: () => void`

### React Hooks

#### `useFocusTrap(ref, enabled)`

Activates focus trap on element when `enabled` is true.

#### `useAriaHide(ref, enabled)`

Hides background (aria-hidden + inert) when `enabled` is true.

#### `useEscapeKey(enabled, callback)`

Listens for Escape key when `enabled` is true.

#### `useReturnFocus(element?)`

Saves current focus and restores on component unmount.

#### `useFocusOnMount()`

Returns a ref to attach to an element (e.g., heading) that should receive focus on mount.

#### `usePageTitle(title)`

Sets `document.title` on mount, restores on unmount.

#### `useDir()`

Returns `'ltr'` or `'rtl'` based on `html[dir]` attribute. Reactive.

#### `useMediaQuery(query)`

Returns boolean based on media query match. Reactive.

### React Components

#### `<Dialog open={bool} onClose={fn} heading={str} actions={[]} />`

Centered modal dialog. Auto-manages focus trap, ARIA hide, Escape key, return focus.

**Focus props:**

- `focusElementRef?: ref` — Focus this element on open (advanced override)
- `initialFocusContainer?: bool` — Focus the container instead of content

#### `<Sheet open={bool} onClose={fn} collapsed={bool} />`

Bottom sheet overlay. Collapses on desktop.

**Sheet-specific props:**

- `collapsed?: bool` — Is the sheet collapsed?
- `onCollapse?: (bool) => void` — Collapse state changed
- `hideCloseBottom?: bool` — Don't show close button at bottom
- Same focus props as Dialog

#### `<Drawer open={bool} onClose={fn} label={str} />`

Side drawer from left edge. Same focus props as Dialog.

#### `<OverlayManager overlays={[]} activeId={str} onClose={fn} />`

Multi-overlay orchestration. Manages focus across transitions, layer ordering, page titles.

**Overlay config shape:**

```javascript
{
  id: string,
  type: 'dialog' | 'sheet' | 'drawer' | 'panel',
  heading?: string,        // used by all
  label?: string,          // used by drawer/sheet/panel
  content?: ReactNode,     // overlay content
  children?: ReactNode,    // same as content
  actions?: [{ label, onClick, className }],  // dialog/overlay footer buttons
  
  // Focus management
  focusElementRef?: ref,        // focus this element on open
  initialFocusContainer?: bool, // focus container instead
  
  // Return focus on close
  returnFocusRef?: ref,   // restore focus here (instead of trigger)
  
  // Page title (non-dialog overlays only)
  pageTitle?: string,     // set document.title
  
  // Sheet-specific
  collapsed?: bool,
  onCollapse?: (bool) => void,
  hideCloseBottom?: bool,
}
```

### Remix Adapter

Drop-in replacement for React. Exports same hooks and components. Router hooks:

#### `useRouter()`

Returns current route, push(path), back(), forward().

#### `useRouteMatch(pattern)`

Returns true if current route matches pattern (glob-style).

#### `mountRouteFocus()`

Auto-focuses page heading on each route change. Call once at app root.

### Vue Composables

Same API as React hooks. Accept Vue `ref` instead of React `ref`, use Vue lifecycle methods instead of useEffect.

```javascript
import { useFocusTrap, useDir, usePageTitle } from '@ulam/sili/vue'

const containerRef = ref(null)
const dir = ref('ltr')

useFocusTrap(containerRef, isOpen)
dir.value = useDir() // reactive
usePageTitle('Page Title')
```

## Common Patterns

### Single Overlay (Dialog/Sheet/Drawer)

For a single overlay, use the component directly with state management:

```javascript
const [isOpen, setIsOpen] = useState(false)

return (
  <>
    <button onClick={() => setIsOpen(true)}>Open</button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} heading="Title">
      Content here
    </Dialog>
  </>
)
```

### Multiple Overlays with OverlayManager

For apps with multiple overlays that transition between each other:

```javascript
const [activeId, setActiveId] = useState(null)

const overlays = [
  { id: 'confirm', type: 'dialog', heading: 'Confirm?', ... },
  { id: 'details', type: 'sheet', heading: 'Details', ... },
]

return <OverlayManager overlays={overlays} activeId={activeId} onClose={() => setActiveId(null)} />
```

### Custom Initial Focus

Focus an element other than the default (heading or first focusable):

```javascript
const customRef = useRef(null)

<Dialog
  open={isOpen}
  onClose={onClose}
  heading="Title"
  focusElementRef={customRef}
>
  <input ref={customRef} placeholder="Focus on this input" />
</Dialog>
```

Or focus the container (for content-heavy panels):

```javascript
<Sheet
  open={isOpen}
  onClose={onClose}
  initialFocusContainer={true}
>
  Large scrollable content...
</Sheet>
```

### Route Focus Management

Auto-focus page heading on route change:

```javascript
import { mountRouteFocus } from '@ulam/sili/react'

useEffect(() => {
  const unmount = mountRouteFocus()
  return unmount
}, [])
```

Or manually:

```javascript
import { focusPageHeading } from '@ulam/sili/react'

router.on('navigate', () => focusPageHeading())
```

## License

MIT
