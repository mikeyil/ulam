# Building Consumer Apps with Ulam

Guide for applications integrating the ulam accessibility framework.

---

## Overview

This guide covers best practices for building consumer apps (like a11yfred) that use ulam packages. It focuses on:

- Component naming conventions that distinguish framework integrations from custom features
- Project organization patterns that integrate ulam packages cleanly
- Service abstraction patterns for consistent API handling
- Documentation and testing strategies

---

## Component Naming Convention

### Two-Tier Naming System

All app components should follow a **two-tier naming convention** based on their purpose:

#### Tier 1: `App*` Components (Framework Integrations)

Components that **wrap or compose ulam framework components**.

**Purpose**: Clearly identify which components are thin adapters around ulam packages.

**Naming**: `App` + descriptor (e.g., `AppScreenHeader`, `AppDrawerSettings`)

**Examples**:

```jsx
// AppScreenHeader.jsx — wraps @ulam/ube Button, LinkSkipTo
export function AppScreenHeader() {
  return (
    <header>
      <LinkSkipTo href="#main">Skip to main</LinkSkipTo>
      <h1>My App</h1>
      <Button onClick={toggleMenu} icon={<Menu />} label="Menu" />
    </header>
  )
}

// AppSheetDetail.jsx — wraps @ulam/sili Sheet, @ulam/ube form controls
export function AppSheetDetail({ open, onClose }) {
  return (
    <Sheet open={open} onClose={onClose} heading="Details">
      <FormInputText label="Name" clearable />
      <Button onClick={save}>Save</Button>
    </Sheet>
  )
}

// AppDrawerSettings.jsx — wraps @ulam/ube Panel, wraps @ulam/sili Drawer
export function AppDrawerSettings() {
  return (
    <Drawer>
      <Panel heading="Settings">
        {/* Settings content */}
      </Panel>
    </Drawer>
  )
}
```

**Benefit**: Immediately clear that these are framework adapters, not business logic.

#### Tier 2: `[AppName]*` Components (Custom Features)

Components that are **custom to your app** and not simple wrappers of framework components.

**Naming**: App name/abbreviation + descriptor (e.g., `A11yResultAd`, `A11yThemeEffectSparkles`)

**Examples**:

```jsx
// A11yResultAd.jsx — custom ad tile component unique to a11yfred
export function A11yResultAd({ result }) {
  return (
    <div className="result-ad">
      <h3>{result.title}</h3>
      <p>{result.description}</p>
      {/* Custom a11yfred ad logic */}
    </div>
  )
}

// A11yThemeEffectFiestaSparkles.jsx — custom canvas-based sparkle effect
export function A11yThemeEffectFiestaSparkles() {
  // Custom animation logic with requestAnimationFrame
  return <canvas ref={canvasRef} />
}

// A11ySettingsSectionAi.jsx — custom settings panel section for AI features
export function A11ySettingsSectionAi() {
  return (
    <section>
      <h2>AI Settings</h2>
      {/* Custom AI configuration UI */}
    </section>
  )
}

// A11yResultsActiveFilterBar.jsx — custom filter bar UI
export function A11yResultsActiveFilterBar({ filters, onRemoveFilter }) {
  return (
    <div className="filter-bar">
      {/* Custom filtering UI */}
    </div>
  )
}
```

**Benefit**: At a glance, developers know these are app-specific features, not framework integrations.

---

## Project Organization

### Directory Structure

```text
src/
├── components/
│   ├── App*.jsx                    # Framework integration wrappers
│   ├── [AppName]*.jsx              # Custom app components
│   └── ui/                         # Reusable UI primitives (optional)
│
├── hooks/                          # Custom hooks (search, state, etc.)
├── services/                       # Business logic services
├── contexts/                       # React context providers (if using)
├── data/                           # Static data, corpus, configs
├── locales/                        # i18n translations (if using calamansi)
├── utils/                          # Utility functions
│
├── [AppName]Integration.jsx        # Integration file (optional)
└── App.jsx                         # Root component
```

### File Organization Principles

1. **One component per file** (one `App*.jsx`, one `A11y*.jsx`)
2. **Co-locate related logic** (hook + service in same directory)
3. **Use barrel exports** (index.js) for clean imports
4. **Separate concerns** (components, hooks, services, utils)

---

## Integration Patterns

### Pattern 1: Provider Setup (Context/State)

Wrap your app with ulam providers at the root level:

```jsx
import { I18nProvider } from '@ulam/calamansi/react'
import { Announcer } from '@ulam/taho/react'
import { Router } from '@ulam/sili/react'

export function App() {
  return (
    <I18nProvider locale="en">
      <Router>
        <Announcer />
        <YourAppContent />
      </Router>
    </I18nProvider>
  )
}
```

### Pattern 2: Service Abstraction

Create service abstractions for external integrations (AI, data, etc.):

```javascript
// services/aiService.js — abstracts AI provider calls
export async function getAiRefinement(provider, prompt) {
  switch (provider) {
    case 'anthropic':
      return await callAnthropicAPI(prompt)
    case 'openai':
      return await callOpenAIAPI(prompt)
    case 'google':
      return await callGoogleAPI(prompt)
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }
}

// services/dataService.js — abstracts data fetching
export async function fetchCorpus() {
  // Eventually: switch from local JSON to Supabase API
  return await import('../data/corpus.json').then(m => m.default)
}
```

**Benefit**: Single responsibility. Changing providers or data sources requires updating only the service, not call sites.

### Pattern 3: Custom Hooks for App-Specific Logic

Create custom hooks that wrap or compose ulam hooks with app logic:

```javascript
// hooks/useAppSearch.js
import { useT } from '@ulam/calamansi/react'
import { useSearch } from '../services/searchService'

export function useAppSearch(query) {
  const t = useT()
  const results = useSearch(query)

  // Compose with app-specific logic
  return results.map(result => ({
    ...result,
    label: t(`result.${result.type}`),
  }))
}
```

---

## Internationalization Integration

If using **@ulam/calamansi** for i18n:

### Locale File Structure

```text
src/
└── locales/
    ├── en.json          # English (base locale)
    ├── es.json          # Spanish
    ├── fr.json          # French
    └── [... other languages]
```

### Language-Appropriate Capitalization

Follow language conventions for title case:

- **English** (en, en-GB, en-AU): NYT-style title case

  ```json
  {
    "nav.home": "Home",
    "settings.appearance": "Appearance"
  }
  ```

- **Romance/Germanic languages** (es, de, fr): Sentence case (first word + proper nouns only)

  ```json
  {
    "nav.home": "Inicio",
    "settings.appearance": "Apariencia"
  }
  ```

- **Scripts without capitalization** (ja, zh, ko, ar, ta): Leave unchanged

  ```json
  {
    "nav.home": "ホーム",
    "settings.appearance": "外観"
  }
  ```

### Right-to-Left (RTL) Language Support

When activating RTL languages (Arabic, Uyghur), set document direction:

```javascript
// In your locale selection handler
export function setLocale(locale) {
  const isRTL = ['ar-PS', 'ug'].includes(locale)
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr'

  // Call @ulam/calamansi's setLocale
  setLocale(locale)
}
```

**CSS handles the rest** via `[dir="rtl"]` overrides:

```css
.drawer {
  translate: translateX(-100%);
}

[dir="rtl"] .drawer {
  transform: translateX(100%);
}

.back-chevron {
  rotate: 180deg;
}

[dir="rtl"] .back-chevron {
  rotate: 0deg;
}
```

### Cross-Language Search

If using Fuse.js for search, preserve English keywords in your data alongside translations:

```javascript
// corpus.js
export const entries = [
  {
    id: 1,
    title_en: 'Button',          // English keyword (searchable)
    title_es: 'Botón',           // Spanish translation
    title_ja: 'ボタン',           // Japanese translation
    description_en: '...',
    description_es: '...',
    description_ja: '...',
  }
]

// hooks/useSearch.js
export function useSearch(query) {
  // Fuse.js can search title_en even when app locale is Japanese
  // This way, typing "button" still finds the Japanese entry
  return fuseIndex.search(query)
}
```

---

## Testing Strategy

### Component Testing

Test `App*` components at integration level (they're thin adapters):

```javascript
// components/__tests__/AppSheetDetail.test.jsx
it('renders Sheet with form controls from @ulam/ube', () => {
  const { getByRole } = render(<AppSheetDetail open onClose={() => {}} />)
  expect(getByRole('textbox', { name: /name/i })).toBeInTheDocument()
})
```

Test `[AppName]*` components with full business logic:

```javascript
// components/__tests__/A11yResultAd.test.jsx
it('displays ad with custom styling', () => {
  const { container } = render(<A11yResultAd result={mockResult} />)
  expect(container.querySelector('.result-ad')).toHaveClass('custom-styling')
})
```

### Service Testing

Test service abstraction independently:

```javascript
// services/__tests__/aiService.test.js
it('dispatches to correct provider', async () => {
  const result = await getAiRefinement('anthropic', 'test prompt')
  expect(result).toBeDefined()
})
```

---

## Accessibility Checklist

When building with ulam, verify:

- [ ] All ulam components imported correctly for your framework
- [ ] Focus management enabled (ulam/sili)
- [ ] Live region announcements working (ulam/taho)
- [ ] i18n locale switching functional (ulam/calamansi)
- [ ] Overlays (Dialog, Sheet, Drawer) properly layered
- [ ] RTL languages display correctly
- [ ] Keyboard navigation tested (Tab, Shift+Tab, Escape)
- [ ] Screen reader tested with NVDA/JAWS/VoiceOver
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for text)

