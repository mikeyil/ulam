# @ulam/taho

ARIA live region announcer. Vanilla core with React, Remix, Vue, and Angular adapters.

Named for taho, the Filipino street drink: warm, light, and always there when you need it.

## The ulam framework

```text
ulam
├── @ulam/taho         warm   : ARIA live region announcer  ← you are here
├── @ulam/sili         hot    : focus management, overlays, routing
├── @ulam/calamansi    sour   : i18n, hooks, utilities, logic
├── @ulam/ube          sweet  : React UI components, theming
└── @ulam/sauce     bridge : wires the above together
```

## Install

```bash
npm install @ulam/taho
```

## Usage

### Vanilla

No setup required. The live region DOM nodes are created lazily on first call.

```javascript
import { announce } from '@ulam/taho'

announce('Settings saved')
announce('Invalid key', { priority: 'assertive' })
```

### React

```javascript
import { Announcer, announce, useAnnounce } from '@ulam/taho/react'

// Mount once at app root
<Announcer />

// From anywhere in the app
announce('Copy: copied to clipboard')

// Or via hook inside a component
const announce = useAnnounce()
announce('Search: 12 results')
```

### Remix

```javascript
import { Announcer, useRouteAnnouncer } from '@ulam/taho/remix'

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

```javascript
import { mountRouteAnnouncer } from '@ulam/taho/remix'

const unmount = mountRouteAnnouncer()

// Custom label resolver (recommended):
const unmount = mountRouteAnnouncer(
  () => document.querySelector('h1')?.textContent ?? document.title
)

unmount() // clean up on teardown
```

For routers that do not fire browser navigation events:

```javascript
import { notifyRouteChange } from '@ulam/taho/remix'

router.on('navigate', ({ pathname }) => notifyRouteChange(pathname))
```

## Why Remix needs this

Remix and React Router v7 do not announce route changes to screen readers. Their official docs acknowledge that "screen-reader users benefit from announcements when a route has changed" but provide no built-in solution, noting only that they are "actively investigating" the problem. That investigation has not shipped.

Without an explicit announcement, screen reader users have no signal that navigation occurred. They can be left reading stale content with no indication the page changed.

SvelteKit ships a built-in route announcer. Nuxt added one in v4.4. React Router does not have one.

The pattern here follows the research-backed guidance from Marcy Sutton's 2019 user testing with disabled users: announce the new page to a live region after navigation settles, using the page heading or document title as the announcement string.

Pair with `@ulam/sili/remix` for complete coverage. Taho handles the screen reader announcement; sili handles moving keyboard focus to the new content.

### Vue

The vanilla `announce()` function works in Vue without any adapter. Call it directly from `<script setup>` or composables. The Vue adapter provides a composable for consistency with Vue's Composition API style.

```javascript
import { useAnnounce } from '@ulam/taho/vue'

// Inside setup()
const announce = useAnnounce()
announce('Settings: Saved')

// Or import vanilla directly (both are equivalent)
import { announce } from '@ulam/taho'
announce('Settings: Saved')
```

`useAnnounce()` returns the same vanilla `announce` function. There is no reactivity overhead. The composable exists purely so Vue developers can use a consistent `use*` import style.

### Angular

The Angular adapter provides an injectable `AnnounceService` wrapping the vanilla core.

```typescript
import { AnnounceService } from '@ulam/taho/angular'

@Component({ ... })
export class SettingsComponent {
  constructor(private announcer: AnnounceService) {}

  save() {
    // ... save logic
    this.announcer.announce('Settings: Saved')
  }
}
```

`AnnounceService` is `providedIn: 'root'`. No module or explicit provider needed. Import it and inject it anywhere.

For Angular 14+ standalone apps, you can also call `provideAnnounce()` explicitly in `bootstrapApplication()`, though this is optional since the service is already root-provided.

## Subpath exports

| Import | Contents |
| ------ | -------- |
| `@ulam/taho` | Vanilla core: `announce`, `clearAnnouncements` |
| `@ulam/taho/react` | `Announcer`, `useAnnounce`, vanilla re-exports |
| `@ulam/taho/remix` | `useRouteAnnouncer`, `mountRouteAnnouncer`, `notifyRouteChange`, React re-exports |
| `@ulam/taho/vue` | `useAnnounce`, vanilla re-exports |
| `@ulam/taho/angular` | `AnnounceService`, `provideAnnounce` |

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
