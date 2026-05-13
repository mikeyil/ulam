# @ulam/taho

ARIA live region announcer. Vanilla core with React and Remix adapters.

Named for taho, the Filipino street drink: warm, light, and always there when you need it.

## Packages

Taho is one of four ulam packages:

```text
ulam
├── @ulam/ube          sweet  : UI, components, CSS, theming, router, announce
├── @ulam/calamansi    sour   : i18n, hooks, utilities, logic
├── @ulam/taho         warm   : ARIA live region announcer  ← you are here
└── @ulam/sawsawan     bridge : wires the three together
```

## Install

```bash
npm install @ulam/taho
```

## Usage

### Vanilla (no framework)

```js
import { announce } from '@ulam/taho'

announce('Settings: Saved')
announce('Error: Invalid key', { priority: 'assertive' })
```

No setup required. The live region DOM nodes are created lazily on first call and persist for the lifetime of the page.

### React

```jsx
import { Announcer, announce, useAnnounce } from '@ulam/taho/react'
// or: import { Announcer, announce, useAnnounce } from '@ulam/taho/bayabas'

// Mount once at app root
<Announcer />

// Direct call from anywhere
announce('Copy: Copied to clipboard')

// Hook style inside a component
const announce = useAnnounce()
announce('Search: 12 results')
```

### Remix

```jsx
import { Announcer, useRouteAnnouncer } from '@ulam/taho/remix'
// or: import { Announcer, useRouteAnnouncer } from '@ulam/taho/pandan'

// In root.jsx
export default function Root() {
  useRouteAnnouncer()
  return (
    <>
      <Announcer />
      <Outlet />
    </>
  )
}
```

`useRouteAnnouncer` announces route transitions to screen readers. Remix does not manage focus or announcements on client-side navigations -- this hook fills that gap.

### Vanilla route announcer

```js
import { mountRouteAnnouncer } from '@ulam/taho/remix'

const unmount = mountRouteAnnouncer()
// or with a custom label:
const unmount = mountRouteAnnouncer(() => document.querySelector('h1')?.textContent ?? document.title)

// clean up on teardown
unmount()
```

## Subpath exports

| Import | Alias | Contents |
| ------ | ----- | -------- |
| `@ulam/taho` | -- | Vanilla core: `announce`, `clearAnnouncements` |
| `@ulam/taho/react` | `@ulam/taho/bayabas` | React adapter: `Announcer`, `useAnnounce` + vanilla re-exports |
| `@ulam/taho/remix` | `@ulam/taho/pandan` | Remix adapter: `useRouteAnnouncer`, `mountRouteAnnouncer`, `notifyRouteChange` + React re-exports |

## Message format

Prefix announcements with context: `"Settings: Saved"` not `"Saved"`. Bare messages are ambiguous to screen reader users who may have missed where the action came from.

## Priority

- `'polite'` (default) -- waits for a natural pause. Use for confirmations, results, background updates.
- `'assertive'` -- interrupts immediately. Use only for errors and urgent alerts.

## What not to announce

Do not announce focus-managed transitions (modals opening, page navigation). Screen readers announce focus targets automatically. Only announce things the user cannot see or that happen outside their current focus.

## Implementation

Two always-in-DOM live regions with auto-clearing after ~1 second. Duplicate messages re-announce reliably via a clear-then-set cycle. Adapted from `@react-aria/live-announcer` (Adobe, Apache-2.0).

## License

MIT
