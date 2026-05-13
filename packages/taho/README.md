# @ulam/taho

ARIA live region announcer. Vanilla core with React and Remix adapters.

Named for taho, the Filipino street drink: warm, light, and always there when you need it.

## The ulam framework

```text
ulam
├── @ulam/taho         warm   : ARIA live region announcer  ← you are here
├── @ulam/sili         hot    : focus management, overlays, routing
├── @ulam/calamansi    sour   : i18n, hooks, utilities, logic
├── @ulam/ube          sweet  : React UI components, theming
└── @ulam/sawsawan     bridge : wires the above together
```

## Install

```bash
npm install @ulam/taho
```

## Usage

### Vanilla

No setup required. The live region DOM nodes are created lazily on first call.

```js
import { announce } from '@ulam/taho'

announce('Settings saved')
announce('Invalid key', { priority: 'assertive' })
```

### React

```jsx
import { Announcer, announce, useAnnounce } from '@ulam/taho/react'
// alias: @ulam/taho/bayabas

// Mount once at app root
<Announcer />

// From anywhere in the app
announce('Copy: copied to clipboard')

// Or via hook inside a component
const announce = useAnnounce()
announce('Search: 12 results')
```

### Remix

```jsx
import { Announcer, useRouteAnnouncer } from '@ulam/taho/remix'
// alias: @ulam/taho/pandan

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

### Vanilla route announcer

For any router that fires browser navigation events:

```js
import { mountRouteAnnouncer } from '@ulam/taho/remix'

const unmount = mountRouteAnnouncer()

// Custom label resolver (recommended):
const unmount = mountRouteAnnouncer(
  () => document.querySelector('h1')?.textContent ?? document.title
)

unmount() // clean up on teardown
```

For routers that do not fire browser navigation events:

```js
import { notifyRouteChange } from '@ulam/taho/remix'

router.on('navigate', ({ pathname }) => notifyRouteChange(pathname))
```

## Why Remix needs this

Remix and React Router v7 do not announce route changes to screen readers. Their official docs acknowledge that "screen-reader users benefit from announcements when a route has changed" but provide no built-in solution, noting only that they are "actively investigating" the problem. That investigation has not shipped.

Without an explicit announcement, screen reader users have no signal that navigation occurred. They can be left reading stale content with no indication the page changed.

SvelteKit ships a built-in route announcer. Nuxt added one in v4.4. React Router does not have one.

The pattern here follows the research-backed guidance from Marcy Sutton's 2019 user testing with disabled users: announce the new page to a live region after navigation settles, using the page heading or document title as the announcement string.

Pair with `@ulam/sili/remix` for complete coverage. Taho handles the screen reader announcement; sili handles moving keyboard focus to the new content.

## Subpath exports

| Import | Alias | Contents |
| ------ | ----- | -------- |
| `@ulam/taho` | | Vanilla core: `announce`, `clearAnnouncements` |
| `@ulam/taho/react` | `/bayabas` | `Announcer`, `useAnnounce`, vanilla re-exports |
| `@ulam/taho/remix` | `/pandan` | `useRouteAnnouncer`, `mountRouteAnnouncer`, `notifyRouteChange`, React re-exports |

## Message format

Prefix with context: `"Settings: Saved"` not `"Saved"`. Bare messages are ambiguous to screen reader users who may have missed where the action came from.

## Priority

- `'polite'` (default): waits for a natural pause. Use for confirmations, results, background updates.
- `'assertive'`: interrupts immediately. Use only for errors and urgent alerts.

## What not to announce

Do not announce focus-managed transitions like modals opening or page navigation. Screen readers announce focus targets automatically. Only announce things that happen outside the user's current focus.

## Implementation

Two always-in-DOM live regions with auto-clearing after ~1 second. Duplicate messages re-announce reliably via a clear-then-set cycle. Adapted from `@react-aria/live-announcer` (Adobe, Apache-2.0).

## License

MIT
