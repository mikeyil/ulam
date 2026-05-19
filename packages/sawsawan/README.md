# @ulam/sawsawan

The sauce: integration layer wiring ube and calamansi together. The dipping sauce of the ulam framework.

Named for sawsawan, the Filipino dipping sauce: no purpose alone, exists only to bring other things together.

## The ulam Framework

Sawsawan is one of six packages in the ulam framework. See [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) for the complete framework structure and dependency graph.

## Dependency rule

Sawsawan is the only package that imports from the others. None of them import from sawsawan or from each other.

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

## Why ube and calamansi do not depend on each other

`announce()` accepts any string: no knowledge of where it came from. `t()` returns any string: no knowledge of where it goes. The app or sawsawan wires them: `announce(t('locale.switched'))`. Neither package knows the other exists. Integration is function composition at the call site, owned by sawsawan.
