# ulam

Accessibility utilities for the modern web. Vanilla-first, with optional React, Remix, Vue, and Angular adapters.

Named for the Filipino word for dish: the thing everything else is built around.

> Accessibility utilities for the modern web. Focus management, live region announcements, i18n, and UI components, each independently installable, vanilla-first, with optional React, Remix, Vue, and Angular adapters. Named for the Filipino word for dish.

## Packages

| Package | Description |
| ------- | ----------- |
| [`@ulam/taho`](packages/taho) | ARIA live region announcer, route announcer |
| [`@ulam/sili`](packages/sili) | Focus management, overlays, routing hooks |
| [`@ulam/calamansi`](packages/calamansi) | Data-agnostic i18n, locale hooks, logic utilities |
| [`@ulam/halohalo`](packages/halohalo) | AI provider adapters, model config, agentic mode |
| [`@ulam/ube`](packages/ube) | Accessible React UI components, theming, design tokens |
| [`@ulam/sawsawan`](packages/sawsawan) | Integration bridge wiring the above together |

## Architecture

Each package is independently installable. Dependency flow is strictly one direction:

```text
calamansi ──┐
taho ────────┤──► sawsawan
sili ────────┤
ube ─────────┘
```

None of the four core packages import from each other or from sawsawan. Sawsawan is the only package that imports from the others.

## Install

Most packages are vanilla-first with optional framework adapters. Install only what you need:

```bash
npm install @ulam/taho           # vanilla announcer; React, Remix, Vue, Angular adapters optional
npm install @ulam/sili           # vanilla focus management; React, Remix, Vue, Angular adapters optional
npm install @ulam/calamansi      # vanilla i18n; React, Vue, Angular adapters optional
npm install @ulam/halohalo       # vanilla AI adapters; React, Vue, Angular adapters optional
npm install @ulam/ube            # React only: UI components, theming, design tokens
```

Or with npm aliases if you prefer shorter import names:

```bash
npm install taho@npm:@ulam/taho
npm install sili@npm:@ulam/sili
npm install calamansi@npm:@ulam/calamansi
```

## Framework support

Packages with framework-specific behavior ship subpath exports:

| Subpath | Framework | Description |
| ------- | --------- | ----------- |
| `@ulam/taho` | any | Vanilla core |
| `@ulam/taho/react` | React | `useAnnounce`, `Announcer` |
| `@ulam/taho/remix` | Remix | Route announcer, React re-exports |
| `@ulam/taho/vue` | Vue 3 | `useAnnounce` composable |
| `@ulam/taho/angular` | Angular 17+ | `AnnounceService` |
| `@ulam/sili` | any | Vanilla core |
| `@ulam/sili/react` | React | Hooks, overlay components, hash router |
| `@ulam/sili/remix` | Remix | Same hooks, Remix router |
| `@ulam/sili/vue` | Vue 3 | Composables matching all React hooks |
| `@ulam/sili/angular` | Angular 17+ | Services and standalone directives |
| `@ulam/calamansi` | any | Vanilla core |
| `@ulam/calamansi/react` | React | `I18nProvider`, `useT`, `usePref` |
| `@ulam/calamansi/vue` | Vue 3 | `useT`, `usePref` composables |
| `@ulam/calamansi/angular` | Angular 17+ | `I18nService`, `PrefService` |
| `@ulam/halohalo` | any | Vanilla core |
| `@ulam/halohalo/react` | React | `useCompletion`, `useProviderConfig` |
| `@ulam/halohalo/vue` | Vue 3 | `useCompletion`, `useProviderConfig` composables |
| `@ulam/halohalo/angular` | Angular 17+ | `CompletionService`, `ProviderConfigService` |

## Quick Start by Framework

### React

```jsx
import '@ulam/ube/base-tokens.css'
import '@ulam/ube/base-typography.css'
import '@ulam/ube/ui.css'
import '@ulam/sili/base.css'

import { Router } from '@ulam/sili/react'
import { Announcer } from '@ulam/taho/react'
import { I18nProvider } from '@ulam/calamansi/react'
import { ButtonText, Dialog } from '@ulam/ube'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <I18nProvider>
      <Router>
        <Announcer />
        <ButtonText onClick={() => setIsOpen(true)}>Open</ButtonText>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} heading="Title">
          Content
        </Dialog>
      </Router>
    </I18nProvider>
  )
}
```

### Remix

Replace `@ulam/sili/react` with `@ulam/sili/remix`:

```jsx
import { useRouter, useRouteMatch, mountRouteFocus } from '@ulam/sili/remix'
```

All other packages work identically to React.

### Vue

Use `/vue` subpaths:

```js
import { useFocusTrap, useDir } from '@ulam/sili/vue'
import { useT } from '@ulam/calamansi/vue'
import { useAnnounce } from '@ulam/taho/vue'
```

### Angular

Use `/angular` subpaths:

```ts
import { FocusTrapDirective } from '@ulam/sili/angular'
import { I18nService } from '@ulam/calamansi/angular'
import { AnnounceService } from '@ulam/taho/angular'
```

## Core Concepts

- **Vanilla-first**: Every package has a vanilla core with zero dependencies. Framework adapters are optional add-ons.
- **Independent**: Install only what you need. Packages don't import each other.
- **Accessible by default**: All components handle focus, keyboard, ARIA, and screen reader support automatically.
- **Tree-shakeable**: Component CSS imports only what's used. Unused code doesn't bundle.

## Resources

- [@ulam/sili](packages/sili) — Focus management, overlays, routing
- [@ulam/taho](packages/taho) — Live region announcements
- [@ulam/calamansi](packages/calamansi) — i18n and utilities
- [@ulam/ube](packages/ube) — UI components and theming
- [@ulam/sawsawan](packages/sawsawan) — Integration bridge

## License

MIT
