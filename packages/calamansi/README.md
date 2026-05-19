# @ulam/calamansi

Data-agnostic i18n, hooks, and logic utilities. The sour layer of the ulam framework.

Named for the iconic Filipino sour citrus. Small, essential, full of character.

## Purpose & Scope

**What calamansi does:**

- Data-agnostic i18n with runtime locale switching (no rebuild needed)
- String interpolation with variable substitution
- Per-locale fallback chain (e.g., `en-US` → `en` → default)
- localStorage-backed preference persistence
- Framework-agnostic vanilla core with framework adapters
- Zero dependencies (not even polyfills)

**What calamansi doesn't do:**

- Number formatting (use `Intl.NumberFormat`)
- Date formatting (use `Intl.DateTimeFormat`)
- Pluralization rules (bring your own logic or use `Intl.PluralRules`)
- Translation file management or CI/CD pipeline
- Build-time string extraction (all content lives in your app)
- Server-side rendering pre-translation (you control the locale on server)

**Who should use calamansi:**

- Apps that need runtime locale switching without reload
- Projects with i18n data from APIs or CMS (not baked into bundle)
- Vanilla JavaScript, React, Vue, or Angular projects needing i18n
- Apps already using `Intl` APIs and wanting lightweight i18n on top
- Teams wanting to avoid heavy i18n libraries for simple needs

## The ulam Framework

Calamansi is one of six independent packages in the ulam framework. See [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) for the complete framework structure and dependency graph.

## Install

```bash
npm install @ulam/calamansi
```

Framework adapters are optional:

```bash
npm install @ulam/calamansi/react
npm install @ulam/calamansi/vue
npm install @ulam/calamansi/angular
```

## Usage

### Vanilla

The vanilla API works anywhere. No framework required.

```javascript
import { initI18n, setLocale, getT } from '@ulam/calamansi'

initI18n({
  en: { hello: 'Hello, {name}' },
  tl: { hello: 'Kamusta, {name}' },
})

setLocale('tl')
const t = getT()
t('hello', { name: 'Mikey' }) // 'Kamusta, Mikey'
```

### React

```javascript
import { I18nProvider, useT } from '@ulam/calamansi/react'

// Mount once at app root
<I18nProvider locale="en">
  <App />
</I18nProvider>

// In components
function MyComponent() {
  const t = useT()
  return <p>{t('hello', { name: 'Mikey' })}</p>
}
```

`useT()` re-renders the component when the locale changes. `I18nProvider` calls `setLocale()` internally and is a thin wrapper around the vanilla call.

### Vue

```javascript
import { useT, usePref } from '@ulam/calamansi/vue'

// Inside setup()
const t = useT()           // reactive ref containing the translate function
t.value('hello', { name: 'Mikey' })

const { value: lang, set: setLang } = usePref('lang', 'en')
// lang is a readonly ref; setLang persists to localStorage and updates the ref
```

`useT()` returns a readonly `ref` that updates automatically when `setLocale()` is called anywhere in the app. There is no provider to mount; `setLocale()` notifies all subscribers globally.

`usePref()` returns `{ value, set }` rather than a two-element array, matching Vue's conventional style for composables with a distinct setter.

### Angular

```typescript
import { I18nService, PrefService } from '@ulam/calamansi/angular'
```

**When to use this vs. `@angular/localize`:**

`@angular/localize` is a compile-time system. It extracts and bakes translated strings into the bundle at build time. It does not support runtime locale switching without a page reload or a rebuild. If that constraint works for your project, use `@angular/localize`.

Use calamansi when you need:

- Runtime locale switching without a page reload
- Locale data from an API or CMS (not baked into the bundle)
- Shared locale logic between Angular and non-Angular code in the same project

Both can coexist. Use `@angular/localize` for static UI strings, and calamansi for dynamic or API-driven content.

```typescript
@Component({ ... })
export class NavComponent {
  constructor(private i18n: I18nService) {}

  get label() {
    return this.i18n.t('nav.home')
  }

  switchToTagalog() {
    this.i18n.setLocale('tl')
  }
}
```

`I18nService` is `providedIn: 'root'`. It holds the translate function in an Angular `signal` so components using `i18n.translateFn()` in templates will update reactively when the locale changes.

`PrefService` exposes localStorage-backed preferences as Angular signals:

```typescript
@Component({ ... })
export class SettingsComponent {
  constructor(private pref: PrefService) {}

  lang = this.pref.get('lang', 'en')  // Signal<string>

  setLang(locale: string) {
    this.pref.set('lang', locale)
  }
}
```

### Supported features

- **Interpolation:** `t('hello', { name: 'Mikey' })` produces `"Hello, Mikey"`
- **Fallback:** missing keys fall back to `en`, never show a raw key
- **No bundled translations:** bring your own locale data; any `{ key: value }` object works

### Design principles

- **Data-agnostic:** pass any `{ key: value }` object; JSON files, API responses, CMS payloads all work
- **Thin:** just lookup and interpolation; number/date formatting defers to native `Intl` APIs
- **Independently usable:** no dependency on ube; any JS project can use calamansi i18n

## Independence

Calamansi has no dependency on ube. Dependency flows one direction only:

```text
calamansi ──► sawsawan (only cross-importer)
```

Neither ube nor sawsawan import from calamansi directly.

## Subpath exports

| Import | Contents |
| ------ | -------- |
| `@ulam/calamansi` | Vanilla core: `initI18n`, `setLocale`, `getT`, `getPref`, `setPref`, `isSignificantlyChanged` |
| `@ulam/calamansi/react` | `I18nProvider`, `useT`, `usePref` |
| `@ulam/calamansi/vue` | `useT`, `usePref`, vanilla re-exports |
| `@ulam/calamansi/angular` | `I18nService`, `PrefService`, vanilla re-exports |

See the [root README](../../README.md) for a complete framework support overview across all ulam packages.
