# Changelog

All notable changes to the ulam framework are documented here.

---

## [0.3.1] - 2026-05-19

### Added

- **Consumer App Guide** (`docs/CONSUMER-APP-GUIDE.md`): Best practices for building apps with ulam
  - Two-tier component naming convention (App* for framework integrations, A11y* for custom features)
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

### Changed

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

### Fixed

- Removed 6 redundant "License" sections from package READMEs
- Removed empty `packages/sauce/` directory (leftover from earlier work)
- Fixed markdown linting issues in UPDATES.md (emphasis-as-heading)

### Documentation

- Updated UPDATES.md with comprehensive session summary
- All package documentation reflects current state
- No stale references or broken links

---

## [0.3.0] - 2026-05-18

### Added

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

### Changed

- **@ulam/ube**: Modal component renamed to Dialog (v0.3.0)
  - Aligns with HTML `<dialog>` semantics and ARIA `role="dialog"`
  - Framework adapters updated (React, Vue, Angular)

- **File Organization**: Moved `core/sili.css` → `base.css` for better discoverability
- **CSS Reorganization**: Restructured base.css with clear section headers and logical grouping
- **File Naming**: Standardized Angular file naming to kebab-case.component.ts / service.ts / directive.ts

### Fixed

- Package exports updated for CSS imports (`./core/sili.css` → `./base.css`)
- Files array updated in package manifests
- All markdown linting issues resolved across entire project

---

## [0.2.0] - 2026-05-18

### Changed

- **@ulam/sili**: Overlay cleanup, removed unused token imports and keyboard handlers from Sheet component

---

## [0.1.2] - 2026-05-14

Minor release with framework fixes.

---

## [0.1.0] - 2026-05-13

### Added

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

| Version | Date | Focus |
|---------|------|-------|
| [0.3.1](./CHANGELOG.md#031---2026-05-19) | 2026-05-19 | Consumer guides, i18n patterns, consolidation audit |
| [0.3.0](./CHANGELOG.md#030---2026-05-18) | 2026-05-18 | Sili enhancements, ube framework-agnostic migration, comprehensive docs |
| [0.2.0](./CHANGELOG.md#020---2026-05-18) | 2026-05-18 | Overlay refinements |
| [0.1.2](./CHANGELOG.md#012---2026-05-14) | 2026-05-14 | Framework fixes |
| [0.1.0](./CHANGELOG.md#010---2026-05-13) | 2026-05-13 | Initial release |

