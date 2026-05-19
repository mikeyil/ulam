# Changelog

All notable changes to @ulam/ube will be documented in this file.

## [0.3.0] - 2026-05-18

### Changed

- **Component Naming**: Renamed components for semantic clarity:
  - `Button` → `ButtonText` (text-based button, not icon-only)
  - `Radio` → `ControlRadio` (emphasizes use in control layouts)
  - `RadioChip` → `ControlRadioChip`
  - `RadioChipGroup` → `ControlRadioChipGroup`
  - `ButtonLink` → `LinkBtnStyled` (anchor element, not button)
  - `PanelRowSetting` → `PanelRowControl` (generic control container, not settings-specific)

- **CSS Files**: Renamed to match component names:
  - `button.css` → `button-text.css`
  - `radio-chip.css` → `control-radio-chip.css`
  - `animations.css` → `fade-transition.css`
  - `input-clear-btn.css` → `input-with-clear.css`
  - Form controls prefixed: `toggle.css` → `form-control-toggle.css`, etc.

- **CSS Organization**: Components now import their own CSS files. `ui.css` is a foundational stylesheet containing tokens, reset, typography, user-prefs, and print styles. Component-specific CSS is imported by each component, enabling better tree-shaking.

- **Foundational CSS Prefix**: Renamed foundational stylesheets with `base-` prefix for discoverability:
  - `tokens.css` → `base-tokens.css`
  - `focus.css` → `base-utils.css` (merged focus and utility styles)
  - `reset.css` → `base-reset.css`
  - `typography.css` → `base-typography.css`
  - `user-prefs.css` → `base-user-prefs.css`
  - `print.css` → `base-print.css`

- **CSS Selectors**: Simplified component selectors where possible. Removed class name redundancy (e.g., `.input-search__input` → simplified selectors in `form-control-input-search.css`).

- **Design Tokens**: Moved component-specific tokens into their respective CSS files from `base-tokens.css`:
  - Icon sizing (`--icon-size-sm`, `--icon-size-md`, `--icon-size-lg`) → `buttons.css`
  - Toggle-specific sizing tokens → `form-control-toggle.css`
  - Badge color tokens → `badge.css`
  - Select input icon offset → `form-control-select.css`
  - Animation timing tokens → `fade-transition.css`
  - Form control radius → `form-controls.css`

- **Token Consolidation**: Removed unused tokens (`--bg-size-icon-control`, `--line-height-relaxed`, `--opacity-*` variants). Removed aliases in favor of direct token usage.

- **Theme Styles**: Extracted fiesta theme color variants into dedicated `theme-fiesta.css` file.

- **LinkBtnStyled**: Extracted shared link button styles into `link-btn-styled.css` for consistent styling across link button components.

