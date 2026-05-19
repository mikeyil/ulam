# @ulam/sauce

Integration bridge (the sauce) wiring taho, sili, calamansi, halohalo, and ube together.

Named for sawsawan, the Filipino dipping sauce: no purpose alone, exists only to bring other things together. Just as sauce brings all the flavors together into one cohesive dish.

## Packages

Sauce is one of six ulam packages:

```text
ulam
├── @ulam/sili         hot    : focus management, overlays, routing
├── @ulam/taho         warm   : ARIA live region announcer
├── @ulam/calamansi    sour   : i18n, hooks, utilities, logic
├── @ulam/halohalo     spicy  : AI provider adapters, model config
├── @ulam/ube          sweet  : UI components, theming, design tokens
└── @ulam/sauce        bridge : wires them all together  ← you are here
```

## Dependency rule

Sauce is the only package that imports from the others. None of them import from sauce or from each other.

```text
ube ──────────┐
calamansi ────┴──► sawsawan
```

## Responsibilities

- Set `html[lang]` when locale switches
- Set `html[dir]` for RTL locales
- Wire `t()` output into `announce()` on locale change

## Usage

```jsx
import { useSawsawan } from './sawsawan'
import { useT } from './calamansi'

function App() {
  const [locale, setLocale] = useState('en')
  const t = useT()

  useSawsawan(locale, t, 'locale.switched')

  return <AppShell />
}
```

## Why packages don't depend on each other

Each package focuses on one concern:

- `sili`: Focus management (doesn't know about announcements, i18n, or components)
- `taho`: Announcements (doesn't know about focus, i18n, or components)
- `calamansi`: i18n (doesn't know about focus, announcements, or components)
- `halohalo`: AI providers (doesn't know about the others)
- `ube`: Components (doesn't know about focus, announcements, or i18n)

Sauce wires them at the app level: `announce(t('locale.switched'))`. Neither package knows the other exists. Integration is function composition at the call site, owned by sauce.

## License

MIT
