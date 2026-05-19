# Contributing to Ulam

Thanks for your interest in improving ulam! This guide explains how the framework is organized, how to set it up locally, and how to contribute.

## Repository Structure

```
ulam/
├── packages/                    # Monorepo packages
│   ├── sili/                   # Focus management, overlays, routing
│   │   ├── core/               # Vanilla JS, zero dependencies
│   │   ├── react/              # React hooks and components
│   │   ├── remix/              # Remix router adapter
│   │   ├── vue/                # Vue 3 composables
│   │   ├── angular/            # Angular services and directives
│   │   └── README.md
│   │
│   ├── taho/                   # Live region announcer
│   │   ├── core/               # Vanilla JS
│   │   ├── react/vue/angular/  # Framework adapters
│   │   └── README.md
│   │
│   ├── calamansi/              # i18n, hooks, utilities
│   │   ├── core/               # Vanilla JS
│   │   ├── react/vue/angular/  # Framework adapters
│   │   └── README.md
│   │
│   ├── halohalo/               # AI provider adapters
│   │   └── README.md
│   │
│   ├── ube/                    # React UI components, theming
│   │   ├── components/         # Component source (.jsx files)
│   │   ├── *.css               # Component CSS (imported by components)
│   │   └── README.md
│   │
│   └── sawsawan/               # Integration bridge
│       └── README.md
│
├── README.md                    # Framework overview
├── UPDATES.md                   # Recent major changes
├── TODO.md                      # Known issues and roadmap
├── CONTRIBUTING.md             # This file
├── package.json                # Monorepo root
└── node_modules/
```

## Key Principles

1. **Vanilla-first**: Every package has a vanilla core with zero dependencies. Framework adapters are optional.
2. **Independent**: Packages don't import from each other (except sawsawan bridges them).
3. **Accessible by default**: All components handle focus, keyboard, ARIA automatically.
4. **Tree-shakeable**: Only imported code bundles. Component CSS is auto-imported.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
git clone <ulam-repo>
cd ulam
npm install
```

Monorepo uses npm workspaces. All packages are installed and linked automatically.

### Building

```bash
# Build all packages
npm run build

# Build a specific package
npm run build -w packages/sili
npm run build -w packages/ube
```

### Testing

```bash
# Run all tests
npm test

# Run tests in a specific package
npm test -w packages/sili
```

## Making Changes

### Before You Start

1. Check [TODO.md](TODO.md) for planned work to avoid duplicates
2. Open an issue to discuss significant changes
3. Fork the repository
4. Create a feature branch: `git checkout -b feature/my-feature`

### Code Style

- Use JavaScript/TypeScript with Prettier formatting
- Use semantic HTML in JSX
- Name files by component: `ButtonText.jsx`, `Dialog.jsx`, etc.
- Use functional components and hooks (React/Vue)
- Prefer explicit over implicit (clear variable names, obvious intent)

### Accessibility Requirements

All components must:
- Handle keyboard navigation (Tab, Shift+Tab, Escape, Arrow keys)
- Include appropriate ARIA attributes
- Work with screen readers (test with NVDA, JAWS, VoiceOver)
- Have visible focus indicators
- Support high contrast mode
- Respect `prefers-reduced-motion`

Test with:

```bash
npm test:a11y
```

### Testing Your Changes

1. **Unit tests**: Test individual functions, hooks, components
2. **Keyboard tests**: Tab through components, test all keyboard interactions
3. **Screen reader tests**: Test with VoiceOver (macOS), NVDA (Windows), or JAWS
4. **Visual tests**: Check focus rings, high contrast, reduced motion modes

### Documentation

Update documentation when adding features:

1. **README.md**: Add usage examples under appropriate section
2. **CHANGELOG.md**: Document in `[Unreleased]` section
3. **API Reference**: Add to section if adding public methods/props
4. **TSDoc/JSDoc**: Comment public APIs with param and return types

Example JSDoc:

```js
/**
 * Focus on element when component mounts.
 * 
 * @param {HTMLElement} [element] - Element to focus. If not provided, focuses current element.
 * @returns {void}
 */
export function useFocusOnMount(element) {
  // ...
}
```

### Commit Messages

Follow conventional commits:

```
feat: add new feature
fix: fix a bug
docs: update documentation
refactor: restructure code
test: add or update tests
chore: dependency updates, tooling
```

Example:
```
feat(sili): add focusElementSelector prop for CSS selector-based focus

Allows targeting focus element by CSS selector in addition to ref.
Useful when ref not available but selector is specific enough.
```

### Pull Request Process

1. Create PR with clear title and description
2. Link any related issues
3. Ensure tests pass: `npm test`
4. Ensure no lint errors: `npm run lint`
5. Request review from maintainers
6. Address feedback and re-request review

## Package Responsibilities

### @ulam/sili

**Scope**: Focus management, overlays, routing
**Does**: Focus traps, ARIA hiding, escape key handling, overlay transitions, return focus, page title management
**Doesn't**: UI rendering, state management, styling

**To contribute**:
- Add focus management features
- Improve overlay orchestration
- Add framework adapters
- Fix accessibility bugs

**Not for**:
- UI component features (use ube)
- i18n features (use calamansi)
- Live region announcements (use taho)

### @ulam/ube

**Scope**: React UI components, theming
**Does**: Buttons, inputs, toggles, panels, screens, design tokens, CSS themes
**Doesn't**: Focus management (use sili), i18n (use calamansi), routing (use sili)

**To contribute**:
- Add new components (with accessibility built-in)
- Improve theming system
- Add component variants
- Fix styling bugs

**Not for**:
- Focus/overlay behavior (use sili)
- Non-React frameworks (that's other repos)

### @ulam/calamansi

**Scope**: i18n, utilities, logic
**Does**: Translation strings, locale data, hooks, utility functions
**Doesn't**: UI rendering, focus management, announcements

### @ulam/taho

**Scope**: Live region announcements
**Does**: ARIA live regions, route announcements, accessible alerts
**Doesn't**: Other ARIA features, overlay management, focus

### @ulam/sawsawan

**Scope**: Integration bridge
**Does**: Wires the above packages together for common patterns
**Doesn't**: Standalone features (use specific packages)

## Releasing

Releases follow semantic versioning. Current version: 0.3.0

To prepare a release:

1. Update version in all `package.json` files
2. Update `UPDATES.md` with version and date
3. Create git tag: `git tag v0.3.0`
4. Push tag: `git push origin v0.3.0`
5. CI publishes to npm automatically (or manual `npm publish` for each workspace)

## Questions?

- **How do I...?**: Check the package README
- **What's already implemented?**: See UPDATES.md
- **What's planned?**: See TODO.md
- **Found a bug?**: Open a GitHub issue
- **Want to propose a change?**: Open an issue for discussion first

## Code of Conduct

Be respectful and inclusive. This framework is for everyone, regardless of background or experience level.