- **Focus Return**: Moved `[data-focus-return]` styling to `@ulam/sili/base.css` (router plugin's responsibility, not a general ube utility).

### Removed

- **DataError and NoResults**: Deleted deprecated components. Use `Screen` component with `variant="error"` or `variant="no-results"` instead.
  - `<DataError />` → `<Screen variant="error" />`
  - `<NoResults />` → `<Screen variant="no-results" />`
  - Screen component provides unified interface for screen state display with customizable icons, actions, filters.

### Added

- **Screen**: Generic screen state component for displaying page-level information or errors.
  - Variants: `'no-results'` (search results empty) and `'error'` (data loading failed)
  - Customizable heading, body, icon, action button, and filters
  - Focuses heading on mount for WCAG 2.4.3 compliance
  - Supports active filters display and clear/settings actions

- **ControlCheckbox**: New component for accessible checkbox inputs with labels. Uses the same `.control` CSS pattern as `ControlRadio` for consistent styling.

- **LinkSkipTo**: Now composes `LinkBtnStyled` for link rendering, eliminating duplication.

- **ButtonBack**: Now composes `ButtonIcon` instead of duplicating button markup.

- **LinkBtnStyled**: New component separating anchor styling from other button variants.

### Removed

- **Unused CSS Files**:
  - `alert-banner.css` (no component used it)
  - `checkbox.css` (replaced by ControlCheckbox component)
  - `icon.css` (`.btn-icon` duplicated in button-text.css; `.inline-icon` unused)
  - `field.css` (no component imported it)
  - `focus.css` (merged into base-utils.css; component-specific focus states moved to individual files)
  - Unused CSS classes:
    - `.btn--height-standard` and `.btn--height-compact` (redundant aliases for base button height)
    - `.control-radio-chip__input--has-focus` (covered by :focus-visible)
    - Directional animation classes (`--ltr`, `--rtl` variants in fade-transition)
    - Input search `--has-value` state class (unused in framework and consumers)
    - `--opacity-*` token variants (unused)

### Fixed

- **LinkBtnStyled**: Removed hardcoded `btn-link` class; consumers now pass `className` directly
- **CSS Consolidation**: Removed redundant `./base-tokens.css` imports from 13+ component files (ui.css imports it first)
- **Prefers-Reduced-Motion**: Added missing media queries to `ControlCheckbox` and `ControlRadio`
- **Tree-shaking**: Component CSS imports enable unused components to be completely removed from production bundles

## [0.2.2] - 2026-05-18

### Added

- **FadeTransition**: New component for managing opacity and transform animations. Used by overlay components for smooth enter/exit transitions.

- **LinkSkipTo**: Skip-to-main-content link component with arrow icon and keyboard support.

- **useAriaDisabled**: Hook for accessible disabled state handling. Keeps form controls keyboard-focusable but semantically disabled (WCAG pattern for checkbox/radio pre-selection and select option disabling).

### Changed (0.2.2)

- **Toggle**: Updated to use `useAriaDisabled` pattern for more robust disabled state.

- **Select**: Updated to use `useAriaDisabled` pattern for option disabling and improved keyboard navigation.

### Removed (0.2.2)

- **SkipLink**: Renamed to `LinkSkipTo` for clarity (distinguishes from navigation skip behaviors).

---

## [0.2.1] - 2026-05-18

Minor release with patch updates.

---

## [0.2.0] - 2026-05-18

### Changed (0.2.0)

- **CSS Organization**: Refactored component CSS imports. Components now own their styles; `ui.css` exports only foundational styles (reset, tokens, print, user preferences).

- **CSS Naming**: Renamed CSS files to element-first pattern for consistency:
  - `Button.css` → `button.css`
  - `Toggle.css` → `toggle.css`
  - Matches framework convention for CSS files in kebab-case

- **Component Naming**: Stabilized component names after pre-publish feedback:
  - `BackButton` → `ButtonBack` (verb-first for actions)
  - `IconButton` → `ButtonIcon` (clear purpose)
  - `SearchInput` → `InputSearch` (input type clarity)

- **Package Peer Dependencies**: Added `@ulam/calamansi` as peer dependency (optional) for i18n hooks used by some components.

### Fixed (0.2.0)

- **Import Paths**: Corrected cross-package relative imports to use `@ulam/` scoped names for reliability.

- **Modal Export**: Fixed missing Modal export in ube index.

---

## [0.1.3] - 2026-05-13

### Added (0.1.3)

- **Vue and Angular Adapters**: Framework support expanded (adapters completed in later releases).

- **Component Renames**: First major semantic rename to clarify component purpose:
  - `BackButton` → `ButtonBack` (indicates directional action, not component position)
  - `IconButton` → `ButtonIcon` (icon-only button, distinct from ButtonText)
  - `SearchInput` → `InputSearch` (search-specific input, not generic text input)

---

## [0.1.2] - 2026-05-13

### Changed (0.1.2)

- **README**: Clarified vanilla-first vs React-only distinction in install section.

---

## [0.1.0] - 2026-05-13

Initial public release of @ulam/ube.

### Added (0.1.0)

- **React Components**: ButtonText, ButtonIcon, ButtonBack, Toggle, ControlRadioChip, ControlRadioChipGroup, ControlRadio, Select, InputSearch, InputWithClear, Badge, InfoBox, Panel, PanelRowControl, NoResults, DataError, SkipLink, IconExternalLink, FadeTransition.

- **Design Tokens**: Comprehensive CSS custom properties system for colors, spacing, typography, sizing, motion, and focus states.

- **Theming**: Built-in dark mode support with token-driven theming system.

- **CSS Framework**: `tokens.css`, `typography.css`, `reset.css`, `focus.css`, `ui.css` for foundational styles.

- **Accessibility**: All components meet WCAG 2.2 AA. Keyboard navigation, focus management, and screen reader semantics built in.

- **React Integration**: Hooks for focus management, theme control, and media query matching.

- **Zero Dependencies**: No external dependencies beyond React and React DOM.

---

## Migration Guide

If upgrading from 0.1.x:

```jsx
// Before
import { Button, Radio, RadioChip, ButtonLink, PanelRowSetting } from '@ulam/ube'

// After
import { ButtonText, ControlRadio, ControlRadioChip, LinkBtnStyled, PanelRowControl } from '@ulam/ube'
```

No CSS changes needed for consumers—component imports handle everything.
