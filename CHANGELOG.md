# Changelog

All notable changes to the ulam framework are documented here.

---

## [0.3.2] - 2026-05-19

### Added (0.3.2)

- **FormControlRadioGroup Component** (`packages/ube`): New container component for grouping radio buttons
  - Wraps related radios with shared `name` and `disabled` state in semantic `<fieldset>`
  - Supports all frameworks: React, Vue, Angular adapters
  - Props: `legend`, `name`, `value`, `onChange`, `disabled`, `options` array

### Changed (0.3.2)

- **Button Component** (`packages/ube`): Consolidated ButtonText + ButtonIcon into single unified component
  - Intelligent icon-only detection based on children presence
  - New props: `iconPosition` (start/end), `size` (compact/default/large), `align` (left/center/right)
  - Supports all variants: primary, secondary, tertiary, accent
  - Updates across all frameworks: React, Vue, Angular, Remix
  - Removed deprecated ButtonText and ButtonIcon components

- **FormInputText Component** (`packages/ube`): Consolidated FormInputSearch + FormInputWithClear
  - Single component supporting three modes: search, clearable, plain
  - New props: `search`, `liveSearch`, `showSubmit`, `clearable`, `onSubmit`, `onClear`, `clearIcon`, `clearAriaLabel`, `submitAriaLabel`
  - CSS renamed from form-input.css → form-input-text.css
  - Disabled styles reconciled with aria-disabled pattern
  - Supports `prefers-reduced-transparency` accessibility override
  - Updates across all frameworks: React, Vue, Angular, Remix

- **aria-disabled Pattern**: Form controls now consistently use aria-disabled instead of native disabled
  - Keeps elements in tab order (improves keyboard navigation)
  - Blocks Space/Enter keydown, click, and touch interactions
  - Sets `aria-disabled="true"` attribute for CSS and assistive technology
  - Visible focus ring with dashed outline on disabled controls
  - Applies to: FormControlRadio, FormControlCheckbox, FormControlToggle, FormControlSelect, FormControlRadioGroup, FormControlRadioChip, FormControlRadioChipGroup

- **Core Web Components**: Framework-agnostic vanilla web components updated
  - All form controls adopt aria-disabled pattern
  - Removed native disabled attribute from inputs
  - Enhanced focus management for disabled state
  - Updated: form-control-radio.js, form-control-checkbox.js, form-control-toggle.js, form-control-select.js, form-control-radio-chip.js, form-control-radio-chip-group.js

- **React Adapters**: Updated to use consolidated components
  - Button.jsx: Single component replaces ButtonText + ButtonIcon
  - FormInputText.jsx: Single component replaces FormInputSearch + FormInputWithClear
  - FormControlRadioGroup.jsx: New wrapper for radio groups
  - Removed deprecated component exports
  - useAriaDisabled hook: Updated to leverage vanilla core utility

- **Vue Adapters**: Updated to use consolidated components
  - Button.vue: Standalone component with icon positioning
  - FormInputText.vue: Standalone component supporting all modes
  - FormControlRadioGroup.vue: New wrapper component
  - Removed deprecated ButtonText.vue, ButtonIcon.vue, FormInputSearch.vue, FormInputWithClear.vue

- **Angular Adapters**: Updated to use consolidated components
  - button.component.ts: Standalone component replacing ButtonText + ButtonIcon
  - form-input-text.component.ts: Standalone component replacing FormInputSearch + FormInputWithClear
  - form-control-radio-group.component.ts: New wrapper component
  - Removed deprecated component files
  - Updated index.ts exports

- **CSS Disabled Styles**: Unified aria-disabled presentation across form controls
  - All disabled controls show opacity 0.5 + not-allowed cursor
  - Dashed focus outline on disabled-but-focused controls (visual distinction)
  - @media (prefers-reduced-transparency: reduce) overrides using color/border changes instead of opacity
  - Applied to: form-control-radio.css, form-control-checkbox.css, form-control-toggle.css, form-control-select.css, form-control-radio-chip.css, form-input-text.css

### Removed (0.3.2)

- **Deprecated Components**: Framework-agnostic consolidation complete
  - Removed ButtonText, ButtonIcon components from all frameworks
  - Removed FormInputSearch, FormInputWithClear components from all frameworks
  - Removed component files: button-text.js, button-icon.js, form-input-search.js, form-input-with-clear.js (core), and all framework adapter versions
  - Updated all exports in index files

### Fixed (0.3.2)

