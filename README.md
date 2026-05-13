# ulam

Accessibility utilities for the modern web. Vanilla-first, with optional React and Remix adapters.

Named for the Filipino word for dish: the thing everything else is built around.

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

Install only what you need:

```bash
npm install @ulam/taho           # announcer only
npm install @ulam/sili           # focus management only
npm install @ulam/calamansi      # i18n only
npm install @ulam/ube            # full React UI component set
```

Or with npm aliases if you prefer shorter import names:

```bash
npm install taho@npm:@ulam/taho
npm install sili@npm:@ulam/sili
npm install calamansi@npm:@ulam/calamansi
```

## Framework support

Packages with framework-specific behavior ship subpath exports:

| Subpath | Description |
| ------- | ----------- |
| `@ulam/taho` | Vanilla core |
| `@ulam/taho/react` or `/bayabas` | React adapter |
| `@ulam/taho/remix` or `/pandan` | Remix adapter |
| `@ulam/sili` | Vanilla core |
| `@ulam/sili/react` or `/labuyo` | React hooks, overlays, hash router |
| `@ulam/sili/remix` or `/mahaba` | Remix adapter, same hooks, Remix router |

The food name aliases (`/bayabas`, `/pandan`, `/labuyo`, `/mahaba`) resolve to the same entry points as the generic subpath names.

## License

MIT
