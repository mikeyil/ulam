# @ulam/calamansi

Data-agnostic i18n, hooks, and logic utilities. The sour layer of the ulam framework.

Named for the iconic Filipino sour citrus. Small, essential, full of character.

## Packages

Calamansi is one of four ulam packages:

```text
ulam
├── @ulam/ube          sweet   — UI, components, CSS, theming, router, announce
├── @ulam/calamansi    sour    — i18n, hooks, utilities, logic  ← you are here
└── @ulam/sawsawan     bridge  — wires the three together
```

## i18n

The `t()` function accepts any plain JS object as locale data. No opinions about loaders, caches, or source format. Just lookup and interpolation.

```jsx
import { I18nProvider, useT } from './calamansi'

// Wrap your app
<I18nProvider locale="en">
  <App />
</I18nProvider>

// In components
function MyComponent() {
  const t = useT()
  return <p>{t('hello', { name: 'Mikey' })}</p>
}
```

### Supported features

- **Interpolation** — `t('hello', { name: 'Mikey' })` → `"Hello, Mikey"`
- **Fallback** — missing keys fall back to `en`, never show a raw key
- **No bundled translations** — bring your own locale data; any `{ key: value }` object works

### Design principles

- **Data-agnostic** — pass any `{ key: value }` object; JSON files, API responses, CMS payloads all work
- **Thin** — just lookup and interpolation; number/date formatting defers to native `Intl` APIs
- **Independently usable** — no dependency on ube; any JS project can use calamansi i18n

## Independence

Calamansi has no dependency on ube. Dependency flows one direction only:

```text
calamansi ──► sawsawan (only cross-importer)
```

Neither ube nor sawsawan import from calamansi directly.

## Subpath exports

Planned subpath split:

```text
@ulam/calamansi          — everything
@ulam/calamansi/react    — I18nProvider, useT()
@ulam/calamansi/hooks    — React hooks
@ulam/calamansi/utils    — utilities
```

## License

MIT