---

## Common Integration Points

### With @ulam/ube (UI Components)

Use `App*` components to wrap ube components:

```jsx
<AppScreenHeader />           // wraps Button, LinkSkipTo
<AppSheetDetail />            // wraps Sheet, form controls
<AppDrawerSettings />         // wraps Drawer, Panel
```

### With @ulam/sili (Focus Management)

Focus management is automatic (Dialog/Sheet/Drawer handle it). Use custom hooks for advanced cases:

```jsx
const { trapFocus, useReturnFocus } = useCustomFocus()
```

### With @ulam/calamansi (i18n)

Initialize once at app root, use `useT` everywhere:

```jsx
const t = useT()
const label = t('nav.home')  // "Home" in English, "Inicio" in Spanish
```

### With @ulam/taho (Announcements)

Call `announce()` from services or event handlers:

```javascript
import { announce } from '@ulam/taho'

function handleDelete() {
  deleteItem()
  announce('Item deleted')  // Screen reader announces
}
```

### With @ulam/sawsawan (Integration)

Sawsawan wires components together automatically. No app-level code needed.

---

## Naming Quick Reference

|Pattern|Purpose|Example|
|---|---|---|
|`App*`|Wraps ulam components|`AppScreenHeader`, `AppSheetDetail`|
|`[AppName]*`|Custom app features|`A11yResultAd`, `A11ySettingsSectionAi`|
|`use*`|Custom hooks|`useAppSearch`, `useTheme`|
|`*Service`|Business logic|`aiService`, `dataService`|
|`*Context`|State providers|`AppContext`, `ThemeContext`|
|`*Utils`|Utility functions|`formatDate`, `parseQuery`|

---

## Example: Complete Integration

```jsx
// src/App.jsx
import { I18nProvider } from '@ulam/calamansi/react'
import { Announcer } from '@ulam/taho/react'
import { Router } from '@ulam/sili/react'

import { AppScreenHeader } from './components/AppScreenHeader'
import { A11yResultsList } from './components/A11yResultsList'
import { AppDrawerSettings } from './components/AppDrawerSettings'

export function App() {
  const [locale, setLocale] = useState('en')
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <I18nProvider locale={locale}>
      <Router>
        <Announcer />
        <AppScreenHeader onMenuClick={() => setDrawerOpen(true)} />
        <main>
          <A11yResultsList />
        </main>
        <AppDrawerSettings open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </Router>
    </I18nProvider>
  )
}
```

```jsx
// src/components/AppScreenHeader.jsx
import { LinkSkipTo, ButtonIcon } from '@ulam/ube/react'

/**
 * App* component: Framework integration wrapper
 * Composes @ulam/ube components with app-specific layout
 */
export function AppScreenHeader({ onMenuClick }) {
  return (
    <header>
      <LinkSkipTo href="#main">Skip to main content</LinkSkipTo>
      <h1>A11yFred</h1>
      <ButtonIcon icon={<Menu />} onClick={onMenuClick} />
    </header>
  )
}
```

```jsx
// src/components/A11yResultsList.jsx
import { useT } from '@ulam/calamansi/react'
import { useAppSearch } from '../hooks/useAppSearch'

/**
 * [AppName]* component: Custom app feature
 * Displays search results with app-specific UI
 */
export function A11yResultsList() {
  const t = useT()
  const [query, setQuery] = useState('')
  const results = useAppSearch(query)

  return (
    <section>
      <h2>{t('results.heading')}</h2>
      {results.map(result => (
        <A11yResultCard key={result.id} result={result} />
      ))}
    </section>
  )
}
```

---

## References

- [a11yfred](https://github.com/a11yfred/a11yfred) — Reference implementation
- [@ulam/ube](../ube) — UI components
- [@ulam/sili](../sili) — Focus management & overlays
- [@ulam/calamansi](../calamansi) — Internationalization
- [@ulam/taho](../taho) — Live region announcements
- [@ulam/sawsawan](../sawsawan) — Integration bridge
