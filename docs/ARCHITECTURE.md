# Ulam Architecture

## Framework Structure

The ulam framework consists of six composable packages, each serving a specific accessibility and UI purpose.

```text
ulam
├── @ulam/taho         warm      : ARIA live region announcer
├── @ulam/sili         hot       : focus management, overlays, routing
├── @ulam/calamansi    sour      : i18n, hooks, utilities, logic
├── @ulam/halohalo     mixed     : AI provider adapters, model config
├── @ulam/ube          sweet     : Framework-agnostic UI components
└── @ulam/sawsawan     sauce     : Integration bridge
```

## Package Responsibilities

### @ulam/taho (warm) - ARIA Live Region Announcer

Provides screen reader announcements for dynamic content changes.

- Framework-agnostic vanilla core
- React hooks: `useAnnounce`, `Announcer` component
- Vue composables: `useAnnounce`
- Angular service: `AnnounceService`

### @ulam/sili (hot) - Focus Management & Overlays

Handles keyboard navigation, focus trapping, and overlay orchestration.

- Vanilla core: focus management, escape key handling, scroll locking
- React hooks: `useFocusTrap`, `useEscapeKey`, overlay components (Dialog, Sheet, Drawer)
- Vue composables: matching all React hooks
- Angular services and standalone directives

### @ulam/calamansi (sour) - Internationalization & Utilities

Data-agnostic i18n, locale management, and utility functions.

- Framework-agnostic vanilla core: `initI18n`, `setLocale`, `getT`, `getPref`, `setPref`
- React provider: `I18nProvider`, hooks `useT`, `usePref`
- Vue composables: `useT`, `usePref`
- Angular services: `I18nService`, `PrefService`

### @ulam/halohalo (mixed) - AI Provider Adapters

Abstracts AI service calls across multiple providers (Anthropic, OpenAI, Google).

- Framework-agnostic vanilla core: `createCompletion`, `createProviderConfig`
- React hooks: `useCompletion`, `useProviderConfig`
- Vue composables: `useCompletion`, `useProviderConfig`
- Angular services: `CompletionService`, `ProviderConfigService`

### @ulam/ube (sweet) - Framework-Agnostic UI Components

20 web components that work in any JavaScript environment.

- Vanilla web components: Button, Link, Form inputs, Badge, Panel, Screen, etc.
- React adapters: 20 component wrappers
- Vue adapters: 20 single-file components
- Angular adapters: 20 component decorators + UbeModule
- Remix adapters: Re-exports from React

### @ulam/sawsawan (sauce) - Integration Bridge

Wires all packages together and provides platform-specific adaptations.

- Sets `html[lang]` on i18n locale changes
- Sets `html[dir]` for RTL locales
- Connects i18n with announcements
- Provides adapter patterns for other packages

## Dependency Flow

```text
Core utilities (vanilla)
    ↓
Framework adapters (React, Vue, Angular)
    ↓
sawsawan (integration bridge)
```

**Key Principle:** Each package is independently installable with zero cross-dependencies except through sawsawan.

## Design Philosophy

- **Vanilla-First**: All packages export a framework-agnostic vanilla core
- **Framework Agnostic**: Optional adapters for React, Vue, Angular, Remix
- **Single Responsibility**: Each package does one thing well
- **Composable**: Use individually or combine into a full stack
- **Accessible**: WCAG 2.1 compliance built-in
- **Zero Dependencies**: No external dependencies beyond the framework adapters (which depend on React/Vue/Angular only as peer deps)

## Common Patterns

All packages follow consistent patterns for framework adapters:

- **React**: Hooks for reactive state, components for UI wrapper
- **Vue**: Composables for reactive state, single-file components
- **Angular**: Injectable services with signal-based reactivity, component decorators
- **Vanilla**: Plain functions and event listeners, no framework overhead

See individual package READMEs for specific API documentation.

## File Naming Conventions

- **React Components (.jsx)**: PascalCase (e.g., `ButtonText.jsx`)
- **Vue Components (.vue)**: PascalCase (e.g., `ButtonText.vue`)
- **Angular Components (.component.ts)**: kebab-case (e.g., `button-text.component.ts`)
- **Angular Services (.service.ts)**: kebab-case (e.g., `announce.service.ts`)
- **Utility/Hook Files (.js)**: camelCase (e.g., `useCompletion.js`, `ariaHide.js`)
- **Module Entry Points**: lowercase (e.g., `index.js`, `react.js`, `angular.js`)