- **Markdown Linting**: Resolved MD032 (blanks-around-lists) across UPDATES.md
- **CSS Dead Code**: aria-disabled selectors in toggle and select CSS are now live (JS now sets the attribute)
- **Framework Consistency**: All adapters now feature-complete and follow same consolidation pattern

### Migration Guide

**If you're upgrading from 0.3.1:**

1. **ButtonText → Button**

   ```jsx
   // Before
   import { ButtonText } from '@ulam/ube/react'
   <ButtonText onClick={handleClick}>Click me</ButtonText>

   // After
   import { Button } from '@ulam/ube/react'
   <Button onClick={handleClick}>Click me</Button>
   ```

2. **ButtonIcon → Button (icon-only mode)**

   ```jsx
   // Before
   import { ButtonIcon } from '@ulam/ube/react'
   <ButtonIcon icon={MyIcon} onClick={handleClick} />

   // After
   import { Button } from '@ulam/ube/react'
   <Button icon={MyIcon} onClick={handleClick} />
   ```

3. **FormInputSearch → FormInputText (search mode)**

   ```jsx
   // Before
   import { FormInputSearch } from '@ulam/ube/react'
   <FormInputSearch search liveSearch value={q} onChange={setQ} />

   // After
   import { FormInputText } from '@ulam/ube/react'
   <FormInputText search liveSearch value={q} onChange={setQ} />
   ```

4. **FormInputWithClear → FormInputText (clearable mode)**

   ```jsx
   // Before
   import { FormInputWithClear } from '@ulam/ube/react'
   <FormInputWithClear clearable value={v} onClear={clear} onChange={set} />

   // After
   import { FormInputText } from '@ulam/ube/react'
   <FormInputText clearable value={v} onClear={clear} onChange={set} />
   ```

5. **New: FormControlRadioGroup** (grouping related radios)

   ```jsx
   import { FormControlRadioGroup } from '@ulam/ube/react'
   <FormControlRadioGroup
     legend="Choose one"
     name="choice"
     value={selected}
     onChange={setSelected}
     options={[
       { value: 'a', label: 'Option A' },
       { value: 'b', label: 'Option B' }
     ]}
   />
   ```

6. **aria-disabled: Form controls now use aria-disabled instead of disabled**
   - Elements remain in tab order (use keyboard to navigate to disabled controls)
   - Disabled controls still show visual feedback (dashed focus outline, opacity 0.5)
   - CSS and custom event handlers should target `[aria-disabled="true"]` instead of `:disabled`
   - If you have custom keydown handlers for disabled controls, they may need updating

---

## [0.3.1] - 2026-05-19

### Added (0.3.1)

- **Consumer App Guide** (`docs/CONSUMER-APP-GUIDE.md`): Best practices for building apps with ulam
  - Two-tier component naming convention (App\* for framework integrations, A11y\* for custom features)
  - Project organization patterns
  - Service abstraction examples
  - Integration patterns for all ulam packages
  - Accessibility checklist

- **i18n Best Practices** (`packages/calamansi/I18N-BEST-PRACTICES.md`): Comprehensive guide for multilingual apps
  - Language-appropriate capitalization conventions (English vs Romance vs East Asian)
  - Right-to-left (RTL) language support with CSS patterns
  - Cross-language search implementation
  - Locale fallback chains
  - Format strings, pluralization, number/date formatting
  - Real-world patterns from a11yfred (50+ languages)

- **Sili Migration Guide** (`packages/sili/MIGRATION.md`): Documentation for Modal→Dialog breaking change
  - Framework-specific examples (React, Remix, Vue, Angular)
  - Rationale for semantic accuracy alignment with HTML `<dialog>` and ARIA

- **Sili Progress & Roadmap** (`packages/sili/PROGRESS.md`): Status tracking and future direction
  - v0.3.0 highlights
  - Near-term priorities (Snackbar, Angular components, Vue refinements)
  - Known limitations and testing goals
  - Related packages integration guide

- **Consolidation Audit Report** (`docs/CONSOLIDATION-SESSION-SUMMARY.md`): Complete six-pass audit results
  - 13 of 16 consolidation opportunities addressed
  - Code quality assessment (0 duplication, 0 dead code)
  - Cross-project organizational analysis (ulam vs a11yfred)
  - Decision points for future work

### Changed (0.3.1)

- **Package Documentation**: Added Purpose & Scope sections to all 6 packages
  - Defines what each package does, doesn't do, and who should use it
  - Provides clear boundaries to prevent misuse
  - Includes halohalo, sawsawan, taho, calamansi, sili, ube

- **Framework Architecture**: Consolidated framework diagram to single source of truth (`docs/ARCHITECTURE.md`)
  - All package READMEs now reference shared architecture document
  - Reduced duplication while maintaining discoverability

- **Subpath Exports**: All packages now reference root README for complete framework support overview
  - Package-level quick-reference tables remain for local lookup
  - Root README established as authoritative source

### Fixed (0.3.1)

- Removed 6 redundant "License" sections from package READMEs
- Removed empty `packages/sauce/` directory (leftover from earlier work)
- Fixed markdown linting issues in UPDATES.md (emphasis-as-heading)

### Documentation (0.3.1)

- Updated UPDATES.md with comprehensive session summary
- All package documentation reflects current state
- No stale references or broken links

---

## [0.3.0] - 2026-05-18

### Added (0.3.0)

- **@ulam/sili**:
  - OverlayManager component for multi-overlay orchestration (23 transition scenarios)
  - Improved initial focus management (WCAG 2.4.3)
  - Vue Dialog, Sheet, Drawer components with full sili hooks integration
  - Comprehensive API reference documentation
  - Modal → Dialog rename for semantic accuracy

- **@ulam/ube**:
  - Framework-agnostic architecture: vanilla web components + React/Vue/Angular adapters
  - 20 web components: buttons, form controls, badge, panel, screen, etc.
  - CSS theming system (light, dark, fiesta modes)
  - Complete test suite (unit, integration, accessibility)
  - Full documentation (CORE.md, MIGRATION.md, TESTING.md, PROGRESS.md)

- **@ulam/calamansi**:
  - Purpose & Scope documentation clarifying i18n boundaries
  - Framework-agnostic vanilla core with React/Vue/Angular adapters

- **@ulam/taho**:
  - Purpose & Scope documentation for ARIA live region announcer
  - Remix route announcer support

- **@ulam/sili**:
  - Purpose & Scope documentation for focus management and overlays
  - Full API reference and focus management guide

### Changed (0.3.0)

- **@ulam/ube**: Modal component renamed to Dialog (v0.3.0)
  - Aligns with HTML `<dialog>` semantics and ARIA `role="dialog"`
  - Framework adapters updated (React, Vue, Angular)

- **File Organization**: Moved `core/sili.css` → `base.css` for better discoverability
- **CSS Reorganization**: Restructured base.css with clear section headers and logical grouping
- **File Naming**: Standardized Angular file naming to kebab-case.component.ts / service.ts / directive.ts

### Fixed (0.3.0)

- Package exports updated for CSS imports (`./core/sili.css` → `./base.css`)
- Files array updated in package manifests
- All markdown linting issues resolved across entire project

---

## [0.2.0] - 2026-05-18

### Changed (0.2.0)

- **@ulam/sili**: Overlay cleanup, removed unused token imports and keyboard handlers from Sheet component

---

## [0.1.2] - 2026-05-14

Minor release with framework fixes.

---

## [0.1.0] - 2026-05-13

### Added (0.1.0)

Initial public release of ulam framework:

- **@ulam/taho**: ARIA live region announcer with vanilla core and framework adapters
- **@ulam/sili**: Focus management, overlay components, routing hooks
- **@ulam/calamansi**: Data-agnostic i18n with runtime locale switching
- **@ulam/halohalo**: AI provider adapters and model configuration
- **@ulam/ube**: Framework-agnostic UI components (vanilla, React, Vue, Angular)
- **@ulam/sawsawan**: Integration bridge wiring packages together

All packages include:

- Vanilla JavaScript core (zero dependencies)
- Framework-specific adapters (React hooks, Vue composables, Angular services)
- Comprehensive documentation
- Accessibility compliance (WCAG 2.2 AA)
- Zero external dependencies (framework peers optional)

---

## Versioning

The ulam framework follows **semantic versioning** per package:

- **Major** (X.0.0): Breaking API changes
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, documentation improvements

Documentation-only releases (like 0.3.1) include patch bumps to maintain version consistency.

---

## Release Timeline

|Version|Date|Focus|
|---|---|---|
|[0.3.1](./CHANGELOG.md#031---2026-05-19)|2026-05-19|Consumer guides, i18n patterns, consolidation audit|
|[0.3.0](./CHANGELOG.md#030---2026-05-18)|2026-05-18|Sili enhancements, ube framework-agnostic migration, comprehensive docs|
|[0.2.0](./CHANGELOG.md#020---2026-05-18)|2026-05-18|Overlay refinements|
|[0.1.2](./CHANGELOG.md#012---2026-05-14)|2026-05-14|Framework fixes|
|[0.1.0](./CHANGELOG.md#010---2026-05-13)|2026-05-13|Initial release|
